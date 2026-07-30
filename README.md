# CFO OS - local platform

FastAPI backend + the original CFO-OS-live.html dashboard, split into static
assets, talking to a real MSSQL database and xAI Grok instead of an embedded
snapshot and window.cowork.

## Layout

```
cfo-os/
  app/
    main.py          FastAPI app: mounts /static, serves index.html at /
    config.py         .env settings (pydantic-settings)
    db.py              SQLAlchemy/pyodbc engine + run_query()
    sql_fragments.py   PNL_COLS / BAL_COLS / BASE / BU_IDS -- ported verbatim
                        from CFO-OS-live.html so live and fallback numbers agree
    grok.py            xAI Grok chat-completions client (parses the JSON the
                        model returns, same convention as the old askClaude())
    static_data.py     reads COMPANIES / LIVE_ASOF out of static/daily_data.js
                        so the backend never holds a second copy of that data
    routers/
      health.py        GET /api/health
      companies.py     GET /api/companies, GET /api/snapshot
      live.py           GET /api/live/monthly, GET /api/live/exact
      chat.py            POST /api/chat, POST /api/insights
      email.py           POST /api/email
  static/
    index.html          extracted body markup, links to the assets below
    styles.css           extracted <style> block, unchanged
    echarts-shim.js      extracted Chart.js-backed ECharts shim, unchanged
    daily_data.js        extracted "DAILY DATA" block (COMPANIES, PL_CSV, ...) --
                          the offline fallback snapshot, unchanged
    app.js                extracted main script, patched:
                            - askClaude()/genInsights() now fetch /api/chat and
                              /api/insights instead of window.cowork / anthropic
                            - liveMonthly()/liveExact() now fetch
                              /api/live/monthly and /api/live/exact instead of
                              window.cowork.callMcpTool
                            - new "Email" toolbar button -> POST /api/email
  requirements.txt
  .env.example
```

Nothing about the KPI math, chart rendering, or robot logic changed -- `ltot`,
`lder`, `LX`, `ov(*)`, the demo-module formulas, all ported byte-for-byte.

## Quick install (Windows / macOS / Linux)

Run in an empty directory -- clones the repo, creates a `.venv`, installs
dependencies, copies `.env.example` to `.env`, starts the server bound to
`0.0.0.0:8000`, and opens it in your browser. Also prints your LAN IP so you
can open the dashboard from a phone or another device on the same WiFi.

Windows (PowerShell):
```powershell
irm https://raw.githubusercontent.com/ausim99/cfo-os/master/install.ps1 | iex
```

macOS / Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/ausim99/cfo-os/master/install.sh | bash
```

(Or clone the repo first and run `.\install.ps1` / `./install.sh` from
anywhere -- both detect an existing `cfo-os` folder and pull instead of
re-cloning.) Fill in real credentials in `.env` afterward; until then it
runs on the embedded snapshot.

## Run it

```bash
cd cfo-os
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env        # then fill in MSSQL_*, GROK_API_KEY, SMTP_*
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000. Add `--host 0.0.0.0` to also reach it from other
devices on the same network, at `http://<this-machine's-LAN-IP>:8000`.

- `GET /api/health` -> `{"status":"ok"}`
- If `.env` is left blank, the dashboard still loads and works against the
  embedded snapshot (`static/daily_data.js`) -- the "LIVE QUERY FAILED ·
  showing embedded snapshot" badge just means the DB/Grok calls aren't
  configured yet, not that the app is broken.

## Run it as a background service (Windows, no terminal needed)

Once installed (via install.ps1 or manually), run this **once** to make it
start automatically at every login with no console window, no VS Code, no
manual `uvicorn` command ever again:

```powershell
cd cfo-os
.\install-service.ps1
```

This registers a Scheduled Task ("CFO OS Server") that runs `service_runner.py`
via `pythonw.exe` (windowless) at logon, and starts it immediately. Logs go to
`cfo-os\service.log` since a windowless process has no console to print to.

To stop it and remove the auto-start behavior:
```powershell
.\uninstall-service.ps1
```

### MSSQL driver

`pyodbc` needs the **Microsoft ODBC Driver 17 (or 18) for SQL Server**
installed on the machine (not a pip package) -- see
https://learn.microsoft.com/sql/connect/odbc/download-odbc-driver-for-sql-server.
Match `MSSQL_DRIVER` in `.env` to whichever version you installed.

## Swapping direct SQL for MCP later

`app/db.py` is the only place that talks to the database. `run_query(sql,
params)` returns `list[dict]`. To move to an MCP `sql_query` tool, replace
that function's body with an MCP client call that returns the same shape --
`app/routers/live.py` doesn't need to change.

## Notes

- `/api/live/monthly` and `/api/live/exact` reject anything that isn't a
  well-formed date (`from`/`to`) or a known business-unit id (`bu`), and use
  bound SQL parameters -- no string-built SQL from request input.
- The embedded CSV snapshot in `static/daily_data.js` is not duplicated
  server-side; `/api/companies` and `/api/snapshot` read it directly so
  there's one source of truth.

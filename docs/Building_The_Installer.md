# Building the Windows installer (CFOOS-Setup.exe)

Packages the server as a standalone exe (no Python required on the target
machine) plus a proper Windows installer: installs to Program Files,
registers a background auto-start (Scheduled Task, runs at system startup as
SYSTEM, windowless), and drops two ready-to-use desktop shortcuts -- no
credentials in either, just a URL:

- `CFO OS (This PC).url` -> `http://localhost:8000`
- `CFO OS Dashboard (Network).url` -> `http://<detected LAN IP>:8000` --
  copy this one to other people's desktops so they can reach the dashboard
  over your local network. Nothing else needs installing on their machines.

## Prerequisites (on the build machine)

```powershell
pip install pyinstaller
winget install JRSoftware.InnoSetup
```

The target/install machine still needs the **Microsoft ODBC Driver 17 or 18
for SQL Server** installed separately (a system driver, not something
PyInstaller can bundle) -- same requirement as the source install, see the
main README.

## 1. Build the server exe

From the `cfo-os` directory:

```powershell
python -m PyInstaller --onefile --noconsole --name CFOOSServer `
  --add-data "static;static" `
  --hidden-import uvicorn.logging `
  --hidden-import uvicorn.loops --hidden-import uvicorn.loops.auto `
  --hidden-import uvicorn.protocols --hidden-import uvicorn.protocols.http --hidden-import uvicorn.protocols.http.auto `
  --hidden-import uvicorn.protocols.websockets --hidden-import uvicorn.protocols.websockets.auto `
  --hidden-import uvicorn.lifespan --hidden-import uvicorn.lifespan.on `
  --hidden-import pyodbc --collect-all pyodbc `
  --hidden-import sqlalchemy.dialects.mssql --hidden-import sqlalchemy.dialects.mssql.pyodbc `
  server_entry.py
```

Produces `dist\CFOOSServer.exe`. The `pyodbc`/`sqlalchemy.dialects.mssql`
hidden-imports are load-bearing -- SQLAlchemy loads its MSSQL dialect and
`pyodbc` dynamically at runtime, which PyInstaller's static analysis can't
see, so without these two lines the exe builds fine but fails at runtime
with `No module named 'pyodbc'` the first time it tries to query the DB
(confirmed the hard way).

If you change `server_entry.py`, `app/`, or `static/`, delete `build/`,
`CFOOSServer.spec`, and `dist/CFOOSServer.exe` before rebuilding --
PyInstaller otherwise sometimes reuses the cached `.spec`/`build/` and
silently ignores new command-line flags.

## 2. Sign it

Windows (SmartScreen, and on managed/corporate machines, Application
Control/Device Guard policies) blocks unsigned exes, sometimes hard-blocks
them with no override available to the end user. Sign with your
organization's real code-signing certificate if you have one:

```powershell
$cert = Get-ChildItem Cert:\CurrentUser\My | Where-Object {$_.EnhancedKeyUsageList -match "Code Signing"}
Set-AuthenticodeSignature -FilePath dist\CFOOSServer.exe -Certificate $cert -TimestampServer "http://timestamp.digicert.com"
```

Without a real cert, a self-signed one raises the bar from "trivially
unsigned" to "signed, but untrusted until the cert is installed":

```powershell
$cert = New-SelfSignedCertificate -Subject "CN=CFO OS Internal" -Type CodeSigningCert `
  -CertStoreLocation Cert:\CurrentUser\My -KeyUsage DigitalSignature -NotAfter (Get-Date).AddYears(5)
Set-AuthenticodeSignature -FilePath dist\CFOOSServer.exe -Certificate $cert
```

**This does not satisfy real Device Guard/WDAC policies on managed
corporate machines** -- those require an organization-approved signer or an
explicit hash allowlist entry, which only your IT/security team can grant.
Self-signed only helps on machines using the normal (unmanaged)
SmartScreen/Authenticode trust model, once the cert is imported into that
machine's Trusted Root + Trusted Publisher stores.

## 3. Build the installer

```powershell
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer\CFOOS.iss
# or wherever winget installed it, e.g. C:\Users\<you>\AppData\Local\Programs\Inno Setup 6\ISCC.exe
```

Produces `installer\output\CFOOS-Setup.exe`. Sign this one too, same as
step 2 -- it's the first thing whoever installs this will double-click.

## 4. Install

Run `CFOOS-Setup.exe` as administrator. After install:

1. Edit `.env` in the install directory (default `C:\Program Files\CFO
   OS\.env`) with real MSSQL/AI/SMTP credentials -- the installer only ships
   `.env.example` renamed to `.env` on first install, never real secrets.
2. Restart the "CFO OS Server" Scheduled Task (or reboot) for the new `.env`
   to take effect.
3. Hand out the "CFO OS Dashboard (Network).url" shortcut from the desktop
   to whoever else on the network needs access.

## Why not just distribute credentials to every machine?

This whole packaging approach exists because the credential-distribution
version of this request (bundle real .env creds into an exe installed on
every user's machine, encrypted "so they can't see it") has a hard limit: a
locally-running program has to decrypt its own credentials in memory to use
them, so anyone with local admin access and a debugger can recover them
regardless of how they're encrypted at rest. The one-server-plus-shortcuts
model sidesteps that entirely -- real credentials only ever exist on the one
machine actually running the server.

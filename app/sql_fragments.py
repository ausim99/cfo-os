# Ported verbatim from CFO-OS-live.html (window.liveMonthly / window.liveExact).
# Column logic (PNL_COLS, BAL_COLS, BU_IDS) must stay identical to the embedded
# snapshot's extraction logic so live and fallback numbers agree.

BU_IDS = [
    250, 232, 245, 238, 247, 235, 220, 4, 221, 240, 249, 256, 243, 246, 144, 253, 138, 224, 244,
    239, 237, 225, 117, 255, 259, 251, 12, 8, 175, 136, 208, 233, 17, 102, 241, 216, 213, 181, 212,
    186, 178, 22, 182, 180, 183, 218, 242, 189, 188, 184, 209, 94, 171, 252, 211, 214, 257, 210,
    258, 248, 234, 219, 260, 133, 98, 91, 236, 122, 20, 6, 9, 103, 13, 261, 222, 97, 223, 53, 2,
    46, 54, 121, 134, 99, 135, 15, 10, 1, 90, 132, 14, 226, 96, 227, 101, 228, 92, 56, 55, 3, 21,
    137, 119, 11, 254, 108, 59, 95, 176, 106, 215, 152, 58, 230, 229, 67, 166, 57, 18, 104, 77, 16,
    81, 82, 80, 83, 107, 105, 127,
]

PNL_COLS = """
 -SUM(CASE WHEN strProfitType='Revenue' AND strGeneralLedgerName LIKE 'Sales%' THEN numAmount ELSE 0 END)/1e7 rev,
 -SUM(CASE WHEN strProfitType='Revenue' AND strGeneralLedgerName NOT LIKE 'Sales%' THEN numAmount ELSE 0 END)/1e7 oth,
 SUM(CASE WHEN strGeneralLedgerName='Cost Of Goods Sold' THEN numAmount ELSE 0 END)/1e7 cogs,
 SUM(CASE WHEN strGeneralLedgerName IN ('Selling Expenses','Marketing Expenses') THEN numAmount ELSE 0 END)/1e7 sm,
 SUM(CASE WHEN strGeneralLedgerName='Logistics Expenses' THEN numAmount ELSE 0 END)/1e7 logi,
 SUM(CASE WHEN strGeneralLedgerName IN ('Administrative Expenses','Operating Expenses') THEN numAmount ELSE 0 END)/1e7 admin,
 SUM(CASE WHEN strGeneralLedgerName='Manufacturing Expenses' THEN numAmount ELSE 0 END)/1e7 mfg,
 SUM(CASE WHEN strGeneralLedgerName LIKE 'Depreciation%' THEN numAmount ELSE 0 END)/1e7 depr,
 SUM(CASE WHEN strGeneralLedgerName='Financial Expenses' THEN numAmount ELSE 0 END)/1e7 fin,
 SUM(CASE WHEN strGeneralLedgerName LIKE 'Tax Expense%' OR strGeneralLedgerName LIKE 'Provision for Income Tax%' THEN numAmount ELSE 0 END)/1e7 tax"""

BAL_COLS = """
 SUM(CASE WHEN strGeneralLedgerName='Trade Receivable (Local)' THEN numAmount ELSE 0 END)/1e7 ar,
 -SUM(CASE WHEN strGeneralLedgerName='Payable against Suppliers' THEN numAmount ELSE 0 END)/1e7 ap,
 SUM(CASE WHEN strGeneralLedgerName='Cash at Bank' THEN numAmount ELSE 0 END)/1e7 cash,
 SUM(CASE WHEN strGeneralLedgerName IN ('Finished Goods in Stock','Raw Materials','Work in Progress-Materials','Semi Finished Goods','Trading Goods') THEN numAmount ELSE 0 END)/1e7 inv"""

DELTA_BAL_COLS = """
 SUM(CASE WHEN strGeneralLedgerName='Trade Receivable (Local)' THEN numAmount ELSE 0 END)/1e7 dAR,
 -SUM(CASE WHEN strGeneralLedgerName='Payable against Suppliers' THEN numAmount ELSE 0 END)/1e7 dAP,
 SUM(CASE WHEN strGeneralLedgerName='Cash at Bank' THEN numAmount ELSE 0 END)/1e7 dCash,
 SUM(CASE WHEN strGeneralLedgerName IN ('Finished Goods in Stock','Raw Materials','Work in Progress-Materials','Semi Finished Goods','Trading Goods') THEN numAmount ELSE 0 END)/1e7 dInv"""

_BU_IN = ",".join(str(b) for b in BU_IDS)
BASE = f"FROM fin.tblAccountingJournalArc WHERE isActive=1 AND intBusinessUnitId IN ({_BU_IN})"

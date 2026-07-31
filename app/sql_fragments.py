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
 -SUM(CASE WHEN strGeneralLedgerName IN ('Sales (Local)','Sales (Foreign)') THEN numAmount ELSE 0 END)/1e7 rev,
 -SUM(CASE WHEN strGeneralLedgerName IN ('Capital Gain','Other Income') THEN numAmount ELSE 0 END)/1e7 oth,
 SUM(CASE WHEN strGeneralLedgerName='Cost Of Goods Sold' THEN numAmount ELSE 0 END)/1e7 cogs,
 SUM(CASE WHEN strGeneralLedgerName IN ('Selling Expenses','Marketing Expenses') THEN numAmount ELSE 0 END)/1e7 sm,
 SUM(CASE WHEN strGeneralLedgerName='Logistics Expenses' THEN numAmount ELSE 0 END)/1e7 logi,
 SUM(CASE WHEN strGeneralLedgerName IN ('Administrative Expenses','Operating Expenses') THEN numAmount ELSE 0 END)/1e7 admin,
 SUM(CASE WHEN strGeneralLedgerName='Manufacturing Expenses' THEN numAmount ELSE 0 END)/1e7 mfg,
 SUM(CASE WHEN strGeneralLedgerName LIKE 'Depreciation%' THEN numAmount ELSE 0 END)/1e7 depr,
 SUM(CASE WHEN strGeneralLedgerName='Financial Expenses' THEN numAmount ELSE 0 END)/1e7 fin,
 SUM(CASE WHEN strGeneralLedgerName LIKE 'Tax Expense%' OR strGeneralLedgerName LIKE 'Provision for Income Tax%' THEN numAmount ELSE 0 END)/1e7 tax,
 SUM(CASE WHEN strGeneralLedgerName='Sales Tax (SD & VAT)' THEN numAmount ELSE 0 END)/1e7 salesTax,
 -SUM(CASE WHEN strGeneralLedgerName='Sales (Wastage)' THEN numAmount ELSE 0 END)/1e7 salesWastage"""

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
BASE = f"FROM fin.tblAccountingJournal WHERE isActive=1 AND intBusinessUnitId IN ({_BU_IN})"

# ---------------------------------------------------------------------------
# FP&A sub-modules (Yield, Channel/Geo, Production & Inventory, GL Variance).
# Real channel/territory names in oms/rtm are free-text and highly granular
# (hundreds of "Chittagong Metro-2 (Dealer X)" style sub-territories), so these
# buckets classify by prefix/keyword into the categories the CFO asked for.
# ---------------------------------------------------------------------------

CHANNEL_BUCKET = """
 CASE
  WHEN h.strDistributionChannelName LIKE '%Enterprise%' THEN 'Enterprise'
  WHEN h.strDistributionChannelName LIKE '%Corporate%' AND h.strDistributionChannelName LIKE '%Bulk%' THEN 'Corporate Bulk'
  WHEN h.strDistributionChannelName LIKE '%Bulk%' THEN 'Corporate Bulk'
  WHEN h.strDistributionChannelName LIKE '%Corporate%' THEN 'Corporate'
  WHEN h.strDistributionChannelName LIKE '%In House%' OR h.strDistributionChannelName LIKE '%In-house%' OR h.strDistributionChannelName LIKE 'IHB%' THEN 'In-house'
  WHEN h.strDistributionChannelName LIKE '%B2B%' THEN 'B2B'
  WHEN h.strDistributionChannelName LIKE '%Trade%' THEN 'Trade'
  ELSE 'Other'
 END"""

GEO_BUCKET = """
 CASE
  WHEN t.strTerritoryName LIKE 'Dhaka%' THEN 'Dhaka'
  WHEN t.strTerritoryName LIKE 'Mymensingh%' THEN 'Mymensingh'
  WHEN t.strTerritoryName LIKE 'Khulna%' THEN 'Khulna'
  WHEN t.strTerritoryName LIKE 'Bogura%' THEN 'Bogura'
  WHEN t.strTerritoryName LIKE 'Noakhali%' THEN 'Noakhali'
  WHEN t.strTerritoryName LIKE 'Cumilla%' THEN 'Cumilla'
  WHEN t.strTerritoryName LIKE 'Baris%' THEN 'Barisal'
  WHEN t.strTerritoryName LIKE 'Chittagong%' THEN 'Chittagong'
  ELSE 'Other'
 END"""

# GL categories that map to the CFO's requested department buckets. Selling and
# Marketing are tracked together as "sm" and Administrative/Operating together
# as "admin" in PNL_COLS above; GL Variance needs them split, so this is kept
# separate rather than reusing PNL_COLS.
GLVAR_DEPT_GL_NAMES = {
    "Cost Of Goods Sold": "COGS",
    "Selling Expenses": "Selling",
    "Marketing Expenses": "Marketing",
    "Administrative Expenses": "Administrative",
    "Operating Expenses": "Administrative",
    "Logistics Expenses": "Logistics",
    "Manufacturing Expenses": "Manufacturing Overhead",
    "Financial Expenses": "Finance",
}
_GLVAR_GL_IN = ",".join(f"'{k}'" for k in GLVAR_DEPT_GL_NAMES)
GLVAR_DEPT_CASE = "CASE strGeneralLedgerName " + " ".join(
    f"WHEN '{k}' THEN '{v}'" for k, v in GLVAR_DEPT_GL_NAMES.items()
) + " END"

# ---------------------------------------------------------------------------
# Financial Ratios module. Maps the 116 distinct strGeneralLedgerName values
# (confirmed via a live DISTINCT query against our BU set) into the balance
# sheet / P&L buckets needed for Financial_and_Ratio_Formulas.md. Names are
# normalized with LTRIM/RTRIM because a few come through with trailing
# whitespace in the source data (e.g. "Finished Goods in Stock ").
#
# Sign convention (empirically verified against real rows for BU 4):
#   revenue/income GLs -> raw numAmount is negative (negate for display)
#   expense GLs        -> raw numAmount is positive (use as-is)
#   asset GLs          -> raw numAmount as-is (debit-normal)
#   liability/equity   -> raw numAmount is negative (negate for display)
#   Sales Tax (SD&VAT) -> raw numAmount is positive (contra-revenue, use as-is)
#   ACD * (accum. depr)-> raw numAmount is negative; summed directly with the
#                         matching gross fixed-asset bucket nets it down, no
#                         separate negation needed.
BS_BUCKET_NAMES = {
    "Cash at Bank": "cash", "Cash in Hand": "cash",
    "Trade Receivable (Local)": "ar", "Trade Receivable (Foreign)": "ar",
    "Trade Receivable (Others)": "ar", "Trade Receivable (Wastage)": "ar",
    "Raw Materials": "inv", "Raw Materials in Transit": "inv",
    "Finished Goods in Stock": "inv", "Finished Goods in Transit/Purchase": "inv",
    "Semi Finished Goods": "inv", "Work in Progress-Materials": "inv",
    "Trading Goods": "inv", "Material in Transit": "inv",
    "Advance Payment for Operation Expense": "otherCA", "Advance Suppliers & Others": "otherCA",
    "Advance Tax (AT)": "otherCA", "Advance to Employees (Expense)": "otherCA",
    "Advance to Employees (Salary)": "otherCA", "Advances & Deposits": "otherCA",
    "Advances Income Tax": "otherCA", "Advances Vat & SD": "otherCA",
    "Deposit": "otherCA", "Prepaid Expense": "prepaid", "Material Loan Receivable": "otherCA",
    "Inter Company Balance": "otherCA", "Inter Company Interest Balance": "otherCA",
    "Preliminary Expense": "otherCA",
    "Land & Land Development": "fixedAssetGross", "Land & Land Development (CWIP)": "fixedAssetGross",
    "Land & Land Development (Leased)": "fixedAssetGross",
    "Building & Construction": "fixedAssetGross", "Building & Construction (CWIP)": "fixedAssetGross",
    "Plant & Machinery": "fixedAssetGross", "Plant & Machinery (CWIP)": "fixedAssetGross",
    "Furniture & Fixture": "fixedAssetGross", "Furniture & Fixture (CWIP)": "fixedAssetGross",
    "Transport & Vehicle": "fixedAssetGross", "Transport & Vehicle (CWIP)": "fixedAssetGross",
    "Phone Fax Electrical & IT Equipment": "fixedAssetGross",
    "Phone, Fax, Electrical & IT Equipment (CWIP)": "fixedAssetGross",
    "Gas Water Electric & Other Line Installation": "fixedAssetGross",
    "Gas Water Electric & Others Line Installation": "fixedAssetGross",
    "Gas, Water, Electric & Others Line Installation (CWIP)": "fixedAssetGross",
    "Capitalized Software and IP": "intangibles", "Goodwill": "intangibles",
    "Production Tools and Resources": "fixedAssetGross", "NCA Living Animals": "fixedAssetGross",
    "ACD Building & Construction": "accDep", "ACD Furniture & Fixture": "accDep",
    "ACD Gas Water Electric & Other Line Installation": "accDep",
    "ACD Phone Fax Electric & IT Equipment": "accDep", "ACD Plant & Machinery": "accDep",
    "ACD Transport & Vehicle": "accDep",
    "Investment": "investments", "Investment in Associate": "investments",
    "Investment in Subsidiary Company": "investments", "Investment to Capital Market": "investments",
    "Loan to Sister Concern": "investments",
    "Payable against Suppliers": "curLiabOther", "Payable against Expenses": "curLiabOther",
    "Payable Against Sales Tax": "curLiabOther", "Payable against Source VAT & Tax": "curLiabOther",
    "Accrued Expenses": "curLiabOther", "Accrued Payable": "curLiabOther",
    "Accrued Cost of Goods Sold": "curLiabOther", "Dividend Payable": "curLiabOther",
    "Provision for Income Tax": "curLiabOther", "LC Clearing": "curLiabOther",
    "Supply Chain Financing": "curLiabOther", "Unearned Revenue": "curLiabOther",
    "Other Current Libilities": "curLiabOther", "Clearing Provision For Daily Net Profit": "curLiabOther",
    "Provident Fund": "curLiabOther", "Gratuity": "curLiabOther",
    "Short Term Bank Borrowings": "debtST", "Borrowing from other Financial Institutes (ST)": "debtST",
    "Long Term Bank Borrowings": "debtLT",
    "Deferred tax liabilities": "nonCurLiabOther", "Others Long Term Provisions": "nonCurLiabOther",
    "Issued Capital": "equity", "Paid up Capital": "equity", "Capital Reserve": "equity",
    "General Reserve": "equity", "Retained Earning": "equity", "Non Controlling Interest": "equity",
}
_BS_CASE_WHEN = " ".join(f"WHEN '{k}' THEN '{v}'" for k, v in BS_BUCKET_NAMES.items())
BS_BUCKET_CASE = f"CASE LTRIM(RTRIM(strGeneralLedgerName)) {_BS_CASE_WHEN} ELSE 'other' END"

RATIO_PNL_NAMES = {
    "Sales (Local)": "salesLocal", "Sales (Foreign)": "salesForeign", "Sales (Wastage)": "salesWastage",
    "Sales Tax (SD & VAT)": "salesTax", "Cost Of Goods Sold": "cogs", "Manufacturing Expenses": "mfg",
    "Administrative Expenses": "admin", "Operating Expenses": "admin",
    "Marketing Expenses": "marketing", "Selling Expenses": "selling", "Logistics Expenses": "logistics",
    "Depreciation on Property Plant & Equipment": "depr", "Depreciation on Leased Asset": "depr",
    "Amortization on Intangible Asset": "depr", "Financial Expenses": "financial", "Tax Expenses": "tax",
    "Other Income": "otherIncome", "Capital Gain": "capitalGain",
    "Freight Income": "freightIncome", "Agency Income": "agencyIncome",
}
_RATIO_PNL_CASE_WHEN = " ".join(f"WHEN '{k}' THEN '{v}'" for k, v in RATIO_PNL_NAMES.items())
RATIO_PNL_CASE = f"CASE LTRIM(RTRIM(strGeneralLedgerName)) {_RATIO_PNL_CASE_WHEN} ELSE 'other' END"

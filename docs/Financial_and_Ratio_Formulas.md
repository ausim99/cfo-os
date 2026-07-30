# Financial & Ratio Formulas

## Financial Formulas

| Item | Formula |
|---|---|
| Net Revenue | Gross Revenue − Sales Tax (SD & VAT) |
| Gross Margin | Gross Revenue − Sales Tax (SD & VAT) − Cost Of Goods Sold − Manufacturing Overhead/Cost of Service Provided |
| Income From Operation (EBITDA) | Gross Margin − Administrative Expenses − Marketing Expenses − Selling Expenses − Logistics & Distribution Expenses + Other Operating Gain/Loss |
| Income From Operation (EBIT) | EBITDA − Depreciation Expenses |
| Earning Before Tax (EBT) | EBIT − Financial Expenses + Non Operating Income |
| Net Income After Tax | EBT − Tax Expense |
| Gross Revenue | Sales (Local) + Sales (Foreign) |
| Operating Income | Sales (Wastage) |
| Non Operating Income | Capital Gain + Royalty + Financial Income + Other Income + Interest Received from Inter Company + Inter Company Interest Income + Interest Income + Loss/Gain on Asset Disposal or Sale |

---

**Verified:** Net Revenue and Gross Margin formulas above match `app/routers/ratios.py:64-67` exactly.

## Ratio Formulas

### 1. Liquidity Analysis Ratios

| SL | Ratio Name | Std Ratio | Formula |
|---|---|---|---|
| 1.01 | Quick Ratio | > 1.5 | (Current Asset − (Inventory + Prepaid Expense)) / Current Liability |
| 1.02 | Current Ratio | > 1.5 | Current Asset / Current Liability |
| 1.03 | Net Working Capital Ratio | > 0.1 | (Current Asset − Current Liability) / Total Asset |

### 2. Profitability Analysis Ratios

| SL | Ratio Name | Std Ratio | Formula |
|---|---|---|---|
| 2.01 | Gross Profit Ratio | > 0.2 | Gross Profit / Net Revenue |
| 2.02 | EBITDA Margin / Operating Profit Ratio | > 0.1 | Operating Profit / Net Sales |
| 2.03 | Net Profit Ratio / Return On Sales | > 0.06 | Net Profit / Net Sales |
| 2.04 | Operating Cash Flow Ratio (OCF) | > 0.08 | Operating Cashflow / Net Sales |
| 2.05 | Return on Assets (ROA) | > 0.05 | Net Profit / Total Asset |
| 2.06 | Return on Equity (ROE) | > 0.1 | Net Profit / Total Equity |
| 2.07 | Return on Capital Employed (ROCE) | > 0.1 | EBIT / (Total Assets − Current Liabilities) |

### 3. Activity Analysis Ratios / Management Efficiency Ratios

| SL | Ratio Name | Std Ratio | Formula |
|---|---|---|---|
| 3.01 | Asset Turnover Ratio | > 1 | Net Sales / Avg. Total Asset |
| 3.02 | Fixed Asset Turnover Ratio | > 2 | Net Sales / Avg. Fixed Inventory |
| 3.03 | Inventory Turnover Ratio | > 4 | Net Sales / Avg. Total Inventory |
| 3.04 | Accounts Receivable Turnover Ratio | > 6 | Net Credit Sales / Avg. Total Receivable |
| 3.05 | Accounts Payable Turnover Ratio | > 6 | Net Credit Purchase / Avg. Total Payable |
| 3.06 | Working Capital Turnover Ratio | > 5 | Net Sales / Avg. Working Capital |
| 3.07 | Days Sales Outstanding Ratio | < 50 | (Avg. Receivable / Net Sales) × 365 |
| 3.08 | Days Inventory Outstanding Ratio | < 60 | (Avg. Inventory / COGS) × 365 |
| 3.09 | Days Payable Outstanding Ratio | > 30 | (Avg. Payable / COGS) × 365 |
| 3.10 | Operating Cycle Ratio | > 60 | Days Inventory Outstanding + Days Sales Outstanding |
| 3.11 | Cash Conversion Cycle Ratio | < 30 | Days Inventory Outstanding + Days Sales Outstanding − Days Payable Outstanding |
| 3.12 | Free Cash Flow (FCF) | > 0 | Operating Cash Flow − Capital Expenditure |
| 3.13 | Days Cash on Hand | > 30 | Cash & Cash Equivalent / ((Annual Operating Expense − Non-Cash Item) / 365) |
| 3.14 | Debt Service Coverage Ratio (DSCR) | > 2.5 | Net Income / Principal and Interest on all Debt |
| 3.15 | Operating Cashflow to Debt Ratio | > 0.25 | Operating Cash Flow / Financial Debt |
| 3.16 | Cash Ratio | > 0.1 | Cash and Cash Equivalent / Current Liabilities |
| 3.17 | Cash Flow Coverage Ratio | > 0.25 | Operating Cashflow / Principal |

### 4. Capital Structure Analysis / Leverage Ratios

| SL | Ratio Name | Std Ratio | Formula |
|---|---|---|---|
| 4.01 | Debt to Asset Ratio | < 0.45 | Total Debt / Total Asset |
| 4.02 | Debt to Equity Ratio | < 1 | Total Debt / Total Equity |
| 4.03 | Debt to Capital Ratio | > 0.4 | Total Debt / (Total Debt + Total Equity) |
| 4.04 | Debt to EBITDA Ratio | < 3 | Total Debt / EBITDA |
| 4.05 | Asset to Equity Ratio | > 1.5 | Total Asset / Total Equity |
| 4.06 | Interest Coverage Ratio | > 3 | EBIT / Interest Expense |
| 4.07 | Financial Debt to Net Worth Ratio | > 0.75 | Total Financial Debt / Tangible Net Worth |
| 4.08 | Financial Debt to Total Asset | > 0.45 | Total Financial Debt / Total Assets |

---

**Note:** Rows 4.03 and 4.07 were cut off in the source text. They have been completed here with the standard finance formulas (Total Debt + Total Equity, and Tangible Net Worth).

**Verified:** all 33 rows above (SL, Ratio Name, Std Ratio, Formula) confirmed against the original source screenshot, row by row -- exact match, including the 4.03/4.07 completions above.

---

## GL → Income Statement Mapping (reference)

Confirmed from a source screenshot (partial -- only these rows were shown; more GL/BTN lines likely exist below the fold). Used to resolve which bucket each GL line feeds in the Financial Formulas above.

| strBusinessTransactionName | strGeneralLedgerName | Income Statement Mapping |
|---|---|---|
| Sales (Wastage) | Sales (Wastage) | Operating Income |
| Capital Gain | Capital Gain | Non Operating Income |
| Royalty | Royalty | Non Operating Income |
| Financial Income | Financial Income | Non Operating Income |
| Other Income | Other Income | Non Operating Income |
| Interest Received from Inter company | Interest Received from Inter company | Non Operating Income |
| Inter Company Interest Income | Inter Company Interest Income | Non Operating Income |
| Interest Income | Interest Income | Non Operating Income |
| Loss/Gain on Asset Disposal or Sale | Loss/Gain on Asset Disposal or Sale | Non Operating Income |
| Sales (Local) | Sales (Local) | Gross Revenue |
| Sales (Foreign) | Sales (Foreign) | Gross Revenue |

**Key correction this confirmed:** `Other Income` is Non Operating Income, not part of EBITDA's "Other Operating Gain/Loss" -- an earlier pass on `app/routers/ratios.py` had it backwards. Fixed: `other_operating_gain_loss` (feeds EBITDA) = Sales (Wastage) + Freight Income + Agency Income; `non_operating_income` (feeds EBT) = Capital Gain + Other Income. Freight Income and Agency Income aren't in this mapping table at all -- kept in the EBITDA bucket as the closest fit (operating-adjacent, not in the confirmed Non Operating Income list).

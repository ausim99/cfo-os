/* ============================================================
   CFO OS - AUTOPARTS NOVA d.o.o. (SYNTHETIC DEMO DATA)
   Single-file HTML web application. Data modeled in EUR '000, displayed in BDT (135 BDT/EUR).
   ============================================================ */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// Monthly revenue rolls up exactly to FY 44,850. Nov 3,650 and Dec 3,920 fixed.
const REV_M = [3560,3600,3705,3760,3820,3890,3680,3610,3895,3760,3650,3920];

const FIN = {
  rev:   { dec: 3920, nov: 3650, fy: 44850, py: 41200, yoy: 8.9,  bud: 43200 },
  gp:    { dec: 1117, nov: 1015, fy: 12648, py: 11124, yoy: 13.7, bud: 11880 },
  ebitda:{ dec: 518,  nov: 456,  fy: 5741,  py: 4944,  yoy: 16.1, bud: 5184 },
  ni:    { dec: 342,  nov: 298,  fy: 3950,  py: 3420,  yoy: 15.5, bud: 3770 },
  ocf:   { dec: 485,  nov: 410,  fy: 5320,  py: 4680,  yoy: 13.7 },
  fcf:   { dec: 285,  nov: 210,  fy: 3120,  py: 2850,  yoy: 9.5 },
};

const KPI8 = [
  { name: "Gross Margin %",       dec: 28.5, nov: 27.8, fy: 28.2, bud: 27.5, target: ">=27",  status: "GREEN", unit: "%" },
  { name: "EBITDA Margin %",      dec: 13.2, nov: 12.5, fy: 12.8, bud: 12.0, target: ">=12",  status: "GREEN", unit: "%" },
  { name: "DSO",                  dec: 58,   nov: 52,   fy: 55,   bud: 45,   target: "<=45",  status: "RED",   unit: "d" },
  { name: "DPO",                  dec: 52,   nov: 48,   fy: 50,   bud: 45,   target: "45-55", status: "GREEN", unit: "d" },
  { name: "CCC",                  dec: 48,   nov: 52,   fy: 50,   bud: 55,   target: "<=55",  status: "GREEN", unit: "d" },
  { name: "Cash Runway",          dec: 14,   nov: 12,   fy: 14,   bud: 12,   target: ">=12",  status: "GREEN", unit: "wk" },
  { name: "Cash Conversion Ratio",dec: 0.92, nov: 0.88, fy: 0.90, bud: 0.85, target: ">=0.85",status: "GREEN", unit: "x" },
  { name: "OEE %",                dec: 84.2, nov: 83.8, fy: 84.0, bud: 85.0, target: ">=85",  status: "AMBER", unit: "%" },
];

const PNL = {
  revLines: [
    { name: "Chassis Components",    fy: 24668, share: 55 },
    { name: "Suspension Parts",      fy: 15698, share: 35 },
    { name: "Tooling & Engineering", fy: 4485,  share: 10 },
  ],
  lines: [
    { name: "Revenue",                fy: 44850,  pct: 100,   dec: 3920 },
    { name: "Direct Materials",       fy: -20183, pct: -45.0, dec: -1765 },
    { name: "Direct Labor",           fy: -6728,  pct: -15.0, dec: -588 },
    { name: "Manufacturing Overhead", fy: -5292,  pct: -11.8, dec: -450 },
    { name: "Total COGS",             fy: -32202, pct: -71.8, dec: -2803, bold: true },
    { name: "Gross Profit",           fy: 12648,  pct: 28.2,  dec: 1117, bold: true },
    { name: "Sales & Marketing",      fy: -1794,  pct: -4.0,  dec: -156 },
    { name: "G&A",                    fy: -2691,  pct: -6.0,  dec: -234 },
    { name: "R&D",                    fy: -2243,  pct: -5.0,  dec: -145 },
    { name: "IT",                     fy: -449,   pct: -1.0,  dec: -39 },
    { name: "Other OPEX",             fy: -270,   pct: -0.6,  dec: -25 },
    { name: "Total OPEX",             fy: -6907,  pct: -15.4, dec: -599, bold: true },
    { name: "EBITDA",                 fy: 5741,   pct: 12.8,  dec: 518, bold: true },
    { name: "D&A",                    fy: -1250,  pct: -2.8,  dec: -104 },
    { name: "EBIT",                   fy: 4491,   pct: 10.0,  dec: 414, bold: true },
    { name: "Interest Income",        fy: 98,     pct: 0.2,   dec: 8 },
    { name: "Interest Expense",       fy: -285,   pct: -0.6,  dec: -24 },
    { name: "FX Result",              fy: -42,    pct: -0.1,  dec: -4 },
    { name: "EBT",                    fy: 4262,   pct: 9.5,   dec: 394, bold: true },
    { name: "Tax (15%)",              fy: -312,   pct: -0.7,  dec: -52 },
    { name: "Net Income",             fy: 3950,   pct: 8.8,   dec: 342, bold: true },
  ],
};

const BS = {
  nca: { total: 14800, items: [["Land & Buildings",4250],["Plant & Equipment",8420],["Intangibles",1850],["LT Financial Assets",280]] },
  ca:  { total: 18047, items: [["Raw Materials",2850],["Finished Goods",1980],["WIP",420],["Accounts Receivable",7150],["Other Receivables",797],["Cash",4850]] },
  totalAssets: 32847, totalAssetsPY: 28685,
  equity: { total: 20415, items: [["Share Capital",5000],["Reserves",2850],["Retained Earnings",8615],["Net Income",3950]] },
  ncl: { total: 4005, items: [["LT Loans",3200],["Deferred Tax",485],["Provisions",320]] },
  cl:  { total: 8427, items: [["Accounts Payable",5680],["ST Loans",800],["Payroll Liabilities",1462],["VAT Payable",485]] },
  ratios: [["Current Ratio", (18047/8427).toFixed(2)+"x"],["Equity Ratio",(20415/32847*100).toFixed(1)+"%"],["ROE",(3950/20415*100).toFixed(1)+"%"],["ROA",(3950/32847*100).toFixed(1)+"%"]],
};

const CF = {
  ocf: [["Net Income",3950],["D&A",1250],["Deferred Tax",65],["Provisions",40],["FX Result",42],["Change in AR",-1170],["Change in Inventory",-400],["Change in Other",-92],["Change in AP",1160],["Payroll & Tax",397],["VAT",78]],
  ocfTotal: 5320,
  icf: [["CAPEX Plant & Equipment",-2050],["Intangibles",-150]], icfTotal: -2200,
  fcf: [["LT Loan Repayment",-600],["ST Drawdown",150],["Interest Paid",-285],["Dividends",-1255]], fcfTotal: -1990,
  netChange: 1130, opening: 3720, closing: 4850, freeCashFlow: 3120,
};

const BVA = {
  totals: [
    { name: "Revenue",      bud: 43200,  act: 44850,  fc: 46200 },
    { name: "COGS",         bud: -31320, act: -32202, fc: -33100 },
    { name: "Gross Profit", bud: 11880,  act: 12648,  fc: 13100 },
    { name: "OPEX",         bud: -6696,  act: -6907,  fc: -7050 },
    { name: "EBITDA",       bud: 5184,   act: 5741,   fc: 6050 },
    { name: "Net Income",   bud: 3770,   act: 3950,   fc: 4180 },
  ],
  top10: [
    { rank:1, item:"Revenue - Chassis",     v: 920,  fu:"F", why:"New EUROCAR AG contract Q3",  action:"Maintain capacity",   owner:"Sales Dir",   status:"On track" },
    { rank:2, item:"Direct Materials",      v:-680,  fu:"U", why:"Steel +8% YoY",               action:"Hedging program",     owner:"Procurement", status:"In progress" },
    { rank:3, item:"Revenue - Suspension",  v: 580,  fu:"F", why:"EV demand",                   action:"R&D focus on EV",     owner:"R&D Dir",     status:"On track" },
    { rank:4, item:"R&D",                   v:-243,  fu:"U", why:"Accelerated EV projects",     action:"ROI analysis",        owner:"CFO",         status:"Open" },
    { rank:5, item:"Direct Labor",          v:-228,  fu:"U", why:"Overtime",                    action:"Hire 15 FTE",         owner:"HR Dir",      status:"In progress" },
    { rank:6, item:"G&A",                   v:-191,  fu:"U", why:"ERP implementation",          action:"Complete Q1",         owner:"IT Dir",      status:"In progress" },
    { rank:7, item:"Tooling Revenue",       v: 150,  fu:"F", why:"Engineering services",        action:"Expand team",         owner:"Eng Dir",     status:"On track" },
    { rank:8, item:"Manufacturing OH",      v: 108,  fu:"F", why:"Solar savings",               action:"Hall B rollout",      owner:"Facilities",  status:"Planned" },
    { rank:9, item:"Interest Expense",      v: 35,   fu:"F", why:"Refinancing",                 action:"Done",                owner:"Treasury",    status:"Closed" },
    { rank:10,item:"S&M",                   v:-94,   fu:"U", why:"IAA Munich fair",             action:"ROI review",          owner:"Marketing",   status:"Open" },
  ],
  pvm: [ { name:"Price", v: 610 }, { name:"Volume", v: 890 }, { name:"Mix", v: 150 } ], // = +1,650 revenue variance
};

// 13-week cash forecast Q1 2026. Closing cash exactly per plan. Min cash 3,000.
const CF13 = [
  { w:"W1", open:4850, ar:645, oth:10, ap:-540, pay:-380, tax:0,    capex:-45, loan:-5, close:4535 },
  { w:"W2", open:4535, ar:680, oth:10, ap:-315, pay:0,    tax:-200, capex:-30, loan:0,  close:4680 },
  { w:"W3", open:4680, ar:715, oth:8,  ap:-573, pay:-380, tax:0,    capex:-25, loan:0,  close:4425 },
  { w:"W4", open:4425, ar:890, oth:15, ap:-480, pay:0,    tax:0,    capex:-30, loan:0,  close:4820 },
  { w:"W5", open:4820, ar:660, oth:10, ap:-515, pay:-385, tax:0,    capex:-25, loan:-5, close:4560 },
  { w:"W6", open:4560, ar:830, oth:12, ap:-447, pay:0,    tax:-225, capex:-25, loan:0,  close:4705 },
  { w:"W7", open:4705, ar:700, oth:8,  ap:-553, pay:-385, tax:0,    capex:-25, loan:0,  close:4450 },
  { w:"W8", open:4450, ar:920, oth:15, ap:-292, pay:0,    tax:-208, capex:-30, loan:0,  close:4855 },
  { w:"W9", open:4855, ar:690, oth:10, ap:-540, pay:-390, tax:0,    capex:-25, loan:-5, close:4595 },
  { w:"W10",open:4595, ar:840, oth:12, ap:-447, pay:0,    tax:-230, capex:-30, loan:0,  close:4740 },
  { w:"W11",open:4740, ar:705, oth:8,  ap:-553, pay:-390, tax:0,    capex:-25, loan:0,  close:4485 },
  { w:"W12",open:4485, ar:950, oth:15, ap:-520, pay:0,    tax:0,    capex:-30, loan:0,  close:4900 },
  { w:"W13",open:4900, ar:720, oth:10, ap:-530, pay:-390, tax:0,    capex:-25, loan:-5, close:4680 },
];
const MIN_CASH = 3000;

const AR = {
  total: 7150, dso: 58,
  aging: [ { b:"0-30", v:4180, pct:58.5 }, { b:"31-60", v:1820, pct:25.5 }, { b:"61-90", v:785, pct:11.0 }, { b:"90+", v:365, pct:5.1 } ],
  customers: [
    { name:"EUROCAR AG", country:"DE", total:1670, risk:"LOW",    over90:0,   action:"Standard terms" },
    { name:"AUTOMOTIV FRANCE SAS", country:"FR", total:1245, risk:"MEDIUM", over90:0,   action:"Follow-up call" },
    { name:"CENTRAL AUTO CZ", country:"CZ", total:905,  risk:"HIGH",   over90:120, action:"Collection agency" },
    { name:"NORDIC MOTORS AB", country:"SE", total:810,  risk:"LOW",    over90:0,   action:"Standard terms" },
    { name:"POLISH DRIVE", country:"PL", total:645,  risk:"HIGH",   over90:95,  action:"Credit hold" },
    { name:"IBERICA PARTS", country:"ES", total:625,  risk:"MEDIUM", over90:0,   action:"Payment plan" },
    { name:"HUNGARIAN AUTO Kft", country:"HU", total:410,  risk:"HIGH",   over90:80,  action:"Legal review" },
    { name:"BALKAN MOTORS", country:"RS", total:300,  risk:"LOW",    over90:0,   action:"Standard terms" },
    { name:"DUTCH WHEELS BV", country:"NL", total:290,  risk:"MEDIUM", over90:70,  action:"Dispute resolution" },
    { name:"AUSTRIAN COMPONENTS", country:"AT", total:250,  risk:"MEDIUM", over90:0,   action:"Follow-up email" },
  ],
  provisions: [ { risk:"LOW", base:2780, rate:0, prov:0 }, { risk:"MEDIUM", base:2410, rate:5, prov:121 }, { risk:"HIGH", base:1960, rate:15, prov:294 } ],
  provTotal: 415,
};

const AP = {
  total: 5680, dpo: 52,
  aging: [ { b:"0-30", v:3120 }, { b:"31-60", v:1580 }, { b:"61-90", v:680 }, { b:"90+", v:300 } ],
  suppliers: [
    { name:"STEELWERK GmbH", cat:"Steel (DE)", total:1430, pri:"P1", note:"Critical and late" },
    { name:"ALUMINIUM ITALIA SpA", cat:"Aluminium", total:795, pri:"P2", note:"Strategic" },
    { name:"PLASTIK CZECH", cat:"Plastics", total:650, pri:"P2", note:"2% early payment discount" },
    { name:"ELEKTRO SLOVAKIA", cat:"Electronics", total:550, pri:"P3", note:"Standard" },
    { name:"RUBBER TECH Kft", cat:"Rubber", total:480, pri:"P3", note:"Standard" },
    { name:"TOOLS AUSTRIA", cat:"Tooling", total:410, pri:"P3", note:"Standard" },
    { name:"PACKAGING POLAND", cat:"Packaging", total:385, pri:"P3", note:"Standard" },
    { name:"IT SYSTEMS SERBIA", cat:"IT", total:355, pri:"P2", note:"Strategic" },
    { name:"TRANSPORT LOGISTICS", cat:"Logistics", total:340, pri:"P1", note:"Weekly payment" },
    { name:"ENERGY SERBIA EPS", cat:"Utility", total:285, pri:"P1", note:"Utility" },
  ],
  logic: "P1 critical = pay immediately if over 30 days. P2 strategic = pay at net terms, take discounts. P3 standard = optimize DPO within terms.",
};

const CAPEX = {
  budget: 7400, spent: 6200,
  projects: [
    { id:"CAP-001", name:"Line L1 Automation",     bud:1800, spent:1750, status:"Complete",    roi:22, npv:410, irr:19, payback:3.2 },
    { id:"CAP-002", name:"Line L2 CNC Upgrade",    bud:1200, spent:1180, status:"Complete",    roi:18, npv:280, irr:16, payback:3.8 },
    { id:"CAP-003", name:"Line L3 New 800T Press", bud:2500, spent:1650, status:"DELAYED",     roi:25, npv:690, irr:21, payback:3.5, note:"ETA Feb 2026" },
    { id:"CAP-004", name:"ERP Production Module",  bud:450,  spent:380,  status:"In Progress", roi:15, npv:95,  irr:14, payback:4.1 },
    { id:"CAP-005", name:"Solar Panels Hall A",    bud:850,  spent:820,  status:"Complete",    roi:16, npv:190, irr:15, payback:5.2 },
    { id:"CAP-006", name:"R&D Lab Equipment",      bud:600,  spent:420,  status:"In Progress", roi:14, npv:80,  irr:13, payback:4.5, note:"CFO approval pending" },
  ],
  tiers: [
    ["Under 50K","Dept Mgr + CFO","5 days"],["50-200K","+ COO","10 days"],
    ["200-500K","COO + CEO","15 days"],["Over 500K","CFO + COO + CEO + Board","30 days"],
  ],
};

const PAYROLL = {
  headcount: 423, headcountNov: 419, turnoverCo: 7.8, costPerFTE: 3350,
  depts: [
    { name:"Production", hc:285, to:8.5 }, { name:"Engineering/R&D", hc:42, to:5.2 },
    { name:"Quality", hc:28, to:6.1 }, { name:"Logistics", hc:22, to:12.0 },
    { name:"Finance & Admin", hc:18, to:4.8 }, { name:"Sales & Marketing", hc:15, to:6.7 },
    { name:"IT", hc:8, to:9.5 }, { name:"Management", hc:5, to:0.0 },
  ],
  costs: { grossDec: 892, grossFY: 10450, grossBud: 10200, contribFY: 2090, bonusDec: 285, otherFY: 504, totalFY: 13329, totalBud: 13020 },
};

const TAX = {
  calendar: [
    { item:"Monthly VAT Dec", amount:485, due:"15.01.2026", status:"Pending" },
    { item:"Payroll Tax", amount:155, due:"15.01.2026", status:"Pending" },
    { item:"Social Contributions", amount:332, due:"15.01.2026", status:"Pending" },
    { item:"Monthly VAT Jan", amount:444, due:"15.02.2026", status:"Upcoming" },
    { item:"CIT Advance", amount:36, due:"15.02.2026", status:"Upcoming" },
    { item:"Property Tax", amount:24, due:"15.02.2026", status:"Upcoming" },
    { item:"Annual CIT FY25", amount:312, due:"30.06.2026", status:"Upcoming" },
  ],
  vat: { outputRSD: 91760, inputRSD: 34945, payableRSD: 56815, payableEUR: 485, rate: 117 },
  cit: [["EBT",4262],["Permanent differences",85],["Temporary differences",120],["CAPEX reductions",-350],["Taxable base",4117],["Tax at 15%",312]],
};

const OPS = {
  oee: 84.2, oeeTarget: 85, avail: 92.5, perf: 94.8, qual: 96.1,
  scrap: 1.8, scrapLimit: 2.0, otd: 96.8, otdTarget: 98, ppm: 125, ppmLimit: 150,
  turns: 8.2, turnsTarget: 8, capUtil: 87.5, mtbf: 485, mtbfTarget: 450,
  lti: 0, daysIncidentFree: 245,
  rootCause: "Micro-stoppages on line L1 tool changes. Action: SMED workshop Q1.",
};

const INV = { rm: 2850, fg: 1980, wip: 420, total: 5250, dio: 42, turns: 8.2 };
// 20 SKUs scaled to roll up exactly to 5,250 total inventory.
const SKU_W = [600,540,480,430,390,350,320,290,265,240,220,200,185,170,155,140,125,110,95,80];
const SKUS = (() => {
  const sum = SKU_W.reduce((a,b)=>a+b,0);
  const types = ["RM","FG","RM","FG","RM","WIP","FG","RM","FG","RM","FG","RM","WIP","FG","RM","FG","RM","FG","WIP","FG"];
  const abc = i => i < 5 ? "A" : i < 12 ? "B" : "C";
  const xyz = ["X","Y","X","X","Y","Z","X","Y","X","Z","Y","X","Z","Y","X","Y","Z","Z","Y","Z"];
  let acc = 0;
  return SKU_W.map((w,i) => {
    let v = Math.round(w / sum * INV.total);
    if (i === 19) v = INV.total - acc;
    acc += v;
    const days = [28,35,22,30,45,120,25,52,33,95,48,38,140,60,31,55,88,110,75,160][i];
    return { sku: "SKU-"+String(101+i), type: types[i], value: v, abc: abc(i), xyz: xyz[i], days,
      flag: days > 100 ? "Dead stock risk" : days > 60 ? "Slow mover" : days < 30 ? "Fast mover" : "Normal" };
  });
})();

const BANKS = [
  { name:"Banca Intesa", balance:2100, limit:3000, used:1400 },
  { name:"UniCredit", balance:1650, limit:2500, used:1600 },
  { name:"Raiffeisen", balance:1100, limit:1500, used:1000 },
];
const LOANS = {
  lt: 3200, st: 800,
  register: [
    { bank:"Banca Intesa", type:"LT Investment", out:1800, rate:4.2, maturity:"2029", dscr:2.1, covenant:"OK" },
    { bank:"UniCredit", type:"LT Investment", out:1400, rate:4.5, maturity:"2028", dscr:2.1, covenant:"OK" },
    { bank:"Raiffeisen", type:"ST Working Capital", out:800, rate:5.1, maturity:"2026", dscr:2.1, covenant:"Watch" },
  ],
  lc: 450, bg: 280,
  repay: [ { y:"2026", v:620 }, { y:"2027", v:640 }, { y:"2028", v:980 }, { y:"2029", v:1160 }, { y:"2030+", v:600 } ],
};

const RISKS = [
  { name:"DSO deterioration (52 to 58)", impact:4, likelihood:4, owner:"CFO", deadline:"31.01.2026", action:"Collections task force" },
  { name:"STEELWERK supply delay (12 days)", impact:5, likelihood:3, owner:"Procurement", deadline:"20.01.2026", action:"Dual sourcing" },
  { name:"Steel price +8% YoY", impact:4, likelihood:5, owner:"Procurement", deadline:"28.02.2026", action:"Hedging program" },
  { name:"L3 press CAPEX delay", impact:4, likelihood:4, owner:"COO", deadline:"28.02.2026", action:"Vendor escalation" },
  { name:"Customer concentration (top 3 = 38%)", impact:4, likelihood:2, owner:"Sales Dir", deadline:"31.03.2026", action:"Pipeline diversification" },
  { name:"Capacity near ceiling (87.5%)", impact:3, likelihood:4, owner:"COO", deadline:"28.02.2026", action:"L3 press commissioning" },
  { name:"High-risk AR 1,960 exposure", impact:3, likelihood:3, owner:"Credit Mgr", deadline:"31.01.2026", action:"Credit holds, legal review" },
  { name:"Logistics turnover 12%", impact:2, likelihood:4, owner:"HR Dir", deadline:"31.03.2026", action:"Retention plan" },
  { name:"EUR/RSD FX exposure", impact:2, likelihood:3, owner:"Treasury", deadline:"Ongoing", action:"Natural hedging" },
  { name:"ERP go-live slippage", impact:3, likelihood:2, owner:"IT Dir", deadline:"31.03.2026", action:"Weekly steering" },
];
const OPPS = [
  { name:"EV suspension demand upside", impact:5, likelihood:4 },
  { name:"EUROCAR AG volume expansion", impact:4, likelihood:4 },
  { name:"Solar rollout Hall B savings", impact:3, likelihood:5 },
  { name:"PLASTIK CZECH 2% early pay discount", impact:2, likelihood:5 },
  { name:"Tooling & engineering services growth", impact:3, likelihood:4 },
  { name:"Refinancing ST loan at lower rate", impact:2, likelihood:4 },
  { name:"SMED workshop OEE gain to 85%+", impact:3, likelihood:4 },
  { name:"DSO reduction to 45 frees ~1,600 cash", impact:4, likelihood:3 },
  { name:"ABC-driven inventory cut 300-400", impact:3, likelihood:3 },
  { name:"Serbia energy contract renegotiation", impact:2, likelihood:3 },
];

const DATA_SOURCES = [
  ["ERP General Ledger","Finance","Daily","SQL","Financial reporting","3-way match","Finance","DWH",96,99,"None"],
  ["ERP AR Subledger","Finance","Daily","SQL","Collections","Credit check","Finance","DWH",94,98,"Dispute codes"],
  ["ERP AP Subledger","Finance","Daily","SQL","Payments","3-way match","Finance","DWH",95,99,"None"],
  ["ERP Inventory","Supply Chain","Daily","SQL","Stock control","Cycle counts","SC","DWH",91,96,"Bin locations"],
  ["FP&A Tool","FP&A","Monthly","API","Budget & forecast","4-eye review","FP&A","Cloud",93,97,"Driver notes"],
  ["Treasury System","Treasury","Daily","API","Cash & FX","Bank recon","Treasury","Cloud",97,100,"None"],
  ["Banking Portals","Treasury","Daily","CSV","Balances","Bank recon","Treasury","DWH",92,98,"Value dates"],
  ["HR System","HR","Monthly","API","Headcount","Access control","HR","Cloud",90,95,"Exit reasons"],
  ["Payroll System","HR","Monthly","API","Payroll cost","4-eye review","HR","Cloud",95,99,"None"],
  ["MES","Operations","Hourly","API","Production","Sensor validation","Ops","DWH",88,94,"Downtime codes"],
  ["QMS","Quality","Daily","API","Quality KPIs","Audit trail","Quality","Cloud",92,97,"None"],
  ["CRM","Sales","Daily","API","Pipeline","Dedupe rules","Sales","Cloud",85,90,"Win reasons"],
  ["Procurement System","Procurement","Daily","API","Spend & PPV","PO approval","Procurement","DWH",90,95,"Lead times"],
  ["Tax Portal","Tax","Monthly","Manual","Filings","4-eye review","Tax","DMS",93,98,"None"],
  ["BI Data Warehouse","IT","Daily","SQL","Single source","Lineage checks","IT","DWH",95,98,"None"],
  ["Document Mgmt","Finance","Weekly","Files","Governance docs","Version control","Finance","DMS",87,92,"Review dates"],
  ["Excel Models","FP&A","Ad hoc","XLSX","Scenario models","Peer review","FP&A","SharePoint",75,85,"Assumptions"],
];
const RETENTION = [["Financial records","10 years"],["HR records","Permanent"],["Operational data","5 years"],["Tax filings","10 years"],["Contracts","10 years after expiry"]];

const DOC_CATS = [
  { cat:"Financial Statements", docs:["Annual Financial Statements","Monthly Management Accounts","Consolidated Reporting Pack","Statutory Filings","External Audit Report"] },
  { cat:"Management Reporting", docs:["Board Pack","CFO Monthly Report","KPI Scorecard","Flash Report","Variance Commentary"] },
  { cat:"Planning & Budgeting", docs:["Annual Budget","Rolling Forecast","Strategic Plan","CAPEX Plan"] },
  { cat:"Cash Management", docs:["13-Week Cash Forecast","Bank Reconciliations","Treasury Policy","FX Exposure Report"] },
  { cat:"Working Capital", docs:["AR Aging Report","AP Aging Report","Inventory Report","Working Capital Report"] },
  { cat:"CAPEX & Investments", docs:["CAPEX Register","Investment Papers","Fixed Asset Register","Post-Investment Reviews"] },
  { cat:"Tax & Compliance", docs:["Tax Returns","VAT Returns","Transfer Pricing Documentation","Statutory Compliance Register"] },
  { cat:"Payroll & HR", docs:["Payroll Summary","Headcount Report","Bonus Scheme Documentation","Pension & Benefits Register"] },
  { cat:"Controls, Audit & Policies", docs:["Delegation of Authority","Accounting Policies","SOP Library","Internal Audit Reports","Risk Register","Insurance Register"] },
];
const DOCS = (() => {
  const owners = ["Group Controller","FP&A Manager","Treasury Manager","Tax Manager","HR Director","CFO"];
  const out = [];
  let i = 0;
  DOC_CATS.forEach(c => c.docs.forEach(d => {
    const isTP = d === "Transfer Pricing Documentation";
    const stale = ["Post-Investment Reviews","Treasury Policy","SOP Library"].includes(d);
    out.push({
      cat: c.cat, name: d, owner: owners[i % owners.length],
      freq: ["Monthly","Quarterly","Annual"][i % 3], version: isTP ? "N/A" : "v" + ((i % 4) + 1) + ".0",
      status: isTP ? "MISSING" : stale ? "OUTDATED" : "Approved",
      updated: isTP ? "N/A" : stale ? "Mar 2025" : "Dec 2025",
      next: isTP ? "ASAP" : stale ? "Overdue" : "Q1 2026",
      complete: isTP ? 0 : stale ? 60 : 100,
    });
    i++;
  }));
  return out;
})();

const CONTROLS = [
  { phase:"Collection", input:"Source documents, bank files, timesheets", output:"Validated raw data", control:"Completeness checks", owner:"Accounting", tool:"ERP" },
  { phase:"Validation", input:"Raw data", output:"Clean transactions", control:"3-way match (PO, GRN, invoice)", owner:"AP Team", tool:"ERP" },
  { phase:"Posting", input:"Clean transactions", output:"GL entries", control:"Credit check, approval matrix", owner:"GL Team", tool:"ERP" },
  { phase:"Analysis", input:"GL entries", output:"Variance analysis", control:"Bank reconciliation", owner:"FP&A", tool:"FP&A Tool" },
  { phase:"Reporting", input:"Analysis", output:"Management reports", control:"4-eye review", owner:"Controller", tool:"BI" },
  { phase:"Archive", input:"Final reports", output:"Audit trail", control:"Version control, retention policy", owner:"Finance Admin", tool:"DMS" },
];

const GLVAR = [
  { gl:"COGS - Direct Materials", bud:-19503, act:-20183, v:-680, why:"Steel price +8% YoY" },
  { gl:"COGS - Direct Labor", bud:-6500, act:-6728, v:-228, why:"Overtime in production" },
  { gl:"MOH - Manufacturing Overhead", bud:-5400, act:-5292, v:108, why:"Solar energy savings" },
  { gl:"AOH - G&A Overhead", bud:-2500, act:-2691, v:-191, why:"ERP implementation" },
  { gl:"R&D Expense", bud:-2000, act:-2243, v:-243, why:"Accelerated EV projects" },
  { gl:"SOH - Selling Overhead", bud:-1700, act:-1794, v:-94, why:"IAA Munich trade fair" },
  { gl:"MKOH - Marketing Overhead", bud:-380, act:-350, v:30, why:"Digital shift savings" },
  { gl:"LKOH - Logistics Overhead", bud:-620, act:-590, v:30, why:"Route optimization" },
  { gl:"IT Expense", bud:-636, act:-449, v:187, why:"Delayed license renewals" },
  { gl:"Other OPEX", bud:-400, act:-270, v:130, why:"Insurance rebate" },
  { gl:"Interest / Finance Charge", bud:-320, act:-285, v:35, why:"Refinancing completed" },
];


/* ===== Robot metadata: names, purposes, roles, questions, pre-written insights ===== */
const META = [{"id":"exec","num":1,"name":"CFO Executive Robot","group":"Executive","purpose":"Morning command center with health score, key messages and alerts","role":"the chief financial intelligence agent with a full view of P&L, cash, working capital and risk","questions":["What are my top 3 priorities today?","Why is the health score 78?","Where is cash at risk this quarter?"],"insight":{"summary":"AUTOPARTS NOVA closed FY 2025 with revenue of 44,850 (+8.9% YoY, +3.8% vs budget) and EBITDA of 5,741 at a 12.8% margin. Cash of 4,850 gives 14 weeks of runway. The single red flag is DSO at 58 days against a 45-day target, which traps roughly 1,600 of cash in receivables.","insights":["EBITDA grew 16.1% YoY, nearly twice revenue growth, showing operating leverage","DSO rose 6 days in one month, the fastest deterioration on the board","Steel inflation of +8% YoY cost 680 against budget and is only partly offset","Q1 2026 cash never breaches the 3,000 minimum in the 13-week model"],"interpretation":"Profitability and liquidity are strong. The business is winning on volume and mix (EV suspension demand) but losing discipline in collections and facing input cost pressure.","rootCause":"The DSO jump traces to three HIGH risk customers (CENTRAL AUTO CZ, POLISH DRIVE, HUNGARIAN AUTO) holding 295 in 90+ buckets, plus slower payment behavior in France and Spain.","risks":["DSO trend could force ST borrowing if it reaches 65 days","Steel price momentum may cut gross margin by up to 90 bps in Q1","L3 press delay caps capacity at 87.5% utilization during rising demand"],"opportunities":["Collecting to 45-day DSO frees about 1,600 in cash","SMED workshop can lift OEE above 85% and add roughly 250 EBITDA annualized","Hall B solar rollout can repeat the 108 favorable energy variance"],"recommendations":["Launch a collections task force with weekly CFO review","Close the steel hedging program before the February purchase window","Escalate the L3 press vendor to secure the February delivery date"],"actions":["Approve credit holds on POLISH DRIVE and HUNGARIAN AUTO today","Confirm the 15 January tax payment run of 972","Review the 13-week forecast every Monday"],"forecast":"Q1 2026 revenue is forecast near 11,500 with EBITDA around 1,530 and closing cash of 4,680 in W13, assuming DSO stabilizes at 58 or better.","confidence":86}},{"id":"fpa","num":2,"name":"FP&A Robot","group":"Financial","purpose":"Budget vs actual vs forecast with variance drivers","role":"an expert financial planning and analysis controller","questions":["Why did EBITDA beat budget by 557?","What drives the materials overrun?","Which variances need action this month?"],"insight":{"summary":"FY 2025 EBITDA of 5,741 beat budget by 557 (+10.7%). Favorable revenue of +1,650 more than covered unfavorable COGS (-882) and OPEX (-211). Quality of the beat is high because it is volume and mix led, not one-off.","insights":["Revenue beat is broad: Chassis +920, Suspension +580, Tooling +150","Materials overrun of -680 is fully explained by steel +8% YoY","Labor -228 comes from overtime, a capacity signal rather than a rate problem","OPEX overrun concentrates in R&D (-243), a deliberate EV investment"],"interpretation":"The company converted 34% of its revenue beat into EBITDA. Cost overruns are input-price and growth driven, not control failures.","rootCause":"Steel indexation lag: sales contracts reprice twice a year while steel purchases moved up 8% within the year, creating a squeeze between repricing windows.","risks":["Steel could add another 5% in Q1 before hedges close","Overtime dependence risks quality and turnover in Production"],"opportunities":["Price escalation clauses at the March renewal could recover 300-400","Hiring 15 FTE removes premium overtime cost of roughly 90 per year"],"recommendations":["Approve the hedging program before February purchases","Add steel indexation to the EUROCAR AG renewal","Set an R&D stage-gate with ROI review for EV projects"],"actions":["Close hedge by 28.02 (Procurement)","Hire 15 FTE by 31.03 (HR)","ERP go-live by 31.03 (IT)"],"forecast":"Q1 2026 EBITDA forecast is about 1,530 at a 13.2% margin if steel hedges close on time; downside is 1,420 without hedges.","confidence":84}},{"id":"finstmt","num":3,"name":"Financial Statement Robot","group":"Financial","purpose":"P&L, Balance Sheet and Cash Flow with ratios and walks","role":"an expert financial accountant covering P&L, balance sheet and cash flow","questions":["Walk me from EBITDA to net income","Is the balance sheet getting stronger?","Where did the 1,130 cash increase come from?"],"insight":{"summary":"FY 2025 statements are clean and consistent: Net Income 3,950 flows to equity, the balance sheet balances at 32,847, and the indirect cash flow reconciles opening 3,720 to closing 4,850 (+1,130).","insights":["Equity ratio of 62.2% signals a conservative capital structure","Working capital consumed 1,570 of cash growth (AR -1,170, Inventory -400) before AP relief of +1,160","ROE 19.3% and ROA 12.0% both improved YoY","Dividends of 1,255 were paid while still growing cash"],"interpretation":"The company self-funds growth. Asset growth of 4,162 was financed almost entirely by retained earnings, not debt.","rootCause":"Cash conversion drag comes from receivables: the AR build of 1,170 mirrors the DSO rise from 52 to 58 days.","risks":["AR quality: 415 provision already recognized against 7,150 gross","Deferred tax 485 and provisions 320 are small but should be reviewed at year-end audit"],"opportunities":["Debt capacity of roughly 4,000-5,000 exists at current DSCR if the L3 press or an acquisition needs funding"],"recommendations":["Hold dividend policy near 30% payout while CAPEX program completes","Refinance the ST 800 loan into a cheaper committed facility"],"actions":["Complete year-end audit file by 15.02","Board review of capital structure in March"],"forecast":"FY 2026 net income is projected near 4,180 with equity crossing 24,000 by December 2026.","confidence":90}},{"id":"sales","num":4,"name":"Sales Performance Robot","group":"Commercial","purpose":"Sales trend, mix, concentration and Pareto","role":"an expert commercial and revenue analyst","questions":["Which customers drive 80% of revenue?","How risky is customer concentration?","What is the price volume mix story?"],"insight":{"summary":"Sales of 44,850 grew 8.9% YoY and beat budget by 3.8%. Growth is mix-rich: Suspension (EV demand) grew fastest while Chassis added the largest absolute gain from the EUROCAR AG contract.","insights":["Top 3 customers hold about 38% of revenue, an amber concentration level","December was the strongest month at 3,920","Price contributed +610, volume +890 and mix +150 of the +1,650 beat","Tooling & Engineering at 10% of revenue carries the highest margin"],"interpretation":"Demand is healthy and pricing is holding. The book is tilted toward German and French OEMs, which is stable but concentrated.","rootCause":"Concentration grew because EUROCAR AG volumes scaled faster than the rest of the book after the Q3 contract win.","risks":["Loss of any top-3 customer would remove 11-14% of revenue","Two HIGH credit-risk customers (POLISH DRIVE, CENTRAL AUTO CZ) sit inside the top 7 by revenue"],"opportunities":["EV suspension platform can add 1,500-2,000 in FY 2026","Nordic and Iberian accounts have room to double from a low base"],"recommendations":["Set a 35% ceiling policy for top-3 concentration","Link sales credit terms to the AR risk grades before Q2 negotiations"],"actions":["Pipeline review for 3 new EV platform RFQs by 15.02","Joint credit-sales committee on POLISH DRIVE this month"],"forecast":"Q1 2026 sales forecast is about 11,500 (+6% vs Q1 2025) driven by suspension volumes; full year 46,200.","confidence":83}},{"id":"inventory","num":5,"name":"Inventory Intelligence Robot","group":"Commercial","purpose":"Inventory value, ABC/XYZ, aging and stock risk","role":"an expert inventory and supply planning analyst","questions":["Where is my dead stock?","Which SKUs should we cut first?","Is inventory sized right for the demand?"],"insight":{"summary":"Inventory of 5,250 turns 8.2 times per year with DIO of 42 days, ahead of the 8.0 target. Composition is healthy but roughly 640 sits in slow or dead stock buckets that deserve action.","insights":["A-class SKUs (top 5) carry about 46% of value and all turn fast","Three SKUs exceed 100 days on hand and are dead stock candidates","Raw materials at 2,850 include a strategic steel buffer built before price increases","WIP at 420 (8%) indicates smooth flow"],"interpretation":"The steel buffer was a smart pre-buy given +8% price inflation, but FG slow movers tie up cash without a demand signal.","rootCause":"Slow movers trace to a discontinued chassis variant and conservative safety stock settings never revisited after the 2024 demand model change.","risks":["Dead stock write-down risk of 80-120 if not moved in two quarters","Stock-out risk on 2 fast movers if L3 press delay extends"],"opportunities":["Cutting C/Z class stock frees 300-400 cash at no service risk","Dynamic safety stock could cut DIO by 3 days (about 370 cash)"],"recommendations":["Run a slow-mover clearance program with Sales in Q1","Recalculate safety stock and reorder points on the top 50 SKUs"],"actions":["List the 3 dead-stock SKUs for clearance pricing by 31.01","Set quarterly ABC/XYZ refresh in the planning calendar"],"forecast":"DIO forecast for Q1 2026 is 41-43 days; clearance actions could reach 39 days by June.","confidence":81}},{"id":"procurement","num":6,"name":"Procurement Robot","group":"Commercial","purpose":"Spend, supplier performance, PPV and lead time risk","role":"an expert procurement and supplier risk analyst","questions":["Which supplier is my biggest risk?","What did steel inflation cost us?","Where can procurement save cash?"],"insight":{"summary":"Procurement spend is concentrated: STEELWERK alone holds 25% of AP and is running 12 days late while steel prices rose 8% YoY, costing 680 against budget. Supply risk and price risk sit with the same vendor.","insights":["Import share of 72% creates FX and logistics exposure","PLASTIK CZECH offers a 2% early-payment discount worth about 13 per cycle","Three suppliers (STEELWERK, TRANSPORT, ENERGY) are P1 critical","Lead time variance is the top driver of safety stock cost"],"interpretation":"The steel position is the single largest controllable margin lever for FY 2026.","rootCause":"Single-sourcing of steel was priced attractively in 2023 but left no leverage when the market tightened and the vendor deprioritized mid-size accounts.","risks":["A STEELWERK stoppage would halt chassis lines within 3 weeks","Further steel inflation of 5% would cost about 250 in Q1 alone"],"opportunities":["Dual-sourcing steel could recover 200-300 annually and cut lead time risk","Early-payment discounts across P2 vendors are worth 40-60 per year"],"recommendations":["Qualify a second steel supplier by end of Q1","Close the hedge for 60% of FY 2026 steel volume","Take the PLASTIK CZECH discount every cycle"],"actions":["Steel RFQ to 3 alternative mills by 31.01","Weekly expediting call with STEELWERK until delivery normalizes"],"forecast":"Q1 material cost forecast assumes steel +3% QoQ without hedging; with hedges closed the impact is near zero.","confidence":82}},{"id":"treasury","num":7,"name":"Treasury Robot","group":"Treasury","purpose":"Cash, liquidity, FX and debt maturity","role":"an expert corporate treasurer","questions":["How safe is our liquidity position?","What is our FX exposure?","When does debt mature?"],"insight":{"summary":"Treasury is in a comfortable position: cash of 4,850 sits 62% above the 3,000 minimum, runway is 14 weeks and the 13-week model shows no breach. Net interest cost of 187 is modest for a 4,000 debt book.","insights":["Cash conversion ratio of 0.92 is excellent for a manufacturer","Debt matures smoothly with the 2029 peak at 1,160","Cash is diversified across 3 banks with the largest at 2,100","FX risk is structurally low due to EUR invoicing"],"interpretation":"Liquidity strength gives the CFO options: fund the L3 press internally, prepay expensive debt, or hold a buffer against steel volatility.","rootCause":"The runway improvement from 12 to 14 weeks came from the strong December collections and the ST drawdown of 150.","risks":["Floating rate on ST 800 exposes about 8 per year per 100 bps","A DSO slip to 65 days would cut runway by roughly 2 weeks"],"opportunities":["Refinancing the ST loan could save 15-20 annually","Excess cash above 4,500 could earn about 40 per year in deposits"],"recommendations":["Ladder deposits on excess cash above the buffer","Convert ST facility to committed revolving line at better pricing"],"actions":["Negotiate deposit rates with all 3 banks by 15.02","Quarterly covenant self-test before bank reporting"],"forecast":"Closing cash for Q1 2026 is forecast at 4,680 with a low of 4,425 in W3, always above minimum.","confidence":91}},{"id":"banking","num":8,"name":"Banking Robot","group":"Treasury","purpose":"Bank balances, facilities, loans and covenants","role":"an expert bank relationship and debt manager","questions":["Are we close to any covenant limits?","Which facility has headroom?","Should we refinance anything?"],"insight":{"summary":"Banking relationships are healthy: 4,850 cash across three banks, 57% facility utilization and DSCR of 2.1x against a 1.3x covenant. The only watch item is the Raiffeisen short-term line priced at 5.1% floating.","insights":["The company is net cash positive (cash 4,850 vs debt 4,000)","UniCredit line is 64% utilized, the highest of the three","LC and BG usage of 730 is routine trade finance","All hard covenants pass with wide headroom"],"interpretation":"With net cash and strong DSCR, the company holds pricing power over its banks and should use it.","rootCause":"The ST facility was drawn opportunistically in Q4 for the steel pre-buy; its floating rate is now the most expensive money in the book.","risks":["Rate rises would hit the 800 floating ST loan first","Concentration of operating accounts at Banca Intesa creates settlement dependency"],"opportunities":["Refinancing ST 800 into the LT book could save 15-20 per year","Competitive tension: invite a fourth bank to quote on the revolver"],"recommendations":["Run a facility repricing round in Q1 using the net cash position","Standardize covenant reporting into a quarterly pack"],"actions":["Request refinancing term sheets by 31.01","Annual bank strategy review with CFO in February"],"forecast":"Debt falls to about 3,380 by December 2026 on schedule; interest expense drops toward 240.","confidence":88}},{"id":"wc","num":9,"name":"Working Capital Robot","group":"Working Capital","purpose":"DSO, DPO, DIO, CCC and the working capital bridge","role":"an expert working capital and cash conversion analyst","questions":["Why did CCC improve while DSO got worse?","How much cash is trapped in working capital?","What moves the needle fastest?"],"insight":{"summary":"Working capital of 9,620 supports a CCC of 48 days, inside the 55-day target. But the composition is unhealthy: the CCC held only because DPO stretched to 52 while DSO deteriorated to 58 against a 45-day target.","insights":["Roughly 1,600 of cash is trapped by the 13-day DSO gap to target","AP relief of +1,160 funded most of the AR build of -1,170 in FY 2025","DIO at 42 is the best-performing component","CCC improved 4 days MoM purely on payables timing"],"interpretation":"Paying suppliers slower to fund slow-paying customers is a fragile equilibrium, especially with STEELWERK already unhappy about delays.","rootCause":"Root cause is collections discipline: three HIGH-risk customers hold 295 in 90+ aging while credit limits were not enforced during the growth push.","risks":["DPO above 55 would start damaging P1 supplier relationships","If DSO hits 65, roughly 860 more cash gets trapped"],"opportunities":["Every DSO day recovered releases about 123 of cash","Supply chain financing could hold DPO benefits without vendor pain"],"recommendations":["Enforce credit holds per the AR robot list","Set collections targets per account manager with monthly review","Explore reverse factoring for P1 suppliers"],"actions":["Collections task force kickoff this week","DSO bridge review at month-end close"],"forecast":"CCC forecast for Q1 2026 is 46-50 days; the collections program targets DSO of 52 by March and 45 by June.","confidence":85}},{"id":"ar","num":10,"name":"AR Collection Robot","group":"Working Capital","purpose":"AR aging, customer risk, provisions and collection priorities","role":"an expert credit and collections analyst","questions":["Who should we call first this week?","Is the 415 provision enough?","What will we collect in the next 4 weeks?"],"insight":{"summary":"AR of 7,150 carries a DSO of 58 days, 13 days above target. The book splits cleanly: 58.5% is current, but 1,960 sits with three HIGH-risk customers who hold 295 of the 365 in the 90+ bucket. Provisions of 415 cover the statistical risk but not a full default.","insights":["CENTRAL AUTO CZ (905, 120 in 90+) is already with a collection agency","POLISH DRIVE is on credit hold with 95 in 90+","EUROCAR AG, the largest balance at 1,670, is LOW risk and current","Collection forecast of 2,930 for the next 4 weeks matches the cash model"],"interpretation":"This is a concentrated collections problem, not a systemic one. Ten focused calls fix most of it.","rootCause":"Credit limits were relaxed during the 2025 growth push and never re-tightened; the three problem accounts all breached limits in Q3 without escalation.","risks":["HUNGARIAN AUTO (410, legal review) may require a 60+ provision top-up","A CENTRAL AUTO default would cost up to 770 net of provision"],"opportunities":["Recovering half the 90+ bucket releases about 180 cash immediately","Credit insurance on MEDIUM accounts would cap tail risk for about 25 per year"],"recommendations":["Weekly CFO-level review of the top 5 overdue accounts","Automate dunning at 30/45/60 days","Tie new orders to overdue status for HIGH-risk accounts"],"actions":["Call CENTRAL AUTO CZ and POLISH DRIVE today","Legal letter to HUNGARIAN AUTO by 20.01","Dispute resolution meeting with DUTCH WHEELS this week"],"forecast":"With the action list executed, DSO is forecast to fall to 52 by March and the 90+ bucket to halve by end of Q1.","confidence":87}},{"id":"ap","num":11,"name":"AP Payment Robot","group":"Working Capital","purpose":"AP aging, payment priorities and cash preservation","role":"an expert accounts payable and cash disbursement strategist","questions":["Who must be paid this week?","Which discounts should we take?","How far can we stretch DPO safely?"],"insight":{"summary":"AP of 5,680 at a DPO of 52 days sits comfortably in the 45-55 policy band. The priority logic is clear: pay the three P1 critical vendors (2,055 exposure) on time, capture the PLASTIK CZECH 2% discount, and optimize the P3 tail.","insights":["STEELWERK holds 1,430 and is both critical and already late on deliveries","300 of AP is 90+ aged, mostly P3 vendors, a manageable relationship risk","The 2% PLASTIK discount beats any deposit rate available on cash","Payment calendar shows W1 and W3 as heavy weeks (540 and 573)"],"interpretation":"AP is being used correctly as a financing lever, but the STEELWERK relationship needs care given supply dependence.","rootCause":"The 90+ bucket grew because payment runs were skipped in December to window-dress year-end cash; those invoices are now overdue.","risks":["Stretching STEELWERK further risks supply priority on a constrained mill","Late-payment interest clauses could trigger on 90+ balances"],"opportunities":["Dynamic discounting with P2 vendors could yield 40-60 per year","Consolidating payment runs to twice weekly saves processing cost"],"recommendations":["Pay all P1 over-30-day balances immediately per policy","Take every early-payment discount with cash above minimum","Clear the 90+ P3 tail within two payment runs"],"actions":["STEELWERK payment plus expediting call this week","Enroll PLASTIK CZECH in standing early-pay by 31.01"],"forecast":"DPO is forecast to hold at 50-53 days in Q1 2026. Paying down the 90+ tail costs 300 cash, already in the 13-week model.","confidence":86}},{"id":"cash13","num":12,"name":"Cash Forecast Robot","group":"Treasury","purpose":"13-week cash forecast with funding gap alerts","role":"an expert short-term cash forecasting analyst","questions":["Which week is the tightest?","What breaks the minimum cash line?","How reliable were past forecasts?"],"insight":{"summary":"The 13-week model shows Q1 2026 cash swinging between 4,425 (W3) and 4,900 (W12), never approaching the 3,000 minimum. Net Q1 flow is -170 as CAPEX and the January tax cluster slightly outpace collections.","insights":["W3 is the tightest week: heavy AP run of 573 plus payroll 380","Month-end collection peaks (W4 890, W8 920, W12 950) refill the position reliably","The 15th tax cluster (VAT + payroll taxes) takes about 200-230 in W2, W6, W8, W10","Total loan repayment of 20 is immaterial this quarter"],"interpretation":"The rhythm is stable: cash dips mid-month and recovers at month-end. Headroom above minimum never falls below 1,425.","rootCause":"The slight Q1 net outflow is seasonal: January carries the December VAT (485 total tax cluster) while Q1 collections reflect slower post-holiday invoicing.","risks":["A one-week slip of a month-end collection peak would cut the trough by up to 900, still above minimum","DSO deterioration is the main scenario risk to W6-W13 collections"],"opportunities":["The stable surplus supports early-payment discounts worth 40-60 per year","Excess above 4,500 could be swept into deposits mid-week"],"recommendations":["Hold a weekly Monday cash call using this grid","Add a 10% collections haircut scenario to the pack"],"actions":["Confirm the W2 tax payment funding today","Re-forecast every Friday with actuals"],"forecast":"Closing cash of 4,680 for W13 is high confidence; the range under stress scenarios is 3,900 to 5,000.","confidence":89}},{"id":"tax","num":13,"name":"Tax Compliance Robot","group":"Governance","purpose":"Tax calendar, VAT, CIT and compliance status","role":"an expert tax compliance manager for Serbian and EU rules","questions":["What is due on 15 January?","Explain the CIT build-up","Any tax risks I should know about?"],"insight":{"summary":"Tax compliance is current with no open filings or audits. The near-term event is the 15 January cluster of 972 (VAT 485, payroll tax 155, social contributions 332), already reflected in the W2 cash forecast.","insights":["CAPEX incentives cut the taxable base by 350, saving about 53 of CIT","Effective tax rate of 7.3% on EBT is favorable versus the 15% statutory rate","VAT position is structurally payable due to EU export invoicing dynamics","Annual CIT of 312 is due 30 June with advances of 36 monthly from February"],"interpretation":"The tax profile is low risk and well managed; the CAPEX relief program is the key optimization to protect.","rootCause":"The low effective rate comes from investment incentives on the L1/L2 automation projects; documentation must survive audit scrutiny.","risks":["Transfer pricing documentation is MISSING per the Documentation robot, a real exposure for intercompany service fees","RSD depreciation would raise the EUR value of RSD-denominated liabilities"],"opportunities":["Remaining L3 press CAPEX can extend tax relief into FY 2026","R&D super-deduction may apply to the EV program, worth up to 30-40"],"recommendations":["Commission transfer pricing documentation immediately","Review the EV R&D program for super-deduction eligibility"],"actions":["Fund the 15.01 payment run of 972 (confirmed in cash model)","TP documentation engagement letter by 31.01"],"forecast":"FY 2026 cash taxes are forecast near 700 total including CIT advances, VAT and payroll taxes trending with volume.","confidence":84}},{"id":"capex","num":14,"name":"CAPEX Robot","group":"Governance","purpose":"Project register, approvals, ROI and budget tracking","role":"an expert capital investment controller","questions":["Why is the L3 press delayed?","Which project has the best ROI?","How much budget is left?"],"insight":{"summary":"The 7,400 CAPEX program is 84% deployed with three projects complete and healthy returns (portfolio IRR 16.3%). The critical path issue is CAP-003, the 800T press for line L3, delayed to February 2026 with 850 still to spend.","insights":["L3 press carries the highest IRR (21%) and unblocks the capacity ceiling at 87.5% utilization","Solar Hall A already delivers the +108 energy variance seen in FP&A","CAP-006 R&D Lab (420 of 600 spent) awaits CFO approval to continue","Completed projects landed within 3% of budget, strong execution"],"interpretation":"Execution quality is high; the portfolio problem is concentration of remaining value in one delayed vendor delivery.","rootCause":"The press vendor reprioritized a larger order; contract lacked delivery penalty teeth beyond token amounts.","risks":["Each month of L3 delay costs roughly 60-80 of contribution from lost capacity","Q1 cash already reserves 370 for CAPEX; slippage moves it to Q2"],"opportunities":["Commissioning L3 lifts capacity ceiling and supports the EV volume upside","Tax relief on remaining CAPEX extends the low effective tax rate"],"recommendations":["Escalate to press vendor executive level with a February hard date","Approve CAP-006 completion, its 13% IRR still beats hurdle","Add delivery penalties to all future CAPEX contracts"],"actions":["Vendor escalation call by 20.01 (COO)","CAP-006 approval decision at next CFO review"],"forecast":"Program completes by June 2026 at a forecast final cost of 7,350, marginally under budget.","confidence":85}},{"id":"payroll","num":15,"name":"Payroll Analytics Robot","group":"Operations","purpose":"Aggregated headcount, payroll cost and productivity. No personal data.","role":"an expert HR controlling analyst working only with aggregated data","questions":["Why is payroll over budget?","Where is turnover highest?","What is revenue per FTE?"],"insight":{"summary":"Payroll of 13,329 FY ran 2.4% (309) over budget on a headcount of 423. The overrun is overtime driven, matching the Direct Labor variance of -228 in FP&A. All data is aggregated; no personal information is processed.","insights":["Production (285 FTE) absorbs the overtime burden from capacity constraints","Logistics turnover of 12% is the outlier, well above the 7.8% company average","Cost per FTE of 3,350 per month is competitive for the region","Revenue per FTE of 106 per year improved 5% YoY"],"interpretation":"The business is understaffed for its volume, paying overtime premium instead of base salaries. That is more expensive and risks fatigue.","rootCause":"The approved plan to hire 15 production FTE lagged because the local labor market tightened; overtime filled the gap at a 50% premium.","risks":["Sustained overtime raises quality and safety risk on the lines","Logistics churn adds hidden training and error costs of roughly 30-40 per year"],"opportunities":["Hiring 15 FTE removes about 90 per year of overtime premium","A logistics retention package would cost less than current churn"],"recommendations":["Accelerate the 15-FTE hiring plan with a referral bonus","Run a stay-interview program in Logistics this quarter"],"actions":["Approve referral bonus scheme by 31.01 (HR)","Monthly overtime report to CFO from February"],"forecast":"FY 2026 payroll is budgeted at 13,900 including the 15 new FTE; overtime should normalize by Q2.","confidence":83}},{"id":"mfg","num":16,"name":"Manufacturing Performance Robot","group":"Operations","purpose":"OEE, quality, capacity and production performance","role":"an expert manufacturing performance analyst","questions":["What is holding OEE below target?","Are we at capacity?","How is quality trending?"],"insight":{"summary":"OEE of 84.2% sits 0.8 points below the 85% target, with availability (92.5%) as the weak component. Quality is strong (96.1%, PPM 125) and safety is exemplary at 245 days incident-free. Capacity at 87.5% is close to the ceiling.","insights":["Micro-stoppages on L1 tool changes are the single largest OEE detractor","MTBF of 485 hours beats the 450 target, so breakdowns are not the issue","Scrap at 1.8% is comfortably within the 2.0% limit","The plant runs near capacity, making every OEE point worth real revenue"],"interpretation":"This is a changeover problem, not a reliability problem. SMED is exactly the right lever.","rootCause":"Tool change time on L1 averages 42 minutes against a 25-minute benchmark; the sequence includes external steps done while the line is stopped.","risks":["At 87.5% utilization, any unplanned downtime directly cuts deliverable volume","OTD at 96.8% vs 98% target is a symptom of the capacity squeeze"],"opportunities":["SMED workshop can recover about 1.5 OEE points, worth roughly 250 EBITDA annualized","L3 press commissioning adds headroom and protects OTD"],"recommendations":["Run the SMED workshop on L1 in Q1 as planned","Move external tool-prep steps off the critical path immediately"],"actions":["SMED kickoff by 25.01 (Plant Manager)","Weekly OEE review with line leads"],"forecast":"OEE forecast reaches 85.5% by April after SMED; with L3 live, capacity utilization normalizes to 82-84%.","confidence":87}},{"id":"opskpi","num":17,"name":"Operations KPI Robot","group":"Operations","purpose":"One KPI library with traffic lights across all groups","role":"an expert cross-functional KPI analyst","questions":["Which KPIs are red right now?","How is supply chain performing?","Show me the safety record"],"insight":{"summary":"Of 24 tracked KPIs, 18 are green, 4 amber and 2 red. The red items (DSO 58 days and steel purchase price variance) are both financial, while operations run consistently well: OEE 84.2%, scrap 1.8%, PPM 125 and a 245-day incident-free safety record.","insights":["The amber cluster (OEE, OTD, capacity, turnover) shares one root: the plant is running too close to its ceiling","Working Capital is the only group with red status","Safety performance is best-in-class for the sector","Every manufacturing KPI improved or held versus prior month"],"interpretation":"Operational execution is not the problem; cash discipline and capacity are. The KPI library points investment and management attention to collections and the L3 press.","rootCause":"OTD misses trace to capacity constraints, not process failures: orders queue when utilization exceeds 87%.","risks":["OTD below 96% would trigger OEM scorecards penalties at two customers","Sustained 12% Logistics turnover threatens shipping accuracy"],"opportunities":["Closing the OEE gap to 85% adds capacity equal to about 350 of revenue per year","L3 press relieves the OTD and capacity ambers simultaneously"],"recommendations":["Keep the KPI library as the single agenda for the monthly ops review","Assign one owner per amber KPI with a dated action"],"actions":["Publish January KPI pack by day 5","DSO action review weekly until green"],"forecast":"By Q2 2026, OEE and OTD are forecast green after SMED and L3 commissioning; DSO recovery is the main watch item.","confidence":88}},{"id":"risk","num":18,"name":"Risk Monitoring Robot","group":"Governance","purpose":"Risk heat map, anomalies, fraud signals and action tracking","role":"an expert enterprise risk manager","questions":["What are the top 3 risks by score?","Any anomalies in the data?","What fraud checks are running?"],"insight":{"summary":"The register tracks 10 risks and 10 opportunities. Three risks score 16 or higher: steel price inflation (20), STEELWERK supply delay (15 but critical impact) and the DSO deterioration (16). Anomaly detection flagged the December DSO jump as the sharpest movement in the dataset.","insights":["Procurement owns 2 of the top 3 risks, both steel related","Opportunity upside (EV demand, scored 20) exceeds the largest risk exposure","Fraud checks are demo placeholders: duplicate invoices and weekend postings, both clean","8 mitigation actions are open, all with owners and deadlines"],"interpretation":"Risk concentration around one supplier and one customer behavior pattern means two focused programs cover most of the exposure.","rootCause":"The common root is growth outpacing controls: credit limits, supplier redundancy and capacity buffers were all sized for a smaller company.","risks":["Simultaneous steel shock and a top-3 customer default is the worst plausible combination, costing up to 1,700","Action fatigue: 8 open items across 6 owners needs tracking discipline"],"opportunities":["EV platform upside could add 1,500-2,000 revenue in FY 2026","Dual sourcing removes the single largest operational risk"],"recommendations":["Run the risk committee monthly until the top 3 scores fall below 12","Add a combined stress scenario to the Q1 board pack"],"actions":["Steel hedge closure by 28.02","Collections task force review every Monday"],"forecast":"With mitigations on track, the average risk score falls from 10.4 to about 8 by end of Q2 2026.","confidence":82}},{"id":"controls","num":19,"name":"Internal Controls Robot","group":"Governance","purpose":"Process map, control matrix and segregation of duties","role":"an expert internal controls and audit specialist","questions":["Which controls protect the P2P cycle?","Any segregation of duties gaps?","How strong is the audit trail?"],"insight":{"summary":"The control environment covers 6 phases from data collection to archive, each with a named key control, owner and system. The framework passed its last audit clean. One segregation-of-duties conflict is open: an AP clerk holds vendor-creation rights.","insights":["3-way match protects the full purchase-to-pay cycle","4-eye review gates every management report before release","Bank reconciliation runs daily, not monthly, a strong practice","The ERP production module (CAP-004) will automate two manual controls"],"interpretation":"Controls are proportionate to company size with no over-engineering. The SoD gap is the only real finding.","rootCause":"The SoD conflict appeared when a team member left and rights were consolidated temporarily; the temporary fix became permanent.","risks":["Vendor-create plus payment rights is the classic fraud-enabling combination","Manual controls in Excel models (per Data Governance) lack systematic review"],"opportunities":["ERP go-live in Q1 can absorb the manual control steps","A quarterly access-rights recertification would prevent future SoD drift"],"recommendations":["Remove vendor-create rights from the AP role this week","Start quarterly user-access reviews from Q1"],"actions":["SoD fix by 20.01 (IT + Finance)","Access recertification calendar approved by 31.01"],"forecast":"Control environment rated strong; after the SoD fix and ERP go-live, residual control risk is low for FY 2026.","confidence":90}},{"id":"datagov","num":20,"name":"Data Governance Robot","group":"Governance","purpose":"Data source catalogue, quality and retention","role":"an expert data governance and quality manager","questions":["Which sources have quality issues?","What is stale right now?","How long do we keep financial data?"],"insight":{"summary":"17 data sources are catalogued with an average quality score of 91 and completeness of 95.9%. Two sources are flagged: Excel Models (quality 75, the weakest link) and Document Management (87, stale review dates).","insights":["The BI warehouse consolidates 9 daily-refreshed feeds into one reporting layer","Excel scenario models carry critical FP&A logic with only peer review as control","CRM completeness of 90% is the lowest of any operational system","Retention policies exist for all five record classes"],"interpretation":"The governed core (ERP, Treasury, Payroll) is enterprise grade. The risk lives at the edges: spreadsheets and documents.","rootCause":"Excel model weakness is structural: assumptions live in cells without validation, versioning or lineage, a common mid-market gap.","risks":["A broken Excel model could silently distort the forecast the board sees","Missing dispute codes in AR data slow collection root-cause work"],"opportunities":["Moving the 3 core Excel models into the FP&A tool lifts quality to 90+","MCP connectivity (planned) would replace manual CSV bank imports"],"recommendations":["Migrate the top 3 Excel models to the FP&A tool in H1","Add dispute codes to the AR interface specification"],"actions":["Model migration scoping by 15.02 (FP&A + IT)","Quarterly data quality review starting Q1"],"forecast":"Average quality score is forecast to reach 93 by mid-2026 after the Excel migration and ERP module go-live.","confidence":85}},{"id":"docs","num":21,"name":"Documentation Robot","group":"Governance","purpose":"The 40-document CFO checklist with completeness tracking","role":"an expert finance documentation and governance manager","questions":["What documents are missing?","What is overdue for review?","How complete is each category?"],"insight":{"summary":"36 of 40 governance documents are approved and current (93.5% average completeness). One document is missing entirely: Transfer Pricing Documentation, a genuine compliance exposure. Three documents are overdue for review.","insights":["Transfer Pricing gap matters because intercompany service fees exist with the German sales entity","Treasury Policy and SOP Library were last reviewed in March 2025","All statutory filings and audit documents are complete","The Q1 review wave covers 12 documents including the board pack templates"],"interpretation":"Documentation health is strong for a company this size; the missing TP file is the one item with regulatory teeth.","rootCause":"TP documentation was deprioritized in 2024 when intercompany volumes were immaterial; they no longer are.","risks":["A tax inspection could assess penalties without TP documentation in place","Outdated SOPs weaken the internal controls story at the next audit"],"opportunities":["A TP master file plus local file engagement costs about 15-20, far below penalty risk","Document automation in the DMS could cut review effort by half"],"recommendations":["Engage TP advisors immediately","Bundle the 3 outdated documents into a single February review sprint"],"actions":["TP engagement letter signed by 31.01 (Tax Mgr)","Review sprint completed by 28.02 (owners assigned)"],"forecast":"Register forecast: 40 of 40 current by end of Q1 2026 if the TP engagement starts this month.","confidence":88}},{"id":"forecast","num":22,"name":"Forecasting Robot","group":"Financial","purpose":"Q1 2026 forward view with live scenario simulator","role":"an expert financial forecasting and scenario modeling analyst","questions":["What happens if revenue drops 8%?","How sensitive is EBITDA to steel?","How accurate were past forecasts?"],"insight":{"summary":"The base case for Q1 2026 is revenue of 11,500, EBITDA of 1,530 (13.3% margin) and closing cash of 4,680. Rolling forecast accuracy of 96.2% with a slight conservative bias gives high confidence in the range.","insights":["The best case (+5% revenue) lifts Q1 EBITDA to about 1,690","The worst case (-8% revenue, steel +5%) still keeps cash above minimum at roughly 4,100","Revenue is the largest sensitivity at +/-161 EBITDA per 5% move","Steel is the largest cost-side sensitivity at +/-126 per 5%"],"interpretation":"Even the worst case is survivable without external funding, which is the key strategic message for the board.","rootCause":"Forecast misses cluster around customer timing (pull-ins and push-outs), not demand level, suggesting order-book integration would improve accuracy most.","risks":["A combined worst case plus DSO slip to 65 would take cash to about 3,600, still above minimum but uncomfortable","Model relies on Excel inputs flagged by Data Governance"],"opportunities":["Adding EV platform wins could push FY 2026 revenue toward 49,500","Hedged steel would cut the cost sensitivity nearly in half"],"recommendations":["Integrate the OEM order book feed into the forecast model","Present the three cases with cash floors at the February board meeting"],"actions":["Publish Q1 reforecast by 10.02","Scenario review with CFO monthly"],"forecast":"FY 2026 base forecast: revenue 48,500, EBITDA 6,400 at 13.2%, closing cash near 6,000 before dividends.","confidence":84}},{"id":"glvar","num":23,"name":"GL Variance Robot","group":"Financial","purpose":"Top GL variances against budget by cost category","role":"an expert general ledger and cost variance analyst","questions":["Which GL line is furthest from budget?","Explain the overhead variances","Where should cost control focus?"],"insight":{"summary":"Across 11 GL cost categories, unfavorable variances of -1,436 outweigh favorable ones of +490 for a net cost overrun of -946, absorbed by the +1,650 revenue beat. Direct Materials (-680) dominates, followed by R&D (-243) and Direct Labor (-228).","insights":["The three overhead pools (MOH, MKOH, LKOH) are all favorable, +168 combined, showing good indirect cost control","IT's +187 saving is timing, not structural: renewals land in Q1 2026","Interest/finance charge came in +35 favorable after refinancing","Every unfavorable line already has an owner via the FP&A top-10 list"],"interpretation":"Direct cost inflation is the story; indirect discipline is intact. This is a procurement and pricing problem, not a spending culture problem.","rootCause":"Materials variance is 100% price driven (steel +8%); volumes actually helped because fixed overhead absorbed better at higher output.","risks":["IT saving reverses in Q1 when renewals hit","R&D run-rate suggests FY 2026 needs a bigger budget or scope decision"],"opportunities":["Steel hedging converts the biggest overrun into a controlled cost","Logistics route optimization (+30) can scale with a TMS investment"],"recommendations":["Rebase the FY 2026 budget for steel at current market plus hedge","Set a formal R&D envelope with quarterly gates"],"actions":["Budget rebase proposal by 15.02 (FP&A)","Hedge program closure by 28.02 (Procurement)"],"forecast":"With hedges in place, FY 2026 GL variances are forecast within +/-1.5% of budget per category.","confidence":86}},
{"id":"yield","num":24,"name":"Yield Analysis Robot","group":"Financial","purpose":"Price vs Volume decomposition of revenue change, by SKU","role":"an expert revenue yield and pricing analyst","questions":["Is our revenue growth price-led or volume-led?","Which SKUs hurt yield the most?","Which SKUs are the best yield story this range?"],"insight":{"summary":"This view is fed live from iBOS sales order data for the selected company and date range. Click Generate AI Insights above for a fresh read on the current price/volume split.","insights":["Price and Volume effects are computed per SKU against the same date range last year","New SKUs show up as pure volume gain; discontinued SKUs as pure volume loss","Use the company and date filters at the top to change scope"],"interpretation":"Interpretation updates once AI insights are generated against the live data currently loaded.","rootCause":"Not yet analyzed for the current range -- generate insights to get a live root-cause read.","risks":["Concentration in a small number of SKUs driving most of the yield swing"],"opportunities":["Repricing or volume actions on the SKUs with the largest negative net effect"],"recommendations":["Generate AI insights after reviewing the top and bottom SKU tables below"],"actions":["Review the lowest yield-impact SKUs table for repricing or discontinuation candidates"],"forecast":"Not available until AI insights are generated for the current range.","confidence":60}},
{"id":"chgeo","num":25,"name":"Channel & Geographic Sales Robot","group":"Financial","purpose":"Sales split by distribution channel and by region","role":"an expert commercial channel and regional sales analyst","questions":["Which channel drives the most sales?","Which region is underperforming?","How concentrated is our channel mix?"],"insight":{"summary":"This view is fed live from iBOS sales order data, bucketed into Enterprise, Corporate, Corporate Bulk, In-house, B2B and Trade channels, and into Dhaka, Mymensingh, Khulna, Bogura, Noakhali, Cumilla, Barisal and Chittagong regions (plus Other for anything outside those). Click Generate AI Insights for a live read.","insights":["Channel and region names in the ERP are free-text and highly granular, so they are grouped by keyword/prefix match","Sales without a matching channel or territory fall into \"Other\"","Use the company and date filters at the top to change scope"],"interpretation":"Interpretation updates once AI insights are generated against the live data currently loaded.","rootCause":"Not yet analyzed for the current range -- generate insights to get a live root-cause read.","risks":["Over-reliance on a single channel or region"],"opportunities":["Underweighted channels or regions with room to grow"],"recommendations":["Generate AI insights after reviewing the channel and geography charts below"],"actions":["Review the \"Other\" bucket size -- a large Other suggests channel/territory tagging gaps in the ERP"],"forecast":"Not available until AI insights are generated for the current range.","confidence":58}},
{"id":"prodinv","num":26,"name":"Production & Inventory Status Robot","group":"Financial","purpose":"Live production OEE proxy and inventory status (ABC class, ageing)","role":"an expert manufacturing and inventory status analyst","questions":["How is production running this range?","Where is inventory ageing risk concentrated?","How much inventory sits in each ABC class?"],"insight":{"summary":"This view is fed live from MES production/OEE records and WMS inventory records for the selected company and date range. Click Generate AI Insights for a live read.","insights":["Performance % is a proxy (actual output / shift target) since no standard ideal-cycle-time feed is available","Inventory ageing buckets use each item's last receipt date","ABC class and current stock value come directly from the warehouse item master"],"interpretation":"Interpretation updates once AI insights are generated against the live data currently loaded.","rootCause":"Not yet analyzed for the current range -- generate insights to get a live root-cause read.","risks":["Stock aged 90+ days concentrated in slow-moving items"],"opportunities":["Reclassifying Unclassified-ABC stock to sharpen inventory policy"],"recommendations":["Generate AI insights after reviewing the OEE and ageing charts below"],"actions":["Investigate any 90+ day ageing concentration for clearance or write-down"],"forecast":"Not available until AI insights are generated for the current range.","confidence":55}},
{"id":"ratios","num":27,"name":"Financial Ratios Robot","group":"Financial","purpose":"Full liquidity, profitability, activity and leverage ratio pack vs standard thresholds","role":"an expert financial ratio and credit analyst","questions":["Which ratios need attention right now?","How healthy is our liquidity position?","How leveraged are we vs standard thresholds?"],"insight":{"summary":"This view computes the full ratio pack from docs/Financial_and_Ratio_Formulas.md live from iBOS ERP GL data for the selected company and date range: Liquidity, Profitability, Activity/Efficiency, and Capital Structure/Leverage ratios, each checked against its standard threshold. Click Generate AI Insights for a live read.","insights":["A few inputs (credit vs cash sales, loan repayment schedules, operating vs non-operating income split) have no dedicated GL source and are proxied -- see the approximations list in the underlying data","Ratios are computed from the same GL chart of accounts as the rest of the dashboard, bucketed into balance sheet and P&L categories","Use the company and date filters at the top to change scope"],"interpretation":"Interpretation updates once AI insights are generated against the live data currently loaded.","rootCause":"Not yet analyzed for the current range -- generate insights to get a live root-cause read.","risks":["Ratios flagged \"Needs Attention\" against their standard threshold"],"opportunities":["Ratios comfortably inside their standard threshold, worth maintaining"],"recommendations":["Generate AI insights after reviewing the four ratio-group charts and the detail table below"],"actions":["Investigate any Liquidity or Leverage ratio flagged Needs Attention first -- those carry solvency risk"],"forecast":"Not available until AI insights are generated for the current range.","confidence":58}},
{"id":"competitor","num":28,"name":"Competitor & Market Share Robot","group":"Commercial","purpose":"AI + live web search view of the competitive landscape and market share","role":"an expert competitive intelligence analyst","questions":["Who are our main competitors?","What is our estimated market share?","What is our market position?"],"insight":{"summary":"This module has no ERP data source -- there is no market-share feed in the DWH. It calls Gemini with live Google Search grounding to research the selected company's public competitive position. Click Run Competitor Search above, then Generate AI Insights here for commentary on the result.","insights":["Results are best-effort public information, not verified financial data","Always check the Sources panel and verify claims before using them externally","Re-run the search after switching companies"],"interpretation":"Interpretation is only meaningful after a search has been run -- see the Summary panel above.","rootCause":"Not applicable -- this module summarizes external public information, not an internal variance.","risks":["Public data may be outdated, incomplete, or about the wrong entity if the company name is ambiguous"],"opportunities":["Use the estimated competitor set as a starting point for a proper market study"],"recommendations":["Treat this as a research starting point, not a cited market report"],"actions":["Run the search, then verify any figure you plan to use externally"],"forecast":"Not applicable.","confidence":40}}];

/* ================= Helpers ================= */
const fmt=(n,d=0)=>{ if(n===null||n===undefined||isNaN(n))return "-";
  const neg=n<0, s=Math.abs(n).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
  return neg?"("+s+")":s; };
const pct1=n=>(n===null||isNaN(n))?"-":n.toFixed(1)+"%";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const BU_SHARE={"All":1,"Chassis Components":.55,"Suspension Parts":.35,"Tooling & Engineering":.10};
const SCEN_F={Actual:1,Budget:43200/44850,Forecast:46200/44850,"Previous Year":41200/44850};
const MIN_CASH2=MIN_CASH; // alias

const EUR_BDT=135; // display conversion rate: 1 EUR = 135 BDT (synthetic demo rate)
// Fiscal year runs July-June; default the filter to "this fiscal year to date".
function fyBounds(d){const y=d.getFullYear(),m=d.getMonth()+1;const fyStartYear=m>=7?y:y-1;
 return {from:fyStartYear+"-07-01",to:d.toISOString().slice(0,10)};}
const FY=fyBounds(new Date());
const state={robot:"s-exec",scn:"Actual",co:4,coSel:[4],pcSel:[],from:FY.from,to:FY.to,cur:"BDT Cr",jit:1,histories:{},insCache:{},askOut:{}};
let charts=[]; let currentTable=null;

function ctx(){
  const f=SCEN_F[state.scn], buF=BU_SHARE[state.bu], j=state.jit;
  const v=(a,o={})=>{ let x=a;
    if(state.scn==="Budget")x=o.b!==undefined?o.b:a*SCEN_F.Budget;
    else if(state.scn==="Forecast")x=o.fc!==undefined?o.fc:a*SCEN_F.Forecast;
    else if(state.scn==="Previous Year")x=o.p!==undefined?o.p:a*SCEN_F["Previous Year"];
    return x*j; };
  const m=(x,d=0)=>state.cur==="BDT Crore"?fmt(x*EUR_BDT/10000,2):fmt(x*EUR_BDT,d);
  const pk=o=>state.per==="Dec 2025"?o.dec:state.per==="FY 2025"?o.fy:Math.round(o.fy/4*1.03);
  return {v,m,pk,f,buF,scn:state.scn,per:state.per,bu:state.bu,unit:state.cur==="BDT Crore"?"BDT Cr":"BDT '000"};
}

/* ================= ECharts option builders ================= */
const PAL=()=>({brand:css("--brand"),brand2:css("--brand2"),pos:css("--pos"),neg:css("--neg"),warn:css("--warn"),ink:css("--ink"),muted:css("--muted"),line:css("--line"),surface:css("--surface")});
function baseOpt(){ const P=PAL(); return {
  textStyle:{fontFamily:css("--f")||"Segoe UI",color:P.muted,fontSize:10.5},
  tooltip:{trigger:"axis",backgroundColor:P.surface,borderColor:P.line,textStyle:{color:P.ink,fontSize:11},
    valueFormatter:v=>typeof v==="number"?fmt(v,Math.abs(v)<10?1:0):v},
  grid:{left:8,right:14,top:32,bottom:4,containLabel:true},
  legend:{top:0,textStyle:{color:P.muted,fontSize:10.5},itemWidth:14,itemHeight:9},
};}
function axis(cats,horiz){ const P=PAL();
  const cat={type:"category",data:cats,axisLine:{lineStyle:{color:P.line}},axisTick:{show:false},axisLabel:{color:P.muted,fontSize:10}};
  const val={type:"value",splitLine:{lineStyle:{color:P.line,type:"dashed"}},axisLabel:{color:P.muted,fontSize:10,formatter:v=>fmt(v)}};
  return horiz?{xAxis:val,yAxis:cat}:{xAxis:cat,yAxis:val};
}
function lineOpt(cats,series,opts={}){ const P=PAL();
  const o={...baseOpt(),...axis(cats),series:series.map(s=>({name:s.name,type:"line",data:s.data,smooth:true,symbolSize:4,
    lineStyle:{width:2,color:s.color},itemStyle:{color:s.color},
    areaStyle:opts.area?{opacity:.15,color:s.color}:undefined,
    markLine:s.ref!==undefined?{silent:true,symbol:"none",lineStyle:{color:P.neg,type:"dashed"},label:{color:P.neg,fontSize:10,formatter:s.refLabel||""},data:[{yAxis:s.ref}]}:undefined}))};
  if(opts.min!==undefined)o.yAxis.min=opts.min;
  return o;
}
function barOpt(cats,series,opts={}){ const P=PAL();
  const o={...baseOpt(),...axis(cats,opts.horiz),series:series.map(s=>({name:s.name,type:"bar",data:s.data,stack:opts.stack?"s":undefined,
    barMaxWidth:26,itemStyle:{borderRadius:opts.stack?2:[3,3,0,0],color:s.cellColor?(p=>s.cellColor(p.value,p.dataIndex)):s.color}}))};
  if(opts.horiz)o.grid.left=4;
  if(opts.ref!==undefined)o.series[0].markLine={silent:true,symbol:"none",lineStyle:{color:P.neg,type:"dashed"},label:{color:P.neg,fontSize:10,formatter:opts.refLabel||""},data:[{yAxis:opts.ref}]};
  return o;
}
function pieOpt(data){ const P=PAL();
  return {...baseOpt(),tooltip:{trigger:"item",backgroundColor:P.surface,borderColor:P.line,textStyle:{color:P.ink,fontSize:11},valueFormatter:v=>fmt(v)},
    legend:{show:false},
    series:[{type:"pie",radius:["52%","80%"],padAngle:2,itemStyle:{borderRadius:4},
      label:{color:P.muted,fontSize:10,formatter:p=>p.name+" "+p.percent.toFixed(0)+"%"},
      data:data.map(d=>({name:d.name,value:d.value,itemStyle:{color:d.color}}))}]};
}
function gaugeOpt(value,max,label,color){ const P=PAL();
  return {series:[{type:"gauge",startAngle:210,endAngle:-30,min:0,max,radius:"95%",
    progress:{show:true,width:14,itemStyle:{color:color||P.brand}},
    axisLine:{lineStyle:{width:14,color:[[1,P.line]]}},
    pointer:{show:false},axisTick:{show:false},splitLine:{show:false},axisLabel:{show:false},
    detail:{valueAnimation:true,offsetCenter:[0,"-6%"],fontSize:24,fontWeight:700,color:P.ink,formatter:v=>fmt(v,v<100&&v%1!==0?1:0)},
    title:{offsetCenter:[0,"28%"],fontSize:11,color:P.muted},
    data:[{value:Math.round(value*10)/10,name:label}]}]};
}
function wfOpt(items){ const P=PAL();
  let acc=0; const base=[],vals=[];
  items.forEach(d=>{
    if(d.total){ const t=acc+(d.value||0); base.push(0); vals.push({value:t,itemStyle:{color:P.brand,borderRadius:[3,3,0,0]}}); if(d.value)acc+=d.value; }
    else { base.push(d.value>=0?acc:acc+d.value); vals.push({value:Math.abs(d.value),real:d.value,itemStyle:{color:d.value>=0?P.pos:P.neg,borderRadius:[3,3,0,0]}}); acc+=d.value; }
  });
  const o={...baseOpt(),...axis(items.map(d=>d.name)),legend:{show:false},
    tooltip:{trigger:"axis",backgroundColor:P.surface,borderColor:P.line,textStyle:{color:P.ink,fontSize:11},
      formatter:ps=>{const p=ps.find(x=>x.seriesIndex===1); if(!p)return ""; const d=p.data; return p.name+": <b>"+fmt(d.real!==undefined?d.real:d.value)+"</b>";}},
    series:[{type:"bar",stack:"w",data:base,itemStyle:{color:"transparent"},tooltip:{show:false},barMaxWidth:30},
            {type:"bar",stack:"w",data:vals,barMaxWidth:30}]};
  o.xAxis.axisLabel.rotate=items.length>7?28:0;
  return o;
}

/* ================= HTML component builders ================= */
function kpi(label,value,unit,sub,status){
  const d=status==="GREEN"?"g":status==="AMBER"?"a":status==="RED"?"r":"";
  return `<div class="kpi"><div class="l"><span>${esc(label)}</span>${d?`<span class="dot ${d}"></span>`:""}</div>
  <div class="v">${value}<small>${esc(unit||"")}</small></div><div class="s">${esc(sub||"")}</div></div>`;
}
function heat5(items){
  let html="";
  for(let imp=5;imp>=1;imp--)for(let lik=1;lik<=5;lik++){
    const here=items.filter(r=>r.impact===imp&&r.likelihood===lik);
    const sc=imp*lik, col=sc>=16?css("--neg"):sc>=9?css("--warn"):css("--pos");
    html+=`<div title="${esc(here.map(h=>h.name).join(", "))}" style="background:${col};opacity:${here.length?1:.14}">${here.length||""}</div>`;
  }
  return `<div class="heat5">${html}</div><div class="note">Rows: impact (high to low). Columns: likelihood (low to high).</div>`;
}
function tableHTML(cols,rows){
  const th=cols.map((c,i)=>`<th data-ci="${i}">${esc(c.label)}</th>`).join("");
  const body=rows.map(r=>{
    const tds=cols.map(c=>{
      const raw=r[c.k];
      let val=c.render?c.render(raw,r):(c.num?fmt(raw,c.d||0):esc(raw));
      const red=c.num&&typeof raw==="number"&&raw<0;
      return `<td class="${c.num?"num":""} ${red?"neg":""}">${val}</td>`;
    }).join("");
    return `<tr class="${r._bold?"bold":""}">${tds}</tr>`;
  }).join("");
  return `<input class="tbl-search" placeholder="Search table..." oninput="tblFilter(this)">
  <div class="tbl-wrap"><table class="dt"><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`;
}
function tblFilter(inp){
  const q=inp.value.toLowerCase();
  inp.parentElement.querySelectorAll("tbody tr").forEach(tr=>{
    tr.style.display=tr.textContent.toLowerCase().includes(q)?"":"none";
  });
}
document.addEventListener("click",e=>{
  const th=e.target.closest("th[data-ci]"); if(!th)return;
  const table=th.closest("table"), tb=table.querySelector("tbody"), ci=+th.dataset.ci;
  const dir=th.dataset.dir==="asc"?"desc":"asc"; table.querySelectorAll("th").forEach(h=>delete h.dataset.dir); th.dataset.dir=dir;
  const rows=[...tb.querySelectorAll("tr")];
  const num=s=>{const x=parseFloat(String(s).replace(/[(),%]/g,m=>m==="("?"-":"")); return isNaN(x)?null:x;};
  rows.sort((a,b)=>{
    const x=a.cells[ci]?.textContent.trim()||"", y=b.cells[ci]?.textContent.trim()||"";
    const nx=num(x),ny=num(y);
    const cmp=(nx!==null&&ny!==null)?nx-ny:x.localeCompare(y);
    return dir==="asc"?cmp:-cmp;
  });
  rows.forEach(r=>tb.appendChild(r));
});
const statusDotHTML=s=>`<span class="dot ${s==="GREEN"?"g":s==="AMBER"?"a":"r"}"></span>${s}`;
const trendHTML=t=>`<span class="${t==="UP"?"pos":t==="DOWN"?"neg":"warn-ink"}" style="font-weight:700">${t==="UP"?"▲":t==="DOWN"?"▼":"■"}</span>`;

/* ================= Backend AI calls (FastAPI -> xAI Grok) ================= */
async function callBackendAI(path,prompt){
  const res=await fetch(path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
  if(!res.ok)throw new Error((await res.json().catch(()=>({}))).detail||"request failed");
  return res.json();
}
async function askClaude(prompt){ return callBackendAI("/api/chat",prompt);
}

function askBarHTML(r){
  const out=state.askOut[r.id];
  return `<div class="ask">
    <div class="ask-row"><span class="bot">🤖</span>
      <input id="ask-input" placeholder="Ask the ${esc(r.name)} anything about this data...  (press / to focus)"
        onkeydown="if(event.key==='Enter')askSubmit()">
      <button id="ask-btn" onclick="askSubmit()">Ask</button></div>
    <div class="chips">${r.questions.map(q=>`<button class="chip" onclick="askSubmit(this.textContent)">${esc(q)}</button>`).join("")}</div>
    <div id="ask-out">${out||""}</div></div>`;
}
async function askSubmit(preset){
  const inp=document.getElementById("ask-input"), out=document.getElementById("ask-out"), btn=document.getElementById("ask-btn");
  const q=(preset||inp.value).trim(); if(!q)return;
  const r=currentRobot();
  btn.disabled=true;
  out.innerHTML=`<div class="ask-out loading"><span class="spinner"></span>Robot is analyzing...</div>`;
  try{
    const hist=(state.histories[r.id]||[]).slice(-3).map(h=>"Q: "+h.q+"\nA: "+h.a).join("\n");
    const prompt="You are the "+r.name+", "+r.role+". Company: AUTOPARTS NOVA d.o.o., synthetic demo data. Underlying data in EUR '000, displayed to the user in BDT at 135 BDT per EUR.\n"
      +"Active scenario: "+state.scn+". Period: "+state.per+". Business unit: "+state.bu+".\n"
      +"DATA:\n"+JSON.stringify(r.slice(ctx()))+"\n"
      +(hist?"RECENT CONVERSATION:\n"+hist+"\n":"")
      +"QUESTION: "+q+"\n"
      +'Respond ONLY with valid JSON: {"answer": string, "keyNumbers": string[], "actions": string[]}. No markdown, no backticks, simple English, no long em dashes.';
    const p=await askClaude(prompt);
    (state.histories[r.id]=state.histories[r.id]||[]).push({q,a:p.answer});
    state.histories[r.id]=state.histories[r.id].slice(-3);
    const html=`<div class="ask-out"><p>${esc(p.answer)}</p>
      ${p.keyNumbers&&p.keyNumbers.length?`<div class="nums">${p.keyNumbers.map(k=>`<span class="num-chip">${esc(k)}</span>`).join("")}</div>`:""}
      ${p.actions&&p.actions.length?`<ul>${p.actions.map(a=>`<li>${esc(a)}</li>`).join("")}</ul>`:""}</div>`;
    out.innerHTML=html; state.askOut[r.id]=html;
    if(!preset)inp.value="";
  }catch(e){
    out.innerHTML=`<div class="ask-out" style="color:var(--warn)">The robot could not answer right now: ${esc(e.message)}</div>`;
  }
  btn.disabled=false;
}

/* ================= AI Insight panel ================= */
const INS_BLOCKS=[["summary","Executive Summary"],["insights","Key Insights"],["interpretation","Interpretation"],
  ["rootCause","Root Cause Analysis"],["risks","Risks"],["opportunities","Opportunities"],
  ["recommendations","Recommendations"],["actions","Priority Actions"],["forecast","Forecast"]];
function insPanelHTML(r){
  const key=r.id+"|"+state.scn;
  const ins=state.insCache[key]||r.insight;
  const P=v=>Array.isArray(v)?`<ul>${v.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p>${esc(v)}</p>`;
  const c=ins.confidence, ccol=c>=75?"var(--pos)":c>=50?"var(--warn)":"var(--neg)";
  return `<div class="ai"><div class="ai-h">
    <span class="t"><span class="spark">✦</span>AI Insight Panel <span style="font-weight:400;color:var(--muted);font-size:10.5px">(${esc(state.scn)})</span></span>
    <button class="tb-btn primary" id="ins-btn" onclick="genInsights()">✦ ${state.insCache[key]?"Regenerate":"Generate"} AI Insights</button></div>
    <div id="ins-body"><div class="ai-grid">
    ${INS_BLOCKS.map(([k,label])=>`<div class="ai-block ${k==="summary"?"full":""}"><h4>${label}</h4>${P(ins[k])}</div>`).join("")}
    <div class="ai-block"><h4>Confidence Score</h4><div class="conf-wrap">
      <span class="conf-num">${c}<small>/100</small></span>
      <span class="cbar"><i style="width:${c}%;background:${ccol}"></i></span></div></div>
    </div></div></div>`;
}
async function genInsights(){
  const r=currentRobot(), key=r.id+"|"+state.scn;
  const btn=document.getElementById("ins-btn"), body=document.getElementById("ins-body");
  btn.disabled=true; btn.textContent="Generating...";
  try{
    const prompt="You are the "+r.name+", "+r.role+". Company: AUTOPARTS NOVA d.o.o. (synthetic demo, data in EUR '000, displayed in BDT at 135 BDT per EUR). Scenario: "+state.scn+". Period: "+state.per+".\n"
      +"DATA:\n"+JSON.stringify(r.slice(ctx()))+"\n"
      +'Produce a full AI insight set. Respond ONLY with valid JSON exactly in this shape: {"summary": string, "insights": string[], "interpretation": string, "rootCause": string, "risks": string[], "opportunities": string[], "recommendations": string[], "actions": string[], "forecast": string, "confidence": number}. Confidence is 0-100. No markdown, no backticks, simple English, no long em dashes.';
    state.insCache[key]=await callBackendAI("/api/insights",prompt);
    render();
  }catch(e){
    body.insertAdjacentHTML("afterbegin",`<div style="color:var(--warn);font-size:12px;margin-bottom:8px">The robot could not answer right now: ${esc(e.message)}</div>`);
    btn.disabled=false; btn.textContent="✦ Generate AI Insights";
  }
}

/* ================= MCP-ready data access layer =================
   Today: returns embedded demo constants. Later: same signature can call an
   MCP server (Claude API mcp_servers parameter) with zero UI changes. */
function getRobotData(robotId,filters){ const r=ROBOTS.find(x=>x.id===robotId); return {source:"Demo",data:r?r.slice(filters):null}; }

/* ================= Series shared across robots ================= */
const DSO_M=[50,51,51,52,53,53,54,54,55,53,52,58], DPO_M=[47,48,48,49,50,50,51,50,51,49,48,52],
      DIO_M=[46,45,45,44,44,43,43,44,43,43,42,42], CCC_M=[49,48,48,47,47,46,46,48,47,47,46,48],
      OEE_M=[83.1,83.3,83.5,83.4,83.7,83.9,83.8,83.6,84.0,84.1,83.8,84.2],
      PPM_M=[142,138,135,133,130,132,128,131,127,126,128,125],
      OTD_M=[95.9,96.1,96.0,96.4,96.2,96.5,96.3,96.6,96.5,96.9,96.7,96.8];
const HEALTH_SCORE=78;
const KEY_MESSAGES=[
 {msg:"FY revenue 44,850 beats budget by 1,650 (+3.8%)",trend:"UP",action:"Hold pricing discipline",owner:"CFO",deadline:"Ongoing"},
 {msg:"EBITDA 5,741 at 12.8% margin, +16.1% YoY",trend:"UP",action:"Protect margin vs steel cost",owner:"CFO",deadline:"Q1"},
 {msg:"DSO jumped 52 to 58 days, worst KPI on the board",trend:"DOWN",action:"Collections task force",owner:"Credit Mgr",deadline:"31.01"},
 {msg:"Cash 4,850 with 14 weeks runway, no funding gap in Q1",trend:"UP",action:"Maintain min cash 3,000",owner:"Treasury",deadline:"Weekly"},
 {msg:"Steel +8% YoY cost 680 against budget",trend:"DOWN",action:"Close hedging program",owner:"Procurement",deadline:"28.02"},
 {msg:"High-risk AR of 1,960 needs 294 provision",trend:"DOWN",action:"Credit holds on 3 accounts",owner:"Credit Mgr",deadline:"31.01"},
 {msg:"L3 press (2,500 CAPEX) delayed to Feb 2026",trend:"DOWN",action:"Vendor escalation call",owner:"COO",deadline:"20.01"},
 {msg:"OEE 84.2% vs 85% target, L1 micro-stoppages",trend:"FLAT",action:"SMED workshop",owner:"Plant Mgr",deadline:"Q1"},
 {msg:"EV suspension demand drove +580 favorable revenue",trend:"UP",action:"Prioritize EV R&D",owner:"R&D Dir",deadline:"Q1"},
 {msg:"VAT 485 and payroll taxes due 15 January",trend:"FLAT",action:"Confirm payment run",owner:"Tax Mgr",deadline:"15.01"}];

/* ================= 23 ROBOT PAGE CONFIGS ================= */
const PAGES=[
{id:"exec",icon:"◈",
 slice:()=>({FIN,KPI8,health:HEALTH_SCORE,keyMessages:KEY_MESSAGES,risks:RISKS.slice(0,5),opportunities:OPPS.slice(0,5),cash:4850,wc:9620}),
 kpis(c){ const g=(o,opts)=>c.m(c.v(c.pk(o),opts));
  return [
   kpi("Revenue",g(FIN.rev,{b:c.pk({dec:3600,fy:43200}),p:c.pk({dec:3599,fy:41200})}),c.unit,"+8.9% YoY","GREEN"),
   kpi("Gross Profit",g(FIN.gp),c.unit,"28.2% margin","GREEN"),
   kpi("EBITDA",g(FIN.ebitda,{b:c.pk({dec:432,fy:5184})}),c.unit,"12.8% margin","GREEN"),
   kpi("Net Profit",g(FIN.ni,{b:c.pk({dec:314,fy:3770})}),c.unit,"8.8% of revenue","GREEN"),
   kpi("Cash",c.m(c.v(4850)),c.unit,"Min policy 3,000","GREEN"),
   kpi("Working Capital",c.m(c.v(9620)),c.unit,"CA 18,047 - CL 8,427","GREEN"),
   kpi("Inventory",c.m(c.v(5250)),c.unit,"DIO 42 days","GREEN"),
   kpi("AR",c.m(c.v(7150)),c.unit,"DSO 58 days","RED"),
   kpi("AP",c.m(c.v(5680)),c.unit,"DPO 52 days","GREEN"),
   kpi("DSO",fmt(c.v(58,{b:45,p:52})),"days","Target 45","RED"),
   kpi("DPO",fmt(c.v(52,{b:45,p:48})),"days","Band 45-55","GREEN"),
   kpi("DIO",fmt(c.v(42,{b:44,p:45})),"days","Turns 8.2","GREEN"),
   kpi("CCC",fmt(c.v(48,{b:55,p:52})),"days","= 58 + 42 - 52","GREEN"),
   kpi("Sales Growth",pct1(c.v(8.9,{b:4.9,p:6.2})),"YoY","FY vs FY","GREEN"),
   kpi("EBITDA Margin",pct1(c.v(12.8,{b:12,p:12})),"","Target 12+","GREEN"),
   kpi("Gross Margin",pct1(c.v(28.2,{b:27.5,p:27})),"","Target 27+","GREEN"),
   kpi("Forecast Accuracy",pct1(c.v(96.2,{b:95,p:94.1})),"","Rolling 6M","GREEN")];},
 blocks(c){ const P=PAL();
  return [
   {title:"Business Health Score",span:4,chart:gaugeOpt(Math.round(c.v(HEALTH_SCORE,{b:74,p:72})),100,"of 100",P.pos)},
   {title:"Risk Heat Map (top 10 risks)",span:4,html:heat5(RISKS)},
   {title:"8-KPI Executive Scorecard",span:4,html:`<div class="tbl-wrap" style="max-height:250px"><table class="dt"><thead><tr><th>KPI</th><th>Dec</th><th>Target</th><th>Status</th></tr></thead><tbody>${KPI8.map(k=>`<tr><td>${k.name}</td><td class="num">${fmt(k.dec,k.dec<10?2:1)}</td><td>${k.target}</td><td>${statusDotHTML(k.status)}</td></tr>`).join("")}</tbody></table></div>`},
   {title:"Revenue and EBITDA Trend (monthly)",span:12,chart:lineOpt(MONTHS,[
     {name:"Revenue",data:REV_M.map(r=>Math.round(c.v(r)*c.buF)),color:P.brand},
     {name:"EBITDA",data:REV_M.map(r=>Math.round(c.v(r*.128)*c.buF)),color:P.pos}],{area:true})}];},
 table:()=>({title:"Top 10 Key Messages for Management",cols:[
   {k:"msg",label:"Message"},{k:"trend",label:"Trend",render:trendHTML},{k:"action",label:"Action"},{k:"owner",label:"Owner"},{k:"deadline",label:"Deadline"}],rows:KEY_MESSAGES})},

{id:"fpa",icon:"Σ",
 slice:()=>({totals:BVA.totals,top10:BVA.top10,pvm:BVA.pvm}),
 kpis(c){ return BVA.totals.map(t=>{const varv=t.act-t.bud;
   return kpi(t.name+" vs Budget",c.m(c.v(t.act,{b:t.bud,fc:t.fc})),c.unit,"Var "+fmt(varv)+" ("+pct1(varv/Math.abs(t.bud)*100)+")",varv>0?"GREEN":"RED");});},
 blocks(c){ const P=PAL(); return [
   {title:"EBITDA Bridge: Budget to Actual",span:12,chart:wfOpt([
     {name:"Budget EBITDA",value:5184,total:true},{name:"Revenue",value:1650},{name:"COGS",value:-882},{name:"OPEX",value:-211},{name:"Actual EBITDA",total:true}])},
   {title:"Budget vs Actual vs Forecast",span:6,chart:barOpt(BVA.totals.map(t=>t.name),[
     {name:"Budget",data:BVA.totals.map(t=>Math.abs(t.bud)),color:P.muted},
     {name:"Actual",data:BVA.totals.map(t=>Math.abs(t.act)),color:P.brand},
     {name:"Forecast",data:BVA.totals.map(t=>Math.abs(t.fc)),color:P.pos}])},
   {title:"Revenue Price / Volume / Mix (+1,650 total)",span:6,chart:barOpt(BVA.pvm.map(p=>p.name),[
     {name:"Variance",data:BVA.pvm.map(p=>p.v),cellColor:v=>v>=0?P.pos:P.neg}])}];},
 table:()=>({title:"Top 10 Variances (EUR '000)",cols:[
   {k:"rank",label:"#"},{k:"item",label:"Line"},{k:"v",label:"Variance",num:true},
   {k:"fu",label:"F/U",render:v=>`<b class="${v==="F"?"pos":"neg"}">${v}</b>`},
   {k:"why",label:"Explanation"},{k:"action",label:"Action"},{k:"owner",label:"Owner"},{k:"status",label:"Status"}],rows:BVA.top10})},

{id:"finstmt",icon:"⊟",
 slice:()=>({pnl:PNL.lines,bs:BS,cf:CF}),
 kpis(c){ return [
   kpi("Revenue FY",c.m(c.v(44850,{b:43200,p:41200,fc:46200})),c.unit,"+8.9% YoY","GREEN"),
   kpi("EBITDA FY",c.m(c.v(5741,{b:5184,p:4944,fc:6050})),c.unit,"12.8% margin","GREEN"),
   kpi("Net Income FY",c.m(c.v(3950,{b:3770,p:3420,fc:4180})),c.unit,"8.8% of revenue","GREEN"),
   kpi("Total Assets",c.m(c.v(32847,{p:28685})),c.unit,"+14.5% YoY","GREEN"),
   kpi("Equity Ratio",pct1(62.2),"","Equity 20,415","GREEN"),
   kpi("Current Ratio","2.14","x","CA / CL","GREEN"),
   kpi("ROE",pct1(19.3),"","NI / Equity","GREEN"),
   kpi("Free Cash Flow",c.m(c.v(3120,{p:2850})),c.unit,"OCF 5,320 - CAPEX 2,200","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"EBITDA Walk (FY 2025)",span:12,chart:wfOpt([
     {name:"Revenue",value:44850,total:true},{name:"Materials",value:-20183},{name:"Labor",value:-6728},{name:"Mfg OH",value:-5292},
     {name:"S&M",value:-1794},{name:"G&A",value:-2691},{name:"R&D",value:-2243},{name:"IT + Other",value:-719},{name:"Rounding",value:541},{name:"EBITDA",total:true}])},
   {title:"Cash Bridge: Opening to Closing",span:6,chart:wfOpt([
     {name:"Opening 3,720",value:3720,total:true},{name:"OCF",value:5320},{name:"Investing",value:-2200},{name:"Financing",value:-1990},{name:"Closing 4,850",total:true}])},
   {title:"Balance Sheet Structure",span:6,chart:barOpt(["Assets","Equity + Liabilities"],[
     {name:"Non-current assets",data:[14800,0],color:P.brand},{name:"Current assets",data:[18047,0],color:P.brand2},
     {name:"Equity",data:[0,20415],color:P.pos},{name:"Non-current liab",data:[0,4005],color:P.warn},{name:"Current liab",data:[0,8427],color:P.neg}],{stack:true})}];},
 table:()=>({title:"P&L Statement (FY 2025 and December)",cols:[
   {k:"name",label:"Line"},{k:"fy",label:"FY 2025",num:true},{k:"pct",label:"% of Rev",render:v=>pct1(v)},{k:"dec",label:"Dec 2025",num:true}],
   rows:PNL.lines.map(l=>({...l,_bold:l.bold}))})},

{id:"sales",icon:"↗",
 slice:c=>({monthly:REV_M,byLine:PNL.revLines,topCustomers:AR.customers,pvm:BVA.pvm,bu:state.bu}),
 kpis(c){ return [
   kpi("Sales Dec",c.m(c.v(3920,{b:3600,p:3599})*c.buF),c.unit,"+7.4% MoM","GREEN"),
   kpi("Sales YTD",c.m(c.v(44850,{b:43200,p:41200,fc:46200})*c.buF),c.unit,"+8.9% YoY","GREEN"),
   kpi("Growth YoY",pct1(c.v(8.9,{b:4.9,p:6.2})),"","FY 2025 vs FY 2024","GREEN"),
   kpi("Gross Margin",pct1(c.v(28.2,{b:27.5,p:27})),"","Blended","GREEN"),
   kpi("Top 3 Customer Share",pct1(38),"","Concentration risk","AMBER"),
   kpi("Budget Achievement",pct1(103.8),"","44,850 / 43,200","GREEN")];},
 blocks(c){ const P=PAL();
  let cum=0; const tot=AR.customers.reduce((a,b)=>a+b.total,0);
  const pareto=AR.customers.map(cu=>{cum+=cu.total;return{n:cu.name.split(" ")[0],rev:Math.round(cu.total/7150*44850*c.buF),cum:Math.round(cum/tot*100)};});
  const paretoOpt={...baseOpt(),...axis(pareto.map(p=>p.n)),
    yAxis:[{type:"value",splitLine:{lineStyle:{color:P.line,type:"dashed"}},axisLabel:{color:P.muted,fontSize:10,formatter:v=>fmt(v)}},
           {type:"value",min:0,max:100,axisLabel:{color:P.muted,fontSize:10,formatter:"{value}%"},splitLine:{show:false}}],
    series:[{name:"Revenue",type:"bar",data:pareto.map(p=>p.rev),itemStyle:{color:P.brand,borderRadius:[3,3,0,0]},barMaxWidth:26},
            {name:"Cumulative %",type:"line",yAxisIndex:1,data:pareto.map(p=>p.cum),smooth:true,lineStyle:{color:P.pos,width:2},itemStyle:{color:P.pos}}]};
  paretoOpt.xAxis.axisLabel.rotate=25;
  return [
   {title:"Monthly Sales Trend",span:12,chart:lineOpt(MONTHS,[
     {name:"Actual",data:REV_M.map(r=>Math.round(c.v(r)*c.buF)),color:P.brand},
     {name:"Budget",data:REV_M.map(r=>Math.round(r*SCEN_F.Budget*c.buF)),color:P.muted}],{area:true})},
   {title:"Customer Pareto (cumulative %)",span:6,chart:paretoOpt},
   {title:"Revenue by Business Line",span:6,chart:pieOpt(PNL.revLines.map((l,i)=>({name:l.name,value:Math.round(c.v(l.fy)),color:[P.brand,P.pos,P.warn][i]})))},
   {title:"Customer Revenue Treemap (annualized)",span:12,chart:{...baseOpt(),tooltip:{backgroundColor:P.surface,borderColor:P.line,textStyle:{color:P.ink,fontSize:11},valueFormatter:v=>fmt(v)},
     series:[{type:"treemap",roam:false,nodeClick:false,breadcrumb:{show:false},label:{fontSize:11},
       data:AR.customers.map((cu,i)=>({name:cu.name,value:Math.round(cu.total/7150*44850*c.buF),itemStyle:{color:["#6030F0","#7248f2","#8560f4","#9878f6","#ab90f8","#18a558","#3fb877","#68c896","#b07a1e","#c89a48"][i]}}))}]}}];},
 table(c){ return {title:"Sales by Customer (AR share used as revenue proxy)",cols:[
   {k:"name",label:"Customer"},{k:"country",label:"Region"},{k:"rev",label:"Est. Revenue",num:true},
   {k:"share",label:"Share",render:v=>pct1(v)},{k:"risk",label:"Risk",render:v=>statusDotHTML(v==="LOW"?"GREEN":v==="MEDIUM"?"AMBER":"RED").replace(/GREEN|AMBER|RED/,v)}],
   rows:AR.customers.map(cu=>({name:cu.name,country:cu.country,rev:Math.round(cu.total/7150*44850*c.buF),share:cu.total/7150*100,risk:cu.risk}))};}},

{id:"inventory",icon:"▦",
 slice:()=>({totals:INV,skus:SKUS}),
 kpis(c){ const dead=SKUS.filter(s=>s.days>100); return [
   kpi("Total Inventory",c.m(c.v(INV.total)),c.unit,"RM + FG + WIP","GREEN"),
   kpi("Raw Materials",c.m(c.v(INV.rm)),c.unit,"54% of total","GREEN"),
   kpi("Finished Goods",c.m(c.v(INV.fg)),c.unit,"38% of total","GREEN"),
   kpi("WIP",c.m(c.v(INV.wip)),c.unit,"8% of total","GREEN"),
   kpi("Inventory Days (DIO)",fmt(c.v(42,{b:44,p:45})),"days","Turns 8.2","GREEN"),
   kpi("Dead Stock Risk",c.m(dead.reduce((a,b)=>a+b.value,0)),c.unit,dead.length+" SKUs over 100 days","AMBER")];},
 blocks(c){ const P=PAL();
  const buck=(lo,hi)=>SKUS.filter(s=>s.days>lo&&s.days<=hi).reduce((a,b)=>a+b.value,0);
  return [
   {title:"Inventory Value by Type",span:4,chart:barOpt(["Inventory"],[
     {name:"Raw Materials",data:[Math.round(c.v(INV.rm))],color:P.brand},{name:"Finished Goods",data:[Math.round(c.v(INV.fg))],color:P.pos},{name:"WIP",data:[Math.round(c.v(INV.wip))],color:P.warn}],{stack:true})},
   {title:"Inventory Turns",span:4,chart:gaugeOpt(c.v(8.2,{b:8,p:7.6}),12,"turns (target 8.0)",P.pos)},
   {title:"ABC Class Value Split",span:4,chart:pieOpt(["A","B","C"].map((cl,i)=>({name:"Class "+cl,value:SKUS.filter(s=>s.abc===cl).reduce((a,b)=>a+b.value,0),color:[P.brand,P.pos,P.warn][i]})))},
   {title:"Aging Profile (value by days on hand)",span:12,chart:barOpt(["0-30d","31-60d","61-100d","100d+"],[
     {name:"Value",data:[buck(0,30),buck(30,60),buck(60,100),buck(100,999)],cellColor:(v,i)=>i===3?P.neg:i===2?P.warn:P.pos}])}];},
 table:()=>({title:"SKU Register (20 SKUs, rolls up to 5,250)",cols:[
   {k:"sku",label:"SKU"},{k:"type",label:"Type"},{k:"value",label:"Value",num:true},{k:"abc",label:"ABC"},{k:"xyz",label:"XYZ"},
   {k:"days",label:"Days on Hand",num:true},
   {k:"flag",label:"Flag",render:v=>`<span class="${v.includes("Dead")?"neg":v.includes("Slow")?"warn-ink":v.includes("Fast")?"pos":""}">${v}</span>`}],rows:SKUS})},

{id:"procurement",icon:"⇊",
 slice:()=>({suppliers:AP.suppliers,ppvSteel:"+8% YoY, -680 variance",leadTimeAlert:"STEELWERK 12 days late"}),
 kpis(c){ return [
   kpi("Total Spend FY",c.m(c.v(26910,{b:26100,p:24800})),c.unit,"Materials + services","GREEN"),
   kpi("Purchase Price Variance",c.m(-680),c.unit,"Steel +8% YoY","RED"),
   kpi("Top Supplier Share",pct1(25.2),"","STEELWERK of AP","AMBER"),
   kpi("Import Share",pct1(72),"","vs 28% local","AMBER"),
   kpi("Avg Lead Time","18","days","STEELWERK +12 late","RED"),
   kpi("Discount Capture",pct1(64),"","PLASTIK CZECH 2% open","AMBER")];},
 blocks(c){ const P=PAL(); return [
   {title:"Supplier Spend Pareto (AP outstanding)",span:12,chart:barOpt(AP.suppliers.map(s=>s.name.split(" ")[0]).reverse(),[
     {name:"Spend",data:AP.suppliers.map(s=>s.total).reverse(),cellColor:(v,i)=>i===9?P.neg:P.brand}],{horiz:true})},
   {title:"Lead Time by Supplier (days)",span:6,chart:barOpt(["RUBBER TECH","PLASTIK CZ","ELEKTRO SK","ALUMINIUM IT","STEELWERK"],[
     {name:"Days",data:[10,12,14,16,30],cellColor:v=>v>=25?P.neg:v>=15?P.warn:P.pos}],{horiz:true})},
   {title:"Steel PPV Trend (index, 2024 = 100)",span:6,chart:lineOpt(["Q1","Q2","Q3","Q4"],[
     {name:"Steel Index",data:[100,103,105.5,108],color:P.neg},{name:"Budget",data:[100,100,100,100],color:P.pos}])}];},
 table:()=>({title:"Top 10 Suppliers",cols:[
   {k:"name",label:"Supplier"},{k:"cat",label:"Category"},{k:"total",label:"AP Outstanding",num:true},
   {k:"pri",label:"Priority",render:v=>`<b class="${v==="P1"?"neg":v==="P2"?"warn-ink":"pos"}">${v}</b>`},{k:"note",label:"Note"}],rows:AP.suppliers})},

{id:"treasury",icon:"⌂",
 slice:()=>({cash:4850,minCash:MIN_CASH,runway:14,fx:{eurRsd:117},interest:{income:98,expense:285},loans:LOANS,ccr:0.92}),
 kpis(c){ return [
   kpi("Cash Position",c.m(c.v(4850,{p:3720})),c.unit,"Min policy 3,000","GREEN"),
   kpi("Cash Runway",fmt(c.v(14,{b:12,p:12})),"weeks","Target 12+","GREEN"),
   kpi("Cash Conversion Ratio",fmt(c.v(0.92,{b:.85,p:.88}),2),"x","OCF / EBITDA","GREEN"),
   kpi("Net Interest",c.m(-187),c.unit,"Income 98 - Expense 285","AMBER"),
   kpi("EUR/RSD","117.0","","Stable band","GREEN"),
   kpi("Total Debt",c.m(c.v(4000)),c.unit,"LT 3,200 + ST 800","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Liquidity vs Minimum Cash (13 weeks)",span:12,chart:lineOpt(CF13.map(w=>w.w),[
     {name:"Cash",data:CF13.map(w=>Math.round(c.v(w.close))),color:P.pos,ref:MIN_CASH,refLabel:"Min 3,000"},
     {name:"Minimum",data:CF13.map(_=>MIN_CASH),color:P.neg}],{area:true,min:2500})},
   {title:"Debt Maturity Profile",span:6,chart:barOpt(LOANS.repay.map(r=>r.y),[{name:"Repayment",data:LOANS.repay.map(r=>r.v),color:P.brand}])},
   {title:"Liquidity Headroom",span:6,chart:gaugeOpt(Math.round((c.v(4850)-MIN_CASH)/MIN_CASH*100),100,"% above minimum",P.pos)}];},
 table:()=>({title:"FX and Interest Exposure",cols:[{k:"item",label:"Item"},{k:"exposure",label:"Exposure"},{k:"note",label:"Note"}],
   rows:[{item:"EUR/RSD",exposure:"Local costs in RSD, revenue in EUR",note:"Rate 117, natural hedge from local payroll"},
    {item:"EUR/USD",exposure:"About 8% of purchases in USD",note:"Small forward cover in place"},
    {item:"Interest rate",exposure:"4,000 debt, mostly fixed",note:"ST 800 floating at 5.1%"},
    {item:"Counterparty",exposure:"Cash split across 3 banks",note:"Largest single bank 2,100"}]})},

{id:"banking",icon:"≣",
 slice:()=>({banks:BANKS,loans:LOANS}),
 kpis(c){ return [
   kpi("Total Bank Balance",c.m(c.v(4850,{p:3720})),c.unit,"3 banks","GREEN"),
   kpi("Facility Utilization",pct1(4000/7000*100),"","4,000 of 7,000 limits","GREEN"),
   kpi("LT Loans",c.m(3200),c.unit,"Avg rate 4.3%","GREEN"),
   kpi("ST Loans",c.m(800),c.unit,"Rate 5.1% floating","AMBER"),
   kpi("DSCR","2.1","x","Covenant min 1.3x","GREEN"),
   kpi("LC + BG Outstanding",c.m(730),c.unit,"LC 450, BG 280","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Balances and Facility Utilization by Bank",span:12,chart:barOpt(BANKS.map(b=>b.name),[
     {name:"Balance",data:BANKS.map(b=>Math.round(c.v(b.balance))),color:P.pos},
     {name:"Used",data:BANKS.map(b=>b.used),color:P.brand},
     {name:"Limit",data:BANKS.map(b=>b.limit),color:P.muted}])},
   {title:"Repayment Schedule",span:6,chart:barOpt(LOANS.repay.map(r=>r.y),[{name:"Repayment",data:LOANS.repay.map(r=>r.v),color:P.brand}])},
   {title:"Covenant Status",span:6,html:[["DSCR >= 1.3x","2.1x","GREEN"],["Equity ratio >= 35%","62.2%","GREEN"],["Net debt / EBITDA <= 2.5x","Net cash","GREEN"],["Raiffeisen ST review","Watch","AMBER"]].map(r=>`<div class="covrow"><span>${r[0]}</span><b>${statusDotHTML(r[2]).replace(/GREEN|AMBER|RED/,"")} ${r[1]}</b></div>`).join("")}];},
 table:()=>({title:"Loan Register",cols:[
   {k:"bank",label:"Bank"},{k:"type",label:"Type"},{k:"out",label:"Outstanding",num:true},{k:"rate",label:"Rate %",num:true,d:1},
   {k:"maturity",label:"Maturity"},{k:"dscr",label:"DSCR",num:true,d:1},{k:"covenant",label:"Covenant",render:v=>statusDotHTML(v==="OK"?"GREEN":"AMBER").replace(/GREEN|AMBER/,v)}],rows:LOANS.register})},

{id:"wc",icon:"↻",
 slice:()=>({dso:58,dpo:52,dio:42,ccc:48,wc:9620,bridge:{ar:-1170,inventory:-400,ap:1160}}),
 kpis(c){ return [
   kpi("Working Capital",c.m(c.v(9620)),c.unit,"18,047 - 8,427","GREEN"),
   kpi("DSO",fmt(c.v(58,{b:45,p:52})),"days","Target 45","RED"),
   kpi("DPO",fmt(c.v(52,{b:45,p:48})),"days","Band 45-55","GREEN"),
   kpi("DIO",fmt(c.v(42,{b:44,p:45})),"days","Turns 8.2","GREEN"),
   kpi("CCC",fmt(c.v(48,{b:55,p:52})),"days","= 58 + 42 - 52","GREEN"),
   kpi("Cash Trapped vs Target DSO",c.m(1597),c.unit,"13 days x 122.9/day","RED")];},
 blocks(c){ const P=PAL(); return [
   {title:"CCC Components Trend (monthly)",span:12,chart:lineOpt(MONTHS,[
     {name:"DSO",data:DSO_M.map(x=>Math.round(c.v(x))),color:P.neg},{name:"DPO",data:DPO_M,color:P.brand},
     {name:"DIO",data:DIO_M,color:P.warn},{name:"CCC",data:CCC_M,color:P.pos}])},
   {title:"Working Capital Bridge (what moved cash FY 2025)",span:12,chart:wfOpt([
     {name:"Start",value:0,total:true},{name:"AR build",value:-1170},{name:"Inventory build",value:-400},{name:"Other",value:-92},{name:"AP relief",value:1160},{name:"Net WC impact",total:true}])}];},
 table:()=>({title:"Days Metrics Detail",cols:[
   {k:"metric",label:"Metric"},{k:"dec",label:"Dec",num:true},{k:"nov",label:"Nov",num:true},{k:"target",label:"Target"},
   {k:"status",label:"Status",render:statusDotHTML},{k:"comment",label:"Comment"}],
   rows:[{metric:"DSO",dec:58,nov:52,target:"<= 45",status:"RED",comment:"3 HIGH-risk customers drive the jump"},
    {metric:"DPO",dec:52,nov:48,target:"45-55",status:"GREEN",comment:"Within policy band"},
    {metric:"DIO",dec:42,nov:42,target:"<= 44",status:"GREEN",comment:"Turns 8.2 vs target 8.0"},
    {metric:"CCC",dec:48,nov:52,target:"<= 55",status:"GREEN",comment:"Improved on DPO extension"}]})},

{id:"ar",icon:"⇤",
 slice:()=>({ar:AR}),
 kpis(c){ return [
   kpi("Total AR",c.m(c.v(AR.total,{p:5980})),c.unit,"= Balance Sheet AR","RED"),
   kpi("DSO",fmt(c.v(58,{b:45,p:52})),"days","Target 45","RED"),
   kpi("90+ Overdue",c.m(365),c.unit,"5.1% of AR","RED"),
   kpi("Provision Total",c.m(AR.provTotal),c.unit,"5.8% coverage","AMBER"),
   kpi("HIGH-Risk Exposure",c.m(1960),c.unit,"3 customers","RED"),
   kpi("Collection Forecast W1-4",c.m(2930),c.unit,"From 13-week model","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"AR Aging Buckets",span:6,chart:barOpt(AR.aging.map(a=>a.b),[
     {name:"Value",data:AR.aging.map(a=>Math.round(c.v(a.v))),cellColor:(v,i)=>i===3?P.neg:i===2?P.warn:P.pos}])},
   {title:"Provision by Risk Class",span:6,chart:pieOpt(AR.provisions.map((p,i)=>({name:p.risk+" ("+p.rate+"%)",value:p.base,color:[P.pos,P.warn,P.neg][i]})))},
   {title:"DSO Trend vs Target",span:12,chart:lineOpt(MONTHS,[
     {name:"DSO",data:DSO_M,color:P.neg},{name:"Target",data:MONTHS.map(_=>45),color:P.pos}])}];},
 table:()=>({title:"Top 10 Customers by AR",cols:[
   {k:"name",label:"Customer"},{k:"country",label:"Country"},{k:"total",label:"AR Total",num:true},
   {k:"risk",label:"Risk",render:v=>statusDotHTML(v==="LOW"?"GREEN":v==="MEDIUM"?"AMBER":"RED").replace(/GREEN|AMBER|RED/,v)},
   {k:"over90",label:"90+ Exposure",num:true},{k:"action",label:"Action"}],rows:AR.customers})},

{id:"ap",icon:"⇥",
 slice:()=>({ap:AP}),
 kpis(c){ return [
   kpi("Total AP",c.m(c.v(AP.total,{p:4520})),c.unit,"= Balance Sheet AP","GREEN"),
   kpi("DPO",fmt(c.v(52,{b:45,p:48})),"days","Band 45-55","GREEN"),
   kpi("P1 Critical Exposure",c.m(2055),c.unit,"3 suppliers","RED"),
   kpi("Due Next 4 Weeks",c.m(1908),c.unit,"From payment calendar","AMBER"),
   kpi("Discount Opportunity",c.m(13),c.unit,"PLASTIK CZECH 2%","GREEN"),
   kpi("90+ Aged AP",c.m(300),c.unit,"Relationship risk","AMBER")];},
 blocks(c){ const P=PAL();
  const cal=[[540,0,120,80],[315,90,0,200],[573,0,380,60],[480,150,0,90]];
  const calHtml=`<div class="cal-heat"><div></div>${["Mon","Tue","Wed","Thu"].map(d=>`<div class="hd">${d}</div>`).join("")}
   ${["W1","W2","W3","W4"].map((w,wi)=>`<div class="hd">${w}</div>`+cal[wi].map(v=>`<div class="cell" style="background:${v>400?P.neg:v>150?P.warn:v>0?P.pos:"transparent"};opacity:${v?1:.12}">${v?fmt(v):""}</div>`).join("")).join("")}</div>
   <div class="note">Values EUR '000. Red = heavy payment day.</div>`;
  return [
   {title:"AP Aging Buckets",span:6,chart:barOpt(AP.aging.map(a=>a.b),[
     {name:"Value",data:AP.aging.map(a=>Math.round(c.v(a.v))),cellColor:(v,i)=>i===3?P.neg:i===2?P.warn:P.brand}])},
   {title:"Priority Mix (P1/P2/P3 of top 10)",span:6,chart:pieOpt(["P1","P2","P3"].map((p,i)=>({name:p,value:AP.suppliers.filter(s=>s.pri===p).reduce((a,b)=>a+b.total,0),color:[P.neg,P.warn,P.pos][i]})))},
   {title:"Payment Calendar Heat (next 4 weeks)",span:12,html:calHtml}];},
 table:()=>({title:"Top 10 Suppliers and Priority Logic",cols:[
   {k:"name",label:"Supplier"},{k:"cat",label:"Category"},{k:"total",label:"Outstanding",num:true},
   {k:"pri",label:"Priority",render:v=>`<b class="${v==="P1"?"neg":v==="P2"?"warn-ink":"pos"}">${v}</b>`},{k:"note",label:"Strategy"}],rows:AP.suppliers})},

{id:"cash13",icon:"◔",
 slice:()=>({weeks:CF13,minCash:MIN_CASH,totals:{inflows:10088,outflows:-10258,net:-170}}),
 kpis(c){ return [
   kpi("Opening Cash W1",c.m(c.v(4850)),c.unit,"= Balance Sheet cash","GREEN"),
   kpi("Closing Cash W13",c.m(c.v(4680)),c.unit,"Q1 net -170","GREEN"),
   kpi("Lowest Week",c.m(c.v(4425)),c.unit,"W3, above min 3,000","GREEN"),
   kpi("Q1 Inflows",c.m(c.v(10088)),c.unit,"Collections + other","GREEN"),
   kpi("Q1 Outflows",c.m(-c.v(10258)),c.unit,"AP, payroll, tax, CAPEX","AMBER"),
   kpi("Funding Gap","None","","No week under 3,000","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Weekly Closing Cash vs Minimum",span:12,chart:lineOpt(CF13.map(w=>w.w),[
     {name:"Closing",data:CF13.map(w=>Math.round(c.v(w.close))),color:P.brand,ref:MIN_CASH,refLabel:"Min 3,000"},
     {name:"Minimum",data:CF13.map(_=>MIN_CASH),color:P.neg}],{area:true,min:2500})},
   {title:"Weekly Inflows and Outflows",span:12,chart:barOpt(CF13.map(w=>w.w),[
     {name:"Collections",data:CF13.map(w=>Math.round(c.v(w.ar))),color:P.pos},
     {name:"Other",data:CF13.map(w=>w.oth),color:"#70e0a0"},
     {name:"AP",data:CF13.map(w=>w.ap),color:P.brand},
     {name:"Payroll",data:CF13.map(w=>w.pay),color:P.brand2},
     {name:"Tax",data:CF13.map(w=>w.tax),color:P.warn},
     {name:"CAPEX",data:CF13.map(w=>w.capex),color:"#e08050"},
     {name:"Loan",data:CF13.map(w=>w.loan),color:P.neg}],{stack:true})}];},
 table(c){ const minClose=Math.min(...CF13.map(x=>x.close));
  return {title:"13-Week Cash Grid (Q1 2026)",cols:[
   {k:"w",label:"Week"},{k:"open",label:"Opening",num:true},{k:"ar",label:"AR Collections",num:true},{k:"oth",label:"Other Income",num:true},
   {k:"ap",label:"AP Payments",num:true},{k:"pay",label:"Payroll",num:true},{k:"tax",label:"Tax / VAT",num:true},
   {k:"capex",label:"CAPEX",num:true},{k:"loan",label:"Loan Repay",num:true},{k:"close",label:"Closing",num:true}],
   rows:CF13.map(w=>({...w,_bold:w.close===minClose}))};}},

{id:"tax",icon:"§",
 slice:()=>({calendar:TAX.calendar,vat:TAX.vat,cit:TAX.cit}),
 kpis(c){ return [
   kpi("Due 15 January",c.m(972),c.unit,"VAT 485 + payroll 155 + social 332","RED"),
   kpi("VAT Payable Dec",c.m(485),c.unit,"56,815K RSD at 117","AMBER"),
   kpi("Annual CIT FY25",c.m(312),c.unit,"15% on 4,117 base","GREEN"),
   kpi("Effective Tax Rate",pct1(312/4262*100),"","vs 15% statutory","GREEN"),
   kpi("Open Filings","0","","All returns filed","GREEN"),
   kpi("Audit Status","None open","","Last audit 2023, clean","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Tax Payment Timeline (Q1-Q2 2026)",span:12,chart:barOpt(TAX.calendar.map(t=>t.item.replace("Monthly ","")),[
     {name:"Amount",data:TAX.calendar.map(t=>t.amount),cellColor:v=>v>400?P.neg:v>100?P.warn:P.pos}])},
   {title:"VAT Build-up Dec (K RSD)",span:6,chart:wfOpt([
     {name:"Output VAT",value:91760,total:true},{name:"Input VAT",value:-34945},{name:"Payable",total:true}])},
   {title:"CIT Build-up (EUR '000)",span:6,chart:wfOpt([
     {name:"EBT",value:4262,total:true},{name:"Permanent",value:85},{name:"Temporary",value:120},{name:"CAPEX relief",value:-350},{name:"Taxable",total:true}])}];},
 table:()=>({title:"Tax Calendar",cols:[
   {k:"item",label:"Obligation"},{k:"amount",label:"Amount",num:true},{k:"due",label:"Due Date"},
   {k:"status",label:"Status",render:v=>statusDotHTML(v==="Pending"?"AMBER":"GREEN").replace(/AMBER|GREEN/,v)}],rows:TAX.calendar})},

{id:"capex",icon:"⚙",
 slice:()=>({capex:CAPEX}),
 kpis(c){ return [
   kpi("CAPEX Budget",c.m(c.v(CAPEX.budget)),c.unit,"FY 2025/26 program","GREEN"),
   kpi("Spent to Date",c.m(c.v(CAPEX.spent)),c.unit,"84% of budget","GREEN"),
   kpi("Remaining",c.m(CAPEX.budget-CAPEX.spent),c.unit,"Mostly L3 press","AMBER"),
   kpi("Projects Complete","3 of 6","","L1, L2, Solar","GREEN"),
   kpi("Delayed Projects","1","","L3 press, ETA Feb 2026","RED"),
   kpi("Avg Portfolio IRR",pct1(16.3),"","Range 13-21%","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Budget vs Spent by Project",span:12,chart:barOpt(CAPEX.projects.map(p=>p.id).reverse(),[
     {name:"Budget",data:CAPEX.projects.map(p=>p.bud).reverse(),color:P.muted},
     {name:"Spent",data:CAPEX.projects.map(p=>p.spent).reverse(),color:P.brand}],{horiz:true})},
   {title:"Portfolio ROI vs IRR",span:6,chart:barOpt(CAPEX.projects.map(p=>p.id),[
     {name:"ROI %",data:CAPEX.projects.map(p=>p.roi),color:P.pos},{name:"IRR %",data:CAPEX.projects.map(p=>p.irr),color:P.brand}])},
   {title:"Approval Workflow Tiers",span:6,html:CAPEX.tiers.map((t,i)=>`<div class="tierrow"><span class="n">${i+1}</span><b style="width:90px;flex-shrink:0">${t[0]}</b><span style="flex:1;color:var(--muted)">${t[1]}</span><span style="color:var(--faint)">${t[2]}</span></div>`).join("")+`<div class="note">Every CAPEX over 100K requires ROI analysis.</div>`}];},
 table:()=>({title:"Project Register",cols:[
   {k:"id",label:"ID"},{k:"name",label:"Project"},{k:"bud",label:"Budget",num:true},{k:"spent",label:"Spent",num:true},
   {k:"status",label:"Status",render:v=>statusDotHTML(v==="Complete"?"GREEN":v==="DELAYED"?"RED":"AMBER").replace(/GREEN|RED|AMBER/,v)},
   {k:"roi",label:"ROI %",num:true},{k:"npv",label:"NPV",num:true},{k:"irr",label:"IRR %",num:true},{k:"payback",label:"Payback (y)",num:true,d:1},{k:"note",label:"Note"}],rows:CAPEX.projects})},

{id:"payroll",icon:"◉",
 slice:()=>({payroll:PAYROLL}),
 kpis(c){ return [
   kpi("Headcount",fmt(c.v(423,{p:405})),"FTE","+4 vs Nov","GREEN"),
   kpi("Payroll Cost Dec",c.m(c.v(892)),c.unit,"Gross salaries","GREEN"),
   kpi("Payroll FY Total",c.m(c.v(13329,{b:13020})),c.unit,"+2.4% vs budget","AMBER"),
   kpi("Cost per FTE",fmt(3350*EUR_BDT),"BDT/mo","Fully loaded","GREEN"),
   kpi("Company Turnover",pct1(7.8),"","Logistics 12.0% highest","AMBER"),
   kpi("Revenue per FTE",c.m(Math.round(44850/423)),c.unit+"/yr","Productivity","GREEN")];},
 blocks(c){ const P=PAL();
  const COST_M=[850,852,858,860,865,870,872,868,875,880,885,892], BUD_M=[845,847,850,850,852,855,855,857,858,860,862,865];
  return [
   {title:"Headcount by Department",span:12,chart:barOpt(PAYROLL.depts.map(d=>d.name).reverse(),[
     {name:"Headcount",data:PAYROLL.depts.map(d=>d.hc).reverse(),color:P.brand}],{horiz:true})},
   {title:"Turnover % by Department",span:6,chart:barOpt(PAYROLL.depts.map(d=>d.name).reverse(),[
     {name:"Turnover %",data:PAYROLL.depts.map(d=>d.to).reverse(),cellColor:v=>v>=10?P.neg:v>=8?P.warn:P.pos}],{horiz:true})},
   {title:"Payroll Cost Trend (monthly)",span:6,chart:lineOpt(MONTHS,[
     {name:"Cost",data:COST_M.map(x=>Math.round(c.v(x))),color:P.brand},{name:"Budget",data:BUD_M,color:P.pos}])}];},
 table:()=>({title:"Department Summary (aggregated only, no personal data)",cols:[
   {k:"name",label:"Department"},{k:"hc",label:"Headcount",num:true},{k:"to",label:"Turnover %",num:true,d:1},
   {k:"flag",label:"Flag",render:(v,r)=>r.to>=10?`<span class="neg">Retention risk</span>`:r.to>=8?`<span class="warn-ink">Watch</span>`:`<span class="pos">OK</span>`}],
   rows:PAYROLL.depts.map(d=>({...d}))})},

{id:"mfg",icon:"▣",
 slice:()=>({ops:OPS}),
 kpis(c){ return [
   kpi("OEE",pct1(c.v(84.2,{b:85,p:83.1})),"","Target 85%","AMBER"),
   kpi("Availability",pct1(92.5),"","OEE component","AMBER"),
   kpi("Performance",pct1(94.8),"","OEE component","GREEN"),
   kpi("Quality",pct1(96.1),"","OEE component","GREEN"),
   kpi("Scrap Rate",pct1(1.8),"","Limit 2.0%","GREEN"),
   kpi("PPM Defects",fmt(125),"ppm","Limit 150","GREEN"),
   kpi("Capacity Utilization",pct1(87.5),"","Band 80-90, near ceiling","AMBER"),
   kpi("MTBF",fmt(485),"hours","Target 450","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"OEE Gauge (A x P x Q)",span:4,chart:gaugeOpt(c.v(84.2,{b:85,p:83.1}),100,"target 85%",P.warn)},
   {title:"OEE Components (%)",span:8,chart:barOpt(["Availability","Performance","Quality"],[
     {name:"Actual",data:[92.5,94.8,96.1],cellColor:v=>v>=95?P.pos:v>=92?P.warn:P.neg}],{ref:95,refLabel:"Benchmark 95"})},
   {title:"OEE Trend vs Target",span:6,chart:lineOpt(MONTHS,[
     {name:"OEE",data:OEE_M,color:P.brand},{name:"Target",data:MONTHS.map(_=>85),color:P.pos}])},
   {title:"PPM Trend vs Limit",span:6,chart:lineOpt(MONTHS,[
     {name:"PPM",data:PPM_M,color:P.pos},{name:"Limit",data:MONTHS.map(_=>150),color:P.neg}])}];},
 table:()=>({title:"Production KPI Detail",cols:[
   {k:"kpi",label:"KPI"},{k:"actual",label:"Actual"},{k:"target",label:"Target / Limit"},
   {k:"status",label:"Status",render:statusDotHTML},{k:"note",label:"Note"}],
   rows:[{kpi:"OEE",actual:"84.2%",target:">= 85%",status:"AMBER",note:"L1 micro-stoppages on tool changes"},
    {kpi:"Scrap",actual:"1.8%",target:"<= 2.0%",status:"GREEN",note:"Stable"},
    {kpi:"PPM",actual:"125",target:"<= 150",status:"GREEN",note:"Improving trend"},
    {kpi:"MTBF",actual:"485 h",target:">= 450 h",status:"GREEN",note:"Preventive maintenance paying off"},
    {kpi:"Capacity",actual:"87.5%",target:"80-90%",status:"AMBER",note:"Near ceiling, L3 press needed"},
    {kpi:"Safety",actual:"0 LTI",target:"0",status:"GREEN",note:"245 days incident-free"}]})},

{id:"opskpi",icon:"◧",
 slice:()=>({kpi8:KPI8,ops:OPS,otd:96.8,safety:{lti:0,days:245}}),
 kpis(c){ return [
   kpi("KPIs Green","18","of 24","75% healthy","GREEN"),
   kpi("KPIs Amber","4","","OEE, OTD, capacity, turnover","AMBER"),
   kpi("KPIs Red","2","","DSO, steel PPV","RED"),
   kpi("OTD",pct1(c.v(96.8,{b:98,p:95.9})),"","Target 98%","AMBER"),
   kpi("Safety LTI","0","","245 days incident-free","GREEN"),
   kpi("Inventory Turns",fmt(c.v(8.2,{b:8,p:7.6}),1),"x","Target 8.0","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"KPI Status Mix by Group",span:12,chart:barOpt(["Financial","Commercial","Supply Chain","Manufacturing","Treasury","HR","Working Capital"],[
     {name:"Green",data:[5,3,2,3,3,1,1],color:P.pos},{name:"Amber",data:[0,1,1,2,0,1,0],color:P.warn},{name:"Red",data:[0,0,0,0,0,0,2],color:P.neg}],{stack:true})},
   {title:"OTD Trend vs Target",span:12,chart:lineOpt(MONTHS,[
     {name:"OTD",data:OTD_M,color:P.brand},{name:"Target",data:MONTHS.map(_=>98),color:P.pos}])}];},
 table:()=>({title:"KPI Library (traffic lights)",cols:[
   {k:"group",label:"Group"},{k:"kpi",label:"KPI"},{k:"actual",label:"Actual"},{k:"prior",label:"Prior Month"},{k:"fy",label:"FY Avg"},{k:"target",label:"Target"},
   {k:"status",label:"Status",render:statusDotHTML},{k:"trend",label:"Trend",render:trendHTML}],
   rows:[
    {group:"Financial",kpi:"Gross Margin %",actual:"28.5",prior:"27.8",fy:"28.2",target:">= 27",status:"GREEN",trend:"UP"},
    {group:"Financial",kpi:"EBITDA Margin %",actual:"13.2",prior:"12.5",fy:"12.8",target:">= 12",status:"GREEN",trend:"UP"},
    {group:"Financial",kpi:"Net Margin %",actual:"8.7",prior:"8.2",fy:"8.8",target:">= 8",status:"GREEN",trend:"UP"},
    {group:"Commercial",kpi:"Sales Growth YoY %",actual:"8.9",prior:"8.4",fy:"8.9",target:">= 5",status:"GREEN",trend:"UP"},
    {group:"Commercial",kpi:"Top 3 Concentration %",actual:"38.0",prior:"37.2",fy:"36.5",target:"<= 35",status:"AMBER",trend:"DOWN"},
    {group:"Supply Chain",kpi:"OTD %",actual:"96.8",prior:"96.7",fy:"96.4",target:">= 98",status:"AMBER",trend:"UP"},
    {group:"Supply Chain",kpi:"Inventory Turns",actual:"8.2",prior:"8.1",fy:"8.0",target:">= 8",status:"GREEN",trend:"UP"},
    {group:"Manufacturing",kpi:"OEE %",actual:"84.2",prior:"83.8",fy:"84.0",target:">= 85",status:"AMBER",trend:"UP"},
    {group:"Manufacturing",kpi:"Scrap %",actual:"1.8",prior:"1.9",fy:"1.9",target:"<= 2.0",status:"GREEN",trend:"UP"},
    {group:"Manufacturing",kpi:"PPM",actual:"125",prior:"128",fy:"131",target:"<= 150",status:"GREEN",trend:"UP"},
    {group:"Manufacturing",kpi:"Capacity Util %",actual:"87.5",prior:"87.0",fy:"86.2",target:"80-90",status:"AMBER",trend:"UP"},
    {group:"Manufacturing",kpi:"MTBF hours",actual:"485",prior:"478",fy:"466",target:">= 450",status:"GREEN",trend:"UP"},
    {group:"Treasury",kpi:"Cash Runway weeks",actual:"14",prior:"12",fy:"14",target:">= 12",status:"GREEN",trend:"UP"},
    {group:"Treasury",kpi:"Cash Conversion Ratio",actual:"0.92",prior:"0.88",fy:"0.90",target:">= 0.85",status:"GREEN",trend:"UP"},
    {group:"HR",kpi:"Turnover %",actual:"7.8",prior:"7.6",fy:"7.5",target:"<= 8",status:"AMBER",trend:"DOWN"},
    {group:"HR",kpi:"Safety days incident-free",actual:"245",prior:"215",fy:"n/a",target:"365",status:"GREEN",trend:"UP"},
    {group:"Working Capital",kpi:"DSO days",actual:"58",prior:"52",fy:"55",target:"<= 45",status:"RED",trend:"DOWN"},
    {group:"Working Capital",kpi:"DPO days",actual:"52",prior:"48",fy:"50",target:"45-55",status:"GREEN",trend:"UP"},
    {group:"Working Capital",kpi:"CCC days",actual:"48",prior:"52",fy:"50",target:"<= 55",status:"GREEN",trend:"UP"}]})},

{id:"risk",icon:"⚠",
 slice:()=>({risks:RISKS,opportunities:OPPS,anomalies:["DSO 52 to 58","STEELWERK 12 days late","L3 CAPEX slip"]}),
 kpis(c){ return [
   kpi("Risks Tracked","10","","3 critical (score 16+)","RED"),
   kpi("Opportunities","10","","Top: EV demand upside","GREEN"),
   kpi("Anomalies Detected","3","","DSO, supplier, CAPEX","AMBER"),
   kpi("Fraud Signals","0","","Demo logic, 2 checks active","GREEN"),
   kpi("Actions Open","8","","2 due this month","AMBER"),
   kpi("Avg Risk Score",fmt(RISKS.reduce((a,b)=>a+b.impact*b.likelihood,0)/RISKS.length,1),"of 25","Impact x likelihood","AMBER")];},
 blocks(c){ return [
   {title:"Risk Heat Map 5x5",span:6,html:heat5(RISKS)},
   {title:"Opportunity Heat Map 5x5",span:6,html:heat5(OPPS)},
   {title:"Anomaly Alert Feed",span:12,html:`<div class="feed">${[
     ["r","DSO jumped 52 to 58 days in December","Statistical outlier vs 12-month trend. Linked to 3 HIGH-risk customers."],
     ["r","STEELWERK delivery 12 days late","Longest delay in 24 months from a P1 critical supplier."],
     ["a","CAP-003 L3 press slipped to Feb 2026","850 of spend and the capacity plan move one quarter."],
     ["a","Duplicate invoice check (demo logic)","0 hits in December run across 1,240 invoices."],
     ["g","Weekend postings check (demo logic)","2 postings flagged, both authorized month-end entries."]
   ].map(a=>`<div class="it"><span class="dot ${a[0]}" style="margin-top:4px"></span><div><b>${a[1]}</b><span class="d">${a[2]}</span></div></div>`).join("")}</div>`}];},
 table:()=>({title:"Risk Register and Action Tracker",cols:[
   {k:"name",label:"Risk"},{k:"impact",label:"Impact",num:true},{k:"likelihood",label:"Likelihood",num:true},
   {k:"score",label:"Score",render:(v,r)=>`<b class="${r.impact*r.likelihood>=16?"neg":r.impact*r.likelihood>=9?"warn-ink":"pos"}">${r.impact*r.likelihood}</b>`},
   {k:"action",label:"Mitigation"},{k:"owner",label:"Owner"},{k:"deadline",label:"Deadline"}],
   rows:RISKS.map(r=>({...r,score:r.impact*r.likelihood}))})},

{id:"controls",icon:"✓",
 slice:()=>({phases:CONTROLS}),
 kpis(c){ return [
   kpi("Process Phases","6","","Collection to Archive","GREEN"),
   kpi("Key Controls","6","","All operating","GREEN"),
   kpi("SoD Conflicts","1","","AP clerk with vendor create","AMBER"),
   kpi("Audit Trail","Complete","","ERP + DMS logging","GREEN"),
   kpi("Control Failures YTD","0","","No overrides recorded","GREEN"),
   kpi("Last Audit","2023","","Clean opinion","GREEN")];},
 blocks(c){ return [
   {title:"6-Phase Process Map (click a phase)",span:12,html:`
    <div class="phasebar">${CONTROLS.map((p,i)=>`<button class="phase ${i===0?"on":""}" onclick="pmSel(${i},this)">${p.phase}</button>${i<5?'<span class="parrow">→</span>':""}`).join("")}</div>
    <div class="pdetail" id="pm-detail">${pmDetail(0)}</div>`},
   {title:"Department Dependency Mini-map",span:12,html:`<div class="deps">${["Finance","Sales","Inventory","Purchase","Treasury","Payroll","Tax","Operations"].map((d,i)=>`<span class="dep ${i===0?"hub":""}">${d}${i?' <small>→ Finance</small>':""}</span>`).join("")}</div>`}];},
 table:()=>({title:"Control Matrix",cols:[
   {k:"phase",label:"Phase"},{k:"input",label:"Inputs"},{k:"output",label:"Outputs"},{k:"control",label:"Key Control"},{k:"owner",label:"Owner"},{k:"tool",label:"Tool"}],rows:CONTROLS})},

{id:"datagov",icon:"⛁",
 slice:()=>({sources:DATA_SOURCES.map(s=>({source:s[0],owner:s[1],quality:s[8],completeness:s[9],missing:s[10]})),retention:RETENTION}),
 kpis(c){ return [
   kpi("Data Sources","17","","Catalogued","GREEN"),
   kpi("Avg Quality Score",fmt(DATA_SOURCES.reduce((a,b)=>a+b[8],0)/17,1),"of 100","Target 90+","GREEN"),
   kpi("Avg Completeness",pct1(DATA_SOURCES.reduce((a,b)=>a+b[9],0)/17),"","Target 95%+","AMBER"),
   kpi("Flagged Sources","2","","Excel Models, Doc Mgmt","AMBER"),
   kpi("Daily Refreshed","9","of 17","53% near-real-time","GREEN"),
   kpi("Retention Policies","5","","All documented","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Quality Score by Source",span:6,chart:barOpt(DATA_SOURCES.map(s=>s[0]).reverse(),[
     {name:"Quality",data:DATA_SOURCES.map(s=>s[8]).reverse(),cellColor:v=>v>=90?P.pos:v>=80?P.warn:P.neg}],{horiz:true}),tall:true},
   {title:"Completeness % by Source",span:6,chart:barOpt(DATA_SOURCES.map(s=>s[0]).reverse(),[
     {name:"Completeness",data:DATA_SOURCES.map(s=>s[9]).reverse(),cellColor:v=>v>=95?P.pos:v>=88?P.warn:P.neg}],{horiz:true}),tall:true},
   {title:"Retention Policy",span:12,html:`<div class="chips">${RETENTION.map(r=>`<span class="chip" style="cursor:default">${r[0]}: <b>${r[1]}</b></span>`).join("")}</div>`}];},
 table:()=>({title:"Data Source Catalogue (17 sources)",cols:[
   {k:0,label:"Source"},{k:1,label:"Owner"},{k:2,label:"Frequency"},{k:3,label:"Format"},{k:4,label:"Purpose"},{k:5,label:"Controls"},
   {k:6,label:"Access"},{k:7,label:"Storage"},{k:8,label:"Quality",num:true},{k:9,label:"Complete %",num:true},{k:10,label:"Missing Fields"}],
   rows:DATA_SOURCES})},

{id:"docs",icon:"✎",
 slice:()=>({docs:DOCS.map(d=>({name:d.name,cat:d.cat,status:d.status,complete:d.complete}))}),
 kpis(c){ return [
   kpi("Documents Tracked","40","","9 categories","GREEN"),
   kpi("Approved & Current",String(DOCS.filter(d=>d.status==="Approved").length),"of 40","90% healthy","GREEN"),
   kpi("Missing","1","","Transfer Pricing Doc","RED"),
   kpi("Outdated","3","","Overdue for review","AMBER"),
   kpi("Avg Completeness",pct1(DOCS.reduce((a,b)=>a+b.complete,0)/40),"","Target 100%","AMBER"),
   kpi("Next Review Wave","Q1 2026","","12 documents","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Completeness by Category",span:6,chart:barOpt(DOC_CATS.map(x=>x.cat).reverse(),[
     {name:"Complete %",data:DOC_CATS.map(cat=>{const it=DOCS.filter(d=>d.cat===cat.cat);return Math.round(it.reduce((a,b)=>a+b.complete,0)/it.length);}).reverse(),
      cellColor:v=>v>=100?P.pos:v>=80?P.warn:P.neg}],{horiz:true})},
   {title:"Status Mix",span:6,chart:pieOpt([
     {name:"Approved",value:DOCS.filter(d=>d.status==="Approved").length,color:P.pos},
     {name:"Outdated",value:DOCS.filter(d=>d.status==="OUTDATED").length,color:P.warn},
     {name:"Missing",value:DOCS.filter(d=>d.status==="MISSING").length,color:P.neg}])},
   {title:"Overdue Alerts",span:12,html:`<div class="feed">${DOCS.filter(d=>d.status!=="Approved").map(d=>
     `<div class="it"><span class="dot ${d.status==="MISSING"?"r":"a"}" style="margin-top:4px"></span><div><b>${d.name}</b><span class="d">${d.status==="MISSING"?"Not prepared. Required for tax compliance.":"Last updated "+d.updated+", review overdue."}</span></div></div>`).join("")}</div>`}];},
 table:()=>({title:"Document Register (40 documents)",cols:[
   {k:"cat",label:"Category"},{k:"name",label:"Document"},{k:"owner",label:"Owner"},{k:"freq",label:"Frequency"},{k:"version",label:"Version"},
   {k:"status",label:"Status",render:v=>statusDotHTML(v==="Approved"?"GREEN":v==="MISSING"?"RED":"AMBER").replace(/GREEN|RED|AMBER/,v)},
   {k:"updated",label:"Last Updated"},{k:"next",label:"Next Review"},{k:"complete",label:"Complete %",num:true}],rows:DOCS})},

{id:"forecast",icon:"◭",
 slice:()=>({q1:{revenue:11500,ebitda:1530,closingCash:4680},cases:{base:"as modeled",best:"+5% revenue",worst:"-8% revenue, steel +5%"},accuracy:96.2}),
 kpis(c){ return [
   kpi("Q1 Revenue Forecast",c.m(c.v(11500,{b:11100,p:10850})),c.unit,"+6% vs Q1 2025","GREEN"),
   kpi("Q1 EBITDA Forecast",c.m(c.v(1530,{b:1420,p:1370})),c.unit,"13.3% margin","GREEN"),
   kpi("Q1 Closing Cash",c.m(c.v(4680)),c.unit,"W13 from cash model","GREEN"),
   kpi("FY 2026 Revenue",c.m(c.v(48500,{b:47000})),c.unit,"+8.1% growth plan","GREEN"),
   kpi("Forecast Accuracy",pct1(96.2),"","Rolling 6 months","GREEN"),
   kpi("Forecast Bias","-1.1%","","Slightly conservative","GREEN")];},
 blocks(c){ const P=PAL(); return [
   {title:"Scenario Simulator (live)",span:12,html:`
    <div class="simgrid"><div class="sim-sliders">
      <div class="srow"><div class="lbl"><span>Revenue growth</span><b id="sv-rev">+0%</b></div><input type="range" min="-15" max="15" value="0" id="sim-rev" oninput="simCalc()"></div>
      <div class="srow"><div class="lbl"><span>Material cost</span><b id="sv-mat">+0%</b></div><input type="range" min="-10" max="15" value="0" id="sim-mat" oninput="simCalc()"></div>
      <div class="srow"><div class="lbl"><span>DSO change</span><b id="sv-dso">+0 days</b></div><input type="range" min="-10" max="15" value="0" id="sim-dso" oninput="simCalc()"></div>
      <div class="note">Cases: Base | Best (+5% revenue) | Worst (-8% revenue, steel +5%) | Custom (your sliders). Minimum cash policy 3,000.</div>
    </div><div class="tbl-wrap" style="max-height:none"><table class="dt"><thead><tr><th>Case</th><th>Revenue</th><th>EBITDA</th><th>Closing Cash</th></tr></thead><tbody id="sim-body"></tbody></table></div></div>`},
   {title:"Revenue Fan Chart (Q1 2026 weekly, cumulative)",span:12,chart:lineOpt(CF13.map(w=>w.w),[
     {name:"Best",data:CF13.map((w,i)=>Math.round((i+1)*885*1.05)),color:P.pos},
     {name:"Base",data:CF13.map((w,i)=>(i+1)*885),color:P.brand},
     {name:"Worst",data:CF13.map((w,i)=>Math.round((i+1)*885*.92)),color:P.neg}],{area:true})},
   {title:"EBITDA Sensitivity Tornado (Q1 impact, EUR '000)",span:12,chart:barOpt(["Energy +/-10%","FX +/-2%","DSO +/-5 days","Steel price +/-5%","Revenue +/-5%"],[
     {name:"Impact",data:[31,38,62,126,161],color:P.brand}],{horiz:true})}];},
 table:()=>({title:"Forecast Accuracy Tracker",cols:[
   {k:"period",label:"Period"},{k:"forecast",label:"Forecast",num:true},{k:"actual",label:"Actual",num:true},
   {k:"acc",label:"Accuracy",render:v=>pct1(v)},{k:"note",label:"Note"}],
   rows:[{period:"Jul 2025",forecast:3560,actual:3680,acc:96.7,note:"Under-forecast summer demand"},
    {period:"Aug 2025",forecast:3540,actual:3610,acc:98.1,note:"Good"},
    {period:"Sep 2025",forecast:3800,actual:3895,acc:97.6,note:"EV ramp missed slightly"},
    {period:"Oct 2025",forecast:3900,actual:3760,acc:96.4,note:"Over-forecast, customer push-out"},
    {period:"Nov 2025",forecast:3700,actual:3650,acc:98.6,note:"Good"},
    {period:"Dec 2025",forecast:3760,actual:3920,acc:95.9,note:"Year-end pull-in surprised"}]})},

{id:"yield",icon:"⇕",live:true,singleCoOnly:true,
 slice:()=>LIVE_YIELD||{total:{},topPositive:[],topNegative:[]},
 kpis(){ const Y=LIVE_YIELD||{total:{curRevenue:0,pyRevenue:0,priceEffect:0,volumeEffect:0},topPositive:[],topNegative:[]};
  const t=Y.total, netVar=(t.curRevenue||0)-(t.pyRevenue||0);
  return [
   kpi("Revenue (Range)",lm(t.curRevenue||0),lunit(),"vs PY "+lm(t.pyRevenue||0),"GREEN"),
   kpi("Revenue Change",lm(netVar),lunit(),netVar>=0?"Growth vs same range last year":"Decline vs same range last year",netVar>=0?"GREEN":"RED"),
   kpi("Price Effect",lm(t.priceEffect||0),lunit(),"Price-driven portion of the change",(t.priceEffect||0)>=0?"GREEN":"RED"),
   kpi("Volume Effect",lm(t.volumeEffect||0),lunit(),"Volume-driven portion of the change",(t.volumeEffect||0)>=0?"GREEN":"RED"),
   kpi("SKUs Analyzed",String(Y.topPositive.length+Y.topNegative.length),"","Top movers shown below","GREEN")];},
 blocks(){ const P=PAL(),Y=LIVE_YIELD||{total:{},topPositive:[],topNegative:[]};
  return [
   {title:"Revenue Change: Price vs Volume",span:6,chart:barOpt(["Price Effect","Volume Effect"],[
     {name:"Effect",data:[Math.round((Y.total.priceEffect||0)*100)/100,Math.round((Y.total.volumeEffect||0)*100)/100],cellColor:v=>v>=0?P.pos:P.neg}])},
   {title:"Highest Yield-Impact SKUs",span:6,chart:barOpt(Y.topPositive.map(s=>s.name.slice(0,22)),[
     {name:"Net Effect",data:Y.topPositive.map(s=>Math.round(s.netEffect*100)/100),color:P.pos}],{horiz:true})},
   {title:"Lowest Yield-Impact SKUs",span:12,chart:barOpt(Y.topNegative.map(s=>s.name.slice(0,22)),[
     {name:"Net Effect",data:Y.topNegative.map(s=>Math.round(s.netEffect*100)/100),cellColor:()=>P.neg}],{horiz:true})}];},
 table(){ const Y=LIVE_YIELD||{topPositive:[],topNegative:[]};
  return {title:"SKU Yield Impact -- Price vs Volume (current range vs same range last year, BDT Cr)",cols:[
   {k:"name",label:"SKU"},{k:"curRevenue",label:"Revenue",num:true,d:2},{k:"priceEffect",label:"Price Effect",num:true,d:2},
   {k:"volumeEffect",label:"Volume Effect",num:true,d:2},{k:"netEffect",label:"Net Effect",num:true,d:2}],
   rows:[...Y.topPositive,...Y.topNegative]};}},

{id:"chgeo",icon:"⛶",live:true,singleCoOnly:true,
 slice:()=>LIVE_CHGEO||{channel:[],geo:[]},
 kpis(){ const G=LIVE_CHGEO||{channel:[],geo:[]};
  const chTotal=G.channel.reduce((a,b)=>a+b.value,0);
  const topCh=[...G.channel].sort((a,b)=>b.value-a.value)[0]||{name:"-",value:0};
  const topGeo=[...G.geo].sort((a,b)=>b.value-a.value)[0]||{name:"-",value:0};
  return [
   kpi("Total Sales (Range)",lm(chTotal),lunit(),"All channels","GREEN"),
   kpi("Top Channel",topCh.name,"",lm(topCh.value)+" "+lunit(),"GREEN"),
   kpi("Top Channel Share",pct1(chTotal?topCh.value/chTotal*100:0),"","of range sales","GREEN"),
   kpi("Top Region",topGeo.name,"",lm(topGeo.value)+" "+lunit(),"GREEN"),
   kpi("Channels Tracked",String(G.channel.length),"","Incl. Other","GREEN"),
   kpi("Regions Tracked",String(G.geo.length),"","Incl. Other","GREEN")];},
 blocks(){ const P=PAL(),G=LIVE_CHGEO||{channel:[],geo:[]};
  const cols=[P.brand,P.pos,P.warn,P.brand2,P.neg,P.muted,"#8560f4"];
  return [
   {title:"Sales by Channel",span:6,chart:pieOpt(G.channel.map((c,i)=>({name:c.name,value:Math.round(c.value*100)/100,color:cols[i%cols.length]})))},
   {title:"Sales by Geography",span:6,chart:pieOpt(G.geo.map((g,i)=>({name:g.name,value:Math.round(g.value*100)/100,color:cols[i%cols.length]})))},
   {title:"Channel Mix (BDT Cr)",span:12,chart:barOpt(G.channel.map(c=>c.name),[{name:"Sales",data:G.channel.map(c=>Math.round(c.value*100)/100),color:P.brand}])}];},
 table(){ const G=LIVE_CHGEO||{channel:[],geo:[]};
  return {title:"Channel and Geographic Sales Split (BDT Cr)",cols:[{k:"type",label:"Type"},{k:"name",label:"Segment"},{k:"value",label:"Sales",num:true,d:2}],
   rows:[...G.channel.map(c=>({type:"Channel",...c})),...G.geo.map(g=>({type:"Geography",...g}))]};}},

{id:"prodinv",icon:"⌬",live:true,singleCoOnly:true,
 slice:()=>LIVE_PRODINV||{production:{},inventory:{}},
 kpis(){ const D=LIVE_PRODINV||{production:{},inventory:{}}; const p=D.production||{}, inv=D.inventory||{};
  return [
   kpi("OEE",pct1(p.oee||0),"","Availability x Performance x Quality",(p.oee||0)>=85?"GREEN":(p.oee||0)>=70?"AMBER":"RED"),
   kpi("Availability",pct1(p.availability||0),"","Run time / planned time","GREEN"),
   kpi("Performance",pct1(p.performance||0),"","Output / shift target (proxy)","AMBER"),
   kpi("Quality",pct1(p.quality||0),"","Good / actual output","GREEN"),
   kpi("Open Production Orders",String(p.openOrders||0),"","In progress","GREEN"),
   kpi("Total Inventory",lm(inv.total||0),lunit(),"Current stock value","GREEN")];},
 blocks(){ const P=PAL(),D=LIVE_PRODINV||{production:{},inventory:{byAbc:[],ageing:[]}};
  const inv=D.inventory||{byAbc:[],ageing:[]};
  const bOrder=["0-30","31-60","61-90","90+"];
  const bVal=b=>{const f=inv.ageing.find(x=>x.bucket===b);return f?Math.round(f.value*100)/100:0;};
  return [
   {title:"Production OEE",span:6,chart:gaugeOpt(Math.round(D.production&&D.production.oee||0),100,"OEE %",P.pos)},
   {title:"Inventory Value by ABC Class",span:6,chart:pieOpt((inv.byAbc||[]).map((a,i)=>({name:"Class "+a.abc,value:Math.round(a.value*100)/100,color:[P.brand,P.pos,P.warn,P.muted][i%4]})))},
   {title:"Inventory Ageing (value by days on hand)",span:12,chart:barOpt(bOrder,[
     {name:"Value",data:bOrder.map(bVal),cellColor:(v,i)=>i===3?P.neg:i===2?P.warn:P.pos}])}];},
 table(){ const D=LIVE_PRODINV||{production:{},inventory:{byAbc:[],ageing:[]}};
  const inv=D.inventory||{byAbc:[],ageing:[]}, p=D.production||{};
  return {title:"Production and Inventory Status Detail",cols:[{k:"metric",label:"Metric"},{k:"value",label:"Value"}],
   rows:[
    {metric:"Availability %",value:pct1(p.availability||0)},
    {metric:"Performance % (proxy)",value:pct1(p.performance||0)},
    {metric:"Quality %",value:pct1(p.quality||0)},
    {metric:"OEE %",value:pct1(p.oee||0)},
    {metric:"Open Production Orders",value:p.openOrders||0},
    {metric:"Closed Production Orders",value:p.closedOrders||0},
    ...(inv.byAbc||[]).map(a=>({metric:"Inventory Class "+a.abc,value:lm(a.value)+" "+lunit()})),
    ...(inv.ageing||[]).map(a=>({metric:"Inventory Aged "+a.bucket+" days",value:lm(a.value)+" "+lunit()})),
   ]};}},

{id:"glvar",icon:"⇄",live:true,singleCoOnly:true,
 slice:()=>LIVE_GLVAR||{departments:[],finance:{}},
 kpis(){ const G=LIVE_GLVAR||{departments:[],finance:{budget:0,actual:0,variance:0}};
  const totalVar=G.departments.reduce((a,d)=>a+d.variance,0);
  const worst=[...G.departments].sort((a,b)=>a.variance-b.variance)[0]||{name:"-",variance:0};
  const best=[...G.departments].sort((a,b)=>b.variance-a.variance)[0]||{name:"-",variance:0};
  const fin=G.finance||{budget:0,actual:0,variance:0};
  return [
   kpi("Departments Tracked",String(G.departments.length),"","Cost categories","GREEN"),
   kpi("Net Cost Variance",lm(totalVar),lunit(),totalVar>=0?"Net favorable":"Net unfavorable",totalVar>=0?"GREEN":"RED"),
   kpi("Largest Unfavorable",worst.name,"",lm(worst.variance)+" "+lunit(),"RED"),
   kpi("Largest Favorable",best.name,"",lm(best.variance)+" "+lunit(),"GREEN"),
   kpi("Finance Expense Actual",lm(fin.actual||0),lunit(),"vs Budget "+lm(fin.budget||0),"AMBER"),
   kpi("Finance Expense Variance",lm(fin.variance||0),lunit(),(fin.variance||0)>=0?"Favorable":"Unfavorable",(fin.variance||0)>=0?"GREEN":"RED")];},
 blocks(){ const P=PAL(),G=LIVE_GLVAR||{departments:[],finance:{}};
  const fin=G.finance||{budget:0,actual:0};
  return [
   {title:"GL Variance by Department (favorable green, unfavorable red)",span:12,chart:barOpt(G.departments.map(d=>d.name),[
     {name:"Variance",data:G.departments.map(d=>Math.round(d.variance*100)/100),cellColor:v=>v>=0?P.pos:P.neg}],{horiz:true})},
   {title:"Finance (Financial Expenses) vs Budget",span:12,chart:barOpt(["Finance"],[
     {name:"Budget",data:[Math.round((fin.budget||0)*100)/100],color:P.muted},
     {name:"Actual",data:[Math.round((fin.actual||0)*100)/100],color:P.brand}])}];},
 table(){ const G=LIVE_GLVAR||{departments:[]};
  const rows=[];
  (G.departments||[]).forEach(d=>d.top3.forEach(l=>rows.push({dept:d.name,subGl:l.subGl,budget:l.budget,actual:l.actual,variance:l.variance})));
  return {title:"Top 3 Sub-GL Variance vs Budget by Department (BDT Cr)",cols:[
   {k:"dept",label:"Department"},{k:"subGl",label:"Sub-GL"},{k:"budget",label:"Budget",num:true,d:2},
   {k:"actual",label:"Actual",num:true,d:2},{k:"variance",label:"Variance",num:true,d:2},
   {k:"fu",label:"F/U",render:(v,r)=>`<b class="${r.variance>=0?"pos":"neg"}">${r.variance>=0?"F":"U"}</b>`}],rows};}},

{id:"ratios",icon:"÷",live:true,singleCoOnly:true,
 slice:()=>LIVE_RATIOS||{},
 kpis(){ const R=LIVE_RATIOS||{ratios:{liquidity:[],profitability:[],activity:[],leverage:[]}};
  const find=(grp,sl)=>(R.ratios[grp]||[]).find(x=>x.sl===sl)||{value:null,status:"n/a",std:""};
  function s2(st){return st==="Good"?"GREEN":st==="Needs Attention"?"RED":"AMBER";}
  const cur=find("liquidity","1.02"), roe=find("profitability","2.06"), dscr=find("activity","3.14"), ccc=find("activity","3.11"),
        npr=find("profitability","2.03"), de=find("leverage","4.02");
  return [
   kpi("Current Ratio",fmt(cur.value,2),"x","Std "+cur.std,s2(cur.status)),
   kpi("Return on Equity",pct1((roe.value||0)*100),"","Std "+roe.std,s2(roe.status)),
   kpi("DSCR",fmt(dscr.value,2),"x","Std "+dscr.std+" (proxy)",s2(dscr.status)),
   kpi("Cash Conversion Cycle",fmt(ccc.value,0),"days","Std "+ccc.std,s2(ccc.status)),
   kpi("Net Profit Ratio",pct1((npr.value||0)*100),"","Std "+npr.std,s2(npr.status)),
   kpi("Debt to Equity",fmt(de.value,2),"x","Std "+de.std,s2(de.status))];},
 blocks(){ const P=PAL(),R=LIVE_RATIOS||{ratios:{liquidity:[],profitability:[],activity:[],leverage:[]}};
  const grpChart=(title,list)=>({title,span:6,chart:barOpt(list.map(x=>x.name),[
    {name:"Value",data:list.map(x=>Math.round((x.value||0)*100)/100),cellColor:(v,i)=>list[i]&&list[i].status==="Needs Attention"?P.neg:P.pos}],{horiz:true})});
  return [
   grpChart("Liquidity Ratios",R.ratios.liquidity||[]),
   grpChart("Profitability Ratios",R.ratios.profitability||[]),
   grpChart("Activity / Efficiency Ratios",R.ratios.activity||[]),
   grpChart("Capital Structure / Leverage Ratios",R.ratios.leverage||[])];},
 table(){ const R=LIVE_RATIOS||{ratios:{liquidity:[],profitability:[],activity:[],leverage:[]}};
  const groups=[["Liquidity",R.ratios.liquidity],["Profitability",R.ratios.profitability],["Activity",R.ratios.activity],["Leverage",R.ratios.leverage]];
  const rows=[];
  groups.forEach(([g,list])=>(list||[]).forEach(x=>rows.push({group:g,sl:x.sl,name:x.name,std:x.std,value:x.value,unit:x.unit,status:x.status,note:x.note||""})));
  return {title:"Financial Ratio Pack (per docs/Financial_and_Ratio_Formulas.md)",cols:[
   {k:"group",label:"Group"},{k:"sl",label:"SL"},{k:"name",label:"Ratio"},{k:"std",label:"Std"},
   {k:"value",label:"Value",render:(v,r)=>v===null||v===undefined?"n/a":r.unit==="days"?fmt(v,0)+" d":r.unit==="amt"?fmt(v,2):fmt(v,2)+"x"},
   {k:"status",label:"Status",render:v=>statusDotHTML(v==="Good"?"GREEN":v==="Needs Attention"?"RED":"AMBER").replace(/GREEN|AMBER|RED/,v)},
   {k:"note",label:"Note"}],rows};}},

{id:"competitor",icon:"◎",aiWeb:true,
 slice:()=>LIVE_COMP||{},
 kpis(){ const C=LIVE_COMP||{};
  return [
   kpi("Competitors Found",String((C.competitors||[]).length),"","Via AI web search","AMBER"),
   kpi("Market Position",(C.marketPosition||"Not yet run").slice(0,28),"","Click Run Search below","AMBER"),
   kpi("As Of",C.asOf||"-","","Search timestamp","AMBER")];},
 blocks(){ const C=LIVE_COMP||{};
  const btnLabel=C.summary?"↻ Refresh Competitor Search":"✦ Run Competitor Search";
  const btn=`<button class="tb-btn primary" onclick="fetchCompetitorClick(this)">${btnLabel}</button>
   <p style="margin-top:8px;font-size:11.5px;color:var(--muted)">AI-generated from public web sources via Google Search grounding. Not ERP data -- verify before use.</p>`;
  const list=(C.competitors||[]).map(x=>`<div class="covrow"><span>${esc(x.name)}</span><b>${esc(x.estMarketShare||"unknown")}</b></div>`).join("")||"<p>No search run yet.</p>";
  const sources=(C.sources||[]).map(s=>`<div><a href="${esc(s.uri)}" target="_blank" rel="noopener">${esc(s.title||s.uri)}</a></div>`).join("")||"<p>-</p>";
  return [
   {title:"Run / Refresh Search",span:4,html:btn},
   {title:"Summary",span:8,html:`<p>${esc(C.summary||("Click Run Competitor Search to fetch current public information for "+coName()+"."))}</p>`},
   {title:"Competitors & Estimated Market Share",span:6,html:list},
   {title:"Sources",span:6,html:sources}];},
 table(){ const C=LIVE_COMP||{};
  return {title:"Competitor Landscape",cols:[{k:"name",label:"Competitor"},{k:"estMarketShare",label:"Est. Market Share"},{k:"note",label:"Note"}],rows:C.competitors||[]};}},
];

/* Custom widget handlers */
function pmDetail(i){ const p=CONTROLS[i];
  return `<div><b>Inputs:</b> ${p.input}</div><div><b>Outputs:</b> ${p.output}</div><div><b>Key Control:</b> ${p.control}</div><div><b>Owner:</b> ${p.owner} <span style="color:var(--faint)">via ${p.tool}</span></div>`; }
function pmSel(i,btn){ document.querySelectorAll(".phase").forEach(b=>b.classList.remove("on")); btn.classList.add("on");
  document.getElementById("pm-detail").innerHTML=pmDetail(i); }
function simCalc(){
  const rev=+document.getElementById("sim-rev").value, mat=+document.getElementById("sim-mat").value, dso=+document.getElementById("sim-dso").value;
  document.getElementById("sv-rev").textContent=(rev>0?"+":"")+rev+"%";
  document.getElementById("sv-mat").textContent=(mat>0?"+":"")+mat+"%";
  document.getElementById("sv-dso").textContent=(dso>0?"+":"")+dso+" days";
  const baseRev=11500, baseEb=1530, baseCash=4680;
  const calc=(r,mch,d)=>{ const revenue=baseRev*(1+r/100);
    const ebitda=baseEb+(revenue-baseRev)*.282-baseRev*.45*(1+r/100)*(mch/100);
    const cash=baseCash+(ebitda-baseEb)*.9-d*122.9/4;
    return {revenue,ebitda,cash}; };
  const m=ctx().m;
  const cases=[["Base",calc(0,0,0),"var(--brand)"],["Best",calc(5,0,0),"var(--pos)"],["Worst",calc(-8,5,0),"var(--neg)"],["Custom",calc(rev,mat,dso),"var(--warn)"]];
  document.getElementById("sim-body").innerHTML=cases.map(([n,x,col])=>
    `<tr><td style="color:${col};font-weight:700">${n}</td><td class="num">${m(Math.round(x.revenue))}</td>
     <td class="num ${x.ebitda<baseEb?"neg":""}">${m(Math.round(x.ebitda))}</td>
     <td class="num ${x.cash<MIN_CASH?"neg":""}" style="${x.cash<MIN_CASH?"font-weight:700":""}">${m(Math.round(x.cash))}${x.cash<MIN_CASH?" ⚠":""}</td></tr>`).join("");
}

/* ================= Merge configs + metadata ================= */
const ROBOTS=PAGES.map(p=>({...p,...META.find(m=>m.id===p.id)}));
/* ===== 7-SECTION CONSOLIDATION =====================================
   The 23 underlying robot definitions are preserved (charts, tables,
   insights). They are presented through 7 consolidated section-robots,
   each holding its members as in-page tabs. Navigation shows 7 items. */
const SECTIONS=[
  {id:"s-exec", num:1, name:"Executive Command", icon:"\u25C8",
   purpose:"Group health, priorities and the executive scorecard at a glance.",
   members:["exec"]},
  {id:"s-fin",  num:2, name:"FP&A", icon:"\u03A3",
   purpose:"Statements, budget-vs-actual, yield, channel/geo mix, production & inventory status, forecasting and GL variance in one place.",
   members:["finstmt","fpa","yield","chgeo","prodinv","forecast","glvar","ratios"]},
  {id:"s-comm", num:3, name:"Commercial", icon:"\u25B2",
   purpose:"Revenue performance, customer concentration, procurement spend and competitive position.",
   members:["sales","procurement","competitor"]},
  {id:"s-wc",   num:4, name:"Working Capital", icon:"\u21BB",
   purpose:"The cash conversion cycle: receivables, payables and inventory.",
   members:["wc","ar","ap","inventory"]},
  {id:"s-treas",num:5, name:"Treasury & Capital", icon:"\u25C9",
   purpose:"Liquidity, 13-week cash, banking, debt and capital projects.",
   members:["treasury","cash13","banking","capex"]},
  {id:"s-ops",  num:6, name:"Operations", icon:"\u2699",
   purpose:"Manufacturing performance, the KPI library and people cost.",
   members:["mfg","opskpi","payroll"]},
  {id:"s-gov",  num:7, name:"Governance & Risk", icon:"\u2696",
   purpose:"Tax, enterprise risk, internal controls, data governance and documentation.",
   members:["tax","risk","controls","datagov","docs"]},
];
const SECTION_OF={}; SECTIONS.forEach(sec=>sec.members.forEach(m=>SECTION_OF[m]=sec.id));
const sectionById=id=>SECTIONS.find(x=>x.id===id);
const memberRobot=id=>ROBOTS.find(r=>r.id===id);
/* active member tab per section */
const activeTab={}; SECTIONS.forEach(sec=>activeTab[sec.id]=sec.members[0]);
/* resolve the robot currently in focus, whether state.robot is a section or a legacy robot id */
function currentRobot(){const sec=sectionById(state.robot);return sec?memberRobot(activeTab[sec.id]):ROBOTS.find(x=>x.id===state.robot);}
const GROUPS=["Executive","Financial","Commercial","Working Capital","Treasury","Operations","Governance"];

/* ================= Rendering ================= */
function buildNav(){
  const nav=document.getElementById("nav");
  nav.innerHTML=`<div class="nav-item ${state.robot==="hub"?"active":""}" data-mod="hub"><span class="ic">▤</span>Command Hub</div>`
    +`<div class="nav-group">7 Executive Sections</div>`
    +SECTIONS.map(sec=>`<div class="nav-item ${state.robot===sec.id?"active":""}" data-mod="${sec.id}"><span class="ic">${sec.icon}</span>${sec.num}. ${sec.name}</div>`).join("");
}
function hubHTML(){
  const rh=id=>id==="exec"?"g":["ar","wc"].includes(id)?"r":["mfg","opskpi","procurement","docs","risk"].includes(id)?"a":"g";
  const secHealth=sec=>{const hs=sec.members.map(rh);return hs.includes("r")?"r":hs.includes("a")?"a":"g";};
  return `<div class="page-head"><div><h2>Command Hub</h2><div class="sub">Seven consolidated executive sections spanning all finance functions. Click a card to open it; each section holds its detailed views as tabs.</div></div><span class="badge">${state.scn}</span></div>
  <div class="hubgrid">${SECTIONS.map(sec=>`<div class="hub-card" data-mod="${sec.id}">
    <div class="hrow"><div class="ic">${sec.icon}</div><span class="dot ${secHealth(sec)}"></span></div>
    <b>${sec.num}. ${sec.name}</b><span>${esc(sec.purpose)}</span>
    <span class="hub-mem">${sec.members.map(m=>memberRobot(m).name.replace(" Robot","")).join(" · ")}</span></div>`).join("")}</div>`;
}
function render(){
  charts.forEach(ch=>{try{ch.dispose()}catch(e){}}); charts=[]; currentTable=null;
  buildNav();
  const content=document.getElementById("content");
  if(state.robot==="hub"){
    document.getElementById("crumb-mod").textContent="Robot Hub";
    content.innerHTML=hubHTML(); content.scrollTop=0; return;
  }
  const sec0=(typeof sectionById==="function")?sectionById(state.robot):null;
  const r=sec0?memberRobot(activeTab[sec0.id]):ROBOTS.find(x=>x.id===state.robot);
  if(!r){ return; }
  const c=ctx();
  document.getElementById("crumb-mod").textContent=(sec0?sec0.name:r.group)+" / "+r.name;
  const blocks=r.blocks(c); const tbl=r.table(c); currentTable=tbl;
  content.innerHTML=`
    <div class="page-head"><div><h2>${r.num}. ${r.name}</h2><div class="sub">${esc(r.purpose)} · Values in ${c.unit} · Scenario: ${state.scn} · Period: ${state.per}${state.bu!=="All"?" · "+state.bu:""}</div></div><span class="badge">${state.scn}</span></div>
    ${askBarHTML(r)}
    <div class="kpis">${r.kpis(c).join("")}</div>
    <div class="grid">${blocks.map((b,i)=>`<div class="card c${b.span||6}"><h3>${esc(b.title)}</h3>${b.chart?`<div class="chart ${b.tall?"tall":""}" id="ch-${i}"></div>`:b.html}</div>`).join("")}</div>
    <div class="card c12"><h3>${esc(tbl.title)}</h3>${tableHTML(tbl.cols,tbl.rows)}</div>
    ${insPanelHTML(r)}`;
  blocks.forEach((b,i)=>{ if(!b.chart)return;
    const el=document.getElementById("ch-"+i); if(!el)return;
    const ch=echarts.init(el); ch.setOption(b.chart); charts.push(ch); });
  if(document.getElementById("sim-body"))simCalc();
  content.scrollTop=0;
}

/* ================= Events ================= */
document.addEventListener("click",e=>{
  const tab=e.target.closest("[data-tab]");
  if(tab){ const sec=sectionById(state.robot); if(sec){ activeTab[sec.id]=tab.dataset.tab; render(); } return; }
  const item=e.target.closest("[data-mod]");
  if(item){ state.robot=item.dataset.mod; render();
    if(window.innerWidth<=920)document.getElementById("sidebar").classList.remove("open"); }
});
document.getElementById("burger").onclick=()=>{
  const sb=document.getElementById("sidebar");
  sb.classList.toggle(window.innerWidth<=920?"open":"collapsed");
};
document.getElementById("filter-toggle").onclick=()=>{
  document.getElementById("filters").classList.toggle("open");
};
function applyTheme(t){
  document.documentElement.dataset.theme=t;
  document.querySelectorAll("#theme-picker .theme-dot").forEach(d=>d.classList.toggle("on",d.dataset.theme===t));
  render();
}
document.querySelectorAll("#theme-picker .theme-dot").forEach(d=>{
  d.onclick=()=>applyTheme(d.dataset.theme);
});
applyTheme("light");
["f-scn","f-cur"].forEach(id=>{
  document.getElementById(id).onchange=e=>{
    if(id==="f-scn")state.scn=e.target.value;
    if(id==="f-cur")state.cur=e.target.value;
    render();
  };
});
document.getElementById("btn-refresh").onclick=()=>{ if(window.liveRefresh) liveRefresh(true); else render(); };
document.getElementById("btn-print").onclick=()=>window.print();
document.getElementById("btn-share").onclick=async()=>{
  const url=window.location.href;
  try{
    if(navigator.share){ await navigator.share({title:"CFO OS - AI-Powered CFO Operating System",url}); }
    else{ await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard.\n\nFor a public link: open this artifact on claude.ai and click Publish, then share the published URL."); }
  }catch(e){ try{ await navigator.clipboard.writeText(url); alert("Link copied to clipboard."); }catch(_){ alert("Copy this link to share: "+url); } }
};
document.getElementById("btn-csv").onclick=()=>{
  if(!currentTable)return;
  const escCsv=v=>'"'+String(v??"").replace(/"/g,'""')+'"';
  const head=currentTable.cols.map(c=>escCsv(c.label)).join(",");
  const body=currentTable.rows.map(r=>currentTable.cols.map(c=>escCsv(r[c.k])).join(",")).join("\n");
  const blob=new Blob([head+"\n"+body],{type:"text/csv"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=currentRobot().id+"-table.csv"; a.click();
  URL.revokeObjectURL(a.href);
};
document.getElementById("btn-email").onclick=async()=>{
  const to=prompt("Send this report to (email address):"); if(!to)return;
  const r=currentRobot(), key=r.id+"|"+state.scn, ins=state.insCache[key];
  const rows=currentTable?currentTable.rows.map(row=>"<tr>"+currentTable.cols.map(c=>`<td>${esc(row[c.k])}</td>`).join("")+"</tr>").join(""):"";
  const head=currentTable?"<tr>"+currentTable.cols.map(c=>`<th>${esc(c.label)}</th>`).join("")+"</tr>":"";
  const aiHtml=ins?`<h3>AI Insight Summary</h3><p>${esc(ins.summary||"")}</p>`:"";
  const html=`<h2>${esc(r.name)} - ${esc(coName())}</h2><p>Period: ${esc(state.from)} to ${esc(state.to)} · Scenario: ${esc(state.scn)}</p>${aiHtml}<table border="1" cellpadding="4" cellspacing="0"><thead>${head}</thead><tbody>${rows}</tbody></table>`;
  const btn=document.getElementById("btn-email"), old=btn.textContent; btn.disabled=true; btn.textContent="Sending...";
  try{
    const res=await fetch("/api/email",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({to,subject:r.name+" - "+coName()+" - "+state.from+" to "+state.to,html})});
    if(!res.ok)throw new Error((await res.json().catch(()=>({}))).detail||"send failed");
    alert("Report emailed to "+to);
  }catch(e){ alert("Could not send email: "+e.message); }
  btn.disabled=false; btn.textContent=old;
};
document.addEventListener("keydown",e=>{
  const tag=document.activeElement&&document.activeElement.tagName;
  if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT")return;
  if(e.key==="/"){ e.preventDefault(); const i=document.getElementById("ask-input"); if(i)i.focus(); }
  if(e.key==="d"||e.key==="D"){const ts=["light","mck-dark","mck-slate","mck-teal"];const cur=document.documentElement.dataset.theme;applyTheme(ts[(ts.indexOf(cur)+1)%ts.length]);}
});
window.addEventListener("resize",()=>charts.forEach(ch=>{try{ch.resize()}catch(e){}}));

/* ================= Consistency self-check (console) ================= */
(function(){
  const checks=[
    ["Balance sheet balances",14800+18047===20415+4005+8427],
    ["FCF = OCF - CAPEX",5320-2200===3120],
    ["CCC = DSO + DIO - DPO",58+42-52===48],
    ["AR aging rolls to 7,150",AR.aging.reduce((a,b)=>a+b.v,0)===7150],
    ["AP aging rolls to 5,680",AP.aging.reduce((a,b)=>a+b.v,0)===5680],
    ["13-week grid internally consistent",CF13.every(w=>w.open+w.ar+w.oth+w.ap+w.pay+w.tax+w.capex+w.loan===w.close)],
    ["SKUs roll to 5,250",SKUS.reduce((a,b)=>a+b.value,0)===5250],
    ["Banks roll to 4,850",BANKS.reduce((a,b)=>a+b.balance,0)===4850],
    ["40 documents",DOCS.length===40],
    ["28 robots",ROBOTS.length===28]];
  checks.forEach(([n,ok])=>console.log((ok?"OK  ":"FAIL")+" "+n));
})();

/* Live iBOS data (LIVE_ASOF, COMPANIES, OPEN_CSV, ARTOP_CSV, APTOP_CSV, PL_CSV)
   now lives in the DAILY DATA block at the TOP of this file. Update it there. */

let LMONTHS=[];
function buildMonths(){const a=[];let y=2024,m=7;const _n=new Date(),ey=_n.getFullYear(),em=_n.getMonth()+1;
 while(y<ey||(y===ey&&m<=em)){a.push(y+"-"+String(m).padStart(2,"0"));m++;if(m>12){m=1;y++;}}
 /* stale-snapshot guard: drop trailing calendar months with zero activity in the data,
    so an un-refreshed file never renders phantom zero months in trends */
 /* a month counts as real only with material group revenue (>= 1 Cr) - this also
    hides stray forward-dated journal postings sitting in future months of the DWH */
 const act=ym=>{let rev=0;for(const bu in PL){const r=PL[bu][ym];if(r)rev+=r.rev;}return Math.abs(rev)>=1;};
 while(a.length>1&&!act(a[a.length-1]))a.pop();
 LMONTHS=a;}
const PL={};PL_CSV.split(";").forEach(r=>{const f=r.split(",").map(Number);const ym=f[1]+"-"+String(f[2]).padStart(2,"0");
 (PL[f[0]]=PL[f[0]]||{})[ym]={rev:f[3],oth:f[4],cogs:f[5],sm:f[6],logi:f[7],admin:f[8],mfg:f[9],depr:f[10],fin:f[11],tax:f[12],dAR:f[13],dAP:f[14],dCash:f[15],dInv:f[16]};});
buildMonths();
const OPENB={};OPEN_CSV.split(";").forEach(r=>{const f=r.split(",").map(Number);OPENB[f[0]]=[f[1],f[2],f[3],f[4]];});
const parseTop=s=>{const o={};s.split(";").forEach(r=>{const[bu,n,b]=r.split("|");(o[bu]=o[bu]||[]).push({name:n,bal:+b});});for(const k in o)o[k].sort((a,b)=>b.bal-a.bal);return o;};
const ARTOP=parseTop(ARTOP_CSV), APTOP=parseTop(APTOP_CSV);

/* ---------- daily granularity layer (last ~92 days, filled by refresh_cfo_os.py) ---------- */
const PLD={};let DAILY_MIN=null,DAILY_MAX=null;
if(DAILY_CSV)DAILY_CSV.split(";").forEach(r=>{if(!r)return;const f=r.split(",");const bu=+f[0];
 const d=f[1].length===8?f[1].slice(0,4)+"-"+f[1].slice(4,6)+"-"+f[1].slice(6,8):f[1];
 const v=f.slice(2).map(Number);
 (PLD[bu]=PLD[bu]||{})[d]={rev:v[0],oth:v[1],cogs:v[2],sm:v[3],logi:v[4],admin:v[5],mfg:v[6],depr:v[7],fin:v[8],tax:v[9],dAR:v[10],dAP:v[11],dCash:v[12],dInv:v[13]};
 if(!DAILY_MIN||d<DAILY_MIN)DAILY_MIN=d;if(!DAILY_MAX||d>DAILY_MAX)DAILY_MAX=d;});
const dailyCovers=(f,t)=>!!DAILY_MIN&&String(f)>=DAILY_MIN&&String(t)<=DAILY_MAX;
const eachDate=(f,t)=>{const a=[];let d=new Date(f+"T00:00:00Z");const e=new Date(t+"T00:00:00Z");
 while(d<=e){a.push(d.toISOString().slice(0,10));d.setUTCDate(d.getUTCDate()+1);}return a;};
const dimN=ym=>{const[y,m]=ym.split("-").map(Number);return new Date(y,m,0).getDate();};

const ZROW={rev:0,oth:0,cogs:0,sm:0,logi:0,admin:0,mfg:0,depr:0,fin:0,tax:0,salesTax:0,salesWastage:0,dAR:0,dAP:0,dCash:0,dInv:0};
const busList=bu=>Array.isArray(bu)?bu:[bu];
const sumRows=rows=>{const o={...ZROW};rows.forEach(r=>{for(const k in ZROW)o[k]+=r[k]||0;});o._gran=(rows[0]||{})._gran;return o;};
const sumBal=list=>list.reduce((a,b)=>({ar:a.ar+b.ar,ap:a.ap+b.ap,cash:a.cash+b.cash,inv:a.inv+b.inv}),{ar:0,ap:0,cash:0,inv:0});
const topsFor=(map,bu)=>{const list=busList(bu);if(list.length===1)return map[list[0]]||[];
 const merged={};list.forEach(b=>(map[b]||[]).forEach(x=>{merged[x.name]=(merged[x.name]||0)+x.bal;}));
 return Object.entries(merged).map(([name,bal])=>({name,bal})).sort((a,b)=>b.bal-a.bal);};
function mrow(bu,ym){const list=busList(bu);
 if(list.length===1)return (PL[list[0]]&&PL[list[0]][ym])||ZROW;
 return sumRows(list.map(b=>(PL[b]&&PL[b][ym])||ZROW));}
const rangeMonths=(f,t)=>LMONTHS.filter(m=>m>=String(f).slice(0,7)&&m<=String(t).slice(0,7));
function ltot(bu,f,t){
 const list=busList(bu);
 if(list.length>1)return sumRows(list.map(b=>ltot(b,f,t)));
 bu=list[0];
 f=String(f);t=String(t);
 if(f.length===7)f+="-01"; if(t.length===7)t+="-"+String(dimN(t)).padStart(2,"0");
 const o={...ZROW};
 if(dailyCovers(f,t)){ // exact daily actuals from DAILY_CSV
  const D=PLD[bu]||{};
  eachDate(f,t).forEach(d=>{const r=D[d];if(r)for(const k in ZROW)o[k]+=r[k];});
  o._gran="daily actuals";return o;}
 let partial=false; // fall back to monthly, prorating partially-selected months
 rangeMonths(f,t).forEach(ym=>{const r=mrow(bu,ym);const n=dimN(ym);
  const ms=ym+"-01",me=ym+"-"+String(n).padStart(2,"0");
  const a=f>ms?f:ms,b=t<me?t:me;
  const sel=Math.max(0,Math.round((new Date(b)-new Date(a))/864e5)+1);
  const fr=Math.min(1,sel/n);if(fr<0.999)partial=true;
  for(const k in ZROW)o[k]+=r[k]*fr;});
 o._gran=partial?"prorated monthly estimate":"monthly actuals";return o;}
const lxKey=()=>"all|"+state.from+"|"+state.to+"|"+state.pcSel.join(",");
const lgran=()=>{if(window.LIVEX&&LIVEX.key===lxKey())return"exact-date live query";
 return ltot(state.coSel,state.from,state.to)._gran||"monthly actuals";};
function lder(t){
 // netRev = Gross Revenue - Sales Tax (SD & VAT); gp/ebitda mirror the verified
 // Income Statement chain in app/routers/ratios.py (mfg reduces gross profit,
 // not opex; Sales (Wastage) is the "Other Operating Gain/Loss" add-back pre-EBITDA;
 // oth here is Non-Operating Income [Capital Gain + Other Income], added pre-net-profit).
 const netRev=t.rev-(t.salesTax||0),gp=netRev-t.cogs-t.mfg,opex=t.sm+t.logi+t.admin,
  ebitda=gp-opex+(t.salesWastage||0),ebit=ebitda-t.depr,np=ebit-t.fin+(t.oth||0)-t.tax;
 return {...t,netRev,gp,opex,ebitda,ebit,np,gmPct:netRev?gp/netRev*100:0,ebPct:netRev?ebitda/netRev*100:0,npPct:netRev?np/netRev*100:0};}
function prevYmN(ym,n){let[y,m]=ym.split("-").map(Number);m-=n;while(m<1){m+=12;y--;}return y+"-"+String(m).padStart(2,"0");}
function balAt(bu,ymd){const list=busList(bu);
 if(list.length>1)return sumBal(list.map(b=>balAt(b,ymd)));
 bu=list[0];
 const o=OPENB[bu]||[0,0,0,0];let ar=o[0],ap=o[1],cash=o[2],inv=o[3];
 const s=String(ymd),ym=s.slice(0,7);
 const isDate=s.length>7&&!!DAILY_MIN&&(ym+"-01")>=DAILY_MIN&&s<=DAILY_MAX;
 for(const m of LMONTHS){if(m>ym)break;
  if(m===ym&&isDate){const D=PLD[bu]||{};
   eachDate(ym+"-01",s).forEach(d=>{const r=D[d];if(r){ar+=r.dAR;ap+=r.dAP;cash+=r.dCash;inv+=r.dInv;}});}
  else{const r=mrow(bu,m);ar+=r.dAR;ap+=r.dAP;cash+=r.dCash;inv+=r.dInv;}}
 return {ar,ap,cash,inv};}
function lsv(cur,py){if(state.scn==="Previous Year")return py;if(state.scn==="Budget")return py*1.10;if(state.scn==="Forecast")return cur*1.04;return cur;}
const lm=(v,d)=>state.cur==="BDT full"?fmt(v*1e7,0):fmt(v,d===undefined?2:d);
const lunit=()=>state.cur==="BDT full"?"BDT":"BDT Cr";
const coName=()=>{if(state.coSel.length>1)return state.coSel.length+" companies selected";
 const c=COMPANIES.find(c=>c[0]===state.coSel[0]);return c?c[1]:"";};
const mlbl=ym=>{const[y,m]=ym.split("-");return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]+" "+String(y).slice(2)+(ym===LMONTHS[LMONTHS.length-1]?" MTD":"");};
function LX(){ // live context for the selected company/companies and exact day range
 const bu=state.coSel,f=state.from,t=state.to,ms=rangeMonths(f,t);
 const lk=lxKey(), X=(window.LIVEX&&LIVEX.key===lk)?LIVEX:null;
 const cur=lder(X?sumRows(bu.map(b=>X.cur[b]||ZROW)):ltot(bu,f,t));
 const py=lder(X?sumRows(bu.map(b=>X.py[b]||ZROW)):ltot(bu,prevYmN(f,12),prevYmN(t,12)));
 const end=X?sumBal(bu.map(b=>X.end[b]||{ar:0,ap:0,cash:0,inv:0})):balAt(bu,t);
 const start=balAt(bu,prevYmN(f,1)),endP=balAt(bu,prevYmN(t,12));
 const days=Math.max(1,Math.round((new Date(t)-new Date(f))/864e5)+1);
 const cogsFull=cur.cogs+cur.mfg; // matches ratios.py's ratioCogs (COGS + Manufacturing Overhead)
 const dso=cur.rev>0?end.ar/(cur.rev/days):0,dpo=cogsFull>0?end.ap/(cogsFull/days):0,dio=cogsFull>0?end.inv/(cogsFull/days):0;
 return {bu,f,t,ms,cur,py,end,start,endP,days,dso,dpo,dio,ccc:dso+dio-dpo};}
// Backed by /api/live/* (falls back to the embedded ERP snapshot on failure).
getRobotData=function(robotId,filters){const r=ROBOTS.find(x=>x.id===robotId);return {source:"Live (iBOS ERP snapshot "+LIVE_ASOF+")",data:r?r.slice(filters):null};};

/* ---------- ctx for demo modules: EUR '000 base displayed as BDT Cr ---------- */
ctx=function(){
 const j=state.jit,n=Math.max(1,rangeMonths(state.from,state.to).length);
 const v=(a,o={})=>{let x=a;
  if(state.scn==="Budget")x=o.b!==undefined?o.b:a*SCEN_F.Budget;
  else if(state.scn==="Forecast")x=o.fc!==undefined?o.fc:a*SCEN_F.Forecast;
  else if(state.scn==="Previous Year")x=o.p!==undefined?o.p:a*SCEN_F["Previous Year"];
  return x*j;};
 const m=(x,d)=>state.cur==="BDT full"?fmt(x*EUR_BDT*1000,0):fmt(x*EUR_BDT*1000/1e7,2);
 const pk=o=>n<=1?o.dec:o.fy*n/12;
 return {v,m,pk,f:SCEN_F[state.scn],buF:1,scn:state.scn,per:state.from+" to "+state.to,bu:"All",unit:lunit()};
};

/* ---------- LIVE overrides for ERP-backed robots ---------- */
const LIVE_IDS=["exec","finstmt","fpa","sales","ar","ap","wc","treasury","glvar","yield","chgeo","prodinv"];
function ov(id,def){const p=ROBOTS.find(x=>x.id===id);Object.assign(p,def,{live:true});}
const stTrend=(cur,py,goodUp=true)=>{const up=cur>=py;return (up===goodUp)?"GREEN":"AMBER";};

ov("exec",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",totals:L.cur,previousYear:L.py,balances:L.end,dso:L.dso,dpo:L.dpo,dio:L.dio,ccc:L.ccc,topCustomers:topsFor(ARTOP,L.bu)||[],topSuppliers:topsFor(APTOP,L.bu)||[],monthly:L.ms.map(ym=>({ym,...mrow(L.bu,ym)}))};},
 kpis(){const L=LX(),g=(c,p)=>lm(lsv(c,p));return [
  kpi("Revenue",g(L.cur.rev,L.py.rev),lunit(),(L.py.rev?("YoY "+pct1((L.cur.rev-L.py.rev)/L.py.rev*100)):"n/a"),stTrend(L.cur.rev,L.py.rev)),
  kpi("Gross Profit",g(L.cur.gp,L.py.gp),lunit(),pct1(L.cur.gmPct)+" margin",L.cur.gmPct>=10?"GREEN":"AMBER"),
  kpi("EBITDA",g(L.cur.ebitda,L.py.ebitda),lunit(),pct1(L.cur.ebPct)+" margin",L.cur.ebitda>=0?"GREEN":"RED"),
  kpi("Net Profit",g(L.cur.np,L.py.np),lunit(),pct1(L.cur.npPct)+" of revenue",L.cur.np>=0?"GREEN":"RED"),
  kpi("Other Income",g(L.cur.oth,L.py.oth),lunit(),"Non-operating","GREEN"),
  kpi("Cash & Bank",lm(L.end.cash),lunit(),"Per GL, end of range",L.end.cash>=0?"GREEN":"RED"),
  kpi("Trade Receivable",lm(L.end.ar),lunit(),"End of range",L.dso>60?"RED":"GREEN"),
  kpi("Supplier Payable",lm(L.end.ap),lunit(),"End of range","GREEN"),
  kpi("Inventory",lm(L.end.inv),lunit(),"RM + WIP + FG","GREEN"),
  kpi("Working Capital",lm(L.end.ar+L.end.inv-L.end.ap),lunit(),"AR + Inv - AP","GREEN"),
  kpi("DSO",fmt(L.dso,0),"days","AR / daily sales",L.dso>60?"RED":L.dso>45?"AMBER":"GREEN"),
  kpi("DPO",fmt(L.dpo,0),"days","AP / daily COGS","GREEN"),
  kpi("DIO",fmt(L.dio,0),"days","Inventory days",L.dio>60?"AMBER":"GREEN"),
  kpi("CCC",fmt(L.ccc,0),"days","DSO + DIO - DPO",L.ccc>75?"AMBER":"GREEN"),
  kpi("Gross Margin",pct1(L.cur.gmPct),"","PY "+pct1(L.py.gmPct),stTrend(L.cur.gmPct,L.py.gmPct)),
  kpi("EBITDA Margin",pct1(L.cur.ebPct),"","PY "+pct1(L.py.ebPct),stTrend(L.cur.ebPct,L.py.ebPct))];},
 blocks(){const P=PAL(),L=LX();
  const der=ym=>lder(mrow(L.bu,ym));
  let cash=L.start.cash;const cashSeries=L.ms.map(ym=>{cash+=mrow(L.bu,ym).dCash;return +cash.toFixed(1);});
  return [
   {title:"Revenue and EBITDA by Month (BDT Cr)",span:12,chart:lineOpt(L.ms.map(mlbl),[
     {name:"Revenue",data:L.ms.map(ym=>+lsv(mrow(L.bu,ym).rev,mrow(L.bu,prevYmN(ym,12)).rev).toFixed(1)),color:P.brand},
     {name:"EBITDA",data:L.ms.map(ym=>+lsv(der(ym).ebitda,lder(mrow(L.bu,prevYmN(ym,12))).ebitda).toFixed(1)),color:P.pos}],{area:true})},
   {title:"Revenue vs Same Months Previous Year",span:6,chart:barOpt(L.ms.map(mlbl),[
     {name:"Current",data:L.ms.map(ym=>+mrow(L.bu,ym).rev.toFixed(1)),color:P.brand},
     {name:"Previous Year",data:L.ms.map(ym=>+mrow(L.bu,prevYmN(ym,12)).rev.toFixed(1)),color:P.muted}])},
   {title:"Cash & Bank Balance Trend (BDT Cr)",span:6,chart:lineOpt(L.ms.map(mlbl),[
     {name:"Cash & Bank",data:cashSeries,color:P.pos,ref:0,refLabel:"0"}],{area:true})},
   {title:"Margin Trend (%)",span:12,chart:lineOpt(L.ms.map(mlbl),[
     {name:"Gross Margin %",data:L.ms.map(ym=>+der(ym).gmPct.toFixed(1)),color:P.brand},
     {name:"EBITDA Margin %",data:L.ms.map(ym=>+der(ym).ebPct.toFixed(1)),color:P.pos},
     {name:"Net Margin %",data:L.ms.map(ym=>+der(ym).npPct.toFixed(1)),color:P.warn}])}];},
 table(){const L=LX();return {title:"Monthly P&L Summary (BDT Cr) - "+coName(),cols:[
   {k:"ym",label:"Month"},{k:"rev",label:"Revenue",num:true,d:2},{k:"cogs",label:"COGS",num:true,d:2},{k:"gp",label:"Gross Profit",num:true,d:2},
   {k:"opex",label:"OPEX",num:true,d:2},{k:"ebitda",label:"EBITDA",num:true,d:2},{k:"np",label:"Net Profit",num:true,d:2}],
   rows:L.ms.map(ym=>{const d=lder(mrow(L.bu,ym));return {ym:mlbl(ym),rev:d.rev,cogs:-d.cogs,gp:d.gp,opex:-d.opex,ebitda:d.ebitda,np:d.np};})};}});

ov("finstmt",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",pnl:L.cur,previousYear:L.py,balances:L.end,openingCash:L.start.cash};},
 kpis(){const L=LX();return [
  kpi("Revenue",lm(lsv(L.cur.rev,L.py.rev)),lunit(),"Range total","GREEN"),
  kpi("Gross Profit",lm(lsv(L.cur.gp,L.py.gp)),lunit(),pct1(L.cur.gmPct),L.cur.gp>=0?"GREEN":"RED"),
  kpi("EBITDA",lm(lsv(L.cur.ebitda,L.py.ebitda)),lunit(),pct1(L.cur.ebPct),L.cur.ebitda>=0?"GREEN":"RED"),
  kpi("Depreciation",lm(L.cur.depr),lunit(),"Range total","GREEN"),
  kpi("Finance Cost",lm(L.cur.fin),lunit(),"Financial expenses",L.cur.fin>L.cur.ebitda*0.4?"AMBER":"GREEN"),
  kpi("Net Profit",lm(lsv(L.cur.np,L.py.np)),lunit(),pct1(L.cur.npPct),L.cur.np>=0?"GREEN":"RED"),
  kpi("Cash & Bank (end)",lm(L.end.cash),lunit(),"Per GL",L.end.cash>=0?"GREEN":"RED"),
  kpi("Working Capital",lm(L.end.ar+L.end.inv-L.end.ap),lunit(),"AR + Inv - AP","GREEN")];},
 blocks(){const P=PAL(),L=LX();return [
  {title:"P&L Walk: Revenue to Net Profit (BDT Cr)",span:12,chart:wfOpt([
    {name:"Revenue",value:+L.cur.rev.toFixed(1),total:true},{name:"Other Income",value:+L.cur.oth.toFixed(1)},
    {name:"COGS",value:-(+L.cur.cogs.toFixed(1))},{name:"Marketing & Selling",value:-(+L.cur.sm.toFixed(1))},
    {name:"Logistics",value:-(+L.cur.logi.toFixed(1))},{name:"Admin",value:-(+L.cur.admin.toFixed(1))},
    {name:"Mfg Expenses",value:-(+L.cur.mfg.toFixed(1))},{name:"Depreciation",value:-(+L.cur.depr.toFixed(1))},
    {name:"Finance",value:-(+L.cur.fin.toFixed(1))},{name:"Tax",value:-(+L.cur.tax.toFixed(1))},{name:"Net Profit",total:true}])},
  {title:"Cash Bridge over Range (BDT Cr)",span:6,chart:wfOpt([
    {name:"Opening Cash",value:+L.start.cash.toFixed(1),total:true},
    {name:"Net Cash Movement",value:+(L.end.cash-L.start.cash).toFixed(1)},{name:"Closing Cash",total:true}])},
  {title:"Net Profit by Month",span:6,chart:barOpt(L.ms.map(mlbl),[
    {name:"Net Profit",data:L.ms.map(ym=>+lder(mrow(L.bu,ym)).np.toFixed(1)),cellColor:v=>v>=0?PAL().pos:PAL().neg}])}];},
 table(){const L=LX();const r=(n,c,p)=>({line:n,cur:+c.toFixed(2),pct:L.cur.rev?c/L.cur.rev*100:0,py:+p.toFixed(2),variance:+(c-p).toFixed(2)});
  return {title:"P&L Statement (BDT Cr) - "+coName()+" - "+L.f+" to "+L.t,cols:[
   {k:"line",label:"Line"},{k:"cur",label:"Current",num:true,d:2},{k:"pct",label:"% of Rev",render:v=>pct1(v)},{k:"py",label:"Prev Year",num:true,d:2},{k:"variance",label:"Variance",num:true,d:2}],
   rows:[r("Revenue",L.cur.rev,L.py.rev),r("Other Income",L.cur.oth,L.py.oth),r("COGS",-L.cur.cogs,-L.py.cogs),
    {...r("Gross Profit",L.cur.gp,L.py.gp),_bold:true},r("Marketing & Selling",-L.cur.sm,-L.py.sm),r("Logistics",-L.cur.logi,-L.py.logi),
    r("Administrative",-L.cur.admin,-L.py.admin),r("Manufacturing Exp",-L.cur.mfg,-L.py.mfg),
    {...r("EBITDA",L.cur.ebitda,L.py.ebitda),_bold:true},r("Depreciation",-L.cur.depr,-L.py.depr),
    r("Finance Cost",-L.cur.fin,-L.py.fin),r("Tax",-L.cur.tax,-L.py.tax),{...r("Net Profit",L.cur.np,L.py.np),_bold:true}]};}});

ov("fpa",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",actual:L.cur,budgetProxy:"Previous year +10% growth target",previousYear:L.py};},
 kpis(){const L=LX();const items=[["Revenue",L.cur.rev,L.py.rev*1.1],["Gross Profit",L.cur.gp,L.py.gp*1.1],["EBITDA",L.cur.ebitda,L.py.ebitda*1.1],["Net Profit",L.cur.np,L.py.np*1.1],["OPEX",L.cur.opex,L.py.opex*1.1],["Finance Cost",L.cur.fin,L.py.fin]];
  return items.map(([n,a,b])=>{const v=a-b;const fav=(n==="OPEX"||n==="Finance Cost")?v<=0:v>=0;
   return kpi(n+" vs Target",lm(a),lunit(),"Target "+lm(b)+" | Var "+lm(v),fav?"GREEN":"RED");});},
 blocks(){const P=PAL(),L=LX();const cats=[["Revenue",L.cur.rev,L.py.rev*1.1],["COGS",L.cur.cogs,L.py.cogs*1.1],["OPEX",L.cur.opex,L.py.opex*1.1],["EBITDA",L.cur.ebitda,L.py.ebitda*1.1],["Net Profit",L.cur.np,L.py.np*1.1]];
  return [
   {title:"Actual vs Target (PY +10%) vs Previous Year - BDT Cr",span:12,chart:barOpt(cats.map(c=>c[0]),[
     {name:"Target (PY+10%)",data:cats.map(c=>+c[2].toFixed(1)),color:P.muted},
     {name:"Actual",data:cats.map(c=>+c[1].toFixed(1)),color:P.brand},
     {name:"Previous Year",data:cats.map((c,i)=>+[L.py.rev,L.py.cogs,L.py.opex,L.py.ebitda,L.py.np][i].toFixed(1)),color:P.pos}])},
   {title:"EBITDA Bridge: Target to Actual (BDT Cr)",span:12,chart:wfOpt([
     {name:"Target EBITDA",value:+(L.py.ebitda*1.1).toFixed(1),total:true},
     {name:"Revenue effect",value:+((L.cur.rev-L.py.rev*1.1)*(L.cur.gmPct/100)).toFixed(1)},
     {name:"Margin & cost effect",value:+((L.cur.ebitda-L.py.ebitda*1.1)-((L.cur.rev-L.py.rev*1.1)*(L.cur.gmPct/100))).toFixed(1)},
     {name:"Actual EBITDA",total:true}])}];},
 table(){const L=LX();const mk=(n,a,p,costLike)=>{const b=p*(n==="Finance Cost"?1:1.1),v=a-b;return {item:n,target:+b.toFixed(2),actual:+a.toFixed(2),v:+v.toFixed(2),fu:(costLike?v<=0:v>=0)?"F":"U",note:"Target = previous year"+(n==="Finance Cost"?"":" +10%")};};
  return {title:"Variance vs Growth Target (no budget ledger in ERP feed; target = PY +10%)",cols:[
   {k:"item",label:"Line"},{k:"target",label:"Target",num:true,d:2},{k:"actual",label:"Actual",num:true,d:2},{k:"v",label:"Variance",num:true,d:2},
   {k:"fu",label:"F/U",render:v=>`<b class="${v==="F"?"pos":"neg"}">${v}</b>`},{k:"note",label:"Basis"}],
   rows:[mk("Revenue",L.cur.rev,L.py.rev,false),mk("COGS",L.cur.cogs,L.py.cogs,true),mk("Gross Profit",L.cur.gp,L.py.gp,false),
    mk("Marketing & Selling",L.cur.sm,L.py.sm,true),mk("Logistics",L.cur.logi,L.py.logi,true),mk("Administrative",L.cur.admin,L.py.admin,true),
    mk("Manufacturing Exp",L.cur.mfg,L.py.mfg,true),mk("EBITDA",L.cur.ebitda,L.py.ebitda,false),mk("Finance Cost",L.cur.fin,L.py.fin,true),
    mk("Net Profit",L.cur.np,L.py.np,false)]};}});

ov("sales",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",salesTotal:L.cur.rev,previousYear:L.py.rev,monthly:L.ms.map(ym=>({ym,sales:mrow(L.bu,ym).rev})),topCustomersByAR:topsFor(ARTOP,L.bu)||[]};},
 kpis(){const L=LX();const best=L.ms.reduce((a,ym)=>mrow(L.bu,ym).rev>mrow(L.bu,a).rev?ym:a,L.ms[0]);
  return [
  kpi("Sales (range)",lm(lsv(L.cur.rev,L.py.rev)),lunit(),L.ms.length+" months","GREEN"),
  kpi("Avg Monthly Sales",lm(L.cur.rev/Math.max(L.ms.length,1)),lunit(),"Run rate","GREEN"),
  kpi("Best Month",mlbl(best),"",lm(mrow(L.bu,best).rev)+" "+lunit(),"GREEN"),
  kpi("Growth YoY",L.py.rev?pct1((L.cur.rev-L.py.rev)/L.py.rev*100):"n/a","","vs same months PY",stTrend(L.cur.rev,L.py.rev)),
  kpi("Gross Margin",pct1(L.cur.gmPct),"","Range blended",L.cur.gmPct>=10?"GREEN":"AMBER"),
  kpi("Marketing & Selling",lm(L.cur.sm),lunit(),pct1(L.cur.rev?L.cur.sm/L.cur.rev*100:0)+" of sales","GREEN")];},
 blocks(){const P=PAL(),L=LX();const tops=(topsFor(ARTOP,L.bu)||[]).slice(0,8);
  let cum=0;const cumS=L.ms.map(ym=>{cum+=mrow(L.bu,ym).rev;return +cum.toFixed(1);});
  return [
   {title:"Monthly Sales: Current vs Previous Year (BDT Cr)",span:12,chart:lineOpt(L.ms.map(mlbl),[
     {name:"Sales",data:L.ms.map(ym=>+mrow(L.bu,ym).rev.toFixed(1)),color:P.brand},
     {name:"Previous Year",data:L.ms.map(ym=>+mrow(L.bu,prevYmN(ym,12)).rev.toFixed(1)),color:P.muted}],{area:true})},
   {title:"Cumulative Sales over Range",span:6,chart:lineOpt(L.ms.map(mlbl),[{name:"Cumulative",data:cumS,color:P.pos}],{area:true})},
   {title:tops.length?"Top Customers by Outstanding AR (BDT Cr)":"Top Customers",span:6,
    chart:tops.length?barOpt(tops.map(t=>t.name.length>26?t.name.slice(0,25)+"…":t.name).reverse(),[{name:"AR Balance",data:tops.map(t=>t.bal).reverse(),color:P.brand}],{horiz:true}):null,
    html:tops.length?undefined:'<div class="note">No partner-level AR detail for this company in the current ERP feed.</div>'}];},
 table(){const L=LX();const tops=topsFor(ARTOP,L.bu)||[];const tot=tops.reduce((a,b)=>a+b.bal,0);
  return {title:tops.length?"Top Customers by AR Balance (BDT Cr) - proxy for sales concentration":"Customer detail unavailable for this company",cols:[
   {k:"name",label:"Customer / Collection Account"},{k:"bal",label:"AR Balance",num:true,d:2},{k:"share",label:"Share of Top",render:v=>pct1(v)}],
   rows:tops.map(t=>({name:t.name,bal:t.bal,share:tot?t.bal/tot*100:0}))};}});

ov("ar",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",arEnd:L.end.ar,arStart:L.start.ar,dso:L.dso,topCustomers:topsFor(ARTOP,L.bu)||[],monthlyChange:L.ms.map(ym=>({ym,dAR:mrow(L.bu,ym).dAR}))};},
 kpis(){const L=LX();return [
  kpi("Trade Receivable (end)",lm(L.end.ar),lunit(),"Per GL, "+mlbl(L.t),L.dso>60?"RED":"GREEN"),
  kpi("AR Change over Range",lm(L.end.ar-L.start.ar),lunit(),(L.end.ar-L.start.ar)>=0?"Build (cash out)":"Release (cash in)",(L.end.ar-L.start.ar)>0?"AMBER":"GREEN"),
  kpi("DSO",fmt(L.dso,0),"days","AR / daily sales",L.dso>60?"RED":L.dso>45?"AMBER":"GREEN"),
  kpi("Sales (range)",lm(L.cur.rev),lunit(),"Denominator basis","GREEN"),
  kpi("AR / Monthly Sales",fmt(L.cur.rev?L.end.ar/(L.cur.rev/Math.max(L.ms.length,1)):0,1),"months","Coverage",L.cur.rev&&L.end.ar/(L.cur.rev/L.ms.length)>2?"AMBER":"GREEN"),
  kpi("Top Customer Exposure",(topsFor(ARTOP,L.bu)&&topsFor(ARTOP,L.bu)[0])?lm(topsFor(ARTOP,L.bu)[0].bal):"n/a",lunit(),(topsFor(ARTOP,L.bu)&&topsFor(ARTOP,L.bu)[0])?topsFor(ARTOP,L.bu)[0].name.slice(0,28):"No partner detail","GREEN")];},
 blocks(){const P=PAL(),L=LX();let ar=L.start.ar;const s=L.ms.map(ym=>{ar+=mrow(L.bu,ym).dAR;return +ar.toFixed(1);});
  return [
   {title:"AR Balance Trend (BDT Cr)",span:12,chart:lineOpt(L.ms.map(mlbl),[{name:"Trade Receivable",data:s,color:P.brand}],{area:true})},
   {title:"Monthly AR Movement (+ build / - collection)",span:12,chart:barOpt(L.ms.map(mlbl),[
     {name:"AR Change",data:L.ms.map(ym=>+mrow(L.bu,ym).dAR.toFixed(1)),cellColor:v=>v>0?PAL().warn:PAL().pos}])}];},
 table(){const L=LX();const tops=topsFor(ARTOP,L.bu)||[];
  return {title:tops.length?"Top Customer AR Balances (BDT Cr)":"No partner-level AR detail in feed",cols:[
   {k:"name",label:"Customer / Collection Account"},{k:"bal",label:"AR Balance",num:true,d:2},
   {k:"flag",label:"Action",render:(v,r2)=>r2.bal>2?'<span class="warn-ink">Review exposure</span>':"Standard"}],
   rows:tops.map(t=>({name:t.name,bal:t.bal}))};}});

ov("ap",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",apEnd:L.end.ap,apStart:L.start.ap,dpo:L.dpo,topSuppliers:topsFor(APTOP,L.bu)||[],monthlyChange:L.ms.map(ym=>({ym,dAP:mrow(L.bu,ym).dAP}))};},
 kpis(){const L=LX();return [
  kpi("Supplier Payable (end)",lm(L.end.ap),lunit(),"Per GL, "+mlbl(L.t),"GREEN"),
  kpi("AP Change over Range",lm(L.end.ap-L.start.ap),lunit(),(L.end.ap-L.start.ap)>=0?"Build (cash kept)":"Paydown","GREEN"),
  kpi("DPO",fmt(L.dpo,0),"days","AP / daily COGS",L.dpo>90?"AMBER":"GREEN"),
  kpi("COGS (range)",lm(L.cur.cogs),lunit(),"Denominator basis","GREEN"),
  kpi("AP / Monthly COGS",fmt(L.cur.cogs?L.end.ap/(L.cur.cogs/Math.max(L.ms.length,1)):0,1),"months","Coverage","GREEN"),
  kpi("Top Supplier Exposure",(topsFor(APTOP,L.bu)&&topsFor(APTOP,L.bu)[0])?lm(topsFor(APTOP,L.bu)[0].bal):"n/a",lunit(),(topsFor(APTOP,L.bu)&&topsFor(APTOP,L.bu)[0])?topsFor(APTOP,L.bu)[0].name.slice(0,28):"No partner detail","GREEN")];},
 blocks(){const P=PAL(),L=LX();let ap=L.start.ap;const s=L.ms.map(ym=>{ap+=mrow(L.bu,ym).dAP;return +ap.toFixed(1);});
  const tops=(topsFor(APTOP,L.bu)||[]).slice(0,8);
  return [
   {title:"AP Balance Trend (BDT Cr)",span:12,chart:lineOpt(L.ms.map(mlbl),[{name:"Supplier Payable",data:s,color:P.brand}],{area:true})},
   {title:"Monthly AP Movement",span:6,chart:barOpt(L.ms.map(mlbl),[
     {name:"AP Change",data:L.ms.map(ym=>+mrow(L.bu,ym).dAP.toFixed(1)),cellColor:v=>v>0?PAL().brand:PAL().pos}])},
   {title:tops.length?"Top Suppliers by Outstanding (BDT Cr)":"Top Suppliers",span:6,
    chart:tops.length?barOpt(tops.map(t=>t.name.length>26?t.name.slice(0,25)+"…":t.name).reverse(),[{name:"Payable",data:tops.map(t=>t.bal).reverse(),color:P.warn}],{horiz:true}):null,
    html:tops.length?undefined:'<div class="note">No partner-level AP detail for this company in the current ERP feed.</div>'}];},
 table(){const L=LX();const tops=topsFor(APTOP,L.bu)||[];
  return {title:tops.length?"Top Supplier Payables (BDT Cr)":"No partner-level AP detail in feed",cols:[
   {k:"name",label:"Supplier"},{k:"bal",label:"Outstanding",num:true,d:2},
   {k:"pri",label:"Priority",render:(v,r2)=>r2.bal>20?'<b class="neg">P1</b>':r2.bal>5?'<b class="warn-ink">P2</b>':'<b class="pos">P3</b>'}],
   rows:tops.map(t=>({name:t.name,bal:t.bal}))};}});

ov("wc",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",dso:L.dso,dpo:L.dpo,dio:L.dio,ccc:L.ccc,balances:L.end,changes:{dAR:L.end.ar-L.start.ar,dInv:L.end.inv-L.start.inv,dAP:L.end.ap-L.start.ap}};},
 kpis(){const L=LX();return [
  kpi("Working Capital",lm(L.end.ar+L.end.inv-L.end.ap),lunit(),"AR + Inv - AP","GREEN"),
  kpi("DSO",fmt(L.dso,0),"days","",L.dso>60?"RED":L.dso>45?"AMBER":"GREEN"),
  kpi("DPO",fmt(L.dpo,0),"days","","GREEN"),
  kpi("DIO",fmt(L.dio,0),"days","",L.dio>60?"AMBER":"GREEN"),
  kpi("CCC",fmt(L.ccc,0),"days","DSO + DIO - DPO",L.ccc>75?"AMBER":"GREEN"),
  kpi("WC Cash Impact",lm(-((L.end.ar-L.start.ar)+(L.end.inv-L.start.inv)-(L.end.ap-L.start.ap))),lunit(),"Over selected range","GREEN")];},
 blocks(){const P=PAL(),L=LX();
  let ar=L.start.ar,ap=L.start.ap,inv=L.start.inv;
  const rows=L.ms.map(ym=>{const r=mrow(L.bu,ym);ar+=r.dAR;ap+=r.dAP;inv+=r.dInv;
   const t3=lder(ltot(L.bu,prevYmN(ym,2),ym));const days=91;
   return {ym,dso:t3.rev>0?ar/(t3.rev/days):0,dpo:t3.cogs>0?ap/(t3.cogs/days):0,dio:t3.cogs>0?inv/(t3.cogs/days):0,ar,ap,inv};});
  return [
   {title:"Working Capital Days Trend (rolling 3-month basis)",span:12,chart:lineOpt(L.ms.map(mlbl),[
     {name:"DSO",data:rows.map(r=>+r.dso.toFixed(0)),color:P.neg},
     {name:"DPO",data:rows.map(r=>+r.dpo.toFixed(0)),color:P.brand},
     {name:"DIO",data:rows.map(r=>+r.dio.toFixed(0)),color:P.warn},
     {name:"CCC",data:rows.map(r=>+(r.dso+r.dio-r.dpo).toFixed(0)),color:P.pos}])},
   {title:"Working Capital Bridge over Range (cash impact, BDT Cr)",span:12,chart:wfOpt([
     {name:"Start",value:0,total:true},
     {name:"AR change",value:-+(L.end.ar-L.start.ar).toFixed(1)},
     {name:"Inventory change",value:-+(L.end.inv-L.start.inv).toFixed(1)},
     {name:"AP change",value:+(L.end.ap-L.start.ap).toFixed(1)},
     {name:"Net WC cash impact",total:true}])}];},
 table(){const L=LX();let ar=L.start.ar,ap=L.start.ap,inv=L.start.inv,cash=L.start.cash;
  return {title:"Monthly Balances (BDT Cr)",cols:[
   {k:"ym",label:"Month"},{k:"ar",label:"Trade Receivable",num:true,d:2},{k:"inv",label:"Inventory",num:true,d:2},
   {k:"ap",label:"Supplier Payable",num:true,d:2},{k:"wc",label:"Working Capital",num:true,d:2},{k:"cash",label:"Cash & Bank",num:true,d:2}],
   rows:L.ms.map(ym=>{const r=mrow(L.bu,ym);ar+=r.dAR;ap+=r.dAP;inv+=r.dInv;cash+=r.dCash;
    return {ym:mlbl(ym),ar:+ar.toFixed(2),inv:+inv.toFixed(2),ap:+ap.toFixed(2),wc:+(ar+inv-ap).toFixed(2),cash:+cash.toFixed(2)};})};}});

ov("treasury",{
 slice:()=>{const L=LX();return {company:coName(),range:L.f+" to "+L.t,unit:"BDT crore",cashEnd:L.end.cash,cashStart:L.start.cash,financeCost:L.cur.fin,monthly:L.ms.map(ym=>({ym,dCash:mrow(L.bu,ym).dCash,fin:mrow(L.bu,ym).fin}))};},
 kpis(){const L=LX();let c=L.start.cash;const series=L.ms.map(ym=>{c+=mrow(L.bu,ym).dCash;return c;});
  const lo=Math.min(...series),hi=Math.max(...series);
  return [
  kpi("Cash & Bank (end)",lm(L.end.cash),lunit(),"Per GL, "+mlbl(L.t),L.end.cash>=0?"GREEN":"RED"),
  kpi("Net Cash Movement",lm(L.end.cash-L.start.cash),lunit(),"Over range",(L.end.cash-L.start.cash)>=0?"GREEN":"AMBER"),
  kpi("Lowest Month Balance",lm(lo),lunit(),"In range",lo<0?"RED":"GREEN"),
  kpi("Highest Month Balance",lm(hi),lunit(),"In range","GREEN"),
  kpi("Finance Cost (range)",lm(L.cur.fin),lunit(),"Financial expenses",L.cur.fin>L.cur.ebitda*0.4?"AMBER":"GREEN"),
  kpi("Finance Cost / EBITDA",L.cur.ebitda?pct1(L.cur.fin/L.cur.ebitda*100):"n/a","","Coverage burden",L.cur.ebitda&&L.cur.fin/L.cur.ebitda>0.4?"AMBER":"GREEN")];},
 blocks(){const P=PAL(),L=LX();let c=L.start.cash;const series=L.ms.map(ym=>{c+=mrow(L.bu,ym).dCash;return +c.toFixed(1);});
  return [
   {title:"Cash & Bank Balance by Month (BDT Cr)",span:12,chart:lineOpt(L.ms.map(mlbl),[{name:"Cash & Bank",data:series,color:P.pos,ref:0,refLabel:"0"}],{area:true})},
   {title:"Monthly Net Cash Movement",span:6,chart:barOpt(L.ms.map(mlbl),[
     {name:"Net Movement",data:L.ms.map(ym=>+mrow(L.bu,ym).dCash.toFixed(1)),cellColor:v=>v>=0?PAL().pos:PAL().neg}])},
   {title:"Monthly Finance Cost (BDT Cr)",span:6,chart:barOpt(L.ms.map(mlbl),[
     {name:"Finance Cost",data:L.ms.map(ym=>+mrow(L.bu,ym).fin.toFixed(1)),color:P.warn}])}];},
 table(){const L=LX();let c=L.start.cash;
  return {title:"Monthly Cash View (BDT Cr)",cols:[
   {k:"ym",label:"Month"},{k:"open",label:"Opening",num:true,d:2},{k:"move",label:"Net Movement",num:true,d:2},{k:"close",label:"Closing",num:true,d:2},{k:"fin",label:"Finance Cost",num:true,d:2}],
   rows:L.ms.map(ym=>{const o=c;c+=mrow(L.bu,ym).dCash;
    return {ym:mlbl(ym),open:+o.toFixed(2),move:+mrow(L.bu,ym).dCash.toFixed(2),close:+c.toFixed(2),fin:mrow(L.bu,ym).fin};})};}});

/* ---------- render / prompts / boot overrides ---------- */
render=function(){
 charts.forEach(ch=>{try{ch.dispose()}catch(e){}});charts=[];currentTable=null;
 buildNav();
 const content=document.getElementById("content");
 const srcB=document.getElementById("src-badge");
 if(state.robot==="hub"){
  document.getElementById("crumb-mod").textContent="Command Hub";
  if(srcB)srcB.textContent="LIVE DATA · iBOS ERP";
  content.innerHTML=hubHTML();content.scrollTop=0;return;}
 /* resolve the active section and its current member robot */
 const sec=sectionById(state.robot);
 const r=sec?memberRobot(activeTab[sec.id]):ROBOTS.find(x=>x.id===state.robot);
 const c=ctx();
 document.getElementById("crumb-mod").textContent=(sec?sec.name:r.group)+" / "+r.name;
 if(srcB)srcB.textContent=r.live?"LIVE DATA · iBOS ERP":r.aiWeb?"AI · WEB-SOURCED":"DEMO MODULE";
 const blocks=r.blocks(c);const tbl=r.table(c);currentTable=tbl;
 const badge=r.live
  ?'<span class="badge" style="background:var(--posbg);color:var(--pos)">LIVE · iBOS ERP</span>'
  :r.aiWeb
  ?'<span class="badge" style="background:var(--warnbg);color:var(--warn)">AI · WEB-SOURCED</span>'
  :'<span class="badge" style="background:var(--warnbg);color:var(--warn)">DEMO DATA</span>';
 /* section header uses section identity; sub-line describes the active view */
 const headNum=sec?sec.num:r.num, headName=sec?sec.name:r.name;
 const firstCoName=(COMPANIES.find(c=>c[0]===state.coSel[0])||[,""])[1];
 const coDisplay=(r.singleCoOnly&&state.coSel.length>1)
   ?firstCoName+" (first of "+state.coSel.length+" selected -- this module doesn't combine companies)"
   :coName();
 const sub=r.live
  ?esc(coDisplay)+" · "+state.from+" to "+state.to+" · "+lunit()+" · Scenario: "+esc(state.scn)+" · "+lgran()+" · Snapshot "+LIVE_ASOF
  :r.aiWeb
  ?esc(r.purpose)+" · AI-generated from public web sources, not ERP data · verify before use"
  :esc(r.purpose)+" · Demo dataset (awaiting ERP feed) · Range "+state.from+" to "+state.to+" · Scenario: "+esc(state.scn);
 /* tab strip for multi-member sections */
 const tabs=(sec&&sec.members.length>1)
  ?'<div class="subtabs">'+sec.members.map(m=>{const mr=memberRobot(m);
      return '<div class="subtab '+(m===activeTab[sec.id]?"active":"")+'" data-tab="'+m+'">'+esc(mr.name.replace(" Robot",""))+'</div>';}).join("")+'</div>'
  :"";
 content.innerHTML=
  '<div class="page-head"><div><h2>'+headNum+". "+esc(headName)+'</h2><div class="sub">'
   +(sec&&sec.members.length>1?"<b>"+esc(r.name.replace(" Robot",""))+"</b> · ":"")+sub+"</div></div>"+badge+"</div>"
  +tabs
  +askBarHTML(r)
  +'<div class="kpis">'+r.kpis(c).join("")+"</div>"
  +'<div class="grid">'+blocks.map((b,i)=>'<div class="card c'+(b.span||6)+'"><h3>'+esc(b.title)+"</h3>"+(b.chart?'<div class="chart '+(b.tall?"tall":"")+'" id="ch-'+i+'"></div>':(b.html||""))+"</div>").join("")+"</div>"
  +'<div class="card c12"><h3>'+esc(tbl.title)+"</h3>"+tableHTML(tbl.cols,tbl.rows)+"</div>"
  +insPanelHTML(r);
 blocks.forEach((b,i)=>{if(!b.chart)return;const el=document.getElementById("ch-"+i);if(!el)return;
  const ch=echarts.init(el);ch.setOption(b.chart);charts.push(ch);});
 if(document.getElementById("sim-body"))simCalc();
 content.scrollTop=0;
};

askSubmit=async function(preset){
 const inp=document.getElementById("ask-input"),out=document.getElementById("ask-out"),btn=document.getElementById("ask-btn");
 const q=(preset||inp.value).trim();if(!q)return;
 const r=currentRobot();
 btn.disabled=true;
 out.innerHTML='<div class="ask-out loading"><span class="spinner"></span>Robot is analyzing...</div>';
 try{
  const hist=(state.histories[r.id]||[]).slice(-3).map(h=>"Q: "+h.q+"\nA: "+h.a).join("\n");
  const src=r.live?("LIVE iBOS ERP data for "+coName()+" (Akij Resource), snapshot "+LIVE_ASOF+", values in BDT crore"):r.aiWeb?"AI web-search result (Google Search grounding), not ERP data -- treat as unverified public information":"synthetic demo dataset (this module is not yet fed by the ERP), values converted to BDT crore";
  const prompt="You are the "+r.name+", "+r.role+". Data source: "+src+".\n"
   +"Scenario: "+state.scn+" (Budget = previous year +10% target proxy; Forecast = +4% run-rate). Date range: "+state.from+" to "+state.to+".\n"
   +"DATA:\n"+JSON.stringify(r.slice(ctx()))+"\n"
   +(hist?"RECENT CONVERSATION:\n"+hist+"\n":"")
   +"QUESTION: "+q+"\n"
   +'Respond ONLY with valid JSON: {"answer": string, "keyNumbers": string[], "actions": string[]}. Amounts in BDT crore. No markdown, no backticks, simple English, no long em dashes.';
  const p=await askClaude(prompt);
  (state.histories[r.id]=state.histories[r.id]||[]).push({q,a:p.answer});
  state.histories[r.id]=state.histories[r.id].slice(-3);
  const html='<div class="ask-out"><p>'+esc(p.answer)+"</p>"
   +(p.keyNumbers&&p.keyNumbers.length?'<div class="nums">'+p.keyNumbers.map(k=>'<span class="num-chip">'+esc(k)+"</span>").join("")+"</div>":"")
   +(p.actions&&p.actions.length?"<ul>"+p.actions.map(a=>"<li>"+esc(a)+"</li>").join("")+"</ul>":"")+"</div>";
  out.innerHTML=html;state.askOut[r.id]=html;
  if(!preset)inp.value="";
 }catch(e){out.innerHTML='<div class="ask-out" style="color:var(--warn)">The robot could not answer right now: '+esc(e.message)+'</div>';}
 btn.disabled=false;
};

genInsights=async function(){
 const r=currentRobot(),key=r.id+"|"+state.scn;
 const btn=document.getElementById("ins-btn"),body=document.getElementById("ins-body");
 btn.disabled=true;btn.textContent="Generating...";
 try{
  const src=r.live?("LIVE iBOS ERP data for "+coName()+" (Akij Resource), snapshot "+LIVE_ASOF+", BDT crore"):r.aiWeb?"AI web-search result (Google Search grounding), not ERP data -- treat as unverified public information":"synthetic demo dataset, BDT crore";
  const prompt="You are the "+r.name+", "+r.role+". Data source: "+src+". Scenario: "+state.scn+". Date range: "+state.from+" to "+state.to+".\n"
   +"DATA:\n"+JSON.stringify(r.slice(ctx()))+"\n"
   +'Produce a full AI insight set. Respond ONLY with valid JSON exactly in this shape: {"summary": string, "insights": string[], "interpretation": string, "rootCause": string, "risks": string[], "opportunities": string[], "recommendations": string[], "actions": string[], "forecast": string, "confidence": number}. Confidence is 0-100. Amounts in BDT crore. No markdown, no backticks, simple English, no long em dashes.';
  state.insCache[key]=await callBackendAI("/api/insights",prompt);
  render();
 }catch(e){
  body.insertAdjacentHTML("afterbegin",'<div style="color:var(--warn);font-size:12px;margin-bottom:8px">The robot could not answer right now: '+esc(e.message)+'</div>');
  btn.disabled=false;btn.textContent="✦ Generate AI Insights";}
};

/* ============================================================
   LIVE iBOS CONNECTION - queries fin.tblAccountingJournalArc through the
   FastAPI backend (/api/live/monthly, /api/live/exact), which runs the same
   PNL_COLS/BAL_COLS logic server-side via SQLAlchemy/pyodbc. The embedded
   snapshot above remains as an offline fallback if these calls fail.
   ============================================================ */
window.LIVEX={key:null,cur:{},py:{},end:{}};
async function apiGet(path){
 const res=await fetch(path);
 if(res.status===401){location.href="/";throw new Error("session expired");}
 if(!res.ok)throw new Error((await res.json().catch(()=>({}))).detail||"request failed");
 return res.json();
}
async function liveMonthly(){
 const j=await apiGet("/api/live/monthly");
 for(const k in PL)delete PL[k];
 j.pl.forEach(r=>{const ym=r.y+"-"+String(r.m).padStart(2,"0");
  (PL[r.bu]=PL[r.bu]||{})[ym]={rev:r.rev,oth:r.oth,cogs:r.cogs,sm:r.sm,logi:r.logi,admin:r.admin,mfg:r.mfg,depr:r.depr,fin:r.fin,tax:r.tax,dAR:r.dAR,dAP:r.dAP,dCash:r.dCash,dInv:r.dInv};});
 buildMonths();
 j.open.forEach(r=>{OPENB[r.bu]=[r.ar,r.ap,r.cash,r.inv];});
 for(const k in ARTOP)delete ARTOP[k];
 j.arTop.forEach(r=>{(ARTOP[r.bu]=ARTOP[r.bu]||[]).push({name:r.name,bal:Number(r.bal)||0});});
 for(const k in APTOP)delete APTOP[k];
 j.apTop.forEach(r=>{(APTOP[r.bu]=APTOP[r.bu]||[]).push({name:r.name,bal:Number(r.bal)||0});});
}
async function liveExact(){
 // always fetch the per-company breakdown for every BU so LX() can sum over
 // whichever subset is selected (state.coSel) without a second network call.
 // Profit center filter (state.pcSel) does narrow the actual query, so it's
 // sent as a param and folded into the LIVEX.key cache check via lxKey().
 const q=new URLSearchParams({from:state.from,to:state.to});
 if(state.pcSel.length)q.set("pc",state.pcSel.join(","));
 window.LIVEX=await apiGet("/api/live/exact?"+q);
}

/* ---------- FP&A sub-modules: Yield, Channel/Geo, Production & Inventory, GL Variance ---------- */
let LIVE_YIELD=null, LIVE_CHGEO=null, LIVE_PRODINV=null, LIVE_GLVAR=null, LIVE_COMP=null, LIVE_RATIOS=null;
async function fetchYield(){
 const q=new URLSearchParams({co:state.co,from:state.from,to:state.to});
 const j=await apiGet("/api/fpa/yield?"+q), cr=v=>(v||0)/1e7;
 const conv=x=>({...x,curRevenue:cr(x.curRevenue),pyRevenue:cr(x.pyRevenue),priceEffect:cr(x.priceEffect),volumeEffect:cr(x.volumeEffect),netEffect:cr(x.netEffect)});
 LIVE_YIELD={total:{curRevenue:cr(j.total.curRevenue),pyRevenue:cr(j.total.pyRevenue),priceEffect:cr(j.total.priceEffect),volumeEffect:cr(j.total.volumeEffect)},
  topPositive:j.topPositive.map(conv),topNegative:j.topNegative.map(conv)};
}
async function fetchChannelGeo(){
 const q=new URLSearchParams({co:state.co,from:state.from,to:state.to});
 const j=await apiGet("/api/fpa/channel-geo?"+q);
 LIVE_CHGEO={channel:j.channel.map(x=>({name:x.name,value:(x.value||0)/1e7})),geo:j.geo.map(x=>({name:x.name,value:(x.value||0)/1e7}))};
}
async function fetchProdInventory(){
 const q=new URLSearchParams({co:state.co,from:state.from,to:state.to});
 LIVE_PRODINV=await apiGet("/api/fpa/prod-inventory?"+q);
}
async function fetchGLVariance(){
 const q=new URLSearchParams({co:state.co,from:state.from,to:state.to});
 LIVE_GLVAR=await apiGet("/api/fpa/gl-variance?"+q);
}
async function fetchRatios(){
 const q=new URLSearchParams({co:state.co,from:state.from,to:state.to});
 LIVE_RATIOS=await apiGet("/api/fpa/ratios?"+q);
}
async function fetchCompetitor(){
 const co=COMPANIES.find(c=>c[0]===state.co);
 const res=await fetch("/api/competitor",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({company:co?co[1]:coName(),industry_hint:""})});
 if(!res.ok)throw new Error((await res.json().catch(()=>({}))).detail||"request failed");
 LIVE_COMP=await res.json();
}
window.fetchCompetitorClick=async function(btn){
 btn.disabled=true; const old=btn.textContent; btn.textContent="Searching...";
 try{ await fetchCompetitor(); render(); }
 catch(e){ btn.disabled=false; btn.textContent=old; alert("Competitor search failed: "+e.message); }
};

let _liveBusy=false;
window.liveRefresh=async function(full){
 const badge=document.getElementById("src-badge"),sn=document.getElementById("snap-note");
 if(_liveBusy)return; _liveBusy=true;
 if(badge)badge.textContent="⟳ QUERYING iBOS LIVE…";
 try{
  if(full||!window._monthlyLoaded){await liveMonthly();window._monthlyLoaded=true;}
  await liveExact();
  LIVE_ASOF=new Date().toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})+" (live)";
  if(badge)badge.textContent="LIVE DATA · iBOS ERP · "+LIVE_ASOF;
  if(sn)sn.textContent="Live query "+LIVE_ASOF+" · via FastAPI backend";
 }catch(e){
  if(badge)badge.textContent="LIVE QUERY FAILED · showing embedded snapshot";
  if(sn)sn.textContent="Backend/DB unreachable · showing embedded snapshot";
  console.warn("live refresh failed",e);
 }
 const fpaResults=await Promise.allSettled([fetchYield(),fetchChannelGeo(),fetchProdInventory(),fetchGLVariance(),fetchRatios()]);
 fpaResults.forEach((r,i)=>{if(r.status==="rejected")console.warn("FP&A sub-module fetch failed",["yield","channel-geo","prod-inventory","gl-variance","ratios"][i],r.reason);});
 _liveBusy=false;
 state.insCache={};
 render();
};

(function(){
try{
 const coBtn=document.getElementById("f-co-btn"),coPanel=document.getElementById("f-co-panel");
 const backdrop=document.getElementById("panel-backdrop");
 function closeAllPanels(){coPanel.classList.remove("open");pcPanel.classList.remove("open");backdrop.classList.remove("show");}
 backdrop.onclick=closeAllPanels;
 const AIL_ID=224,MSIL_ID=171; // Akij Ispat Ltd + Magnum Steel Industries Ltd -- reported together
 const mkRow=c=>'<label><input type="checkbox" value="'+c[0]+'" '+(state.coSel.includes(c[0])?"checked":"")+'> '+esc(c[1])+"</label>";
 const live=COMPANIES.filter(c=>c[2]),rest=COMPANIES.filter(c=>!c[2]);
 function renderCoPanel(){
  const mergedOn=state.coSel.includes(AIL_ID)&&state.coSel.includes(MSIL_ID);
  coPanel.innerHTML='<div class="grp">Merged views</div>'
   +'<label><input type="checkbox" value="'+AIL_ID+','+MSIL_ID+'" '+(mergedOn?"checked":"")+'> AIL + MSIL (Merged)</label>'
   +'<div class="grp">\u25CF Live ERP data ('+live.length+')</div>'+live.map(mkRow).join("")
   +(rest.length?'<div class="grp">Other group companies</div>'+rest.map(mkRow).join(""):"");
 }
 function updateCoBtn(){coBtn.textContent=(state.coSel.length>1?state.coSel.length+" companies selected":coName())+" \u25BE";}
 renderCoPanel(); updateCoBtn();
 coBtn.onclick=e=>{e.stopPropagation();const willOpen=!coPanel.classList.contains("open");closeAllPanels();if(willOpen){coPanel.classList.add("open");backdrop.classList.add("show");}};
 document.addEventListener("click",e=>{if(coPanel.classList.contains("open")&&!coPanel.contains(e.target)&&e.target!==coBtn)closeAllPanels();});
 coPanel.addEventListener("change",e=>{
  if(e.target.type!=="checkbox")return;
  // checkbox values may be a single id ("4") or a merged preset ("224,171")
  const checked=[...new Set(Array.from(coPanel.querySelectorAll("input:checked")).flatMap(i=>i.value.split(",").map(Number)))];
  if(!checked.length){e.target.checked=true;return;} // at least one company must stay selected
  state.coSel=checked; state.co=state.coSel[0];
  state.pcSel=[]; // profit centers belong to the old selection -- clear and let the PC panel recascade
  updateCoBtn(); renderCoPanel(); refreshPcPanel(); state.insCache={}; render();
 });

 const pcBtn=document.getElementById("f-pc-btn"),pcPanel=document.getElementById("f-pc-panel");
 let pcList=[];
 function updatePcBtn(){
  pcBtn.textContent=(state.pcSel.length?state.pcSel.length+" profit center"+(state.pcSel.length>1?"s":""):"All profit centers")+" \u25BE";
 }
 function renderPcPanel(){
  if(!pcList.length){pcPanel.innerHTML='<div class="grp">No profit centers found</div>';return;}
  pcPanel.innerHTML=pcList.map(p=>'<label><input type="checkbox" value="'+p.id+'" '+(state.pcSel.includes(p.id)?"checked":"")+'> '+esc(p.name)+"</label>").join("");
 }
 async function refreshPcPanel(){
  try{ pcList=await apiGet("/api/live/profit-centers?bu="+state.coSel.join(",")); }
  catch(e){ pcList=[]; console.warn("profit center list failed",e); }
  renderPcPanel(); updatePcBtn();
 }
 pcBtn.onclick=e=>{e.stopPropagation();const willOpen=!pcPanel.classList.contains("open");closeAllPanels();if(willOpen){pcPanel.classList.add("open");backdrop.classList.add("show");}};
 document.addEventListener("click",e=>{if(pcPanel.classList.contains("open")&&!pcPanel.contains(e.target)&&e.target!==pcBtn)closeAllPanels();});
 pcPanel.addEventListener("change",e=>{
  if(e.target.type!=="checkbox")return;
  state.pcSel=Array.from(pcPanel.querySelectorAll("input:checked")).map(i=>+i.value);
  updatePcBtn(); liveRefresh(false);
 });
 updatePcBtn(); refreshPcPanel();

 const ff=document.getElementById("f-from"),ft=document.getElementById("f-to");
 const mx=new Date().toISOString().slice(0,10);
 ff.max=mx; ft.max="2027-04-30";
 ff.value=state.from; ft.value=state.to;

 const fy=document.getElementById("f-fy");
 const curFyStart=+FY.from.slice(0,4);
 const fyOpts=[]; for(let y=2024;y<=curFyStart;y++)fyOpts.push(y);
 fy.innerHTML=fyOpts.map(y=>`<option value="${y}">FY ${y}-${String(y+1).slice(2)}</option>`).join("");
 fy.value=String(curFyStart);
 fy.onchange=e=>{ const y=+e.target.value, isCurrent=y===curFyStart;
  state.from=y+"-07-01"; state.to=isCurrent?mx:(y+1)+"-06-30";
  ff.value=state.from; ft.value=state.to; liveRefresh(false); };

 ff.onchange=e=>{state.from=e.target.value;if(state.from>state.to){state.to=state.from;ft.value=state.to;}};
 ft.onchange=e=>{state.to=e.target.value;if(state.to<state.from){state.from=state.to;ff.value=state.from;}};
 document.getElementById("btn-date-apply").onclick=()=>liveRefresh(false);
 const sn=document.getElementById("snap-note");if(sn)sn.textContent="Connecting to iBOS via backend…";
}catch(e){console.error("filter bar setup failed (stale cached HTML/JS mismatch? hard-refresh) --",e);}
})();

render();
liveRefresh(true);

fetch("/api/auth/me").then(r=>r.json()).then(me=>{
 if(me.is_admin)document.getElementById("admin-link").style.display="";
}).catch(()=>{});
document.getElementById("btn-logout").onclick=async()=>{
 await fetch("/api/auth/logout",{method:"POST"});
 location.href="/";
};

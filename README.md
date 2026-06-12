# InvoiceIQ — AI Invoice Processing Demo

> **Prepared by Grant Thornton Bharat for Continuum Energy**
> *Fake intelligence. Real experience.*

InvoiceIQ is a **client-facing demo** that simulates an AI-powered, multi-agent
invoice processing pipeline for an Accounts Payable team. It is designed to
look and feel like a production SaaS product so that a presenter can walk a
client through the experience of "AI-assisted invoice review" end-to-end.

---

## The problem

Accounts Payable (AP) teams at large enterprises process a high volume of
vendor invoices every month, and most of that review is still manual:

- Every invoice has to be **cross-checked against its Purchase Order and
  Goods Receipt Note** (a 3-way match) to catch overbilling, out-of-scope
  charges, or duplicate payments — typically done line-by-line by hand.
- **GST and TDS compliance** (correct GSTIN, correct deduction rates) is
  verified manually, with mistakes carrying real regulatory and financial
  penalties.
- Invoices arrive via email/portals with no central queue, so AP staff lack
  visibility into what's pending, what's blocked on missing documents, and
  what's at risk of breaching payment SLAs.
- Because review is manual and inconsistent, **discrepancies are often
  caught after payment has already gone out**, when recovery is far harder.
- Clean, low-risk invoices wait in the same queue as problem invoices,
  slowing down payments to good vendors and straining vendor relationships.

## The impact

InvoiceIQ demonstrates how an AI-assisted AP workflow changes this picture:

- **Straight-through processing (STP)** for clean invoices — invoices that
  pass every automated check move directly to the payment queue with no
  human touch, so AP staff only spend time on exceptions.
- **Lower compliance risk** — GST/GSTIN validity and TDS deduction rates are
  checked against statutory requirements *before* payment, not after.
- **Reduced financial leakage** — automated 3-way matching flags amount
  mismatches between Invoice, PO, and GRN (e.g., overbilling, duplicate or
  out-of-scope line items) before money leaves the business.
- **Faster, more predictable payment cycles** — a single prioritized queue
  (SLA Watch, Document Blockers, Pattern Watch) gives AP teams a clear view
  of what needs attention and why, improving vendor satisfaction.
- **Better audit trail** — every decision (approve, reject, request
  documents) carries a plain-language AI rationale explaining *why*,
  supporting internal controls and audit reviews.

## How it works

InvoiceIQ models a 6-stage AI agent pipeline that mirrors how a real AP
automation platform would process an invoice end-to-end:

1. **Invoice Receiver** — ingests the invoice, PO, and GRN documents for a claim.
2. **Validation Agent** — performs the 3-way match, comparing invoice line
   items and amounts against the PO and GRN.
3. **Compliance Officer** — checks GST/GSTIN validity and TDS deduction
   rates against statutory requirements.
4. **Anomaly Agent** — scans for unusual patterns such as out-of-scope
   items, amount overages, or due-date issues.
5. **Decision Gate** — combines the results of all checks to decide whether
   the invoice qualifies for Straight-Through Processing or needs human review.
6. **Payment Scheduler** — for approved invoices, schedules payment and adds
   the claim to the Payment Queue.

Each check produces a **PASS / FAIL / WARNING** result plus a plain-language
rationale, shown to the AP reviewer in the claim detail view — so they see
not just *what* was flagged, but *why*, and can **Approve**, **Reject**, or
**Request Documents** with a single click. Approved/STP claims flow into the
Payment Queue automatically, and the dashboard's stats and insight cards
update live as decisions are made.

---

## ⚠️ Important: This is a simulation, not a real AI product

This demo intentionally contains **no real AI, ML, or backend logic**:

- ❌ No calls to OpenAI, Claude, Gemini, or any other AI API
- ❌ No OCR or document parsing — uploaded files are never read
- ❌ No backend server, database, or authentication
- ❌ No network requests of any kind
- ❌ No persistence — refreshing the page resets the app to its initial state

Everything labeled "AI Agent," "AI Rationale," "Anomaly Detection," etc. is
**pre-scripted, hardcoded, and timed with JavaScript** to *look* like a live
multi-agent system is reasoning over real documents. The 5 claims, their
check results, and their AI notes are fixed data defined in
[`data/claims.js`](data/claims.js).

This approach lets a presenter run a fully polished, repeatable, offline demo
without any API keys, cloud infrastructure, or risk of unpredictable model
output.

---

## Tech stack

- **HTML5** — single-page app shell (`index.html`)
- **CSS3** — custom design system using CSS variables (`styles.css`)
- **Vanilla JavaScript (ES6+)** — no frameworks, no build step (`script.js`)
- **Google Fonts (Inter)** — loaded via CDN `<link>`

No `npm install`, no bundler, no transpilation. The entire app runs by
opening `index.html` in a browser, and is fully compatible with **GitHub
Pages** (all asset references use relative paths).

---

## Project structure

```
GT_Opportunity_Intelligence/
├── index.html                  # App shell: sidebar, topbar, content mount, overlays
├── styles.css                  # Full design system (tokens, layout, components)
├── script.js                   # All app logic, state, rendering, and animations
├── data/
│   └── claims.js               # Hardcoded claim dataset + pipeline script/logs
├── assets/
│   ├── logo.svg                # InvoiceIQ logo mark
│   └── sample-documents/       # Realistic Indian GST documents for live demo upload
│       ├── Invoice_CE-INV-2026-082.html
│       ├── PO_CE-2026-0398.html
│       └── GRN_CE-2026-0398.html
└── README.md
```

---

## Running the demo

### Option 1 — Open directly
Simply open `index.html` in any modern browser (Chrome/Edge/Safari/Firefox).

### Option 2 — Local static server (recommended)
Some browsers restrict relative file loading under `file://`. Serve the
folder locally instead:

```bash
# from the project root
python3 -m http.server 8080
# then visit http://localhost:8080
```

### Option 3 — GitHub Pages
Push this folder to a GitHub repository and enable Pages on the `main`
branch (root directory). All paths are relative, so no configuration is
required.

---

## Demo walkthrough (suggested script)

1. **Upload Documents** — On first load, the app shows an upload screen with
   three tiles: *Invoice*, *Purchase Order*, *Goods Receipt Note (GRN)*.
   Use the sample files in `assets/sample-documents/` (these are realistic
   Indian GST-style documents for the **ABB Power Grids** claim,
   `CE-INV-2026-082`). Selecting a file marks the tile as done — **file
   contents are never read or parsed**, this step is purely cosmetic to set
   the scene.

2. **Run AI Agent Pipeline** — Once all three tiles show a file, the "Run AI
   Agent Pipeline" button activates. Clicking it plays a ~12-second animated
   sequence across 6 stages:
   `Invoice Receiver → Validation Agent → Compliance Officer → Anomaly Agent
   → Decision Gate → Payment Scheduler`
   Each stage transitions gray → purple (active) → green (done), a progress
   bar fills, and a terminal-style activity log streams realistic,
   timestamped agent messages.

3. **Queue Insights (Dashboard)** — After the pipeline completes, the app
   navigates to the dashboard automatically and unlocks the sidebar. It
   shows:
   - Stat cards: Total Claims, STP Approved, Under Review, Value Queued
   - Insight cards: SLA Watch, Document Blockers, Pattern Watch — all
     **computed live** from the claim dataset's check statuses
   - A "Suggested Next Actions" table linking directly into flagged claims

4. **My Queue / Claims list** — Browse all 5 claims across tabs: All Claims,
   Straight-Through, Needs Review, Payment Queue. Click any row to open the
   claim detail panel.

5. **Claim Detail (slide-over)** — Shows vendor, invoice, PO/GRN amounts, a
   5-point automated check grid (3-Way Match, GST Compliance, TDS Rate, Due
   Date, Anomaly Check) with PASS/FAIL/WARNING badges, a hardcoded
   human-readable "AI Rationale" note, and action buttons depending on
   status:
   - **Approve** / **Reject** / **Request Documents** (claims needing review)
   - **Schedule Payment** (claims that passed straight-through)

   All actions update the in-memory claim state instantly — counts, tabs,
   and the dashboard refresh live. Nothing is saved; a page refresh resets
   everything.

6. **Payment Queue** — Lists scheduled and rejected claims with Invoice ID,
   Vendor, Amount, Approved By, Schedule Date, and Status.

7. **How It Thinks** — A modal (accessible anytime from the sidebar) that
   explains, in plain language, what each of the 6 AI agents "does" — useful
   for answering client questions about the (simulated) architecture.

---

## The 5 hardcoded claims

| Claim ID | Vendor | Amount (₹) | Result | Risk | Key Issue |
|---|---|---|---|---|---|
| CE-INV-2026-081 | Siemens Energy India Ltd | 18,40,000 | STP | Low | Clean — all checks pass |
| CE-INV-2026-082 | ABB Power Grids Pvt Ltd | 9,75,500 | Review | High | Invoice exceeds matched PO/GRN by ₹1,55,500 (18.9%); TDS under-deducted |
| CE-INV-2026-083 | Rajasthan Infra Works | — | Review | — | GSTIN mismatch vs. vendor master |
| CE-INV-2026-084 | Vestas Wind Systems | — | STP | Low | TDS-exempt (Section 197 certificate) |
| CE-INV-2026-085 | Pune Electrical Contractors | — | Review | Medium | Invoice 3 days past due date |

Full details (line-item amounts, GSTINs, check rationales, AI notes) are in
[`data/claims.js`](data/claims.js).

---

## Sample documents

The three HTML files in `assets/sample-documents/` are formatted as
realistic Indian GST documents (letterhead, GSTIN, SAC codes, CGST/SGST
breakup, bank details) for the **ABB Power Grids** claim:

- **Invoice_CE-INV-2026-082.html** — Tax invoice for ₹9,75,500, referencing
  PO-CE-2026-0398, including an out-of-scope "emergency call-out" line item
  and a TDS note (2% deducted vs. 10% contractually required).
- **PO_CE-2026-0398.html** — The matching Purchase Order for ₹8,20,000.
- **GRN_CE-2026-0398.html** — The matching Goods Receipt Note confirming
  ₹8,20,000 of work received, with no discrepancies — making the invoice's
  ₹1,55,500 overage visible when compared side-by-side.

These exist purely for **visual realism** during a live demo (e.g., the
presenter can open them in another tab to "show" the source documents before
uploading). The app does not read or parse them.

---

## Design system

The visual language follows the Grant Thornton "ClaimIQ" reference:
white cards on a light gray page background, an indigo primary color
(`#5B5FEF`), the Inter typeface, soft rounded corners, and color-coded
status pills (red = high risk / fail, amber = medium / warning, green = low
risk / pass / success, blue = informational). All design tokens live in the
`:root` block at the top of `styles.css`.

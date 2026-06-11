# Business Requirements Document (BRD)
## AI Invoice Processing Agent — Interactive Demo
**Prepared for:** Continuum Energy (Client Demo)
**Prepared by:** Grant Thornton Bharat — dGTL Advisory
**Document Version:** 1.0
**Status:** Draft for Development
**Target Build Tool:** Claude Code (single-page HTML/JS prototype)

---

## 1. Document Control

| Field | Detail |
|---|---|
| Project Name | AI-Powered Invoice Processing Agent — Demo (Codename: InvoiceIQ) |
| Client | Continuum Energy |
| Engagement Owner | Grant Thornton Bharat, dGTL |
| Build Type | Front-end demo only (no live AI/LLM API calls) |
| Delivery Format | Static multi-file site (HTML, CSS, JS) — GitHub Pages ready |
| Reference Design | "ClaimIQ" UI screenshot (provided) — theme to be replicated |

---

## 2. Purpose & Background

Continuum Energy has expressed interest in an AI-driven invoice processing solution that performs automated three-way matching (Invoice ↔ Purchase Order ↔ Goods Receipt Note), compliance checks (GST/TDS), anomaly detection, and routes claims either to **Straight-Through Processing (STP)** or **Human Review**.

This BRD covers a **demo build** intended for a client-facing walkthrough/pitch. The demo must:

- **Look and feel like a real, production-grade SaaS product** ("InvoiceIQ").
- **Visually mirror the reference UI** ("ClaimIQ" screenshot) — same layout grammar, color language, typography, card and table styling.
- **Simulate** the AI agent pipeline using pre-scripted logic, timed sequences, and canned outputs — **no external AI API calls** of any kind.
- Use **realistic, India-specific sample documents** (invoice, PO, GRN) so the demo feels grounded in an actual energy-sector scenario.

---

## 3. Scope

### 3.1 In Scope
- A single-page web application (HTML/CSS/JS) styled per the InvoiceIQ theme (Section 6).
- Upload zones for: Invoice, Purchase Order, Goods Receipt Note (file selection only — content of uploaded file is NOT actually parsed).
- A **simulated multi-agent pipeline** with a visible status strip (Receiver → Validator → Compliance → Anomaly → Decision Gate → Payment Scheduler).
- A **live "Agent Activity Log"** panel that streams pre-written log lines with realistic timestamps and delays.
- A **"Queue Insights" landing view** (modeled on the reference screenshot) summarizing SLA risks, document blockers, and anomaly alerts.
- A **claims list / table view** with risk badges, status pills, and "Suggested Next Actions."
- Drill-down **claim detail view** showing 3-way match results, GST/TDS/anomaly checks, and an AI-generated rationale note.
- **Human-in-the-loop actions**: Approve, Reject, Request Documents, Schedule Payment — all updating local UI state only.
- A **Payment Queue** tab listing approved claims with mock scheduled payment dates.
- 5 pre-built **sample claim records** (mix of clean STP cases and exception cases) reflecting a power/energy sector vendor base (transformer OEMs, EPC contractors, civil works, etc.)
- 1–2 **realistic sample PDF/HTML invoices** (Section 9) provided separately for the presenter to "upload" during the live demo.

### 3.2 Out of Scope
- Any real OCR, document parsing, or LLM/AI API integration.
- Backend, database, authentication, or persistent storage across sessions.
- Real GST/TDS/PAN validation against government databases.
- Multi-user roles, permissions, or audit trail persistence beyond the current session.
- Mobile-responsive optimization (desktop-first only, 1440px target).

---

## 4. Stakeholders

| Role | Responsibility |
|---|---|
| Engagement Partner (GT) | Final sign-off on demo narrative & branding |
| Business Analyst (this BRD author) | Requirements, sample data, acceptance criteria |
| Continuum Energy (Client) | Audience for the demo; provides sector context |
| Development Agent (Claude Code) | Builds the front-end demo per this BRD |

---

## 5. Business Objectives

1. Demonstrate how an **agentic AI workflow** could reduce manual invoice review effort for Continuum Energy's AP team.
2. Showcase **explainability** — every AI decision must show a human-readable rationale, not a black box.
3. Reinforce **human-in-the-loop governance** — exceptions are surfaced, not auto-approved blindly.
4. Present a **polished, branded, "production-ready" look** that builds client confidence in GT's delivery capability.

---

## 6. UI/UX Requirements — "InvoiceIQ" Theme

> The reference screenshot ("ClaimIQ — Queue Insights") defines the visual language. The development agent must replicate this design system, re-skinned with invoice-processing terminology and a Grant Thornton–appropriate accent color.

### 6.1 Layout Structure
- **Left Sidebar** (fixed, ~230px width, white background, light right border):
  - Top: Product logo mark (rounded-square gradient icon + wordmark, e.g. **"IPA — InvoiceIQ"**)
  - Section: **CLAIMS / INVOICES**
    - `My Queue` (with count badge)
    - `In Review` (with count badge)
    - `Completed`
  - Section: **WORKLIST**
    - `Queue Insights` (active state — light indigo background, indigo text, left accent indicator)
  - Section: **LEARN**
    - `How It Thinks` (links to an "agent explainability" panel — optional stretch)
  - Bottom-pinned: User profile block (avatar circle with initials, name, role, settings icon, help icon)

- **Top Bar** (full width, white, bottom border):
  - Left: collapse-sidebar icon + breadcrumb (e.g. "Queue Insights")
  - Right: role pill/badge (e.g. "Assessor" → rename to **"AP Reviewer"**), search icon, notification bell with red dot, user avatar circle

- **Main Content Area** (light gray `#F7F8FB` background):
  - Breadcrumb back-link (e.g. "‹ My Queue")
  - Page title with small sparkle/AI icon + subtitle line
  - **Insight Cards Row** (3 cards, equal width, white bg, rounded corners, colored left border accent, subtle shadow):
    - Card 1 — `SLA WATCH` (red accent) — e.g. "Invoice X is most overdue"
    - Card 2 — `DOCUMENT BLOCKERS` (amber accent) — e.g. "2 invoices need supporting documents"
    - Card 3 — `PATTERN WATCH` (indigo/blue accent) — e.g. "Anomaly detected — duplicate invoice pattern"
    - Each card: small icon badge top-left, eyebrow label (uppercase, gray, letter-spaced), bold headline, 1–2 line description, link-style CTA with arrow (→)
  - **Suggested Next Actions table** (white card container):
    - Header row: subtle gray background, uppercase small labels
    - Columns: `RISK` (colored pill: High = red, Medium = amber, Low = green), `VENDOR`, `INVOICE / PO`, `SIGNAL` (colored pill, e.g. "72d Overdue", "GST Mismatch", "Documents Needed"), `ACTION` (indigo "Open" link)
    - Row hover state: very light gray background

### 6.2 Color Palette (InvoiceIQ — adapted from reference)

| Token | Hex | Usage |
|---|---|---|
| `--brand-primary` | `#5B5FEF` (indigo/violet — close to reference) | Logo, active nav, links, primary buttons |
| `--brand-primary-dark` | `#4338CA` | Hover states |
| `--brand-soft` | `#EEF0FE` | Active nav background, soft highlights |
| `--bg-page` | `#F7F8FB` | Main canvas background |
| `--bg-card` | `#FFFFFF` | Cards, sidebar, top bar |
| `--border` | `#E7E8F0` | Dividers, card borders |
| `--text-primary` | `#1A1B25` | Headings |
| `--text-secondary` | `#6B7280` | Body/secondary text |
| `--risk-high` | `#EF4444` / bg `#FEF2F2` | High risk pill, SLA accent |
| `--risk-medium` | `#F59E0B` / bg `#FFFBEB` | Medium risk pill, blocker accent |
| `--risk-low` / `--success` | `#10B981` / bg `#ECFDF5` | Low risk, STP/approved states |
| `--info` | `#3B82F6` / bg `#EFF6FF` | Pattern/anomaly accent, scheduled state |

### 6.3 Typography
- Font family: `Inter`, `DM Sans`, or system sans-serif (clean, modern, slightly tighter letter spacing on headings).
- Headings: 18–22px, semi-bold (600).
- Eyebrow labels: 11px, uppercase, letter-spacing 0.06em, gray.
- Body/table text: 13–14px, regular/medium.

### 6.4 Components Required
- Sidebar navigation with active-state highlighting
- Top bar with role badge, search icon, notification icon (with unread dot), avatar
- 3-column insight card row (icon + eyebrow + title + description + CTA link)
- Data table with risk pills, status pills, and action links
- Status/risk pill component (reusable: High/Medium/Low, Overdue/Documents Needed/Anomaly/Scheduled/Approved)
- Modal or slide-over panel for **Claim Detail View** (3-way match grid, compliance checks, AI rationale note, action buttons)
- Toast/inline confirmation when an action (Approve/Reject/Schedule) is performed
- Upload tiles (reuse pattern from card styling — dashed border, icon, filename preview, checkmark on success)
- Animated "Agent Activity Log" feed panel
- Pipeline status strip (horizontal stepper showing agent stages)

---

## 7. Functional Requirements

### FR-1: Document Upload
- Three upload tiles: **Invoice**, **Purchase Order**, **Goods Receipt Note** — accept `.pdf` only.
- On selection: tile shows filename + green checkmark; tile border turns success-green.
- "Run Agent Pipeline" button enables only when all 3 files are selected.
- **No file content is read or parsed** — selection is purely cosmetic to trigger the simulated pipeline.

### FR-2: Simulated Agent Pipeline
- On "Run Agent Pipeline" click:
  - A horizontal pipeline stepper animates through stages sequentially with timed delays (suggested: 800ms–2000ms per stage):
    1. Invoice Receiver
    2. Validation Agent (3-way match)
    3. Compliance Officer (GST/TDS)
    4. Anomaly Agent
    5. Decision Gate
    6. Payment Scheduler
  - Each stage transitions: pending (gray) → active (indigo, pulsing) → done (green check)
- The **Agent Activity Log** streams pre-scripted log lines synced to each stage, with realistic timestamps (`HH:MM:SS`), color-coded dots (info/success/warning/error).
- A progress bar (0–100%) fills proportionally to pipeline progress.
- On completion: 5 sample claims (Section 8) populate the dashboard.

### FR-3: Queue Insights View (Landing/Default after processing)
- Render exactly per Section 6.1 — 3 insight cards + Suggested Next Actions table, derived from the 5 sample claims' computed status (no hardcoding beyond the sample data model).

### FR-4: Claims List & Filtering
- Tabs/views: **All Claims**, **Straight-Through (STP)**, **Needs Review**, **Payment Queue** — each with a live count badge.
- Summary stat cards: Total Claims, STP Approved, Under Review, Value Queued (₹ Lakhs).

### FR-5: Claim Detail / Validation Checks
- Each claim card/detail shows a 4–5 cell **check grid**: 3-Way Match, GST Compliance, TDS Rate, Due Date, Anomaly Check — each with Pass (green) / Fail (red) / Warning (amber) state.
- An **"Agent Note"** block explains the rationale in plain English (e.g., *"Invoice amount exceeds GRN value by ₹1,55,500 (18.9%). TDS applied at 2% but contract requires 10%."*)

### FR-6: Human-in-the-Loop Actions
- For claims flagged "Needs Review": reviewer can type a comment and click **Approve** or **Reject**.
  - Approve → moves claim to Payment Queue with status "Scheduled", approver = "Human Reviewer", a mock pay date (today + 7 days).
  - Reject → claim marked "Rejected", removed from active queue, comment stored in session state.
- For STP claims: reviewer can click **Schedule Payment** → moves to Payment Queue, approver = "STP Agent".

### FR-7: Payment Queue
- Table with columns: Claim/Invoice ID, Vendor, Amount, Approved By, Schedule Date, Status (Scheduled).

### FR-8: Session State Only
- All state (uploaded files, claim statuses, log entries) lives in JS variables/React state for the session.
- **No `localStorage`/`sessionStorage`/cookies.** Refreshing the page resets the demo.

---

## 8. Sample Claims Dataset (for pipeline output)

The development agent should hardcode 5 claims representing a realistic Continuum Energy vendor mix:

| ID | Vendor | Type | Amount (₹) | Result | Key Issue |
|---|---|---|---|---|---|
| CE-INV-2026-081 | Siemens Energy India Ltd | Inverter Replacement | 18,40,000 | STP | Clean — all checks pass |
| CE-INV-2026-082 | ABB Power Grids Pvt Ltd | Transformer O&M Service | 9,75,500 | Review | 3-way mismatch + TDS rate error + duplicate pattern |
| CE-INV-2026-083 | Rajasthan Infra Works | Civil Maintenance Works | 4,12,800 | Review | GSTIN mismatch vs vendor master |
| CE-INV-2026-084 | Vestas Wind Systems | Gearbox Overhaul (TN Wind Farm) | 32,60,000 | STP | Clean — OEM, TDS-exempt |
| CE-INV-2026-085 | Pune Electrical Contractors | Switchgear Inspection | 2,88,000 | STP (minor note) | Invoice 3 days past Net-30 term |

*(These map directly to the existing simulated pipeline already prototyped — the development agent should retain this dataset and only re-skin the UI to match Section 6.)*

---

## 9. Sample Source Documents (To Be Provided to Presenter)

To make the live demo credible, **two realistic sample documents** will be supplied separately as downloadable/printable HTML (formatted to resemble real PDFs):

1. **Sample Invoice** — `CE-INV-2026-082` (ABB Power Grids Pvt Ltd) — the "exception" case, formatted as a standard Indian GST tax invoice (vendor letterhead, GSTIN, HSN/SAC codes, line items, CGST/SGST/IGST breakup, bank details, PO reference).
2. *(Optional, if time permits)* **Sample Purchase Order** and **Goods Receipt Note** for the same claim, to show the mismatch the demo describes (PO/GRN value ₹8,20,000 vs. Invoice ₹9,75,500).

> Note: These documents are for **visual realism only** during the upload step; the application does not read their contents. The presenter selects these files purely so the upload tiles show "uploaded" state before clicking "Run Agent Pipeline."

---

## 10. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Pipeline animation total runtime: 10–12 seconds (configurable constant) |
| Browser support | Latest Chrome/Edge (demo environment) |
| Responsiveness | Optimized for 1440×900 desktop/projector display |
| Branding | Neutral "InvoiceIQ" branding (avoid using real Grant Thornton or Continuum Energy trademarks/logos directly in the UI chrome — use placeholder wordmarks unless brand assets are explicitly supplied) |
| Accessibility | Sufficient color contrast for status pills (WCAG AA where feasible) |

---

## 11. Technical Constraints (for Claude Code)

- **Stack: Plain HTML, CSS, and vanilla JavaScript only.** No React, no build step, no bundler, no npm/node dependencies.
- **Target deployment: GitHub Pages (static hosting).** The project must run by simply opening `index.html` or visiting the published Pages URL — no server-side code.
- **Recommended file structure** (separate files for easy editing, not one giant file):
  ```
  /index.html          → main app shell (sidebar, top bar, content area, modals)
  /styles.css          → all styling, CSS variables for the InvoiceIQ palette
  /script.js           → app logic (pipeline simulation, claim data, rendering, event handlers)
  /data/claims.js       → CLAIM_TEMPLATES dataset (Section 8) as a separate JS file/array, easy to edit
  /assets/              → logo, icons (SVG preferred), sample invoice files for upload
  ```
- **No external API calls** (no `fetch` to AI endpoints, no MCP, no network dependencies). Google Fonts via `<link>` is acceptable since GitHub Pages supports external CDN links.
- **No browser storage APIs** (no `localStorage`/`sessionStorage`/cookies/IndexedDB) — use plain JS variables/objects in `script.js` for in-memory session state. Page refresh resets the demo, which is expected.
- All "AI outputs" (log lines, rationale notes, check results) are **pre-written strings** keyed to the 5 sample claims in `data/claims.js` — simulate latency via `setTimeout`/`setInterval`.
- Keep the data (`claims.js`) and UI logic (`script.js`) separate so the sample claims, log messages, and check results can be edited independently of the rendering/animation code — this also makes future hand-off to a real backend easier.
- Use semantic HTML and CSS classes (BEM-ish or simple descriptive names) so the markup is readable for manual edits — avoid heavy inline styles or generated class names.
- Paths must be **relative** (e.g., `./styles.css`, `./assets/logo.svg`) so the site works correctly under a GitHub Pages project subpath (e.g., `username.github.io/repo-name/`).

---

## 12. Acceptance Criteria

- [ ] UI visually matches the reference screenshot's layout grammar: sidebar, top bar, 3-card insight row, suggested-actions table.
- [ ] Color palette and component styling follow Section 6.2/6.3.
- [ ] Upload → Run Pipeline → animated stepper + streaming log → populated dashboard, in that sequence, without errors.
- [ ] All 5 sample claims appear with correct STP/Review classification and check-grid results matching Section 8.
- [ ] Approve/Reject/Schedule actions correctly move claims between tabs and update counts/summary stats live.
- [ ] No console errors; no external/AI network calls fired.
- [ ] Refreshing the browser resets to the empty/upload state (confirms no persistence).

---

## 13. Assumptions & Dependencies

- Final brand colors/logo to be confirmed by GT marketing before client presentation; placeholders used until then.
- Sample invoice values are **fictional** and for demo purposes only — not derived from any real Continuum Energy transaction.
- Presenter will manually narrate the "AI reasoning" alongside the on-screen agent log during the live demo.

---

## 14. Open Items for Discussion

1. Should the "How It Thinks" sidebar item open an explainability panel describing each agent's role (stretch goal)?
2. Do we want a light/dark theme toggle, or light-only (per reference screenshot)?
3. Should rejected claims be retrievable (e.g., a "Rejected" tab), or hidden after rejection?

---

*End of Document*

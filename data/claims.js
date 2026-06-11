/* ==========================================================================
   InvoiceIQ — Sample Claims Dataset
   Source of truth: invoice_processor.md (Section 8)
   These are pre-written, hardcoded "AI outputs". Nothing here is computed
   by an external model — every check result and rationale is fixed text
   keyed to a sample claim, used purely to drive the simulated demo.
   ========================================================================== */

// Each claim's "checks" object drives the Claim Detail check-grid.
// status: "PASS" | "FAIL" | "WARNING"
const CLAIM_TEMPLATES = [
  {
    id: "CE-INV-2026-081",
    vendor: "Siemens Energy India Ltd",
    vendorGstin: "27AAACS1234F1Z5",
    type: "Inverter Replacement",
    poNumber: "PO-CE-2026-0451",
    invoiceDate: "2026-05-28",
    dueDate: "2026-06-27",
    paymentTerms: "Net-30",
    amount: 1840000,
    poAmount: 1840000,
    grnAmount: 1840000,
    result: "STP",
    riskLevel: "Low",
    keyIssue: "Clean — all checks pass",
    checks: {
      threeWayMatch: {
        status: "PASS",
        label: "3-Way Match",
        detail: "Invoice, Purchase Order and GRN values reconcile exactly at ₹18,40,000."
      },
      gst: {
        status: "PASS",
        label: "GST Compliance",
        detail: "GSTIN 27AAACS1234F1Z5 verified against vendor master. IGST @ 18% applied correctly under HSN 8504."
      },
      tds: {
        status: "PASS",
        label: "TDS Rate",
        detail: "TDS @ 2% (Section 194Q) deducted correctly per the master service agreement."
      },
      dueDate: {
        status: "PASS",
        label: "Due Date",
        detail: "Invoice dated 28-May-2026, due 27-Jun-2026 — within Net-30 payment terms."
      },
      anomaly: {
        status: "PASS",
        label: "Anomaly Check",
        detail: "No duplicate invoice numbers or unusual amount patterns detected in the last 90 days."
      }
    },
    aiNote: "All five validation checks passed with full confidence. Invoice, PO and GRN amounts reconcile exactly, statutory tax treatment matches the master agreement, and no anomalies were found. This claim is eligible for Straight-Through Processing with no manual intervention required.",
    status: "stp_ready" // stp_ready | needs_review | docs_requested | scheduled | rejected
  },
  {
    id: "CE-INV-2026-082",
    vendor: "ABB Power Grids Pvt Ltd",
    vendorGstin: "29AABCA9821F1Z2",
    type: "Transformer O&M Service",
    poNumber: "PO-CE-2026-0398",
    invoiceDate: "2026-05-15",
    dueDate: "2026-06-29",
    paymentTerms: "Net-45",
    amount: 975500,
    poAmount: 820000,
    grnAmount: 820000,
    result: "Review",
    riskLevel: "High",
    keyIssue: "3-way mismatch + TDS rate error + duplicate pattern",
    checks: {
      threeWayMatch: {
        status: "FAIL",
        label: "3-Way Match",
        detail: "Invoice value ₹9,75,500 exceeds the matched PO/GRN value of ₹8,20,000 by ₹1,55,500 (18.9%)."
      },
      gst: {
        status: "PASS",
        label: "GST Compliance",
        detail: "GSTIN 29AABCA9821F1Z2 verified against vendor master. CGST + SGST @ 18% computed correctly under SAC 9987."
      },
      tds: {
        status: "FAIL",
        label: "TDS Rate",
        detail: "TDS applied at 2% — contract clause 14.3 mandates 10% for O&M service contracts above ₹5,00,000."
      },
      dueDate: {
        status: "PASS",
        label: "Due Date",
        detail: "Invoice received within the Net-45 contractual window."
      },
      anomaly: {
        status: "WARNING",
        label: "Anomaly Check",
        detail: "Near-identical invoice amount and line items detected from the same vendor in the April-2026 batch — possible duplicate submission."
      }
    },
    aiNote: "Invoice amount exceeds GRN value by ₹1,55,500 (18.9%). TDS applied at 2% but the contract requires 10% for O&M services above ₹5,00,000. Additionally, a near-identical invoice pattern was found in the April batch, indicating a possible duplicate submission. Routed to Human Review — recommend verifying with the vendor before scheduling payment.",
    status: "needs_review"
  },
  {
    id: "CE-INV-2026-083",
    vendor: "Rajasthan Infra Works",
    vendorGstin: "08AAFCR5566K1Z9",
    vendorMasterGstin: "08AAFCR5566K1ZP",
    type: "Civil Maintenance Works",
    poNumber: "PO-CE-2026-0512",
    invoiceDate: "2026-05-20",
    dueDate: "2026-06-19",
    paymentTerms: "Net-30",
    amount: 412800,
    poAmount: 412800,
    grnAmount: 412800,
    result: "Review",
    riskLevel: "Medium",
    keyIssue: "GSTIN mismatch vs vendor master",
    checks: {
      threeWayMatch: {
        status: "PASS",
        label: "3-Way Match",
        detail: "Invoice value ₹4,12,800 matches the Purchase Order and GRN exactly."
      },
      gst: {
        status: "FAIL",
        label: "GST Compliance",
        detail: "GSTIN on invoice (08AAFCR5566K1Z9) does not match the vendor master record (08AAFCR5566K1ZP) — possible clerical error or unregistered branch."
      },
      tds: {
        status: "PASS",
        label: "TDS Rate",
        detail: "TDS @ 1% (Section 194C, individual contractor) applied correctly."
      },
      dueDate: {
        status: "PASS",
        label: "Due Date",
        detail: "Invoice dated 20-May-2026, due 19-Jun-2026 — within Net-30 payment terms."
      },
      anomaly: {
        status: "PASS",
        label: "Anomaly Check",
        detail: "No duplicate invoices or unusual amount patterns detected."
      }
    },
    aiNote: "The GSTIN on the submitted invoice does not match the vendor master record on file — this may be a clerical error or an unregistered branch GSTIN. All other checks pass. Routed to Human Review for GSTIN verification before payment can proceed.",
    status: "needs_review"
  },
  {
    id: "CE-INV-2026-084",
    vendor: "Vestas Wind Systems",
    vendorGstin: "33AAACV4521F1Z8",
    type: "Gearbox Overhaul (TN Wind Farm)",
    poNumber: "PO-CE-2026-0467",
    invoiceDate: "2026-05-25",
    dueDate: "2026-06-24",
    paymentTerms: "Net-30",
    amount: 3260000,
    poAmount: 3260000,
    grnAmount: 3260000,
    result: "STP",
    riskLevel: "Low",
    keyIssue: "Clean — OEM, TDS-exempt",
    checks: {
      threeWayMatch: {
        status: "PASS",
        label: "3-Way Match",
        detail: "Invoice, Purchase Order and GRN values reconcile exactly at ₹32,60,000."
      },
      gst: {
        status: "PASS",
        label: "GST Compliance",
        detail: "GSTIN 33AAACV4521F1Z8 verified. IGST @ 18% applied correctly for inter-state OEM supply."
      },
      tds: {
        status: "PASS",
        label: "TDS Rate",
        detail: "Vendor holds a valid Section 197 TDS exemption certificate — zero TDS deducted, as expected."
      },
      dueDate: {
        status: "PASS",
        label: "Due Date",
        detail: "Invoice dated 25-May-2026, due 24-Jun-2026 — within Net-30 payment terms."
      },
      anomaly: {
        status: "PASS",
        label: "Anomaly Check",
        detail: "No anomalies detected — consistent with historical OEM billing pattern."
      }
    },
    aiNote: "All checks passed. Invoice reconciles exactly with PO and GRN, GST treatment is correct for an inter-state OEM supply, and the vendor's active Section 197 TDS exemption certificate was verified — so zero TDS deduction is expected and correct. This claim is eligible for Straight-Through Processing.",
    status: "stp_ready"
  },
  {
    id: "CE-INV-2026-085",
    vendor: "Pune Electrical Contractors",
    vendorGstin: "27AABFP4321Q1Z6",
    type: "Switchgear Inspection",
    poNumber: "PO-CE-2026-0530",
    invoiceDate: "2026-05-10",
    dueDate: "2026-06-09",
    paymentTerms: "Net-30",
    amount: 288000,
    poAmount: 288000,
    grnAmount: 288000,
    result: "STP",
    riskLevel: "Low",
    keyIssue: "Invoice 3 days past Net-30 term",
    daysOverdue: 3,
    checks: {
      threeWayMatch: {
        status: "PASS",
        label: "3-Way Match",
        detail: "Invoice, Purchase Order and GRN values match exactly at ₹2,88,000."
      },
      gst: {
        status: "PASS",
        label: "GST Compliance",
        detail: "GSTIN 27AABFP4321Q1Z6 verified. CGST + SGST @ 18% applied correctly under SAC 9987."
      },
      tds: {
        status: "PASS",
        label: "TDS Rate",
        detail: "TDS @ 2% (Section 194C) applied correctly."
      },
      dueDate: {
        status: "WARNING",
        label: "Due Date",
        detail: "Invoice processed 3 days past the Net-30 payment term — minor SLA breach."
      },
      anomaly: {
        status: "PASS",
        label: "Anomaly Check",
        detail: "No duplicate invoices or unusual amount patterns detected."
      }
    },
    aiNote: "All financial and compliance checks passed. One minor flag: this invoice was processed 3 days past the Net-30 payment term, which may attract a late-payment query from the vendor. Recommended for Straight-Through Processing with a note for the AP team.",
    status: "stp_ready"
  }
];

// Six-stage agent pipeline shown in the horizontal stepper.
const PIPELINE_STAGES = [
  { id: "receiver", label: "Invoice Receiver" },
  { id: "validation", label: "Validation Agent" },
  { id: "compliance", label: "Compliance Officer" },
  { id: "anomaly", label: "Anomaly Agent" },
  { id: "decision", label: "Decision Gate" },
  { id: "scheduler", label: "Payment Scheduler" }
];

// Pre-scripted Agent Activity Log lines.
// "time" = milliseconds from pipeline start. "stage" must match a
// PIPELINE_STAGES id. "type" drives the colored status dot.
const PIPELINE_LOGS = [
  { time: 150, stage: "receiver", type: "info", message: "Initializing AI agent pipeline..." },
  { time: 500, stage: "receiver", type: "info", message: "5 documents queued for processing." },
  { time: 950, stage: "receiver", type: "info", message: "Invoice CE-INV-2026-081 received from Siemens Energy India Ltd." },
  { time: 1350, stage: "receiver", type: "success", message: "All invoice metadata extracted successfully." },

  { time: 1750, stage: "validation", type: "info", message: "Running 3-way match: Invoice ↔ Purchase Order ↔ GRN..." },
  { time: 2200, stage: "validation", type: "success", message: "CE-INV-2026-081: PO and GRN values match exactly." },
  { time: 2650, stage: "validation", type: "warning", message: "CE-INV-2026-082: Invoice value ₹9,75,500 exceeds matched PO/GRN value of ₹8,20,000." },
  { time: 3100, stage: "validation", type: "success", message: "CE-INV-2026-084: 3-way match passed for Vestas Wind Systems." },
  { time: 3450, stage: "validation", type: "info", message: "Validation pass complete — 1 mismatch flagged." },

  { time: 3850, stage: "compliance", type: "info", message: "Checking GSTIN and tax computation against vendor master..." },
  { time: 4300, stage: "compliance", type: "success", message: "CE-INV-2026-081: GST validation passed (IGST @ 18%)." },
  { time: 4750, stage: "compliance", type: "warning", message: "CE-INV-2026-082: TDS rate mismatch — applied 2%, contract requires 10%." },
  { time: 5200, stage: "compliance", type: "error", message: "CE-INV-2026-083: GSTIN on invoice does not match vendor master record." },
  { time: 5550, stage: "compliance", type: "info", message: "Compliance scan complete — 2 issues flagged." },

  { time: 5950, stage: "anomaly", type: "info", message: "Scanning historical invoices for duplicate patterns..." },
  { time: 6400, stage: "anomaly", type: "warning", message: "CE-INV-2026-082: Potential duplicate invoice detected — similar amount in April-2026 batch." },
  { time: 6850, stage: "anomaly", type: "warning", message: "CE-INV-2026-085: Invoice processed 3 days past Net-30 term." },
  { time: 7300, stage: "anomaly", type: "success", message: "CE-INV-2026-084: No anomalies detected." },
  { time: 7600, stage: "anomaly", type: "info", message: "Anomaly scan complete." },

  { time: 8000, stage: "decision", type: "info", message: "Evaluating routing decisions for 5 claims..." },
  { time: 8450, stage: "decision", type: "success", message: "CE-INV-2026-081 → Straight-Through Processing." },
  { time: 8850, stage: "decision", type: "error", message: "CE-INV-2026-082 → Manual review required (high risk)." },
  { time: 9250, stage: "decision", type: "warning", message: "CE-INV-2026-083 → Manual review required (medium risk)." },
  { time: 9550, stage: "decision", type: "success", message: "CE-INV-2026-084, CE-INV-2026-085 → Straight-Through Processing." },

  { time: 9950, stage: "scheduler", type: "info", message: "Queuing eligible claims for payment scheduling..." },
  { time: 10400, stage: "scheduler", type: "success", message: "3 claims queued — total value ₹53,88,000." },
  { time: 10800, stage: "scheduler", type: "info", message: "2 claims routed to AP Reviewer queue for human review." },
  { time: 11150, stage: "scheduler", type: "success", message: "Pipeline run complete. Dashboard ready." }
];

// Total pipeline runtime in ms (last log time + small buffer).
const PIPELINE_TOTAL_DURATION = 11600;

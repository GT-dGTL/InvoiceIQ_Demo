/* ==========================================================================
   InvoiceIQ — Application Logic
   Pure front-end simulation: no network calls, no storage APIs.
   All "AI" output is pre-written in data/claims.js; this file only
   handles state, rendering, and timed animation.
   ========================================================================== */

/* ---------- Icon library (inline SVG, stroke-based) ---------- */
const ICONS = {
  sparkle: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  alertTriangle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  fileWarning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="11" x2="12" y2="15"/><line x1="12" y1="17.5" x2="12.01" y2="17.5"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  checkCircleSm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  xCircleSm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  alertCircleSm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  inbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg>`,
  gitCompare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  scan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>`,
  gitBranch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  calendarCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`
};

/* ---------- "How It Thinks" agent explainer copy ---------- */
const AGENT_DESCRIPTIONS = [
  {
    icon: ICONS.inbox,
    title: 'Invoice Receiver',
    desc: 'Captures incoming invoices and extracts core metadata — vendor, amount, PO reference, and dates — to kick off the workflow.'
  },
  {
    icon: ICONS.gitCompare,
    title: 'Validation Agent',
    desc: 'Performs a 3-way match across the Invoice, Purchase Order, and Goods Receipt Note to confirm quantities and values reconcile.'
  },
  {
    icon: ICONS.shieldCheck,
    title: 'Compliance Officer',
    desc: 'Verifies the vendor GSTIN against the master record and checks TDS rates against contract terms and statutory requirements.'
  },
  {
    icon: ICONS.scan,
    title: 'Anomaly Agent',
    desc: 'Scans recent invoice history for duplicate submissions, unusual amounts, and other patterns that warrant a closer look.'
  },
  {
    icon: ICONS.gitBranch,
    title: 'Decision Gate',
    desc: 'Combines the findings from every upstream agent and routes the claim to Straight-Through Processing or Human Review.'
  },
  {
    icon: ICONS.calendarCheck,
    title: 'Payment Scheduler',
    desc: 'Queues approved claims for payment with a proposed schedule date, ready for the AP team to confirm.'
  }
];

/* ---------- Application state (in-memory only) ---------- */
const state = {
  uploads: { invoice: null, po: null, grn: null },
  pipelineRunning: false,
  pipelineComplete: false,
  claims: [],
  currentView: 'upload', // upload | pipeline | queue-insights | my-queue
  activeTab: 'all', // all | stp | review | payment-queue
  activeClaimId: null
};

/* ==========================================================================
   FORMAT HELPERS
   ========================================================================== */
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function formatLakhs(amount) {
  return '₹' + (amount / 100000).toFixed(2) + ' L';
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function getTimestamp() {
  return new Date().toLocaleTimeString('en-IN', { hour12: false });
}

function setBreadcrumb(text) {
  document.getElementById('topbarBreadcrumb').textContent = text;
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupSidebarNav();
  setupSidebarToggle();
  setupOverlayClose();
  renderUploadView();
});

function setupSidebarNav() {
  document.querySelectorAll('.nav-item[data-view]').forEach((item) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('disabled')) return;
      const view = item.dataset.view;
      const tab = item.dataset.tab;
      navigateTo(view, tab);
    });
  });
}

function setupSidebarToggle() {
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
}

function setupOverlayClose() {
  document.getElementById('claimBackdrop').addEventListener('click', closeClaimDetail);
  document.getElementById('thinkBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'thinkBackdrop') closeHowItThinks();
  });
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function navigateTo(view, tab) {
  if (view === 'how-it-thinks') {
    openHowItThinks();
    return;
  }
  state.currentView = view;
  if (tab) state.activeTab = tab;
  updateSidebarActiveState();

  if (view === 'queue-insights') renderQueueInsights();
  else if (view === 'my-queue') renderClaimsList();
}

function updateSidebarActiveState() {
  const tabGroups = {
    all: ['all', 'stp'],
    review: ['review'],
    'payment-queue': ['payment-queue']
  };
  document.querySelectorAll('.nav-item[data-view]').forEach((item) => {
    if (item.dataset.view === 'my-queue') {
      const tabs = tabGroups[item.dataset.tab] || [];
      item.classList.toggle('active', state.currentView === 'my-queue' && tabs.includes(state.activeTab));
    } else if (item.dataset.view === 'queue-insights') {
      item.classList.toggle('active', state.currentView === 'queue-insights');
    }
  });
}

/* ==========================================================================
   UPLOAD VIEW
   ========================================================================== */
function renderUploadView() {
  state.currentView = 'upload';
  setBreadcrumb('Upload Documents');

  const ready = allFilesUploaded();
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="upload-view fade-view">
      <div class="upload-view__intro">
        <p class="upload-view__eyebrow">AI Invoice Processing Agent</p>
        <h1 class="upload-view__title">Upload claim documents to begin</h1>
        <p class="upload-view__subtitle">Select the Invoice, Purchase Order and Goods Receipt Note for this claim batch. InvoiceIQ's agent pipeline will validate, reconcile and route every claim automatically.</p>
      </div>
      <div class="upload-grid">
        ${renderUploadTile('invoice', 'Invoice')}
        ${renderUploadTile('po', 'Purchase Order')}
        ${renderUploadTile('grn', 'Goods Receipt Note')}
      </div>
      <div class="upload-view__action">
        <button class="btn btn--primary" id="runPipelineBtn" ${ready ? '' : 'disabled'}>
          ${ICONS.sparkle} Run AI Agent Pipeline
        </button>
        <p class="upload-view__hint">${ready ? 'All documents ready. Launching the agent pipeline simulates 5 claims end-to-end.' : 'Select all three documents to enable the pipeline.'}</p>
      </div>
    </div>
  `;

  ['invoice', 'po', 'grn'].forEach((type) => {
    const input = document.getElementById(`fileInput-${type}`);
    if (input) {
      input.addEventListener('change', (e) => handleFileSelect(type, e.target.files[0]));
    }
  });

  const runBtn = document.getElementById('runPipelineBtn');
  if (runBtn) runBtn.addEventListener('click', runPipeline);
}

function renderUploadTile(type, label) {
  const filename = state.uploads[type];
  const doneClass = filename ? 'is-done' : '';
  return `
    <label class="upload-tile ${doneClass}" for="fileInput-${type}">
      <div class="upload-tile__icon">${filename ? ICONS.checkCircle : ICONS.file}</div>
      <div class="upload-tile__label">${label}</div>
      ${filename
        ? `<span class="upload-tile__filename">${ICONS.check} ${filename}</span>`
        : `<span class="upload-tile__hint">PDF document</span>`}
      <input type="file" id="fileInput-${type}" accept=".pdf,.html,.htm,application/pdf" ${filename ? 'disabled' : ''} />
    </label>
  `;
}

function handleFileSelect(type, file) {
  if (!file) return;
  state.uploads[type] = file.name;
  renderUploadView();
}

function allFilesUploaded() {
  return Boolean(state.uploads.invoice && state.uploads.po && state.uploads.grn);
}

/* ==========================================================================
   PIPELINE SIMULATION
   ========================================================================== */
function runPipeline() {
  if (state.pipelineRunning || !allFilesUploaded()) return;
  state.pipelineRunning = true;
  renderPipelineView();

  PIPELINE_LOGS.forEach((log) => setTimeout(() => appendLogEntry(log), log.time));

  const stageDuration = PIPELINE_TOTAL_DURATION / PIPELINE_STAGES.length;
  PIPELINE_STAGES.forEach((stage, i) => {
    setTimeout(() => setStageState(i, 'active'), Math.round(i * stageDuration));
    setTimeout(() => setStageState(i, 'done'), Math.round((i + 1) * stageDuration - 100));
  });

  const startTime = Date.now();
  const progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, (elapsed / PIPELINE_TOTAL_DURATION) * 100);
    updateProgressBar(pct);
    if (pct >= 100) clearInterval(progressInterval);
  }, 100);

  setTimeout(finishPipeline, PIPELINE_TOTAL_DURATION + 400);
}

function renderPipelineView() {
  state.currentView = 'pipeline';
  setBreadcrumb('Running Agent Pipeline');

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="pipeline-view fade-view">
      <div class="pipeline-card">
        <h2 class="pipeline-card__title">AI Agent Pipeline</h2>
        <p class="pipeline-card__subtitle">Processing 5 claims through the InvoiceIQ multi-agent workflow&hellip;</p>
        <div class="pipeline-stepper" id="pipelineStepper">
          ${PIPELINE_STAGES.map((stage, i) => `
            <div class="pipeline-step" data-stage-index="${i}">
              <div class="pipeline-step__connector"></div>
              <div class="pipeline-step__circle">${i + 1}</div>
              <div class="pipeline-step__label">${stage.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="progress-bar"><div class="progress-bar__fill" id="progressFill"></div></div>
        <div class="progress-meta">
          <span>Validating, reconciling and routing claims&hellip;</span>
          <span><strong id="progressPercent">0</strong>%</span>
        </div>
      </div>
      <div class="activity-log-card">
        <div class="activity-log-card__title"><span class="live-dot"></span> Agent Activity Log</div>
        <div class="activity-log" id="activityLog"></div>
      </div>
    </div>
  `;
}

function setStageState(index, newState) {
  const steps = document.querySelectorAll('.pipeline-step');
  const step = steps[index];
  if (!step) return;
  step.classList.remove('is-active', 'is-done');
  step.classList.add(newState === 'active' ? 'is-active' : 'is-done');
  if (newState === 'done') {
    step.querySelector('.pipeline-step__circle').innerHTML = ICONS.check;
  }
}

function appendLogEntry(log) {
  const logEl = document.getElementById('activityLog');
  if (!logEl) return;
  const entry = document.createElement('div');
  entry.className = 'activity-log__entry';
  entry.innerHTML = `
    <span class="activity-log__dot activity-log__dot--${log.type}"></span>
    <span class="activity-log__time">[${getTimestamp()}]</span>
    <span class="activity-log__message">${log.message}</span>
  `;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}

function updateProgressBar(pct) {
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressPercent');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = Math.round(pct);
}

function finishPipeline() {
  state.pipelineRunning = false;
  state.pipelineComplete = true;
  state.claims = JSON.parse(JSON.stringify(CLAIM_TEMPLATES));
  enableSidebarNav();
  renderSidebarBadges();
  navigateTo('queue-insights');
}

function enableSidebarNav() {
  document.querySelectorAll('.nav-item.disabled').forEach((el) => el.classList.remove('disabled'));
}

/* ==========================================================================
   CLAIM STATE HELPERS
   ========================================================================== */
function isActive(claim) {
  return claim.status === 'stp_ready' || claim.status === 'needs_review' || claim.status === 'docs_requested';
}

function getCounts() {
  const claims = state.claims;
  const total = claims.length;
  const stp = claims.filter((c) => c.status === 'stp_ready').length;
  const review = claims.filter((c) => c.status === 'needs_review' || c.status === 'docs_requested').length;
  const completed = claims.filter((c) => c.status === 'scheduled' || c.status === 'rejected').length;
  const myQueue = claims.filter(isActive).length;
  const valueQueued = claims.filter(isActive).reduce((sum, c) => sum + c.amount, 0);
  return { total, stp, review, completed, myQueue, valueQueued };
}

function renderSidebarBadges() {
  const counts = getCounts();
  document.getElementById('badgeMyQueue').textContent = counts.myQueue;
  document.getElementById('badgeInReview').textContent = counts.review;
}

function renderStatCards(counts) {
  return `
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-card__label">Total Claims</div>
        <div class="stat-card__value">${counts.total}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">STP Approved</div>
        <div class="stat-card__value is-success">${counts.stp}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Under Review</div>
        <div class="stat-card__value is-warning">${counts.review}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Value Queued</div>
        <div class="stat-card__value is-info">${formatLakhs(counts.valueQueued)}</div>
      </div>
    </div>
  `;
}

function renderStatusPill(status) {
  const map = {
    stp_ready: { cls: 'pill--low', label: 'STP Ready' },
    needs_review: { cls: 'pill--medium', label: 'Needs Review' },
    docs_requested: { cls: 'pill--medium', label: 'Documents Requested' },
    scheduled: { cls: 'pill--info', label: 'Scheduled' },
    rejected: { cls: 'pill--high', label: 'Rejected' }
  };
  const item = map[status] || { cls: 'pill--neutral', label: status };
  return `<span class="pill ${item.cls}">${item.label}</span>`;
}

function renderEmptyState(title, desc) {
  return `
    <div class="empty-state">
      <div class="empty-state__icon">${ICONS.checkCircle}</div>
      <div class="empty-state__title">${title}</div>
      <div class="empty-state__desc">${desc}</div>
    </div>
  `;
}

function attachOpenClaimListeners() {
  document.querySelectorAll('[data-open-claim]').forEach((el) => {
    el.addEventListener('click', () => openClaimDetail(el.dataset.openClaim));
  });
}

/* ==========================================================================
   QUEUE INSIGHTS VIEW
   ========================================================================== */
function renderQueueInsights() {
  state.currentView = 'queue-insights';
  setBreadcrumb('Queue Insights');

  const counts = getCounts();
  const insights = computeInsights();
  const actions = computeSuggestedActions();

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="fade-view">
      <div class="page-header">
        <h1 class="page-title"><span class="sparkle">${ICONS.sparkle}</span> Queue Insights</h1>
        <p class="page-subtitle">AI-prioritized view of today's invoice queue across Continuum Energy's vendor base.</p>
      </div>

      ${renderStatCards(counts)}

      <div class="insight-cards">
        ${renderInsightCard(insights.sla)}
        ${renderInsightCard(insights.blockers)}
        ${renderInsightCard(insights.pattern)}
      </div>

      <div class="table-card">
        <div class="table-card__header">
          <h2 class="table-card__title">Suggested Next Actions</h2>
        </div>
        <div class="table-scroll">
          ${actions.length
            ? renderActionsTable(actions)
            : renderEmptyState('Nothing needs attention', 'Every claim in this batch is clear. Check My Queue to schedule payments.')}
        </div>
      </div>
    </div>
  `;

  attachOpenClaimListeners();
}

function computeInsights() {
  const claims = state.claims;

  const overdue = claims.filter((c) => isActive(c) && c.checks.dueDate.status !== 'PASS');
  const sla = overdue.length > 0
    ? {
        type: 'sla',
        eyebrow: 'SLA Watch',
        title: `${overdue[0].id} is the most overdue invoice`,
        desc: `${overdue[0].vendor} — ${overdue[0].checks.dueDate.detail}`,
        ctaLabel: 'Review invoice',
        claimId: overdue[0].id
      }
    : {
        type: 'sla',
        eyebrow: 'SLA Watch',
        title: 'All invoices within SLA',
        desc: 'No active claims are past their payment due date.',
        ctaLabel: null
      };

  const blocked = claims.filter((c) => isActive(c) && (c.checks.gst.status === 'FAIL' || c.checks.tds.status === 'FAIL'));
  const blockers = blocked.length > 0
    ? {
        type: 'blockers',
        eyebrow: 'Document Blockers',
        title: `${blocked.length} invoice${blocked.length > 1 ? 's' : ''} need${blocked.length > 1 ? '' : 's'} supporting documentation`,
        desc: `${blocked.map((c) => c.id).join(', ')} — GST/TDS discrepancies require vendor clarification before approval.`,
        ctaLabel: 'Review blocked invoices',
        claimId: blocked[0].id
      }
    : {
        type: 'blockers',
        eyebrow: 'Document Blockers',
        title: 'No document blockers',
        desc: 'All compliance documentation is in order for this batch.',
        ctaLabel: null
      };

  const anomalies = claims.filter((c) => isActive(c) && c.checks.anomaly.status === 'WARNING');
  const pattern = anomalies.length > 0
    ? {
        type: 'pattern',
        eyebrow: 'Pattern Watch',
        title: `Anomaly detected on ${anomalies[0].id}`,
        desc: anomalies[0].checks.anomaly.detail,
        ctaLabel: 'Investigate claim',
        claimId: anomalies[0].id
      }
    : {
        type: 'pattern',
        eyebrow: 'Pattern Watch',
        title: 'No anomalies detected',
        desc: 'No duplicate invoices or unusual billing patterns found in this batch.',
        ctaLabel: null
      };

  return { sla, blockers, pattern };
}

function renderInsightCard(card) {
  const iconMap = { sla: ICONS.alertTriangle, blockers: ICONS.fileWarning, pattern: ICONS.activity };
  return `
    <div class="insight-card insight-card--${card.type}">
      <div class="insight-card__icon">${iconMap[card.type]}</div>
      <div class="insight-card__eyebrow">${card.eyebrow}</div>
      <div class="insight-card__title">${card.title}</div>
      <div class="insight-card__desc">${card.desc}</div>
      ${card.ctaLabel
        ? `<button class="insight-card__cta" data-open-claim="${card.claimId}">${card.ctaLabel} ${ICONS.arrowRight}</button>`
        : ''}
    </div>
  `;
}

function computeSuggestedActions() {
  const riskOrder = { High: 0, Medium: 1, Low: 2 };
  return state.claims
    .filter((c) => isActive(c) && Object.values(c.checks).some((check) => check.status !== 'PASS'))
    .map((c) => ({
      id: c.id,
      vendor: c.vendor,
      poNumber: c.poNumber,
      riskLevel: c.riskLevel,
      signal: getSignal(c)
    }))
    .sort((a, b) => (riskOrder[a.riskLevel] ?? 3) - (riskOrder[b.riskLevel] ?? 3));
}

function getSignal(claim) {
  if (claim.checks.anomaly.status === 'WARNING') return 'Duplicate Pattern';
  if (claim.checks.threeWayMatch.status === 'FAIL') return '3-Way Mismatch';
  if (claim.checks.gst.status === 'FAIL') return 'GST Mismatch';
  if (claim.checks.tds.status === 'FAIL') return 'TDS Mismatch';
  if (claim.checks.dueDate.status === 'WARNING') return `${claim.daysOverdue}d Overdue`;
  return 'Needs Review';
}

function signalPillClass(signal) {
  if (signal.includes('Overdue')) return 'pill--high';
  if (signal.includes('Mismatch')) return 'pill--medium';
  if (signal.includes('Pattern')) return 'pill--info';
  return 'pill--neutral';
}

function renderActionsTable(actions) {
  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Risk</th>
          <th>Vendor</th>
          <th>Invoice / PO</th>
          <th>Signal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${actions.map((a) => `
          <tr>
            <td><span class="pill pill--${a.riskLevel.toLowerCase()}">${a.riskLevel}</span></td>
            <td class="cell-vendor">${a.vendor}</td>
            <td>${a.id}<span class="cell-sub">${a.poNumber}</span></td>
            <td><span class="pill ${signalPillClass(a.signal)}">${a.signal}</span></td>
            <td><button class="action-link" data-open-claim="${a.id}">Open</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

/* ==========================================================================
   CLAIMS QUEUE VIEW (My Queue / In Review / Completed)
   ========================================================================== */
function renderClaimsList() {
  state.currentView = 'my-queue';
  setBreadcrumb('Claims Queue');

  const counts = getCounts();
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="fade-view">
      <div class="page-header">
        <h1 class="page-title"><span class="sparkle">${ICONS.sparkle}</span> Claims Queue</h1>
        <p class="page-subtitle">Review exceptions, approve straight-through claims, and track payment scheduling.</p>
      </div>

      ${renderStatCards(counts)}

      <div class="table-card">
        <div class="table-card__header">
          <h2 class="table-card__title">Claims</h2>
          <div class="tab-bar" id="claimsTabBar">
            ${renderTab('all', 'All Claims', counts.total)}
            ${renderTab('stp', 'Straight-Through', counts.stp)}
            ${renderTab('review', 'Needs Review', counts.review)}
            ${renderTab('payment-queue', 'Payment Queue', counts.completed)}
          </div>
        </div>
        <div class="table-scroll" id="claimsTableWrap">
          ${renderClaimsTable(state.activeTab)}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('#claimsTabBar .tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      document.querySelectorAll('#claimsTabBar .tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
      document.getElementById('claimsTableWrap').innerHTML = renderClaimsTable(state.activeTab);
      attachOpenClaimListeners();
      updateSidebarActiveState();
    });
  });

  attachOpenClaimListeners();
}

function renderTab(tab, label, count) {
  const active = state.activeTab === tab ? 'active' : '';
  return `<button class="tab-btn ${active}" data-tab="${tab}">${label} <span class="nav-badge">${count}</span></button>`;
}

function renderClaimsTable(tab) {
  if (tab === 'payment-queue') return renderPaymentQueueTable();

  let claims;
  if (tab === 'stp') claims = state.claims.filter((c) => c.result === 'STP');
  else if (tab === 'review') claims = state.claims.filter((c) => c.status === 'needs_review' || c.status === 'docs_requested');
  else claims = state.claims;

  if (claims.length === 0) {
    return renderEmptyState('No claims here', 'There are no claims matching this view right now.');
  }

  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Risk</th>
          <th>Vendor</th>
          <th>Invoice / PO</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${claims.map((c) => `
          <tr>
            <td><span class="pill pill--${c.riskLevel.toLowerCase()}">${c.riskLevel}</span></td>
            <td class="cell-vendor">${c.vendor}<span class="cell-sub">${c.type}</span></td>
            <td>${c.id}<span class="cell-sub">${c.poNumber}</span></td>
            <td class="cell-amount">${formatINR(c.amount)}</td>
            <td>${renderStatusPill(c.status)}</td>
            <td><button class="action-link" data-open-claim="${c.id}">Open</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderPaymentQueueTable() {
  const claims = state.claims.filter((c) => c.status === 'scheduled' || c.status === 'rejected');
  if (claims.length === 0) {
    return renderEmptyState('Payment queue is empty', 'Approved or scheduled claims will appear here once actioned from My Queue or In Review.');
  }

  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Vendor</th>
          <th>Amount</th>
          <th>Approved By</th>
          <th>Schedule Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${claims.map((c) => `
          <tr>
            <td class="cell-id">${c.id}</td>
            <td class="cell-vendor">${c.vendor}</td>
            <td class="cell-amount">${formatINR(c.amount)}</td>
            <td>${c.approvedBy || '—'}</td>
            <td>${c.scheduleDate ? formatDate(c.scheduleDate) : '—'}</td>
            <td>${renderStatusPill(c.status)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

/* ==========================================================================
   CLAIM DETAIL SLIDE-OVER
   ========================================================================== */
function openClaimDetail(claimId) {
  const claim = state.claims.find((c) => c.id === claimId);
  if (!claim) return;
  state.activeClaimId = claimId;
  renderClaimDetail(claim);
  document.getElementById('claimBackdrop').classList.add('is-visible');
  document.getElementById('claimSlideover').classList.add('is-visible');
}

function closeClaimDetail() {
  document.getElementById('claimBackdrop').classList.remove('is-visible');
  document.getElementById('claimSlideover').classList.remove('is-visible');
  state.activeClaimId = null;
}

function checkIcon(status) {
  const map = { PASS: ICONS.checkCircleSm, FAIL: ICONS.xCircleSm, WARNING: ICONS.alertCircleSm };
  return map[status] || '';
}

function renderClaimDetail(claim) {
  const slideover = document.getElementById('claimSlideover');
  const checks = claim.checks;

  slideover.innerHTML = `
    <div class="slideover__header">
      <div>
        <div class="slideover__eyebrow">${claim.id} · ${claim.poNumber}</div>
        <div class="slideover__title">${claim.vendor}</div>
      </div>
      <button class="slideover__close" id="closeSlideoverBtn" type="button">${ICONS.x}</button>
    </div>
    <div class="slideover__body">
      <div class="detail-summary">
        <div>
          <div class="detail-field__label">Invoice ID</div>
          <div class="detail-field__value">${claim.id}</div>
        </div>
        <div>
          <div class="detail-field__label">Amount</div>
          <div class="detail-field__value amount">${formatINR(claim.amount)}</div>
        </div>
        <div>
          <div class="detail-field__label">Claim Type</div>
          <div class="detail-field__value">${claim.type}</div>
        </div>
        <div>
          <div class="detail-field__label">PO Reference</div>
          <div class="detail-field__value">${claim.poNumber}</div>
        </div>
        <div>
          <div class="detail-field__label">Invoice Date</div>
          <div class="detail-field__value">${formatDate(claim.invoiceDate)}</div>
        </div>
        <div>
          <div class="detail-field__label">Due Date</div>
          <div class="detail-field__value">${formatDate(claim.dueDate)} (${claim.paymentTerms})</div>
        </div>
        <div>
          <div class="detail-field__label">Vendor GSTIN</div>
          <div class="detail-field__value">${claim.vendorGstin}</div>
        </div>
        <div>
          <div class="detail-field__label">Routing Result</div>
          <div class="detail-field__value">${claim.result === 'STP' ? 'Straight-Through' : 'Human Review'}</div>
        </div>
      </div>

      <h3 class="slideover__section-title">Validation Checks</h3>
      <div class="check-grid">
        ${Object.values(checks).map((check) => `
          <div class="check-card">
            <div class="check-card__header">
              <span class="check-card__label">${check.label}</span>
              <span class="check-badge check-badge--${check.status}">${checkIcon(check.status)} ${check.status}</span>
            </div>
            <div class="check-card__detail">${check.detail}</div>
          </div>
        `).join('')}
      </div>

      <h3 class="slideover__section-title">Agent Note</h3>
      <div class="ai-note">
        <div class="ai-note__header">${ICONS.sparkle} AI Rationale</div>
        <div class="ai-note__body">${claim.aiNote}</div>
      </div>
    </div>
    <div class="slideover__footer">
      ${renderClaimActions(claim)}
    </div>
  `;

  document.getElementById('closeSlideoverBtn').addEventListener('click', closeClaimDetail);
  attachClaimActionListeners(claim);
}

function renderClaimActions(claim) {
  switch (claim.status) {
    case 'stp_ready':
      return `
        <button class="btn btn--primary btn--block" data-action="schedule" type="button">
          ${ICONS.calendarCheck} Schedule Payment
        </button>
      `;

    case 'needs_review':
    case 'docs_requested':
      return `
        ${claim.status === 'docs_requested' ? `
          <div class="status-banner status-banner--docs" style="margin-bottom:12px;">
            ${ICONS.alertCircleSm}
            <span>Documents requested from vendor on ${formatDate(claim.docsRequestedDate)}. Awaiting response.</span>
          </div>
        ` : ''}
        <textarea class="comment-box" id="reviewComment" placeholder="Add a review comment (optional)&hellip;">${claim.comment || ''}</textarea>
        <div class="action-row">
          <button class="btn btn--success" data-action="approve" type="button">${ICONS.check} Approve</button>
          <button class="btn btn--danger" data-action="reject" type="button">${ICONS.x} Reject</button>
        </div>
        <div class="action-row" style="margin-top:10px;">
          <button class="btn btn--secondary btn--block" data-action="request-docs" type="button">${ICONS.fileWarning} Request Documents</button>
        </div>
      `;

    case 'scheduled':
      return `
        <div class="status-banner status-banner--scheduled">
          ${ICONS.checkCircleSm}
          <span><strong>Scheduled for payment</strong><br>Approved by ${claim.approvedBy} · Pay date ${formatDate(claim.scheduleDate)}</span>
        </div>
      `;

    case 'rejected':
      return `
        <div class="status-banner status-banner--rejected">
          ${ICONS.xCircleSm}
          <span><strong>Claim rejected</strong>${claim.comment ? `<br>"${claim.comment}"` : ''}</span>
        </div>
      `;

    default:
      return '';
  }
}

function attachClaimActionListeners(claim) {
  const slideover = document.getElementById('claimSlideover');
  const approveBtn = slideover.querySelector('[data-action="approve"]');
  const rejectBtn = slideover.querySelector('[data-action="reject"]');
  const docsBtn = slideover.querySelector('[data-action="request-docs"]');
  const scheduleBtn = slideover.querySelector('[data-action="schedule"]');

  if (approveBtn) approveBtn.addEventListener('click', () => handleApprove(claim.id));
  if (rejectBtn) rejectBtn.addEventListener('click', () => handleReject(claim.id));
  if (docsBtn) docsBtn.addEventListener('click', () => handleRequestDocuments(claim.id));
  if (scheduleBtn) scheduleBtn.addEventListener('click', () => handleSchedulePayment(claim.id));
}

/* ==========================================================================
   HUMAN-IN-THE-LOOP ACTIONS
   ========================================================================== */
function getReviewComment() {
  const box = document.getElementById('reviewComment');
  return box ? box.value.trim() : '';
}

function handleApprove(claimId) {
  const claim = state.claims.find((c) => c.id === claimId);
  claim.comment = getReviewComment();
  claim.status = 'scheduled';
  claim.approvedBy = 'Human Reviewer';
  claim.scheduleDate = addDays(todayISO(), 7);
  afterClaimAction(claim, `${claim.id} approved and queued for payment.`, 'success');
}

function handleReject(claimId) {
  const claim = state.claims.find((c) => c.id === claimId);
  claim.comment = getReviewComment();
  claim.status = 'rejected';
  afterClaimAction(claim, `${claim.id} has been rejected.`, 'error');
}

function handleRequestDocuments(claimId) {
  const claim = state.claims.find((c) => c.id === claimId);
  claim.comment = getReviewComment();
  claim.status = 'docs_requested';
  claim.docsRequestedDate = todayISO();
  afterClaimAction(claim, `Document request sent to vendor for ${claim.id}.`, 'info');
}

function handleSchedulePayment(claimId) {
  const claim = state.claims.find((c) => c.id === claimId);
  claim.status = 'scheduled';
  claim.approvedBy = 'STP Agent';
  claim.scheduleDate = addDays(todayISO(), 7);
  afterClaimAction(claim, `${claim.id} scheduled for payment.`, 'success');
}

function afterClaimAction(claim, message, toastType) {
  showToast(message, toastType);
  renderClaimDetail(claim);
  renderSidebarBadges();
  if (state.currentView === 'queue-insights') renderQueueInsights();
  else if (state.currentView === 'my-queue') renderClaimsList();
}

/* ==========================================================================
   "HOW IT THINKS" MODAL
   ========================================================================== */
function openHowItThinks() {
  const modal = document.getElementById('thinkModal');
  modal.innerHTML = `
    <div class="modal__header">
      <h2 class="modal__title"><span class="sparkle">${ICONS.sparkle}</span> How InvoiceIQ Thinks</h2>
      <button class="slideover__close" id="closeThinkBtn" type="button">${ICONS.x}</button>
    </div>
    <p class="modal__subtitle">Every invoice moves through six specialized agents. Each agent performs one focused check and hands its findings to the next — giving the AP team a transparent, auditable trail behind every routing decision.</p>
    <div class="agent-list">
      ${AGENT_DESCRIPTIONS.map((agent) => `
        <div class="agent-card">
          <div class="agent-card__icon">${agent.icon}</div>
          <div>
            <div class="agent-card__title">${agent.title}</div>
            <div class="agent-card__desc">${agent.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('closeThinkBtn').addEventListener('click', closeHowItThinks);
  document.getElementById('thinkBackdrop').classList.add('is-visible');
}

function closeHowItThinks() {
  document.getElementById('thinkBackdrop').classList.remove('is-visible');
}

/* ==========================================================================
   TOASTS
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast__dot"></span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3300);
}

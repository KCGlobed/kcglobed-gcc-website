// App State
let currentQuestionId = 1;
let selectedOption = null;
let timerInterval = null;
let submissions = {};
let totalQuestions = 5;

// Calculator State
let calcDisplayVal = "0";
let calcHistoryVal = "";
let calcIsResult = false;
let calcMemory = 0;

// API Base URL (Relative for server, fallback to local if needed)
const API_BASE = '';

// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const progressNav = document.getElementById('progress-nav');
const questionTracker = document.getElementById('question-tracker');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const exitBtn = document.getElementById('exit-btn');

// Calculator DOM Elements
const calcModal = document.getElementById('calc-modal');
const calcToggleBtn = document.getElementById('calc-toggle-btn');
const calcCloseBtn = document.getElementById('calc-close-btn');
const calcDisplay = document.getElementById('calc-display');
const calcHistory = document.getElementById('calc-history');

// Summary DOM Elements
const summaryModal = document.getElementById('summary-modal');
const summaryMessage = document.getElementById('summary-message');
const summaryDetails = document.getElementById('summary-details');
const restartBtn = document.getElementById('restart-btn');

/* ==========================================================================
   Fallback Offline / File Protocol Mock System
   ========================================================================== */
const MOCK_QUESTIONS = [
  {
    id: 1,
    code: "KCGFARCCE0001",
    text: "Runner Co.'s checkbook balance on December 31, was $20,000. On that date, Runner held the following items in its safe:\n\n- Check payable to Runner worth $8,000, postdated January 3, and not included in the December 31 checkbook balance, in collection of a sale made in December.\n- Check payable to Runner worth $2,000, deposited December 15 and included in the December 31 checkbook balance, but returned by the bank on December 30 stamped \"NSF.\" The check was redeposited on January 2, and cleared on January 9.\n\nIn its December 31, balance sheet what amount should Runner report as cash ?",
    options: ["$28,000", "$18,000", "$26,000", "$20,000"]
  },
  {
    id: 2,
    code: "KCGFARCCE0002",
    text: "Under US GAAP, which of the following is classified as an operating activity on the statement of cash flows?",
    options: [
      "Payment of cash dividends to shareholders",
      "Collection of principal on a note receivable from a borrower",
      "Receipt of interest income on a debt investment",
      "Issuance of common stock for cash"
    ]
  },
  {
    id: 3,
    code: "KCGFARCCE0003",
    text: "A company purchased equipment for $100,000 on January 1, Year 1. The equipment has an estimated useful life of 5 years and a salvage value of $10,000. Under the double-declining-balance method, what is the depreciation expense for Year 2?",
    options: ["$24,000", "$40,000", "$18,000", "$20,000"]
  },
  {
    id: 4,
    code: "KCGFARCCE0004",
    text: "On July 1, Year 1, a company issued $500,000 of 8% bonds at face value. The bonds pay interest semi-annually on June 30 and December 31. What is the amount of interest expense recognized for the year ended December 31, Year 1?",
    options: ["$40,000", "$20,000", "$10,000", "$30,000"]
  },
  {
    id: 5,
    code: "KCGFARCCE0005",
    text: "Which of the following characteristics is a primary fundamental qualitative characteristic of useful financial information under the FASB conceptual framework?",
    options: ["Relevance", "Consistency", "Comparability", "Understandability"]
  }
];

// Force offline fallback mode to test immediately with local dummy questions
const FORCE_LOCAL_MOCK = true;
let useLocalMock = FORCE_LOCAL_MOCK || window.location.protocol === 'file:';

function getLocalSubmissions() {
  const data = localStorage.getItem('local_submissions');
  return data ? JSON.parse(data) : {};
}

function saveLocalSubmission(qId, val) {
  const subs = getLocalSubmissions();
  subs[qId] = val;
  localStorage.setItem('local_submissions', JSON.stringify(subs));
}

function resetLocalSubmissions() {
  localStorage.removeItem('local_submissions');
}

// Custom Fetch Wrapper with Automatic Server-to-Mock Fallback
async function apiFetch(url, options = {}) {
  if (useLocalMock) {
    return simulateFetch(url, options);
  }
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      console.warn("Server API returned error status. Activating local mock client database.");
      useLocalMock = true;
      return simulateFetch(url, options);
    }
    return res;
  } catch (err) {
    console.warn("Server backend not reachable. Activating local mock client database.", err);
    useLocalMock = true;
    return simulateFetch(url, options);
  }
}

function simulateFetch(url, options) {
  const path = url.replace(API_BASE, '');
  
  if (path.startsWith('/api/question/')) {
    const idParam = path.split('/').pop();
    const id = parseInt(idParam, 10);
    const q = MOCK_QUESTIONS.find(item => item.id === id);
    const subs = getLocalSubmissions();
    if (q) {
      return {
        ok: true,
        json: async () => ({
          ...q,
          submitted: !!subs[id],
          selectedAnswer: subs[id] || null
        })
      };
    } else {
      return { ok: false, status: 404 };
    }
  }
  
  if (path === '/api/submit') {
    const body = JSON.parse(options.body);
    saveLocalSubmission(body.questionId, body.selectedOption);
    return {
      ok: true,
      json: async () => ({ success: true })
    };
  }
  
  if (path === '/api/status') {
    const subs = getLocalSubmissions();
    return {
      ok: true,
      json: async () => ({
        totalQuestions: MOCK_QUESTIONS.length,
        submittedCount: Object.keys(subs).length,
        submissions: subs
      })
    };
  }
  
  if (path === '/api/reset') {
    resetLocalSubmissions();
    return {
      ok: true,
      json: async () => ({ success: true })
    };
  }

  return { ok: false, status: 404 };
}

/* ==========================================================================
   Initialization
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initTimer();
  fetchTestStatus().then(() => {
    loadQuestion(currentQuestionId);
  });
  initCalculator();
  setupEventListeners();
});

function setupEventListeners() {
  // Exit Test
  exitBtn.addEventListener('click', handleExit);

  // Close Summary & Restart
  restartBtn.addEventListener('click', handleResetTest);

  // Keyboard navigation for calculator
  window.addEventListener('keydown', handleCalculatorKeyboard);
}

/* ==========================================================================
   API Operations & Flow Control
   ========================================================================== */

// Fetch overall status of the test from server
async function fetchTestStatus() {
  try {
    const res = await apiFetch(`${API_BASE}/api/status`);
    if (!res.ok) throw new Error("Status API error");
    const data = await res.json();
    
    totalQuestions = data.totalQuestions || 5;
    submissions = data.submissions || {};

    // Visual refresh of navigation nodes
    renderProgressNav();

    // Determine current active question: first unanswered question
    for (let i = 1; i <= totalQuestions; i++) {
      if (!submissions[i]) {
        currentQuestionId = i;
        break;
      }
      // If all are answered, set to total
      if (i === totalQuestions) {
        currentQuestionId = totalQuestions;
      }
    }
  } catch (err) {
    console.error("Error fetching test status:", err);
  }
}

// Render the top numbers navigation bar
function renderProgressNav() {
  progressNav.innerHTML = '';
  for (let i = 1; i <= totalQuestions; i++) {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.textContent = i;
    btn.setAttribute('data-id', i);
    
    if (i === currentQuestionId) {
      btn.classList.add('active');
    }
    
    if (submissions[i]) {
      btn.classList.add('submitted');
      btn.disabled = true; // Lock submitted questions: user can't click to go back
    } else {
      // User can click on unsubmitted questions, but once submitted they are locked.
      btn.addEventListener('click', () => {
        currentQuestionId = i;
        loadQuestion(currentQuestionId);
      });
    }
    progressNav.appendChild(btn);
  }
}

// Load a specific question by ID
async function loadQuestion(id) {
  selectedOption = null;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submit';

  // Highlight active question in navigation
  const navItems = progressNav.querySelectorAll('.nav-item');
  navItems.forEach(btn => {
    const btnId = parseInt(btn.getAttribute('data-id'), 10);
    btn.classList.remove('active');
    if (btnId === id) {
      btn.classList.add('active');
    }
  });

  try {
    const res = await apiFetch(`${API_BASE}/api/question/${id}`);
    if (!res.ok) {
      questionText.textContent = "Error loading question. Please try again.";
      return;
    }
    const question = await res.json();

    // Update Meta Row
    questionTracker.textContent = `Question ${question.id} of ${totalQuestions} (#${question.code})`;
    
    // Set text
    questionText.innerHTML = formatQuestionText(question.text);

    // Render Options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, idx) => {
      const label = document.createElement('label');
      label.className = 'option-item';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'question-option';
      radio.value = option;

      // Check if already submitted (should normally not be editable)
      if (question.submitted) {
        radio.disabled = true;
        label.style.pointerEvents = 'none';
        if (question.selectedAnswer === option) {
          label.classList.add('selected');
          radio.checked = true;
        }
      } else {
        label.addEventListener('click', () => {
          // Select item
          const allOptions = optionsContainer.querySelectorAll('.option-item');
          allOptions.forEach(opt => opt.classList.remove('selected'));
          label.classList.add('selected');
          radio.checked = true;
          selectedOption = option;
          submitBtn.disabled = false;
        });
      }

      const customRadio = document.createElement('span');
      customRadio.className = 'custom-radio';

      const optText = document.createElement('span');
      optText.className = 'option-text';
      optText.textContent = option;

      label.appendChild(radio);
      label.appendChild(customRadio);
      label.appendChild(optText);
      optionsContainer.appendChild(label);
    });

    // Submit button configuration
    if (question.submitted) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitted';
    } else {
      submitBtn.onclick = () => handleSubmit(id);
    }

  } catch (err) {
    console.error("Error loading question details:", err);
    questionText.textContent = "Failed to fetch question from server.";
  }
}

// Convert markdown list item strings into readable layout
function formatQuestionText(text) {
  // Simple check for bullets in backend question
  return text.replace(/\n/g, '<br>');
}

// Submit answer for current question
async function handleSubmit(id) {
  if (!selectedOption) return;

  try {
    const response = await apiFetch(`${API_BASE}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionId: id,
        selectedOption: selectedOption
      })
    });

    if (!response.ok) throw new Error("Submittal failed");

    // Success response
    submissions[id] = selectedOption;
    renderProgressNav();

    // Advance to next question or complete exam
    if (id < totalQuestions) {
      currentQuestionId = id + 1;
      loadQuestion(currentQuestionId);
    } else {
      // Last question submitted
      submitTestFinal();
    }
  } catch (err) {
    console.error("Error submitting answer:", err);
    alert("There was an issue submitting your answer. Please check your connection.");
  }
}

// Submit test completely (on final submit or time limit)
async function submitTestFinal(isTimeOut = false) {
  clearInterval(timerInterval);
  localStorage.removeItem('test_end_time');

  try {
    const res = await apiFetch(`${API_BASE}/api/status`);
    const statusData = await res.json();
    
    // Render final results summary
    summaryDetails.innerHTML = `
      <div class="summary-row">
        <span class="summary-label">Total Questions</span>
        <span class="summary-val">${totalQuestions}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Submitted Answers</span>
        <span class="summary-val">${statusData.submittedCount} / ${totalQuestions}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Completion Status</span>
        <span class="summary-val" style="color: ${isTimeOut ? '#dc2626' : '#10b981'}">
          ${isTimeOut ? 'Timed Out (Auto-submitted)' : 'Completed'}
        </span>
      </div>
    `;

    if (isTimeOut) {
      summaryMessage.textContent = "Time has expired! Your exam has been automatically submitted.";
    } else {
      summaryMessage.textContent = "Your practice exam has been successfully completed and submitted.";
    }

    summaryModal.classList.remove('hidden');
  } catch (err) {
    console.error("Error loading final test summary:", err);
    summaryMessage.textContent = "Exam submitted. Error pulling summary stats.";
    summaryModal.classList.remove('hidden');
  }
}

// Reset/Restart Test session
async function handleResetTest() {
  try {
    await apiFetch(`${API_BASE}/api/reset`, { method: 'POST' });
    submissions = {};
    currentQuestionId = 1;
    selectedOption = null;

    // Reset local timer
    localStorage.removeItem('test_end_time');
    initTimer();

    // Reload UI
    summaryModal.classList.add('hidden');
    await fetchTestStatus();
    loadQuestion(currentQuestionId);
  } catch (err) {
    console.error("Error resetting test:", err);
  }
}

// Exit Test
async function handleExit() {
  if (confirm("Are you sure you want to exit the test? Your current progress is saved, but the timer will continue running if the session is not restarted.")) {
    // Perform standard exit route or display screen
    window.location.reload();
  }
}

/* ==========================================================================
   Timer Module
   ========================================================================== */
function initTimer() {
  const timeLimitMs = 30 * 60 * 1000; // 30 minutes
  let endTime = localStorage.getItem('test_end_time');

  if (!endTime) {
    endTime = Date.now() + timeLimitMs;
    localStorage.setItem('test_end_time', endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  // Clear previous intervals if any
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const remainingMs = endTime - Date.now();

    if (remainingMs <= 0) {
      // Time limit reached
      clearInterval(timerInterval);
      timerDisplay.textContent = "00:00";
      timerDisplay.style.color = '#dc2626'; // Alert color
      submitTestFinal(true); // Auto-submit
      return;
    }

    // Format Remaining Time
    const totalSecs = Math.floor(remainingMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;

    const displayMins = String(mins).padStart(2, '0');
    const displaySecs = String(secs).padStart(2, '0');

    timerDisplay.textContent = `${displayMins}:${displaySecs}`;

    // Alert visual style for last 2 minutes
    if (mins < 2) {
      timerDisplay.style.color = '#dc2626';
    } else {
      timerDisplay.style.color = 'var(--text-dark)';
    }
  }, 1000);
}

/* ==========================================================================
   Calculator Functionality
   ========================================================================== */
function clearActiveOperators() {
  const operatorBtns = document.querySelectorAll('.calc-grid .operator-btn');
  operatorBtns.forEach(btn => btn.classList.remove('active'));
}

function initCalculator() {
  // Modal toggle actions
  calcToggleBtn.addEventListener('click', () => {
    calcModal.classList.remove('hidden');
    calcToggleBtn.blur();
  });

  calcCloseBtn.addEventListener('click', () => {
    calcModal.classList.add('hidden');
  });

  // Close on backdrop click
  calcModal.addEventListener('click', (e) => {
    if (e.target === calcModal) {
      calcModal.classList.add('hidden');
    }
  });

  // Grid buttons click handling
  const calcGrid = document.querySelector('.calc-grid');
  calcGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.calc-btn');
    if (!btn) return;

    const val = btn.getAttribute('data-val');
    const op = btn.getAttribute('data-op');
    const action = btn.getAttribute('data-action');

    if (val) {
      clearActiveOperators();
      handleCalcNumber(val);
    }
    if (op) handleCalcOperator(op, btn);
    if (action) {
      if (action === 'equals' || action === 'clear') {
        clearActiveOperators();
      }
      handleCalcAction(action);
    }
  });
}

// Display screen updater
function updateCalcScreen() {
  calcDisplay.textContent = calcDisplayVal;
  calcHistory.textContent = calcHistoryVal;
}

// Numbers handler
function handleCalcNumber(num) {
  if (calcIsResult) {
    calcDisplayVal = "0";
    calcIsResult = false;
  }

  // Prevent double decimals in the active number token
  if (num === '.') {
    // Split display by operators to check the current active token
    const tokens = calcDisplayVal.split(/[\+\-x÷]/);
    const lastToken = tokens[tokens.length - 1];
    if (lastToken.includes('.')) return;
  }

  // Handle leading zero
  if (calcDisplayVal === "0" && num !== '.') {
    calcDisplayVal = num;
  } else {
    // Cap expression length to prevent overflow
    if (calcDisplayVal.length < 24) {
      calcDisplayVal += num;
    }
  }
  updateCalcScreen();
}

// Operators (+, -, *, /)
function handleCalcOperator(op, btn = null) {
  if (calcIsResult) {
    calcIsResult = false;
  }

  clearActiveOperators();
  if (btn) {
    btn.classList.add('active');
  }

  // Map incoming operators to pretty display symbols
  let displayOp = op;
  if (op === '*') displayOp = 'x';
  if (op === '/') displayOp = '÷';

  // Get last character
  const lastChar = calcDisplayVal.slice(-1);
  const operators = ['+', '-', 'x', '÷'];
  
  if (operators.includes(lastChar)) {
    // If user changes their mind, replace the operator
    calcDisplayVal = calcDisplayVal.slice(0, -1) + displayOp;
  } else {
    // Avoid starting with positive operator
    if (calcDisplayVal === "0" && (displayOp === '+' || displayOp === 'x' || displayOp === '÷')) {
      return;
    }
    
    if (calcDisplayVal === "0" && displayOp === '-') {
      calcDisplayVal = '-';
    } else {
      calcDisplayVal += displayOp;
    }
  }

  updateCalcScreen();
}

// Main evaluation method
function evaluateExpression(expr) {
  // Replace display glyphs with arithmetic operators
  let cleanExpr = expr.replace(/x/g, '*').replace(/÷/g, '/');
  
  // Safe math character set validation
  if (!/^[0-9.+\-*/\s()]+$/.test(cleanExpr)) {
    return "Error";
  }

  try {
    const result = new Function(`return (${cleanExpr})`)();
    if (result === undefined || isNaN(result) || !isFinite(result)) {
      return "Error";
    }
    // Format decimal results
    if (result.toString().includes('.')) {
      return parseFloat(result.toFixed(8));
    }
    return result;
  } catch (err) {
    return "Error";
  }
}

// Action operations
function handleCalcAction(action) {
  switch (action) {
    case 'clear':
      calcDisplayVal = "0";
      calcHistoryVal = "";
      calcIsResult = false;
      break;

    case 'backspace':
      if (calcIsResult) {
        calcDisplayVal = "0";
        calcIsResult = false;
      } else {
        if (calcDisplayVal.length > 1) {
          calcDisplayVal = calcDisplayVal.slice(0, -1);
        } else {
          calcDisplayVal = "0";
        }
      }
      break;

    case 'negate':
      // Negate the evaluated display result or the current expression
      if (calcDisplayVal !== "0" && calcDisplayVal !== "Error") {
        if (calcDisplayVal.startsWith('-')) {
          calcDisplayVal = calcDisplayVal.slice(1);
        } else {
          calcDisplayVal = '-' + calcDisplayVal;
        }
      }
      break;

    case 'percent':
      const pctVal = evaluateExpression(calcDisplayVal);
      if (pctVal !== "Error") {
        calcDisplayVal = String(pctVal / 100);
        calcIsResult = true;
      } else {
        calcDisplayVal = "Error";
      }
      break;

    case 'equals':
      if (calcDisplayVal === "Error") return;
      const resVal = evaluateExpression(calcDisplayVal);
      if (resVal !== "Error") {
        calcHistoryVal = calcDisplayVal;
        calcDisplayVal = String(resVal);
        calcIsResult = true;
      } else {
        calcDisplayVal = "Error";
      }
      break;
    
    // Memory Actions
    case 'mc': // Memory Clear
      calcMemory = 0;
      break;
    case 'mr': // Memory Recall
      if (calcIsResult) {
        calcDisplayVal = String(calcMemory);
        calcIsResult = false;
      } else {
        if (calcDisplayVal === "0") {
          calcDisplayVal = String(calcMemory);
        } else {
          calcDisplayVal += String(calcMemory);
        }
      }
      break;
    case 'ms': // Memory Store
      const valToStore = evaluateExpression(calcDisplayVal);
      if (valToStore !== "Error") {
        calcMemory = valToStore;
      }
      break;
    case 'm+': // Memory Add
      const addVal = evaluateExpression(calcDisplayVal);
      if (addVal !== "Error") {
        calcMemory += addVal;
      }
      break;
    case 'm-': // Memory Subtract
      const subVal = evaluateExpression(calcDisplayVal);
      if (subVal !== "Error") {
        calcMemory -= subVal;
      }
      break;
  }
  updateCalcScreen();
}

// Keyboard shortcuts for calculator inputs
function handleCalculatorKeyboard(e) {
  if (calcModal.classList.contains('hidden')) return;

  const key = e.key;

  if (key >= '0' && key <= '9') {
    clearActiveOperators();
    handleCalcNumber(key);
  } else if (key === '.') {
    clearActiveOperators();
    handleCalcNumber('.');
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    const btn = document.querySelector(`.calc-grid [data-op="${key}"]`);
    handleCalcOperator(key, btn);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    clearActiveOperators();
    handleCalcAction('equals');
  } else if (key === 'Escape') {
    calcModal.classList.add('hidden');
  } else if (key === 'Backspace') {
    handleCalcAction('backspace');
  } else if (key.toLowerCase() === 'c' || key === 'Delete') {
    clearActiveOperators();
    handleCalcAction('clear');
  }
}

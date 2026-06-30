<template>
  <div class="exam-root">
    <div class="test-container">
      <!-- Header -->
      <header class="test-header">
        <div class="header-left">
          <div class="timer-wrapper">
            <div class="clock-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="timer-display-container">
              <span class="timer-text" :style="{ color: timerColor }">{{ timerDisplay }}</span>
              <span class="timer-label">Time Remaining</span>
            </div>
          </div>
        </div>
        <div class="header-center">
          <h1 class="test-title">Financial Accounting &amp; Reporting (FAR) - Practice Test</h1>
        </div>
        <div class="header-right">
          <button class="icon-btn tool-btn" aria-label="Open Calculator" @click="calcVisible = true">
            <svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="8" y1="6" x2="16" y2="6"></line>
              <line x1="16" y1="14" x2="16" y2="18"></line>
              <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"></path>
            </svg>
            <span class="tool-text">Calculator</span>
          </button>
          <button class="exit-btn" @click="handleExit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Exit From Test</span>
          </button>
        </div>
      </header>

      <!-- Progress Nav -->
      <nav class="progress-bar-container" aria-label="Question Navigation">
        <div class="progress-nav-list">
          <button
            v-for="i in totalQuestions"
            :key="i"
            class="nav-item"
            :class="{ active: i === currentQuestionId, submitted: !!submissions[i] }"
            :disabled="!!submissions[i]"
            @click="!submissions[i] && loadQuestion(i)"
          >{{ i }}</button>
        </div>
      </nav>

      <!-- Main -->
      <main class="main-content">
        <div class="question-meta-row">
          <span class="question-tracker">{{ questionTracker }}</span>
        </div>
        <div class="question-card" v-if="currentQuestion">
          <div class="question-body">
            <p class="question-text" v-html="formatQuestionText(currentQuestion.text)"></p>
          </div>
          <div class="options-container">
            <label
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              class="option-item"
              :class="{ selected: selectedOption === option || (currentQuestion.submitted && currentQuestion.selectedAnswer === option) }"
              :style="currentQuestion.submitted ? 'pointer-events:none;' : ''"
              @click="!currentQuestion.submitted && selectOption(option)"
            >
              <input type="radio" name="question-option" :value="option" :disabled="currentQuestion.submitted" :checked="selectedOption === option || (currentQuestion.submitted && currentQuestion.selectedAnswer === option)" />
              <span class="custom-radio"></span>
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <div class="card-footer">
            <button class="submit-btn" :disabled="!selectedOption || currentQuestion.submitted || isSubmitting" @click="handleSubmit(currentQuestionId)">
              <span v-if="isSubmitting" class="btn-spinner"></span>
              {{ currentQuestion.submitted ? 'Submitted' : 'Submit' }}
            </button>
          </div>
        </div>
        <div v-else class="question-card loading-card">
          <div class="loading-spinner"></div>
        </div>
      </main>
    </div>

    <!-- Calculator Modal -->
    <div v-if="calcVisible" class="modal-overlay" @click.self="calcVisible = false">
      <div class="calculator-modal">
        <div class="calc-header">
          <span class="calc-title">Calculator</span>
          <button class="calc-close-btn" @click="calcVisible = false">Close</button>
        </div>
        <div class="calc-body">
          <div class="calc-screen">
            <div class="calc-history">{{ calcHistory }}</div>
            <div class="calc-display-val">{{ calcDisplay }}</div>
          </div>
          <div class="calc-grid">
            <button class="calc-btn memory-btn" @click="handleCalcAction('mc')">MC</button>
            <button class="calc-btn memory-btn" @click="handleCalcAction('mr')">MR</button>
            <button class="calc-btn memory-btn" @click="handleCalcAction('ms')">MS</button>
            <button class="calc-btn memory-btn" @click="handleCalcAction('m+')">M+</button>
            <button class="calc-btn memory-btn" @click="handleCalcAction('m-')">M-</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('7')">7</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('8')">8</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('9')">9</button>
            <button class="calc-btn clear-btn" @click="handleCalcAction('clear')">AC</button>
            <button class="calc-btn backspace-btn" @click="handleCalcAction('backspace')">&#9003;</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('4')">4</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('5')">5</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('6')">6</button>
            <button class="calc-btn operator-btn" :class="{ active: activeOperator === '/' }" @click="handleCalcOperator('/')">÷</button>
            <button class="calc-btn operator-btn" :class="{ active: activeOperator === '*' }" @click="handleCalcOperator('*')">×</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('1')">1</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('2')">2</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('3')">3</button>
            <button class="calc-btn operator-btn" :class="{ active: activeOperator === '-' }" @click="handleCalcOperator('-')">−</button>
            <button class="calc-btn operator-btn" :class="{ active: activeOperator === '+' }" @click="handleCalcOperator('+')">+</button>
            <button class="calc-btn toggle-sign-btn" @click="handleCalcAction('negate')">±</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('0')">0</button>
            <button class="calc-btn num-btn" @click="handleCalcNumber('.')">.</button>
            <button class="calc-btn percent-btn" @click="handleCalcAction('percent')">%</button>
            <button class="calc-btn equals-btn" @click="handleCalcAction('equals')">=</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Modal -->
    <div v-if="summaryVisible" class="modal-overlay">
      <div class="summary-card">
        <div class="summary-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Practice Test Submitted!</h2>
        <p>{{ summaryMessage }}</p>
        <div class="summary-details">
          <div class="summary-row">
            <span class="summary-label">Total Questions</span>
            <span class="summary-val">{{ totalQuestions }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Submitted Answers</span>
            <span class="summary-val">{{ submittedCount }} / {{ totalQuestions }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Completion Status</span>
            <span class="summary-val" :style="{ color: summaryIsTimeout ? '#dc2626' : '#10b981' }">
              {{ summaryIsTimeout ? 'Timed Out (Auto-submitted)' : 'Completed' }}
            </span>
          </div>
        </div>
        <div class="summary-actions">
          <button class="restart-btn" @click="handleResetTest">Start New Attempt</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' });
useHead({ title: 'FAR Practice Test - KCG' });

const MOCK_QUESTIONS = [
  { id: 1, code: 'KCGFARCCE0001', text: "Runner Co.'s checkbook balance on December 31, was $20,000. On that date, Runner held the following items in its safe:\n\n- Check payable to Runner worth $8,000, postdated January 3, and not included in the December 31 checkbook balance.\n- Check payable to Runner worth $2,000, deposited December 15, but returned by the bank on December 30 stamped \"NSF.\"\n\nIn its December 31 balance sheet what amount should Runner report as cash?", options: ['$28,000', '$18,000', '$26,000', '$20,000'] },
  { id: 2, code: 'KCGFARCCE0002', text: 'Under US GAAP, which of the following is classified as an operating activity on the statement of cash flows?', options: ['Payment of cash dividends to shareholders', 'Collection of principal on a note receivable from a borrower', 'Receipt of interest income on a debt investment', 'Issuance of common stock for cash'] },
  { id: 3, code: 'KCGFARCCE0003', text: 'A company purchased equipment for $100,000 on January 1, Year 1. The equipment has an estimated useful life of 5 years and a salvage value of $10,000. Under the double-declining-balance method, what is the depreciation expense for Year 2?', options: ['$24,000', '$40,000', '$18,000', '$20,000'] },
  { id: 4, code: 'KCGFARCCE0004', text: 'On July 1, Year 1, a company issued $500,000 of 8% bonds at face value. The bonds pay interest semi-annually on June 30 and December 31. What is the amount of interest expense recognized for the year ended December 31, Year 1?', options: ['$40,000', '$20,000', '$10,000', '$30,000'] },
  { id: 5, code: 'KCGFARCCE0005', text: 'Which of the following characteristics is a primary fundamental qualitative characteristic of useful financial information under the FASB conceptual framework?', options: ['Relevance', 'Consistency', 'Comparability', 'Understandability'] },
];

const currentQuestionId = ref(1);
const selectedOption = ref<string | null>(null);
const submissions = ref<Record<number, string>>({});
const totalQuestions = ref(MOCK_QUESTIONS.length);
// Initialize with first question immediately so page is never blank
const currentQuestion = ref<any>({ ...MOCK_QUESTIONS[0], submitted: false, selectedAnswer: null });
const isSubmitting = ref(false);
const timerDisplay = ref('30:00');
const timerColor = ref('#1f2937');
let timerInterval: ReturnType<typeof setInterval> | null = null;
const calcVisible = ref(false);
const calcDisplay = ref('0');
const calcHistory = ref('');
const calcIsResult = ref(false);
const calcMemory = ref(0);
const activeOperator = ref('');
const summaryVisible = ref(false);
const summaryMessage = ref('');
const summaryIsTimeout = ref(false);
const submittedCount = ref(0);

const questionTracker = computed(() => {
  if (!currentQuestion.value) return '';
  return `Question ${currentQuestion.value.id} of ${totalQuestions.value} (#${currentQuestion.value.code})`;
});

function getLocalSubmissions(): Record<number, string> {
  if (process.client) {
    try { return JSON.parse(localStorage.getItem('exam_submissions') || '{}'); } catch { return {}; }
  }
  return {};
}
function saveLocalSubmission(qId: number, val: string) {
  if (!process.client) return;
  const s = getLocalSubmissions(); s[qId] = val;
  localStorage.setItem('exam_submissions', JSON.stringify(s));
}
function resetLocalSubmissions() {
  if (process.client) { localStorage.removeItem('exam_submissions'); localStorage.removeItem('exam_end_time'); }
}

onMounted(async () => {
  initTimer();
  await fetchTestStatus();
  await loadQuestion(currentQuestionId.value);
  window.addEventListener('keydown', handleCalculatorKeyboard);
});
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  window.removeEventListener('keydown', handleCalculatorKeyboard);
});

async function fetchTestStatus() {
  const subs = getLocalSubmissions();
  submissions.value = subs;
  for (let i = 1; i <= MOCK_QUESTIONS.length; i++) {
    if (!subs[i]) { currentQuestionId.value = i; break; }
    if (i === MOCK_QUESTIONS.length) currentQuestionId.value = MOCK_QUESTIONS.length;
  }
}

async function loadQuestion(id: number) {
  selectedOption.value = null;
  currentQuestionId.value = id;
  const q = MOCK_QUESTIONS.find(item => item.id === id);
  if (!q) return;
  const subs = getLocalSubmissions();
  currentQuestion.value = { ...q, submitted: !!subs[id], selectedAnswer: subs[id] || null };
}

function formatQuestionText(text: string) { return text.replace(/\n/g, '<br>'); }
function selectOption(option: string) { selectedOption.value = option; }

async function handleSubmit(id: number) {
  if (!selectedOption.value || isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    saveLocalSubmission(id, selectedOption.value);
    submissions.value = { ...submissions.value, [id]: selectedOption.value };
    if (id < totalQuestions.value) {
      await loadQuestion(id + 1);
    } else {
      await submitTestFinal(false);
    }
  } catch (err) { console.error(err); } finally { isSubmitting.value = false; }
}

async function submitTestFinal(isTimeOut = false) {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (process.client) localStorage.removeItem('exam_end_time');
  const subs = getLocalSubmissions();
  submittedCount.value = Object.keys(subs).length;
  summaryIsTimeout.value = isTimeOut;
  summaryMessage.value = isTimeOut ? 'Time has expired! Your exam has been automatically submitted.' : 'Your practice exam has been successfully completed and submitted.';
  summaryVisible.value = true;
}

async function handleResetTest() {
  resetLocalSubmissions();
  submissions.value = {};
  currentQuestionId.value = 1;
  selectedOption.value = null;
  summaryVisible.value = false;
  initTimer();
  await fetchTestStatus();
  await loadQuestion(currentQuestionId.value);
}

function handleExit() {
  if (confirm('Are you sure you want to exit the test? Your current progress is saved.')) {
    navigateTo('/myaccount');
  }
}

function initTimer() {
  const timeLimitMs = 30 * 60 * 1000;
  let endTime = Date.now() + timeLimitMs;
  if (process.client) {
    const stored = localStorage.getItem('exam_end_time');
    if (stored) { endTime = parseInt(stored, 10); } else { localStorage.setItem('exam_end_time', String(endTime)); }
  }
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const rem = endTime - Date.now();
    if (rem <= 0) {
      clearInterval(timerInterval!); timerInterval = null;
      timerDisplay.value = '00:00'; timerColor.value = '#dc2626';
      submitTestFinal(true); return;
    }
    const secs = Math.floor(rem / 1000);
    const m = Math.floor(secs / 60); const s = secs % 60;
    timerDisplay.value = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    timerColor.value = m < 2 ? '#dc2626' : '#1f2937';
  }, 1000);
}

function handleCalcNumber(num: string) {
  if (calcIsResult.value) { calcDisplay.value = '0'; calcIsResult.value = false; }
  if (num === '.') { const t = calcDisplay.value.split(/[+\-x×÷]/); if (t[t.length-1].includes('.')) return; }
  if (calcDisplay.value === '0' && num !== '.') { calcDisplay.value = num; }
  else if (calcDisplay.value.length < 24) { calcDisplay.value += num; }
}
function handleCalcOperator(op: string) {
  if (calcIsResult.value) calcIsResult.value = false;
  let d = op; if (op === '*') d = '×'; if (op === '/') d = '÷';
  activeOperator.value = op;
  const last = calcDisplay.value.slice(-1);
  if (['+','-','×','÷'].includes(last)) { calcDisplay.value = calcDisplay.value.slice(0,-1)+d; }
  else if (calcDisplay.value === '0' && ['+','×','÷'].includes(d)) { return; }
  else if (calcDisplay.value === '0' && d === '-') { calcDisplay.value = '-'; }
  else { calcDisplay.value += d; }
}
function evalExpr(expr: string): number | string {
  const c = expr.replace(/×/g,'*').replace(/÷/g,'/');
  if (!/^[0-9.+\-*/\s()]+$/.test(c)) return 'Error';
  try {
    const r = new Function(`return (${c})`)() as number;
    if (r === undefined || isNaN(r) || !isFinite(r)) return 'Error';
    return r.toString().includes('.') ? parseFloat(r.toFixed(8)) : r;
  } catch { return 'Error'; }
}
function handleCalcAction(action: string) {
  switch(action) {
    case 'clear': calcDisplay.value='0'; calcHistory.value=''; calcIsResult.value=false; activeOperator.value=''; break;
    case 'backspace':
      if (calcIsResult.value) { calcDisplay.value='0'; calcIsResult.value=false; }
      else { calcDisplay.value = calcDisplay.value.length > 1 ? calcDisplay.value.slice(0,-1) : '0'; }
      break;
    case 'negate': if (calcDisplay.value!=='0'&&calcDisplay.value!=='Error') calcDisplay.value=calcDisplay.value.startsWith('-')?calcDisplay.value.slice(1):'-'+calcDisplay.value; break;
    case 'percent': { const v=evalExpr(calcDisplay.value); calcDisplay.value=v!=='Error'?String((v as number)/100):'Error'; if(v!=='Error')calcIsResult.value=true; break; }
    case 'equals': { if(calcDisplay.value==='Error')break; const v=evalExpr(calcDisplay.value); if(v!=='Error'){calcHistory.value=calcDisplay.value;calcDisplay.value=String(v);calcIsResult.value=true;activeOperator.value='';} else calcDisplay.value='Error'; break; }
    case 'mc': calcMemory.value=0; break;
    case 'mr': if(calcIsResult.value){calcDisplay.value=String(calcMemory.value);calcIsResult.value=false;}else{calcDisplay.value=calcDisplay.value==='0'?String(calcMemory.value):calcDisplay.value+String(calcMemory.value);} break;
    case 'ms': { const v=evalExpr(calcDisplay.value); if(v!=='Error')calcMemory.value=v as number; break; }
    case 'm+': { const v=evalExpr(calcDisplay.value); if(v!=='Error')calcMemory.value+=v as number; break; }
    case 'm-': { const v=evalExpr(calcDisplay.value); if(v!=='Error')calcMemory.value-=v as number; break; }
  }
}
function handleCalculatorKeyboard(e: KeyboardEvent) {
  if (!calcVisible.value) return;
  const k = e.key;
  if (k >= '0' && k <= '9') { activeOperator.value=''; handleCalcNumber(k); }
  else if (k==='.') handleCalcNumber('.');
  else if (['+','-','*','/'].includes(k)) handleCalcOperator(k);
  else if (k==='Enter'||k==='=') { e.preventDefault(); activeOperator.value=''; handleCalcAction('equals'); }
  else if (k==='Escape') calcVisible.value=false;
  else if (k==='Backspace') handleCalcAction('backspace');
  else if (k.toLowerCase()==='c'||k==='Delete') { activeOperator.value=''; handleCalcAction('clear'); }
}
</script>

<style scoped>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.exam-root{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#1f2937;line-height:1.5;min-height:100vh;-webkit-font-smoothing:antialiased}
.test-container{display:flex;flex-direction:column;min-height:100vh;padding-bottom:40px}
.test-header{background:#fff;border-bottom:1px solid #e2e8f0;padding:12px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 2px rgba(0,0,0,.05);position:sticky;top:0;z-index:10}
.header-left{flex:1;display:flex;align-items:center}
.header-center{flex:2;text-align:center}
.header-right{flex:1;display:flex;align-items:center;justify-content:flex-end;gap:16px}
.timer-wrapper{display:flex;align-items:center;gap:10px}
.clock-icon{color:#4b5563;display:flex;align-items:center}
.clock-icon svg{width:28px;height:28px}
.timer-display-container{display:flex;flex-direction:column}
.timer-text{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700;line-height:1;letter-spacing:-.5px;transition:color .3s}
.timer-label{font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#9ca3af;font-weight:600;margin-top:2px}
.test-title{font-size:14px;font-weight:600;color:#4b5563;letter-spacing:-.2px}
.icon-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;padding:6px 12px;border-radius:8px;color:#7c3aed;transition:all .2s}
.icon-btn:hover{background:#f5f3ff}
.tool-icon{width:20px;height:20px;margin-bottom:4px}
.tool-text{font-size:11px;font-weight:500}
.exit-btn{display:inline-flex;align-items:center;gap:8px;background:#7c3aed;color:#fff;border:none;padding:10px 18px;font-size:13px;font-weight:600;border-radius:8px;cursor:pointer;transition:all .2s;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.exit-btn:hover{background:#6d28d9;transform:translateY(-1px)}
.exit-btn:active{background:#5b21b6;transform:translateY(0)}
.progress-bar-container{display:flex;justify-content:center;align-items:center;background:#f8fafc;padding:24px 0 12px}
.progress-nav-list{display:flex;align-items:center;gap:20px}
.nav-item{background:none;border:none;font-size:16px;font-weight:500;color:#9ca3af;cursor:pointer;padding:4px 12px;border-radius:4px;transition:all .2s;position:relative}
.nav-item.active{color:#7c3aed;font-weight:700;font-size:18px}
.nav-item.submitted{color:#1f2937;text-decoration:line-through;opacity:.6;cursor:not-allowed}
.nav-item.submitted::after{content:'✓';font-size:10px;position:absolute;top:-4px;right:0;color:#10b981;font-weight:800}
.nav-item:hover:not(.submitted){color:#7c3aed}
.main-content{max-width:900px;width:100%;margin:0 auto;padding:0 24px}
.question-meta-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.question-tracker{font-size:13px;color:#9ca3af;font-weight:500}
.question-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:32px;box-shadow:0 1px 2px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:24px;min-height:400px}
.loading-card{align-items:center;justify-content:center}
.loading-spinner{width:32px;height:32px;border:3px solid #e2e8f0;border-top-color:#7c3aed;border-radius:50%;animation:spin .8s linear infinite}
.question-body{font-size:15px;color:#1f2937;line-height:1.6;white-space:pre-line}
.question-text{font-weight:400}
.options-container{display:flex;flex-direction:column;gap:16px}
.option-item{display:flex;align-items:flex-start;padding:16px 20px;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all .2s;position:relative}
.option-item:hover{background:#f5f3ff;border-color:#c084fc}
.option-item.selected{background:#f5f3ff;border-color:#7c3aed;box-shadow:0 0 0 1px #7c3aed}
.option-item input[type='radio']{display:none}
.custom-radio{width:20px;height:20px;border:2px solid #e2e8f0;border-radius:50%;margin-right:16px;margin-top:2px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;background:#fff}
.option-item:hover .custom-radio{border-color:#7c3aed}
.option-item.selected .custom-radio{border-color:#7c3aed}
.option-item.selected .custom-radio::after{content:'';width:10px;height:10px;background:#7c3aed;border-radius:50%;display:block}
.option-text{font-size:14px;color:#1f2937;font-weight:500}
.card-footer{margin-top:16px;display:flex;justify-content:flex-start}
.submit-btn{background:#7c3aed;color:#fff;border:none;padding:12px 28px;font-size:14px;font-weight:600;border-radius:6px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:8px}
.submit-btn:hover:not(:disabled){background:#6d28d9}
.submit-btn:disabled{background:#d1d5db;color:#9ca3af;cursor:not-allowed}
.btn-spinner{display:inline-block;width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite}
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,.3);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100}
.calculator-modal{background:#fff;border-radius:12px;width:360px;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);border:1px solid #e2e8f0;overflow:hidden;animation:scaleUp .15s cubic-bezier(.34,1.56,.64,1)}
.calc-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #e2e8f0}
.calc-title{font-size:15px;font-weight:600;color:#1f2937}
.calc-close-btn{background:#7c3aed;color:#fff;border:none;padding:6px 16px;font-size:13px;font-weight:600;border-radius:6px;cursor:pointer;transition:all .2s}
.calc-close-btn:hover{background:#6d28d9}
.calc-body{padding:20px}
.calc-screen{background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;padding:16px;margin-bottom:20px;text-align:right;min-height:80px;display:flex;flex-direction:column;justify-content:flex-end;box-shadow:inset 0 1px 2px rgba(0,0,0,.05)}
.calc-history{font-family:'JetBrains Mono',monospace;font-size:11px;color:#9ca3af;min-height:16px;word-break:break-all}
.calc-display-val{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:500;color:#1e293b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.calc-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.calc-btn{font-size:16px;font-weight:600;height:52px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;color:#1e293b;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;user-select:none}
.calc-btn:hover{background:#f8fafc;border-color:#94a3b8}
.calc-btn:active{background:#f1f5f9;transform:scale(.97)}
.calc-btn.memory-btn{color:#7c3aed;font-size:14px;background:#f5f3ff;border-color:#ddd6fe}
.calc-btn.memory-btn:hover{background:#ede9fe}
.calc-btn.clear-btn,.calc-btn.backspace-btn,.calc-btn.toggle-sign-btn,.calc-btn.percent-btn{background:#f8fafc;color:#7c3aed;border-color:#cbd5e1}
.calc-btn.operator-btn{background:#f8fafc;color:#7c3aed;border-color:#cbd5e1;font-size:18px}
.calc-btn.operator-btn.active{background:#7c3aed!important;color:#fff!important;border-color:#7c3aed!important}
.calc-btn.equals-btn{background:#7c3aed;color:#fff;border-color:#7c3aed;font-size:20px}
.calc-btn.equals-btn:hover{background:#6d28d9}
.calc-btn.equals-btn:active{background:#5b21b6}
.summary-card{background:#fff;border-radius:12px;width:440px;padding:32px;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);border:1px solid #e2e8f0;text-align:center;animation:scaleUp .18s cubic-bezier(.34,1.56,.64,1)}
.summary-icon{margin-bottom:16px;display:inline-flex}
.summary-card h2{font-size:20px;font-weight:700;color:#1f2937;margin-bottom:8px}
.summary-card p{font-size:14px;color:#4b5563;margin-bottom:24px}
.summary-details{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;text-align:left;margin-bottom:24px}
.summary-row{display:flex;justify-content:space-between;padding:8px 0;font-size:13px;border-bottom:1px solid #e2e8f0}
.summary-row:last-child{border-bottom:none}
.summary-label{color:#4b5563;font-weight:500}
.summary-val{font-weight:600;color:#1f2937}
.restart-btn{background:#7c3aed;color:#fff;border:none;padding:12px 24px;font-size:14px;font-weight:600;border-radius:6px;cursor:pointer;transition:all .2s;width:100%}
.restart-btn:hover{background:#6d28d9}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes scaleUp{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
</style>

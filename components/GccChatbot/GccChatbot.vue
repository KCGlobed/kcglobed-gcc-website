<template>
  <div>
    <!-- FAB Button -->
    <button v-if="!isOpen" class="gcc-fab" :class="{ 'gcc-fab--pulse': hasPendingFields }"
      aria-label="Open Aria — Profile Assistant" @click="openWidget">
      <img :src="smallLogo" alt="Aria" class="gcc-fab__logo" />
      <span v-if="hasPendingFields" class="gcc-fab__badge">!</span>
    </button>

    <!-- Chat Panel -->
    <div v-show="isOpen" class="gcc-cw" role="dialog" aria-label="Aria — GCC Profile Assistant">
      <!-- Header -->
      <div class="gcc-ch">
        <div class="gcc-ch__ava">
          <img :src="smallLogo" alt="Aria" class="gcc-ch__ava-img" />
        </div>
        <div class="gcc-ch__info">
          <div class="gcc-ch__name">GCC School</div>
          <div class="gcc-ch__status"><span class="gcc-ch__dot"></span>Profile assistant · Online</div>
        </div>
        <button class="gcc-ch__close" aria-label="Close" @click="closeWidget">&#x2715;</button>
      </div>

      <!-- Progress Bar -->
      <div class="gcc-progress">
        <div class="gcc-progress__labels">
          <span>Profile completion</span>
          <span class="gcc-progress__pct">{{ completionPercentage || 0 }}%</span>
        </div>
        <div class="gcc-progress__track">
          <div class="gcc-progress__fill" :style="{ width: (completionPercentage || 0) + '%' }"></div>
        </div>
      </div>

      <!-- Messages -->
      <div class="gcc-cb" ref="cbRef">
        <template v-for="(msg, i) in messages" :key="i">
          <!-- Divider -->
          <div v-if="msg.type === 'divider'" class="gcc-sdiv">
            <div class="gcc-sdiv__line"></div>
            <div class="gcc-sdiv__label">{{ msg.text }}</div>
            <div class="gcc-sdiv__line"></div>
          </div>

          <!-- Bot message -->
          <div v-else-if="msg.type === 'bot'" class="gcc-mr">
            <div class="gcc-mava"><img :src="smallLogo" alt="Aria" class="gcc-mava__img" /></div>
            <div class="gcc-bub gcc-bub--bot" v-html="msg.text"></div>
          </div>

          <!-- Error message -->
          <div v-else-if="msg.type === 'error'" class="gcc-mr">
            <div class="gcc-mava gcc-mava--err"><img :src="smallLogo" alt="Aria" class="gcc-mava__img" /></div>
            <div class="gcc-bub gcc-bub--err">{{ msg.text }}</div>
          </div>

          <!-- User message -->
          <div v-else-if="msg.type === 'user'" class="gcc-mr gcc-mr--u">
            <div class="gcc-bub gcc-bub--usr">{{ msg.text }}</div>
          </div>

          <!-- Quick replies -->
          <div v-else-if="msg.type === 'choices'" class="gcc-qr-wrap">
            <button v-for="opt in msg.options" :key="opt.label" class="gcc-qr-btn"
              :class="{ 'gcc-qr-btn--sel': msg.chosen === opt.label, 'gcc-qr-btn--disabled': msg.chosen }"
              :disabled="!!msg.chosen" @click="handleChoice(i, opt)">{{ opt.label }}</button>
          </div>

          <!-- File upload -->
          <div v-else-if="msg.type === 'upload'" class="gcc-up-wrap">
            <button class="gcc-up-btn" :disabled="msg.uploaded || isUploading" @click="triggerFileInput(i)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
              </svg>
              {{ msg.uploaded ? '✓ Uploaded' : msg.btnLabel }}
            </button>
            <input :ref="el => fileInputRefs[i] = el as HTMLInputElement" type="file" :accept="msg.accept"
              style="display:none" @change="e => handleFileUpload(i, msg, e)" />
          </div>

          <!-- Done card -->
          <!-- Done card -->
          <div v-else-if="msg.type === 'done'" class="gcc-done-card">
            <div class="gcc-done-card__icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div class="gcc-done-card__title">Profile 100% complete! 🎉</div>
            <div class="gcc-done-card__sub">Your GCC application is fully filled. You can now review &amp; submit or manage your NFET slot.</div>
            <div class="gcc-done-card__actions">
              <button 
                v-if="(formData.slot_update_count || 0) < 2"
                class="gcc-done-card__cta gcc-done-card__cta--slot" 
                :disabled="isBookingSlot" 
                @click="startSlotBooking"
              >
                📅 {{ formData.slot_date ? 'Update NFET Slot' : 'Book NFET Slot' }}
              </button>
              <div v-else class="gcc-done-card__limit">Slot update limit reached.</div>
              
              <button class="gcc-done-card__cta gcc-done-card__cta--review" @click="scrollToForm">
                Review &amp; Submit →
              </button>
            </div>
          </div>

          <!-- Slot confirmed card -->
          <div v-else-if="msg.type === 'slot_confirmed'" class="gcc-slot-card">
            <div class="gcc-slot-card__icon">
              <svg viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7z" />
              </svg>
            </div>
            <div class="gcc-slot-card__title">✅ Slot Confirmed!</div>
            <div class="gcc-slot-card__row"><strong>Date:</strong> {{ formatDate(msg.date) }}</div>
            <div class="gcc-slot-card__row"><strong>Time:</strong> {{ msg.time }}</div>
            <button class="gcc-slot-card__cta" @click="scrollToForm">Go to Dashboard →</button>
          </div>
        </template>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="gcc-mr">
          <div class="gcc-mava"><img :src="smallLogo" alt="Aria" class="gcc-mava__img" /></div>
          <div class="gcc-typing-bub">
            <div class="gcc-td"></div>
            <div class="gcc-td"></div>
            <div class="gcc-td"></div>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="gcc-ci">
        <input ref="txtRef" class="gcc-ci__txt" v-model="inputValue" :placeholder="inputPlaceholder"
          :disabled="!inputEnabled" @keydown.enter="handleTextSubmit" />
        <button class="gcc-ci__send" :disabled="!inputEnabled" @click="handleTextSubmit" aria-label="Send">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue';
import { staticSlots, allowedDates } from '~/utils/constants';
import smallLogo from '@/assets/small_logo.svg';

const props = defineProps<{
  formData: Record<string, any>;
  userId: string | number;
  authToken?: string;
  completionPercentage?: number;
}>();

const emit = defineEmits<{
  (e: 'patch', key: string, value: any): void;
  (e: 'refresh'): void;
  (e: 'bot-submit', callback: (success: boolean) => void): void;
}>();

// ── UI State ───────────────────────────────────────────────────────────────
const isOpen = ref(false);
const cbRef = ref<HTMLElement | null>(null);
const txtRef = ref<HTMLInputElement | null>(null);
const fileInputRefs = ref<Record<number, HTMLInputElement | null>>({});

const messages = ref<any[]>([]);
const isTyping = ref(false);
const inputEnabled = ref(false);
const inputValue = ref('');
const inputPlaceholder = ref('Type your reply...');
const progressValue = ref(0);
const isUploading = ref(false);
const isBookingSlot = ref(false);
const slotBooked = ref(false);


// ── Step Queue ─────────────────────────────────────────────────────────────
const Q: (() => void)[] = [];
let running = false;
let queueLocked = false;

// Current awaited field
let awaitField: { key: string; apiKey: string; section: string; validate: string } | null = null;
let retryCount = 0;

// ── Computed ───────────────────────────────────────────────────────────────
const hasPendingFields = computed(() => {
  const fd = props.formData;
  return !fd.last_name || !fd.dob || !fd.gender || !fd.mobile ||
    !fd.class10_year || !fd.class12_year || !fd.ug_cgpa;
});

// ── Helpers ────────────────────────────────────────────────────────────────
function scroll() {
  nextTick(() => {
    if (cbRef.value) cbRef.value.scrollTop = cbRef.value.scrollHeight;
  });
}

function addMsg(type: string, text: string, extra: Record<string, any> = {}) {
  messages.value.push({ type, text, ...extra });
  scroll();
}

function queueRun() {
  if (Q.length === 0) { running = false; return; }
  if (queueLocked) { running = false; return; }
  running = true;
  const fn = Q.shift()!;
  fn();
}

function push(...fns: (() => void)[]) {
  fns.forEach(f => Q.push(f));
  if (!running && !queueLocked) queueRun();
}

function next() { setTimeout(queueRun, 60); }
function PAUSE() { queueLocked = true; running = false; }
function RESUME() { queueLocked = false; queueRun(); }

function enableInput(ph?: string) {
  inputEnabled.value = true;
  inputPlaceholder.value = ph || 'Type your reply...';
  inputValue.value = '';
  nextTick(() => txtRef.value?.focus());
}

function disableInput() {
  inputEnabled.value = false;
  inputPlaceholder.value = 'Type your reply...';
}

// ── Typing simulation ──────────────────────────────────────────────────────
function withTyping(delay: number, fn: () => void) {
  isTyping.value = true;
  scroll();
  setTimeout(() => {
    isTyping.value = false;
    fn();
  }, delay);
}

// ── Step Primitives ────────────────────────────────────────────────────────
function SAY(textOrFn: string | (() => string), delay = 700) {
  return () => withTyping(delay, () => {
    const text = typeof textOrFn === 'function' ? textOrFn() : textOrFn;
    addMsg('bot', text);
    next();
  });
}

function DIVIDER(label: string) {
  return () => { addMsg('divider', label); next(); };
}

function PROGRESS(v: number) {
  return () => { progressValue.value = v; next(); };
}

function SKIP(label: string, value: string) {
  return () => withTyping(400, () => {
    addMsg('bot', `✓ Already have your <strong>${label}</strong>: <em>${value}</em>`);
    next();
  });
}

/**
 * ASK — typed text input.
 * apiKey: the FormData field name Django expects
 * section: for logging
 */
function ASK(question: string | (() => string), key: string, apiKey: string, section: string, validate = 'any', placeholder?: string, delay = 700) {
  return () => withTyping(delay, () => {
    const text = typeof question === 'function' ? question() : question;
    addMsg('bot', text);
    awaitField = { key, apiKey, section, validate };
    retryCount = 0;
    enableInput(placeholder);
    PAUSE();
  });
}

/**
 * CHOOSE — quick-reply buttons.
 */
function CHOOSE(question: string | (() => string), options: { label: string; value?: any }[], onChoose: (val: any, label: string) => void, delay = 700) {
  return () => withTyping(delay, () => {
    const text = typeof question === 'function' ? question() : question;
    addMsg('bot', text);
    addMsg('choices', '', { options, chosen: null });
    PAUSE();
    // onChoose is called from handleChoice
    choiceCallbacks.push(onChoose);
  });
}

// Store callbacks for CHOOSE steps
const choiceCallbacks: ((val: any, label: string) => void)[] = [];

function handleChoice(msgIdx: number, opt: { label: string; value?: any }) {
  const msg = messages.value[msgIdx];
  if (!msg || msg.chosen) return;
  msg.chosen = opt.label;
  addMsg('user', opt.label);
  const cb = choiceCallbacks.shift();
  if (cb) cb(opt.value !== undefined ? opt.value : opt.label, opt.label);
}

/**
 * UPLOAD — file picker step.
 */
function UPLOAD(question: string, key: string, docType: string, btnLabel: string, accept: string, delay = 700) {
  return () => withTyping(delay, () => {
    addMsg('bot', question);
    addMsg('upload', '', { key, docType, btnLabel, accept, uploaded: false });
    PAUSE();
  });
}

function DECLARATION_STEP(): (() => void)[] {
  return [
    DIVIDER('Final Step — Declaration'),
    () => withTyping(700, () => {
      addMsg('bot', 'Almost there! Please agree to the following declaration to submit your profile:<br/><br/><i>"I declare that all the information and documents submitted by me are true to the best of my knowledge. I agree that in case any information or document found fake/forged/false submitted by me, then my candidature may cancel at any stage of course."</i>');
      addMsg('choices', '', {
        options: [{ label: 'I agree & Submit Profile', value: 'yes' }],
        chosen: null,
      });
      choiceCallbacks.push(async (val: string) => {
        emit('patch', 'declaration', true);
        
        push(
          SAY('Submitting your profile...', 500),
          () => {
                emit('bot-submit', (success: boolean) => {
                  if (success) {
                    emit('refresh');
                    push(
                      SAY('All done! Your profile is 100% complete. 🎉', 600),
                      () => { logEvent('chatbot_done'); next(); },
                      DONE_STEP()
                    );
                  } else {
                    push(
                      SAY('Submission failed. Please check your form details and try again.', 500),
                      ...DECLARATION_STEP()
                    );
                  }
                  next();
                });
          }
        );
        RESUME();
      });
      PAUSE();
    })
  ];
}

function DONE_STEP() {
  return () => {
    progressValue.value = 100;
    addMsg('done', '');
    
    // If they already have a slot, show it
    if (isFilled(props.formData.slot_date) && isFilled(props.formData.slot_time)) {
      addMsg('slot_confirmed', '', { date: props.formData.slot_date, time: props.formData.slot_time });
    }

    disableInput();
    // Reset the queue runner so startSlotBooking() can push and process steps
    next();
  };
}


// ── Slot booking helpers ──────────────────────────────────────────────────────
function getUpcomingDates(count = 7): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bufferMs = 48 * 60 * 60 * 1000;
  return [...new Set(allowedDates)]
    .filter(d => new Date(d).getTime() - today.getTime() >= bufferMs)
    .sort()
    .slice(0, count);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
}

async function chatbotBookSlot(date: string, time: string) {
  isBookingSlot.value = true;
  const authHeader = props.authToken ? `Bearer ${props.authToken}` : '';
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || '';
  try {
    await logEvent('slot_booking_start', undefined, undefined, { date, time });
    // Same API and payload as myaccount.vue bookSlot()
    const response = await fetch(`${apiBase}/api/students/student-slot-upload/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({ slot_date: date, slot_time: time }),
    });
    if (response.ok) {
      slotBooked.value = true;
      await logEvent('slot_booking_success', undefined, undefined, { date, time });
      withTyping(500, () => {
        addMsg('bot', `🎉 Slot booked successfully!`);
        addMsg('slot_confirmed', '', { date, time });
        emit('refresh');
      });
    } else {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || err.detail || 'Booking failed');
    }
  } catch (err: any) {
    await logEvent('slot_booking_error', undefined, undefined, { error: err?.message, date, time });
    withTyping(400, () => {
      addMsg('error', `Slot booking failed: ${err?.message || 'Please try again.'}`);
    });
  } finally {
    isBookingSlot.value = false;
  }
}

// ── File upload trigger ────────────────────────────────────────────────────
function triggerFileInput(msgIdx: number) {
  fileInputRefs.value[msgIdx]?.click();
}

async function handleFileUpload(msgIdx: number, msg: any, event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    addMsg('error', 'That file is over 2 MB. Please upload a smaller file.');
    input.value = '';
    return;
  }

  isUploading.value = true;
  addMsg('user', `📎 ${file.name}`);

  const authHeader = props.authToken ? `Bearer ${props.authToken}` : '';
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || '';
  const apiUrl = `${apiBase}/api/students/create-update-student-profile-draft/`;

  try {
    await logEvent('doc_upload_start', undefined, msg.docType, { filename: file.name, size: file.size });

    // Map docType to the correct API key expected by the draft endpoint (mirrors myaccount.vue)
    const apiKey = msg.docType === 'dob_proof' ? 'dob_certificate' : msg.docType;

    const fd = new FormData();
    fd.append('user', String(props.userId));
    fd.append(apiKey, file, file.name);

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: authHeader ? { Authorization: authHeader } : {},
      body: fd,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    messages.value[msgIdx].uploaded = true;
    emit('patch', msg.key, file);

    await logEvent('doc_upload_success', undefined, msg.docType, { filename: file.name });

    withTyping(400, () => {
      addMsg('bot', `✓ <strong>${msg.docType.replace(/_/g, ' ')}</strong> uploaded successfully!`);
      RESUME();
    });
  } catch (err: any) {
    await logEvent('doc_upload_error', undefined, msg.docType, { error: err?.message });
    addMsg('error', 'Upload failed. Please try again.');
    input.value = '';
  } finally {
    isUploading.value = false;
  }
}

// ── Text submit ────────────────────────────────────────────────────────────
const VALIDATORS: Record<string, (v: string) => boolean> = {
  any: v => v.trim().length > 0,
  name: v => v.trim().length >= 2,
  date: v => /^(\d{2}[\-\/]\d{2}[\-\/]\d{4})$|^(\d{4}[\-\/]\d{2}[\-\/]\d{2})$/.test(v.trim()),
  phone: v => /^[6-9]\d{9}$/.test(v.replace(/\D/g, '')),
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  pin: v => /^\d{6}$/.test(v.trim()),
  year: v => /^\d{4}$/.test(v.trim()) && +v >= 1990 && +v <= 2026,
  score: v => { const n = parseFloat(v); return !isNaN(n) && n >= 0 && n <= 100; },
  text: v => v.trim().length >= 2,
};

const VERR: Record<string, string> = {
  name: 'Please enter at least 2 characters.',
  date: 'Please use DD-MM-YYYY format, e.g. 15-03-2001.',
  phone: 'Please enter a valid 10-digit number starting with 6–9.',
  email: 'That email doesn\'t look right — please check.',
  pin: 'Please enter a valid 6-digit PIN code.',
  year: 'Please enter a valid year (1990–2026).',
  score: 'Please enter a valid score, e.g. 85 or 8.5.',
  text: 'Please enter at least 2 characters.',
};

async function handleTextSubmit() {
  if (!awaitField || !inputEnabled.value) return;
  const val = inputValue.value.trim();
  if (!val) return;

  const { key, apiKey, section, validate } = awaitField;
  let ok = (VALIDATORS[validate] || VALIDATORS.any)(val);
  let customErr = '';

  if (ok && key === 'class12_year') {
    const year10 = parseInt(props.formData.class10_year);
    const year12 = parseInt(val);
    if (year10 && year12 - year10 < 2) {
      ok = false;
      customErr = 'Minimum 2-year gap required between 10th and 12th.';
    } else if (year10 && year12 <= year10) {
      ok = false;
      customErr = 'Class 12 must be after Class 10.';
    }
  }

  if (ok && (key === 'class10_score' || key === 'class12_score' || key === 'ug_cgpa')) {
     const scoreTypeKey = key === 'ug_cgpa' ? 'ug_type' : key.replace('_score', '_type');
     const typeVal = props.formData[scoreTypeKey as keyof typeof props.formData];
     const n = parseFloat(val);
     if (typeVal === 'CGPA' && n > 10) {
        ok = false;
        customErr = 'CGPA cannot exceed 10.00.';
     } else if (typeVal === 'Percentage' && n > 100) {
        ok = false;
        customErr = 'Percentage cannot exceed 100.';
     }
  }

  addMsg('user', val);
  inputValue.value = '';
  disableInput();

  if (!ok) {
    retryCount++;
    if (retryCount >= 2) {
      retryCount = 0;
      awaitField = null;
      await logEvent('field_skip', section, key, { reason: 'max_retries' });
      withTyping(600, () => {
        addMsg('bot', 'No problem — you can update this from your profile later. Moving on!');
        RESUME();
      });
    } else {
      withTyping(500, () => {
        addMsg('error', customErr || VERR[validate] || 'Could you check that and try again?');
        enableInput(inputPlaceholder.value);
      });
    }
    return;
  }

  retryCount = 0;
  const fieldAF = awaitField;
  awaitField = null;

  // Format date to YYYY-MM-DD for backend and native date input compatibility
  let transformedVal = val;
  if (validate === 'date') {
    const parts = val.split(/[\/\-]/);
    if (parts.length === 3) {
      if (parts[2].length === 4) { // DD-MM-YYYY or DD/MM/YYYY
        transformedVal = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      } else if (parts[0].length === 4) { // YYYY-MM-DD
        transformedVal = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      }
    }
  }

  // Emit patch to parent
  emit('patch', key, transformedVal);

  // Call API field-by-field
  try {
    await saveField(section, key, apiKey, transformedVal);
  } catch (_) { /* already logged in saveField */ }

  withTyping(400, () => { RESUME(); });
}

// ── Draft field-key map (matches buildPayloadForSection in myaccount.vue exactly) ──
const DRAFT_FIELD_MAP: Record<string, { apiKey: string; transform?: (v: any) => any }> = {
  // Personal
  first_name:       { apiKey: 'first_name' },
  last_name:        { apiKey: 'last_name' },
  email:            { apiKey: 'email' },
  mobile:           { apiKey: 'phone' },
  state:            { apiKey: 'state' },
  city:             { apiKey: 'city' },
  pin_code:         { apiKey: 'pincode' },
  complete_address: { apiKey: 'address' },
  dob:              { apiKey: 'date_of_birth' },
  nationality:      { apiKey: 'nationality' },
  gender:           { apiKey: 'gender', transform: (v: string) => ({ Male: 0, Female: 1, Other: 2 }[v] ?? '') },
  // Guardian
  father_name:      { apiKey: 'contact_name' },
  father_mobile:    { apiKey: 'contact_phone' },
  guardian_name:    { apiKey: 'guardian_name' },
  guardian_phone:   { apiKey: 'guardian_phone' },
  guardian_email:   { apiKey: 'guardian_email' },
  guardian_dropdown:{ apiKey: 'guardian_dropdown', transform: (v: string) => ({ Mother: 1, Father: 2, Other: 3 }[v] ?? '') },
  guardian_other_reason:{ apiKey: 'guardian_other_reason' },
  // Academic
  class10_year:     { apiKey: 'tenth_passing_year' },
  class10_score:    { apiKey: 'tenth_passing_percentage' },
  class10_type:     { apiKey: 'tenth_score_type' },
  class10_medium:   { apiKey: 'tenth_medium', transform: (v: string) => ({ English: 1, Hindi: 2, Other: 3 }[v] ?? '') },
  class12_year:     { apiKey: 'twelveth_passing_year' },
  class12_score:    { apiKey: 'twelveth_passing_percentage' },
  class12_type:     { apiKey: 'twelveth_score_type' },
  class12_medium:   { apiKey: 'twelveth_medium', transform: (v: string) => ({ English: 1, Hindi: 2, Other: 3 }[v] ?? '') },
  ug_cgpa:          { apiKey: 'pg_percentage' },
  ug_institution:   { apiKey: 'institution' },
  ug_type:          { apiKey: 'ug_score_type' },
  ug_status:        { apiKey: 'pg_status', transform: (v: string) => ({ '1': 1, '2': 2 }[v] ?? '') },
  ug_medium:        { apiKey: 'medium_instruction', transform: (v: string) => ({ English: 1, Hindi: 2, Other: 3 }[v] ?? '') },
  pg_exists:        { apiKey: 'higher_education_status', transform: (v: string) => ({ Yes: 1, No: 2 }[v] ?? '') },
  pg_type:          { apiKey: 'higher_qualification' },
  pg_other:         { apiKey: 'pg_other' },
  pg_institution:   { apiKey: 'higher_qualification_institution' },
  // Work
  employment_status:{ apiKey: 'employement_status', transform: (v: string) => ({ Fresher: 1, Experienced: 2 }[v] ?? '') },
};

async function saveField(section: string, key: string, _legacyApiKey: string, value: any, _legacyApiValue?: any) {
  const mapping = DRAFT_FIELD_MAP[key];
  if (!mapping) {
    console.warn(`[CHATBOT][field_save] no mapping for field=${key}, skipping`);
    return;
  }

  const authHeader = props.authToken ? `Bearer ${props.authToken}` : '';
  const cfg = useRuntimeConfig();
  const apiBase = cfg.public.apiBase || '';
  const resolvedValue = mapping.transform ? mapping.transform(value) : value;

  const fd = new FormData();
  fd.append('user', String(props.userId));
  fd.append(mapping.apiKey, String(resolvedValue ?? ''));

  console.log(`[CHATBOT][field_save] section=${section} field=${key} api_key=${mapping.apiKey} value="${resolvedValue}" student=${props.userId}`);

  try {
    const res = await fetch(`${apiBase}/api/students/create-update-student-profile-draft/`, {
      method: 'POST',
      headers: authHeader ? { Authorization: authHeader } : {},
      body: fd,
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error(`[CHATBOT][field_save] FAILED field=${key} status=${res.status}: ${errText.substring(0, 200)}`);
    } else {
      console.log(`[CHATBOT][field_save] SUCCESS field=${key}`);
    }
  } catch (err: any) {
    console.error(`[CHATBOT][field_save] ERROR field=${key}:`, err?.message);
  }
}


async function logEvent(event: string, section?: string, field?: string, extra?: Record<string, any>) {
  try {
    await $fetch('/api/chatbot-log-event', {
      method: 'POST',
      body: {
        student_id: String(props.userId),
        event,
        section,
        field,
        timestamp: new Date().toISOString(),
        extra: extra || {},
      },
    });
  } catch (_) { /* non-blocking */ }
}

// ── Open / Close ───────────────────────────────────────────────────────────
function openWidget() {
  isOpen.value = true;
}

function closeWidget() {
  isOpen.value = false;
}

function scrollToForm() {
  closeWidget();
  document.querySelector('[data-section="declaration"]')?.scrollIntoView({ behavior: 'smooth' });
}

// ── Start slot booking flow inside chatbot ───────────────────────────────────
function startSlotBooking() {
  const dates = getUpcomingDates(7);
  if (dates.length === 0) {
    push(SAY('No upcoming dates are available right now. Please book from your dashboard.', 500));
    return;
  }
  push(
    SAY('Great! Let\'s book your NFET slot. 📅', 500),
    // Step 1: pick date
    () => withTyping(700, () => {
      addMsg('bot', 'Choose a date:');
      addMsg('choices', '', {
        options: dates.map(d => ({ label: formatDate(d), value: d })),
        chosen: null,
      });
      choiceCallbacks.push((dateVal: string) => {
        // Step 2: pick time slot
        push(
          () => withTyping(700, () => {
            addMsg('bot', `Choose a time slot for <strong>${formatDate(dateVal)}</strong>:`);
            addMsg('choices', '', {
              options: staticSlots.map(t => ({ label: t, value: t })),
              chosen: null,
            });
            choiceCallbacks.push((timeVal: string) => {
              // Step 3: confirm
              push(
                () => withTyping(600, () => {
                  addMsg('bot',
                    `Confirm your slot:<br><strong>${formatDate(dateVal)}</strong> &nbsp;|&nbsp; <strong>${timeVal}</strong>`);
                  addMsg('choices', '', {
                    options: [
                      { label: '✅ Yes, Book it!' },
                      { label: '🔄 Choose different slot' },
                    ],
                    chosen: null,
                  });
                  choiceCallbacks.push((confirm: string) => {
                    if (confirm === '✅ Yes, Book it!') {
                      push(() => { chatbotBookSlot(dateVal, timeVal); next(); });
                    } else {
                      // restart slot booking
                      push(() => { startSlotBooking(); next(); });
                    }
                    RESUME();
                  });
                  PAUSE();
                })
              );
              RESUME();
            });
            PAUSE();
          })
        );
        RESUME();
      });
      PAUSE();
    })
  );
}

// ── Pre-fill check helper ──────────────────────────────────────────────────
function isFilled(val: any): boolean {
  return val !== null && val !== undefined && String(val).trim() !== '';
}

// ── Flow builder ───────────────────────────────────────────────────────────
function buildFlow() {
  const fd = props.formData;
  const firstName = fd.first_name || 'there';

  // ── GREETING ──
  push(
    SAY(`Hi ${firstName}! 👋 I'm <strong>Aria</strong>, your GCC profile assistant.`, 600),
    SAY('I\'ll help you fill your application quickly. Let\'s go section by section!', 800),
    () => {
      addMsg('bot', 'Ready to complete your profile?');
      addMsg('choices', '', {
        options: [{ label: "Yes, let's go! 🚀" }, { label: 'Later' }],
        chosen: null,
      });
      choiceCallbacks.push((val: string) => {
        if (val === 'Later') {
          push(SAY('No problem! Just click me anytime to continue. Your progress is saved. 💙', 600));
          RESUME();
        } else {
          push(...section1());
          RESUME();
        }
      });
      PAUSE();
    }
  );
}

// ── Section 1: Personal ────────────────────────────────────────────────────
function section1(): (() => void)[] {
  const fd = props.formData;
  const steps: (() => void)[] = [
    DIVIDER('Section 1 of 4 — Personal information'),
  ];

  // last_name
  if (isFilled(fd.last_name)) {
    steps.push(SKIP('last name', fd.last_name));
  } else {
    steps.push(ASK(
      () => `Great! What is your last name, ${fd.first_name || ''}?`,
      'last_name', 'last_name', 'personal', 'name', 'e.g. Sharma'
    ));
  }

  // email
  if (isFilled(fd.email)) {
    steps.push(SKIP('email', fd.email));
  } else {
    steps.push(ASK('Your email address?', 'email', 'email', 'personal', 'email', 'e.g. name@email.com'));
  }

  // mobile
  if (isFilled(fd.mobile)) {
    steps.push(SKIP('mobile number', fd.mobile));
  } else {
    steps.push(ASK('Your mobile number?', 'mobile', 'phone', 'personal', 'phone', 'e.g. 9876543210'));
  }

  // father_name (Emergency Contact Name)
  if (isFilled(fd.father_name)) {
    steps.push(SKIP('emergency contact name', fd.father_name));
  } else {
    steps.push(ASK('Emergency contact name?', 'father_name', 'contact_name', 'personal', 'name', 'e.g. Anil Sharma'));
  }

  // father_mobile (Emergency Contact Number)
  if (isFilled(fd.father_mobile)) {
    steps.push(SKIP('emergency contact number', fd.father_mobile));
  } else {
    steps.push(ASK('Emergency contact number?', 'father_mobile', 'contact_phone', 'personal', 'phone', 'e.g. 9876543210'));
  }

  steps.push(
    PROGRESS(25),
    SAY('Personal details saved! You\'re 25% done. 🎉', 500),
    () => { logEvent('section_complete', 'personal'); next(); },
    ...section2()
  );
  return steps;
}

// ── Section 2: Guardian ────────────────────────────────────────────────────
function section2(): (() => void)[] {
  const fd = props.formData;
  const steps: (() => void)[] = [
    DIVIDER('Section 2 of 4 — Guardian / Contact'),
  ];

  // guardian_name
  if (isFilled(fd.guardian_name)) {
    steps.push(SKIP('guardian name', fd.guardian_name));
  } else {
    steps.push(ASK('Parent/Guardian\'s full name?', 'guardian_name', 'guardian_name', 'guardian', 'name', 'e.g. Sunita Sharma'));
  }

  // guardian_dropdown
  if (isFilled(fd.guardian_dropdown)) {
    steps.push(SKIP('relationship', fd.guardian_dropdown));
    if (fd.guardian_dropdown === 'Other') {
      if (isFilled(fd.guardian_other_reason)) {
        steps.push(SKIP('specify relationship', fd.guardian_other_reason));
      } else {
        steps.push(ASK('Please specify relationship', 'guardian_other_reason', 'guardian_other_reason', 'guardian', 'text', 'e.g. Uncle'));
      }
    }
    steps.push(...section1_part2());
  } else {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'What is your relationship with them?');
        addMsg('choices', '', {
          options: [{ label: 'Mother', value: 'Mother' }, { label: 'Father', value: 'Father' }, { label: 'Other', value: 'Other' }],
          chosen: null,
        });
        const relMap: Record<string, number> = { Mother: 1, Father: 2, Other: 3 };
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'guardian_dropdown', val);
          await saveField('guardian', 'guardian_dropdown', 'guardian_dropdown', val, relMap[val] || '');
          if (val === 'Other') {
            push(
              ASK('Please specify relationship', 'guardian_other_reason', 'guardian_other_reason', 'guardian', 'text', 'e.g. Uncle'),
              ...section1_part2()
            );
          } else {
            push(...section1_part2());
          }
          RESUME();
        });
        PAUSE();
      })
    );
  }

  return steps;
}

function section1_part2(): (() => void)[] {
  const fd = props.formData;
  const steps: (() => void)[] = [];

  // guardian_phone
  if (isFilled(fd.guardian_phone)) {
    steps.push(SKIP('guardian\'s phone', fd.guardian_phone));
  } else {
    steps.push(ASK('Parent/Guardian\'s phone number?', 'guardian_phone', 'guardian_phone', 'guardian', 'phone', 'e.g. 9876543210'));
  }

  // guardian_email
  if (isFilled(fd.guardian_email)) {
    steps.push(SKIP('guardian\'s email', fd.guardian_email));
  } else {
    steps.push(ASK('Parent/Guardian\'s email address?', 'guardian_email', 'guardian_email', 'guardian', 'email', 'e.g. parent@email.com'));
  }

  // dob
  if (isFilled(fd.dob)) {
    steps.push(SKIP('date of birth', fd.dob));
  } else {
    steps.push(ASK('What is your date of birth? (DD-MM-YYYY)', 'dob', 'date_of_birth', 'personal', 'date', 'e.g. 15-03-2001'));
  }

  // gender
  if (isFilled(fd.gender)) {
    steps.push(SKIP('gender', fd.gender));
  } else {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'What is your gender?');
        addMsg('choices', '', {
          options: [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }],
          chosen: null,
        });
        const genderMap: Record<string, number> = { Male: 0, Female: 1, Other: 2 };
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'gender', val);
          await saveField('personal', 'gender', 'gender', val, genderMap[val] !== undefined ? genderMap[val] : '');
          RESUME();
        });
        PAUSE();
      })
    );
  }

  // state
  if (isFilled(fd.state)) {
    steps.push(SKIP('state', fd.state));
  } else {
    steps.push(ASK('Which state do you live in?', 'state', 'state', 'personal', 'text', 'e.g. Uttar Pradesh'));
  }

  // city
  if (isFilled(fd.city)) {
    steps.push(SKIP('city', fd.city));
  } else {
    steps.push(ASK('Which city?', 'city', 'city', 'personal', 'text', 'e.g. Lucknow'));
  }

  // pin_code
  if (isFilled(fd.pin_code)) {
    steps.push(SKIP('PIN code', fd.pin_code));
  } else {
    steps.push(ASK('Your area PIN code?', 'pin_code', 'pincode', 'personal', 'pin', 'e.g. 226001'));
  }

  // address
  if (isFilled(fd.complete_address)) {
    steps.push(SKIP('address', fd.complete_address));
  } else {
    steps.push(ASK('Your complete address?', 'complete_address', 'address', 'personal', 'text', 'House no., area, city, state'));
  }

  steps.push(
    PROGRESS(40),
    SAY('Personal details saved! You\'re 40% done. 🎉', 500),
    () => { logEvent('section_complete', 'personal'); next(); },
    ...section3()
  );
  return steps;
}

// ── Section 2 is now merged into Section 1 ──
// section2() logic has been moved up to section1_part2() to match exact flow.
// ── Section 3: Academic ────────────────────────────────────────────────────
function section3(): (() => void)[] {
  const fd = props.formData;
  const steps: (() => void)[] = [
    DIVIDER('Section 3 of 4 — Academic information'),
    SAY('Now let\'s fill your academic details — takes about 2 minutes.', 600),
  ];

  const mediumMap: Record<string, number> = { English: 1, Hindi: 2, Other: 3 };

  // Class 10
  if (isFilled(fd.class10_year)) {
    steps.push(SKIP('Class 10 passing year', fd.class10_year));
  } else {
    steps.push(ASK('Which year did you pass Class 10?', 'class10_year', 'tenth_passing_year', 'academic', 'year', 'e.g. 2017'));
  }

  if (!isFilled(fd.class10_type)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Score type for Class 10?');
        addMsg('choices', '', {
          options: [{ label: 'Percentage' }, { label: 'CGPA' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'class10_type', val);
          await saveField('academic', 'class10_type', 'tenth_score_type', val);
          RESUME();
        });
        PAUSE();
      })
    );
  }

  if (isFilled(fd.class10_score)) {
    steps.push(SKIP('Class 10 score', fd.class10_score));
  } else {
    steps.push(ASK('Your Class 10 score?', 'class10_score', 'tenth_passing_percentage', 'academic', 'score', 'e.g. 85 or 8.5'));
  }

  if (!isFilled(fd.class10_medium)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Medium of instruction in Class 10?');
        addMsg('choices', '', {
          options: [{ label: 'English' }, { label: 'Hindi' }, { label: 'Other' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'class10_medium', val);
          await saveField('academic', 'class10_medium', 'tenth_medium', val, mediumMap[val] || '');
          RESUME();
        });
        PAUSE();
      })
    );
  }

  // Class 12
  if (isFilled(fd.class12_year)) {
    steps.push(SKIP('Class 12 passing year', fd.class12_year));
  } else {
    steps.push(ASK('Which year did you pass Class 12?', 'class12_year', 'twelveth_passing_year', 'academic', 'year', 'e.g. 2019'));
  }

  if (!isFilled(fd.class12_type)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Score type for Class 12?');
        addMsg('choices', '', {
          options: [{ label: 'Percentage' }, { label: 'CGPA' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'class12_type', val);
          await saveField('academic', 'class12_type', 'twelveth_score_type', val);
          RESUME();
        });
        PAUSE();
      })
    );
  }

  if (isFilled(fd.class12_score)) {
    steps.push(SKIP('Class 12 score', fd.class12_score));
  } else {
    steps.push(ASK('Your Class 12 score?', 'class12_score', 'twelveth_passing_percentage', 'academic', 'score', 'e.g. 78 or 7.8'));
  }

  if (!isFilled(fd.class12_medium)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Medium of instruction in Class 12?');
        addMsg('choices', '', {
          options: [{ label: 'English' }, { label: 'Hindi' }, { label: 'Other' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'class12_medium', val);
          await saveField('academic', 'class12_medium', 'twelveth_medium', val, mediumMap[val] || '');
          RESUME();
        });
        PAUSE();
      })
    );
  }

  // UG
  if (!isFilled(fd.ug_status)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Your undergraduate degree (B.Com/Hons) — completed or still pursuing?');
        addMsg('choices', '', {
          options: [{ label: 'Completed', value: '1' }, { label: 'Still Pursuing', value: '2' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string, label: string) => {
          emit('patch', 'ug_status', val);
          await saveField('academic', 'ug_status', 'pg_status', val, parseInt(val));
          RESUME();
        });
        PAUSE();
      })
    );
  }

  if (!isFilled(fd.ug_type)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Score type for your UG degree?');
        addMsg('choices', '', {
          options: [{ label: 'Percentage' }, { label: 'CGPA' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'ug_type', val);
          await saveField('academic', 'ug_type', 'ug_score_type', val);
          RESUME();
        });
        PAUSE();
      })
    );
  }

  if (isFilled(fd.ug_cgpa)) {
    steps.push(SKIP('UG score', fd.ug_cgpa));
  } else {
    steps.push(ASK('Your UG score?', 'ug_cgpa', 'pg_percentage', 'academic', 'score', 'e.g. 72 or 7.2'));
  }

  if (isFilled(fd.ug_institution)) {
    steps.push(SKIP('college name', fd.ug_institution));
  } else {
    steps.push(ASK('College or institution name?', 'ug_institution', 'institution', 'academic', 'text', 'e.g. Lucknow University'));
  }

  if (!isFilled(fd.ug_medium)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Medium of instruction for your degree?');
        addMsg('choices', '', {
          options: [{ label: 'English' }, { label: 'Hindi' }, { label: 'Other' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'ug_medium', val);
          await saveField('academic', 'ug_medium', 'medium_instruction', val, mediumMap[val] || '');
          RESUME();
        });
        PAUSE();
      })
    );
  }

  // PG
  if (!isFilled(fd.pg_exists)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Do you have any higher qualification? (M.Com, MBA, etc.)');
        addMsg('choices', '', {
          options: [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }],
          chosen: null,
        });
        const heMap: Record<string, number> = { Yes: 1, No: 2 };
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'pg_exists', val);
          await saveField('academic', 'pg_exists', 'higher_education_status', val, heMap[val] || '');
          if (val === 'Yes') {
            push(...pgDetails());
          } else {
            push(...academicDone());
          }
          RESUME();
        });
        PAUSE();
      })
    );
  } else {
    if (fd.pg_exists === 'Yes') {
      steps.push(...pgDetails());
    } else {
      steps.push(...academicDone());
    }
  }

  return steps;
}

function pgDetails(): (() => void)[] {
  const fd = props.formData;
  const steps: (() => void)[] = [];

  if (!isFilled(fd.pg_type)) {
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Select qualification');
        addMsg('choices', '', {
          options: [{ label: 'M.Com' }, { label: 'M.B.A' }, { label: 'Other' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string) => {
          emit('patch', 'pg_type', val);
          await saveField('academic', 'pg_type', 'higher_qualification', val);
          if (val === 'Other') {
            push(
              ASK('Please specify', 'pg_other', 'pg_other', 'academic', 'text', 'e.g. CA'),
              ASK('Institution name?', 'pg_institution', 'higher_qualification_institution', 'academic', 'text', 'e.g. Amity University'),
              ...academicDone()
            );
          } else {
            push(
              ASK('Institution name?', 'pg_institution', 'higher_qualification_institution', 'academic', 'text', 'e.g. Amity University'),
              ...academicDone()
            );
          }
          RESUME();
        });
        PAUSE();
      })
    );
  } else {
    if (fd.pg_type === 'Other' && !isFilled(fd.pg_other)) {
      steps.push(ASK('Please specify', 'pg_other', 'pg_other', 'academic', 'text', 'e.g. CA'));
    }
    if (!isFilled(fd.pg_institution)) {
      steps.push(ASK('Institution name?', 'pg_institution', 'higher_qualification_institution', 'academic', 'text', 'e.g. Amity University'));
    }
    steps.push(...academicDone());
  }
  
  return steps;
}

function academicDone(): (() => void)[] {
  return [
    PROGRESS(65),
    SAY('Academic details saved! You\'re 65% done. 🎉', 500),
    () => { logEvent('section_complete', 'academic'); next(); },
    ...section4()
  ];
}

// ── Section 4: Work ────────────────────────────────────────────────────────
function section4(): (() => void)[] {
  const fd = props.formData;
  const steps: (() => void)[] = [
    DIVIDER('Section 4 of 4 — Work experience'),
  ];

  const exp = fd.work_experience?.[0] || {};
  const hasExpData = isFilled(exp.org_name) || isFilled(exp.designation) || isFilled(exp.functional_area) || isFilled(exp.from);

  // If they explicitly selected Experienced, or actually filled in experience data
  if (fd.employment_status === 'Experienced' || hasExpData) {
    steps.push(SKIP('employment status', 'Experienced'));
    steps.push(...workDetails(), ...workDone());
  } else if (fd.employment_status === 'Fresher') {
    steps.push(SKIP('employment status', 'Fresher'));
    steps.push(...workDone());
  } else {
    // If they are "Fresher" (which is the default) or unset, we ask them to explicitly confirm
    steps.push(
      () => withTyping(700, () => {
        addMsg('bot', 'Are you a fresher or do you have work experience?');
        addMsg('choices', '', {
          options: [{ label: 'Fresher', value: '1' }, { label: 'I have work experience', value: '2' }],
          chosen: null,
        });
        choiceCallbacks.push(async (val: string, label: string) => {
          const empLabel = val === '1' ? 'Fresher' : 'Experienced';
          emit('patch', 'employment_status', empLabel);
          await saveField('work', 'employment_status', 'employement_status', empLabel, parseInt(val));
          if (val === '2') {
            push(...workDetails(), ...workDone());
          } else {
            push(...workDone());
          }
          RESUME();
        });
        PAUSE();
      })
    );
  }

  return steps;
}

function workDetails(): (() => void)[] {
  const fd = props.formData;
  const exp = fd.work_experience?.[0] || {};
  const steps: (() => void)[] = [];

  if (isFilled(exp.org_name)) {
    steps.push(SKIP('organisation name', exp.org_name));
  } else {
    steps.push(ASK('Current or most recent organisation name?', 'work_org', 'user_experience', 'work', 'text', 'e.g. Infosys BPM'));
  }

  if (isFilled(exp.designation)) {
    steps.push(SKIP('designation', exp.designation));
  } else {
    steps.push(ASK('Your designation?', 'work_desig', 'user_experience', 'work', 'text', 'e.g. Finance Analyst'));
  }

  if (isFilled(exp.functional_area)) {
    steps.push(SKIP('functional area', exp.functional_area));
  } else {
    steps.push(ASK('Functional area? (Finance, Audit, Accounting etc.)', 'work_area', 'user_experience', 'work', 'text', 'e.g. Finance & Accounts'));
  }

  if (isFilled(exp.from)) {
    steps.push(SKIP('start date', exp.from));
  } else {
    steps.push(ASK('When did you start? (DD-MM-YYYY)', 'work_from', 'user_experience', 'work', 'date', 'e.g. 15-01-2023'));
  }

  return steps;
}

function workDone(): (() => void)[] {
  return [
    PROGRESS(80),
    SAY('Work experience saved! Last section — your documents. 📄', 500),
    () => { logEvent('section_complete', 'work'); next(); },
    ...section5()
  ];
}

// ── Section 5: Documents ───────────────────────────────────────────────────
function section5(): (() => void)[] {
  const fd = props.formData;
  const ex = fd.existingDocuments || {};
  const steps: (() => void)[] = [
    DIVIDER('Section 5 of 5 — Documents'),
    SAY('Upload your documents. Max 2 MB each (PDF, JPG, PNG). Resume can also be DOC/DOCX.', 700),
  ];

  if (ex.aadhaar) {
    steps.push(SKIP('Aadhaar card', '(already uploaded)'));
  } else {
    steps.push(UPLOAD('Your Aadhaar card:', 'aadhaar', 'aadhaar', 'Attach Aadhaar card', '.pdf,.jpg,.jpeg,.png'));
  }

  if (ex.dob_proof) {
    steps.push(SKIP('DOB proof', '(already uploaded)'));
  } else {
    steps.push(UPLOAD('Proof of date of birth (marksheet or birth certificate):', 'dob_proof', 'dob_proof', 'Attach DOB proof', '.pdf,.jpg,.jpeg,.png'));
  }

  if (ex.photo) {
    steps.push(SKIP('passport photo', '(already uploaded)'));
  } else {
    steps.push(UPLOAD('A recent passport-size photograph:', 'photo', 'photo', 'Attach photograph', '.jpg,.jpeg,.png'));
  }

  if (ex.signature) {
    steps.push(SKIP('signature', '(already uploaded)'));
  } else {
    steps.push(UPLOAD('Your signature image:', 'signature', 'signature', 'Attach signature', '.jpg,.jpeg,.png,.pdf'));
  }

  if (ex.resume) {
    steps.push(SKIP('resume', '(already uploaded)'));
  } else {
    steps.push(UPLOAD('Finally, your resume:', 'resume', 'resume', 'Attach resume', '.pdf,.doc,.docx'));
  }

  steps.push(
    PROGRESS(100),
    () => { logEvent('section_complete', 'documents'); next(); },
    ...DECLARATION_STEP()
  );
  return steps;
}

// ── Watchers & Lifecycle ───────────────────────────────────────────────────
watch(isOpen, (val) => {
  if (val && messages.value.length === 0) {
    // Small delay so user sees the panel open first
    setTimeout(buildFlow, 400);
  }
});

onMounted(() => {
  // Auto-open after 3 seconds if profile is incomplete
  if (hasPendingFields.value) {
    setTimeout(() => { isOpen.value = true; }, 3000);
  }
});
</script>

<style scoped>
/* ── FAB ──────────────────────────────────────────────────────────────── */
.gcc-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #872980, #5e1f5a);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(135, 41, 128, 0.5);
  z-index: 9990;
  transition: all 0.2s ease;
}

.gcc-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(135, 41, 128, 0.65);
}

.gcc-fab__logo {
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 4px;
}

.gcc-fab__badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  animation: gcc-pulse 2s infinite;
}

@keyframes gcc-pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

/* ── Chat Panel ───────────────────────────────────────────────────────── */
.gcc-cw {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 390px;
  max-height: 640px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18), 0 0 0 0.5px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9991;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  animation: gcc-slideUp 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes gcc-slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.92);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

/* ── Header ───────────────────────────────────────────────────────────── */
.gcc-ch {
  background: #26215C;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.gcc-ch__ava {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  
}

.gcc-ch__ava-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.gcc-ch__info {
  flex: 1;
}

.gcc-ch__name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
}

.gcc-ch__status {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 1px;
}

.gcc-ch__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  flex-shrink: 0;
}

.gcc-ch__close {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  line-height: 1;
  transition: background 0.15s;
}

.gcc-ch__close:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ── Progress ─────────────────────────────────────────────────────────── */
.gcc-progress {
  padding: 8px 16px 7px;
  background: #26215C;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.gcc-progress__labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 5px;
}

.gcc-progress__pct {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

.gcc-progress__track {
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  overflow: hidden;
}

.gcc-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, #872980, #c45fbc);
  border-radius: 4px;
  transition: width 0.6s ease;
}

/* ── Body ─────────────────────────────────────────────────────────────── */
.gcc-cb {
  flex: 1;
  overflow-y: auto;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  background: #f8f7f6;
  scroll-behavior: smooth;
}

.gcc-cb::-webkit-scrollbar {
  width: 3px;
}

.gcc-cb::-webkit-scrollbar-thumb {
  background: #d3d1c7;
  border-radius: 3px;
}

/* ── Messages ─────────────────────────────────────────────────────────── */
.gcc-mr {
  display: flex;
  gap: 7px;
  align-items: flex-end;
}

.gcc-mr--u {
  justify-content: flex-end;
}

.gcc-mava {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  border: 1.5px solid rgba(135, 41, 128, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 2px;
  overflow: hidden;
  padding: 2px;
}

.gcc-mava__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.gcc-mava--err {
  background: #fff;
  border-color: rgba(153, 60, 29, 0.25);
}

.gcc-bub {
  max-width: 265px;
  padding: 9px 12px;
  font-size: 13.5px;
  line-height: 1.55;
  word-break: break-word;
  border-radius: 16px;
}

.gcc-bub--bot {
  background: #fff;
  color: #1a1a1a;
  border-radius: 16px 16px 16px 4px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
}

.gcc-bub--usr {
  background: #872980;
  color: #fff;
  border-radius: 16px 16px 4px 16px;
}

.gcc-bub--err {
  background: #FAECE7;
  color: #993C1D;
  border-radius: 16px 16px 16px 4px;
  border: 0.5px solid #f0997b;
}

/* ── Typing ───────────────────────────────────────────────────────────── */
.gcc-typing-bub {
  background: #fff;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px 16px 16px 4px;
  padding: 10px 14px;
  display: flex;
  gap: 4px;
  align-items: center;
}

.gcc-td {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #888780;
  animation: gcc-tdp 1.1s infinite;
}

.gcc-td:nth-child(2) {
  animation-delay: .15s;
}

.gcc-td:nth-child(3) {
  animation-delay: .30s;
}

@keyframes gcc-tdp {

  0%,
  60%,
  100% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-4px);
  }
}

/* ── Divider ──────────────────────────────────────────────────────────── */
.gcc-sdiv {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 4px 0;
}

.gcc-sdiv__line {
  flex: 1;
  height: 0.5px;
  background: rgba(0, 0, 0, 0.1);
}

.gcc-sdiv__label {
  font-size: 10px;
  color: #9a9a9a;
  white-space: nowrap;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ── Quick Replies ────────────────────────────────────────────────────── */
.gcc-qr-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 1px 0 3px 33px;
}

.gcc-qr-btn {
  font-size: 12.5px;
  padding: 7px 13px;
  border-radius: 20px;
  border: 1.5px solid #872980;
  color: #872980;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  font-weight: 500;
}

.gcc-qr-btn:hover {
  background: #f7eef6;
}

.gcc-qr-btn--sel {
  background: #872980;
  color: #fff;
  pointer-events: none;
}

.gcc-qr-btn--disabled {
  opacity: 0.5;
  cursor: default;
}

/* ── File Upload ──────────────────────────────────────────────────────── */
.gcc-up-wrap {
  padding: 2px 0 3px 33px;
}

.gcc-up-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 15px;
  border-radius: 10px;
  border: 1.5px dashed #872980;
  color: #5e1f5a;
  background: #f7eef6;
  cursor: pointer;
  font-size: 12.5px;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.15s;
}

.gcc-up-btn:hover {
  background: #eeddeb;
  border-color: #5e1f5a;
}

.gcc-up-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

.gcc-up-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* ── Done Card ────────────────────────────────────────────────────────── */
.gcc-done-card {
  background: #EAF3DE;
  border: 1px solid #97C459;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  margin: 4px 0;
}

.gcc-done-card__icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #3B6D11;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.gcc-done-card__icon svg {
  width: 24px;
  height: 24px;
  fill: #fff;
}

.gcc-done-card__title {
  font-size: 15px;
  font-weight: 600;
  color: #3B6D11;
  margin-bottom: 5px;
}

.gcc-done-card__sub {
  font-size: 12.5px;
  color: #3B6D11;
  line-height: 1.55;
  margin-bottom: 4px;
}

.gcc-done-card__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.gcc-done-card__limit {
  font-size: 11.5px;
  color: #3B6D11;
  opacity: 0.8;
  font-style: italic;
  margin-bottom: 2px;
}

.gcc-done-card__cta {
  display: block;
  padding: 11px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  transition: all 0.15s;
}

.gcc-done-card__cta--slot {
  background: #872980;
  color: #fff;
}

.gcc-done-card__cta--slot:hover {
  background: #5e1f5a;
}

.gcc-done-card__cta--slot:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gcc-done-card__cta--review {
  background: transparent;
  color: #3B6D11;
  border: 1.5px solid #3B6D11;
}

.gcc-done-card__cta--review:hover {
  background: #d8eec4;
}

/* ── Slot Confirmed Card ──────────────────────────────────────────────── */
.gcc-slot-card {
  background: #f0eafa;
  border: 1px solid #c45fbc;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  margin: 4px 0;
}

.gcc-slot-card__icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #872980;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.gcc-slot-card__icon svg {
  width: 22px;
  height: 22px;
  fill: #fff;
}

.gcc-slot-card__title {
  font-size: 14px;
  font-weight: 700;
  color: #5e1f5a;
  margin-bottom: 10px;
}

.gcc-slot-card__row {
  font-size: 13px;
  color: #3d1440;
  margin-bottom: 4px;
}

.gcc-slot-card__cta {
  display: block;
  margin-top: 12px;
  padding: 10px 20px;
  background: #872980;
  color: #fff;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  transition: background 0.15s;
}

.gcc-slot-card__cta:hover {
  background: #5e1f5a;
}



/* ── Input Bar ────────────────────────────────────────────────────────── */
.gcc-ci {
  padding: 10px 12px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
  align-items: center;
  background: #fff;
  flex-shrink: 0;
}

.gcc-ci__txt {
  flex: 1;
  padding: 9px 13px;
  border: 0.5px solid rgba(0, 0, 0, 0.18);
  border-radius: 20px;
  font-size: 13px;
  color: #1a1a1a;
  background: #fafafa;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.gcc-ci__txt:focus {
  border-color: #872980;
  background: #fff;
}

.gcc-ci__txt:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.gcc-ci__send {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #872980;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
}

.gcc-ci__send:hover {
  background: #5e1f5a;
}

.gcc-ci__send:active {
  transform: scale(0.92);
}

.gcc-ci__send:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.gcc-ci__send svg {
  width: 15px;
  height: 15px;
  fill: #fff;
}

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 440px) {
  .gcc-cw {
    width: calc(100vw - 16px);
    right: 8px;
    bottom: 8px;
    max-height: 80vh;
  }

  .gcc-fab {
    bottom: 16px;
    right: 16px;
  }
}
</style>

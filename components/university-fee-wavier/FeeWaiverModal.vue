<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="fee-modal">
      <!-- Close -->
      <button class="close-btn" @click="$emit('close')" aria-label="Close">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Dark Header -->
      <div class="modal-header">
        <div class="icon-ring">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#5b21b6" stroke="#5b21b6" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="badge">
          <span>🎉</span>
          <span class="badge-text">1ST ATTEMPT IS WAIVED OFF</span>
        </div>
      </div>

      <!-- White Body -->
      <div class="modal-body">
        <h1 class="title">CONGRATULATIONS!</h1>
        <p class="subtitle">
          GCC School has partnered with your institution/university.
          Your registration fee for the 1st attempt is <strong>waived off</strong>, and
          you can now apply with no fees.
        </p>

        <hr class="divider" />

        <!-- Upload -->
        <div class="upload-section">
          <p class="upload-label">
            Upload ID Card <span class="upload-hint">(Max size: 2 MB)</span>
          </p>
          <div
            class="upload-zone"
            :class="{ dragging: isDragging, 'has-file': uploadedFile }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              class="hidden-input"
              @change="handleFileChange"
            />
            <template v-if="!uploadedFile">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
                <path d="M17 3v4M15 5h4" stroke-linecap="round"/>
              </svg>
              <p class="upload-text">
                <span class="upload-link">Click to upload</span> or drag and drop
              </p>
              <p class="upload-formats">PNG, JPG, or PDF</p>
            </template>
            <template v-else>
              <div class="file-preview">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5b21b6" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span class="file-name">{{ uploadedFile.name }}</span>
                <button class="remove-file" @click.stop="removeFile">✕</button>
              </div>
            </template>
          </div>
        </div>

        <!-- Terms -->
        <div class="terms-row" @click="agreed = !agreed">
          <div class="checkbox" :class="{ checked: agreed }">
            <svg v-if="agreed" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1.5 5.5l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="terms-text">
            By submitting, you agree to our
            <a href="#" class="terms-link" @click.stop>Terms</a> and
            <a href="#" class="terms-link" @click.stop>Privacy Policy</a>.
          </span>
        </div>

        <!-- Submit -->
        <button class="submit-btn" :disabled="!agreed" @click="handleSubmit">
          Submit Application
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const fileInput = ref(null)
const uploadedFile = ref(null)
const isDragging = ref(false)
const agreed = ref(false)

function triggerFileInput() {
  fileInput.value?.click()
}
function handleFileChange(e) {
  const file = e.target.files?.[0]
  if (file) uploadedFile.value = file
}
function handleDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) uploadedFile.value = file
}
function removeFile() {
  uploadedFile.value = null
  if (fileInput.value) fileInput.value.value = ''
}
function handleSubmit() {
  if (!agreed.value) return
  alert('Application submitted!')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.fee-modal {
  background: #fff;
  border-radius: 18px;
  width: 450px;
  max-width: 100%;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
  font-family: 'DM Sans', sans-serif;
  position: relative;
  animation: pop 0.3s cubic-bezier(0.34, 1.5, 0.64, 1);
}

@keyframes pop {
  from { opacity: 0; transform: scale(0.94) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #d0cdd1;
  border: none;
  color: #525252;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
}
.close-btn:hover { background: rgba(255,255,255,0.28); color: #fff; }

.modal-header {
  background: #12082a;
  padding: 32px 24px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.icon-ring {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #ede9ff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 5px rgba(91, 33, 182, 0.2);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #f0fdf4;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  padding: 7px 16px;
  color: #16803c;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.modal-body {
  padding: 23px 23px 24px;
}

.title {
  /* font-family: 'Bebas Neue', sans-serif; */
  font-size: 1.6rem;
  font-weight: 600;
  /* letter-spacing: 0.04em; */
  text-align: center;
  color: #111;
  /* margin: 0 0 14px; */
  /* line-height: 1; */
  white-space: nowrap;
}

.subtitle {
  text-align: center;
  color: #555;
  font-size: 0.85rem;
  /* line-height: 1.65; */
  /* margin: 0 0 22px; */
}
/* .subtitle strong { color: #111; font-weight: 600; } */

.divider {
  border: none;
  border-top: 1px solid #ebebeb;
  /* margin: 0 0 22px; */
}

.upload-section { margin-bottom: 12px; }

.upload-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #111;
  /* margin: 0 0 10px; */
}
.upload-hint { font-weight: 400; color: #999; font-size: 0.85rem; margin-left: 4px; }

.upload-zone {
  border: 1.5px dashed #d0d0d0;
  border-radius: 10px;
  background: #f9f9f9;
  padding: 23px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.upload-zone:hover,
.upload-zone.dragging { border-color: #7c3aed; background: #f5f0ff; }
.upload-zone.has-file { border-style: solid; border-color: #7c3aed; background: #faf7ff; }

.hidden-input { display: none; }

.upload-text { font-size: 0.8rem; color: #555; margin: 0; }
.upload-link { color: #6d28d9; font-weight: 500; }
.upload-formats { font-size: 0.72rem; color: #aaa; margin: 0; }

.file-preview { display: flex; align-items: center; gap: 10px; width: 100%; }
.file-name {
  flex: 1;
  font-size: 0.83rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.remove-file {
  background: none; border: none; cursor: pointer;
  color: #bbb; font-size: 0.85rem; padding: 2px 5px;
  border-radius: 4px; transition: color 0.2s;
}
.remove-file:hover { color: #e53e3e; }

.terms-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f8f9;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 13px 14px;
  cursor: pointer;
  margin-bottom: 16px;
  user-select: none;
}

.checkbox {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s, background 0.15s;
}
.checkbox.checked { background: #6d28d9; border-color: #6d28d9; }

.terms-text { font-size: 0.75rem; color: #444; }
.terms-link { color: #6d28d9; text-decoration: none; font-weight: 400; }
.terms-link:hover { text-decoration: underline; }

.submit-btn {
  width: 100%;
  background: #78229d;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 22px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s, transform 0.15s, opacity 0.2s;
}
.submit-btn:hover:not(:disabled) { background: #5b21b6; transform: translateY(-1px); }
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
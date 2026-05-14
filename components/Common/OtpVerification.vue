<template>
  <div class="otp-container">
    <div v-if="showPhone" class="mb-2">
      <label v-if="label" class="form-label fw-bold small">{{ label }}</label>
      <div class="d-flex gap-2">
        <div class="flex-grow-1 position-relative">
          <input 
            :value="modelValue" 
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            type="tel" 
            class="form-control custom-input"
            :class="{ 'otp-verified-input': verified, 'is-invalid': error }"
            :placeholder="placeholder" 
            :readonly="verified"
          >
        </div>
        <button 
          v-if="!verified" 
          type="button" 
          class="btn btn-sm btn-otp-verify px-3"
          :disabled="isSending || timer > 0" 
          @click="handleSend"
        >
          <span v-if="isSending" class="spinner-border spinner-border-sm"></span>
          <span v-else>{{ otpSent ? (timer > 0 ? `Resend in ${timer}s` : 'Resend') : 'Verify' }}</span>
        </button>
      </div>
      <small class="text-danger" v-if="error">{{ error }}</small>
    </div>

    <!-- OTP Input Field -->
    <div v-if="showOtp && otpSent && !verified" class="mb-2 animate-fade-in">
      <label class="form-label fw-bold small text-purple">Enter 6-Digit OTP*</label>
      <div class="d-flex gap-2">
        <input 
          v-model="userOtp" 
          type="text" 
          class="form-control custom-input text-center flex-grow-1"
          placeholder="Enter 6-Digit OTP" 
          maxlength="6"
          style="font-size: 16px; letter-spacing: 4px;"
        >
        <button 
          type="button" 
          class="btn btn-purple-verify px-4"
          :disabled="isVerifying || userOtp.length !== 6" 
          @click="handleVerify"
        >
          <span v-if="isVerifying" class="spinner-border spinner-border-sm"></span>
          <span v-else>Confirm</span>
        </button>
      </div>
      <small class="text-danger d-block mt-1" v-if="otpError">{{ otpError }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, default: 'Phone Number*' },
  placeholder: { type: String, default: 'Enter your phone number' },
  error: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  showPhone: { type: Boolean, default: true },
  showOtp: { type: Boolean, default: true },
  sent: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'update:verified', 'update:sent', 'otp-sent', 'error-clear']);

const otpSent = ref(props.sent);
const isSending = ref(false);
const isVerifying = ref(false);
const userOtp = ref('');
const otpError = ref('');
const timer = ref(0);
let timerInterval: any = null;

const startTimer = () => {
  timer.value = 60;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timer.value > 0) timer.value--;
    else clearInterval(timerInterval);
  }, 1000);
};

const isValidMobile = (phone: string) => /^[6-9]\d{9}$/.test(phone);

const handleSend = async () => {
  if (!props.modelValue || !isValidMobile(props.modelValue)) {
    emit('update:verified', false);
    return; // Parent should handle validation error message
  }
  
  isSending.value = true;
  otpError.value = '';
  try {
    const res: any = await $fetch('/api/otp/send', {
      method: 'POST',
      body: { mobile: props.modelValue }
    });
    if (res.success) {
      otpSent.value = true;
      emit('update:sent', true);
      startTimer();
      emit('otp-sent');
    }
  } catch (err: any) {
    otpError.value = err.data?.statusMessage || 'Failed to send OTP';
  } finally {
    isSending.value = false;
  }
};

const handleVerify = async () => {
  if (!userOtp.value || userOtp.value.length !== 6) {
    otpError.value = 'Please enter a 6-digit OTP';
    return;
  }
  isVerifying.value = true;
  otpError.value = '';
  try {
    const res: any = await $fetch('/api/otp/verify', {
      method: 'POST',
      body: { mobile: props.modelValue, otp: userOtp.value }
    });
    if (res.success) {
      emit('update:verified', true);
      emit('error-clear');
      otpError.value = '';
    }
  } catch (err: any) {
    otpError.value = err.data?.statusMessage || 'Invalid or expired OTP';
  } finally {
    isVerifying.value = false;
  }
};

watch(() => props.sent, (newVal) => {
  otpSent.value = newVal;
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.text-purple {
  color: #8A2BE2;
}

.otp-verified-input {
  border-color: #28a745 !important;
  background-color: #f0fff4 !important;
  color: #155724 !important;
  font-weight: 600;
}

.btn-otp-verify {
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid #8A2BE2;
  color: #8A2BE2;
  transition: all 0.2s ease;
  background: transparent;
}

.btn-otp-verify:hover:not(:disabled) {
  background: #8A2BE2;
  color: #fff;
}

.btn-purple-verify {
  background: linear-gradient(135deg, #8A2BE2 0%, #A13E99 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-purple-verify:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.custom-input {
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 14px;
    transition: all 0.3s ease;
}
</style>

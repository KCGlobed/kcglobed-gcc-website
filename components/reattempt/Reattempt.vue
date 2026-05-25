<template>
    <div class="reattempt-container mt-4">
        <div v-if="props.reattempt !== 0" class="reattempt-float" :class="{ disabled: props.reattempt === 2 }"
            @click="props.reattempt !== 2 && (showModal = true)">
            <div class="d-flex align-items-center gap-2">
                <div class="d-flex flex-column text-start" style="line-height: 1.2;">
                    <span class="reattempt-h1 fw-bold">Reattempt NFET</span>
                    <span class="reattempt-h2">With 20% Discount</span>
                </div>

                <span class="custom-tooltip-wrapper ms-1" @click.stop>
                    <i class="ti ti-info-circle fs-5"></i>
                    <div class="custom-tooltip-content">
                        You are eligible for a <b>one-time NFET reattempt</b>...
                    </div>
                </span>
            </div>
        </div>

        <!-- Payment Confirmation Modal -->
        <Transition name="fade">
            <div v-if="showModal" class="custom-modal-overlay" @click.self="!isProcessing && (showModal = false)">
                <Transition name="scale">
                    <div class="custom-modal shadow-lg border-0 text-center" v-show="showModal">

                        <!-- Close Button -->
                        <button class="btn-close-modal" @click="showModal = false" :disabled="isProcessing">
                            <i class="ti ti-x"></i>
                        </button>

                        <!-- ── VERIFYING LOADER STATE ── -->
                        <template v-if="isVerifying">
                            <div class="verifying-state py-5 px-4">
                                <div class="spinner-wrapper mb-4">
                                    <div class="custom-spinner"></div>
                                </div>
                                <h5 class="fw-bold text-dark mb-2">{{ verifyingMessage }}</h5>
                                <p class="text-muted small">Please wait, do not close this window.</p>
                            </div>
                        </template>

                        <!-- ── NORMAL OFFER STATE ── -->
                        <template v-else>
                            <div class="modal-header-dark">
                                <div class="icon-circle-new">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                                    </svg>
                                </div>
                                <div class="badge-save">SAVE {{ discountPercent }}%</div>
                            </div>

                            <div class="modal-body-content p-4 pb-5">
                                <h2 class="modal-title-bold mb-2">Retry for Less</h2>
                                <p class="modal-desc-text mb-4">
                                    Don't let a minor setback stop your progress.<br>
                                    Save {{ discountPercent }}% on your exam reattempt today.
                                </p>

                                <div class="price-display-wrapper mb-4">
                                    <span class="price-main">₹{{ discountedPrice.toLocaleString() }}</span>
                                    <span class="price-strike ms-2">₹{{ originalPrice.toLocaleString() }}</span>
                                </div>

                                <div class="d-flex flex-column gap-3 pt-2">
                                    <button class="btn-pay-now-premium" @click="initiatePayment"
                                        :disabled="isProcessing">
                                        <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                                        {{ isProcessing ? 'Processing...' : 'Pay Now' }}
                                        <i v-if="!isProcessing" class="ti ti-arrow-right ms-2"></i>
                                    </button>
                                    <button class="btn-link-maybe" @click="showModal = false" :disabled="isProcessing">
                                        Maybe Later
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                </Transition>
            </div>
        </Transition>

        <!-- Payment Success/Failure Notification -->
        <CommonAlert :show="alert.show" :title="alert.title" :message="alert.message" :type="alert.type"
            @close="alert.show = false" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const props = defineProps<{
    formData: any;
    reattempt: number;
}>();

const showModal = ref(false);
const isProcessing = ref(false);

// ── NEW: separate state for post-payment verification loader ──
const isVerifying = ref(false);
const verifyingMessage = ref('Verifying your payment...');

const alert = reactive({
    show: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info'
});

const config = useRuntimeConfig();

const originalPrice = computed(() => Number(config.public.paymentAmount || 2950));
const discountPercent = computed(() => Number(config.public.reattemptDiscountPercentage || 20));

const discountedPrice = computed(() => {
    const amount = originalPrice.value;
    const discount = amount * (discountPercent.value / 100);
    return Math.round(amount - discount);
});

const callReattempt = async () => {
    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        console.log(token, '---token---')
        const res = await $fetch(`${config.public.apiBase}/api/students/exam-re-attempt-status/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: { status: true }
        });
        console.log(res, '---res---')
    } catch (error) {
        console.error("[REATTEMPT] callReattempt error:", error);
    }
};

// ── Payment SDK Loaders ──────────────────────────────────────────────────
const loadCashfreeScript = () => new Promise((resolve) => {
    if ((window as any).Cashfree) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
});

const loadRazorpayScript = () => new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
});

const initiatePayment = async () => {
    isProcessing.value = true;
    try {
        const { userId, getAccessToken } = useAuth();
        const token = getAccessToken();
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res: any = await $fetch("/api/start-payment", {
            method: "POST",
            headers,
            body: {
                user_id: userId.value,
                name: `${props.formData.first_name || ''} ${props.formData.last_name || ''}`.trim() || 'Applicant',
                email: props.formData.email,
                mobile: props.formData.mobile,
                city: props.formData.city,
                state: props.formData.state,
                payment_type: 'reattempt',
                form_type: 2,
                form_id: props.formData.id
            }
        });

        if (!res.success) throw new Error(res.message || "Payment initiation failed");

        if (res.gateway === 'razorpay') {
            await handleRazorpayPayment(res);
        } else {
            await handleCashfreePayment(res);
        }

    } catch (err: any) {
        console.error("[REATTEMPT] Payment Error:", err);
        showModal.value = false;
        alert.show = true;
        alert.title = "Payment Failed";
        alert.message = err.message || "Something went wrong. Please try again.";
        alert.type = "error";
    } finally {
        isProcessing.value = false;
    }
};

// ── Shared: show loader inside modal while verifying / failing ───────────
const startVerifying = (message = 'Verifying your payment...') => {
    isVerifying.value = true;
    verifyingMessage.value = message;
};

const stopVerifying = () => {
    isVerifying.value = false;
};

const onPaymentFailure = async (payload: any) => {
    // Show "Recording failure..." loader inside modal
    startVerifying('Recording payment status...');

    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        await $fetch("/api/report-payment-failure", {
            method: "POST",
            headers,
            body: payload
        });
    } catch (e) {
        console.error("[REATTEMPT] Failure report error:", e);
    }

    stopVerifying();
    showModal.value = false;

    alert.show = true;
    alert.title = "Payment Failed";
    alert.message = payload?.error_description || "Payment was not completed. Please try again.";
    alert.type = "error";
};

const handleRazorpayPayment = async (res: any) => {
    const loaded = await loadRazorpayScript();
    if (!loaded || !(window as any).Razorpay) throw new Error("Razorpay SDK failed to load");

    const options = {
        key: res.key,
        amount: res.amount * 100,
        currency: res.currency,
        name: "KCGlobed GCC",
        description: `Reattempt Fee (${discountPercent.value}% Off)`,
        order_id: res.order_id,
        handler: async (response: any) => {
            // Show verifying loader as soon as Razorpay closes with success
            startVerifying('Verifying your payment...');
            try {
                const { getAccessToken } = useAuth();
                const token = getAccessToken();
                const headers: Record<string, string> = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                await $fetch("/api/complete-payment", {
                    method: "POST",
                    headers,
                    body: {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        re_attempt_status: true
                    }
                });
                await callReattempt(); // ✅ Correct — called after successful verification
                stopVerifying();
                onPaymentSuccess();
            } catch (e: any) {
                stopVerifying();
                showModal.value = false;
                alert.show = true;
                alert.title = "Verification Failed";
                alert.message = "Payment verification failed. Please contact support.";
                alert.type = "error";
            }
        },
        prefill: {
            name: `${props.formData.first_name || ''} ${props.formData.last_name || ''}`.trim(),
            email: props.formData.email,
            contact: props.formData.mobile
        },
        theme: { color: "#872980" },
        modal: {
            ondismiss: async () => {
                await onPaymentFailure({
                    razorpay_order_id: res.order_id,
                    error_description: "User cancelled payment",
                    re_attempt_status: true
                });
            }
        }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", async (response: any) => {
        await onPaymentFailure({
            razorpay_order_id: response.error.metadata?.order_id,
            razorpay_payment_id: response.error.metadata?.payment_id,
            error_code: response.error.code,
            error_description: response.error.description,
            re_attempt_status: true
        });
    });
    rzp.open();
};

const handleCashfreePayment = async (res: any) => {
    const loaded = await loadCashfreeScript();
    if (!loaded || !(window as any).Cashfree) throw new Error("Cashfree SDK failed to load");

    const cfMode = res.environment === 'PRODUCTION' ? 'production' : 'sandbox';
    const cashfree = (window as any).Cashfree({ mode: cfMode });

    await cashfree.checkout({
        paymentSessionId: res.payment_session_id,
        redirectTarget: "_modal"
    }).then(async (result: any) => {
        if (result.error) {
            await onPaymentFailure({
                cf_order_id: res.cf_order_id,
                error_code: result.error.code,
                error_description: result.error.message,
                re_attempt_status: true
            });
            return;
        }
        if (result.paymentDetails) {
            // Show verifying loader as soon as Cashfree closes with success
            startVerifying('Verifying your payment...');
            try {
                const { getAccessToken } = useAuth();
                const token = getAccessToken();
                const headers: Record<string, string> = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                await $fetch("/api/complete-payment", {
                    method: "POST",
                    headers,
                    body: { cf_order_id: res.cf_order_id, re_attempt_status: true }
                });
                await callReattempt();
                stopVerifying();
                onPaymentSuccess();
            } catch (e: any) {
                stopVerifying();
                showModal.value = false;
                alert.show = true;
                alert.title = "Verification Failed";
                alert.message = "Payment verification failed. Please contact support.";
                alert.type = "error";
            }
        }
    }).catch(async (err: any) => {
        await onPaymentFailure({
            cf_order_id: res.cf_order_id,
            error_description: err?.message || "Payment cancelled",
            re_attempt_status: true
        });
    });
};

const onPaymentSuccess = () => {
    showModal.value = false;
    alert.show = true;
    alert.title = "Success!";
    alert.message = "Payment successful. You can now reattempt the exam.";
    alert.type = "success";

    setTimeout(() => { window.location.reload(); }, 2000);
};
</script>

<style scoped>
.reattempt-card {
    background: #fff;
    border-color: #eee !important;
    transition: all 0.3s ease;
}

.reattempt-card:hover {
    border-color: #872980 !important;
    transform: translateY(-2px);
}

.btn-reattempt {
    background: #872980;
    color: #fff;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.btn-reattempt:hover {
    background: #6d1e67;
    color: #fff;
    box-shadow: 0 4px 12px rgba(135, 41, 128, 0.2);
}

/* Modal */
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 15px;
}

.custom-modal {
    background: #fff;
    width: 100%;
    max-width: 420px;
    border-radius: 32px;
    position: relative;
    overflow: hidden;
    border: none;
}

.btn-close-modal {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-close-modal:hover {
    color: #fff;
    transform: scale(1.1);
}

.modal-header-dark {
    background: #140418;
    padding: 40px 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.icon-circle-new {
    width: 70px;
    height: 70px;
    background: #e0e7ff;
    color: #6366f1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
}

.badge-save {
    background: #dcfce7;
    color: #166534;
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.modal-title-bold {
    font-size: 28px;
    font-weight: 800;
    color: #0d0b14;
    letter-spacing: -0.5px;
}

.modal-desc-text {
    color: #64748b;
    font-size: 15px;
    line-height: 1.5;
}

.price-display-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.price-main {
    font-size: 36px;
    font-weight: 800;
    color: #0d0b14;
}

.price-strike {
    font-size: 20px;
    color: #cbd5e1;
    text-decoration: line-through;
    font-weight: 500;
}

.btn-pay-now-premium {
    background: #a240a0;
    color: #fff;
    border: none;
    border-radius: 16px;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.btn-pay-now-premium:hover:not(:disabled) {
    background: #873285;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(162, 64, 160, 0.3);
}

.btn-pay-now-premium:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-link-maybe {
    background: transparent;
    border: none;
    color: #64748b;
    font-size: 16px;
    font-weight: 600;
    padding: 8px;
    transition: all 0.2s ease;
}

.btn-link-maybe:hover:not(:disabled) {
    color: #0d0b14;
}

/* Verifying loader */
.verifying-state {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-spinner {
    width: 60px;
    height: 60px;
    border: 5px solid #f3e8f9;
    border-top-color: #a240a0;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}

.reattempt-float {
    position: fixed;
    right: -50px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    background: #d39c00;
    color: white;
    padding: 10px 18px;
    font-weight: 600;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
}

.reattempt-float:hover {
    background: #b8860b;
}

.reattempt-float.disabled {
    background: #ccc;
    cursor: not-allowed;
    pointer-events: none;
}

.reattempt-float:hover {
    background: #b8860b;
}

.reattempt-float.disabled {
    background: #ccc;
    cursor: not-allowed;
    pointer-events: none;
}

.reattempt-h1 {
    font-size: 16px;
}

.reattempt-h2 {
    font-size: 13px;
    opacity: 0.9;
}

/* Custom Tooltip styling */
.custom-tooltip-wrapper {
    position: relative;
    cursor: pointer;
    pointer-events: auto !important;
}

.custom-tooltip-content {
    visibility: hidden;
    opacity: 0;
    width: 280px;
    background-color: #1e1b4b;
    color: #fff;
    text-align: left;
    border-radius: 8px;
    padding: 12px 16px;
    position: absolute;
    z-index: 1060;
    bottom: calc(100% + 20px);
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s, visibility 0.3s;
    pointer-events: none;
    white-space: normal;
}

.custom-tooltip-content::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent #1e1b4b;
}

.custom-tooltip-wrapper:hover .custom-tooltip-content {
    visibility: visible;
    opacity: 1;
}
</style>
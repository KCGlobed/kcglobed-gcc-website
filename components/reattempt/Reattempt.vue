<template>
    <div class="reattempt-container mt-4">
        <!-- Reattempt Prompt Card -->
        <div class="reattempt-card p-4 rounded-4 shadow-sm border overflow-hidden position-relative">
            <div class="reattempt-content d-flex align-items-center justify-content-between gap-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="icon-box">
                        <i class="ti ti-rotate-clockwise fs-4"></i>
                    </div>
                    <div>
                        <h6 class="mb-1 fw-bold text-dark">Do you want to reattempt the exam?</h6>
                        <p class="small text-muted mb-0">Get a second chance to improve your score.</p>
                    </div>
                </div>
                <button class="btn btn-reattempt px-4 py-2 fw-bold" @click="showModal = true">
                    Reattempt <i class="ti ti-arrow-right ms-1"></i>
                </button>
            </div>
        </div>

        <!-- Payment Confirmation Modal -->
        <Transition name="fade">
            <div v-if="showModal" class="custom-modal-overlay" @click.self="showModal = false">
                <Transition name="scale">
                    <div class="custom-modal p-4 shadow-lg border-0 text-center" v-show="showModal">
                        <!-- Top Icon -->
                        <div class="modal-icon-header mb-4">
                            <div class="icon-circle shadow-sm">
                                <i class="ti ti-discount-2 fs-1 text-primary"></i>
                            </div>
                        </div>

                        <h3 class="fw-black mb-2" style="color: #1e1b4b;">Special Offer!</h3>
                        <p class="text-secondary mb-4 px-2">
                            Ready for another try? Get <span class="fw-bold text-primary">{{ discountPercent }}% OFF</span> for reattempting the exam.
                        </p>

                        <!-- Offer Banner -->
                        <div class="offer-banner p-3 rounded-3 mb-4 d-flex align-items-center justify-content-center gap-2">
                            <i class="ti ti-info-circle fs-5"></i>
                            <span class="fw-semibold">This offer is valid for a limited time.</span>
                        </div>

                        <!-- Price Detail -->
                        <div class="price-display mb-4">
                            <span class="text-muted text-decoration-line-through me-2">₹{{ originalPrice.toLocaleString() }}</span>
                            <span class="text-primary fw-black fs-2">₹{{ discountedPrice.toLocaleString() }}</span>
                        </div>

                        <!-- Actions -->
                        <div class="d-flex flex-column gap-2 mt-4">
                            <button class="btn btn-pay-now py-3 fw-black shadow-sm" @click="initiatePayment" :disabled="isProcessing">
                                <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                                {{ isProcessing ? 'Processing...' : 'Pay Now & Reattempt' }}
                            </button>
                            <button class="btn btn-link text-muted text-decoration-none py-2" @click="showModal = false" :disabled="isProcessing">
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>

        <!-- Payment Success/Failure Notification -->
        <CommonAlert :show="alert.show" :title="alert.title" :message="alert.message" :type="alert.type" @close="alert.show = false" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const props = defineProps<{
    formData: any;
}>();

const showModal = ref(false);
const isProcessing = ref(false);

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

// ── Payment SDK Loaders ─────────────────────────────────────────────────
const loadCashfreeScript = () => {
    return new Promise((resolve) => {
        if ((window as any).Cashfree) { resolve(true); return; }
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if ((window as any).Razorpay) { resolve(true); return; }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const initiatePayment = async () => {
    isProcessing.value = true;
    try {
        const { userId } = useAuth();
        
        // 1. Create order on backend
        const res: any = await $fetch("/api/start-payment", {
            method: "POST",
            body: {
                user_id: userId.value,
                name: `${props.formData.first_name || ''} ${props.formData.last_name || ''}`.trim() || 'Applicant',
                email: props.formData.email,
                mobile: props.formData.mobile,
                city: props.formData.city,
                state: props.formData.state,
                payment_type: 'reattempt'
            }
        });

        if (!res.success) {
            throw new Error(res.message || "Payment initiation failed");
        }

        if (res.gateway === 'razorpay') {
            await handleRazorpayPayment(res);
        } else {
            await handleCashfreePayment(res);
        }

    } catch (err: any) {
        console.error("[REATTEMPT] Payment Error:", err);
        alert.show = true;
        alert.title = "Payment Failed";
        alert.message = err.message || "Something went wrong. Please try again.";
        alert.type = "error";
    } finally {
        isProcessing.value = false;
    }
};

const handleRazorpayPayment = async (res: any) => {
    const loaded = await loadRazorpayScript();
    if (!loaded || !(window as any).Razorpay) {
        throw new Error("Razorpay SDK failed to load");
    }

    const options = {
        key: res.key,
        amount: res.amount * 100,
        currency: res.currency,
        name: "KCGlobed GCC",
        description: `Reattempt Fee (${discountPercent.value}% Off)`,
        order_id: res.order_id,
        handler: async (response: any) => {
            try {
                await $fetch("/api/complete-payment", {
                    method: "POST",
                    body: {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    }
                });
                onPaymentSuccess();
            } catch (e) {
                console.error("[REATTEMPT] Razorpay Verification Error:", e);
                throw new Error("Payment verification failed. Please contact support.");
            }
        },
        prefill: {
            name: `${props.formData.first_name || ''} ${props.formData.last_name || ''}`.trim(),
            email: props.formData.email,
            contact: props.formData.mobile
        },
        theme: { color: "#872980" },
        modal: {
            ondismiss: () => { console.log("Razorpay dismissed"); }
        }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
};

const handleCashfreePayment = async (res: any) => {
    const loaded = await loadCashfreeScript();
    if (!loaded || !(window as any).Cashfree) {
        throw new Error("Cashfree SDK failed to load");
    }

    const cfMode = res.environment === 'PRODUCTION' ? 'production' : 'sandbox';
    const cashfree = (window as any).Cashfree({ mode: cfMode });

    await cashfree.checkout({
        paymentSessionId: res.payment_session_id,
        redirectTarget: "_modal"
    }).then(async (result: any) => {
        if (result.error) {
            throw new Error(result.error.message || "Cashfree payment failed");
        } else if (result.paymentDetails) {
            try {
                await $fetch("/api/complete-payment", {
                    method: "POST",
                    body: { cf_order_id: res.cf_order_id }
                });
                onPaymentSuccess();
            } catch (e) {
                console.error("[REATTEMPT] Cashfree Verification Error:", e);
                throw new Error("Payment verification failed. Please contact support.");
            }
        }
    });
};

const onPaymentSuccess = () => {
    showModal.value = false;
    alert.show = true;
    alert.title = "Success!";
    alert.message = "Payment successful. You can now reattempt the exam.";
    alert.type = "success";
    
    // Refresh page data or emit event
    setTimeout(() => {
        window.location.reload();
    }, 2000);
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

.icon-box {
    width: 48px;
    height: 48px;
    background: #fdf4ff;
    color: #872980;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
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

/* Modal Styling */
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
}

.custom-modal {
    background: #fff;
    width: 100%;
    max-width: 400px;
    border-radius: 28px;
    position: relative;
    overflow: hidden;
}

.modal-icon-header {
    display: flex;
    justify-content: center;
}

.icon-circle {
    width: 80px;
    height: 80px;
    background: #fdf4ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fw-black {
    font-weight: 900;
}

.text-primary {
    color: #872980 !important;
}

.offer-banner {
    background: #f0f9ff;
    color: #0369a1;
    font-size: 13px;
}

.price-display {
    display: flex;
    align-items: baseline;
    justify-content: center;
}

.btn-pay-now {
    background: linear-gradient(135deg, #872980, #6d1e67);
    color: #fff;
    border: none;
    border-radius: 16px;
    transition: all 0.3s ease;
}

.btn-pay-now:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(135, 41, 128, 0.3);
}

.btn-pay-now:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }
</style>
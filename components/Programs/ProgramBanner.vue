<template>
    <div class="hero-warp">
        <!-- Static First Slide (Above the Fold) -->
        <div v-if="banners.length" class="hero-slider-warp position-relative">
            <NuxtImg src="/img/banner/hero.webp" class="hero-bg-img" format="webp" quality="80" loading="eager"
                fetchpriority="high" />
            <div class="container-fluid position-relative" style="z-index: 2;">
                <div class="row align-items-stretch">
                    <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
                        <div class="program-hero-card h-100">
                            <div class="card-header">
                                <h2>Download Brochure</h2>
                                <p>Enter your details to receive the brochure instantly</p>
                            </div>

                            <form @submit.prevent="submitForm" class="registration-form">
                                <label for="fullName">Full Name*</label>
                                <div class="form-floating mb-2">

                                    <input type="text" class="form-control" id="fullName" v-model="form.name"
                                        placeholder="Enter your full name" :class="{ 'is-invalid': errors.name }">

                                    <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="emailAddress">Email Address*</label>
                                        <div class="form-floating mb-2">
                                            <input type="email" class="form-control" id="emailAddress"
                                                v-model="form.email" placeholder="Enter your email address"
                                                :class="{ 'is-invalid': errors.email }">
                                            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="phoneNumber">Phone Number*</label>
                                        <div class="form-floating mb-2">
                                            <input type="tel" class="form-control" id="phoneNumber"
                                                v-model="form.mobile" placeholder="Enter your phone number"
                                                :class="{ 'is-invalid': errors.mobile }">
                                            <div class="invalid-feedback" v-if="errors.mobile">{{ errors.mobile
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="state">State*</label>
                                        <div class="form-floating mb-2">
                                            <select class="form-select" id="state" v-model="form.state"
                                                @change="onStateChange" :class="{ 'is-invalid': errors.state }">
                                                <option value="" disabled>Select State</option>
                                                <option v-for="state in states" :key="state" :value="state">{{
                                                    state }}
                                                </option>
                                            </select>
                                            <div class="invalid-feedback" v-if="errors.state">{{ errors.state }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <label for="city">City*</label>
                                        <div class="form-floating mb-2">
                                            <select class="form-select" id="city" v-model="form.city"
                                                :class="{ 'is-invalid': errors.city }">
                                                <option value="" disabled>Select City</option>
                                                <option v-for="city in citiesList" :key="city" :value="city">{{
                                                    city }}
                                                </option>
                                            </select>
                                            <div class="invalid-feedback" v-if="errors.city">{{ errors.city }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" id="consent" v-model="form.consent"
                                        :class="{ 'is-invalid': errors.consent }">
                                    <label class="form-check-label" for="consent">
                                        Are you a Commerce Graduate with first division?
                                    </label>
                                    <div class="invalid-feedback" v-if="errors.consent">{{ errors.consent }}
                                    </div>
                                </div>

                                <!-- Step 1: Download Now button -->
                                <button v-if="!isDownloaded" type="submit" class="btn btn-primary w-100 register-btn"
                                    :disabled="isSubmitting">
                                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                                    {{ isSubmitting ? 'Processing...' : 'DOWNLOAD NOW' }}
                                </button>

                                <!-- Step 2: Pay Now button (shown after download) -->
                                <button v-else type="button" @click="handlePayment"
                                    class="btn btn-primary w-100 register-btn" :disabled="isPaymentInProgress">
                                    <span v-if="isPaymentInProgress"
                                        class="spinner-border spinner-border-sm me-2"></span>
                                    {{ isPaymentInProgress ? 'Opening Payment...' : 'PAY NOW' }}
                                </button>

                                <div v-if="notification.message"
                                    :class="['alert mt-3 mb-0 py-2 px-3 rounded-3 small', notification.type === 'success' ? 'alert-success' : 'alert-danger']"
                                    role="alert">
                                    <span v-if="notification.type === 'success'">✅</span>
                                    <span v-else>❌</span>
                                    {{ notification.message }}
                                </div>

                                <p class="form-footer-text">
                                    By submitting, you agree to our <a href="#">Terms</a> and <a href="#">Privacy
                                        Policy</a>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="program-info-section h-100 d-flex flex-column">
                            <div class="program-header-text">
                                <h1 class="program-title">
                                    AI-Enabled International Accounting<br>
                                    Professional Program (AEIAP)
                                </h1>
                                <p class="program-subtitle">
                                    A High-Impact Finance Career Program For GCC Industry
                                </p>
                            </div>

                            <div class="video-section">
                                <div class="video-wrapper">
                                    <template v-if="!banners[0].showVideo">
                                        <img src="https://storage.googleapis.com/static_files_backend/media/images/nitish%20sir%20thmbnl_.jpg"
                                            alt="Program Video" class="video-thumbnail">
                                        <div class="video-play-overlay">
                                            <div class="play-icon">
                                                <i class="ti ti-player-play-filled"></i>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Remaining Slides Lazy Loaded via Swiper -->
        <ClientOnly>
            <Swiper v-if="banners.length > 1" :loop="true" :effect="'fade'" :speed="500" :pagination="{
                el: '.swiper-pagination2',
                clickable: true,
            }" :modules="[SwiperEffectFade, SwiperPagination]" class="hero-slider">
                <SwiperSlide v-for="banner in banners.slice(1)" :key="banner.id">
                    <div class="hero-slider-warp position-relative">
                        <NuxtImg src="/img/banner/hero.webp" class="hero-bg-img" format="webp" quality="80"
                            loading="lazy" />
                        <div class="container-fluid position-relative" style="z-index: 2;">
                            <div class="row align-items-stretch">
                                <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
                                    <div class="program-hero-card h-100">
                                        <div class="card-header">
                                            <h2>Download Brochure</h2>
                                            <p>Enter your details to receive the brochure instantly</p>
                                        </div>

                                        <form @submit.prevent="submitForm" class="registration-form">
                                            <label for="fullName">Full Name*</label>
                                            <div class="form-floating mb-2">

                                                <input type="text" class="form-control" id="fullName"
                                                    v-model="form.name" placeholder="Enter your full name"
                                                    :class="{ 'is-invalid': errors.name }">

                                                <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label for="emailAddress">Email Address*</label>
                                                    <div class="form-floating mb-2">
                                                        <input type="email" class="form-control" id="emailAddress"
                                                            v-model="form.email" placeholder="Enter your email address"
                                                            :class="{ 'is-invalid': errors.email }">
                                                        <div class="invalid-feedback" v-if="errors.email">{{
                                                            errors.email }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="phoneNumber">Phone Number*</label>
                                                    <div class="form-floating mb-2">
                                                        <input type="tel" class="form-control" id="phoneNumber"
                                                            v-model="form.mobile" placeholder="Enter your phone number"
                                                            :class="{ 'is-invalid': errors.mobile }">
                                                        <div class="invalid-feedback" v-if="errors.mobile">{{
                                                            errors.mobile
                                                        }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label for="state">State*</label>
                                                    <div class="form-floating mb-2">
                                                        <select class="form-select" id="state" v-model="form.state"
                                                            @change="onStateChange"
                                                            :class="{ 'is-invalid': errors.state }">
                                                            <option value="" disabled>Select State</option>
                                                            <option v-for="state in states" :key="state" :value="state">
                                                                {{
                                                                    state }}
                                                            </option>
                                                        </select>
                                                        <div class="invalid-feedback" v-if="errors.state">{{
                                                            errors.state }}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <label for="city">City*</label>
                                                    <div class="form-floating mb-2">
                                                        <select class="form-select" id="city" v-model="form.city"
                                                            :class="{ 'is-invalid': errors.city }">
                                                            <option value="" disabled>Select City</option>
                                                            <option v-for="city in citiesList" :key="city"
                                                                :value="city">{{
                                                                    city }}
                                                            </option>
                                                        </select>
                                                        <div class="invalid-feedback" v-if="errors.city">{{ errors.city
                                                        }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="checkbox" id="consent"
                                                    v-model="form.consent" :class="{ 'is-invalid': errors.consent }">
                                                <label class="form-check-label" for="consent">
                                                    Are you a Commerce Graduate with first division?
                                                </label>
                                                <div class="invalid-feedback" v-if="errors.consent">{{ errors.consent }}
                                                </div>
                                            </div>

                                            <!-- Step 1: Download Now button -->
                                            <button v-if="!isDownloaded" type="submit"
                                                class="btn btn-primary w-100 register-btn" :disabled="isSubmitting">
                                                <span v-if="isSubmitting"
                                                    class="spinner-border spinner-border-sm me-2"></span>
                                                {{ isSubmitting ? 'Processing...' : 'DOWNLOAD NOW' }}
                                            </button>

                                            <!-- Step 2: Pay Now button (shown after download) -->
                                            <button v-else type="button" @click="handlePayment"
                                                class="btn btn-primary w-100 register-btn"
                                                :disabled="isPaymentInProgress">
                                                <span v-if="isPaymentInProgress"
                                                    class="spinner-border spinner-border-sm me-2"></span>
                                                {{ isPaymentInProgress ? 'Opening Payment...' : 'PAY NOW' }}
                                            </button>

                                            <div v-if="notification.message"
                                                :class="['alert mt-3 mb-0 py-2 px-3 rounded-3 small', notification.type === 'success' ? 'alert-success' : 'alert-danger']"
                                                role="alert">
                                                <span v-if="notification.type === 'success'">✅</span>
                                                <span v-else>❌</span>
                                                {{ notification.message }}
                                            </div>

                                            <p class="form-footer-text">
                                                By submitting, you agree to our <a href="#">Terms</a> and <a
                                                    href="#">Privacy
                                                    Policy</a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="program-info-section h-100 d-flex flex-column">
                                        <div class="program-header-text">
                                            <h1 class="program-title">
                                                AI-Enabled International Accounting<br>
                                                Professional Program (AEIAP)
                                            </h1>
                                            <p class="program-subtitle">
                                                A High-Impact Finance Career Program For GCC Industry
                                            </p>
                                        </div>

                                        <div class="video-section">
                                            <div class="video-wrapper">
                                                <template v-if="!banner.showVideo">
                                                    <img src="https://storage.googleapis.com/static_files_backend/media/images/nitish%20sir%20thmbnl_.jpg"
                                                        alt="Program Video" class="video-thumbnail">
                                                    <div class="video-play-overlay">
                                                        <div class="play-icon">
                                                            <i class="ti ti-player-play-filled"></i>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </ClientOnly>
    </div>

    <!-- Payment Status Modal -->
    <PaymentStatusModal :modal-id="statusModalId" :status="paymentStatus" :payment-id="paymentId" />
</template>

<style scoped>
/* Hero Section Styling */
.hero-warp {
    position: relative;
    min-height: 100vh;
}

.hero-bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 1;
}

.hero-slider-warp {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 100px;
    padding-top: 220px;
    overflow: hidden;
}

.hero-slider-warp .container-fluid {
    position: relative;
    z-index: 2;
}

/* Form Card Styling */
.program-hero-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 550px;
    margin: 0 auto;
}

.card-header {
    text-align: center;
    margin-bottom: 2rem;
}

.card-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #511970;
    margin-bottom: 0.5rem;
}

.card-header p {
    font-size: 0.95rem;
    color: #666;
    margin: 0;
}

/* Form Styling */
.registration-form {
    width: 100%;
}

.registration-form>label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.3rem;
    margin-top: 0.2rem;
}

.form-floating {
    margin-bottom: 1.2rem;
}

.form-floating>.form-control,
.form-floating>.form-select {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.85rem;
    padding: 0.6rem 0.9rem;
    background: #f8f9fa;
    transition: all 0.3s ease;
    height: auto;
}

.form-floating>.form-control::placeholder {
    color: #999;
    opacity: 1;
}

.form-floating>.form-select::placeholder {
    color: #999;
    opacity: 1;
}

.form-floating>.form-control:focus,
.form-floating>.form-select:focus {
    border-color: #6a1b9a;
    box-shadow: 0 0 0 0.15rem rgba(106, 27, 154, 0.1);
    background: #ffffff;
    outline: none;
}

.form-floating>label {
    display: none;
}

.form-floating>.form-select {
    padding-top: 0.85rem !important;
    padding-bottom: 0.85rem !important;
}

/* Checkbox Styling */
.form-check {
    padding-left: 1.8rem;
    margin-bottom: 1.5rem;
}

.form-check-input {
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.2rem;
    border: 2px solid #d0d0d0;
    cursor: pointer;
    transition: all 0.2s ease;
}

.form-check-input:checked {
    background-color: #6a1b9a;
    border-color: #6a1b9a;
}

.form-check-input:focus {
    box-shadow: 0 0 0 0.15rem rgba(106, 27, 154, 0.1);
}

.form-check-label {
    color: #555;
    font-size: 0.85rem;
    cursor: pointer;
    line-height: 1.5;
}

/* Register Button */
.register-btn {
    background: linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%);
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(106, 27, 154, 0.3);
    color: #ffffff;
}

.register-btn:hover {
    background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(106, 27, 154, 0.4);
}

.register-btn:active {
    transform: translateY(0);
}

/* Form Footer Text */
.form-footer-text {
    text-align: center;
    font-size: 0.75rem;
    color: #999;
    margin-top: 1.2rem;
    margin-bottom: 0;
}

.form-footer-text a {
    color: #6a1b9a;
    text-decoration: none;
    font-weight: 500;
}

.form-footer-text a:hover {
    text-decoration: underline;
}

/* Invalid Feedback */
.invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 0.3rem;
}

.is-invalid {
    border-color: #dc3545 !important;
}

.is-invalid:focus {
    box-shadow: 0 0 0 0.15rem rgba(220, 53, 69, 0.15) !important;
}

/* Program Info Section (Right Side) */
.program-info-section {
    color: #ffffff;
    padding: 2rem;
}

.program-header-text {
    margin-bottom: 2rem;
}

.program-title {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    line-height: 1.3;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.program-subtitle {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-weight: 400;
}

/* Video Section */
.video-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 350px;
}

.video-wrapper {
    position: relative;
    /* border-radius: 12px; */
    overflow: hidden;
    /* box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5); */
    transition: transform 0.3s ease;
    flex-grow: 1;
    height: 100%;
}

.video-thumbnail,
.video-element {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.video-wrapper:hover {
    transform: scale(1.02);
}

.video-thumbnail {
    width: 100%;
    height: auto;
    display: block;
}

.video-badge-4k {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.75);
    color: #ffffff;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 3;
}

.video-play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: rgba(0, 0, 0, 0.2); */
    cursor: pointer;
    transition: background 0.3s ease;
}


.play-icon {
    width: 65px;
    height: 65px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.video-play-overlay:hover .play-icon {
    background: #ffffff;
    transform: scale(1.1);
    box-shadow: 0 5px 20px rgba(255, 255, 255, 0.4);
}

.play-icon i {
    font-size: 1.8rem;
    color: #6a1b9a;
    margin-left: 3px;
}

.video-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
    padding: 2rem 1.5rem 1rem;
    z-index: 2;
}

.video-element {
    background: #000;
}

.speaker-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.3rem 0;
    letter-spacing: 1px;
}

.speaker-quote {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    font-weight: 400;
}

/* Responsive Design */
@media (max-width: 991px) {
    .program-hero-card {
        max-width: 100%;
        margin-bottom: 2rem;
    }

    .program-info-section {
        padding: 2rem 1rem;
    }

    .program-title {
        font-size: 1.7rem;
    }
}

@media (max-width: 767px) {
    .hero-slider-warp {
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .program-hero-card {
        padding: 2rem 1.5rem;
        border-radius: 15px;
    }

    .card-header h2 {
        font-size: 1.5rem;
    }

    .card-header p {
        font-size: 0.9rem;
    }

    .program-info-section {
        padding: 1.5rem 1rem;
    }

    .program-title {
        font-size: 1.4rem;
    }

    .program-subtitle {
        font-size: 0.95rem;
    }

    .play-icon {
        width: 55px;
        height: 55px;
    }

    .play-icon i {
        font-size: 1.5rem;
    }

    .hero-bg-img {
        display: none !important;
    }
}
</style>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, defineAsyncComponent } from "vue";
import statesCitiesData from "../../assets/states-cities.json";

import image1 from "../../assets/img/heros/hero_bg.svg";
import gccPdf from "../../assets/gcc.pdf";

export default defineComponent({
    name: "ProgramBanner",
    components: {
        PaymentStatusModal: defineAsyncComponent(() => import('~/components/Common/PaymentStatusModal.vue'))
    },
    setup() {
        const isSubmitting = ref(false);
        const isDownloaded = ref(false);
        const isPaymentInProgress = ref(false);
        const formId = ref<number | null>(null);
        const notification = reactive({ type: '', message: '' });
        const paymentStatus = ref<'success' | ''>('');
        const paymentId = ref('');
        const statusModalId = 'paymentStatusModal_programBanner';

        const form = reactive({
            name: "",
            mobile: "",
            email: "",
            state: "",
            city: "",
            consent: false,
        });

        const states = Object.keys(statesCitiesData);
        const citiesList = ref<string[]>([]);

        const errors = reactive({
            name: "",
            mobile: "",
            email: "",
            state: "",
            city: "",
            consent: ""
        });

        const banners = reactive([
            {
                id: 1,
                bgClass: "bg1",
                subTitle: "Cohort 2026 Applications Open",
                image: image1,
                heading: "World's 1st School Backed  by Industry, Built on Execution",
                description: "At GCC School, students don't wait for placements. They start with them. Learning is structured around real roles, real work, and real responsibility because capability is built on execution.",
                btnText: "Apply Now",
                btnLink: "/about-overview",
                btnTextTwo: "Download Brochure",
                btnLinkTwo: gccPdf,
                updateTitle: "View all latest news updates of Tuva",
                updateLink: "/blog",
                showVideo: false,
                informations: [
                    {
                        id: 1,
                        icon: "ti ti-world",
                        title: "Take A Tour",
                        link: "/schedule",
                    },
                    {
                        id: 2,
                        icon: "ti ti-info-hexagon",
                        title: "Campus Information",
                        link: "/about-campus",
                    },
                    {
                        id: 3,
                        icon: "ti ti-ballpen",
                        title: "Apply Now",
                        link: "/personal-information",
                    },
                ],
            }
        ]);

        const showNotification = (type: 'success' | 'error', message: string) => {
            notification.type = type;
            notification.message = message;
        };

        const openStatusModal = async (status: 'success', pid: string = '') => {
            paymentStatus.value = status;
            paymentId.value = pid;
            await nextTick();
            const el = document.getElementById(statusModalId);
            if (el) {
                const { Modal } = await import('bootstrap');
                new Modal(el).show();
            }
        };

        const onStateChange = () => {
            citiesList.value = (statesCitiesData as any)[form.state] || [];
            form.city = "";
        };

        const validateForm = () => {
            errors.name = "";
            errors.mobile = "";
            errors.email = "";
            errors.state = "";
            errors.city = "";
            errors.consent = "";

            if (!form.name.trim()) {
                errors.name = "Full name is required";
            }
            if (!form.email.trim()) {
                errors.email = "Email address is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                errors.email = "Please enter a valid email";
            }
            if (!form.mobile.trim()) {
                errors.mobile = "Phone number is required";
            }
            if (!form.state) {
                errors.state = "State is required";
            }
            if (!form.city) {
                errors.city = "City is required";
            }
            if (!form.consent) {
                errors.consent = "You must be a commerce graduate to proceed";
            }

            return Object.values(errors).every(error => error === "");
        };

        const submitForm = async () => {
            if (!validateForm()) return;

            isSubmitting.value = true;
            notification.message = '';

            try {
                const payload = {
                    full_name: form.name,
                    email: form.email,
                    phone: form.mobile,
                    state: form.state,
                    city: form.city
                };

                const config = useRuntimeConfig();
                const response: any = await $fetch(`${config.public.apiBase}/api/career/createdossierform`, {
                    method: "POST",
                    body: payload
                });
                if (response.success && response.data?.url) {
                    const fileUrl = response.data.url;
                    formId.value = response.data.id;
                    const fileName = fileUrl.split('/').pop() || 'Brochure.pdf';

                    // Download on same page via proxy
                    window.location.href = `/api/download?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(fileName)}`;
                    isDownloaded.value = true;
                    showNotification('success', 'Brochure downloaded! You can now proceed to pay the application fee.');
                } else {
                    showNotification('error', response.message || "Something went wrong. Please try again.");
                }
            } catch (error: any) {
                console.error("Submission Error:", error);
                showNotification('error', error.data?.message || "Server error. Please try again later.");
            } finally {
                isSubmitting.value = false;
            }
        };

        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                if ((window as any).Razorpay) {
                    resolve(true);
                    return;
                }
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const handlePayment = async () => {
            notification.message = '';
            notification.type = '';
            isPaymentInProgress.value = true;
            try {
                const res: any = await $fetch("/api/start-payment", {
                    method: "POST",
                    body: {
                        user_id: null,
                        name: form.name,
                        email: form.email,
                        mobile: form.mobile,
                        form_type: 2,
                        form_id: formId.value
                    }
                });

                if (!res.success) {
                    showNotification('error', res.message || 'Payment initiation failed');
                    return;
                }

                const loaded = await loadRazorpayScript();
                if (!loaded || !(window as any).Razorpay) {
                    alert("Razorpay SDK failed to load");
                    return;
                }

                const options = {
                    key: res.razorpay_key,
                    amount: res.amount,
                    currency: res.currency,
                    name: "Application Fee",
                    description: "NFET Application Payment",
                    order_id: res.razorpay_order_id,

                    handler: async function (response: any) {
                        await $fetch("/api/complete-payment", {
                            method: "POST",
                            body: {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            }
                        });

                        openStatusModal('success', response.razorpay_payment_id);

                        // Reset form after successful payment
                        form.name = '';
                        form.email = '';
                        form.mobile = '';
                        form.state = '';
                        form.city = '';
                        form.consent = false;
                        citiesList.value = [];
                        isDownloaded.value = false;
                        formId.value = null;
                        notification.message = '';
                        notification.type = '';
                    },

                    prefill: {
                        name: form.name,
                        email: form.email,
                        contact: form.mobile
                    },

                    theme: {
                        color: "#FBB03B"
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.on("payment.failed", async (response: any) => {
                    console.error("Payment Failed:", response.error);

                    try {
                        await $fetch("/api/report-payment-failure", {
                            method: "POST",
                            body: {
                                razorpay_order_id: res.razorpay_order_id,
                                razorpay_payment_id: response.error.metadata?.payment_id,
                                error_details: response.error
                            }
                        });
                    } catch (reportError) {
                        console.error("Failed to report payment failure:", reportError);
                    }
                });

                rzp.open();

            } catch (err) {
                console.error(err);
                showNotification('error', 'Payment initiation failed');
            } finally {
                isPaymentInProgress.value = false;
            }
        };

        return {
            form,
            errors,
            states,
            citiesList,
            banners,
            isSubmitting,
            isDownloaded,
            isPaymentInProgress,
            notification,
            paymentStatus,
            paymentId,
            statusModalId,
            onStateChange,
            validateForm,
            submitForm,
            handlePayment,
        };
    },
});
</script>

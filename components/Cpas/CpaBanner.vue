<template>
    <div class="hero-warp">
        <Swiper :loop="true" :effect="'fade'" :speed="2000" :pagination="{
            el: '.swiper-pagination2',
            clickable: true,
        }" :modules="[SwiperEffectFade, SwiperPagination]" class="hero-slider">
            <SwiperSlide v-for="banner in banners" :key="banner.id">
                <div class="hero-slider-warp" :style="{
                    'background-image': `url(${banner.image})`,
                }">
                    <div class="container-fluid">
                        <div class="row align-items-stretch">
                            <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
                                <div class="program-hero-card h-100">
                                    <div class="card-header">
                                        <h2>Download Brochure</h2>
                                        <p>Enter your details to receive the brochure instantly</p>
                                    </div>

                                    <form @submit.prevent="submitForm" class="registration-form">
                                        <label for="fullName" class="form-label fw-bold small">Full Name*</label>
                                        <div class="">

                                            <input type="text" ref="nameInput" class="form-control custom-input mb-2"
                                                id="fullName" v-model="form.name" placeholder="Enter your full name"
                                                :class="{ 'is-invalid': errors.name }"
                                                @input="form.name = form.name.replace(/[^a-zA-Z\s]/g, '')">
                                            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="emailAddress" class="form-label fw-bold small">Email
                                                    Address*</label>
                                                <div class="">
                                                    <input type="email" class="form-control custom-input mb-2"
                                                        id="emailAddress" v-model="form.email"
                                                        placeholder="Enter your email address"
                                                        :class="{ 'is-invalid': errors.email }">
                                                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label fw-bold small">Mobile Number*</label>
                                                <input type="tel" class="form-control custom-input mb-2"
                                                    v-model="form.mobile" placeholder="Enter mobile number"
                                                    :class="{ 'is-invalid': errors.mobile }">
                                                <div class="invalid-feedback" v-if="errors.mobile">{{ errors.mobile }}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- OTP verification input commented out -->
                                        <!--
                                        <div v-if="otpSent && !otpVerified" class="mb-2">
                                            <OtpVerification 
                                                v-model="form.mobile"
                                                v-model:verified="otpVerified"
                                                v-model:sent="otpSent"
                                                :show-phone="false"
                                                @error-clear="errors.mobile = ''"
                                            />
                                        </div>
                                        -->

                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="state" class="form-label fw-bold small">State/UT*</label>
                                                <div class="">
                                                    <select class="form-select custom-input mb-2" id="state"
                                                        v-model="form.state" @change="onStateChange"
                                                        :class="{ 'is-invalid': errors.state }">
                                                        <option value="" disabled>Select State</option>
                                                        <option v-for="state in states" :key="state" :value="state">{{
                                                            state }}</option>
                                                    </select>
                                                    <div class="invalid-feedback" v-if="errors.state">{{ errors.state }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <label for="city" class="form-label fw-bold small">City*</label>
                                                <div class="">
                                                    <select class="form-select custom-input mb-2" id="city"
                                                        v-model="form.city" :class="{ 'is-invalid': errors.city }">
                                                        <option value="" disabled>Select City</option>
                                                        <option v-for="city in citiesList" :key="city" :value="city">{{
                                                            city }}</option>
                                                    </select>
                                                    <div class="invalid-feedback" v-if="errors.city">{{ errors.city }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3 position-relative">
                                            <label class="form-label fw-bold small">University*</label>
                                            <div class="searchable-select">
                                                <input type="text" class="form-control custom-input mb-2"
                                                    v-model="searchQuery" placeholder="Search University..."
                                                    autocomplete="off" @focus="showUniDropdown = true"
                                                    @input="showUniDropdown = true">

                                                <div v-if="showUniDropdown && filteredUniversities.length > 0"
                                                    class="dropdown-list shadow-sm">
                                                    <div v-for="uni in filteredUniversities" :key="uni.id"
                                                        class="dropdown-item" @click="selectUni(uni)">
                                                        {{ uni.name }}
                                                    </div>
                                                </div>
                                            </div>

                                            <small class="text-danger" v-if="errors.university">
                                                {{ errors.university }}
                                            </small>
                                        </div>



                                        <!-- Step 1: Download Now button -->
                                        <div>
                                            <button type="submit" class="btn btn-primary w-100 register-btn"
                                                :disabled="isSubmitting">
                                                <span v-if="isSubmitting"
                                                    class="spinner-border spinner-border-sm me-2"></span>
                                                {{ isSubmitting ? 'Processing...' : 'DOWNLOAD NOW' }}
                                            </button>
                                            <p class="form-footer-text text-center mt-3 mb-0">
                                                By submitting, you agree to our <NuxtLink to="/terms-conditions">Terms
                                                </NuxtLink> and <NuxtLink to="/privacy-policy">Privacy Policy
                                                </NuxtLink>
                                            </p>
                                        </div>

                                        <div v-if="notification.message"
                                            :class="['alert mt-3 mb-0 py-2 px-3 rounded-3 small', notification.type === 'success' ? 'alert-success' : 'alert-danger']"
                                            role="alert">
                                            <span v-if="notification.type === 'success'">✅</span>
                                            <span v-else>❌</span>
                                            {{ notification.message }}
                                        </div>


                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 banner" @click="focusInput">
                                <img :src="HeroBanner" alt="hero-image" style="width: 80%;">
                            </div>
                        </div>

                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>


    <!-- Error/Success Alert Popup -->
    <CommonAlert :show="alertPopup.show" :title="alertPopup.title" :message="alertPopup.message" :type="alertPopup.type"
        @close="alertPopup.show = false" />

    <!-- Fee Waiver Modal -->
    <FeeWaiverModal v-if="showFeeWaiverModal" :dossierId="formId!" :userData="form"
        @close="showFeeWaiverModal = false" />

    <!-- 🎉 Referral Success Celebration Popup -->
    <Teleport to="body">
        <Transition name="celebration-fade">
            <div v-if="showCelebrationPopup" class="celebration-overlay" @click.self="showCelebrationPopup = false">
                <div class="celebration-card">
                    <!-- Confetti particles -->
                    <div class="confetti-container">
                        <span v-for="n in 40" :key="n" class="confetti-particle" :style="getConfettiStyle(n)"></span>
                    </div>

                    <!-- Close Button -->
                    <button class="celebration-close" @click="showCelebrationPopup = false">
                        <i class="ti ti-x"></i>
                    </button>

                    <!-- Content -->
                    <div class="celebration-content">
                        <div class="celebration-emoji">🎉</div>
                        <h2 class="celebration-title">Congratulations!</h2>

                        <div class="celebration-body">
                            <p>Your referral coupon has been applied successfully and your <strong>application fee has
                                    been
                                    waived off.</strong></p>

                            <div class="celebration-divider"></div>

                            <p>Your <strong>NFET login credentials and exam details</strong> have been sent to your
                                registered <strong>Email ID.</strong></p>
                            <!-- <p class="text-sm-muted">Please check your Inbox/Spam folder along with WhatsApp/SMS for further instructions.</p> -->

                            <div class="celebration-divider"></div>

                            <p class="celebration-referral-note">✨ You can also <strong>refer your friends</strong> and
                                earn
                                cashback rewards.</p>
                            <p class="text-sm-muted">Your unique referral code will be shared with you via Email, SMS,
                                and
                                WhatsApp shortly.</p>

                            <div class="celebration-divider"></div>

                            <p class="celebration-welcome">🏫 Welcome to <strong>GCC School</strong> — Your Gateway to
                                Global Finance Careers.</p>
                        </div>

                        <button class="celebration-cta" @click="handleCelebrationCta">
                            Got it, Continue <i class="ti ti-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* Hero Section Styling */
.hero-warp {
    position: relative;
    min-height: 100vh;
}

.hero-slider-warp {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 100px;
    padding-top: 220px;
}



.hero-slider-warp .container-fluid {
    position: relative;
    z-index: 2;
}

.banner {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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

.custom-input {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 14px;
    transition: all 0.3s ease;
}

/* Searchable Select Styles */
.searchable-select {
    position: relative;
    width: 100%;
}

.dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    z-index: 9999;
    margin-top: 4px;
}

.dropdown-item {
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    transition: background 0.2s ease;
}

.dropdown-item:hover {
    background-color: #f3e5f5;
    color: #6a1b9a;
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
    /* padding-left: 0; */
    margin-bottom: 1.5rem;
}

.custom-checkbox .form-check-input {
    width: 22px;
    height: 22px;
    margin-top: 0;
    border: 2px solid #000 !important;
    cursor: pointer;
    transition: all 0.2s ease;
}

.custom-checkbox .form-check-input:checked {
    background-color: #6a1b9a;
    border-color: #6a1b9a;
}

.custom-checkbox .form-check-input:focus {
    box-shadow: 0 0 0 0.15rem rgba(106, 27, 154, 0.1);
}

.custom-checkbox .form-check-label {
    color: #555;
    font-size: 0.85rem;
    cursor: pointer;
    line-height: 1.5;
    padding-left: 8px;
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
    width: 80px;
    height: 80px;
    background-color: #A13E99;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #ffffff;
    box-shadow: 0 0 0 0 rgba(161, 62, 153, 0.4);
    animation: pulse-play 2s infinite;
    transition: all 0.3s ease;
}

.video-play-overlay:hover .play-icon {
    transform: scale(1.1);
    background-color: #C436BE;
    color: #ffffff;
    animation: none;
}

.play-icon i {
    font-size: 30px;
    color: #ffffff;
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
}

@keyframes pulse-play {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(161, 62, 153, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 20px rgba(161, 62, 153, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(161, 62, 153, 0);
    }
}

/* Custom Tooltip styling */
.custom-tooltip-wrapper {
    position: relative;
    cursor: pointer;
    display: inline-block;
}

.custom-tooltip-content {
    visibility: hidden;
    opacity: 0;
    width: 260px;
    background-color: #A13E99;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    padding: 8px 12px;
    position: absolute;
    z-index: 1060;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: opacity 0.3s, visibility 0.3s;
    pointer-events: none;
    font-weight: normal;
    text-transform: none;
    /* Reset uppercase styling if any parent has it */
}

.custom-tooltip-content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #A13E99 transparent transparent transparent;
}

.custom-tooltip-wrapper:hover .custom-tooltip-content {
    visibility: visible;
    opacity: 1;
}

/* ─── Referral Input Group ─────────────────────────────────────────────── */
.referral-input-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.referral-field {
    flex: 1;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.referral-field.referral-verified {
    border-color: #28a745 !important;
    background-color: #f0fff4 !important;
    color: #155724;
}

.btn-apply-coupon {
    flex-shrink: 0;
    background: linear-gradient(135deg, #6a1b9a, #8e24aa);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
    letter-spacing: 0.5px;
}

.btn-apply-coupon:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(106, 27, 154, 0.4);
    filter: brightness(1.1);
}

.btn-apply-coupon:disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.referral-applied-badge {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    background: #d4edda;
    color: #155724;
    border: 1.5px solid #28a745;
    border-radius: 10px;
    padding: 9px 14px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    animation: badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes badge-pop {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.referral-success-msg {
    display: block;
    margin-top: 5px;
    font-size: 12.5px;
    animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ─── Celebration Overlay ──────────────────────────────────────────────── */
.celebration-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.celebration-card {
    position: relative;
    background: #fff;
    border-radius: 28px;
    max-width: 520px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(106, 27, 154, 0.35), 0 0 0 1px rgba(106, 27, 154, 0.08);
    animation: card-bounce-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes card-bounce-in {
    0% {
        transform: scale(0.6) translateY(40px);
        opacity: 0;
    }

    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 140px;
    overflow: hidden;
    pointer-events: none;
}

.confetti-particle {
    position: absolute;
    top: -20px;
    border-radius: 2px;
    animation: confetti-fall linear infinite;
    opacity: 0.85;
}

@keyframes confetti-fall {
    0% {
        transform: translateY(-20px) rotate(0deg);
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        transform: translateY(160px) rotate(540deg);
        opacity: 0;
    }
}

.celebration-close {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.08);
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    color: #555;
    transition: background 0.2s, transform 0.2s;
}

.celebration-close:hover {
    background: rgba(0, 0, 0, 0.15);
    transform: rotate(90deg);
}

.celebration-content {
    padding: 48px 36px 36px;
    text-align: center;
}

.celebration-emoji {
    font-size: 64px;
    line-height: 1;
    margin-bottom: 12px;
    display: block;
    animation: emoji-bounce 0.8s ease 0.3s both;
}

@keyframes emoji-bounce {
    0% {
        transform: scale(0) rotate(-30deg);
    }

    60% {
        transform: scale(1.25) rotate(10deg);
    }

    100% {
        transform: scale(1) rotate(0deg);
    }
}

.celebration-title {
    font-size: 1.9rem;
    font-weight: 800;
    background: linear-gradient(135deg, #6a1b9a, #8e24aa, #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
}

.celebration-body {
    text-align: left;
    font-size: 0.92rem;
    color: #444;
    line-height: 1.65;
}

.celebration-body p {
    margin-bottom: 8px;
}

.celebration-body strong {
    color: #511970;
}

.celebration-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #ddc0f0, transparent);
    margin: 14px 0;
}

.text-sm-muted {
    font-size: 0.82rem !important;
    color: #888 !important;
}

.celebration-referral-note {
    color: #6a1b9a;
    font-weight: 500;
}

.celebration-welcome {
    font-size: 0.95rem;
    color: #333;
    font-weight: 500;
}

.celebration-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    background: linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 14px 32px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(106, 27, 154, 0.35);
}

.celebration-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(106, 27, 154, 0.45);
    filter: brightness(1.08);
}

/* Transition */
.celebration-fade-enter-active,
.celebration-fade-leave-active {
    transition: opacity 0.35s ease;
}

.celebration-fade-enter-from,
.celebration-fade-leave-to {
    opacity: 0;
}

@media (max-width: 576px) {
    .celebration-content {
        padding: 44px 22px 28px;
    }

    .celebration-title {
        font-size: 1.5rem;
    }

    .celebration-emoji {
        font-size: 52px;
    }
}
</style>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, defineAsyncComponent, onMounted, onUnmounted, watch } from "vue";
import { isValidMobile } from "~/utils/validators";
import stateCityData from "~/state_city.json";
import universitiesList from "~/universities.json";
import selectUniversityList from "~/select-university.json";
import OtpVerification from '../Common/OtpVerification.vue';
import HeroBanner from '../../assets/img/CPA-img/hero_cpa.png';



import image1 from "../../assets/img/heros/hero_bg.svg";
import gccPdf from "../../assets/gcc.pdf";

export default defineComponent({
    name: "ProgramBanner",
    components: {

        CommonAlert: defineAsyncComponent(() => import('~/components/Common/CommonAlert.vue')),
        FeeWaiverModal: defineAsyncComponent(() => import('~/components/university-fee-wavier/FeeWaiverModal.vue')),
        OtpVerification
    },
    setup() {
        const isSubmitting = ref(false);
        const formId = ref<number | null>(null);
        const notification = reactive({ type: '', message: '' });
        const searchQuery = ref("");
        const showUniDropdown = ref(false);
        const showFeeWaiverModal = ref(false);

        const auth = useAuth();

        const alertPopup = reactive({
            show: false,
            title: '',
            message: '',
            type: 'error' as 'error' | 'success'
        });

        const nameInput = ref<HTMLInputElement | null>(null);

        const focusInput = (event?: Event) => {
            if (event?.currentTarget) {
                const container = (event.currentTarget as HTMLElement).closest('.hero-slider-warp');
                const input = container?.querySelector('#fullName') as HTMLInputElement | null;
                if (input) {
                    input.focus();
                    return;
                }
            }
            if (Array.isArray(nameInput.value)) {
                (nameInput.value[0] as HTMLInputElement | null)?.focus();
            } else {
                nameInput.value?.focus();
            }
        };

        const showAlert = (title: string, message: string, type: 'error' | 'success' = 'error') => {
            alertPopup.title = title;
            alertPopup.message = message;
            alertPopup.type = type;
            alertPopup.show = true;
        };

        const showCelebrationPopup = ref(false);

        const getConfettiStyle = (n: number) => {
            const colors = ['#8A2BE2', '#A13E99', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
            const color = colors[n % colors.length];
            const left = `${(n * 7.3 + 13) % 100}%`;
            const delay = `${(n * 0.13) % 3}s`;
            const duration = `${2.5 + (n * 0.11) % 2}s`;
            const size = `${6 + (n % 5) * 2}px`;
            return { left, animationDelay: delay, animationDuration: duration, background: color, width: size, height: size };
        };

        const handleCelebrationCta = () => {
            showCelebrationPopup.value = false;
            window.location.href = '/myaccount';
        };



        const form = reactive({
            name: "",
            mobile: "",
            email: "",
            state: "",
            city: "",
            university: "",
            consent: false
        });

        const route = useRoute();
        const utm_source = computed(() => (route.query.utm_source as string) || (useCookie('utm_source').value) || '');
        const utm_medium = computed(() => (route.query.utm_medium as string) || (useCookie('utm_medium').value) || '');
        const utm_campaign = computed(() => (route.query.utm_campaign as string) || (useCookie('utm_campaign').value) || '');

        const states = ref<string[]>([]);
        const citiesList = ref<string[]>([]);

        const universityList = ref([
            ...universitiesList
                .filter(name => !selectUniversityList.includes(name))
                .map((name, index) => ({ id: `u-${index}`, name, isHighlight: false })),
            ...selectUniversityList.map((name, index) => ({ id: `s-${index}`, name, isHighlight: true }))
        ]);

        const filteredUniversities = computed(() => {
            const query = searchQuery.value.trim().toLowerCase();
            if (!query) return universityList.value;
            return universityList.value
                .filter(u => u.name.toLowerCase().includes(query));
        });

        const selectUni = (uni: any) => {
            form.university = uni.name;
            searchQuery.value = uni.name;
            showUniDropdown.value = false;
        };

        const errors = reactive({
            name: "",
            mobile: "",
            email: "",
            state: "",
            city: "",
            consent: "",
            university: ""
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
                        link: "/login",
                    },
                ],
            }
        ]);

        const showNotification = (type: 'success' | 'error', message: string) => {
            notification.type = type;
            notification.message = message;
        };



        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.searchable-select')) {
                showUniDropdown.value = false;
            }
        };



        const onStateChange = () => {
            form.city = "";
        };

        const resetForm = () => {
            form.name = '';
            form.mobile = '';
            form.email = '';
            form.state = '';
            form.city = '';
            form.university = '';
            form.consent = false;
            searchQuery.value = '';
            showUniDropdown.value = false;
            citiesList.value = [];
            errors.name = "";
            errors.mobile = "";
            errors.email = "";
            errors.state = "";
            errors.city = "";
            errors.consent = "";
            errors.university = "";
            notification.message = "";
            notification.type = "";
            // Reset OTP state
            otpSent.value = false;
            otpVerified.value = false;
        };

        watch(() => form.state, (newState) => {
            if (!newState) {
                citiesList.value = [];
                return;
            }
            // Populate cities from local JSON and sort alphabetically
            const cities = (stateCityData as any)[newState] || [];
            citiesList.value = [...cities].sort((a, b) => a.localeCompare(b));
        });

        // --- OTP Verification State ---
        const otpSent = ref(false);
        const otpVerified = ref(false);

        onMounted(() => {
            // Populate states from local JSON and sort alphabetically
            window.addEventListener('click', handleClickOutside);
            const statesArr = Object.keys(stateCityData);
            states.value = statesArr.sort((a, b) => a.localeCompare(b));
        });

        onUnmounted(() => {
            window.removeEventListener('click', handleClickOutside);
        })

        const validateForm = () => {
            let isValid = true;
            errors.name = "";
            errors.mobile = "";
            errors.email = "";
            errors.state = "";
            errors.city = "";
            errors.consent = "";

            if (!form.name.trim()) {
                errors.name = "Full name is required";
            } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
                errors.name = "Name should contain only letters and spaces";
            }
            if (!form.email.trim()) {
                errors.email = "Email address is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                errors.email = "Please enter a valid email";
            }
            if (!form.mobile.trim()) {
                errors.mobile = "Phone number is required";
            } else if (!isValidMobile(form.mobile)) {
                errors.mobile = "Please enter a valid 10-digit mobile number";
            }
            if (!form.state) {
                errors.state = "State is required";
            }
            if (!form.city) {
                errors.city = "City is required";
            }
            if (!form.university) {
                errors.university = 'University is required';
                isValid = false;
            }
            /*
            if (!otpVerified.value) {
                if (!otpSent.value) {
                    errors.mobile = 'Please click "Verify" to receive an OTP';
                }
                isValid = false;
            }
            */


            return isValid && Object.values(errors).every(error => error === "");
        };


        const submitForm = async () => {
            if (!validateForm()) return;

            isSubmitting.value = true;
            notification.message = '';

            try {
                const config = useRuntimeConfig();


                const payload: any = {
                    full_name: form.name,
                    email: form.email,
                    phone: form.mobile,
                    state: form.state,
                    city: form.city,
                    source: 16,
                    source_form: 3,
                    utm_source: utm_source.value,
                    utm_medium: utm_medium.value,
                    utm_campaign: utm_campaign.value,
                    university: form.university
                };

                const response: any = await $fetch(`${config.public.apiBase}/api/career/createdossierform`, {
                    method: "POST",
                    body: payload
                });

                if (response.success) {
                    const link = document.createElement("a");

                    link.href = config.public.cpaPdfUrl;
                    link.target = "_blank";
                    link.download = "CPA Dossier.pdf";

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showNotification('success', 'Brochure downloaded successfully!');
                } else {
                    showNotification('error', response.message || "Something went wrong. Please try again.");
                }
            } catch (error: any) {
                console.error("Submission Error:", error);
                $fetch('/api/log-client-error', { method: 'POST', body: { context: 'ProgramBanner - submitForm', errorMessage: error?.data?.message || error?.message || 'Server error', errorData: error?.data || error?.message || String(error), userInfo: { email: form.email, phone: form.mobile, name: form.name } } }).catch(() => { });
                showNotification('error', error.data?.message || "Server error. Please try again later.");
            } finally {
                isSubmitting.value = false;
            }
        };


        return {
            HeroBanner,
            nameInput,
            focusInput,
            form,
            errors,
            states,
            citiesList,
            banners,
            isSubmitting,
            notification,
            alertPopup,
            onStateChange,
            resetForm,
            validateForm,
            submitForm,
            searchQuery,
            showUniDropdown,
            showFeeWaiverModal,
            filteredUniversities,
            selectUni,
            handleClickOutside,
            showCelebrationPopup,
            handleCelebrationCta,
            getConfettiStyle,
            // OTP
            otpSent,
            otpVerified
        };
    },
});
</script>

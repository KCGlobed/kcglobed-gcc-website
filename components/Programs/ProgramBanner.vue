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
                                        <label for="fullName">Full Name*</label>
                                        <div class="form-floating mb-3">

                                            <input type="text" class="form-control" id="fullName" v-model="form.name"
                                                placeholder="Enter your full name"
                                                :class="{ 'is-invalid': errors.name }">

                                            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                                        </div>

                                        <label for="emailAddress">Email Address*</label>
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="emailAddress"
                                                v-model="form.email" placeholder="Enter your email address"
                                                :class="{ 'is-invalid': errors.email }">
                                            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                                        </div>

                                        <label for="phoneNumber">Phone Number*</label>
                                        <div class="form-floating mb-3">
                                            <input type="tel" class="form-control" id="phoneNumber"
                                                v-model="form.mobile" placeholder="Enter your phone number"
                                                :class="{ 'is-invalid': errors.mobile }">
                                            <div class="invalid-feedback" v-if="errors.mobile">{{ errors.mobile }}</div>
                                        </div>

                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="consent"
                                                v-model="form.consent" :class="{ 'is-invalid': errors.consent }">
                                            <label class="form-check-label" for="consent">
                                                Are you a Commerce Graduate with GICS (Grade)?
                                            </label>
                                            <div class="invalid-feedback" v-if="errors.consent">{{ errors.consent }}
                                            </div>
                                        </div>

                                        <button type="submit" class="btn btn-primary w-100 register-btn"
                                            :disabled="isSubmitting">
                                            <span v-if="isSubmitting"
                                                class="spinner-border spinner-border-sm me-2"></span>
                                            {{ isSubmitting ? 'Processing...' : 'Download Now' }}
                                        </button>

                                        <p class="form-footer-text">
                                            By submitting, you agree to our <a href="#">Terms</a> and <a
                                                href="#">Privacy Policy</a>
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
                                        <div class="video-wrapper" @click="banner.showVideo = true">
                                            <template v-if="!banner.showVideo">
                                                <img src="~/assets/img/programs/nitish.jpeg" alt="Program Video"
                                                    class="video-thumbnail">
                                                <!-- <div class="video-badge-4k">
                                                    4k
                                                </div> -->
                                                <div class="video-play-overlay">
                                                    <div class="play-icon">
                                                        <i class="ti ti-player-play-filled"></i>
                                                    </div>
                                                </div>
                                                <!-- <div class="video-caption">
                                                    <p class="speaker-name">GCC SCHOOL</p>
                                                    <p class="speaker-quote">LMS TUTORIAL & OVERVIEW</p>
                                                </div> -->
                                            </template>
                                            <video v-else controls autoplay class="video-element w-100 h-100">
                                                <source
                                                    src="https://storage.googleapis.com/gcc_static_files_backend/static/videos/lms_tutorial.mp4"
                                                    type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
    <!-- <div class="modal fade" id="enquiryModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">GCC School – Enquiry Form</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">

                </div>
            </div>
        </div>
    </div> -->
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
    font-size: 1.75rem;
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
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.5rem;
    margin-top: 0.3rem;
}

.form-floating {
    margin-bottom: 1.2rem;
}

.form-floating>.form-control,
.form-floating>.form-select {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.95rem;
    padding: 0.85rem 1rem;
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
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
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
    font-size: 0.8rem;
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

.video-play-overlay:hover {
    /* background: rgba(0, 0, 0, 0.3); */
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
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import image1 from "../../assets/img/heros/hero_bg.svg";
import gccPdf from "../../assets/gcc.pdf";

export default defineComponent({
    name: "ProgramBanner",
    methods: {
        validateForm() {
            this.errors = {
                name: "",
                mobile: "",
                email: "",
                consent: ""
            }

            if (!this.form.name.trim()) {
                this.errors.name = "Full name is required"
            }
            if (!this.form.email.trim()) {
                this.errors.email = "Email address is required"
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
                this.errors.email = "Please enter a valid email"
            }
            if (!this.form.mobile.trim()) {
                this.errors.mobile = "Phone number is required"
            }
            if (!this.form.consent) {
                this.errors.consent = "You must be a commerce graduate to proceed"
            }

            return Object.values(this.errors).every(error => error === "")
        },

        async submitForm() {
            if (!this.validateForm()) return

            this.isSubmitting = true;

            try {
                // Prepare payload for API
                const payload = {
                    full_name: this.form.name,
                    email: this.form.email,
                    phone: this.form.mobile
                };

                const windowOpen: any = window.open("", '_blank');

                const response: any = await $fetch("https://gccwebsite-admin-backend-738131651355.asia-south1.run.app/api/career/createdossierform", {
                    method: "POST",
                    body: payload
                });

                if (response.success && response.data?.url) {
                    windowOpen.location.href = response.data?.url;

                    // Reset form
                    this.form = {
                        name: "",
                        mobile: "",
                        email: "",
                        consent: false
                    };
                } else {
                    if (windowOpen) windowOpen.close();
                    alert(response.message || "Something went wrong. Please try again.");
                }
            } catch (error: any) {
                console.error("Submission Error:", error);
                alert(error.data?.message || "Server error. Please try again later.");
            } finally {
                this.isSubmitting = false;
            }
        }
    },
    data() {
        return {
            isSubmitting: false,
            form: {
                name: "",
                mobile: "",
                email: "",
                consent: false,
            },
            errors: {
                name: "",
                mobile: "",
                email: "",
                consent: ""
            },
            banners: [
                {
                    id: 1,
                    bgClass: "bg1",
                    subTitle: "Cohort 2026 Applications Open",
                    image: image1,
                    heading: "World’s 1st School Backed  by Industry, Built on Execution",
                    description: "At GCC School, students don’t wait for placements. They start with them. Learning is structured around real roles, real work, and real responsibility because capability is built on execution.",
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
            ],
        };
    },
});
</script>

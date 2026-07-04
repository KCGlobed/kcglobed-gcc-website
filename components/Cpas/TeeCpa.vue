<template>
    <section class="teee-area ptb-100 bg-white">
        <div class="container">
            <!-- Section Header -->
            <div class="section-title text-center mb-60">
                <h2 class="title">EXPERIENCE EDUCATIONAL <span class="highlight">EXCELLENCE </span>
                </h2>
                <p class="text-center">With TEEE – Tailored Education for Enhanced Efficiency</p>
            </div>

            <!-- Hero Mockup Section -->
            <!-- Books Section -->
            <div class="books-section mb-60">
                <div class="books-grid">

                    <div v-for="(book, index) in books" :key="index" class="book-card">
                        <div class="book-image-box">
                            <img :src="book.image" :alt="book.title" loading="lazy" decoding="async" />
                        </div>

                        <div class="book-info">
                            <h3 class="book-title">
                                {{ book.title }}
                            </h3>

                            <p class="book-subtitle">
                                {{ book.subtitle }}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Steps Grid -->
            <div class="row g-4">
                <div v-for="(step, index) in steps" :key="index" class="col-lg-6">
                    <div :class="['step-card h-100', step.colorClass]">
                        <div class="step-header d-flex align-items-center mb-3">
                            <div class="icon-wrapper position-relative me-3">
                                <div class="step-icon">
                                    <i :class="step.icon"></i>
                                </div>
                                <span class="step-number">{{ step.number }}</span>
                            </div>
                            <h3 class="step-title mb-0">{{ step.title }}</h3>
                        </div>
                        <div class="step-body">
                            <p class="step-desc text-muted mb-4">{{ step.desc }}</p>
                            <div class="step-footer">
                                <i :class="['ti me-2', step.footerIcon]"></i>
                                <span class="footer-tag font-bold uppercase">{{ step.footerTag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import cpaAud from "@/assets/img/books/CPA_AUD.jpg";
import cpaBar from "@/assets/img/books/CPA_BAR.jpg";
import cpaFar from "@/assets/img/books/CPA_FAR.jpg";
import cpaIsc from "@/assets/img/books/CPA_ISC.jpg";
import cpaReg from "@/assets/img/books/CPA_REG.jpg";
import cpaTcp from "@/assets/img/books/CPA_TCP.jpg";

const books = [
    {
        title: "CPA AUD",
        subtitle: "CPA & CA KAMAL CHHABRA",
        image: cpaAud
    },
    {
        title: "CPA FAR",
        subtitle: "CPA & CA KAMAL CHHABRA",
        image: cpaFar
    },
    {
        title: "CPA REG",
        subtitle: "CPA & CA KAMAL CHHABRA",
        image: cpaReg
    },
    {
        title: "CPA BAR",
        subtitle: "CPA & CA KAMAL CHHABRA",
        image: cpaBar
    },
    {
        title: "CPA ISC",
        subtitle: "CPA & CA KAMAL CHHABRA",
        image: cpaIsc
    },
    {
        title: "CPA TCP",
        subtitle: "CPA & CA KAMAL CHHABRA",
        image: cpaTcp
    }
];


const steps = [
    {
        number: "01",
        title: "Pre-prep Assessment",
        desc: "Begin with a comprehensive diagnostic test to establish your baseline knowledge and identify your unique learning style before diving into the material.",
        icon: "ti ti-clipboard-list",
        footerTag: "Foundation Analysis",
        footerIcon: "ti-circle-check",
        colorClass: "gray-step"
    },
    {
        number: "02",
        title: "Identify Strong & Weak Areas",
        desc: "Our advanced AI analyzes your assessment results to pinpoint exactly where you excel and where targeted intervention will yield the greatest improvement.",
        icon: "ti ti-search",
        footerTag: "Precision Mapping",
        footerIcon: "ti-target",
        colorClass: "orange-step"
    },
    {
        number: "03",
        title: "Tailored Study Plan",
        desc: "Receive a fully customized curriculum that strategically targets your weak points while reinforcing strengths, adapting dynamically as you progress.",
        icon: "ti ti-settings",
        footerTag: "Adaptive Learning",
        footerIcon: "ti-refresh",
        colorClass: "green-step"
    },
    {
        number: "04",
        title: "Up to 70% Time Saved",
        desc: "By focusing exclusively on what matters most, you achieve mastery faster than traditional methods. No wasted effort—just efficient, targeted learning.",
        icon: "ti ti-clock",
        footerTag: "Maximum Efficiency",
        footerIcon: "ti-arrow-up-right",
        colorClass: "blue-step"
    }
];

</script>

<style scoped>
.teee-area {
    padding-top: 50px;
    padding-bottom: 50px;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 20px;
    text-transform: uppercase;
    position: relative;
}

.title::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    background: #F1A63E;
    margin: 15px auto 0;
    border-radius: 10px;
}

.highlight,
.text-orange {
    color: #f1a63e;
}

/* Hero Mockup Styles */
.hero-mockup-wrapper {
    margin: 40px auto;
    width: 100%;
}

.mockup-container {
    position: relative;
    width: 100%;
    /* max-width: 1000px; */
    /* Limit width within col-12 for better presentation */
}

.image-frame img {
    width: 100%;
    height: auto;
    display: block;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
}

.floating-badge {
    position: absolute;
    background: #fff;
    padding: 12px 25px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    z-index: 10;
    min-width: 150px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.floating-badge.top-right {
    top: -20px;
    right: -10px;
}

.floating-badge.bottom-left {
    bottom: -20px;
    left: -10px;
}

.badge-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    color: #fff;
}

.green-bg {
    background-color: #2ecc71;
}

.blue-bg {
    background-color: #3498db;
}

.badge-text {
    display: flex;
    flex-direction: column;
}

.badge-text .count {
    font-size: 18px;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1;
}

.badge-text .label {
    font-size: 11px;
    color: #777;
    font-weight: 500;
}

/* Step Card Styles */
.step-card {
    padding: 40px;
    border-radius: 20px;
    border: 1px solid transparent;
    transition: all 0.3s ease;
}

.step-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.icon-wrapper {
    width: 60px;
    height: 60px;
}

.step-icon {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: #fff;
}

.step-number {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #fff;
    border: 2px solid;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
}

.step-title {
    font-size: 24px;
    font-weight: 800;
    color: #1d2050;
}

.step-desc {
    font-size: 16px;
    line-height: 1.6;
}

.step-footer {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
}

/* Color Themes */
.gray-step {
    background-color: #f8f9fa;
    border-color: #eee;
}

.gray-step .step-icon {
    background-color: #4b5563;
}

.gray-step .step-number {
    border-color: #4b5563;
    color: #4b5563;
}

.gray-step .footer-tag {
    color: #4b5563;
}

.orange-step {
    background-color: #fffcf0;
    border-color: #ffeeb3;
}

.orange-step .step-icon {
    background-color: #f39c12;
}

.orange-step .step-number {
    border-color: #f39c12;
    color: #f39c12;
}

.orange-step .footer-tag {
    color: #d35400;
}

.green-step {
    background-color: #f0fff4;
    border-color: #c6f6d5;
}

.green-step .step-icon {
    background-color: #27ae60;
}

.green-step .step-number {
    border-color: #27ae60;
    color: #27ae60;
}

.green-step .footer-tag {
    color: #27ae60;
}

.blue-step {
    background-color: #ebf8ff;
    border-color: #bee3f8;
}

.blue-step .step-icon {
    background-color: #3498db;
}

.blue-step .step-number {
    border-color: #3498db;
    color: #3498db;
}

.blue-step .footer-tag {
    color: #2980b9;
}

@media (max-width: 991px) {
    .main-title {
        font-size: 24px;
    }

    .floating-badge {
        padding: 8px 15px;
        min-width: 110px;
    }

    .floating-badge.top-right {
        right: 0;
    }

    .floating-badge.bottom-left {
        left: 0;
    }
}

@media (max-width: 575px) {
    .teee-area {
        padding-top: 40px;
        padding-bottom: 40px;
    }

    .section-title {
        margin-bottom: 30px;
    }

    .hero-mockup-wrapper {
        margin: 0px;
    }

    .title {
        font-size: 24px;
        line-height: 32px;
    }

    .step-card {
        padding: 30px 20px;
    }

    .step-title {
        font-size: 20px;
    }

    .floating-badge {
        position: relative;
        margin: 10px auto;
        right: 0 !important;
        left: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
    }
}

/* =====================================
   CPA BOOKS SECTION
===================================== */

.books-section {
    width: 100%;
    margin: 40px auto 60px;
}

.books-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 80px;
    row-gap: 45px;
}


/* Individual Book Card */

.book-card {
    width: 100%;
    text-align: center;
}


/* Image Box */

.book-image-box {
    width: 100%;
    height: 330px;

    background: linear-gradient(135deg,
            #f5f5f5 0%,
            #eceeef 100%);

    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
}


/* Book Image */

.book-image-box img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;

    display: block;

    transition: transform 0.35s ease;
}


/* Optional subtle hover */

.book-card:hover .book-image-box img {
    transform: scale(1.03);
}


/* Book Information */

.book-info {
    padding-top: 20px;
}


/* Book Title */

.book-title {
    color: #27364d;

    font-size: 25px;
    line-height: 1.2;
    font-weight: 700;

    margin: 0 0 10px;

    text-transform: uppercase;
}


/* Subtitle */

.book-subtitle {
    color: #9b9b9b;

    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;

    margin: 0;

    text-transform: uppercase;
    letter-spacing: 0.2px;
}


/* =====================================
   TABLET
===================================== */

@media (max-width: 991px) {

    .books-grid {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 35px;
        row-gap: 40px;
    }

    .book-image-box {
        height: 300px;
    }

    .book-title {
        font-size: 23px;
    }
}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 575px) {

    .books-section {
        margin: 20px auto 40px;
    }

    .books-grid {
        grid-template-columns: 1fr;
        row-gap: 35px;
    }

    .book-image-box {
        height: auto;
        aspect-ratio: 1 / 1;
    }

    .book-info {
        padding-top: 15px;
    }

    .book-title {
        font-size: 22px;
        margin-bottom: 7px;
    }

    .book-subtitle {
        font-size: 13px;
    }
}
</style>

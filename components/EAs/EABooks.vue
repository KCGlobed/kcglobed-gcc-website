<template>
    <section class="teee-area ptb-100 bg-white">
        <div class="container">
            <!-- Section Header -->
            <div class="section-title text-center mb-60">
                <h2 class="title">EXPERIENCE EDUCATIONAL <span class="highlight">EXCELLENCE </span>
                </h2>
                <p class="text-center">With TEEE – Tailored Education for Enhanced Efficiency</p>
            </div>

            <!-- Book Cards Section -->
            <div class="row g-4 justify-content-center mb-30">
                <img src="../../assets/img/books/EA-book.png" alt="books" style="width: 80%; border-radius: 40px; ">
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

/* Book Cards Section Styles */
.book-card {
    text-align: center;
    /* background: #ffffff; */
    /* padding: 30px 24px; */
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.book-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.book-image-wrapper {
    overflow: hidden;
    border-radius: 15px;
    /* margin-bottom: 14px; */
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
}

.book-image-wrapper img {
    max-height: 260px;
    object-fit: contain;
    transition: transform 0.5s ease;
}

.book-card:hover .book-image-wrapper img {
    transform: scale(1.06);
}

.book-title {
    font-size: 20px;
    font-weight: 800;
    color: #1d2050;
    margin-bottom: 10px;
}

.book-subtitle {
    font-size: 15px;
    color: #64748b;
    font-weight: 600;
    margin-bottom: 10;
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
    .book-image-wrapper {
        min-height: 280px;
        padding: 20px;
    }
    
    .book-image-wrapper img {
        max-height: 220px;
    }

    .book-title {
        font-size: 18px;
    }
}

@media (max-width: 767px) {
    .teee-area {
        padding-top: 40px;
        padding-bottom: 40px;
    }

    .section-title {
        margin-bottom: 30px;
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

    .book-image-wrapper {
        min-height: 260px;
        padding: 15px;
    }

    .book-image-wrapper img {
        max-height: 200px;
    }
}
</style>

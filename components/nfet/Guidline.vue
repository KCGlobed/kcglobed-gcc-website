<template>
    <section class="guidelines-section py-5">
        <div class="container">
            <!-- Heading -->
            <div class="text-center mb-4">
                <h2 class="fw-bold">Application & Examination Guidelines</h2>
                <p class="text-muted small">
                    Everything you need to know before applying
                </p>
            </div>

            <!-- Card -->
            <div class="card border-0 shadow-lg main-card mx-auto">
                <div class="card-body p-4 p-md-5">

                    <p class="small text-muted mb-4">
                        <strong>(An Assessment Powered by Aon)</strong><br />
                        NFET is conducted on a secure AI-enabled platform with live human supervision
                        to ensure a fair and transparent assessment for B.Com First Division graduates.
                    </p>

                    <!-- Accordion -->
                    <div class="accordion-wrapper">

                        <!-- Eligibility -->
                        <div class="accordion-item" :class="{ open: openIndex === 0 }">
                            <button class="accordion-header" @click="toggle(0)">
                                <span class="header-left">
                                    <span class="icon-circle purple-bg">●</span>
                                    <span class="header-title purple">Eligibility</span>
                                </span>
                                <span class="chevron" :class="{ rotated: openIndex === 0 }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                            </button>
                            <div class="accordion-body">
                                <ul class="list-style">
                                    <li>B.Com graduates with <strong>First Division.</strong></li>
                                    <li>Indian Citizen</li>
                                    <li>Born after Jan 1, 1996</li>
                                    <li><strong>Valid photo ID required.</strong></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Registration Process -->
                        <div class="accordion-item" :class="{ open: openIndex === 1 }">
                            <button class="accordion-header" @click="toggle(1)">
                                <span class="header-left">
                                    <span class="icon-circle purple-bg">●</span>
                                    <span class="header-title purple">Registration Process</span>
                                </span>
                                <span class="chevron" :class="{ rotated: openIndex === 1 }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                            </button>
                            <div class="accordion-body">
                                <ul class="list-style">
                                    <li>Fill the online application form.</li>
                                    <li>Select your preferred exam date & time.</li>
                                    <li>
                                        Registration is confirmed after
                                        <strong>successful fee payment.</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Exam Mode -->
                        <div class="accordion-item" :class="{ open: openIndex === 2 }">
                            <button class="accordion-header" @click="toggle(2)">
                                <span class="header-left">
                                    <span class="icon-circle purple-bg">●</span>
                                    <span class="header-title purple">Exam Mode (AI Proctored)</span>
                                </span>
                                <span class="chevron" :class="{ rotated: openIndex === 2 }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                            </button>
                            <div class="accordion-body">
                                <ul class="list-style">
                                    <li>
                                        Exam is conducted online with
                                        <strong>AI monitoring + live supervision.</strong>
                                    </li>
                                    <li>
                                        Use a <strong>laptop/desktop with webcam & microphone</strong>
                                        (mobile not allowed).
                                    </li>
                                    <li>Stable internet connection required.</li>
                                    <li>Sit in a quiet, well-lit room alone.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Subjects Covered -->
                        <div class="accordion-item" :class="{ open: openIndex === 3 }">
                            <button class="accordion-header" @click="toggle(3)">
                                <span class="header-left">
                                    <span class="icon-circle purple-bg">●</span>
                                    <span class="header-title purple">Subjects Covered</span>
                                </span>
                                <span class="chevron" :class="{ rotated: openIndex === 3 }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                            </button>
                            <div class="accordion-body">
                                <ul class="list-style">
                                    <li>Accounting</li>
                                    <li>Audit</li>
                                    <li>Finance</li>
                                    <li>Business & Economics</li>
                                    <li>English</li>
                                    <li>Aptitude & Analytical Skills</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Important Instructions -->
                        <div class="accordion-item" :class="{ open: openIndex === 4 }">
                            <button class="accordion-header" @click="toggle(4)">
                                <span class="header-left">
                                    <span class="icon-circle orange-bg">●</span>
                                    <span class="header-title orange">Important Instructions</span>
                                </span>
                                <span class="chevron orange" :class="{ rotated: openIndex === 4 }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                            </button>
                            <div class="accordion-body">
                                <ul class="list-style">
                                    <li>Login 15 minutes before your exam time.</li>
                                    <li>No books, notes, or other devices allowed.</li>
                                    <li>Stay visible on camera throughout the exam.</li>
                                    <li>Any unfair practice may lead to disqualification.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <!-- End Accordion -->

                    <!-- Bottom Highlight Box -->
                    <div class="info-box mt-4">
                        NFET ensures a <strong>fair, professional, and industry-standard evaluation</strong>
                        to shortlist capable candidates for future CGC career opportunities.
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const openIndex = ref(0); // Eligibility open by default

function toggle(index) {
    openIndex.value = openIndex.value === index ? null : index;
}
</script>

<style scoped>
.guidelines-section {
    background: #f4f5f9;
}

.main-card {
    max-width: 720px;
    border-radius: 16px;
    background: #ffffff;
}

/* Accordion */
.accordion-wrapper {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
}

.accordion-item {
    border-bottom: 1px solid #e5e7eb;
}

.accordion-item:last-child {
    border-bottom: none;
}

.accordion-header {
    width: 100%;
    background: #fff;
    border: none;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background 0.2s ease;
    text-align: left;
}

.accordion-header:hover {
    background: #faf5ff;
}

.accordion-item.open .accordion-header {
    background: #faf5ff;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.header-title {
    font-weight: 600;
    font-size: 15px;
}

.chevron {
    color: #6f42c1;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
}

.chevron.rotated {
    transform: rotate(180deg);
}

.chevron.orange {
    color: #f97316;
}

/* Accordion body slide animation */
.accordion-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, padding 0.35s ease;
    padding: 0 18px;
}

.accordion-item.open .accordion-body {
    max-height: 400px;
    padding: 4px 18px 16px;
}

/* Colors */
.purple {
    color: #6f42c1;
}

.orange {
    color: #f97316;
}

.icon-circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    flex-shrink: 0;
}

.purple-bg {
    background: #ede9fe;
    color: #6f42c1;
}

.orange-bg {
    background: #ffe7d6;
    color: #f97316;
}

.list-style {
    padding-left: 18px;
    margin: 0;
}

.list-style li {
    margin-bottom: 6px;
    font-size: 14px;
    color: #555;
}

.info-box {
    background: #f3e8ff;
    padding: 14px;
    border-radius: 10px;
    font-size: 14px;
    color: #4c1d95;
    border: 1px solid #e9d5ff;
}

@media (max-width: 768px) {
    .guidelines-section {
        padding: 40px 0px;
    }
}
</style>
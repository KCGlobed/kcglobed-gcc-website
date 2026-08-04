<template>
    <div class="think-tank-area ptb-100">
        <div class="container-fluid w">
            <div class="row align-items-center g-5">
                <!-- Left Side: Think Tank Cards -->
                <div class="col-lg-6 col-12 order-lg-1 order-2">
                    <div class="row g-2 justify-content-center">
                        <div v-for="(img, index) in images" :key="index" class="col-sm-3 col-6">
                            <div class="think-card">
                                <img :src="img" alt="Think Tank Member" class="img-fluid" loading="lazy" decoding="async">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side: Content Block -->
                <div class="col-lg-6 col-12 order-lg-2 order-1">
                    <div class="content-box text-start">
                        <span class="eyebrow">THE THINK TANK</span>
                        <h2 class="title mt-2">Guided By An Industry<br class="d-none d-md-block" /> Think Tank.</h2>
                        <p class="desc mt-3">
                            Building 9B, DLF Cyber City, Gurugram, surrounded by the very companies you are training to join. That proximity is not a perk. It is part of how we prepare you.
                        </p>

                        <ul class="feature-list mt-4 p-0">
                            <li class="d-flex align-items-start gap-2 mb-3">
                                <i class="ti ti-check text-teal-check fs-5 mt-1"></i>
                                <span class="feature-text">Curriculum shaped by real GCC and MNC hiring needs</span>
                            </li>
                            <li class="d-flex align-items-start gap-2 mb-3">
                                <i class="ti ti-check text-teal-check fs-5 mt-1"></i>
                                <span class="feature-text">A direct line to the employers who hire our cohorts</span>
                            </li>
                            <li class="d-flex align-items-start gap-2 mb-3">
                                <i class="ti ti-check text-teal-check fs-5 mt-1"></i>
                                <span class="feature-text">Continuously updated for AI and industry shifts</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import img1 from "/mentor/1.svg";
import img2 from "/mentor/2.svg";
import img3 from "/mentor/4.svg";
import img6 from "/mentor/3.svg";

const images = [
    img1,
    img2,
    img6,
    img3
];
</script>

<style scoped>
.think-tank-area {
    background: #ffffff;
}

.content-box {
    padding-left: 15px;
}

.eyebrow {
    color: #D5861B;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    display: block;
}

.title {
    font-size: 42px;
    font-weight: 800;
    color: #130922;
    line-height: 1.2;
}

.desc {
    font-size: 15px;
    color: #555555;
    line-height: 1.6;
}

.feature-list {
    list-style: none;
}

.feature-text {
    font-size: 15px;
    color: #333333;
    font-weight: 600;
    line-height: 1.4;
}

.text-teal-check {
    color: #0D9488 !important;
    font-weight: 900;
}

.think-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.think-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.think-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

@media (max-width: 1199px) {
    .title {
        font-size: 34px;
    }
}

@media (max-width: 991px) {
    .content-box {
        padding-left: 0;
    }
}

@media (max-width: 575px) {
    .title {
        font-size: 28px;
    }
}
</style>

<template>
    <div class="think-tank-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title"> OUR EMINENT <span class="highlight">SUBJECT MATTER EXPERTS </span></h2>
                <p class="max-600 mx-auto">Our Subject Matter Expert comprises industry leaders and academic pioneers
                    dedicated to
                    shaping the future of education and professional excellence.</p>
            </div>

            <div class="row g-4 justify-content-center align-items-center">
                <div v-for="(img, index) in images" :key="index" class="col-lg-3 col-md-4 col-6">
                    <div class="image-box">
                        <img :src="img" alt="Subject Matter Expert" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import expert1 from '@/assets/img/expert/expert1.png'
import expert2 from '@/assets/img/expert/expert2.png'
import expert3 from '@/assets/img/expert/expert3.png'
import expert4 from '@/assets/img/expert/expert4.png'
import expert5 from '@/assets/img/expert/expert5.png'
import expert6 from '@/assets/img/expert/expert6.png'
import expert7 from '@/assets/img/expert/expert7.png'
import expert8 from '@/assets/img/expert/expert8.png'
const images = [
    expert1,
    expert2,
    expert3,
    expert4,
    expert5,
    expert6,
    expert7,
    expert8,
]
</script>

<style scoped>
.think-tank-area {
    background: #ffffff;
}

.section-title {
    margin-bottom: 50px;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.highlight {
    color: #F1A63E;
}

.section-title p {
    color: #4b5563;
    font-size: 16px;
    line-height: 1.6;
}

.max-600 {
    max-width: 600px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.image-box {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box img {
    max-width: 100%;
    height: auto;
    transition: all 0.3s ease;
}

@media (max-width: 1200px) {
    .title {
        font-size: 28px;
    }
}

@media (max-width: 991px) {
    .title {
        font-size: 24px;
    }
}
</style>

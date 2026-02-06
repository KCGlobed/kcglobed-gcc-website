<template>
    <div class="think-tank-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title">Think <span class="highlight">Tank</span></h2>
                <p class="max-600 mx-auto">Our Think Tank comprises industry leaders and academic pioneers dedicated to
                    shaping the future of education and professional excellence.</p>
            </div>

            <div class="row g-4 justify-content-center align-items-center">
                <div v-for="(img, index) in images" :key="index" class="col-lg-2 col-md-4 col-6">
                    <div class="image-box">
                        <img :src="img" alt="Think Tank Member" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const images = [
    "https://storage.googleapis.com/static_files_backend/media/images/1%20(1).png",
    "https://storage.googleapis.com/static_files_backend/media/images/2%20(1).png",
    "https://storage.googleapis.com/static_files_backend/media/images/4.png",
    "https://storage.googleapis.com/static_files_backend/media/images/6%20(2).png",
    "https://storage.googleapis.com/static_files_backend/media/images/5.png",
    "https://storage.googleapis.com/static_files_backend/media/images/Group%2049811.png"
]
</script>

<style scoped>
.think-tank-area {
    background: #f9fafb;
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
    padding: 10px;
    transition: transform 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box img {
    max-width: 100%;
    height: auto;
    /* filter: grayscale(100%);
    opacity: 0.7; */
    transition: all 0.3s ease;
}

.image-box:hover {
    transform: scale(1.05);
}

.image-box:hover img {
    filter: grayscale(0%);
    opacity: 1;
}

@media (max-width: 991px) {
    .section-title h2 {
        font-size: 28px;
    }
}
</style>

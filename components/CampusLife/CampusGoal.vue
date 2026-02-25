<template>
    <div class="leaders-section">

        <!-- Heading -->
        <h2 class="title">
            INSIGHTFUL MINUTES WITH <span>INDUSTRY <br> LEADERS</span>
        </h2>

        <!-- Top Grid -->
        <div class="leaders-grid">

            <!-- Row 1 -->
            <div class="row row-1">
                <img :src="images[0]" />
                <img :src="images[1]" />
            </div>

            <!-- Row 2 -->
            <div class="row row-2">
                <img :src="images[2]" />
                <img :src="images[3]" />
                <img :src="images[4]" />
            </div>

        </div>
        <!-- Video -->
        <VideoBox video-src="https://storage.googleapis.com/gcc_static_files_backend/static/videos/lms_tutorial.mp4"
            thumbnail-src="https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/kamalchhabbraadd.jpeg" />

        <!-- Dots -->
        <div class="dots">
            <span v-for="i in 5" :key="i" :class="{ active: i === 1 }"></span>
        </div>

    </div>
</template>

<script setup lang="ts">
import img1 from '../../assets/img/campus/leader1.jpg';
import img2 from '../../assets/img/campus/leader2.jpg';
import img3 from '../../assets/img/campus/leader3.jpg';
import img4 from '../../assets/img/campus/leader4.jpg';
import img5 from '../../assets/img/campus/leader5.jpg';

const images = [img1, img2, img3, img4, img5];
</script>

<style scoped>
/* Section */
.leaders-section {
    background: #0f1115;
    padding: 80px 0;
    text-align: center;
}

/* Heading */
.title {
    color: #fff;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
}

.title span {
    color: #f59e0b;
}

.leaders-grid {
    max-width: 1100px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Row base */
.row {
    display: grid;
    gap: 0px;
}

/* First row → 2 columns */
.row-1 {
    grid-template-columns: repeat(2, 1fr);
}

/* Second row → 3 columns */
.row-2 {
    grid-template-columns: repeat(3, 1fr);
}

/* Images */
.row img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 14px;
    display: block;
}

/* Optional: make first row slightly bigger */
.row-1 img {
    height: 200px;
}

/* VideoBox wrapper spacing */
:deep(.video-box-wrapper) {
    margin-top: 60px;
    padding: 0 20px;
}

/* Dots */
.dots {
    margin-top: 20px;
}

.dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background: #555;
    border-radius: 50%;
}

.dots span.active {
    background: #fff;
}

/* Responsive */
@media (max-width: 768px) {
    .leaders-grid img {
        height: 120px;
    }

    .leaders-grid img:first-child {
        height: 150px;
    }
}
</style>
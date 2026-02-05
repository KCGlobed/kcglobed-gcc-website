<template>
    <div class="growth-trend-section ptb-100">
        <div class="container">
            <!-- Section Header -->
            <div class="section-header text-center mb-50" data-aos="fade-up">
                <h2 class="title">GLOBAL CAPABILITIES CENTERS (GCCs) <span class="highlight">MARKET GROWTH TREND</span>
                </h2>
            </div>

            <!-- Content Wrapper -->
            <div class="row" data-aos="zoom-in" data-aos-delay="200">
                <div class="col-12">
                    <div class="image-box">
                        <img src="https://storage.googleapis.com/static_files_backend/media/images/Group%2049807.png"
                            alt="GCC Market Growth Trend Chart" class="trend-image">

                        <!-- Decorative Floating Shapes -->
                        <div class="floating-shape shape-1"></div>
                        <div class="floating-shape shape-2"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Background Decorative Elements -->
        <div class="bg-pattern"></div>
    </div>
</template>

<script setup lang="ts">
// No complex logic needed, just static content for now
</script>

<style scoped>
.growth-trend-section {
    background: #ffffff;
    position: relative;
    overflow: hidden;
    padding: 100px 0;
}

/* Header Styling */
.section-header {
    position: relative;
    z-index: 2;
}

.badge {
    display: inline-block;
    background: rgba(252, 100, 65, 0.1);
    color: #fc6441;
    padding: 8px 18px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    border: 1px solid rgba(252, 100, 65, 0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin: 0;
    line-height: 1.2;
    text-transform: uppercase;
}

.highlight {
    background: linear-gradient(135deg, #F1A63E 0%, #F1A63E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Image Box / Glassmorphism */
.image-box {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    padding: 30px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
    position: relative;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    width: 100%;
}

.image-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(252, 100, 65, 0.1);
}

.trend-image {
    width: 100%;
    height: auto;
    border-radius: 20px;
    display: block;
}

/* Floating Shapes */
.floating-shape {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.4;
}

.shape-1 {
    width: 200px;
    height: 200px;
    background: #fc6441;
    top: -50px;
    right: -50px;
    animation: float 6s ease-in-out infinite;
}

.shape-2 {
    width: 150px;
    height: 150px;
    background: #ffa089;
    bottom: -30px;
    left: -40px;
    animation: float 8s ease-in-out infinite alternate;
}

/* Background Pattern */
.bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#fc6441 0.5px, transparent 0.5px);
    background-size: 30px 30px;
    opacity: 0.1;
    z-index: 1;
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-20px, 20px);
    }
}

/* Responsive Styles */
@media (max-width: 991px) {
    .title {
        font-size: 32px;
    }

    .image-box {
        padding: 30px;
    }
}

@media (max-width: 767px) {
    .growth-trend-section {
        padding: 60px 0;
    }

    .title {
        font-size: 26px;
    }

    .image-box {
        padding: 20px;
        border-radius: 20px;
    }

    .badge {
        font-size: 12px;
        padding: 6px 14px;
    }
}
</style>

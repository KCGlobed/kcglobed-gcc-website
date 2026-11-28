<template>
     <div class="gcc-school-section ">
        <div class="w">
            <div class="ticket_container">
            <img :src="ticket" alt="Ticket Image" loading="lazy" decoding="async" />
        </div>
        <div class="container text-center pt-5 px-lg-5 px-md-4 px-3">
            <div class="section-header mb-60">
                <h2 class="title">Building Talent for <span class="highlight"> Tomorrow’s Global Finance Industry</span></h2>
                <p class="subtitle max-800 mx-auto">
                    At GCC School, we aim to shape graduates into confident, capable professionals who can meet the
                    evolving expectations of global organisations, contribute to business success, and grow into
                    future industry leaders.
                </p>
            </div>
            <div class="gcc-school-content">
                <div class="row g-4 justify-content-center">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="gcc-image-box">
                            <img src="../../assets/img/heros/2.png" class="img-fluid" alt="GCC School Feature 1"
                                loading="lazy" decoding="async" />
                            <div class="gcc-image-text">
                                Get Hired First By Top-Tier MNCs & Big Consulting Firms
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="gcc-image-box">
                            <img src="../../assets/img/acca-book.png" class="img-fluid" alt="GCC School Feature 2"
                                loading="lazy" decoding="async" />
                            <div class="gcc-image-text">
                                Get Trained In Globally-Aligned Skills GCCs Actually Need
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="gcc-image-box">
                            <img src="../../assets/img/heros/1.png" class="img-fluid" alt="GCC School Feature 3"
                                loading="lazy" decoding="async" />
                            <div class="gcc-image-text">
                                Build Career In Your Top-Tier Dream Organization
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import ticket from '../../assets/GCC_ticket.png';
</script>
<style scoped>
.gcc-school-section {
    padding-bottom: 80px;
    background-color: #ececeddf;
    overflow: hidden;
}

.ticket_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 120px;
    padding-top: 75px;
}

.section-header .title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    letter-spacing: -0.02em;
    color: #181225;
    margin-bottom: 20px;
    /* max-width: 900px; */
    margin-left: auto;
    margin-right: auto;
}

.section-header .title::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    background: #F1A63E;
    margin: 18px auto 0;
    border-radius: 10px;
}

.section-header .highlight {
    color: #F1A63E;
}

.section-header .subtitle {
    font-size: clamp(14px, 2vw, 18px);
    font-weight: 500;
    color: #4b5563;
    line-height: 1.6;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.max-800 {
    max-width: 800px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.gcc-school-content {
    margin: 50px auto 0;
    max-width: 840px;
}

.gcc-image-box {
    position: relative;
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    width: 100%;
    max-width: 256px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

/* .gcc-image-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
} */

.gcc-image-box img {
    border-radius: 10px;
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
}

.gcc-image-text {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: #723986;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    padding: 12px 18px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-sizing: border-box;
    line-height: 1.4;
    font-family: 'Inter', sans-serif;
}

@media (max-width: 767px) {
    .gcc-image-text {
        font-size: 13px;
        padding: 10px 14px;
    }
}

@media (max-width: 991px) {
    .gcc-school-section {
        padding: 60px 0;
    }

    .gcc-school-content {
        margin-top: 40px;
    }
}

@media (max-width: 767px) {
    .ticket_container {
        padding: 0 10px;
    }
    .gcc-school-section {
        padding: 34px 0;
    }

    .section-header .title {
        font-size: 26px;
    }

    .gcc-image-box {
        max-width: 256px;
        margin: 0 auto;
    }
}

@media (max-width: 480px) {
    .section-header .title {
        font-size: 20px;
        font-weight: 700;
    }
}
</style>

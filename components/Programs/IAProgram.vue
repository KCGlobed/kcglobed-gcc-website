<template>
    <div class="ia-program-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title">I-Gen Pathway for <span class="highlight">New Tomorrow</span></h2>
            </div>
        </div>
        <div class="inner-container">
            <!-- Book Cards Section -->
            <div class="row g-4 mb-40">
                <div class="col-12">
                    <picture class="responsive-banner">
                        <!-- Mobile: 767px and below -->
                        <source media="(max-width: 767px)" :srcset="Mobile" />

                        <!-- Desktop: above 767px -->
                        <img :src="Desktop" alt="TEEE Tailored Education" class="teee-banner-image" />
                    </picture>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import Mobile from '../../assets/img/Acca-img/Acca-mobile.png';
import Desktop from '../../assets/img/Acca-img/Acca-desktop.svg';

</script>

<style scoped>
.inner-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
}

.responsive-banner {
    display: block;
    width: 100%;
}

.teee-banner-image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
}

.ia-program-area {
    background-color: #f3f4f6;
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

.highlight {
    color: #F1A63E;
}

@media (max-width: 767px) {
    .title {
        font-size: 24px;
        line-height: 32px;
    }

    .section-title {
        margin-bottom: 30px;
    }

    .ia-program-area {
        padding: 40px 0px;
    }
}

</style>

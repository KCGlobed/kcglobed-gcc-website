<template>
    <section class="cpa-intro-section">
        <div class="container">

            <!-- Main Heading -->
            <div class="cpa-heading-wrapper">
                <h2 class="cpa-main-heading">
                    US CPA - THE GLOBAL PASSPORT TO
                    ACCOUNTING &amp; <span class="highlight">FINANCE CAREERS</span>
                </h2>

                <div class="heading-line"></div>
            </div>

            <!-- Content Banner -->
            <div class="cpa-info-banner">

                <!-- Left Content -->
                <div class="cpa-info-content">
                    <h3>
                        Everything You Need to Know
                        <br />
                        About the CPA Exam
                    </h3>

                    <p>
                        To become a licensed CPA, you must pass the CPA Exam, a
                        <br class="desktop-break" />
                        four-section, 16-hour assessment.
                    </p>
                </div>

                <!-- Right Image -->
                <div class="cpa-info-image">
                    <div class="card-image-side">
                        <img src="../../assets/img/aicpa_building.jpg" alt="AICPA Building" loading="lazy"
                            decoding="async">
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
// CPA Introduction Banner Component
</script>

<style scoped>
/* =================================
   SECTION
================================= */

.cpa-intro-section {
    background-color: #ffffff;
    padding: 20px 0 25px;
}

.container {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 15px;
}


/* =================================
   MAIN HEADING
================================= */

.cpa-heading-wrapper {
    margin-bottom: 24px;
}

.cpa-main-heading {
    color: #0d0d25;
    font-size: 32px;
    line-height: 1.12;
    font-weight: 700;
    text-transform: uppercase;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    letter-spacing: 0;
}


/* Yellow underline */

.heading-line {
    width: 20%;
    max-width: 930px;
    height: 4px;
    background-color: #e5ad00;
    margin: 12px auto 0;
}

.highlight {
    color: #F1A63E;
}


/* =================================
   INFORMATION BANNER
================================= */

.cpa-info-banner {
    width: 100%;
    min-height: 250px;
    display: grid;
    grid-template-columns: 65.5% 34.5%;
    overflow: hidden;
}


/* =================================
   LEFT CONTENT
================================= */

.cpa-info-content {
    background: linear-gradient(90deg,
            #753278 0%,
            #783478 50%,
            #743174 100%);

    padding: 10px 14px 18px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cpa-info-content h3 {
    color: #e7dce9;

    font-size: 35px;
    line-height: 1.2;
    font-weight: 300;

    margin: 0;
}

.cpa-info-content p {
    color: #e4d9e6;

    font-size: 19px;
    line-height: 1.45;
    font-weight: 300;

    margin: 20px 0 0;
}


/* =================================
   RIGHT IMAGE
================================= */

.cpa-info-image {
    width: 100%;
    height: 250px;
    overflow: hidden;
}

.cpa-info-image img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
    object-position: center;
}

.cpa-info-image {
    width: 100%;
    height: 250px;
    overflow: hidden;
}

.card-image-side {
    width: 100%;
    height: 100%;
}

.card-image-side img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
}


/* =================================
   LARGE LAPTOP
================================= */

@media (max-width: 1200px) {

    .cpa-main-heading {
        font-size: 34px;
    }

    .cpa-info-content h3 {
        font-size: 31px;
    }

    .cpa-info-content p {
        font-size: 17px;
    }
}


/* =================================
   TABLET
================================= */

@media (max-width: 991px) {

    .cpa-main-heading {
        font-size: 30px;
    }

    .heading-line {
        width: 90%;
    }

    .cpa-info-banner {
        grid-template-columns: 60% 40%;
        min-height: 220px;
    }

    .cpa-info-image {
        height: 220px;
    }

    .cpa-info-content h3 {
        font-size: 27px;
    }

    .cpa-info-content p {
        font-size: 15px;
    }
}


/* =================================
   MOBILE
================================= */

@media (max-width: 767px) {

    .cpa-intro-section {
        padding: 25px 0;
        padding-bottom: 1000px;
    }

    .process-flow {
        bottom: -141px;
    }

    .cpa-heading-wrapper {
        margin-bottom: 18px;
    }

    .cpa-main-heading {
        font-size: 24px;
        line-height: 1.15;
    }

    .heading-line {
        width: 100%;
        height: 5px;
        margin-top: 8px;
    }

    .cpa-info-banner {
        display: flex;
        flex-direction: column;
    }

    .cpa-info-content {
        min-height: 220px;
        padding: 20px;
    }

    .cpa-info-content h3 {
        font-size: 27px;
    }

    .cpa-info-content p {
        font-size: 16px;
        margin-top: 30px;
    }

    .desktop-break {
        display: none;
    }

    .cpa-info-image {
        height: 230px;
    }

    
}


/* =================================
   SMALL MOBILE
================================= */

@media (max-width: 480px) {

    .cpa-main-heading {
        font-size: 20px;
    }

    .cpa-info-content h3 {
        font-size: 23px;
    }

    .cpa-info-content p {
        font-size: 14px;
    }

    .cpa-info-image {
        height: 190px;
    }
}
</style>
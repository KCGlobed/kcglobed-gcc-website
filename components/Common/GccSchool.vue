<template>
    <div class="gcc-school-section">
        <div class="container">
            <div class="section-header text-center mb-60" data-aos="fade-up">
                <h2 class="title">AT <span class="highlight">GCC SCHOOL</span>
                    We prepare finance leaders to achieve the next elevation - for their organisations and for
                    themselves
                </h2>
                <p class="subtitle max-800 mx-auto">

                </p>
            </div>
            <div class="gcc-school-content">

                <div class="gcc-school-images">

                    <img src="../../assets/img/heros/school6.svg" />
                    <img src="../../assets/img/heros/school4.svg" />
                    <img src="../../assets/img/heros/school5.svg" />
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">

</script>
<style scoped>
.gcc-school-section {
    padding: 60px 0;
    background-color: #ffffff;
}

.section-header .title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 15px;
    text-transform: uppercase;
    line-height: 1.3;
}

.section-header .highlight {
    color: #F1A63E;
}

.section-header .subtitle {
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;
    line-height: 1.7;
}

.max-800 {
    max-width: 800px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.gcc-school-content {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.gcc-school-images {
    display: flex;
    gap: 20px;
    align-items: center;
}

.gcc-school-images img {
    flex: 1;
    max-width: 100%;
    height: auto;
}

/* Responsive Design */
@media (max-width: 991px) {
    .gcc-school-section {
        padding: 60px 0;
    }

    .section-header .title {
        font-size: 28px;
    }

    .section-header .subtitle {
        font-size: 15px;
    }

    .gcc-school-images {
        flex-direction: column;
        gap: 24px;
    }

    .gcc-school-images img {
        width: 100%;
        max-width: 600px;
        /* Limit width on tablet so they don't get massive, or remove for full width */
        margin: 0 auto;
        /* Center if max-width is applied */
        height: auto;
    }
}

@media (max-width: 767px) {
    .gcc-school-section {
        padding: 30px 0;
    }

    .section-header .title {
        font-size: 24px;
    }

    .section-header .subtitle {
        font-size: 14px;
    }

    .gcc-school-images img {
        max-width: 100%;
    }

    .gcc-school-content {
        margin-top: 30px;
    }
}
</style>
<template>
     <div class="gcc-school-section ">
        <div class="w">
            <div class="ticket_container">
            <img src="https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Group%2051450%20(1).png"
                alt="Ticket Image" loading="lazy" decoding="async" />
        </div>
        <div class="container text-center pt-5 px-lg-5 px-md-4 px-3">
            <div class="section-header mb-60">
                <h2 class="title">AT <span>GCC SCHOOL</span>
                    We prepare finance leaders to achieve the next elevation - for their organisations and for
                    themselves
                </h2>
                <p class="subtitle max-800 mx-auto">

                </p>
            </div>
            <div class="gcc-school-content">
                <div class="row g-4 justify-content-center">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="gcc-image-box">
                            <img src="../../assets/img/heros/3.svg" class="img-fluid" alt="GCC School Feature 1"
                                loading="lazy" decoding="async" />
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="gcc-image-box">
                            <img src="../../assets/img/heros/1.svg" class="img-fluid" alt="GCC School Feature 2"
                                loading="lazy" decoding="async" />
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="gcc-image-box">
                            <img src="../../assets/img/heros/4.svg" class="img-fluid" alt="GCC School Feature 3"
                                loading="lazy" decoding="async" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

</template>
<script setup lang="ts">

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
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.section-header .highlight {
    color: #F1A63E;
    position: relative;
    display: inline-block;
}

.section-header .highlight::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(241, 166, 62, 0.2);
    border-radius: 2px;
}

.section-header .subtitle {
    font-size: clamp(14px, 2vw, 18px);
    font-weight: 500;
    color: #4b5563;
    line-height: 1.6;
}

.max-800 {
    max-width: 800px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.gcc-school-content {
    margin-top: 50px;
}

.gcc-image-box {
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.gcc-image-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.gcc-image-box img {
    border-radius: 10px;
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
        max-width: 400px;
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

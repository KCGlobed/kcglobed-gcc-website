<template>
    <section class="career-path-section">
        <div class="container">

            <!-- Heading -->
            <div class="career-path-heading">
                <h2 class="title">
                    CAREER GROWTH - <span class="highlight">PATH</span>
                </h2>
            </div>

            <!-- Career Path Image -->
            <div class="career-path-image">
                <img
                    src="../../assets/img/career-path.png"
                    alt="EA Career Path"
                    loading="lazy"
                    decoding="async"
                />
            </div>

        </div>
    </section>
</template>

<style scoped>

/* =================================
   SECTION
================================= */

.career-path-section {
    /* background-color: #f0f0f0; */
    padding: 65px 0 0;
}

.container {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 15px;
}


/* =================================
   HEADING
================================= */

.career-path-heading {
    text-align: center;
    /* margin-bottom: 45px; */
}


.career-path-heading h2 {
    font-size: 38px;
    line-height: 1.15;
    font-weight: 600;
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

.career-path-heading h2 span {
    color: #eda32e;
}


/* =================================
   IMAGE
================================= */

.career-path-image {
    width: 100%;
    /* max-width: 850px; */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.career-path-image img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
}


/* =================================
   TABLET
================================= */

@media (max-width: 991px) {

    .career-path-section {
        padding: 50px 0 45px;
    }

    .career-path-heading {
        margin-bottom: 35px;
    }

    .career-path-heading h2 {
        font-size: 38px;
    }

    .career-path-image {
        max-width: 750px;
    }
}


/* =================================
   MOBILE
================================= */

@media (max-width: 767px) {

    .career-path-section {
        padding: 35px 0 30px;
    }

    .container {
        padding: 0 10px;
    }

    .career-path-heading {
        margin-bottom: 25px;
    }

    .career-path-heading h2 {
        font-size: 28px;
        line-height: 1.2;
    }

    .career-path-image {
        width: 100%;
        max-width: 100%;
    }

    .career-path-image img {
        width: 100%;
        height: auto;
    }
}


/* =================================
   SMALL MOBILE
================================= */

@media (max-width: 480px) {

    .career-path-section {
        padding: 30px 0 25px;
    }

    .career-path-heading {
        margin-bottom: 20px;
    }

    .career-path-heading h2 {
        font-size: 24px;
    }
}

</style>
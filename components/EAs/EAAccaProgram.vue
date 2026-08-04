<template>
    <div class="ea-intro-area ptb-100 bg-white">
        <div class="container">
            <div class="ea-intro-content max-900 mx-auto" data-aos="fade-up">
                <h2 class="ea-title">ENROLLED AGENT</h2>
                <h2 class="ea-subtitle">
                    Unlock boundless opportunities in tax preparation and representation with the best Enrolled Agent
                    course.
                </h2>
                <p class="ea-description">
                    Step aboard a journey of expertise with the US Enrolled Agent (EA) certification, endorsed by the
                    Internal Revenue Service (IRS). Elevate your skills in tax planning, compliance, and representation
                    to navigate complex tax landscapes with confidence
                </p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.ea-intro-area {
    /* padding-top: 80px; */
    /* padding-bottom: 80px; */
}

.max-900 {
    max-width: 900px;
}

.ea-title {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #B48629;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-bottom: 15px;
}

.ea-subtitle {
    text-align: center;
    font-size: clamp(16px, 4vw, 24px);
    /* font-weight: 800; */
    color: #0d0d25;
    /* margin-bottom: 20px; */
    /* text-transform: uppercase; */
    line-height: 1.2;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.ea-description {
    text-align: center;
    font-size: 18px;
    color: #666666;
    line-height: 1.7;
    font-weight: 400;
}

/* Responsive adjustments */
@media (max-width: 991px) {
    .ea-title {
        font-size: 28px;
    }

    .ea-subtitle {
        font-size: 30px;
    }

    .ea-description {
        font-size: 16px;
    }
}

@media (max-width: 767px) {
    .ea-intro-area {
        padding-top: 50px;
        padding-bottom: 50px;
    }
     
    .ea-title {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .ea-subtitle {
        font-size: 24px;
        line-height: 1.4;
        margin-bottom: 15px;
    }

    .ea-description {
        font-size: 15px;
        line-height: 1.6;
    }
}
</style>

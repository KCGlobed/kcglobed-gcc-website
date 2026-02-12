<template>
    <div class="think-tank-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title">OUR DISTINGUISHED INDUSTRY <span class="highlight">MENTORS</span></h2>
                <p class="max-600 mx-auto">Our Industry Mentors are seasoned professionals who provide invaluable
                    guidance and real-world insights to bridge the gap between academia and industry.</p>
            </div>

            <div class="row g-4 justify-content-center align-items-center">

                <div v-for="(img, index) in images" :key="index" class="col-lg-4 col-md-6 col-sm-12">
                    <a :href="img.link" target="_blank">
                        <div class="image-box">
                            <img :src="img.img" alt="Industry Mentor" class="img-fluid">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import industryMentor1 from '@/assets/img/industryMentor/1.png'
import industryMentor2 from '@/assets/img/industryMentor/2.png'
import industryMentor3 from '@/assets/img/industryMentor/3.png'
import industryMentor4 from '@/assets/img/industryMentor/4.png'
import industryMentor5 from '@/assets/img/industryMentor/5.png'
import industryMentor6 from '@/assets/img/industryMentor/6.png'
import industryMentor7 from '@/assets/img/industryMentor/7.png'
import industryMentor8 from '@/assets/img/industryMentor/8.png'
import industryMentor10 from '@/assets/img/industryMentor/10.png'
import industryMentor11 from '@/assets/img/industryMentor/11.png'
import industryMentor12 from '@/assets/img/industryMentor/12.png'
import industryMentor13 from '@/assets/img/industryMentor/13.png'
import industryMentor14 from '@/assets/img/industryMentor/14.png'
import industryMentor15 from '@/assets/img/industryMentor/15.png'
import industryMentor16 from '@/assets/img/industryMentor/16.png'
const images = [
    {
        img: industryMentor1,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor2,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor3,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor4,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor5,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor6,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor7,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor8,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor10,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor11,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor12,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor13,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor14,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor15,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: industryMentor16,
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
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
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box img {
    max-width: 100%;
    height: auto;
    transition: all 0.3s ease;
}

@media (max-width: 991px) {
    .section-title h2 {
        font-size: 28px;
    }
}
</style>

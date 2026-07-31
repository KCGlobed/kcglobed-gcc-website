<template>
    <div class="think-tank-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title">OUR DISTINGUISHED INDUSTRY <span class="highlight">MENTORS</span></h2>
                <!-- <p class="max-600 mx-auto">Our Industry Mentors are seasoned professionals who provide invaluable
                    guidance and real-world insights to bridge the gap between academia and industry.</p> -->
            </div>

            <div class="row g-4 justify-content-center align-items-center">

                <div v-for="(img, index) in images" :key="index" class="col-lg-4 col-md-6 col-sm-12">
                    <a :href="img.link" target="_blank">
                        <div class="image-box">
                            <img :src="img.img" alt="Industry Mentor" class="img-fluid" loading="lazy" decoding="async">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const images = [
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(1)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(2)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2049920%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(4)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(5)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(6)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(7).png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%20(1)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%20(2)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%20(2)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
]
</script>

<style scoped>
.think-tank-area {
    background: #2C203A;
}

.section-title {
    margin-bottom: 50px;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    text-transform: uppercase;
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

@media (max-width: 1200px) {
    .think-tank-area {
        padding: 80px 0;
    }

    .title {
        font-size: 28px;
    }
}

@media (max-width: 991px) {
    .think-tank-area {
        padding: 60px 0;
    }

    .title {
        font-size: 24px;
    }
}

@media (max-width: 768px) {
    .section-title {
        margin-bottom: 30px;
    }

    .title {
        font-size: 20px;
        letter-spacing: 1px;
    }

    .title::after {
        width: 50px;
        height: 3px;
        margin-top: 10px;
    }

    .image-box {
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 18px;
    }
}
</style>

<template>
  <div class="mentors-and-campus-wrapper">
    <div class="think-tank-area ptb-100">
      <div class="container">
        <div class="section-title text-center mb-50">
          <h2 class="title">OUR DISTINGUISHED INDUSTRY MENTORS</h2>
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

    <!-- Campus DLF Cyber City Section -->
    <div class="campus-section ptb-100">
      <div class="container">
        <div class="row align-items-center g-5">
          <!-- Left Content -->
          <div class="col-lg-6 col-12 text-start">
            <div class="campus-info">
              <span class="gold-tag">CAMPUS · DLF CYBER CITY</span>
              <h2 class="campus-heading mt-2">Learn Where Global<br class="d-none d-md-block" /> Finance Actually<br class="d-none d-md-block" /> Happens.</h2>
              <p class="campus-desc mt-3">
                Building 9B, DLF Cyber City, Gurugram, surrounded by the very companies you are training to join. That proximity is not a perk. It is part of how we prepare you.
              </p>
              <div class="d-flex flex-wrap gap-3 mt-4">
                <button class="btn btn-gold" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                  Book A Campus Visit <i class="ti ti-arrow-right ms-2"></i>
                </button>
                <NuxtLink to="/campus-life" class="btn btn-outline-meet">
                  View Gallery
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="col-lg-6 col-12">
            <!-- <div class="campus-img-box"> -->
              <img :src="campusImg" alt="DLF Cyber City Campus Classroom" class="img-fluid" loading="lazy" decoding="async" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import classroomImg from '@/assets/img/campus/image5.png'
import industryMentor1 from '@/assets/img/industoryMentorTwo/1.png'
import industryMentor2 from '@/assets/img/industoryMentorTwo/2.png'
import industryMentor3 from '@/assets/img/industoryMentorTwo/3.png'
import industryMentor4 from '@/assets/img/industoryMentorTwo/4.png'
import industryMentor5 from '@/assets/img/industoryMentorTwo/5.png'
import industryMentor6 from '@/assets/img/industoryMentorTwo/6.png'
import industryMentor7 from '@/assets/img/industoryMentorTwo/7.png'
import industryMentor8 from '@/assets/img/industoryMentorTwo/8.png'
import industryMentor9 from '@/assets/img/industoryMentorTwo/9.png'
import industryMentor10 from '@/assets/img/industoryMentorTwo/17.png'
import industryMentor11 from '@/assets/img/industoryMentorTwo/11.png'
import industryMentor12 from '@/assets/img/industoryMentorTwo/12.png'
import campusImg from '@/assets/newimages/campus-1.png';

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
        img: industryMentor9,
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


]
</script>

<style scoped>
.think-tank-area {
    background: #e3e3e3;
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

@media (max-width: 991px) {
    .section-title h2 {
        font-size: 28px;
    }
}

/* Campus Section Styles */
.campus-section {
  background-color: #F8F9FA;
  padding: 80px 0;
  border-top: 1px solid #ECECF0;
}

.gold-tag {
  color: #D5861B;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.campus-heading {
  font-size: 42px;
  font-weight: 800;
  color: #130922;
  line-height: 1.25;
}

.campus-desc {
  font-size: 15px;
  color: #555555;
  line-height: 1.6;
}

.btn-gold {
  background-color: #FFAF3D !important;
  color: #000000 !important;
  font-weight: 700;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 14px;
  border: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-gold:hover {
  background-color: #E5A93C !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(254, 175, 61, 0.3);
}

.btn-outline-meet {
  background-color: #ffffff !important;
  color: #4A154B !important;
  border: 1.5px solid #4A154B !important;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 24px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-outline-meet:hover {
  background-color: rgba(74, 21, 75, 0.05) !important;
  transform: translateY(-2px);
}

/* .campus-img-box img {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
} */

@media (max-width: 575px) {
  .campus-heading {
    font-size: 30px;
  }
}
</style>

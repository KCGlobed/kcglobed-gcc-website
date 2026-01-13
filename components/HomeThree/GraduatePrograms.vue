<template>
  <div class="management-warp ptb-100">
    <div class="container">
      <div class="section-warp">
        <h2 class="reveal3">Graduate Programs At Tuva</h2>
      </div>
      <div
        class="management-slider-warp"
        data-aos="zoom-in-up"
        data-aos-delay="200"
      >
        <Swiper
          :slidesPerView="5"
          :spaceBetween="24"
          :loop="true"
          :speed="1400"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :breakpoints="{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 5,
            },
          }"
          :modules="[SwiperNavigation]"
          class="management-slider"
        >
          <SwiperSlide v-for="program in programs" :key="program.id">
            <div class="management-widget">
              <div class="image">
                <img :src="program.image" alt="image" />
              </div>
              <div class="content">
                <ul>
                  <li>
                    <img src="~/assets/img/svgs/graduate.svg" alt="icon" />
                    {{ program.tag }}
                  </li>
                </ul>
                <h3>
                  <NuxtLink to="/programs">
                    {{ program.title }}
                  </NuxtLink>
                </h3>
                <p>
                  {{ program.shortDesc }}
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="swiper-btn style2">
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import image1 from "~/assets/img/managements/management1.jpg";
import image2 from "~/assets/img/managements/management2.jpg";
import image3 from "~/assets/img/managements/management3.jpg";
import image4 from "~/assets/img/managements/management4.jpg";
import image5 from "~/assets/img/managements/management5.jpg";

export default defineComponent({
  name: "GraduatePrograms",
  data() {
    return {
      programs: [
        {
          id: 1,
          image: image1,
          title: "Business Management",
          link: "/programs",
          tag: "BUSINESS",
          shortDesc:
            "Tell us a little about yourself and we’ll help with the rest.",
        },
        {
          id: 2,
          image: image2,
          title: "Economics",
          link: "/programs",
          tag: "ECONOMICS",
          shortDesc: "we have a rich history of academic excellence.",
        },
        {
          id: 3,
          image: image3,
          title: "Business Media",
          link: "/programs",
          tag: "BUSINESS",
          shortDesc:
            "Dating back to our founding in 2005. Our commitment is exceptional.",
        },
        {
          id: 4,
          image: image4,
          title: "Public Administration",
          link: "/programs",
          tag: "PUBLIC",
          shortDesc: "Explore our comprehensive range of academic programs.",
        },
        {
          id: 5,
          image: image5,
          title: "Social Relationship",
          link: "/programs",
          tag: "SOCIAL",
          shortDesc:
            "Tell us a little about yourself and we’ll help with the rest.",
        },
        {
          id: 6,
          image: image1,
          title: "Business Management",
          link: "/programs",
          tag: "BUSINESS",
          shortDesc:
            "Tell us a little about yourself and we’ll help with the rest.",
        },
        {
          id: 7,
          image: image2,
          title: "Economics",
          link: "/programs",
          tag: "ECONOMICS",
          shortDesc: "we have a rich history of academic excellence.",
        },
      ],
    };
  },
});
</script>

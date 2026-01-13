<template>
  <div class="hero-warp">
    <Swiper
      :loop="true"
      :effect="'fade'"
      :speed="2000"
      :pagination="{
        el: '.swiper-pagination2',
        clickable: true,
      }"
      :modules="[SwiperEffectFade, SwiperPagination]"
      class="hero-slider"
    >
      <SwiperSlide v-for="banner in banners" :key="banner.id">
        <div
          class="hero-slider-warp"
          :style="{
            'background-image': `url(${banner.image})`,
          }"
        >
          <div class="container-fluid">
            <div class="content">
              <h1 class="title">
                {{ banner.heading }}
              </h1>
              <div class="hero-btn">
                <NuxtLink :to="banner.btnLink" class="default-btn">
                  {{ banner.btnText }}
                  <i class="ti ti-arrow-narrow-right"></i>
                </NuxtLink>
                <NuxtLink :to="banner.btnLinkTwo" class="default-btn style2">
                  {{ banner.btnTextTwo }}
                  <i class="ti ti-arrow-narrow-right"></i>
                </NuxtLink>
              </div>
            </div>
            <ul class="information">
              <li
                v-for="information in banner.informations"
                :key="information.id"
              >
                <i :class="information.icon"></i>
                <NuxtLink :to="information.link">
                  {{ information.title }}
                </NuxtLink>
              </li>
            </ul>
            <NuxtLink :to="banner.updateLink" class="update-link">
              <span>
                {{ banner.updateTitle }}
              </span>
              <i class="ti ti-arrow-narrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </SwiperSlide>
      <div class="pagination-bullet-btn text-end">
        <div class="swiper-pagination2"></div>
      </div>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import image1 from "../../assets/img/heros/hero1.jpg";
import image2 from "../../assets/img/heros/hero2.jpg";

export default defineComponent({
  name: "MainBanner",
  data() {
    return {
      banners: [
        {
          id: 1,
          bgClass: "bg1",
          image: image1,
          heading: "Tuva tops the best world higher education ranking in 2024",
          btnText: "View Report",
          btnLink: "/about-overview",
          btnTextTwo: "View All Programs",
          btnLinkTwo: "/programs",
          updateTitle: "View all latest news updates of Tuva",
          updateLink: "/blog",
          informations: [
            {
              id: 1,
              icon: "ti ti-world",
              title: "Take A Tour",
              link: "/schedule",
            },
            {
              id: 2,
              icon: "ti ti-info-hexagon",
              title: "Campus Information",
              link: "/about-campus",
            },
            {
              id: 3,
              icon: "ti ti-ballpen",
              title: "Apply Now",
              link: "/personal-information",
            },
          ],
        },
        {
          id: 2,
          bgClass: "bg2",
          image: image2,
          heading: "Tuva tops the best world higher education ranking in 2024",
          btnText: "View Report",
          btnLink: "/about-overview",
          btnTextTwo: "View All Programs",
          btnLinkTwo: "/programs",
          updateTitle: "View all latest news updates of Tuva",
          updateLink: "/blog",
          informations: [
            {
              id: 1,
              icon: "ti ti-world",
              title: "Take A Tour",
              link: "/schedule",
            },
            {
              id: 2,
              icon: "ti ti-info-hexagon",
              title: "Campus Information",
              link: "/about-campus",
            },
            {
              id: 3,
              icon: "ti ti-ballpen",
              title: "Apply Now",
              link: "/personal-information",
            },
          ],
        },
        {
          id: 3,
          bgClass: "bg1",
          image: image1,
          heading: "Tuva tops the best world higher education ranking in 2024",
          btnText: "View Report",
          btnLink: "/about-overview",
          btnTextTwo: "View All Programs",
          btnLinkTwo: "/programs",
          updateTitle: "View all latest news updates of Tuva",
          updateLink: "/blog",
          informations: [
            {
              id: 1,
              icon: "ti ti-world",
              title: "Take A Tour",
              link: "/schedule",
            },
            {
              id: 2,
              icon: "ti ti-info-hexagon",
              title: "Campus Information",
              link: "/about-campus",
            },
            {
              id: 3,
              icon: "ti ti-ballpen",
              title: "Apply Now",
              link: "/personal-information",
            },
          ],
        },
      ],
    };
  },
});
</script>

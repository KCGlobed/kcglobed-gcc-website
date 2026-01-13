<template>
  <div class="mission-warp pt-80 bg-FAF6F6">
    <div class="container">
      <div class="row">
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div class="mission-tab">
            <button
              class="tablinks"
              v-for="(mission, index) in missions"
              :key="mission.id"
              :class="{ active: activeIndex === index }"
              @mouseover="() => setActive(index)"
            >
              <div class="mission-tab-btn">
                {{ mission.title }}
                <div class="icon">
                  <i class="ti ti-arrow-narrow-right"></i>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="col-lg-8">
          <div
            class="tabcontent"
            v-for="(mission, index) in missions"
            :key="mission.id"
            :class="['tabcontent', { active: activeIndex === index }]"
            v-show="activeIndex === index"
          >
            <div class="row">
              <div class="col-lg-6" data-aos="zoom-in-up" data-aos-delay="200">
                <div class="mission-image reveal2">
                  <img :src="mission.image" alt="Image" />
                  <img
                    src="assets/img/shapes/mission-shape1.png"
                    class="mission-shape"
                    alt="image"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div
                  class="mission-content"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h3>{{ mission.heading }}</h3>
                  <div class="mission-box">
                    <div class="icon">
                      <img src="assets/img/svgs/mission1.svg" alt="image" />
                    </div>
                    <h5>{{ mission.title }}</h5>
                    <p>{{ mission.description }}</p>
                    <NuxtLink :to="mission.viewBtnLink" class="mission-link">
                      <span>{{ mission.viewBtnText }}</span>
                      <i class="ti ti-arrow-narrow-right"></i>
                    </NuxtLink>
                  </div>
                  <NuxtLink :to="mission.btnLink" class="default-btn">
                    {{ mission.btnText }}
                    <i class="ti ti-arrow-narrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import image1 from "~/assets/img/missions/mission1.jpg";
import image2 from "~/assets/img/missions/mission2.jpg";
import image3 from "~/assets/img/missions/mission3.jpg";
import image4 from "~/assets/img/missions/mission4.jpg";
import image5 from "~/assets/img/missions/mission5.jpg";

export default defineComponent({
  name: "AboutTheUniversity",
  setup() {
    const activeIndex = ref(1);

    const missions = [
      {
        id: 1,
        title: "Our Mission",
        image: image1,
        heading: "About The Tuva University",
        description:
          "The mission of Tuva is to serve as a digital gateway and information hub for all members of the university community.",
        viewBtnText: "View Details",
        viewBtnLink: "/event-details",
        btnText: "Take A Campus Tour",
        btnLink: "/schedule",
      },
      {
        id: 2,
        title: "Our Vision",
        image: image2,
        heading: "About The Tuva University",
        description:
          "The mission of Tuva is to serve as a digital gateway and information hub for all members of the university community.",
        viewBtnText: "View Details",
        viewBtnLink: "/program-choice",
        btnText: "Take A Campus Tour",
        btnLink: "/program-choice",
      },
      {
        id: 3,
        title: "Our Glorious History",
        image: image3,
        heading: "About The Tuva University",
        description:
          "The mission of Tuva is to serve as a digital gateway and information hub for all members of the university community.",
        viewBtnText: "View Details",
        viewBtnLink: "/graduate-programs",
        btnText: "Take A Campus Tour",
        btnLink: "/graduate-programs",
      },
      {
        id: 4,
        title: "Leadership",
        image: image4,
        heading: "About The Tuva University",
        description:
          "The mission of Tuva is to serve as a digital gateway and information hub for all members of the university community.",
        viewBtnText: "View Details",
        viewBtnLink: "/programs",
        btnText: "Take A Campus Tour",
        btnLink: "/programs",
      },
      {
        id: 5,
        title: "Membership",
        image: image5,
        heading: "About The Tuva University",
        description:
          "The mission of Tuva is to serve as a digital gateway and information hub for all members of the university community.",
        viewBtnText: "View Details",
        viewBtnLink: "/programs",
        btnText: "Take A Campus Tour",
        btnLink: "/programs",
      },
    ];

    const setActive = (index: number) => {
      activeIndex.value = index;
    };

    return {
      activeIndex,
      missions,
      setActive,
    };
  },
});
</script>

<template>
  <div class="fun-fact-warp ptb-100">
    <div class="container-fluid p-0">
      <div class="marquee-wrapper">
        <!-- First Row: Moves to Right -->
        <div class="marquee-row scroll-right">
          <!-- Original Set -->
          <div class="fun-fact-item" v-for="funfact in rowOne" :key="funfact.id">
            <div class="fun-fact-card">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <div class="icon style">
                    <img :src="funfact.icon" alt="" />
                  </div>
                </div>
                <h2 class="counter">{{ funfact.number }}</h2>
                <h2 class="plus">{{ funfact.sign }}</h2>
              </div>
              <p>{{ funfact.title }}</p>
            </div>
          </div>
          <!-- Duplicate Set for Loop -->
          <div class="fun-fact-item" v-for="funfact in rowOne" :key="'dup-' + funfact.id">
            <div class="fun-fact-card">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <div class="icon style">
                    <img :src="funfact.icon" alt="" />
                  </div>
                </div>
                <h2 class="counter">{{ funfact.number }}</h2>
                <h2 class="plus">{{ funfact.sign }}</h2>
              </div>
              <p>{{ funfact.title }}</p>
            </div>
          </div>
        </div>

        <!-- Second Row: Moves to Left -->
        <div class="marquee-row scroll-left mt-4">
          <!-- Original Set -->
          <div class="fun-fact-item" v-for="funfact in rowTwo" :key="funfact.id">
            <div class="fun-fact-card">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <div class="icon style">
                    <img :src="funfact.icon" alt="" />
                  </div>
                </div>
                <h2 class="counter">{{ funfact.number }}</h2>
                <h2 class="plus">{{ funfact.sign }}</h2>
              </div>
              <p>{{ funfact.title }}</p>
            </div>
          </div>
          <!-- Duplicate Set for Loop -->
          <div class="fun-fact-item" v-for="funfact in rowTwo" :key="'dup-' + funfact.id">
            <div class="fun-fact-card">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <div class="icon style">
                    <img :src="funfact.icon" alt="" />
                  </div>
                </div>
                <h2 class="counter">{{ funfact.number }}</h2>
                <h2 class="plus">{{ funfact.sign }}</h2>
              </div>
              <p>{{ funfact.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import icon1 from "~/assets/img/svgs/fun-fact1.svg";
import icon2 from "~/assets/img/svgs/fun-fact2.svg";
import icon3 from "~/assets/img/svgs/fun-fact3.svg";
import icon4 from "~/assets/img/svgs/fun-fact4.svg";

export default defineComponent({
  name: "FunFact",
  data() {
    return {
      funfacts: [
        {
          id: 1,
          icon: icon1,
          number: "92",
          title: "OF RECENT GRADUATES STARTED NEW JOB",
          sign: "+",
        },
        {
          id: 2,
          icon: icon2,
          number: "156",
          title: "PROGRAMS AVAILABLE FOR THE STUDENTS",
          sign: "+",
        },
        {
          id: 3,
          icon: icon3,
          number: "31",
          title: "YEARS OF GLORIOUS HISTORY",
          sign: "+",
        },
        {
          id: 4,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 5,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 6,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 7,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 8,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 9,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 10,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 11,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 12,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 13,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
        {
          id: 14,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
        },
      ],
    };
  },
  computed: {
    rowOne() {
      return this.funfacts.slice(0, 7);
    },
    rowTwo() {
      return this.funfacts.slice(7);
    },
  },
});
</script>

<style scoped>
.marquee-wrapper {
  overflow: hidden;
  width: 100%;
}

.marquee-row {
  display: flex;
  gap: 24px;
  width: max-content;
}

.fun-fact-item {
  flex: 0 0 auto;
}

.fun-fact-card {
  width: 350px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  /* Example styling from original if needed, or rely on global class */
  border-radius: 10px;
}

/* Scroll Right Animation (Row 1) */
.scroll-right {
  animation: scrollRight 40s linear infinite;
}

/* Scroll Left Animation (Row 2) */
.scroll-left {
  animation: scrollLeft 40s linear infinite;
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* Pause on hover optional */
.marquee-wrapper:hover .marquee-row {
  animation-play-state: paused;
}
</style>

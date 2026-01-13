<template>
  <div class="fun-fact-warp ptb-100">
    <div class="container">
      <div class="row justify-content-center g-4">
        <div
          class="col-lg-3 col-sm-6 col-md-6"
          v-for="funfact in funfacts"
          :key="funfact.id"
          data-aos="zoom-in-up"
          :data-aos-delay="funfact.dataDelay"
        >
          <div class="fun-fact-card">
            <div class="d-flex align-items-center">
              <div class="icon">
                <div class="icon style">
                  <img :src="funfact.icon" alt="" />
                </div>
              </div>
              <h2 class="counter">
                {{ funfact.number }}
              </h2>
              <h2 class="plus">
                {{ funfact.sign }}
              </h2>
            </div>
            <p>
              {{ funfact.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
          dataDelay: "200",
        },
        {
          id: 2,
          icon: icon2,
          number: "156",
          title: "PROGRAMS AVAILABLE FOR THE STUDENTS",
          sign: "+",
          dataDelay: "300",
        },
        {
          id: 3,
          icon: icon3,
          number: "31",
          title: "YEARS OF GLORIOUS HISTORY",
          sign: "+",
          dataDelay: "400",
        },
        {
          id: 4,
          icon: icon4,
          number: "50",
          title: "CAMPUS ALL OVER THE WORLD",
          sign: "+",
          dataDelay: "500",
        },
      ],
    };
  },
});
</script>

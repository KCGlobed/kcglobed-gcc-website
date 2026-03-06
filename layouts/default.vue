<template>
  <div>
    <!-- <Preloader v-if="isLoading" /> -->
    <MobileDeviceNavbar />
    <NuxtPage />
    <SearchPopup />
    <MainSidebar />
    <GoTop />
    <ContactSlide />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Preloader from "./Preloader.vue";
import MobileDeviceNavbar from "./MobileDeviceNavbar.vue";
import SearchPopup from "./SearchPopup.vue";
import MainSidebar from "./MainSidebar.vue";
import ContactSlide from "../components/ContactSlide/ContactSlide.vue";
import GoTop from "./GoTop.vue";

export default defineComponent({
  components: {
    // Preloader,
    MobileDeviceNavbar,
    SearchPopup,
    MainSidebar,
    GoTop,
  },
  // data() {
  //   return {
  //     isLoading: true,
  //   };
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 60);
  // },
});
</script>

<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <HomeOneMainBanner />
    <HomeOneInformationForInternationalStudents />
    <!-- <HomeOneFindYourProgram /> -->
    <HomeOneAboutTheUniversity />
    <CommonFunFact />
    <HomeOneFutureStudents />
    <HomeOneCultureWarp />
    <HomeOneCurrentAcademicStudents />
    <!-- <HomeOneProfessionalLearning />
    <HomeOneServicesContent />
    <HomeOneWeAreInTheWave />
    <HomeOneLatestNews /> -->
    <LayoutMainFooter />
    <LayoutCopyRight />

    <!-- Event Popup -->
    <CommonEventPopup />
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
  title: "GCC University | Home",
})

</script>

<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <HomeOneMainBanner />
    <HomeOneCompanyBar />
    <HomeOneInformationForInternationalStudents />
    <HomeGovtProgram />
    <CommonGrowthTrend />
    <CommonPathwayYourSuccess />
    <CommonEligibilityCriteria />
    <HomeOneProgramsAndOutcomes />
    <!-- <HomeOneFutureStudents /> -->
    <CommonGccSchool />
    <!-- <CommonDirectorSpeach /> -->
    <CommonGccCommerse />
    
    <CommonPathway />
    <!-- Faculty & Mentors: Think Tank, Subject Matter Experts and Industry Mentors are tabs inside this section -->
    <HomeOneCurrentAcademicStudents />
    <!-- <CommonThinkTank /> -->
    <CommonIndustryMentor :show-mentors="false" />
    <HomeOneNfetAndParents />
    <CommonFunFact />
    <!-- <CommonNewsCard /> -->
    <HomeOneSpotlightSection />
    <HomeOneStudentParentVideoSection />
    <HomeOneInstagramReelsSection />
    <CommonPowerHouse />
    <CommonTrustecoSystem />
    <HomeOneResourcesAndNews />
    <CommonFaqSection />
    <CommonCampus />
    <LayoutMainFooter
      cta-eyebrow="YOUR NEXT CHAPTER STARTS HERE"
      cta-title="The Next Chapter of Your Professional Journey Starts Here."
      cta-subtitle="Take the next step towards a career shaped by industry expectations, professional expertise and opportunities in the evolving world of global finance." />
    <LayoutCopyRight />

    <!-- Event Popup -->
    <!-- <CommonEventPopup /> -->
  </div>
</template>

<script setup lang="ts">
import HomeGovtProgram from '~/components/HomeOne/HomeGovtProgram.vue';
import HomeOneProgramsAndOutcomes from '~/components/HomeOne/ProgramsAndOutcomes.vue';
import HomeOneNfetAndParents from '~/components/HomeOne/NfetAndParents.vue';
import HomeOneSpotlightSection from '~/components/HomeOne/SpotlightSection.vue';
import HomeOneStudentParentVideoSection from '~/components/HomeOne/StudentParentVideoSection.vue';
import HomeOneResourcesAndNews from '~/components/HomeOne/ResourcesAndNews.vue';
import EligibilityCriteria from '~/components/Common/EligibilityCriteria.vue';

useHead({
  title: "GCC School: Get Hired First, Then Trained",
  meta: [
    { name: 'description', content: 'GCC school redefines career education with a hire-first model, industry immersion, and credentials designed to shape learners into accounting professionals.' },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "GCC School: Get Hired First, Then Trained",
    },
    {
      property: "og:description",
      content:
        "Industry-focused finance and accounting education programs designed to build successful global careers in CA, CPA and finance.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/",
    },
    {
      property: "og:site_name",
      content: "GCC School",
    },
    {
      property: "og:image",
      content: "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:locale",
      content: "en_IN",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "GCC School: Get Hired First, Then Trained",
    },
    {
      name: "twitter:description",
      content:
        "Industry-focused finance and accounting education programs designed to build successful global careers in CA, CPA and finance.",
    },
    {
      name: "twitter:image",
      content: "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://www.gccschool.com/",
    },
  ],
})

</script>

<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <!-- <CommonCommingSoon /> -->
    <ProgramsProgramBanner />
    <ProgramsGovtOnprogram />

    <ProgramsAIProgram />
    <ProgramsAeiap />
    <CareerPath />
    <ProgramsIAProgram />

    <ProgramsAccaProgram />
    <ProgramsAccQualification />

    <!-- <HomeThreeAboutUniversity />

    <HomeThreeGraduatePrograms />


    <Events />
    <HomeTwoApplyUniversityInEasySteps />
    <NationalExecusive /> -->
    <ProgramsProgramTimlineTwo />

    <!-- <ProgramsProgramTimeLine /> -->
    <ProgramsTeeeProgram />
    <ProgramsLmsProgram />


    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";
import CareerPath from '~/components/EAs/CareerPath.vue';
// export default defineComponent({});
const { $asset } = useNuxtApp()

useHead({
  title: "ACCA International Accounting Program (AEIAP) | GCC School",
  meta: [
    { name: "description", content: "Discover GCC School's AEIAP, an AI-enabled International Accounting Professional Program with ACCA-focused learning, industry-led training and global finance exposure." },
     // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "ACCA International Accounting Program (AEIAP) | GCC School",
    },
    {
      property: "og:description",
      content:
        "Discover GCC School's AEIAP, an AI-enabled International Accounting Professional Program with ACCA-focused learning, industry-led training and global finance exposure.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/programs/acca",
    },
    {
      property: "og:site_name",
      content: "GCC School",
    },
    {
      property: "og:image",
      content:
        $asset('static/images/GCC_OG_IMAGE.png'),
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
      content:
        "ACCA International Accounting Program (AEIAP) | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Discover GCC School's AEIAP, an AI-enabled International Accounting Professional Program with ACCA-focused learning, industry-led training and global finance exposure.",
    },
    {
      name: "twitter:image",
      content:
        $asset('static/images/GCC_OG_IMAGE.png'),
    },
  ],

  link: [
    {
      rel: "canonical",
      href: "https://www.gccschool.com/programs/acca",
    },
  ]
})
</script>

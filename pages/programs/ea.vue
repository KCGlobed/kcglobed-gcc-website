<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />

     <EAsEaBanner />
    <ProgramsGovtOnprogram />

    <!-- <ProgramsAIProgram /> -->
    
    <!-- <ProgramsAeiap /> -->
     <EAsEAaeiap />
     <EaCareerPath />
    <!-- <ProgramsIAProgram /> -->
    <EAIAProgram />

    <!-- <ProgramsAccaProgram /> -->
     <EAsEAAccaProgram />
    <!-- <ProgramsAccQualification /> -->
     <EAaccQualification />
     

    <!-- <HomeThreeAboutUniversity />

    <HomeThreeGraduatePrograms />


    <Events />
    <HomeTwoApplyUniversityInEasySteps />
    <NationalExecusive /> -->
    <!-- <ProgramsProgramTimlineTwo /> -->
     <EATimeLine/>

    <!-- <ProgramsProgramTimeLine /> -->
    <!-- <ProgramsTeeeProgram /> -->
     <EABooks />
    <ProgramsLmsProgram />


    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
import EAaccQualification from '~/components/EAs/EAaccQualification.vue';
import CareerPath from '~/components/EAs/CareerPath.vue';
import EABooks from '~/components/EAs/EABooks.vue';
import EAIAProgram from '~/components/EAs/EAIAProgram.vue';
import EATimeLine from '~/components/EAs/EATimeLine.vue';
import EaCareerPath from '~/components/EAs/EaCareerPath.vue';

// import { defineComponent } from "vue";

// export default defineComponent({});
const { $asset } = useNuxtApp()

useHead({
  title: "US Taxation Program | GCC School",
  meta: [
    { name: "description", content: "Explore GCC School's AEUTP, an AI-enabled US Taxation Professional Program featuring Enrolled Agent preparation, practical US tax skills and career opportunities." },
     // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "US Taxation Program | GCC School",
    },
    {
      property: "og:description",
      content:
        "Explore GCC School's AEUTP, an AI-enabled US Taxation Professional Program featuring Enrolled Agent preparation, practical US tax skills and career opportunities.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/programs/ea",
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
        "US Taxation Program | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Explore GCC School's AEUTP, an AI-enabled US Taxation Professional Program featuring Enrolled Agent preparation, practical US tax skills and career opportunities.",
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
      href: "https://www.gccschool.com/programs/ea",
    },
  ]
})
</script>

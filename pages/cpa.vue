<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <!-- <CommonCommingSoon /> -->
    <CpasCpaBanner />
    <ProgramsGovtOnprogram />

    <ProgramsAIProgram />
    <CpasCpaAeiap />
    <!-- <ProgramsIAProgram /> -->
    <CpasIACpa />

    <!-- <ProgramsAccaProgram /> -->
    <CpasAccaCpa />
    <!-- <ProgramsAccQualification /> -->
    <CpaAccQualification/>

    <ProgramsProgramTimlineTwo />

    <!-- <ProgramsProgramTimeLine /> -->
    <!-- <ProgramsTeeeProgram /> -->
    <CpasTeeCpa />
    <ProgramsLmsProgram />


    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
import CpaAccQualification from '~/components/Cpas/CpaAccQualification.vue';


// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
  title: "GCC School | Programs",
  meta: [
    { name: "description", content: "Advance your career with GCC School's professional programs. Explore specialized courses designed to equip graduates with industry-ready skills and global recognition." },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "Programs at GCC School | CA, CPA & Finance Career Courses",
    },
    {
      property: "og:description",
      content:
        "Explore industry-focused finance, accounting and professional certification programs designed for career success.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/programs",
    },
    {
      property: "og:site_name",
      content: "GCC School",
    },
    {
      property: "og:image",
      content:
        "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
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
        "Programs at GCC School | CA, CPA & Finance Career Courses",
    },
    {
      name: "twitter:description",
      content:
        "Explore industry-focused finance, accounting and professional certification programs designed for career success.",
    },
    {
      name: "twitter:image",
      content:
        "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
    },
  ],

  link: [
    {
      rel: "canonical",
      href: "https://www.gccschool.com/programs",
    },
  ]
})
</script>

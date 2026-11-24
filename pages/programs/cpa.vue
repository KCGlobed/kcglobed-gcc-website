<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    
    <CpasCpaBanner />
    <ProgramsGovtOnprogram />

    <AICpa />
    <CpasCpaAeiap />
     <CareerPath />

    <CpasIACpa />

    <CpasAccaCpa />

    <CpaAccQualification/>

    <CpasCpaTimelIne/>

    <CpasTeeCpa />
    <ProgramsLmsProgram />


    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
import AICpa from '~/components/Cpas/AICpa.vue';
import CpaAccQualification from '~/components/Cpas/CpaAccQualification.vue';
import CareerPath from '~/components/EAs/CareerPath.vue';

// import { defineComponent } from "vue";

// export default defineComponent({});
const { $asset } = useNuxtApp()

useHead({
  title: "US CPA Accounting Program (AEUAP) | GCC School",
  meta: [
    { name: "description", content: "Explore GCC School's AEUAP, an AI-enabled US Accounting Professional Program featuring US CPA preparation, practical accounting skills and corporate interview opportunities." },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "US CPA Accounting Program (AEUAP) | GCC School",
    },
    {
      property: "og:description",
      content:
        "Explore GCC School's AEUAP, an AI-enabled US Accounting Professional Program featuring US CPA preparation, practical accounting skills and corporate interview opportunities.",
    },
    {
      property: "og:url",
      content: "https://gccschool.com/programs/cpa",
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
        "US CPA Accounting Program (AEUAP) | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Explore GCC School's AEUAP, an AI-enabled US Accounting Professional Program featuring US CPA preparation, practical accounting skills and corporate interview opportunities.",
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
      href: "https://gccschool.com/programs/cpa",
    },
  ]
})
</script>

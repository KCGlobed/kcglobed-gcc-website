<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <!-- <CommonCommingSoon /> -->
    <NfetBanner />
    <NfetWhoCanApply />
    <NfetForGraduate />
    <NfetSyllbus />
    <NfetExamStructure />
    <NfetTestingWindow />
    <!-- <NfetDiagonstic /> -->

    <NfetGuidline />
    <NfetPartner />
    <NfetFinanceCareer />

    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
import NfetBanner from '~/components/nfet/NfetBanner.vue';

const { $asset } = useNuxtApp()

useHead({
  title: "Admissions & NFET | GCC School",
  meta: [
    {
      name: "description",
      content:
        "Find information on GCC School admissions, NFET entrance exam, eligibility criteria, selection stages and the process for applying to its professional programs."
    },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "Admissions & NFET | GCC School",
    },
    {
      property: "og:description",
      content:
        "Find information on GCC School admissions, NFET entrance exam, eligibility criteria, selection stages and the process for applying to its professional programs.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/nfet-exam",
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
        "Admissions & NFET | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Find information on GCC School admissions, NFET entrance exam, eligibility criteria, selection stages and the process for applying to its professional programs.",
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
      href: "https://www.gccschool.com/nfet-exam",
    },
  ]
})
</script>
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

useHead({
  title: "NFET Exam 2026 | National Finance Entrance Test – GCC School",
  meta: [
    {
      name: "description",
      content:
        "Apply for NFET Exam 2026 by GCC School, a national-level finance entrance test for commerce graduates. Get access to top MNC interviews, global career pathways, and AI-proctored online exam. Register now."
    },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "NFET Exam 2026 | National Finance Entrance Test",
    },
    {
      property: "og:description",
      content:
        "Apply for NFET 2026 and unlock opportunities in finance, accounting and global professional education.",
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
        "NFET Exam 2026 | National Finance Entrance Test",
    },
    {
      name: "twitter:description",
      content:
        "Apply for NFET 2026 and unlock opportunities in finance, accounting and global professional education.",
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
      href: "https://www.gccschool.com/nfet-exam",
    },
  ]
})
</script>
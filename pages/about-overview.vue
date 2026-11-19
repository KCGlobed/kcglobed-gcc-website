<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <AboutBanner />

    <AboutMeetCreater />

    <AboutThinkTank />
    <AboutCoreValue />
    <AboutIndustryMentor />
    <CommonSubjectMatterExpert />
    <AboutTechPartner />
    <CommonTrustecoSystem />






    <CommonSusentiableGoal />
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>
<script setup lang="ts">

const { $asset } = useNuxtApp()

useHead({
  title: "About GCC School",
  meta: [
    { name: "description", content: "Learn about GCC School's vision, leadership and distinctive Get Hired First. Then Trained. model for connecting professional education with corporate opportunities." },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "About GCC School",
    },
    {
      property: "og:description",
      content:
        "Learn about GCC School's vision, leadership and distinctive Get Hired First. Then Trained. model for connecting professional education with corporate opportunities.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/about-overview",
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
      content: "About GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Learn about GCC School's vision, leadership and distinctive Get Hired First. Then Trained. model for connecting professional education with corporate opportunities.",
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
      href: "https://www.gccschool.com/about-overview",
    },
  ]
})
</script>

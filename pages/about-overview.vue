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

useHead({
  title: "GCC School | About US",
  meta: [
    { name: "description", content: "Discover the vision, mission, and core values of GCC School. Learn how we are empowering the future workforce through excellence in professional education." },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "About GCC School | Career-Focused Finance Education",
    },
    {
      property: "og:description",
      content:
        "Learn about GCC School’s mission, industry-focused learning approach, expert faculty and career-driven finance education ecosystem.",
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
        "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
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
      content: "About GCC School | Career-Focused Finance Education",
    },
    {
      name: "twitter:description",
      content:
        "Learn about GCC School’s mission, industry-focused learning approach, expert faculty and career-driven finance education ecosystem.",
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
      href: "https://www.gccschool.com/about-overview",
    },
  ]
})
</script>

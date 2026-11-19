<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <HomeOneMainBanner />
    <HomeOneInformationForInternationalStudents />
    <CommonPathwayYourSuccess />
    <CommonEligibilityCriteria />
    <HomeOneFutureStudents />
    <CommonGccSchool />
    <CommonDirectorSpeach />
    <CommonGccCommerse />
    <CommonGrowthTrend />
    <CommonPathway />
    <HomeOneCurrentAcademicStudents />
    <CommonThinkTank />
    <CommonSubjectMatterExpert />
    <CommonIndustryMentor />
    <CommonFunFact />
    <CommonNewsCard />
    <CommonTrustecoSystem />
    <CommonFaqSection />
    <CommonCampus />
    <LayoutMainFooter />
    <LayoutCopyRight />

    <!-- Event Popup -->
    <!-- <CommonEventPopup /> -->
  </div>
</template>

<script setup lang="ts">

const { $asset } = useNuxtApp()

useHead({
  title: "GCC School | Get Hired First. Then Trained.",
  meta: [
    { name: 'description', content: "Discover GCC School's hire-first education model for commerce and management graduates, combining corporate selection with industry-led training in global finance." },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "GCC School | Get Hired First. Then Trained.",
    },
    {
      property: "og:description",
      content:
        "Discover GCC School's hire-first education model for commerce and management graduates, combining corporate selection with industry-led training in global finance.",
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
      content: $asset('static/images/GCC_OG_IMAGE.png'),
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
      content: "GCC School | Get Hired First. Then Trained.",
    },
    {
      name: "twitter:description",
      content:
        "Discover GCC School's hire-first education model for commerce and management graduates, combining corporate selection with industry-led training in global finance.",
    },
    {
      name: "twitter:image",
      content: $asset('static/images/GCC_OG_IMAGE.png'),
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

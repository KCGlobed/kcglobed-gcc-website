<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <HomeOneMainBanner />
    <!-- Everything below the hero is still server-rendered (same HTML, same SEO), but its
         JavaScript is loaded and hydrated only when the section scrolls near the viewport.
         This keeps the main thread free during page load. -->
    <LazyHomeOneInformationForInternationalStudents hydrate-on-visible />
    <LazyCommonPathwayYourSuccess hydrate-on-visible />
    <LazyCommonEligibilityCriteria hydrate-on-visible />
    <LazyHomeOneFutureStudents hydrate-on-visible />
    <LazyCommonGccSchool hydrate-on-visible />
    <LazyCommonDirectorSpeach hydrate-on-visible />
    <LazyCommonGccCommerse hydrate-on-visible />
    <LazyCommonGrowthTrend hydrate-on-visible />
    <LazyCommonPathway hydrate-on-visible />
    <LazyHomeOneCurrentAcademicStudents hydrate-on-visible />
    <LazyCommonThinkTank hydrate-on-visible />
    <LazyCommonSubjectMatterExpert hydrate-on-visible />
    <LazyCommonIndustryMentor hydrate-on-visible />
    <LazyCommonFunFact hydrate-on-visible />
    <LazyCommonNewsCard hydrate-on-visible />
    <LazyCommonTrustecoSystem hydrate-on-visible />
    <LazyCommonFaqSection hydrate-on-visible />
    <LazyCommonCampus hydrate-on-visible />
    <LazyLayoutMainFooter hydrate-on-visible />
    <LazyLayoutCopyRight hydrate-on-visible />
    <!-- Event Popup -->
    <!-- <CommonEventPopup /> -->
  </div>
</template>

<script setup lang="ts">

import mobileBanner from "~/assets/img/heros/mobileBanner.svg"

const { $asset } = useNuxtApp()

useHead({
  title: "GCC School | Accounting & Finance Careers for Graduates",
  meta: [
    { name: 'description', content: "GCC School prepares commerce graduates for global accounting and finance careers through AI-enabled programs in International Accounting, US Accounting and US Taxation." },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "GCC School | Accounting & Finance Careers for Graduates",
    },
    {
      property: "og:description",
      content:
        "GCC School prepares commerce graduates for global accounting and finance careers through AI-enabled programs in International Accounting, US Accounting and US Taxation.",
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
      content: "GCC School | Accounting & Finance Careers for Graduates",
    },
    {
      name: "twitter:description",
      content:
        "GCC School prepares commerce graduates for global accounting and finance careers through AI-enabled programs in International Accounting, US Accounting and US Taxation.",
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
    // Mobile hero background (the LCP element on phones): start fetching it early.
    {
      rel: "preload",
      as: "image",
      href: mobileBanner,
      media: "(max-width: 580px)",
      fetchpriority: "high",
    },
  ],
  
})
</script>

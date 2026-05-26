<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Campus CEO" mainTitle="STUDENT" /> -->
        <FormsCampusCeoStudentForm />

        <!-- <CommonCommingSoon /> -->

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Campus CEO - Student",
    meta: [
        { name: "description", content: "Become a student leader with the GCC School Campus CEO program. Develop essential leadership, marketing, and corporate skills while driving growth on campus." },
         // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content:
        "Campus CEO - Student Leadership Program | GCC School",
    },
    {
      property: "og:description",
      content:
        "Discover how GCC School empowers students through leadership, entrepreneurship and career-building opportunities.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/campus-ceo/student",
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
        "Campus CEO - Student Leadership Program | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Discover how GCC School empowers students through leadership, entrepreneurship and career-building opportunities.",
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
      href: "https://www.gccschool.com/campus-ceo/student",
    },
    ]
})

</script>

<style scoped></style>

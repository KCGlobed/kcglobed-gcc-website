<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Campus CEO" mainTitle="FACULTY" /> -->
        <FormsCampusCeoFacultyForm />
        <!-- <CommonCommingSoon /> -->

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Campus CEO - Faculty",
    meta: [
        { name: "description", content: "Empower your students as a GCC School Faculty Campus CEO. Mentor the next generation of professionals and lead corporate engagement initiatives at your college." },
         // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Campus CEO Faculty | GCC School",
    },
    {
      property: "og:description",
      content:
        "Meet the expert faculty members and mentors guiding students toward successful finance careers at GCC School.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/campus-ceo/faculty",
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
      content: "Campus CEO Faculty | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Meet the expert faculty members and mentors guiding students toward successful finance careers at GCC School.",
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
      href: "https://www.gccschool.com/campus-ceo/faculty",
    },
    ]
})

</script>

<style scoped></style>

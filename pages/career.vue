<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Campus CEO" mainTitle="FACULTY" /> -->
        <FormsCareerForm />
        <!-- <CommonCommingSoon /> -->

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Career",
    meta: [
        { name: "description", content: "Build a rewarding career with GCC School. Explore corporate job openings, faculty positions, and exciting growth opportunities within our educational community." },
          // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Careers at GCC School | Join Our Team",
    },
    {
      property: "og:description",
      content:
        "Explore career opportunities at GCC School and become part of a fast-growing education and finance ecosystem.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/career",
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
      content: "Careers at GCC School | Join Our Team",
    },
    {
      name: "twitter:description",
      content:
        "Explore career opportunities at GCC School and become part of a fast-growing education and finance ecosystem.",
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
      href: "https://www.gccschool.com/career",
    },
    ]
})

</script>
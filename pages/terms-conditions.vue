<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <TermsConditions />
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "GCC School",
  meta: [
    { name: "description", content: "Read the official terms and conditions for using the GCC School website, services, and academic programs. Stay informed about our guidelines and policies." },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Terms & Conditions | GCC School",
    },
    {
      property: "og:description",
      content:
        "Read the terms and conditions governing the use of GCC School’s website, programs, admissions and services.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/terms-conditions",
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
      content: "Terms & Conditions | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Read the terms and conditions governing the use of GCC School’s website, programs, admissions and services.",
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
      href: "https://www.gccschool.com/terms-conditions",
    },
  ]
})
</script>

<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <PrivacyPolicy />
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "GCC School",
  meta: [
    { name: "description", content: "Your privacy matters to us. Read the GCC School privacy policy to understand how we collect, protect, and securely manage your personal data and information." },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Privacy Policy | GCC School",
    },
    {
      property: "og:description",
      content:
        "Understand how GCC School collects, uses and protects user information across its website and educational services.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/privacy-policy",
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
      content: "Privacy Policy | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Understand how GCC School collects, uses and protects user information across its website and educational services.",
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
      href: "https://www.gccschool.com/privacy-policy",
    },
  ]
})
</script>

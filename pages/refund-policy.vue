<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <RefundPolicy />
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Refund Policy | GCC School",
  meta: [
    { name: "description", content: "Read the official payment & refund policy for GCC School programs, assessments, registration fees, and admission processes." },
    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Payment & Refund Policy | GCC School",
    },
    {
      property: "og:description",
      content:
        "Understand the terms and conditions governing payments, registrations, admissions, and refunds for GCC School programs.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/refund-policy",
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
      content: "Payment & Refund Policy | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Understand the terms and conditions governing payments, registrations, admissions, and refunds for GCC School programs.",
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
      href: "https://www.gccschool.com/refund-policy",
    },
  ]
})
</script>

<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <!-- <FormsPartnerWithUsForm /> -->
    <!-- <CommonCommingSoon /> -->
    <FormsLoginForm />
    <LayoutMainFooter />
    <!-- <LayoutCopyRight /> -->
  </div>
</template>

<script setup lang="ts">

useHead({
  title: "Student Login | GCC School",

  meta: [
    {
      name: "description",
      content:
        "Access your GCC School student portal, learning dashboard and academic resources securely.",
    },

    // Open Graph
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Student Login | GCC School",
    },
    {
      property: "og:description",
      content:
        "Access your GCC School student portal, learning dashboard and academic resources securely.",
    },
    {
      property: "og:url",
      content: "https://www.gccschool.com/login",
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
      content: "Student Login | GCC School",
    },
    {
      name: "twitter:description",
      content:
        "Access your GCC School student portal, learning dashboard and academic resources securely.",
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
      href: "https://www.gccschool.com/login",
    },
  ],
});

// If already authenticated, redirect straight to profile
onMounted(() => {
  const token = localStorage.getItem('gcc_access_token')
  if (token) {
    window.location.href = '/myaccount'
  }
})
</script>

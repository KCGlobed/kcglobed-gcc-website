 page<template>
  <div>
    <LayoutTopHeader class="style2-top-header" />
    <LayoutMainNavbar />
    <CommonInnerPageBanner pageTitle="News & Updates" mainTitle="NEWS" />
    <NewsListing />
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "News & Updates | GCC School",
  meta: [
    { name: 'description', content: 'Stay updated with the latest news, announcements, and insights from GCC School and KC GlobEd.' }
  ]
})
</script>

<style scoped>
/* Any page-specific styles if needed */
</style>

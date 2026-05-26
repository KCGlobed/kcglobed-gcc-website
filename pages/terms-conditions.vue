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
    { name: "description", content: "Read the official terms and conditions for using the GCC School website, services, and academic programs. Stay informed about our guidelines and policies." }
  ]
})
</script>

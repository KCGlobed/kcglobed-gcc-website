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
    { name: "description", content: "Your privacy matters to us. Read the GCC School privacy policy to understand how we collect, protect, and securely manage your personal data and information." }
  ]
})
</script>

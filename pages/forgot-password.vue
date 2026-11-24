<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <FormsPartnerWithUsForm /> -->
        <!-- <CommonCommingSoon /> -->
        <FormsForgotForm />
        <LayoutMainFooter />
        <!-- <LayoutCopyRight /> -->
    </div>
</template>

<script setup lang="ts">

useHead({
    title: "GCC School | Login",
    // Utility page: keep it out of search results.
    meta: [{ name: "robots", content: "noindex, follow" }],
})
</script>
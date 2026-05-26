<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <FormsPartnerWithUsForm />
        <!-- <CommonCommingSoon /> -->
        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Partner With Us",
    meta: [
        { name: "description", content: "Partner with GCC School to bridge the gap between education and industry. Explore institutional collaborations, affiliate opportunities, and corporate alliances." }
    ]
})
</script>

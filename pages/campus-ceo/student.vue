<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Campus CEO" mainTitle="STUDENT" /> -->
        <FormsCampusCeoStudentForm />

        <!-- <CommonCommingSoon /> -->

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Campus CEO - Student",
    meta: [
        { name: "description", content: "Become a student leader with the GCC School Campus CEO program. Develop essential leadership, marketing, and corporate skills while driving growth on campus." }
    ]
})

</script>

<style scoped></style>

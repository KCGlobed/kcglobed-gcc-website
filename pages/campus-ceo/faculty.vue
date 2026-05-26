<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Campus CEO" mainTitle="FACULTY" /> -->
        <FormsCampusCeoFacultyForm />
        <!-- <CommonCommingSoon /> -->

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Campus CEO - Faculty",
    meta: [
        { name: "description", content: "Empower your students as a GCC School Faculty Campus CEO. Mentor the next generation of professionals and lead corporate engagement initiatives at your college." }
    ]
})

</script>

<style scoped></style>

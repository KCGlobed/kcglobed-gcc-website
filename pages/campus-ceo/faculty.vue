<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Campus CEO" mainTitle="FACULTY" /> -->

        <CommonCommingSoon />

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CampusCeoFaculty"
});
</script>

<style scoped></style>

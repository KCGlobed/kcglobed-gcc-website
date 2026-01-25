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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CampusCeoStudent"
});
</script>

<style scoped></style>

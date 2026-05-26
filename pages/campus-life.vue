<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <CampusLifeCampusBanner />
        <CommonFloorMap />
        <CampusLifeCampusOutcome />
        <CampusLifeCampusGoal />
        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Campus Life",
    meta: [
        { name: "description", content: "Experience life at GCC School. Explore our vibrant campus culture, student organizations, state-of-the-art facilities, and diverse extracurricular activities." }
    ]
})
</script>
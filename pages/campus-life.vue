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
        { name: "description", content: "Experience life at GCC School. Explore our vibrant campus culture, student organizations, state-of-the-art facilities, and diverse extracurricular activities." },
        // Open Graph
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:title",
            content:
                "Campus Life at GCC School | Student Experience & Culture",
        },
        {
            property: "og:description",
            content:
                "Explore student life, events, networking opportunities, learning culture and experiences at GCC School.",
        },
        {
            property: "og:url",
            content: "https://www.gccschool.com/campus-life",
        },
        {
            property: "og:site_name",
            content: "GCC School",
        },
        {
            property: "og:image",
            content:
                "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
        },
        {
            property: "og:locale",
            content: "en_IN",
        },

        // Twitter
        {
            name: "twitter:card",
            content: "summary_large_image",
        },
        {
            name: "twitter:title",
            content:
                "Campus Life at GCC School | Student Experience & Culture",
        },
        {
            name: "twitter:description",
            content:
                "Explore student life, events, networking opportunities, learning culture and experiences at GCC School.",
        },
        {
            name: "twitter:image",
            content:
                "https://storage.googleapis.com/gcc_static_files_backend/static/images/GCC_OG_IMAGE.png",
        },
    ],

    link: [
        {
            rel: "canonical",
            href: "https://www.gccschool.com/campus-life",
        },

    ]
})
</script>
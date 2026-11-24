<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <CampusLifeCampusBanner />
        <CampusTour />
        <CommonFloorMap />
        <CampusLifeCampusOutcome />
        <CampusLifeCampusGoal />
        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
import CampusTour from '~/components/Common/CampusTour.vue';

// import { defineComponent } from "vue";

// export default defineComponent({});
const { $asset } = useNuxtApp()

useHead({
    title: "Campus Life | GCC School",
    meta: [
        { name: "description", content: "Explore life at GCC School's Gurugram campus, from practical training in SAP FI-CO, NetSuite and Applied AI to mentorship and a corporate learning environment." },
        // Open Graph
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:title",
            content:
                "Campus Life | GCC School",
        },
        {
            property: "og:description",
            content:
                "Explore life at GCC School's Gurugram campus, from practical training in SAP FI-CO, NetSuite and Applied AI to mentorship and a corporate learning environment.",
        },
        {
            property: "og:url",
            content: "https://gccschool.com/campus-life",
        },
        {
            property: "og:site_name",
            content: "GCC School",
        },
        {
            property: "og:image",
            content:
                $asset('static/images/GCC_OG_IMAGE.png'),
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
                "Campus Life | GCC School",
        },
        {
            name: "twitter:description",
            content:
                "Explore life at GCC School's Gurugram campus, from practical training in SAP FI-CO, NetSuite and Applied AI to mentorship and a corporate learning environment.",
        },
        {
            name: "twitter:image",
            content:
                $asset('static/images/GCC_OG_IMAGE.png'),
        },
    ],

    link: [
        {
            rel: "canonical",
            href: "https://gccschool.com/campus-life",
        },

    ]
})
</script>
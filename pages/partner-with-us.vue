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
        { name: "description", content: "Partner with GCC School to bridge the gap between education and industry. Explore institutional collaborations, affiliate opportunities, and corporate alliances." },
        // Open Graph
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:title",
            content:
                "Partner With GCC School | Collaboration Opportunities",
        },
        {
            property: "og:description",
            content:
                "Collaborate with GCC School for academic partnerships, industry initiatives, recruitment and educational growth.",
        },
        {
            property: "og:url",
            content: "https://www.gccschool.com/partner-with-us",
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
                "Partner With GCC School | Collaboration Opportunities",
        },
        {
            name: "twitter:description",
            content:
                "Collaborate with GCC School for academic partnerships, industry initiatives, recruitment and educational growth.",
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
            href: "https://www.gccschool.com/partner-with-us",
        },

    ]
})
</script>

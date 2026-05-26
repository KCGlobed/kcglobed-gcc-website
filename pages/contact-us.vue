<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <ContactusBanner />
        <Contact />
        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC School | Contant us",
    meta: [
        { name: "description", content: "Have questions about our professional courses or admissions? Get in touch with the GCC School support team via phone, email, or our online contact form." }
    ]
})
</script>

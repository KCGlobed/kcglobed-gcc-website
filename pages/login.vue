<!-- <template>
  <div>
    <LayoutTopHeader class="style2-top-header" />
    <LayoutNavbarStyleTwo class="inner-navbar" />
    <CommonInnerPageBanner pageTitle="Login" mainTitle="LOGIN" />
    <Login />
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script> -->

<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <FormsPartnerWithUsForm /> -->
         <CommonCommingSoon />
        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({});
useHead({
    title: "GCC University | Login",
})
</script>

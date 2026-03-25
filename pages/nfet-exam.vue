<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonCommingSoon /> -->
        <NfetBanner />
        <NfetWhoCanApply />
        <NfetForGraduate />
        <NfetSyllbus />
        <NfetExamStructure />
        <NfetTestingWindow />
        <!-- <NfetDiagonstic /> -->

        <NfetGuidline />
        <NfetPartner />
        <NfetFinanceCareer />

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<script setup lang="ts">
import NfetBanner from '~/components/nfet/NfetBanner.vue';

useHead({
  title: "NFET Exam 2026 | National Finance Entrance Test – GCC School",
  meta: [
    {
      name: "description",
      content:
        "Apply for NFET Exam 2026 by GCC School, a national-level finance entrance test for commerce graduates. Get access to top MNC interviews, global career pathways, and AI-proctored online exam. Register now."
    }
  ]
})
</script>
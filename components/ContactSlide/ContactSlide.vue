<template>
  <!-- The tab and the panel move together, so the tab stays clickable to close the form. -->
  <div class="apply-slide" :class="{ open: isOpen }">
    <!-- Side Button -->
    <button type="button" class="contact-tab" :aria-expanded="isOpen" aria-controls="applySlidePanel"
      @click="toggleForm">
      Apply Now
    </button>

    <!-- Slide Form: same form and layout as the Apply Now (dossier) popup -->
    <div id="applySlidePanel" class="contact-panel" :aria-hidden="!isOpen" :inert="!isOpen || undefined">
      <component :is="dossierForm" v-if="dossierForm" :inline="true" modal-id="sideApplyForm"
        modal-title="Apply Now" subtitle="Enter your details to complete your application" mode="apply" />
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, nextTick } from "vue"

const isOpen = ref(false)
// The form component is loaded on the first click, so pages don't download it until it's needed.
const dossierForm = shallowRef(null)

const toggleForm = async () => {
  if (!dossierForm.value) {
    const mod = await import("~/components/Common/DossierModal.vue")
    dossierForm.value = mod.default
    await nextTick()
    // let the browser paint the closed position first so the slide animation runs
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  }
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.apply-slide {
  --panel-width: 560px;
  --tab-width: 44px;
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  /* closed: only the tab is on screen */
  transform: translate(var(--panel-width), -50%);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.apply-slide.open {
  transform: translate(0, -50%);
  z-index: 10000000;
}

.contact-tab {
  pointer-events: auto;
  width: var(--tab-width);
  flex: none;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  background: #A13E99 !important;
  color: white;
  border: none;
  padding: 22px 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  border-radius: 0 6px 6px 0;
}

.contact-tab:focus-visible {
  outline: 3px solid #f1d5a2;
  outline-offset: 2px;
}

.contact-panel {
  pointer-events: auto;
  width: var(--panel-width);
  margin: 10px 0 5px;
  max-height: calc(100vh - 15px);
  max-height: calc(100dvh - 15px);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 24px 0 0 24px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  visibility: hidden;
  transition: visibility 0s linear 0.45s;
}

.apply-slide.open .contact-panel {
  visibility: visible;
  transition: visibility 0s;
}

.contact-panel :deep(.dossier-inline-card) {
  max-width: none;
  border-radius: 24px 0 0 24px;
  box-shadow: none;
  padding-top: 1.1rem;
}

/* Referral-code tooltip: open towards the left so it stays inside the panel
   (centred, it stuck out past the right edge and caused a horizontal scrollbar). */
.contact-panel :deep(.custom-tooltip-content) {
  left: auto;
  right: -14px;
  transform: none;
  max-width: calc(100vw - 80px);
}

.contact-panel :deep(.custom-tooltip-content::after) {
  left: auto;
  right: 16px;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .apply-slide {
    transition: none;
  }
}

/* 📱 Mobile responsive */
@media (max-width: 768px) {
  .apply-slide {
    --tab-width: 34px;
    --panel-width: calc(100vw - var(--tab-width));
  }

  .contact-tab {
    padding: 14px 5px;
    font-size: 14px;
  }

  .contact-panel {
    margin: 10px 0 5px;
    max-height: calc(100vh - 15px);
    max-height: calc(100dvh - 15px);
  }
}
</style>

<template>
  <div class="about-all-pages pt-50 mb-50">
    <div class="container">
      <div class="inner-all-pages">
        <ul class="about-pages-list style2">
          <li v-for="(step, index) in steps" :key="index">
            <a 
              style="cursor: pointer;" 
              :class="{ 'active': activeStep === index + 1 }"
              @click="$emit('step-selected', index + 1)"
            >
              {{ step }}
          </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplicationPagesList",
  props: {
    activeStep: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data() {
    return {
      steps: [
        "PERSONAL INFORMATION",
        "ACADEMIC INFORMATION",
        "WORK EXPERIENCE DETAILS",
        "DOCUMENT UPLOADS",
        "PRE-PAYMENT DECLARATION (MANDATORY)"
      ]
    };
  },
  emits: ['step-selected']
};
</script>

<template>
  <div>
    <LayoutTopHeader class="style2-top-header" />
    <LayoutNavbarStyleTwo class="inner-navbar" />
    <CommonInnerPageBanner pageTitle="Application Form" />
    
    <CommonApplicationPagesList 
      :activeStep="currentStep" 
      @step-selected="handleStepSelection" 
    />

    <keep-alive>
      <component :is="activeComponent" ref="currentStepComponent" />
    </keep-alive>

    <div class="container pb-100">
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex justify-content-between">
            <button 
              class="default-btn" 
              @click="prevStep" 
              v-if="currentStep > 1"
            >
              <i class="ti ti-arrow-narrow-left"></i> Back
            </button>
            <div v-else></div> <!-- Spacer -->

      <button 
              class="default-btn" 
              @click="nextStep" 
              v-if="currentStep < totalSteps"
            >
              Next <i class="ti ti-arrow-narrow-right"></i>
            </button>
             <button 
              class="default-btn" 
              v-else
              @click="handleFinalSubmit"
            >
              Proceed to Pay <i class="ti ti-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import PersonalInformation from "../components/PersonalInformation/PersonalInformation.vue";
import AcademicInformation from "../components/AcademicInformation/AcademicInformation.vue";
import WorkExperienceDetails from "../components/WorkExperienceDetails/WorkExperienceDetails.vue";
import DocumentUpload from "../components/DocumentUpload/DocumentUpload.vue";
import PrePaymentDeclaration from "../components/PrePaymentDeclaration/PrePaymentDeclaration.vue";

export default defineComponent({
  name: "ApplicationFormPage",
  components: {
    PersonalInformation,
    AcademicInformation,
    WorkExperienceDetails,
    DocumentUpload,
    PrePaymentDeclaration,
  },
  setup() {
    const currentStep = ref(1);
    const totalSteps = 5;
    const currentStepComponent = ref<any>(null);

    const activeComponent = computed(() => {
      switch (currentStep.value) {
        case 1:
          return "PersonalInformation";
        case 2:
          return "AcademicInformation";
        case 3:
          return "WorkExperienceDetails";
        case 4:
          return "DocumentUpload";
        case 5:
          return "PrePaymentDeclaration";
        default:
          return "PersonalInformation";
      }
    });

    const handleStepSelection = (step: number) => {
        // Only allow navigating backwards to already visited steps.
        // Forward navigation must be done via Next button to ensure validation.
        if (step < currentStep.value) {
           currentStep.value = step;
           // window.scrollTo(0, 0);
        }
    };

    const nextStep = () => {
      if (currentStepComponent.value && currentStepComponent.value.validate) {
          const isValid = currentStepComponent.value.validate();
          if (!isValid) return;
      }

      if (currentStep.value < totalSteps) {
        currentStep.value++;
        // window.scrollTo(0, 0);
      }
    };

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        // window.scrollTo(0, 0);
      }
    };

    const handleFinalSubmit = () => {
        // Final validation
         if (currentStepComponent.value && currentStepComponent.value.validate) {
            const isValid = currentStepComponent.value.validate();
            if (!isValid) return;
        }
        // Proceed...
        console.log("Form submitted");
    }

    return {
      currentStep,
      totalSteps,
      activeComponent,
      handleStepSelection,
      nextStep,
      prevStep,
      currentStepComponent,
      handleFinalSubmit
    };
  },
});
</script>

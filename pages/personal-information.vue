<template>
  <div>
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <!-- <LayoutNavbarStyleTwo class="inner-navbar" /> -->
    <CommonInnerPageBanner pageTitle="Application Form" />

    <CommonApplicationPagesList :activeStep="currentStep" @step-selected="handleStepSelection" />

    <keep-alive>
      <component :is="activeComponent" ref="currentStepComponent" :formData="formData" :userId="userId" />
    </keep-alive>

    <div class="container pb-100">
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex justify-content-between">
            <button class="default-btn" @click="prevStep" v-if="currentStep > 1">
              <i class="ti ti-arrow-narrow-left"></i> Back
            </button>
            <div v-else></div> <!-- Spacer -->

            <button class="default-btn" @click="nextStep" v-if="currentStep < totalSteps">
              Next <i class="ti ti-arrow-narrow-right"></i>
            </button>
            <button class="default-btn" v-else @click="handleFinalSubmit">
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
import { useHead } from "#imports";
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
    useHead({
      title: "Application Form",
      meta: [
        {
          name: "description",
          content: "Apply online to GCC University. Complete your application form and proceed with payment."
        }
      ]
    });
    const totalSteps = 5;
    const userId = ref<number | null>(null);
    const formData = reactive({
      first_name: "",
      last_name: "",
      father_name: "",
      father_mobile: "",
      father_email: "",
      father_occupation: "",
      father_occupation_other: "",
      mother_name: "",
      mother_mobile: "",
      mother_email: "",
      mother_occupation: "",
      mother_occupation_other: "",
      dob: "",
      gender: "",
      nationality: "Indian",
      email: "",
      mobile: "",
      city: "",
      state: "",
      pin_code: "",
      class10_year: "",
      class10_score: "",
      class12_year: "",
      class12_score: "",
      medium: "",
      medium_other: "",
      ug_status: "",
      first_division: "",
      ug_cgpa: "",
      ug_institution: "",
      pg_exists: "",
      pg_type: "",
      pg_other: "",
      pg_institution: "",
      work_experience: [],
      documents: {}
    });
    const currentStepComponent = ref<any>(null);

    function loadRazorpayScript() {
      return new Promise((resolve) => {
        if ((window as any).Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    }

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

    const nextStep = async () => {
      if (currentStepComponent.value?.validate) {
        const isValid = currentStepComponent.value.validate();
        if (!isValid) return;
      }

      // Submit data after Work Experience (Step 3)
      if (currentStep.value === 3) {
        const saved = await submitUserData();
        if (!saved) return; // stop if API fails
      }

      if (currentStep.value < totalSteps) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        // window.scrollTo(0, 0);
      }
    };

    const submitUserData = async () => {
      try {
        const response: any = await $fetch("/api/register-user", {
          method: "POST",
          body: formData
        });

        if (!response.success) {
          alert(response.message || "Submission failed");
          return false;
        }

        userId.value = response.user_id; // 👈 store it here
        console.log("User ID:", userId.value);

        return true;
      } catch (error) {
        console.error("API Error:", error);
        alert("Something went wrong. Please try again.");
        return false;
      }
    };

    const handleFinalSubmit = async () => {
      if (currentStepComponent.value?.validate) {
        const isValid = currentStepComponent.value.validate();
        if (!isValid) return;
      }
      try {
        console.log(process.env.PAYMENT_AMOUNT, '-----amount----------')
        // 1. Call your backend to create Razorpay order
        const res: any = await $fetch("/api/start-payment", {
          method: "POST",
          body: {
            user_id: userId.value,
            name: formData.first_name + " " + formData.last_name,
            email: formData.email,
            mobile: formData.mobile
          }
        });

        // 2. Load Razorpay script
        const loaded = await loadRazorpayScript();
        if (!loaded || !(window as any).Razorpay) {
          alert("Razorpay SDK failed to load");
          return;
        }

        // 3. Open Razorpay Checkout
        const options = {
          key: res.razorpay_key,
          amount: res.amount,
          currency: res.currency,
          name: "Application Fee",
          description: "NFET Application Payment",
          order_id: res.razorpay_order_id,

          handler: async function (response: any) {
            await $fetch("/api/complete-payment", {
              method: "POST",
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            alert("Payment Successful!");
            // window.location.href = "/success";
          },

          prefill: {
            name: formData.first_name + " " + formData.last_name,
            email: formData.email,
            contact: formData.mobile
          },

          theme: {
            color: "#FBB03B"
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", async (response: any) => {
          console.error("Payment Failed:", response.error);

          // Report failure to backend
          try {
            await $fetch("/api/report-payment-failure", {
              method: "POST",
              body: {
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: response.error.metadata?.payment_id,
                error_details: response.error
              }
            });
          } catch (reportError) {
            console.error("Failed to report payment failure:", reportError);
          }

          alert(`Payment Failed: ${response.error.description || "Unknown error"}`);
        });

        rzp.open();

      } catch (err) {
        console.error(err);
        alert("Payment initiation failed");
      }
    };

    return {
      currentStep,
      totalSteps,
      activeComponent,
      handleStepSelection,
      nextStep,
      prevStep,
      currentStepComponent,
      handleFinalSubmit,
      formData,
      userId
    };
  },
});
</script>

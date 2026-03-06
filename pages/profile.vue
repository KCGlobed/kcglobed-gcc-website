<template>
    <div>
        <LayoutTopHeader />
        <LayoutMainNavbar />
        <!-- <CommonInnerPageBanner pageTitle="Profile" /> -->

        <!-- Profile Header Card -->
        <div class="container pt-50 pb-30">
            <div class="profile-header-card">
                <!-- Cover Banner -->
                <div class="profile-cover">
                    <!-- <button class="profile-edit-btn" title="Edit Cover"> -->
                    <!-- <i class="ti ti-pencil"></i> Edit -->
                    <!-- </button> -->
                </div>

                <!-- Avatar (overlapping cover) -->
                <div class="profile-avatar-wrap">
                    <div class="profile-avatar">
                        <i class="ti ti-user"></i>
                    </div>
                </div>

                <!-- Info below -->
                <!-- <div class="profile-info">
                    <h2 class="profile-name">
                        {{ (formData.first_name || 'Applicant') + ' ' + formData.last_name }}
                    </h2>
                    <p class="profile-detail" v-if="formData.email">
                        {{ formData.email }}
                    </p>
                    <p class="profile-detail" v-if="formData.mobile">
                        {{ formData.mobile }}
                    </p>
                    <p class="profile-detail" v-if="formData.city">
                        {{ formData.city }}<span v-if="formData.state">, {{ formData.state }}</span>
                    </p>
                </div> -->
            </div>
        </div>

        <!-- 4 Accordion Sections -->
        <div class="container pb-30">
            <div class="profile-accordion">

                <!-- Section 1: Personal Information -->
                <div class="accordion-section" :class="{ active: openSection === 1 }">
                    <div class="accordion-header" @click="toggleSection(1)">
                        <div class="accordion-header-left">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="accordion-icon"><i class="ti ti-user"></i></span>
                                <h4>Personal Information</h4>
                                <!-- <p>Name, contact, address &amp; family details</p> -->
                            </div>
                        </div>
                        <div class="accordion-header-right">

                            <i class="ti accordion-chevron"
                                :class="openSection === 1 ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                        </div>
                    </div>
                    <div class="accordion-body p-4 p-lg-5" v-show="openSection === 1">
                        <PersonalInformation ref="section1Ref" :formData="formData" />
                    </div>
                </div>

                <!-- Section 2: Academic Information -->
                <div class="accordion-section" :class="{ active: openSection === 2 }">
                    <div class="accordion-header" @click="toggleSection(2)">
                        <div class="accordion-header-left">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="accordion-icon"><i class="ti ti-school"></i></span>
                                <h4>Academic Information</h4>
                            </div>
                        </div>
                        <div class="accordion-header-right">

                            <i class="ti accordion-chevron"
                                :class="openSection === 2 ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                        </div>
                    </div>
                    <div class="accordion-body p-4 p-lg-5" v-show="openSection === 2">
                        <AcademicInformation ref="section2Ref" :formData="formData" />
                    </div>
                </div>

                <!-- Section 3: Work Experience -->
                <div class="accordion-section" :class="{ active: openSection === 3 }">
                    <div class="accordion-header" @click="toggleSection(3)">
                        <div class="accordion-header-left">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="accordion-icon"><i class="ti ti-briefcase"></i></span>
                                <h4>Work Experience</h4>
                            </div>
                        </div>
                        <div class="accordion-header-right">
                            <i class="ti accordion-chevron"
                                :class="openSection === 3 ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                        </div>
                    </div>
                    <div class="accordion-body p-4 p-lg-5" v-show="openSection === 3">
                        <WorkExperienceDetails ref="section3Ref" :formData="formData" />
                    </div>
                </div>

                <!-- Section 4: Documents & Declaration -->
                <div class="accordion-section" :class="{ active: openSection === 4 }">
                    <div class="accordion-header" @click="toggleSection(4)">
                        <div class="accordion-header-left">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="accordion-icon"><i class="ti ti-files"></i></span>
                                <h4>Documents</h4>
                            </div>
                        </div>
                        <div class="accordion-header-right">
                            <i class="ti accordion-chevron"
                                :class="openSection === 4 ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                        </div>
                    </div>
                    <div class="accordion-body p-4 p-lg-5" v-show="openSection === 4">
                        <DocumentUpload ref="section4aRef" :formData="formData" />
                        <!-- <div class="section-divider"></div> -->
                        <!-- <PrePaymentDeclaration ref="section4bRef" :formData="formData" /> -->
                    </div>
                </div>
                <div class="p-3 bg-light rounded-3 mb-4">
                    <div class="form-check custom-declaration">
                        <input class="form-check-input" type="checkbox" id="declaration"
                            v-model="formData.declaration" />
                        <label class="form-check-label ms-2 fw-medium text-dark" for="declaration">
                            I declare that all the information and documents submitted by me are true to the best of my
                            knowledge. I agree that in case any information or document found fake/forged/false
                            submitted by me, then my candidature may cancel at any stage of course. 
                        </label>
                    </div>
                </div>

            </div>
        </div>

        <!-- Proceed to Pay Button -->
        <div class="container pb-100">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex justify-content-center">
                        <button style="background-color: #872980;" class="submit-btn default-btn"
                            @click="handleFinalSubmit" :disabled="!formData.declaration"
                            :class="{ 'opacity-50 cursor-not-allowed': !formData.declaration }">
                            Submit <i class="ti ti-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <LayoutMainFooter />
        <LayoutCopyRight />
    </div>
</template>

<!-- ✅ PROTECTED ROUTE — redirects to /login if no valid token found -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import PersonalInformation from "../components/PersonalInformation/PersonalInformation.vue";
import AcademicInformation from "../components/AcademicInformation/AcademicInformation.vue";
import WorkExperienceDetails from "../components/WorkExperienceDetails/WorkExperienceDetails.vue";
import DocumentUpload from "../components/DocumentUpload/DocumentUpload.vue";
// import PrePaymentDeclaration from "../components/PrePaymentDeclaration/PrePaymentDeclaration.vue";

// Layer 1: Middleware for Nuxt navigation
definePageMeta({
    middleware: ['auth']
})

useHead({
    title: "My Application Profile",
    meta: [
        {
            name: "description",
            content: "View and update your GCC application profile — personal, academic, work experience and documents."
        }
    ]
});

// Read the authenticated user's ID from the auth composable (set at login)
const { userId, init: initAuth } = useAuth()

// Hydrate auth state (reads from localStorage) on mount
onMounted(() => {
    initAuth()
})

const openSection = ref<number | null>(1); // first section open by default

const formData = reactive({
    first_name: "",
    last_name: "",
    father_name: "",
    father_mobile: "",
    dob: "",
    gender: "",
    nationality: "Indian",
    email: "",
    mobile: "",
    city: "",
    state: "",
    pin_code: "",
    complete_address: "",
    class10_year: "",
    class10_score: "",
    class12_year: "",
    class12_score: "",
    medium: "",
    medium_other: "",
    ug_status: "Completed",
    ug_cgpa: "",
    ug_institution: "",
    pg_exists: "",
    pg_type: "",
    pg_other: "",
    pg_institution: "",
    work_experience: [] as any[],
    documents: {} as Record<string, any>,
    declaration: false
});

const section1Ref = ref<any>(null);
const section2Ref = ref<any>(null);
const section3Ref = ref<any>(null);
const section4aRef = ref<any>(null);
const section4bRef = ref<any>(null);

const toggleSection = (index: number) => {
    openSection.value = openSection.value === index ? null : index;
};


const saveSection = async (index: number) => {
    // Legacy generic save map
    const refMap: Record<number, any> = {
        1: section1Ref.value,
        2: section2Ref.value,
        3: section3Ref.value,
    };
    const comp = refMap[index];
    if (comp?.validate) {
        const isValid = comp.validate();
        if (isValid) {
            alert("Section saved successfully!");
        }
    }
};

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

const handleFinalSubmit = async () => {
    // Validate all sections before submission
    if (section1Ref.value?.validate && !section1Ref.value.validate()) { openSection.value = 1; return; }
    if (section2Ref.value?.validate && !section2Ref.value.validate()) { openSection.value = 2; return; }
    if (section3Ref.value?.validate && !section3Ref.value.validate()) { openSection.value = 3; return; }
    if (section4aRef.value?.validate && !section4aRef.value.validate()) { openSection.value = 4; return; }

    if (!formData.declaration) {
        alert("Please check the declaration before submitting.");
        return;
    }

    console.log("Constructing FormData for Binary Submission...");
    const data = new FormData();

    // Loop through all fields in formData except 'documents' and 'work_experience'
    Object.keys(formData).forEach(key => {
        if (key !== 'documents' && key !== 'work_experience') {
            data.append(key, (formData as any)[key]);
        }
    });

    // Handle nested work_experience (serialized as JSON string for typical backend handling)
    data.append('work_experience', JSON.stringify(formData.work_experience));

    // Handle documents (binary files)
    Object.keys(formData.documents).forEach(key => {
        const file = formData.documents[key];
        if (file instanceof File) {
            data.append(key, file);
        }
    });

    // Logging all entries to console
    console.log("--- FormData Entries ---");
    for (const [key, value] of (data as any).entries()) {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}: ${value}`);
        }
    }
    console.log("------------------------");

    alert("Check Console for Form Data Output! Binary files included.");
}

// const handleFinalSubmit = async () => {
//     if (section4bRef.value?.validate) {
//         const isValid = section4bRef.value.validate();
//         if (!isValid) {
//             openSection.value = 4;
//             return;
//         }
//     }

//     try {
//         const res: any = await $fetch("/api/start-payment", {
//             method: "POST",
//             body: {
//                 user_id: userId.value,
//                 name: formData.first_name + " " + formData.last_name,
//                 email: formData.email,
//                 mobile: formData.mobile
//             }
//         });

//         const loaded = await loadRazorpayScript();
//         if (!loaded || !(window as any).Razorpay) {
//             alert("Razorpay SDK failed to load");
//             return;
//         }

//         const options = {
//             key: res.razorpay_key,
//             amount: res.amount,
//             currency: res.currency,
//             name: "Application Fee",
//             description: "NFET Application Payment",
//             order_id: res.razorpay_order_id,

//             handler: async function (response: any) {
//                 await $fetch("/api/complete-payment", {
//                     method: "POST",
//                     body: {
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_signature: response.razorpay_signature
//                     }
//                 });
//                 alert("Payment Successful!");
//             },

//             prefill: {
//                 name: formData.first_name + " " + formData.last_name,
//                 email: formData.email,
//                 contact: formData.mobile
//             },

//             theme: {
//                 color: "#FBB03B"
//             }
//         };

//         const rzp = new (window as any).Razorpay(options);
//         rzp.on("payment.failed", async (response: any) => {
//             console.error("Payment Failed:", response.error);
//             try {
//                 await $fetch("/api/report-payment-failure", {
//                     method: "POST",
//                     body: {
//                         razorpay_order_id: res.razorpay_order_id,
//                         razorpay_payment_id: response.error.metadata?.payment_id,
//                         error_details: response.error
//                     }
//                 });
//             } catch (reportError) {
//                 console.error("Failed to report payment failure:", reportError);
//             }
//             alert(`Payment Failed: ${response.error.description || "Unknown error"}`);
//         });

//         rzp.open();

//     } catch (err) {
//         console.error(err);
//         alert("Payment initiation failed");
//     }
// };
</script>

<style scoped>
/* ─── Profile Header Card ─────────────────────────────────── */
.profile-header-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 20px rgba(108, 60, 220, 0.08);
    border: 1px solid rgba(108, 60, 220, 0.08);
    overflow: hidden;
}

/* Cover banner */
.profile-cover {
    width: 100%;
    height: 160px;
    z-index: 0;
    background: linear-gradient(135deg, #6d28d9 0%, #a78bfa 50%, #c4b5fd 100%);
    position: relative;
}

.profile-edit-btn {
    position: absolute;
    top: 12px;
    right: 16px;
    background: rgba(255, 255, 255, 0.85);
    border: none;
    border-radius: 8px;
    padding: 5px 12px;
    font-size: 13px;
    font-weight: 600;
    color: #7c3aed;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    backdrop-filter: blur(4px);
    transition: background 0.2s;
}

.profile-edit-btn:hover {
    background: #fff;
}

/* Avatar circle overlapping cover */
.profile-avatar-wrap {
    padding: 0 32px;
    margin-top: -48px;
    position: relative;
    z-index: 999;
}

.profile-avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
    border: 4px solid #fff;
    box-shadow: 0 2px 12px rgba(124, 58, 237, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-avatar i {
    font-size: 48px;
    color: #fff;
}

/* Info block */
.profile-info {
    padding: 12px 32px 28px;
}

.profile-name {
    font-size: 22px;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 4px;
}

.profile-detail {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 2px;
}

/* ─── Accordion ───────────────────────────────────────────── */
.profile-accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.accordion-section {
    background: #fff;
    border-radius: 14px;
    border: 1.5px solid #e8e0f8;
    overflow: hidden;
    transition: box-shadow 0.25s ease;
}

.accordion-section.active {
    border-color: #7c3aed;
    box-shadow: 0 4px 24px rgba(124, 58, 237, 0.10);
}

.accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
}

.accordion-header:hover {
    background: #faf7ff;
}

.accordion-header-left h4 {
    /* display: flex;
    align-items: center;
    gap: 16px; */
    font-size: 20px;
}

.accordion-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.accordion-icon i {
    font-size: 22px;
    color: #7c3aed;
}

.accordion-header-left h5 {
    font-size: 16px;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 2px;
}

.accordion-header-left p {
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
}

.accordion-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.accordion-body {
    border-top: 1px solid #f0ebff;
}

.section-divider {
    height: 1px;
    background: #f0ebff;
    margin: 0 24px;
}

.submit-btn {
    width: 500px;
}

.custom-declaration .form-check-input:checked {
    background-color: #872980;
    border-color: #872980;
}

.custom-declaration .form-check-input {
    cursor: pointer;
    width: 1.25em;
    height: 1.25em;
}

.custom-declaration .form-check-label {
    cursor: pointer;
    user-select: none;
}

.cursor-not-allowed {
    cursor: not-allowed !important;
}
</style>

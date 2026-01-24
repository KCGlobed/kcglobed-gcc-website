<template>
    <div class="main-contact-warp ptb-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="contact-content mb-5 text-center">
                        <div class="section-title">
                            <span class="sub-title">Careers</span>
                            <h2 class="heading reveal3">
                                Career With Us
                            </h2>
                            <p class="reveal3">
                                Join our team and help shape the future of education. Apply now!
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 offset-lg-2">
                    <div class="main-contact-content">
                        <form @submit.prevent="submitForm">
                            <h4 class="mb-4">Career With Us – Application Form</h4>

                            <!-- Personal Details -->
                            <h5 class="mb-3">Personal Details</h5>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="form-label">Full Name <span>*</span></label>
                                        <div class="input-with-icon">
                                            <input v-model="form.fullName" type="text" class="form-control"
                                                placeholder="Full Name">
                                            <i class="ti ti-user"></i>
                                        </div>
                                        <small class="text-danger" v-if="errors.fullName">{{ errors.fullName }}</small>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-box">
                                        <label class="form-label">Email ID <span>*</span></label>
                                        <div class="input-with-icon">
                                            <input v-model="form.email" type="email" class="form-control"
                                                placeholder="Email ID">
                                            <i class="ti ti-mail"></i>
                                        </div>
                                        <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-box">
                                        <label class="form-label">Mobile Number <span>*</span></label>
                                        <div class="input-with-icon">
                                            <input v-model="form.mobile" type="tel" class="form-control"
                                                placeholder="Mobile Number">
                                            <i class="ti ti-phone-call"></i>
                                        </div>
                                        <small class="text-danger" v-if="errors.mobile">{{ errors.mobile }}</small>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-box">
                                        <label class="form-label">Current City <span>*</span></label>
                                        <div class="input-with-icon">
                                            <input v-model="form.city" type="text" class="form-control"
                                                placeholder="City">
                                            <i class="ti ti-map-pin"></i>
                                        </div>
                                        <small class="text-danger" v-if="errors.city">{{ errors.city }}</small>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-box">
                                        <label class="form-label">State <span>*</span></label>
                                        <div class="input-with-icon">
                                            <input v-model="form.state" type="text" class="form-control"
                                                placeholder="State">
                                            <i class="ti ti-map"></i>
                                        </div>
                                        <small class="text-danger" v-if="errors.state">{{ errors.state }}</small>
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4">

                            <!-- Professional Details -->
                            <h5 class="mb-3">Professional Details</h5>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="form-label">Highest Qualification <span>*</span></label>
                                        <input v-model="form.highestQualification" type="text" class="form-control"
                                            placeholder="E.g., MBA, B.Tech, etc.">
                                        <small class="text-danger" v-if="errors.highestQualification">{{
                                            errors.highestQualification }}</small>
                                    </div>
                                </div>

                                <div class="col-lg-12 mt-3">
                                    <div class="input-box">
                                        <label class="form-label">Current Employment Status <span>*</span></label>
                                        <div class="d-flex flex-wrap gap-4 mt-2">
                                            <div class="form-check" v-for="status in employmentStatusList"
                                                :key="status">
                                                <input class="form-check-input" type="radio"
                                                    v-model="form.employmentStatus" :value="status" :id="status">
                                                <label class="form-check-label" :for="status">{{ status }}</label>
                                            </div>
                                        </div>
                                        <small class="text-danger" v-if="errors.employmentStatus">{{
                                            errors.employmentStatus }}</small>
                                    </div>
                                </div>

                                <div class="col-lg-12 mt-3">
                                    <div class="input-box">
                                        <label class="form-label">Total Years of Experience <span>*</span></label>
                                        <div class="d-flex flex-wrap gap-4 mt-2">
                                            <div class="form-check" v-for="exp in experienceList" :key="exp">
                                                <input class="form-check-input" type="radio"
                                                    v-model="form.experienceYears" :value="exp" :id="exp">
                                                <label class="form-check-label" :for="exp">{{ exp }}</label>
                                            </div>
                                        </div>
                                        <small class="text-danger" v-if="errors.experienceYears">{{
                                            errors.experienceYears }}</small>
                                    </div>
                                </div>

                                <div class="col-lg-12 mt-3">
                                    <div class="input-box">
                                        <label class="form-label">Area of Interest / Role Applying For
                                            <span>*</span></label>
                                        <div class="d-flex flex-wrap gap-3 mt-2">
                                            <div class="form-check" v-for="area in areaOfInterestList" :key="area">
                                                <input class="form-check-input" type="radio"
                                                    v-model="form.areaOfInterest" :value="area" :id="area">
                                                <label class="form-check-label" :for="area">{{ area }}</label>
                                            </div>
                                        </div>
                                        <div class="mt-2" v-if="form.areaOfInterest === 'Other (Please specify)'">
                                            <input v-model="form.areaOfInterestOther" type="text" class="form-control"
                                                placeholder="Specify Area of Interest">
                                            <small class="text-danger" v-if="errors.areaOfInterestOther">{{
                                                errors.areaOfInterestOther }}</small>
                                        </div>
                                        <small class="text-danger" v-if="errors.areaOfInterest">{{ errors.areaOfInterest
                                            }}</small>
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4">

                            <!-- Application Details -->
                            <h5 class="mb-3">Application Details</h5>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-box">
                                        <label class="form-label">Give a summary of how you would contribute to GCC
                                            School with your expertise/passion. <span>*</span></label>
                                        <textarea v-model="form.contributionSummary" class="form-control" rows="4"
                                            placeholder="Your summary..."></textarea>
                                        <!-- Note: Optional in code but usually good to have -->
                                    </div>
                                </div>

                                <div class="col-lg-12 mt-3">
                                    <div class="input-box">
                                        <label class="form-label">Upload Resume / CV <span>*</span></label>
                                        <input type="file" ref="resumeFile" @change="handleFileUpload"
                                            class="form-control" accept=".pdf,.doc,.docx">
                                        <small class="text-danger" v-if="errors.resumePath">{{ errors.resumePath
                                            }}</small>
                                    </div>
                                </div>

                                <div class="col-lg-12 mt-3">
                                    <div class="input-box">
                                        <label class="form-label">LinkedIn Profile / Portfolio Link (Optional)</label>
                                        <div class="input-with-icon">
                                            <input v-model="form.linkedinProfile" type="url" class="form-control"
                                                placeholder="https://linkedin.com/in/...">
                                            <i class="ti ti-link"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Availability -->
                            <div class="col-lg-12">
                                <h5 class="mt-4 mb-3">Availability</h5>
                                <div class="input-box">
                                    <label class="form-label">Notice Period <span>*</span></label>
                                    <div class="d-flex flex-wrap gap-4 mt-2">
                                        <div class="form-check" v-for="period in noticePeriodList" :key="period">
                                            <input class="form-check-input" type="radio" v-model="form.noticePeriod"
                                                :value="period" :id="period">
                                            <label class="form-check-label" :for="period">{{ period }}</label>
                                        </div>
                                    </div>
                                    <small class="text-danger" v-if="errors.noticePeriod">{{ errors.noticePeriod
                                        }}</small>
                                </div>
                            </div>

                            <!-- Declaration -->
                            <div class="col-lg-12">
                                <h5 class="mt-4 mb-2">Declaration</h5>
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="checkbox" v-model="form.consent"
                                        id="consentCheck">
                                    <label class="form-check-label" for="consentCheck">
                                        I confirm that the information provided by me is correct, and if I have
                                        concealed any information, my application/employment may be cancelled without
                                        notice.
                                    </label>
                                </div>
                                <small class="text-danger" v-if="errors.consent">{{ errors.consent }}</small>
                            </div>

                            <!-- Submit Button -->
                            <div class="col-lg-12">
                                <button type="submit" class="default-btn submit-btn mt-4" :disabled="uploading">
                                    <span v-if="uploading">Uploading...</span>
                                    <span v-else>Apply Now <i class="ti ti-arrow-narrow-right"></i></span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CareerForm",
    data() {
        return {
            uploading: false,
            uploadedResumePath: "",
            employmentStatusList: [
                "Student",
                "Fresher",
                "Self-Employed",
                "Working Professional"
            ],
            experienceList: [
                "0–1 Year",
                "1–3 Years",
                "3–5 Years",
                "5+ Years"
            ],
            areaOfInterestList: [
                "Academic / Training",
                "Sales & Marketing",
                "Operations",
                "Technology / IT",
                "Content / Design",
                "Other (Please specify)"
            ],
            noticePeriodList: [
                "Immediate",
                "15 Days",
                "30 Days",
                "More than 30 Days"
            ],
            form: {
                fullName: "",
                email: "",
                mobile: "",
                city: "",
                state: "",
                highestQualification: "",
                employmentStatus: "",
                experienceYears: "",
                areaOfInterest: "",
                areaOfInterestOther: "",
                contributionSummary: "",
                linkedinProfile: "",
                noticePeriod: "",
                consent: false,
            },
            errors: {
                fullName: "",
                email: "",
                mobile: "",
                city: "",
                state: "",
                highestQualification: "",
                employmentStatus: "",
                experienceYears: "",
                areaOfInterest: "",
                areaOfInterestOther: "",
                resumePath: "",
                noticePeriod: "",
                consent: "",
            },
        };
    },
    methods: {
        async handleFileUpload(event: Event) {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                const formData = new FormData();
                formData.append("file", file);

                this.uploading = true;
                try {
                    const response: any = await $fetch("/api/career-upload", {
                        method: "POST",
                        body: formData
                    });

                    if (response.success) {
                        this.uploadedResumePath = response.path;
                        this.errors.resumePath = ""; // Clear error
                    } else {
                        alert(response.message || "Upload failed");
                        fileInput.value = ""; // Reset input
                    }
                } catch (error) {
                    console.error("Upload Error:", error);
                    alert("Upload error");
                } finally {
                    this.uploading = false;
                }
            }
        },
        validateForm() {
            let isValid = true;
            Object.keys(this.errors).forEach(key => {
                (this.errors as any)[key] = "";
            });

            if (!this.form.fullName) {
                this.errors.fullName = "Full Name is required";
                isValid = false;
            }
            if (!this.form.email) {
                this.errors.email = "Email ID is required";
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
                this.errors.email = "Invalid Email ID";
                isValid = false;
            }
            if (!this.form.mobile) {
                this.errors.mobile = "Mobile Number is required";
                isValid = false;
            }
            if (!this.form.city) {
                this.errors.city = "City is required";
                isValid = false;
            }
            if (!this.form.state) {
                this.errors.state = "State is required";
                isValid = false;
            }
            if (!this.form.highestQualification) {
                this.errors.highestQualification = "Qualification is required";
                isValid = false;
            }
            if (!this.form.employmentStatus) {
                this.errors.employmentStatus = "Employment Status is required";
                isValid = false;
            }
            if (!this.form.experienceYears) {
                this.errors.experienceYears = "Experience is required";
                isValid = false;
            }
            if (!this.form.areaOfInterest) {
                this.errors.areaOfInterest = "Area of Interest is required";
                isValid = false;
            }
            if (this.form.areaOfInterest === 'Other (Please specify)' && !this.form.areaOfInterestOther) {
                this.errors.areaOfInterestOther = "Please specify area";
                isValid = false;
            }
            if (!this.uploadedResumePath) {
                this.errors.resumePath = "Resume upload is required";
                isValid = false;
            }
            if (!this.form.noticePeriod) {
                this.errors.noticePeriod = "Notice Period is required";
                isValid = false;
            }
            if (!this.form.consent) {
                this.errors.consent = "You must agree to the declaration";
                isValid = false;
            }

            return isValid;
        },
        async submitForm() {
            if (this.validateForm()) {
                const payload = {
                    full_name: this.form.fullName,
                    email: this.form.email,
                    mobile: this.form.mobile,
                    city: this.form.city,
                    state: this.form.state,
                    highest_qualification: this.form.highestQualification,
                    employment_status: this.form.employmentStatus,
                    experience_years: this.form.experienceYears,
                    area_of_interest: this.form.areaOfInterest,
                    area_of_interest_other: this.form.areaOfInterest === 'Other (Please specify)' ? this.form.areaOfInterestOther : null,
                    contribution_summary: this.form.contributionSummary,
                    resume_path: this.uploadedResumePath,
                    linkedin_profile: this.form.linkedinProfile,
                    notice_period: this.form.noticePeriod,
                    consent: this.form.consent
                };

                try {
                    const response: any = await $fetch("/api/career", {
                        method: "POST",
                        body: payload
                    });

                    if (response.success) {
                        alert("Thank you! Your application has been submitted.");
                        this.resetForm();
                    } else {
                        alert(response.message || "Something went wrong.");
                    }
                } catch (error: any) {
                    console.error("Submission Error:", error);
                    alert("Submission failed. Please try again.");
                }
            }
        },
        resetForm() {
            this.form = {
                fullName: "",
                email: "",
                mobile: "",
                city: "",
                state: "",
                highestQualification: "",
                employmentStatus: "",
                experienceYears: "",
                areaOfInterest: "",
                areaOfInterestOther: "",
                contributionSummary: "",
                linkedinProfile: "",
                noticePeriod: "",
                consent: false,
            };
            this.uploadedResumePath = "";
            const fileInput = this.$refs.resumeFile as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            Object.keys(this.errors).forEach(key => {
                (this.errors as any)[key] = "";
            });
        }
    },
});
</script>

<style scoped>
.main-contact-warp {
    background-color: #f6f8fb;
}

.main-contact-content {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
}
</style>
<template>
    <div class="work-experience-details-area pb-50">
        <div class="container">
            <div class="section-title">
                <h2>Work Experience Details</h2>
                <p>Please provide details of your work experience.</p>
            </div>
            <div class="work-experience-form applicant-details">
                <form @submit.prevent>
                    <!-- Employment Status -->
                    <div class="mb-4">
                        <label class="form-label d-block text-dark fw-bold">Employment Status <span>*</span></label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="employmentStatus" id="fresher"
                                value="Fresher" v-model="status">
                            <label class="form-check-label" for="fresher">Fresher</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="employmentStatus" id="currentlyWorking"
                                value="Currently Working" v-model="status">
                            <label class="form-check-label" for="currentlyWorking">Currently Working</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="employmentStatus" id="previouslyWorked"
                                value="Previously Worked" v-model="status">
                            <label class="form-check-label" for="previouslyWorked">Previously Worked</label>
                        </div>
                    </div>

                    <!-- Experience Details Section -->
                    <div v-if="status !== 'Fresher'" class="applicant-details">
                        <div v-for="(job, index) in formData.work_experience" :key="index"
                            class="card mb-3 p-3 bg-light border-0 applicant-details">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5 class="mb-0">Experience {{ index + 1 }}</h5>
                                <button v-if="formData.work_experience.length > 1" class="btn btn-sm btn-outline-danger"
                                    @click="removeJob(index)">Remove</button>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Organisation Name <span>*</span></label>
                                    <input type="text" class="form-control" v-model="job.org_name"
                                        :class="{ 'is-invalid': errors[`job_${index}_orgName`] }">
                                    <div class="invalid-feedback" v-if="errors[`job_${index}_orgName`]">{{
                                        errors[`job_${index}_orgName`] }}</div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Designation <span>*</span></label>
                                    <input type="text" class="form-control" v-model="job.designation"
                                        :class="{ 'is-invalid': errors[`job_${index}_designation`] }">
                                    <div class="invalid-feedback" v-if="errors[`job_${index}_designation`]">{{
                                        errors[`job_${index}_designation`] }}</div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Functional Area <span>*</span></label>
                                    <input type="text" class="form-control" v-model="job.functional_area"
                                        :class="{ 'is-invalid': errors[`job_${index}_functionalArea`] }">
                                    <div class="invalid-feedback" v-if="errors[`job_${index}_functionalArea`]">{{
                                        errors[`job_${index}_functionalArea`] }}</div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label class="form-label">From <span>*</span></label>
                                    <input type="date" class="form-control" v-model="job.from"
                                        :class="{ 'is-invalid': errors[`job_${index}_from`] }">
                                    <div class="invalid-feedback" v-if="errors[`job_${index}_from`]">{{
                                        errors[`job_${index}_from`] }}</div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label class="form-label">To <span>*</span></label>
                                    <input type="date" class="form-control" v-model="job.to"
                                        :class="{ 'is-invalid': errors[`job_${index}_to`] }">
                                    <div class="invalid-feedback" v-if="errors[`job_${index}_to`]">{{
                                        errors[`job_${index}_to`] }}</div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label class="form-label">Duration <span>*</span></label>
                                    <input type="text" class="form-control" placeholder="Years / Months"
                                        v-model="job.duration"
                                        :class="{ 'is-invalid': errors[`job_${index}_duration`] }">
                                    <div class="invalid-feedback" v-if="errors[`job_${index}_duration`]">{{
                                        errors[`job_${index}_duration`] }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <button class="btn btn-outline-primary" @click="addJob">+ Add Another Experience</button>
                        </div>

                        <!-- Declarations for Working Professionals -->
                        <div class="alert alert-warning">
                            <h5 class="alert-heading h6 fw-bold">Declarations for Working Professionals</h5>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="decl1" v-model="declarations.decl1"
                                    :class="{ 'is-invalid': errors.decl1 }">
                                <label class="form-check-label" for="decl1">
                                    I understand that the GCC School program is a full-time, immersive, campus-based
                                    engagement.
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="decl2" v-model="declarations.decl2"
                                    :class="{ 'is-invalid': errors.decl2 }">
                                <label class="form-check-label" for="decl2">
                                    If selected, I agree to formally resign from my current organisation and submit a
                                    relieving / resignation acceptance document before final enrollment.
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="decl3" v-model="declarations.decl3"
                                    :class="{ 'is-invalid': errors.decl3 }">
                                <label class="form-check-label" for="decl3">
                                    I confirm that there will be no active employment, contractual engagement, or
                                    notice-period overlap during the GCC School program starting from 1st June 2026.
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="decl4" v-model="declarations.decl4"
                                    :class="{ 'is-invalid': errors.decl4 }">
                                <label class="form-check-label" for="decl4">
                                    I acknowledge that failure to disclose employment status or non-compliance with this
                                    condition may lead to cancellation of admission at any stage.
                                </label>
                                <div class="invalid-feedback d-block" v-if="errors.declarations">All declarations must
                                    be checked.</div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "WorkExperienceDetails",
  props: {
    formData: Object
  },

  data() {
    return {
      status: this.formData.employment_status || "Fresher",
      declarations: {
        decl1: false,
        decl2: false,
        decl3: false,
        decl4: false
      },
      errors: {}
    };
  },

  mounted() {
    if (!this.formData.work_experience) {
      this.formData.work_experience = [];
    }

    if (this.formData.work_experience.length === 0) {
      this.formData.work_experience.push({
        org_name: "",
        designation: "",
        functional_area: "",
        from: "",
        to: "",
        duration: ""
      });
    }

    // Save declarations to main formData
    this.formData.declarations = this.declarations;
  },

  watch: {
    status(newVal) {
      this.formData.employment_status = newVal;
    },

    declarations: {
      deep: true,
      handler(val) {
        this.formData.declarations = val;
      }
    }
  },

  methods: {
    addJob() {
      this.formData.work_experience.push({
        org_name: "",
        designation: "",
        functional_area: "",
        from: "",
        to: "",
        duration: ""
      });
    },

    removeJob(index) {
      this.formData.work_experience.splice(index, 1);
    },

    validate() {
      this.errors = {};
      let isValid = true;

      if (this.status !== "Fresher") {
        this.formData.work_experience.forEach((job, index) => {
          if (!job.org_name) {
            this.errors[`job_${index}_orgName`] = "Organisation Name is required";
            isValid = false;
          }

          if (!job.designation) {
            this.errors[`job_${index}_designation`] = "Designation is required";
            isValid = false;
          }

          if (!job.functional_area) {
            this.errors[`job_${index}_functionalArea`] = "Functional Area is required";
            isValid = false;
          }

          if (!job.from) {
            this.errors[`job_${index}_from`] = "From Date is required";
            isValid = false;
          }

          if (!job.to) {
            this.errors[`job_${index}_to`] = "To Date is required";
            isValid = false;
          }

          if (!job.duration) {
            this.errors[`job_${index}_duration`] = "Duration is required";
            isValid = false;
          }
        });

        if (
          !this.declarations.decl1 ||
          !this.declarations.decl2 ||
          !this.declarations.decl3 ||
          !this.declarations.decl4
        ) {
          this.errors.declarations = "All declarations must be accepted";
          isValid = false;
        }
      }

      return isValid;
    }
  }
};
</script>

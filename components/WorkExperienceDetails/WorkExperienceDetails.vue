<template>
  <div class="work-experience-details-area">
    <div class="section-title mb-4">
      <p class="mb-0 text-muted">Please provide details of your work experience.</p>
    </div>
    <div class="work-experience-form">
      <form @submit.prevent>
        <!-- Employment Status -->
        <div class="mb-4">
          <label class="form-label d-block text-dark fw-bold mb-3">Employment Status <span>*</span></label>
          <div class="row g-3">
            <div class="col-md-6">
              <div class="status-card" :class="{ active: status === 'Fresher', 'disabled-card': isDisabled }"
                @click="!isDisabled && (status = 'Fresher')">
                <div class="status-icon">
                  <i class="ti ti-school"></i>
                </div>
                <div class="status-info">
                  <span class="status-title">Fresher</span>
                  <p class="status-desc">Currently studying or recently graduated</p>
                </div>
                <div class="status-check">
                  <i class="ti ti-circle-check-filled"></i>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="status-card" :class="{ active: status === 'Experienced', 'disabled-card': isDisabled }"
                @click="!isDisabled && (status = 'Experienced')">
                <div class="status-icon">
                  <i class="ti ti-briefcase"></i>
                </div>
                <div class="status-info">
                  <span class="status-title">Experienced</span>
                  <p class="status-desc">Currently working or have past experience</p>
                </div>
                <div class="status-check">
                  <i class="ti ti-circle-check-filled"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Details Section -->
        <div v-if="status !== 'Fresher'" class="experience-list">
          <div v-for="(job, index) in formData.work_experience" :key="index"
            class="card mb-4 border-0 bg-light-purple shadow-sm overflow-hidden">
            <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 class="mb-0 fw-bold d-flex align-items-center" style="color: #872980; font-size: 14px;">
                <i class="ti ti-building me-2"></i>
                {{ index === 0 ? 'Current Organization' : 'Past Organization ' + (index) }}
              </h6>
              <button v-if="formData.work_experience.length > 1 && !isDisabled"
                class="btn btn-sm btn-link text-danger text-decoration-none" @click="removeJob(index)">
                <i class="ti ti-trash"></i> Remove
              </button>
            </div>
            <div class="card-body p-4">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="input-box mb-0">
                    <label class="form-label fw-bold">Organisation Name <span>*</span></label>
                    <input type="text" class="form-control" v-model="job.org_name"
                      :class="{ 'is-invalid': errors[`job_${index}_orgName`] }" placeholder="Enter organization">
                    <div class="invalid-feedback" v-if="errors[`job_${index}_orgName`]">{{
                      errors[`job_${index}_orgName`] }}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-box mb-0">
                    <label class="form-label fw-bold">Designation <span>*</span></label>
                    <input type="text" class="form-control" v-model="job.designation"
                      :class="{ 'is-invalid': errors[`job_${index}_designation`] }" placeholder="e.g. Manager">
                    <div class="invalid-feedback" v-if="errors[`job_${index}_designation`]">{{
                      errors[`job_${index}_designation`] }}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-box mb-0">
                    <label class="form-label fw-bold">Functional Area <span>*</span></label>
                    <input type="text" class="form-control" v-model="job.functional_area"
                      :class="{ 'is-invalid': errors[`job_${index}_functionalArea`] }" placeholder="e.g. Sales">
                    <div class="invalid-feedback" v-if="errors[`job_${index}_functionalArea`]">{{
                      errors[`job_${index}_functionalArea`] }}</div>
                  </div>
                </div>
                <div class="col-md-3" :class="{ 'col-md-6': index === 0 }">
                  <div class="input-box mb-0">
                    <label class="form-label fw-bold">From <span>*</span></label>
                    <input type="date" class="form-control" v-model="job.from"
                      :class="{ 'is-invalid': errors[`job_${index}_from`] }">
                    <div class="invalid-feedback" v-if="errors[`job_${index}_from`]">{{
                      errors[`job_${index}_from`] }}</div>
                  </div>
                </div>
                <div class="col-md-3" v-if="index !== 0">
                  <div class="input-box mb-0">
                    <label class="form-label fw-bold">To <span>*</span></label>
                    <input type="date" class="form-control" v-model="job.to"
                      :class="{ 'is-invalid': errors[`job_${index}_to`] }">
                    <div class="invalid-feedback" v-if="errors[`job_${index}_to`]">{{
                      errors[`job_${index}_to`] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4" v-if="!isDisabled">
            <button class="btn btn-outline-primary btn-sm px-4" @click="addJob">
              <i class="ti ti-plus me-1"></i> Add Another Experience
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkExperienceDetails",
  props: {
    formData: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      status: this.formData.employment_status || "Fresher",
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
      });
    }
  },

  watch: {
    status(newVal) {
      this.formData.employment_status = newVal;
    }
  },

  methods: {
    scrollToFirstError() {
      this.$nextTick(() => {
        const el = this.$el.querySelector('.is-invalid');
        if (el && el.scrollIntoView) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    addJob() {
      this.formData.work_experience.push({
        org_name: "",
        designation: "",
        functional_area: "",
        from: "",
        to: "",
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

          if (index !== 0 && !job.to) {
            this.errors[`job_${index}_to`] = "To Date is required";
            isValid = false;
          }
        });
      }

      return isValid;
    }
  }
};
</script>

<style scoped>
.form-label {
    font-size: 12px;
    font-weight: 600;
    color: #4B5563;
    margin-bottom: 8px;
}

.form-label span {
  color: #ef4444;
}

.form-control {
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 14px;
    color: #111827;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-control:focus {
    background-color: #fff;
    border-color: #872980;
    box-shadow: 0 0 0 4px rgba(135, 41, 128, 0.1);
    outline: none;
}

.bg-light-purple {
  background-color: #ffffff;
  border: 1px solid #F3F4F6 !important;
  border-radius: 12px;
}

.status-card {
  background: #fff;
  border: 1.5px solid #F3F4F6;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.status-card:hover {
  border-color: #D6BCFA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.status-card.active {
  border-color: #872980;
  background: #FDF4FF;
  box-shadow: 0 4px 15px rgba(135, 41, 128, 0.08);
}

.status-icon {
  width: 48px;
  height: 48px;
  background: #F9FAFB;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #6B7280;
  transition: all 0.2s;
}

.status-card.active .status-icon {
  background: #872980;
  color: #fff;
}

.status-title {
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 16px;
}

.status-desc {
  font-size: 13px;
  color: #6B7280;
  margin: 0;
}

.status-check {
  color: #872980;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.2s;
}

.status-card.active .status-check {
  opacity: 1;
}

.disabled-card {
    cursor: not-allowed !important;
    opacity: 0.7;
}
</style>

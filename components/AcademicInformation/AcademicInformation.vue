<template>
  <div class="academic-information-warp">
    <form @submit.prevent>
      <div class="row g-4">
        <!-- Class 10 -->
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Class 10 – Year of Passing <span>*</span></label>
            <input type="number" min="0" class="form-control" v-model="formData.class10_year"
              @input="handleInput('class10_year')" :class="{ 'is-invalid': errors.class10_year }" />
            <div class="invalid-feedback" v-if="errors.class10_year">{{ errors.class10_year }}</div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Class 10 – Percentage / CGPA <span>*</span></label>
            <input type="number" step="0.01" min="0" max="100" class="form-control" v-model="formData.class10_score"
              @input="handleInput('class10_score')" :class="{ 'is-invalid': errors.class10_score }" />
            <div class="invalid-feedback" v-if="errors.class10_score">{{ errors.class10_score }}</div>
          </div>
        </div>

        <!-- Class 12 -->
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Class 12 – Year of Passing <span>*</span></label>
            <input type="number" min="0" class="form-control" v-model="formData.class12_year"
              @input="handleInput('class12_year')" :class="{ 'is-invalid': errors.class12_year }" />
            <div class="invalid-feedback" v-if="errors.class12_year">{{ errors.class12_year }}</div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Class 12 – Percentage / CGPA <span>*</span></label>
            <input type="number" step="0.01" min="0" max="100" class="form-control" v-model="formData.class12_score"
              @input="handleInput('class12_score')" :class="{ 'is-invalid': errors.class12_score }" />
            <div class="invalid-feedback" v-if="errors.class12_score">{{ errors.class12_score }}</div>
          </div>
        </div>

        <!-- Medium of Instruction -->
        <div class="col-lg-12">
          <div class="input-box mb-0">
            <label class="form-label fw-bold d-block mb-2">Medium of Instruction <span>*</span></label>
            <div class="d-flex gap-3 mt-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="English" id="mediumEnglish"
                  v-model="formData.medium" />
                <label class="form-check-label" for="mediumEnglish">English</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="Hindi" id="mediumHindi" v-model="formData.medium" />
                <label class="form-check-label" for="mediumHindi">Hindi</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="Other" id="mediumOther" v-model="formData.medium" />
                <label class="form-check-label" for="mediumOther">Other</label>
              </div>
            </div>
            <div class="text-danger small mt-1" v-if="errors.medium">{{ errors.medium }}</div>
          </div>
        </div>

        <div class="col-lg-6" v-if="formData.medium === 'Other'">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Please Specify <span>*</span></label>
            <input type="text" class="form-control" v-model="formData.medium_other" />
          </div>
        </div>

        <!-- Undergraduate -->
        <div class="col-lg-12">
          <div class="border-top pt-4 mt-2">
            <h5 class="fw-bold mb-3">Undergraduate Qualification (B.Com) <span>*</span></h5>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="1" id="ugCompleted" v-model="formData.ug_status" />
                <label class="form-check-label" for="ugCompleted">Completed</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="2" id="ugPursuing" v-model="formData.ug_status" />
                <label class="form-check-label" for="ugPursuing">Pursuing</label>
              </div>
            </div>
            <div class="text-danger small mt-1" v-if="errors.ug_status">{{ errors.ug_status }}</div>
          </div>
        </div>

        <!-- UG Score & Institution -->
        <template v-if="formData.ug_status == '1' || formData.ug_status == '2'">
          <div class="col-lg-6">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">{{ formData.ug_status == '2' ? 'Current CGPA / Percentage' :
                'Final CGPA / Percentage' }} <span>*</span></label>
              <input type="number" step="0.01" min="0" max="10" class="form-control" v-model="formData.ug_cgpa"
                @input="handleInput('ug_cgpa')" :class="{ 'is-invalid': errors.ug_cgpa }" />
              <div class="invalid-feedback" v-if="errors.ug_cgpa">{{ errors.ug_cgpa }}</div>
              <small class="text-muted">Scale of 10.00</small>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Institution Name<span>*</span></label>
              <input type="text" class="form-control" v-model="formData.ug_institution"
                :class="{ 'is-invalid': errors.ug_institution }" placeholder="Enter college name" />
              <div class="invalid-feedback" v-if="errors.ug_institution">{{ errors.ug_institution }}</div>
            </div>
          </div>
        </template>

        <!-- Higher Qualification -->
        <div class="col-lg-12">
          <div class="border-top pt-4 mt-2">
            <label class="form-label fw-bold d-block mb-2">Do you have a Higher Qualification? <span>*</span></label>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="Yes" id="pgYes" v-model="formData.pg_exists" />
                <label class="form-check-label" for="pgYes">Yes</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="No" id="pgNo" v-model="formData.pg_exists" />
                <label class="form-check-label" for="pgNo">No</label>
              </div>
            </div>
            <div class="text-danger small mt-1" v-if="errors.pg_exists">{{ errors.pg_exists }}</div>
          </div>
        </div>

        <template v-if="formData.pg_exists === 'Yes'">
          <div class="col-lg-6">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Select Qualification</label>
              <select class="form-select" v-model="formData.pg_type">
                <option value="">--Select--</option>
                <option>M.Com</option>
                <option>M.B.A</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="col-lg-6" v-if="formData.pg_type === 'Other'">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Please Specify</label>
              <input type="text" class="form-control" v-model="formData.pg_other" />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Institution Name</label>
              <input type="text" class="form-control" v-model="formData.pg_institution"
                placeholder="Enter university or college name" />
            </div>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AcademicInformation",
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errors: {}
    };
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
    handleInput(field) {
      delete this.errors[field];

      if (this.formData[field] < 0) {
        if (field.includes('year')) {
          this.formData[field] = null;
          this.errors[field] = "Year cannot be negative";
        } else {
          this.formData[field] = 0;
          this.errors[field] = "Value cannot be negative";
        }
      }

      if (field.includes('cgpa') && this.formData[field] > 10) {
        this.errors[field] = "CGPA cannot exceed 10.00";
      } else if ((field.includes('score')) && this.formData[field] > 100) {
        this.errors[field] = "Score cannot exceed 100";
      }
    },
    validate() {
      this.errors = {};
      let isValid = true;

      if (!this.formData.class10_year) {
        this.errors.class10_year = "Class 10 Year is required";
        isValid = false;
      }
      if (!this.formData.class10_score) {
        this.errors.class10_score = "Class 10 Score is required";
        isValid = false;
      }
      if (!this.formData.class12_year) {
        this.errors.class12_year = "Class 12 Year is required";
        isValid = false;
      }
      if (!this.formData.class12_score) {
        this.errors.class12_score = "Class 12 Score is required";
        isValid = false;
      }
      if (!this.formData.medium) {
        this.errors.medium = "Medium is required";
        isValid = false;
      }

      if (this.formData.ug_status == "2" || this.formData.ug_status == "1") {
        if (!this.formData.ug_cgpa) {
          this.errors.ug_cgpa = "CGPA/Percentage is required";
          isValid = false;
        }
        if (!this.formData.ug_institution || !this.formData.ug_institution.trim()) {
          this.errors.ug_institution = "Institution is required";
          isValid = false;
        }
      }

      if (!this.formData.ug_status) {
        this.errors.ug_status = "Undergraduate status required";
        isValid = false;
      }

      if (!this.formData.pg_exists) {
        this.errors.pg_exists = "Confirmation required";
        isValid = false;
      }

      return isValid;
    }
  }
};
</script>

<style scoped>
.form-label span,
h5 span {
  color: #dc3545;
}

.form-check-input:checked {
  background-color: #872980;
  border-color: #872980;
}
</style>
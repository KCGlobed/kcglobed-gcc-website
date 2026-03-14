<template>
  <div class="academic-information-warp">
    <form @submit.prevent>
      <div class="row g-4">
        <!-- Class 10 -->
        <div class="col-lg-12">
          <h5 class="fw-bold mb-3">Class 10th <span>*</span></h5>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Year of Passing <span>*</span></label>
            <input type="number" min="0" class="form-control" v-model.number="formData.class10_year"
              @input="handleInput('class10_year')" @blur="handleInput('class10_year')"
              :class="{ 'is-invalid': errors.class10_year }" />
            <div class="invalid-feedback d-block" v-if="errors.class10_year">{{ errors.class10_year }}</div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Grade Type <span>*</span></label>
            <select class="form-select" v-model="formData.class10_type" @change="handleInput('class10_score')">
              <option value="Percentage">Percentage</option>
              <option value="CGPA">CGPA</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Score <span>*</span></label>
            <input type="number" step="0.01" min="0" class="form-control" v-model="formData.class10_score"
              @input="handleInput('class10_score')" :class="{ 'is-invalid': errors.class10_score }" />
            <div class="invalid-feedback d-block" v-if="errors.class10_score">{{ errors.class10_score }}</div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Medium of Instruction <span>*</span></label>
            <select class="form-select" v-model="formData.class10_medium">
              <option>English</option>
              <option>Hindi</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <!-- Class 12 -->
        <div class="col-lg-12">
          <h5 class="fw-bold mb-3 mt-2">Class 12th <span>*</span></h5>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Year of Passing <span>*</span></label>
            <input type="number" min="0" class="form-control" v-model.number="formData.class12_year"
              @input="handleInput('class12_year')" @blur="handleInput('class12_year')"
              :class="{ 'is-invalid': errors.class12_year }" />
            <div class="invalid-feedback d-block" v-if="errors.class12_year">{{ errors.class12_year }}</div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Grade Type <span>*</span></label>
            <select class="form-select" v-model="formData.class12_type" @change="handleInput('class12_score')">
              <option value="Percentage">Percentage</option>
              <option value="CGPA">CGPA</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Score <span>*</span></label>
            <input type="number" step="0.01" min="0" class="form-control" v-model="formData.class12_score"
              @input="handleInput('class12_score')" :class="{ 'is-invalid': errors.class12_score }" />
            <div class="invalid-feedback d-block" v-if="errors.class12_score">{{ errors.class12_score }}</div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Medium of Instruction <span>*</span></label>
            <select class="form-select" v-model="formData.class12_medium">
              <option>English</option>
              <option>Hindi</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <!-- Undergraduate -->
        <div class="col-lg-12">
          <div class="border-top pt-4 mt-2">
            <h5 class="fw-bold mb-3">Undergraduate Qualification (B.Com/Hons) <span>*</span></h5>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="1" id="ugCompleted" v-model="formData.ug_status" @change="validateField('ug_status')" />
                <label class="form-check-label" for="ugCompleted">Completed</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="2" id="ugPursuing" v-model="formData.ug_status" @change="validateField('ug_status')" />
                <label class="form-check-label" for="ugPursuing">Pursuing</label>
              </div>
            </div>
            <div class="text-danger small mt-1" v-if="errors.ug_status">{{ errors.ug_status }}</div>
          </div>
        </div>

        <!-- UG Score & Institution -->
        <template v-if="formData.ug_status == '1' || formData.ug_status == '2'">
          <div class="col-lg-3">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Grade Type <span>*</span></label>
              <select class="form-select" v-model="formData.ug_type" @change="handleInput('ug_cgpa')">
                <option value="Percentage">Percentage</option>
                <option value="CGPA">CGPA</option>
              </select>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Score <span>*</span></label>
              <input type="number" step="0.01" min="0" class="form-control" v-model="formData.ug_cgpa"
                @input="handleInput('ug_cgpa')" :class="{ 'is-invalid': errors.ug_cgpa }" />
              <div class="invalid-feedback d-block" v-if="errors.ug_cgpa">{{ errors.ug_cgpa }}</div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Institution Name<span>*</span></label>
              <input type="text" class="form-control" v-model="formData.ug_institution"
                @input="validateField('ug_institution')"
                :class="{ 'is-invalid': errors.ug_institution }" placeholder="Enter college name" />
              <div class="invalid-feedback d-block" v-if="errors.ug_institution">{{ errors.ug_institution }}</div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="input-box mb-0">
              <label class="form-label fw-bold">Medium of Instruction <span>*</span></label>
              <select class="form-select" v-model="formData.ug_medium">
                <option>English</option>
                <option>Hindi</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </template>

        <!-- Higher Qualification -->
        <div class="col-lg-12">
          <div class="border-top pt-4 mt-2">
            <label class="form-label fw-bold d-block mb-2">Do you have a Higher Qualification? <span>*</span></label>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="Yes" id="pgYes" v-model="formData.pg_exists" @change="validateField('pg_exists')" />
                <label class="form-check-label" for="pgYes">Yes</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="No" id="pgNo" v-model="formData.pg_exists" @change="validateField('pg_exists')" />
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
    validateField(field) {
      delete this.errors[field];
      const currentYear = new Date().getFullYear();

      switch (field) {
        case 'class10_year':
          if (!this.formData.class10_year) {
            this.errors.class10_year = "Class 10 Year is required";
          } else if (this.formData.class10_year < 1900) {
            this.errors.class10_year = "Invalid year";
          } else if (this.formData.class10_year > currentYear) {
            this.errors.class10_year = "Year cannot be in the future";
          }
          // Re-validate class 12 if year 10 changes to check gap
          if (this.formData.class12_year) this.validateField('class12_year');
          break;

        case 'class12_year':
          const year10 = Number(this.formData.class10_year);
          const year12 = Number(this.formData.class12_year);

          if (!year12) {
            this.errors.class12_year = "Class 12 Year is required";
          } else if (year12 < 1900) {
            this.errors.class12_year = "Invalid year";
          } else if (year12 > currentYear) {
            this.errors.class12_year = "Year cannot be in the future";
          } else if (year10 && year12 <= year10) {
            this.errors.class12_year = "Class 12 must be after Class 10";
          } else if (year10 && (year12 - year10 < 2)) {
            this.errors.class12_year = "Minimum 2-year gap required between 10th and 12th";
          }
          break;

        case 'class10_score':
          if (!this.formData.class10_score) {
            this.errors.class10_score = "Class 10 Score is required";
          } else {
            const type = this.formData.class10_type;
            if (this.formData.class10_score < 0) {
              this.errors.class10_score = "Value cannot be negative";
            } else if (type === 'CGPA' && this.formData.class10_score > 10) {
              this.errors.class10_score = "CGPA cannot exceed 10.00";
            } else if (type === 'Percentage' && this.formData.class10_score > 100) {
              this.errors.class10_score = "Percentage cannot exceed 100";
            }
          }
          break;

        case 'class12_score':
          if (!this.formData.class12_score) {
            this.errors.class12_score = "Class 12 Score is required";
          } else {
            const type = this.formData.class12_type;
            if (this.formData.class12_score < 0) {
              this.errors.class12_score = "Value cannot be negative";
            } else if (type === 'CGPA' && this.formData.class12_score > 10) {
              this.errors.class12_score = "CGPA cannot exceed 10.00";
            } else if (type === 'Percentage' && this.formData.class12_score > 100) {
              this.errors.class12_score = "Percentage cannot exceed 100";
            }
          }
          break;

        case 'ug_cgpa':
          if (this.formData.ug_status == "2" || this.formData.ug_status == "1") {
            if (!this.formData.ug_cgpa) {
              this.errors.ug_cgpa = "CGPA/Percentage is required";
            } else {
              const type = this.formData.ug_type;
              if (this.formData.ug_cgpa < 0) {
                this.errors.ug_cgpa = "Value cannot be negative";
              } else if (type === 'CGPA' && this.formData.ug_cgpa > 10) {
                this.errors.ug_cgpa = "CGPA cannot exceed 10.00";
              } else if (type === 'Percentage' && this.formData.ug_cgpa > 100) {
                this.errors.ug_cgpa = "Percentage cannot exceed 100";
              }
            }
          }
          break;

        case 'ug_institution':
          if ((this.formData.ug_status == "2" || this.formData.ug_status == "1") && (!this.formData.ug_institution || !this.formData.ug_institution.trim())) {
            this.errors.ug_institution = "Institution is required";
          }
          break;

        case 'ug_status':
          if (!this.formData.ug_status) {
            this.errors.ug_status = "Undergraduate status required";
          }
          break;

        case 'pg_exists':
          if (!this.formData.pg_exists) {
            this.errors.pg_exists = "Confirmation required";
          }
          break;
      }
      return !this.errors[field];
    },
    handleInput(field) {
      if (this.formData[field] < 0) {
        if (field.includes('year')) {
          this.formData[field] = null;
        } else {
          this.formData[field] = 0;
        }
      }
      this.validateField(field);
    },
    validate() {
      const fields = [
        'class10_year', 'class10_score', 'class12_year', 'class12_score',
        'ug_status', 'ug_cgpa', 'ug_institution', 'pg_exists'
      ];
      let isValid = true;
      fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
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

.is-invalid {
  border-color: #dc3545 !important;
  background-image: none !important;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
  display: none;
}

.invalid-feedback.d-block {
  display: block;
}
</style>
<template>
  <div class="academic-information-warp pb-50">
    <div class="container">
      <h3>Academic Information</h3>

      <form>
        <div class="row applicant-details">

          <!-- Class 10 -->

          <!-- Class 10 -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 10 – Year of Passing *</label>
              <input type="number" min="0" class="form-control" v-model="formData.class10_year"
                @input="handleInput('class10_year')" :class="{ 'is-invalid': errors.class10_year }" />
              <div class="invalid-feedback" v-if="errors.class10_year">{{ errors.class10_year }}</div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 10 – Percentage / CGPA *</label>
              <input type="number" step="0.01" min="0" max="100" class="form-control" v-model="formData.class10_score"
                @input="handleInput('class10_score')" :class="{ 'is-invalid': errors.class10_score }" />
              <div class="invalid-feedback" v-if="errors.class10_score">{{ errors.class10_score }}</div>
            </div>
          </div>

          <!-- Class 12 -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 12 – Year of Passing *</label>
              <input type="number" min="0" class="form-control" v-model="formData.class12_year"
                @input="handleInput('class12_year')" :class="{ 'is-invalid': errors.class12_year }" />
              <div class="invalid-feedback" v-if="errors.class12_year">{{ errors.class12_year }}</div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 12 – Percentage / CGPA *</label>
              <input type="number" step="0.01" min="0" max="100" class="form-control" v-model="formData.class12_score"
                @input="handleInput('class12_score')" :class="{ 'is-invalid': errors.class12_score }" />
              <div class="invalid-feedback" v-if="errors.class12_score">{{ errors.class12_score }}</div>
            </div>
          </div>

          <!-- Medium of Instruction -->
          <div class="col-lg-12">
            <div class="input-box">
              <label>Medium of Instruction *</label><br />
              <label><input type="radio" value="English" v-model="formData.medium" /> English</label>
              <label class="ms-3"><input type="radio" value="Hindi" v-model="formData.medium" /> Hindi</label>
              <label class="ms-3"><input type="radio" value="Other" v-model="formData.medium" /> Other</label>
              <div class="text-danger small" v-if="errors.medium">{{ errors.medium }}</div>
            </div>
          </div>

          <div class="col-lg-6" v-if="formData.medium === 'Other'">
            <div class="input-box">
              <label>Please Specify</label>
              <input type="text" class="form-control" v-model="formData.medium_other" />
            </div>
          </div>

          <!-- Undergraduate -->
          <div class="col-lg-12 mt-3">
            <h5>Undergraduate Qualification (B.Com) *</h5>

            <label><input type="radio" value="Completed" v-model="formData.ug_status" /> Completed</label>
            <label class="ms-3"><input type="radio" value="Pursuing" v-model="formData.ug_status" /> Pursuing</label>
            <div class="text-danger small" v-if="errors.ug_status">{{ errors.ug_status }}</div>
          </div>

          <!-- If Completed -->
          <div class="col-lg-6" v-if="formData.ug_status === 'Completed'">
            <div class="input-box">
              <label>First Division (≥60%)?</label><br />
              <label><input type="radio" value="Yes" v-model="formData.first_division" /> Yes</label>
              <label class="ms-3"><input type="radio" value="No" v-model="formData.first_division" /> No</label>
            </div>
          </div>

          <!-- If Pursuing -->
          <div class="row" v-if="formData.ug_status === 'Pursuing'">
            <div class="col-lg-6">
              <div class="input-box">
                <label>Current CGPA / Percentage *</label>
                <input type="number" step="0.01" min="0" max="10" class="form-control" v-model="formData.ug_cgpa"
                  @input="handleInput('ug_cgpa')" :class="{ 'is-invalid': errors.ug_cgpa }" />
                <div class="invalid-feedback" v-if="errors.ug_cgpa">{{ errors.ug_cgpa }}</div>
                <small>Max 10.00</small>
              </div>
            </div>

            <!-- UG Institution -->
            <div class="col-lg-6">
              <div class="input-box">
                <label>Institution Name (B.Com) *</label>
                <input type="text" class="form-control" v-model="formData.ug_institution"
                  :class="{ 'is-invalid': errors.ug_institution }" />
                <div class="invalid-feedback" v-if="errors.ug_institution">{{ errors.ug_institution }}</div>
              </div>
            </div>
          </div>

          <!-- Higher Qualification -->
          <div class="col-lg-12 mt-3">
            <label>Do you have a Higher Qualification? *</label><br />
            <label><input type="radio" value="Yes" v-model="formData.pg_exists" /> Yes</label>
            <label class="ms-3"><input type="radio" value="No" v-model="formData.pg_exists" /> No</label>
            <div class="text-danger small" v-if="errors.pg_exists">{{ errors.pg_exists }}</div>
          </div>

          <div class="col-lg-6" v-if="formData.pg_exists === 'Yes'">
            <div class="input-box">
              <label>Select Qualification</label>
              <select class="form-select" v-model="formData.pg_type">
                <option value="">--Select--</option>
                <option>M.Com</option>
                <option>M.B.A</option>
                <option>M.Tech</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div class="col-lg-6" v-if="formData.pg_type === 'Other'">
            <div class="input-box">
              <label>Please Specify</label>
              <input type="text" class="form-control" v-model="formData.pg_other" />
            </div>
          </div>

          <div class="col-lg-12" v-if="formData.pg_exists === 'Yes'">
            <div class="input-box">
              <label>Institution Name (Postgraduate)</label>
              <input type="text" class="form-control" v-model="formData.pg_institution" />
            </div>
          </div>

          <!-- Semester -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>Current / Last Completed Semester *</label>
              <input type="number" min="0" max="8" class="form-control" v-model="formData.semester"
                @input="handleInput('semester')" :class="{ 'is-invalid': errors.semester }" />
              <div class="invalid-feedback" v-if="errors.semester">{{ errors.semester }}</div>
              <small>Max 8</small>
            </div>
          </div>

          <!-- CGPA -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>CGPA *</label>
              <input type="number" step="0.01" min="0" max="10" class="form-control" v-model="formData.cgpa"
                @input="handleInput('cgpa')" :class="{ 'is-invalid': errors.cgpa }" />
              <div class="invalid-feedback" v-if="errors.cgpa">{{ errors.cgpa }}</div>
              <small>Max 10.00</small>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AcademicInformation",
  props: { formData: Object },
  data() {
    return { errors: {} };
  },
  methods: {
    handleInput(field) {
      // Clear error for this field on input
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

      // Real-time Max Validation
      if (field.includes('cgpa') && this.formData[field] > 10) {
        this.errors[field] = "CGPA cannot exceed 10.00";
      } else if ((field.includes('score')) && this.formData[field] > 100) {
        this.errors[field] = "Score cannot exceed 100";
      } else if (field === 'semester' && this.formData[field] > 8) {
        this.errors[field] = "Semester cannot exceed 8";
      }
    },
    validate() {
      this.errors = {};
      let isValid = true;

      if (!this.formData.class10_year) {
        this.errors.class10_year = "Class 10 Year is required";
        isValid = false;
      } else if (this.formData.class10_year < 0) {
        this.errors.class10_year = "Year cannot be negative";
        isValid = false;
      }
      if (!this.formData.class10_score) {
        this.errors.class10_score = "Class 10 Score is required";
        isValid = false;
      } else if (this.formData.class10_score < 0) {
        this.errors.class10_score = "Score cannot be negative";
        isValid = false;
      }
      if (!this.formData.class12_year) {
        this.errors.class12_year = "Class 12 Year is required";
        isValid = false;
      } else if (this.formData.class12_year < 0) {
        this.errors.class12_year = "Year cannot be negative";
        isValid = false;
      }
      if (!this.formData.class12_score) {
        this.errors.class12_score = "Class 12 Score is required";
        isValid = false;
      } else if (this.formData.class12_score < 0) {
        this.errors.class12_score = "Score cannot be negative";
        isValid = false;
      }
      if (!this.formData.medium) {
        this.errors.medium = "Medium is required";
        isValid = false;
      }

      if (this.formData.ug_status === "Pursuing") {
        if (!this.formData.ug_cgpa) {
          this.errors.ug_cgpa = "Current CGPA / Percentage is required";
          isValid = false;
        } else if (this.formData.ug_cgpa < 0) {
          this.errors.ug_cgpa = "CGPA cannot be negative";
          isValid = false;
        } else if (this.formData.ug_cgpa > 10) {
          this.errors.ug_cgpa = "CGPA cannot exceed 10.00";
          isValid = false;
        }
      }

      if (!this.formData.semester) {
        this.errors.semester = "Semester is required";
        isValid = false;
      } else if (this.formData.semester < 0) {
        this.errors.semester = "Semester cannot be negative";
        isValid = false;
      } else if (this.formData.semester > 8) {
        alert("Semester cannot exceed 8");
        this.errors.semester = "Semester cannot exceed 8";
        isValid = false;
      }

      if (!this.formData.ug_status) {
        this.errors.ug_status = "Please select Undergraduate status";
        isValid = false;
      }

      if (!this.formData.pg_exists) {
        this.errors.pg_exists = "Please select if you have a Higher Qualification";
        isValid = false;
      }

      if (this.formData.ug_institution && !this.formData.ug_institution.trim()) {
        this.errors.ug_institution = "Institution is required";
        isValid = false;
      }

      if (!this.formData.cgpa) {
        this.errors.cgpa = "CGPA is required";
        isValid = false;
      } else if (this.formData.cgpa < 0) {
        this.errors.cgpa = "CGPA cannot be negative";
        isValid = false;
      } else if (this.formData.cgpa > 10) {
        this.errors.cgpa = "CGPA cannot exceed 10.00";
        isValid = false;
      }

      return isValid;
    }
  }
};
</script>
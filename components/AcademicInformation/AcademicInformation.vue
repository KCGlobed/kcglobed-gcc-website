<template>
  <div class="academic-information-warp pb-50">
    <div class="container">
      <div class="academic-info-content pb-30">
        <h3>Academic Information</h3>
        <p>
          Please provide details of your highest qualification.
        </p>
      </div>
      
      <form>
        <div class="row applicant-details">
          <div class="col-lg-12">
             <!-- Highest Qualification -->
              <div class="input-box">
                <label class="form-label">Highest Qualification <span>*</span></label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="qualification" id="bcom" value="B.Com" v-model="form.qualification" :class="{ 'is-invalid': errors.qualification }">
                  <label class="form-check-label" for="bcom">
                    B.Com (Pursuing / Completed)
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="qualification" id="mcom" value="M.Com" v-model="form.qualification" :class="{ 'is-invalid': errors.qualification }">
                  <label class="form-check-label" for="mcom">
                    M.Com (Pursuing / Completed)
                  </label>
                </div>
                 <div class="invalid-feedback d-block" v-if="errors.qualification">{{ errors.qualification }}</div>
              </div>

              <!-- University -->
              <div class="input-box">
                <label class="form-label">Latest University / Institution Name <span>*</span></label>
                <select class="form-select" v-model="form.university" :class="{ 'is-invalid': errors.university }">
                  <option selected disabled value="">--Select UGC-recognised institution--</option>
                  <option value="University A">University A</option>
                  <option value="University B">University B</option>
                  <option value="Other">Other</option>
                </select>
                <div class="invalid-feedback" v-if="errors.university">{{ errors.university }}</div>
              </div>
          </div>

          <div class="col-lg-6">
            <!-- Semester -->
            <div class="input-box">
              <label class="form-label">Current / Last Completed Semester <span>*</span></label>
              <input type="number" class="form-control" placeholder="e.g. 6" v-model="form.semester" :class="{ 'is-invalid': errors.semester }" />
              <div class="invalid-feedback" v-if="errors.semester">{{ errors.semester }}</div>
            </div>
          </div>

          <div class="col-lg-6">
             <!-- CGPA -->
            <div class="input-box">
              <label class="form-label">CGPA <span>*</span></label>
              <input type="number" step="0.01" class="form-control" placeholder="Minimum 6.0 required" v-model="form.cgpa" :class="{ 'is-invalid': errors.cgpa }" />
              <small class="text-muted">Minimum 6.0 required. M.Com candidates eligible only if B.Com is with 6 CGPA.</small>
               <div class="invalid-feedback" v-if="errors.cgpa">{{ errors.cgpa }}</div>
            </div>
          </div>

           <div class="col-lg-6">
             <!-- Graduation Year -->
            <div class="input-box">
              <label class="form-label">Graduation / Expected Graduation Year <span>*</span></label>
               <input type="number" class="form-control" placeholder="YYYY" v-model="form.graduationYear" :class="{ 'is-invalid': errors.graduationYear }" />
               <div class="invalid-feedback" v-if="errors.graduationYear">{{ errors.graduationYear }}</div>
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
  data() {
    return {
      form: {
        qualification: "",
        university: "",
        semester: "",
        cgpa: "",
        graduationYear: "",
      },
      errors: {},
    };
  },
  methods: {
    validate() {
      this.errors = {};
      let isValid = true;

      if (!this.form.qualification) {
        this.errors.qualification = "Qualification is required";
        isValid = false;
      }
      if (!this.form.university) {
        this.errors.university = "University is required";
        isValid = false;
      }
      if (!this.form.semester) {
        this.errors.semester = "Semester is required";
        isValid = false;
      }
      if (!this.form.cgpa) {
        this.errors.cgpa = "CGPA is required";
        isValid = false;
      }
      if (!this.form.graduationYear) {
        this.errors.graduationYear = "Graduation Year is required";
        isValid = false;
      }

      return isValid;
    },
  },
};
</script>

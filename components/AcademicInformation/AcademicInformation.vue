<template>
  <div class="academic-information-warp pb-50">
    <div class="container">
      <h3>Academic Information</h3>

      <form>
        <div class="row applicant-details">

          <!-- Class 10 -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 10 – Year of Passing *</label>
              <input type="number" class="form-control" v-model="formData.class10_year" />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 10 – Percentage / CGPA *</label>
              <input type="number" step="0.01" max="100" class="form-control" v-model="formData.class10_score" />
            </div>
          </div>

          <!-- Class 12 -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 12 – Year of Passing *</label>
              <input type="number" class="form-control" v-model="formData.class12_year" />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="input-box">
              <label>Class 12 – Percentage / CGPA *</label>
              <input type="number" step="0.01" max="100" class="form-control" v-model="formData.class12_score" />
            </div>
          </div>

          <!-- Medium of Instruction -->
          <div class="col-lg-12">
            <div class="input-box">
              <label>Medium of Instruction *</label><br />
              <label><input type="radio" value="English" v-model="formData.medium" /> English</label>
              <label class="ms-3"><input type="radio" value="Hindi" v-model="formData.medium" /> Hindi</label>
              <label class="ms-3"><input type="radio" value="Other" v-model="formData.medium" /> Other</label>
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
            <h5>Undergraduate Qualification (B.Com)</h5>

            <label><input type="radio" value="Completed" v-model="formData.ug_status" /> Completed</label>
            <label class="ms-3"><input type="radio" value="Pursuing" v-model="formData.ug_status" /> Pursuing</label>
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
          <div class="col-lg-6" v-if="formData.ug_status === 'Pursuing'">
            <div class="input-box">
              <label>Current CGPA / Percentage *</label>
              <input type="number" step="0.01" max="10" class="form-control" v-model="formData.ug_cgpa" />
              <small>Max 10.00</small>
            </div>
          </div>

          <!-- UG Institution -->
          <div class="col-lg-12">
            <div class="input-box">
              <label>Institution Name (B.Com) *</label>
              <input type="text" class="form-control" v-model="formData.ug_institution" />
            </div>
          </div>

          <!-- Higher Qualification -->
          <div class="col-lg-12 mt-3">
            <label>Do you have a Higher Qualification?</label><br />
            <label><input type="radio" value="Yes" v-model="formData.pg_exists" /> Yes</label>
            <label class="ms-3"><input type="radio" value="No" v-model="formData.pg_exists" /> No</label>
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
              <input type="number" max="8" class="form-control" v-model="formData.semester" />
              <small>Max 8</small>
            </div>
          </div>

          <!-- CGPA -->
          <div class="col-lg-6">
            <div class="input-box">
              <label>CGPA *</label>
              <input type="number" step="0.01" max="10" class="form-control" v-model="formData.cgpa" />
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
    validate() {
      this.errors = {};
      let ok = true;

      if (!this.formData.class10_year) ok = false;
      if (!this.formData.class12_year) ok = false;
      if (!this.formData.medium) ok = false;

      if (this.formData.ug_status === "Pursuing" && this.formData.ug_cgpa > 10) {
        alert("CGPA cannot exceed 10.00");
        ok = false;
      }

      if (this.formData.semester > 8) {
        alert("Semester cannot exceed 8");
        ok = false;
      }

      return ok;
    }
  }
};
</script>
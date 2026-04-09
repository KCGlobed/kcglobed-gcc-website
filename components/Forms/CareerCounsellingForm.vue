<template>
  <div class="counselling-form border p-4 bg-white rounded">
    <h4 class="fw-bold fs-5 mb-4 text-dark">Get Free Career Counselling</h4>
    <form @submit.prevent>
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Email Address <span class="text-danger">*</span></label>
        <input type="email" class="form-control form-control-sm border" />
      </div>
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Full Name <span class="text-danger">*</span></label>
        <input type="text" class="form-control form-control-sm border" />
      </div>
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Graduation Year <span class="text-danger">*</span></label>
        <input type="text" class="form-control form-control-sm border" />
      </div>
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Job Title <span class="text-danger">*</span></label>
        <select class="form-select form-select-sm border">
          <option selected>Select Job Title</option>
          <option value="1">Software Engineer</option>
          <option value="2">Data Scientist</option>
          <option value="3">Product Manager</option>
          <option value="4">Other</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Program <span class="text-danger">*</span></label>
        <select class="form-select form-select-sm border">
          <option selected>Select Program</option>
          <option value="1">PGP Course in Business</option>
          <option value="2">MBA</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Mobile Number <span class="text-danger">*</span></label>
        <div class="input-group input-group-sm mb-2">
          <input
            type="tel"
            class="form-control border"
            placeholder="Enter your mobile number"
          />
          <span class="input-group-text bg-white border">
            <img src="https://flagcdn.com/w20/in.png" alt="India Flag" class="flag-icon" />
          </span>
        </div>
      </div>

      <p class="fs-8 text-muted mb-3 terms-text">
        By continuing, I have read and agree to
        <br />
        Scaler's <a href="#" class="text-purple text-decoration-none">Terms</a> and <a href="#" class="text-purple text-decoration-none">Privacy Policy</a>
      </p>

      <button type="submit" class="btn text-white w-50 py-2 fs-7 submit-btn">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CareerCounsellingForm",
});
</script>

<style scoped>
.counselling-form {
  /* border-color: #555 !important;  */
}
.fs-7 {
  font-size: 0.85rem;
}
.fs-8 {
  font-size: 0.75rem;
}
.form-control-sm,
.form-select-sm {
  border-radius: 2px;
  padding: 0.4rem 0.5rem;
}
.form-control-sm:focus,
.form-select-sm:focus,
.form-control:focus {
  box-shadow: none;
  border-color: #6a25cc;
}
.flag-icon {
  width: 20px;
}
.text-purple {
  color: #a445ff;
}
.submit-btn {
  background-color: #9b3d94;
  font-weight: 600;
  border-radius: 12px;

}
.submit-btn:hover {
  background-color: #9b3d94;
}
.terms-text {
  line-height: 1.4;
}
</style>

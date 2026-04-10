<template>
  <div class="counselling-form border p-4 bg-white rounded shadow-sm">
    <h4 class="fw-bold fs-5 mb-4 text-dark">Get Free Career Counselling</h4>
    <form @submit.prevent="submitForm">
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label fs-7 mb-1">First Name <span class="text-danger">*</span></label>
          <input v-model="form.first_name" type="text" class="form-control form-control-sm border" placeholder="First Name" required />
        </div>
        <div class="col-6">
          <label class="form-label fs-7 mb-1">Last Name <span class="text-danger">*</span></label>
          <input v-model="form.last_name" type="text" class="form-control form-control-sm border" placeholder="Last Name" required />
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Email Address <span class="text-danger">*</span></label>
        <input v-model="form.email" type="email" class="form-control form-control-sm border" placeholder="Email Address" required />
      </div>

      <div class="mb-3">
        <label class="form-label fs-7 mb-1">Mobile Number <span class="text-danger">*</span></label>
        <div class="input-group input-group-sm">
          <input v-model="form.phone" type="tel" class="form-control border" placeholder="Enter your mobile number" required />
          <span class="input-group-text bg-white border">
            <img src="https://flagcdn.com/w20/in.png" alt="India Flag" class="flag-icon" />
          </span>
        </div>
      </div>

      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label fs-7 mb-1">State/UT <span class="text-danger">*</span></label>
          <select v-model="form.state" class="form-select form-select-sm border" required>
            <option value="">Select State</option>
            <option v-for="state in states" :key="state" :value="state">
              {{ state }}
            </option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label fs-7 mb-1">City <span class="text-danger">*</span></label>
          <select v-model="form.city" class="form-select form-select-sm border" required>
            <option value="">Select City</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
      </div>

      <p class="fs-8 text-muted mb-3 terms-text">
        By continuing, I have read and agree to
        <br />
        KC GlobEd's <a href="#" class="text-purple text-decoration-none">Terms</a> and <a href="#" class="text-purple text-decoration-none">Privacy Policy</a>
      </p>

      <button type="submit" class="btn text-white w-100 py-2 fs-7 submit-btn" :disabled="loading">
        {{ loading ? "Submitting..." : "SUBMIT" }}
      </button>

      <p v-if="message" :class="message.includes('success') ? 'success-text' : 'error-text'" class="mt-2 fs-7 mb-0 text-center">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import stateCityData from "~/state_city.json";

const loading = ref(false);
const message = ref("");
const states = ref([]);
const cities = ref([]);

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  state: "",
  city: ""
});

onMounted(() => {
  // Populate states from local JSON and sort alphabetically
  const statesArr = Object.keys(stateCityData);
  states.value = statesArr.sort((a, b) => a.localeCompare(b));
});

watch(() => form.value.state, (state) => {
  if (!state) {
    cities.value = [];
    return;
  }
  // Populate cities from local JSON and sort alphabetically
  const citiesArr = stateCityData[state] || [];
  cities.value = [...citiesArr].sort((a, b) => a.localeCompare(b));
});

const submitForm = async () => {
  loading.value = true;
  message.value = "";

  try {
    const config = useRuntimeConfig();

    await $fetch(`${config.public.apiBase}/api/students/contact-us/`, {
      method: "POST",
      body: form.value
    });

    message.value = "Submitted successfully!";
    form.value = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      state: "",
      city: ""
    };
  } catch (err) {
    message.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fs-7 {
  font-size: 0.85rem;
}
.fs-8 {
  font-size: 0.75rem;
}
.form-control-sm,
.form-select-sm {
  border-radius: 4px;
  padding: 0.45rem 0.5rem;
}
.form-control-sm:focus,
.form-select-sm:focus {
  box-shadow: none;
  border-color: #9b3d94;
}
.flag-icon {
  width: 20px;
}
.text-purple {
  color: #9b3d94;
}
.submit-btn {
  background-color: #9b3d94;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.submit-btn:hover:not(:disabled) {
  background-color: #82327c;
  transform: translateY(-1px);
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.terms-text {
  line-height: 1.4;
}
.success-text {
  color: green;
}
.error-text {
  color: red;
}
</style>


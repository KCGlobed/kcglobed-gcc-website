<template>
  <div>
    <!-- Side Button -->
    <div class="contact-tab" @click="toggleForm">
      Quick Contact
    </div>

    <!-- Slide Form -->
    <div class="contact-panel" :class="{ open: isOpen }">

      <!-- Header -->
      <div class="panel-header">
        <h3>Quick Contact Form</h3>
        <span class="close" @click="toggleForm">✕</span>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm">

        <div class="row">
          <div class="input-group">
            <label>First Name*</label>
            <input v-model="form.first_name" type="text" placeholder="First Name" required />
          </div>

          <div class="input-group">
            <label>Last Name*</label>
            <input v-model="form.last_name" type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div class="row">
          <div class="input-group">
            <label>Mobile*</label>
            <input v-model="form.phone" type="text" placeholder="Mobile Number" required />
          </div>

          <div class="input-group">
            <label>Email*</label>
            <input v-model="form.email" type="email" placeholder="Email Address" required />
          </div>
        </div>

        <div class="row">
          <div class="input-group">
            <label>State*</label>
            <input v-model="form.state" type="text" placeholder="State" required />
          </div>

          <div class="input-group">
            <label>City*</label>
            <input v-model="form.city" type="text" placeholder="City" required />
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? "Submitting..." : "SUBMIT" }}
        </button>

        <p v-if="message" class="error-msg">
          {{ message }}
        </p>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const isOpen = ref(false)
const loading = ref(false)
const message = ref("")

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  state: "",
  city: ""
})

const toggleForm = () => {
  isOpen.value = !isOpen.value
}

const submitForm = async () => {

  loading.value = true
  message.value = ""

  try {

    const config = useRuntimeConfig()

    await $fetch(`https://gccwebsite-admin-backend-738131651355.asia-south1.run.app/api/students/contact-us/`, {
      method: "POST",
      body: form.value
    })

    // reset form
    form.value = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      state: "",
      city: ""
    }

    // close form after success
    isOpen.value = false

  } catch (err) {

    message.value = "Something went wrong"

  } finally {

    loading.value = false

  }

}
</script>

<style scoped>
.contact-tab {
  position: fixed;
  right: 45px;
  top: 45%;
  transform: rotate(-90deg);
  transform-origin: right top;
  background: #A13E99 !important;
  color: white;
  padding: 10px 22px;
  font-weight: 600;
  cursor: pointer;
  z-index: 10000;
  border-radius: 6px 6px 0 0;
}

.contact-panel {
  position: fixed;
  right: -520px;
  top: 200px;
  width: 520px;
  max-width: 95%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  transition: all 0.20s ease;
  padding: 22px;
  z-index: 100000;
}

.contact-panel.open {
  right: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.panel-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.close {
  cursor: pointer;
  font-size: 20px;
  color: #666;
}

.row {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 13px;
  margin-bottom: 4px;
  color: #444;
}

.input-group input {
  border: 1px solid #ddd;
  padding: 9px 10px;
  border-radius: 6px;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border-color: #A13E99 !important;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #A13E99 !important;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.error-msg {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}


/* 📱 Mobile responsive */

@media (max-width: 768px) {

  .contact-panel {
    width: 100%;
    top: auto;
    bottom: 0;
    right: -100%;
    border-radius: 12px 12px 0 0;
  }

  .contact-panel.open {
    right: 0;
  }

  .row {
    flex-direction: column;
  }

  .contact-tab {
    right: 30px;
    padding: 5px 10px;
  }

}
</style>
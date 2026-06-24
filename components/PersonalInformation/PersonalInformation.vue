<template>
  <div class="personal-information-warp">
    <form @submit.prevent>
      <div class="row g-4">
        <!-- Applicant Name -->
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">First Name <span>*</span></label>
            <input type="text" class="form-control" placeholder="First Name" v-model="formData.first_name"
              @blur="validateField('first_name')" @input="validateField('first_name')"
              :class="{ 'is-invalid': errors.first_name }" />
            <div class="invalid-feedback" v-if="errors.first_name">{{ errors.first_name }}</div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Last Name <span>*</span></label>
            <input type="text" class="form-control" placeholder="Last Name" v-model="formData.last_name"
              @blur="validateField('last_name')" @input="validateField('last_name')"
              :class="{ 'is-invalid': errors.last_name }" />
            <div class="invalid-feedback" v-if="errors.last_name">{{ errors.last_name }}</div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Email ID <span>*</span></label>
            <input type="email" class="form-control" placeholder="Email ID" v-model="formData.email"
              @blur="validateField('email')" @input="validateField('email')" :class="{ 'is-invalid': errors.email }" />
            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Mobile Number <span>*</span></label>
            <div class="input-group">
              <span class="input-group-text bg-white">+91</span>
              <input type="tel" class="form-control" placeholder="Mobile Number" v-model="formData.mobile"
                @blur="validateField('mobile')" @input="validateField('mobile')"
                :class="{ 'is-invalid': errors.mobile }" />
            </div>
            <div class="invalid-feedback d-block" v-if="errors.mobile">{{ errors.mobile }}</div>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Emergency Contact Name</label>
            <input type="text" class="form-control" placeholder="Contact Name" v-model="formData.father_name"
              @blur="validateField('father_name')" @input="validateField('father_name')"
              :class="{ 'is-invalid': errors.father_name }" />
            <div class="invalid-feedback" v-if="errors.father_name">{{ errors.father_name }}</div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Emergency Contact Number</label>
            <input type="tel" class="form-control" placeholder="Mobile Number" v-model="formData.father_mobile"
              @blur="validateField('father_mobile')" @input="validateField('father_mobile')"
              :class="{ 'is-invalid': errors.father_mobile }" />
            <div class="invalid-feedback" v-if="errors.father_mobile">{{ errors.father_mobile }}</div>
          </div>
        </div>

        <!-- Parent/Guardian Details -->
        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Parent/Guardian Name <span v-if="!guardianKeyStatus">*</span></label>
            <input type="text" class="form-control" placeholder="Parent/Guardian Name" v-model="formData.guardian_name"
              @blur="validateField('guardian_name')" @input="validateField('guardian_name')"
              :class="{ 'is-invalid': errors.guardian_name }" />
            <div class="invalid-feedback" v-if="errors.guardian_name">{{ errors.guardian_name }}</div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Relationship <span v-if="!guardianKeyStatus">*</span></label>
            <select class="form-select" v-model="formData.guardian_dropdown" @change="onRelationshipChange"
              :class="{ 'is-invalid': errors.guardian_dropdown }">
              <option value="" disabled>--Select--</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Other">Other</option>
            </select>
            <div class="invalid-feedback" v-if="errors.guardian_dropdown">{{ errors.guardian_dropdown }}</div>
          </div>
        </div>

        <!-- Dynamic Other Relationship Specification -->
        <div class="col-lg-12" v-if="formData.guardian_dropdown === 'Other'">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Please specify relationship <span v-if="!guardianKeyStatus">*</span></label>
            <input type="text" class="form-control" placeholder="Specify Relationship"
              v-model="formData.guardian_other_reason" @blur="validateField('guardian_other_reason')"
              @input="validateField('guardian_other_reason')"
              :class="{ 'is-invalid': errors.guardian_other_reason }" />
            <div class="invalid-feedback" v-if="errors.guardian_other_reason">{{ errors.guardian_other_reason }}
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Parent/Guardian Phone Number <span v-if="!guardianKeyStatus">*</span></label>
            <input type="tel" class="form-control" placeholder="Phone Number" v-model="formData.guardian_phone"
              @blur="validateField('guardian_phone')" @input="validateField('guardian_phone')"
              :class="{ 'is-invalid': errors.guardian_phone }" />
            <div class="invalid-feedback" v-if="errors.guardian_phone">{{ errors.guardian_phone }}</div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Parent/Guardian Email ID <span v-if="!guardianKeyStatus">*</span></label>
            <input type="email" class="form-control" placeholder="Email ID" v-model="formData.guardian_email"
              @blur="validateField('guardian_email')" @input="validateField('guardian_email')"
              :class="{ 'is-invalid': errors.guardian_email }" />
            <div class="invalid-feedback" v-if="errors.guardian_email">{{ errors.guardian_email }}</div>
          </div>
        </div>

        <!-- Personal Details -->
        <div class="col-lg-4">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Date Of Birth <span>*</span></label>
            <input type="date" class="form-control" v-model="formData.dob" @change="validateField('dob')"
              :class="{ 'is-invalid': errors.dob }" min="1996-01-01" :max="getMaxDOB()" />
            <div class="invalid-feedback" v-if="errors.dob">{{ errors.dob }}</div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Gender <span>*</span></label>
            <select class="form-select" v-model="formData.gender" @change="validateField('gender')"
              :class="{ 'is-invalid': errors.gender }">
              <option selected disabled value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other / Prefer not to say</option>
            </select>
            <div class="invalid-feedback" v-if="errors.gender">{{ errors.gender }}</div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="input-box mb-0">
            <label class="form-label fw-bold font-muted">Nationality</label>
            <input type="text" class="form-control text-muted bg-light" readonly v-model="formData.nationality" />
          </div>
        </div>

        <!-- Address Info -->
        <div class="col-lg-4">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">State/UT <span>*</span></label>
            <select class="form-select" v-model="formData.state" @change="onStateChange(); validateField('state')"
              :class="{ 'is-invalid': errors.state }">
              <option value="" disabled>Select State</option>
              <option v-for="state in statesList" :key="state" :value="state">{{ state }}</option>
            </select>
            <div class="invalid-feedback" v-if="errors.state">{{ errors.state }}</div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">City <span>*</span></label>
            <select class="form-select" v-model="formData.city" @change="validateField('city')"
              :class="{ 'is-invalid': errors.city }">
              <option value="" disabled>Select City</option>
              <option v-for="city in citiesList" :key="city" :value="city">{{ city }}</option>
            </select>
            <div class="invalid-feedback" v-if="errors.city">{{ errors.city }}</div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">PIN Code <span>*</span></label>
            <input type="text" class="form-control" placeholder="PIN Code" v-model="formData.pin_code"
              @blur="validateField('pin_code')" @input="validateField('pin_code')"
              :class="{ 'is-invalid': errors.pin_code }" />
            <div class="invalid-feedback" v-if="errors.pin_code">{{ errors.pin_code }}</div>
          </div>
        </div>

        <div class="col-lg-12">
          <div class="input-box mb-0">
            <label class="form-label fw-bold">Complete Address <span>*</span></label>
            <textarea class="form-control" placeholder="Enter full address" v-model="formData.complete_address"
              @blur="validateField('complete_address')" @input="validateField('complete_address')"
              :class="{ 'is-invalid': errors.complete_address }" rows="3"></textarea>
            <div class="invalid-feedback" v-if="errors.complete_address">{{ errors.complete_address }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { isValidMobile, isValidPincode } from "../../utils/validators";
import stateCityData from "../../state_city.json";

export default {
  name: "PersonalInformation",
  props: {
    formData: {
      type: Object,
      required: true
    },
    guardianKeyStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errors: {},
      statesList: [],
      citiesList: []
    };
  },
  mounted() {
    // Populate states from local JSON and sort alphabetically
    const statesArr = Object.keys(stateCityData);
    this.statesList = statesArr.sort((a, b) => a.localeCompare(b));

    // If editing a profile and state is already set, fetch its cities
    if (this.formData.state) {
      const cities = stateCityData[this.formData.state] || [];
      this.citiesList = [...cities].sort((a, b) => a.localeCompare(b));
    }
  },
  watch: {
    "formData.state": function (newState) {
      if (!newState) {
        this.citiesList = [];
        return;
      }
      // Populate cities from local JSON and sort alphabetically
      const cities = stateCityData[newState] || [];
      this.citiesList = [...cities].sort((a, b) => a.localeCompare(b));
    }
  },
  methods: {
    getMaxDOB() {
      const today = new Date();
      const minAgeDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return minAgeDate.toISOString().split("T")[0];
    },
    validateField(field) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let error = "";

      switch (field) {
        case 'first_name':
          if (!this.formData.first_name) error = "First Name is required";
          break;
        case 'last_name':
          if (!this.formData.last_name) error = "Last Name is required";
          break;
        case 'email':
          if (!this.formData.email) {
            error = "Email is required";
          } else if (!emailRegex.test(this.formData.email)) {
            error = "Invalid email format";
          }
          break;
        case 'mobile':
          if (!this.formData.mobile) {
            error = "Mobile Number is required";
          } else if (!isValidMobile(this.formData.mobile)) {
            error = "Invalid mobile number (10 digits)";
          }
          break;
        case 'father_name':
          if (this.formData.father_name && !/^[A-Za-z ]+$/.test(this.formData.father_name)) {
            error = "Only alphabets and spaces are allowed.";
          }
          break;
        case 'father_mobile':
          if (this.formData.father_mobile && !isValidMobile(this.formData.father_mobile)) {
            error = "Invalid mobile number (10 digits)";
          }
          break;
        case 'guardian_name':
          if (!this.guardianKeyStatus) {
            if (!this.formData.guardian_name) {
              error = "Parent/Guardian Name is required";
            } else if (!/^[A-Za-z .\(\)]+$/.test(this.formData.guardian_name)) {
              error = "Only alphabets, spaces, dots, and parentheses are allowed.";
            }
          } else if (this.formData.guardian_name && !/^[A-Za-z .\(\)]+$/.test(this.formData.guardian_name)) {
            error = "Only alphabets, spaces, dots, and parentheses are allowed.";
          }
          break;
        case 'guardian_phone':
          if (!this.guardianKeyStatus) {
            if (!this.formData.guardian_phone) {
              error = "Parent/Guardian Phone Number is required";
            } else if (!isValidMobile(this.formData.guardian_phone)) {
              error = "Invalid mobile number (10 digits)";
            }
          } else if (this.formData.guardian_phone && !isValidMobile(this.formData.guardian_phone)) {
            error = "Invalid mobile number (10 digits)";
          }
          break;
        case 'guardian_email':
          if (!this.guardianKeyStatus) {
            if (!this.formData.guardian_email) {
              error = "Parent/Guardian Email ID is required";
            } else if (!emailRegex.test(this.formData.guardian_email)) {
              error = "Invalid email format";
            }
          } else if (this.formData.guardian_email && !emailRegex.test(this.formData.guardian_email)) {
            error = "Invalid email format";
          }
          break;
        case 'guardian_dropdown':
          if (!this.guardianKeyStatus && !this.formData.guardian_dropdown) {
            error = "Relationship is required";
          }
          break;
        case 'guardian_other_reason':
          if (this.formData.guardian_dropdown === 'Other') {
            if (!this.guardianKeyStatus && !this.formData.guardian_other_reason) {
              error = "Relationship specification is required";
            }
          }
          break;
        case 'dob':
          if (!this.formData.dob) {
            error = "Date of Birth is required";
          } else {
            const selectedDate = new Date(this.formData.dob);

            const today = new Date();
            const minAgeDate = new Date(
              today.getFullYear() - 18,
              today.getMonth(),
              today.getDate()
            );

            if (selectedDate > minAgeDate) {
              error = "You must be at least 18 years old";
            }
          }
          break;
        case 'gender':
          if (!this.formData.gender) error = "Gender is required";
          break;
        case 'state':
          if (!this.formData.state) error = "State is required";
          break;
        case 'city':
          if (!this.formData.city) error = "City is required";
          break;
        case 'pin_code':
          if (!this.formData.pin_code) {
            error = "PIN Code is required";
          } else if (!isValidPincode(this.formData.pin_code)) {
            error = "Invalid PIN code (6 digits)";
          }
          break;
        case 'complete_address':
          if (!this.formData.complete_address) error = "Complete Address is required";
          break;
      }

      if (error) {
        this.errors[field] = error;
      } else {
        delete this.errors[field];
      }
      return !error;
    },
    onRelationshipChange() {
      if (this.formData.guardian_dropdown !== 'Other') {
        this.formData.guardian_other_reason = "";
        delete this.errors.guardian_other_reason;
      }
      this.validateField('guardian_dropdown');
    },
    onStateChange() {
      this.formData.city = "";
    },
    scrollToFirstError() {
      this.$nextTick(() => {
        const el = this.$el.querySelector('.is-invalid');
        if (el && el.scrollIntoView) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    validate() {
      const fields = [
        'first_name', 'last_name', 'email', 'mobile', 'father_name', 'father_mobile',
        'dob', 'gender', 'state', 'city', 'pin_code', 'complete_address',
        'guardian_name', 'guardian_phone', 'guardian_email', 'guardian_dropdown', 'guardian_other_reason'
      ];
      let isValid = true;
      fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
      return isValid;
    },
  },
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

.form-control,
.form-select {
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  color: #111827;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-control::placeholder {
  color: #9CA3AF;
}

.form-control:focus,
.form-select:focus {
  background-color: #fff;
  border-color: #872980;
  box-shadow: 0 0 0 4px rgba(135, 41, 128, 0.1);
  outline: none;
}

.input-group-text {
  font-size: 14px;
  font-weight: 600;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-right: none;
  color: #6B7280;
  border-radius: 10px 0 0 10px;
  padding: 0 16px;
}

.input-group .form-control {
  border-left: none;
  border-radius: 0 10px 10px 0;
}

.bg-light {
  background-color: #F3F4F6 !important;
}

.invalid-feedback {
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
}
</style>

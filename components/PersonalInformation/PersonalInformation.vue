<template>
  <div class="personal-information-warp pb-50">
    <div class="container">
      <form>
        <div class="row">
          <div class="col-lg-12">
            <div class="applicant-details">
              <h3>Personal Information</h3>
              
              <!-- Applicant Name -->
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Applicant First Name <span>*</span></label>
                    <input type="text" class="form-control" placeholder="First Name" v-model="formData.first_name" :class="{ 'is-invalid': errors.first_name }" />
                    <div class="invalid-feedback" v-if="errors.first_name">{{ errors.first_name }}</div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Applicant Last Name <span>*</span></label>
                    <input type="text" class="form-control" placeholder="Last Name" v-model="formData.last_name" :class="{ 'is-invalid': errors.last_name }" />
                    <div class="invalid-feedback" v-if="errors.last_name">{{ errors.last_name }}</div>
                  </div>
                </div>
              </div>

              <!-- Contact Info -->
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Email ID <span>*</span></label>
                    <input type="email" class="form-control" placeholder="Email ID" v-model="formData.email" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                  </div>
                </div>
                 <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Mobile Number <span>*</span></label>
                    <input type="tel" class="form-control" placeholder="Mobile Number" v-model="formData.mobile" :class="{ 'is-invalid': errors.mobile }" />
                    <div class="invalid-feedback" v-if="errors.mobile">{{ errors.mobile }}</div>
                  </div>
                </div>
              </div>

              <!-- Personal Details -->
              <div class="row">
                <div class="col-lg-4">
                   <div class="input-box">
                    <label class="form-label">Date Of Birth <span>*</span></label>
                    <div class="input-with-icon">
                      <input type="date" class="form-control" v-model="formData.dob" :class="{ 'is-invalid': errors.dob }" />
                      <i class="ti ti-calendar"></i>
                      <div class="invalid-feedback d-block" v-if="errors.dob">{{ errors.dob }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Gender <span>*</span></label>
                    <select class="form-select" v-model="formData.gender" :class="{ 'is-invalid': errors.gender }">
                      <option selected disabled value="">--Select--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.gender">{{ errors.gender }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                     <label class="form-label">Nationality <span>*</span></label>
                    <select class="form-select" disabled v-model="formData.nationality">
                      <option selected value="Indian">Indian</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Father's Details -->
              <div class="row">
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Father's Name</label>
                    <input type="text" class="form-control" placeholder="Father's Name" v-model="formData.father_name" :class="{ 'is-invalid': errors.father_name }" />
                    <div class="invalid-feedback" v-if="errors.father_name">{{ errors.father_name }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Father's Mobile Number</label>
                    <input type="tel" class="form-control" placeholder="Mobile Number" v-model="formData.father_mobile" :class="{ 'is-invalid': errors.father_mobile }" />
                     <div class="invalid-feedback" v-if="errors.father_mobile">{{ errors.father_mobile }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Father's Email ID </label>
                    <input type="email" class="form-control" placeholder="Email ID" v-model="formData.father_email" :class="{ 'is-invalid': errors.father_email }" />
                    <div class="invalid-feedback" v-if="errors.father_email">{{ errors.father_email }}</div>
                  </div>
                </div>
              </div>

              <!-- Mother's Details -->
               <div class="row">
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Mother's Name</label>
                    <input type="text" class="form-control" placeholder="Mother's Name" v-model="formData.mother_name" :class="{ 'is-invalid': errors.mother_name }" />
                    <div class="invalid-feedback" v-if="errors.mother_name">{{ errors.mother_name }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Mother's Mobile Number</label>
                    <input type="tel" class="form-control" placeholder="Mobile Number" v-model="formData.mother_mobile" :class="{ 'is-invalid': errors.mother_mobile }" />
                     <div class="invalid-feedback" v-if="errors.mother_mobile">{{ errors.mother_mobile }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Mother's Email ID</label>
                    <input type="email" class="form-control" placeholder="Email ID" v-model="formData.mother_email" :class="{ 'is-invalid': errors.mother_email }" />
                     <div class="invalid-feedback" v-if="errors.mother_email">{{ errors.mother_email }}</div>
                  </div>
                </div>
              </div>  

              <!-- Address -->
              <div class="row">
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">City <span>*</span></label>
                    <input type="text" class="form-control" placeholder="City" v-model="formData.city" :class="{ 'is-invalid': errors.city }" />
                    <div class="invalid-feedback" v-if="errors.city">{{ errors.city }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                   <div class="input-box">
                    <label class="form-label">State <span>*</span></label>
                    <input type="text" class="form-control" placeholder="State" v-model="formData.state" :class="{ 'is-invalid': errors.state }" />
                    <div class="invalid-feedback" v-if="errors.state">{{ errors.state }}</div>
                  </div>
                </div>
                 <div class="col-lg-4">
                   <div class="input-box">
                    <label class="form-label">PIN Code <span>*</span></label>
                    <input type="text" class="form-control" placeholder="PIN Code" v-model="formData.pin_code" :class="{ 'is-invalid': errors.pin_code }" />
                    <div class="invalid-feedback" v-if="errors.pin_code">{{ errors.pin_code }}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInformation",
  props: {
    formData: Object
  },
  data() {
    return {
      errors: {}
    };
  },
  methods: {
    validate() {
      this.errors = {};
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!this.formData.first_name) {
        this.errors.first_name = "First Name is required";
        isValid = false;
      }
      if (!this.formData.last_name) {
        this.errors.last_name = "Last Name is required";
        isValid = false;
      }
      if (!this.formData.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = "Invalid email format";
        isValid = false;
      }
      if (!this.formData.mobile) {
        this.errors.mobile = "Mobile Number is required";
        isValid = false;
      } else if (!phoneRegex.test(this.formData.mobile)) {
        this.errors.mobile = "Invalid mobile number (10 digits)";
        isValid = false;
      }
      if (!this.formData.dob) {
        this.errors.dob = "Date of Birth is required";
        isValid = false;
      }
      if (!this.formData.gender) {
        this.errors.gender = "Gender is required";
        isValid = false;
      }
      if (!this.formData.city) {
        this.errors.city = "City is required";
        isValid = false;
      }
      if (!this.formData.state) {
        this.errors.state = "State is required";
        isValid = false;
      }
      if (!this.formData.pin_code) {
        this.errors.pin_code = "PIN Code is required";
        isValid = false;
      }

      return isValid;
    },
  },
};
</script>

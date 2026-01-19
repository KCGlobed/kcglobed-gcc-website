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
                    <input type="text" class="form-control" placeholder="First Name" v-model="form.firstName" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback" v-if="errors.firstName">{{ errors.firstName }}</div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Applicant Last Name <span>*</span></label>
                    <input type="text" class="form-control" placeholder="Last Name" v-model="form.lastName" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback" v-if="errors.lastName">{{ errors.lastName }}</div>
                  </div>
                </div>
              </div>

              <!-- Contact Info -->
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Email ID <span>*</span></label>
                    <input type="email" class="form-control" placeholder="Email ID" v-model="form.email" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                  </div>
                </div>
                 <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Mobile Number <span>*</span></label>
                    <input type="tel" class="form-control" placeholder="Mobile Number" v-model="form.mobile" :class="{ 'is-invalid': errors.mobile }" />
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
                      <input type="date" class="form-control" v-model="form.dob" :class="{ 'is-invalid': errors.dob }" />
                      <i class="ti ti-calendar"></i>
                      <div class="invalid-feedback d-block" v-if="errors.dob">{{ errors.dob }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Gender <span>*</span></label>
                    <select class="form-select" v-model="form.gender" :class="{ 'is-invalid': errors.gender }">
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
                    <select class="form-select" disabled v-model="form.nationality">
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
                    <input type="text" class="form-control" placeholder="Father's Name" v-model="form.fatherName" :class="{ 'is-invalid': errors.fatherName }" />
                    <div class="invalid-feedback" v-if="errors.fatherName">{{ errors.fatherName }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Father's Mobile Number</label>
                    <input type="tel" class="form-control" placeholder="Mobile Number" v-model="form.fatherMobile" :class="{ 'is-invalid': errors.fatherMobile }" />
                     <div class="invalid-feedback" v-if="errors.fatherMobile">{{ errors.fatherMobile }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Father's Email ID </label>
                    <input type="email" class="form-control" placeholder="Email ID" v-model="form.fatherEmail" :class="{ 'is-invalid': errors.fatherEmail }" />
                    <div class="invalid-feedback" v-if="errors.fatherEmail">{{ errors.fatherEmail }}</div>
                  </div>
                </div>
              </div>

              <!-- Mother's Details -->
               <div class="row">
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Mother's Name</label>
                    <input type="text" class="form-control" placeholder="Mother's Name" v-model="form.motherName" :class="{ 'is-invalid': errors.motherName }" />
                    <div class="invalid-feedback" v-if="errors.motherName">{{ errors.motherName }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Mother's Mobile Number</label>
                    <input type="tel" class="form-control" placeholder="Mobile Number" v-model="form.motherMobile" :class="{ 'is-invalid': errors.motherMobile }" />
                     <div class="invalid-feedback" v-if="errors.motherMobile">{{ errors.motherMobile }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">Mother's Email ID</label>
                    <input type="email" class="form-control" placeholder="Email ID" v-model="form.motherEmail" :class="{ 'is-invalid': errors.motherEmail }" />
                     <div class="invalid-feedback" v-if="errors.motherEmail">{{ errors.motherEmail }}</div>
                  </div>
                </div>
              </div>  

              <!-- Address -->
              <div class="row">
                <div class="col-lg-4">
                  <div class="input-box">
                    <label class="form-label">City <span>*</span></label>
                    <input type="text" class="form-control" placeholder="City" v-model="form.city" :class="{ 'is-invalid': errors.city }" />
                    <div class="invalid-feedback" v-if="errors.city">{{ errors.city }}</div>
                  </div>
                </div>
                <div class="col-lg-4">
                   <div class="input-box">
                    <label class="form-label">State <span>*</span></label>
                    <input type="text" class="form-control" placeholder="State" v-model="form.state" :class="{ 'is-invalid': errors.state }" />
                    <div class="invalid-feedback" v-if="errors.state">{{ errors.state }}</div>
                  </div>
                </div>
                 <div class="col-lg-4">
                   <div class="input-box">
                    <label class="form-label">PIN Code <span>*</span></label>
                    <input type="text" class="form-control" placeholder="PIN Code" v-model="form.pincode" :class="{ 'is-invalid': errors.pincode }" />
                    <div class="invalid-feedback" v-if="errors.pincode">{{ errors.pincode }}</div>
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
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        nationality: "Indian",
        fatherName: "",
        fatherMobile: "",
        fatherEmail: "",
        motherName: "",
        motherMobile: "",
        motherEmail: "",
        city: "",
        state: "",
        pincode: "",
      },
      errors: {},
    };
  },
  methods: {
    validate() {
      this.errors = {};
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!this.form.firstName) {
        this.errors.firstName = "First Name is required";
        isValid = false;
      }
      if (!this.form.lastName) {
        this.errors.lastName = "Last Name is required";
        isValid = false;
      }
      if (!this.form.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Invalid email format";
        isValid = false;
      }
      if (!this.form.mobile) {
        this.errors.mobile = "Mobile Number is required";
        isValid = false;
      } else if (!phoneRegex.test(this.form.mobile)) {
        this.errors.mobile = "Invalid mobile number (10 digits)";
        isValid = false;
      }
      if (!this.form.dob) {
        this.errors.dob = "Date of Birth is required";
        isValid = false;
      }
      if (!this.form.gender) {
        this.errors.gender = "Gender is required";
        isValid = false;
      }
      if (!this.form.city) {
        this.errors.city = "City is required";
        isValid = false;
      }
      if (!this.form.state) {
        this.errors.state = "State is required";
        isValid = false;
      }
      if (!this.form.pincode) {
        this.errors.pincode = "PIN Code is required";
        isValid = false;
      }

      return isValid;
    },
  },
};
</script>

<template>
  <div class="main-contact-warp ptb-100">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="contact-small-widget">
            <h5>Contact Information</h5>
            <div class="contact-item">
              <span>Phone No:</span>
              <a href="tel:9773576111">9773576111</a>
            </div>
            <div class="contact-item">
              <span>Email:</span>
              <a href="mailto:info.gccschool.com">info.gccschool.com</a>
            </div>
            <div class="contact-item">
              <span>Campus Address Location:</span>
              <p> 419-20 Unit, 16th Floor,</p>
              <p> Building No. 9B, Cybercity,</p>
              <p> Gurugram, Haryana, 122002 </p>
            </div>
            <div class="contact-item">
              <span>Office Address Location:</span>
              <p> 4th Floor, Vipul Plaza, 419-20,</p>
              <p> Golf Course Road, Suncity, Sector 54, Gurugram, Haryana, 122002 </p>
            </div>
            <div class="contact-item">
              <span>Open Hours:</span>
              <p>Monday - Friday: 9:30 AM – 5:30 PM</p>
            </div>
            <div class="contact-item">
              <span>Social Media:</span>
              <ul class="social-list">
                <li>
                  <a href="https://www.facebook.com/" target="_blank" class="icon">
                    <img src="~/assets/img/svgs/facebook.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" target="_blank" class="icon">
                    <img src="~/assets/img/svgs/twitter.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" class="icon">
                    <img src="~/assets/img/svgs/instagram.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" class="icon">
                    <img src="~/assets/img/svgs/linkedin.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/" target="_blank" class="icon">
                    <img src="~/assets/img/svgs/youtube.svg" alt="icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="main-contact-content">
            <form @submit.prevent="submitForm">
              <h4 class="mb-3">Request a callback from our team and a dedicated counsellor from our team will reach out
                to assess if the program is the correct fit for you. </h4>
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Full Name <span>*</span></label>
                    <input v-model="form.name" class="form-control" placeholder="Full Name">
                    <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Mobile Number <span>*</span></label>
                    <div class="input-with-icon">
                      <input v-model="form.mobile" class="form-control" placeholder="Mobile Number">
                      <i class="ti ti-phone-call"></i>
                    </div>
                    <small class="text-danger" v-if="errors.mobile">{{ errors.mobile }}</small>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Email ID <span>*</span></label>
                    <div class="input-with-icon">
                      <input v-model="form.email" class="form-control" placeholder="Email ID">
                      <i class="ti ti-mail"></i>
                    </div>
                    <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">City <span>*</span></label>
                    <input v-model="form.city" class="form-control" placeholder="City">
                    <small class="text-danger" v-if="errors.city">{{ errors.city }}</small>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">State <span>*</span></label>
                    <input v-model="form.state" class="form-control" placeholder="State">
                    <small class="text-danger" v-if="errors.state">{{ errors.state }}</small>
                  </div>
                </div>

                <div class="col-lg-12">
                  <hr class="my-4">
                  <h6 class="mb-3">Academic / Professional Background</h6>
                </div>

                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Highest Qualification <span>*</span></label>
                    <select v-model="form.qualification" class="form-control">
                      <option value="">Select Highest Qualification</option>
                      <option>B.Com (Pursuing)</option>
                      <option>B.Com (Completed)</option>
                      <option>M.Com (Pursuing)</option>
                      <option>M.Com (Completed)</option>
                      <option>Other</option>
                    </select>
                    <small class="text-danger" v-if="errors.qualification">{{ errors.qualification }}</small>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="input-box">
                    <label class="form-label">Current Status <span>*</span></label>
                    <select v-model="form.status" class="form-control">
                      <option value="">Select Current Status</option>
                      <option>Student</option>
                      <option>Working Professional</option>
                      <option>Career Break</option>
                    </select>
                    <small class="text-danger" v-if="errors.status">{{ errors.status }}</small>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="input-box">
                    <label class="form-label">College / University <span>*</span></label>
                    <select v-model="form.college" class="form-control">
                      <option value="">Select College / University</option>
                      <option v-for="college in colleges" :key="college.id" :value="college.name">
                        {{ college.name }}
                      </option>
                    </select>
                    <small class="text-danger" v-if="errors.college">{{ errors.college }}</small>
                  </div>
                </div>

                <div class="col-lg-12">
                  <hr class="my-4">
                  <h6 class="mb-3">How Did You Hear About GCC School?</h6>
                </div>

                <div class="col-lg-12">
                  <div class="input-box">
                    <label class="form-label">Source <span>*</span></label>
                    <select v-model="form.source" class="form-control">
                      <option value="">Select Source</option>
                      <option>College / University</option>
                      <option>Event / Seminar</option>
                      <option>Friend / Referral</option>
                      <option>Social Media</option>
                      <option>Website</option>
                      <option>Other</option>
                    </select>
                    <small class="text-danger" v-if="errors.source">{{ errors.source }}</small>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="input-box">
                    <label class="form-label">Query / Remarks (Optional)</label>
                    <textarea v-model="form.remarks" class="form-control" rows="3"
                      placeholder="Query / Remarks (Optional)"></textarea>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="form-check mt-3">
                    <input class="form-check-input" type="checkbox" v-model="form.consent" id="consentCheck">
                    <label class="form-check-label" for="consentCheck">
                      I agree to be contacted by GCC School.
                    </label>
                  </div>
                  <small class="text-danger" v-if="errors.consent">{{ errors.consent }}</small>
                </div>

                <div class="col-lg-12">
                  <button class="default-btn mt-3" type="submit">
                    Submit <i class="ti ti-arrow-narrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  name: "Contact",
  methods: {
    validateForm() {
      this.errors = {
        name: "",
        mobile: "",
        email: "",
        city: "",
        state: "",
        qualification: "",
        status: "",
        college: "",
        source: "",
        consent: ""
      }

      if (!this.form.name) this.errors.name = "Name is required"
      if (!this.form.mobile) this.errors.mobile = "Mobile number is required"
      if (!this.form.qualification) this.errors.qualification = "Select qualification"
      if (!this.form.status) this.errors.status = "Select current status"
      if (!this.form.college) this.errors.college = "Select college/university"
      if (!this.form.source) this.errors.source = "Select how you heard about us"
      if (!this.form.consent) this.errors.consent = "Consent is required"

      return Object.keys(this.errors).length === 0
    },

    async submitForm() {
      if (!this.validateForm()) return

      try {
        const response = await fetch("https://your-api-url.com/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.form)
        })

        if (response.ok) {
          alert("Thank you! Our team will contact you soon.")

          this.form = {
            name: "",
            mobile: "",
            email: "",
            city: "",
            state: "",
            qualification: "",
            status: "",
            college: "",
            source: "",
            remarks: "",
            consent: false
          }
        } else {
          alert("Something went wrong. Please try again.")
        }
      } catch (error) {
        console.error(error)
        alert("Server error. Try later.")
      }
    }
  },
  data() {
    return {
      colleges: [
        { "id": 1, "name": "Kaushalya the Skill University" },
        { "id": 2, "name": "A.K.S. University" },
        { "id": 3, "name": "A.P.G. (Alakh Prakash Goyal) Shimla University" },
        { "id": 4, "name": "A.P.J. Abdul Kalam Technological University" },
        { "id": 5, "name": "AAFT University of Media and Arts" },
        { "id": 6, "name": "Abhilashi University" },
        { "id": 7, "name": "Abhyuday University" },
        { "id": 8, "name": "Academy of Maritime Education and Training" },
        { "id": 9, "name": "Acharya N.G. Ranga Agricultural University" },
        { "id": 10, "name": "Acharya Nagarjuna University" },
        { "id": 11, "name": "Acharya Narendra Deva Krishi Evam Prodyogik Vishwavidyalaya" },
        { "id": 12, "name": "Adamas University" },
        { "id": 13, "name": "Adani University" },
        { "id": 14, "name": "Adesh University" },
        { "id": 15, "name": "Adichunchanagiri University" }
      ],
      form: {
        name: "",
        mobile: "",
        email: "",
        city: "",
        state: "",
        qualification: "",
        status: "",
        college: "",
        source: "",
        remarks: "",
        consent: false,
      },
      errors: {
        name: "",
        mobile: "",
        email: "",
        city: "",
        state: "",
        qualification: "",
        status: "",
        college: "",
        source: "",
        consent: ""
      },

    };
  },
});

</script>

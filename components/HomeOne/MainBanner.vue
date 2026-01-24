<template>
  <div class="hero-warp">
    <Swiper :loop="true" :effect="'fade'" :speed="2000" :pagination="{
      el: '.swiper-pagination2',
      clickable: true,
    }" :modules="[SwiperEffectFade, SwiperPagination]" class="hero-slider">
      <SwiperSlide v-for="banner in banners" :key="banner.id">
        <div class="hero-slider-warp" :style="{
          'background-image': `url(${banner.image})`,
        }">
          <div class="container-fluid">
            <span style="
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    background-color:#231C39; /* dark gray */
    color: #facc15; /* yellow text */
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    border: 1px solid #facc15;
    white-space: nowrap;
  ">
              <span style="
      width: 8px;
      height: 8px;
      background-color: #facc15;
      border-radius: 50%;
      display: inline-block;
    "></span>
              {{ banner.subTitle }}
            </span>

            <div class="content" style="margin-top: 20px;">
              <h1 class="title" style="font-size: 40px;line-height: 1.4;">
                India’s 1<sup>st</sup> School<br /> Powered by Industry,<br />Defined by Performance
              </h1>
              <h4
                style="font-size: 24px; line-height: 1.4; color: #fff; font-family: Inter,sans-serif; font-weight: 500;">
                Start Your Career. Not Just Your Classes
              </h4>
              <p style="color: #fff;">
                {{ banner.description }}
              </p>
              <div class="hero-btn">
                <NuxtLink :to="banner.btnLink" class="default-btn">
                  {{ banner.btnText }}
                  <i class="ti ti-arrow-narrow-right"></i>
                </NuxtLink>
                <button class="default-btn style2" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                  {{ banner.btnTextTwo }}
                  <i class="ti ti-arrow-narrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>

  <div class="modal fade" id="enquiryModal" tabindex="-1" style="z-index: 99999;">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">GCC School – Enquiry Form</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModalBtn"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitForm">

            <h6 class="mb-3">Personal Details</h6>

            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-floating">
                  <input v-model="form.name" class="form-control" placeholder="Full Name">
                  <label>Full Name</label>
                  <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating ">
                  <!-- <div class="prefix">+91</div> -->
                  <input v-model="form.mobile" class="form-control" placeholder="Mobile Number">
                  <label>Mobile Number</label>
                  <small class="text-danger" v-if="errors.mobile">{{ errors.mobile }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating">
                  <input v-model="form.email" class="form-control" placeholder="Email ID">
                  <label>Email ID</label>
                  <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating">
                  <input v-model="form.city" class="form-control" placeholder="City">
                  <label>District/City</label>
                  <small class="text-danger" v-if="errors.city">{{ errors.city }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating">
                  <input v-model="form.state" class="form-control" placeholder="State">
                  <label>State</label>
                  <small class="text-danger" v-if="errors.state">{{ errors.state }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating">
                  <input v-model="form.pincode" class="form-control" placeholder="Pincode">
                  <label>Pincode</label>
                  <small class="text-danger" v-if="errors.pincode">{{ errors.pincode }}</small>
                </div>
              </div>
            </div>

            <hr class="my-4">

            <h6 class="mb-3">Graduation Details</h6>

            <!-- Graduation Program -->
            <div class="form-floating mb-2">
              <select v-model="form.graduationProgram" class="form-select mb-3" @change="resetGraduationFields">
                <option value="">Select your graduation program</option>
                <option>B.Com</option>
                <option>B.B.A</option>
                <option>B.Tech</option>
                <option>Other</option>
              </select>
              <label>Graduation Program</label>
            </div>
            <small class="text-danger" v-if="errors.graduationProgram">{{ errors.graduationProgram }}</small>

            <!-- Other Graduation Program (if selected) -->
            <div v-if="form.graduationProgram === 'Other'" class="form-floating mb-2">
              <input v-model="form.graduationProgramOther" class="form-control" placeholder="Please specify">
              <label>Please specify your graduation program</label>
              <small class="text-danger" v-if="errors.graduationProgramOther">{{ errors.graduationProgramOther
              }}</small>
            </div>

            <!-- Graduation Status -->
            <div class="form-floating mb-2">
              <select v-model="form.graduationStatus" class="form-select mb-3" @change="resetStatusFields">
                <option value="">Have you completed or are you pursuing your graduation?</option>
                <option>Completed</option>
                <option>Pursuing</option>
              </select>
              <label>Graduation Status</label>
            </div>
            <small class="text-danger" v-if="errors.graduationStatus">{{ errors.graduationStatus }}</small>

            <!-- If Pursuing - Current CGPA/Percentage -->
            <div v-if="form.graduationStatus === 'Pursuing'" class="form-floating mb-2">
              <input v-model="form.currentCGPA" class="form-control" placeholder="Enter your current CGPA/Percentage">
              <label>Current CGPA/Percentage</label>
              <small class="text-danger" v-if="errors.currentCGPA">{{ errors.currentCGPA }}</small>
            </div>

            <!-- If Completed - First Division Check -->
            <div v-if="form.graduationStatus === 'Completed'">
              <div class="form-floating mb-2">
                <select v-model="form.firstDivision" class="form-select mb-3" @change="resetHigherQualification">
                  <option value="">Did you pass with First Division (≥60%)?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <label>First Division (≥60%)</label>
              </div>
              <small class="text-danger" v-if="errors.firstDivision">{{ errors.firstDivision }}</small>

              <!-- If Yes - Higher Qualification (Optional) -->
              <div v-if="form.firstDivision === 'Yes'" class="form-floating mb-2">
                <select v-model="form.higherQualification" class="form-select mb-3">
                  <option value="">Higher Qualification (Optional)</option>
                  <option>M.Com</option>
                  <option>M.B.A</option>
                  <option>M.Tech</option>
                  <option>Other</option>
                </select>
                <label>Higher Qualification (Optional)</label>
              </div>

              <!-- Other Higher Qualification (if selected) -->
              <div v-if="form.higherQualification === 'Other'" class="form-floating mb-2">
                <input v-model="form.higherQualificationOther" class="form-control" placeholder="Please specify">
                <label>Please specify your higher qualification</label>
              </div>
            </div>



            <!-- College / University -->
            <div class="form-floating mb-2">
              <select v-model="form.college" class="form-select">
                <option value="">Select College / University</option>
                <option v-for="college in colleges" :key="college.id" :value="college.name">
                  {{ college.name }}
                </option>
              </select>
              <label>College / University</label>
            </div>
            <small class="text-danger" v-if="errors.college">{{ errors.college }}</small>

            <hr class="my-4">

            <h6 class="mb-3">How Did You Hear About GCC School?</h6>

            <div class="form-floating mb-2">
              <select v-model="form.source" class="form-select mb-3">
                <option value="">Select Source</option>
                <option>College / University</option>
                <option>Event / Seminar</option>
                <option>Friend / Referral</option>
                <option>Social Media</option>
                <option>Website</option>
                <option>Student Ambassador / Faculty Ambassador</option>
                <option>Other</option>
              </select>
              <label>How Did You Hear About GCC School?</label>
            </div>
            <small class="text-danger" v-if="errors.source">{{ errors.source }}</small>

            <div class="form-floating mb-2">
              <textarea v-model="form.remarks" class="form-control mt-3" rows="3"
                placeholder="Query / Remarks (Optional)">
            </textarea>
              <label>Query / Remarks (Optional)</label>
            </div>

            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" v-model="form.consent">
              <label class="form-check-label">
                I agree to be contacted by GCC School.
              </label>
            </div>
            <small class="text-danger" v-if="errors.consent">{{ errors.consent }}</small>

            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"
                  aria-hidden="true"></span>
                <span v-else>Submit</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.form-floating>.form-select,
.form-floating>textarea {
  padding-top: 2rem !important;
  padding-bottom: 1rem !important;
  height: auto !important;
}

.form-floating>label {
  padding-top: 0.9rem !important;
}

.form-floating {
  margin-bottom: 1.2rem;
}

.prefix {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  font-weight: 600;
  z-index: 5;
  color: #333;
  pointer-events: none;
}

.has-prefix .form-control {
  padding-left: 50px !important;
}

.has-prefix label {
  padding-left: 50px !important;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import image1 from "../../assets/img/heros/hero1.jpg";
import image2 from "../../assets/img/heros/hero2.jpg";
import gccPdf from "../../assets/gcc.pdf";

export default defineComponent({
  name: "MainBanner",
  methods: {
    validateForm() {
      this.errors = {
        name: "",
        mobile: "",
        email: "",
        city: "",
        state: "",
        graduationProgram: "",
        graduationProgramOther: "",
        graduationStatus: "",
        currentCGPA: "",
        firstDivision: "",

        college: "",
        source: "",
        consent: "",
        pincode: ""
      }

      if (!this.form.name) this.errors.name = "Name is required"
      if (!this.form.mobile) this.errors.mobile = "Mobile number is required"
      if (!this.form.graduationProgram) this.errors.graduationProgram = "Select graduation program"
      if (this.form.graduationProgram === "Other" && !this.form.graduationProgramOther) {
        this.errors.graduationProgramOther = "Please specify your graduation program"
      }
      if (!this.form.graduationStatus) this.errors.graduationStatus = "Select graduation status"
      if (this.form.graduationStatus === "Pursuing" && !this.form.currentCGPA) {
        this.errors.currentCGPA = "CGPA/Percentage is required"
      }
      if (this.form.graduationStatus === "Completed" && !this.form.firstDivision) {
        this.errors.firstDivision = "Please indicate if you passed with First Division"
      }

      if (!this.form.college) this.errors.college = "Select college/university"
      if (!this.form.source) this.errors.source = "Select how you heard about us"
      if (!this.form.consent) this.errors.consent = "Consent is required"
      if (!this.form.pincode) this.errors.pincode = "Pincode is required"

      return Object.values(this.errors).every(error => error === "")
    },

    resetGraduationFields() {
      this.form.graduationProgramOther = ""
      this.form.graduationStatus = ""
      this.resetStatusFields()
    },

    resetStatusFields() {
      this.form.currentCGPA = ""
      this.form.firstDivision = ""
      this.resetHigherQualification()
    },

    resetHigherQualification() {
      this.form.higherQualification = ""
      this.form.higherQualificationOther = ""
    },

    async submitForm() {
      if (!this.validateForm()) return

      // Transform camelCase form to snake_case payload for API
      const payload = {
        name: this.form.name,
        mobile: this.form.mobile,
        email: this.form.email,
        city: this.form.city,
        state: this.form.state,
        graduation_program: this.form.graduationProgram,
        graduation_program_other: this.form.graduationProgramOther,
        graduation_status: this.form.graduationStatus,
        current_cgpa: this.form.currentCGPA,
        first_division: this.form.firstDivision,
        college: this.form.college,
        source: this.form.source,
        remarks: this.form.remarks,
        pincode: this.form.pincode
      };

      try {
        this.isSubmitting = true;
        const response: any = await $fetch("/api/enquery", {
          method: "POST",
          body: payload
        });

        // $fetch throws automatically on 4xx/5xx errors, so if we reach here, it's success.
        if (response.success) {
          alert("Thank you! Our team will contact you soon.")
          const closeBtn = this.$refs.closeModalBtn as HTMLButtonElement;
          closeBtn.click();
          window.open("https://storage.googleapis.com/static_files_backend/media/landing/GCC%20SCHOOL%20DOSSIER%20V9.pdf", "_blank");

          // Reset form
          this.form = {
            name: "",
            mobile: "",
            email: "",
            city: "",
            state: "",
            graduationProgram: "",
            graduationProgramOther: "",
            graduationStatus: "",
            currentCGPA: "",
            firstDivision: "",
            higherQualification: "",
            higherQualificationOther: "",
            college: "",
            source: "",
            remarks: "",
            pincode: "",
            consent: false
          }
        } else {
          alert(response.message || "Something went wrong. Please try again.")
        }
      } catch (error: any) {
        console.error("Submission Error:", error)
        alert(error.data?.message || "Server error. Try later.")
      } finally {
        this.isSubmitting = false;
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
        graduationProgram: "",
        graduationProgramOther: "",
        graduationStatus: "",
        currentCGPA: "",
        firstDivision: "",
        higherQualification: "",
        higherQualificationOther: "",

        college: "",
        source: "",
        remarks: "",
        pincode: "",
        consent: false,
      },
      isSubmitting: false,
      errors: {
        name: "",
        mobile: "",
        email: "",
        city: "",
        state: "",
        graduationProgram: "",
        graduationProgramOther: "",
        graduationStatus: "",
        currentCGPA: "",
        firstDivision: "",

        college: "",
        source: "",
        consent: "",
        pincode: ""
      },
      banners: [
        {
          id: 1,
          bgClass: "bg1",
          subTitle: "Cohort 2026 Applications Open",
          image: image1,
          heading: "World's 1st School Backed  by Industry, Built on Execution",
          description: "At GCC School, you don’t just prepare for the corporate world — you enter it.Every session, project, and mentor experience mirrors the way top global firms actually operate. ",
          btnText: "Apply Now",
          btnLink: "/personal-information",
          btnTextTwo: "Download Dossier",
          btnLinkTwo: gccPdf,
          updateTitle: "View all latest news updates of Tuva",
          updateLink: "/blog",
          informations: [
            {
              id: 1,
              icon: "ti ti-world",
              title: "Take A Tour",
              link: "/schedule",
            },
            {
              id: 2,
              icon: "ti ti-info-hexagon",
              title: "Campus Information",
              link: "/about-campus",
            },
            {
              id: 3,
              icon: "ti ti-ballpen",
              title: "Apply Now",
              link: "/personal-information",
            },
          ],
        }
      ],
    };
  },
});
</script>
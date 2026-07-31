<template>
  <div class="hero-warp hero-section">
    <Swiper :loop="banners.length > 1" effect="slide" :speed="2000" :pagination="{
      el: '.swiper-pagination2',
      clickable: true,
    }" :modules="[SwiperEffectFade, SwiperPagination]" class="hero-slider">
      <SwiperSlide v-for="banner in banners" :key="banner.id">
        <div class="hero-slider-warp" :style="{
          '--banner-img': `url(${banner.image})`,
        }">
          <div class="container-fluid hero-container px-lg-5 px-md-4 px-3">
            <!-- Top Content (Main Hero Area) -->
            <div class="row align-items-end justify-content-between main-hero-row">
              <!-- Left Content -->
              <div class="col-lg-7 text-start mb-lg-0 mb-4 heading">
                <span class="hero-badge">
                  <span>INDIA'S FIRST SCHOOL FOR COMMERCE GRADUATES</span>
                </span>

                <h1 class="hero-title mt-3">
                  India’s 1st School<br />
                  For Commerce &<br />
                  Management Graduates
                </h1>

                <p class="hero-subtitle mt-3">
                  Powered by Industry titans, Defined by Performance
                </p>
                <p class="hero-description">
                  At GCC School, you get hired first, then trained.
                </p>

                <div class="d-flex gap-3 flex-wrap mt-4">
                  <button class="btn btn-apply px-4 py-3" data-bs-toggle="modal" data-bs-target="#applyNowModal">
                    Apply for NFET
                  </button>
                  <button class="btn btn-explore px-4 py-3" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                    Explore Programs
                  </button>
                </div>
              </div>

              <!-- Right Card -->
              <div class="col-lg-4 d-flex justify-content-lg-end justify-content-center">
                <div class="cohort-card">
                  <div class="cohort-card-content">
                    <div class="cohort-label">NOVEMBER 2026 COHORT</div>
                    <div class="cohort-seats">120 SEATS - ONE EXAM</div>
                    <div class="cohort-location">DLF CYBER CITY, GURUGRAM</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Row at the bottom of the hero -->
            <div class="row stats-row g-3 row-cols-2 row-cols-md-3 row-cols-lg-5">
              <div class="col stats-col">
                <div class="stat-box">
                  <div class="stat-number">₹10 LPA</div>
                  <div class="stat-label">Pre-placement offer*</div>
                </div>
              </div>
              <div class="col stats-col">
                <div class="stat-box">
                  <div class="stat-number">2,100+</div>
                  <div class="stat-label">GCCs in India</div>
                </div>
              </div>
              <div class="col stats-col">
                <div class="stat-box">
                  <div class="stat-number">26 Lc+</div>
                  <div class="stat-label">Employees Currently<br>Working in India</div>
                </div>
              </div>
              <div class="col stats-col">
                <div class="stat-box">
                  <div class="stat-number">$105B</div>
                  <div class="stat-label">sector expected by 2030</div>
                </div>
              </div>
              <div class="col stats-col">
                <div class="stat-box">
                  <div class="stat-number">120</div>
                  <div class="stat-label">Seats Only</div>
                </div>
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
                  <select v-model="form.city" class="form-select" :disabled="!form.state">
                    <option value="">Select City</option>
                    <option v-for="city in citiesList" :key="city" :value="city">{{ city }}</option>
                  </select>
                  <label>District/City</label>
                  <small class="text-danger" v-if="errors.city">{{ errors.city }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-floating">
                  <select v-model="form.state" class="form-select" @change="onStateChange">
                    <option value="">Select State</option>
                    <option v-for="state in statesList" :key="state" :value="state">{{ state }}</option>
                  </select>
                  <label>State/UT</label>
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
              <select v-model="form.graduationProgram" class="form-select " @change="resetGraduationFields">
                <option value="">Select your graduation program</option>
                <option>B.Com</option>
                <option>B.B.A</option>
                <option>B.Tech</option>
                <option>Other</option>
              </select>
              <label>Graduation Program</label>
              <small class="text-danger" v-if="errors.graduationProgram">{{ errors.graduationProgram }}</small>
            </div>


            <!-- Other Graduation Program (if selected) -->
            <div v-if="form.graduationProgram === 'Other'" class="form-floating mb-2">
              <input v-model="form.graduationProgramOther" class="form-control" placeholder="Please specify">
              <label>Please specify your graduation program</label>
              <small class="text-danger" v-if="errors.graduationProgramOther">{{ errors.graduationProgramOther
                }}</small>
            </div>

            <!-- Graduation Status -->
            <div class="form-floating mb-2">
              <select v-model="form.graduationStatus" class="form-select" @change="resetStatusFields">
                <option value="">Have you completed or are you pursuing your graduation?</option>
                <option>Completed</option>
                <option>Pursuing</option>
              </select>
              <label>Graduation Status</label>
              <small class="text-danger" v-if="errors.graduationStatus">{{ errors.graduationStatus }}</small>
            </div>


            <!-- If Pursuing - Current CGPA/Percentage -->
            <div v-if="form.graduationStatus === 'Pursuing'" class="form-floating mb-2">
              <input v-model="form.currentCGPA" class="form-control" placeholder="Enter your current CGPA/Percentage">
              <label>Current CGPA/Percentage</label>
              <small class="text-danger" v-if="errors.currentCGPA">{{ errors.currentCGPA }}</small>
            </div>

            <!-- If Completed - First Division Check -->
            <div v-if="form.graduationStatus === 'Completed'">
              <div class="form-floating mb-2">
                <select v-model="form.firstDivision" class="form-select " @change="resetHigherQualification">
                  <option value="">Did you pass with First Division (≥60%)?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <label>First Division (≥60%)</label>
                <small class="text-danger" v-if="errors.firstDivision">{{ errors.firstDivision }}</small>
              </div>


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
              <small class="text-danger" v-if="errors.college">{{ errors.college }}</small>
            </div>


            <hr class="my-4">

            <h6 class="mb-3">How Did You Hear About GCC School?</h6>

            <div class="form-floating mb-2">
              <select v-model="form.source" class="form-select ">
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
              <small class="text-danger" v-if="errors.source">{{ errors.source }}</small>
            </div>


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
              <!-- <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
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

  <CommonDossierModal />

  <!-- Apply Now Modal -->
  <CommonDossierModal modal-id="applyNowModal" modal-title="Apply Now"
    subtitle="Enter your details to complete your application" mode="apply" />
</template>

<style scoped>
.text-gray {
  color: #4D4D4D;
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
}

.hero-slider-warp {
  min-height: 80vh;
  display: flex;
  align-items: flex-end;
  background-image: var(--banner-img);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: 140px;
  padding-top: 237px;
}

.hero-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-hero-row {
  width: 100%;
}

/* Badge styling */
.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  border-radius: 50px;
  border: 1.5px solid #E5A93C;
  background: #FFFFFF;
  color: #D98E23;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

/* Title styling */
.hero-title {
  font-size: 54px;
  line-height: 1.15;
  font-weight: 800;
  color: #FFFFFF;
}

/* Subtitle styling */
.hero-subtitle {
  font-size: 22px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 10px;
}

/* Description styling */
.hero-description {
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  margin-top: 8px;
  margin-bottom: 20px;
}

/* CTA buttons */
.btn-apply {
  background: #FFAF3D !important;
  color: #000000 !important;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  min-width: 160px;
  font-size: 15px;
}

.btn-apply:hover {
  background: #E5A93C !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(254, 175, 61, 0.3);
}

.btn-explore {
  background: rgba(26, 12, 47, 0.9) !important;
  color: #FFFFFF !important;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: all 0.3s ease;
  min-width: 160px;
  font-size: 15px;
}

.btn-explore:hover {
  background: rgba(40, 18, 70, 0.9) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Cohort Card styling */
.cohort-card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-right: 6px solid #FFAF3D;
  text-align: center;
  max-width: 300px;
  width: 100%;
}

.cohort-card-content {
  width: 100%;
}

.cohort-label {
  font-size: 11px;
  font-weight: 700;
  color: #A13E99;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.cohort-seats {
  font-size: 14px;
  font-weight: 800;
  color: #111111;
  margin-bottom: 4px;
}

.cohort-location {
  font-size: 11px;
  font-weight: 600;
  color: #555555;
}

/* Stats Section styling */
.stats-row {
  width: 100%;
  margin-top: 50px;
}

.stat-box {
  background: rgb(0 0 0 / 85%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;
}

/* .stat-box:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(10, 10, 10, 0.6);
} */

.stat-number {
  font-size: 24px;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 5px;
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

.btn-primary {
  background: #A13E99 !important;
  border: none;
  font-weight: 600;
  width: 250px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 61, 255, 0.4);
}

/* Responsive adjustments */
@media (max-width: 1199px) {
  .hero-title {
    font-size: 52px;
  }
}

@media (max-width: 991px) {
  .hero-slider-warp {
    padding: 100px 0 60px 0;
    min-height: auto;
  }

  .hero-title {
    font-size: 44px;
  }

  .hero-subtitle {
    font-size: 20px;
  }

  .hero-description {
    font-size: 18px;
  }

  .cohort-card {
    max-width: 280px;
  }
}

@media (max-width: 767px) {
  .hero-slider-warp {
    background-image: linear-gradient(to bottom,
        rgba(15, 6, 26, 0.95) 0%,
        rgba(15, 6, 26, 0.45) 45%,
        rgba(15, 6, 26, 0.95) 100%), var(--banner-img) !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    padding-top: 60px !important;
    padding-bottom: 24px !important;
    display: flex !important;
    align-items: flex-end !important;
  }

  .heading {
    margin-bottom: 0px;
  }

  .hero-container {
    height: auto !important;
    min-height: 100% !important;
    justify-content: center !important;
    align-items: center;
    gap: 0px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .hero-badge {
    font-size: 10px !important;
    padding: 6px 12px !important;
    letter-spacing: 0.5px !important;
    margin-bottom: 12px !important;
    border-radius: 20px !important;
    border: 1.5px solid #E5A93C !important;
    background: #FFFFFF !important;
    color: #D98E23 !important;
  }

  .hero-title {
    font-size: 36px !important;
    line-height: 1.15 !important;
    font-weight: 700 !important;
    letter-spacing: -0.03em !important;
  }

  .hero-subtitle {
    font-size: 16px !important;
    font-weight: 500 !important;
    color: rgba(255, 255, 255, 0.75) !important;
    margin-top: 8px !important;
    line-height: 1.3 !important;
  }

  .hero-description {
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #FFFFFF !important;
    margin-top: 10px !important;
    margin-bottom: 24px !important;
    line-height: 1.3 !important;
  }

  .cohort-card {
    display: none !important;
  }

  .d-flex.gap-3.flex-wrap.mt-4 {
    flex-wrap: nowrap !important;
    gap: 12px !important;
  }

  .btn-apply,
  .btn-explore {
    flex: 1 !important;
    min-width: 0 !important;
    padding: 12px 10px !important;
    font-size: 13px !important;
    white-space: nowrap !important;
    height: 48px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 6px !important;
    width: auto !important;
  }

  .btn-explore {
    background: #1D0B2E !important;
    border: 1px solid #3c1c5a !important;
    color: #FFFFFF !important;
  }

  .stats-row {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    column-gap: 8px !important;
    margin-top: 0px !important;
  }

  .stats-col {
    width: 100% !important;
    padding: 0 !important;
  }

  .stat-box {
    padding: 10px 6px !important;
    border-radius: 6px !important;
    background: rgba(0, 0, 0, 0.75) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
  }

  .stat-number {
    font-size: 15px !important;
    font-weight: 800 !important;
    margin-bottom: 2px !important;
  }

  .stat-label {
    font-size: 9px !important;
    line-height: 1.2 !important;
    color: rgba(255, 255, 255, 0.6) !important;
  }
}

@media (max-width: 580px) {
  /* Ensure form inputs in modal display correctly on small screens */
  .modal-body {
    padding: 1rem;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

// import image1 from "../../assets/img/heros/hero_bg.svg";
import image1 from "../../assets/newimages/banner.png";

import image2 from "../../assets/img/heros/hero2.jpg";
import gccPdf from "../../assets/gcc.pdf";
import universities from "../../assets/universities.json";
import stateCityData from "~/state_city.json";

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
      if (!this.form.email) this.errors.email = "Email is required"
      if (!this.form.city) this.errors.city = "City is required"
      if (!this.form.state) this.errors.state = "State is required"
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
    onStateChange() {
      this.form.city = "";
    },
    async submitForm() {
      if (!this.validateForm()) return

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
      }

      try {
        this.isSubmitting = true;

        const response: any = await $fetch("/api/enquery", {
          method: "POST",
          body: payload
        });

        if (response.success) {
          alert("Thank you! Our team will contact you soon.")
          const closeBtn = this.$refs.closeModalBtn as HTMLButtonElement;
          closeBtn.click();
          window.open("https://storage.googleapis.com/static_files_backend/media/landing/GCC%20School%20Brochure%201.pdf", "_blank");

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
      colleges: universities,
      statesData: stateCityData as Record<string, string[]>,
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
      banners: [{
        id: 1,
        bgClass: "bg1",
        subTitle: "Cohort 2026 Application Open",
        image: image1,
        heading: "World's 1st School Backed by Industry, Built on Execution",
        description: "",
        btnText: "Apply Now",
        btnLink: "/login",
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
            link: "/login",
          },
        ],
      }],
    }
  },
  computed: {
    statesList(): string[] {
      return Object.keys(this.statesData).sort((a, b) => a.localeCompare(b));
    },
    citiesList(): string[] {
      if (!this.form.state || !this.statesData[this.form.state]) return [];
      return [...this.statesData[this.form.state]].sort((a, b) => a.localeCompare(b));
    }
  }
});
</script>

<template>
  <div class="nfet-and-parents-container">
    <!-- Section 1: NFET Gateway (Dark Background) -->
    <div class="nfet-gateway-section">
      <div class="container nfet-layout-wrapper">
        <div class="nfet-top-flex">
          <!-- Left Col: Title & Badges -->
          <div class="nfet-info-block text-start">
            <span class="eyebrow gold-text">NFET · THE GATEWAY TO GCC SCHOOL</span>
            <h2 class="section-title text-white mt-2 mb-4">One Exam Opens Every Door.</h2>

            <!-- Badges Row -->
            <div class="d-flex flex-wrap gap-4 badges-row">
              <span v-for="(badge, index) in nfetBadges" :key="index" class="nfet-badge-pill">
                {{ badge }}
              </span>
            </div>
          </div>

          <!-- Right Col: CTA Actions -->
          <div class="nfet-cta-block gap-3">
            <button class="btn btn-nfet-apply" data-bs-toggle="modal" data-bs-target="#enquiryModal">
              Apply For NFET <i class="ti ti-arrow-right ms-1"></i>
            </button>
            <button class="btn btn-nfet-download">
              Download NFET Pack
            </button>
          </div>
        </div>

        <!-- Bottom Row (Step Strip) -->
        <div class="step-strip-wrapper">
          <div class="step-strip-row">
            <div v-for="(step, index) in steps" :key="index" :class="['step-item', step.class]">
              <span class="step-num">{{ step.num }}</span>
              <span class="step-label">{{ step.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: For Parents (Light Lavender Background) -->
    <div class="for-parents-section">
      <div class="container">
        <div class="row g-5 align-items-stretch">
          <!-- Left Column: Copy & CTAs -->
          <div class="col-lg-5 col-12 d-flex flex-column justify-content-between text-start">
            <div>
              <span class="eyebrow purple-text">FOR PARENTS</span>
              <h2 class="section-title mt-2">For Parents Making A<br class="d-none d-md-block" /> Serious Decision.</h2>
              <p class="section-desc mt-3">
                A finance career is a big investment of money, time and hope, and you deserve clarity before you commit.
                We would rather you decide with full information than under pressure.
              </p>
            </div>
            <div class="d-flex flex-wrap gap-3 mt-4">
              <button class="btn btn-parent-download">
                Download The Parent Guide
              </button>
              <button class="btn btn-parent-consult" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                Talk To A Counsellor
              </button>
            </div>
          </div>

          <!-- Right Column: 2x2 Grid & Helpdesk -->
          <div class="col-lg-7 col-12 d-flex flex-column gap-4 justify-content-between">
            <!-- 2x2 Grid -->
            <div class="parents-grid">
              <div v-for="(card, index) in parentCards" :key="index" class="parent-card text-start">
                <h4 class="card-title-text">{{ card.title }}</h4>
                <p class="card-desc-text mt-2 mb-0">{{ card.desc }}</p>
              </div>
            </div>

            <!-- Bottom Helpdesk bar -->
            <div class="helpdesk-bar d-flex justify-content-between align-items-center flex-wrap g-3">
              <div class="text-start">
                <h5 class="helpdesk-title m-0">A Dedicated Parent Helpdesk</h5>
                <p class="helpdesk-subtitle m-0 mt-1">Your questions, answered directly.</p>
              </div>
              <div class="helpdesk-phone">
                +91 87968 80189
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const nfetBadges = [
  "60 MCQs",
  "90 MINUTES",
  "NO NEGATIVE MARKING",
  "ONLINE · AI + HUMAN PROCTORED",
  "ENGLISH"
]

const steps = [
  { num: "STEP 01", label: "Clear NFET", class: "step-1" },
  { num: "STEP 02", label: "Get invited to the hiring drive", class: "step-2" },
  { num: "STEP 03", label: "Interview with global companies", class: "step-3" },
  { num: "STEP 04", label: "Get pre-placement offer", class: "step-4" },
  { num: "STEP 05", label: "Secure admission", class: "step-5" },
  { num: "STEP 06", label: "Join the cohort", class: "step-6" }
]

const parentCards = [
  {
    title: "Transparency On Fees",
    desc: "Full fee structure, milestones and financing, explained openly before admission."
  },
  {
    title: "A Real Process",
    desc: "Merit-based selection through NFET, not vague promises."
  },
  {
    title: "A Campus You Can Visit",
    desc: "See it, walk it, meet the team in person."
  },
  {
    title: "Support That Stays",
    desc: "Academic help, counselling and career guidance throughout."
  }
]
</script>

<style scoped>
.nfet-and-parents-container {
  width: 100%;
}

/* Common Text Elements */
.eyebrow {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.gold-text {
  color: #FFAF3D ;
}

.purple-text {
  color: #6B1B75;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
  letter-spacing: -0.02em;
  color: #181225;
  text-align: left;
}

.section-desc {
  font-size: 15px;
  color: #666666;
  line-height: 1.6;
}

/* SECTION 1: NFET Gateway (Dark Background) */
.nfet-gateway-section {
  background-color: #120921;
  /* Rich dark violet/black */
  padding: 80px 0;
}

.nfet-top-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.nfet-info-block {
  flex: 0 0 65%;
}

.badges-row {
  margin-bottom: 35px;
}

.nfet-cta-block {
  flex: 0 0 auto;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.nfet-badge-pill {
  background-color: #51157C;
  /* Muted plum purple */
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* CTA Buttons */
.btn-nfet-apply {
  background-color: #FFAF3D !important;
  color: #000000 !important;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px 24px;
  border: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-nfet-apply:hover {
  background-color: #E5A93C !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(254, 175, 61, 0.3);
}

.btn-nfet-download {
  color: white !important;
  background-color: #300241 !important;
  border: 0.5px solid gray !important;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px 24px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-nfet-download:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  transform: translateY(-2px);
}

/* Step Strip layout */
.step-strip-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
}

.step-strip-row {
  display: flex;
  width: 100%;
  /* border-radius: 8px; */
  overflow: hidden;
}

.step-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  text-align: left;
  transition: all 0.3s ease;
}

.step-num {
  font-size: 11px;
  font-weight: 800;
  color: #f0df22 ;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.step-label {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 4px;
  line-height: 1.3;
}

/* Step BG colors */
.step-1 {
  background-color: #7F6410;
  box-shadow: inset 0 4px 0 0 #F1A63E;
}

.step-1 .step-num {
  color: rgba(255, 255, 255, 0.8);
}

.step-2 {
  background-color: #362663;
}

.step-3 {
  background-color: #48287B;
}

.step-4 {
  background-color: #492466;
}

.step-5 {
  background-color: #441D52;
}

.step-6 {
  background-color: #460947;
}

/* SECTION 2: Parents Section */
.for-parents-section {
  background-color: #ECE7F2;
  /* Soft lavender/gray background */
  padding: 80px 0;
}

.btn-parent-download {
  background-color: #51157C !important;
  color: #ffffff !important;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px 24px;
  border: none;
  transition: all 0.3s ease;
}

.btn-parent-download:hover {
  background-color: #320d33 !important;
  transform: translateY(-2px);
}

.btn-parent-consult {
  background-color: transparent !important;
  color: #4A154B !important;
  border: 1.5px solid #DDD1EA!important;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px 24px;
  transition: all 0.3s ease;
}

.btn-parent-consult:hover {
  background-color: rgba(74, 21, 75, 0.05) !important;
  transform: translateY(-2px);
}

/* Parents Grid */
.parents-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.parent-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.02);
}

.card-title-text {
  font-size: 14px;
  font-weight: 500;
  color: #130922;
}

.card-desc-text {
  font-size: 13px;
  color: #51157C;
  line-height: 1.5;
}

/* Helpdesk bar */
.helpdesk-bar {
  background-color: #130922;
  /* Dark Navy-Charcoal */
  border-radius: 12px;
  padding: 20px 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.helpdesk-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
}

.helpdesk-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.helpdesk-phone {
  color: #FFAF3D;
  /* Yellow Gold */
  font-size: 22px;
  font-weight: 800;
}

/* Responsive Styles */
@media (max-width: 1199px) {
  .section-title {
    font-size: 34px;
  }
}

@media (max-width: 991px) {
  .nfet-gateway-section,
  .for-parents-section {
    padding: 60px 0;
  }

  .nfet-layout-wrapper {
    display: flex;
    flex-direction: column;
  }
  
  .nfet-top-flex {
    display: contents;
  }
  
  .nfet-info-block {
    order: 1;
    width: 100%;
  }
  
  .step-strip-wrapper {
    order: 2;
    margin-top: 30px !important;
    margin-bottom: 30px !important;
  }
  
  .nfet-cta-block {
    order: 3;
    width: 100%;
    margin-top: 0 !important;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .step-strip-row {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
    border-radius: 0 !important;
    overflow: visible !important;
  }

  .step-item {
    flex: none !important;
    width: 100% !important;
    border-radius: 6px !important;
    padding: 12px 16px !important;
  }

  .step-1 {
    border: 1.5px solid #F1A63E !important;
    box-shadow: none !important;
  }
}

@media (max-width: 767px) {
  .btn-nfet-apply,
  .btn-nfet-download {
    flex: 1 !important;
    font-size: 13px !important;
    padding: 12px 10px !important;
    height: 48px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    text-align: center !important;
    border-radius: 6px !important;
  }

  .badges-row {
    gap: 8px 12px !important;
    margin-bottom: 25px !important;
  }

  .nfet-badge-pill {
    font-size: 10px !important;
    padding: 6px 12px !important;
  }
}

@media (max-width: 575px) {
  .section-title {
    font-size: 32px !important;
    line-height: 1.2 !important;
  }

  .parents-grid {
    grid-template-columns: 1fr;
  }

  .helpdesk-bar {
    padding: 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>

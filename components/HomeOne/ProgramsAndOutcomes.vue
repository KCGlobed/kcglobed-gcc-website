<template>
  <div class="programs-and-outcomes-container">
    <!-- Section 1: Pick A Career Path -->
    <div class="programs-section">
      <div class="container-fluid px-lg-5 px-md-4 px-3">
        <div class="programs-header text-start mb-40">
          <span class="section-tag">THREE PROGRAMS · ONE SERIOUS OUTCOME</span>
          <h2 class="section-title mt-2">Pick A Career Path. The<br class="d-none d-md-block" /> Program Follows.</h2>
        </div>

        <div class="row g-4 justify-content-center mt-3">
          <div v-for="(program, index) in programCards" :key="index" class="col-lg-4 col-md-6 col-12">
            <div class="program-card">
              <div class="card-img-wrapper">
                <img :src="program.image" :alt="program.title" class="program-img" loading="lazy" decoding="async" />
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ program.title }}</h3>
                <div class="card-meta d-flex flex-column gap-1">
                  <span class="meta-item"><i class="ti ti-clock me-2"></i>{{ program.duration }}</span>
                  <span class="meta-item"><i class="ti ti-certificate me-2"></i>{{ program.approved }}</span>
                </div>
                <hr class="card-divider" />
                <div class="card-footer-box d-flex justify-content-between align-items-center">
                  <div class="offer-box">
                    <span class="offer-label">Pre Placement Offer</span>
                    <span class="offer-value">{{ program.offer }}</span>
                  </div>
                  <NuxtLink :to="program.link" class="btn-view">
                    View <i class="ti ti-arrow-right ms-1"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-note mt-4">
          <p>*Pre-placement offer for selected candidates, subject to offer terms.</p>
        </div>
      </div>
    </div>

    <!-- Section 2: Career Outcomes -->
    <div class="outcomes-section">
      <div class="container-fluid px-lg-5 px-md-4 px-3">
        <div class="outcomes-header text-start mb-30">
          <span class="section-tag">CAREER OUTCOMES</span>
          <h2 class="section-title mt-2">A Clear Line From Classroom To<br class="d-none d-md-block" /> Career.</h2>
        </div>

        <!-- Tags Row -->
        <div class="tags-wrapper d-flex flex-wrap gap-2 mb-50">
          <span v-for="(tag, index) in outcomeTags" :key="index" class="outcome-tag">
            {{ tag }}
          </span>
        </div>

        <!-- Main Outcomes Row (Ecosystem Grid & Proof Card) -->
        <div class="row g-5 align-items-stretch">
          <!-- Left Column: Ecosystem Grid -->
          <div class="col-lg-7">
            <h4 class="ecosystem-title mb-4">APPROVED HIRING-PARTNER ECOSYSTEM</h4>
            <div class="ecosystem-grid">
              <!-- Card 1: KC GlobEd -->
              <div class="partner-card">
                <img src="@/assets/img/common/logo_kcglobed.svg" alt="KC GlobEd Logo" class="partner-logo" loading="lazy" decoding="async" />
              </div>
              <!-- Card 2: Kreit & Chiu -->
              <div class="partner-card">
                <div class="hiring-logo-box d-flex align-items-center">
                  <div class="kc-badge d-flex align-items-center justify-content-center text-white font-weight-bold" style="background-color: #1A3E72; width: 36px; height: 36px; border-radius: 50%; font-size: 14px; font-weight: 800; margin-right: 8px;">KC</div>
                  <div class="d-flex flex-column text-start">
                    <span style="font-size: 10px; font-weight: 900; color: #1A3E72; line-height: 1.1; letter-spacing: 0.5px;">KREIT & CHIU CPA LLP</span>
                    <span style="font-size: 8px; color: #666; font-style: italic; line-height: 1;">Accountants and Advisors</span>
                  </div>
                </div>
              </div>
              <!-- Card 3: ASA -->
              <div class="partner-card">
                <div class="hiring-logo-box d-flex flex-column text-center">
                  <span style="font-size: 20px; font-weight: 900; color: #0C3E6E; letter-spacing: 1px; line-height: 1;">ASA</span>
                  <span style="font-size: 8px; color: #E59824; font-weight: 700; text-transform: uppercase; margin-top: 2px;">Going The Extra Mile</span>
                </div>
              </div>
              <!-- Card 4: J.C Bhalla & Co. -->
              <div class="partner-card">
                <div class="hiring-logo-box d-flex flex-column text-center">
                  <span style="font-size: 14px; font-weight: 800; color: #0A355C; line-height: 1;">J.C Bhalla & Co.</span>
                  <span style="font-size: 7px; color: #027A86; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 3px;">CHARTERED ACCOUNTANTS</span>
                </div>
              </div>
              <!-- Card 5: Baker Tilly -->
              <div class="partner-card">
                <div class="hiring-logo-box d-flex align-items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 6px;">
                    <circle cx="12" cy="12" r="10" stroke="#F36F21" stroke-width="3" stroke-dasharray="10 5" />
                  </svg>
                  <span style="font-size: 16px; font-weight: 700; color: #000000; letter-spacing: -0.5px; font-family: sans-serif;">bakertilly</span>
                </div>
              </div>
              <!-- Card 6: BDO -->
              <div class="partner-card">
                <div class="hiring-logo-box d-flex align-items-center justify-content-center">
                  <span style="font-size: 24px; font-weight: 900; color: #C21B2F; letter-spacing: 1px;">BDO</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Proof Card -->
          <div class="col-lg-5 d-flex align-items-stretch">
            <div class="proof-card w-100 d-flex flex-column justify-content-between">
              <div>
                <span class="proof-tag">PROOF, HONESTLY PRESENTED</span>
                <p class="proof-text mt-3">
                  Our first cohort begins July 2026, so our credibility rests on the model, the employer ecosystem, practitioner faculty and KC GlobEd's 20-year legacy of 20,000+ students across 120+ countries. Verified student outcomes will be published as they happen.
                </p>
              </div>
              <NuxtLink to="/about-overview" class="proof-link mt-4">
                How we think about outcomes <i class="ti ti-arrow-right ms-2"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import us1 from '~/assets/newimages/us-1.png'
import us2 from '~/assets/newimages/us-2.png'
import us3 from '~/assets/newimages/us-3.png'

const programCards = [
  {
    title: "AI Enabled International Accounting Program (AEIAP)",
    duration: "12 Months",
    approved: "AICTE Approved PGCM Program",
    offer: "10 LPA",
    image: us1,
    link: "/programs/acca"
  },
  {
    title: "AI Enabled US Accounting Program (AEUAP)",
    duration: "12 Months",
    approved: "AICTE Approved PGCM Program",
    offer: "10 LPA",
    image: us2,
    link: "/programs/cpa"
  },
  {
    title: "AI Enabled US Taxation Program (AEUTP)",
    duration: "6 Months",
    approved: "AICTE Approved PGCM Program",
    offer: "6 LPA",
    image: us3,
    link: "/programs/ea"
  }
]

const outcomeTags = [
  "Financial Accounting & Reporting",
  "Audit & Assurance",
  "FP&A",
  "US Taxation & International Tax Advisory",
  "Risk Management",
  "Accounting Advisory",
  "Corporate Governance & Compliance",
  "Transaction Advisory",
  "CFO Advisory",
  "GCC Finance Operations"
]
</script>

<style scoped>
/* Container Layout */
.programs-and-outcomes-container {
  width: 100%;
  background-color: white;
}

/* Common Header Styles */
.programs-header,
.outcomes-header {
  text-align: left !important;
}

.section-tag {
  color: #D5861B;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
  letter-spacing: -0.02em;
  color: #181225;
  display: flex;
  text-align: left;
}

/* SECTION 1: Programs Section */
.programs-section {
  background-color: #F0EDE6; 
  padding: 80px 0;
  /* margin: 55px 196px; */
}

.program-card {
  background-color: #35083D; /* Rich deep purple */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.program-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

.card-img-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.program-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.program-card:hover .program-img {
  transform: scale(1.05);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.4;
  min-height: 50px;
}

.card-meta {
  margin-bottom: 20px;
}

.meta-item {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
}

.card-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin: 15px 0;
  opacity: 1;
}

.offer-label {
  display: block;
  font-size: 10px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.offer-value {
  display: block;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
}

.btn-view {
  background-color: #ffffff;
  color: #862E84 !important;
  font-weight: 700;
  font-size: 13px;
  border-radius: 5px;
  padding: 5px 15px;
  text-decoration: none;
  border-color: #862E84;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-view:hover {
  background-color: #f3f3f3;
  transform: translateX(3px);
}

.footer-note {
  font-size: 12px;
  color: #666666;
}

/* SECTION 2: Outcomes Section */
.outcomes-section {
  background-color: #E6DFEC; /* Warm lavender background */
  padding: 80px 0;
  /* margin: 55px 196px; */
}

.outcome-tag {
  background-color: #51157C; /* Muted deep purple */
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 50px;
  white-space: nowrap;
}

.ecosystem-title {
  font-size: 16px;
  font-weight: 700;
  color: #666666;
  letter-spacing: 1px;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.partner-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.partner-logo {
  max-height: 45px;
  max-width: 100%;
  object-fit: contain;
}

/* Proof Card styling */
.proof-card {
  background-color: #130922; /* Dark navy-charcoal */
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.proof-tag {
  color: #E5A93C;
  font-size: 15opx;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.proof-text {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.proof-link {
  color: #E5A93C !important;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.proof-link:hover {
  transform: translateX(4px);
}

/* Responsive adjustments */
@media (max-width: 1199px) {
  .section-title {
    font-size: 34px;
  }
}

@media (max-width: 991px) {
  .programs-section, .outcomes-section {
    padding: 60px 0;
  }
  
  .ecosystem-grid {
    margin-bottom: 20px;
  }
}

@media (max-width: 575px) {
  .section-title {
    font-size: 26px;
  }
  
  .ecosystem-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .partner-card {
    height: 80px;
  }
  
  .proof-card {
    padding: 24px;
  }
}
</style>

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
          <div class="container-fluid hero-container px-lg-5 px-md-4 px-3 ">
            <!-- Top Content (Main Hero Area) -->
            <div class="row align-items-center justify-content-between main-hero-row gy-4 mt-4">
              <!-- Left Side: Apply Now Form Card -->
              <div class="col-lg-5 col-xl-5 order-2 order-lg-1 mt-[40px]">
                <CommonDossierModal
                  :inline="true"
                  modal-id="mainBannerInlineForm"
                  modal-title="Apply Now"
                  subtitle="Enter your details to complete your application"
                  mode="apply"
                />
              </div>

              <!-- Right Side: Heading Content -->
              <div class="col-lg-7 col-xl-6 text-start mb-lg-0 mb-4 heading order-1 order-lg-2 ">
                <div class="hero-badge">
                  <span>Cohort 2026 Application are open</span>
                </div>

                <h1 class="hero-title mt-3">
                  India’s First School Designed for Commerce & Management Graduates, Built on a Reverse Career Model -
                  Get Hired First, Then Get Trained.
                </h1>

                <p class="hero-subtitle mt-3">
                  Powered by Industry titans, Defined by Performance
                </p>
                <p class="hero-description">
                  At GCC School, you get hired first, then trained.
                </p>

                <div class="d-flex gap-3 flex-wrap mt-4 justify-content-lg-end justify-content-center">
                  <button class="btn btn-apply px-4 py-3" data-bs-toggle="modal" data-bs-target="#applyNowModal">
                    Apply for NFET
                  </button>
                  <!-- <button class="btn btn-explore px-4 py-3">
                      Explore Programs
                    </button> -->
                </div>
              </div>

              <!-- Right Card -->
              <!-- <div class="col-lg-4 d-flex justify-content-lg-end justify-content-center">
                <div class="cohort-card">
                  <div class="cohort-card-content">
                    <div class="cohort-label">NOVEMBER 2026 COHORT</div>
                    <div class="cohort-seats">120 SEATS - ONE EXAM</div>
                    <div class="cohort-location">DLF CYBER CITY, GURUGRAM</div>
                  </div>
                </div>
              </div> -->
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

  <!-- Apply Now Modal -->
  <CommonDossierModal modal-id="applyNowModal" modal-title="Apply Now"
    subtitle="Enter your details to complete your application" mode="apply" />

  <!-- Dossier Modal -->
  <CommonDossierModal modal-id="dossierModal" />

</template>

<style scoped>
.text-gray {
  color: #4D4D4D;
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
}

.hero-slider-warp {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-image: var(--banner-img);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: 40px;
  padding-top: 140px;
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
  display: flex;
  align-items: center;
  width: fit-content;
  margin-left: auto;
  padding: 8px 18px;
  border-radius: 50px;
  border: 1.5px solid #E5A93C;
  background: #FFFFFF;
  color: #D98E23;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.8px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

/* Title styling */
.hero-title {
  font-size: 36px;
  line-height: 1.2;
  font-weight: 800;
  color: #FFFFFF;
  text-align: right;
}

/* Subtitle styling */
.hero-subtitle {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 10px;
  text-align: right;
}

/* Description styling */
.hero-description {
  font-size: 17px;
  font-weight: 600;
  color: #FFFFFF;
  margin-top: 8px;
  margin-bottom: 20px;
  text-align: right;
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

/* Stats Section styling */
.stats-row {
  width: 100%;
  margin-top: 40px;
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

/* Responsive adjustments */
@media (max-width: 1199px) {
  .hero-title {
    font-size: 32px;
  }
}

@media (max-width: 991px) {
  .hero-slider-warp {
    padding: 110px 0 50px 0;
    min-height: auto;
  }

  .main-hero-row {
    margin-bottom: 0;
  }

  .hero-title {
    font-size: 30px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-description {
    font-size: 16px;
  }
}

@media (max-width: 767px) {
  .hero-slider-warp {
    background-image: linear-gradient(to bottom,
        rgba(15, 6, 26, 0.95) 0%,
        rgba(15, 6, 26, 0.65) 45%,
        rgba(15, 6, 26, 0.95) 100%), var(--banner-img) !important;
    background-size: cover !important;
    background-position: 65% center;
    background-repeat: no-repeat !important;
    padding-top: 90px !important;
    padding-bottom: 24px !important;
    display: flex !important;
    align-items: flex-end !important;
  }

  .heading {
    margin-bottom: 20px;
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
    font-size: 26px !important;
    line-height: 1.2 !important;
    font-weight: 700 !important;
    letter-spacing: -0.02em !important;
  }

  .hero-subtitle {
    font-size: 15px !important;
    font-weight: 500 !important;
    color: rgba(255, 255, 255, 0.75) !important;
    margin-top: 8px !important;
    line-height: 1.3 !important;
  }

  .hero-description {
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #FFFFFF !important;
    margin-top: 8px !important;
    margin-bottom: 18px !important;
    line-height: 1.3 !important;
  }

  .d-flex.gap-3.flex-wrap.mt-4 {
    flex-wrap: nowrap !important;
    gap: 12px !important;
  }

  .btn-apply {
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

  .stats-row {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    column-gap: 8px !important;
    margin-top: 20px !important;
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

@media (max-width: 380px) {
  .hero-badge {
    font-size: 9px !important;
  }
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import image1 from "../../assets/newimages/banner.png";
import gccPdf from "../../assets/gcc.pdf";

export default defineComponent({
  name: "MainBanner",
  components: {
    CommonDossierModal: defineAsyncComponent(() => import('~/components/Common/DossierModal.vue'))
  },
  data() {
    return {
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
    };
  }
});
</script>

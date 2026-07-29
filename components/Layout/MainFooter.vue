<template>
  <div class="footer-warp">
    <!-- Part 1: centered Lead CTA Banner -->
    <div class="footer-cta-banner ptb-80 text-center">
      <div class="container">
        <span class="eyebrow gold-text">120 SEATS · ONE EXAM · JULY 2026</span>
        <h2 class="cta-heading text-white mt-2 mb-3">Your Global Finance Career<br class="d-none d-md-block" /> Starts With One Step.</h2>
        <p class="cta-subtitle mb-4">Whether you are ready to apply or still weighing your options, the next move is simple.</p>
        
        <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <button class="btn btn-nfet-apply" data-bs-toggle="modal" data-bs-target="#enquiryModal">
            Apply For NFET <i class="ti ti-arrow-right ms-1"></i>
          </button>
          <button class="btn btn-parent-consult" data-bs-toggle="modal" data-bs-target="#enquiryModal">
            Talk To A Counsellor
          </button>
        </div>
        
        <div class="mt-4">
          <a href="#" class="prospectus-link" data-bs-toggle="modal" data-bs-target="#enquiryModal">Download the Prospectus</a>
        </div>
      </div>
    </div>

    <div class="container">
      <hr class="footer-divider" />
    </div>

    <!-- Part 2: 5-Column Widgets Layout -->
    <div class="footer-main-info ptb-80">
      <div class="container">
        <div class="row g-5">
          <!-- Col 1: Logo, Brand Text, Socials -->
          <div class="col-lg-3 col-md-6 col-12 text-start">
            <div class="footer-widget brand-widget">
              <img src="../../assets/Logo/Logo/GCC-School-Logo-White.jpeg" alt="GCC School logo" class="footer-logo mb-1" />
              <p class="brand-desc">
                India's first school for commerce graduates — preparing talent for global finance and GCC careers through a hire-first, then-train model. Based in DLF Cyber City, Gurugram.
              </p>
              <!-- Social Icons -->
              <ul class="social-list d-flex gap-2 p-0 mt-4 list-unstyled">
                <li>
                  <a href="https://www.linkedin.com/company/gccschool/" target="_blank" class="social-icon">
                    <i class="ti ti-brand-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/gccschool?igsh=MXQxc2JhazAwcG55cQ==" target="_blank" class="social-icon">
                    <i class="ti ti-brand-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@GCCSchool" target="_blank" class="social-icon">
                    <i class="ti ti-brand-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/gccschool2026" target="_blank" class="social-icon">
                    <i class="ti ti-brand-x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Col 2: Programs -->
          <div class="col-lg-3 col-md-6 col-6 text-start">
            <div class="footer-widget">
              <h3 class="widget-title">PROGRAMS</h3>
              <ul class="footer-list p-0 list-unstyled">
                <li class="mb-3">
                  <NuxtLink to="/programs/acca" class="footer-link-item">
                    AEIAP <span class="link-sub">— AI-Enabled International Accounting Professional Program</span>
                  </NuxtLink>
                </li>
                <li class="mb-3">
                  <NuxtLink to="/programs/cpa" class="footer-link-item">
                    AEUAP <span class="link-sub">— AI Enabled US Accounting Program</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/programs/ea" class="footer-link-item">
                    AEUTP <span class="link-sub">— AI Enabled US Taxation Program</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Col 3: Admissions -->
          <div class="col-lg-2 col-md-4 col-6 text-start">
            <div class="footer-widget">
              <h3 class="widget-title">ADMISSIONS</h3>
              <ul class="footer-list p-0 list-unstyled">
                <li class="mb-2"><NuxtLink to="/admission-process" class="footer-link-item">How to Apply</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/eligibility" class="footer-link-item">Eligibility</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/nfet-exam" class="footer-link-item">NFET</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/fees" class="footer-link-item">Fees & Financial Support</NuxtLink></li>
                <li><a href="#" class="footer-link-item" data-bs-toggle="modal" data-bs-target="#enquiryModal">Talk to a Counsellor</a></li>
              </ul>
            </div>
          </div>

          <!-- Col 4: Explore -->
          <div class="col-lg-2 col-md-4 col-6 text-start">
            <div class="footer-widget">
              <h3 class="widget-title">EXPLORE</h3>
              <ul class="footer-list p-0 list-unstyled">
                <li class="mb-2"><NuxtLink to="/about-overview" class="footer-link-item">About GCC School</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/roi-calculator" class="footer-link-item">ROI Calculator</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/campus-life" class="footer-link-item">Campus Life</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/resources" class="footer-link-item">Resources</NuxtLink></li>
                <li class="mb-2"><NuxtLink to="/blogs" class="footer-link-item">Media</NuxtLink></li>
                <li><NuxtLink to="/contact" class="footer-link-item">Contact</NuxtLink></li>
              </ul>
            </div>
          </div>

          <!-- Col 5: Get in Touch -->
          <div class="col-lg-2 col-md-4 col-6 text-start">
            <div class="footer-widget">
              <h3 class="widget-title">GET IN TOUCH</h3>
              <div class="contact-info-list text-white">
                <p class="mb-2 contact-number">+91 87968 80189</p>
                <p class="mb-3 contact-email">info@gccschool.com</p>
                <p class="contact-address mb-4">
                  Building 9B, 16th Floor, DLF Cyber City, Sector 24, Gurugram, Haryana 122002
                </p>
                <div class="d-flex align-items-center gap-3">
                  <button class="btn btn-apply-mini" @click="openApplyModal">Apply</button>
                  <a href="#" class="counsel-link" data-bs-toggle="modal" data-bs-target="#enquiryModal">Talk to a Counsellor</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Apply Now Modal -->
    <DossierModal modal-id="footerApplyModal" modal-title="Apply Now"
      subtitle="Fill in your details to start your application" mode="apply" />
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { onMounted } from 'vue'

const { init } = useAuth()

onMounted(() => {
  init()
})
</script>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  name: "MainFooter",
  components: {
    DossierModal: defineAsyncComponent(() => import('~/components/Common/DossierModal.vue'))
  },
  methods: {
    async openApplyModal() {
      const { Modal } = await import('bootstrap');
      const el = document.getElementById('footerApplyModal');
      if (el) new Modal(el).show();
    }
  }
};
</script>

<style scoped>
.footer-warp {
  background-color: #2A133F; /* Premium dark violet/charcoal bg */
  color: rgba(255, 255, 255, 0.65);
}

/* Part 1: Lead CTA Banner */
.footer-cta-banner {
  padding: 80px 0 60px 0;
}

.eyebrow {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.gold-text {
  color: #FFAF3D;
  font-size: 20px; /* Gold Yellow accent */
}

.cta-heading {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.2;
}

.cta-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 15px;
  max-width: 600px;
  font-weight: 400;
  margin: 0 auto;
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
}

.btn-nfet-apply:hover {
  background-color: #E5A93C !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(254, 175, 61, 0.3);
}

.btn-parent-consult {
  background-color: transparent !important;
  color: #ffffff !important;
  border: 1.5px solid rgba(255, 255, 255, 0.2) !important;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px 24px;
  transition: all 0.3s ease;
}

.btn-parent-consult:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  transform: translateY(-2px);
}

.prospectus-link {
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.prospectus-link:hover {
  color: #ffffff;
}

.footer-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
  opacity: 1;
}

/* Part 2: Footer Main Grid */
.footer-main-info {
  padding: 60px 0 80px 0;
}

.footer-logo {
  max-height: 90px;
  width: auto;
}

.brand-desc {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

/* Social icons styles */
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* background-color: rgba(255, 255, 255, 0.08); */
  color: #ffffff !important;
  font-size: 28px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #FFAF3D;
  color: #000000 !important;
  transform: translateY(-2px);
}

/* Widgets Styling */
.widget-title {
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.footer-link-item {
  color: white !important;
  font-size: 12.5px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link-item:hover {
  color: #FFAF3D !important;
}

.link-sub {
  color: white;
  font-size: 11.5px;
}

.contact-info-list {
  font-size: 12.5px;
}

.contact-number {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.contact-email {
  color: rgba(255, 255, 255, 0.7);
}

.contact-address {
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

.btn-apply-mini {
  background-color: #4A154B !important;
  color: #ffffff !important;
  font-weight: 700;
  font-size: 12px;
  padding: 6px 16px;
  border-radius: 4px;
  border: none;
  transition: all 0.3s ease;
}

.btn-apply-mini:hover {
  background-color: #320d33 !important;
  transform: translateY(-1px);
}

.counsel-link {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 12px;
  text-decoration: underline;
}

.counsel-link:hover {
  color: #ffffff !important;
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .cta-heading {
    font-size: 32px;
  }
}

@media (max-width: 575px) {
  .cta-heading {
    font-size: 26px;
  }
  
  .footer-main-info {
    padding: 40px 0;
  }
}
</style>

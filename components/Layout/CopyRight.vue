<template>
  <div class="copy-right-warp">
    <div class="container text-start">
      <div class="d-flex flex-md-row flex-column justify-content-between align-items-md-center gap-3">
        <!-- Copyright & Policy Links -->
        <div class="copyright-left">
          <span class="copyright-text">
            © {{ new Date().getFullYear() }} KC Global Edutech Private Limited. All rights reserved.
          </span>
          <span class="policy-divider">·</span>
          <NuxtLink to="/privacy-policy" class="policy-link">Privacy Policy</NuxtLink>
          <span class="policy-divider">·</span>
          <NuxtLink to="/terms-conditions" class="policy-link">Terms & Conditions</NuxtLink>
          <span class="policy-divider">·</span>
          <NuxtLink to="/refund-policy" class="policy-link">Refund Policy</NuxtLink>
          <span class="policy-divider">·</span>
          <NuxtLink to="/disclaimer" class="policy-link">Disclaimer</NuxtLink>
        </div>

        <!-- Menu Links -->
        <div class="copyright-right d-flex flex-wrap gap-3">
          <NuxtLink to="/admission-process" class="menu-link">APPLY</NuxtLink>
          <NuxtLink to="/nfet-exam" class="menu-link">NFET</NuxtLink>
          <NuxtLink to="/programs/acca" class="menu-link">PROGRAMS</NuxtLink>
          <NuxtLink to="/fees" class="menu-link">FEES</NuxtLink>
          <NuxtLink to="/campus-life" class="menu-link">BOOK A VISIT</NuxtLink>
          <NuxtLink to="/contact" class="menu-link">CONTACT</NuxtLink>
        </div>
      </div>

      <!-- Legal Disclaimer text line -->
      <div class="legal-disclaimer mt-4">
        The offer-first pathway applies only to selected candidates who complete the required evaluation and selection stages. Program details, fees and timelines are subject to official GCC School communication.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
};
</script>

<style scoped>
.copy-right-warp {
  background-color: #2A133F; /* Even darker violet base */
  padding: 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.45);
}

.copyright-left {
  font-size: 11px;
  line-height: 1.6;
}

.copyright-text {
  color: white;
}

.policy-divider {
  margin: 0 6px;
  color: white;
}

.policy-link {
  color: white !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

.policy-link:hover {
  color: #FFAF3D !important;
}

.copyright-right {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
}

.menu-link {
  color: white !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: #FFAF3D !important;
}

.legal-disclaimer {
  font-size: 9.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.35);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 15px;
}

@media (max-width: 767px) {
  .copyright-left {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 0;
  }
}
</style>

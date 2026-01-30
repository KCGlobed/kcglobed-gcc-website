<template>
  <div class="footer-warp ptb-80">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-8 col-sm-5" data-aos="zoom-in-up" data-aos-delay="200">
          <div class="footer-widget">
            <h3>Quick Links</h3>
            <div class="row">
              <div class="col-lg-4">
                <ul class="footer-list">
                  <li>
                    <NuxtLink to="/personal-information">Apply Now</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about-overview">About Us</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="https://www.kcglobed.com/" target="_blank">Kc Global</NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="col-lg-4">
                <ul class="footer-list">
                  <li>
                    <NuxtLink to="/programs">Programs</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admissions">Admissions</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="https://www.britishcouncil.in/" target="_blank">British Council</NuxtLink>
                  </li>
                </ul>

              </div>
              <div class="col-lg-4">
                <ul class="footer-list">
                  <li>
                    <NuxtLink to="/campus-life">Campus Life</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/contact-us">Contact Us</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="https://tech4ed.in/ " target="_blank">Tech4Ed</NuxtLink>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-7" data-aos="fade-up" data-aos-delay="200">
          <div class="footer-widget">
            <h3>Subscribe Newsletter</h3>
            <div class="footer-form">
              <form>
                <input type="text" class="form-control" placeholder="Enter Email Address" />
                <button class="footer-btn" type="submit">
                  <span>Subscribe Now</span>
                  <i class="ti ti-arrow-narrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>

<template>
  <div class="footer-warp ptb-100">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-delay="200">
          <div class="footer-widget">
            <h3>Info For</h3>
            <ul class="footer-list">
              <li>
                <NuxtLink to="/career-services">Future Student</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/student-fees">Student Life</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/international-student">
                  International Student
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/personal-information">
                  Professional Learners
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/alumni">Alumni & Donors</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/administration-courses">Community</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/facilities">Faculty & Staff</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/administration-admission-requirements">
                  Admission
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-lg-3 col-sm-6"
          data-aos="zoom-in-up"
          data-aos-delay="200"
        >
          <div class="footer-widget">
            <h3>Programs</h3>
            <ul class="footer-list">
              <li>
                <NuxtLink to="/graduate-programs">Graduate Programs</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/undergraduate-programs">
                  Undergraduate Programs
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/program-choice">Online Programs</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/programs">All Programs</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-lg-2 col-sm-5"
          data-aos="zoom-in-up"
          data-aos-delay="200"
        >
          <div class="footer-widget">
            <h3>Quick Links</h3>
            <ul class="footer-list">
              <li>
                <NuxtLink to="/personal-information">Apply Now</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about-campus">About</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/blog">Articles</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/academic-calendar">Academic Calendar</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/privacy-policy">CPL Help</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events">Directory</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/jobs">Careers</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-sm-7" data-aos="fade-up" data-aos-delay="200">
          <div class="footer-widget">
            <h3>Subscribe Newsletter</h3>
            <div class="footer-form">
              <form>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Email Address"
                />
                <button class="footer-btn" type="submit">
                  <span>Subscribe Now</span>
                  <i class="ti ti-arrow-narrow-right"></i>
                </button>
              </form>
            </div>
            <ul class="footer-logos">
              <li>
                <a href="#">
                  <img src="~/assets/img/svgs/footer1.svg" alt="image" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="~/assets/img/svgs/footer2.svg" alt="image" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="~/assets/img/svgs/footer3.svg" alt="image" />
                </a>
              </li>
            </ul>
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

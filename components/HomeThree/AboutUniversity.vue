<template>
  <div class="about-style2-warp ptb-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="about-style2-image">
            <div class="row">
              <div
                class="col-lg-6 col-md-6"
                data-aos="zoom-in-up"
                data-aos-delay="200"
              >
                <div class="image reveal2">
                  <img src="~/assets/img/abouts/about1.jpg" alt="image" />
                </div>
              </div>
              <div
                class="col-lg-6 col-md-6"
                data-aos="zoom-in-up"
                data-aos-delay="300"
              >
                <div class="image style2 reveal3">
                  <img src="~/assets/img/abouts/about2.jpg" alt="image" />
                </div>
              </div>
            </div>
            <div class="round-shape" data-aos="zoom-in" data-aos-delay="200">
              <img
                src="~/assets/img/svgs/main-log.svg"
                class="main-logo"
                alt="image"
              />
              <img
                src="~/assets/img/shapes/text-shape1.png"
                class="text-shape"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="200">
          <div class="about-style2-content">
            <div class="content">
              <h2 class="reveal3">About Tuva University</h2>
              <span class="title">Study! Your Future Is Here!</span>
            </div>
            <p>
              Gathering the most complete offer of training programmes in
              Canada, the 14 Facilities of the Tuva offer unique conditions to
              those who want to build an academic path of excellence and
              properly valued by the labour market.
            </p>
            <NuxtLink to="/about-history" class="about-link">
              <span> More About Us</span>
              <i class="ti ti-arrow-narrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="all-shapes">
      <img
        src="~/assets/img/abouts/about-logo1.png"
        class="about-logo"
        alt="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUniversity",
};
</script>

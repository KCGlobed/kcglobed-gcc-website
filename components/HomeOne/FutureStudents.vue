<template>
  <div class="features-warp">
    <div class="container-fluid">
      <div class="inner-features-warp ptb-100 bg-F8F8F9">
        <div class="container">
          <div class="section-title">
            <h2 class="reveal2">Future Students Of Tuva</h2>
          </div>
          <div class="row">
            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div class="features-box">
                <div class="image">
                  <video autoplay muted loop id="video">
                    <source
                      src="~/assets/img/videos/luva.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div class="content">
                  <span class="title bg1">Freshers’ Guideline</span>
                  <h3>
                    <NuxtLink to="/international-student">
                      Bring your talent, drive and everything that makes you to
                      come Tuva
                    </NuxtLink>
                  </h3>
                  <NuxtLink to="/about-campus" class="features-link">
                    <span>Watch Full Video</span>
                    <i class="ti ti-arrow-narrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div
                class="features-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="image">
                  <div class="image">
                    <NuxtLink to="/international-student">
                      <img
                        src="~/assets/img/features/feature2.jpg"
                        alt="image"
                      />
                    </NuxtLink>
                  </div>
                </div>
                <div class="content">
                  <span class="title bg1">Campus Tour</span>
                  <h3>
                    <NuxtLink to="/international-student">
                      Visit Tuva open house on Saturday, November 18, 2024
                    </NuxtLink>
                  </h3>
                  <NuxtLink to="/international-student" class="features-link">
                    <span>Save The Date</span>
                    <i class="ti ti-arrow-narrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
              <div
                class="features-item"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="image">
                  <div class="image">
                    <NuxtLink to="/international-student">
                      <img
                        src="~/assets/img/features/feature3.jpg"
                        alt="image"
                      />
                    </NuxtLink>
                  </div>
                </div>
                <div class="content">
                  <span class="title bg2">Roadmap</span>
                  <h3>
                    <NuxtLink to="/international-student">
                      Follow these 10 steps to get into your dream program at
                      Tuva
                    </NuxtLink>
                  </h3>
                  <NuxtLink to="/international-student" class="features-link">
                    <span>Admission Roadmap</span>
                    <i class="ti ti-arrow-narrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
              <div
                class="features-item"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div class="image">
                  <div class="image">
                    <NuxtLink to="/international-student">
                      <img
                        src="~/assets/img/features/feature4.jpg"
                        alt="image"
                      />
                    </NuxtLink>
                  </div>
                </div>
                <div class="content">
                  <span class="title bg3">Guideline</span>
                  <h3>
                    <NuxtLink to="/international-student">
                      We are with you all the way!
                    </NuxtLink>
                  </h3>
                  <NuxtLink to="/international-student" class="features-link">
                    <span>See Guideline</span>
                    <i class="ti ti-arrow-narrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
              <div
                class="features-item-link"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div class="icon">
                  <div class="icon">
                    <NuxtLink to="/international-student">
                      <img src="~/assets/img/svgs/features1.svg" alt="logo" />
                    </NuxtLink>
                  </div>
                </div>
                <div class="content">
                  <p>
                    You could win <span>$5,000*</span> toward your tuition fees.
                  </p>
                  <NuxtLink to="/international-student" class="features-link">
                    <span>View Details</span>
                    <i class="ti ti-arrow-narrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FutureStudents",
};
</script>

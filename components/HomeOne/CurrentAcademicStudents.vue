<template>
  <div class="academic-warp ptb-100">
    <div class="container">
      <div class="section-title">
        <h2 class="reveal3">Current Academic Students</h2>
      </div>
      <div class="row g-4 align-items-center">
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div class="academic-item">
            <div class="academic-card pb-30">
              <div class="content">
                <span>Finances</span>
                <h3>
                  <NuxtLink to="/administration-finance">
                    Let us help you plan your finances, from first year to your
                    final year
                  </NuxtLink>
                </h3>
                <NuxtLink to="/administration-finance" class="default-btn">
                  Fees & Financial Resources
                  <i class="ti ti-arrow-narrow-right"></i>
                </NuxtLink>
              </div>
            </div>
            <div class="academic-card">
              <div class="image">
                <NuxtLink to="/english-proficiency">
                  <img src="~/assets/img/academics/academic1.jpg" alt="image" />
                </NuxtLink>
              </div>
              <div class="content">
                <span>Finances</span>
                <h3>
                  <NuxtLink to="/english-proficiency">
                    Tuva awards over $11 million in financial aid and
                    scholarships
                  </NuxtLink>
                </h3>
                <NuxtLink to="/english-proficiency" class="default-btn">
                  Explore Opportunities
                  <i class="ti ti-arrow-narrow-right"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4" data-aos="zoom-in-up" data-aos-delay="200">
          <div class="academic-box">
            <div class="image">
              <NuxtLink to="/about-overview">
                <img src="~/assets/img/academics/academic2.jpg" alt="image" />
              </NuxtLink>
            </div>
            <div class="content">
              <span>Convocation</span>
              <h3>
                <NuxtLink to="/about-overview">
                  Get ready for fall convocation
                </NuxtLink>
              </h3>
              <p>Registration started at 24 September for convocation.</p>
              <NuxtLink to="/about-overview" class="default-btn">
                Tuva Convocation
                <i class="ti ti-arrow-narrow-right"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <HomeOneAcademicSlider />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CurrentAcademicStudents",
});
</script>

<template>
  <div :class="[
    'responsive-navbar offcanvas offcanvas-end',
    { show: stateStoreInstance.navbar },
  ]" tabindex="-1" id="navbarOffcanvas">
    <div class="offcanvas-header">
      <NuxtLink to="/" @click="handleClick" class="logo d-inline-block">
        <img src="~/assets/img/logo.png" alt="logo" />
      </NuxtLink>
      <button type="button" class="close-btn" @click="stateStoreInstance.onMobileNavbarShow" data-bs-dismiss="offcanvas"
        aria-label="Close">
        <i class="ti ti-x"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <BAccordion free>
        <BAccordionItem title="Home" visible>
          <div class="accordion-item">
            <NuxtLink to="/" class="accordion-link" @click="handleClick">
              Home Demo - 1
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/home-two" class="accordion-link" @click="handleClick">
              Home Demo - 2
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/home-three" class="accordion-link" @click="handleClick">
              Home Demo - 3
            </NuxtLink>
          </div>
        </BAccordionItem>
        <BAccordionItem title="About">
          <div class="accordion-item">
            <NuxtLink to="/about-overview" class="accordion-link" @click="handleClick">
              About Overview
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/about-campus" class="accordion-link" @click="handleClick">
              About Campus
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/about-mission-values" class="accordion-link" @click="handleClick">
              About Mission Values
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/about-history" class="accordion-link" @click="handleClick">
              About History
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Facilities">
                <div class="accordion-item">
                  <NuxtLink to="/facilities" class="accordion-link" @click="handleClick">
                    Facilities
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/facility-architecture" class="accordion-link" @click="handleClick">
                    FacilitiesArchitecture
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/facility-architecture" class="accordion-link" @click="handleClick">
                    FacilitiesArchitecture
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>
        </BAccordionItem>
        <BAccordionItem title="Pages">
          <div class="accordion-item">
            <NuxtLink to="/how-to-apply" class="accordion-link" @click="handleClick">
              How Apply Form
            </NuxtLink>
          </div>

          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Jobs">
                <div class="accordion-item">
                  <NuxtLink to="/jobs" class="accordion-link" @click="handleClick">
                    Jobs
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/job-details" class="accordion-link" @click="handleClick">
                    Job Details
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>

          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Application Forms">
                <div class="accordion-item">
                  <NuxtLink to="/personal-information" class="accordion-link" @click="handleClick">
                    Personal Information
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/academic-information" class="accordion-link" @click="handleClick">
                    Academic Information
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/english-proficiency" class="accordion-link" @click="handleClick">
                    English Proficiency
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/program-choice" class="accordion-link" @click="handleClick">
                    Program Choice
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/document-upload" class="accordion-link" @click="handleClick">
                    Document Upload
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/submission" class="accordion-link" @click="handleClick">
                    Submission
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>

          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Blogs">
                <div class="accordion-item">
                  <NuxtLink to="/blog" class="accordion-link" @click="handleClick">
                    Our Blog
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/blog-details" class="accordion-link" @click="handleClick">
                    Blog Details
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>

          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Events">
                <div class="accordion-item">
                  <NuxtLink to="/events" class="accordion-link" @click="handleClick">
                    Our Events
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/event-details" class="accordion-link" @click="handleClick">
                    Event Details
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>

          <div class="accordion-item">
            <NuxtLink to="/faq" class="accordion-link" @click="handleClick">FAQ's</NuxtLink>
          </div>

          <div class="accordion-item">
            <NuxtLink to="/schedule" class="accordion-link" @click="handleClick">
              Schedule A Tour
            </NuxtLink>
          </div>

          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="My Account">
                <div class="accordion-item">
                  <NuxtLink to="/login" class="accordion-link" @click="handleClick">
                    Login
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/register" class="accordion-link" @click="handleClick">
                    Register
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>

          <div class="accordion-item">
            <NuxtLink to="/alumni" class="accordion-link" @click="handleClick">
              Alumni
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/academic-calendar" class="accordion-link" @click="handleClick">
              Academic Calendar
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/contact" class="accordion-link" @click="handleClick">
              Contact Us
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/terms-conditions" class="accordion-link" @click="handleClick">
              Terms & Conditions
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/privacy-policy" class="accordion-link" @click="handleClick">
              Privacy Policy
            </NuxtLink>
          </div>
        </BAccordionItem>
        <BAccordionItem title="Programs">
          <div class="accordion-item">
            <NuxtLink to="/programs" class="accordion-link" @click="handleClick">
              All Programs
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/undergraduate-programs" class="accordion-link" @click="handleClick">
              Undergraduate Programs
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/graduate-programs" class="accordion-link" @click="handleClick">
              Graduate Programs
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/administration-overview" class="accordion-link" @click="handleClick">
              Administration Overview
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/administration-courses" class="accordion-link" @click="handleClick">
              Administration Courses
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/administration-admission-requirements" class="accordion-link" @click="handleClick">
              Administration Admission Requirements
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/administration-finance" class="accordion-link" @click="handleClick">
              Administration Finance
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/administration-availability" class="accordion-link" @click="handleClick">
              Administration Availability
            </NuxtLink>
          </div>
        </BAccordionItem>
        <BAccordionItem title="Admissions">
          <div class="accordion-item">
            <NuxtLink to="/transfer-credit" class="accordion-link" @click="handleClick">
              Transfer Credit
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/student-fees" class="accordion-link" @click="handleClick">
              Student Fees
            </NuxtLink>
          </div>
        </BAccordionItem>
        <BAccordionItem title="Student Life">
          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Campus Services">
                <div class="accordion-item">
                  <NuxtLink to="/accessibility" class="accordion-link" @click="handleClick">
                    Accessibility At Tuva
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/book-store" class="accordion-link" @click="handleClick">
                    Book Store
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/information-technology" class="accordion-link" @click="handleClick">
                    Information Technology
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/parking-locker" class="accordion-link" @click="handleClick">
                    Parking Locker
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/residence" class="accordion-link" @click="handleClick">
                    Residence
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>

          <div class="accordion-item">
            <BAccordion free>
              <BAccordionItem title="Student Services">
                <div class="accordion-item">
                  <NuxtLink to="/career-services" class="accordion-link" @click="handleClick">
                    Career Services
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/health-services" class="accordion-link" @click="handleClick">
                    Health Services
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/library-services" class="accordion-link" @click="handleClick">
                    Library Services
                  </NuxtLink>
                </div>
                <div class="accordion-item">
                  <NuxtLink to="/tutoring-services" class="accordion-link" @click="handleClick">
                    Tutoring Services
                  </NuxtLink>
                </div>
              </BAccordionItem>
            </BAccordion>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/experiential-learning" class="accordion-link" @click="handleClick">
              Experiential Learning
            </NuxtLink>
          </div>
          <div class="accordion-item">
            <NuxtLink to="/athletics-recreation" class="accordion-link" @click="handleClick">
              Athletics Recreation
            </NuxtLink>
          </div>
        </BAccordionItem>
        <div class="accordion-item">
          <NuxtLink to="/international-student" class="accordion-link" @click="handleClick">
            International Student
          </NuxtLink>
        </div>

        <div class="others-option d-flex align-items-center">
          <div class="option-item">
            <div class="search-bar main-menu__search search-toggler" @click="stateStoreInstance.onChange"
              style="cursor: pointer">
              <div class="search-btn">
                <img src="~/assets/img/svgs/search.svg" alt="image" />
              </div>
            </div>
          </div>

          <div class="option-item">
            <button class="btn side-bar-btn" type="button" @click="stateStoreInstance.onSidebarShow">
              <img src="~/assets/img/svgs/menu.svg" alt="svg" />
            </button>
          </div>
        </div>
      </BAccordion>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../utils/store";

export default defineComponent({
  name: "MobileDeviceNavbar",
  setup() {
    const stateStoreInstance = stateStore;
    const handleClick = () => {
      stateStoreInstance.navbar = false;
    };

    return {
      stateStoreInstance,
      handleClick,
    };
  },
});
</script>

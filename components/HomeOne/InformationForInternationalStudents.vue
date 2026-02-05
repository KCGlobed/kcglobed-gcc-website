<template>
  <div class="information-warp ptb-100">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="panelBox">
            <div class="box">
              <img src="../../assets/img/heros/panleIcon1.png" class="icon" />
              <p>Hired First</p>
              <span>Then Trained</span>
            </div>
            <div class="box">
              <img src="../../assets/img/heros/panleIcon2.png" class="icon" />
              <p>6 Months</p>
              <span>Paid Internship During the Program</span>
            </div>
            <div class="box">
              <img src="../../assets/img/heros/panleIcon3.png" class="logo" />
              <p>Hired First</p>
              <span>UK ACCA Integrated</span>
            </div>
            <div class="box">
              <img src="../../assets/img/heros/panleIcon4.png" class="logo" />
              <p>Hired First</p>
              <span>Master in Corporate Communication</span>
            </div>
            <div class="box">
              <img src="../../assets/img/heros/panleIcon5.png" class="logo" />
              <p>Hired First</p>
              <span>AICTE Approved PGCM Certificate from AIMA</span>
            </div>
            <div class="box">
              <img src="../../assets/img/heros/panleIcon6.png" class="icon" />
              <p>AI First</p>
              <span>Integrated Curriculum</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center g-4">
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <div class="information-content">
            <h2 class="reveal2">BUILD A GLOBAL CAREER IN 12 MONTHS</h2>
            <p>
              In just 12 months, you'll transform from graduate to global professional — ready to perform from day one.
            </p>
            <ul class="information-list">
              <li>
                <i class="ti ti-check"></i>
                Conditional offer letter
              </li>
              <li>
                <i class="ti ti-check"></i>
                6-month paid internship along with program
              </li>
              <li>
                <i class="ti ti-check"></i>
                ACCA classroom learning powered by KC GlobEd
              </li>

              <li>
                <i class="ti ti-check"></i>
                British Council - English For Work
              </li>
              <li>
                <i class="ti ti-check"></i>
                AICTE-approved Post-Graduate Certificate in Management (Public Accounting)
              </li>
              <li>
                <i class="ti ti-check"></i>
                MSc Professional Accountancy (University of London)-Optional
              </li>
            </ul>
            <div class="info-button">
              <NuxtLink to="/programs" class="default-btn style2">
                Explore 12-Month Journey
                <i class="ti ti-arrow-narrow-right"></i>
              </NuxtLink>
              <div class="default-btn secodary-btn" style="cursor: pointer;" @click="toggleEligibilityModal">
                Check Eligibility
                <i class="ti ti-arrow-narrow-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6" data-aos="zoom-in-up" data-aos-delay="200">
          <div class="video-section">
            <div class="video-container">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="GCC Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
            <div class="video-badge">
              <img src="~/assets/Logo/Logo/GCC-School-Logo-White.png" alt="GCC Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CheckEligibilityModal :isVisible="isEligibilityModalVisible" @close="toggleEligibilityModal" />
  </div>
</template>

<script>
import CheckEligibilityModal from "./CheckEligibilityModal";

export default {
  name: "InformationForInternationalStudents",
  components: {
    CheckEligibilityModal
  },
  data() {
    return {
      isEligibilityModalVisible: false,
    };
  },
  methods: {
    toggleEligibilityModal() {
      this.isEligibilityModalVisible = !this.isEligibilityModalVisible;
    },
  }
};
</script>

<style scoped>
/* Video Section Styles */
.information-warp {
  position: relative;
  padding-top: 200px;
}

.panelBox {
  display: flex;
  padding: 30px;
  padding-left: 60px;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  height: 150px;
  position: absolute;
  top: -30px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 100;
  gap: 30px;
  line-height: 15px;
}

.panelBox .box {
  flex: 1;
  width: 150px;
  display: flex;
  flex-direction: column;

}

.panelBox .box .logo {
  width: 100px;
}

.panelBox .box .icon {
  width: 25px;
  height: 25px;
}

.panelBox .box p {
  font-size: 24px;
  font-weight: bold;
  color: #38003C;
  margin-bottom: 0;
}

.information-content h2 {
  font-size: 32px;
  font-weight: 700;
  color: #0d0d25;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.panelBox .box span {
  font-size: 11px;

}

.video-section {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 Aspect Ratio */
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.video-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  z-index: 1;
  pointer-events: none;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 2;
}

/* Video Badge */
.video-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 10;
  animation: floatBadge 3s ease-in-out infinite;
}

.video-badge img {
  width: 80px;
  height: auto;
  display: block;
}

@keyframes floatBadge {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design */
@media (max-width: 991px) {
  .video-container {
    border-radius: 15px;
  }

  .video-badge {
    bottom: 15px;
    right: 15px;
    padding: 12px;
  }

  .video-badge img {
    width: 60px;
  }
}

@media (max-width: 767px) {
  .video-container {
    border-radius: 12px;
    margin-bottom: 30px;
  }

  .video-badge {
    bottom: 10px;
    right: 10px;
    padding: 10px;
  }

  .video-badge img {
    width: 50px;
  }
}
</style>

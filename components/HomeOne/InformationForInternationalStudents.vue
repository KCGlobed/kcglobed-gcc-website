<template>
  <div class="information-warp pb-50">
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div class="panelBox">
            <div class="title-strip">
              <h3>12 Months AI-Enabled International Accounting Professional (AEIAP) Program</h3>
            </div>
            <div class="boxes-container">
              <div class="box">
                <img src="../../assets/img/heros/panleIcon1.png" class="icon" />
                <p>Hired First</p>
                <span>Then Trained</span>
              </div>
              <div class="box">
                <img src="../../assets/img/heros/panleIcon2.png" class="icon" />
                <p>Paid Internship</p>
                <span>6 Months</span>
              </div>
              <div class="box">
                <img src="../../assets/img/heros/panleIcon3.png" class="logo" />
                <span class="mt-1">UK ACCA <br> Integrated</span>
              </div>
              <div class="box">
                <img src="../../assets/img/heros/panleIcon4.png" class="logo" />
                <span class="mt-2">Master in Corporate Communication</span>
              </div>
              <div class="box">
                <img src="../../assets/img/heros/panleIcon5.png" class="logo" />
                <span class="mt-2">AICTE Approved PGCM Certificate from AIMA</span>
              </div>
              <div class="box">
                <img src="../../assets/img/heros/panleIcon6.png" class="icon" />
                <p>AI First</p>
                <span>Integrated Curriculum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center g-4">
        <div class="col-lg-8" data-aos="zoom-in-up" data-aos-delay="200">
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

.pb-50 {
  padding-bottom: 50px;
}


.panelBox {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  position: absolute;
  top: -30px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 100;
  width: 95%;
  max-width: 1240px;
  overflow: hidden;
}

.title-strip {
  background: linear-gradient(135deg, #38003C 0%, #6B1B75 100%);
  padding: 15px 30px;
  text-align: center;
}

.title-strip h3 {
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.boxes-container {
  display: flex;
  padding: 30px;
  padding-left: 60px;
  gap: 30px;
  line-height: 15px;
}

@media (max-width: 1200px) {
  .title-strip h3 {
    font-size: 16px;
  }

  .boxes-container {
    padding-left: 30px;
    gap: 15px;
    padding-bottom: 20px;
  }

  .panelBox .box p {
    font-size: 18px;
    line-height: 24px;
  }
}

@media (max-width: 991px) {
  .panelBox {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    margin: -100px auto 40px;
    width: 100%;
  }

  .title-strip {
    padding: 12px 20px;
  }

  .title-strip h3 {
    font-size: 14px;
  }

  .boxes-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 20px;
  }
}

@media (max-width: 767px) {
  .title-strip h3 {
    font-size: 12px;
  }

  .boxes-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 15px;
  }
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
  font-size: 22px;
  font-weight: bold;
  color: #38003C;
  margin-bottom: 0;
  line-height: 32px;
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


@media (max-width: 565px) {
  .information-warp {
    padding-top: 20px;
  }

  .timeline-container {
    margin: 30px auto 0;
  }

  .panelBox {
    transform: none;
    position: inherit;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .title-strip {
    padding: 10px 15px;
  }

  .title-strip h3 {
    font-size: 11px;
    letter-spacing: 0.3px;
  }

  .boxes-container {
    display: grid;
    padding: 20px;
    gap: 15px;
    grid-template-columns: 1fr 1fr;
  }

  .panelBox .box {
    padding: 10px;
  }
}
</style>

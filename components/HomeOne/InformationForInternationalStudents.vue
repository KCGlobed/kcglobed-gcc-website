<template>
  <div class="information-warp pb-50 ">
    <!-- Accreditations / Logos Strip (Full-width flat bar) -->
    <div class="panelBox">
      <div class="boxes-container">
        <!-- AICPA -->
        <div class="box">
          <img src="../../assets/img/AICPA_logo.png" alt="AICPA Logo" loading="lazy" decoding="async" />
          <span>US CPA Pathway</span>
        </div>
        <!-- ACCA -->
        <div class="box">
          <img src="../../assets/newimages/red-acca-logo.svg" alt="ACCA Logo" loading="lazy" decoding="async" />
          <span>ACCA</span>
        </div>
        <!-- IRS -->
        <div class="box">
          <img src="../../assets/img/IRS_logo.png" alt="IRS Logo" loading="lazy" decoding="async" />
          <span>US Enrolled Agent</span>
        </div>
        <!-- British Council -->
        <div class="box">
          <img src="../../assets/img/heros/panleIcon4.png" alt="British Council Logo" loading="lazy" decoding="async" />
        </div>
        <!-- AIMA -->
        <div class="box">
          <img src="../../assets/img/heros/panleIcon5.png" alt="AIMA Logo" loading="lazy" decoding="async" />
          <span>AICTE-Approved PGCM</span>
        </div>
        <!-- KC GlobEd -->
        <div class="box">
          <img src="../../assets/img/logo_kcglobed.svg" alt="KC GlobEd Logo" loading="lazy" decoding="async" />
          <span>Backed by KC GlobEd - 30+ Years</span>
        </div>
        <!-- University of London -->
        <div class="box">
          <img src="../../assets/img/companylogo/4.png" alt="University of London Logo" loading="lazy"
            decoding="async" />
          <span>University of London MSc (Optional)</span>
        </div>
      </div>
    </div>

    <!-- Main Content Block (Introducing the Hire-First Model & Video Card) -->
    <div class="container-fluid px-lg-5 px-md-4 px-3 mt-5">
      <div class="row align-items-center justify-content-between g-5 content-row" style="background: #f8f6ff;">
        <!-- Left Column: Content -->
        <div class="col-lg-6 text-start">
          <span class="hire-badge-title">INTRODUCING THE HIRE-FIRST MODEL</span>
          <h2 class="hire-main-title mt-3">
            Disrupting The Traditional, Ordinary, Conventional, Normal Education System.
          </h2>
          <div class="d-flex gap-3 flex-wrap mt-4">
            <button style="background-color: #51157C;color: white;" class="title-btn" data-bs-toggle="modal"
              data-bs-target="#applyNowModal">
              Explore The Model &rarr;
            </button>
            <button style="color:#51157C; outline: #DDD1EA;border: 1px solid #DDD1EA; background-color: white;"
              class=" title-btn px-4 py-3" @click="toggleEligibilityModal">
              View Career Paths
            </button>
          </div>
        </div>

        <!-- Right Column: Video Box -->
        <div class="col-lg-6">
          <div class="video-box-wrapper">
            <div class="video-section shadow-lg">
              <div class="video-container">
                <video ref="infoVideo" controls muted loop controlsList="nodownload" oncontextmenu="return false;"
                  class="w-100 h-100" @play="isVideoPlaying = true" @pause="isVideoPlaying = false"
                  style="object-fit: cover; background: #0b0b1a;">
                  <source
                    src="https://storage.googleapis.com/static_files_backend/media/images/Kamal%20Sir%20Video_1.mp4"
                    type="video/mp4">
                  Your browser does not support the video tag.
                </video>

                <!-- Custom Play Overlay (visible before play) -->
                <div v-if="!isVideoPlaying" class="play-overlay d-flex align-items-center px-lg-4 px-3"
                  @click="playVideo">
                  <div class="play-btn-circle me-lg-4 me-3">
                    <i class="ti ti-player-play-filled"></i>
                  </div>
                </div>

                <!-- Thumbnail Mask (visible before play) -->
                <img v-if="!isVideoPlaying"
                  src="https://storage.googleapis.com/static_files_backend/media/images/kamal%20sir%20thnml%202.jpg"
                  class="video-poster-img" @click="playVideo" alt="Thumbnail">
              </div>
            </div>
            <!-- Decorative shapes -->
            <div class="decor-shape shape-1"></div>
            <div class="decor-shape shape-2"></div>
            <div class="decor-shape shape-3"></div>
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
      isVideoPlaying: false,
    };
  },
  methods: {
    toggleEligibilityModal() {
      this.isEligibilityModalVisible = !this.isEligibilityModalVisible;
    },
    playVideo() {
      const video = this.$refs.infoVideo;
      if (video) {
        if (video.paused) {
          video.play();
          this.isVideoPlaying = true;
        } else {
          video.pause();
          this.isVideoPlaying = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.information-warp {
  position: relative;
  padding-top: 0;
  background-color: #F7F7F8 !important;
}

.pb-50 {
  padding-bottom: 50px;
}

/* Accreditations Panel Box (Flat full-width layout) */
.panelBox {
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
  width: 100%;
  z-index: 10;
}

.boxes-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 40px;
  background: #ffffff;
  /* max-width: 1300px; */
  margin: 0 auto;
  width: 100%;
}

.boxes-container .box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: 1px solid #E5E5E5;
  padding: 0 12px;
  min-height: 80px;
}

.boxes-container .box:last-child {
  border-right: none;
}

.boxes-container .box img {
  max-height: 40px;
  max-width: 100%;
  object-fit: contain;
}

.boxes-container .box span {
  font-size: 10px;
  font-weight: 700;
  color: #777777;
  text-transform: uppercase;
  margin-top: 8px;
  line-height: 1.2;
}

/* Content block styles */
.hire-badge-title {
  color: #D98E23;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.hire-main-title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 52px;
  letter-spacing: -0.02em;
  color: #181225;
}

.btn-purple {
  background-color: #4A154B !important;
  color: #FFFFFF !important;
  font-weight: 700;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: none;
  font-size: 15px;
}

.btn-purple:hover {
  background-color: #320d33 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(74, 21, 75, 0.3);
}

.btn-outline-purple {
  background-color: #ffffff !important;
  color: #4A154B !important;
  border: 1.5px solid #4A154B !important;
  font-weight: 700;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 15px;
}

.btn-outline-purple:hover {
  background-color: rgba(74, 21, 75, 0.05) !important;
  transform: translateY(-2px);
}

/* Video Section Styles */
.video-box-wrapper {
  position: relative;
  padding: 20px;
  z-index: 1;
}

.video-section {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.video-section:hover {
  transform: translateY(-4px);
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 */
  background: #0b0b1a;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.video-poster-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
  cursor: pointer;
  transition: all 0.5s ease;
}

.video-section:hover .video-poster-img {
  transform: scale(1.03);
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 4;
  cursor: pointer;
}

.title-btn {
  padding: 5px 26px;
  outline: none;
  border: none;
  border-radius: 7px;
}


.play-overlay:hover {
  background: rgba(0, 0, 0, 0.55);
}

.play-btn-circle {
  width: 60px;
  height: 60px;
  background: #A13E99;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 15px rgba(161, 62, 153, 0.4);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.play-overlay:hover .play-btn-circle {
  transform: scale(1.1);
  background: #C436BE;
}

.video-overlay-text {
  flex: 1;
}

.purple-badge {
  background: #6B1B75;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 4px;
  display: inline-block;
}

.overlay-speaker-name {
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
}

.overlay-speaker-title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0px;
  font-weight: 500;
}

/* Decorative Shapes */
.decor-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: rgba(161, 62, 153, 0.1);
  top: -50px;
  right: -50px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: rgba(255, 192, 101, 0.05);
  bottom: -100px;
  left: -100px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: rgba(107, 27, 117, 0.1);
  bottom: 20%;
  right: -30px;
}

/* Responsive Design */
@media (max-width: 1199px) {
  .hire-main-title {
    font-size: 34px;
  }
}

@media (max-width: 991px) {
  .boxes-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }

  .boxes-container .box {
    border-right: none;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 15px;
    width: auto;
    min-height: unset;
  }

  .boxes-container .box:nth-child(4),
  .boxes-container .box:nth-child(7),
  .boxes-container .box:last-child {
    border-bottom: none;
  }

  .content-row {
    margin-top: 20px !important;
  }
}

@media (max-width: 767px) {
  .hire-main-title {
    font-size: 24px;
    line-height: 37px;
  }

  .boxes-container {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 12px 6px !important;
  }

  .boxes-container .box {
    flex: 0 0 calc(25% - 8px) !important;
    max-width: calc(25% - 8px) !important;
    background: #ffffff !important;
    border: 1px solid #2f2f2f !important;
    border-radius: 8px !important;
    padding: 8px 4px !important;
    min-height: 70px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .boxes-container .box img {
    max-height: 25px !important;
  }

  .boxes-container .box span {
    font-size: 6px !important;
    margin-top: 4px !important;
  }

  .play-btn-circle {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }

  .overlay-speaker-name {
    font-size: 15px;
  }

  .purple-badge {
    font-size: 10px;
    padding: 2px 8px;
  }

  .title-btn {
    padding: 10px 22px;
    font-size: 11px;
    border-radius: 10px;
    outline: none;
  }
}

@media (max-width: 575px) {
  .btn-purple,
  .btn-outline-purple {
    width: 100%;
    text-align: center;
  }

  .decor-shape {
    display: none;
  }
}
</style>

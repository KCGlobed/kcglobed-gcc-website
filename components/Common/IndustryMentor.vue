<template>
  <div class="mentors-and-campus-wrapper">
    <div class="think-tank-area ptb-100">
      <div class="container">
        <div class="section-title text-center mb-50">
          <h2 class="title">Our Distinguished Industry Mentors</h2>
          <!-- <p class="max-600 mx-auto">Our Industry Mentors are seasoned professionals who provide invaluable
              guidance and real-world insights to bridge the gap between academia and industry.</p> -->
        </div>

        <div class="mentor-carousel-container">
          <div class="mentor-scroll-wrapper" ref="mentorGridRef" @scroll="checkScroll">
            <div v-for="(img, index) in images" :key="index" class="mentor-card-item">
              <a :href="img.link" target="_blank">
                <div class="image-box">
                  <img :src="img.img" alt="Industry Mentor" class="img-fluid" loading="lazy" decoding="async" @load="checkScroll">
                </div>
              </a>
            </div>
          </div>
          
          <!-- Left Scroll Button -->
          <button 
            v-show="showLeftArrow" 
            class="scroll-btn left-btn" 
            @click="scroll('left')" 
            aria-label="Scroll Left"
          >
            <i class="ti ti-chevron-left"></i>
          </button>

          <!-- Right Scroll Button -->
          <button 
            v-show="showRightArrow" 
            class="scroll-btn right-btn" 
            @click="scroll('right')" 
            aria-label="Scroll Right"
          >
            <i class="ti ti-chevron-right"></i>
          </button>

          <!-- Pagination Dots (Mobile Only) -->
          <div class="mentor-dots-wrapper">
            <span 
              v-for="dotIndex in 5" 
              :key="dotIndex" 
              :class="['dot-indicator', { active: activeIndex === dotIndex - 1 }]"
              @click="scrollToPage(dotIndex - 1)"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Campus DLF Cyber City Section -->
    <div class="campus-section ptb-100">
      <div class="container">
        <div class="row align-items-center g-5">
          <!-- Left Content -->
          <div class="col-lg-6 col-12 text-start">
            <div class="campus-info">
              <span class="gold-tag">CAMPUS · DLF CYBER CITY</span>
              <h2 class="campus-heading mt-2">Learn Where Global<br class="d-none d-md-block" /> Finance Actually<br class="d-none d-md-block" /> Happens.</h2>
              <p class="campus-desc mt-3">
                Building 9B, DLF Cyber City, Gurugram, surrounded by the very companies you are training to join. That proximity is not a perk. It is part of how we prepare you.
              </p>
              <div class="d-flex flex-wrap gap-3 mt-4">
                <button class="btn btn-gold" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                  Book A Campus Visit <i class="ti ti-arrow-right ms-2"></i>
                </button>
                <NuxtLink to="/campus-life" class="btn btn-outline-meet">
                  View Gallery
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="col-lg-6 col-12">
            <!-- <div class="campus-img-box"> -->
              <img :src="campusImg" alt="DLF Cyber City Campus Classroom" class="img-fluid" loading="lazy" decoding="async" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import campusImg from '@/assets/newimages/campus-1.png';

const images = [
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(1)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(2)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    // {
    //     img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(3)%201.png",
    //     link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    // },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2049920%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(4)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(5)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(6)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051456%20(7).png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%20(1)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%20(2)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
    {
        img: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/Frame%2051457%20(2)%201.png",
        link: "https://www.linkedin.com/in/senthil-kumar-5b8a1b8a/"
    },
]

const mentorGridRef = ref<HTMLElement | null>(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(true);
const activeIndex = ref(0);

const scroll = (direction: 'left' | 'right') => {
  const container = mentorGridRef.value;
  if (!container) return;

  const isMobile = window.innerWidth <= 767;
  const cardWidth = isMobile ? 240 : 350; 
  const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
  
  container.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
};

const scrollToPage = (index: number) => {
  const container = mentorGridRef.value;
  if (!container) return;

  const cardWidth = 240; // 230px card width + 10px column gap
  container.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
};

const checkScroll = () => {
  const container = mentorGridRef.value;
  if (!container) return;
  
  showLeftArrow.value = container.scrollLeft > 10;
  
  const maxScroll = container.scrollWidth - container.clientWidth;
  if (maxScroll <= 0) {
    showRightArrow.value = images.length > 2;
  } else {
    showRightArrow.value = container.scrollLeft < maxScroll - 10;
  }

  // Calculate active index on mobile scroll
  const cardWidth = 240;
  activeIndex.value = Math.min(
    Math.round(container.scrollLeft / cardWidth),
    4
  );
};

onMounted(() => {
  setTimeout(() => {
    checkScroll();
  }, 500);
});
</script>

<style scoped>
.think-tank-area {
    background: #1E1E1E;
    overflow: hidden;
}

.section-title {
    margin-bottom: 50px;

}

.title {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
    /* text-transform: uppercase; */
}

.title::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    background: #F1A63E;
    margin: 15px auto 0;
    border-radius: 10px;
}

.highlight {
    color: #F1A63E;
}

.section-title p {
    color: #4b5563;
    font-size: 16px;
    line-height: 1.6;
}

.max-600 {
    max-width: 600px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.image-box {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box img {
    max-width: 100%;
    height: auto;
    transition: all 0.3s ease;
}

@media (max-width: 991px) {
    .section-title h2 {
        font-size: 28px;
    }
}

/* Campus Section Styles */
.campus-section {
  background-color: #F8F9FA;
  padding: 80px 0;
  border-top: 1px solid #ECECF0;
}

.gold-tag {
  color: #D5861B;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.campus-heading {
  font-size: 42px;
  font-weight: 800;
  color: #130922;
  line-height: 1.25;
}

.campus-desc {
  font-size: 15px;
  color: #555555;
  line-height: 1.6;
}

.btn-gold {
  background-color: #FFAF3D !important;
  color: #000000 !important;
  font-weight: 700;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 14px;
  border: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-gold:hover {
  background-color: #E5A93C !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(254, 175, 61, 0.3);
}

.btn-outline-meet {
  background-color: #ffffff !important;
  color: #4A154B !important;
  border: 1.5px solid #4A154B !important;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 24px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-outline-meet:hover {
  background-color: rgba(74, 21, 75, 0.05) !important;
  transform: translateY(-2px);
}

/* .campus-img-box img {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
} */

@media (max-width: 575px) {
  .campus-heading {
    font-size: 30px;
  }
}

/* Scroll Carousel Styles */
.mentor-carousel-container {
  position: relative;
  width: 100%;
}

.mentor-scroll-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.mentor-card-item {
  width: 100%;
}

.mentor-card-item .image-box {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mentor-card-item .image-box img {
  max-width: 100%;
  height: auto;
  transition: all 0.3s ease;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #130922;
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: none; /* Hide on desktop */
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
  transition: all 0.3s ease;
}

.scroll-btn:hover {
  background-color: #f8f9fa;
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.left-btn {
  left: -22px;
}

.right-btn {
  right: -22px;
}

.mentor-dots-wrapper {
  display: none; /* Hide on desktop */
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot-indicator.active {
  background-color: #FFAF3D;
  transform: scale(1.2);
}

@media (max-width: 991px) {
  .mentor-scroll-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .section-title {
    margin-bottom: 20px !important;
  }

  .mentor-scroll-wrapper {
    display: flex !important;
    flex-flow: column wrap !important;
    height: 308px !important; /* height to fit 2 rows of 140px cards + 8px vertical gap + padding */
    gap: 8px 10px !important; /* row-gap: 8px, column-gap: 10px */
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    padding: 10px 30px !important;
    margin: 0 -30px !important;
    align-content: flex-start !important;
    justify-content: center !important; /* Centers the 2 rows vertically to keep gaps uniform */
    grid-template-columns: none !important;
  }

  .mentor-card-item {
    height: 140px !important; /* height of cards on mobile */
    flex: 0 0 auto !important;
    width: 230px !important; /* reduced width of cards on mobile */
    scroll-snap-align: center !important;
  }
  
  .mentor-card-item a,
  .mentor-card-item .image-box,
  .mentor-card-item img {
    height: 100% !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    object-fit: contain !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .scroll-btn {
    display: none !important; /* Hide arrows on mobile */
  }

  .mentor-dots-wrapper {
    display: flex !important; /* Show dots on mobile */
  }
}
</style>

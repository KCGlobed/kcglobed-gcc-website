<template>
  <div class="comparison-and-faculty-wrapper">
    <div class="comparison-warp ptb-100">
      <div class="container">
        <div class="section-title text-center">
          <!-- Kept the section title as per previous premium design -->
          <h2 class="title">Traditional Pathway vs GCC SCHOOL Journey</h2>
          <p>See why GCC School Journey is most suited for professional world of new tomorrow.</p>
        </div>

        <div class="table-responsive">
          <table class="table comparison-table">
            <thead>
              <tr>
                <th scope="col" class="feature-col-header">KEY FEATURES</th>
                <th scope="col" class="text-center traditional-header">TRADITIONAL PATHWAY</th>
                <th scope="col" class="text-center gcc-header">
                  <!-- Setup placeholder for logo if needed, or just text/logo image provided in design -->
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <!-- Assuming logo asset usage, using text for now if asset path not confirmed, or basic icon -->

                    GCC SCHOOL JOURNEY
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in comparisonData" :key="index"
                :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
                <td class="feature-name" v-html="item.feature"></td>
                <td class="text-center traditional-cell">
                  <span v-if="item.traditional" class="icon-check-green">
                    <i class="ti ti-circle-check"></i>
                  </span>
                  <span v-else class="icon-cross-red">
                    <i class="ti ti-circle-x"></i>
                  </span>
                </td>
                <td class="text-center gcc-cell">
                  <span v-if="item.gcc" class="icon-check-gold">
                    <i class="ti ti-circle-check"></i>
                  </span>
                  <span v-else class="icon-cross-red">
                    <i class="ti ti-circle-x"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>

        </div>
      </div>
    </div>

    <!-- Faculty & Mentors Section -->
    <div class="faculty-mentors-area ptb-100">
      <div class="container">
        <div class="row align-items-center">
          <!-- Left Info Block -->
          <div class="col-lg-5 col-12 mb-lg-0 mb-5 faculty-info-col">
            <div class="faculty-info text-start">
              <span class="gold-tag">FACULTY & MENTORS</span>
              <h2 class="faculty-heading mt-2">Taught By People Who<br class="d-none d-md-block" /> Have Done The Work.
              </h2>
              <p class="faculty-desc mt-3">
                Practising CPAs, Chartered Accountants and Enrolled Agents, not just lecturers. You learn how the work
                is really done, from people who have done it at a high level.
              </p>
              <NuxtLink to="/thinktank" style="background-color: #51157C;color: white;" class="btn mt-4">
                Meet The Faculty <i class="ti ti-arrow-right ms-2"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Right Cards Block -->
          <div class="col-lg-7 col-12">
            <div class="faculty-carousel-container">
              <div class="faculty-scroll-wrapper" ref="facultyScrollRef" @scroll="checkScroll">
                <div v-for="(faculty, index) in facultyMembers" :key="index" class="faculty-card-item">
                  <img :src="faculty.image" :alt="faculty.alt" class="faculty-img" loading="lazy" decoding="async"
                    @load="checkScroll" />
                </div>
              </div>

              <!-- Left Scroll Button -->
              <button v-show="showLeftArrow" class="scroll-btn left-btn" @click="scroll('left')"
                aria-label="Scroll Left">
                <i class="ti ti-chevron-left"></i>
              </button>

              <!-- Right Scroll Button -->
              <button v-show="showRightArrow" class="scroll-btn right-btn" @click="scroll('right')"
                aria-label="Scroll Right">
                <i class="ti ti-chevron-right"></i>
              </button>

              <!-- Pagination Dots (Mobile Only) -->
              <div class="faculty-dots-wrapper">
                <span v-for="dotIndex in 3" :key="dotIndex"
                  :class="['dot-indicator', { active: activeIndex === dotIndex - 1 }]"
                  @click="scrollToPage(dotIndex - 1)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import nitish from '@/assets/img/expert/nitish.png'
import ankur from '@/assets/img/expert/ankur.png'

export default {
  name: "CurrentAcademicStudents",
  data() {
    return {
      nitishImage: nitish,
      ankurImage: ankur,
      showLeftArrow: false,
      showRightArrow: true,
      activeIndex: 0,
      facultyMembers: [
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(4).png", alt: "Faculty 1" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(2).png", alt: "Faculty 2" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(10).png", alt: "Faculty 3" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(1).png", alt: "Faculty 4" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(3).png", alt: "Faculty 5" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(5).png", alt: "Faculty 6" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(6).png", alt: "Faculty 7" },
        { image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/image%20(7).png", alt: "Faculty 8" },
      ],
      comparisonData: [
        { feature: "<strong>Globally Recognised</strong> Academic Credentials", traditional: true, gcc: true },
        { feature: "<strong>Strong</strong> Theoretical Foundation", traditional: true, gcc: true },
        { feature: "<strong>Career Commitment</strong> & Confidence from Day 1", traditional: false, gcc: true },
        { feature: "<strong>Get Hired First</strong>, Then Trained", traditional: false, gcc: true },
        { feature: "<strong>Real-time</strong> Industry Environmental Learning", traditional: false, gcc: true },
        { feature: "<strong>Global</strong> Exposure", traditional: false, gcc: true },
        { feature: "<strong>Purpose</strong> Driven Curriculum", traditional: false, gcc: true },
        { feature: "<strong>Elite</strong> Industry Mentors", traditional: false, gcc: true },
        { feature: "<strong>AI-Enabled</strong> Adaptive Learning", traditional: false, gcc: true },
        { feature: "<strong>Employability</strong> Focused Training", traditional: false, gcc: true },
      ],
    };
  },
  methods: {
    scroll(direction) {
      const container = this.$refs.facultyScrollRef;
      if (!container) return;

      // Scroll by 260px on mobile (width 250px + 10px gap), 350px on desktop
      const isMobile = window.innerWidth <= 767;
      const cardWidth = isMobile ? 260 : 350;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    },
    scrollToPage(index) {
      const container = this.$refs.facultyScrollRef;
      if (!container) return;

      const cardWidth = 260; // 250px card width + 10px gap
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    },
    checkScroll() {
      const container = this.$refs.facultyScrollRef;
      if (!container) return;

      this.showLeftArrow = container.scrollLeft > 10;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) {
        // Default to showing the right arrow initially if we have more than 2 items
        this.showRightArrow = this.facultyMembers.length > 2;
      } else {
        this.showRightArrow = container.scrollLeft < maxScroll - 10;
      }

      // Calculate active index on mobile scroll
      const cardWidth = 260;
      this.activeIndex = Math.min(
        Math.round(container.scrollLeft / cardWidth),
        2
      );
    }
  },
  mounted() {
    setTimeout(() => {
      this.checkScroll();
    }, 500);
  }
};
</script>

<style scoped>
.comparison-warp {
  background-color: #eceef4;
}

.table-responsive {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  overflow: hidden;
}

.comparison-table {
  width: 100%;
  margin-bottom: 0;
  background-color: #fff;
  border-collapse: collapse;
}

.comparison-table th {
  padding: 25px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  vertical-align: middle;
  text-transform: uppercase;
}

.title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
  letter-spacing: -0.02em;
  color: #181225;
  margin-bottom: 20px;
}

.highlight {
  background: linear-gradient(135deg, #F1A63E 0%, #F1A63E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #F1A63E;
}

.feature-col-header {
  background-color: #38003c;
  /* Dark Purple */
  color: #fff;
  width: 40%;
  text-align: left;
  border-top-left-radius: 8px;
  /* Optional, depending on if we want rounded corners on the container */
}

.traditional-header {
  background-color: #474747;
  /* Dark Grey */
  color: #fff;
  width: 30%;
}

.gcc-header {
  background-color: #c89216;
  /* Gold */
  color: #fff;
  width: 30%;
  border-top-right-radius: 8px;
  border: 1.784px solid var(--color-yellow-52, #D4AF37);
  border-bottom: none;
  /* Let cells handle the bottom border or collapse? If collapse, this isn't needed usually, but safe to match style */
}

.comparison-table td {
  padding: 18px 20px;
  vertical-align: middle;
  font-size: 16px;
  color: #333;
  border: 1px solid #e0e0e0;
}

.even-row {
  background-color: #e6e4e9;
  /* Light Greyish Purple */
}

.odd-row {
  background-color: #f5f4f7;
  /* Very Light Grey */
}

.feature-name {
  text-align: left;
  color: #333;
}

.feature-name>>>strong {
  font-weight: 700;
  color: #000;
}


/* Icons */
.icon-check-green i {
  color: #28a745;
  font-size: 24px;
}

.icon-cross-red i {
  color: #dc3545;
  /* Or the burnt orange from design #d9534f */
  color: #cf4f36;
  font-size: 24px;
}

.icon-check-gold i {
  color: #c89216;
  font-size: 24px;
}

/* GCC Column Styling Override if needed */
.gcc-cell {
  background-color: rgba(200, 146, 22, 0.15);
  /* Slight gold tint overlay if wanted, or just rely on row colors */
  /* border-left: 2px solid #c89216;
  border-right: 2px solid #c89216; */
  border: 4px solid var(--color-yellow-52, #D4AF37);
}

/* Make GCC column stand out more like a card effect? Design shows just colored header and rows */
/* The design image shows the GCC column fully distinct? 
   No, it looks like just header and row colors. But GCC column has a slight background tint in the image? 
   Let's check image. Yes, the right column seems slightly darker/tinted.
   We applied a class 'gcc-cell' above.
*/
.gcc-cell {
  background-color: rgba(190, 190, 190, 0.3);
  /* Matches the greyish tint in design */
  border: 1px solid #aaa;
}

/* Wait, the design rows alternate colors across the whole row?
   Looking closely: 
   Row 1: Light Grey
   Row 2: White/Very Light
   GCC Column: Darker box? 
   Actually, the GCC column seems to have a semi-transparent overlay making it look distinct.
   Let's stick to simple alternating rows first, with the GCC header being the main highlight.
*/

/* Reset bordering for cleaner look */
.comparison-table td {
  border: 1px solid #ccc;
}

.gcc-cell {
  background-color: #ccc;
  /* Darker grey background for the whole column as per image? No, image has alternating but GCC column is greyish */
  /* Let's try to match the image: Right column is Grey background, valid items are Gold. */
  background-color: #c4c4c4;
}

.even-row .gcc-cell {
  background-color: #b0b0b0;
  /* Darker grey */
}

.odd-row .gcc-cell {
  background-color: #cccccc;
  /* Lighter grey */
}

/* Re-evaluating image colors:
   Left Col: Light Purple/White alternating.
   Middle Col: Same.
   Right Col: Dark Greyish/Beige box? It separates clearly.
*/


/* Let's refine the colors to match image better */
/* Traditional Cells */
.traditional-cell {
  background-color: #f2f2f2;
  border-right: 1px solid #d6d6d6;
}

.even-row .traditional-cell {
  background-color: #e6e6e6;
}

/* GCC Cells */
.gcc-cell {
  background-color: rgba(200, 146, 22, 0.05) !important;
  border: 2px solid #D4AF37 !important;
}

.even-row {
  background-color: #EEECF4;
}

.odd-row {
  background-color: #ffffff;
}

/* Ensure alternating rows in GCC column also respect the tint but keep border */
.even-row .gcc-cell {
  background-color: rgba(200, 146, 22, 0.08) !important;
}

.odd-row .gcc-cell {
  background-color: rgba(255, 255, 255, 1) !important;
}

/* Last cell border fix */
tr:last-child .gcc-cell {
  border-bottom: 2px solid #D4AF37 !important;
}

/* Remove border if using background differentiation */
.comparison-table td {
  border: 1px solid #bbb;
}

@media (max-width : 767px) {

  .comparison-table th {
    padding: 15px 10px;
    font-size: 14px;
    white-space: nowrap;
    /* Keep headers from breaking awkwardly */
  }

  .comparison-table td {
    padding: 10px;
    font-size: 14px;
  }

  .feature-col-header {
    width: auto;
    /* Allow auto width on mobile */
    min-width: 40%;
  }

  .traditional-header,
  .gcc-header {
    width: auto;
    min-width: 25%;
  }

  .title {
    font-size: 26px;
  }

  .faculty-card-item {
    height: none !important;
  }
}

@media (max-width : 575px) {
  .faculty-card-item {
    height: none !important;
  }

  .comparison-table {
    min-width: 400px;
    /* Ensure table doesn't squash too much */
  }

  .comparison-table th {
    font-size: 10px;
  }

}


@media (max-width : 425px) {
  .comparison-table {
    min-width: 350px;
    /* Ensure table doesn't squash too much */
  }

  .comparison-table th {
    font-size: 8px;
  }

  .comparison-table td {
    font-size: 12px;
  }

  .gcc-header img {
    width: 500px;
  }

}

/* Faculty & Mentors Section Styles */
.faculty-mentors-area {
  background-color: #e1e1e1;
  padding: 80px 0;
  border-top: 1px solid #ECECF0;
  overflow: hidden;
}

.gold-tag {
  color: #D5861B;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.faculty-heading {
  font-size: 42px;
  font-weight: 800;
  color: #130922;
  line-height: 1.25;
}

.faculty-desc {
  font-size: 19px;
  color: #555555;
  line-height: 1.6;
}

.btn-purple-meet {
  background-color: #4A154B !important;
  color: #ffffff !important;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 24px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-purple-meet:hover {
  background-color: #320d33 !important;
  transform: translateY(-2px);
}

.faculty-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  padding: 24px 20px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 210px;
  width: 330px;
  position: relative;
  overflow: hidden;
}

.exp-badge {
  position: absolute;
  top: 0;
  right: 20px;
  background-color: #FFAF3D;
  color: #35083D;
  font-size: 10px;
  font-weight: 800;
  padding: 6px 8px;
  width: 34px;
  text-align: center;
  line-height: 1.2;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.faculty-name {
  font-size: 16px;
  font-weight: 700;
  color: #130922;
  margin-bottom: 4px;
}

.faculty-title {
  font-size: 12px;
  color: #6B1B75;
  font-weight: 600;
}

.faculty-img {
  height: 266px;
  width: auto;
  object-fit: contain;
  align-self: flex-end;
  margin-bottom: 0;
}

@media (max-width: 767px) {
  .faculty-info-col {
    margin-bottom: 0px !important;
  }

  .faculty-card {
    margin: 0 auto;
  }

  .section-title {
    margin-bottom: 0px;
  }

  .faculty-scroll-wrapper {
    display: flex !important;
    flex-flow: column wrap !important;
    height: 388px !important;
    gap: 8px 10px !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    margin: 0 -30px !important;
    align-content: flex-start !important;
    justify-content: center !important;
  }

  .faculty-card-item {
    height: 175px !important;
    flex: 0 0 auto !important;
    width: 250px !important;
    scroll-snap-align: center !important;
  }

  .faculty-img {
    height: 100% !important;
    width: 100% !important;
    object-fit: contain !important;
  }

  .left-btn {
    left: -10px !important;
  }

  .right-btn {
    right: -10px !important;
  }

  .faculty-dots-wrapper {
    display: flex !important;
  }

  .scroll-btn {
    display: none !important;
  }
}

@media (max-width: 575px) {
  .faculty-heading {
    font-size: 30px;
  }
}

.faculty-carousel-container {
  position: relative;
  width: 100%;
}

.faculty-scroll-wrapper {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: none;
  border-radius: 42px;
}

.faculty-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.faculty-card-item {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
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
  display: flex;
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
  left: -52px;
}

.right-btn {
  right: -52px;
}

.faculty-dots-wrapper {
  display: none;
  /* Hide on desktop */
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(81, 21, 124, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot-indicator.active {
  background-color: #51157C;
  transform: scale(1.2);
}

@media (max-width: 991px) {
  .left-btn {
    left: -10px;
  }

  .right-btn {
    right: -10px;
  }
}
</style>

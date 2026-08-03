<template>
  <div class="resources-and-news-section ptb-100">
    <div class="container">
      <div class="row g-5">
        <!-- Left Column: Resources -->
        <div class="col-lg-6 col-12 text-start">
          <span class="eyebrow gold-text">RESOURCES</span>
          <h2 class="section-title mt-2 mb-4">Everything You Need To Decide.</h2>

          <!-- Grid of Resource Cards -->
          <div class="resource-grid">
            <div v-for="(card, index) in resourceCards" :key="index" class="resource-card">
              <span class="card-tag">{{ card.tag }}</span>
              <h3 class="card-title-text mt-2">{{ card.title }}</h3>
              <p class="card-desc-text mt-2 mb-0">{{ card.desc }}</p>
            </div>
          </div>

          <NuxtLink to="/resources" class="arrow-link mt-4">
            Visit The Resource Hub <i class="ti ti-arrow-right ms-1"></i>
          </NuxtLink>
        </div>

        <!-- Right Column: Media & Announcements -->
        <div class="col-lg-5 offset-lg-1 col-12 text-start">
          <span class="eyebrow gold-text">MEDIA & ANNOUNCEMENTS</span>
          <h2 class="section-title mt-2 mb-4">GCC School In The News.</h2>

          <!-- Announcements Stack -->
          <div class="announcements-stack">
            <div v-for="(item, index) in announcements" :key="index" class="announcement-item">
              <span class="announcement-badge">ANNOUNCEMENT</span>
              <p class="announcement-text mt-2 mb-0" v-html="item.text"></p>
            </div>
          </div>

          <NuxtLink to="/news" class="arrow-link mt-4">
            View Media <i class="ti ti-arrow-right ms-1"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const resourceCards = [
  {
    tag: "PDF · FOR PARENTS",
    title: "Parent Guide",
    desc: "Trust, fees, safety and process, in plain language."
  },
  {
    tag: "PDF · FOR CANDIDATES",
    title: "Candidate Guide",
    desc: "Choosing a program, preparing for NFET, understanding roles."
  },
  {
    tag: "PDF · EXAM",
    title: "NFET Information Pack",
    desc: "Syllabus, sample questions and dates."
  },
  {
    tag: "PDF · +3",
    title: "Program Brochures",
    desc: "AEIAP, AEUAP and AEUTP in detail."
  }
]

const announcements = [
  {
    text: "NFET 2026 is open, enrolment from <strong>25 February</strong>."
  },
  {
    text: "The first cohort begins <strong>1 July 2026</strong> at DLF Cyber City."
  },
  {
    text: "Three AI-enabled programs are live, <strong>AEIAP, AEUAP and AEUTP</strong>."
  }
]
</script>

<style scoped>
.resources-and-news-section {
  background-color: #ffffff;
  border-top: 1px solid #ECECF0;
}

/* Common Text Elements */
.eyebrow {
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.gold-text {
  color: #D5861B;
}

.section-title {
  display: flex;
  font-size: 36px;
  font-weight: 800;
  color: #130922;
  line-height: 1.25;
}

.arrow-link {
  color: #862E84 !important;
  font-weight: 700;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.arrow-link i {
  transition: transform 0.3s ease;
}

.arrow-link:hover {
  color: #320d33 !important;
}

.arrow-link:hover i {
  transform: translateX(4px);
}

/* Left Column: Resource Cards Grid */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.resource-card {
  border: 1px solid rgba(74, 21, 75, 0.08);
  border-radius: 12px;
  padding: 20px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.resource-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(74, 21, 75, 0.06);
  border-color: rgba(74, 21, 75, 0.15);
}

.card-tag {
  font-size: 9px;
  font-weight: 800;
  color: #E75D60; /* soft brand red */
  letter-spacing: 1px;
}

.card-title-text {
  font-size: 16px;
  font-weight: 700;
  color: #130922;
}

.card-desc-text {
  font-size: 12px;
  color: #666666;
  line-height: 1.5;
}

/* Right Column: Announcements Stack */
.announcements-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.announcement-item {
  background-color: #F3F3F5; /* soft neutral gray bg */
  border-radius: 8px;
  padding: 16px 20px;
  transition: transform 0.3s ease;
}

.announcement-item:hover {
  transform: translateX(4px);
}

.announcement-badge {
  background-color: #E9C77D; /* warm light gold/yellow */
  color: #51157C; /* dark gold/yellow */
  font-size: 9px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 50px;
  letter-spacing: 0.5px;
  display: inline-block;
}

.announcement-text {
  font-size: 13.5px;
  color: #222222;
  line-height: 1.5;
}

/* Responsive adjustments */
@media (max-width: 1199px) {
  .section-title {
    font-size: 32px;
  }
}

@media (max-width: 767px) {
  .resource-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575px) {
  .section-title {
    font-size: 26px;
  }
}
</style>

<template>
  <section class="gcc-campus-video" id="campus-video" aria-labelledby="campus-video-title">
    <div class="gcc-campus-video__inner">

      <div class="gcc-campus-video__content">
        <span class="gcc-campus-video__eyebrow">Campus Tour</span>
        <h2 class="gcc-campus-video__title" id="campus-video-title">
          Step inside GCC School, <em>right in the heart of Cyber City</em>
        </h2>
        <p class="gcc-campus-video__text">
          Take a walk through our campus at Building 9B, DLF Cyber City — where your classroom
          sits a few floors away from the Global Capability Centres and Fortune 500 firms you're
          preparing to join.
        </p>
        <p class="gcc-campus-video__text">
          From modern lecture halls and collaborative study zones to the spaces where industry
          leaders meet our students, see what everyday life looks like when you learn where the
          industry works.
        </p>
        <ul class="gcc-campus-video__points">
          <li v-for="(point, index) in points" :key="index">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>

      <div>
        <div class="gcc-campus-video__media">
          <iframe
            :src="youtubeEmbedUrl"
            title="GCC School campus tour — Building 9B, DLF Cyber City, Gurugram"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        </div>
        <p class="gcc-campus-video__caption">GCC School campus · Building 9B, DLF Cyber City, Gurugram</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const youtubeEmbedUrl = ref('https://www.youtube.com/embed/9RD8abW2_Jg?si=xj_pvxHLJG6V9arP&amp;start=1')

const points = ref([
  'Purpose-built classrooms and study spaces designed for finance and accounting learning',
  "Surrounded by India's largest cluster of GCCs and multinational employers",
  'Student clubs, roundtables and networking events that run on campus every week'
])
</script>

<style scoped>
.gcc-campus-video {
  --cv-bg: #ffffff;
  --cv-text: #1a1a1a;
  --cv-muted: #4c4e53;
  --cv-accent: #FF8C00;  
  --cv-accent-soft: #e8eefb;
  --cv-radius: 16px;

  background: var(--cv-bg);
  color: var(--cv-text);
  font-family: inherit;
  padding: clamp(56px, 8vw, 104px) 0;
}
.gcc-campus-video__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.gcc-campus-video__eyebrow {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cv-accent);
  background: var(--cv-accent-soft);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 18px;
}
.gcc-campus-video__title {
  font-size: clamp(28px, 3.2vw, 40px);
  line-height: 1.15;
  font-weight: 700;
  margin: 0 0 18px;
}
.gcc-campus-video__title em {
  font-style: normal;
  color: var(--cv-accent);
}
.gcc-campus-video__text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--cv-muted);
  margin: 0 0 16px;
}
.gcc-campus-video__points {
  list-style: none;
  padding: 0;
  margin: 24px 0 28px;
  display: grid;
  gap: 12px;
}
.gcc-campus-video__points li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 15px;
  color: var(--cv-muted);
  line-height: 1.5;
}
.gcc-campus-video__points svg {
  flex: 0 0 22px;
  width: 22px; height: 22px;
  margin-top: 2px;
  color: var(--cv-accent);
}
.gcc-campus-video__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--cv-accent);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 26px;
  border-radius: 10px;
  transition: transform .15s ease, box-shadow .15s ease;
}
.gcc-campus-video__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(11, 61, 145, .25);
}
.gcc-campus-video__media {
  position: relative;
  border-radius: var(--cv-radius);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, .18);
  background: #000;
  aspect-ratio: 16 / 9;
}
.gcc-campus-video__media iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border: 0;
}
.gcc-campus-video__caption {
  margin-top: 12px;
  font-size: 14px;
  color: var(--cv-muted);
  text-align: center;
}

@media (max-width: 900px) {
  .gcc-campus-video__inner { grid-template-columns: 1fr; }
  .gcc-campus-video__media { order: -1; } 
}
</style>
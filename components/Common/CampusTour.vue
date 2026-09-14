<template>
  <section
    class="gcc-campus-video"
    id="campus-video"
    aria-labelledby="campus-video-title"
  >
    <div class="gcc-campus-video__glow gcc-campus-video__glow--one"></div>
    <div class="gcc-campus-video__glow gcc-campus-video__glow--two"></div>

<div class="gcc-campus-video__inner">

  <!-- Content -->
  <div class="gcc-campus-video__content">

    <span class="gcc-campus-video__eyebrow">
      <span class="gcc-campus-video__eyebrow-dot"></span>
      Campus Tour
    </span>

    <h2
      class="gcc-campus-video__title"
      id="campus-video-title"
    >
      Step inside GCC School,
      <em>Right in the Heart of Cyber City</em>
    </h2>

    <p class="gcc-campus-video__text">
      Take a walk through our campus at Building 9B, DLF Cyber City — where your classroom
      sits a few floors away from the Global Capability Centres and Fortune 500 firms you're
      preparing to join.
    </p>

    <ul class="gcc-campus-video__points">
      <li v-for="(point, index) in points" :key="index">
        <span class="gcc-campus-video__check">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </span>

        <span>{{ point }}</span>
      </li>
    </ul>

  </div>

  <!-- Video -->
  <div class="gcc-campus-video__visual">

    <div class="gcc-campus-video__media-wrapper">
      <div class="gcc-campus-video__media">
        <iframe
          :src="youtubeEmbedUrl"
          title="GCC School campus tour — Building 9B, DLF Cyber City, Gurugram"
          loading="lazy"
          rel="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <p class="gcc-campus-video__caption">
      <span class="gcc-campus-video__caption-line"></span>
      GCC School campus · Building 9B, DLF Cyber City, Gurugram
      <span class="gcc-campus-video__caption-line"></span>
    </p>

  </div>

</div>

  </section>
</template>

<script setup>
import { ref } from 'vue'

const youtubeEmbedUrl = ref(
  'https://www.youtube.com/embed/9RD8abW2_Jg?si=xj_pvxHLJG6V9arP&start=1&rel=0'
)

const points = ref([
  'Purpose-built classrooms and study spaces designed for finance and accounting learning',
  "Surrounded by India's largest cluster of GCCs and multinational employers",
  'Student clubs, roundtables and networking events that run on campus every week'
])
</script>

<style scoped>

.gcc-campus-video {
  --cv-bg: #ffffff;
  --cv-text: #15171a;
  --cv-muted: #555960;
  --cv-accent: #ff8c00;
  --cv-accent-dark: #e87900;
  --cv-accent-soft: #fff3e4;
  --cv-border: rgba(21, 23, 26, 0.08);
  --cv-radius: 20px;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 82% 18%,
      rgba(255, 140, 0, 0.055),
      transparent 28%
    ),
    linear-gradient(
      180deg,
      #ffffff 0%,
      #fffdfb 100%
    );
  color: var(--cv-text);
  font-family: inherit;
  padding: clamp(72px, 5vw, 120px) 0;
}


.gcc-campus-video__glow {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
}

.gcc-campus-video__glow--one {
  top: -120px;
  right: -80px;
  background: rgba(255, 140, 0, 0.12);
}

.gcc-campus-video__glow--two {
  bottom: -160px;
  left: -120px;
  background: rgba(255, 180, 80, 0.08);
}


.gcc-campus-video__inner {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(42px, 6vw, 88px);
  align-items: center;
}

.gcc-campus-video__content {
  max-width: 540px;
}

.gcc-campus-video__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 13px;
  border: 1px solid rgba(255, 140, 0, 0.16);
  border-radius: 999px;
  background: rgba(255, 140, 0, 0.07);
  color: var(--cv-accent-dark);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.gcc-campus-video__eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cv-accent);
  box-shadow: 0 0 0 4px rgba(255, 140, 0, 0.12);
}

.gcc-campus-video__title {
  margin: 0 0 20px;
  max-width: 600px;
  font-size: 35px;
  line-height: 1.08;
  letter-spacing: -0.035em;
  font-weight: 750;
  color: var(--cv-text);
}

.gcc-campus-video__title em {
  display: inline;
  font-style: normal;
  color: var(--cv-accent);
}

.gcc-campus-video__text {
  margin: 0;
  max-width: 540px;
  color: var(--cv-muted);
  font-size: 15.5px;
  line-height: 1.75;
  letter-spacing: -0.005em;
}

.gcc-campus-video__points {
  list-style: none;
  margin: 30px 0 0;
  padding: 0;
  display: grid;
  gap: 16px;
}

.gcc-campus-video__points li {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  color: #3f4247;
  font-size: 14.5px;
  line-height: 1.55;
}

.gcc-campus-video__check {
  flex: 0 0 25px;
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  margin-top: 1px;
  border-radius: 50%;
  background: var(--cv-accent-soft);
  color: var(--cv-accent);
  border: 1px solid rgba(255, 140, 0, 0.14);
}

.gcc-campus-video__check svg {
  width: 14px;
  height: 14px;
}

.gcc-campus-video__visual {
  min-width: 0;
}

.gcc-campus-video__media-wrapper {
  position: relative;
  padding: 7px;
  border-radius: calc(var(--cv-radius) + 7px);
  background: linear-gradient(
    135deg,
    rgba(255, 140, 0, 0.3),
    rgba(255, 255, 255, 0.9) 45%,
    rgba(255, 140, 0, 0.12)
  );
  box-shadow:
    0 28px 70px rgba(25, 25, 25, 0.13),
    0 8px 25px rgba(25, 25, 25, 0.06);
}

.gcc-campus-video__media-wrapper::before {
  content: "";
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: var(--cv-radius);
  pointer-events: none;
  z-index: 2;
}

.gcc-campus-video__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: var(--cv-radius);
  background: #080808;
}

.gcc-campus-video__media iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.gcc-campus-video__caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  margin: 15px 0 0;
  color: #777a80;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.01em;
  text-align: center;
}

.gcc-campus-video__caption-line {
  width: 22px;
  height: 1px;
  background: rgba(21, 23, 26, 0.15);
}

@media (max-width: 950px) {
  .gcc-campus-video {
    padding: 72px 0;
  }

  .gcc-campus-video__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .gcc-campus-video__content {
    max-width: 720px;
  }

  .gcc-campus-video__title {
    max-width: 700px;
  }

  .gcc-campus-video__text {
    max-width: 680px;
  }

  .gcc-campus-video__visual {
    width: 100%;
  }
}


@media (max-width: 600px) {
  .gcc-campus-video {
    padding: 60px 0;
  }

  .gcc-campus-video__inner {
    width: min(100% - 32px, 1200px);
    gap: 38px;
  }

  .gcc-campus-video__eyebrow {
    margin-bottom: 16px;
  }

  .gcc-campus-video__title {
    font-size: clamp(30px, 9vw, 38px);
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 17px;
  }

  .gcc-campus-video__text {
    font-size: 14.5px;
    line-height: 1.7;
  }

  .gcc-campus-video__points {
    margin-top: 25px;
    gap: 14px;
  }

  .gcc-campus-video__points li {
    font-size: 14px;
  }

  .gcc-campus-video__media-wrapper {
    padding: 5px;
    border-radius: 17px;
  }

  .gcc-campus-video__media {
    border-radius: 13px;
  }

  .gcc-campus-video__media-wrapper::before {
    inset: 10px;
    border-radius: 12px;
  }

  .gcc-campus-video__caption {
    font-size: 11px;
    gap: 7px;
  }

  .gcc-campus-video__caption-line {
    display: none;
  }
}
</style>

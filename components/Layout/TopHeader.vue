<template>
  <div class="top-header-marquee">
    <div class="marquee-track">
      <!-- Group 1 -->
      <div class="marquee-content">
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
      </div>
      <!-- Group 2 (Duplicate copy for seamless infinite looping) -->
      <div class="marquee-content" aria-hidden="true">
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
        <span class="marquee-item"><span class="star">★</span> NFET 2026 · SLOT BOOKING 10 MAR – 15 APR · 250 SEATS</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
};
</script>

<style scoped>
.top-header-marquee {
  background-color: #2A133F; /* matches footer and copyright background theme */
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  height: 38px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.marquee-track {
  display: flex;
  flex-wrap: nowrap;
  animation: marquee-scroll 22s linear infinite;
}

/* Pause marquee on hover for better user interaction if they want to read it closely */
.top-header-marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0 30px;
  white-space: nowrap;
}

.star {
  color: #FFAF3D; /* gold color star */
  margin-right: 12px;
  font-size: 11px;
}

@keyframes marquee-scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
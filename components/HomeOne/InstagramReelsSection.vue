<template>
  <div class="video-testimonials-wrapper">
    <section class="section section-instagram" aria-labelledby="instagram-video-h2">
      <div class="container">
        <div class="section-head">
          <span class="tag tag-accent">In Their Own Words</span>
          <h2 class="section-title" id="instagram-video-h2">Voice Of Policy Maker & Industry Leaders</h2>
          <p class="section-lead">Hear directly from the people whose Shape Industry</p>
        </div>

        <div class="video-grid" ref="videoGridRef" @scroll="handleScroll">
          <div v-for="(reelId, index) in reelIds" :key="index" class="video-card fade-up">
            <div class="video-thumb">
              <iframe :src="`https://www.instagram.com/reel/${reelId}/embed/?hidecaption=true`" width="100%"
                height="100%" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
              <!-- Overlay to absorb touch events for smooth swiping on mobile, opens the reel in a new tab when tapped -->
              <a :href="`https://www.instagram.com/reel/${reelId}/`" target="_blank" class="video-overlay" aria-label="Watch Reel on Instagram"></a>
            </div>
          </div>
        </div>
        <div class="slider-dots">
          <span 
            v-for="(reelId, index) in reelIds" 
            :key="index" 
            class="dot" 
            :class="{ active: index === activeIndex }"
            @click="scrollToCard(index)"
            role="button"
            :aria-label="`Go to slide ${index + 1}`"
          ></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const reelIds = [
  'DZQO4pNBcBg',
  'DYXdh98OZxo',
  'DYwdj3ZuMTp',
  'DYNNiqtut3a',
  'DaPPmbsJxAl'
];

const videoGridRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const handleScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  if (!container) return;

  const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
  const cards = container.querySelectorAll('.video-card');

  let closestIndex = 0;
  let minDiff = Infinity;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const diff = Math.abs(cardCenter - containerCenter);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index;
    }
  });

  activeIndex.value = closestIndex;
};

const scrollToCard = (index: number) => {
  if (!videoGridRef.value) return;
  const cards = videoGridRef.value.querySelectorAll('.video-card');
  if (cards[index]) {
    cards[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
};
</script>

<style scoped>
.section-instagram {
  background-color: #300241;
}

.video-testimonials-wrapper {
  background-color: #ffffff;
  padding-bottom: 40px;
}

.section {
  padding: 80px 0;
  position: relative;
}

.section-instagram .container {
  background-color: white;
  padding: 30px;
  border-radius: 25px;
}

.tag {
  display: inline-block;
  padding: 6px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  border-radius: 4px;
}

.tag-accent {
  background: rgba(241, 166, 62, .14);
  color: #D98E23;
  border: 1px solid rgba(241, 166, 62, .3);
}

.section-head {
  margin-bottom: 44px;
  text-align: center;
}

.slider-dots {
  display: none;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
  letter-spacing: -0.02em;
  color: #181225;
  margin-top: 10px;
  margin-bottom: 0px !important;
}

.section-title .primary {
  color: #51157C;
}

.section-lead {
  font-size: clamp(15px, 1.8vw, 16.5px);
  color: #7A6E8A;
  line-height: 1.7;
  margin: 0px auto 0 !important;
  max-width: 640px;
  font-family: 'Roboto', sans-serif;
}

/* ════════════════ VIDEO TESTIMONIALS ════════════════ */
.video-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
}

.video-card {
  flex: 0 1 calc(20% - 16px);
  min-width: 220px;
  max-width: 250px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(42, 11, 78, 0.08);
  border: 1px solid rgba(81, 21, 124, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.video-thumb {
  position: relative;
  overflow: hidden;
  background: #111;
  width: 100%;
  aspect-ratio: 9 / 16;
}

.video-thumb iframe {
  width: 100%;
  height: calc(100% + 110px);
  /* Make iframe taller than container */
  border: none;
  display: block;
  position: absolute;
  top: -55px;
  /* Shift up to hide Instagram header */
  left: 0;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: transparent;
  display: none;
  cursor: pointer;
}

@media (max-width: 1199px) {
  .video-card {
    flex: 0 1 calc(33.333% - 20px);
  }
}

@media (max-width: 767px) {
  .video-grid {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 16px;
    padding: 15px 30px;
    margin: 32px -30px 0;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .video-grid::-webkit-scrollbar {
    display: none;
  }

  .video-card {
    flex: 0 0 82%;
    max-width: 82%;
    min-width: 82%;
    scroll-snap-align: center;
  }

  .video-overlay {
    display: block;
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 18px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #cfcfcf;
    transition: 0.3s;
    cursor: pointer;
  }

  .dot.active {
    width: 22px;
    border-radius: 20px;
    background: #51157C;
  }
}
</style>

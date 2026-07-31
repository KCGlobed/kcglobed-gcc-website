<template>
  <div class="video-testimonials-wrapper">
    <!-- Parents VIDEO TESTIMONIALS -->
    <section class="section section-parent" aria-labelledby="parents-video-h2">
      <div class="container">
        <div class="section-head">
          <span class="tag tag-accent">In Their Own Words</span>
          <h2 class="section-title" id="parents-video-h2">Parents<span class="primary"> After the Offer Letter</span></h2>
          <p class="section-lead">Hear directly from the people whose careers and families changed in one hiring drive.</p>
        </div>

        <div class="video-grid">
          <div v-for="video in parentVideos" :key="video.youtubeId" class="video-card fade-up">
            <div class="video-thumb">
              <template v-if="activeYoutubeId === video.youtubeId">
                <iframe :src="`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1`"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </template>
              <template v-else>
                <img :src="`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`" :alt="video.alt" loading="lazy">
                <button class="play-btn" aria-label="Play Video" @click="playVideo(video.youtubeId)">
                  ▶
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Students VIDEO TESTIMONIALS -->
    <section class="section section-students" aria-labelledby="students-video-h2" style="padding: 46px 0;">
      <div class="container">
        <div class="section-head">
          <span class="tag tag-accent">In Their Own Words</span>
          <h2 class="section-title" id="students-video-h2">Students <span class="primary">After the Offer Letter</span></h2>
          <p class="section-lead">Hear directly from the people whose careers changed in one hiring drive.</p>
        </div>

        <div class="video-grid">
          <div v-for="video in studentVideos" :key="video.youtubeId" class="video-card fade-up">
            <div class="video-thumb">
              <template v-if="activeYoutubeId === video.youtubeId">
                <iframe :src="`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1`"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </template>
              <template v-else>
                <img :src="`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`" :alt="video.alt" loading="lazy">
                <button class="play-btn" aria-label="Play Video" @click="playVideo(video.youtubeId)">
                  ▶
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeYoutubeId = ref<string | null>(null);

function playVideo(youtubeId: string) {
  activeYoutubeId.value = youtubeId;
}

const parentVideos = [
  { youtubeId: 'IP9qlbTftGs', alt: 'Parent testimonial thumbnail' },
  { youtubeId: 'qnjBI1AN8uU', alt: 'Parent testimonial thumbnail' },
  { youtubeId: '5H6_uvQRGD4', alt: 'Parent testimonial thumbnail' },
  { youtubeId: 's4PPX9_AxW0', alt: 'Parent testimonial thumbnail' },
  { youtubeId: 'wBbDIcQZE6k', alt: 'Parent testimonial thumbnail' },
];

const studentVideos = [
  { youtubeId: 'n83fF8DivYw', alt: 'Student testimonial thumbnail' },
  { youtubeId: 'JDGF3OaamM0', alt: 'Student testimonial thumbnail' },
  { youtubeId: 'CWYzQUQBqI8', alt: 'Student testimonial thumbnail' },
  { youtubeId: 'ID5ZonOLiB0', alt: 'Student testimonial thumbnail' },
  { youtubeId: '1AD_U7WkLIw', alt: 'Student testimonial thumbnail' },
];
</script>

<style scoped>
.section-parent{
  background-color: #300241;
}
.section-students{
  background-color: #51157C;
}
.video-testimonials-wrapper {
  background-color: #ffffff; /* matches lavender theme from mockup */
  /* padding-bottom: 40px; */
}

.section {
  padding: 80px 0;
  position: relative;
}
.section-parent .container,.section-students .container{
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

.section-title {
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -.02em;
  color: #1A1228;
  margin-top: 10px;
}

.section-title .primary {
  color: #51157C;
}

.section-lead {
  font-size: clamp(15px, 1.8vw, 16.5px);
  color: #7A6E8A;
  line-height: 1.7;
  margin: 12px auto 0 !important;
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
  min-width: 180px;
  max-width: 220px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(42, 11, 78, 0.08);
  border: 1px solid rgba(81, 21, 124, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

/* .video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(81, 21, 124, 0.15);
  border-color: rgba(124, 58, 237, 0.3);
} */

.video-thumb {
  aspect-ratio: 9/16;
  position: relative;
  overflow: hidden;
  background: #1b1030;
  width: 100%;
}

.video-thumb video,
.video-thumb img,
.video-thumb iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: none;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: rgba(81, 21, 124, 0.85);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 4px 20px rgba(81, 21, 124, 0.3);
}

.play-btn::before {
  content: '';
  position: absolute;
  inset: -3px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}

.play-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background: #7c3aed;
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.5);
}

.play-btn:hover::before {
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 991px) {
  .video-grid {
    justify-content: center;
  }
  .video-card {
    flex: 0 1 calc(33.333% - 14px);
    min-width: 180px;
  }
}

@media (max-width: 640px) {
  .video-grid {
    justify-content: center;
  }

  .video-card {
    flex: 0 1 260px;
    max-width: 100%;
  }

  .video-thumb {
    aspect-ratio: 9 / 16;
  }
}
</style>

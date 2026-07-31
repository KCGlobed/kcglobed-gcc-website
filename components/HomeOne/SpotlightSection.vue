<template>
  <section class="sec" id="video-insights" aria-labelledby="video-insights-h2">
    <div class="wrap">
      <div class="sec-head">
        <h2 class="sec-title" id="video-insights-h2">GCC School in the <span style="color: #f3a531;">Spotlight</span></h2>
      </div>

      <div class="video-grid-custom">
        <div class="video-top-row">
          <div class="video-item fade-up">
            <iframe src="https://www.youtube.com/embed/XHn1j1NqjdE?si=H7AbGQQAAMW8Vahc" title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>

        <div class="video-bottom-row">
          <div class="video-item fade-up">
            <iframe src="https://www.youtube.com/embed/fSn3V8I1Eqw?si=60soMJcZG32cQZT8" title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="video-item fade-up">
            <iframe src="https://www.youtube.com/embed/ABVgpAj-uEM?si=dNph8e1rGOkBQmiW" title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="video-item fade-up">
            <iframe src="https://www.youtube.com/embed/S8rajo3HsOQ?si=g-wAx6I4ZcqMcl1x" title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="video-item fade-up">
            <iframe src="https://www.youtube.com/embed/2JvtQUkauwY" title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Scoped/clean implementation for Spotlight video items.
</script>

<style scoped>
.sec {
  padding: 80px 0;
  background-color: #51157C;
}

.wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 20px;
}

.sec-head {
  margin-bottom: 28px;
  text-align: center;
}

.sec-title {
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -.02em;
  color: #1A1228;
}

.video-grid-custom {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 20px;
}

.video-top-row {
  width: 100%;
  margin: 0 auto;
}

.video-top-row .video-item {
  aspect-ratio: 16 / 9;
}

.video-bottom-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.video-item {
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  box-shadow: 0 10px 30px rgba(42, 11, 78, 0.08);
}

.video-item iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (min-width: 600px) {
  .video-bottom-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .video-bottom-row {
    grid-template-columns: repeat(4, 1fr);
  }
  .video-top-row .video-item {
    aspect-ratio: 21 / 9;
  }
}
</style>

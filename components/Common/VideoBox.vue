<template>
    <div class="video-box-wrapper">
        <div class="video-section shadow-lg">
            <div class="video-container">
                <video ref="infoVideo" controls muted loop class="w-100 h-100" @play="isVideoPlaying = true"
                    @pause="isVideoPlaying = false" style="object-fit: contain; background: #0b0b1a;">
                    <source :src="videoSrc" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <!-- Thumbnail Mask (visible before play) -->
                <Transition name="fade">
                    <img v-if="!isVideoPlaying" :src="thumbnailSrc" class="video-poster-img" @click="playVideo"
                        :alt="thumbnailAlt" />
                </Transition>

                <!-- Custom Play Overlay (visible before play) -->
                <Transition name="fade">
                    <div v-if="!isVideoPlaying" class="play-overlay" @click="playVideo">
                        <div class="play-btn-circle">
                            <i class="ti ti-player-play-filled"></i>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Decorative elements -->
        <div class="decor-shape shape-1"></div>
        <div class="decor-shape shape-2"></div>
        <div class="decor-shape shape-3"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt?: string;
}

const props = withDefaults(defineProps<Props>(), {
    thumbnailAlt: 'Video Thumbnail',
});

const isVideoPlaying = ref(false);
const infoVideo = ref<HTMLVideoElement | null>(null);

function playVideo() {
    if (infoVideo.value) {
        infoVideo.value.play();
        isVideoPlaying.value = true;
    }
}
</script>

<style scoped>
.video-box-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.video-section {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    max-width: 780px;
    aspect-ratio: 16 / 9;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.video-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.video-container video {
    width: 100%;
    height: 100%;
    display: block;
}

/* Thumbnail — sits at z-index 1, below the play overlay */
.video-poster-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    z-index: 1;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Play Overlay — sits at z-index 2, above the thumbnail */
.play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.28);
}

.play-overlay:hover {
    background: rgba(0, 0, 0, 0.42);
}

.play-overlay:hover .play-btn-circle {
    transform: scale(1.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}

.play-btn-circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: #0b0b1a;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.play-btn-circle:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Decorative shapes */
.decor-shape {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
}

.shape-1 {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.3), transparent 70%);
    top: -30px;
    left: -40px;
}

.shape-2 {
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
    bottom: -20px;
    right: -30px;
}

.shape-3 {
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    top: 50%;
    right: -50px;
}
</style>

<template>
    <div>
        <div class="student-kits-sidebar bg-white p-3 rounded-3 shadow-sm border mb-4">
            <h5 class="mb-4 text-dark fw-bold pb-2" style="border-bottom: 2px solid #7c3aed; display: inline-block;">
                <i class="ti ti-video me-2" style="color: #7c3aed;"></i>Student Kits
            </h5>

            <div class="kits-list d-flex flex-column gap-3">
                <div v-for="(kit, index) in studentKits" :key="index" class="kit-item">
                    <div class="kit-card p-3 rounded bg-light border"
                        style="cursor: pointer; transition: all 0.3s ease;" @click="openMedia(kit)">
                        <div class="d-flex align-items-center gap-3">
                            <div class="icon-wrap text-white rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 40px; height: 40px; background-color: #872980; flex-shrink: 0;">
                                <i v-if="kit.type === 'pdf'" class="ti ti-file-text"></i>
                                <i v-else class="ti ti-player-play-filled"></i>
                            </div>
                            <div>
                                <h6 class="mb-1 text-dark" style="font-size: 14px; font-weight: 600;">{{ kit.title }}
                                </h6>
                                <small class="text-muted d-block" style="font-size: 12px;">
                                    <span v-if="kit.type === 'pdf'">View PDF</span>
                                    <span v-else>Watch Video</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Video Modal -->
        <div v-if="showVideoModal" class="video-modal-overlay" @click="closeVideo">
            <div class="video-modal-content" @click.stop>
                <div class="modal-header d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 text-white">Student Kit Video</h5>
                    <button type="button" class="btn-close btn-close-white" aria-label="Close"
                        @click="closeVideo"></button>
                </div>
                <div class="ratio ratio-16x9 video-container">
                    <iframe :src="currentVideoUrl" title="Video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showVideoModal = ref(false);
const currentVideoUrl = ref("");

// Student Kits configuration (First one is PDF)
const studentKits = [
    { title: "Kit 1: Syllabus & Guide", mediaUrl: "/sample.pdf", type: "pdf" },
    { title: "Kit 2: Basics", mediaUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", type: "video" },
    { title: "Kit 3: Advanced", mediaUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", type: "video" },
    { title: "Kit 4: Expert", mediaUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", type: "video" },
    { title: "Kit 5: Masterclass", mediaUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", type: "video" },
    { title: "Kit 6: Conclusion", mediaUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", type: "video" }
];

const openMedia = (kit: any) => {
    if (kit.type === 'pdf') {
        window.open(kit.mediaUrl, '_blank');
    } else {
        currentVideoUrl.value = kit.mediaUrl;
        showVideoModal.value = true;
    }
};

const closeVideo = () => {
    showVideoModal.value = false;
    currentVideoUrl.value = "";
};
</script>

<style scoped>
.kit-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15) !important;
    border-color: #7c3aed !important;
}

/* ─── Video Modal ─────────────────────────────────────────── */
.video-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    backdrop-filter: blur(4px);
}

.video-modal-content {
    background: #1e1b4b;
    border-radius: 12px;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-container {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
}
</style>

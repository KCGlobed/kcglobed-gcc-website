<template>
    <div class="student-kits-sidebar border-4 border-gray-200 overflow-hidden rounded-4 shadow-sm mb-4">
        <!-- Header Section -->
        <div class="kits-header px-4 py-3 d-flex justify-content-between align-items-center" @click="isOpen = !isOpen"
            style="cursor: pointer;">
            <h6 class="m-0 text-white fw-bold">Student Starter Kit</h6>
            <i class="ti text-white" :class="isOpen ? 'ti-chevron-up' : 'ti-chevron-down'" style="font-size: 20px;"></i>
        </div>

        <div v-show="isOpen" class="kits-content p-4 bg-white">
            <div v-if="isDisabled" class="disabled-overlay"
                title="This section will be enabled after you complete your profile."></div>

            <div class="kits-list d-flex flex-column gap-3" :class="{ 'opacity-50': isDisabled }">
                <div v-for="(kit, index) in studentKits" :key="index" class="kit-item" @click="openMedia(kit)">
                    <!-- Card Structure -->
                    <div class="kit-card p-2 rounded-4 border d-flex align-items-center gap-3">
                        <!-- Thumbnail/Icon Section -->
                        <div class="kit-thumbnail flex-shrink-0 position-relative outline-none">
                            <!-- Thumbnail Image -->
                            <img v-if="kit.thumb" :src="kit.thumb" class="w-100 h-100"
                                style="object-fit: cover; position: absolute; top: 0; left: 0;" alt="thumbnail" />

                            <!-- Overlay (Icons or Play Button) -->
                            <div class="thumb-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                :class="{ 'bg-light': !kit.thumb }">
                                <template v-if="kit.type === 'video'">
                                    <div class="play-btn-circle">
                                        <i class="ti ti-player-play-filled"></i>
                                    </div>
                                </template>
                                <template v-else-if="!kit.thumb">
                                    <img v-if="kit.type === 'pdf'" :src="pdfIcon" alt="PDF" style="width: 28px;" />
                                    <img v-else :src="mockTestIcon" alt="Mock Test" style="width: 28px;" />
                                </template>
                            </div>
                        </div>

                        <!-- Info Section -->
                        <div class="kit-info flex-grow-1">
                            <h6 class="kit-title mb-1">{{ kit.title }}</h6>
                            <div class="kit-meta">
                                <template v-if="kit.type === 'video'">
                                    <div class="meta-item mb-1"><i class="ti ti-clock me-1"></i> {{ kit.duration ||
                                        '5:20 mins' }}</div>
                                    <span class="meta-action watch-video">Watch Video</span>
                                </template>
                                <template v-else-if="kit.type === 'pdf'">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="meta-item pdf-badge">PDF</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <span class="meta-action" :class="getMockTestClass(kit.status ?? 0)">{{
                                        getMockTestLabel(kit.status ?? 0) }}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Media Modal (PDF & Video) -->
    <div v-if="showMediaModal" class="media-modal-overlay" @click="closeMedia">
        <div class="video-modal-content" @click.stop @contextmenu.prevent>
            <!-- Protective Overlay to block right-click/drag on the media directly -->
            <div class="media-protection-overlay"></div>

            <div class="modal-header d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0 text-white">{{ currentKitTitle }}</h5>
                <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="closeMedia"></button>
            </div>

            <div class="media-container ratio ratio-16x9">
                <!-- Video Player -->
                <video v-if="currentMediaType === 'video'" :src="currentMediaUrl" controls controlsList="nodownload"
                    disablePictureInPicture class="w-100 h-100" oncontextmenu="return false;"></video>

                <!-- PDF Viewer -->
                <iframe v-else-if="currentMediaType === 'pdf'"
                    :src="`${currentMediaUrl}#toolbar=0&navpanes=0&scrollbar=0`"
                    class="w-100 h-100 border-0 shadow-sm rounded" style="background: #fff;"></iframe>
            </div>
        </div>
    </div>

    <!-- Mock Test Confirmation Popup -->
    <div v-if="showMockPopup" class="media-modal-overlay" @click="cancelMockTest">
        <div class="mock-popup-content text-center" @click.stop>
            <h4 class="mb-3 fw-bold text-dark">Are you ready to start?</h4>
            <div class="message-box mb-4 text-start p-3 rounded bg-light border">
                <p class="mb-2 text-dark">You have
                    <strong>only one attempt</strong> for this Mock Test.
                </p>
                <p class="mb-0 text-dark">The test duration is
                    30 minutes.
                </p>

            </div>
            <div class="d-flex gap-3 justify-content-center">
                <button style="background-color: #A03F99;color: white;" class="btn px-4 py-2 fw-bold"
                    @click="confirmMockTest"> Start
                    Now</button>
                <button class="btn btn-outline-secondary px-4 py-2" @click="cancelMockTest"> Later</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import pdfIcon from "@/assets/img/pdf.svg";
import mockTestIcon from "@/assets/img/mocktest.png";
import thumb1 from '@/assets/img/thumb1.png'
import thumb2 from '@/assets/img/thumb2.png'
import thumb3 from '@/assets/img/thumb3.png'
import thumb4 from '@/assets/img/thumb4.png'
import thumb5 from '@/assets/img/thumb5.png'
const props = defineProps({
    isDisabled: {
        type: Boolean,
        default: false
    },
    userEmail: {
        type: String,
        default: ""
    },
    mockTestStatus: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['onStatusUpdate']);

const isOpen = ref(true);
const showMediaModal = ref(false);
const showMockPopup = ref(false);
const currentMediaUrl = ref("");
const currentMediaType = ref("");
const currentKitTitle = ref("");
const pendingMockLink = ref("");

// Student Kits configuration
const studentKits = computed(() => [
    { title: "GCC School Journey Overview", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/GCC%20School%20Journey%20Overview.mp4", type: "video", duration: "1:54 mins", thumb: thumb1 },
    { title: "NFET Exam Walkthrough Video", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/MANNA%20SIR%20WEBSITE_FINAL%20100.mp4", type: "video", duration: "7:36 mins", thumb: thumb2 },
    { title: "AEIAP Program Overview", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/Nitis%20Sir%20Website%20Video._final_gcc.mp4", type: "video", duration: "4:30 mins", thumb: thumb4 },
    { title: "British Council - English for Work", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/British%20Council%20%E2%80%93%20English%20for%20Work%20Course%20Overview.mp4", type: "video", duration: "1:23 mins", thumb: thumb5 },
    { title: "AON - Test Platform Walkthrough", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/AON%20%E2%80%93%20Test%20Platform%20Walkthrough.mp4", type: "video", duration: "2:36 mins", thumb: thumb3 },
    { title: "Best Interview Questions", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/Best%20Interview%20Questions.pdf", type: "pdf" },
    {
        title: "Mock Test",
        link: "https://cocubes.in/gccschool-nfet-mock",
        type: "mock",
        status: props.mockTestStatus,
        disabled: props.mockTestStatus === 1 || props.mockTestStatus === 2
    }
]);

const getMockTestLabel = (status: number) => {
    if (status === 1) return "In Progress";
    if (status === 2) return "Completed";
    return "Start Test";
};

const getMockTestClass = (status: number) => {
    if (status === 1) return "status-in-progress";
    if (status === 2) return "status-completed";
    return "start-test";
};

const openMedia = (kit: any) => {
    if (props.isDisabled || kit.disabled) return;

    if (kit.type === 'link' || kit.link) {
        pendingMockLink.value = kit.link;
        showMockPopup.value = true;
        return;
    }

    currentMediaUrl.value = kit.mediaUrl;
    currentMediaType.value = kit.type;
    currentKitTitle.value = kit.title;
    showMediaModal.value = true;

    // Add event listeners to block download shortcuts
    window.addEventListener('keydown', handleGlobalKeydown);
};

const confirmMockTest = async () => {
    if (!props.userEmail) {
        // Fallback or warning if email is missing
        console.warn("User email missing for mock test status update");
    }

    // Call API to notify about mock test start
    try {
        const config = useRuntimeConfig();
        const { getAccessToken } = useAuth();
        const token = getAccessToken();

        await $fetch(`${config.public.apiBase}/api/students/start_mock_test_status/`, {
            method: "POST",
            body: {
                email: props.userEmail,
                status: true
            },
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        emit('onStatusUpdate');
    } catch (err) {
        console.error("Failed to update mock test status:", err);
    }

    if (pendingMockLink.value) {
        window.open(pendingMockLink.value, '_blank');
    }
    showMockPopup.value = false;
    pendingMockLink.value = "";
};

const cancelMockTest = () => {
    showMockPopup.value = false;
    pendingMockLink.value = "";
};

const closeMedia = () => {
    showMediaModal.value = false;
    currentMediaUrl.value = "";
    currentMediaType.value = "";
    currentKitTitle.value = "";
    window.removeEventListener('keydown', handleGlobalKeydown);
};

const handleGlobalKeydown = (e: KeyboardEvent) => {
    // Block: Ctrl+S (Save), Ctrl+P (Print), Ctrl+U (Source), F12 (DevTools), Ctrl+Shift+I/C/J
    if (
        (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))
    ) {
        e.preventDefault();
        return false;
    }
};
</script>

<style scoped>
/* ─── Premium Redesign Styles ────────────────────────────── */
.student-kits-sidebar {
    background-color: white;
    padding: 3px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.kits-header {
    background: #A03F99;
    /* Premium Purple */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: background 0.3s ease
}


.kit-card {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #ffffff;
    border: 1px solid #F1D1EE !important;
}

.kit-card:hover {
    border-color: #E2E8F0 !important;
    background: #F8FAFC;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.kit-thumbnail {
    width: 100px;
    height: 65px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    border: 2px solid #EDE9FE;
    background-color: #F5F3FF;
}

.thumb-placeholder {
    width: 100%;
    height: 100%;
}

.play-btn-circle {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #A855F7;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.play-btn-circle i {
    font-size: 14px;
    margin-left: 2px;
}

.kit-title {
    font-size: 14px;
    font-weight: 700;
    color: #334155;
    line-height: 1.4;
}

.kit-meta {
    font-size: 12px;
}

.meta-item {
    color: #64748B;
    display: flex;
    align-items: center;
}

.pdf-badge {
    background: #F1F5F9;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
    color: #475569;
}

.meta-action {
    font-weight: 700;
}

.watch-video {
    background: #FFF2F2;
    color: #EB6466;
    padding: 2px 10px;
    border-radius: 50px;
    font-size: 11px;
}

.start-test {
    color: #A03F99;
}

.status-in-progress {
    color: #D97706;
}

.status-completed {
    color: #16A34A;
}

.disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(255, 255, 255, 0.05);
    cursor: not-allowed;
}

/* ─── Media Modal ─────────────────────────────────────────── */
.media-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
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
    max-width: 900px;
    padding: 20px;
    position: relative;
}

.media-container {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
}

.mock-popup-content {
    background: #ffffff;
    border-radius: 16px;
    width: 100%;
    max-width: 450px;
    padding: 30px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.btn-primary {
    background-color: #8B5CF6;
    border-color: #8B5CF6;
}

.btn-primary:hover {
    background-color: #7C3AED;
    border-color: #7C3AED;
}
</style>

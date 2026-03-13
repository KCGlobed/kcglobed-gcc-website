<template>
    <div>
        <div class="student-kits-sidebar bg-white p-3 rounded-3 shadow-sm border mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3" @click="isOpen = !isOpen"
                style="cursor: pointer;">
                <h5 class="m-0 text-dark fw-bold pb-1" style="border-bottom: 2px solid #7c3aed; display: inline-block;">
                    Student Starter Kit
                </h5>
                <i class="ti" :class="isOpen ? 'ti-chevron-up' : 'ti-chevron-down'"
                    style="color: #475569; font-size: 18px;"></i>
            </div>

            <div v-show="isOpen" style="position: relative;">
                <div v-if="isDisabled" class="disabled-overlay"
                    title="This section will be enabled after you complete your profile."></div>
                <div class="kits-list d-flex flex-column gap-3" :class="{ 'opacity-50': isDisabled }">
                    <div v-for="(kit, index) in studentKits" :key="index" class="kit-item">
                        <div class="kit-card p-3 rounded bg-light border"
                            style="cursor: pointer; transition: all 0.3s ease;" @click="openMedia(kit)">
                            <div class="d-flex align-items-center gap-3">
                                <div class="icon-wrap text-white rounded-circle d-flex align-items-center justify-content-center"
                                    :style="{ width: '40px', height: '40px', backgroundColor: kit.disabled ? '#94a3b8' : '#872980', flexShrink: 0 }">
                                    <i v-if="kit.type === 'pdf'" class="ti ti-file-text"></i>
                                    <i v-else-if="kit.type === 'video'" class="ti ti-player-play-filled"></i>
                                    <i v-else class="ti ti-external-link"></i>
                                </div>
                                <div :class="{ 'opacity-75': kit.disabled }">
                                    <h6 class="mb-1" :style="{ fontSize: '14px', fontWeight: '600', color: kit.disabled ? '#64748b' : '#212529' }">
                                        {{ kit.title }}
                                    </h6>
                                    <small class="d-block" style="font-size: 12px;" :class="kit.disabled ? 'text-muted' : 'text-primary'">
                                        <span v-if="kit.type === 'pdf'">View PDF</span>
                                        <span v-else-if="kit.type === 'video'">Watch Video</span>
                                        <span v-else>{{ getMockTestLabel(kit.status || 0) }}</span>
                                    </small>
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
                    <button type="button" class="btn-close btn-close-white" aria-label="Close"
                        @click="closeMedia"></button>
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
                    <button class="btn btn-primary px-4 py-2 fw-bold" @click="confirmMockTest"> Start Now</button>
                    <button class="btn btn-outline-secondary px-4 py-2" @click="cancelMockTest"> Later</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

import { computed } from 'vue';

// Student Kits configuration
const studentKits = computed(() => [
    { title: "GCC School Journey Overview", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/GCC%20School%20Journey%20Overview.mp4", type: "video" },
    { title: "NFET Exam Walkthrough Video", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/NFET%20Exam%20Walkthrough%20Video.mp4", type: "video" },
    { title: "AEIAP Program Overview", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/AEIAP%20Program%20Overview.mp4", type: "video" },
    { title: "British Council - English for Work Course Overview", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/British%20Council%20%E2%80%93%20English%20for%20Work%20Course%20Overview.mp4", type: "video" },
    { title: "AON - Test Platform Walkthrough", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/AON%20%E2%80%93%20Test%20Platform%20Walkthrough.mp4", type: "video" },
    { title: "Best Interview Questions", mediaUrl: "https://storage.googleapis.com/gcc_static_files_backend/static/videos/Best%20Interview%20Questions.pdf", type: "pdf" },
    {
        title: "Mock Test",
        link: "https://cocubes.in/gccschool-nfet-mock",
        type: "link",
        status: props.mockTestStatus,
        disabled: props.mockTestStatus === 1 || props.mockTestStatus === 2
    }
]);

const getMockTestLabel = (status: number) => {
    if (status === 1) return "In Progress";
    if (status === 2) return "Completed";
    return "Start Test";
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

        // Emit update to refresh status in parent
        emit('onStatusUpdate');
    } catch (err) {
        console.error("Failed to update mock test status:", err);
        // We still proceed to open the link even if status update fails
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
.kit-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15) !important;
    border-color: #7c3aed !important;
}

/* ─── Video Modal ─────────────────────────────────────────── */
.disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0);
    /* Ensure it's a solid block for clicks */
}

.media-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    backdrop-filter: none !important;
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

.media-container {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.media-protection-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    pointer-events: none;
    /* Allows clicks to pass through but helps block some interactions depending on implementation */
    /* Note: We use @contextmenu.prevent on the container instead for better compatibility */
    /* Note: We use @contextmenu.prevent on the container instead for better compatibility */
}

.mock-popup-content {
    background: #ffffff;
    border-radius: 16px;
    width: 100%;
    max-width: 450px;
    padding: 30px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    border: none;
}

.message-box p {
    font-size: 14px;
    line-height: 1.5;
}

.btn-primary {
    background-color: #872980;
    border-color: #872980;
}

.btn-primary:hover {
    background-color: #72226c;
    border-color: #72226c;
}
</style>

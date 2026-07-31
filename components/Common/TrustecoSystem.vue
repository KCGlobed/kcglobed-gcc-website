<template>
    <div class="trus-eco-sy">
        <div class="container">
            <div class="row">
                <div class="header-v2 mb-3">
                    <div>
                        <h2 class="title">Trusted Eco System</h2>
                    </div>
                </div>
                <div class="organistion-grid">
                    <div v-for="(item, index) in ecosystemImages" :key="index" class="org-card">
                        <img :src="item.image" alt="Organization Logo" class="org-logo" loading="lazy" decoding="async">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const ecosystemImages = [
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049956.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049950%201.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049941.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049942.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049947.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049949.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049952.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049939.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049943.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/7qrb04.tif%201.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049944.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049951.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049953.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049955%20(1).png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049945.png" },
    { image: "https://storage.googleapis.com/static_files_backend/media/images/Group%2049954.png" },
];
</script>

<style scoped>
.trus-eco-sy {
    padding: 50px 0;
    background-color: rgba(229, 218, 236, 0.41);
}

/* Header Styling */
.header-v2 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 5px;
    letter-spacing: -0.1px;
    /* text-transform: uppercase; */
}

.highlight {
    color: #F1A63E;
}

/* Organisation Grid Styling */
.organistion-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 30px;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
}

.org-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
}

.org-logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: grayscale(0.2);
    transition: all 0.3s ease;
}

.org-card:hover .org-logo {
    filter: grayscale(0);
}

@media (max-width: 991px) {
    .title {
        text-align: center;
    }

    .organistion-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 575px) {
    .org-card {
        height: 73px;
        padding: 5px;
    }

    .organistion-grid {
        gap: 0px;
    }
}
</style>
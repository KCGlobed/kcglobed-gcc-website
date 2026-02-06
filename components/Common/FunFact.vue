<template>
    <div class="fun-fact-warp ptb-100">
        <div class="container-fluid p-0">
            <div class="section-title text-center">
                <h2 class="reveal2">
                    <span class="highlight">200+</span> GLOBAL HIRING PARTNERS!
                </h2>
                <p class="max-600 mx-auto">Indulge in Career Accelerating Programs and Placement Drives offered by KC
                    GlobEd!</p>
                <div class="sub-highlight">Get hired by leading companies across diverse industries.</div>
            </div>
            <div class="marquee-wrapper">
                <!-- First Row: Moves to Right -->
                <div class="marquee-row scroll-right">
                    <!-- Original Set -->
                    <div class="fun-fact-item" v-for="funfact in rowOne" :key="funfact.id">
                        <div class="fun-fact-card">
                            <div class="icon">
                                <div class="icon style">
                                    <img :src="funfact.icon" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Duplicate Set for Loop -->
                    <div class="fun-fact-item" v-for="funfact in rowOne" :key="'dup-' + funfact.id">
                        <div class="fun-fact-card">
                            <div class="icon">
                                <div class="icon style">
                                    <img :src="funfact.icon" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Second Row: Moves to Left -->
                <div class="marquee-row scroll-left mt-4">
                    <!-- Original Set -->
                    <div class="fun-fact-item" v-for="funfact in rowTwo" :key="funfact.id">
                        <div class="fun-fact-card">
                            <div class="icon">
                                <div class="icon style">
                                    <img :src="funfact.icon" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Duplicate Set for Loop -->
                    <div class="fun-fact-item" v-for="funfact in rowTwo" :key="'dup-' + funfact.id">
                        <div class="fun-fact-card">
                            <div class="icon">
                                <div class="icon style">
                                    <img :src="funfact.icon" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "FunFact",
    setup() {
        // Dynamically import all PNG images from the specified directory
        const imagesGlob = import.meta.glob("~/assets/TBD logo/TBD logo/*.{png,jpg,jpeg,svg}", {
            eager: true,
        });

        const images = Object.values(imagesGlob).map((mod: any) => mod.default);


        // Generate the funfacts array based on the images
        const funfacts = images.map((img, index) => {
            return {
                id: index + 1,
                icon: img,
            };
        });

        return {
            funfacts,
        };
    },
    computed: {
        rowOne() {
            // First half of the items
            const mid = Math.ceil(this.funfacts.length / 2);
            return this.funfacts.slice(0, mid);
        },
        rowTwo() {
            // Second half of the items
            const mid = Math.ceil(this.funfacts.length / 2);
            return this.funfacts.slice(mid);
        },
    },
});
</script>

<style scoped>
.fun-fact-warp {
    background-color: #f8fafc;
    padding-bottom: 150px;
}

.section-title h2 {
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 16px;
    line-height: 1.1;
}

.section-title .highlight {
    color: #d97706;
    /* More vibrant gold */
}

.section-title p {
    color: #475569;
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 500;
}

.section-title .sub-highlight {
    color: #7c3aed;
    /* More vibrant purple */
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
}

.max-600 {
    max-width: 850px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.marquee-wrapper {
    overflow: hidden;
    width: 100%;
    margin-top: 60px;
}

.marquee-row {
    display: flex;
    gap: 30px;
    width: max-content;
}

.fun-fact-item {
    flex: 0 0 auto;
}

.fun-fact-card {
    width: 200px;
    height: 120px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    border-radius: 20px;
    border: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.fun-fact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border-color: #e2e8f0;
}

.fun-fact-card .icon {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fun-fact-card .icon img {
    max-width: 140px;
    max-height: 65px;
    width: auto;
    height: auto;
    object-fit: contain;
}

/* Scroll Right Animation (Row 1) */
.scroll-right {
    animation: scrollRight 40s linear infinite;
}

/* Scroll Left Animation (Row 2) */
.scroll-left {
    animation: scrollLeft 40s linear infinite;
}

@keyframes scrollRight {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes scrollLeft {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

/* Pause on hover optional */
.marquee-wrapper:hover .marquee-row {
    animation-play-state: paused;
}
</style>
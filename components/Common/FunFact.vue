<template>
    <div class="fun-fact-warp ptb-100">
        <div class="container-fluid p-0">
            <div class="section-title">
                <h2 class="reveal2">Backed by Industry Titans</h2>
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
.marquee-wrapper {
    overflow: hidden;
    width: 100%;
    margin-top: 30px;
}

.marquee-row {
    display: flex;
    gap: 24px;
    width: max-content;
}

.fun-fact-item {
    flex: 0 0 auto;
}

.fun-fact-card {
    width: fit-content;
    height: 130px;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
    border-radius: 30px;
    border: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fun-fact-card .icon {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fun-fact-card .icon img {
    max-width: 100px;
    max-height: 55px;
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
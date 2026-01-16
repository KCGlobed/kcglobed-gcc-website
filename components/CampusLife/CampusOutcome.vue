<template>
    <div class="campus-outcome-section py-5">
        <div class="container-fluid px-md-5">
            <div class="row g-4">
                <!-- Loop through columns -->
                <div class="col-lg-4 col-md-6 col-12" v-for="(column, colIndex) in columns" :key="colIndex">
                    <div class="d-flex flex-column gap-4">
                        <!-- Loop through items in the column -->
                        <div class="outcome-card shadow-sm" v-for="(item, itemIndex) in column" :key="item.id"
                            :class="{ 'reverse-layout': itemIndex % 2 !== 0 }">
                            <div class="card-content d-flex h-100">
                                <!-- Image Section -->
                                <div class="image-wrapper">
                                    <img :src="item.image" :alt="item.title"
                                        class="img-fluid h-100 w-100 object-fit-cover">
                                    <div class="overlay-icon" v-if="item.hasIcon">
                                        <span>V</span>
                                    </div>
                                </div>

                                <!-- Text Section -->
                                <div class="text-wrapper p-4 d-flex flex-column justify-content-center">
                                    <h2 class="item-number mb-2">{{ item.number }}</h2>
                                    <h3 class="item-title mb-3">{{ item.title }}</h3>
                                    <p class="item-desc mb-0">{{ item.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import image1 from '@/assets/img/campusoutcome/1.png';
import image2 from '@/assets/img/campusoutcome/2.png';
import image3 from '@/assets/img/campusoutcome/3.png';
import image4 from '@/assets/img/campusoutcome/4.png';
import image5 from '@/assets/img/campusoutcome/5.png';
import image6 from '@/assets/img/campusoutcome/6.png';
import image7 from '@/assets/img/campusoutcome/7.png';
import image8 from '@/assets/img/campusoutcome/8.png';
import image9 from '@/assets/img/campusoutcome/9.png';
import image10 from '@/assets/img/campusoutcome/10.png';
import image11 from '@/assets/img/campusoutcome/11.png';


const items = [
    {
        id: 1,
        number: '01',
        title: 'Corporate Classroom',
        description: 'Professional learning spaces mimicking real-world corporate environments to prepare students for the industry.',
        image: image1,
    },
    {
        id: 2,
        number: '02',
        title: 'Corporate Board Room(Training room)',
        description: 'Executive-style meeting rooms equipped for high-level trainings, strategic discussions, and mock presentations.',
        image: image2,
    },
    {
        id: 3,
        number: '03',
        title: 'Open Library',
        description: 'Quiet study zone with 24/7 digital access and a vast collection of resources for intensive research.',
        image: image3,
    },
    {
        id: 4,
        number: '04',
        title: 'Workstation Zone',
        description: 'Hands-on collaborative workspace specifically designed for technical projects and real-world practice.',
        image: image4,
    },
    {
        id: 5,
        number: '05',
        title: 'Cafeteria / Recreation',
        description: 'Spacious relaxation hub and indoor activity space designed for student unwinding and social interaction.',
        image: image5,
    },
    {
        id: 6,
        number: '06',
        title: 'Exam Center',
        description: 'A highly secure digital testing facility equipped with the latest technology for Computer-Based Training exams.',
        image: image6,
    },
    {
        id: 7,
        number: '07',
        title: 'Media Studio',
        description: 'State-of-the-art setup for professional recordings, podcasts, and digital content presentations.',
        image: image8,
    },
    {
        id: 8,
        number: '08',
        title: 'Auditorium / Interior Hall',
        description: 'Grand venue for mega-events, keynote talks, cultural festivals, and large-scale orientations.',
        image: image9,
    },
    {
        id: 9,
        number: '09',
        title: 'Industry Leaders\' Talks',
        description: 'Regular sessions featuring industry veterans and senior professionals sharing career insights.',
        image: image10,
    },
    {
        id: 10,
        number: '10',
        title: 'Hiring Drives',
        description: 'Dedicated on-campus recruitment events with top Global Capability Centers (GCCs) and Fortune 500 companies.',
        image: image11,
        hasIcon: true
    },
    {
        id: 11,
        number: '11',
        title: 'GCC Shuttle Service',
        description: 'Easy and efficient transport connectivity across Cyber City for students and faculty members.',
        image: image7,
    },
    {
        id: 12,
        number: '12',
        title: 'Prime Campus Location',
        description: 'Strategically located with quick access from the international airport, metro stations, and main railway lines.',
        image: image11,
        hasIcon: true
    },
];

const columns = computed(() => {
    const col1 = [items[0], items[1], items[6], items[7]];
    const col2 = [items[2], items[3], items[8], items[9]];
    const col3 = [items[4], items[5], items[10], items[11]];
    return [col1, col2, col3];
});
</script>

<style scoped lang="scss">
.campus-outcome-section {
    background-color: #fff;
    font-family: 'Outfit', sans-serif;
}

.outcome-card {
    background: #FEF9F5;
    border: 1px solid #F3E5F5;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    height: 220px; // Compact height
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(108, 43, 136, 0.12);
        border-color: #D6BCFA;
    }

    .card-content {
        flex-direction: row;
        height: 100%;

        .image-wrapper {
            width: 45%;
            height: 100%;
            position: relative;
            overflow: hidden;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                transition: transform 0.6s ease;
            }

            &:hover img {
                transform: scale(1.05);
            }
        }

        .text-wrapper {
            width: 55%;
            height: 100%;
            padding: 1rem 1.25rem; // Compact padding
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    &.reverse-layout {
        .card-content {
            flex-direction: row-reverse;
        }
    }
}

.item-number {
    font-size: 1.8rem; // Smaller compact number
    font-weight: 800;
    color: #6C2B88;
    background: linear-gradient(45deg, #6C2B88, #FF6B6B);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin-bottom: 0.25rem;
    line-height: 1;
}

.item-title {
    font-size: 1rem; // Compact title
    font-weight: 700;
    color: #2c3e50;
    line-height: 1.3;
    letter-spacing: -0.3px;
    margin-bottom: 0.5rem;

    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.item-desc {
    font-size: 0.75rem; // Small readable text
    color: #666;
    line-height: 1.4;
    font-weight: 400;

    display: -webkit-box;
    line-clamp: 4; // Approx 4 lines visible
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.overlay-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.95);
    width: 40px; // Smaller icon
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    color: #6C2B88;
    font-weight: bold;
    z-index: 2;

    span {
        font-size: 1.1rem;
    }
}

@media (max-width: 991px) {
    .outcome-card {
        height: 200px; // Even smaller for tablets

        .text-wrapper {
            padding: 1rem;
        }
    }

    .item-number {
        font-size: 1.5rem;
    }

    .item-title {
        font-size: 0.9rem;
    }
}

@media (max-width: 768px) {
    .outcome-card {
        height: auto;
        min-height: auto;

        .card-content {
            flex-direction: column !important;

            .image-wrapper {
                width: 100%;
                height: 180px; // Standard mobile image height
            }

            .text-wrapper {
                width: 100%;
                padding: 1.5rem !important;
                height: auto;
            }
        }
    }

    .item-desc {
        line-clamp: unset;
        -webkit-line-clamp: unset;
    }
}
</style>

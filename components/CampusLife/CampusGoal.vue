<template>
    <div>
        <!-- Yellow dots decoration - hidden on mobile -->
        <div class="d-none d-lg-flex align-items-center justify-content-start">
            <img :src="yellowSquareDots" alt="" class="position-absolute dots-yellow" />
        </div>

        <!-- Main content -->
        <div class="bg-white d-flex align-items-center flex-column goals-section">
            <div class="d-flex flex-column align-items-center mt-section px-3">
                <p class="heading-primary text-center fw-bold text-secondary">
                    COMMITTED TO SUSTAINABLE DEVELOPMENT GOALS
                </p>
                <p class="heading-secondary text-center fw-semibold mt-3 text-dark-gray">
                    Driving Sustainability Through Education and Employment
                </p>
            </div>

            <!-- Goals Grid -->
            <div class="goals-grid px-2 px-lg-4 mt-4 mt-lg-5 mb-4 mb-lg-5 mx-3 mx-lg-5">
                <div v-for="(image, index) in goals" :key="index" class="goal-item"
                    @mouseenter="handleHover(index, true)" @mouseleave="handleHover(index, false)"
                    :class="{ 'goal-hover': hoveredIndex === index }">
                    <img class="goal-image" :src="`${bucketURL}${image}`" :alt="`Goal ${index + 1}`" />
                </div>
            </div>
        </div>

        <!-- Purple dots decoration - hidden on mobile -->
        <div class="d-none d-lg-flex align-items-center justify-content-end">
            <img :src="purpleSquareDots" alt="" class="position-absolute dots-purple" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'AUGoalsSection',
    setup() {
        const hoveredIndex = ref<number | null>(null);

        // Replace these with your actual image imports or paths
        const bucketURL = 'https://storage.googleapis.com/static_files_backend'; // Update with your actual bucket URL
        const yellowSquareDots = '/assets/images/yellow_square_dots.svg';
        const purpleSquareDots = '/assets/images/purple_square_dots.svg';

        const goals = [
            '/media/landing/goal1.svg',
            '/media/landing/goal2.svg',
            '/media/landing/goal3.svg',
            '/media/landing/goal4.svg',
            '/media/landing/goal5.svg',
            '/media/landing/goal6.svg',
            '/media/landing/goal7.svg',
            '/media/landing/goal8.svg',
            '/media/landing/goal9.jpg',
            '/media/landing/goal10.svg',
            '/media/landing/goal11.svg',
            '/media/landing/goal14.svg',
            '/media/landing/goal13.svg',
            '/media/landing/goal-1.svg',
            '/media/landing/goal15.svg',
            '/media/landing/goal16.svg',
            '/media/landing/goal17.svg',
            '/media/landing/goal18.svg',
        ];

        const handleHover = (index: number, isHovering: boolean) => {
            hoveredIndex.value = isHovering ? index : null;
        };

        return {
            goals,
            bucketURL,
            yellowSquareDots,
            purpleSquareDots,
            hoveredIndex,
            handleHover,
        };
    },
});
</script>

<style scoped>
.goals-section {
    margin: auto;
    max-width: 1140px;
    margin-bottom: 2.5rem;
}

.mt-section {
    margin-top: 4vh;
}

.heading-primary {
    font-size: 1.25rem;
    color: #6c757d;
}

.heading-secondary {
    font-size: 1.5rem;
    color: #3a3b3b;
}

.text-dark-gray {
    color: #3b3b3b;
}

/* Goals Grid */
.goals-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
}

.goal-item {
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.goal-item:active {
    transform: scale(0.9);
}

.goal-hover {
    transform: scale(1.1);
}

.goal-image {
    height: auto;
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5rem;
}

/* Decorative dots */
.dots-yellow {
    height: 4rem;
    margin-top: 8rem;
    margin-left: 2rem;
}

.dots-purple {
    height: 3rem;
    margin-bottom: 10rem;
    margin-right: 2rem;
}

/* Tablet breakpoint (md) */
@media (min-width: 768px) {
    .goals-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}

/* Desktop breakpoint (lg) */
@media (min-width: 992px) {
    .heading-primary {
        font-size: 1.875rem;
    }

    .heading-secondary {
        font-size: 1.875rem;
    }

    .goals-section {
        margin-bottom: 2.5rem;
    }

    .goals-grid {
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;
        margin-top: 2.5rem;
        margin-bottom: 5rem;
    }

    .goal-image {
        height: 9rem;
        width: 9rem;
        margin-bottom: 0;
    }
}

/* Extra large breakpoint (xl) */
@media (min-width: 1200px) {
    .goals-grid {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>
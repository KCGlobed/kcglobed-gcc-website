<template>
    <div class="news-area">
        <div class="container">
            <div class="section-header text-center" data-aos="fade-up">
                <h2 class="section-title">AS FEATURED IN <span class="highlight">LEADING MEDIA</span></h2>
            </div>

            <div class="news-slider-wrapper" data-aos="fade-up" data-aos-delay="100">
                <Swiper :slides-per-view="1" :space-between="24" :loop="true"
                    :autoplay="{ delay: 4000, disableOnInteraction: false }"
                    :pagination="{ clickable: true, el: paginationRef }" :breakpoints="{
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                    }" :modules="[SwiperAutoplay, SwiperPagination]" class="news-swiper" @swiper="onSwiper">
                    <SwiperSlide v-for="news in newsList" :key="news.id">
                        <CommonNewsItemCard :news="news" />
                    </SwiperSlide>
                </Swiper>
                <div ref="paginationRef" class="news-pagination"></div>

                <div class="text-center mt-5">
                    <NuxtLink to="/news" class="view-all-btn">
                        View All News
                        <i class="ri-arrow-right-line"></i>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paginationRef = ref(null)

function onSwiper(swiper: any) {
    swiper.params.pagination.el = paginationRef.value
    swiper.pagination.init()
    swiper.pagination.render()
    swiper.pagination.update()
}

const newsList = [
    {
        id: 1,
        title: 'GCC School and KC GlobEd Host Round Table Meeting on Impact of AI on GCCs - Building the Future Workforce',
        excerpt: 'GCC School and KC GlobEd successfully organised a dynamic Round Table meeting on the theme Impact of AI on GCCs - Building the Future Workforce at Welcome hotel by ITC Hotels, Delhi-Gurugram Highway. The session witnessed participation from senior leaders of reputed organisations...',
        date: 'Jan 29, 2026',
        category: 'Business & Finance',
        image: 'https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/download.png',
        url: 'https://www.ptinews.com/press-release/gcc-school-and-kc-globed-host-round-table-meeting-on-impact-of-ai-on-gccs-building-the-future-workforce/3323548'
    },
    {
        id: 2,
        title: 'Building the Future Workforce: AI’s Impact on GCCs – A Round Table by GCC School & KC GlobEd',
        excerpt: ' GCC School and KC GlobEd successfully organised a dynamic Round Table meeting on the theme “Impact of AI on GCCs – Building the Future Workforce” at Welcome hotel by ITC Hotels, Delhi-Gurugram Highway....',
        date: 'Nov 14, 2025',
        category: 'Business & Finance',
        image: 'https://storage.googleapis.com/static_files_backend/media/images/image%20(1).jpg',
        url: 'https://english.indianews.in/india-news/gcc-school-and-kc-globed-host-round-table-meeting-on-impact-of-ai-on-gccs-building-the-future-workforce-848368/'
    },

    {
        id: 3,
        title: 'Tech4ed 2025 Sets New Benchmark In Global Learning With Strategic Collaborations And Knowledge Exchange',
        excerpt: 'The 2nd edition of Tech4Ed International Conference 2025, organised under the aegis of the Association of Indian Universities (AIU) and KC GlobEd, concluded on an inspiring note at The Park, New Delhi. The event brought together a distinguished gathering of academic leaders...',
        date: 'Nov 14, 2025',
        category: 'Tech4ed',
        image: 'https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/F_92102image_story.jpeg',
        url: 'https://menafn.com/1110349919/Tech4ed-2025-Sets-New-Benchmark-In-Global-Learning-With-Strategic-Collaborations-And-Knowledge-Exchange'
    },

]
</script>

<style scoped>
/* ========== Section Wrapper ========== */
.news-area {
    background: linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%);
    padding: 80px 0 100px;
}

/* ========== Section Header ========== */
.section-header {
    margin-bottom: 50px;
}

.section-title {
    font-size: 34px;
    font-weight: 800;
    color: #0d0d25;
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0;
}

.section-title::after {
    content: '';
    display: block;
    width: 70px;
    height: 4px;
    background: linear-gradient(90deg, #F1A63E, #A13E99);
    margin: 16px auto 0;
    border-radius: 10px;
}

.highlight {
    color: #F1A63E;
}

/* ========== Slider Wrapper ========== */
.news-slider-wrapper {
    position: relative;
    padding-bottom: 56px;
    padding-left: 50px;
    padding-right: 50px;
}

/* ========== Nav Buttons ========== */
.news-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    z-index: 10;
    width: 42px;
    height: 42px;
    background: #fff;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #A13E99;
    font-size: 22px;
}

.news-nav-btn:hover {
    background: #A13E99;
    border-color: #A13E99;
    color: #fff;
}

.news-prev {
    left: 0;
}

.news-next {
    right: 0;
}

@media (max-width: 575px) {
    .news-slider-wrapper {
        padding-left: 0;
        padding-right: 0;
    }

    .news-nav-btn {
        display: none;
    }
}

.news-swiper {
    padding: 10px 4px 10px;
}

:deep(.swiper-slide) {
    height: auto;
}

/* ========== Pagination ========== */
.news-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 36px;
}

:deep(.news-pagination .swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    background: #cbd5e1;
    opacity: 1;
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
}

:deep(.news-pagination .swiper-pagination-bullet-active) {
    background: linear-gradient(135deg, #A13E99, #F1A63E);
    width: 28px;
    border-radius: 6px;
}

/* ========== Responsive ========== */
@media (max-width: 991px) {
    .news-area {
        padding: 60px 0 80px;
    }

    .section-title {
        font-size: 26px;
    }

    .section-header {
        margin-bottom: 36px;
    }
}

@media (max-width: 767px) {
    .news-area {
        padding: 50px 0 70px;
    }

    .section-title {
        font-size: 22px;
    }
}

@media (max-width: 575px) {
    .news-area {
        padding: 40px 0 60px;
    }

    .section-title {
        font-size: 20px;
    }
}

/* ========== View All Button ========== */
.view-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #A13E99, #F1A63E);
    color: #fff;
    padding: 14px 34px;
    border-radius: 50px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(161, 62, 153, 0.3);
}

.view-all-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(161, 62, 153, 0.4);
    color: #fff;
}

.view-all-btn i {
    font-size: 18px;
    transition: transform 0.3s ease;
}

.view-all-btn:hover i {
    transform: translateX(5px);
}
</style>
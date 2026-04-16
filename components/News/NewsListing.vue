<template>
    <div class="news-listing-area ptb-100">
        <div class="container">
            <div class="row g-4 justify-content-center">
                <div v-for="news in newsList" :key="news.id" class="col-lg-4 col-md-6" data-aos="fade-up">
                    <CommonNewsItemCard :news="news" />
                </div>
            </div>

            <!-- Pagination -->
            <nav aria-label="Page navigation example" class="inner-pages-pagination mt-5">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#">
                            <i class="ri-arrow-left-s-line"></i>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link active" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            <i class="ri-arrow-right-s-line"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
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
    {
        id: 4,
        title: 'The Future of GCCs: Navigating Global Trends and Local Impact',
        excerpt: 'As Global Capability Centers continue to evolve, understanding the intersection of global strategy and local execution becomes critical. This article explores recent trends...',
        date: 'Oct 10, 2025',
        category: 'Strategy',
        image: 'https://storage.googleapis.com/static_files_backend/media/images/image%20(1).jpg',
        url: '#'
    },
    {
        id: 5,
        title: 'KC GlobEd Expands Partnership with Top Global Universities',
        excerpt: 'In a significant move to enhance global educational opportunities, KC GlobEd has announced several new partnerships with leading academic institutions...',
        date: 'Sep 25, 2025',
        category: 'Education',
        image: 'https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/download.png',
        url: '#'
    },
    {
        id: 6,
        title: 'Alumni Spotlight: Success Stories from our Recent Graduates',
        excerpt: 'Hear from our alumni who have successfully transitioned into high-impact roles at leading GCCs after completing our specialized programs...',
        date: 'Aug 15, 2025',
        category: 'Alumni',
        image: 'https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/F_92102image_story.jpeg',
        url: '#'
    }
]
</script>

<style scoped>
.news-listing-area {
    background: #f8fafc;
}

.ptb-100 {
    padding-top: 100px;
    padding-bottom: 100px;
}

/* ========== Pagination ========== */
.inner-pages-pagination .pagination {
    justify-content: center;
    gap: 10px;
}

.inner-pages-pagination .page-item .page-link {
    width: 45px;
    height: 45px;
    line-height: 45px;
    padding: 0;
    text-align: center;
    border-radius: 50% !important;
    background: #fff;
    border: 1px solid #e2e8f0;
    color: #64748b;
    font-weight: 600;
    transition: all 0.3s ease;
}

.inner-pages-pagination .page-item .page-link:hover,
.inner-pages-pagination .page-item .page-link.active {
    background: linear-gradient(135deg, #A13E99, #F1A63E);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(161, 62, 153, 0.25);
}

@media (max-width: 991px) {
    .ptb-100 {
        padding-top: 80px;
        padding-bottom: 80px;
    }
}

@media (max-width: 767px) {
    .ptb-100 {
        padding-top: 60px;
        padding-bottom: 60px;
    }
}
</style>

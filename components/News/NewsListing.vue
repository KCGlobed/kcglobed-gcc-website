<template>
    <div class="news-listing-area ptb-100">
        <div class="container">
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else class="row g-4 justify-content-center">
                <div v-for="news in newsList" :key="news.id" class="col-lg-4 col-md-6" data-aos="fade-up">
                    <CommonNewsItemCard :news="news" />
                </div>
                <div v-if="newsList.length === 0" class="col-12 text-center py-5">
                    <h3>No news found.</h3>
                </div>
            </div>

            <!-- Pagination -->
            <nav v-if="totalPages > 1 && !loading" aria-label="Page navigation example" class="inner-pages-pagination mt-5">
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="javascript:void(0)" @click="changePage(currentPage - 1)">
                            <i class="ri-arrow-left-s-line"></i>
                        </a>
                    </li>
                    <li v-for="page in totalPages" :key="page" class="page-item">
                        <a class="page-link" :class="{ active: page === currentPage }" href="javascript:void(0)" @click="changePage(page)">
                            {{ page }}
                        </a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="javascript:void(0)" @click="changePage(currentPage + 1)">
                            <i class="ri-arrow-right-s-line"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const newsList = ref<any[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = ref(6)

const fetchNews = async (page = 1) => {
    loading.value = true
    const config = useRuntimeConfig()
    try {
        const response: any = await $fetch(`${config.public.apiBase}/api/blog/website_seminar_page_list`, {
            params: {
                page: page,
                page_size: pageSize.value
            }
        })
        if (response.success) {
            newsList.value = response.data
            if (response.pagination) {
                totalPages.value = response.pagination.total_pages
                currentPage.value = response.pagination.current_page
            }
        }
    } catch (error) {
        console.error('Error fetching news:', error)
    } finally {
        loading.value = false
        // Scroll to top of listing after fetch
        if (import.meta.client) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value || page === currentPage.value) return
    fetchNews(page)
}

onMounted(() => {
    fetchNews()
})
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

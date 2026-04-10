<template>
  <div class="blogs-page-wrapper bg-light pb-5">
    <LayoutTopHeader />
    <LayoutMainNavbar />

    <!-- Custom Search Banner for Blogs -->
    <BlogSearchBanner :resultsCount="blogsList.length" />

    <!-- Blogs Grid -->
    <div class="container pt-5 pb-5">
      <!-- Error State -->
      <div v-if="error" class="alert alert-danger mt-4" role="alert">
        <h4 class="alert-heading">Connection Error</h4>
        <p>We are unable to reach the blog service. Please check your connection or try again later.</p>
        <hr>
        <p class="mb-0 fs-7">Error details: {{ error }}</p>
        <button class="btn btn-sm btn-outline-danger mt-2" @click="refresh">Retry Connection</button>
      </div>

      <!-- Loading State -->
      <div v-if="pending && !error" class="row g-4 pt-3">
        <div v-for="i in 6" :key="i" class="col-lg-4 col-md-6 col-12">
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-content pt-3">
              <div class="skeleton-title mb-3"></div>
              <div class="skeleton-meta"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blogs Content -->
      <div v-else-if="!error" class="row g-4 pt-3">
        <div class="col-lg-4 col-md-6 col-12" v-for="blog in blogsList" :key="blog.id" data-aos="fade-up">
          <BlogCard :blog="blog" />
        </div>
      </div>

      <!-- No Blogs Found -->
      <div v-if="!pending && !error && (!blogsList || blogsList.length === 0)" class="text-center py-5">
        <h4 class="text-muted">No blogs found.</h4>
      </div>

      <div v-if="blogsList && blogsList.length > 0" class="text-center mt-5">
        <button class="btn show-more-btn fw-bold px-5 py-2">
          Show More
        </button>
      </div>
    </div>

    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup>
import { computed } from "vue";
import BlogSearchBanner from "~/components/Blog/BlogSearchBanner.vue";
import BlogCard from "~/components/Blog/BlogCard.vue";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase || '';

// Debug Log
console.log('Blogs Index: Initializing fetch with API Base:', apiBase);

// Fetch blog list from API (Non-blocking)
const { data: blogsData, pending, error, refresh } = useFetch(`${apiBase}/api/blog/websiteblogs_list`, {
  key: 'blogs-list-fetch',
  onResponse({ response }) {
    console.log('Blogs Index API Response Status:', response.status);
  },
  onResponseError({ response }) {
    console.error('Blogs Index API Response Error:', response.status, response._data);
  },
  onRequestError({ error }) {
    console.error('Blogs Index API Request Error:', error);
  },
  transform: (res) => {
    return Array.isArray(res) ? res : (res.data || res.results || []);
  }
});

const blogsList = computed(() => blogsData.value || []);
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}

.show-more-btn {
  background-color: #f6c026;
  color: #111;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.show-more-btn:hover {
  background-color: #e5b016;
  color: #000;
}

/* Skeleton Loading Styles */
.skeleton-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.skeleton-image {
  width: 100%;
  height: 240px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 24px;
  width: 80%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-meta {
  height: 16px;
  width: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>

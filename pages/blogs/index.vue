<template>
  <div class="blogs-page-wrapper bg-light pb-5">
    <LayoutTopHeader />
    <LayoutMainNavbar />

    <!-- Custom Search Banner for Blogs -->
    <BlogSearchBanner 
      v-model="search" 
      :resultsCount="totalResults" 
      @search="handleSearch"
    />

    <!-- Filters Bar -->
    <!-- <div class="container mt-n4 position-relative" style="z-index: 5;">
      <div class="bg-white shadow rounded-4 p-4 filter-container border-0">
        <div class="row g-4 align-items-center">
          <div class="col-lg-3 col-md-6">
            <div class="filter-item">
              <span class="filter-label text-uppercase fw-bold text-muted mb-2 d-block">
                <i class="ti ti-calendar-event me-1"></i> Date Range
              </span>
              <div class="input-group input-group-sm date-group">
                <input v-model="startDate" type="date" class="form-control border-end-0" placeholder="From" />
                <span class="input-group-text bg-white text-muted px-1">to</span>
                <input v-model="endDate" type="date" class="form-control border-start-0" placeholder="To" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="filter-item">
              <span class="filter-label text-uppercase fw-bold text-muted mb-2 d-block">
                <i class="ti ti-sort-descending me-1"></i> Sort By
              </span>
              <select v-model="ordering" class="form-select form-select-sm premium-select">
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="-title">Title (Z-A)</option>
              </select>
            </div>
          </div>
          <div class="col-lg-4 col-md-8">
            <div class="d-flex flex-wrap gap-2 pt-4">
              <span v-if="startDate || endDate" class="badge rounded-pill bg-light text-dark border fw-medium px-3 py-2 fs-8">
                Date Filter Active
                <i class="ti ti-x ms-1 cursor-pointer" @click="startDate = ''; endDate = ''"></i>
              </span>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 text-end">
            <button class="btn btn-link text-decoration-none text-muted fs-7 fw-bold reset-btn p-0" @click="resetAndFetch">
              <i class="ti ti-rotate-clockwise fs-5"></i> RESET FILTERS
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Blogs Grid -->
    <div class="container pt-4 pb-5">
      <!-- Error State -->
      <div v-if="error" class="alert alert-danger" role="alert">
        <div class="d-flex align-items-center">
          <i class="ti ti-alert-triangle fs-3 me-3"></i>
          <div>
            <h4 class="alert-heading mb-1">Connection Error</h4>
            <p class="mb-0">Unable to reach the blog service. Please check your connection.</p>
          </div>
        </div>
        <hr>
        <button class="btn btn-sm btn-outline-danger" @click="refresh">Retry Connection</button>
      </div>

      <!-- Blogs Content -->
      <div class="row g-4 pt-3">
        <div class="col-lg-4 col-md-6 col-12" v-for="blog in blogsList" :key="blog.id" data-aos="fade-up">
          <BlogCard :blog="blog" />
        </div>
      </div>

      <!-- Loading State (Appended) -->
      <div v-if="pending" class="row g-4 pt-4">
        <div v-for="i in 3" :key="'skel-'+i" class="col-lg-4 col-md-6 col-12">
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-content pt-3">
              <div class="skeleton-title mb-3"></div>
              <div class="skeleton-meta"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Blogs Found -->
      <div v-if="!pending && blogsList.length === 0" class="text-center py-5">
        <div class="mb-3">
          <i class="ti ti-search-off display-1 text-muted opacity-25"></i>
        </div>
        <h4 class="text-muted">No blogs found matching your criteria.</h4>
        <button class="btn btn-link text-decoration-none" @click="resetAndFetch">Clear all filters</button>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center mt-5">
        <button 
          class="btn show-more-btn fw-bold px-5 py-2" 
          :disabled="pending"
          @click="loadMore"
        >
          <span v-if="pending" class="spinner-border spinner-border-sm me-2" role="status"></span>
          {{ pending ? 'Loading...' : 'Show More' }}
        </button>
      </div>
    </div>

    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import BlogSearchBanner from "~/components/Blog/BlogSearchBanner.vue";
import BlogCard from "~/components/Blog/BlogCard.vue";

useHead({
  title: "GCC School",
  meta: [
    { name: "description", content: "Stay updated with the GCC School blog. Read expert insights, career guidance, educational trends, and professional tips for accounting and finance students." }
  ]
})

const config = useRuntimeConfig();
const apiBase = config.public.apiBase || '';

// --- Filter State ---
const search = ref("");
const debouncedSearch = ref("");
const page = ref(1);
const ordering = ref("-createdAt"); // Default newest first
const startDate = ref("");
const endDate = ref("");

// Debounce logic for search
let searchTimeout = null;
watch(search, (newVal) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    debouncedSearch.value = newVal;
  }, 300);
});

// For pagination/Show More: we accumulate blogs in a local ref
const accumulatedBlogs = ref([]);
const totalResults = ref(0);

// Reset and fetch anew when any filter changes
const resetAndFetch = () => {
  page.value = 1;
  accumulatedBlogs.value = [];
};

// Watch for filter changes to reset page
// Use debouncedSearch instead of search for watching
watch([debouncedSearch, ordering, startDate, endDate], () => {
  resetAndFetch();
}, { deep: true });

// --- Data Fetching ---
const { data: blogsData, pending, error, refresh } = useFetch(`${apiBase}/api/blog/websiteblogs_list`, {
  key: () => `blogs-list-${debouncedSearch.value}-${ordering.value}-${startDate.value}-${endDate.value}-${page.value}`,
  query: computed(() => ({
    search: debouncedSearch.value,
    ordering: ordering.value,
    start_date: startDate.value,
    end_date: endDate.value,
    page: page.value,
    pageSize: 1000
  })),
  getCachedData: () => null,
  transform: (res) => {
    // Correctly handle the paginated response structure
    const data = res.data || (Array.isArray(res) ? res : []);
      console.log(data.length,'-----data')
    // Extract total results from the pagination object provided by the backend
    const total = res.pagination?.total_results || res.count || res.total || data.length;
    
    return { data, total };
  }
});

// Update accumulated list whenever new data arrives
watch(blogsData, (newData) => {
  if (newData) {
    if (page.value === 1) {
      accumulatedBlogs.value = newData.data;
    } else {
      // Append only if not already merged (Nuxt might trigger watch on hydration)
      const currentIds = new Set(accumulatedBlogs.value.map(b => b.id));
      const freshItems = newData.data.filter(b => !currentIds.has(b.id));
      accumulatedBlogs.value = [...accumulatedBlogs.value, ...freshItems];
    }
    totalResults.value = newData.total;
  }
}, { immediate: true });

const blogsList = computed(() => accumulatedBlogs.value || []);

const hasMore = computed(() => {
  return blogsList.value.length < totalResults.value;
});

const loadMore = () => {
  if (hasMore.value && !pending.value) {
    page.value++;
  }
};

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  debouncedSearch.value = search.value;
  resetAndFetch();
  // refresh() is handled automatically because debouncedSearch changes
};
</script>

<style scoped>
.mt-n4 {
  margin-top: -3.5rem !important;
}

.filter-container {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08) !important;
  transition: all 0.3s ease;
}

.filter-label {
  font-size: 11px;
  letter-spacing: 1.2px;
  color: #6c757d !important;
}

.filter-label i {
  color: #f6c026;
  font-size: 14px;
}

.date-group .form-control,
.premium-select {
  border: 1px solid #eee;
  font-size: 14px;
  color: #444;
  height: 42px;
  background-color: #fcfcfc;
}

.date-group .form-control:focus,
.premium-select:focus {
  border-color: #f6c026;
  background-color: #fff;
  box-shadow: none;
}

.input-group-text {
  border: 1px solid #eee;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.reset-btn {
  letter-spacing: 1px;
  transition: color 0.2s;
}

.reset-btn:hover {
  color: #f6c026 !important;
}

.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }

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

.show-more-btn:hover:not(:disabled) {
  background-color: #82327c;
  color: #fff;
  transform: translateY(-1px);
}

.show-more-btn:disabled {
  opacity: 0.7;
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

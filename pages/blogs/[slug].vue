<template>
  <div class="blog-details-page bg-white pb-5">
    <LayoutTopHeader />
    <LayoutMainNavbar />
    
    <!-- Loading State -->
    <div v-if="pending && !blog" class="container-fluid px-4 px-lg-5 pt-5 pb-5 mt-4" style="max-width: 1536px;">
      <div class="row align-items-center mb-5 pb-3 border-bottom">
        <div class="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
          <div class="skeleton-badge mb-3"></div>
          <div class="skeleton-h1 mb-4"></div>
          <div class="skeleton-meta-row mb-2"></div>
          <div class="skeleton-text-meta"></div>
        </div>
        <div class="col-lg-6">
          <div class="skeleton-featured-image"></div>
        </div>
      </div>
      <div class="row g-4 g-lg-5">
        <div class="col-lg-3 d-none d-lg-block">
          <div class="skeleton-sidebar"></div>
        </div>
        <div class="col-lg-6">
          <div class="skeleton-paragraph mb-3"></div>
          <div class="skeleton-paragraph mb-3"></div>
          <div class="skeleton-paragraph"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <!-- <div v-else-if="error || listError" class="container py-5 text-center mt-5">
      <div class="alert alert-danger d-inline-block px-5 py-4 shadow-sm border-0 rounded-4">
        <i class="ti ti-alert-triangle fs-1 text-danger mb-3 d-block"></i>
        <h4 class="fw-bold">Connection Issue</h4>
        <p class="text-muted">We couldn't load the blog content. Please check your connection.</p>
        <div class="d-flex gap-2 justify-content-center mt-4">
          <button @click="refreshAll" class="btn btn-outline-danger px-4">Retry</button>
          <NuxtLink to="/blogs" class="btn btn-danger px-4">Back to Blogs</NuxtLink>
        </div>
      </div>
    </div> -->

    <!-- Content -->
    <div v-else-if="blog" class="container-fluid px-4 px-lg-5 pt-5 pb-5 mt-4" style="max-width: 1536px;">
      <!-- Hero Section -->
      <div class="row align-items-center mb-5 pb-3 border-bottom">
        <div class="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
          <div class="category-badge mb-3 d-inline-block px-3 py-1 text-white fw-bold text-uppercase fs-7">
            {{ blogCategory }}
          </div>
          <h1 class="fw-bold mb-4 display-5 text-dark" style="letter-spacing: -1px; line-height: 1.2;">
            {{ blog.title }}
          </h1>
          
          <div class="meta-section d-flex flex-column gap-2 text-secondary fs-7">
            <div class="d-flex align-items-center gap-3 mb-2 text-dark">
              <!-- <div class="social-icons d-flex gap-2">
                <a href="#" class="text-dark"><i class="ti ti-brand-x fw-bold fs-5"></i></a>
                <a href="#" class="text-dark"><i class="ti ti-brand-linkedin fw-bold fs-5"></i></a>
                <a href="#" class="text-dark"><i class="ti ti-brand-reddit fw-bold fs-5"></i></a>
                <a href="#" class="text-dark"><i class="ti ti-link fw-bold fs-5"></i></a>
              </div> -->
              <span class="d-flex align-items-center gap-1 text-muted">
                <!-- <span style="font-size: 5px;">&#9679;</span>  -->
                {{ readingTime }} Min Read
              </span>
            </div>
            <span>Written by: <strong class="text-dark">KC GlobEd</strong></span>
            <span>Last updated: {{ formattedDate }}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <img :src="blog.featuredImage" class="img-fluid w-100 object-fit-cover shadow-sm rounded-3" alt="Blog Image" style="max-height: 400px;" />
        </div>
      </div>
      
      <!-- Content Section -->
      <div class="row g-4 g-lg-5">
        <!-- Sidebar: Contents -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="contents-sidebar border sticky-top rounded-4 overflow-hidden shadow-sm" style="top: 100px; background-color: #fafafa;">
            <h5 class="fw-bold fs-6 px-3 py-3 m-0 bg-white border-bottom">Table of Contents</h5>
            <div class="contents-list p-2 custom-scrollbar" style="max-height: 70vh; overflow-y: auto;">
              <a href="#overview" @click.prevent="scrollToId('overview')" 
                 class="content-link d-block p-2 text-dark fw-bold text-decoration-none rounded-2 mb-1" 
                 :class="{ 'active': activeTocId === 'overview' }">
                Overview
              </a>
              <div v-for="item in toc" :key="item.id">
                <a :href="'#' + item.id" @click.prevent="scrollToId(item.id)" 
                   class="content-link d-block p-2 text-muted text-decoration-none rounded-2 mb-1"
                   :class="{ 'active': activeTocId === item.id, 'ps-4 sub-link': item.level === 3 }">
                  {{ item.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="col-lg-6 pe-xl-5">
          <div id="overview" class="scroll-margin"></div>
          <div class="blog-content-wrapper shadow-none">
            <div class="blog-content mb-5" v-html="processedContent"></div>
            
            <!-- Tags Section -->
            <div v-if="blog?.tags && blog.tags.length > 0" class="tags-section mt-5">
              <div class="divider-line mb-4"></div>
              <div class="d-flex align-items-center gap-2">
                <i class="ti ti-tag text-muted fs-5"></i>
                <span class="text-uppercase text-muted fs-8 fw-bold" style="letter-spacing: 1px;">Tagged:</span>
                <span class="fw-bold text-dark ps-2 fs-6" style="color: #101c38 !important;">{{ formattedTags }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sidebar: Form -->
        <div class="col-lg-3">
          <div class="sticky-top sidebar-form-container" style="top: 100px; z-index: 1;">
            <CareerCounsellingForm />
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!pending" class="text-center py-5 mt-5">
      <h3 class="text-muted">Blog not found.</h3>
      <NuxtLink to="/blogs" class="btn border mt-3">Back to Blogs</NuxtLink>
    </div>
    
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import CareerCounsellingForm from "~/components/Forms/CareerCounsellingForm.vue";

const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug;
const apiBase = config.public.apiBase || '';

const toc = ref([]);
const activeTocId = ref('overview');
const processedContent = ref('');

// Step 1: Fetch list to find ID from slug
const { data: listData, pending: listPending, error: listError, refresh: refreshList } = useFetch(`${apiBase}/api/blog/websiteblogs_list`, {
  key: `list-for-${slug}-fetch`
});

const blogId = computed(() => {
  const list = Array.isArray(listData.value) ? listData.value : (listData.value?.data || []);
  const found = list.find(b => b.slug === slug);
  return found?.id;
});

// Step 2: Fetch full detail using the ID
const { data: blogDetail, pending: detailPending, error, refresh: refreshDetail } = useFetch(() => 
  blogId.value ? `${apiBase}/api/blog/websiteblogs_detail/${blogId.value}` : null, 
  { 
    key: `blog-detail-${slug}-fetch`,
    watch: [blogId],
    transform: (res) => {
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) return res.data[0];
      return res;
    }
  }
);

const blog = computed(() => {
  const data = blogDetail.value;
  if (data?.data && Array.isArray(data.data) && data.data.length > 0) return data.data[0];
  return data || null;
});

const readingTime = computed(() => {
  if (!blog.value?.content) return 0;
  const words = blog.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / 200);
});

const pending = computed(() => listPending.value || (blogId.value && detailPending.value));

const formattedTags = computed(() => {
  if (!blog.value?.tags || !Array.isArray(blog.value.tags)) return "";
  return blog.value.tags.map(tag => tag.name).join(", ");
});

/**
 * Robustly parses the blog content to generate the ToC and inject IDs.
 * Uses browser DOMParser for maximum reliability over Regex.
 */
const processBlogContent = () => {
  if (!blog.value?.content) {
    processedContent.value = '';
    toc.value = [];
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(blog.value.content, 'text/html');
  const headings = doc.querySelectorAll('h2, h3');
  const newToc = [];

  headings.forEach((heading, index) => {
    const id = `section-${index + 1}`;
    heading.setAttribute('id', id);
    heading.classList.add('scroll-margin');
    
    newToc.push({
      id: id,
      text: heading.textContent.trim(),
      level: parseInt(heading.tagName[1])
    });
  });

  processedContent.value = doc.body.innerHTML;
  toc.value = newToc;
};

// Re-process when blog content arrives
watch(blog, (newBlog) => {
  if (newBlog) {
    processBlogContent();
  }
}, { immediate: true });

// Scroll spy logic
const handleScroll = () => {
  const sections = document.querySelectorAll('.scroll-margin');
  let currentId = 'overview';
  
  // Higher threshold for mobile, smaller for desktop
  const scrollPosition = window.scrollY + 120;
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop) {
      currentId = section.id;
    }
  });
  
  activeTocId.value = currentId;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // If blog is already there (CSR), process it
  if (blog.value) processBlogContent();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const refreshAll = () => {
  refreshList();
  if (blogId.value) refreshDetail();
};

const blogCategory = computed(() => {
  if (blog.value?.categories && blog.value.categories.length > 0) return blog.value.categories[0].name;
  return "Blog";
});

const formattedDate = computed(() => {
  if (!blog.value?.published_at) return "";
  return new Date(blog.value.published_at).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
});

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
    activeTocId.value = id;
  }
};

useHead(() => ({
  title: blog.value?.metaTitle || blog.value?.title || "Blog",
  meta: [
    { name: 'description', content: blog.value?.metaDescription || blog.value?.excerpt }
  ]
}));
</script>

<style scoped>
.category-badge {
  background-color: #9b3d94;
  letter-spacing: 0.5px; border-radius: 5px;
}
.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }

.blog-content :deep(p), .blog-content :deep(li), .blog-content :deep(div) {
  color: #333;
  line-height: 1.8;
  font-size: 16px;
  margin-bottom: 1.4rem;
  word-break: break-word;
}

.blog-content :deep(h2), .blog-content :deep(h3) {
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  color: #111;
  scroll-margin-top: 110px;
}

.blog-content :deep(h2) { font-size: 1.75rem; margin-top: 3.5rem; }
.blog-content :deep(h3) { font-size: 1.4rem; }

.blog-content :deep(img) {
  max-width: 100%; height: auto; border-radius: 8px; margin: 2rem 0;
}

.content-link {
  font-size: 14px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  color: #666 !important;
}

.content-link:hover {
  background-color: #f0f0f0;
  color: #9b3d94 !important;
}

.content-link.active {
  background-color: #fff;
  color: #9b3d94 !important;
  font-weight: 700;
  border-left-color: #9b3d94;
  box-shadow: 0 4px 12px rgba(155, 61, 148, 0.08);
}

.sub-link { font-size: 13px; }

.scroll-margin { scroll-margin-top: 110px; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }

.sidebar-form-container { max-width: 100%; overflow-x: hidden; }

/* Tags Section Styling */
.divider-line {
  width: 50px;
  height: 3px;
  background-color: #101c38;
}

.tags-section .text-dark {
  color: #101c38 !important;
}

@media (max-width: 991px) {
  .blog-content :deep(h2) { font-size: 1.5rem; }
  .blog-content :deep(h3) { font-size: 1.25rem; }
}
</style>

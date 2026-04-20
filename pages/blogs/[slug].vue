<template>
  <div class="blog-details-page bg-white pb-5">
    <LayoutTopHeader />
    <LayoutMainNavbar />

    <!-- Simple Custom Loading Spinner -->
    <div v-if="pending" class="loading-container">
      <div class="custom-spinner"></div>
      <p class="mt-3 text-muted fs-7 fw-medium">Loading content...</p>
    </div>

    <!-- Content -->
    <div v-else-if="blog" class="container-fluid px-3 px-md-4 px-lg-5 pt-3 pt-lg-5 pb-5 mt-2 mt-lg-4"
      style="max-width: 1536px;">
      <!-- Hero Section -->
      <div class="row align-items-center mb-4 mb-lg-5 pb-3 border-bottom hero-section">
        <div class="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
          <div class="category-badge mb-3 d-inline-block px-3 py-1 text-white fw-bold text-uppercase fs-7">
            {{ blogCategory }}
          </div>
          <h1 class="fw-bold mb-3 mb-lg-4 blog-title text-dark" v-html="blog.title">
          </h1>

          <div class="meta-section d-flex flex-column gap-2 text-secondary fs-7">
            <div class="d-flex align-items-center gap-3 mb-2 text-dark">
              <span class="d-flex align-items-center gap-1 text-muted">
                <i class="ti ti-clock-hour-4 me-1"></i>
                {{ readingTime }} Min Read
              </span>
            </div>
            <span>Written by: <strong class="text-dark">GCC School</strong></span>
            <span>Last updated: {{ formattedDate }}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <img :src="blog.featuredImage" class="img-fluid w-100 object-fit-cover shadow-sm rounded-3 featured-img"
            :alt="blog.altImage || 'Blog Image'" />
        </div>
      </div>

      <!-- Content Section -->
      <div class="row g-4 g-xl-5">
        <!-- Sidebar: Table of Contents (Desktop) -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="contents-sidebar border sticky-sidebar rounded-4 overflow-hidden shadow-sm">
            <h5 class="fw-bold fs-6 px-3 py-3 m-0 bg-white border-bottom">Table of Contents</h5>
            <div class="contents-list p-2 custom-scrollbar scrollable-sidebar-content">
              <a href="#overview" @click.prevent="scrollToId('overview')"
                class="content-link d-block p-2 text-dark fw-bold text-decoration-none rounded-2 mb-1"
                :class="{ 'active': activeTocId === 'overview' }">
                Overview
              </a>
              <div v-for="item in toc" :key="item.id">
                <a :href="'#' + item.id" @click.prevent="scrollToId(item.id)"
                  class="content-link d-block p-2 text-muted text-decoration-none rounded-2 mb-1"
                  :class="{ 'active': activeTocId === item.id, 'ps-4 sub-link': item.level === 3 }">
                  <span v-html="item.text"></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content (Middle) -->
        <div class="middle-content col-lg-6 col-md-12">
          <!-- Mobile Specific ToC (Compact) -->
          <div v-if="toc.length > 0" class="mobile-toc d-lg-none mb-4 p-3 border rounded-3 bg-light">
            <button
              class="btn btn-link p-0 w-100 d-flex justify-content-between align-items-center text-decoration-none text-dark fw-bold mb-0"
              type="button" @click="isMobileTocOpen = !isMobileTocOpen">
              <span>Quick Navigation</span>
              <i class="ti fs-5" :class="isMobileTocOpen ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
            </button>
            <div v-show="isMobileTocOpen" class="mt-3 mobile-toc-list">
              <div v-for="item in toc" :key="item.id">
                <a :href="'#' + item.id" @click.prevent="scrollToId(item.id); isMobileTocOpen = false"
                  class="d-block py-2 text-muted text-decoration-none border-bottom-dashed fs-7" v-html="item.text">
                </a>
              </div>
            </div>
          </div>

          <div id="overview" class="scroll-margin"></div>
          <div class="blog-content-wrapper shadow-none">
            <div class="blog-content mb-5" v-html="processedContent"></div>

            <!-- Tags Section -->
            <div v-if="blog?.tags && blog.tags.length > 0" class="tags-section mt-5 pb-4">
              <div class="divider-line mb-4"></div>
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <i class="ti ti-tag text-muted fs-5"></i>
                <span class="text-uppercase text-muted fs-8 fw-bold" style="letter-spacing: 1px;">Tagged:</span>
                <span class="fw-bold text-dark ps-2 fs-6" style="color: #101c38 !important;">{{ formattedTags }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar: Sidebar Form (Right) -->
        <div class="col-lg-3 col-md-12">
          <div class="sidebar-form-wrapper">
            <div class="scrollable-sidebar-content p-1">
              <CareerCounsellingForm />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container py-5 mt-5">
      <div class="alert alert-danger shadow-sm border-0 rounded-4 p-4 text-center">
        <i class="ti ti-alert-circle fs-1 mb-3"></i>
        <h4 class="fw-bold">Unable to load blog content</h4>
        <p class="text-secondary mb-4">There was a problem connecting to our server. Please try again later.</p>
        <button @click="refresh()" class="btn btn-danger px-4 py-2 rounded-3">
          <i class="ti ti-refresh me-1"></i> Try Refreshing
        </button>
        <div class="mt-3 fs-8 text-muted">Error Trace: {{ error.message }}</div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!pending" class="text-center py-5 mt-5 px-3">
      <h3 class="text-muted">Blog not found.</h3>
      <NuxtLink to="/blogs" class="btn border mt-3">Back to Blogs</NuxtLink>
    </div>

    <!-- Footer components hidden while loading -->
    <div v-if="!pending">
      <LayoutMainFooter />
      <LayoutCopyRight />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import CareerCounsellingForm from "~/components/Forms/CareerCounsellingForm.vue";

const route = useRoute();
const config = useRuntimeConfig();
const currentSlug = computed(() => route.params.slug);
const apiBase = config.public.apiBase || '';

const toc = ref([]);
const activeTocId = ref('overview');
const processedContent = ref('');
const isMobileTocOpen = ref(false);

// Combined Fetch Logic for SSR Reliability
// - SSR (Refresh): Blocking (lazy: false) ensures content is available immediately for SEO and UX.
// - Client (Navigation): Non-blocking (lazy: true) provides instant feedback with the spinner.
// We use await with lazy: process.client to achieve this hybrid behavior in Nuxt 3.
const { data: blog, pending, error, refresh } = await useAsyncData(() => `blog-detail-${route.params.slug}`, async () => {
  try {
    const slugValue = route.params.slug;
    if (!slugValue) return null;

    console.log(`[Blog Detail] Fetching content for slug: ${slugValue}`);

    // 1. Fetch the list to find the ID from slug
    const listResponse = await $fetch(`${apiBase}/api/blog/websiteblogs_list`, {
      params: { pageSize: 1000 }
    });
    const list = Array.isArray(listResponse) ? listResponse : (listResponse?.data || []);
    const found = list.find(b => b.slug === slugValue);

    if (!found) {
      console.warn(`[Blog Detail] No blog found with slug: ${slugValue}`);
      return null;
    }

    // 2. Fetch full detail using the ID
    const detailResponse = await $fetch(`${apiBase}/api/blog/websiteblogs_detail/${found.id}`);

    // Extract first item from data array if applicable
    if (detailResponse?.data && Array.isArray(detailResponse.data) && detailResponse.data.length > 0) {
      return detailResponse.data[0];
    }
    return detailResponse?.data || detailResponse;
  } catch (err) {
    console.error('[Blog Detail] Error during combined fetch:', err);
    throw err;
  }
}, {
  lazy: process.client,
  watch: [() => route.params.slug],
  getCachedData: () => null
});

const readingTime = computed(() => {
  if (!blog.value?.content) return 0;
  const words = blog.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / 200);
});

const formattedTags = computed(() => {
  if (!blog.value?.tags || !Array.isArray(blog.value.tags)) return "";
  return blog.value.tags.map(tag => tag.name).join(", ");
});

/**
 * Environment-agnostic parser to generate the ToC and inject IDs.
 * Works on both Server (SSR) and Client (Hydration) without DOMParser.
 */
const processBlogContent = () => {
  if (!blog.value?.content) {
    processedContent.value = '';
    toc.value = [];
    return;
  }

  // Replace non-breaking spaces (&nbsp; / \u00A0) with regular spaces
  // so the browser can wrap text at word boundaries normally.
  // Rich text editors often insert &nbsp; between words, which makes
  // the browser treat entire paragraphs as one unbreakable "word".
  let content = blog.value.content;
  content = content.replace(/&nbsp;/gi, ' ').replace(/\u00A0/g, ' ');

  const newToc = [];
  let headingCount = 0;

  // Regex to match H2 and H3 tags and their content
  const headingRegex = /<(h[23])\b([^>]*)>([\s\S]*?)<\/h[23]>/gi;

  const processed = content.replace(headingRegex, (match, tag, attrs, text) => {
    headingCount++;
    const id = `section-${headingCount}`;

    // Extract text for the ToC (keep HTML for innerHTML rendering)
    const tocText = text.trim();

    newToc.push({
      id: id,
      text: tocText,
      level: parseInt(tag[1])
    });

    // Return the modified tag with the ID and scroll class
    return `<${tag} id="${id}" ${attrs} class="scroll-margin">${text}</${tag}>`;
  });

  processedContent.value = processed;
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
  const scrollPosition = window.scrollY + 150;

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
  if (blog.value) processBlogContent();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const refreshAll = () => {
  refresh();
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
const cleanSchema = blog.value?.schema_markup
  ?.replace(/<script.*?>/, '')
  ?.replace(/<\/script>/, '');

useHead(() => ({
  title: blog.value?.metaTitle || blog.value?.title || "Blog",
  meta: [
    { name: 'description', content: blog.value?.metaDescription || blog.value?.excerpt }
  ],
  script: cleanSchema ? [
    {
      type: 'application/ld+json',
      children: cleanSchema
    }
  ] : []
}));
</script>

<style scoped>
.category-badge {
  background-color: #9b3d94;
  letter-spacing: 0.5px;
  border-radius: 5px;
}

.fs-7 {
  font-size: 0.85rem;
}

.fs-8 {
  font-size: 0.75rem;
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

/* --- Normal Custom Spinner --- */
.loading-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.custom-spinner {
  width: 45px;
  height: 45px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #9b3d94;
  border-radius: 50%;
  animation: custom-spin 1s linear infinite;
}

@keyframes custom-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.blog-title {
  font-size: clamp(1.8rem, 5vw, 3rem);
  letter-spacing: -1px;
  line-height: 1.2;
}

.featured-img {
  max-height: 400px;
}

/* ================= BLOG CONTENT WRAPPER ================= */

.blog-content {
  width: 100%;
  display: block;
  overflow-x: hidden;
  overflow-wrap: break-word;
}

/* Universal safety for all injected HTML */
.blog-content :deep(*) {
  max-width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  white-space: normal;
}

/* ================= TEXT ELEMENTS ================= */

.blog-content :deep(p),
.blog-content :deep(li),
.blog-content :deep(div),
.blog-content :deep(span) {
  color: #333;
  line-height: 1.8;
  font-size: clamp(15px, 2vw, 16px);
  margin-bottom: 1.4rem;
}

/* ================= HEADINGS ================= */

.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3),
.blog-content :deep(h4),
.blog-content :deep(h5),
.blog-content :deep(h6) {
  color: #111;
  font-weight: 700;
  line-height: 1.4;
  margin-top: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.blog-content :deep(h1) {
  font-size: clamp(1.8rem, 5vw, 2.4rem);
}

.blog-content :deep(h2) {
  font-size: clamp(1.5rem, 4vw, 1.8rem);
  scroll-margin-top: 110px;
}

.blog-content :deep(h3) {
  font-size: clamp(1.3rem, 3vw, 1.5rem);
  scroll-margin-top: 110px;
}

/* ================= LINKS ================= */

.blog-content :deep(a) {
  color: #9b3d94;
  text-decoration: underline;
  word-break: break-all;
  /* prevent long URLs overflow */
}

/* ================= LISTS ================= */

.blog-content :deep(ul),
.blog-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

/* ================= IMAGES / MEDIA ================= */

.blog-content :deep(img),
.blog-content :deep(video),
.blog-content :deep(iframe) {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 8px;
  margin: 1.5rem 0;
  object-fit: contain;
}

/* ================= TABLES ================= */

.blog-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}

.blog-content :deep(th),
.blog-content :deep(td) {
  padding: 12px 15px;
  border: 1px solid #dee2e6;
  text-align: left;
  min-width: 120px;
}

.blog-content :deep(th) {
  background-color: #f8f9fa;
  font-weight: 700;
}

/* ================= CODE BLOCKS ================= */

.blog-content :deep(pre) {
  background: #f6f8fa;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.blog-content :deep(code) {
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ================= BLOCKQUOTE ================= */

.blog-content :deep(blockquote) {
  border-left: 4px solid #9b3d94;
  padding-left: 1rem;
  color: #555;
  margin: 1.5rem 0;
  font-style: italic;
}

/* ================= HR ================= */

.blog-content :deep(hr) {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #eee;
}

/* ================= CUSTOM EDITOR BUTTON ================= */

.blog-content :deep(.custom-editor-button) {
  background: #a13e99;
  border-radius: 50px !important;
  box-shadow: 0 4px 15px #f1a63e4d;
  color: #fff !important;
  display: inline-block;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 1px;
  line-height: normal !important;
  padding: 10px 25px !important;
  text-transform: uppercase;
  transition: all .3s ease-in-out !important;
  text-decoration: none !important;
}

.blog-content :deep(.custom-editor-button:hover) {
  background: #a13e99;
  opacity: 0.9;
  color: #fff !important;
  transform: translateY(-2px);
}

/* ================= MOBILE OPTIMIZATION ================= */

@media (max-width: 768px) {
  .blog-content {
    font-size: 14px;
  }

  .blog-content :deep(h1) {
    font-size: 1.6rem;
  }

  .blog-content :deep(h2) {
    font-size: 1.4rem;
  }

  .blog-content :deep(h3) {
    font-size: 1.2rem;
  }
}
</style>
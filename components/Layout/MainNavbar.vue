<template>
  <nav :class="[
    'navbar navbar-expand-lg top-navbar first-navbar',
    { sticky: isSticky },
  ]">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">
        <img src="~/assets/Logo/Logo/GCC-School-Logo-White.jpeg" alt="Logo" style="height: 75px;" />
      </NuxtLink>
      <a class="navbar-toggler home1-one-toggler" @click="stateStoreInstance.onMobileNavbarShow">
        <span class="burger-menu">
          <span class="top-bar"></span>
          <span class="middle-bar"></span>
          <span class="bottom-bar"></span>
        </span>
      </a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">

          <li class="nav-item">
            <NuxtLink to="/" class="nav-link">
              Home
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about-overview" class="nav-link">
              About Us
            </NuxtLink>
          </li>

          <li class="nav-item">
            <NuxtLink to="/programs" class="nav-link">
              Programs
            </NuxtLink>

          </li>

          <li class="nav-item">
            <NuxtLink to="/admissions" class="nav-link">
              Admissions
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/campus-life" class="nav-link">
              Campus Life
            </NuxtLink>
          </li>

          <li class="nav-item">
            <NuxtLink to="/contact-us" class="nav-link">
              Contact Us
            </NuxtLink>
          </li>
        </ul>
        <div class="others-option d-flex align-items-center">
          <div class="option-item">
            <div class="search-bar main-menu__search search-toggler" @click="toggleSearch" style="cursor: pointer">
              <div class="search-btn">
                <img src="~/assets/img/svgs/search2.svg" alt="image" />
              </div>
            </div>
          </div>

          <!-- <div class="option-item">
            <button class="btn side-bar-btn" type="button" @click="stateStoreInstance.onSidebarShow">
              <img src="~/assets/img/svgs/menu2.svg" alt="svg" />
            </button>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Search Dropdown -->
    <div v-if="isSearchVisible" class="search-dropdown-overlay" @click="closeSearch">
      <div class="search-dropdown-container" @click.stop>
        <div class="search-input-wrapper">
          <input ref="searchInput" v-model="searchQuery" type="text" class="search-input"
            placeholder="Search pages, programs, or content..." @input="onSearchInput" />
          <button class="search-close-btn" @click="closeSearch">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div v-if="searchQuery.length > 0" class="search-results">
          <div v-if="filteredResults.length > 0" class="results-list">
            <div v-for="(result, index) in filteredResults" :key="index" class="result-item"
              @click="navigateToResult(result)">
              <div class="result-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="result-content">
                <div class="result-title">{{ result.title }}</div>
                <div class="result-description">{{ result.description }}</div>
              </div>
            </div>
          </div>

          <div v-else class="no-results">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>No results found for "{{ searchQuery }}"</p>
          </div>
        </div>

        <div v-else class="search-suggestions">
          <h3>Quick Links</h3>
          <div class="suggestions-list">
            <div v-for="(suggestion, index) in quickLinks" :key="index" class="suggestion-item"
              @click="navigateToResult(suggestion)">
              {{ suggestion.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import stateStore from "../../utils/store";

interface SearchResult {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export default defineComponent({
  name: "MainNavbar",
  setup() {
    const router = useRouter();
    const isSticky = ref(false);
    const isSearchVisible = ref(false);
    const searchQuery = ref("");
    const searchInput = ref<HTMLInputElement | null>(null);
    const filteredResults = ref<SearchResult[]>([]);
    const stateStoreInstance = stateStore;

    // Define all searchable content
    const searchableContent: SearchResult[] = [
      {
        title: "Home",
        description: "Return to homepage",
        path: "/",
        keywords: ["main", "homepage", "landing", "मुख्य पृष्ठ", "home", " India’s 1st AI-powered school", "1st AI-powered school"]
      },
      {
        title: "About Us - Overview",
        description: "Learn about our school",
        path: "/about-overview",
        keywords: ["about", "school", "information", "history", "mission", "vision", "values", "हमारे बारे में"]
      },
      {
        title: "Programs",
        description: "Explore our academic programs",
        path: "/programs",
        keywords: ["courses", "curriculum", "academics", "classes", "subjects", "education", "कार्यक्रम", "पाठ्यक्रम"]
      },
      {
        title: "Admissions",
        description: "Information about admissions process",
        path: "/admissions",
        keywords: ["enrollment", "registration", "apply", "admission", "join", "entry", "fees", "प्रवेश"]
      },
      {
        title: "Campus Life",
        description: "Student life and activities",
        path: "/campus-life",
        keywords: ["student", "activities", "events", "facilities", "sports", "clubs", "life", "कैंपस जीवन"]
      },
      {
        title: "Contact Us",
        description: "Get in touch with us",
        path: "/contact-us",
        keywords: ["contact", "phone", "email", "address", "location", "reach", "संपर्क करें"]
      },
      // Add more searchable content as needed
    ];

    const quickLinks: SearchResult[] = [
      { title: "About Us", description: "", path: "/about-overview" },
      { title: "Programs", description: "", path: "/programs" },
      { title: "Admissions", description: "", path: "/admissions" },
      { title: "Contact Us", description: "", path: "/contact-us" },
    ];

    onMounted(() => {
      window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        isSticky.value = scrollPos >= 100;
      });
    });

    const toggleSearch = () => {
      isSearchVisible.value = !isSearchVisible.value;
    };

    const closeSearch = () => {
      isSearchVisible.value = false;
      searchQuery.value = "";
      filteredResults.value = [];
    };

    const onSearchInput = () => {
      if (searchQuery.value.trim() === "") {
        filteredResults.value = [];
        return;
      }

      const query = searchQuery.value.toLowerCase();
      filteredResults.value = searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(query)))
      );
    };

    const navigateToResult = (result: SearchResult) => {
      router.push(result.path);
      closeSearch();
    };

    // Focus input when dropdown becomes visible
    watch(isSearchVisible, (newValue) => {
      if (newValue) {
        nextTick(() => {
          searchInput.value?.focus();
        });
      }
    });

    return {
      isSticky,
      isSearchVisible,
      searchQuery,
      searchInput,
      filteredResults,
      quickLinks,
      stateStoreInstance,
      toggleSearch,
      closeSearch,
      onSearchInput,
      navigateToResult,
    };
  },
  methods: {
    scrollToSection(id: any) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
});
</script>

<style>
.navbar {
  background-color: #3D2C5E;
}

.navbar .navbar-nav .nav-item .nav-link {
  color: #fff;
}

.navbar.sticky {
  background-color: #3D2C5E;
}

/* Search Dropdown Styles */
.search-dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

.search-dropdown-container {
  background-color: #fff;
  width: 90%;
  max-width: 600px;
  height: fit-content;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  color: #333;
  padding: 8px;
}

.search-input::placeholder {
  color: #999;
}

.search-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s;
}

.search-close-btn:hover {
  color: #333;
}

.search-results {
  overflow-y: auto;
  max-height: calc(80vh - 80px);
}

.results-list {
  padding: 10px 0;
}

.result-item {
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: #f5f5f5;
}

.result-icon {
  margin-right: 12px;
  color: #3D2C5E;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.result-content {
  flex: 1;
}

.result-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.result-description {
  font-size: 14px;
  color: #666;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
}

.no-results svg {
  margin-bottom: 16px;
}

.no-results p {
  font-size: 16px;
  margin: 0;
}

.search-suggestions {
  padding: 20px;
}

.search-suggestions h3 {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  color: #333;
  font-size: 15px;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}
</style>
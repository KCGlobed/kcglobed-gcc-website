<template>
  <div class="blog-search-banner">
    <div class="container h-100 position-relative">
      <div class="row h-100 align-items-center justify-content-center text-center">
        <div class="col-lg-8 col-md-10 mt-5 pt-4 banner-content-wrapper">
          <h1 class="text-white fw-bold mb-2">Expert Insights, Practical Advice & GCC School Stories</h1>
          <!-- <p class="text-white mb-5 fs-6" style="opacity: 0.9;">
            Showing {{ resultsCount }} results for your search
          </p> -->
        </div>
      </div>
      
      <div class="search-box-wrapper mx-auto mt-4 px-2 position-absolute w-100" style="bottom: 0; left: 50%; transform: translate(-50%, 50%);">
        <div class="input-group search-input-group bg-white">
          <span class="input-group-text bg-white border-0 text-muted ps-4 pe-2">
            <i class="ti ti-search fs-4" style="color: #101c38;"></i>
          </span>
          <input
            type="text"
            :value="modelValue"
            class="form-control border-0 shadow-none bg-white search-input text-secondary"
            placeholder="Search Headlines, News..."
            @input="onInput"
            @keyup.enter="triggerSearch"
          />
          <div class="divider d-flex align-items-center"></div>
          <button 
            class="btn border-0 text-dark px-4 search-btn"
            @click="triggerSearch"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  resultsCount: {
    type: [Number, String],
    default: 0
  }
});

const emit = defineEmits(["update:modelValue", "search"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const triggerSearch = () => {
  emit("search");
};
</script>

<style scoped>
.blog-search-banner {
  background-image: url("~/assets/img/blog_hero.png");
  background-size: cover;
  background-position: center;
  height: 340px;
  position: relative;
  z-index: 1;
  margin-bottom: 60px; /* space for overlapping search bar */
}

.banner-content-wrapper {
  margin-top: -30px !important;
}

.search-box-wrapper {
  max-width: 800px;
}

.search-input-group {
  border-radius: 2px !important;
  align-items: center;
  height: 75px; /* Taller box */
  border-bottom: 4px solid #14213d !important; /* Thick dark navy border */
  box-shadow: 0 5px 15px rgba(0,0,0,0.05); /* very soft shadow */
}

.search-input {
  font-size: 16px;
  height: 100%;
}

.search-input::placeholder {
  color: #a0a5aa;
}

.divider {
  height: 35px;
  width: 2px;
  background-color: #0d6efd; /* Blue line */
}

.search-btn {
  font-size: 16px;
  font-weight: 700;
  color: #14213d !important;
  height: 100%;
  border-radius: 0;
}
.search-btn:hover {
  background-color: #f8f9fa;
}
</style>

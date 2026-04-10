<template>
  <div class="blog-card bg-white p-3 pt-0 border-0">
    <div class="image-wrapper position-relative">
      <NuxtLink :to="`/blogs/${blog.slug}`">
        <img :src="blog.featuredImage" class="img-fluid w-100 object-fit-cover" :alt="blog.title" />
      </NuxtLink>
      <div class="category-badge text-white fw-bold text-uppercase px-3 py-1">
        {{ blogCategory }}
      </div>
    </div>
    <div class="content pt-1">
      <h3 class="fw-bold mb-3">
        <NuxtLink :to="`/blogs/${blog.slug}`" class="text-dark text-decoration-none title-link">
          {{ blog.title }}
        </NuxtLink>
      </h3>
      <div class="meta text-secondary fs-6">
        <span class="fs-7">By </span><strong class="text-dark">KC GlobEd</strong> &mdash; {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BlogCard",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  computed: {
    blogCategory() {
      if (this.blog.categories && this.blog.categories.length > 0) {
        return this.blog.categories[0].name;
      }
      return "Blog";
    },
    formattedDate() {
      if (!this.blog.published_at) return "";
      const date = new Date(this.blog.published_at);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  }
});
</script>

<style scoped>
.blog-card {
  transition: transform 0.3s ease;
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.image-wrapper {
  overflow: hidden;
}

.image-wrapper img {
  height: 240px;
  transition: transform 0.5s ease;
}

.blog-card:hover .image-wrapper img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #9b3d94; /* Purple color matching the mockup */
  font-size: 11px;
  /* letter-spacing: 0.5px; */
}

.title-link {
  transition: color 0.3s ease;
  font-size: 1rem;
  /* line-height: 1.4; */
}

.title-link:hover {
  color: #9b3d94 !important;
}

.meta {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.fs-7 {
  font-size: 0.8rem;
}
</style>

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
            <div class="search-bar main-menu__search search-toggler" @click="stateStoreInstance.onChange"
              style="cursor: pointer">
              <div class="search-btn">
                <img src="~/assets/img/svgs/search2.svg" alt="image" />
              </div>
            </div>
          </div>

          <div class="option-item">
            <button class="btn side-bar-btn" type="button" @click="stateStoreInstance.onSidebarShow">
              <img src="~/assets/img/svgs/menu2.svg" alt="svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import stateStore from "../../utils/store";

export default defineComponent({
  name: "MainNavbar",
  setup() {
    const isSticky = ref(false);
    const stateStoreInstance = stateStore;

    onMounted(() => {
      window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        isSticky.value = scrollPos >= 100;
      });
    });

    return {
      isSticky,
      stateStoreInstance,
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
</style>

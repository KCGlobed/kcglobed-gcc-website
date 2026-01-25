<template>
  <div class="top-header-warp">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="top-header-details">
            <ul class="social-list">
              <li>
                <a href="https://www.facebook.com/" target="_blank" class="icon">
                  <img src="~/assets/img/svgs/facebook.svg" alt="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/" target="_blank" class="icon">
                  <img src="~/assets/img/svgs/twitter.svg" alt="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/gccschool?igsh=MXQxc2JhazAwcG55cQ==" target="_blank" class="icon">
                  <img src="~/assets/img/svgs/instagram.svg" alt="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" class="icon">
                  <img src="~/assets/img/svgs/linkedin.svg" alt="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_blank" class="icon">
                  <img src="~/assets/img/svgs/youtube.svg" alt="icon" />
                </a>
              </li>
            </ul>
            <ul class="header-contact">
              <li>
                <i class="ti ti-mail"></i>
                <a href="mailto:info@gccschool.com">info@gccschool.com</a>
              </li>
              <li>
                <i class="ti ti-phone-call"></i>
                <a href="tel:9773576111">+919773576111</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="top-header-link-details">
            <ul class="header-link">
              <li>
                <NuxtLink to="https://kcglobed.com/" target="_blank">KC GlobEd</NuxtLink>
              </li>
              <li class="dropdown-wrapper" @mouseenter="openDropdown" @mouseleave="closeDropdown">
                <span class="dropdown-trigger">Campus CEO <i class="ti ti-chevron-down"></i></span>
                <ul class="dropdown-menu" :class="{ show: showDropdown }">
                  <li style="width: 100%; padding: 0px;">
                    <NuxtLink to="/campus-ceo/student">Student</NuxtLink>
                  </li>
                  <li style="width: 100%; padding: 0px;">
                    <NuxtLink to="/campus-ceo/faculty">Faculty</NuxtLink>
                  </li>
                </ul>
              </li>
              <li>
                <NuxtLink to="/partner-with-us">For Partners</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/career">Careers</NuxtLink>
              </li>
            </ul>
            <ul class="header-account">
              <li>
                <i class="ti ti-user"></i>
                <NuxtLink to="/login">Student Login</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      showDropdown: false,
      closeTimer: null
    };
  },
  methods: {
    openDropdown() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
      this.showDropdown = true;
    },
    closeDropdown() {
      this.closeTimer = setTimeout(() => {
        this.showDropdown = false;
      }, 300);
    }
  },
  beforeUnmount() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }
};
</script>

<style scoped>
.top-header-warp {
  background-color: #862E84;
  z-index: 99999;
}

.top-header-details .social-list::before {
  background-color: #F1A63E
}

.top-header-details .header-contact li a {
  color: #fff;
}

.ti-mail:before {
  color: #fff;
}

.top-header-link-details .header-link li a {
  color: #fff;
}

.top-header-link-details .header-account li:last-child i {
  color: #fff;
}

.top-header-link-details .header-account li:last-child a {
  color: #fff;
}

/* Dropdown Styles */
.dropdown-wrapper {
  position: relative;
  cursor: pointer;
}

.dropdown-trigger {
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.dropdown-trigger i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.dropdown-wrapper:hover .dropdown-trigger i {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  color: #333;
  min-width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 0;
  margin-top: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  padding: 0;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  list-style: none;
}

.dropdown-menu li a {
  display: block;
  padding: 12px 20px;
  color: #333 !important;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
}

.dropdown-menu li:last-child a {
  border-bottom: none;
}

.dropdown-menu li a:hover {
  background-color: #862E84;
  color: #fff !important;
}



@media (max-width: 768px) {
  .top-header-warp .row {
    display: none;
  }
}
</style>
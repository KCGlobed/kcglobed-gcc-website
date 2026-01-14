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
                <a href="https://www.instagram.com/" target="_blank" class="icon">
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
                <a href="mailto:info.gccschool.com">info.gccschool.com</a>
              </li>
              <li>
                <i class="ti ti-phone-call"></i>
                <a href="tel:9773576111">9773576111</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="top-header-link-details">
            <ul class="header-link">
              <li>
                <NuxtLink to="/alumni">For Partners</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events">FAQs</NuxtLink>
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
};
</script>

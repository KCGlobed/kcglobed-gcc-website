<template>
  <div class="about-all-pages pt-100">
    <div class="container">
      <div class="inner-all-pages">
        <ul class="about-pages-list">
          <li>
            <NuxtLink to="/about-overview">OVERVIEW</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about-campus">CAMPUS</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about-mission-values">MISSION & VALUES</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about-history">UNIVERSITY HISTORY</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/facilities">Facilities</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPagesList",
};
</script>

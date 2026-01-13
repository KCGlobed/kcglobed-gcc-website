<template>
  <div class="about-all-pages pt-100">
    <div class="container">
      <div class="inner-all-pages">
        <ul class="about-pages-list style2">
          <li>
            <NuxtLink :class="checkOne" to="/personal-information">
              1. PERSONAL INFORMATION
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :class="checkTwo" to="/academic-information">
              2. ACADEMIC INFORMATION
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :class="checkThree" to="/english-proficiency">
              3. ENGLISH PROFICIENCY
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :class="checkFour" to="/program-choice"
              >4. PROGRAM CHOICE</NuxtLink
            >
          </li>
          <li>
            <NuxtLink :class="checkFive" to="/document-upload"
              >5. DOCUMENT UPLOADS</NuxtLink
            >
          </li>
          <li>
            <NuxtLink :class="checkSix" to="/submission"
              >6. SUBMISSION</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplicationPagesList",
  props: [
    "checkOne",
    "checkTwo",
    "checkThree",
    "checkFour",
    "checkFive",
    "checkSix",
  ],
};
</script>

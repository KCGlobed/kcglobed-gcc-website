<template>
  <div class="main-event-warp ptb-100">
    <div class="container">
      <div class="event-title-select">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6">
            <div class="event-title">
              <h2>Join Our Latest Event</h2>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="event-select text-end">
              <select class="form-select" aria-label="Default select example">
                <option selected>Default Sorting</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div
          class="col-lg-6"
          v-for="event in events"
          :key="event.id"
          data-aos="fade-up"
          :data-aos-delay="event.dataDelay"
        >
          <div class="event-widget bg-1">
            <span>{{ event.tag }}</span>
            <h3>
              <NuxtLink to="/event-details">
                {{ event.title }}
              </NuxtLink>
            </h3>
            <ul class="event-list">
              <li>
                <i class="ti ti-calendar"></i>
                {{ event.date }}
              </li>
              <li>
                <i class="ti ti-map-pin"></i>
                {{ event.location }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation example" class="inner-pages-pagination">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <i class="ti ti-chevron-left"></i>
            </a>
          </li>
          <li class="page-item"><a class="page-link active" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">
              <i class="ti ti-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Events",
  data() {
    return {
      events: [
        {
          id: 1,
          bgClass: "bg-1",
          title:
            "Nominate a teacher who made a difference through Tuva's Greatest High School Teacher contest",
          tag: "Career",
          date: "30 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "200",
        },
        {
          id: 2,
          bgClass: "bg-2",
          title:
            "Let us help you plan your finances, from first year to your final year",
          tag: "Alumni",
          date: "29 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "300",
        },
        {
          id: 3,
          bgClass: "bg-2",
          title:
            "Research Frontier Conference: Igniting Intellectual Curiosity",
          tag: "Career",
          date: "28 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "200",
        },
        {
          id: 4,
          bgClass: "bg-1",
          title: "Tuva's Career Fair: Connecting Students with Opportunities",
          tag: "Career",
          date: "27 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "300",
        },
        {
          id: 5,
          bgClass: "bg-2",
          title:
            "Tuva's Annual Fall Festival: A Seasonal Music, Food, and Fun for the Entire Community",
          tag: "Career",
          date: "26 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "200",
        },
        {
          id: 6,
          bgClass: "bg-1",
          title:
            "Sports Extravaganza: Tuva's Athletic Showdown - A Spectacular Display of Skill, Team Spirit",
          tag: "Career",
          date: "25 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "300",
        },
        {
          id: 7,
          bgClass: "bg-2",
          title:
            "Cultural Fusion Night: Celebrating Diversity in Our Tuva Community with Music, Dance",
          tag: "Career",
          date: "24 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "200",
        },
        {
          id: 8,
          bgClass: "bg-1",
          title:
            "Tuva's Creative Showcase - Unveiling the Talents and Imagination of our Students",
          tag: "Career",
          date: "23 Nov 2024",
          location: "32/6, Western Hill, Canada",
          dataDelay: "300",
        },
      ],
    };
  },
});
</script>

<template>
  <div class="information-warp ptb-100">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <div class="information-content">
            <h2 class="reveal2">Information for International students</h2>
            <p>
              The mission of Tuva is to serve as a digital gateway and
              information hub for all members of the university community.
            </p>
            <p>
              Additionally, a university website seeks to foster a sense of
              community and collaboration by facilitating communication and
              engagement among students, faculty, alumni, and prospective
              students.
            </p>
            <ul class="information-list">
              <li>
                <i class="ti ti-check"></i>
                Full time programs for the International students.
              </li>
              <li>
                <i class="ti ti-check"></i>
                Part time programs with stay.
              </li>
              <li>
                <i class="ti ti-check"></i>
                Job opportunities for the best results.
              </li>
            </ul>
            <div class="info-button">
              <NuxtLink to="/contact" class="default-btn style2">
                Contact Form
                <i class="ti ti-arrow-narrow-right"></i>
              </NuxtLink>
              <NuxtLink to="/administration-availability" class="default-btn">
                Program Availability
                <i class="ti ti-arrow-narrow-right"></i>
              </NuxtLink>
            </div>
            <div class="info-link-chat">
              <ul class="chat-list">
                <li>
                  <div class="image">
                    <img src="~/assets/img/smalls/user1.png" alt="image" />
                  </div>
                </li>
                <li>
                  <div class="image">
                    <img src="~/assets/img/smalls/user2.png" alt="image" />
                  </div>
                </li>
                <li>
                  <div class="image">
                    <img src="~/assets/img/smalls/user3.png" alt="image" />
                  </div>
                </li>
              </ul>
              <div class="content">
                <p>Connect with a Tuva International student via chat.</p>
                <a href="#" class="chat-link">
                  <span>Chat Now</span>
                  <i class="ti ti-arrow-narrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6" data-aos="zoom-in-up" data-aos-delay="200">
          <div class="information-image">
            <img src="~/assets/img/informations/information2.jpg" alt="image" />
            <div class="small-image">
              <img
                src="~/assets/img/informations/information1.jpg"
                class="information"
                alt="image"
              />
            </div>
            <div class="round-shape">
              <img
                src="~/assets/img/svgs/main-log.svg"
                class="main-logo"
                alt="image"
              />
              <img
                src="~/assets/img/shapes/text-shape1.png"
                class="text-shape"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationForInternationalStudents",
};
</script>

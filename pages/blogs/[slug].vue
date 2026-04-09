<template>
  <div class="blog-details-page bg-white pb-5">
    <LayoutTopHeader />
    <LayoutMainNavbar />
    
    <div class="container-fluid px-4 px-lg-5 pt-5 pb-5 mt-4" style="max-width: 1536px;">
      <!-- Hero Section -->
      <div class="row align-items-center mb-5 pb-3 border-bottom">
        <div class="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
          <div class="category-badge mb-3 d-inline-block px-3 py-1 text-white fw-bold text-uppercase fs-7">
            {{ blogCategory }}
          </div>
          <h1 class="fw-bold mb-4 display-5 text-dark" style="letter-spacing: -1px; line-height: 1.2;">
            {{ blog.title }}
          </h1>
          
          <div class="meta-section d-flex flex-column gap-2 text-secondary fs-7">
            <div class="d-flex align-items-center gap-3 mb-2 text-dark">
              <div class="social-icons d-flex gap-2">
                <a href="#" class="text-dark"><i class="ti ti-brand-x fw-bold fs-5"></i></a>
                <a href="#" class="text-dark"><i class="ti ti-brand-linkedin fw-bold fs-5"></i></a>
                <a href="#" class="text-dark"><i class="ti ti-brand-reddit fw-bold fs-5"></i></a>
                <a href="#" class="text-dark"><i class="ti ti-link fw-bold fs-5"></i></a>
              </div>
              <span class="d-flex align-items-center gap-1 text-muted">
                <span style="font-size: 5px;">&#9679;</span> 18 Min Read
              </span>
            </div>
            <span>Written by: <strong class="text-dark">KC GlobEd</strong></span>
            <span>Last updated: {{ formattedDate }}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <img :src="blog.featuredImage" class="img-fluid w-100 object-fit-cover shadow-sm" alt="Blog Image" style="max-height: 400px;" />
        </div>
      </div>
      
      <!-- Content Section -->
      <div class="row g-5">
        <!-- Sidebar: Contents -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="contents-sidebar border sticky-top" style="top: 100px; background-color: #fafafa;">
            <h5 class="fw-bold fs-5 px-3 py-3 m-0 border-bottom">Contents</h5>
            <div class="contents-list p-2">
              <a href="#understanding" @click.prevent="scrollToId('understanding')" class="content-link d-block p-2 active text-dark fw-bold text-decoration-none">
                Understanding the Basics: What Are PGP and MBA Programs?
              </a>
              <a href="#pgp-vs-mba" @click.prevent="scrollToId('pgp-vs-mba')" class="content-link d-block p-2 text-muted text-decoration-none mt-1">
                PGP in Business vs MBA: The Difference
              </a>
              <a href="#key-differences" @click.prevent="scrollToId('key-differences')" class="content-link d-block p-2 text-muted text-decoration-none mt-1">
                PGP in Business vs MBA: Key Differences at a Glance
              </a>
              <a href="#which-program" @click.prevent="scrollToId('which-program')" class="content-link d-block p-2 text-muted text-decoration-none mt-1">
                Which Program Is Right for You?
              </a>
              <a href="#career-pathways" @click.prevent="scrollToId('career-pathways')" class="content-link d-block p-2 text-muted text-decoration-none mt-1">
                Career Pathways After PGP in Business vs MBA
              </a>
              <a href="#faqs" @click.prevent="scrollToId('faqs')" class="content-link d-block p-2 text-muted text-decoration-none mt-1">
                FAQs: Common Questions About PGP vs MBA
              </a>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="col-lg-6">
          <div class="blog-content" v-html="blog.content"></div>
        </div>
        
        <!-- Sidebar: Form -->
        <div class="col-lg-3">
          <div class="sticky-top" style="top: 100px; z-index: 1;">
            <CareerCounsellingForm />
          </div>
        </div>
      </div>
    </div>
    
    <LayoutMainFooter />
    <LayoutCopyRight />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CareerCounsellingForm from "~/components/Forms/CareerCounsellingForm.vue";
import defaultImage from "~/assets/img/blogs/inner-blog1.jpg";

export default defineComponent({
  name: "BlogDetailsPage",
  components: {
    CareerCounsellingForm,
  },
  data() {
    return {
      blog: {
          "id": 7,
          "title": "CPA Exam Prep Tips for Students",
          "slug": "cpa-exam-prep-tips-for-students",
          "content": "<p></p><p><span style=\"color: rgb(55, 65, 81);\">Do you face challenges and hindrances while preparing for the CPA Exam? Are you finding it difficult to multitask nowadays? Do you want to cut short the lengthy study plans? Don’t worry, we’ve got you covered! First, we congratulate you for taking the step forward to gaining a global credential that is rapidly gaining popularity and is one of the world’s most trusted profession.</span></p><p><span style=\"color: rgb(55, 65, 81);\">We, at KC GlobEd understand that these thoughts will keep bothering you until you get the right answer. To help you with this, we have come up with a solution to all your challenges with some pro tips to pass your CPA Exam in 1st attempt.</span></p><h2 id=\"understanding\"><strong style=\"color: inherit;\">Most Effective Tips for Qualify CPA Exams:</strong></h2><h3 id=\"pgp-vs-mba\"><strong style=\"color: inherit;\">1. Check your learning style</strong></h3><p><span style=\"color: rgb(55, 65, 81);\">Key to cut short the lengthy study is to recognize what you’re learning style is. Prioritizing what we need to know and identifying what you have already mastered, it saves plenty of hours during the preparation when you know where to focus.</span></p><p><strong style=\"color: rgb(17, 24, 39);\">Tip</strong><span style=\"color: rgb(55, 65, 81);\">: Realtime Score is the most reliable tool to help you gain confidence over how to take the preparation ahead. </span></p><h3 id=\"key-differences\"><strong style=\"color: inherit;\">2. “Get Set Go”</strong></h3><p><strong style=\"color: rgb(17, 24, 39);\"><em>Get</em></strong><span style=\"color: rgb(55, 65, 81);\"> – Get KC GlobEd’s technologically advanced cost-effective study material.</span></p><p><strong style=\"color: rgb(17, 24, 39);\"><em>Set </em></strong><span style=\"color: rgb(55, 65, 81);\">- Complete the initial assessment phase that will help you identify your strong and weak areas and set you for your CPA exam in the most focused and organized way.</span></p><p><strong style=\"color: rgb(17, 24, 39);\"><em>Go </em></strong><span style=\"color: rgb(55, 65, 81);\">– Pass the CPA exam in one go.</span></p><h3 id=\"which-program\"><strong style=\"color: inherit;\">3. Practice MCQs and Simulations</strong></h3><p><span style=\"color: rgb(55, 65, 81);\">Practicing MCQs and Simulations will help you get ready for the actual exam scenario. When you mark an answer, you can read the reason of why your answer was </span><strong style=\"color: rgb(17, 24, 39);\">correct or incorrect</strong><span style=\"color: rgb(55, 65, 81);\">. This is a best practice and will help you in gaining confidence about the concepts.</span></p><h3 id=\"career-pathways\"><strong style=\"color: inherit;\">4. Use Flash Cards</strong></h3><p><span style=\"color: rgb(55, 65, 81);\">Flashcards are a perfect tool to memorize large information in small bits, so you can remember, understand and retain the information that you need to pass your CPA Exams.</span></p><p><span style=\"color: rgb(55, 65, 81);\">Tip: Use Flashcards to expedite your revision a few weeks before your exam.</span></p><h3 id=\"faqs\"><strong style=\"color: inherit;\">5. Attend the live classes by our experienced professional instructors</strong></h3><p><span style=\"color: rgb(55, 65, 81);\">Our instructors will work with you to get you through difficult areas. They impart knowledge and experiences for explaining concepts so that you remember that on your exam day. Attending live classes can really help you pass the CPA exams in 1st attempt as all your queries and doubts are resolved immediately.</span></p><h3><strong style=\"color: inherit;\">6. Attend the Webinars</strong></h3><p><span style=\"color: rgb(55, 65, 81);\">Accounting and finance are industries that are evolving every day! We host regular webinars to keep the students updated on the Academic and Industry changes, Exam tips, and much more, this helps them to pass the CPA exam faster, also helping them in creating a stronger vision for their career.</span></p><h3><strong style=\"color: inherit;\">7. Use the Mentor support wisely</strong></h3><p><span style=\"color: rgb(55, 65, 81);\">A mentor is assigned to every student, with whom the student can have a one-on-one conversation related to their study plans, exam preparation, licensing and even career tips.</span></p><p><em style=\"color: rgb(55, 65, 81);\">We, at </em><em style=\"color: rgb(17, 24, 39);\"><u><a href=\"https://www.kcglobed.com/\" rel=\"noopener noreferrer\" target=\"_blank\">KC GlobEd</a></u></em><em style=\"color: rgb(55, 65, 81);\"> work hard every day to make your CPA Journey easier for you, contact our counsellors now to understand the process to become a future CPA!</em></p><p><em style=\"color: rgb(55, 65, 81);\">Call us on 011-</em><span style=\"color: rgb(55, 65, 81);\">47593546/+91 97735 76111 </span></p><p></p>",
          "excerpt": "Do you face challenges and hindrances while preparing for the CPA Exam?",
          "featuredImage": "https://storage.googleapis.com/gcc_static_files_backend/media/blog/images/Book-Mockup-1-front.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcc-backend-sa%40gcc-backend.iam.gserviceaccount.com%2F20260409%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260409T114014Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=2ae312c444c567cbbad202288bc0cde203df93814c265632e95a977ef8211821a29d68eed2e35db3aad7d6b84c2d032a18562a6e54d7dca5f7a7b56223d0b44f53cb0a1caffa67b1265b1d6efbcb4636d0d73e099b2a610f48ee0b3fd20d53e9d31833cd08491012d85c16c507fe9d10f4c09d8bfc3fd127951b04be0f42adcf6d28a5dd0a1e976200b0cc07a88eda16c4d0a5072133444852f5e9acff2cbd3fa5af79a39f708eab07f3fd42d21cc7a79c5ec5bcccb06ea25cd50c2bc166fff838b719f2e11e34fe0d166001726ea3403bd50df766ba8b2a3a68b3dc2c26edbd729c6e9d1fbed1c4ab5212bb7052317b83e748ae0cf28eb2aee65dae721edb9b",
          "blogStatus": "published",
          "published_at": "2026-02-09T15:44:00+05:30",
          "metaTitle": "Do you face challenges and hindrances while preparing for the CPA Exam?",
          "metaDescription": "Do you face challenges and hindrances while preparing for the CPA Exam?",
          "status": false,
          "created_at": "2026-02-09T15:44:28.534905+05:30",
          "updated_at": "2026-02-09T15:44:28.534918+05:30",
          "categories": [
              {
                  "id": 1,
                  "name": "CPA EXAM",
                  "status": true,
                  "created_at": "2026-02-09T10:57:36.137291+05:30",
                  "updated_at": "2026-02-09T10:57:36.137291+05:30"
              }
          ]
      }
    };
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
        hour: "numeric",
        minute: "numeric",
      });
    }
  },
  methods: {
    scrollToId(id: string) {
      const el = document.getElementById(id);
      if (el) {
        // Find the top position of the element, factoring in 120px offset for the sticky header
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }
});
</script>

<style scoped>
.category-badge {
  background-color: #9b3d94;
  letter-spacing: 0.5px;
  border-radius: 5px;
}
.fs-7 {
  font-size: 0.85rem;
}
.text-purple {
  color: #9b3d94;
}

.blog-content p, .blog-content li {
  color: #4a4a4a;
  line-height: 1.7;
  font-size: 15px;
}

.content-link {
  font-size: 13px;
  border-radius: 4px;
}

.content-link:hover {
  background-color: #eaeaea;
  color: #111 !important;
}

.content-link.active {
  background-color: #e6e6e6; 
}
</style>

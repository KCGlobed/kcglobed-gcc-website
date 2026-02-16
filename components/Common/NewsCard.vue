<template>
    <div class="news-area ptb-100">
        <div class="container">
            <div class="section-header text-center mb-5" data-aos="fade-up">
                <h2 class="section-title">AS FEATURED IN <span class="highlight">LEADING MEDIA</span></h2>
            </div>

            <div class="row g-4">
                <div v-for="news in newsList" :key="news.id" class="col-lg-4 col-md-6 col-sm-12">
                    <div class="news-card">
                        <div class="news-image">
                            <img :src="news.image" :alt="news.title" class="img-fluid">
                            <span class="category">{{ news.category }}</span>
                        </div>
                        <div class="news-content">
                            <ul class="meta">
                                <li><i class="ri-calendar-line"></i> {{ news.date }}</li>
                                <li><i class="ri-user-line"></i> By Admin</li>
                            </ul>
                            <h3><a :href="news.url" target="_blank">{{ news.title }}</a></h3>
                            <p>{{ news.excerpt }}</p>
                            <a :href="news.url" class="read-more-btn" target="_blank">Read More <i
                                    class="ri-arrow-right-line"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const newsList = [
    {
        id: 1,
        title: "GCC School and KC GlobEd Host Round Table Meeting on Impact of AI on GCCs - Building the Future Workforce",
        excerpt: "GCC School and KC GlobEd successfully organised a dynamic Round Table meeting on the theme “Impact of AI on GCCs - Building the Future Workforce” at Welcome hotel by ITC Hotels, Delhi-Gurugram Highway. The session witnessed participation from senior leaders of reputed organisations, who shared insightful perspectives on how the implementation of Artificial Intelligence is transforming workforce models and talent strategies within Global Capability Centres (GCCs)....",
        date: "Jan 29, 2026",
        category: "Business and Finance",
        image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/download.png",
        url: "https://www.ptinews.com/press-release/gcc-school-and-kc-globed-host-round-table-meeting-on-impact-of-ai-on-gccs-building-the-future-workforce/3323548"
    },
    {
        id: 2,
        title: "UK ACCA Exams: How students should prepare and what careers to expect",
        excerpt: "With UK ACCA examinations approaching, many Indian students are navigating last-minute preparation pressures, eligibility questions, and uncertainty around career outcomes. While ACCA is widely recognised as a global qualification in accounting and finance, success in the exams often depends as much on exam strategy, discipline, and mindset as on subject knowledge....",
        date: "Jan 12, 2026",
        category: "Education",
        image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/College_students_1765017803976_1765017804175_1768220498686.avif",
        url: "https://www.hindustantimes.com/education/competitive-exams/uk-acca-exams-how-students-should-prepare-and-what-careers-to-expect-101768219881933.html#google_vignette"
    },
    {
        id: 3,
        title: "Tech4ed 2025 Sets New Benchmark In Global Learning With Strategic Collaborations And Knowledge Exchange",
        excerpt: "The 2nd edition of Tech4Ed International Conference 2025, organised under the aegis of the Association of Indian Universities (AIU) and KC GlobEd, concluded on an inspiring note at The Park, New Delhi. The event brought together a distinguished gathering of academic leaders,...",
        date: "Nov 14, 2025",
        category: "Tech4ed",
        image: "https://storage.googleapis.com/gcc_prod_static_files_backend/static/images/F_92102image_story.jpeg",
        url: "https://menafn.com/1110349919/Tech4ed-2025-Sets-New-Benchmark-In-Global-Learning-With-Strategic-Collaborations-And-Knowledge-Exchange"
    }
]
</script>

<style scoped>
.news-area {
    background-color: #f8fafc;
}

.section-header .sub-title {
    color: #A13E99;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
    display: block;
}

.section-title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 15px;
    line-height: 1.3;
    text-transform: uppercase;
}

.section-title::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    background: #F1A63E;
    margin: 15px auto 0;
    border-radius: 10px;
}

.highlight {
    color: #F1A63E;
}

.section-title p {
    color: #A13E99;
    font-size: 18px;
}

.max-600 {
    max-width: 650px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.news-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.4s ease;
    height: 100%;
}

.news-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.news-image {
    position: relative;
    overflow: hidden;
    height: 200px;
}

.news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.news-card:hover .news-image img {
    transform: scale(1.1);
}

.news-image .category {
    position: absolute;
    bottom: 15px;
    left: 15px;
    background: #A13E99;
    color: #fff;
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}

.news-content {
    padding: 20px;
}

.news-content .meta {
    list-style: none;
    padding: 0;
    margin: 0 0 10px;
    display: flex;
    gap: 15px;
}

.news-content .meta li {
    font-size: 13px;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 5px;
}

.news-content h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 1.4;
}

.news-content h3 a {
    color: #1e293b;
    text-decoration: none;
    transition: color 0.3s ease;
}

.news-content h3 a:hover {
    color: #3b82f6;
}

.news-content p {
    color: #64748b;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
}

.read-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #A13E99;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    transition: gap 0.3s ease;
}

.read-more-btn:hover {
    gap: 10px;
}

@media (max-width: 991px) {
    .section-title h2 {
        font-size: 28px;
    }
}
</style>
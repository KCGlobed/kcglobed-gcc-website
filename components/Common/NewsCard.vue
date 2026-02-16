<template>
    <div class="news-area ptb-100">
        <div class="container">
            <div class="section-header text-center mb-5" data-aos="fade-up">
                <h2 class="section-title">LATEST FINANCE & <span class="highlight">MARKET NEWS</span></h2>
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
                            <h3><a href="#">{{ news.title }}</a></h3>
                            <p>{{ news.excerpt }}</p>
                            <a href="#" class="read-more-btn">Read More <i class="ri-arrow-right-line"></i></a>
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
        title: "Global Markets Rally Amidst Easing Inflation Concerns",
        excerpt: "Investors show renewed confidence as recent economic data suggests a potential slowdown in inflation rates across major economies...",
        date: "Feb 04, 2026",
        category: "Markets",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "The Rise of Fintech: How Digital Banking is Changing Everything",
        excerpt: "Traditional banking models are being challenged by agile fintech startups offering personalized and frictionless financial services...",
        date: "Feb 03, 2026",
        category: "Fintech",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Sustainable Finance: Investing in a Greener Future",
        excerpt: "ESG investing reaches new heights as both institutional and retail investors prioritize environmental and social impact alongside returns...",
        date: "Feb 02, 2026",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
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
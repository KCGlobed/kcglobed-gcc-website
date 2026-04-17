<template>
    <div class="news-card">
        <div class="news-image">
            <NuxtLink :to="news.url" target="_blank">
                <img :src="news.image" :alt="news.title" loading="lazy" />
            </NuxtLink>
            <span class="category-badge">{{ news.category }}</span>
        </div>
        <div class="news-content">
            <div class="meta">
                <span class="meta-item">
                    <i class="ri-calendar-2-line"></i>
                    {{ news.date }}
                </span>
                <span class="meta-item">
                    <i class="ri-user-3-line"></i>
                    Admin
                </span>
            </div>
            <h3>
                <a :href="news.url" target="_blank" rel="noopener">{{ news.title }}</a>
            </h3>
            <p>{{ news.excerpt }}</p>
            <a :href="news.url" class="read-more-btn" target="_blank" rel="noopener">
                Read More
                <!-- <span class="btn-arrow"><i class="ri-arrow-right-line"></i></span> -->
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    news: {
        id: number | string;
        title: string;
        excerpt: string;
        date: string;
        category: string;
        image: string;
        url: string;
    }
}>();
</script>

<style scoped>
/* ========== Card ========== */
.news-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.35s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.news-card:hover {
    transform: translateY(-8px);
}

/* ========== Card Image ========== */
.news-image {
    position: relative;
    overflow: hidden;
    height: 210px;
    flex-shrink: 0;
}

.news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s ease;
    display: block;
}

.news-card:hover .news-image img {
    transform: scale(1.08);
}

.category-badge {
    position: absolute;
    bottom: 14px;
    left: 14px;
    background: linear-gradient(135deg, #A13E99, #7c2e76);
    color: #fff;
    padding: 5px 14px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(161, 62, 153, 0.35);
}

/* ========== Card Content ========== */
.news-content {
    padding: 22px 24px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.meta {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.meta-item {
    font-size: 12.5px;
    color: #94a3b8;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
}

.meta-item i {
    font-size: 14px;
    color: #A13E99;
}

.news-content h3 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.news-content h3 a {
    color: #1e293b;
    text-decoration: none;
    transition: color 0.3s ease;
}

.news-content h3 a:hover {
    color: #A13E99;
}

.news-content p {
    color: #64748b;
    font-size: 13.5px;
    line-height: 1.65;
    margin-bottom: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
}

.read-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #A13E99;
    font-weight: 700;
    font-size: 13.5px;
    text-decoration: none;
    margin-top: auto;
    transition: gap 0.3s ease, color 0.3s ease;
}

.read-more-btn:hover {
    color: #7c2e76;
    gap: 12px;
}

.btn-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: rgba(161, 62, 153, 0.1);
    border-radius: 50%;
    transition: background 0.3s ease;
    font-size: 13px;
}

.read-more-btn:hover .btn-arrow {
    background: rgba(161, 62, 153, 0.2);
}

@media (max-width: 767px) {
    .news-image {
        height: 190px;
    }
}
</style>

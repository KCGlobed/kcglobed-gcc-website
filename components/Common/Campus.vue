<template>
    <div class="campus">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="campus-content">
                        <h2>OUR <span class="highlight">CAMPUS</span></h2>

                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="campus-image">
                        <img src="https://pub-1c3aa4d882c24d66ac8e49a3fe6fbb71.r2.dev/static/images/DLF%20Full%20Image%20Building.jpg"
                            alt="Our Campus" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.campus {
    padding: 50px 0;
    background: #ffff;
}

.campus-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 20px auto;
}

.campus-content h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #0d0d25;
    text-transform: uppercase;
    line-height: 1.3;
}

.campus-content h2::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    background: #F1A63E;
    margin: 18px auto 0;
    border-radius: 10px;
}

.highlight {
    color: #F1A63E;
}

.campus-content p {
    font-size: 16px;
    line-height: 1.7;
    color: #6b7280;
}

.campus-image {
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
}

.campus-image img {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .campus {
        padding: 30px 0;
    }

    .campus-content h2 {
        font-size: 28px;
    }

    .campus-content p {
        font-size: 14px;
    }

    .campus-image img {
        height: 250px;
    }
}
</style>

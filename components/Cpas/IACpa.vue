<template>
    <div class="ia-program-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title">I-Gen Pathway for <span class="highlight">New Tomorrow</span></h2>
            </div>
        </div>
        <div class="container">
            <div class="pathway-image-wrapper">
                <!-- Laptop View Image -->
                <img 
                    src="~/assets/img/CPA-img/CPA-table-laptop.svg" 
                    alt="I-Gen Pathway Laptop" 
                    class="w-100 d-none d-md-block img-fluid" 
                    loading="lazy" 
                    decoding="async" 
                />
                <!-- Mobile View Image -->
                <img 
                    src="~/assets/img/CPA-img/CPA-table-mobile.png" 
                    alt="I-Gen Pathway Mobile" 
                    class="w-100 d-block d-md-none img-fluid" 
                    loading="lazy" 
                    decoding="async" 
                />
            </div>
        </div>
    </div>
</template>

<script setup>
// No reactive data is required for the static pathway images representation.
</script>

<style scoped>

.ia-program-area {
    background-color: #f3f4f6;
}

.section-title {
    margin-bottom: 50px;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 20px;
    text-transform: uppercase;
    position: relative;
}

.title::after {
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

.rounded-12 {
    border-radius: 12px;
}

.border {
    border: 1px solid #e5e7eb !important;
}

.pathway-image-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    /* background-color: #fff; */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 767px) {
    .title {
        font-size: 24px;
        line-height: 32px;
    }

    .section-title {
        margin-bottom: 30px;
    }

    .ia-program-area {
        padding: 40px 0px;
    }
}
</style>

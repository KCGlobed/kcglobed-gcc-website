<template>
    <div class="ai-program-main ptb-100">
        <div class="container">
            <div class="section-title">
                <h3 class="main-title">AI-ENABLED INTEGRATED PROGRAM</h3>
                <h2 class="sub-title">100% ALIGNED FOR THE GCC NICHE DOMAINS FOR NEXT-GEN PREMIUM CAREERS</h2>
            </div>

            <div class="domains-grid">
                <div v-for="(domain, index) in domains" :key="index"
                    :class="['domain-card', domain.color, { 'centered-card': domain.centered }]">
                    <div class="domain-icon">
                        <i :class="domain.icon"></i>
                    </div>
                    <div class="card-footer-text">
                        <h4 class="domain-title" v-html="domain.title"></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AIProgram",
    data() {
        return {
            domains: [
                { title: 'Audit &<br>Assurance', icon: 'ti ti-shield-check', color: 'blue' },
                { title: 'Accounting<br>Advisory', icon: 'ti ti-building-bank', color: 'magenta' },
                { title: 'Risk<br>Management', icon: 'ti ti-shield', color: 'purple' },
                { title: 'Financial<br>Accounting &<br>Reporting', icon: 'ti ti-file-text', color: 'magenta' },
                { title: 'Management<br>Accounting', icon: 'ti ti-user-cog', color: 'purple' },
                { title: 'FP&A', icon: 'ti ti-chart-arrows', color: 'blue' },
                { title: 'CFO<br>Advisory', icon: 'ti ti-user-search', color: 'blue' },
                { title: 'Transaction<br>Advisory', icon: 'ti ti-hand-shake', color: 'magenta' },
                { title: 'Corporate<br>Governance &<br>Compliance', icon: 'ti ti-gavel', color: 'purple' },
                // { title: 'International<br>Tax Advisory', icon: 'ti ti-calculator', color: 'purple', centered: true },
            ]
        }
    }
};
</script>

<style scoped>
.ai-program-main {
    background-color: #f3f4f6;
}

.section-title {
    margin-bottom: 60px;
}

.main-title {
    font-size: 18px;
    font-weight: 700;
    color: #2b2d6a;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
}

.sub-title {
    font-size: 22px;
    font-weight: 700;
    color: #f1a63e;
    text-transform: uppercase;
    max-width: 800px;
    margin: 0 auto;
}

.domains-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-width: 1000px;
    margin: 0 auto;
}

.domain-card {
    border-radius: 12px;
    padding: 20px;
    color: #fff;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: transform 0.3s ease;
    cursor: pointer;
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.domain-card:hover {
    transform: translateY(-5px);
}

.domain-card.blue {
    background-color: #1d2050;
    /* Navy mapping to blue class */
}

.domain-card.magenta {
    background-color: #ba1b94;
}

.domain-card.purple {
    background-color: #63189f;
}

.centered-card {
    grid-column: 2 / 3;
}

.domain-title {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    line-height: 1.2;
    text-align: left;
}

.domain-icon {
    background: #fff;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    right: 20px;
}

.domain-icon i {
    font-size: 28px;
}

/* Color icons based on card background */
.domain-card.blue .domain-icon i {
    color: #1d2050;
}

.domain-card.magenta .domain-icon i {
    color: #ba1b94;
}

.domain-card.purple .domain-icon i {
    color: #63189f;
}

.ai-program-bottom-footer {
    max-width: 1000px;
    margin: 50px auto 0;
}

.learning-platform h5 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: #fff;
    /* Adjusted to be visible on grayish bg if needed, but in image it looks white/light */
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    color: #eee;
}

.learning-platform span {
    font-size: 14px;
    color: #bbb;
}

.certification-list span {
    font-size: 18px;
    font-weight: 600;
    color: #eee;
    margin-left: 20px;
}

/* Responsive Styles */
@media screen and (max-width: 991px) {
    .domains-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 650px;
    }

    .centered-card {
        grid-column: span 1;
    }
}

@media screen and (max-width: 767px) {
    .sub-title {
        font-size: 16px;
    }

    .domains-grid {
        grid-template-columns: 1fr;
        max-width: 320px;
    }

    .certification-list {
        text-align: center;
        margin-top: 20px;
    }

    .certification-list span {
        margin: 0 10px;
        display: inline-block;
    }

    .text-end {
        text-align: center !important;
    }

    .learning-platform {
        text-align: center;
    }
}
</style>
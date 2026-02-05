<template>
    <div class="pathway-section">
        <div class="container">
            <!-- Compact Header -->
            <div class="section-header" data-aos="fade-up">
                <span class="badge">Your Journey</span>
                <h2 class="title">Pathway to <span class="highlight">Success</span></h2>
            </div>

            <!-- Compact Steps Grid -->
            <div class="steps-grid">
                <div v-for="(step, index) in steps" :key="index" 
                     class="step-item" 
                     data-aos="fade-up"
                     :data-aos-delay="index * 50">
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-icon" v-html="step.icon"></div>
                    <h4 class="step-title">{{ step.title }}</h4>
                    <p class="step-desc">{{ step.description }}</p>
                </div>
            </div>

            <!-- Compact Eligibility -->
            <div class="eligibility-box" data-aos="fade-up">
                <div class="box-header">
                    <i class="ti ti-check-circle"></i>
                    <h3>NFET Eligibility</h3>
                </div>
                <div class="criteria-list">
                    <div v-for="(criteria, index) in eligibilityCriteria" :key="index" class="criteria">
                        <i class="ti ti-circle-check"></i>
                        <span>{{ criteria }}</span>
                    </div>
                </div>
                <NuxtLink to="/admissions" class="apply-btn">
                    Apply Now <i class="ti ti-arrow-right"></i>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const steps = [
    {
        title: 'Qualify NFET Exam',
        description: 'Pass our entrance assessment',
        icon: '<i class="ti ti-clipboard-check"></i>'
    },
    {
        title: 'Visit DLF Cyber City',
        description: 'Get your exclusive campus invite',
        icon: '<i class="ti ti-ticket"></i>'
    },
    {
        title: 'Hiring Drive',
        description: 'Meet top industry employers',
        icon: '<i class="ti ti-users-group"></i>'
    },
    {
        title: 'Offer Letter',
        description: 'Receive your admission offer',
        icon: '<i class="ti ti-file-certificate"></i>'
    },
    {
        title: 'Start Learning',
        description: 'Begin your transformation',
        icon: '<i class="ti ti-rocket"></i>'
    }
]

const eligibilityCriteria = [
    'B.Com (First Division)',
    'B.Com + M.Com / MBA / PG (First Division)',
    'Indian Citizen',
    'Born on or after January 1, 1996'
]
</script>

<style scoped>
.pathway-section {
    background: white;
    padding: 60px 0;
    position: relative;
}

/* Header */
.section-header {
    text-align: center;
    margin-bottom: 50px;
}

.badge {
    display: inline-block;
    background: rgba(252, 100, 65, 0.1);
    color: #fc6441;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 15px;
    border: 1px solid rgba(252, 100, 65, 0.2);
}

.title {
    font-size: 36px;
    font-weight: 700;
    color: #0d0d25;
    margin: 0;
}

.highlight {
    background: linear-gradient(135deg, #fc6441 0%, #ff8566 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Steps Grid */
.steps-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-bottom: 50px;
}

.step-item {
    background: white;
    border: 2px solid #f0f0f0;
    border-radius: 16px;
    padding: 25px 20px;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
}

.step-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #fc6441, #ff8566);
    border-radius: 16px 16px 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.step-item:hover {
    border-color: #fc6441;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(252, 100, 65, 0.15);
}

.step-item:hover::before {
    opacity: 1;
}

.step-number {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #fc6441, #ff8566);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
}

.step-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(252, 100, 65, 0.1), rgba(255, 133, 102, 0.1));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    color: #fc6441;
    font-size: 26px;
}

.step-title {
    font-size: 16px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 8px;
    line-height: 1.3;
}

.step-desc {
    font-size: 13px;
    color: #525271;
    line-height: 1.5;
    margin: 0;
}

/* Eligibility Box */
.eligibility-box {
    max-width: 800px;
    margin: 0 auto;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border: 2px solid #e9ecef;
    border-radius: 20px;
    padding: 35px;
}

.box-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e9ecef;
}

.box-header i {
    font-size: 32px;
    color: #10b981;
}

.box-header h3 {
    font-size: 22px;
    font-weight: 700;
    color: #0d0d25;
    margin: 0;
}

.criteria-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.criteria {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #0d0d25;
    transition: all 0.3s ease;
}

.criteria:hover {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.05);
}

.criteria i {
    font-size: 20px;
    color: #10b981;
}

.apply-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 35px;
    background: linear-gradient(135deg, #fc6441, #ff8566);
    color: white;
    font-size: 16px;
    font-weight: 600;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 8px 20px rgba(252, 100, 65, 0.3);
    transition: all 0.3s ease;
}

.apply-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(252, 100, 65, 0.4);
    color: white;
}

.apply-btn i {
    font-size: 18px;
    transition: transform 0.3s ease;
}

.apply-btn:hover i {
    transform: translateX(3px);
}

/* Responsive */
@media (max-width: 1200px) {
    .steps-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .pathway-section {
        padding: 40px 0;
    }

    .title {
        font-size: 28px;
    }

    .steps-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .step-item {
        padding: 20px 15px;
    }

    .step-title {
        font-size: 14px;
    }

    .step-desc {
        font-size: 12px;
    }

    .eligibility-box {
        padding: 25px 20px;
    }

    .criteria-list {
        grid-template-columns: 1fr;
    }

    .apply-btn {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .steps-grid {
        grid-template-columns: 1fr;
    }

    .step-number {
        width: 24px;
        height: 24px;
        font-size: 12px;
    }

    .step-icon {
        width: 45px;
        height: 45px;
        font-size: 22px;
    }
}
</style>
<template>
    <div class="gcc-commerce-section ptb-100">
        <div class="container">
            <!-- Section Header -->
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Why GCC School For Commerce Graduate?</h2>
                <h3 class="section-subtitle">
                    World's first school, built by GCC leaders to shape the nation's future GCC talent
                </h3>
            </div>

            <!-- Features Grid -->
            <div class="features-grid" data-aos="fade-up" data-aos-delay="200">
                <div v-for="(feature, index) in features" :key="index" class="feature-card" :data-aos="'zoom-in'"
                    :data-aos-delay="100 * (index + 1)">
                    <div class="feature-number">{{ index + 1 }}</div>
                    <div class="feature-content">
                        <h4>{{ feature.title }}</h4>
                        <p v-if="feature.subtitle">{{ feature.subtitle }}</p>
                    </div>
                    <div class="feature-icon">
                        <i :class="feature.icon"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Background Decorations -->
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>
        <div class="bg-shape shape-3"></div>
    </div>
</template>

<script>
export default {
    name: "GccCommerse",
    data() {
        return {
            features: [
                {
                    title: "GCC-backed ecosystem",
                    icon: "ti ti-building-community"
                },
                {
                    title: "Hiring commitment",
                    subtitle: "before admission",
                    icon: "ti ti-briefcase"
                },
                {
                    title: "GCC industry-aligned",
                    subtitle: "curriculum and delivery pedagogy",
                    icon: "ti ti-school"
                },
                {
                    title: "Job-role readiness",
                    subtitle: "assurance",
                    icon: "ti ti-certificate"
                },
                {
                    title: "Niche finance domain",
                    subtitle: "focused",
                    icon: "ti ti-chart-line"
                },
                {
                    title: "In-built 6-month paid",
                    subtitle: "internship",
                    icon: "ti ti-briefcase-2"
                },
                {
                    title: "Hyper-personalised",
                    subtitle: "learning experience",
                    icon: "ti ti-user-star"
                },
                {
                    title: "Early exposure to",
                    subtitle: "corporate culture and work environment",
                    icon: "ti ti-building-skyscraper"
                },
                {
                    title: "Best in Class Industry",
                    subtitle: "Instructors",
                    icon: "ti ti-award"
                }
            ]
        };
    }
};
</script>

<style scoped>
/* Section Styling */
.gcc-commerce-section {
    position: relative;
    background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 50%, #fff5f7 100%);
    overflow: hidden;
}

/* Background Shapes */
.bg-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.1;
    z-index: 0;
}

.bg-shape.shape-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    top: -100px;
    right: -100px;
}

.bg-shape.shape-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    bottom: -80px;
    left: -80px;
}

.bg-shape.shape-3 {
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Section Header */
.section-header {
    text-align: center;
    margin-bottom: 60px;
    position: relative;
    z-index: 2;
}

.section-title {
    font-size: 42px;
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 20px;
    line-height: 1.3;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-subtitle {
    font-size: 20px;
    font-weight: 600;
    color: #4a5568;
    line-height: 1.6;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Features Grid */
.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    position: relative;
    z-index: 2;
}

/* Feature Card */
.feature-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    padding: 30px;
    position: relative;
    transition: all 0.4s ease;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f5576c 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.5);
    border-color: rgba(102, 126, 234, 0.3);
}

.feature-card:hover::before {
    transform: scaleX(1);
}

/* Feature Number */
.feature-number {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
}

.feature-card:hover .feature-number {
    transform: scale(1.1) rotate(5deg);
}

/* Feature Content */
.feature-content {
    padding-left: 50px;
    min-height: 80px;
}

.feature-content h4 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
    line-height: 1.4;
}

.feature-content p {
    font-size: 15px;
    color: #718096;
    margin: 0;
    line-height: 1.5;
}

/* Feature Icon */
.feature-icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.feature-icon i {
    font-size: 26px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.feature-card:hover .feature-icon {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
}

/* Responsive Design */
@media (max-width: 991px) {
    .section-title {
        font-size: 36px;
    }

    .section-subtitle {
        font-size: 18px;
    }

    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .feature-card {
        padding: 25px;
    }

    .feature-content h4 {
        font-size: 17px;
    }

    .feature-content p {
        font-size: 14px;
    }
}

@media (max-width: 767px) {
    .section-title {
        font-size: 28px;
    }

    .section-subtitle {
        font-size: 16px;
    }

    .features-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .feature-card {
        padding: 20px;
    }

    .feature-number {
        width: 35px;
        height: 35px;
        font-size: 16px;
    }

    .feature-content {
        padding-left: 45px;
        min-height: 70px;
    }

    .feature-content h4 {
        font-size: 16px;
    }

    .feature-content p {
        font-size: 13px;
    }

    .feature-icon {
        width: 45px;
        height: 45px;
    }

    .feature-icon i {
        font-size: 22px;
    }
}

@media (max-width: 576px) {
    .section-title {
        font-size: 24px;
    }

    .section-subtitle {
        font-size: 15px;
    }
}
</style>

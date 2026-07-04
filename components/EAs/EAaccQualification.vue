<template>
    <div class="cpa-qualification-area ptb-100 bg-light-gray">
        <div class="container">
            <div class="row g-4 justify-content-center">
                <!-- Card 1: Individuals -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up">
                    <div class="qualification-card">
                        <div class="card-pill-header">
                            INDIVIDUALS
                        </div>
                        
                        <div class="cream-content-box">
                            <div class="content-header d-flex justify-content-between mb-3">
                                <span class="header-title">Content Area</span>
                                <span class="header-questions">Questions</span>
                            </div>
                            <div class="content-rows">
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Preliminary Work & Taxpayer Data</span>
                                    <span class="row-value">14</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Income & Assets</span>
                                    <span class="row-value">17</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Deductions & Credits</span>
                                    <span class="row-value">17</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Taxation</span>
                                    <span class="row-value">15</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Advising the Individual Taxpayer</span>
                                    <span class="row-value">11</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Specialized Returns for Individuals</span>
                                    <span class="row-value">11</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer-text">
                            100 Multiple Choice Questions
                        </div>
                    </div>
                </div>

                <!-- Card 2: Businesses -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="qualification-card">
                        <div class="card-pill-header">
                            BUSINESSES
                        </div>
                        
                        <div class="cream-content-box">
                            <div class="content-header d-flex justify-content-between mb-3">
                                <span class="header-title">Content Area</span>
                                <span class="header-questions">Questions</span>
                            </div>
                            <div class="content-rows">
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Business Entities & Considerations</span>
                                    <span class="row-value">30</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Business Tax Preparation</span>
                                    <span class="row-value">37</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Specialized Returns & Taxpayers</span>
                                    <span class="row-value">18</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer-text">
                            100 Multiple Choice Questions
                        </div>
                    </div>
                </div>

                <!-- Card 3: Representation, Practices & Procedures -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="qualification-card">
                        <div class="card-pill-header">
                            REPRESENTATION, PRACTICES & PROCEDURES
                        </div>
                        
                        <div class="cream-content-box">
                            <div class="content-header d-flex justify-content-between mb-3">
                                <span class="header-title">Content Area</span>
                                <span class="header-questions">Questions</span>
                            </div>
                            <div class="content-rows">
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Practice & Procedures</span>
                                    <span class="row-value">26</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Representation before the IRS</span>
                                    <span class="row-value">25</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Specific Areas of Representation</span>
                                    <span class="row-value">20</span>
                                </div>
                                <div class="content-row d-flex justify-content-between">
                                    <span class="row-label">Filing Process</span>
                                    <span class="row-value">14</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer-text">
                            100 Multiple Choice Questions
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// CPA Qualification structure section component
</script>

<style scoped>
.cpa-qualification-area {
    padding-top: 80px;
    padding-bottom: 80px;
}

.bg-light-gray {
    background-color: #eaeaea; /* Light grey block background matching reference */
}

.qualification-card {
    background-color: #ffffff;
    border-radius: 28px;
    border: 1px solid #e0e0e0;
    padding: 30px 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qualification-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.card-pill-header {
    background-color: #bca15a; /* Ochre/Gold color matching the image */
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    text-align: center;
    padding: 12px 20px;
    border-radius: 24px;
    margin-bottom: 24px;
    letter-spacing: 0.03em;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}

.cream-content-box {
    background-color: #fff9ed; /* Soft warm cream background */
    border-radius: 20px;
    padding: 24px 20px;
    flex-grow: 1;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
}

.content-header {
    font-size: 14px;
    font-weight: 800;
    color: #111111;
    border-bottom: 1.5px solid rgba(180, 134, 41, 0.15);
    padding-bottom: 8px;
}

.content-rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;
}

.content-row {
    font-size: 14.5px;
    line-height: 1.4;
    align-items: center;
}

.row-label {
    color: #333333;
    font-weight: 500;
}

.row-value {
    color: #111111;
    font-weight: 700;
    margin-left: 15px;
}

.card-footer-text {
    font-size: 18px;
    font-weight: 700;
    color: #bca15a; /* Gold text */
    text-align: center;
    letter-spacing: 0.01em;
}

@media (max-width: 991px) {
    .qualification-card {
        padding: 24px 18px;
    }
    
    .cream-content-box {
        padding: 20px 16px;
    }
}

@media (max-width: 767px) {
    .cpa-qualification-area {
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .card-pill-header {
        font-size: 14px;
        margin-bottom: 20px;
        min-height: 44px;
    }

    .card-footer-text {
        font-size: 16px;
    }
}
</style>
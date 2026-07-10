<template>
    <section class="cpa-exam-section ptb-100">
        <div class="container">

            <div class="exam-group">
                <h2 class="group-title">ENROLLED AGENT (EA) EXAM</h2>

                <div class="exam-grid">

                    <!-- Card 1: Individuals -->
                    <div class="exam-card" data-aos="fade-up">
                        <div class="exam-card-title">
                            INDIVIDUALS
                        </div>

                        <div class="exam-content">
                            <div class="table-header">
                                <span>Content Area</span>
                                <span>Questions</span>
                            </div>

                            <div class="exam-row">
                                <span>Preliminary Work &amp; Taxpayer Data</span>
                                <span>14</span>
                            </div>
                            <div class="exam-row">
                                <span>Income &amp; Assets</span>
                                <span>17</span>
                            </div>
                            <div class="exam-row">
                                <span>Deductions &amp; Credits</span>
                                <span>17</span>
                            </div>
                            <div class="exam-row">
                                <span>Taxation</span>
                                <span>15</span>
                            </div>
                            <div class="exam-row">
                                <span>Advising the Individual Taxpayer</span>
                                <span>11</span>
                            </div>
                            <div class="exam-row">
                                <span>Specialized Returns for Individuals</span>
                                <span>11</span>
                            </div>
                        </div>

                        <div class="exam-footer">
                            <span class="full-width-footer">100 Multiple Choice Questions</span>
                        </div>
                    </div>

                    <!-- Card 2: Businesses -->
                    <div class="exam-card" data-aos="fade-up" data-aos-delay="100">
                        <div class="exam-card-title">
                            BUSINESSES
                        </div>

                        <div class="exam-content">
                            <div class="table-header">
                                <span>Content Area</span>
                                <span>Questions</span>
                            </div>

                            <div class="exam-row">
                                <span>Business Entities &amp; Considerations</span>
                                <span>30</span>
                            </div>
                            <div class="exam-row">
                                <span>Business Tax Preparation</span>
                                <span>37</span>
                            </div>
                            <div class="exam-row">
                                <span>Specialized Returns &amp; Taxpayers</span>
                                <span>18</span>
                            </div>
                        </div>

                        <div class="exam-footer">
                            <span class="full-width-footer">100 Multiple Choice Questions</span>
                        </div>
                    </div>

                    <!-- Card 3: Representation, Practices & Procedures -->
                    <div class="exam-card" data-aos="fade-up" data-aos-delay="200">
                        <div class="exam-card-title">
                            REPRESENTATION, PRACTICES<br />&amp; PROCEDURES
                        </div>

                        <div class="exam-content">
                            <div class="table-header">
                                <span>Content Area</span>
                                <span>Questions</span>
                            </div>

                            <div class="exam-row">
                                <span>Practice &amp; Procedures</span>
                                <span>26</span>
                            </div>
                            <div class="exam-row">
                                <span>Representation before the IRS</span>
                                <span>25</span>
                            </div>
                            <div class="exam-row">
                                <span>Specific Areas of Representation</span>
                                <span>20</span>
                            </div>
                            <div class="exam-row">
                                <span>Filing Process</span>
                                <span>14</span>
                            </div>
                        </div>

                        <div class="exam-footer">
                            <span class="full-width-footer">100 Multiple Choice Questions</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
// EA Qualification structure section component matching CPA theme
</script>

<style scoped>
/* ================================
   MAIN SECTION
================================ */

.cpa-exam-section {
    background: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
}

.ptb-100 {
    padding-top: 80px;
    padding-bottom: 80px;
}

.container {
    max-width: 1170px;
    margin: 0 auto;
    padding: 0 15px;
}


/* ================================
   EXAM GROUP
================================ */

.exam-group {
    background: #f4f4f8;
    border: 1px solid #e6e6ec;
    border-radius: 18px;
    padding: 30px 28px 40px;
    margin-bottom: 8px;
}

.group-title {
    color: #87358c;
    text-align: center;
    font-size: 24px;
    line-height: 1.2;
    font-weight: 600;
    margin: 0 0 25px;
}

.exam-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}


/* ================================
   EXAM CARD
================================ */

.exam-card {
    border: 1px solid #9b9b9b;
    background: #ffffff;
    border-radius: 24px;
    padding: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 320px;
}

.exam-card-title {
    background: #87358c;
    color: #ffffff;
    text-align: center;
    min-height: 49px;
    padding: 7px 10px;
    border-radius: 21px 21px 0 0;

    font-size: 14px;
    line-height: 1.2;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: center;
}

.exam-content {
    background: #302d72;
    color: #ffffff;
    padding: 15px 20px;
    flex: 1;
}

.table-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;

    font-size: 12px;
    font-weight: 700;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 8px;
}

.exam-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;

    font-size: 13px;
    line-height: 1.2;
    margin-bottom: 16px;
}

.exam-row>span:last-child {
    white-space: nowrap;
    text-align: right;
    font-weight: 600;
}


/* ================================
   CARD FOOTER
================================ */

.exam-footer {
    background: #ffffff;
    padding: 8px 12px 8px;

    display: flex;
    justify-content: center;
}

.exam-footer .full-width-footer {
    background: #87358c;
    color: #ffffff;
    border-radius: 20px;
    padding: 10px 15px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    width: 100%;
}


/* ================================
   TABLET
================================ */

@media (max-width: 991px) {
    .exam-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}


/* ================================
   MOBILE
================================ */

@media (max-width: 767px) {
    .ptb-100 {
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .container {
        padding: 0 10px;
    }

    .exam-group {
        padding: 20px 15px;
        border-radius: 12px;
    }

    .group-title {
        font-size: 20px;
        margin-bottom: 20px;
    }

    .exam-grid {
        grid-template-columns: 1fr;
    }

    .exam-card {
        min-height: auto;
    }
}
</style>
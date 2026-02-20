<template>
    <section class="guidelines-section py-5">
        <div class="container">
            <!-- Heading -->
            <div class="text-center mb-4">
                <h2 class="fw-bold">Application & Examination Guidelines</h2>
                <p class="text-muted small">
                    Everything you need to know before applying
                </p>
            </div>

            <!-- Card -->
            <div class="card border-0 shadow-lg main-card mx-auto">
                <div class="card-body p-4 p-md-5">

                    <p class="small text-muted mb-4">
                        <strong>(AI-Proctored Assessment Powered by Aon)</strong><br />
                        NFET is conducted on a secure AI-enabled platform with live human supervision
                        to ensure a fair and transparent assessment for B.Com First Division graduates.
                    </p>

                    <!-- Eligibility -->
                    <div class="mb-4">
                        <h6 class="section-title purple">
                            <span class="icon-circle">●</span> Eligibility
                        </h6>
                        <ul class="list-style">
                            <li>B.Com graduates with <strong>First Division.</strong></li>
                            <li>Indian Citizen</li>
                            <li>Born after Jan 1, 1996</li>
                            <li><strong>Valid photo ID required.</strong></li>
                        </ul>
                    </div>

                    <!-- Registration -->
                    <div class="mb-4">
                        <h6 class="section-title purple">
                            <span class="icon-circle">●</span> Registration Process
                        </h6>
                        <ul class="list-style">
                            <li>Fill the online application form.</li>
                            <li>Select your preferred exam date & time.</li>
                            <li>
                                Registration is confirmed after
                                <strong>successful fee payment.</strong>
                            </li>
                        </ul>
                    </div>

                    <!-- Exam Mode -->
                    <div class="mb-4">
                        <h6 class="section-title purple">
                            <span class="icon-circle">●</span> Exam Mode (AI Proctored)
                        </h6>
                        <ul class="list-style">
                            <li>
                                Exam is conducted online with
                                <strong>AI monitoring + live supervision.</strong>
                            </li>
                            <li>
                                Use a <strong>laptop/desktop with webcam & microphone</strong>
                                (mobile not allowed).
                            </li>
                            <li>Stable internet connection required.</li>
                            <li>Sit in a quiet, well-lit room alone.</li>
                        </ul>
                    </div>

                    <!-- Subjects -->
                    <div class="mb-4">
                        <h6 class="section-title purple">
                            <span class="icon-circle">●</span> Subjects Covered
                        </h6>
                        <ul class="list-style">
                            <li>Accounting</li>
                            <li>Audit</li>
                            <li>Finance</li>
                            <li>Business & Economics</li>
                            <li>English</li>
                            <li>Aptitude & Analytical Skills</li>
                        </ul>
                    </div>

                    <!-- Important -->
                    <div class="mb-4">
                        <h6 class="section-title orange">
                            <span class="icon-circle orange-bg">●</span> Important Instructions
                        </h6>
                        <ul class="list-style">
                            <li>Login 15 minutes before your exam time.</li>
                            <li>No books, notes, or other devices allowed.</li>
                            <li>Stay visible on camera throughout the exam.</li>
                            <li>Any unfair practice may lead to disqualification.</li>
                        </ul>
                    </div>

                    <!-- Bottom Highlight Box -->
                    <div class="info-box">
                        NFET ensures a <strong>fair, professional, and industry-standard evaluation</strong>
                        to shortlist capable candidates for future CGC career opportunities.
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.guidelines-section {
    background: #f4f5f9;
}

.main-card {
    max-width: 720px;
    border-radius: 16px;
    background: #ffffff;
}

.section-title {
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.purple {
    color: #6f42c1;
}

.orange {
    color: #f97316;
}

.icon-circle {
    width: 20px;
    height: 20px;
    background: #ede9fe;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #6f42c1;
}

.orange-bg {
    background: #ffe7d6;
    color: #f97316;
}

.list-style {
    padding-left: 18px;
    margin: 0;
}

.list-style li {
    margin-bottom: 6px;
    font-size: 14px;
    color: #555;
}

.info-box {
    background: #f3e8ff;
    padding: 14px;
    border-radius: 10px;
    font-size: 14px;
    color: #4c1d95;
    border: 1px solid #e9d5ff;
}

@media (max-width: 768px) {
    .guidelines-section {
        padding: 40px 0px;
    }
}
</style>
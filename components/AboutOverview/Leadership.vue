<template>
    <div id="leadership" class="leadership-area ptb-100 bg-light-gradient">
        <div class="container">
            <div class="section-title text-center mb-5">
                <span class="sub-title">VISIONARY LEADERSHIP</span>
                <h2>Meet The Leaders</h2>
            </div>

            <!-- Leader 1: Dr. Kamal Chhabra -->
            <div class="leader-card-wrapper mb-5" data-aos="fade-up" data-aos-delay="200">
                <div class="leader-card">
                    <div class="row align-items-center">
                        <div class="col-lg-5 order-lg-2">
                            <div class="leader-image-section">
                                <div class="purple-circle"></div>
                                <!-- Placeholder for Kamal Image -->
                                <img src="~/assets/img/kamal.png" class="leader-img" alt="Dr. Kamal Chhabra" />
                            </div>
                        </div>
                        <div class="col-lg-7 order-lg-1">
                            <div class="leader-info-top">
                                <span class="role-title">MEET THE CREATOR</span>
                                <h3>
                                    <a href="https://www.linkedin.com/in/kamalchhabra/" target="_blank">
                                        Dr. Kamal Chhabra <i class="ti ti-brand-linkedin"></i>
                                    </a>
                                </h3>
                                <span class="designation">Founder and Chief Executive Officer | US CPA | CA</span>

                                <div class="leader-message">
                                    <p>
                                        "The global finance industry does not suffer from a lack of degrees; it suffers
                                        from a lack of job-ready
                                        professionals. For over two decades, I have witnessed this gap closely across
                                        audit, assurance, taxation,
                                        and advisory roles worldwide. Academic knowledge alone has never been enough.
                                        Careers are built where
                                        learning meets real work."
                                    </p>
                                    <p>
                                        "With this belief, I founded KC GlobEd, a finance-focused edutech platform
                                        committed to bridging academic
                                        learning with global professional practice. Today, that mission advances further
                                        with the GCC School—a purpose-driven
                                        campus built on a clear Employment-to-Education (E2E) philosophy."
                                    </p>
                                    <p>
                                        "This is not a campus for certificates. This is a campus for careers."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dark Blue Bio Box -->
                    <div class="leader-bio-box dark-blue-bg">
                        <p>
                            Kamal is a seasoned Techno-commercial professional with over two decades of expertise in
                            both the Indian and
                            international business landscapes. Beyond his entrepreneurial role, he is a prolific author
                            of multiple professional
                            books and a distinguished educator and catalyst, drawing from his extensive background in
                            providing audit, business
                            advisory and tax services to diverse companies across the USA, Africa, the Middle East, and
                            India.
                        </p>
                        <p>
                            His commitment to excellence is evident in his adept navigation of the entrepreneurial
                            venture, showcasing
                            his dedication and proficiency in the field.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Leader 2: Prof. (Dr.) Manpreet Singh Manna -->
            <div class="leader-card-wrapper" data-aos="fade-up" data-aos-delay="300">
                <div class="leader-card">
                    <div class="row align-items-center">
                        <div class="col-lg-5">
                            <div class="leader-image-section">
                                <div class="gold-circle"></div>
                                <!-- Placeholder for Manna Image -->
                                <img src="~/assets/img/manna.png" class="leader-img"
                                    alt="Prof. (Dr.) Manpreet Singh Manna" />
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="leader-info-top ps-lg-4">
                                <span class="role-title text-gold">ACADEMIC EXCELLENCE</span>
                                <h3>
                                    <a href="https://www.linkedin.com/in/drmanna/" target="_blank">
                                        Prof. (Dr.) Manpreet Singh Manna <i class="ti ti-brand-linkedin"></i>
                                    </a>
                                </h3>
                                <span class="designation">Executive Director</span>

                                <div class="leader-message">
                                    <p>
                                        "Every learning ecosystem reaches a moment where relevance defines impact. At
                                        GCC School, this is reflected
                                        in our focus on transitional education that connects academic understanding with
                                        professional execution."
                                    </p>
                                    <p>
                                        "Training is structured, applied, and strengthened through industry exposure,
                                        digital capability, and continuous
                                        mentoring. Learners progress with clarity, discipline, and confidence, prepared
                                        to perform and adapt in global
                                        finance roles."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dark Bio Box (Gold Accent) -->
                    <div class="leader-bio-box dark-gold-bg mt-4">
                        <p>
                            Education leader with 32+ years of experience in higher education, research, and policy.
                            <strong>Former Vice Chancellor of
                                Chandigarh University and Director of AICTE</strong>, he provides academic leadership
                            and strategic direction to build
                            future-ready professionals.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Leadership",
};
</script>

<style scoped>
.bg-light-gradient {
    background: linear-gradient(180deg, #ffffff 0%, #f4f7fa 100%);
}

.section-title .sub-title {
    color: #f5a623;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 5px;
}

.section-title h2 {
    color: #38003c;
    font-weight: 700;
}

/* Card Wrapper */
.leader-card-wrapper {
    margin-bottom: 60px;
}

.leader-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    /* Soft large shadow */
    padding: 40px;
    position: relative;
    overflow: hidden;
}

/* Image Section */
.leader-image-section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
}

.leader-img {
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: 50%;
    /* Circle image */
    position: relative;
    z-index: 2;
    border: 5px solid #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.purple-circle {
    position: absolute;
    width: 320px;
    height: 320px;
    background-color: #7b2cbf;
    /* Purple */
    border-radius: 50%;
    z-index: 1;
    opacity: 0.1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.gold-circle {
    position: absolute;
    width: 320px;
    height: 320px;
    background-color: #f5a623;
    /* Gold */
    border-radius: 50%;
    z-index: 1;
    opacity: 0.1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Text Specs */
.role-title {
    color: #7b2cbf;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 5px;
    display: block;
}

.role-title.text-gold {
    color: #f5a623;
}

.leader-info-top h3 {
    font-size: 32px;
    margin-bottom: 5px;
    font-weight: 800;
}

.leader-info-top h3 a {
    color: #38003c;
    text-decoration: none;
    transition: color 0.3s;
}

.leader-info-top h3 a:hover {
    color: #f5a623;
}

.designation {
    font-size: 16px;
    color: #000;
    font-weight: 600;
    margin-bottom: 20px;
    display: block;
}

.leader-message {
    margin-bottom: 30px;
}

.leader-message p {
    color: #555;
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 15px;
    font-style: italic;
}

/* Bio Box (Bottom) */
.leader-bio-box {
    padding: 30px;
    border-radius: 12px;
    color: #fff;
    margin-top: 20px;
}

.dark-blue-bg {
    background-color: #242055;
    /* Dark Blue from image */
}

.dark-gold-bg {
    background-color: #38003c;
    /* Using branded dark purple/black instead of plain gold for better contrast */
    border-top: 4px solid #f5a623;
}

.leader-bio-box p {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
}

.leader-bio-box p+p {
    margin-top: 15px;
}

.leader-bio-box strong {
    color: #fff;
    font-weight: 700;
}

/* Responsive */
@media (max-width: 991px) {
    .leader-image-section {
        height: auto;
        margin-bottom: 30px;
        padding: 40px 0;
    }

    .leader-card {
        padding: 30px 20px;
    }

    .leader-info-top {
        text-align: center;
    }

    .role-title,
    .designation {
        text-align: center;
    }
}
</style>

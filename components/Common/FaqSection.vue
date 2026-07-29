<template>
    <section class="faq-section ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <span class="subtitle">Got Questions?</span>
                <h2>Frequently Asked <span class="highlight">Questions</span></h2>
                <p>Everything you need to know about GCC School, NFET, and your future career in Global Capability Centres.
                </p>
            </div>

            <div class="faq-container">
                <div class="row">
                    <!-- Categories -->
                    <div class="col-lg-4">
                        <div class="faq-categories">
                            <button v-for="(category, index) in categories" :key="index"
                                :class="['category-btn', { active: activeCategory === index }]"
                                @click="activeCategory = index">
                                <i :class="category.icon"></i>
                                <span>{{ category.name }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Questions -->
                    <div class="col-lg-8">
                        <div class="faq-accordion">
                            <div v-for="(item, idx) in filteredFaqs" :key="idx"
                                :class="['accordion-item', { active: openIndex === idx }]">
                                <div class="accordion-header" @click="toggleAccordion(idx)">
                                    <span class="question-text">{{ item.question }}</span>
                                    <i class="ti ti-chevron-down icon-arrow"></i>
                                </div>
                                <div class="accordion-content" :style="accordionStyle(idx)">
                                    <div class="content-inner">
                                        <p v-html="item.answer"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeCategory = ref(0);
const openIndex = ref<number | null>(0);

const categories = [
    { name: 'General & About', icon: 'ti ti-info-circle' },
    { name: 'NFET & Admissions', icon: 'ti ti-user-plus' },
    { name: 'Program & Curriculum', icon: 'ti ti-book' },
    { name: 'Career & Placements', icon: 'ti ti-briefcase' },
    { name: 'Campus & Support', icon: 'ti ti-building' },
];

const faqs = [
    // General & About
    {
        category: 0,
        question: 'What is GCC School?',
        answer: 'GCC School is India’s first dedicated school for commerce graduates, built to prepare talent for Global Capability Centre careers through a Get Hired First, Then Trained model.'
    },
    {
        category: 0,
        question: 'What does “Get Hired First, Then Trained” mean?',
        answer: 'It means candidates first go through NFET and the selection process, and selected candidates receive a Pre-Placement Offer Letter before the 12-month training journey begins.'
    },
    {
        category: 0,
        question: 'What are Global Capability Centres (GCCs)?',
        answer: 'Global Capability Centres are India-based centres of multinational companies that handle strategic global functions such as finance, accounting, audit, risk, analytics, operations, and other business-critical work.'
    },
    {
        category: 0,
        question: 'Why is India called the GCC capital of the world?',
        answer: 'India has emerged as a global leader in the GCC ecosystem, with 1,800+ centres and strong momentum in jobs, scale, and market growth.'
    },
    {
        category: 0,
        question: 'How is GCC School different from a traditional academic pathway?',
        answer: 'GCC School combines academic credentials with career commitment, AI-enabled learning, industry exposure, and employability-focused training from the beginning of the journey.'
    },
    {
        category: 0,
        question: 'Who is legacy brand behind GCC School?',
        answer: 'GCC School is backed by KC GlobEd, with 30+ years of legacy, 20K+ global students, and presence in 120+ countries.'
    },
    {
        category: 0,
        question: 'Who leads GCC School?',
        answer: 'GCC School is led by Dr. Kamal Chhabra and Prof. (Dr.) Manpreet Singh Manna, Executive Director, GCC School.'
    },
    {
        category: 0,
        question: 'Is the GCC School curriculum AI-driven?',
        answer: 'Yes. Our program is AI-enabled and supported by TEEE - Tailored Education for Enhanced Efficiency, designed to make learning more focused and effective.'
    },
    {
        category: 0,
        question: 'What is TEEE?',
        answer: 'TEEE stands for Tailored Education for Enhanced Efficiency, GCC School’s learning framework for more targeted and time-efficient preparation.'
    },
    {
        category: 0,
        question: 'What is the First GCC Talent Cohort?',
        answer: 'It refers to the first intake of selected candidates entering GCC School through NFET and the subsequent selection stages for the July 2026 cohort.'
    },

    // NFET & Admissions
    {
        category: 1,
        question: 'What is NFET?',
        answer: 'NFET stands for the National Finance Entrance Test. It is the online entrance and evaluation stage for GCC School applicants.'
    },
    {
        category: 1,
        question: 'Who is eligible to apply for the 2026 cohort?',
        answer: 'Eligibility includes B.Com (First Division from a UGC-approved university) or B.Com + M.Com / MBA / PG (First Division), Indian citizenship, and being born on or after January 1, 1996. Final-year students are also eligible.'
    },
    {
        category: 1,
        question: 'Is NFET conducted online?',
        answer: 'Yes. NFET is conducted in an AI-enabled, human-proctored online format.'
    },
    {
        category: 1,
        question: 'What is the NFET exam format?',
        answer: 'NFET includes 60 MCQs, a 90-minute duration, variable scoring of 0.75 to 1.25 per question, and no negative marking.'
    },
    {
        category: 1,
        question: 'What does NFET test?',
        answer: 'NFET assesses Accounting & Finance Fundamentals, English & Business Communication, Auditing & Analytical Reasoning, Quantitative Aptitude, and Business & Economic Awareness.'
    },
    {
        category: 1,
        question: 'How do I register for NFET?',
        answer: 'You can apply through gccschool.com, complete your application details, select your exam slot, and confirm your registration after successful payment.'
    },
    {
        category: 1,
        question: 'What is the NFET timeline for the 2026 cohort?',
        answer: 'NFET enrollment starts Feb 25, slot booking Mar 10 - June 27, interviews 1st - 3rd July, admission confirmation June 25, and cohort start July 6, 2026.'
    },
    {
        category: 1,
        question: 'Is there a fee for NFET?',
        answer: 'Yes. The application and preparation journey fee is ₹2,950. This activates the next stage of your GCC School application.'
    },
    {
        category: 1,
        question: 'What unlocks after I pay the ₹2,950 fee?',
        answer: 'Payment unlocks full application access, the applicant dashboard, GCC School Starter Kit, AON-powered mock test, British Council “English for Work” access, NFET slot booking, admit card, and an interview preparation pack.'
    },
    {
        category: 1,
        question: 'Is ₹2,950 part of the full program fee?',
        answer: 'No. The ₹2,950 covers the pre-selection application journey and is not a partial payment toward the full program fee.'
    },

    // Program & Curriculum
    {
        category: 2,
        question: 'What program does GCC School offer?',
        answer: 'GCC School offers the 12-month AI-Enabled International Accounting Professional Program (AEIAP) with a paid internship.'
    },
    {
        category: 2,
        question: 'Does the program include ACCA?',
        answer: 'Yes. ACCA is integrated into the program structure as a core academic component.'
    },
    {
        category: 2,
        question: 'Are there ACCA exemptions for commerce graduates?',
        answer: 'Yes. Eligible commerce graduates receive 5 exemptions: BT, MA, FA, TX, and LW, which accelerates their pathway.'
    },
    {
        category: 2,
        question: 'Does the program include a PGCM?',
        answer: 'Yes. The program includes PGCM - Public Accounting, which is AIMA and AICTE-approved.'
    },
    {
        category: 2,
        question: 'Is British Council included in the program?',
        answer: 'Yes. The program includes British Council “English for Work” with a focus on Business & Corporate Communication.'
    },
    {
        category: 2,
        question: 'Is there an optional Master’s pathway?',
        answer: 'Yes. Students can opt for M.Sc. Professional Accountancy from the University of London.'
    },
    {
        category: 2,
        question: 'Does the program include internship?',
        answer: 'Yes. The program includes a 6-month paid internship that runs concurrently with the training.'
    },
    {
        category: 2,
        question: 'What subjects and tools are part of the curriculum?',
        answer: 'Curriculum includes Financial Reporting, Audit & Assurance, Financial Management, AI for Finance & Audit, Data Analytics, Power BI, Advanced Excel, and corporate training.'
    },
    {
        category: 2,
        question: 'How does the ACCA structure work?',
        answer: 'The structure includes Applied Knowledge, Applied Skills, and Strategic Professional levels, along with the Ethics & Professional Skills Module.'
    },
    {
        category: 2,
        question: 'Does GCC School offer standalone ACCA coaching?',
        answer: 'GCC School offers an ACCA-integrated finance career program, not just standalone coaching, providing a complete ecosystem for career success.'
    },

    // Career & Placements
    {
        category: 3,
        question: 'What roles does the program prepare students for?',
        answer: 'Roles across Audit & Assurance, Accounting Advisory, Risk Management, Financial Accounting & Reporting, Management Accounting, FP&A, CFO Advisory, and Transaction Advisory.'
    },
    {
        category: 3,
        question: 'What does “selected candidates receive a Pre-Placement Offer Letter” mean?',
        answer: 'It means after clearing the selection stages, candidates receive a Pre-Placement Offer Letter starting at ₹10 LPA before the 12-month training begins.'
    },
    {
        category: 3,
        question: 'Are the ₹10 LPA offers for every applicant?',
        answer: 'No. This outcome is for selected candidates based on their scores and selection outcomes, not for every applicant.'
    },
    {
        category: 3,
        question: 'Does GCC School follow a placement-only model?',
        answer: 'No. GCC School follows a Get Hired First, Then Trained model rather than a conventional end-of-program placement-only approach.'
    },
    {
        category: 3,
        question: 'How many hiring partners are in the ecosystem?',
        answer: 'GCC School highlights 60+ placement partners and 40+ industry mentors in its broader ecosystem.'
    },
    {
        category: 3,
        question: 'What are the best career options in commerce today?',
        answer: 'Strong growth areas include audit, accounting advisory, risk management, FP&A, transaction advisory, and related GCC-linked finance roles.'
    },
    {
        category: 3,
        question: 'Which course after B.Com is best for high-paying jobs?',
        answer: 'A pathway that combines strong finance depth, global credentials (like ACCA), practical training, and employer relevance. GCC School’s AEIAP is designed for this.'
    },
    {
        category: 3,
        question: 'What can I do after B.Com to work in an MNC?',
        answer: 'Focus on building finance capability, global process awareness, communication skills, and employability for GCC and multinational environments.'
    },
    {
        category: 3,
        question: 'What is the highest-paying job after B.Com?',
        answer: 'Compensation depends on role and skill. Roles in premium finance domains and GCC environments typically offer stronger upside, with selected GCC School candidates starting at ₹10 LPA.'
    },
    {
        category: 3,
        question: 'What salary can I expect after an ACCA-linked pathway?',
        answer: 'At GCC School, selected candidates receive Pre-Placement Offer starting at ₹10 LPA, though final compensation depends on performance and selection outcomes.'
    },

    // Campus & Support
    {
        category: 4,
        question: 'Where is the GCC School campus located?',
        answer: 'Our campus is located at Building 9B, 16th Floor, DLF Cyber City, Sector 24, Gurugram, Haryana - 122002.'
    },
    {
        category: 4,
        question: 'What is special about the campus location?',
        answer: 'It is located in DLF Cyber City, at the heart of India’s GCC ecosystem and close to leading Fortune 500 firms, providing unmatched industry exposure.'
    },
    {
        category: 4,
        question: 'Can I visit the campus before applying?',
        answer: 'Yes. You can book a campus tour through our official website to experience the environment firsthand.'
    },
    {
        category: 4,
        question: 'Does GCC School offer financing support?',
        answer: 'Yes. GCC School lists financing support through HDFC Credila, Yes Bank, and Avanse. You can connect with our admissions team for documentation requirements.'
    },
    {
        category: 4,
        question: 'What are the official contact details?',
        answer: 'Email: info@gccschool.com | Main Phone: +91 9773576111 | WhatsApp/Support: +91 96675 83222.'
    },
    {
        category: 4,
        question: 'Are there student clubs on campus?',
        answer: 'Yes. We have clubs such as the Finance & Accounts Club, Audit & Assurance Club, and International Tax Club to foster peer learning.'
    },
    {
        category: 4,
        question: 'How can I stay updated?',
        answer: 'Stay updated through our official website, application pages, blog, and campus update channels.'
    },
    {
        category: 4,
        question: 'What happens immediately after I pay for NFET?',
        answer: 'Your dashboard and application toolkit unlock immediately, allowing you to proceed with preparation and slot booking without delay.'
    },
    {
        category: 4,
        question: 'What is the “Ticket to DLF Cyber City”?',
        answer: 'It refers to the next stage of the selection journey in Gurugram after qualifying through the earlier online process stages.'
    },
    {
        category: 4,
        question: 'Who can I contact for financing inquiries?',
        answer: 'You can connect with the admissions team through GCC School’s official channels to understand the current financing process and documentation.'
    }
];

const filteredFaqs = computed(() => {
    return faqs.filter(faq => faq.category === activeCategory.value);
});

const toggleAccordion = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
};

const accordionStyle = (index: number) => {
    if (openIndex.value === index) {
        // We'll use a rough height or handle it with CSS
        return { maxHeight: '1000px', opacity: 1 };
    }
    return { maxHeight: '0px', opacity: 0 };
};
</script>

<style scoped>
.faq-section {
    background: #ececec;
    background-image: radial-gradient(#F1A63E 0.5px, transparent 0.5px);
    background-size: 30px 30px;
    background-color: #fcfdfe;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}


.subtitle {
    display: inline-block;
    color: #F1A63E;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 15px;
    font-size: 14px;
    background: rgba(241, 166, 62, 0.1);
    padding: 5px 15px;
    border-radius: 50px;
}

.highlight {
    color: #F1A63E;
    position: relative;
    z-index: 1;
}

.highlight::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 12px;
    background: rgba(241, 166, 62, 0.15);
    z-index: -1;
    border-radius: 2px;
}

.section-title h2 {
    font-size: 48px;
    font-weight: 900;
    color: #0d0d25;
    margin-bottom: 20px;
    letter-spacing: -1px;
}

.section-title p {
    font-size: 18px;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
}

.faq-categories {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #fff;
    padding: 30px;
    border-radius: 24px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
    position: sticky;
    top: 120px;
}

.category-btn {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 18px 24px;
    border: 1px solid #f1f5f9;
    background: #fff;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    color: #475569;
    font-weight: 600;
    font-size: 16px;
}

.category-btn i {
    font-size: 22px;
    color: #F1A63E;
    transition: transform 0.3s ease;
}

.category-btn.active {
    background: #0d0d25;
    color: #fff;
    border-color: #0d0d25;
    transform: translateX(10px);
    box-shadow: 10px 10px 20px rgba(13, 13, 37, 0.15);
}

.category-btn.active i {
    color: #F1A63E;
    transform: scale(1.2);
}

.category-btn:hover:not(.active) {
    background: #f8fafc;
    border-color: #F1A63E;
    color: #0d0d25;
}

.faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.accordion-item {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border: 1px solid #f1f5f9;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-item:hover:not(.active) {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
    border-color: #e2e8f0;
}

.accordion-item.active {
    border-color: #F1A63E;
    box-shadow: 0 25px 50px -12px rgba(241, 166, 62, 0.12);
}

.accordion-header {
    padding: 28px 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.question-text {
    font-size: 20px;
    font-weight: 700;
    color: #0d0d25;
    line-height: 1.5;
    padding-right: 25px;
}

.icon-arrow {
    font-size: 24px;
    color: #94a3b8;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: #f8fafc;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.accordion-item.active .icon-arrow {
    transform: rotate(180deg);
    color: #fff;
    background: #F1A63E;
}

.accordion-content {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.content-inner {
    padding: 0 35px 35px 35px;
}

.content-inner p {
    color: #475569;
    line-height: 1.8;
    font-size: 17px;
    margin: 0;
    font-weight: 400;
}

@media (max-width: 991px) {
    .faq-categories {
        flex-direction: row;
        overflow-x: auto;
        padding: 20px;
        margin-bottom: 40px;
        white-space: nowrap;
        gap: 15px;
        position: static;
        box-shadow: none;
        background: transparent;
        padding-left: 0;
        padding-right: 0;
    }
    
    .category-btn {
        padding: 14px 22px;
        flex-shrink: 0;
        transform: none !important;
    }

    .section-title h2 {
        font-size: 36px;
    }
}

@media (max-width: 768px) {
    .faq-section {
        padding: 80px 0;
    }
    
    .section-title h2 {
        font-size: 30px;
    }

    .question-text {
        font-size: 18px;
        padding-right: 15px;
    }
    
    .accordion-header {
        padding: 20px;
    }

    .content-inner {
        padding: 0 20px 20px 20px;
    }

    .content-inner p {
        font-size: 15px;
    }
    
    .icon-arrow {
        width: 32px;
        height: 32px;
        font-size: 18px;
    }
}
</style>

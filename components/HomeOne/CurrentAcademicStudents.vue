<template>
  <div class="comparison-and-faculty-wrapper">
    <div class="comparison-warp ptb-100">
      <div class="container-fluid w">
        <div class="section-title text-center">
          <!-- Kept the section title as per previous premium design -->
          <h2 class="title">What Sets <span class="highlight"> the GCC School Experience Apart?</span></h2>
          <p style="font-size: 20px;">See why GCC School Journey is most suited for the professional world of new tomorrow.</p>
        </div>

        <div class="table-responsive">
          <table class="table comparison-table">
            <thead>
              <tr>
                <th scope="col" class="feature-col-header">KEY FEATURES</th>
                <th scope="col" class="text-center traditional-header">TRADITIONAL PATHWAY</th>
                <th scope="col" class="text-center gcc-header">
                  <!-- Setup placeholder for logo if needed, or just text/logo image provided in design -->
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <!-- Assuming logo asset usage, using text for now if asset path not confirmed, or basic icon -->

                    GCC SCHOOL JOURNEY
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in comparisonData" :key="index"
                :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
                <td class="feature-name" v-html="item.feature"></td>
                <td class="text-center traditional-cell">
                  <span v-if="item.traditional" class="icon-check-green">
                    <i class="ti ti-circle-check"></i>
                  </span>
                  <span v-else class="icon-cross-red">
                    <i class="ti ti-circle-x"></i>
                  </span>
                </td>
                <td class="text-center gcc-cell">
                  <span v-if="item.gcc" class="icon-check-gold">
                    <i class="ti ti-circle-check"></i>
                  </span>
                  <span v-else class="icon-cross-red">
                    <i class="ti ti-circle-x"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>

        </div>
      </div>
    </div>

    <!-- Strategic Think Tank -->
    <div class="people-section people-section-light ptb-100">
      <div class="container">
        <div class="people-title-wrap text-center">
          <h2 class="people-title">GCC School Strategic <span class="people-highlight">Think Tank</span></h2>
        </div>
        <div class="row g-0 justify-content-center align-items-center">
          <div v-for="(member, index) in thinkTankMembers" :key="'tt-' + index" class="col-lg-3 col-md-4 col-6">
            <div class="people-card think-tank-card">
              <img :src="member.image" :alt="member.alt" class="img-fluid" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Subject Matter Experts -->
    <div class="people-section people-section-white ptb-100">
      <div class="container">
        <div class="people-title-wrap text-center">
          <h2 class="people-title">Our Eminent <span class="people-highlight">Subject Matter Experts</span></h2>
        </div>
        <div class="sme-grid" role="list">
          <article v-for="(expert, index) in subjectMatterExperts" :key="expert.name" class="sme-card" role="listitem">
            <a v-if="expert.link" class="sme-card-overlay" :href="expert.link" target="_blank" rel="noopener noreferrer"
              :aria-label="'Open ' + expert.name + ' LinkedIn profile'"></a>
            <div class="sme-visual">
              <div class="sme-experience">
                <span class="sme-experience-value">{{ expert.experience }}</span>
                <span class="sme-experience-label">Exp.</span>
              </div>
              <span class="sme-ring" aria-hidden="true"></span>
              <img class="sme-portrait" :src="expert.portrait" :alt="expert.name + ', Subject Matter Expert'"
                loading="lazy" decoding="async" />
              <span class="sme-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="sme-copy">
              <h3 class="sme-name">{{ expert.name }}</h3>
              <p class="sme-role">{{ expert.role }}</p>
              <span v-if="expert.link" class="sme-link" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                  <path d="M6 18 18 6M7 6h11v11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div class="sme-logos" aria-label="Professional affiliations">
              <div v-for="logo in expert.logos" :key="logo.name" class="sme-logo-slot">
                <img :src="logo.src" :alt="logo.name" :width="Math.round(logo.width * 0.7)"
                  :height="Math.round(logo.height * 0.7)" loading="lazy" decoding="async" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Industry Mentors -->
    <div class="people-section people-section-light ptb-100">
      <div class="container">
        <div class="people-title-wrap text-center">
          <h2 class="people-title">Our Distinguished Industry <span class="people-highlight">Mentors</span></h2>
        </div>
        <div class="people-grid">
          <div v-for="(mentor, index) in industryMentors" :key="'im-' + index" class="people-card">
            <img :src="mentor.image" :alt="mentor.alt" class="img-fluid" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CurrentAcademicStudents",
  data() {
    return {
      thinkTankMembers: [
        { image: "/mentor/1.svg", alt: "Prof. (Dr.) N.S. Kalsi IAS (Retd.), GCC School Strategic Think Tank" },
        { image: "/mentor/2.svg", alt: "CA Harinderjit Singh, GCC School Strategic Think Tank" },
        { image: "/mentor/mentor_3.png", alt: "Kamalesh Agarwalla, GCC School Strategic Think Tank" },
        { image: "/mentor/4.svg", alt: "CA Parveen Kumar, GCC School Strategic Think Tank" },
      ],
      // Same cards (order, photos, text, logos and links) as the Instructors section in US-CPA-Web.html
      // (images extracted to public/img/experts/).
      subjectMatterExperts: [
        
        {
          name: "CPA Nitish Khatri",
          role: "Vice President",
          experience: "15+",
          link: "https://www.linkedin.com/in/cpa-nitish-khatri-045117b9/",
          portrait: "/img/experts/nitish-khatri.webp",
          logos: [
            { name: "KC GlobEd", src: "/img/experts/nitish-khatri-logo-kc-globed.webp", width: 130, height: 36 },
            { name: "Accenture", src: "/img/experts/nitish-khatri-logo-accenture.webp", width: 108, height: 39 },
            { name: "Genpact", src: "/img/experts/nitish-khatri-logo-genpact.webp", width: 108, height: 43 },
          ],
        },
        {
          name: "CA Varun Singhal",
          role: "Executive Director, GCC School",
          experience: "25+",
          link: "https://www.linkedin.com/in/varun-singhal-7b717918/",
          portrait: "/img/experts/varun-singhal.webp",
          logos: [
            { name: "GCC School", src: "/img/experts/varun-singhal-logo-gcc-school.webp", width: 132, height: 35 },
            { name: "KPMG", src: "/img/experts/varun-singhal-logo-kpmg.webp", width: 112, height: 49 },
            { name: "EY", src: "/img/experts/varun-singhal-logo-ey.webp", width: 54, height: 53 },
          ],
        },
        {
          name: "CA Ankur Sharma",
          role: "Managing Partner",
          experience: "15+",
          link: "https://www.linkedin.com/in/ankur-sharma-77450510a/",
          portrait: "/img/experts/ankur-sharma.webp",
          logos: [
            { name: "Kreit & Chiu", src: "/img/experts/ankur-sharma-logo-kreit-and-chiu.webp", width: 140, height: 38 },
            { name: "EY", src: "/img/experts/ankur-sharma-logo-ey.webp", width: 48, height: 56 },
            { name: "PwC", src: "/img/experts/ankur-sharma-logo-pwc.webp", width: 96, height: 48 },
          ],
        },
        {
          name: "CA Manpreet Ahuja",
          role: "Ex. Senior Manager",
          experience: "20+",
          link: "https://www.linkedin.com/in/manpreet-kaur-ahuja-538b81378/",
          portrait: "/img/experts/manpreet-ahuja.webp",
          logos: [
            { name: "KPMG", src: "/img/experts/manpreet-ahuja-logo-kpmg.webp", width: 116, height: 49 },
          ],
        },
        {
          name: "CA Kapileshwar Bhalla",
          role: "Author & Trainer\nIFRS | Ind AS | ACCA",
          experience: "25+",
          link: "https://www.linkedin.com/in/kapileshwar-bhalla-39275b1a6/",
          portrait: "/img/experts/kapileshwar-bhalla.webp",
          logos: [
            { name: "Commercial Law Publishers", src: "/img/experts/kapileshwar-bhalla-logo-commercial-law-publishers.webp", width: 150, height: 39 },
            { name: "Taxmann", src: "/img/experts/kapileshwar-bhalla-logo-taxmann.webp", width: 118, height: 44 },
          ],
        },
        {
          name: "CA Saurabh Handa",
          role: "Practice Lead,\nTrustlane Partners",
          experience: "20+",
          link: "https://www.linkedin.com/in/saurabhhanda/",
          portrait: "/img/experts/saurabh-handa.webp",
          logos: [
            { name: "Trustlane Partners", src: "/img/experts/saurabh-handa-logo-trustlane-partners.webp", width: 62, height: 58 },
            { name: "Deloitte", src: "/img/experts/saurabh-handa-logo-deloitte.webp", width: 128, height: 34 },
            { name: "KPMG", src: "/img/experts/saurabh-handa-logo-kpmg.webp", width: 106, height: 49 },
          ],
        },
        {
          name: "EA Ravi Yathiraj",
          role: "Practicing\nEnrolled Agent",
          experience: "15+",
          link: "https://www.linkedin.com/in/ravi-yathiraj-irs-enrolled-agent-mba-resolving-the-irs-state-notices-and-audits-174b9432/",
          portrait: "/img/experts/ravi-yathiraj.webp",
          logos: [
            { name: "HDFC Life", src: "/img/experts/ravi-yathiraj-logo-hdfc-life.webp", width: 94, height: 59 },
            { name: "mytaxfiler", src: "/img/experts/ravi-yathiraj-logo-mytaxfiler.webp", width: 130, height: 55 },
          ],
        },
        {
          name: "CA Santhosh Chandrashekar",
          role: "Ex. Senior Manager",
          experience: "15+",
          link: "https://www.linkedin.com/in/santhosh-chandrashekar-647263125/",
          portrait: "/img/experts/santhosh-chandrashekar.webp",
          logos: [
            { name: "KPMG", src: "/img/experts/santhosh-chandrashekar-logo-kpmg.webp", width: 112, height: 50 },
            { name: "EY", src: "/img/experts/santhosh-chandrashekar-logo-ey.webp", width: 54, height: 53 },
          ],
        },
        {
          name: "CA Inderpal Singh",
          role: "CEO & CO-FOUNDER\n4x4 ADVISORY",
          experience: "20+",
          link: "https://www.linkedin.com/in/inder-p-singh-4x4advisory/",
          portrait: "/img/experts/inderpal-singh.webp",
          logos: [
            { name: "4x4 Advisory", src: "/img/experts/inderpal-singh-logo-4x4-advisory.webp", width: 58, height: 61 },
            { name: "EY", src: "/img/experts/inderpal-singh-logo-ey.webp", width: 54, height: 53 },
          ],
        },
        {
          name: "CPA & CA Vinay Aggarwal",
          role: "Partner\nVinay Aggarwal & Associates",
          experience: "20+",
          link: "https://www.linkedin.com/in/vinay-aggarwal-2a7a8624/",
          portrait: "/img/experts/vinay-aggarwal.webp",
          logos: [
            { name: "Goldman Financing Corporates", src: "/img/experts/vinay-aggarwal-logo-goldman-financing-corporates.webp", width: 65, height: 67 },
            { name: "Barclays", src: "/img/experts/vinay-aggarwal-logo-barclays.webp", width: 55, height: 55 },
          ],
        },
        {
          name: "CA Ram Sachdeva",
          role: "Ex. Senior Manager",
          experience: "20+",
          link: "https://www.linkedin.com/in/ram-s-a5b560154/",
          portrait: "/img/experts/ram-sachdeva.webp",
          logos: [
            { name: "PwC", src: "/img/experts/ram-sachdeva-logo-pwc.webp", width: 102, height: 48 },
            { name: "KPMG", src: "/img/experts/ram-sachdeva-logo-kpmg.webp", width: 112, height: 52 },
          ],
        },
        {
          name: "CA Anish Thomas",
          role: "Ex. Senior Manager",
          experience: "15+",
          link: "https://www.linkedin.com/in/anish-thomas-06106a14/",
          portrait: "/img/experts/anish-thomas.webp",
          logos: [
            { name: "EY", src: "/img/experts/anish-thomas-logo-ey.webp", width: 54, height: 53 },
            { name: "Deloitte", src: "/img/experts/anish-thomas-logo-deloitte.webp", width: 134, height: 35 },
          ],
        },
      ],
      // Mentor cards as on the live site (images saved in public/img/mentors/), in the requested order
      industryMentors: [
        { file: "pavan-duggal", name: "Dr. Pavan Duggal" },
        { file: "akshdeep-singh", name: "CISA Akshdeep Singh" },
        { file: "nitesh-jain", name: "Mr. Nitesh Jain" },
        { file: "ashwani-jhamb", name: "CA Ashwani Jhamb" },
        { file: "vikram-khurana", name: "CA Vikram Khurana" },
        { file: "arvind-tuli", name: "CA Arvind Tuli" },
        { file: "amlan-chakraborty", name: "Dr. Amlan Chakraborty" },
        { file: "goutam-bhattacharya", name: "Mr. Goutam Bhattacharya" },
        { file: "vikrant-rana", name: "Adv. Vikrant Rana" },
        { file: "nimisha-chiripal", name: "CPA Nimisha Chiripal" },
        { file: "murli-mohan", name: "Dr. Murli Mohan" },
        { file: "nayan-bheda", name: "Dr. Nayan Bheda" },
      ].map((m) => ({ image: `/img/mentors/${m.file}.webp`, alt: `${m.name}, GCC School Industry Mentor` })),
      comparisonData: [
        { feature: "<strong>Globally Recognised</strong> Academic Credentials", traditional: true, gcc: true },
        { feature: "<strong>Strong</strong> Theoretical Foundation", traditional: true, gcc: true },
        { feature: "<strong>Career Commitment</strong> & Confidence from Day 1", traditional: false, gcc: true },
        { feature: "<strong>Get Hired First</strong>, Then Trained", traditional: false, gcc: true },
        { feature: "<strong>Real-time</strong> Industry Environmental Learning", traditional: false, gcc: true },
        { feature: "<strong>Global</strong> Exposure", traditional: false, gcc: true },
        { feature: "<strong>Purpose</strong> Driven Curriculum", traditional: false, gcc: true },
        { feature: "<strong>Elite</strong> Industry Mentors", traditional: false, gcc: true },
        { feature: "<strong>AI-Enabled</strong> Adaptive Learning", traditional: false, gcc: true },
        { feature: "<strong>Employability</strong> Focused Training", traditional: false, gcc: true },
      ],
    };
  },
};
</script>

<style scoped>
.comparison-warp {
  background-color: #eceef4;
}

.table-responsive {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  overflow: hidden;
}

.comparison-table {
  width: 100%;
  margin-bottom: 0;
  background-color: #fff;
  border-collapse: collapse;
}

.comparison-table th {
  padding: 25px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  vertical-align: middle;
  text-transform: uppercase;
}

.title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
  letter-spacing: -0.02em;
  color: #181225;
  margin-bottom: 20px;
}

.title::after {
  content: "";
  display: block;
  width: 70px;
  height: 4px;
  background: #F1A63E;
  margin: 14px auto 0;
  border-radius: 10px;
}

.highlight {
  background: linear-gradient(135deg, #F1A63E 0%, #F1A63E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #F1A63E;
}

.feature-col-header {
  background-color: #38003c;
  /* Dark Purple */
  color: #fff;
  width: 40%;
  text-align: left;
  border-top-left-radius: 8px;
  /* Optional, depending on if we want rounded corners on the container */
}

.traditional-header {
  background-color: #474747;
  /* Dark Grey */
  color: #fff;
  width: 30%;
}

.gcc-header {
  background-color: #c89216;
  /* Gold */
  color: #fff;
  width: 30%;
  border-top-right-radius: 8px;
  border: 1.784px solid var(--color-yellow-52, #D4AF37);
  border-bottom: none;
  /* Let cells handle the bottom border or collapse? If collapse, this isn't needed usually, but safe to match style */
}

.comparison-table td {
  padding: 18px 20px;
  vertical-align: middle;
  font-size: 16px;
  color: #333;
  border: 1px solid #e0e0e0;
}

.even-row {
  background-color: #e6e4e9;
  /* Light Greyish Purple */
}

.odd-row {
  background-color: #f5f4f7;
  /* Very Light Grey */
}

.feature-name {
  text-align: left;
  color: #333;
}

.feature-name>>>strong {
  font-weight: 700;
  color: #000;
}


/* Icons */
.icon-check-green i {
  color: #28a745;
  font-size: 24px;
}

.icon-cross-red i {
  color: #dc3545;
  /* Or the burnt orange from design #d9534f */
  color: #cf4f36;
  font-size: 24px;
}

.icon-check-gold i {
  color: #c89216;
  font-size: 24px;
}

/* GCC Column Styling Override if needed */
.gcc-cell {
  background-color: rgba(200, 146, 22, 0.15);
  /* Slight gold tint overlay if wanted, or just rely on row colors */
  /* border-left: 2px solid #c89216;
  border-right: 2px solid #c89216; */
  border: 4px solid var(--color-yellow-52, #D4AF37);
}

/* Make GCC column stand out more like a card effect? Design shows just colored header and rows */
/* The design image shows the GCC column fully distinct? 
   No, it looks like just header and row colors. But GCC column has a slight background tint in the image? 
   Let's check image. Yes, the right column seems slightly darker/tinted.
   We applied a class 'gcc-cell' above.
*/
.gcc-cell {
  background-color: rgba(190, 190, 190, 0.3);
  /* Matches the greyish tint in design */
  border: 1px solid #aaa;
}

/* Wait, the design rows alternate colors across the whole row?
   Looking closely: 
   Row 1: Light Grey
   Row 2: White/Very Light
   GCC Column: Darker box? 
   Actually, the GCC column seems to have a semi-transparent overlay making it look distinct.
   Let's stick to simple alternating rows first, with the GCC header being the main highlight.
*/

/* Reset bordering for cleaner look */
.comparison-table td {
  border: 1px solid #ccc;
}

.gcc-cell {
  background-color: #ccc;
  /* Darker grey background for the whole column as per image? No, image has alternating but GCC column is greyish */
  /* Let's try to match the image: Right column is Grey background, valid items are Gold. */
  background-color: #c4c4c4;
}

.even-row .gcc-cell {
  background-color: #b0b0b0;
  /* Darker grey */
}

.odd-row .gcc-cell {
  background-color: #cccccc;
  /* Lighter grey */
}

/* Re-evaluating image colors:
   Left Col: Light Purple/White alternating.
   Middle Col: Same.
   Right Col: Dark Greyish/Beige box? It separates clearly.
*/


/* Let's refine the colors to match image better */
/* Traditional Cells */
.traditional-cell {
  background-color: #f2f2f2;
  border-right: 1px solid #d6d6d6;
}

.even-row .traditional-cell {
  background-color: #e6e6e6;
}

/* GCC Cells */
.gcc-cell {
  background-color: rgba(200, 146, 22, 0.05) !important;
  border: 2px solid #D4AF37 !important;
}

.even-row {
  background-color: #EEECF4;
}

.odd-row {
  background-color: #ffffff;
}

/* Ensure alternating rows in GCC column also respect the tint but keep border */
.even-row .gcc-cell {
  background-color: rgba(200, 146, 22, 0.08) !important;
}

.odd-row .gcc-cell {
  background-color: rgba(255, 255, 255, 1) !important;
}

/* Last cell border fix */
tr:last-child .gcc-cell {
  border-bottom: 2px solid #D4AF37 !important;
}

/* Remove border if using background differentiation */
.comparison-table td {
  border: 1px solid #bbb;
}

@media (max-width : 767px) {

  .comparison-table th {
    padding: 15px 10px;
    font-size: 14px;
    white-space: nowrap;
    /* Keep headers from breaking awkwardly */
  }

  .comparison-table td {
    padding: 10px;
    font-size: 14px;
  }

  .feature-col-header {
    width: auto;
    /* Allow auto width on mobile */
    min-width: 40%;
  }

  .traditional-header,
  .gcc-header {
    width: auto;
    min-width: 25%;
  }

  .title {
    font-size: 26px;
  }
}

@media (max-width : 575px) {
  .comparison-table {
    min-width: 400px;
    /* Ensure table doesn't squash too much */
  }

  .comparison-table th {
    font-size: 10px;
  }

}


@media (max-width : 425px) {
  .comparison-table {
    min-width: 350px;
    /* Ensure table doesn't squash too much */
  }

  .comparison-table th {
    font-size: 8px;
  }

  .comparison-table td {
    font-size: 12px;
  }

  .gcc-header img {
    width: 500px;
  }

}

/* Think Tank / Subject Matter Experts / Industry Mentors sections */
.people-section-light {
  background-color: #F8F9FB;
}

.people-section-white {
  background-color: #ffffff;
}

.people-title-wrap {
  margin-bottom: 50px;
}

.people-title {
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #130922;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 0;
}

.people-title::after {
  content: "";
  display: block;
  width: 70px;
  height: 4px;
  background: #F1A63E;
  margin: 18px auto 0;
  border-radius: 10px;
}

.people-highlight {
  color: #F1A63E;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 40px;
}

.people-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.people-card a {
  display: block;
}

.people-card img {
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.people-card:hover img {
  transform: translateY(-4px);
}

.think-tank-card img {
  max-width: 220px;
  width: 100%;
}

@media (max-width: 1200px) {
  .people-title {
    font-size: 30px;
  }
}

@media (max-width: 991px) {
  .people-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .people-title {
    font-size: 26px;
  }
}

@media (max-width: 767px) {
  .people-title-wrap {
    margin-bottom: 30px;
  }

  .people-title {
    font-size: 20px;
    letter-spacing: 1px;
  }

  .people-title::after {
    width: 50px;
    height: 3px;
    margin-top: 10px;
  }

  .people-grid {
    grid-template-columns: 1fr;
  }

  .think-tank-card {
    padding: 8px;
  }

  .think-tank-card img {
    max-width: 155px;
  }
}

/* Subject Matter Expert cards (same design as the Instructors cards in US-CMA-Web.html) */
.sme-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.sme-card {
  position: relative;
  min-width: 0;
  overflow: hidden;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sme-card-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
}

.sme-card-overlay:focus-visible {
  outline: 3px solid #f1d5a2;
  outline-offset: -3px;
}

.sme-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.25);
}

.sme-card:hover .sme-link {
  color: #e9c488;
  border-color: #e9c488;
}

/* 10 cards: center the last one in the 3-column grid */
.sme-card:last-child:nth-child(3n + 1) {
  grid-column: 2;
}

.sme-visual {
  height: 185px;
  position: relative;
  overflow: hidden;
  /* Site theme: deep plum to brand magenta, with a soft gold glow (same colours as the
     program cards, the logo-box heading and the Apply Now buttons) */
  background:
    radial-gradient(ellipse at 100% 100%, rgba(229, 169, 60, 0.35) 0%, transparent 55%),
    linear-gradient(135deg, #35083D 0%, #5E1460 50%, #A13E99 100%);
  background-size: 110% 110%;
  background-position: 0% 30%;
  animation: sme-gradient-drift 26s ease-in-out infinite alternate;
}

@keyframes sme-gradient-drift {
  from { background-position: 0% 30%; }
  to { background-position: 100% 70%; }
}

.sme-ring {
  position: absolute;
  width: 240px;
  height: 240px;
  left: 28%;
  top: -30px;
  border: 1px solid rgba(255, 255, 255, 0.33);
  border-radius: 50%;
  opacity: 0.38;
  box-shadow: 0 0 0 16px rgba(255, 255, 255, 0.04), 0 0 0 48px rgba(255, 255, 255, 0.02);
}

.sme-portrait {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 78%;
  height: calc(100% - 10px);
  object-fit: contain;
  object-position: center bottom;
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.19));
}

.sme-experience {
  position: absolute;
  z-index: 2;
  left: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #f6f7fc;
}

.sme-experience-value {
  font-size: 26px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -1px;
}

.sme-experience-label {
  margin-top: 7px;
  padding: 3px 7px;
  font-size: 9px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: #e9c488;
  color: #493314;
  border-radius: 4px;
}

.sme-index {
  position: absolute;
  left: 20px;
  bottom: 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #b9c2d6;
}

.sme-copy {
  flex: 1;
  position: relative;
  min-height: 105px;
  padding: 18px 20px 16px;
  background: #22071F;
}

.sme-name {
  margin: 0 30px 8px 0;
  font-family: 'Inter', sans-serif;
  font-size: 21px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.3px;
  color: #ffffff;
  overflow-wrap: break-word;
}

.sme-role {
  margin: 0;
  white-space: pre-line;
  font-size: 13px;
  line-height: 1.55;
  font-weight: 500;
  color: #e5daef;
}

.sme-link {
  position: absolute;
  right: 16px;
  top: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid rgba(255, 255, 255, 0.33);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}

.sme-link:hover {
  color: #e9c488;
  border-color: #e9c488;
}

.sme-link:focus-visible {
  outline: 3px solid #f1d5a2;
  outline-offset: 3px;
}

.sme-logos {
  flex-shrink: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 20px;
  background: #ededee;
}

.sme-logo-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  min-width: 0;
  max-width: 112px;
  height: 48px;
}

.sme-logo-slot img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

@media (max-width: 991px) {
  .sme-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .sme-card:last-child:nth-child(3n + 1) {
    grid-column: auto;
  }

  .sme-card:last-child:nth-child(2n + 1) {
    grid-column: 1 / -1;
    width: calc((100% - 20px) / 2);
    justify-self: center;
  }
}

@media (max-width: 767px) {
  .sme-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .sme-card:last-child:nth-child(n) {
    grid-column: auto;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sme-visual {
    animation: none;
  }

  .sme-card {
    transition: none;
  }

  .sme-card:hover {
    transform: none;
  }
}

@media (max-width: 400px) {
  .table-responsive {
    overflow-x: auto !important;
  }
  .comparison-table {
    min-width: 480px !important;
  }
}
</style>

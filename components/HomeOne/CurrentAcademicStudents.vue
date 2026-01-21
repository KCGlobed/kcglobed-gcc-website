<template>
  <div class="comparison-warp ptb-100">
    <div class="container">
      <div class="section-title text-center">
        <!-- <span class="sub-title">Comparison</span> -->
        <h2>Traditional Pathway vs GCC Journey</h2>
        <p>See why GCC Journey is most suited for professional world of new tomorrow.</p>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered comparison-table">
          <thead>
            <tr>
              <th scope="col" class="feature-col">Feature</th>
              <th scope="col" class="text-center">Traditional Pathway</th>
              <th scope="col" class="text-center highlight-header">GCC Journey</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in comparisonData" :key="index">
              <td class="feature-name">{{ item.feature }}</td>
              <td class="text-center">
                <span v-if="item.traditional" class="icon-check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span v-else class="icon-cross">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
              </td>
              <td class="text-center highlight-cell">
                <span v-if="item.gcc" class="icon-check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span v-else class="icon-cross">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentAcademicStudents",
  data() {
    return {
      comparisonData: [
        { feature: "Globally Recognised Academic Credentials", traditional: true, gcc: true },
        { feature: "Strong theoretical foundation", traditional: true, gcc: true },
        { feature: "Your Career Commitment & Confidence from Day 1", traditional: false, gcc: true },
        { feature: "Get Hired First, Then Trained.", traditional: false, gcc: true },
        { feature: "Real Time Industry Projects", traditional: false, gcc: true },
        { feature: "Global exposure", traditional: false, gcc: true },
        { feature: "Purpose Driven Curriculum", traditional: false, gcc: true },
        { feature: "Industry mentors", traditional: false, gcc: true },
        { feature: "Tech. Enabled Learning", traditional: false, gcc: true },
        { feature: "Outcome Based Assessment", traditional: false, gcc: true },
        { feature: "Employability Focused Training ", traditional: false, gcc: true },
      ],
    };
  },
};
</script>

<style scoped>
.comparison-warp {
  background-color: #EEECF4;
}

.table-responsive {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.comparison-table {
  width: 100%;
  margin-bottom: 0;
  background-color: #fff;
  border-collapse: collapse;
}

.comparison-table th {
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  color: #38003c;
}

.comparison-table td {
  padding: 15px 20px;
  vertical-align: middle;
  border-bottom: 1px solid #dee2e6;
  font-size: 16px;
  color: #333;
}

.feature-col {
  text-align: left;
  width: 40%;
}

.feature-name {
  font-weight: 500;
}

.icon-check {
  color: #28a745;
  /* Green */
  display: inline-flex;
}

.icon-cross {
  color: #dc3545;
  /* Red */
  display: inline-flex;
}

.highlight-header {
  background-color: #f7e2a9 !important;
  /* Light Goldish background */
  color: #000;
}

.highlight-cell {
  background-color: rgba(247, 226, 169, 0.1);
}

.sub-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #f5a623;
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 1px;
}
</style>

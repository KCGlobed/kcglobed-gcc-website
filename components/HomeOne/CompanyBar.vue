<template>
  <div class="panelBox">
    <div class="boxes-container">
      <!-- AICPA -->
      <div class="box">
        <img src="../../assets/img/AICPA_logo.png" alt="AICPA Logo" loading="lazy" decoding="async" style="max-height: 60px;" />
        <span>US CPA Pathway</span>
      </div>
      <!-- ACCA -->
      <div class="box">
        <img src="../../assets/newimages/red-acca-logo.svg" alt="ACCA Logo" loading="lazy" decoding="async" />
        <span>ACCA</span>
      </div>
      <!-- IRS -->
      <div class="box">
        <img src="../../assets/img/IRS_logo.png" alt="IRS Logo" loading="lazy" decoding="async" />
        <span>US Enrolled Agent</span>
      </div>
      <!-- British Council -->
      <div class="box">
        <img src="../../assets/img/heros/panleIcon4.png" alt="British Council Logo" loading="lazy"
          decoding="async" />
      </div>
      <!-- AIMA -->
      <div class="box">
        <img src="../../assets/img/heros/panleIcon5.png" alt="AIMA Logo" loading="lazy" decoding="async" />
        <span>AICTE-Approved PGCM</span>
      </div>
      <!-- KC GlobEd -->
      <div class="box">
        <img src="../../assets/img/logo_kcglobed.svg" alt="KC GlobEd Logo" loading="lazy" decoding="async" />
        <span>Backed by KC GlobEd - 30+ Years</span>
      </div>
      <!-- University of London -->
      <div class="box">
        <img src="../../assets/img/companylogo/4.png" alt="University of London Logo" loading="lazy"
          decoding="async" />
        <span>University of London MSc (Optional)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyBar"
};
</script>

<style scoped>
.panelBox {
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
  padding: 0 20px;
  width: 100%;
  z-index: 10;
}

.boxes-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  background: #ffffff;
  margin: 0 auto;
  width: 100%;
  max-width: 1209px;
}

.boxes-container .box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: 1px solid #E5E5E5;
  padding: 0 12px;
  min-height: 80px;
}

.boxes-container .box:last-child {
  border-right: none;
}

.boxes-container .box img {
  max-height: 40px;
  max-width: 100%;
  object-fit: contain;
}

.boxes-container .box span {
  font-size: 10px;
  font-weight: 700;
  color: #777777;
  text-transform: uppercase;
  margin-top: 8px;
  line-height: 1.2;
}

@media (max-width: 991px) {
  .boxes-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }

  .boxes-container .box {
    border-right: none;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 15px;
    width: auto;
    min-height: unset;
  }

  .boxes-container .box:nth-child(4),
  .boxes-container .box:nth-child(7),
  .boxes-container .box:last-child {
    border-bottom: none;
  }
}

@media (max-width: 767px) {
  .boxes-container {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 12px 6px !important;
  }

  .boxes-container .box {
    flex: 0 0 calc(25% - 8px) !important;
    max-width: calc(25% - 8px) !important;
    background: #ffffff !important;
    border: 1px solid #2f2f2f !important;
    border-radius: 8px !important;
    padding: 8px 4px !important;
    min-height: 70px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .boxes-container .box img {
    max-height: 25px !important;
  }

  .boxes-container .box span {
    font-size: 5px !important;
    margin-top: 4px !important;
  }
}

@media (max-width: 380px) {
  .boxes-container .box span {
    font-size: 4px;
  }
}
</style>

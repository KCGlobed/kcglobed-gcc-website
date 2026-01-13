<template>
  <div class="academic-information-warp pb-100">
    <div class="container">
      <div class="academic-info-content">
        <p>
          In order to submit your application you must indicate the highest
          level you have achieved in the following:
        </p>
      </div>
      <div class="row">
        <div class="col-lg-5">
          <div class="academic-info-heading">
            <h5>Institution Type</h5>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="academic-info-heading">
            <h5>Highest Level Achieved</h5>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="input-bg">
            <div class="row align-items-center">
              <div class="col-lg-5">
                <div class="institution">
                  <p>Senior Secondary / High School</p>
                </div>
              </div>
              <div class="col-lg-7">
                <div class="input-select">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>--Select--</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="input-bg">
            <div class="row align-items-center">
              <div class="col-lg-5">
                <div class="institution">
                  <p>College</p>
                </div>
              </div>
              <div class="col-lg-7">
                <div class="input-select">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>--Select--</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="input-bg">
            <div class="row align-items-center">
              <div class="col-lg-5">
                <div class="institution">
                  <p>University</p>
                </div>
              </div>
              <div class="col-lg-7">
                <div class="input-select">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>--Select--</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="next-button text-end pt-30">
        <a href="#" class="default-btn style2">
          <i class="ti ti-arrow-narrow-left"></i>
          Previous
        </a>
        <a href="#" class="default-btn">
          Next
          <i class="ti ti-arrow-narrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AcademicInformation",
};
</script>

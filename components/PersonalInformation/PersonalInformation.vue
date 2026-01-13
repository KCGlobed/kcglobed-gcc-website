<template>
  <div class="personal-information-warp pb-100">
    <div class="container">
      <form>
        <div class="select-option">
          <h3>Select An Option</h3>
          <ul class="select-option-list">
            <li>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  I’m a domestic student
                </label>
              </div>
            </li>
            <li>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  I’m an International student
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="applicant-details">
              <h3>Applicant Details</h3>
              <div class="input-box">
                <label for="exampleFormControlInput1" class="form-label">
                  Applicants First Name
                  <span>*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="First Name"
                />
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput2" class="form-label">
                  Last Name
                  <span>*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Last Name"
                />
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput3" class="form-label">
                  Gender
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput4" class="form-label">
                  Citizenship
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput5" class="form-label">
                  Country Of Birth
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput6" class="form-label">
                  First Language
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput7" class="form-label">
                  Status In Canada
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput8" class="form-label">
                  Date Of Birth
                  <span>*</span>
                </label>
                <div class="input-with-icon">
                  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput8"
                    placeholder=""
                  />
                  <i class="ti ti-calendar"></i>
                </div>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput9" class="form-label">
                  Email
                  <span>*</span>
                </label>
                <div class="input-with-icon">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput9"
                    placeholder="Email"
                  />
                  <i class="ti ti-mail"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="current-address applicant-details">
              <h3>Current Address</h3>
              <div class="input-box">
                <label for="exampleFormControlInput10" class="form-label">
                  Street Address
                  <span>*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput10"
                  placeholder="Street"
                />
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput11" class="form-label">
                  City
                  <span>*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput11"
                  placeholder="City"
                />
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput12" class="form-label">
                  Country
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput13" class="form-label">
                  Province/State
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput14" class="form-label">
                  Postal/ZIP Code
                  <span>*</span>
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>--Select--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="input-box">
                <label for="exampleFormControlInput15" class="form-label">
                  Phone No
                  <span>*</span>
                </label>
                <div class="input-with-icon">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Phone No"
                  />
                  <i class="ti ti-phone-call"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="next-button text-end pt-30">
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
  name: "PersonalInformation",
};
</script>

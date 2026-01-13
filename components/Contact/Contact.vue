<template>
  <div class="main-contact-warp ptb-100">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="contact-small-widget">
            <h5>Contact Information</h5>
            <div class="contact-item">
              <span>Phone No:</span>
              <a href="tel:132313242354">+1 3231 3242 354</a>
            </div>
            <div class="contact-item">
              <span>Email:</span>
              <a href="mailto:info.gccschool.com">info.gccschool.com</a>
            </div>
            <div class="contact-item">
              <span>Location:</span>
              <p>Davis Campus</p>
              <p>7899 McLaughlin Road, Brampton</p>
            </div>
            <div class="contact-item">
              <span>Open Hours:</span>
              <p>Monday - Friday: 8:00 am - 10:00 pm</p>
              <p>Saturday - Sunday: 8:00 am - 12:00 pm</p>
            </div>
            <div class="contact-item">
              <span>Social Media:</span>
              <ul class="social-list">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    class="icon"
                  >
                    <img src="~/assets/img/svgs/facebook.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    class="icon"
                  >
                    <img src="~/assets/img/svgs/twitter.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    class="icon"
                  >
                    <img src="~/assets/img/svgs/instagram.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    class="icon"
                  >
                    <img src="~/assets/img/svgs/linkedin.svg" alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    class="icon"
                  >
                    <img src="~/assets/img/svgs/youtube.svg" alt="icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="main-contact-content">
            <div class="blog-title">
              <h2>Keep In Touch, We Want To Hear From You - Send Us Message</h2>
            </div>
            <form>
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-box">
                    <label for="exampleFormControlInput1" class="form-label">
                      First Name
                      <span>*</span>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
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
                </div>
                <div class="col-lg-6">
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
                <div class="col-lg-6">
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
                <div class="col-lg-12">
                  <div class="input-box">
                    <label for="exampleFormControlTextarea1" class="form-label">
                      Your Message Here
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      By submitting this form, you agree to the Tuva University
                      privacy notice.
                    </label>
                  </div>
                </div>
                <div class="col-lg-12">
                  <button class="default-btn" type="submit">
                    Send Message Now <i class="ti ti-arrow-narrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
};
</script>

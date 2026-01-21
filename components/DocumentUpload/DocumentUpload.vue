<template>
  <div class="document-warp pb-50">
    <div class="container">
      <div class="document-content pb-30">
        <h4>Document Upload</h4>
        <p>
          Please upload your documents below. You can use DigiLocker for a faster experience.
        </p>
      </div>

      <!-- Upload Method Selection -->
      <ul class="nav nav-tabs mb-4" id="uploadMethodTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="manual-tab" data-bs-toggle="tab" data-bs-target="#manual" type="button" role="tab">Manual Upload</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="digilocker-tab" data-bs-toggle="tab" data-bs-target="#digilocker" type="button" role="tab">DigiLocker (Preferred)</button>
        </li>
      </ul>

      <div class="tab-content" id="uploadMethodTabContent">
        <!-- Manual Upload Section -->
        <div class="tab-pane show fade active" id="manual" role="tabpanel">
             <div class="alert alert-info">
                Allowed Formats: PDF / JPG / PNG. Max Size: 2 MB per file.
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                     <label class="form-label">Aadhaar Card <span>*</span></label>
                     <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload('aadhaar', $event)" :class="{ 'is-invalid': errors.aadhaar }">
                     <div class="invalid-feedback" v-if="errors.aadhaar">{{ errors.aadhaar }}</div>
                </div>
                 <div class="col-md-6 mb-3">
                     <label class="form-label">Class 12 Marksheet <span>*</span></label>
                     <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload('class12', $event)" :class="{ 'is-invalid': errors.class12 }">
                     <div class="invalid-feedback" v-if="errors.class12">{{ errors.class12 }}</div>
                </div>
                 <div class="col-md-6 mb-3">
                     <label class="form-label">B.Com Marksheet <span>*</span></label>
                     <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload('bcom', $event)" :class="{ 'is-invalid': errors.bcom }">
                     <div class="invalid-feedback" v-if="errors.bcom">{{ errors.bcom }}</div>
                </div>
                 <div class="col-md-6 mb-3">
                     <label class="form-label">Degree Certificate (if completed)</label>
                     <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png">
                </div>
                 <div class="col-md-6 mb-3">
                     <label class="form-label">PAN Card / Voter ID <span>*</span></label>
                     <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload('pan', $event)" :class="{ 'is-invalid': errors.pan }">
                     <div class="invalid-feedback" v-if="errors.pan">{{ errors.pan }}</div>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Passport-size Photograph <span>*</span></label>
                    <input type="file" class="form-control" accept=".jpg,.jpeg,.png" @change="handleFileUpload('photo', $event)" :class="{ 'is-invalid': errors.photo }">
                    <small class="text-muted">JPG/PNG only, Max 2MB</small>
                    <span class="invalid-feedback" v-if="errors.photo">{{ errors.photo }}</span>
               </div>
            </div>
        </div>

        <div class="tab-pane fade" id="digilocker" role="tabpanel">
            <div class="text-center py-5 bg-light rounded">
                <img src="https://img.icons8.com/color/48/000000/digilocker.png" alt="DigiLocker" class="mb-3"/>
                <h5>Fetch Documents from DigiLocker</h5>
                <p class="text-muted">Securely fetch your Aadhaar, Marksheets, and Degree.</p>
                <button class="btn btn-primary">Connect DigiLocker</button>
            </div>
        </div>
      </div>

       <hr class="my-5">

      <!-- Fee Concession -->
      <div class="mb-4">
          <h5 class="mb-3">Fee Concession & NEFT Payment</h5>
          <div class="mb-3">
              <label class="form-label">Select Concession Category (if applicable)</label>
              <select class="form-select" v-model="concessionCategory">
                  <option value="">No Concession - Full Fee Payment</option>
                  <option value="Only Girl Child">Only Girl Child (50%)</option>
                  <option value="Kargil Warrior">Kargil Warrior / Army Quota (50%)</option>
                  <option value="Merit">First Class with Academic Distinction / Gold Medalist (50%)</option>
                  <option value="SC/ST/OBC">SC / ST / OBC (50%)</option>
              </select>
          </div>

          <div v-if="concessionCategory" class="alert alert-warning">
              <h6>Proof Required</h6>
              <p>Please upload proof for <strong>{{ concessionCategory }}</strong>. Your status will be "Under Verification".</p>
              <div class="mb-3">
                  <label class="form-label">Upload Concession Document <span>*</span></label>
                  <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" @change="handleFileUpload('concessionProof', $event)" :class="{ 'is-invalid': errors.concessionProof }">
                  <div class="invalid-feedback" v-if="errors.concessionProof">{{ errors.concessionProof }}</div>
              </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentUpload",
  props: {
    userId: Number,
  },
  data() {
      return {
          concessionCategory: '',
          files: {
              aadhaar: null,
              class12: null,
              bcom: null,
              pan: null,
              photo: null,
              concessionProof: null
          },
          errors: {}
      }
  },
  methods: {
      async handleFileUpload(field, event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!this.userId) {
            alert("User ID missing. Please complete previous steps.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", this.userId);
        formData.append("document_type", field);

        try {
            const response = await fetch("/api/upload-document", {
            method: "POST",
            body: formData
            });

            const result = await response.json();

            if (!result.success) {
                alert(result.message || "Upload failed");
                this.errors[field] = result.message;
                return;
            }

            this.files[field] = file;
            delete this.errors[field];

            alert(result.message || "Upload successfully");
        } catch (err) {
            console.error("Upload error:", err);
            alert("Upload failed. Please try again.");
        }
      },
      validate() {
          this.errors = {};
          let isValid = true;

          // Note: Ignoring DigiLocker logic for now, enforcing Manual Upload validation
          if (!this.files.aadhaar) {
              this.errors.aadhaar = "Aadhaar Card is required";
              isValid = false;
          }
          if (!this.files.class12) {
              this.errors.class12 = "Class 12 Marksheet is required";
              isValid = false;
          }
          if (!this.files.bcom) {
              this.errors.bcom = "B.Com Marksheet is required";
              isValid = false;
          }
          if (!this.files.pan) {
              this.errors.pan = "PAN Card / Voter ID is required";
              isValid = false;
          }
          if (!this.files.photo) {
              this.errors.photo = "Passport-size Photograph is required";
              isValid = false;
          }
          
          if (this.concessionCategory && !this.files.concessionProof) {
              this.errors.concessionProof = "Concession Proof is required";
              isValid = false;
          }

          return isValid;
      }
  }
};
</script>

<template>
    <div class="pre-interview-section">
        <div class="alert alert-info py-2 mb-4 border-0 bg-light-info">
            <small class="fw-medium"><i class="ti ti-info-circle me-1"></i> Accepted Formats: PDF, JPG, PNG (Max 5MB per
                file)</small>
        </div>

        <h5 class="mb-3 text-[#872980]">Applicant Documents</h5>
        <div class="row g-4 mb-4">
            <div v-for="doc in applicantDocs" :key="doc.id" class="col-md-6">
                <div class="upload-field mb-0">
                    <label class="form-label fw-bold">
                        {{ doc.label }}
                        <span v-if="doc.mandatory" class="text-danger">*</span>
                        <span v-else class="text-muted fw-normal">(Optional)</span>
                    </label>
                    <div class="input-group">
                        <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                            @change="handleFileChange(doc.id, $event)" :class="{ 'is-invalid': errors[doc.id] }"
                            :disabled="isDisabled">
                        <span class="input-group-text bg-white" v-if="formData.documents[doc.id]">
                            <i class="ti ti-circle-check-filled text-success fs-5"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors[doc.id]">
                        {{ errors[doc.id] }}
                    </div>
                    <div class="mt-2" v-if="formData.existingDocuments && formData.existingDocuments[doc.id]">
                        <a :href="formData.existingDocuments[doc.id]" target="_blank"
                            class="btn btn-sm btn-outline-primary">
                            <i class="ti ti-eye"></i> View Current Document
                        </a>
                    </div>
                </div>
            </div>

            <div class="w-100 d-none d-md-block"></div>

            <div class="col-md-6">
                <div class="mb-0">
                    <label class="form-label fw-bold">Additional Qualification Name <span
                            class="text-muted fw-normal">(Optional)</span></label>
                    <input type="text" class="form-control" v-model="formData.additional_qualification"
                        :disabled="isDisabled" placeholder="Enter name of qualification">
                </div>
            </div>
            <div class="col-md-6">
                <div class="upload-field mb-0">
                    <label class="form-label fw-bold">Additional Qualification Document <span
                            class="text-muted fw-normal">(Optional)</span></label>
                    <div class="input-group">
                        <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                            @change="handleFileChange('additional_document', $event)"
                            :class="{ 'is-invalid': errors['additional_document'] }" :disabled="isDisabled">
                        <span class="input-group-text bg-white" v-if="formData.documents['additional_document']">
                            <i class="ti ti-circle-check-filled text-success fs-5"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors['additional_document']">
                        {{ errors['additional_document'] }}
                    </div>
                    <div class="mt-2"
                        v-if="formData.existingDocuments && formData.existingDocuments['additional_document']">
                        <a :href="formData.existingDocuments['additional_document']" target="_blank"
                            class="btn btn-sm btn-outline-primary">
                            <i class="ti ti-eye"></i> View Current Document
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <hr class="my-4" style="border-color: #E5E7EB;">
        <h5 class="mb-1 fw-bold text-dark">Select Your Fee Payment Preference</h5>
        <p class="text-muted small mb-3">Please choose your preferred mode of financing for the admission of AI-Enabled
            International Accounting Professional Program (AEIAP).</p>
        <div class="mb-4">
            <div class="d-flex gap-4 mt-2">
                <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" id="fundSelf" value="1"
                        v-model="formData.accounting_profession" :disabled="isDisabled" @change="onPreferenceChange">
                    <label class="form-check-label fw-medium" for="fundSelf" style="cursor:pointer">Self Finance</label>
                </div>
                <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" id="fundLoan" value="2"
                        v-model="formData.accounting_profession" :disabled="isDisabled" @change="onPreferenceChange">
                    <label class="form-check-label fw-medium" for="fundLoan" style="cursor:pointer">Education
                        Loan</label>
                </div>
            </div>
            <div class="invalid-feedback d-block" v-if="errors['accounting_profession']">
                {{ errors['accounting_profession'] }}
            </div>
        </div>

        <!-- Self Finance Declaration (With validation checkbox) -->
        <div v-if="formData.accounting_profession === '1'"
            class="declaration-box p-3 rounded bg-light-warning mb-4 border-start border-warning border-4">
            <h6 class="fw-bold text-warning-emphasis mb-2"><i class="ti ti-alert-circle me-1"></i> Self-financing
                Declaration</h6>
            <p class="mb-3 text-dark small">"I hereby confirm that I will be self-financing my education fees and will
                not be applying for an education loan through GCC School or its financing partners."</p>

            <div class="form-check custom-checkbox mb-1">
                <input class="form-check-input" type="checkbox" id="agreeDeclaration"
                    v-model="formData.fee_preference_agree" :disabled="isDisabled">
                <label class="form-check-label fw-bold small text-dark" for="agreeDeclaration" style="cursor:pointer">
                    I Agree to the Above Declaration <span class="text-danger">*</span>
                </label>
            </div>
            <div class="invalid-feedback d-block" v-if="errors['fee_preference_agree']">
                {{ errors['fee_preference_agree'] }}
            </div>
        </div>

        <!-- Education Loan Co-applicant Details -->
        <div v-if="formData.accounting_profession === '2'" class="coapplicant-section p-4 bg-white rounded-3 border">
            <h5 class="mb-1 text-[#872980]">Upload Required Co-applicant Documents</h5>
            <p class="text-muted small mb-4 border-bottom pb-2">Provide identity and professional financial
                documentation for your co-applicant.</p>

            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <div class="upload-field mb-0">
                        <label class="form-label fw-bold">Co-applicant's PAN Card <span
                                class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange('co_applicant_pan_card', $event)"
                                :class="{ 'is-invalid': errors['co_applicant_pan_card'] }" :disabled="isDisabled">
                            <span class="input-group-text bg-white" v-if="formData.documents['co_applicant_pan_card']">
                                <i class="ti ti-circle-check-filled text-success fs-5"></i>
                            </span>
                        </div>
                        <div class="invalid-feedback d-block" v-if="errors['co_applicant_pan_card']">
                            {{ errors['co_applicant_pan_card'] }}
                        </div>
                        <div class="mt-2"
                            v-if="formData.existingDocuments && formData.existingDocuments['co_applicant_pan_card']">
                            <a :href="formData.existingDocuments['co_applicant_pan_card']" target="_blank"
                                class="btn btn-sm btn-outline-primary">
                                <i class="ti ti-eye"></i> View Current Document
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="upload-field mb-0">
                        <label class="form-label fw-bold">Co-applicant's Aadhaar Card <span
                                class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange('co_applicant_aadhaar', $event)"
                                :class="{ 'is-invalid': errors['co_applicant_aadhaar'] }" :disabled="isDisabled">
                            <span class="input-group-text bg-white" v-if="formData.documents['co_applicant_aadhaar']">
                                <i class="ti ti-circle-check-filled text-success fs-5"></i>
                            </span>
                        </div>
                        <div class="invalid-feedback d-block" v-if="errors['co_applicant_aadhaar']">
                            {{ errors['co_applicant_aadhaar'] }}
                        </div>
                        <div class="mt-2"
                            v-if="formData.existingDocuments && formData.existingDocuments['co_applicant_aadhaar']">
                            <a :href="formData.existingDocuments['co_applicant_aadhaar']" target="_blank"
                                class="btn btn-sm btn-outline-primary">
                                <i class="ti ti-eye"></i> View Current Document
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-bold">Select Co-applicant Profession <span
                            class="text-danger">*</span></label>
                    <select class="form-select form-control" v-model="formData.co_applicant_profession"
                        :disabled="isDisabled" :class="{ 'is-invalid': errors['co_applicant_profession'] }"
                        @change="onProfessionChange">
                        <option value="">Select Profession</option>
                        <option value="1">Co-applicant is Salaried</option>
                        <option value="2">Co-applicant is Self-employed</option>
                        <option value="3">Co-applicant is an Agriculture Professional</option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors['co_applicant_profession']">
                        {{ errors['co_applicant_profession'] }}
                    </div>
                </div>
            </div>

            <div v-if="formData.co_applicant_profession" class="row g-4 mt-1 border-top pt-3">
                <h6 class="mb-0 text-dark fw-bold">{{ getProfessionName() }} Documents</h6>
                <div v-for="doc in coappDocs[formData.co_applicant_profession]" :key="doc.id" class="col-md-6">
                    <div class="upload-field mb-0">
                        <label class="form-label fw-bold">{{ doc.label }} <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange(doc.id, $event)" :class="{ 'is-invalid': errors[doc.id] }"
                                :disabled="isDisabled">
                            <span class="input-group-text bg-white" v-if="formData.documents[doc.id]">
                                <i class="ti ti-circle-check-filled text-success fs-5"></i>
                            </span>
                        </div>
                        <div class="invalid-feedback d-block" v-if="errors[doc.id]">
                            {{ errors[doc.id] }}
                        </div>
                        <div class="mt-2" v-if="formData.existingDocuments && formData.existingDocuments[doc.id]">
                            <a :href="formData.existingDocuments[doc.id]" target="_blank"
                                class="btn btn-sm btn-outline-primary">
                                <i class="ti ti-eye"></i> View Current Document
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PreInterview",
    props: {
        formData: {
            type: Object,
            required: true
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            errors: {},
            applicantDocs: [
                { id: 'identity_proof', label: 'PAN Card / Valid Passport / Voter ID Card', mandatory: true },
                { id: 'tenth_marksheet', label: 'Marksheet of 10th', mandatory: true },
                { id: 'twelth_marksheet', label: 'Marksheet of 12th', mandatory: true },
                { id: 'graduation_first_marksheet', label: 'Graduation Semester 1', mandatory: true },
                { id: 'graduation_second_marksheet', label: 'Graduation Semester 2', mandatory: true },
                { id: 'graduation_third_marksheet', label: 'Graduation Semester 3', mandatory: true },
                { id: 'graduation_forth_marksheet', label: 'Graduation Semester 4', mandatory: true },
                { id: 'graduation_fifth_marksheet', label: 'Graduation Semester 5', mandatory: true },
                { id: 'graduation_sixth_marksheet', label: 'Graduation Semester 6', mandatory: false },
            ],
            coappDocs: {
                '1': [
                    { id: 'co_applicant_sallary_slip', label: 'Last 3 months Salary Slips' },
                    { id: 'co_applicant_six_month_bank', label: 'Last 3 months Bank Statement' },
                    { id: 'co_applicant_form16', label: 'Form 16' },
                    { id: 'co_applicant_employee_id_card', label: 'Employee ID of the Employer' },
                    { id: 'co_applicant_passport_size', label: 'Latest Passport Size Photo' },
                ],
                '2': [
                    { id: 'co_applicant_income_tax_return', label: 'Income Tax Return Acknowledgment Page (FY 24-25 ( AY 25-26))' },
                    { id: 'co_applicant_compute_income', label: 'Computation of Income' },
                    { id: 'co_applicant_six_month_bank', label: 'Last 6 months Bank Statement (Current or Savings)' },
                ],
                '3': [
                    { id: 'co_applicant_six_month_bank', label: 'Last 6 months Bank Statement' },
                    { id: 'co_applicant_agriculture_income', label: 'Agriculture Income Certificate' },
                ]
            }
        };
    },
    methods: {
        scrollToFirstError() {
            this.$nextTick(() => {
                const el = this.$el.querySelector('.is-invalid');
                if (el && el.scrollIntoView) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        },
        onPreferenceChange() {
            // Clear unnecessary data when preference changes to keep state consistent
            if (this.formData.accounting_profession === '1') {
                this.formData.co_applicant_profession = "";
            } else {
                this.formData.fee_preference_agree = false; // Clear tick if switched away
            }
            this.errors = {};
        },
        onProfessionChange() {
            this.errors = {};
        },
        getProfessionName() {
            const names = {
                '1': 'Salaried',
                '2': 'Self-employed',
                '3': 'Agriculture Professional'
            };
            return names[this.formData.co_applicant_profession] || '';
        },
        handleFileChange(field, event) {
            const file = event.target.files[0];
            if (!file) {
                this.formData.documents[field] = null;
                return;
            }

            // Validation: Size check (Max 5MB per document)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                this.errors[field] = "File size exceeds 5MB limit.";
                event.target.value = ""; // Clear input
                this.formData.documents[field] = null;
                return;
            }

            // Accepted type check
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                this.errors[field] = "Invalid file type. Only PDF/JPG/PNG allowed.";
                event.target.value = "";
                this.formData.documents[field] = null;
                return;
            }

            // Clear errors and store the File object
            delete this.errors[field];
            this.formData.documents[field] = file;
        },
        validate() {
            this.errors = {};
            let isValid = true;

            // Validate mandatory applicant documents
            this.applicantDocs.forEach(doc => {
                if (doc.mandatory) {
                    const hasNew = !!this.formData.documents[doc.id];
                    const hasExisting = !!(this.formData.existingDocuments && this.formData.existingDocuments[doc.id]);
                    if (!hasNew && !hasExisting) {
                        this.errors[doc.id] = `${doc.label} is mandatory.`;
                        isValid = false;
                    }
                }
            });

            // Validate Fee Payment Preference (accounting_profession)
            if (!this.formData.accounting_profession) {
                this.errors['accounting_profession'] = "Please select a fee payment preference.";
                isValid = false;
            } else if (this.formData.accounting_profession === '1') {
                if (!this.formData.fee_preference_agree) {
                    this.errors['fee_preference_agree'] = "You must agree to the self-financing declaration to proceed.";
                    isValid = false;
                }
            }

            // Validate Co-applicant details if Education Loan (accounting_profession === '2')
            if (this.formData.accounting_profession === '2') {
                ['co_applicant_pan_card', 'co_applicant_aadhaar'].forEach(field => {
                    const hasNew = !!this.formData.documents[field];
                    const hasExisting = !!(this.formData.existingDocuments && this.formData.existingDocuments[field]);
                    if (!hasNew && !hasExisting) {
                        const label = field === 'co_applicant_pan_card' ? "Co-applicant PAN Card" : "Co-applicant Aadhaar Card";
                        this.errors[field] = `${label} is mandatory for loans.`;
                        isValid = false;
                    }
                });

                if (!this.formData.co_applicant_profession) {
                    this.errors['co_applicant_profession'] = "Please select co-applicant profession.";
                    isValid = false;
                } else {
                    const reqDocs = this.coappDocs[this.formData.co_applicant_profession];
                    if (reqDocs) {
                        reqDocs.forEach(doc => {
                            const hasNew = !!this.formData.documents[doc.id];
                            const hasExisting = !!(this.formData.existingDocuments && this.formData.existingDocuments[doc.id]);
                            if (!hasNew && !hasExisting) {
                                this.errors[doc.id] = "This document is mandatory for the selected profession.";
                                isValid = false;
                            }
                        });
                    }
                }
            }

            return isValid;
        }
    }
};
</script>

<style scoped>
.form-label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
}

.bg-light-info {
    background-color: #F0F9FF;
    color: #0369A1;
    border: 1px solid #E0F2FE !important;
    border-radius: 10px;
}

.bg-light-warning {
    background-color: #FFFBEB;
    border-color: #FEF3C7;
}

.border-warning {
    border-color: #F59E0B !important;
}

.text-warning-emphasis {
    color: #92400E !important;
}

.form-control {
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 14px;
    transition: all 0.2s;
}

.form-control:focus {
    background-color: #fff;
    border-color: #872980;
    box-shadow: 0 0 0 4px rgba(135, 41, 128, 0.1);
    outline: none;
}

.form-select {
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 14px;
    cursor: pointer;
}

.btn-outline-primary {
    color: #872980;
    border-color: #E9D5FF;
    background-color: #FAF5FF;
    font-weight: 600;
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 8px;
}

.btn-outline-primary:hover {
    background-color: #872980;
    border-color: #872980;
    color: #fff;
}

.input-group-text {
    border: 1px solid #E5E7EB;
    border-left: none;
    border-radius: 0 10px 10px 0;
}

.custom-radio .form-check-input {
    width: 20px;
    height: 20px;
    margin-top: 0;
    border-color: #d1d5db;
    cursor: pointer;
}

.custom-radio .form-check-input:checked {
    background-color: #872980;
    border-color: #872980;
}

.custom-checkbox .form-check-input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    border-color: #d1d5db;
    cursor: pointer;
}

.custom-checkbox .form-check-input:checked {
    background-color: #872980;
    border-color: #872980;
}

.coapplicant-section {
    border: 1px solid #E5E7EB;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>

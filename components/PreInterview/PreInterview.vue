<template>
    <div class="pre-interview-section">
        <div class="alert alert-info py-2 mb-4 border-0 bg-light-info">
            <small class="fw-medium"><i class="ti ti-info-circle me-1"></i> Accepted Formats: PDF, JPG, PNG (Max 5MB per file)</small>
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
                            @change="handleFileChange(doc.id, $event)"
                            :class="{ 'is-invalid': errors[doc.id] }"
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
                    <label class="form-label fw-bold">Additional Qualification Name <span class="text-muted fw-normal">(Optional)</span></label>
                    <input type="text" class="form-control" v-model="formData.pi_add_qual_name" :disabled="isDisabled" placeholder="Enter name of qualification">
                </div>
            </div>
            <div class="col-md-6">
                <div class="upload-field mb-0">
                    <label class="form-label fw-bold">Additional Qualification Document <span class="text-muted fw-normal">(Optional)</span></label>
                    <div class="input-group">
                        <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                            @change="handleFileChange('pi_add_qual_doc', $event)"
                            :class="{ 'is-invalid': errors['pi_add_qual_doc'] }"
                            :disabled="isDisabled">
                        <span class="input-group-text bg-white" v-if="formData.documents['pi_add_qual_doc']">
                            <i class="ti ti-circle-check-filled text-success fs-5"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors['pi_add_qual_doc']">
                        {{ errors['pi_add_qual_doc'] }}
                    </div>
                    <div class="mt-2" v-if="formData.existingDocuments && formData.existingDocuments['pi_add_qual_doc']">
                        <a :href="formData.existingDocuments['pi_add_qual_doc']" target="_blank"
                            class="btn btn-sm btn-outline-primary">
                            <i class="ti ti-eye"></i> View Current Document
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <hr class="my-4" style="border-color: #E5E7EB;">
        <h5 class="mb-3 text-[#872980]">Funding Details</h5>
        <div class="mb-4">
            <label class="form-label fw-bold">Select Funding Type <span class="text-danger">*</span></label>
            <div class="d-flex gap-4 mt-2">
                <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" id="fundSelf" value="Self Financed" v-model="formData.pi_funding_type" :disabled="isDisabled">
                    <label class="form-check-label fw-medium" for="fundSelf" style="cursor:pointer">Self Financed</label>
                </div>
                <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" id="fundLoan" value="Loan" v-model="formData.pi_funding_type" :disabled="isDisabled">
                    <label class="form-check-label fw-medium" for="fundLoan" style="cursor:pointer">Loan</label>
                </div>
            </div>
            <div class="invalid-feedback d-block" v-if="errors['pi_funding_type']">
                {{ errors['pi_funding_type'] }}
            </div>
        </div>

        <div v-if="formData.pi_funding_type === 'Loan'" class="coapplicant-section p-4 bg-white rounded-3 border">
            <h5 class="mb-3 text-[#872980]">Co-applicant Details</h5>
            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <div class="upload-field mb-0">
                        <label class="form-label fw-bold">Co-applicant's PAN Card <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange('pi_coapp_pan', $event)"
                                :class="{ 'is-invalid': errors['pi_coapp_pan'] }"
                                :disabled="isDisabled">
                            <span class="input-group-text bg-white" v-if="formData.documents['pi_coapp_pan']">
                                <i class="ti ti-circle-check-filled text-success fs-5"></i>
                            </span>
                        </div>
                        <div class="invalid-feedback d-block" v-if="errors['pi_coapp_pan']">
                            {{ errors['pi_coapp_pan'] }}
                        </div>
                        <div class="mt-2" v-if="formData.existingDocuments && formData.existingDocuments['pi_coapp_pan']">
                            <a :href="formData.existingDocuments['pi_coapp_pan']" target="_blank"
                                class="btn btn-sm btn-outline-primary">
                                <i class="ti ti-eye"></i> View Current Document
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="upload-field mb-0">
                        <label class="form-label fw-bold">Co-applicant's Aadhaar Card <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange('pi_coapp_aadhaar', $event)"
                                :class="{ 'is-invalid': errors['pi_coapp_aadhaar'] }"
                                :disabled="isDisabled">
                            <span class="input-group-text bg-white" v-if="formData.documents['pi_coapp_aadhaar']">
                                <i class="ti ti-circle-check-filled text-success fs-5"></i>
                            </span>
                        </div>
                        <div class="invalid-feedback d-block" v-if="errors['pi_coapp_aadhaar']">
                            {{ errors['pi_coapp_aadhaar'] }}
                        </div>
                        <div class="mt-2" v-if="formData.existingDocuments && formData.existingDocuments['pi_coapp_aadhaar']">
                            <a :href="formData.existingDocuments['pi_coapp_aadhaar']" target="_blank"
                                class="btn btn-sm btn-outline-primary">
                                <i class="ti ti-eye"></i> View Current Document
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <label class="form-label fw-bold">Co-applicant Profession <span class="text-danger">*</span></label>
                    <select class="form-select form-control" v-model="formData.pi_coapp_profession" :disabled="isDisabled" :class="{ 'is-invalid': errors['pi_coapp_profession'] }">
                        <option value="">Select Profession</option>
                        <option value="Salaried">Salaried</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Agriculture">Agriculture Profession</option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors['pi_coapp_profession']">
                        {{ errors['pi_coapp_profession'] }}
                    </div>
                </div>
            </div>
            
            <div v-if="formData.pi_coapp_profession" class="row g-4 mt-1 border-top pt-3">
                <h6 class="mb-0 text-dark fw-bold">{{ formData.pi_coapp_profession }} Documents</h6>
                <div v-for="doc in coappDocs[formData.pi_coapp_profession]" :key="doc.id" class="col-md-6">
                    <div class="upload-field mb-0">
                        <label class="form-label fw-bold">{{ doc.label }} <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange(doc.id, $event)"
                                :class="{ 'is-invalid': errors[doc.id] }"
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
                { id: 'pi_pan_card', label: 'PAN Card / Valid Passport / Voter ID Card', mandatory: true },
                { id: 'pi_10th_marksheet', label: 'Marksheet of 10th', mandatory: true },
                { id: 'pi_12th_marksheet', label: 'Marksheet of 12th', mandatory: true },
                { id: 'pi_grad_sem1', label: 'Graduation Semester 1', mandatory: true },
                { id: 'pi_grad_sem2', label: 'Graduation Semester 2', mandatory: true },
                { id: 'pi_grad_sem3', label: 'Graduation Semester 3', mandatory: true },
                { id: 'pi_grad_sem4', label: 'Graduation Semester 4', mandatory: true },
                { id: 'pi_grad_sem5', label: 'Graduation Semester 5', mandatory: true },
                { id: 'pi_grad_sem6', label: 'Graduation Semester 6', mandatory: false },
            ],
            coappDocs: {
                'Salaried': [
                    { id: 'pi_sal_salary_slip', label: 'Last three month’s salary slip' },
                    { id: 'pi_sal_bank_statement', label: 'Last three month’s bank statement' },
                    { id: 'pi_sal_form16', label: 'Form 16' },
                    { id: 'pi_sal_emp_id', label: 'Employee ID of the employer' },
                    { id: 'pi_sal_photo', label: 'Latest Passport Size Photo' },
                ],
                'Self-employed': [
                    { id: 'pi_self_itr', label: 'Income Tax Return Acknowledgment page' },
                    { id: 'pi_self_computation', label: 'Computation of Income' },
                    { id: 'pi_self_bank_statement', label: 'Last six month’s bank statement (current or savings)' },
                ],
                'Agriculture': [
                    { id: 'pi_agri_bank_statement', label: 'Bank statement for last 6 months' },
                    { id: 'pi_agri_income_cert', label: 'Agriculture income certificate' },
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

            // Validate Funding Type
            if (!this.formData.pi_funding_type) {
                this.errors['pi_funding_type'] = "Please select a funding type.";
                isValid = false;
            }

            // Validate Co-applicant details if Loan
            if (this.formData.pi_funding_type === 'Loan') {
                ['pi_coapp_pan', 'pi_coapp_aadhaar'].forEach(field => {
                    const hasNew = !!this.formData.documents[field];
                    const hasExisting = !!(this.formData.existingDocuments && this.formData.existingDocuments[field]);
                    if (!hasNew && !hasExisting) {
                        this.errors[field] = "This document is mandatory for loans.";
                        isValid = false;
                    }
                });

                if (!this.formData.pi_coapp_profession) {
                    this.errors['pi_coapp_profession'] = "Please select co-applicant profession.";
                    isValid = false;
                } else {
                    const reqDocs = this.coappDocs[this.formData.pi_coapp_profession];
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

.coapplicant-section {
    border: 1px solid #E5E7EB;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>

<template>
    <div class="pre-interview-section">
        <div class="alert alert-info py-2 mb-4 border-0 bg-light-info">
            <small class="fw-medium"><i class="ti ti-info-circle me-1"></i> Accepted Formats: PDF, JPG, PNG (Max 5MB per file)</small>
        </div>

        <div class="row g-4">
            <div v-for="idx in 10" :key="idx" class="col-md-6">
                <div class="upload-field mb-0">
                    <label class="form-label fw-bold">Pre-Interview Document {{ idx }}</label>
                    <div class="input-group">
                        <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"
                            @change="handleFileChange('pre_interview_doc_' + idx, $event)"
                            :class="{ 'is-invalid': errors['pre_interview_doc_' + idx] }"
                            :disabled="isDisabled">
                        <span class="input-group-text bg-white" v-if="formData.documents['pre_interview_doc_' + idx]">
                            <i class="ti ti-circle-check-filled text-success fs-5"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors['pre_interview_doc_' + idx]">
                        {{ errors['pre_interview_doc_' + idx] }}
                    </div>
                    <div class="mt-2" v-if="formData.existingDocuments && formData.existingDocuments['pre_interview_doc_' + idx]">
                        <a :href="formData.existingDocuments['pre_interview_doc_' + idx]" target="_blank"
                            class="btn btn-sm btn-outline-primary">
                            <i class="ti ti-eye"></i> View Current Document
                        </a>
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
            errors: {}
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
            // Pre-interview documents may be optional. We clear outstanding errors and return true.
            // If validation is required in future, it can be implemented here.
            this.errors = {};
            return true;
        }
    }
};
</script>

<style scoped>
.form-label {
    font-size: 12px;
    font-weight: 600;
    color: #4B5563;
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
</style>

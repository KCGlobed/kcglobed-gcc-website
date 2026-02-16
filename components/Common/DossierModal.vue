<template>
    <div class="modal fade dossier-modal" id="dossierModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 overflow-hidden">
                <div class="modal-body p-4 p-md-5 position-relative">
                    <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal"
                        ref="closeModalBtn"></button>

                    <div class="text-center mb-4">
                        <h2 class="modal-title  mb-2">Download Dossier</h2>
                        <p class="text-muted">Enter your details to receive the dossier instantly</p>
                    </div>

                    <form @submit.prevent="submitForm" class="dossier-form">
                        <div class="mb-3">
                            <label class="form-label fw-bold small">Full Name*</label>
                            <input v-model="form.name" type="text" class="form-control custom-input"
                                placeholder="Enter your full name">
                            <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold small">Email Address*</label>
                            <input v-model="form.email" type="email" class="form-control custom-input"
                                placeholder="Enter your email address">
                            <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold small">Phone Number*</label>
                            <input v-model="form.phone" type="tel" class="form-control custom-input"
                                placeholder="Enter your phone number">
                            <small class="text-danger" v-if="errors.phone">{{ errors.phone }}</small>
                        </div>

                        <div class="mb-4">
                            <div class="form-check custom-checkbox">
                                <input class="form-check-input" type="checkbox" v-model="form.isCommerceGraduate"
                                    id="commerceCheck">
                                <label class="form-check-label small text-muted" for="commerceCheck">
                                    Are you a Commerce Graduate with first division.
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-register w-100 py-3 fw-bold text-uppercase"
                            :disabled="isSubmitting">
                            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                            {{ isSubmitting ? 'Processing...' : 'DOWNLOAD NOW' }}
                        </button>

                        <div class="text-center mt-4">
                            <p class="small text-muted mb-0">
                                By submitting, you agree to our
                                <NuxtLink to="/terms-conditions" class="text-purple text-decoration-none fw-bold">Terms
                                </NuxtLink>
                                and
                                <NuxtLink to="/privacy-policy" class="text-purple text-decoration-none fw-bold">Privacy
                                    Policy</NuxtLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
    name: 'DossierModal',
    setup() {
        const isSubmitting = ref(false);
        const closeModalBtn = ref<HTMLButtonElement | null>(null);

        const form = reactive({
            name: '',
            email: '',
            phone: '',
            isCommerceGraduate: false
        });

        const errors = reactive({
            name: '',
            email: '',
            phone: ''
        });

        const validateEmail = (email: string) => {
            return String(email)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        const validateForm = () => {
            let isValid = true;
            errors.name = '';
            errors.email = '';
            errors.phone = '';

            if (!form.name.trim()) {
                errors.name = 'Full name is required';
                isValid = false;
            }
            if (!form.email.trim()) {
                errors.email = 'Email address is required';
                isValid = false;
            } else if (!validateEmail(form.email)) {
                errors.email = 'Please enter a valid email';
                isValid = false;
            }
            if (!form.phone.trim()) {
                errors.phone = 'Phone number is required';
                isValid = false;
            }

            return isValid;
        };

        const submitForm = async () => {
            if (!validateForm()) return;

            isSubmitting.value = true;

            try {
                // Prepare payload for API
                const payload = {
                    full_name: form.name,
                    email: form.email,
                    phone: form.phone
                };

                const response: any = await $fetch("https://gccwebsite-admin-backend-738131651355.asia-south1.run.app/api/career/createdossierform", {
                    method: "POST",
                    body: payload
                });
                window.open("https://storage.googleapis.com/gcc_static_files_backend/static/files/GCC%20SCHOOL%20Dossier.pdf", '_blank');
                // if (response.success && response.data?.url) {


                //     // try {
                //     //     const fileResponse = await fetch(fileUrl);
                //     //     const blob = await fileResponse.blob();
                //     //     const blobUrl = window.URL.createObjectURL(blob);

                //     //     const link = document.createElement('a');
                //     //     link.href = blobUrl;
                //     //     link.setAttribute('download', fileName);
                //     //     link.style.display = 'none';
                //     //     document.body.appendChild(link);
                //     //     link.click();

                //     //     document.body.removeChild(link);
                //     //     window.URL.revokeObjectURL(blobUrl);
                //     //     alert("Thank you! Your dossier is being downloaded.");
                //     // } catch (downloadError) {
                //     //     console.error("Download Error (maybe CORS):", downloadError);
                //     //     // Fallback to direct open if blob fetch fails
                //     //     window.open(fileUrl, '_blank');
                //     //     alert("Thank you! Your dossier is opening.");
                //     // }

                //     // Close modal
                //     if (closeModalBtn.value) {
                //         closeModalBtn.value.click();
                //     }

                //     // Reset form
                //     form.name = '';
                //     form.email = '';
                //     form.phone = '';
                //     form.isCommerceGraduate = false;
                // } else {
                //     alert(response.message || "Something went wrong. Please try again.");
                // }
            } catch (error: any) {
                console.error("Submission Error:", error);
                alert(error.data?.message || "Server error. Please try again later.");
            } finally {
                isSubmitting.value = false;
            }
        };

        return {
            form,
            errors,
            isSubmitting,
            submitForm,
            closeModalBtn
        };
    }
});
</script>

<style scoped>
.modal-content {
    border-radius: 30px;
    box-shadow: 0 15px 50px rgba(138, 43, 226, 0.2);
}

.modal-title {
    color: #511970 !important;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 29.848px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -1px;
}

@media (min-width: 576px) {
    .modal-dialog {
        max-width: 650px;
    }
}

.custom-input {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 12px 18px;
    font-size: 15px;
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
    .custom-input {
        padding: 15px 20px;
    }
}

.custom-input:focus {
    background-color: #fff;
    border-color: #8A2BE2;
    box-shadow: 0 0 0 4px rgba(138, 43, 226, 0.1);
    outline: none;
}

.custom-checkbox .form-check-input {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    border: 2px solid #e9ecef;
    cursor: pointer;
}

.custom-checkbox .form-check-input:checked {
    background-color: #8A2BE2;
    border-color: #8A2BE2;
}

.custom-checkbox .form-check-label {
    padding-left: 8px;
    padding-top: 3px;
    cursor: pointer;
}

.btn-register {
    background: linear-gradient(90deg, #8A2BE2 0%, #A13E99 100%);
    color: white;
    border: none;
    border-radius: 12px;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(138, 43, 226, 0.3);
}

.btn-register:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(138, 43, 226, 0.4);
    filter: brightness(1.1);
}

.btn-register:active {
    transform: translateY(0);
}

.text-purple {
    color: #8A2BE2;
}

.form-label {
    color: #4a4a68;
}

@media (max-width: 576px) {
    .modal-content {
        border-radius: 20px;
    }

    .modal-body {
        padding: 35px 20px 25px !important;
    }

    .modal-title {
        font-size: 24px;
        line-height: 1.1;
    }

    .btn-close {
        padding: 0.5rem;
        margin: 0.5rem !important;
    }

    .btn-register {
        padding-top: 12px !important;
        padding-bottom: 12px !important;
        font-size: 14px;
    }
}
</style>

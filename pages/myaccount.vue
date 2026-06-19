<template>
    <div>
        <div v-if="!isAuthChecked || isAutoLoggingIn"
            class="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 bg-white"
            style="z-index: 9999;">
            <div class="spinner-border" style="width: 3rem; height: 3rem; color: #872980 !important;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <LayoutProfileHeader />
        <template v-if="isAuthChecked && !isAutoLoggingIn">
            <!-- <CommonInnerPageBanner pageTitle="Profile" /> -->
            <!-- Banner Section -->
            <div class="profile-banner-section py-3 py-lg-4">
                <div class="container-lg">
                    <div class="profile-banner-card overflow-hidden">
                        <div class="profile-banner-bg" :style="{ backgroundImage: `url(${heroBg})` }">
                            <div
                                class="d-flex flex-column flex-md-row align-items-center gap-4 px-4 py-4 h-100 position-relative">
                                <!-- Left: Profile Image with Progress Ring -->
                                <div class="profile-image-section">
                                    <div class="profile-image-container" @click="triggerImageUpload">
                                        <div class="progress-ring-svg">
                                            <svg width="130" height="130" viewBox="0 0 130 130">
                                                <circle cx="65" cy="65" r="60" fill="transparent"
                                                    stroke="rgba(255,255,255,0.1)" stroke-width="8" />
                                                <circle cx="65" cy="65" r="60" fill="transparent" stroke="#B13AFB"
                                                    stroke-width="8" stroke-linecap="round" stroke-dasharray="376.99"
                                                    :stroke-dashoffset="376.99 - (profileCompletion * 376.99) / 100"
                                                    style="transition: stroke-dashoffset 0.8s ease;" />
                                            </svg>
                                        </div>
                                        <div class="profile-image-inner">
                                            <img v-if="profileImage" :src="profileImage" alt="Profile" />
                                            <i v-else class="ti ti-user text-white fs-1"></i>
                                            <div v-if="isImageUploading" class="upload-spinner-overlay">
                                                <span class="spinner-border spinner-border-sm text-white"></span>
                                            </div>
                                        </div>
                                        <div class="progress-badge-pill">{{ profileCompletion }}%</div>
                                        <input type="file" ref="profileImageInput" class="d-none" accept="image/*"
                                            @change="handleProfileImageUpload" />
                                    </div>
                                </div>

                                <!-- Middle: Profile Info -->
                                <div class="profile-details-section text-center text-md-start flex-grow-1 mt-3 mt-md-0">
                                    <div class="text-center text-md-start mb-2">
                                        <h2 class="profile-name-text mb-2 mb-lg-0">{{ (formData.first_name ||
                                            'Applicant') +
                                            ' ' +
                                            (formData.last_name || '') }}</h2>
                                        <div class="d-md-none d-flex flex-column align-items-center gap-2 mt-2 mb-2">
                                            <div class="status-pill"
                                                :class="profileCompletion === 100 ? 'status-complete' : 'status-incomplete'">
                                                {{ profileCompletion === 100 ? 'Profile Complete' : 'Profile Incomplete' }}
                                            </div>
                                            <!-- <button class="status-pill report-download-btn d-flex align-items-center justify-content-center"
                                                style="background-color: #872980; color: white; border: none; outline: none; cursor: pointer;" 
                                                @click="initiateSecurityDeposit" :disabled="isProcessingSecurityDeposit">
                                                <span v-if="isProcessingSecurityDeposit" class="spinner-border spinner-border-sm me-2"></span>
                                                Security Deposit
                                            </button> -->
                                        </div>
                                    </div>

                                    <div class="application-id-badge mb-3 d-inline-block">
                                        <span v-if="formData?.application_id">Application ID: {{ formData.application_id
                                            }}</span>
                                        <span v-else>- </span>
                                    </div>

                                    <div
                                        class="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 gap-md-4 profile-meta-info">
                                        <div class="d-flex flex-nowrap gap-3 mobile-contact-row">
                                            <span class="d-flex align-items-center"><i class="ti ti-mail me-2"></i> {{
                                                formData.email }}</span>
                                            <span class="d-flex align-items-center"><i class="ti ti-phone me-2"></i> {{
                                                formData.mobile }}</span>
                                        </div>
                                        <span class="d-flex align-items-center" v-if="formData.city || formData.state">
                                            <i class="ti ti-map-pin me-2"></i> {{ formData.city }}{{ formData.state ?
                                                ', ' +
                                                formData.state : '' }}
                                        </span>
                                    </div>

                                    <!-- Bottom: Download Report Button (Mobile) -->
                                    <div v-if="resultStatus" class="d-md-none mt-4 text-center">
                                        <button
                                            class="status-pill report-download-btn d-flex align-items-center gap-2 mx-auto"
                                            @click="downloadReport" :disabled="isDownloadingReport">
                                            <span v-if="isDownloadingReport"
                                                class="spinner-border spinner-border-sm"></span>
                                            <i v-else class="ti ti-download fs-6"></i>
                                            Download Scorecard
                                        </button>
                                    </div>
                                </div>

                                <!-- Right: Status Badge -->
                                <div class="profile-status-section d-none d-md-flex flex-column align-items-end position-absolute"
                                    style="right: 40px; top: 40px; gap: 10px;">
                                    <div class="status-pill"
                                        :class="profileCompletion === 100 ? 'status-complete' : 'status-incomplete'">
                                        {{ profileCompletion === 100 ? 'Profile Complete' : 'Profile Incomplete' }}
                                    </div>
                                    <!-- <button class="status-pill report-download-btn d-flex align-items-center justify-content-center"
                                        style="background-color: #872980; color: white; border: none; outline: none; cursor: pointer;" 
                                        @click="initiateSecurityDeposit" :disabled="isProcessingSecurityDeposit">
                                        <span v-if="isProcessingSecurityDeposit" class="spinner-border spinner-border-sm me-2"></span>
                                        Security Deposit
                                    </button> -->
                                </div>

                                <!-- Bottom Right: Download Report Button (Desktop) -->
                                <div v-if="resultStatus" class="d-none d-md-block position-absolute"
                                    style="right: 40px; bottom: 40px;">
                                    <button class="status-pill report-download-btn d-flex align-items-center gap-2"
                                        @click="downloadReport" :disabled="isDownloadingReport">
                                        <span v-if="isDownloadingReport"
                                            class="spinner-border spinner-border-sm"></span>
                                        <i v-else class="ti ti-download fs-5"></i>
                                        Download Scorecard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="main-content-area" style="background-color: #F3F4F6;">
                <div class="container-lg border-0">
                    <div class="row g-4">
                        <!-- Left Column (8 col) -->
                        <div class="col-lg-8">

                            <!-- 4 Accordion Sections -->
                            <div class="pb-30">
                                <div class="profile-accordion">

                                    <!-- Section 1: Pre Interview -->
                                    <!-- <div v-if="isPreInterviewVisible" class="accordion-section"
                                    :class="{ active: isSectionOpen(1) }">
                                    <div class="accordion-header" @click="toggleSection(1)">
                                        <div class="accordion-header-left">
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <div v-if="completionSteps[0].done" class="section-complete-check">
                                                    <i class="ti ti-check"></i>
                                                </div>
                                                <span v-else class="accordion-icon"><i class="ti ti-files"></i></span>
                                                <h4>Pre Interview</h4>
                                            </div>
                                        </div>
                                        <div class="accordion-header-right">
                                            <span v-if="!isProfileEmpty && !isEditingSection[1]"
                                                @click.stop="enableEdit(1)" class="edit-icon-btn me-3"
                                                title="Edit Section">
                                                <i class="ti ti-pencil fs-5 text-[#872980]"></i>
                                            </span>
                                            <i class="ti accordion-chevron"
                                                :class="isSectionOpen(1) ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                                        </div>
                                    </div>
                                    <div class="accordion-body p-4 p-lg-5" v-show="isSectionOpen(1)">
                                        <fieldset :disabled="!isEditingSection[1]">
                                            <PreInterview ref="section1Ref" :formData="formData"
                                                :isDisabled="!isEditingSection[1]" />
                                        </fieldset>
                                    </div>
                                </div> -->

                                    <!-- Section 2: Personal Information -->
                                    <div class="accordion-section" :class="{ active: isSectionOpen(2) }">
                                        <div class="accordion-header" @click="toggleSection(2)">
                                            <div class="accordion-header-left">
                                                <div style="display: flex; align-items: center; gap: 10px;">
                                                    <div v-if="completionSteps[0].done" class="section-complete-check">
                                                        <i class="ti ti-check"></i>
                                                    </div>
                                                    <span v-else class="accordion-icon"><i
                                                            class="ti ti-user"></i></span>
                                                    <h4>Personal Information</h4>
                                                </div>
                                            </div>
                                            <div class="accordion-header-right">
                                                <span v-if="!isProfileEmpty && !isEditingSection[2]"
                                                    @click.stop="enableEdit(2)" class="edit-icon-btn me-3"
                                                    title="Edit Section">
                                                    <i class="ti ti-pencil fs-5 text-[#872980]"></i>
                                                </span>
                                                <i class="ti accordion-chevron"
                                                    :class="isSectionOpen(2) ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                                            </div>
                                        </div>
                                        <div class="accordion-body p-4 p-lg-5" v-show="isSectionOpen(2)">
                                            <fieldset :disabled="!isEditingSection[2]">
                                                <PersonalInformation ref="section2Ref" :formData="formData"
                                                    :guardianKeyStatus="guardianKeyStatus" />
                                            </fieldset>
                                            <div v-if="isEditingSection[2]"
                                                class="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                                <button v-if="!isProfileEmpty" class="btn btn-outline-secondary px-4"
                                                    style="border-radius: 50px; border-color: #9ca3af; color: #4b5563; font-weight: 600;"
                                                    @click="handleCancelSection(2)">
                                                    Cancel
                                                </button>
                                                <button class="pill-submit-btn"
                                                    style="padding: 10px 30px; box-shadow: none;"
                                                    :disabled="isSavingSection[2]" @click="handleSaveSection(2)">
                                                    <span v-if="isSavingSection[2]"
                                                        class="spinner-border spinner-border-sm me-2"></span>
                                                    Save & Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Section 3: Academic Information -->
                                    <div class="accordion-section" :class="{ active: isSectionOpen(3) }">
                                        <div class="accordion-header" @click="toggleSection(3)">
                                            <div class="accordion-header-left">
                                                <div style="display: flex; align-items: center; gap: 10px;">
                                                    <div v-if="completionSteps[1].done" class="section-complete-check">
                                                        <i class="ti ti-check"></i>
                                                    </div>
                                                    <span v-else class="accordion-icon"><i
                                                            class="ti ti-school"></i></span>
                                                    <h4>Academic Information</h4>
                                                </div>
                                            </div>
                                            <div class="accordion-header-right">
                                                <span v-if="!isProfileEmpty && !isEditingSection[3]"
                                                    @click.stop="enableEdit(3)" class="edit-icon-btn me-3"
                                                    title="Edit Section">
                                                    <i class="ti ti-pencil fs-5 text-[#872980]"></i>
                                                </span>
                                                <i class="ti accordion-chevron"
                                                    :class="isSectionOpen(3) ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                                            </div>
                                        </div>
                                        <div class="accordion-body p-4 p-lg-5" v-show="isSectionOpen(3)">
                                            <fieldset :disabled="!isEditingSection[3]">
                                                <AcademicInformation ref="section3Ref" :formData="formData" />
                                            </fieldset>
                                            <div v-if="isEditingSection[3]"
                                                class="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                                <button v-if="!isProfileEmpty" class="btn btn-outline-secondary px-4"
                                                    style="border-radius: 50px; border-color: #9ca3af; color: #4b5563; font-weight: 600;"
                                                    @click="handleCancelSection(3)">
                                                    Cancel
                                                </button>
                                                <button class="pill-submit-btn"
                                                    style="padding: 10px 30px; box-shadow: none;"
                                                    :disabled="isSavingSection[3]" @click="handleSaveSection(3)">
                                                    <span v-if="isSavingSection[3]"
                                                        class="spinner-border spinner-border-sm me-2"></span>
                                                    Save & Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Section 4: Work Experience -->
                                    <div class="accordion-section" :class="{ active: isSectionOpen(4) }">
                                        <div class="accordion-header" @click="toggleSection(4)">
                                            <div class="accordion-header-left">
                                                <div style="display: flex; align-items: center; gap: 10px;">
                                                    <div v-if="completionSteps[2].done" class="section-complete-check">
                                                        <i class="ti ti-check"></i>
                                                    </div>
                                                    <span v-else class="accordion-icon"><i
                                                            class="ti ti-briefcase"></i></span>
                                                    <h4>Work Experience</h4>
                                                </div>
                                            </div>
                                            <div class="accordion-header-right">
                                                <span v-if="!isProfileEmpty && !isEditingSection[4]"
                                                    @click.stop="enableEdit(4)" class="edit-icon-btn me-3"
                                                    title="Edit Section">
                                                    <i class="ti ti-pencil fs-5 text-[#872980]"></i>
                                                </span>
                                                <i class="ti accordion-chevron"
                                                    :class="isSectionOpen(4) ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                                            </div>
                                        </div>
                                        <div class="accordion-body p-4 p-lg-5" v-show="isSectionOpen(4)">
                                            <fieldset :disabled="!isEditingSection[4]">
                                                <WorkExperienceDetails ref="section4Ref" :formData="formData"
                                                    :isDisabled="!isEditingSection[4]" />
                                            </fieldset>
                                            <div v-if="isEditingSection[4]"
                                                class="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                                <button v-if="!isProfileEmpty" class="btn btn-outline-secondary px-4"
                                                    style="border-radius: 50px; border-color: #9ca3af; color: #4b5563; font-weight: 600;"
                                                    @click="handleCancelSection(4)">
                                                    Cancel
                                                </button>
                                                <button class="pill-submit-btn"
                                                    style="padding: 10px 30px; box-shadow: none;"
                                                    :disabled="isSavingSection[4]" @click="handleSaveSection(4)">
                                                    <span v-if="isSavingSection[4]"
                                                        class="spinner-border spinner-border-sm me-2"></span>
                                                    Save & Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Section 5: Documents & Declaration -->
                                    <div class="accordion-section" :class="{ active: isSectionOpen(5) }">
                                        <div class="accordion-header" @click="toggleSection(5)">
                                            <div class="accordion-header-left">
                                                <div style="display: flex; align-items: center; gap: 10px;">
                                                    <div v-if="completionSteps[3].done" class="section-complete-check">
                                                        <i class="ti ti-check"></i>
                                                    </div>
                                                    <span v-else class="accordion-icon"><i
                                                            class="ti ti-files"></i></span>
                                                    <h4>Documents</h4>
                                                </div>
                                            </div>
                                            <div class="accordion-header-right">
                                                <span v-if="!isProfileEmpty && !isEditingSection[5]"
                                                    @click.stop="enableEdit(5)" class="edit-icon-btn me-3"
                                                    title="Edit Section">
                                                    <i class="ti ti-pencil fs-5 text-[#872980]"></i>
                                                </span>
                                                <i class="ti accordion-chevron"
                                                    :class="isSectionOpen(5) ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                                            </div>
                                        </div>
                                        <div class="accordion-body p-4 p-lg-5" v-show="isSectionOpen(5)">
                                            <DocumentUpload ref="section5Ref" :formData="formData"
                                                :isDisabled="!isEditingSection[5]" :resumeKeyStatus="resumeKeyStatus" />
                                            <div v-if="isEditingSection[5]"
                                                class="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                                <button v-if="!isProfileEmpty" class="btn btn-outline-secondary px-4"
                                                    style="border-radius: 50px; border-color: #9ca3af; color: #4b5563; font-weight: 600;"
                                                    @click="handleCancelSection(5)">
                                                    Cancel
                                                </button>
                                                <button class="pill-submit-btn"
                                                    style="padding: 10px 30px; box-shadow: none;"
                                                    :disabled="isSavingSection[5]" @click="handleSaveSection(5)">
                                                    <span v-if="isSavingSection[5]"
                                                        class="spinner-border spinner-border-sm me-2"></span>
                                                    Save Documents
                                                </button>
                                            </div>
                                            <!-- <div class="section-divider"></div> -->
                                            <!-- <PrePaymentDeclaration ref="section4bRef" :formData="formData" /> -->
                                        </div>
                                    </div> <!-- End Section 5 -->
                                </div> <!-- End profile-accordion -->
                            </div> <!-- End pb-30 -->

                            <!-- Combined Declaration & Submit Card -->
                            <div class="p-4 p-lg-5 bg-white rounded-4 shadow-sm mb-4"
                                v-if="isAnySectionEditing || !isFinalSubmitted">
                                <div class="d-flex align-items-start mb-4">
                                    <div class="form-check custom-declaration mt-1">
                                        <input class="form-check-input" type="checkbox" id="declaration"
                                            v-model="formData.declaration"
                                            style="cursor: pointer; width: 20px; height: 20px;" />
                                    </div>
                                    <label class="form-check-label ms-3 text-secondary" for="declaration"
                                        style="font-size: 15px; line-height: 1.6; cursor: pointer;">
                                        I declare that all the information and documents submitted by me are true to
                                        the best of my knowledge. I agree that in case any information or document found
                                        fake/forged/false submitted by me, then my candidature may cancel at any
                                        stage of course.
                                    </label>
                                </div>

                                <!-- Draft Status Indicator -->
                                <div class="d-flex align-items-center justify-content-center gap-2 mb-3"
                                    style="min-height: 22px;">
                                    <template v-if="draftStatus === 'saved'">
                                        <i class="ti ti-cloud-check" style="color: #22c55e; font-size: 16px;"></i>
                                        <span style="font-size: 12px; color: #22c55e; font-weight: 500;">
                                            Draft saved
                                        </span>
                                        <span v-if="draftLastSaved" style="font-size: 11px; color: #9ca3af;">
                                            · {{ formatDraftTime(draftLastSaved) }}
                                        </span>
                                    </template>
                                    <template v-else-if="draftStatus === 'error'">
                                        <i class="ti ti-cloud-x" style="color: #f59e0b; font-size: 16px;"></i>
                                        <span style="font-size: 12px; color: #f59e0b;">
                                            Could not save draft locally
                                        </span>
                                    </template>
                                </div>

                                <div class="d-flex justify-content-center pt-2">
                                    <button class="pill-submit-btn" @click="handleFinalSubmit(false)"
                                        :disabled="!formData.declaration || isSubmitting"
                                        :class="{ 'opacity-50 cursor-not-allowed': !formData.declaration || isSubmitting }">
                                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"
                                            role="status" aria-hidden="true"></span>
                                        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                                        <i v-if="!isSubmitting" class="ti ti-brand-telegram fs-4 ms-2"></i>
                                    </button>
                                </div>
                            </div>

                        </div> <!-- End Left Column -->

                        <!-- Right Column (4 col) -->
                        <div class="col-lg-4">
                            <!-- Profile Completeness Sidebar Card -->
                            <div class="profile-completeness-card mb-4 overflow-hidden rounded-4 shadow-sm bg-white">
                                <!-- Dark Header Section -->
                                <div class="completeness-header p-4">
                                    <h5 class="fw-bold mb-2 d-flex justify-content-between text-white">
                                        Profile Completeness
                                        <span class="completion-percent">{{ profileCompletion }}%</span>
                                    </h5>
                                    <div class="progress mb-2 custom-progress-track">
                                        <div class="progress-bar custom-progress-fill" role="progressbar"
                                            :style="{ width: profileCompletion + '%' }"
                                            :aria-valuenow="profileCompletion" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                    <p class="small text-white mb-0">Complete your profile to unlock all features.</p>
                                </div>

                                <!-- White Body Section -->
                                <div class="completeness-body pb-4 pt-0">
                                    <ul class="list-unstyled mb-0 completion-checklist">
                                        <li class="d-flex align-items-center justify-content-between py-3 px-4 border-bottom"
                                            v-for="(item, idx) in completionSteps" :key="idx"
                                            v-show="item.visible !== false">
                                            <div class="d-flex align-items-center gap-3">
                                                <div class="completeness-icon" :class="{ 'is-done': item.done }">
                                                    <i v-if="item.done" class="ti ti-check"></i>
                                                    <div v-else class="pending-dot"></div>
                                                </div>
                                                <span class="fw-semibold text-dark" style="font-size: 14px;">{{
                                                    item.label }}</span>
                                            </div>
                                            <span class="badge" :class="item.done ? 'badge-done' : 'badge-pending'">
                                                {{ item.done ? 'Done' : 'Pending' }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Footer Section -->
                                <div class="completeness-footer text-center py-3">
                                    <template v-if="profileCompletion < 100">
                                        <button
                                            class="btn btn-link text-primary text-decoration-none fw-bold p-0 d-flex align-items-center justify-content-center gap-2 w-100"
                                            @click="handleFinishProfile"
                                            style="font-size: 15px; color: #872980 !important;">
                                            Finish Profile Now <i class="ti ti-arrow-right"></i>
                                        </button>
                                    </template>
                                    <template v-else>
                                        <div class="d-flex flex-column align-items-center gap-3 px-4">
                                            <span class="fw-bold text-success" style="font-size: 15px;">Finished</span>
                                            <button v-if="resultStatus"
                                                class="status-pill report-download-btn d-flex align-items-center gap-2 w-100 justify-content-center"
                                                @click="downloadReport" :disabled="isDownloadingReport"
                                                style="padding: 10px 20px;">
                                                <span v-if="isDownloadingReport"
                                                    class="spinner-border spinner-border-sm"></span>
                                                <i v-else class="ti ti-download fs-5"></i>
                                                Download Scorecard
                                            </button>
                                        </div>
                                    </template>
                                </div>
                            </div>


                            <div>
                                <StudentKits :isDisabled="false" :userEmail="formData.email"
                                    :mockTestStatus="formData.mock_test_status" @onStatusUpdate="fetchStudentDetail" />
                            </div>

                            <!-- NFET Slot Booking Sidebar -->
                            <div class="nfet-slot-sidebar bg-white rounded-4 shadow-sm border mb-4 overflow-hidden">
                                <div class="d-flex justify-content-between align-items-center p-4"
                                    @click="isOpenNfet = !isOpenNfet"
                                    style="cursor: pointer; user-select: none; background-color: #CB9722; color: white;">
                                    <h5 class="m-0 text-white fw-bold d-flex align-items-center"
                                        style="font-size: 17px;">
                                        <i class="ti ti-calendar-event me-2 fs-4"></i>NFET Slot Booking
                                    </h5>
                                    <i class="ti fs-5" :class="isOpenNfet ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
                                </div>

                                <div v-show="isOpenNfet" class="nfet-slide-content p-4" style="position: relative;">
                                    <div v-if="isProfileEmpty" class="disabled-overlay"
                                        title="This section will be enabled after you complete your profile."></div>
                                    <div :class="{ 'opacity-50 pointer-events-none': isProfileEmpty }">
                                        <div
                                            class="d-flex justify-content-between align-items-center mb-3 bg-light p-2 rounded">
                                            <button
                                                class="btn btn-sm btn-white border shadow-sm p-1 d-flex align-items-center justify-content-center"
                                                style="width: 28px; height: 28px;" @click="prevMonth"><i
                                                    class="ti ti-chevron-left"></i></button>
                                            <span class="fw-bold text-dark" style="font-size: 14px;">{{
                                                monthNames[currentMonth]
                                                }}
                                                {{ currentYear }}</span>
                                            <button
                                                class="btn btn-sm btn-white border shadow-sm p-1 d-flex align-items-center justify-content-center"
                                                style="width: 28px; height: 28px;" @click="nextMonth"><i
                                                    class="ti ti-chevron-right"></i></button>
                                        </div>
                                        <div class="calendar-grid">
                                            <div class="calendar-day-header text-muted fw-semibold"
                                                v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day">{{
                                                    day
                                                }}
                                            </div>
                                            <div class="calendar-day" v-for="(day, idx) in calendarDays"
                                                :key="'empty-' + idx" :class="{
                                                    'empty': !day,
                                                    'allowed': day && day.isAllowed,
                                                    'disabled': day && !day.isAllowed && !day.isBlocked,
                                                    'blocked': day && day.isBlocked,
                                                    'selected': day && day.dateString === selectedDate,
                                                    'is-current': day && day.dateString === bookingDetails.date,
                                                    'cursor-not-allowed': bookingDetails.updateCount >= 2 && day && day.isAllowed
                                                }"
                                                :title="day && day.isBlocked ? 'fully booked' : (bookingDetails.updateCount >= 2 ? 'Update limit reached' : '')"
                                                @click="bookingDetails.updateCount < 2 && selectDate(day)">
                                                <span>{{ day ? day.day : '' }}</span>
                                            </div>
                                        </div>

                                        <!-- Slots -->
                                        <div class="slots-container" v-if="selectedDate">
                                            <h6 class="mb-2 mt-2 fw-semibold text-dark" style="font-size: 14px;">Slots
                                                for
                                                {{
                                                    formatDate(selectedDate) }}:</h6>
                                            <div class="d-flex flex-wrap gap-2 mb-3">
                                                <button v-for="slot in availableSlots" :key="slot.id"
                                                    class="btn btn-sm flex-grow-1 position-relative" :class="[
                                                        selectedSlot === slot.id ? 'btn-primary text-white custom-primary-bg' : 'btn-outline-secondary',
                                                        (selectedDate === bookingDetails.date && slot.time === bookingDetails.time) ? 'btn-current-slot' : ''
                                                    ]"
                                                    @click="!slot.disabled && bookingDetails.updateCount < 2 && selectSlot(slot)"
                                                    :disabled="slot.disabled || bookingDetails.updateCount >= 2"
                                                    :title="bookingDetails.updateCount >= 2 ? 'Update limit reached' : (slot.disabled ? 'This slot is no longer available (8-hour restriction)' : '')"
                                                    style="font-size: 12px; min-width: 45%; padding-top: 10px; padding-bottom: 10px;">
                                                    {{ slot.time }}
                                                    <span
                                                        v-if="selectedDate === bookingDetails.date && slot.time === bookingDetails.time"
                                                        class="badge bg-primary position-absolute top-0 start-50 translate-middle-x"
                                                        style="font-size: 8px; transform: translate(-50%, -50%) !important; background-color: #872980 !important;">CURRENT</span>
                                                </button>
                                            </div>
                                            <div v-if="availableSlots.length === 0" class="text-muted small mb-3">No
                                                slots
                                                available.
                                            </div>

                                            <div v-if="bookingDetails.updateCount <= 1"
                                                class="d-inline-block w-100 mb-2">
                                                <button
                                                    class="btn btn-primary w-100 custom-primary-bg d-flex justify-content-center align-items-center gap-2"
                                                    :class="{ 'btn-disabled-custom': isBookingSlot || isCurrentSlotInPast }"
                                                    :disabled="isBookingSlot || isCurrentSlotInPast"
                                                    style="pointer-events: auto;"
                                                    @click="!isBookingSlot && !isCurrentSlotInPast && bookSlot()">
                                                    <span v-if="isBookingSlot" class="spinner-border spinner-border-sm"
                                                        role="status" aria-hidden="true"></span>

                                                    <!-- state 1: Update Count == 0 -->
                                                    <template v-if="bookingDetails.updateCount === 0">
                                                        Book Slot
                                                        <span class="custom-tooltip-wrapper d-inline-block ms-1"
                                                            @click.stop>
                                                            <i class="ti ti-info-circle" style="font-size: 16px;"></i>
                                                            <div class="custom-tooltip-content"
                                                                style="pointer-events: none;">
                                                                Slot can be changed once, at least 8 hours before the
                                                                scheduled
                                                                time
                                                            </div>
                                                        </span>
                                                    </template>

                                                    <!-- state 2: Update Count === 1 -->
                                                    <template v-else-if="bookingDetails.updateCount === 1">
                                                        <div class="d-flex flex-column align-items-center"
                                                            style="line-height: 1.2;">
                                                            <span>Change Slot
                                                                <span class="custom-tooltip-wrapper d-inline-block ms-1"
                                                                    @click.stop>
                                                                    <i class="ti ti-info-circle"
                                                                        style="font-size: 16px;"></i>
                                                                    <div class="custom-tooltip-content"
                                                                        style="pointer-events: none; bottom: 120%;">
                                                                        Slot can be changed once, at least 8 hours
                                                                        before
                                                                        the
                                                                        scheduled time
                                                                    </div>
                                                                </span>
                                                            </span>
                                                            <small style="font-size: 0.75em;">(one time only)</small>
                                                        </div>
                                                    </template>
                                                </button>
                                            </div>

                                        </div>
                                        <p v-else
                                            class="text-muted small text-center py-2 px-3 bg-light rounded border border-dashed mt-3">
                                            Please select a highlighted date.
                                        </p>

                                        <!-- Action Buttons -->
                                        <div class="mt-3">
                                            <button
                                                class="btn btn-outline-success w-100 d-flex justify-content-center align-items-center gap-2 mb-2"
                                                @click="downloadAdmitCard"
                                                :disabled="!bookingDetails.isBooked || isDownloadingAdmitCard">
                                                <span v-if="isDownloadingAdmitCard"
                                                    class="spinner-border spinner-border-sm" role="status"
                                                    aria-hidden="true"></span>
                                                <template v-else>Download Admit Card <i
                                                        class="ti ti-download"></i></template>
                                            </button>

                                            <!-- Start Exam Button -->
                                            <button
                                                class="btn w-100 d-flex justify-content-center align-items-center gap-2"
                                                :class="bookingDetails.examStatus ? 'btn-primary custom-primary-bg' : 'btn-secondary btn-disabled-custom'"
                                                v-if="bookingDetails.isBooked" :disabled="isStartingExam"
                                                @click="handleStartExamClick($event)">
                                                <span v-if="isStartingExam" class="spinner-border spinner-border-sm"
                                                    role="status" aria-hidden="true"></span>
                                                <template v-else-if="bookingDetails.examUrl">
                                                    Resume Exam
                                                    <i class="ti ti-external-link"></i>
                                                </template>
                                                <template v-else>
                                                    Start Exam
                                                    <i class="ti ti-external-link"></i>
                                                </template>
                                                <span class="custom-tooltip-wrapper d-inline-block ms-1"
                                                    @click.stop.prevent>
                                                    <i class="ti ti-info-circle" style="font-size: 16px;"></i>
                                                    <div class="custom-tooltip-content"
                                                        style="pointer-events: none; bottom: 120%;">
                                                        {{
                                                            bookingDetails.examStatus
                                                                ? 'The exam is enabled and ready to start'
                                                                : 'Exam will be enabled 1 hour before the scheduled time.'
                                                        }}
                                                    </div>
                                                </span>
                                            </button>

                                        </div>


                                    </div> <!-- End Position-Relative -->
                                </div> <!-- End v-show -->
                            </div> <!-- End NFET Slot Sidebar -->
                        </div> <!-- End Col-LG-4 -->
                    </div> <!-- End Row -->
                </div> <!-- End Container -->
            </div> <!-- End Main Content Area -->

            <!-- Slot Full / General Alert Modal -->
            <CommonAlert :show="alertState.show" :title="alertState.title" :message="alertState.message"
                :type="alertState.type" @close="alertState.show = false" />



            <!-- Confirmation Modal -->
            <div v-if="showConfirmModal" class="custom-modal-overlay">
                <div class="custom-modal p-4 shadow-lg border-0">
                    <div class="text-center pb-3">
                        <h5 class="mb-4 fw-bold" style="font-size: 20px; color: #1e1b4b;">Confirm Slot Change</h5>

                        <div class="slot-diff-card p-3 rounded mb-4 text-start border bg-light">
                            <div class="mb-3">
                                <label class="text-muted small d-block mb-1 text-uppercase fw-bold"
                                    style="letter-spacing: 0.5px;">Current Booked Slot</label>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="ti ti-calendar-check fs-5 text-muted"></i>
                                    <span class="fw-bold text-dark">{{ formatDate(bookingDetails.date) }} | {{
                                        bookingDetails.time }}</span>
                                </div>
                            </div>

                            <div class="pt-3 border-top">
                                <label class="text-muted small d-block mb-1 text-uppercase fw-bold"
                                    style="letter-spacing: 0.5px;">New Requested Slot</label>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="ti ti-calendar-plus fs-5 text-[#6D1E67]"></i>
                                    <span class="fw-bold text-[#6D1E67]">{{ formatDate(selectedDate) }} | {{
                                        getSelectedSlotTime() }}</span>
                                </div>
                            </div>
                        </div>

                        <h5 class="mb-0 text-dark" style="font-size: 15px;">Are you sure you want to change your exam
                            slot?
                        </h5>
                    </div>

                    <div class="d-flex justify-content-center gap-3 mt-4">
                        <button class="btn btn-light fw-bold flex-grow-1 border"
                            style="border-radius: 12px; padding: 14px; color: #64748b;"
                            @click="handleConfirm(false)">Cancel</button>
                        <button class="btn btn-primary custom-primary-bg fw-bold flex-grow-1 shadow-sm"
                            style="border-radius: 12px; padding: 14px;" @click="handleConfirm(true)">Confirm</button>
                    </div>
                </div>
            </div>

            <Reattempt :formData="formData" :reattempt="reattempt" />
            <FeeWaiverModal v-if="showFeeWaiverModal" :dossierId="formData.application_id" :userData="formData"
                @close="showFeeWaiverModal = false" />
            <LayoutMainFooter />
            <LayoutCopyRight />

        </template>

        <div v-else style="min-height: 100vh; background: #F3F4F6;" />
    </div>

</template>

<!-- ✅ PROTECTED ROUTE — redirects to /login if no valid token found -->
<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import PreInterview from "../components/PreInterview/PreInterview.vue";
import PersonalInformation from "../components/PersonalInformation/PersonalInformation.vue";
import AcademicInformation from "../components/AcademicInformation/AcademicInformation.vue";
import WorkExperienceDetails from "../components/WorkExperienceDetails/WorkExperienceDetails.vue";
import DocumentUpload from "../components/DocumentUpload/DocumentUpload.vue";
import StudentKits from "../components/StudentKits/StudentKits.vue";
import Reattempt from "../components/reattempt/Reattempt.vue";
import heroBg from "@/assets/img/heros/hero_bg.svg";
import FeeWaiverModal from "../components/university-fee-wavier/FeeWaiverModal.vue";
// import PrePaymentDeclaration from "../components/PrePaymentDeclaration/PrePaymentDeclaration.vue";
import { staticSlots, allowedDates, blockedDates } from "../utils/constants";
import { isValidMobile, isValidPincode } from "../utils/validators";

// Layer 1: Middleware for Nuxt navigation
definePageMeta({
    middleware: ['auth']
})

useHead({
    title: "My Account",
    meta: [
        {
            name: "description",
            content: "View and update your GCC application profile — personal, academic, work experience and documents."
        }
    ]
});

// Read the authenticated user's ID from the auth composable (set at login)
const { userId, init: initAuth } = useAuth()
const config = useRuntimeConfig();

const reportClientError = async (context: string, err: any, extra: Record<string, any> = {}) => {
    try {
        const diagnostics = {
            context,
            errorMessage: err?.message || String(err),
            errorName: err?.name || 'UnknownError',
            errorData: typeof err?.data === 'object' ? JSON.stringify(err.data) : err?.data || String(err),
            errorStack: err?.stack || 'No stack',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR',
            isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
            connectionType: (typeof navigator !== 'undefined' && (navigator as any).connection?.effectiveType) || 'unknown',
            timestamp: new Date().toISOString(),
            ...extra
        };

        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

        await $fetch('/api/log-client-error', {
            method: 'POST',
            headers,
            body: diagnostics
        });
    } catch (e) {
        console.error("[REPORT ERROR] Failed to send error log to server:", e);
    }
};

// Start Global Scope 

// Hydrate auth state (reads from localStorage) on mount
const profileImage = ref<string | null>(null);
const isAuthChecked = ref(false)
const isAutoLoggingIn = ref(false)
const reattempt = ref<number>(0);
const isProfileEmpty = ref(false);
const resultStatus = ref(false);
const resumeKeyStatus = ref(false);
const guardianKeyStatus = ref(false);
const reportUrl = ref<string | null>(null);
const isFinalSubmitted = ref(false);
const studentResult = ref("");

// Security Deposit Payment
const isProcessingSecurityDeposit = ref(false);

const loadCashfreeScript = () => new Promise((resolve) => {
    if ((window as any).Cashfree) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
});

const initiateSecurityDeposit = async () => {
    isProcessingSecurityDeposit.value = true;
    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res: any = await $fetch("/api/start-payment", {
            method: "POST",
            headers,
            body: {
                user_id: userId.value,
                name: `${formData.first_name || ''} ${formData.last_name || ''}`.trim() || 'Applicant',
                email: formData.email,
                mobile: formData.mobile,
                city: formData.city,
                state: formData.state,
                payment_type: 'security_deposit',
                commingAmount: 10000,
                form_type: 2,
                form_id: formData.id
            }
        });

        if (!res.success) throw new Error(res.message || "Payment initiation failed");

        await handleCashfreeSecurityDeposit(res);

    } catch (err: any) {
        console.error("Payment Error:", err);
        showAlert("Payment Failed", err.message || "Something went wrong. Please try again.", "error");
    } finally {
        isProcessingSecurityDeposit.value = false;
    }
};

const handleCashfreeSecurityDeposit = async (res: any) => {
    const loaded = await loadCashfreeScript();
    if (!loaded || !(window as any).Cashfree) throw new Error("Cashfree SDK failed to load");

    const cfMode = res.environment === 'PRODUCTION' ? 'production' : 'sandbox';
    const cashfree = (window as any).Cashfree({ mode: cfMode });

    await cashfree.checkout({
        paymentSessionId: res.payment_session_id,
        redirectTarget: "_modal"
    }).then(async (result: any) => {
        if (result.error) {
            showAlert("Payment Failed", result.error.message, "error");
            return;
        }
        
        try {
            const { getAccessToken } = useAuth();
            const token = getAccessToken();
            const headers: Record<string, string> = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            await $fetch("/api/complete-payment", {
                method: "POST",
                headers,
                body: { cf_order_id: res.cf_order_id, re_attempt_status: false }
            });
            showAlert("Success", "Security Deposit Payment successful.", "success");
        } catch (e: any) {
            showAlert("Verification Failed", "Payment verification failed. Please contact support.", "error");
        }
    }).catch(async (err: any) => {
        showAlert("Payment Cancelled", err?.message || "Payment cancelled", "error");
    });
};// ── Auto-Draft (browser-only, localStorage) ────────────────────────────────
type DraftStatus = 'idle' | 'saved' | 'error';
const draftStatus = ref<DraftStatus>('idle');
const draftLastSaved = ref<Date | null>(null);
let _draftTimer: ReturnType<typeof setTimeout> | null = null;
const DRAFT_KEY = 'gcc_profile_draft';


const isPreInterviewVisible = computed(() => {
    if (!studentResult.value) return false;
    const val = parseFloat(studentResult.value);
    return !isNaN(val) && val >= 60;
});

const profileCompletion = computed(() => {
    let totalProgress = 0;
    const p = formData;

    const sectionWeight = 23.75; // 4 sections * 23.75% = 95%

    // 2. Personal Information (dynamically weighted) - 10 to 15 Fields
    const personalFields = [
        'first_name', 'last_name', 'email', 'mobile',
        'dob', 'gender', 'state', 'city', 'pin_code', 'complete_address'
    ];
    if (!guardianKeyStatus.value) {
        personalFields.push('guardian_name', 'guardian_phone', 'guardian_email', 'guardian_dropdown');
        if (p.guardian_dropdown === 'Other') {
            personalFields.push('guardian_other_reason');
        }
    }
    const personalCompleted = personalFields.filter(f => {
        const val = p[f as keyof typeof p];
        if (!val) return false;
        if (f === 'mobile' || f === 'guardian_phone') return isValidMobile(String(val));
        if (f === 'pin_code') return isValidPincode(String(val));
        return !!val;
    }).length;
    totalProgress += (personalCompleted / personalFields.length) * sectionWeight;

    // 3. Academic Information (dynamically weighted)
    const academicFields = [
        'class10_year', 'class10_score',
        'class12_year', 'class12_score',
        'ug_status', 'pg_exists'
    ];
    let academicCompletedCount = academicFields.filter(f => !!p[f as keyof typeof p]).length;
    let academicTotalFields = academicFields.length;

    // If UG is selected as pursuing or completed, add 2 more fields
    if (p.ug_status === '1' || p.ug_status === '2') {
        academicTotalFields += 2;
        if (p.ug_cgpa) academicCompletedCount++;
        if (p.ug_institution) academicCompletedCount++;
    }
    totalProgress += (academicCompletedCount / academicTotalFields) * sectionWeight;

    // 4. Work Experience (dynamically weighted)
    if (p.employment_status === 'Fresher') {
        totalProgress += sectionWeight;
    } else if (p.employment_status === 'Experienced') {
        const jobs = p.work_experience || [];
        if (jobs.length > 0) {
            const firstJob = jobs[0];
            const jobFields = ['org_name', 'designation', 'functional_area', 'from'];
            const jobCompleted = jobFields.filter(f => !!firstJob[f]).length;
            totalProgress += (jobCompleted / jobFields.length) * sectionWeight;
        }
    }

    // 5. Documents (dynamically weighted)
    const docFields = ['aadhaar', 'dob_proof', 'photo', 'signature', 'resume'];
    if (resumeKeyStatus.value) {
        const index = docFields.indexOf('resume');
        if (index > -1) {
            docFields.splice(index, 1);
        }
    }
    const docCompleted = docFields.filter(field => {
        const hasNew = !!p.documents[field];
        const hasExisting = !!(p.existingDocuments && p.existingDocuments[field]);
        return hasNew || hasExisting;
    }).length;
    totalProgress += (docCompleted / docFields.length) * sectionWeight;

    // 6. Submit Declaration (fixed 5%)
    if (p.declaration || isFinalSubmitted.value) {
        totalProgress += 5;
    }

    return Math.round(totalProgress);
});

const firstIncompleteSectionIndex = computed(() => {
    const steps = completionSteps.value;
    const index = steps.findIndex(step => step.visible !== false && !step.done);
    return index !== -1 ? index + 2 : null;
});

const showFeeWaiverModal = ref(false);

const handleFinishProfile = () => {
    // showFeeWaiverModal.value = true;
    // const idx = firstIncompleteSectionIndex.value;
    // if (idx !== null) {
    //     openSections.value.add(idx);
    //     nextTick(() => {
    //         const sections = document.querySelectorAll('.accordion-section');
    //         if (sections[idx - 1]) {
    //             sections[idx - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         }
    //     });
    // }
};

const completionSteps = computed(() => {
    const p = formData;

    // Pre Interview (1)
    /*
    const piMandatory = [
        'identity_proof', 'tenth_marksheet', 'twelth_marksheet',
        'graduation_first_marksheet', 'graduation_second_marksheet', 'graduation_third_marksheet',
        'graduation_forth_marksheet', 'graduation_fifth_marksheet'
    ];
    let preInterviewDone = piMandatory.every(field => {
        return !!p.documents[field] || !!(p.existingDocuments && p.existingDocuments[field]);
    });

    if (preInterviewDone) {
        if (p.accounting_profession === '1') {
            preInterviewDone = preInterviewDone && !!p.fee_preference_agree;
        } else if (p.accounting_profession === '2') {
            const coappDocs = ['co_applicant_pan_card', 'co_applicant_aadhaar', 'co_applicant_six_month_bank'];
            const coappDone = coappDocs.every(field => !!p.documents[field] || !!(p.existingDocuments && p.existingDocuments[field]));

            let profDocsDone = false;
            if (p.co_applicant_profession === '1') {
                profDocsDone = ['co_applicant_sallary_slip', 'co_applicant_form16', 'co_applicant_employee_id_card', 'co_applicant_passport_size'].every(
                    field => !!p.documents[field] || !!(p.existingDocuments && p.existingDocuments[field])
                );
            } else if (p.co_applicant_profession === '2') {
                profDocsDone = ['co_applicant_income_tax_return', 'co_applicant_compute_income'].every(
                    field => !!p.documents[field] || !!(p.existingDocuments && p.existingDocuments[field])
                );
            } else if (p.co_applicant_profession === '3') {
                profDocsDone = ['co_applicant_agriculture_income'].every(
                    field => !!p.documents[field] || !!(p.existingDocuments && p.existingDocuments[field])
                );
            }
            preInterviewDone = preInterviewDone && coappDone && profDocsDone;
        } else {
            preInterviewDone = false; // Selection is mandatory
        }
    }
    */
    const preInterviewDone = false;

    // Personal (2)
    const personalFields = [
        'first_name', 'last_name', 'email', 'mobile', 'dob', 'gender', 'state', 'city', 'pin_code', 'complete_address'
    ];
    if (!guardianKeyStatus.value) {
        personalFields.push('guardian_name', 'guardian_phone', 'guardian_email', 'guardian_dropdown');
        if (p.guardian_dropdown === 'Other') {
            personalFields.push('guardian_other_reason');
        }
    }
    const personalDone = personalFields.every(f => {
        const val = p[f as keyof typeof p];
        if (!val) return false;
        if (f === 'mobile' || f === 'guardian_phone') return isValidMobile(String(val));
        if (f === 'pin_code') return isValidPincode(String(val));
        if (f === 'email' || f === 'guardian_email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val));
        return !!val;
    });

    // Academic (3) - simple check for basic fields
    const academicDone = !!p.class10_year && !!p.class10_score && !!p.class12_year && !!p.class12_score;

    // Work (4)
    const workDone = p.employment_status === 'Fresher' || (p.work_experience && p.work_experience.length > 0 && !!p.work_experience[0].org_name);

    // Documents (5)
    const docFields = ['aadhaar', 'dob_proof', 'photo', 'signature', 'resume'];
    if (resumeKeyStatus.value) {
        const index = docFields.indexOf('resume');
        if (index > -1) {
            docFields.splice(index, 1);
        }
    }
    const docsDone = docFields.every(field => {
        return !!p.documents[field] || !!(p.existingDocuments && p.existingDocuments[field]);
    });

    return [
        // { label: 'Pre Interview Documents', done: preInterviewDone, visible: false },
        { label: 'Personal Information', done: personalDone, visible: true },
        { label: 'Academic Information', done: academicDone, visible: true },
        { label: 'Work Experience', done: workDone, visible: true },
        { label: 'Documents Upload', done: docsDone, visible: true }
    ];
});

const bookingDetails = reactive({
    isBooked: false,
    date: "",
    time: "",
    admitCardUrl: "" as string | null,
    updateCount: 0,
    examStatus: false,
    examUrl: ""
});

const showAdmitCardButton = ref(false);

const isCurrentSlotInPast = computed(() => {
    if (!bookingDetails.date || !bookingDetails.time) return false;
    try {
        const startTimeStr = bookingDetails.time.split('-')[0].trim();
        const match = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (match) {
            let hourVal = parseInt(match[1], 10);
            const minVal = parseInt(match[2], 10);
            const ampm = match[3];

            if (ampm.toUpperCase() === 'PM' && hourVal < 12) hourVal += 12;
            if (ampm.toUpperCase() === 'AM' && hourVal === 12) hourVal = 0;

            const [year, month, day] = bookingDetails.date.split('-');
            const slotDateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hourVal, minVal, 0);

            return slotDateTime < new Date();
        }
    } catch (err) {
        console.error("Error validating current slot time", err);
    }
    return false;
});

const fetchStudentDetail = async () => {
    if (!userId.value) return;

    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        let response: any = null;
        
        try {
            response = await $fetch(`${config.public.apiBase}/api/students/get-student-profile/`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            console.log("Profile Data Check:", response);
            console.log(response, '-----response')
        } catch (e: any) {
            console.warn("Main profile API failed (expected if profile is not created yet):", e);
            await reportClientError("myaccount - fetchStudentDetail - main profile API", e, { userInfo: { userId: String(userId.value || '') } });
        }

        let activeResponse = response;
        if (!response?.data || (Array.isArray(response.data) && response.data.length === 0)) {
            isFinalSubmitted.value = false;
            try {
                const apiBase = config.public.apiBase;
                const draftResponse: any = await $fetch(`${apiBase}/api/students/get-student-profile-draft/`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });
                if (draftResponse?.data && (!Array.isArray(draftResponse.data) || draftResponse.data.length > 0)) {
                    activeResponse = draftResponse;
                    console.log("Fallback Profile Draft Check:", draftResponse);
                }
            } catch (err: any) {
                console.error("Draft fallback error", err);
                await reportClientError("myaccount - fetchStudentDetail - draft fallback API", err, { userInfo: { userId: String(userId.value || '') } });
            }
        } else {
            isFinalSubmitted.value = true;
        }

        resultStatus.value = activeResponse?.data?.result_status === true;
        resumeKeyStatus.value = activeResponse?.data?.resume_key_status === true || activeResponse?.data?.resume_key_status === "true" || activeResponse?.resume_key_status === true || activeResponse?.resume_key_status === "true";
        guardianKeyStatus.value = activeResponse?.data?.guardian_key_status === true || activeResponse?.data?.guardian_key_status === "true" || activeResponse?.guardian_key_status === true || activeResponse?.guardian_key_status === "true";
        reportUrl.value = activeResponse?.report_url || activeResponse?.data?.report_url || null;

        // If returned payload is explicitly an empty array or missing data
        if (!activeResponse?.data || (Array.isArray(activeResponse.data) && activeResponse.data.length === 0)) {
            isProfileEmpty.value = true;
            console.warn("Profile is detected as EMPTY.");
        } else {
            isProfileEmpty.value = false;
        }

        if (!isFinalSubmitted.value) {
            isEditingSection[1] = true;
            isEditingSection[2] = true;
            isEditingSection[3] = true;
            isEditingSection[4] = true;
            isEditingSection[5] = true;
        } else {
            isEditingSection[1] = false;
            isEditingSection[2] = false;
            isEditingSection[3] = false;
            isEditingSection[4] = false;
            isEditingSection[5] = false;
        }

        if (activeResponse?.data && !Array.isArray(activeResponse.data)) {
            const d = activeResponse.data;
            reattempt.value = d?.re_attempt_btn
            studentResult.value = d?.student_result ? String(d.student_result) : "";
            // Name splitting logic
            const cleanStr = (val: any) => (!val || val === "null" || val === "undefined") ? "" : val;

            formData.first_name = cleanStr(d.first_name);
            formData.last_name = cleanStr(d.last_name);

            formData.email = cleanStr(d.email);
            formData.mobile = cleanStr(d.phone || d.phone1);
            formData.city = cleanStr(d.city);
            formData.state = cleanStr(d.state);
            formData.pin_code = cleanStr(d.pincode);
            formData.dob = cleanStr(d.date_of_birth || d.dob);
            formData.nationality = d.nationality || "Indian";
            formData.complete_address = d.address || "";
            formData.mock_test_status = d.mock_test_status ?? 0;

            // Mappings for Choices
            const genderReverseMap: Record<number, string> = { 1: "Male", 2: "Female", 3: "Other" };
            formData.gender = genderReverseMap[d.gender] || "";

            formData.class10_year = d.tenth_passing_year || "";
            formData.class10_score = d.tenth_passing_percentage || "";
            const mediumReverseMap: Record<number, string> = { 1: "English", 2: "Hindi", 3: "Other" };
            formData.class10_type = d.tenth_score_type || "Percentage";
            formData.class10_medium = mediumReverseMap[d.tenth_medium] || "English";

            formData.class12_year = d.twelveth_passing_year || "";
            formData.class12_score = d.twelveth_passing_percentage || "";
            formData.class12_type = d.twelveth_score_type || "Percentage";
            formData.class12_medium = mediumReverseMap[d.twelveth_medium] || "English";

            const pgStatusReverseMap: Record<number, string> = { 1: "1", 2: "2" };
            formData.ug_status = pgStatusReverseMap[d.pg_status] || "1";
            formData.ug_cgpa = d.pg_percentage || "";
            formData.ug_type = d.ug_score_type || "CGPA";
            formData.ug_medium = mediumReverseMap[d.medium_instruction] || "English";
            formData.ug_institution = d.institution || "";

            const higherEdReverseMap: Record<number, string> = { 1: "Yes", 2: "No" };
            formData.pg_exists = higherEdReverseMap[d.higher_education_status] || "No";
            formData.pg_type = d.higher_qualification || "";
            formData.pg_institution = d.higher_qualification_institution || "";

            const employementReverseMap: Record<string, string> = { "1": "Fresher", "2": "Experienced" };
            formData.employment_status = employementReverseMap[String(d.employement_status)] || "Fresher";

            // Work Experience
            let expData = d.user_experience || d.student_experience;
            if (typeof expData === 'string' && expData !== "null" && expData.trim() !== "") {
                try {
                    expData = JSON.parse(expData);
                } catch (e) {
                    console.warn("Could not parse user_experience JSON", e);
                    expData = [];
                }
            }

            if (expData && Array.isArray(expData) && expData.length > 0) {
                formData.employment_status = "Experienced";
                formData.work_experience = expData.map((job: any) => ({
                    org_name: job.company_name || "",
                    designation: job.position || "",
                    functional_area: job.area || "",
                    from: job.start_date || "",
                    to: job.end_date || ""
                }));
            }

            formData.father_name = d.contact_name || "";
            formData.father_mobile = d.contact_phone || "";
            formData.guardian_name = d.guardian_name || "";
            formData.guardian_phone = d.guardian_phone || "";
            formData.guardian_email = d.guardian_email || "";
            const relationshipReverseMap: Record<number, string> = { 1: "Mother", 2: "Father", 3: "Other" };
            formData.guardian_dropdown = relationshipReverseMap[d.guardian_dropdown] || "";
            formData.guardian_other_reason = d.guardian_other_reason || "";

            formData.accounting_profession = d.accounting_profession ? String(d.accounting_profession) : "";
            formData.additional_qualification = d.additional_qualification || "";
            formData.co_applicant_profession = d.co_applicant_profession ? String(d.co_applicant_profession) : "";

            formData.existingDocuments = {
                aadhaar: d.aadhaar || null,
                dob_proof: d.dob_certificate || null,
                photo: d.photo || null, // Fetch proper document photo
                signature: d.signature || null, // Fetch proper signature document
                resume: d.resume || null,
                identity_proof: d.identity_proof || null,
                tenth_marksheet: d.tenth_marksheet || null,
                twelth_marksheet: d.twelth_marksheet || null,
                graduation_first_marksheet: d.graduation_first_marksheet || null,
                graduation_second_marksheet: d.graduation_second_marksheet || null,
                graduation_third_marksheet: d.graduation_third_marksheet || null,
                graduation_forth_marksheet: d.graduation_forth_marksheet || null,
                graduation_fifth_marksheet: d.graduation_fifth_marksheet || null,
                graduation_sixth_marksheet: d.graduation_sixth_marksheet || null,
                additional_document: d.additional_document || null,
                co_applicant_pan_card: d.co_applicant_pan_card || null,
                co_applicant_aadhaar: d.co_applicant_aadhaar || null,
                co_applicant_sallary_slip: d.co_applicant_sallary_slip || null,
                co_applicant_form16: d.co_applicant_form16 || null,
                co_applicant_employee_id_card: d.co_applicant_employee_id_card || null,
                co_applicant_passport_size: d.co_applicant_passport_size || null,
                co_applicant_income_tax_return: d.co_applicant_income_tax_return || null,
                co_applicant_compute_income: d.co_applicant_compute_income || null,
                co_applicant_six_month_bank: d.co_applicant_six_month_bank || null,
                co_applicant_agriculture_income: d.co_applicant_agriculture_income || null
            };

            // Booking Details check
            if (d.slot_date && d.slot_time) {
                bookingDetails.isBooked = true;
                bookingDetails.date = d.slot_date;
                bookingDetails.time = d.slot_time;
                bookingDetails.updateCount = d.slot_update_count || 0;
                selectedDate.value = d.slot_date;

                availableSlots.value = staticSlots.map((timeStr: string, index: number) => ({
                    id: index + 1,
                    time: timeStr
                }));

                const matchingSlot = staticSlots.find(s => s === d.slot_time);
                if (matchingSlot) {
                    selectedSlot.value = staticSlots.indexOf(matchingSlot) + 1;
                }

                // Always show admit card button if slot is already booked
                showAdmitCardButton.value = true;
            }

            // Map exam_status and exam_url from backend
            bookingDetails.examStatus = d.exam_status === true || d.exam_status === "true" || d.exam_status === 1;
            bookingDetails.examUrl = d.exam_url || "";

            // (localStorage check moved down after application_id is populated)
        }

        // Fetch image specifically from the detail API as requested and fill fallback profile data
        try {
            const detailRes: any = await $fetch(`${config.public.apiBase}/api/users/view-student-detail/${userId.value}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (detailRes.success && detailRes.data) {
                profileImage.value = detailRes.data.image || detailRes.data.photo || profileImage.value;

                // Fallback for empty core fields
                if (!formData.first_name) {
                    const fullName = detailRes.data.first_name || "";
                    if (fullName.includes(" ")) {
                        const nameParts = fullName.trim().split(/\s+/);
                        formData.first_name = nameParts[0];
                        if (!formData.last_name) {
                            formData.last_name = nameParts.slice(1).join(" ");
                        }
                    } else {
                        formData.first_name = fullName;
                    }
                }
                if (!formData.last_name && !formData.first_name.includes(" ")) {
                    formData.last_name = detailRes.data.last_name || "";
                }
                if (!formData.email) formData.email = detailRes.data.email || "";
                if (!formData.mobile) formData.mobile = detailRes.data.phone1 || detailRes.data.phone2 || detailRes.data.phone || "";
                if (!formData.city) formData.city = detailRes.data.city || "";
                if (!formData.state) formData.state = detailRes.data.state || "";
                if (!formData.application_id) formData.application_id = detailRes.data.application_id || detailRes.data.student_id || "";
            }
        } catch (detailErr) {
            console.error("Error fetching detail API data:", detailErr);
        }

        if (!isPreInterviewVisible.value) {
            openSections.value.add(2);
            openSections.value.delete(1);
        }

    } catch (err) {
        console.error("Error fetching student details:", err);
    }
};
onMounted(async () => {
    const route = useRoute()
    const email = route.query.email as string
    const password = route.query.password as string
    const fromLanding = route.query.from_landing === 'true'

    if (fromLanding && typeof window !== 'undefined') {
        // Inject all tracking scripts via useHead
        useHead({
            script: [
                // Meta Pixel
                {
                    key: 'fbevents',
                    innerHTML: `
                        !function(f,b,e,v,n,t,s){
                            if(f.fbq)return;
                            n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;
                            n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)
                        }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1308129784468579');
                        fbq('track', 'PageView');
                        fbq('track', 'CompleteRegistration');
                        fbq('track', 'Lead');
                        fbq('track', 'Purchase', { value: 2950.00, currency: 'INR' });
                    `,
                    type: 'text/javascript'
                },
                // Google Analytics
                {
                    key: 'gtag-src',
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-B2ETHYM6MN',
                    async: true
                },
                {
                    key: 'gtag-init',
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-B2ETHYM6MN');
                    `,
                    type: 'text/javascript'
                },
                // Google Tag Manager
                {
                    key: 'gtm',
                    innerHTML: `
                        (function(w,d,s,l,i){
                            w[l]=w[l]||[];
                            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),
                                dl=l!='dataLayer'?'&l='+l:'';
                            j.async=true;
                            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                            f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5NVDGXLR');
                    `,
                    type: 'text/javascript'
                },
                // Microsoft Clarity
                {
                    key: 'clarity',
                    innerHTML: `
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;
                            t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];
                            y.parentNode.insertBefore(t,y);
                        })(window,document,"clarity","script","wtdnppatos");
                    `,
                    type: 'text/javascript'
                }
            ],
            noscript: [
                // Meta Pixel noscript fallback
                {
                    key: 'fb-noscript',
                    innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1308129784468579&ev=PageView&noscript=1" />`
                }
            ]
        })
    }

    let token = localStorage.getItem('gcc_access_token')

    // Auto-login flow
    if (!token && email && password) {
        isAutoLoggingIn.value = true
        try {
            const response: any = await $fetch(
                `${config.public.apiBase}/api/users/website_login/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: { email, password, role: 'student' },
                }
            )
            if (response.data?.token) {
                const { access, refresh } = response.data.token
                const auth = useAuth()
                auth.login({
                    access,
                    refresh,
                    user_role: response.data.user_role ?? null,
                    user_id: response.data.user_id ?? null
                })
                token = access
            }
        } catch (err) {
            console.error('[AUTOLOGIN] Failed:', err)
        } finally {
            isAutoLoggingIn.value = false
            const router = useRouter()
            router.replace({ path: route.path, query: {} })
        }
    } else if (fromLanding || email || password) {
        const router = useRouter()
        router.replace({ path: route.path, query: {} })
    }

    // ✅ Final token check — redirect immediately if still no token
    const hasToken = token && token !== 'undefined' && token !== 'null'
    if (!hasToken) {
        // Don't just return — actively navigate away
        // isAuthChecked stays false → loader shows briefly then redirects
        await navigateTo('/login', { replace: true })
        return
    }

    // ✅ Only reach here with a valid token
    isAuthChecked.value = true
    initAuth()

    if (userId.value) {
        await fetchStudentDetail()
    }

    if (isProfileEmpty.value) {
        try {
            const saved = localStorage.getItem(DRAFT_KEY)
            if (saved) {
                const draft = JSON.parse(saved)
                for (const key in draft) {
                    if (draft[key] !== null && draft[key] !== undefined && draft[key] !== "") {
                        (formData as any)[key] = draft[key];
                    }
                }
                draftStatus.value = 'saved'
            }
        } catch (e) {
            console.warn('[DRAFT] Failed to restore draft:', e)
        }
    }
})


// track which sections are currently expanded; start with the first one open
const openSections = ref<Set<number>>(new Set([1]));
// helper for template checks
const isSectionOpen = (idx: number) => openSections.value.has(idx);
const isOpenNfet = ref(true);

const isEditingSection = reactive<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
});

const isAnySectionEditing = computed(() => {
    return isEditingSection[1] || isEditingSection[2] || isEditingSection[3] || isEditingSection[4] || isEditingSection[5];
});

const enableEdit = (sectionIndex: number) => {
    isEditingSection[sectionIndex] = true;
    openSections.value.add(sectionIndex);
};

// --- Calendar & Slots Logic ---
const currentDateObj = ref(new Date());
const currentMonth = computed(() => currentDateObj.value.getMonth());
const currentYear = computed(() => currentDateObj.value.getFullYear());

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const prevMonth = () => {
    currentDateObj.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};
const nextMonth = () => {
    currentDateObj.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

// Hardcode allowed dates extracted to constants

const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});
const firstDayOfMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const isSlotValid = (dateStr: string, timeStr: string) => {
    try {
        const startTimeStr = timeStr.split('-')[0].trim();
        const match = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (match) {
            let hourVal = parseInt(match[1], 10);
            const minVal = parseInt(match[2], 10);
            const ampm = match[3];

            if (ampm.toUpperCase() === 'PM' && hourVal < 12) hourVal += 12;
            if (ampm.toUpperCase() === 'AM' && hourVal === 12) hourVal = 0;

            const [year, month, day] = dateStr.split('-');
            const slotDateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hourVal, minVal, 0);

            const now = new Date();
            const diffHours = (slotDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

            const bufferHours = Number(config.public.nfetSlotBufferHours) || 48;
            return diffHours >= bufferHours;
        }
    } catch (err) {
        console.error("Error validating slot time", err);
    }
    return false;
};

const calendarDays = computed(() => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth.value; i++) {
        days.push(null); // empty slots padding for the first week
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (let i = 1; i <= daysInMonth.value; i++) {
        const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Allowed only if it's in the allowedDates list AND is today or in the future
        // AND at least one slot is valid (>= 8 hours)
        const isAllowed = allowedDates.includes(dateString) &&
            dateString >= todayStr &&
            staticSlots.some((timeStr: string) => isSlotValid(dateString, timeStr));

        const isBlocked = blockedDates.includes(dateString);

        days.push({
            day: i,
            dateString,
            isAllowed: isAllowed && !isBlocked,
            isBlocked
        });
    }
    return days;
});

const selectedDate = ref('');
const selectedSlot = ref<number | string>('');
const availableSlots = ref<any[]>([]);

const selectDate = (day: any) => {
    if (!day) return;
    if (day.isBlocked) {
        showAlert("This slot is fully booked", "Please select another available date.", "error");
        return;
    }
    if (!day.isAllowed) return;
    selectedDate.value = day.dateString;
    selectedSlot.value = ''; // reset slot on date change

    availableSlots.value = staticSlots.map((timeStr: string, index: number) => ({
        id: index + 1,
        time: timeStr,
        disabled: !isSlotValid(day.dateString, timeStr)
    }));
};

const selectSlot = (slot: any) => {
    selectedSlot.value = slot.id;
};

const showConfirmModal = ref(false);
const resolveConfirm = ref<((value: boolean) => void) | null>(null);

const alertState = reactive({
    show: false,
    title: '',
    message: '',
    type: 'error'
});

const showAlert = (title: string, message: string, type: string = 'error') => {
    alertState.title = title;
    alertState.message = message;
    alertState.type = type;
    alertState.show = true;
};

const confirmSlotChange = () => {
    return new Promise<boolean>((resolve) => {
        showConfirmModal.value = true;
        resolveConfirm.value = resolve;
    });
};

const handleConfirm = (confirmed: boolean) => {
    showConfirmModal.value = false;
    if (resolveConfirm.value) {
        resolveConfirm.value(confirmed);
        resolveConfirm.value = null;
    }
};

const isBookingSlot = ref(false);
const isStartingExam = ref(false);


const handleStartExamClick = async (event: MouseEvent) => {
    event.preventDefault();
    if (!bookingDetails.examStatus || isStartingExam.value) return;

    isStartingExam.value = true;
    try {
        await fetchStudentDetail();
        let targetUrl = bookingDetails.examUrl;

        if (!targetUrl) {
            const { getAccessToken } = useAuth();
            const token = getAccessToken();
            const response: any = await $fetch(`${config.public.apiBase}/api/students/schedule-assessment/`, {
                method: "POST",
                body: {
                    email: formData.application_id || formData.email,
                    first_name: formData.first_name,
                    last_name: formData.last_name
                },
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });

            if (response && response.data && response.data.assessmentlink) {
                targetUrl = response.data.assessmentlink;
            }
        }

        if (targetUrl) {
            window.open(targetUrl, '_blank');
            bookingDetails.examUrl = targetUrl;
        }
    } catch (err) {
        console.error("Failed to start exam:", err);
    } finally {
        isStartingExam.value = false;
    }
};

const bookSlot = async () => {
    if (!selectedDate.value || !selectedSlot.value) return;

    const slotObj = availableSlots.value.find((s: any) => s.id === selectedSlot.value);
    if (!slotObj) return;

    // Time difference check
    try {
        const slotDateStr = selectedDate.value;
        const slotTimeStr = String(slotObj.time);
        const startTimeStr = slotTimeStr.split('-')[0].trim();
        const match = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);

        if (match) {
            let hourVal = parseInt(match[1], 10);
            const minVal = parseInt(match[2], 10);
            const ampm = match[3];

            if (ampm.toUpperCase() === 'PM' && hourVal < 12) hourVal += 12;
            if (ampm.toUpperCase() === 'AM' && hourVal === 12) hourVal = 0;

            const [year, month, day] = slotDateStr.split('-');
            const slotDateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hourVal, minVal, 0);

            const now = new Date();
            const diffHours = (slotDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

            const bufferHours = Number(config.public.nfetSlotBufferHours) || 48;

            if (diffHours < bufferHours) {
                showAlert("", `Slots can only be booked or changed at least ${bufferHours} hours before the scheduled time.`, "warning");
                return;
            }
        }
    } catch (err) {
        console.error("Error calculating time difference", err);
    }

    // New validation: Check if user is trying to book the very same slot they already have
    if (bookingDetails.isBooked && bookingDetails.date === selectedDate.value && bookingDetails.time === String(slotObj.time)) {
        showAlert("Same Slot Selected", "You’ve selected the same slot that you already booked. Please choose a different slot to update.", "info");
        return;
    }

    if (bookingDetails.isBooked) {
        const confirmed = await confirmSlotChange();
        if (!confirmed) return;
    }

    isBookingSlot.value = true;
    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();

        const payload = {
            slot_date: selectedDate.value,
            slot_time: String(slotObj.time)
        };

        // Note: Using a standard fetch for easier blob handling
        const response = await fetch(`${config.public.apiBase}/api/students/student-slot-upload/`, {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
        console.log(response, '-------------response-------')
        if (response.ok) {
            const result = await response.json();
            const reportUrl = result.data?.report_url;

            const wasAlreadyBooked = bookingDetails.isBooked;

            bookingDetails.isBooked = true;
            bookingDetails.date = payload.slot_date;
            bookingDetails.time = payload.slot_time;
            bookingDetails.admitCardUrl = reportUrl;
            showAdmitCardButton.value = true;

            if (wasAlreadyBooked) {
                showAlert("Success", "Change request submitted successfully!", "success");
            } else {
                showAlert("Success", "Slot booked successfully! You can now download your admit card.", "success");
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to book slot");
        }
    } catch (err: any) {
        console.error("Failed to book slot:", err);
        showAlert("Booking Failed", err.message || "Failed to book slot. Please try again.", "error");
    } finally {
        isBookingSlot.value = false;
        await fetchStudentDetail();
    }
};

const isDownloadingAdmitCard = ref(false);

const downloadAdmitCard = async () => {
    isDownloadingAdmitCard.value = true;
    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        const response = await fetch(`${config.public.apiBase}/api/students/student-admit-card-download/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });

        if (response.ok) {
            const result = await response.json();
            const reportUrl = result.data?.report_url || result.report_url;
            if (reportUrl) {
                // If it's a blob URL, download it, else open the external URL
                if (reportUrl.startsWith('blob:') || reportUrl.includes('fslfdlfj')) {
                    const link = document.createElement('a');
                    link.href = reportUrl;
                    link.setAttribute('download', `NFET_Admit_Card_${bookingDetails.date}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // It's a standard URL, open in new tab
                    window.open(reportUrl, '_blank');
                }
            } else {
                showAlert("Error", "No admit card URL found in the response.", "error");
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to download admit card");
        }
    } catch (err: any) {
        console.error("Failed to download admit card:", err);
        showAlert("Download Failed", err.message || "Failed to download admit card. Please try again.", "error");
    } finally {
        isDownloadingAdmitCard.value = false;
    }
};

const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const getSelectedSlotTime = () => {
    if (!selectedSlot.value) return "";
    const slotObj = availableSlots.value.find((s: any) => s.id === selectedSlot.value);
    return slotObj ? slotObj.time : "";
};

const formData = reactive({
    first_name: "",
    last_name: "",
    application_id: "",
    father_name: "",
    father_mobile: "",
    dob: "",
    gender: "",
    nationality: "Indian",
    email: "",
    mock_test_status: 0,
    mobile: "",
    city: "",
    state: "",
    pin_code: "",
    complete_address: "",
    guardian_name: "",
    guardian_phone: "",
    guardian_email: "",
    guardian_dropdown: "",
    guardian_other_reason: "",
    class10_year: "",
    class10_type: "Percentage",
    class10_score: "",
    class10_medium: "English",
    class10_medium_other: "",
    class12_year: "",
    class12_type: "Percentage",
    class12_score: "",
    class12_medium: "English",
    class12_medium_other: "",
    medium: "",
    medium_other: "",
    ug_status: "1",
    ug_type: "CGPA",
    ug_cgpa: "",
    ug_medium: "English",
    ug_medium_other: "",
    ug_institution: "",
    pg_exists: "",
    pg_type: "",
    pg_other: "",
    pg_institution: "",
    employment_status: "Fresher",
    work_experience: [] as any[],
    accounting_profession: "",
    fee_preference_agree: false,
    additional_qualification: "",
    co_applicant_profession: "",
    declaration: false,
    documents: {
        aadhaar: null,
        dob_proof: null,
        photo: null,
        signature: null,
        resume: null,
        identity_proof: null,
        tenth_marksheet: null,
        twelth_marksheet: null,
        graduation_first_marksheet: null,
        graduation_second_marksheet: null,
        graduation_third_marksheet: null,
        graduation_forth_marksheet: null,
        graduation_fifth_marksheet: null,
        graduation_sixth_marksheet: null,
        additional_document: null,
        co_applicant_pan_card: null,
        co_applicant_aadhaar: null,
        co_applicant_sallary_slip: null,
        co_applicant_form16: null,
        co_applicant_employee_id_card: null,
        co_applicant_passport_size: null,
        co_applicant_income_tax_return: null,
        co_applicant_compute_income: null,
        co_applicant_six_month_bank: null,
        co_applicant_agriculture_income: null
    } as Record<string, any>,
    existingDocuments: {
        aadhaar: null,
        dob_proof: null,
        photo: null,
        signature: null,
        resume: null,
        identity_proof: null,
        tenth_marksheet: null,
        twelth_marksheet: null,
        graduation_first_marksheet: null,
        graduation_second_marksheet: null,
        graduation_third_marksheet: null,
        graduation_forth_marksheet: null,
        graduation_fifth_marksheet: null,
        graduation_sixth_marksheet: null,
        additional_document: null,
        co_applicant_pan_card: null,
        co_applicant_aadhaar: null,
        co_applicant_sallary_slip: null,
        co_applicant_form16: null,
        co_applicant_employee_id_card: null,
        co_applicant_passport_size: null,
        co_applicant_income_tax_return: null,
        co_applicant_compute_income: null,
        co_applicant_six_month_bank: null,
        co_applicant_agriculture_income: null
    } as Record<string, string | null>
});

const isSubmitting = ref(false);
const isImageUploading = ref(false);

const profileImageInput = ref<HTMLInputElement | null>(null);

const triggerImageUpload = () => {
    if (profileImageInput.value) {
        profileImageInput.value.click();
    }
};

const handleProfileImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file || !userId.value) return;

    isImageUploading.value = true;
    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();

        const imgData = new FormData();
        imgData.append('image', file);

        const res: any = await $fetch(`${config.public.apiBase}/api/users/student-profile-upload/${userId.value}`, {
            method: "POST",
            body: imgData,
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });

        if (res) {
            // Update the UI immediately
            profileImage.value = URL.createObjectURL(file);
            showAlert("Success", "Profile image updated successfully!", "success");
        }
    } catch (err) {
        console.error("Failed to upload profile image:", err);
        showAlert("Upload Failed", "Failed to upload profile image.", "error");
    } finally {
        isImageUploading.value = false;
        // Reset input to allow uploading the same file again if needed
        if (target) target.value = '';
    }
};

const section1Ref = ref<any>(null);
const section2Ref = ref<any>(null);
const section3Ref = ref<any>(null);
const section4Ref = ref<any>(null);
const section5Ref = ref<any>(null);


// ── Draft: saveDraft + watcher MUST live after formData is declared ────────

const saveDraft = () => {
    // Only save draft if user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('gcc_access_token') : null;
    if (!token || !userId.value) {
        return;
    }
    // Extract only serialisable text fields — skip File objects and booleans
    const { documents, existingDocuments, declaration, ...textFields } = formData;
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(textFields));
        draftStatus.value = 'saved';
        draftLastSaved.value = new Date();
    } catch (e) {
        console.warn('[DRAFT] localStorage save failed:', e);
        draftStatus.value = 'error';
    }
};

const formatDraftTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Debounced watcher — fires saveDraft() 1 second after last change
watch(
    () => {
        const { documents, existingDocuments, declaration, ...text } = formData;
        return text;
    },
    () => {
        if (_draftTimer) clearTimeout(_draftTimer);
        _draftTimer = setTimeout(saveDraft, 1000);
    },
    { deep: true }
);

const toggleSection = (index: number) => {
    // expand or collapse only the clicked section without closing others
    if (openSections.value.has(index)) {
        openSections.value.delete(index);
    } else {
        openSections.value.add(index);
    }
};

const isSavingSection = reactive<Record<number, boolean>>({
    2: false, 3: false, 4: false, 5: false
});

const buildPayloadForSection = (sectionIndex: number) => {
    const data = new FormData();
    data.append('user', String(userId.value || ""));

    if (sectionIndex >= 2) {
        data.append('first_name', formData.first_name || "");
        data.append('last_name', formData.last_name || "");
        data.append('email', formData.email || "");
        data.append('phone', formData.mobile || "");
        data.append('state', formData.state || "");
        data.append('city', formData.city || "");
        data.append('contact_name', formData.father_name || "");
        data.append('contact_phone', formData.father_mobile || "");
        data.append('date_of_birth', formData.dob || "");
        data.append('nationality', formData.nationality || "");
        data.append('pincode', formData.pin_code || "");
        data.append('address', formData.complete_address || "");
        data.append('guardian_name', formData.guardian_name || "");
        data.append('guardian_phone', formData.guardian_phone || "");
        data.append('guardian_email', formData.guardian_email || "");

        const relationshipMap: any = { "Mother": 1, "Father": 2, "Other": 3 };
        data.append('guardian_dropdown', relationshipMap[formData.guardian_dropdown] || "");
        data.append('guardian_other_reason', formData.guardian_dropdown === 'Other' && formData.guardian_other_reason ? formData.guardian_other_reason : "");

        const genderMap: any = { "Male": 1, "Female": 2, "Other": 3 };
        data.append('gender', genderMap[formData.gender] || "");
    }

    if (sectionIndex >= 3) {
        const mediumMap: any = { "English": 1, "Hindi": 2, "Other": 3 };
        data.append('tenth_passing_year', formData.class10_year || "");
        data.append('tenth_passing_percentage', formData.class10_score || "");
        data.append('tenth_score_type', formData.class10_type || "");
        data.append('tenth_medium', mediumMap[formData.class10_medium] || "");
        data.append('twelveth_passing_year', formData.class12_year || "");
        data.append('twelveth_passing_percentage', formData.class12_score || "");
        data.append('twelveth_score_type', formData.class12_type || "");
        data.append('twelveth_medium', mediumMap[formData.class12_medium] || "");
        data.append('medium_instruction', mediumMap[formData.ug_medium] || "");
        data.append('other_instruction', formData.medium_other || "");

        const pgStatusMap: any = { "1": 1, "2": 2 };
        data.append('pg_status', pgStatusMap[formData.ug_status] || "");
        data.append('pg_percentage', formData.ug_cgpa || "");
        data.append('ug_score_type', formData.ug_type || "");
        data.append('institution', formData.ug_institution || "");

        const higherEdMap: any = { "Yes": 1, "No": 2 };
        data.append('higher_education_status', higherEdMap[formData.pg_exists] || "");
        data.append('higher_qualification', formData.pg_type === 'Other' ? (formData.pg_other || "") : (formData.pg_type || ""));
        data.append('higher_qualification_institution', formData.pg_institution || "");
    }

    if (sectionIndex >= 4) {
        const employementMap: any = { "Fresher": 1, "Experienced": 2 };
        data.append('employement_status', employementMap[formData.employment_status] || "");

        const experienceData = formData.employment_status !== "Fresher" && formData.work_experience
            ? formData.work_experience.filter((job: any) => job.org_name?.trim()).map((job: any) => ({
                company_name: job.org_name, position: job.designation,
                area: job.functional_area || "", start_date: job.from, end_date: job.to || null
            })) : [];
        if (experienceData.length > 0) {
            data.append('user_experience', JSON.stringify(experienceData));
        } else {
            data.append('user_experience', JSON.stringify([]));
        }
    }

    if (sectionIndex >= 5) {
        data.append('accounting_profession', formData.accounting_profession || "");
        data.append('additional_qualification', formData.additional_qualification || "");
        data.append('co_applicant_profession', String(formData.co_applicant_profession || ""));

        const appendDoc = (fieldKey: string, apiKey: string) => {
            const file = formData.documents?.[fieldKey];
            if (file instanceof File) {
                data.append(apiKey, file);
            } else if (file && typeof file === 'string' && file.trim() !== '') {
                data.append(apiKey, file);
            }
        };
        appendDoc('aadhaar', 'aadhaar');
        appendDoc('dob_proof', 'dob_certificate');
        appendDoc('photo', 'photo');
        appendDoc('signature', 'signature');
        appendDoc('resume', 'resume');

        const extraDocKeys = [
            'identity_proof', 'tenth_marksheet', 'twelth_marksheet',
            'graduation_first_marksheet', 'graduation_second_marksheet', 'graduation_third_marksheet',
            'graduation_forth_marksheet', 'graduation_fifth_marksheet', 'graduation_sixth_marksheet',
            'additional_document', 'co_applicant_pan_card', 'co_applicant_aadhaar',
            'co_applicant_sallary_slip', 'co_applicant_form16', 'co_applicant_employee_id_card',
            'co_applicant_passport_size', 'co_applicant_income_tax_return', 'co_applicant_compute_income',
            'co_applicant_six_month_bank', 'co_applicant_agriculture_income'
        ];
        extraDocKeys.forEach(key => appendDoc(key, key));
    }

    return data;
};

const saveSectionDraft = async (sectionIndex: number) => {
    const data = buildPayloadForSection(sectionIndex);
    const { getAccessToken } = useAuth();
    const token = getAccessToken();
    const apiBase = config.public.apiBase;
    const apiUrl = `${apiBase}/api/students/create-update-student-profile-draft/`;

    const controller = new AbortController();
    const TIMEOUT_MS = sectionIndex === 5 ? 180000 : 30000;
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const rawResponse = await fetch(apiUrl, {
        method: "POST",
        body: data,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!rawResponse.ok) {
        const httpStatus = rawResponse.status;
        const errorText = await rawResponse.text().catch(() => '');
        throw new Error(`Server returned ${httpStatus}: ${errorText.substring(0, 200) || 'Unknown error'}`);
    }

    return await rawResponse.json();
};

const handleCancelSection = async (sectionIndex: number) => {
    isEditingSection[sectionIndex] = false;
    await fetchStudentDetail();
};

const handleSaveSection = async (sectionIndex: number) => {
    let currentSectionRef: any = null;
    let sectionName = "";
    if (sectionIndex === 2) { currentSectionRef = section2Ref; sectionName = "Personal Information"; }
    else if (sectionIndex === 3) { currentSectionRef = section3Ref; sectionName = "Academic Information"; }
    else if (sectionIndex === 4) { currentSectionRef = section4Ref; sectionName = "Work Experience"; }
    else if (sectionIndex === 5) { currentSectionRef = section5Ref; sectionName = "Documents"; }

    if (currentSectionRef && currentSectionRef.value?.validate && !currentSectionRef.value.validate()) {
        currentSectionRef.value?.scrollToFirstError?.();
        showAlert("Incomplete Information", `Please fill all required fields in the '${sectionName}' section.`, "warning");
        return;
    }

    if (sectionIndex === 5) {
        // Do not call draft API on Section 5 save.
        // Collapse the documents section and scroll to the declaration/submit card.
        openSections.value.delete(5);
        nextTick(() => {
            const declEl = document.querySelector('.custom-declaration');
            if (declEl) {
                declEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        showAlert("No Internet Connection", "Your device appears to be offline. Please check your internet connection and try again.", "error");
        return;
    }

    isSavingSection[sectionIndex] = true;

    try {
        const response = await saveSectionDraft(sectionIndex);

        if (response.success || response.status === "200" || response.status === 200 ||
            response.message === "Message sent Successfully" || response.message?.toLowerCase().includes("success")) {

            showAlert("Success", `${sectionName} saved successfully!`, "success");
            await reportClientError(`myaccount - handleSaveSection success - Section ${sectionIndex}`, null, { errorName: 'SUCCESS', errorData: response, userInfo: { email: formData.email || 'Unknown', userId: String(userId.value || '') } });

            // Silent final submission chaining
            await handleFinalSubmit(true);
            await fetchStudentDetail();

            const nextSecIndex = sectionIndex + 1;
            if (nextSecIndex <= 5) {
                isEditingSection[nextSecIndex] = true;
                openSections.value.add(nextSecIndex);
                openSections.value.delete(sectionIndex);
                nextTick(() => {
                    const accordionSecs = document.querySelectorAll('.accordion-section');
                    if (accordionSecs[nextSecIndex - 2]) {
                        accordionSecs[nextSecIndex - 2].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }
        } else {
            showAlert("Failed to save", response.message || "Unknown error from server.", "error");
        }
    } catch (err: any) {
        console.error(`[SAVE SECTION ${sectionIndex}] Error:`, err);
        showAlert("Save Failed", err.message || "An unexpected error occurred. Please try again.", "error");
        await reportClientError(`myaccount - handleSaveSection - Section ${sectionIndex}`, err, { userInfo: { email: formData.email || 'Unknown', userId: String(userId.value || '') } });
    } finally {
        isSavingSection[sectionIndex] = false;
    }
};

const handleFinalSubmit = async (isSilent = false) => {
    // ── 1. Section Validation ───────────────────────────────────────────────
    const sections = [
        { ref: section1Ref, id: 1, name: "Pre Interview" },
        { ref: section2Ref, id: 2, name: "Personal Information" },
        { ref: section3Ref, id: 3, name: "Academic Information" },
        { ref: section4Ref, id: 4, name: "Work Experience" },
        { ref: section5Ref, id: 5, name: "Documents" }
    ];

    for (const section of sections) {
        if (section.ref.value?.validate && !section.ref.value.validate()) {
            if (isSilent !== true) {
                openSections.value.add(section.id);
                section.ref.value?.scrollToFirstError?.();
                showAlert("Incomplete Information", `Please fill all required fields in the '${section.name}' section.`, "warning");
            }
            return;
        }
    }

    if (!formData.declaration && isSilent !== true) {
        showAlert("Declaration Required", "Please check the declaration before submitting.", "warning");
        return;
    }

    // ── 2. Pre-check connectivity ───────────────────────────────────────────
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        showAlert("No Internet Connection", "Your device appears to be offline. Please check your internet connection and try again.", "error");
        return;
    }

    isSubmitting.value = true;

    // Save Section 5 draft first to ensure documents are stored in draft database before final submit
    if (isSilent !== true) {
        try {
            console.log("[SUBMIT] Saving Section 5 draft before final submit...");
            await saveSectionDraft(5);
            console.log("[SUBMIT] Section 5 draft saved successfully.");
        } catch (draftErr: any) {
            console.error("[SUBMIT] Failed to save Section 5 draft before final submission:", draftErr);
            isSubmitting.value = false;
            showAlert("Submission Failed", draftErr.message || "Failed to save documents draft. Please try again.", "error");
            return;
        }
    }

    // ── PROXY: Call the Nuxt server-side proxy instead of Django directly.
    // This avoids CORS, PWA service-worker interception, and mixed-content issues.
    // The proxy forwards the request to Django server-to-server.
    const apiUrl = `${config.public.apiBase}/api/students/create-update-student-profile/`;
    const diagnostics = {
        apiUrl,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR',
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        connectionType: (typeof navigator !== 'undefined' && (navigator as any).connection?.effectiveType) || 'unknown',
        timestamp: new Date().toISOString(),
    };

    console.log("=== [SUBMIT] Starting profile submission ===");
    console.log("[SUBMIT] API URL:", apiUrl);
    console.log("[SUBMIT] Online:", diagnostics.isOnline, "| Connection:", diagnostics.connectionType);
    console.log("[SUBMIT] UserAgent:", diagnostics.userAgent);

    // Helper to send detailed logs to server
    const sendErrorLog = async (extra: Record<string, any>) => {
        try {
            await $fetch('/api/log-client-error', {
                method: 'POST',
                body: { ...diagnostics, userInfo: { email: formData.email || 'Unknown', userId: String(userId.value || '') }, ...extra }
            });
        } catch (e) {
            console.error("[SUBMIT] Failed to send error log to server:", e);
        }
    };

    try {
        // ── 3. Build FormData payload ───────────────────────────────────────
        const data = buildPayloadForSection(5);

        // ── 4. Append documents & measure total size ────────────────────────
        let totalFileSize = 0;
        const appendDoc = (fieldKey: string, apiKey: string) => {
            const file = (formData.documents as any)[fieldKey];
            if (file instanceof File) {
                totalFileSize += file.size;
                // Just in case it wasn't added by buildPayloadForSection, append it here
                if (!data.has(apiKey)) {
                    data.append(apiKey, file);
                }
                console.log(`[SUBMIT] File '${apiKey}': ${file.name} (${(file.size / 1024).toFixed(1)} KB, type: ${file.type})`);
            }
        };

        appendDoc('aadhaar', 'aadhaar');
        appendDoc('dob_proof', 'dob_certificate');
        appendDoc('photo', 'photo');
        appendDoc('signature', 'signature');
        appendDoc('resume', 'resume');


        console.log(`[SUBMIT] Total upload payload: ${(totalFileSize / 1024 / 1024).toFixed(2)} MB`);

        // Log the final payload keys to verify everything is attached
        console.log("[SUBMIT] Payload keys being sent:");
        for (let [key, value] of data.entries()) {
            console.log(`  -> ${key}:`, value instanceof File ? `File (${value.name})` : value);
        }

        // ── 5. Auth token check ─────────────────────────────────────────────
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        if (!token) {
            console.warn("[SUBMIT] ⚠️ No auth token found! Request will be unauthenticated → likely 401.");
        } else {
            console.log("[SUBMIT] Auth token present:", token.substring(0, 20) + "...");
        }

        // ── 6. Send the request ─────────────────────────────────────────────
        const controller = new AbortController();
        const TIMEOUT_MS = 180000; // 3 min for large file uploads
        const timeoutId = setTimeout(() => {
            console.warn(`[SUBMIT] Aborting after ${TIMEOUT_MS / 1000}s timeout`);
            controller.abort();
        }, TIMEOUT_MS);

        // Call same-origin Nuxt proxy — no CORS, no SW interception
        console.log("[SUBMIT] Calling Nuxt proxy →", apiUrl);
        let rawResponse: Response;

        try {
            rawResponse = await fetch(apiUrl, {
                method: "POST",
                body: data,
                // Send auth token to the proxy; the proxy forwards it to Django
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            console.log("[SUBMIT] Proxy response → HTTP", rawResponse.status, rawResponse.statusText);
        } catch (fetchErr: any) {
            clearTimeout(timeoutId);
            const errName: string = fetchErr?.name || 'UnknownError';
            const errMsg: string = fetchErr?.message || String(fetchErr);

            console.error("[SUBMIT] ❌ fetch() threw BEFORE receiving response");
            console.error("[SUBMIT] Error name:", errName);
            console.error("[SUBMIT] Error message:", errMsg);
            console.error("[SUBMIT] Error stack:", fetchErr?.stack);
            console.error("[SUBMIT] navigator.onLine:", typeof navigator !== 'undefined' ? navigator.onLine : 'N/A');

            const isAbort = errName === 'AbortError';
            const isNetwork = !isAbort && errName === 'TypeError' &&
                (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError') ||
                    errMsg.includes('Network request failed'));
            const isCors = errMsg.toLowerCase().includes('cors') || errMsg.toLowerCase().includes('cross-origin');

            await sendErrorLog({
                context: 'handleFinalSubmit - fetch threw (no response received)',
                errorMessage: errMsg, errorName: errName, errorData: errMsg,
                errorStack: fetchErr?.stack || 'No stack',
                isNetworkError: isNetwork, isCorsError: isCors, isTimeout: isAbort,
                httpStatus: 0, totalFileSizeMB: (totalFileSize / 1024 / 1024).toFixed(2)
            });

            if (isAbort) {
                throw new Error(`TIMEOUT: Submission timed out after ${TIMEOUT_MS / 1000} seconds. Your upload was ${(totalFileSize / 1024 / 1024).toFixed(1)} MB. Try with a faster connection or smaller files.`);
            }
            if (isNetwork) {
                const swInstalled = typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
                throw new Error(`NETWORK_ERROR: Could not reach the server. Please check your internet connection and try again.`);
            }
            if (isCors) {
                throw new Error(`CORS_ERROR: A browser security policy is blocking this request. Please clear your browser cache and cookies, then reload the page.`);
            }
            throw fetchErr;
        }

        // ── 7. Handle non-2xx HTTP responses ───────────────────────────────
        if (!rawResponse.ok) {
            const httpStatus = rawResponse.status;
            const errorText = await rawResponse.text().catch(() => '');
            console.error(`[SUBMIT] Non-OK HTTP ${httpStatus}:`, errorText.substring(0, 300));

            await sendErrorLog({
                context: 'handleFinalSubmit - non-ok HTTP response',
                errorMessage: `HTTP ${httpStatus}`, errorName: 'HttpError',
                errorData: errorText.substring(0, 500), errorStack: 'N/A',
                isNetworkError: false, isCorsError: false, isTimeout: false,
                httpStatus, totalFileSizeMB: (totalFileSize / 1024 / 1024).toFixed(2)
            });

            if (httpStatus === 401 || httpStatus === 403) {
                throw new Error(`AUTH_ERROR: Your session has expired. Please log out, log in again, and retry.`);
            }
            if (httpStatus === 413) {
                throw new Error(`FILE_TOO_LARGE: Your uploaded files are too large (${(totalFileSize / 1024 / 1024).toFixed(1)} MB total). Please reduce file sizes and try again.`);
            }
            if (httpStatus >= 500) {
                throw new Error(`SERVER_ERROR: The server encountered an error (${httpStatus}). Please try again in a few minutes.`);
            }
            throw new Error(`Server returned ${httpStatus}: ${errorText.substring(0, 200) || 'Unknown error'}`);
        }

        // ── 8. Parse JSON ───────────────────────────────────────────────────
        const response: any = await rawResponse.json().catch((jsonErr: any) => {
            console.error("[SUBMIT] JSON parse failed:", jsonErr?.message);
            throw new Error(`JSON_PARSE_ERROR: Server responded but returned invalid data. Please try again.`);
        });

        console.log("[SUBMIT] ✅ Response JSON:", JSON.stringify(response).substring(0, 400));

        if (response.success || response.status === "200" || response.status === 200 ||
            response.message === "Message sent Successfully" || response.message?.toLowerCase().includes("success")) {
            console.log("[SUBMIT] 🎉 Profile updated successfully!");
            // Clear the browser draft on successful submit — no longer needed
            try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
            draftStatus.value = 'idle';
            if (isSilent !== true) {
                showAlert("Success", "Profile updated successfully!", "success");
            }
            await reportClientError("myaccount - handleFinalSubmit success", null, { errorName: 'SUCCESS', errorData: response, userInfo: { email: formData.email || 'Unknown', userId: String(userId.value || '') } });
            await fetchStudentDetail();
        } else {
            console.error("[SUBMIT] Backend returned failure:", response);
            if (isSilent !== true) {
                showAlert("Failed to update profile", response.message || "Unknown error from server.", "error");
            }
        }

    } catch (err: any) {
        console.error("[SUBMIT] ❌ Outer catch:", err?.name, err?.message);
        const rawMsg: string = err?.message || String(err);
        let alertTitle = "Submission Failed";
        let userFacingMsg = "An unexpected error occurred. Please try again.";

        if (rawMsg.startsWith("TIMEOUT:")) { alertTitle = "Upload Timed Out"; userFacingMsg = rawMsg.replace("TIMEOUT: ", ""); }
        else if (rawMsg.startsWith("NETWORK_ERROR:")) { alertTitle = "Connection Error"; userFacingMsg = rawMsg.replace("NETWORK_ERROR: ", ""); }
        else if (rawMsg.startsWith("CORS_ERROR:")) { alertTitle = "Browser Security Error"; userFacingMsg = rawMsg.replace("CORS_ERROR: ", ""); }
        else if (rawMsg.startsWith("AUTH_ERROR:")) { alertTitle = "Session Expired"; userFacingMsg = rawMsg.replace("AUTH_ERROR: ", ""); }
        else if (rawMsg.startsWith("FILE_TOO_LARGE:")) { alertTitle = "Files Too Large"; userFacingMsg = rawMsg.replace("FILE_TOO_LARGE: ", ""); }
        else if (rawMsg.startsWith("SERVER_ERROR:")) { alertTitle = "Server Error"; userFacingMsg = rawMsg.replace("SERVER_ERROR: ", ""); }
        else if (rawMsg.startsWith("JSON_PARSE_ERROR:")) { alertTitle = "Response Error"; userFacingMsg = rawMsg.replace("JSON_PARSE_ERROR: ", ""); }
        else if (err?.data) {
            if (typeof err.data === 'object') {
                const firstKey = Object.keys(err.data)[0];
                userFacingMsg = Array.isArray(err.data[firstKey])
                    ? `${firstKey}: ${err.data[firstKey][0]}`
                    : (err.data.message || JSON.stringify(err.data));
            } else { userFacingMsg = err.data; }
        } else if (rawMsg) { userFacingMsg = rawMsg; }

        // Only log to server if not already logged in the inner catch
        const alreadyLogged = ["TIMEOUT:", "NETWORK_ERROR:", "CORS_ERROR:", "AUTH_ERROR:", "FILE_TOO_LARGE:", "SERVER_ERROR:", "JSON_PARSE_ERROR:"]
            .some(prefix => rawMsg.startsWith(prefix));
        if (!alreadyLogged) {
            await sendErrorLog({
                context: 'handleFinalSubmit - outer catch (unexpected)',
                errorMessage: userFacingMsg, errorName: err?.name || 'UnknownError',
                errorData: err?.data || rawMsg, errorStack: err?.stack || 'No stack',
                isNetworkError: false, isCorsError: false, isTimeout: false, httpStatus: 0
            });
        }

        if (isSilent !== true) {
            showAlert(alertTitle, userFacingMsg, "error");
        }
    } finally {
        isSubmitting.value = false;
    }
}




const isDownloadingReport = ref(false);
const downloadReport = async () => {
    isDownloadingReport.value = true;
    try {
        const { getAccessToken } = useAuth();
        const token = getAccessToken();
        const response = await fetch(`${config.public.apiBase}/api/students/student-score-card-download/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });

        if (response.ok) {
            const result = await response.json();
            const reportUrl = result.data?.report_url || result.report_url || result.data?.score_card;
            if (reportUrl) {
                window.open(reportUrl, '_blank');
            } else {
                showAlert("Error", "No report URL found in the response.", "error");
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to download report");
        }
    } catch (err: any) {
        console.error("Failed to download report:", err);
        showAlert("Download Failed", err.message || "Failed to download report. Please try again.", "error");
    } finally {
        isDownloadingReport.value = false;
    }
};
</script>

<style scoped>
/* ─── Profile Banner Section ────────────────────────────────── */
.profile-banner-section {
    background-color: #F3F4F6;
}

.profile-banner-card {
    border-radius: 20px;
}

.profile-banner-bg {
    background: linear-gradient(90deg, #1A0B2E 0%, #30104A 100%);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 200px;
    position: relative;
}

.profile-banner-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: v-bind('`url(${heroBg})`');
    background-size: repeat;
    background-position: center;
    opacity: 0.15;
    pointer-events: none;
}

.profile-image-container {
    position: relative;
    width: 130px;
    height: 130px;
    cursor: pointer;
}

.progress-ring-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

.profile-image-inner {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    background: #4B1A45;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
}

.profile-image-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.progress-badge-pill {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: #872980;
    padding: 2px 14px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 800;
    z-index: 2;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.profile-name-text {
    color: #F5F3FF;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.application-id-badge {
    background: #8F037E !important;
    color: rgba(255, 255, 255, 0.9);
    padding: 6px 20px;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 500;
    /* backdrop-filter: blur(4px); */
}

.profile-meta-info {
    color: #F5F3FF;
    font-size: 15px;
    font-weight: 500;
}

.status-pill {
    padding: 6px 20px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
}

.report-download-btn {
    background: #872980;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(135, 41, 128, 0.25);
}

.report-download-btn:hover {
    background: #72226c;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(135, 41, 128, 0.35);
}

.report-download-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.status-incomplete {
    background: #9E800C;
    color: #FDFFF7;
    border: 1px solid rgba(234, 179, 8, 0.3);
}

.status-complete {
    background: #9E800C;
    color: #FDFFF7;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.upload-spinner-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.completeness-header {
    background-color: #1D011F;

}

.completion-percent {
    color: #C971FF;
}

.custom-progress-track {
    height: 10px;
    background: #E2E8F0 !important;
    border-radius: 10px;
}

.custom-progress-fill {
    background-color: #B13AFB;
    border-radius: 10px;
}

.completeness-body {
    background-color: white;
}

.completeness-footer {
    background-color: #F5F3FF;
    border-top: 2px solid #F1F5F9;
}

.completion-checklist li {
    border-color: #F8F9FA !important;
}

.completion-checklist li:last-child {
    border-bottom: none !important;
}

.completeness-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #CBD5E1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #CBD5E1;
}

.completeness-icon.is-done {
    background-color: #DCFCE7;
    border-color: #DCFCE7;
    color: #16A34A;
}

.completeness-icon .pending-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #CBD5E1;
}

.badge-done {
    background-color: #F0FDF4;
    color: #16A34A;
    font-weight: 600;
    font-size: 12px;
    padding: 6px 12px;
}

.badge-pending {
    background-color: #F1F5F9;
    color: #64748B;
    font-weight: 600;
    font-size: 12px;
    padding: 4px 12px;
}

/* ─── Submit Section Styling ────────────────────────────── */
.pill-submit-btn {
    background: #A03F99;
    color: white;
    border-radius: 50px;
    padding: 12px 60px;
    font-weight: 700;
    border: none;
    box-shadow: 0 10px 20px rgba(135, 41, 128, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.pill-submit-btn:hover {
    background: #72226c;
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(135, 41, 128, 0.3);
}

.pill-submit-btn:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    box-shadow: none;
}

/* ─── Sidebar Styling ────────────────────────────────────── */
.bg-success-soft {
    background-color: #ECFDF5;
}

.check-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #D1D5DB;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #9CA3AF;
}

.check-icon.completed {
    background-color: #10B981;
    border-color: #10B981;
    color: white;
}

.completion-checklist li {
    border-bottom: 2px solid #F8FAFC;
    padding-bottom: 12px;
}

.completion-checklist li:last-child {
    border-bottom: none;
}

/* ─── Accordion Refinements ───────────────────────────────── */
.accordion-section {
    background: #fff;
    border-radius: 12px !important;
    border: none !important;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.accordion-section.active {
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.08);
}

.accordion-header {
    padding: 24px 28px !important;
}

.accordion-icon {
    background: #F3E8FF !important;
    width: 32px !important;
    height: 32px !important;
    border-radius: 8px !important;
}

.accordion-icon i {
    font-size: 18px !important;
    color: #872980 !important;
}

.accordion-header h4 {
    font-size: 18px !important;
    font-weight: 700 !important;
    color: #374151 !important;
    margin: 0 !important;
}

/* ─── Accordion ───────────────────────────────────────────── */
.profile-accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.accordion-section {
    background: #fff;
    border-radius: 14px;
    border: 1.5px solid #e8e0f8;
    overflow: hidden;
    transition: box-shadow 0.25s ease;
}

.accordion-section.active {
    border-color: #7c3aed;
    box-shadow: 0 4px 24px rgba(124, 58, 237, 0.10);
}

.accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
}

.accordion-header:hover {
    background: #faf7ff;
}

.accordion-header-left h4 {
    /* display: flex;
    align-items: center;
    gap: 16px; */
    font-size: 20px;
}

.accordion-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.accordion-icon i {
    font-size: 22px;
    color: #7c3aed;
}

.accordion-header-left h5 {
    font-size: 16px;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 2px;
}

.accordion-header-left p {
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
}

.accordion-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.accordion-body {
    border-top: 1px solid #f0ebff;
}

.section-divider {
    height: 1px;
    background: #f0ebff;
    margin: 0 24px;
}

.submit-btn {
    width: 500px;
}


/* Custom Tooltip styling */
.custom-tooltip-wrapper {
    position: relative;
    cursor: pointer;
    pointer-events: auto !important;
}

.btn-disabled-custom {
    opacity: 0.65;
    cursor: not-allowed !important;
    pointer-events: auto !important;
}

.custom-tooltip-content {
    visibility: hidden;
    opacity: 0;
    width: 260px;
    background-color: #A13E99;
    /* background-color: #872980; */
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 12px;
    position: absolute;
    z-index: 1060;
    bottom: 120%;
    left: 50%;
    margin-left: -130px;
    font-size: 13px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: opacity 0.3s, visibility 0.3s;
    pointer-events: none;
}

.custom-tooltip-content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

.custom-tooltip-wrapper:hover .custom-tooltip-content {
    visibility: visible;
    opacity: 1;
}

.custom-declaration .form-check-input:checked {
    background-color: #872980;
    border-color: #872980;
}

.custom-declaration .form-check-input {
    cursor: pointer;
    width: 1.25em;
    height: 1.25em;
}

.custom-declaration .form-check-label {
    cursor: pointer;
    user-select: none;
}

.cursor-not-allowed {
    cursor: not-allowed !important;
}

.edit-icon-btn {
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: background 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
}

.edit-icon-btn:hover {
    background: #e0e7ff;
    border-color: #c7d2fe;
    transform: translateY(-1px);
}

.edit-icon-btn:active {
    transform: translateY(0);
}



.kit-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15) !important;
    border-color: #7c3aed !important;
}

/* ─── Calendar Styling ────────────────────────────────────── */
.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    text-align: center;
}

.calendar-day-header {
    font-size: 11px;
    text-transform: uppercase;
    padding-bottom: 4px;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    border-radius: 6px;
    cursor: default;
    color: #94a3b8;
    background: transparent;
}

.calendar-day.empty {
    background: transparent;
}

.calendar-day.disabled {
    opacity: 0.5;
    background: #f8fafc;
}

.calendar-day.blocked {
    background: #fee2e2;
    color: #ef4444;
    cursor: pointer;
    font-weight: 600;
}

.calendar-day.allowed {
    background: #ede9fe;
    color: #7c3aed;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.calendar-day.allowed:hover {
    background: #ddd6fe;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    border-radius: 6px;
    cursor: default;
    color: #94a3b8;
    background: transparent;
    position: relative;
    padding-bottom: 4px;
}

.calendar-day.empty {
    background: transparent;
}

.calendar-day.disabled {
    opacity: 0.5;
    background: #f8fafc;
}

.calendar-day.blocked {
    background: #fee2e2;
    color: #ef4444;
    cursor: pointer;
    font-weight: 600;
}

.calendar-day.allowed {
    background: #ede9fe;
    color: #7c3aed;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.calendar-day.allowed:hover {
    background: #ddd6fe;
}

.calendar-day.selected {
    background: #872980 !important;
    color: #fff !important;
    box-shadow: 0 4px 12px rgba(135, 41, 128, 0.35);
    z-index: 2;
    border-radius: 6px !important;
    border: none !important;
}

.calendar-day.is-current {
    background: #ffffff !important;
    border: 2.5px solid #872980 !important;
    color: #872980 !important;
    font-weight: 800 !important;
    border-radius: 6px !important;
    position: relative;
    z-index: 1;
}

.calendar-day.is-current.selected {
    background: #872980 !important;
    color: #fff !important;
    border: 2px solid #872980 !important;
    box-shadow: 0 0 0 2px #fff inset, 0 4px 12px rgba(135, 41, 128, 0.35);
}

.btn-current-slot {
    border: 2px solid #872980 !important;
    background-color: #fcf5fc !important;
    color: #872980 !important;
    font-weight: 700 !important;
}

.btn-current-slot.btn-primary {
    border-color: #ffffff !important;
    background-color: #872980 !important;
    color: #ffffff !important;
}

.custom-primary-bg {
    background-color: #872980 !important;
    border-color: #872980 !important;
}

.custom-primary-bg:hover {
    background-color: #6d1e67 !important;
    border-color: #6d1e67 !important;
}

.border-dashed {
    border-style: dashed !important;
}

.disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0);
    /* Ensure it's a solid block for clicks */
}

/* Custom Modal Styles */
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: none;
}

.custom-modal {
    background: #fff;
    border-radius: 12px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    animation: modalFadeIn 0.3s ease;
}

.custom-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    background: #fafafa;
}

.custom-modal-body {
    padding: 24px 20px;
    font-size: 16px;
    color: #333;
}

.custom-modal-footer {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    background: #fafafa;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section-complete-check {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #DEF9ED;
    color: #10B981;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border: 1.5px solid #10B981;
}

@media (max-width: 991px) {
    .profile-name-text {
        font-size: 24px !important;
    }

    .status-pill.d-lg-none {
        padding: 4px 12px;
        font-size: 11px;
        border-radius: 50px;
    }

    .application-id-badge {
        font-size: 13px !important;
        padding: 4px 15px !important;
    }

    .profile-meta-info {
        justify-content: center !important;
        gap: 15px !important;
        font-size: 11px !important;
        flex-wrap: wrap !important;
        /* Allow city to wrap below the contact row if needed */
    }

    .mobile-contact-row {
        flex-wrap: nowrap !important;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
    }

    .mobile-contact-row::-webkit-scrollbar {
        display: none;
    }

    .status-pill.d-lg-none {
        padding: 4px 12px;
        font-size: 11px;
        border-radius: 50px;
        white-space: nowrap;
    }
}
</style>

<template>
    <div class="document-upload-section">
        <div class="alert alert-info py-2 mb-4 border-0 bg-light-info">
            <small class="fw-medium">
                <i class="ti ti-info-circle me-1"></i>
                Files upload as soon as you choose them (max 2MB per file, 5MB for Resume). Aadhaar, the marksheets
                and Other Documents take several files: front and back, every semester.
            </small>
        </div>
        <div v-if="locked" class="alert alert-warning py-2 mb-4">
            <small><i class="ti ti-lock me-1"></i> Your profile is locked after the declaration. Contact your counsellor to change a document.</small>
        </div>
        <div v-if="loadError" class="alert alert-danger py-2 mb-4">
            <small>{{ loadError }} <a href="#" @click.prevent="loadDocuments">Try again</a></small>
        </div>
        <div v-if="slots.length" class="docs-summary mb-3">
            <i class="ti ti-files me-1"></i>
            {{ totalFiles }} file{{ totalFiles === 1 ? '' : 's' }} uploaded in {{ filledSlots }} of {{ slots.length }} documents
        </div>

        <div class="row g-4">
            <div v-for="slot in slots" :key="slot.type" class="col-md-6">
                <div class="upload-field mb-0" :data-field="fieldOf(slot.type)">
                    <label class="form-label fw-bold">
                        {{ slot.label }} <span v-if="isRequired(slot.type)">*</span>
                        <em class="count-chip" :class="{ 'count-chip-done': slot.files.length }">
                            {{ slot.files.length ? `${slot.files.length} file${slot.files.length > 1 ? 's' : ''}` : 'No file' }}
                        </em>
                    </label>
                    <div class="slot-hint">
                        {{ formats(slot) }} · max {{ slot.maxMb }}MB
                        <template v-if="slot.maxFiles > 1"> · {{ slot.files.length }} of up to {{ slot.maxFiles }} files</template>
                    </div>

                    <ul v-if="slot.files.length" class="file-list">
                        <li v-for="file in slot.files" :key="file.id" class="file-row">
                            <i class="ti ti-file-text file-icon"></i>
                            <a v-if="file.url" :href="file.url" target="_blank" class="file-name" :title="file.fileName">{{ file.fileName }}</a>
                            <span v-else class="file-name">{{ file.fileName }}</span>
                            <span v-if="file.source === 'crm'" class="badge-soft">Added by counsellor</span>
                            <span v-if="file.pending" class="badge-soft badge-wait" title="Will reach your counsellor with your next save">Pending</span>
                        </li>
                    </ul>

                    <ul v-if="uploading[slot.type] && uploading[slot.type].length" class="file-list">
                        <li v-for="item in uploading[slot.type]" :key="item.key" class="file-row">
                            <i class="ti ti-upload file-icon"></i>
                            <span class="file-name">{{ item.name }}</span>
                            <div class="progress flex-grow-1" style="height: 6px; max-width: 120px;">
                                <div class="progress-bar" :style="{ width: item.progress + '%' }"></div>
                            </div>
                            <small class="text-muted">{{ item.progress }}%</small>
                        </li>
                    </ul>

                    <div class="mt-2" v-if="canAdd(slot)">
                        <label class="btn btn-sm btn-outline-primary mb-0" :class="{ 'is-invalid': errors[fieldOf(slot.type)] }">
                            <i class="ti" :class="slot.maxFiles > 1 ? 'ti-plus' : (slot.files.length ? 'ti-refresh' : 'ti-upload')"></i>
                            {{ slot.maxFiles > 1 ? (slot.files.length ? 'Add more files' : 'Upload files') : (slot.files.length ? 'Replace file' : 'Upload file') }}
                            <input type="file" class="d-none" :multiple="slot.maxFiles > 1" :accept="slot.accept.join(',')"
                                :disabled="isBusy(slot.type)" @change="onPicked(slot, $event)">
                        </label>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors[fieldOf(slot.type)]">{{ errors[fieldOf(slot.type)] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// CRM document type -> the website's field key (formData.existingDocuments / documents, the profile API's fields)
const FIELD_OF = {
    aadhaar: 'aadhaar',
    pan: 'pancard',
    class10_marksheet: 'dob_proof',
    class12_marksheet: 'twelveth_marksheet',
    graduation_marksheet: 'graduation_certificate',
    photo: 'photo',
    signature: 'signature',
    resume: 'resume',
    other: 'other_documents'
};

export default {
    name: "DocumentUpload",
    props: {
        formData: {
            type: Object,
            required: true
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        resumeKeyStatus: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const config = useRuntimeConfig();
        const { getAccessToken } = useAuth();
        return { apiBase: config.public.apiBase, getAccessToken };
    },
    data() {
        return {
            errors: {},
            slots: [],
            uploading: {},
            locked: false,
            loadError: ''
        };
    },
    computed: {
        // The graduation result applies (and is mandatory) once the UG is Completed
        graduationRequired() {
            return String(this.formData.ug_status) === '1';
        },
        totalFiles() {
            return this.slots.reduce((n, slot) => n + slot.files.length, 0);
        },
        filledSlots() {
            return this.slots.filter(slot => slot.files.length).length;
        }
    },
    mounted() {
        this.loadDocuments();
        // back on the tab: the counsellor may have added or deleted a file in the CRM meanwhile
        this.onVisible = () => {
            if (document.visibilityState === 'visible' && !Object.values(this.uploading).some(list => list && list.length)) {
                this.loadDocuments();
            }
        };
        document.addEventListener('visibilitychange', this.onVisible);
    },
    beforeUnmount() {
        document.removeEventListener('visibilitychange', this.onVisible);
    },
    methods: {
        fieldOf(type) {
            return FIELD_OF[type] || type;
        },
        formats(slot) {
            return slot.accept.map(a => a.slice(1).toUpperCase()).filter(a => a !== 'JPEG').join('/');
        },
        isRequired(type) {
            if (type === 'other') return false;
            if (type === 'resume') return !this.resumeKeyStatus;
            if (type === 'graduation_marksheet') return this.graduationRequired;
            return true;
        },
        isBusy(type) {
            return !!(this.uploading[type] && this.uploading[type].length);
        },
        canAdd(slot) {
            if (this.isDisabled || this.locked) return false;
            return slot.maxFiles === 1 || slot.files.length < slot.maxFiles;
        },
        headers() {
            const token = this.getAccessToken();
            return token ? { Authorization: `Bearer ${token}` } : {};
        },
        async loadDocuments() {
            this.loadError = '';
            try {
                const res = await $fetch(`${this.apiBase}/api/students/documents/`, { headers: this.headers() });
                const data = (res && res.data) || {};
                this.slots = data.documents || [];
                this.locked = !!data.locked;
                this.syncExisting();
            } catch (err) {
                this.loadError = 'Your documents could not be loaded.';
            }
        },
        // the page's completion and checks read formData.existingDocuments: the first file of each type
        syncExisting() {
            if (!this.formData.existingDocuments) this.formData.existingDocuments = {};
            for (const slot of this.slots) {
                const first = slot.files[0];
                this.formData.existingDocuments[this.fieldOf(slot.type)] = first ? (first.url || first.fileName) : null;
                if (this.formData.documents) this.formData.documents[this.fieldOf(slot.type)] = null; // nothing left to send
            }
        },
        uploadOne(type, file, item) {
            return new Promise(resolve => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${this.apiBase}/api/students/documents/`);
                const headers = this.headers();
                Object.keys(headers).forEach(h => xhr.setRequestHeader(h, headers[h]));
                xhr.upload.onprogress = e => {
                    if (e.lengthComputable) item.progress = Math.round((e.loaded * 100) / e.total);
                };
                xhr.onload = () => {
                    let body = {};
                    try { body = JSON.parse(xhr.responseText || '{}'); } catch (e) { body = {}; }
                    resolve({ ok: xhr.status < 300, body });
                };
                xhr.onerror = () => resolve({ ok: false, body: { detail: 'Network error, please try again.' } });
                const fd = new FormData();
                fd.append('type', type);
                fd.append('file', file);
                xhr.send(fd);
            });
        },
        message(body) {
            const value = body.file || body.type || body.detail || body.message || 'The file could not be uploaded.';
            return Array.isArray(value) ? value[0] : String(value);
        },
        async onPicked(slot, event) {
            const field = this.fieldOf(slot.type);
            const picked = Array.from(event.target.files || []);
            event.target.value = ''; // the same file can be picked again
            if (!picked.length) return;
            delete this.errors[field];

            const valid = [];
            for (const file of picked) {
                const ext = `.${(file.name.split('.').pop() || '').toLowerCase()}`;
                if (!slot.accept.includes(ext)) {
                    this.errors[field] = `${file.name}: only ${this.formats(slot)} allowed.`;
                } else if (file.size > slot.maxMb * 1024 * 1024) {
                    this.errors[field] = `${file.name}: file size exceeds ${slot.maxMb}MB limit.`;
                } else {
                    valid.push(file);
                }
            }
            const room = slot.maxFiles === 1 ? 1 : slot.maxFiles - slot.files.length;
            if (valid.length > room) {
                this.errors[field] = `${slot.label} takes ${slot.maxFiles} file${slot.maxFiles > 1 ? 's' : ''}: only the first ${room} were uploaded.`;
            }
            const batch = valid.slice(0, room);
            if (!batch.length) return;

            this.uploading[slot.type] = batch.map((file, i) => ({ key: `${Date.now()}-${i}`, name: file.name, progress: 0 }));
            for (const [i, file] of batch.entries()) {
                const { ok, body } = await this.uploadOne(slot.type, file, this.uploading[slot.type][i]);
                if (!ok) this.errors[field] = `${file.name}: ${this.message(body)}`;
            }
            this.uploading[slot.type] = [];
            await this.loadDocuments();
        },
        scrollToFirstError() {
            this.$nextTick(() => {
                const el = this.$el.querySelector('.is-invalid, .invalid-feedback');
                if (el && el.scrollIntoView) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        },
        validate() {
            this.errors = {};
            let isValid = true;
            for (const slot of this.slots) {
                if (this.isRequired(slot.type) && !slot.files.length) {
                    this.errors[this.fieldOf(slot.type)] = `${slot.label} is required`;
                    isValid = false;
                }
            }
            if (!this.slots.length) {
                // the list could not be loaded: fall back to what the page already knows
                const existing = this.formData.existingDocuments || {};
                ['aadhaar', 'pan', 'class10_marksheet', 'class12_marksheet', 'photo', 'signature', 'resume', 'graduation_marksheet']
                    .filter(type => this.isRequired(type))
                    .forEach(type => {
                        if (!existing[this.fieldOf(type)]) {
                            this.errors[this.fieldOf(type)] = 'This document is required';
                            isValid = false;
                        }
                    });
            }
            return isValid;
        }
    }
};
</script>

<style scoped>
.form-label {
    font-size: 12px;
    font-weight: 600;
    color: #4B5563;
    margin-bottom: 4px;
}

.form-label span {
    color: #ef4444;
}

.slot-hint {
    font-size: 11px;
    color: #9CA3AF;
    margin-bottom: 8px;
}

.docs-summary {
    font-size: 13px;
    font-weight: 600;
    color: #4B5563;
}

.form-label .count-chip {
    font-style: normal;
    font-size: 11px;
    font-weight: 600;
    margin-left: 6px;
    padding: 1px 8px;
    border-radius: 999px;
    background-color: #F3F4F6;
    color: #6B7280;
}

.form-label .count-chip-done {
    background-color: #ECFDF5;
    color: #047857;
}

.bg-light-info {
    background-color: #F0F9FF;
    color: #0369A1;
    border: 1px solid #E0F2FE !important;
    border-radius: 10px;
}

.file-list {
    list-style: none;
    padding: 0;
    margin: 0 0 6px;
}

.file-row {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 8px 12px;
    margin-bottom: 6px;
    font-size: 13px;
    min-width: 0;
}

.file-icon {
    color: #9CA3AF;
    font-size: 16px;
}

.file-name {
    color: #872980;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
}

.badge-soft {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    background-color: #FAF5FF;
    color: #872980;
    white-space: nowrap;
}

.badge-wait {
    background-color: #FFFBEB;
    color: #B45309;
}

.progress-bar {
    background-color: #872980;
}

.btn-outline-primary {
    color: #872980;
    border-color: #E9D5FF;
    background-color: #FAF5FF;
    font-weight: 600;
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
}

.btn-outline-primary:hover {
    background-color: #872980;
    border-color: #872980;
    color: #fff;
}

.btn-outline-primary.is-invalid {
    border-color: #ef4444;
}
</style>

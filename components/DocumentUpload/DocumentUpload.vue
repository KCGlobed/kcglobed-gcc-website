<template>
  <div class="document-warp pb-100">
    <div class="container">
      <div class="document-content">
        <h4>
          Upload educational and English proficiency documents to the folders
          below
        </h4>
        <p>
          Please click on the download button to preview each document ensuring
          the document has been uploaded successfully and can be read
          clearly.Within each section, please upload documents as one file not
          exceeding 10MB using the following file types: PDF, JPG, PNG, GIF, DOC
          and DOCX
        </p>
      </div>
      <div class="image-input-box">
        <label class="label">
          <span class="browse-files">
            Senior High School Education Documents
          </span>
          <input type="file" class="default-file-input" />
          <span class="browse-files-text">
            <img src="~/assets/img/svgs/input-image.svg" alt="icon" />
          </span>
        </label>
      </div>
      <div class="image-input-box">
        <label class="label">
          <span class="browse-files">University Education Documents </span>
          <input type="file" class="default-file-input" />
          <span class="browse-files-text">
            <img src="~/assets/img/svgs/input-image.svg" alt="icon" />
          </span>
        </label>
      </div>
      <div class="image-input-box">
        <label class="label">
          <span class="browse-files">
            English Language Proficiency Documents
          </span>
          <input type="file" class="default-file-input" />
          <span class="browse-files-text">
            <img src="~/assets/img/svgs/input-image.svg" alt="icon" />
          </span>
        </label>
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
  name: "DocumentUpload",
};
</script>

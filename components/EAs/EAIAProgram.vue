<template>
    <div class="ia-program-area ptb-100">
        <div class="container">
            <div class="section-title text-center mb-50">
                <h2 class="title">I-Gen Pathway for <span class="highlight">New Tomorrow</span></h2>
            </div>
        </div>
        <div class="inner-container">
            <img src="../../assets/img/EA-img/EA-table.png" alt="">

        </div>
    </div>
</template>

<script setup>
// No reactive data needed for this static design
</script>

<style scoped>
.ia-program-area {
    width: 100%;
    background-color: #f3f4f6;
}

.inner-container {
    /* width: 95%; */
    width: 1000px;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
}

.section-title {
    margin-bottom: 50px;
}

.title {
    font-size: 32px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 20px;
    text-transform: uppercase;
    position: relative;
}

.title::after {
    content: "";
    display: block;
    width: 70px;
    height: 4px;
    background: #F1A63E;
    margin: 15px auto 0;
    border-radius: 10px;
}

.highlight {
    color: #F1A63E;
}

.rounded-12 {
    border-radius: 12px;
}

.bg-brand-dark {
    background-color: #380b40;
}

.bg-brand-accent {
    background-color: #7a1c62;
}

.text-brand-dark {
    color: #380b40;
}

.text-brand-accent {
    color: #7a1c62;
}

.text-gray-900 {
    color: #111827;
}

.font-bold {
    font-weight: 700;
}

.writing-vertical {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
}

.border-top {
    border-top: 1px solid #e5e7eb !important;
}

.border {
    border: 1px solid #e5e7eb !important;
}

.module-list {
    font-size: 16px;
}

.bullet-point {
    font-size: 20px;
    line-height: 1;
}

/* Custom Table Layout Styles */
.program-table {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.program-table-header {
    border-bottom: 1px solid #e5e7eb;
}

.header-duration {
    width: 80px;
    flex-shrink: 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}

.header-program {
    font-size: 18px;
    padding: 15px 20px !important;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-empty {
    width: 220px;
    flex-shrink: 0;
    background-color: transparent;
    border-bottom: 1px solid #e5e7eb;
}

.table-main-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.table-rows-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    
}

.table-row {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #e9e9e9;
}

.row-duration {
    width: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
}

.row-content {
    flex-grow: 1;
    border-left: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
}

.table-spanned-col {
    width: 220px;
    flex-shrink: 0;
    border-left: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spanned-text {
    font-size: 16px;
    line-height: 1.4;
}

.british-council {
    font-weight: 700;
    font-size: 16px;
}

.english-work {
    font-weight: 700;
    font-size: 16px;
}

.weeks-info {
    font-weight: 700;
    color: #7a1c62;
}

.credit-info {
    color: #6b7280;
}

/* Responsive Styles */
@media (max-width: 991px) {
    .header-empty {
        width: 180px;
    }

    .table-spanned-col {
        width: 180px;
    }
}

@media (max-width: 767px) {
    .title {
        font-size: 24px;
        line-height: 32px;
    }

    .section-title {
        margin-bottom: 30px;
    }

    .ia-program-area {
        padding: 40px 0px;
    }

    .program-table-header {
        flex-direction: column;
    }

    .header-duration {
        display: none;
    }

    .header-empty {
        display: none;
    }

    .header-program {
        width: 100%;
        font-size: 16px;
        text-align: center;
    }

    .table-main-wrapper {
        flex-direction: column;
    }

    .table-row {
        flex-direction: column;
    }

    .row-duration {
        width: 100%;
        min-height: auto;
        padding: 10px !important;
    }

    .row-duration .writing-vertical {
        writing-mode: horizontal-tb;
        transform: none;
    }

    .row-content {
        border-left: none;
        padding: 20px !important;
    }

    .table-spanned-col {
        width: 100%;
        border-left: none;
        border-top: 1px solid #e5e7eb;
        padding: 30px !important;
    }
}

@media (min-width: 768px) {
    .hidden-md-down {
        display: flex !important;
    }
}

/* ================================
   RESPONSIVE TABLE CSS
================================ */

/* Tablet */
@media (max-width: 1024px) {
    .inner-container {
        width: 100%;
        max-width: 1000px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .table-spanned-col {
        width: 180px;
    }

    .header-program {
        font-size: 16px;
    }

    .module-list {
        font-size: 14px;
    }
}


/* Mobile */
@media (max-width: 767px) {
    .ia-program-area {
        padding: 40px 0;
    }

    .inner-container {
        width: 100%;
        padding-left: 12px;
        padding-right: 12px;
    }

    .section-title {
        margin-bottom: 25px;
        padding: 0 15px;
    }

    .title {
        font-size: 22px;
        line-height: 1.4;
        margin-bottom: 15px;
    }

    /* Header */
    .program-table-header {
        display: block !important;
    }

    .header-duration,
    .hidden-md-down,
    .header-empty {
        display: none !important;
    }

    .header-program {
        width: 100%;
        padding: 15px 12px !important;
        font-size: 14px;
        line-height: 1.5;
    }

    /* Stack right column below rows */
    .table-main-wrapper {
        display: flex;
        flex-direction: column;
    }

    .table-rows-container {
        width: 100%;
    }

    /*
      Keep Duration + Content side by side.
      This looks more like a table than stacking
      the duration above every row.
    */
    .table-row {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .row-duration {
        width: 55px;
        min-width: 55px;
        min-height: 150px;
        padding: 10px 5px !important;
    }

    .row-duration .writing-vertical {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        font-size: 12px;
    }

    .row-content {
        width: calc(100% - 55px);
        padding: 16px 12px !important;
        border-left: 1px solid #e5e7eb;
    }

    /* Force Bootstrap columns to stack */
    .row-content .row {
        margin: 0;
    }

    .row-content .col-md-6 {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        margin-bottom: 10px;
    }

    .row-content .col-md-6:last-child {
        margin-bottom: 0;
    }

    .module-list {
        font-size: 14px;
    }

    .module-list li {
        line-height: 1.5;
    }

    .bullet-point {
        font-size: 18px;
        flex-shrink: 0;
    }

    /* British Council section */
    .table-spanned-col {
        width: 100%;
        min-height: auto;
        padding: 25px 15px !important;
        border-left: none !important;
        border-top: 2px solid #888 !important;
    }

    .british-council,
    .english-work {
        font-size: 15px;
    }

    .weeks-info {
        font-size: 18px;
    }
}


/* Very Small Mobile */
@media (max-width: 400px) {
    .inner-container {
        padding-left: 8px;
        padding-right: 8px;
    }

    .title {
        font-size: 19px;
        line-height: 1.4;
    }

    .header-program {
        font-size: 13px;
        padding: 12px 8px !important;
    }

    .row-duration {
        width: 45px;
        min-width: 45px;
    }

    .row-content {
        width: calc(100% - 45px);
        padding: 14px 10px !important;
    }

    .module-list {
        font-size: 13px;
    }

    .row-duration .writing-vertical {
        font-size: 11px;
    }

    .table-spanned-col {
        padding: 20px 10px !important;
    }
}
</style>

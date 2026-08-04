<template>
    <div class="pathway-success-section">
        <div class="container w">
            <!-- Header -->
            <div class="section-header text-center mb-60">
                <h2 class="title">Pathway To Your Success</h2>
                <!-- <p class="subtitle max-800 mx-auto">
                    Your journey from preparation to professional excellence. Follow these steps to secure your future
                    at
                    the heart of the corporate world.
                </p> -->
                <img src="../../assets/newimages/successPath.png" alt="">
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
// No logic needed mostly static content
</script>

<style scoped>
.pathway-success-section {
    padding: 73px 0;
    background-color: #eeeeee;
    overflow: hidden;
}

/* Header Styles */
.section-header .title {
    font-size: 36px;
    font-weight: 700;
    color: #0d0d25;
    margin-bottom: 50px;
    /* text-transform: uppercase; */
    line-height: 1.3;
}

.section-header .highlight {
    color: #F1A63E;
    /* Purple color from design title */
}

.section-header .subtitle {
    font-size: 16px;
    font-weight: 500;
    color: #64748b;
    line-height: 1.6;
}

.max-800 {
    max-width: 800px;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

/* Timeline Container */
.timeline-container {
    position: relative;
    max-width: 1000px;
    margin: 50px auto 0;
    padding: 20px 0;
}

/* Center Dotted Line */
.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background-image: linear-gradient(to bottom, #cbd5e1 50%, transparent 50%);
    background-size: 2px 20px;
    background-repeat: repeat-y;
    transform: translateX(-50%);
    z-index: 1;
}

/* Timeline Row */
.timeline-row {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
    z-index: 2;
}

.timeline-row:last-child {
    margin-bottom: 0;
}

.timeline-content {
    width: 45%;
    position: relative;
}

/* Marker Circle */
.timeline-marker {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.marker-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    box-shadow: 0 0 0 5px #fff;
    /* White border effect */
}

/* Content Text */
.content-text h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
}

.content-text p {
    font-size: 15px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
}

/* Color Classes (Text) */
.timeline-row:nth-child(2) .content-text h3 {
    color: #5b21b6;
}

/* Purple */
.timeline-row:nth-child(3) .content-text h3 {
    color: #831843;
}

/* Maroon */
.timeline-row:nth-child(4) .content-text h3 {
    color: #d97706;
}

/* Orange/Gold */
.timeline-row:nth-child(5) .content-text h3 {
    color: #1e3a8a;
}

/* Deep Blue */
.timeline-row:nth-child(6) .content-text h3 {
    color: #c2410c;
}

/* Red/Orange */


/* Marker Colors */
.color-1 {
    background-color: #5b21b6;
}

.color-2 {
    background-color: #701a75;
}

.color-3 {
    background-color: #d97706;
}

.color-4 {
    background-color: #1e1b4b;
}

.color-5 {
    background-color: #c2410c;
}


/* Feature Cards */
.feature-card {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 12px;
    color: #fff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    width: 100%;
    max-width: 400px;
}

/* .text-start .feature-card rule removed */

.text-end .feature-card {
    margin-left: auto;
    /* Push to right */
}


.feature-card:hover {
    transform: translateY(-5px);
}

.feature-card .icon-wrapper {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    flex-shrink: 0;
}

.feature-card .icon-wrapper i {
    font-size: 24px;
    color: #fff;
}

.feature-card h4 {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.4;
    text-align: left;
}

/* Card Backgrounds */
.color-1-bg {
    background-color: #5b21b6;
}

.color-2-bg {
    background-color: #701a75;
}

.color-3-bg {
    background-color: #d97706;
}

.color-4-bg {
    background-color: #1e1b4b;
}

.color-5-bg {
    background-color: #c2410c;
}


/* Responsive Design */
@media (max-width: 1200px) {
    .section-header .title {
        font-size: 28px;
    }
}

@media (max-width: 991px) {
    .timeline-content {
        width: 42%;
    }

    .marker-circle {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }

    .feature-card {
        padding: 15px;
    }

    .feature-card h4 {
        font-size: 16px;
    }

    .section-header .title {
        font-size: 24px;
    }
}

@media (max-width: 767px) {
    .timeline-line {
        left: 20px;
    }

    .timeline-row,
    .timeline-row.reverse {
        flex-direction: column;
        align-items: flex-start;
        margin-left: 0;
        gap: 15px;
        margin-bottom: 40px;
    }

    .timeline-marker {
        width: auto;
        position: absolute;
        left: 0;
        top: 0;
    }

    .marker-circle {
        width: 40px;
        height: 40px;
        box-shadow: none;
    }

    .timeline-content {
        width: 100%;
        padding-left: 60px;
        /* Make space for the marker on left */
        text-align: left !important;
    }

    .text-end .feature-card {
        margin-left: 0;
    }

    .content-text {
        text-align: left;
        margin-bottom: 10px;
    }

    /* Reorder for mobile flow: Text first, then Card? Use flex order if needed */
    /* Currently layout is: 
       Row 1: Text -> Marker -> Card
       Row 2 (Reverse): Card -> Marker -> Text
       
       On mobile we want consistent flow.
       Let's use Order property.
    */
    .timeline-row {
        position: relative;
    }

    /* Force all text sections to appear above cards using flex order or visual flow */
    /* Easier hack: Since timeline is linear, we can just pad left. But layout differs per row type. */

    /* Row 1 normal: Text (Left), Marker (Center), Card (Right) 
       Mobile: Marker (Left Abs), Text (Pad Left), Card (Pad Left below text)
    */

    /* Target specific children */
    .timeline-row>div:nth-child(1) {
        /* Left side content */
        order: 2;
        margin-bottom: 10px;
    }

    .timeline-row>div:nth-child(2) {
        /* Marker */
        order: 1;
    }

    .timeline-row>div:nth-child(3) {
        /* Right side content */
        order: 3;
    }

    /* For Reverse Row: Card (Left), Marker (Center), Text (Right) */
    .timeline-row.reverse>div:nth-child(1) {
        order: 3;
        /* Card goes last visually? Or first? */
        /* Let's stack: Text (Title) -> Card (Action) */
    }

    .timeline-row.reverse>div:nth-child(3) {
        order: 2;
        /* Text goes before card */
        margin-bottom: 10px;
    }

    /* Adjust content widths for mobile */
    .timeline-content {
        width: 100%;
    }

}
</style>

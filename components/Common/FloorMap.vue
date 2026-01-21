<template>

    <div class="floor-map">

        <div class="container">
            <div class="section-title">
                <h3>Campus Floor Plan</h3>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="floor-map-content">
                        <img src="~/assets/img/campus/floor.jpg" alt="">
                    </div>
                </div>
            </div>

        </div>


    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "FloorMap"
});
</script>

<style scoped>
.floor-map {
    padding: 100px 0;
}

.floor-map .section-title {
    margin-bottom: 50px;
}

.floor-map-content {
    text-align: center;
}
</style>

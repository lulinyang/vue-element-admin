<template>
    <div>
         <!-- <vue-fabric ref="canvas" :width="width" :height="height"></vue-fabric> -->
         <vue-fabric ref="canvas" :width="width" :height="height"></vue-fabric>
    </div>
</template>

<script>
export default {
    name: 'translate',
    data() {
        return {
            width: 300,
            height: 300
        }
    }
}
</script>
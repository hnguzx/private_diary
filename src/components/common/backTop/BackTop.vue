<template>
    <div class="back-top">
        <el-image class="tomImg" :src="toTopImg"/>
    </div>
</template>

<script>
    export default {
        name: "BackTop",
        data() {
            return {
                toTopImg: require('assets/img/other/backTop.svg')
            }
        }
    }
</script>

<style scoped>
    .back-top {
        position: fixed;
        right: 10px;
        bottom: 60px;
    }

    .back-top .tomImg {
        width: 43px;
        height: 43px;
    }
</style>

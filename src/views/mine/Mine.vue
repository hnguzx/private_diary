<template>
    <el-container>
        <el-header>
            <nav-bar>
                <div slot="nav-left">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div slot="nav-center">我的</div>
                <div slot="nav-right">
                    <i class="el-icon-setting"></i>
                </div>
            </nav-bar>
        </el-header>
        <el-main>
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </el-main>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    export default {
        name: "Mine",
        components: {
            NavBar
        },
        data() {
            return {
                circleUrl: ''
            }
        },
    }
</script>

<style scoped>

</style>
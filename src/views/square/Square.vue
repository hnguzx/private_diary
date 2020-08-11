<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">广场</div>
            <div slot="nav-right">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    export default {
        name: "Square",
        components: {
            NavBar
        }
    }
</script>

<style scoped>

</style>
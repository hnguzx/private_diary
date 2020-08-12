<template>

    <keep-alive>
        <el-container>
            <el-header>
                <nav-bar>
                    <div slot="nav-left">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div slot="nav-center">首页</div>
                    <div slot="nav-right">
                        <i class="el-icon-setting"></i>
                    </div>
                </nav-bar>
            </el-header>
            <el-main style="text-align: center">

                <el-carousel trigger="click" height="200px">
                    <el-carousel-item v-for="item in weather" :key="item">
                        <el-row>
                            <el-col v-for="item in weather" :span="8" :key="item">
                                <img class="weather_icon" src=""/>
                            </el-col>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>


                <el-button type="primary">下一步</el-button>
            </el-main>
        </el-container>
    </keep-alive>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    export default {
        name: "Weather",
        components: {
            NavBar
        },
        data() {
            return {
                weather: [
                    [],
                    []
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .weather_icon {
        width: 50px;
        height: 50px;
        display: inline;
    }
</style>
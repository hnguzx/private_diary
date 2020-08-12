<template>
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
        <el-main>
            <el-row>
                <el-col>
                    <el-card>
                        <img src="~assets/img/tabbar/file.svg"/>
                        <span></span>
                        <div>
                            <time>{{currentDate}}</time>
                            <el-button style="float: right" @click="next" type="primary">记录今日</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
        <!--        <router-view></router-view>-->
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import {getCurrentDate} from "commonjs/tool"

    export default {
        name: "Home",
        components: {
            NavBar
        },
        data() {
            return {
                currentDate: getCurrentDate()
            }
        },
        methods: {
            next() {
                console.log("进入下一个页面")
                this.$router.push('/weather')
            }
        }
    }
</script>

<style scoped>

</style>
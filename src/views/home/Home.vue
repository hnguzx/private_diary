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
                        <el-image :src="diaryImg"/>
                        <span></span>
                        <div>
                            <time>{{currentDate}}</time>
                            <el-button style="float: right" @click="table =true" type="primary">记录今日</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>

        <el-drawer
                :visible.sync="table"
                direction="rtl"
                size="100%"
                :show-close="true"
                :with-header="false"
                ref="drawer">
            <div>
                <router-view></router-view>
            </div>
        </el-drawer>

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
                currentDate: getCurrentDate(),
                table: false,
                dialog: false,
                weatherList: ['SUNNY', 'CLOUDY', 'RAINY', 'SNOWY'],
                weather: '',
                diaryImg: require('assets/img/other/diary.svg')
            }
        },
        methods: {
            closeDra() {
                this.$refs.drawer.closeDrawer()
            },
            weatherChange() {
                console.log('当前选择的天气是：' + this.weather)
            }
        },
        mounted() {
            console.log(this.$store.getters.userInfo)
        }
    }
</script>

<style scoped>
    .weather_icon {
        width: 50px;
        height: 50px;
        display: inline;
    }
</style>
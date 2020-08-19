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
            <el-row :gutter="20">
                <el-col :span="18">
                    <span>{{this.$store.getters.userInfo.userName}}</span>
                    <br />
                    <span>本周已记录{{weekRecordTotal}}天</span>
                </el-col>
                <el-col :span="6">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="8">
                    日记数量：{{diaryTotal}}
                </el-col>
                <el-col :span="8">
                    记录天数：{{recordDays}}
                </el-col>
                <el-col :span="8">
                    总字数：{{wordsTotal}}
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-tabs type="border-card" :stretch="true">
                <el-tab-pane label="心情">
                    心情
                </el-tab-pane>
                <el-tab-pane label="天气">
                    天气
                </el-tab-pane>
                <el-tab-pane label="活动">
                    活动
                </el-tab-pane>
            </el-tabs>
            <el-divider></el-divider>
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div style="height: 40px">
                            <span>相册</span>
                            <span style="float: right">{{photoTotal}}张照片</span>
                        </div>
                        <img :src="circleUrl"/>
                    </el-card>
                </el-col>
            </el-row>

            <el-divider></el-divider>

            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div style="height: 40px">
                            <span>位置</span>
                            <span style="float: right">{{addressTotal}}个位置,{{diaryAndAddressTotal}}个故事</span>
                        </div>
                        <div id="gaodeMap" style="height: 200px">

                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import AMap from 'AMap'

    export default {
        name: "Mine",
        components: {
            NavBar
        },
        data() {
            return {
                circleUrl: require('assets/img/head/boy_1.svg'),
                weekRecordTotal:3,
                diaryTotal: 20,
                recordDays: 20,
                wordsTotal: 100,
                photoTotal: 10,
                addressTotal: 5,
                diaryAndAddressTotal: 5
            }
        },
        methods: {
            openMap() {
                let map = new AMap.Map('gaodeMap', {
                    zoom: 15, //地图的缩放等级
                    // center:[], // 地图的中心点坐标

                })

                AMap.plugin([
                    'AMap.ToolBar',
                    'AMap.Scale',
                    'AMap.OverView',
                    'AMap.MapType',
                    'AMap.Geolocation'
                ], function () {
                    map.addControl(new AMap.Geolocation());
                    map.addControl(new AMap.ToolBar());
                })
            }
        },
        mounted() {
            this.openMap()
        }
    }
</script>

<style scoped>

</style>
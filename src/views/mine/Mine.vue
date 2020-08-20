<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">我的</div>
            <div slot="nav-right">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>


        <el-main>
            <scroll class="content" ref="scrollRef"
                    :probe-type="3">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <span>{{this.$store.getters.userInfo.userName}}</span>
                        <br/>
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
                <el-divider></el-divider>
            </scroll>


        </el-main>


    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import Scroll from "components/common/scroll/Scroll"

    import AMap from 'AMap'

    export default {
        name: "Mine",
        components: {
            NavBar,
            Scroll
        },
        data() {
            return {
                circleUrl: require('assets/img/head/boy_1.svg'),
                weekRecordTotal: 3,
                diaryTotal: 20,
                recordDays: 20,
                wordsTotal: 100,
                photoTotal: 10,
                addressTotal: 5,
                diaryAndAddressTotal: 5,
                scroll: null
            }
        },
        methods: {
            openMap() {
                let map = new AMap.Map('gaodeMap', {
                    zoom: 15, //地图的缩放等级
                    // center: [116.397428, 39.90923], // 地图的中心点坐标
                    mapStyle: 'amap://styles/whitesmoke',
                    viewMode: '2D',
                    lang: 'zh_cn'
                })
                let geolocation

                AMap.plugin([
                    'AMap.ToolBar',
                    'AMap.Scale',
                    'AMap.OverView',
                    'AMap.MapType',
                    'AMap.Geolocation'
                ], function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, //  是否使用高精度定位，默认:true
                        timeout: 10000, //  超过10秒后停止定位，默认：无穷大
                        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true, //  显示定位按钮，默认：true
                        buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    })
                    geolocation.getCurrentPosition()

                    function onComplete(data) {

                    }

                    function onError(err) {

                    }

                    AMap.event.addListener(geolocation, 'complete', onComplete)
                    AMap.event.addListener(geolocation, 'error', onError)

                    map.addControl(geolocation)
                    // map.addControl(new AMap.ToolBar());
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
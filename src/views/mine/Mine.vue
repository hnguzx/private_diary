<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">我的</div>
            <div slot="nav-right" @click="setting">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>


        <scroll class="content"
                ref="scrollRef"
                :pull-down-refresh="true"
                @pullingDown="refresh"
                :probe-type="3">
            <el-main>


                <el-row :gutter="20">
                    <el-col :span="18">
                        <span>{{this.$store.getters.userInfo.userName}}</span>
                        <br/>
                        <span>本周已记录{{weekRecordTotal}}天</span>
                    </el-col>
                    <el-col :span="6">
                        <el-avatar :size="50" :src="headImage"></el-avatar>
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
                        <div id="mood" class="statistics-charts"></div>
                    </el-tab-pane>
                    <el-tab-pane label="天气">
                        <div id="weather" class="statistics-charts"></div>
                    </el-tab-pane>
                    <el-tab-pane label="活动">
                        <div id="event" class="statistics-charts"></div>
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
                            <el-carousel height="170px" :loop="true" type="card" indicator-position="none" arrow="never"
                                         :autoplay="true">
                                <el-carousel-item v-for="(item,index) in imageList" :key="index">
                                    <el-image :src="item.imgUrl" @click="intoDetail(item.diaryId)">
                                         <div slot="error">
                                             <el-image :src="errorImg"></el-image>
                                         </div>
                                    </el-image>
                                </el-carousel-item>
                            </el-carousel>
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
        </scroll>


    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import Scroll from "components/common/scroll/Scroll"

    import AMap from 'AMap'
    import {getDiaryBaseInfo, getImgInfo, getAddressInfo, getDiaryLabelInfo} from "js/diary/diary"
    import {getValue} from "commonjs/tool"

    export default {
        name: "Mine",
        components: {
            NavBar,
            Scroll
        },
        data() {
            return {
                headImage: 'http://' + this.$store.getters.userInfo.userHead,
                errorImg: require('assets/img/other/imgLoadFail.svg'),
                weekRecordTotal: '',
                diaryTotal: '',
                recordDays: '',
                wordsTotal: '',
                photoTotal: '',
                addressTotal: '',
                diaryAndAddressTotal: '',
                weatherList: [],
                moodList: [],
                eventList: [],
                scroll: null,
                diaryId: [],
                imageList: [],
                diaryAddressList: [],
                longitudeList: [],
                latitudeList: [],
                tempList: []
            }
        },
        methods: {
            /**
             * 获取数据字典信息
             * @param key
             * @param value
             * @returns {*}
             */
            getDataValue(key, value) {
                return getValue(key, value)
            },
            /**
             * 打开地图
             */
            openMap(diaryAddressList) {
                let _this = this
                let map = new AMap.Map('gaodeMap', {
                    zoom: 8, //地图的缩放等级
                    mapStyle: 'amap://styles/whitesmoke',
                    viewMode: '2D',
                    lang: 'zh_cn'
                })
                let geolocation = null

                for (let i = 0; i < diaryAddressList.length; i++) {
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(diaryAddressList[i].longitude, diaryAddressList[i].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]

                    })

                    map.add(marker)

                    AMap.event.addListener(marker, 'click', function () {
                        _this.intoDetail(diaryAddressList[i].diaryId)
                    })
                }


                AMap.plugin([
                        'AMap.ToolBar',
                        'AMap.Scale',
                        'AMap.OverView',
                        'AMap.MapType',
                        'AMap.Geolocation'
                    ],
                    function () {
                        /*geolocation = new AMap.Geolocation({
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
                        geolocation.getCurrentPosition()*/

                        // function onComplete(data) {}
                        // function onError(err) {}

                        // AMap.event.addListener(geolocation, 'complete', onComplete)
                        // AMap.event.addListener(geolocation, 'error', onError)

                        // map.addControl(geolocation)
                        map.addControl(new AMap.ToolBar());
                    })
            },
            /**
             * 进入日记详情
             */
            intoDetail(diaryId) {
                console.log('日记详情')
                this.$router.push({
                    name: '/diaryDetail',
                    params: {
                        diaryId: diaryId
                    }
                })
            },
            /**
             * 获取用户的日记基本信息
             */
            getDiaryBaseInfo(userId) {
                let params = {
                    userId: userId
                };
                getDiaryBaseInfo(params).then(data => {
                    if (data.code == '200') {
                        let result = data.data;
                        this.weekRecordTotal = result.weekRecordTotal;
                        this.diaryTotal = result.diaryTotal;
                        this.recordDays = result.recordDays;
                        this.wordsTotal = result.wordsTotal;
                        this.photoTotal = result.photoTotal;
                        this.addressTotal = result.addressTotal;
                        this.diaryAndAddressTotal = result.DiaryAndAddressTotal
                    }
                })
            },
            /**
             * 获取用户的相册信息
             */
            getImgInfo(userId) {
                let _this = this
                let params = {
                    userId: userId
                }
                getImgInfo(params).then(data => {
                    if (data.code == '200') {
                        let result = data.data
                        _this.imageList = result.imgInfo
                    }
                })
            },
            /**
             * 获取用户的地址信息
             */
            getAddressInfo(userId) {
                let _this = this
                let params = {
                    userId: userId
                }
                getAddressInfo(params).then(data => {
                    if (data.code == '200') {
                        let result = data.data
                        _this.diaryAddressList = result.addressInfo
                        this.openMap(_this.diaryAddressList)
                    }
                })
            },
            /**
             * 获取用户的标签信息
             */
            getDiaryLabelInfo(userId) {
                let _this = this
                let params = {
                    userId: userId
                }
                getDiaryLabelInfo(params).then(data => {
                    if (data.code == '200') {
                        let result = data.data
                        _this.weatherList = result.weatherList
                        _this.moodList = result.moodList
                        _this.eventList = result.eventList
                        this.initECharts('weather', _this.weatherList, 'weather')
                        this.initECharts('event', _this.eventList, 'event')
                        this.initECharts('mood', _this.moodList, 'mood')
                    }
                })
            },
            /**
             * 初始化表格
             */
            initECharts(containerId, dataList, labelType) {
                // 基于准备好的dom，初始化echarts实例
                let ECharts = this.$echarts.init(document.getElementById(containerId));
                let _this = this

                // 指定图表的配置项和数据
                let option = {
                    color: ['#3398DB'],
                    /*title: {
                        text: ''
                    },*/
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    legend: {
                        data: []
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            minInterval: 1
                        }
                    ],
                    series: [{
                        name: '',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }]
                };
                for (let i = 0; i < dataList.length; i++) {
                    option.xAxis[0].data.push(_this.getDataValue(labelType, dataList[i].label))
                    option.series[0].data.push(dataList[i].times)
                }
                // 使用刚指定的配置项和数据显示图表。
                ECharts.setOption(option);
            },
            /**
             * 刷新页面
             */
            refresh() {
                this.getDiaryBaseInfo(this.$store.getters.userInfo.userId)
                this.getImgInfo(this.$store.getters.userInfo.userId)
                this.getAddressInfo(this.$store.getters.userInfo.userId)
                this.getDiaryLabelInfo(this.$store.getters.userInfo.userId)
                this.$refs.scrollRef.finishPullDown()
            },

            /**
             * 进入设置页面
             */
            setting() {
                console.log('进入设置页面')
            }
        },
        created() {
            this.getDiaryBaseInfo(this.$store.getters.userInfo.userId);
            this.getImgInfo(this.$store.getters.userInfo.userId);
            this.getAddressInfo(this.$store.getters.userInfo.userId);
            this.getDiaryLabelInfo(this.$store.getters.userInfo.userId)
        }

    }
</script>

<style scoped>
    .statistics-charts {
        width: 320px;
        height: 240px;
    }
</style>
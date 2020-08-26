<template>
    <el-container v-loading="loading">
        <el-header>
            <el-page-header @back="pre" title=""></el-page-header>
        </el-header>
        <el-main class="el_main">

            <el-carousel ref="carousel" :autoplay="false" :loop="false" height="170px" indicator-position="outside"
                         arrow="never">
                <el-carousel-item v-for="(weatherTow,i) in weatherList" :key="i">
                    <v-touch @swipeleft="left" @swiperight="right">
                        <el-radio-group v-model="weather" @change="weatherChange">
                            <el-row style="margin-top: 10px;margin-bottom: 10px" :gutter="30"
                                    v-for="(weatherThree,i) in weatherTow" :key="i">
                                <el-col :span="8" v-for="(weatherImg,i) in weatherThree">
                                    <el-radio-button :label="weatherImg" :key="i">
                                        <img class="weather_icon"
                                             :src="require('assets/img/weather/'+weatherImg+'.svg')"/>
                                    </el-radio-button>
                                </el-col>
                            </el-row>
                        </el-radio-group>
                    </v-touch>
                </el-carousel-item>
            </el-carousel>
            <el-row>
                <el-button type="primary" :disabled="weather===''" @click="next">下一步</el-button>
            </el-row>
        </el-main>
    </el-container>
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

                weatherList: [
                    [
                        ['SUNNY_DAY', 'SUNNY_NIGHT', 'HAIL'],
                        ['HEAVY_SNOW', 'HEAVY_RAIN', 'HEAVY_RAIN_DAY']
                    ],
                    [
                        ['HEAVY_RAIN_NIGHT', 'FLOATING_DUST', 'THUNDER_AND_LIGHTNING'],
                        ['HAZE', 'TYPHOON', 'FOG']
                    ],
                    [
                        ['LIGHT_SNOW', 'LIGHT_RAIN', 'CLOUDY_DAY'],
                        ['SNOW_SHOWER_DAY', 'SNOW_SHOWER_NIGHT', 'SHOWER_DAY']
                    ],
                    [
                        ['SHOWER_NIGHT', 'RAISE_SAND']
                    ]
                ],
                weather: '',
                loading: false
            }
        },
        methods: {
            //搞个分页查询，查出
            next() {
                this.$router.push('/mood')
            },
            pre() {
                this.$parent.closeDrawer()
            },
            weatherChange() {
                this.$root.$data.sharedState.diaryContent.weather = this.weather
            },
            left() {
                this.$refs.carousel.next()
            },
            right() {
                this.$refs.carousel.prev()
            }
        },
        mounted() {
            this.weather = this.$root.$data.sharedState.diaryContent.weather
            if(this.$route.query.isHome){
                this.pre()
            }

        }
    }
</script>

<style scoped>
    .weather_icon {
        width: 40px;
        height: 40px;
        display: inline;
    }
</style>
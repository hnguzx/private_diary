<template>
    <el-container v-loading="loading">
        <el-header>
            <el-button @click="pre">返回</el-button>
            <span>选择天气</span>
        </el-header>
        <el-main style="text-align: center">

            <div class="swipeTest">
                <el-carousel
                        ref="carousel"
                        :autoplay="false"
                        :loop="false"
                        height="170px"
                        indicator-position="outside"
                        arrow="never">

                    <el-carousel-item>
                        <v-touch @swipeleft="left" @swiperight="right">
                            <el-radio-group v-model="weather" @change="weatherChange">
                                <el-row style="margin-top: 10px;margin-bottom: 10px" :gutter="30" v-for="(item,i) in weatherList">
                                    <el-col :span="8" v-for="(newItem,i) in item">
                                        <el-radio-button :label="newItem" :key="i"
                                                         v-model="weather">
                                            <img class="weather_icon" :src="require('../../assets/img/weather/'+newItem+'.svg')"/>
                                        </el-radio-button>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </v-touch>
                    </el-carousel-item>

                    <el-carousel-item>
                        <v-touch @swipeleft="left" @swiperight="right">
                            <el-radio-group v-model="weather" @change="weatherChange">
                                <el-row style="margin-top: 10px;margin-bottom: 10px" :gutter="30" v-for="(item,i) in weatherList">
                                    <el-col :span="8" v-for="(newItem,i) in item">
                                        <el-radio-button :label="newItem" :key="i"
                                                         v-model="weather">
                                            <img class="weather_icon" :src="require('../../assets/img/weather/'+newItem+'.svg')"/>
                                        </el-radio-button>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </v-touch>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <el-row>
                <el-button type="primary" @click="next">下一步</el-button>
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
                    ['SUNNY', 'CLOUDY', 'RAINY'],
                    ['SNOWY', 'CLOUDY', 'RAINY']
                ],
                weather: '',
                loading: false
            }
        },
        methods: {
            next() {
                console.log(this.weather)
                this.$router.push({
                    /*name:'/mood',
                    params: {
                        weather: '1'
                    }*/
                    path: '/mood',
                    query: {
                        weather: this.weather
                    }
                })
            },
            pre() {
                // this.$router.back()
                this.$parent.closeDrawer()
            },
            weatherChange() {
                console.log('当前选择的天气是：' + this.weather)
                this.$root.$data.sharedState.diaryContent.weather = this.weather
            },
            left() {
                this.$refs.carousel.next()
            },
            right() {
                this.$refs.carousel.prev()
            }
        },
        created() {
            console.log('create...')
            /*this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);*/
        },
        mounted() {
            this.weather = this.$root.$data.sharedState.diaryContent.weather
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
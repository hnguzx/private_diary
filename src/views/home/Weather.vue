<template>
    <el-container>
        <el-header>
            <el-button @click="pre">返回</el-button>
            <span>选择天气</span>
        </el-header>
        <el-main style="text-align: center">
            <el-radio-group v-model="weather" @change="weatherChange">
                <el-radio-button v-for="(item,i) in weatherList" :label="item" :key="i" v-model="weather">
                    <img class="weather_icon" :src="require('../../assets/img/weather/'+item+'.svg')"/>
                </el-radio-button>
            </el-radio-group>
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
                weatherList: ['SUNNY', 'CLOUDY', 'RAINY', 'SNOWY'],
                weather: ''
            }
        },
        methods: {
            next() {

                this.$router.push({
                    /*name:'/mood',
                    params: {
                        weather: '1'
                    }*/
                    path:'/mood',
                    query:{
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
            }
        },
        created() {
            console.log('create...')
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
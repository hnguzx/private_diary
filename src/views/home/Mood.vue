<template>

    <keep-alive>
        <el-container>
            <el-header>
                <el-button @click="pre">返回</el-button>
                <span>选择心情</span>
            </el-header>
            <el-main style="text-align: center">

                <el-radio-group v-model="mood">
                    <!--<el-radio-button v-for="(item,i) in weather" :label="i" :key="i">
                        <img class="weather_icon" :src="'~assets/img/weather/' +item+'.svg'"/>
                    </el-radio-button>-->
                </el-radio-group>

                <el-row>
                    <el-button type="primary" @click="next">下一步</el-button>
                </el-row>

            </el-main>
        </el-container>
    </keep-alive>
</template>

<script>
    export default {
        name: "Mood",
        data(){
            return{
                mood:[]
            }
        },
        methods:{
            next(){
                this.$router.to('/event')
            },
            pre(){
                this.$router.back()
            }

        },
        mounted() {
            console.log(this.$route.query.weather)
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
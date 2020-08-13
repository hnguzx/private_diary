<template>

    <keep-alive>
        <el-container>
            <el-header>
                <el-button @click="pre">返回</el-button>
                <span>选择事件</span>
            </el-header>
            <el-main style="text-align: center">

                <el-checkbox-group v-model="mood">
                    <!--<el-checkbox-button v-for="(item,i) in weather" :label="i" :key="i">
                        <img class="weather_icon" :src="'~assets/img/weather/' +item+'.svg'"/>
                    </el-checkbox-button>-->
                </el-checkbox-group>

                <el-row>
                    <el-button type="primary" @click="next">下一步</el-button>
                </el-row>

            </el-main>
        </el-container>
    </keep-alive>
</template>

<script>
    export default {
        name: "Event",
        data(){
            return{
                mood:[]
            }
        },
        methods:{
            next(){
                this.$router.push('/diary')
            },
            pre(){
                this.$router.push('/mood')
            }

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
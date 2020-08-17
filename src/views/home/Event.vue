<template>

    <keep-alive>
        <el-container>
            <el-header>
                <el-button @click="pre">返回</el-button>
                <span>选择事件</span>
            </el-header>
            <el-main>
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
        data() {
            return {
                mood: []
            }
        },
        methods: {
            next() {
                this.$router.push('/diary')
            },
            pre() {
                this.$router.back()
            }

        },
        mounted() {
            console.log('当前天气是：' + this.$root.$data.sharedState.diaryContent.weather)
            console.log('当前心情是：' + this.$root.$data.sharedState.diaryContent.mood)
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
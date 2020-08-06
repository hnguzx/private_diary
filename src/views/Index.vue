/**
*   @name:Index.vue
*   @auth:谷志雄
*   @createTime:2020/8/6 0:31
*   @updateTime:2020/8/6 0:31
*   @desc:
*/
<template>
    <el-container>
        <el-header style="text-align: center">
            <el-row :gutter="50">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <span>菜单</span>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <span>标题</span>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <span>注册/登录</span>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-input placeholder="请输入内容" v-model="userName" clearable="true"></el-input>
            <el-input placeholder="请输入密码" v-model="password" show-password="true"></el-input>
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                userName: 'guzx',
                password:''
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
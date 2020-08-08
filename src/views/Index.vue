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
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" :offset="16">
                    <el-button type="primary" round @click="changeView">登录</el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <ValidationObserver v-slot="{register }">
                <el-form :label-position="labelPosition" label-width="80px">
                    <el-form-item label="测试校验">
                        <ValidationProvider name="email" rules="email" v-slot="{errors}">
                            <input v-model="email" type="text"/>
                            <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                    </el-form-item>
                    <ValidationProvider name="用户昵称" rules="required" v-slot="{errors}">
                        <el-form-item label="昵称">
                            <el-input placeholder="请输入用户昵称" v-model="userName" clearable></el-input>
                            <span>{{ errors[0] }}</span>
                        </el-form-item>
                    </ValidationProvider>

                    <el-form-item label="出生日期">
                        <el-date-picker placeholder="请选择出生日期" v-model="birthDay" type="date"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="邮箱/手机">
                        <el-input placeholder="邮箱或手机号" v-model="emailOrPhone" clearable>
                            <el-button slot="append" @click="getVerifyCode">获取验证码</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input placeholder="请输入验证码" v-model="verifyCode"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                    </el-form-item>
                </el-form>


            </ValidationObserver>


            <el-row>
                <el-button type="primary" @click="register">注册</el-button>
            </el-row>
        </el-main>

        <el-footer></el-footer>
    </el-container>
</template>

<script>
    import {getVerifyCode, register} from "js/index"
    import '../validator/validator'

    export default {
        name: "Index",
        data() {
            return {
                userName: '',
                password: '',
                emailOrPhone: '',
                email: '',
                phone: '',
                verifyCode: '',
                birthDay: '',
                sex: ''
            }
        },
        methods: {
            getVerifyCode: function () {
                console.log("获取验证码！" + this.emailOrPhone);
                getVerifyCode(params)
                //     .then(data => {
                //     console.log(data)
                // }).catch(err => {
                //     console.log(err)
                // })
            },
            register() {
                console.log("进行注册！")
                register()
                    .then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
            },
            changeView() {
                console.log("切换到登录页面！")
            }
        }
    }
</script>

<style scoped>

</style>
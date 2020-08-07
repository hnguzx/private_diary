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
            <el-input v-validate="'required'" name="required" placeholder="请输入用户昵称" v-model="userName" clearable></el-input>
            <el-date-picker placeholder="请选择出生日期" v-model="birthDay" type="date"></el-date-picker>
            <el-radio-group v-model="sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
            </el-radio-group>

            <el-input v-validate="'required|email'" placeholder="请输入邮箱地址或手机号" v-model="emailOrPhone" clearable>
                <el-button slot="append" @click="getVerifyCode">获取验证码</el-button>
            </el-input>
            <el-input v-validate="'required|port'" placeholder="请输入验证码" v-model="verifyCode"></el-input>
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>

            <span class="validate-error" v-if="errors.has('httpPort')"> {{ errors.items[0].msg }} </span>
            <el-row>
                <el-button type="primary" @click="register">注册</el-button>
            </el-row>
        </el-main>

        <el-footer></el-footer>
    </el-container>
</template>

<script>
    import {getVerifyCode, register} from "js/index";
    import {isEmail, isPhone, stringIsNull} from "../commonJs/tool";
    import Validator from "../validator/validator";

    export default {
        name: "Index",
        components: {Validator},
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
                let params = {
                    email: this.emailOrPhone
                }
                getVerifyCode(params).then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
            },
            register() {
                console.log("进行注册！")
                this.$validator.validate().then(result=>{
                    if (!result){
                        this.$message.warning(this.errors.all()[0])
                        return
                    }
                })
                register().then(data => {
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
    .validate-error{
        color: red;
    }
</style>
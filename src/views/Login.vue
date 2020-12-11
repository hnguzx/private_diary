<template>
    <el-container>
        <el-header style="text-align: center">
            <el-row :gutter="50" style="line-height: 60px;">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" :offset="16">
                    <el-tag @click="changeView" type="" effect="dark">注册</el-tag>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-form label-position="labelPosition" label-width="80px">
                <ValidationObserver ref="form">
                    <ValidationProvider name="邮箱/手机" rules="required" v-slot="{errors}">
                        <el-form-item label="邮箱/手机">
                            <el-input placeholder="邮箱或手机号" v-model="emailOrPhone" clearable></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>

                    <ValidationProvider name="密码" rules="required|alpha_dash" ref="password"
                                        v-slot="{errors}">
                        <el-form-item label="密码">
                            <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>
                    <br>
                    <el-row class="login_button">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-link @click.native="forgetPassword" class="forget_password" type="primary"
                                 :underline="false" href="javascript:void(0);">忘记密码
                        </el-link>
                    </el-row>
                </ValidationObserver>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
    import 'validator/validator'
    import {login} from "js/user/user"
    import {isEmail} from "commonjs/tool"
    import md5 from 'js-md5'

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '111111111',
                emailOrPhone:'guzx',
                email: '',
                phone: ''
            }
        },
        methods: {

            /**
             * 登录
             */
            login() {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        this.$message({
                            showClose: true,
                            message: "请完善用户信息后再进行登录！",
                            type: "warning"
                        })
                        return
                    }
                    this.isEmailOrPhone()
                    this.password = md5(this.password)
                    let params = {
                        // userEmail: this.email,
                        // userPhone: this.phone,
                        // userPassword: this.password
                        username:this.emailOrPhone,
                        password: this.password
                    }
                    login(params).then(data => {
                        if (data.code == '200'){
                            this.$store.commit({
                                type: 'updateUserInfo',
                                data: data.data
                            })
                            this.$router.push('/main')
                            return
                        }
                        this.$message('登录失败')
                    })
                })
            },

            /**
             * 忘记密码
             */
            forgetPassword() {
                this.$router.push({
                    name: '/forgetPassword'
                })
            },

            /**
             * 切换页面
             */
            changeView() {
                this.$router.push({
                    name: '/register'
                })
            },

            /**
             * 判断输入的是手机号还是邮箱地址
             */
            isEmailOrPhone() {
                if (isEmail(this.emailOrPhone)) {
                    this.email = this.emailOrPhone
                } else {
                    this.phone = this.emailOrPhone
                }
            }
        },
        mounted() {
            if (this.$route.params.emailOrPhone !== undefined && this.$route.params.emailOrPhone !== '') {
                this.emailOrPhone = this.$route.params.emailOrPhone
            }
        }
    }
</script>

<style scoped>
    .forget_password {
        float: right;
        margin-top: 20px;
    }
</style>
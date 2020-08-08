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
                    <ValidationProvider name="邮箱/手机" rules="required|emailOrPhone" v-slot="{errors}">
                        <el-form-item label="邮箱/手机">
                            <el-input placeholder="邮箱或手机号" v-model="emailOrPhone" clearable></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>

                    <ValidationProvider name="密码" rules="required|alpha_dash|min:8|max:20" ref="password"
                                        v-slot="{errors}">
                        <el-form-item label="密码">
                            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>
                    <el-row>
                        <el-link @click.native="forgetPassword" class="forget_password" type="primary" :underline="false" href="javascript:void(0);">忘记密码</el-link>
                    </el-row>
                    <el-row class="login_button">
                        <el-button type="primary" @click="login">登录</el-button>
                    </el-row>
                </ValidationObserver>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
    import 'validator/validator'
    import {login} from "js/login/login";

    export default {
        name: "Login",
        data() {
            return {
                emailOrPhone: '',
                password: '',
                email: '',
                phone: ''
            }
        },
        methods: {
            changeView() {
                this.$router.push({
                    name: '/register'
                })
            },
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
                    let params = {
                        email: this.email,
                        phone: this.phone,
                        password: this.password
                    }
                    login(params).then(data => {
                        console.log(data)
                        this.$router.push('/home')
                    }).catch(err => {
                        console.log(err)
                    })
                })
            },
            forgetPassword() {
                this.$router.push({
                    name: '/forgetPassword'
                })
            }
        },
        mounted() {
            this.emailOrPhone = this.$route.params.emailOrPhone
        }
    }
</script>

<style scoped>
    .forget_password {
        float: right;
    }
</style>
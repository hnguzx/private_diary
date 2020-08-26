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
            <el-row :gutter="50" style="line-height: 60px;">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" :offset="16">
                    <el-tag @click="changeView" type="" effect="dark">登录</el-tag>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <ValidationObserver ref="form">

                <el-form label-position="labelPosition"
                         label-width="80px">

                    <ValidationProvider name="用户昵称" rules="required">
                        <el-form-item label="昵称">
                            <el-input placeholder="请输入用户昵称" v-model="userName" clearable></el-input>
                        </el-form-item>
                    </ValidationProvider>


                    <ValidationProvider name="出生日期" rules="required">
                        <el-form-item label="出生日期">
                            <el-date-picker placeholder="请选择出生日期" v-model="birthDay" type="date"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </ValidationProvider>

                    <el-form-item label="性别">
                        <el-radio-group v-model="sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <ValidationProvider name="邮箱/手机" rules="required|emailOrPhone" ref="emailOrPhone">
                        <el-form-item label="邮箱/手机">
                            <el-input placeholder="邮箱或手机号" v-model="emailOrPhone" clearable>
                                <el-button id="getVerifyCode" slot="append" :disabled="forbiddenButtonTime>0"
                                           @click="getVerifyCode">{{buttonText}}
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider name="验证码" rules="required">
                        <el-form-item label="验证码">
                            <el-input placeholder="请输入验证码" v-model="verifyCode" maxlength="6" clearable></el-input>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider name="密码" rules="required|alpha_dash|min:8|max:20" v-slot="{errors}">
                        <el-form-item label="密码">
                            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>

                    <el-row>
                        <el-button type="primary" @click="register">注册</el-button>
                    </el-row>
                </el-form>
            </ValidationObserver>
        </el-main>
    </el-container>
</template>

<script>
    import {getVerifyCode, register} from "js/user/user"
    import 'validator/validator'
    import {isEmail} from "commonjs/tool"
    import md5 from 'js-md5'

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
                sex: '',
                buttonText: '获取验证码',
                forbiddenButtonTime: 0,
                timer: null
            }
        },
        methods: {
            /**
             * 获取验证码
             */
            getVerifyCode() {
                this.$refs.emailOrPhone.validate().then(success => {
                    if (!success.valid) {
                        this.$message({
                            showClose: true,
                            message: success.errors[0],
                            type: "warning"
                        })
                        return;
                    }
                    /*this.isEmailOrPhone()
                    let params = {
                        email: this.email,
                        phone:this.phone
                    };*/
                    let params = {
                        emailOrPhone: this.emailOrPhone,
                    };
                    getVerifyCode(params).then(data => {
                        this.$message({
                            showClose: false,
                            message: '验证码发送成功!',
                            type: "success"
                        });
                        this.forbiddenButtonTime = 60
                        this.buttonText = this.forbiddenButtonTime + '秒后重新获取'
                        this.timer = setInterval(this.preventReSub, 1000)
                    }).catch(err => {
                    })
                });
            },

            /**
             * 注册
             */
            register() {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        this.$message({
                            showClose: true,
                            message: "请完善用户信息后再进行注册！",
                            type: "warning"
                        })
                        return
                    }
                    this.isEmailOrPhone()
                    this.password = md5(this.password)
                    let params = {
                        userName: this.userName,
                        birthDay: this.birthDay,
                        sex: this.sex,
                        email: this.email,
                        phone: this.phone,
                        verifyCode: this.verifyCode,
                        password: this.password
                    }
                    register(params).then(data => {
                        this.changeView()
                    }).catch(err => {
                    })
                });

            },

            /**
             * 切换页面
             */
            changeView() {
                this.$router.push({
                    name: '/',
                    params: {
                        emailOrPhone: this.emailOrPhone
                    }
                })
            },

            /**
             * 防止重复提交
             */
            preventReSub() {
                if (this.forbiddenButtonTime > 0) {
                    this.forbiddenButtonTime--
                    this.buttonText = this.forbiddenButtonTime + '秒后重新获取'
                    return
                }
                clearInterval(this.timer);
                this.buttonText = '获取验证码'
            },

            /**
             * 判断输入的是手机号还是邮箱地址
             */
            isEmailOrPhone() {
                if (isEmail(this.emailOrPhone)) {
                    this.email = this.emailOrPhone
                } else {
                    this.$message('系统暂未开通手机注册！请使用邮箱注册')
                    this.phone = this.emailOrPhone
                }
            }
        }
    }
</script>

<style scoped>
</style>
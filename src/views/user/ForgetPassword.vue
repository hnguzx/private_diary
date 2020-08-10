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
                    <ValidationProvider name="邮箱/手机" rules="required|emailOrPhone" ref="emailOrPhone">
                        <el-form-item label="邮箱/手机">
                            <el-input placeholder="邮箱或手机号" v-model="emailOrPhone" clearable>
                                <el-button :disabled="this.forbiddenButtonTime>0" slot="append"
                                           @click="getVerifyCode">{{buttonText}}
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider name="验证码" rules="required" v-slot="{errors}">
                        <el-form-item label="验证码">
                            <el-input placeholder="请输入验证码" v-model="verifyCode" maxlength="6" clearable></el-input>
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider name="密码" rules="required|alpha_dash|min:8|max:20" v-slot="{errors}">
                        <el-form-item label="新密码">
                            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>

                    <ValidationProvider name="确认密码" rules="required|alpha_dash|min:8|max:20" v-slot="{errors}">
                        <el-form-item label="确认密码">
                            <el-input placeholder="请输入密码" v-model="newPassword" show-password></el-input>
                        </el-form-item>
                        <span class="error-msg ">{{errors[0]}}</span>
                    </ValidationProvider>

                    <el-row>
                        <el-button type="primary" @click="updatePassword">更新密码</el-button>
                    </el-row>
                </el-form>
            </ValidationObserver>
        </el-main>
    </el-container>
</template>

<script>
    import {isEmail} from "commonjs/tool";
    import {getVerifyCode, updatePassword} from "js/user/user"
    import md5 from 'js-md5'

    export default {
        name: "ForgetPassword",
        data() {
            return {
                emailOrPhone: '',
                email: '',
                phone: '',
                verifyCode: '',
                password: '',
                newPassword: '',
                buttonText: '获取验证码',
                forbiddenButtonTime: 0
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

                    let params = {
                        email: this.email,
                        phone: this.phone,
                        password: this.password
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
             * 更新用户密码
             */
            updatePassword() {
                if (this.password != this.newPassword) {
                    this.$message('请确认两个密码一致！');
                    return;
                }
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        this.$message({
                            showClose: true,
                            message: "请确认信息填写完整后再修改密码！",
                            type: "warning"
                        })
                        return
                    }
                    if (isEmail(this.emailOrPhone)) {
                        this.email = this.emailOrPhone
                    } else {
                        this.phone = this.emailOrPhone
                    }
                    this.password = md5(this.password)
                    let params = {
                        email: this.email,
                        phone: this.phone,
                        verifyCode: this.verifyCode,
                        password: this.password
                    }
                    updatePassword(params).then(data => {
                        this.changeView()
                    }).catch(err => {
                    })
                })

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
             * 判断输入的是手机号还是邮箱地址
             */
            isEmailOrPhone() {
                if (isEmail(this.emailOrPhone)) {
                    this.email = this.emailOrPhone
                } else {
                    this.phone = this.emailOrPhone
                }
            }
        }
    }
</script>

<style scoped>

</style>
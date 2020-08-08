<template>
    <el-container>
        <el-main>
            <ValidationObserver ref="form">

                <el-form label-position="labelPosition"
                         label-width="80px">
                    <ValidationProvider name="邮箱/手机" rules="required|emailOrPhone" ref="emailOrPhone">
                        <el-form-item label="邮箱/手机">
                            <el-input placeholder="邮箱或手机号" v-model="emailOrPhone" clearable>
                                <el-button slot="append" @click="getVerifyCode">获取验证码</el-button>
                            </el-input>
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider name="验证码" rules="required">
                        <el-form-item label="验证码">
                            <el-input placeholder="请输入验证码" v-model="verifyCode" clearable></el-input>
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
    import {stringIsNull, isEmail} from "commonjs/tool";
    import {getVerifyCode, updatePassword} from "js/user/user"

    export default {
        name: "ForgetPassword",
        data() {
            return {
                emailOrPhone: '',
                email: '',
                phone: '',
                verifyCode: '',
                password: '',
                newPassword: ''
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
                        emailOrPhone: this.emailOrPhone
                    };
                    getVerifyCode(params).then(data => {
                        console.log(data)
                    }).catch(err => {
                        console.log(err)
                    })
                });

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
                    let params = {
                        email: this.email,
                        phone: this.phone,
                        verifyCode: this.verifyCode,
                        password: this.password
                    }
                    updatePassword(params).then(data => {
                        console.log(data)
                        this.changeView()
                    }).catch(err => {
                        console.log(err)
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
            }
        }
    }
</script>

<style scoped>

</style>
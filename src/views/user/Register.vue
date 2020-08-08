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
                                <el-button id="getVerifyCode" slot="append" @click="getVerifyCode">获取验证码</el-button>
                            </el-input>
                        </el-form-item>
                    </ValidationProvider>

                    <ValidationProvider name="验证码" rules="required">
                        <el-form-item label="验证码">
                            <el-input placeholder="请输入验证码" v-model="verifyCode" clearable></el-input>
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
    import {isEmail} from "commonjs/tool";

    export default {
        name: "Index",
        data() {
            return {
                userName: 'test',
                password: '11111111',
                emailOrPhone: 'test@qq.com',
                email: '',
                phone: '',
                verifyCode: '123123',
                birthDay: '2020-02-03',
                sex: '1',
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
                        emailOrPhone: this.emailOrPhone
                    };
                    getVerifyCode(params).then(data => {
                        this.$message({
                            showClose: false,
                            message: '验证码发送成功!',
                            type: "success"
                        });
                        this.forbiddenButtonTime = 60
                        console.log(data)
                    }).catch(err => {
                        console.log(err)
                    })
                });
            },

            /**
             * 防止重复提交
             */
            chongfutijiao() {
                if (this.forbiddenButtonTime > 0) {
                    this.$message({
                        showClose: false,
                        message: '系统已发送验证码！请稍后再试！',
                        type: "success"
                    });
                    return
                }
                if (this.forbiddenButtonTime == 0) {
                    clearInterval(interval)
                }
                let interval = setInterval(this.chongfutijiao, 1000);
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
                    if (isEmail(this.emailOrPhone)) {
                        this.email = this.emailOrPhone
                    } else {
                        this.phone = this.emailOrPhone
                    }
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
                        console.log(data)
                        this.changeView()
                    }).catch(err => {
                        console.log(err)
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
            }
        }
    }
</script>

<style scoped>
</style>
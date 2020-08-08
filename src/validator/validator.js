import Vue from 'vue'
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// import {messages} from 'vee-validate/dist/locale/en'
import {messages} from 'vee-validate/dist/locale/zh_CN'

/**
 * 自定义校验规则
 */
extend('emailOrPhone', {
    validate: value => {
        let emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (!emailReg.test(value) && !phoneReg.test(value)) {
            return false;
        } else {
            return true;
        }
    },
    message: '请输入正确的邮箱或手机号'
})

Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule],
        message: messages[rule]
    })
})


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

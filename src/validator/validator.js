import Vue from 'vue'
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// import {messages} from 'vee-validate/dist/locale/en'
import {messages} from 'vee-validate/dist/locale/zh_CN'

/**
 * 自定义校验规则
 */
/*extend('secret', {
    validate: value => value === '22',
    message: 'This is not the magic word'
});*/

Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule],
        message: messages[rule]
    })
})


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

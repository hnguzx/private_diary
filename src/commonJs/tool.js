export function stringIsNull(str) {
    if (str == '' || str.trim().length == 0 || str == null) {
        return true
    }
    return false
}

export function isEmail(str) {
    var myreg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export function isPhone(str) {
    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

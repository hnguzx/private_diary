import dataDict from "assets/dataDict";

export function stringIsNull(str) {
    if (str == '' || str.trim().length == 0 || str == null) {
        return true
    }
    return false
}

export function isEmail(str) {
    let myreg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export function isPhone(str) {
    let myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export function getCurrentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = supplyZero(month);
    day = supplyZero(day);
    return year + '-' + month + '-' + day;
}

function supplyZero(date) {
    date = ('0' + date).substr(-2)
    return date;
}

export function getValue(key1, key2) {
    let value = dataDict[key1][key2]
    return value
}

export function formateDate(value) {
    if (value.length > 8) {
        value = value.substr(0, 8)
    }
    return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2)
}

export function formateTime(value) {
    return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2) + ' ' + value.substr(8, 2) + ':' + value.substr(10, 2) + ':' + value.substr(12, 2)
}

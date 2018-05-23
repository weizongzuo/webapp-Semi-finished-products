import CryptoJS from 'crypto-js';
import uuid from './uuid';
let {key, channel} = {
    channel: 'mweb',
    key: 'abcdefghijklmnop',
}
let forMatePost = function (o){
    let forMatePost = {
        serialNumber: uuid(),
        channel,
        requestTime: new Date().Format('yyyy-MM-dd hh:mm:ss')
    }
    
    if(o){
        Object.assign(forMatePost, {
            'body': cryDate(o)
        })
        // Object.assign(forMatePost, {
            // 'body': o
        // })
    }
    return JSON.stringify(forMatePost)
}

function cryDate(data){
    let d = JSON.stringify(data);
    return CryptoJS.AES.encrypt(d, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();
}
export default forMatePost;

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
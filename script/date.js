
// vue时间戳转换
function formatDate(date, fmt) {
    "use strict";

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            var str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

//时间戳转换
Date.prototype.format = function (fmt) {
    //author: meizz
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
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
};

function Gtime_mdhm(data_) {
    time = new Date(parseInt(data_) * 1000).format('M月d日 hh:mm');
    return time;
}

function Gtime_md(data_) {
    time = new Date(parseInt(data_) * 1000).format('M月d日');
    return time;
}

function Gtime_ymd(data_) {
    time = new Date(parseInt(data_) * 1000).format('yyyy年M月d日');
    return time;
}

function getDate(time) {
    var str = time;
    //将字符串转换成时间格式
    var timePublish = new Date(str * 1000);
    var timeNow = new Date();
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var diffValue = timeNow - timePublish;
    var diffMonth = diffValue / month;
    var diffWeek = diffValue / (7 * day);
    var diffDay = diffValue / day;
    var diffHour = diffValue / hour;
    var diffMinute = diffValue / minute;

    if (diffValue < 0) {
        console.log("错误时间");
    } else if (diffMonth > 3) {
        result = timePublish.getFullYear() + "-";
        result += timePublish.getMonth() + 1 + "-";
        result += timePublish.getDate();
    } else if (diffMonth > 1) {
        result = parseInt(diffMonth) + "月前";
    } else if (diffWeek > 1) {
        result = parseInt(diffWeek) + "周前";
    } else if (diffDay > 1) {
        result = parseInt(diffDay) + "天前";
    } else if (diffHour > 1) {
        result = parseInt(diffHour) + "小时前";
    } else if (diffMinute > 1) {
        result = parseInt(diffMinute) + "分钟前";
    } else {
        result = "刚刚";
    }

    return result;
}

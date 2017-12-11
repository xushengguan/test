var serverurl = "https://x.sdp178.com/xlp_app/api.php"; //服务器地址
// var serverurl = "http://192.168.110.2/xlp_app/api.php";//明军主机地址

//返回
function go_back() {
    // api.closeWin({});
    api.historyBack({//历史记录后退一页
        // frameName: 'detail'
    }, function(ret, err) {
        if (!ret.status) {
            api.closeWin();
        }
    });
}


//IOS设置bar
function fixIos7Bar_API(el) {
    if (!$api.isElement(el)) {
        console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
        return;
    }
    var strDM = $api.getStorage('SYSTEMTYPE');
    if (strDM == 'ios') {
        var strSV = $api.getStorage('SYSTEMVERSION');
        var numSV = parseInt(strSV, 10);
        var fullScreen = $api.getStorage('FULLSCREEN');
        var iOS7StatusBarAppearance = $api.getStorage('IOS7STATUSBARAPPEARANCE');
        if (numSV >= 7 && fullScreen == 'false' && iOS7StatusBarAppearance) {
            el.style.paddingTop = '20px';
        }
    }
}

function fixStatusBar_API(el) {
    if (!$api.isElement(el)) {
        console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
        return;
    }
    var sysType = $api.getStorage('SYSTEMTYPE');
    if (sysType == 'ios') {
        fixIos7Bar_API(el);
    } else if (sysType == 'android') {
        var ver = $api.getStorage('SYSTEMVERSION');
        ver = parseFloat(ver);
        if (ver >= 4.4) {
            el.style.paddingTop = '25px';
        }
    }
};


//加载 XML 文档函数
function parseXML(ret) {
    var xmlDoc = null;
    try //Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(ret);
    } catch (e) {
        try //Firefox, Mozilla, Opera, etc.
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(ret, "text/xml");
        } catch (e) {
            alert(e.message)
        }
    }
    return xmlDoc;
}

//加载loading
function loading() {
    var str = '';
    str += '<div class="load-container load8" id="loading">' +
        '<div class="loader"></div>' +
        '<div class="txt">加载中</div>' +
        '</div>'
    $api.append($api.dom('body'), str);
}

// 发送验证码倒计时
function SendCountDown(obj, wait) {
    if (wait == 0) {
        obj.removeAttribute("disabled");
        obj.value = "获取验证码";
        wait = 60;
        return;
    } else {
        obj.setAttribute("disabled", true);
        obj.value = "重新发送(" + wait + ")";
        wait--;
    }
    setTimeout(function() {
        SendCountDown(obj, wait);
    }, 1000)
}

// 发送手机验证码
function SendCode(obj, tel, wait) {

    api.ajax({
        url: serverurl,
        method: 'get',
        data: {
            values: {
                type: '10042',
                phone: tel
            },
        }
    }, function(ret, err) {

        switch (ret.status) {
            case '1':
                api.toast({
                    msg: '验证码已发送，请留意短信',
                    duration: 2000,
                    location: 'bottom'
                });
                SendCountDown(obj, wait);
                break;
            case '2':
                api.toast({
                    msg: '一个小时只能发送5条',
                    duration: 2000,
                    location: 'bottom'
                });
                break;
            case '3':
                api.toast({
                    msg: '请间隔60s后重新获取',
                    duration: 2000,
                    location: 'bottom'
                });
                break;
            case '4':
                api.toast({
                    msg: '手机号已经注册',
                    duration: 2000,
                    location: 'bottom'
                });
                break;
            case '5':
              api.toast({
                  msg: '超过一天接收数量',
                  duration: 2000,
                  location: 'bottom'
              });
              break;
        }
    });

}


/**
*小数转换为百分比
*这里需要先用Number进行数据类型转换，然后去指定截取转换后的小数点后几位(按照四舍五入)，这里是截取一位，0.1266转换后会变成12.7%
*/
function toPercent(point){
    var str=Number(point*100);
    str+="%";
    return str;
}



//解决键盘弹出底部导航被顶上来的bug
function focus_footer(){

    var h = document.body.scrollHeight;
    window.onresize = function() {
      if (document.body.scrollHeight < h) {
        document.getElementById('footer').style.display = "none";
      } else {
        document.getElementById('footer').style.display = "block";
      }
    };
}

//用js限制字数，超出部分以省略号...显示
function LimitNumber(txt,idName) {
    var str = txt;
    str = str.substr(0,20) + '...' ;
    var id=document.getElementById(idName);
    id.innerText=str;
}

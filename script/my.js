function go_back(){
    api.closeWin({});
}

var numVal;
function rem_fontSize(hRemVal){
    var html = document.getElementsByTagName("html")[0];
    var htmlUnitFontSize = window.getComputedStyle(html, null).getPropertyValue('font-size');
    htmlUnitFontSize = parseFloat(htmlUnitFontSize);
    numVal = hRemVal * htmlUnitFontSize / 2;
    return numVal;
}

//IOS设置bar
function fixIos7Bar_API(el){
    if(!$api.isElement(el)){
        console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
        return;
    }
    var strDM = $api.getStorage('SYSTEMTYPE');
    if (strDM == 'ios') {
        var strSV = $api.getStorage('SYSTEMVERSION');
        var numSV = parseInt(strSV,10);
        var fullScreen = $api.getStorage('FULLSCREEN');
        var iOS7StatusBarAppearance = $api.getStorage('IOS7STATUSBARAPPEARANCE');
        if (numSV >= 7 && fullScreen == 'false' && iOS7StatusBarAppearance) {
            el.style.paddingTop = '20px';
        }
    }
}
function fixStatusBar_API(el){
    if(!$api.isElement(el)){
        console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
        return;
    }
    var sysType = $api.getStorage('SYSTEMTYPE');
    if(sysType == 'ios'){
        fixIos7Bar_API(el);
    }else if(sysType == 'android'){
        var ver = $api.getStorage('SYSTEMVERSION');
        ver = parseFloat(ver);
        if(ver >= 4.4){
            alert('android')
            el.style.paddingTop = '25px';
        }
    }
};

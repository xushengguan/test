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

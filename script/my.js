// var serverurl = "https://x.sdp178.com/xlp_app/api.php"; //服务器地址
var serverurl = "https://wechat.123win.com.cn/xlp_app/api.php"; //服务器地址
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

// 状态栏设置
function SetStatusBar(el,style,color){
    //适配iOS7+、Android4.4+系统状态栏，为传入的DOM元素增加适当的上内边距，避免header与状态栏重叠
    // $api.fixStatusBar( $api.dom(el) );

    //设置状态栏样式为白色（适用于深色背景）或黑色（适用于浅色背景），以及设置状态栏背景颜色
    api.setStatusBarStyle({
        style: style,
        color: color
    });
}


// 退出登录
function ExitLogin(){
  $api.clearStorage();//清除localStorage的所有数据，慎用
  api.removePrefs({
    key: 'token'
  });
  api.removePrefs({
    key: 'id'
  });
  api.removePrefs({
    key: 'user_name'
  });
  api.removePrefs({
    key: 'headimgurl'
  });
  api.removePrefs({
    key: 'registrationId'
  });
  api.setFullScreen({
    fullScreen: true
  });
  setTimeout(function(){
    api.closeToWin({
        name: 'root'
    });
  },500);
}

// 去掉首尾空格
function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}

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

// 封装api.openFrame
function getFrame(name,url,rect,pageParam){
    api.openFrame({
        name: name,
        url: url,
        bounces: false,
        bgColor: '#f2f2f2',
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        softInputMode:'resize',
        rect:rect,
        pageParam: pageParam,
        reload: true,
        allowEdit:true,
    });
}

// 封装api.openWin
function openWin(name,url,pageParam){
    api.openWin({
        name: name,
        url: url,
        bgColor: '#f2f2f2',
        pageParam: pageParam,
        scrollToTop:true,//当点击状态栏，页面是否滚动到顶部,只 iOS 有效
        slidBackEnabled:false,//（可选项）是否支持滑动返回。iOS7.0及以上系统中，在新打开的页面中向右滑动，可以返回到上一个页面，该字段只 iOS 有效
        animation:{
          type:"fade",                //动画类型（详见动画类型常量）
          subType:"from_bottom",       //动画子类型（详见动画子类型常量）
          duration:100
        },
        progress:{//（可选项）页面加载进度配置信息，若不传则无加载进度效果
            color:'#45C01A'
        },
        reload: true,
        allowEdit:true//（可选项）是否允许长按页面时弹出选择菜单

    });

}

//封装toast提示框
function msg(msg){
    api.toast({
        msg: msg,
        duration: 3000,
        location: 'middle'
    });
}

// 封装加载进度条
function showProgress(title,text){
    api.showProgress({
      title: title,
      text: text,
      modal: false
    });
}

/**
 *方法：Array.del(index)
 *功能：删除数组的元素
**/
Array.prototype.del=function(n) {　//n表示第几项，从0开始算起。
//prototype为对象原型，注意这里为对象增加自定义方法的方法。
　if(n<0)　//如果n<0，则不进行任何操作。
  return this;
  　else
  return this.slice(0,n).concat(this.slice(n+1,this.length));
  /*
  　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
  　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
   组成的新数组，这中间，刚好少了第n项。
  　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
  */
}

/*
   *方法：AddorRemove(type,el);type:add添加，remove移除、el：dom元素
   *功能：实时监测input框移除button disabled元素，改编按钮颜色状态
*/
function AddorRemove(type,el){
    if (type == 'add') {
        $api.addCls($api.dom(el), 'on');
        $api.removeAttr($api.dom(el), 'disabled');
    }else if(type == 'remove'){
        $api.removeCls($api.dom(el), 'on');
        $api.attr($api.dom(el), 'disabled');
    }
}

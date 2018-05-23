import './style/main.less';
import './style/invite.less';
import $ from 'jquery';
import forMatePost from './util/crypto';
var html = require('html-loader!./views/invite.html');
$('#app').append(html);

preInit();
$.ajax({
    url: '/ifinance'+'/user/getInvitationInfo',
    type: 'POST',
    data: forMatePost({userId: 123}),
    beforeSend: function(request) {
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    },
    success: function(data){
        console.log(data)
    }
})



function preInit() {
    setBaseFontSize();
      
  }
  function setBaseFontSize() {
    // document.getElementsByTagName('html')[0].style.fontSize = window.screen.width / 750 * 100 + 'px';
    let Dpr = 1,
        uAgent = window.navigator.userAgent;
        
    let isIOS = uAgent.match(/iphone/i);
    let isYIXIN = uAgent.match(/yixin/i);
    let is2345 = uAgent.match(/Mb2345/i);
    let ishaosou = uAgent.match(/mso_app/i);
    let isSogou = uAgent.match(/sogoumobilebrowser/ig);
    let isLiebao = uAgent.match(/liebaofast/i);
    let isGnbr = uAgent.match(/GNBR/i);
    let wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width :
        window.innerWidth : window.innerWidth,
        wDpr, wFsize;
  
      let IEBorwer = uAgent.match(/MSIE/i);
      if(!!IEBorwer){
          alert('请使用IE10或以上版本访问，或使用其他浏览器访问');
      }
    let wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ?
        screen.height : window.innerHeight : window.innerHeight;
    if (window.devicePixelRatio) {
        wDpr = window.devicePixelRatio;
    } else {
        wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
    }
    if (isIOS) {
        wWidth = screen.width;
        wHeight = screen.height;
    }
    // if (wWidth > wHeight) {
    //     wWidth = wHeight;
    // }
    wFsize = wWidth > 750 ? 100 : wWidth / 7.5;
    wFsize = wFsize > 32 ? wFsize : 32;
    window.screenWidth_ = wWidth;
    if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) { //YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
        setTimeout(function () {
            wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ?
                screen.width : window.innerWidth : window.innerWidth;
            wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
            wFsize = wWidth > 750 ? 100 : wWidth / 7.5;
            wFsize = wFsize > 32 ? wFsize : 32;
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        }, 500);
    } else {
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
    }
  }
  
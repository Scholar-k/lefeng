var jq = $.noConflict();
var index = 1;
jq(document).ready(function(){
// 轮播图
var timer=setInterval(function lun(){
    // 图片轮播
    jq("#cycle_id div").eq(index).css({"zIndex":1,"opacity":.001}).siblings().css({"zIndex":-1});
    jq("#cycle_id div").eq((index+5)%6).css({"zIndex":0});
    jq("#cycle_id div").eq(index).animate({
        left:'0',
        opacity:'1'
    },1600,function(){
        jq("#cycle_id div").eq((index+1)%6).css({"left":jq("#cycle_id").width()});
    });
    index++;index=index%6;
    // 轮播图的滑动显示按钮部分
    jq(".slide-btn b").eq(index-1).addClass("on").siblings().removeClass("on");         
    jq(".slide-btn b").mouseenter(function(){
        jq(this).addClass("on").siblings().removeClass("on");
        jq("#cycle_id div").eq(jq(this).index()).css({"zIndex":1,"left":0}).siblings().css("zIndex",-1);
        clearInterval(timer);
    })
    // 实现离开滑动按钮后,轮播图从当前图继续轮播
    jq(".slide-btn b").mouseleave(function(){
        clearInterval(timer);
        index = jq(this).index() + 1;
        jq("#cycle_id div").eq(index).css({"left":jq("#cycle_id").width()});
        timer = setInterval(lun,5000);
    })
},5000)



// 左侧楼梯点击
jq(".flm-1").click(function(){
    jq(this).addClass("active");
    jq(".flm-2").removeClass("active");
    jq("body,html").animate({"scrollTop":jq(".tit-2").offset().top-jq(window).height()*.16},1000)
})
jq(".flm-2").click(function(){
    jq(this).addClass("active");
    jq(".flm-1").removeClass("active");
    jq("body,html").animate({"scrollTop":jq(".tit-7").offset().top},1000)
})


// 右侧下部的返回顶部
jq("#scroll-to-top").click(function(){
    jq("body,html").animate({scrollTop:0},1000,function(){
        jq("#scroll-to-top").hide()
    })
})

// 滚动条触发
jq(".float-left-menu").hide();
jq(window).scroll(function(){
    var tops = jq(document).scrollTop();
    // 触发滚动条,显示返回顶部
    jq("#scroll-to-top").show();
    jq("#scroll-to-top").animate({opacity:1});
    // 追加判断:手动滑到顶部后,返回顶部消失
    if(tops<=0){
        jq("#scroll-to-top").hide();
        jq(".float-left-menu").hide();
    }
    if(tops>=jq(window).height()/2){
        jq(".float-left-menu").show();
    }
    //根据滚动条显示当前楼层
    if(tops>=(jq(".tit-2").offset().top)-jq(window).height()/2){
        jq(".flm-1").addClass("active");
        jq(".flm-2").removeClass("active");
    }else{
        jq(".flm-1").removeClass("active");
    }
    /*if(tops>=(jq(".tit-7").offset().top)-jq(window).height()/2){
        jq("flm-2").addClass("active");
        jq(".flm-1").removeClass("active");
    }else{
        jq(".flm-2").removeClass("active");
    }*/
})
// 活动吸顶
window.onscroll = function(){
    //1 获取页面滚走的距离
    var tops = document.body.scrollTop || document.documentElement.scrollTop;
    //2 当页面滚走的距离 大于 头部的高度时   开始吸顶
    if( tops > 0 ){
        jq("#ceiling").css({"position":"fixed","top":0});
    }else{
        jq("#ceiling").css({"position":""});
    }
}



})

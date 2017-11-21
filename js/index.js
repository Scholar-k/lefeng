// var jq = $.noConflict();
var index = 1;
$(document).ready(function(){
// 轮播图
var timer=setInterval(function lun(){
    // 图片轮播
    $("#cycle_id div").eq(index).css({"zIndex":1,"opacity":.001}).siblings().css({"zIndex":-1});
    $("#cycle_id div").eq((index+5)%6).css({"zIndex":0});
    $("#cycle_id div").eq(index).animate({
        left:'0',
        opacity:'1'
    },1600,function(){
        $("#cycle_id div").eq((index+1)%6).css({"left":$("#cycle_id").width()});
    });
    index++;index=index%6;
    // 轮播图的滑动显示按钮部分
    $(".slide-btn b").eq(index-1).addClass("on").siblings().removeClass("on");         
    $(".slide-btn b").mouseenter(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $("#cycle_id div").eq($(this).index()).css({"zIndex":1,"left":0}).siblings().css("zIndex",-1);
        clearInterval(timer);
    })
    // 实现离开滑动按钮后,轮播图从当前图继续轮播
    $(".slide-btn b").mouseleave(function(){
        clearInterval(timer);
        index = $(this).index() + 1;
        $("#cycle_id div").eq(index).css({"left":$("#cycle_id").width()});
        timer = setInterval(lun,5000);
    })
},5000)



// 左侧楼梯点击
$(".flm-1").click(function(){
    $(this).addClass("active");
    $(".flm-2").removeClass("active");
    $("body,html").animate({"scrollTop":$(".tit-2").offset().top-$(window).height()*.16},1000)
})
$(".flm-2").click(function(){
    $(this).addClass("active");
    $(".flm-1").removeClass("active");
    $("body,html").animate({"scrollTop":$(".tit-7").offset().top-$(window).height()*.16},1000)
})


// 右侧下部的返回顶部
$("#scroll-to-top").click(function(){
    $("body,html").animate({scrollTop:0},1000,function(){
        $("#scroll-to-top").hide()
    })
})

// 滚动条触发
$(".float-left-menu").hide();
$(window).scroll(function(){
    var tops = $(document).scrollTop();
    // 触发滚动条,显示返回顶部
    $("#scroll-to-top").show();
    $("#scroll-to-top").animate({opacity:1});
    // 追加判断:手动滑到顶部后,返回顶部消失
    if(tops<=0){
        $("#scroll-to-top").hide();
        $(".float-left-menu").hide();
    }
    if(tops>=$(window).height()/2){
        $(".float-left-menu").show();
    }
    //根据滚动条显示当前楼层
    if(tops>=($(".tit-2").offset().top)-$(window).height()/2){
        $(".flm-1").addClass("active");
        $(".flm-2").removeClass("active");
    }else{
        $(".flm-1").removeClass("active");
    }
    if(tops>=($(".tit-7").offset().top)-$(window).height()/2){
        $(".flm-2").addClass("active");
        $(".flm-1").removeClass("active");
    }else{
        $(".flm-2").removeClass("active");
    }
})
// 活动吸顶
window.onscroll = function(){
    //1 获取页面滚走的距离
    var tops = document.body.scrollTop || document.documentElement.scrollTop;
    //2 当页面滚走的距离 大于 头部的高度时   开始吸顶
    if( tops > 0 ){
        $("#ceiling").css({"position":"fixed","top":0});
    }else{
        $("#ceiling").css({"position":""});
    }
}

})

//json部分
window.onload = function(){
    //品牌特卖ajax
    $.ajax({
        type:"get",
        url:"http://127.0.0.1/item/json/indexup.json",
        async:true,
        success : function(json){
            var conStr = "";
            for( var j = 0 ; j < json.tit2.length ; j++ ){
                var product = json.tit2[j];
    conStr+=` <div class="brand-item">
            <a href="list.html" title="${product.title}" target="_blank">
                <img src="${product.src}" style="display: inline;">
                    <div class="pms-wrap">
                        <p>${product.p1}</p>
                    </div>
            </a>
            <p class="brand-info">
                <span><b>${product.b}</b></span>
                    ${product.p2}       </p>
        </div>`
            }
            $(".content-2").html( conStr );
        }   
    })
    //爆款尝鲜ajax
    $.ajax({
        type:"get",
        url:"http://127.0.0.1/item/json/indexdown.json",
        async:true,
        success : function(json){
            var conStr = "";
            for( var j = 0 ; j < json.tit7.length ; j++ ){
                var products = json.tit7[j];
    conStr+=` <div class="pro-list pro-list-" data-sid="462078265" data-pid="181532559" data-haitao="false" data-min="1">
    <dl>
        <dt class="pro-pic"> 
            <a href="list.html" target="_blank" title="${products.title}"> 
            <img alt="" title="${products.title}" src="${products.src}"> </a> 
        </dt>
        <dd class="pro-nam">
            <b> ${products.b} </b> 
            <a href="list.html" target="_blank" title="${products.title}">${products.title}</a> 
            <i></i> 
        </dd>
        <dd class="pro-pri"> 
            <span>${products.span}</span>
            <b> ${products.b2}</b> 
            <a class="joinCar add-to-cart hide disabled" href="javascript:void(0)">${products.a}</a> 
        </dd>
        <div class="wrap"></div> </dl> 
    </div>`
            }
            $(".content-7").html( conStr );
            $(".pro-pri a").css("background-positionY","-56px");
        }   
    })
}

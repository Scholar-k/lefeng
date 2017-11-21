// 小型放大镜一个
var jq = $.noConflict();
jq(document).ready(function(){
    jq(".m-pic").mouseenter(function(){
        jq(".big img").show();
        jq("#layer").show();
        jq("#mask").css({
            "backgroundImage":"url(images/8809241887782-330.jpg)"
        }).show();
        jq(".big").show();
    }).mouseleave(function(){
        jq("#layer").hide();
        jq("#mask").hide();
        jq(".big").hide();
    }).mousemove(function(e){
        var e = e || event;
        var x = e.pageX - jq(".m-pic .tu1").offset().left - jq("#mask").outerWidth()/2;
        var y = e.pageY - jq(".m-pic .tu1").offset().top - jq("#mask").outerHeight()/2;
        var maxL = jq(".m-pic").outerWidth() - jq("#mask").outerWidth();
        var maxT = jq(".m-pic").outerHeight() - jq("#mask").outerHeight();       
        x = Math.min( maxL , Math.max(0,x) );
        y = Math.min( maxT , Math.max(0,y) );   
        jq("#mask").css({
            "left" : x ,
            "top" : y ,
            "backgroundPositionX" : -x,
            "backgroundPositionY" : -y
        })
        var bigImgX = x*jq(".big img").width()/jq(".m-pic .tu1").width();
        var bigImgY = y*jq(".big img").height()/jq(".m-pic .tu1").height();
        jq(".big img").css({
            "left" : -bigImgX,
            "top" : -bigImgY
        })
    })
})
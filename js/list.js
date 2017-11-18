// 旋转星效果(list页的banner中,星每转一周横条星加一,最多加到三个)
var jq = $.noConflict();
jq(document).ready(function(){
	jq(".brand-img").mouseenter(function(){
		jq("#round .sorround").show();
		var timer=setInterval(function(){
			//横向循环轮播的星
			jq("#round .line").show();
			jq("#round .line").animate({left:'85%'},2000,function(){
				jq("#round .line").css({"left":"13.5%"});
				jq("#round .line").hide();
			});
			// 长方形循环转动的星
			jq("#round .sorround").animate({left:'85%'},1000);
			jq("#round .sorround").animate({top:'602px'},600);
			jq("#round .sorround").animate({left:'13.5%'},1000);
			jq("#round .sorround").animate({top:'220px'},600,function(){
				// 添加横向循环转的星
				if(jq("#round .line").length==2){
					jq("#round .line").last().after(jq("#round .line").last().clone());
				}
				if(jq("#round .line").eq(2)){
					jq("#round .line").eq(2).css({"left":jq("body").width()*.135-jq("#round .line").eq(2).index()*7.2});
				};
				if(jq("#round .line").length==1){
					jq("#round .line").last().after(jq("#round .line").last().clone());
				}
				jq("#round .line").eq(1).css({"left":jq("body").width()*.135-jq("#round .line").eq(1).index()*22});
			})
		},3266);
		// 鼠标离开后初始化
		jq(".brand-img").mouseleave(function(){
			clearInterval(timer);
			jq("#round .line").nextAll().remove();
			jq("#round .sorround").hide();
		})
	})
})
// 旋转星效果(list页的banner中,星每转一周横条星加一,最多加到三个)
// var $ = $.noConflict();
$(document).ready(function(){
	$(".brand-img").mouseenter(function(){
		$("#round .sorround").show();
		var timer=setInterval(function(){
			//横向循环轮播的星
			$("#round .line").show();
			$("#round .line").animate({left:'85%'},2000,function(){
				$("#round .line").css({"left":"13.5%"});
				$("#round .line").hide();
			});
			// 长方形循环转动的星
			$("#round .sorround").animate({left:'85%'},1000);
			$("#round .sorround").animate({top:'602px'},600);
			$("#round .sorround").animate({left:'13.5%'},1000);
			$("#round .sorround").animate({top:'220px'},600,function(){
				// 添加横向循环转的星
				if($("#round .line").length==2){
					$("#round .line").last().after($("#round .line").last().clone());
				}
				if($("#round .line").eq(2)){
					$("#round .line").eq(2).css({"left":$("body").width()*.135-$("#round .line").eq(2).index()*7.2});
				};
				if($("#round .line").length==1){
					$("#round .line").last().after($("#round .line").last().clone());
				}
				$("#round .line").eq(1).css({"left":$("body").width()*.135-$("#round .line").eq(1).index()*22});
			})
		},3266);
		// 鼠标离开后初始化
		$(".brand-img").mouseleave(function(){
			clearInterval(timer);
			$("#round .line").nextAll().remove();
			$("#round .sorround").hide();
		})
	})


//商品
window.onload = function(){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/item/json/list.json",
		async:true,
		success : function(json){
			var conStr = "";
			for( var j = 0 ; j < json.makeup.length ; j++ ){
				var product = json.makeup[j];
	conStr+=`<div data-min="1" data-haitao="1" data-pid="252420610" data-sid="663258100" name="products" class="pruwrap" saleout="1">
                <dl>
                    <dt>
                        <a href="details.html?pid=${product.title}" title="${product.title}" target="_blank">
                        	<img src="${product.src}" alt="${product.alt}">
                        </a>
                        <div class="wraptr">
                            <!-- 缺货商品在图片右上角显示已抢光 -->
                            <b class="product_no"></b>
                        </div>
                        <ul class="pro-tags">
                            <li>${product.li1}</li>
                            <li>${product.li2}</li>
                            <li>${product.li3}</li>
                        </ul>
                    </dt>

                    <dd class="nam">
                        <a title="${product.span}" target="_blank" href="details.html">
                            <span>${product.span}</span>
                        </a>
                    </dd>
                    <dd class="pri">
                        <span class="price-tag">￥</span>
                        <span class="price">${product.price}</span>
                        <b> ${product.b} </b>
                        <del class="spri">${product.spri}</del>
                        <a class="to joinCar add-to-cart disabled" href="javascript:void(0)">${product.a}</a>
                    </dd>
                </dl>
            </div>`
			}
			$(".makeup").html( conStr );
		}
	
		/*//商品添加  点击商品 将商品信息存入到cookie中
		$(".makeup").on("click","button",function(){
			var arr = [];
			var flag = true;//如果值为真 就向arr中push商品
			var datajson = {
				title:$(this).next().data("title"),
	            src:$(this).next().data("src"),
	            alt:$(this).next().data("alt"),
	            li1:$(this).next().data("li1"),
	            li2:$(this).next().data("li2"), 
	            li3:$(this).next().data("li3"),
	            span:$(this).next().data("span"),
	            price:$(this).next().data("price"),
	            b:$(this).next().data("b"),
	            spri:$(this).next().data("spri"),
	            a:$(this).next().data("a"),
	            count : 1
			}
			
			//再次点击时   商品会被覆盖    可以先将cookie中的数据取出来  存入到arr中
			var oldCookie = getCookie("prolist");
			//如果cookie中没有数据 直接push 
			if( oldCookie.length != 0 ){
				arr=oldCookie;
				//再次点击商品时  判断这个商品在原cookie中是否存在  如果存在就将数量++
				for( var i = 0 ; i < arr.length ; i++ ){
					if( datajson.id == arr[i].id && datajson.name == arr[i].name){
						arr[i].count++;
						flag = false;
						break;
					}
				}
			}
			
			if( flag ){//如果值为真 就像arr中push商品
				arr.push( datajson );
			}
			
			//将数组信息存入到cookie
			setCookie( "prolist", JSON.stringify(arr) );
			console.log( document.cookie );*/
		})
	}
	

})
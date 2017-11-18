/*/*webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(130);


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	var LFControl=__webpack_require__(35);
	var addToCartValid= __webpack_require__(37);

	var publicHeadAndTaul = {
		islogin:false,
		loginDef:false,
		Init: function(){
			publicHeadAndTaul.bind.fixWarehouse();
			publicHeadAndTaul.bind.DeliveryAddress();
			publicHeadAndTaul.bind.CheadInfo();
			publicHeadAndTaul.bind.ReDeliveryAddress();
			publicHeadAndTaul.bind.GetHotKeys();
			publicHeadAndTaul.bind.ShopCart();
			$.when(publicHeadAndTaul.bind.CheckLogin()).done(function(){publicHeadAndTaul.loginDef = true;}).fail(function(){publicHeadAndTaul.loginDef = false;});
			publicHeadAndTaul.bind.AddFavorite( $('#Chead-save'), '乐蜂网', 'http://www.lefeng.com' );
			publicHeadAndTaul.bind.getShopCar();
			publicHeadAndTaul.bind.setBrandLink();
			publicHeadAndTaul.bind.addBgBlack();
			publicHeadAndTaul.bind.loadSideNav();

			

			$('.Cfooter-cr>span').eq(1).text('天津品简电子商务有限公司');
			$('.Cfooter-cr').html('<div class="Cfooter-cr-a"><a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/76.html">关于乐蜂</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/77.html">免责声明</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/78.html">隐私声明</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/79.html">版权声明</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/help/zhaopin.html">招聘信息</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/help/73.html">联系我们</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/help/helpCenter.html">帮助中心</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/80.html">友情链接</a> </div> <span>Copyright <b>©</b> 2008-2016 Lefeng.com All Rights Reserved.</span> <span>天津品简电子商务有限公司</span> <a target="_blank" href="http://www.miibeian.gov.cn/?biid=7520">津ICP备15005555号-1</a>&nbsp;&nbsp;<span>京公网安备11010502014183</span> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/242.html">营业执照</a><div class="Cfooter-cr-info"> <span>公司全称：天津品简电子商务有限公司  </span> &nbsp; &nbsp; <span>  公司固话：400 000 1818   </span> &nbsp; &nbsp; <span>   公司地址：天津市武清区京津电子商务产业园宏瑞道18号</span> </div><div class="Cfooter-cr-img"> <a id="___szfw_logo___" class="cxwz" rel="nofollow" target="_blank" href="https://search.szfw.org/cert/l/CX20120918001688001713"></a> <a class="kxwz" rel="nofollow" target="_blank" href="https://ss.knet.cn/verifyseal.dll?sn=e15011931011457422bp2j000000&amp;ct=df&amp;a=1&amp;pa=0.1418370669707656"></a> <a class="pjzxlm" rel="nofollow" target="_blank" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1074823632"></a> <a class="itrust" rel="nofollow" target="_blank" href="http://www.315online.com.cn/member/315130044.html">中国互联网信用评价中心</a> <a href="http://www.lefeng.com/notice/84.html" target="_blank" rel="nofollow" class="xfwq"></a> </div>');
		}
	};
	publicHeadAndTaul.bind = {
		fixWarehouse: function () {
			// 已选择陕西的会把分仓存在cookie中，需要强行改cookie
			if (LFControl.cookie.Get('country_id') == '106101' && LFControl.cookie.Get('warehouse') == 'VIP_CD') {
				LFControl.cookie.Set('warehouse', 'VIP_HZ', 3600 * 24 * 30, '/', '.lefeng.com');
			}
		},
		addBgBlack:function(){
				$(".regionalTipsBk").css("height",$(document.body).height());
		},
		loadSideNav:function(){
			if($('.orderDivId').length) $.ajax({
				url: "http://www.lefeng.com/ajax/hierarchyCategoryTree",
				dataType: "jsonp",
				jsonp:'callback',
				success: function(data){
					if( +data.code === 0 ){
						var tree=data.data;
						var html='', nav_6, nav_3,child2;
						for(var i=0;i<tree.length;i++){
							nav_6='';
							nav_3=['',''];

							if( tree[i].children ) for(var j=0; j<tree[i].children.length&&j<6; j++){
								child2=tree[i].children[j];
								nav_6+='<a target="_blank" href="'+child2.url+'">'+child2.name+'</a>';
								nav_3[j%2]+='<li><strong><a target="_blank" href="'+child2.url+'">'+child2.name+' &gt;</a></strong><div class="float-list-cont"'+(child2.children&&child2.children.length?'':' style="border-bottom:none;"')+'>';
								if(child2.children)for(var k=0;k<child2.children.length;k++){
									nav_3[j%2]+='<a target="_blank" href="'+child2.children[k].url+'">'+child2.children[k].name+'</a>';
								}
								nav_3[j%2]+='</div></li>';
							}

							html+= '<dl id="webf'+i+'">\
								<dt>\
									<strong class="class-'+(i+1)+'"><img src="'+tree[i].image+'" />'+tree[i].name+'</strong>\
									<p>'+nav_6+'</p>\
								</dt>\
								<dd>\
									<!-- 3lie -->\
									<ul>'+nav_3[0]+'</ul>\
									<ul>'+nav_3[1]+'</ul>\
								</dd>\
							</dl>';
						}
						$('.orderDivId').html(html+'<a class="class-more-btn" target="_blank" href="http://list.lefeng.com">查看全部分类 &gt;&gt;</a>');
					}
				}
			});

			$('.Cnav-menu-btn').hover(function(){
				$(this).addClass('active');
			},function(){
				$(this).removeClass('active');
			});

		},
		setHeadSearchText:function(searchDefaultText){
			if ($("#search").val() === '' || $("#search").val() === searchDefaultText || $("#search").val() === '搜商品') {
				$("#search").val(searchDefaultText);
			}
			else {
				searchDefaultText = $("#search").val();
			}
			LFControl.search.WordFun({input: "search", auto: "auto", btn: "search-submit", defaultText: searchDefaultText});
			$('#search').focus(function(e){
				$(this).parent().addClass('active');
			});
			$('#search').blur(function(e){
				$(this).parent().removeClass('active');
			});
		},
		DeliveryAddress:function(){
			//送货地址
			$( '.areaSellBtn' ).mouseenter( function(){
				$( '.areaSell' ).show();
			})
			var coutnry_id = LFControl.cookie.Get("country_id");
			if(typeof coutnry_id!="undefined") {
				for (var i = 0; i < $('.areaSell a').length; i++) {
					if ($('.areaSell a').eq(i).attr('pid') == coutnry_id) {
						$(".areaSellBtn").html('<i class="up"></i>' + $('.areaSell a').eq(i).text());
					}
				}
			}
			$( '.areaSell' ).delegate('', 'mouseleave',function() {
					$(this).hide();
			}).delegate('ul li a', 'click', function() {
				var msg = $(this).attr('pid');
				var warehouse = $(this).attr('warehouse');
				// 陕西省切华中仓
	            if (msg == '106101' && warehouse == 'VIP_CD') {
	                warehouse = 'VIP_HZ'
	            }
				$(".areaSellBtn").html('<i class="up"></i>'+$(this).text());
				$(".areaSell").hide();
				LFControl.cookie.Set("country_id",msg,39528000,'/','lefeng.com');
				LFControl.cookie.Set("warehouse",warehouse,39528000,'/','lefeng.com');
			   //LFControl.cookie.Set("country_id",msg,39528000);
				window.location.reload();
			});
		},
		CheadInfo:function(){     //我的订单 快速导航 收藏订单 手机乐蜂 购物车
			$('#Chead_fastnav, .Chead-app, .Chead_myh, #Chead-myhome, #Cnav_starp dt').mouseenter(function(){
				$(this).next().show();
			}).mouseleave(function() {
				//$(this).next().slideUp(100);
			});
		   $('#Chead_fastnav, .Chead-app, .Chead_myh, #Chead-myhome, .shopping-btn').next().mouseleave(function(){
				$(this).hide();
			});
		},


		ReDeliveryAddress: function(){
			/*steven*/
			//return;
			if( !LFControl.cookie.Get("country_id") ){ //没有
				$( '.regionalTipsBk' ).show();
				$( '.regionalTipsBk' ).css( "opacity","0.7" );
				$( '.regionalTipBox' ).show();
				$(".regionalTipBox").delegate('dl a', 'click', function() {
					var msg = $(this).attr('pid');
					$(".areaSellBtn").html('<i class="up"></i>'+$(this).text());
					$(".regionalTipBox").hide(100);
					$( '.regionalTipsBk' ).hide();
					LFControl.cookie.Set("country_id",msg,39528000,'/','lefeng.com');
					//LFControl.cookie.Set("country_id",msg,39528000);
					window.location.reload();
				});
			}
		},
		GetHotKeys: function() {
			LFControl.search.GetHotKeys(function(htmlStr, defaultText) {
				$('#hotp,#search-tags-2').html('热门：' + htmlStr);
				publicHeadAndTaul.bind.setHeadSearchText(defaultText);
			});
		},
		ShopCart:function(){
			$( '.shopping-btn' ).mouseenter( function(){
				var cartCount = + LFControl.cookie.Get("cart_count");
				if(!cartCount) {
					cartCount = 0;
					$('.shopping-list').find('.noshop').show();
					$('.shopping-list').find('.haveshop').hide();
					$('.shopping-list').find('.noshop').html('');
					$('.shopping-list').find('.noshop').css("height","30px");
					$( ".shopping-list-title strong, .shopping-btn strong").html( cartCount );
					LFControl.boxLoading.Start('.noshop');//添加loading样式
					$('.shopping-list').show();
				}

				var url = 'http://passport.lefeng.com/ajax/validUserLogin?callback=?';
				$.ajax({
					type:"GET",
					url:url,
					dataType:"jsonp",
					statusCode: {
						404: function () {
							LFControl.boxLoading.End('.noshop');//加载完毕后去除loading
							publicHeadAndTaul.bind.shopCartError();
						}
					},
					success:function(data){
						if( data.code == 0 ){
							if( data.data.isLogin != 1 ){
								LFControl.boxLoading.End('.noshop');//加载完毕后去除loading
							   publicHeadAndTaul.bind.shopCartError();
							}else{
								var cartCount = LFControl.cookie.Get("cart_count");
								if('undefined' == cartCount || null == cartCount) {
									cartCount = 0;
								}
								$( '.shopping-btn' ).html( '<strong>'+cartCount+'</strong>' );
								var _this = $(this);
								
								var url = LFControl.settings.API_PATH + '/neptune/cart/get/v2';
								$.ajax({
									type: "GET",
									url: url,
									data: {
										warehouse: LFControl.cookie.Get("warehouse")
									},
									dataType: "jsonp",
									jsonp: 'jsonp',
									statusCode: {
										404: function () {
											LFControl.boxLoading.End('.noshop');//加载完毕后去除loading
											publicHeadAndTaul.bind.shopCartError();
										}
									},
									success:function(res){
										if ( data.code == 0 ){
											LFControl.boxLoading.End('.noshop');//加载完毕后去除loading
											var cartInfo = res.data.cartInfo,
												supplierList = res.data.supplierList;

											if (cartInfo && +cartInfo.skuCount !== 0) {
												var str = '';
												$(".shopping-list-title strong, .shopping-btn strong").html(cartInfo.skuCount);
												$("#totalProduct").html(cartInfo.skuCount);
												$("#totalMoney").html('<em>￥</em>' + cartInfo.amounts.payTotal);

												// 如果购物车非空，则添加点击事件
												$('.shopping-list-title').click(function () {
													location.href = "http://shopping.lefeng.com/showCart";
												});

												// 购物车分供货商，每个供货商可能有若干个档期，每个档期下可能有多个商品(注：档期指真实档期)
												for (var supplierListCount = 0, supplierListLength = supplierList.length; supplierListCount < supplierListLength; supplierListCount++) {
													var supplier = supplierList[supplierListCount],
														brandList = supplier.brandList;
													for (var brandListCount = 0, brandListLength = brandList.length; brandListCount < brandListLength; brandListCount++) {
														var sizeList = brandList[brandListCount].sizeList;
														for (var productCount = 0, sizeListLength = sizeList.length; productCount < sizeListLength; productCount++) {
															var sizeInfo = sizeList[productCount],
																productInfo = sizeInfo.productInfo;
															str += '<dl><dt><a href="http://product.lefeng.com/product/' + productInfo.id + '.html" target="_blank"><img src="' + productInfo.litterImage + '"></a></dt>' +
																'<dd class="shopping-pro"><a href="http://product.lefeng.com/product/' + productInfo.id + '.html" target="_blank">' + productInfo.name + '</a></dd>' +
																'<dd class="shopping-price"><em>￥' + productInfo.vipshopPrice + '</em>×' + sizeInfo.num + '</dd></dl>';
														}
													}

												}
												$("#shopping_list_info").html(str);
												publicHeadAndTaul.bind.MiniCart();
												_this.next().show();
												LFControl.cookie.Del("cart_count", "/", "lefeng.com");
												LFControl.cookie.Set("cart_count", cartInfo.skuCount, 1200, '/', 'lefeng.com');
												$('.shopping-list').show();
												$('.shopping-list').find('.haveshop').show();
												$('.shopping-list').find('.noshop').hide();
											}
										}else {
											LFControl.boxLoading.End('.noshop');//加载完毕后去除loading
											publicHeadAndTaul.bind.shopCartError();
										}
									}
								});
							}
						}
					}
				});
			})
		},
		shopCartError:function(){
			$( '.shopping-list' ).show();
			$( '.shopping-list' ).find( '.noshop' ).show();
			$( '.shopping-list' ).find( '.noshop' ).html('您的购物车还没有商品，<br>赶紧去选购吧！');
			$( '.shopping-list' ).find( '.haveshop' ).hide();
			$( ".shopping-list-title strong, .shopping-btn strong").html( '0' );
		},
		getShopCar:function(){
			var url = 'http://passport.lefeng.com/ajax/validUserLogin?callback=?';
				$.getJSON( url, function(data) {
					  if( data.code == 0 ){
							if( data.data.isLogin != 1 ){
								$( ".shopping-list-title strong, .shopping-btn strong").html( '0' );
							}else{
								var cartCount = LFControl.cookie.Get("cart_count");
								if('undefined' == cartCount || null == cartCount) {
									cartCount = 0;
								}
								$( '.shopping-btn' ).html( '<strong>'+cartCount+'</strong>' );
							}
						}
				});
		},
		CheckLogin:function(){
			var def = $.Deferred();
			var url = 'http://passport.lefeng.com/ajax/validUserLogin?callback=?';
			$.getJSON( url, function(data) {
				if( data.code == 0 ){
					if( data.data.isLogin == 1 ){  //登录
						publicHeadAndTaul.islogin=true;
						$( ".Chead-welcome").html( '嗡，欢迎来乐蜂，<a href="http://order.lefeng.com/">'+data.data.userNick+'</a>&nbsp; | &nbsp;<a href="javascript:;" id="exit">退出登录</a>' );
					}
					def.resolve();
					publicHeadAndTaul.bind.exit();
				}
			});
			return def.promise();
		},
		AddFavorite:function(e, t, n) {
			var t = t || $("title").text(),n = n || location.href;
			e.click(function() {
				return document.all ? window.external.AddFavorite(n, t) : alert("请使用Ctrl+D加入收藏"),!1
			});
		},
		exit:function(){//用户退出
			$("#exit").click(function(){
				$.ajax({
					url: "http://passport.lefeng.com/ajax/logout",
					dataType: "jsonp",
					jsonp:'callback',
					async : false,
					success: function(data){
						if (data.code == 0) {
							if (data.data.isLogout == 1) {
								$(".Chead-welcome").html('欢迎来到乐蜂，请&nbsp;<a href="http://passport.lefeng.com/toLogin">登录</a>&nbsp; | &nbsp;<a href="http://passport.lefeng.com/toRegister">免费注册</a>');
								LFControl.cookie.Del("cart_count", "/", "lefeng.com");
								if(['order.lefeng.com','passport.lefeng.com'].indexOf(window.location.hostname)>-1){
									window.location.reload();
								}
								publicHeadAndTaul.islogin = false;
							}
						}
					}
				})
			})
		},
		JsLoaded:true,
		MiniCart:function(){//获取迷你购物车的内容
			if ($("#shopping_list_info dl").size() > 5) {
				if (publicHeadAndTaul.bind.JsLoaded) {
					publicHeadAndTaul.bind.JsLoaded = false;
					publicHeadAndTaul.bind.loadScript("http://h5rsc.vipstatic.com/lefeng_pc/js/page/jscroll.js", publicHeadAndTaul.bind.cart_refScroll);
				} else {
					setTimeout(function(){
						publicHeadAndTaul.bind.cart_refScroll();
					},500)
				}
			}
		},
		cart_refScroll:function(){
			$("#shopping_list_info").addClass('shopping-list-barOn')
			$("#shopping_list_info").jscroll({
					W:"5px",
					Btn:{btn:false},
					Bg:"#fff",
					Bar:{
						Bd:{Out:"#ccc",Hover:"#ccc"},//设置滚动滚轴边框颜色：鼠标离开(默认)，经过
						Bg:{Out:"#ccc",Hover:"#ccc",Focus:"orange"}
					}
				});
		},
		loadScript:function(url, callback){
			var script = document.createElement("script")
			script.type = "text/javascript";
			if (script.readyState) { //IE
				script.onreadystatechange = function() {
					if (script.readyState == "loaded" || script.readyState == "complete") {
						script.onreadystatechange = null;
						callback();
					}
				};
			} else { //Others
				script.onload = function() {
					callback();
				};
			}
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		},


		AddToShopCart:function(obj, num, noproduct, yzm, sessionId){

			var pid = obj.attr( 'data-pid' );



			if (publicHeadAndTaul.loginDef) {
				if (publicHeadAndTaul.islogin) {  //登录
					var haiTao = obj.attr('data-haitao');
					var url = "";
					var data = "";
					if(haiTao!=1 && !yzm){
						addToCartValid(pid, function(yzm, sessionId){
							publicHeadAndTaul.bind.AddToShopCart( obj, num, noproduct, yzm, sessionId );
						},function(e){});
						return;
					}


					var areaid = LFControl.cookie.Get("country_id") ? LFControl.cookie.Get("country_id") : 101101;
					if (haiTao == 1) {
						var pid = obj.attr('data-pid');
						$.ajax({
							url: "http://product.lefeng.com/ajax/getProductStock",
							data: {areaId: areaid, gids: pid},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function (data) {
								if (data.data[0] != undefined && data.data[0].type == 1) {  //no stock
									if (obj.attr('data-page') == 'detail') {
										$('.joinCar').addClass('db3');
										$('.joinCar2').addClass('end');
									} else {
										obj.find(noproduct).html('<b class="end"></b>');
										obj.find('.joinCar').remove();
									}
								} else {
									url = 'http://shopping.lefeng.com/showHaitaoConfirm';
									window.location.href = url + "?gid=" + pid;
								}
							}
						});
					} else {
						var sizeId = obj.attr('data-sid');
						addurl = "http://shopping.lefeng.com/ajax/addCart";
						data = {sizeId: sizeId, areaid: areaid, sizeNum: num };
						if(yzm!==1) {
							data.captcha = yzm;
							data.sessionId = sessionId;
						}
						$.ajax({
							url: addurl,
							data: data,
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function (data) {
								if (data.code == '0') {
									var skuCount = data.skuCount;
									var goodsTotal = data.goodsTotal;
									$('#addsuccess .sum p:eq(0)').html('购物车共 <b>' + skuCount + '</b> 件商品&nbsp;&nbsp;合计：<b>' + goodsTotal + '</b> 元');
									$('#addsuccess').show();
									$('.succ-close, #addsuccess .sum p:eq(1) a:eq(1)').click(function () {
										$('#addsuccess').hide();
									});
									LFControl.cookie.Set("cart_count", skuCount, 1200, '/', 'lefeng.com');
									$('.shopping-btn').html('<strong>' + skuCount + '</strong>');
								} else if (data.code == '11026') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>超过最大可购买款式数');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '11007') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>超过购物车最大数量限制');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '11024') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>很遗憾，你所在的地区没有售卖该商品');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '11025') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>抱歉！该专场限量购买，无法添加更多商品');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '11027') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>低于最小可购买款式数');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '90005') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>系统异常，请稍后重试');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '11020') {
									$('.failure .sum h3').html('<span class="succ-ico"></span>商品未上架');
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								} else if (data.code == '90008' || data.code == '3022' ) {
									location.href = 'http://passport.lefeng.com/toLogin?returnUrl=' + window.location.href;
								} else if (data.code == '11028') {  //已抢光
									obj.find(noproduct).html('<b class="end"></b>');
									obj.find('.joinCar').remove();
								} else {                             //默认失败
									$('.failure').show();
									$('.succ-close').click(function () {
										$('.failure').hide();
									})
								}
								setTimeout(function () {
									$('#addsuccess,.failure,.stock').fadeOut('fast');
								}, 4000);
							},
							error: function (data) {
								$('.failure').show();
								$('.succ-close').click(function () {
									$('.failure').hide();
								});
								setTimeout(function () {
									$('#addsuccess,.failure,.stock').fadeOut('fast');
								}, 4000);
							}
						});
					}
				} else {
					location.href = 'http://passport.lefeng.com/toLogin?returnUrl=' + window.location.href;
				}
			} else {
				setTimeout(function () {
					publicHeadAndTaul.bind.AddToShopCart();
					setTimeout(arguments.callee, 400);
				}, 400);
			}
		},
		GetStock: function(param) {
			var option = {
				tag: param.tag,
				pageType: param.pageType || 'list',
				wrap: param.wrap,
				cont1: param.cont1,
				cont2: param.cont2,
				btn: param.btn,
				btnNullType:param.btnNullType || 'true',
				btnNull: param.btnNull,
				btnText:param.btnText || false,
				stockType_1:param.stockType_1 || 'true',
				stockType_2:param.stockType_2 || 'true',
				btn2: param.btn2,
				btn3: param.btn3,
				btn4: param.btn4,
				btn5: param.btn5,
				btnNull2: param.btnNull2,
				btnNull3: param.btnNull3,
				btnNull4: param.btnNull4,
				btnNull5: param.btnNull5
			}
			var proID = [],
				areaId = LFControl.cookie.Get("areaId");
				
			$(option.tag).each(function(i, n) {//数组，全部data-pid，下面执行去重
				var _this = $(this).attr('data-pid');
				proID.push(_this);
			});

			var outArry = function(arr) {//数组去重
				var result = [],
					hash = {};
				for (var i = 0, elem; (elem = arr[i]) != null; i++) {
					if (!hash[elem]) {
						result.push(elem);
						hash[elem] = true;
					}
				}
				return result.toString();
			}
			var gids = outArry(proID);
			//读取库存
			$.ajax({
				url: 'http://product.lefeng.com/ajax/getProductStock',
				type: 'get',
				dataType: 'jsonp',
				jsonp:'callback',
				data: {areaId: areaId,gids: gids},
				success: function(data) {
					var list = data.data;
					if (option.pageType == 'list') {
						for (var i = 0; i < list.length; i++) {
							var _thisGid = list[i].gid; //json返回的的当前id
							$(option.tag).each(function(j, n) {
								var _thisPro = $(this).attr('data-pid'); //html的当前id
								var _thisHaitao = $(this).attr('data-haitao'); //是否海淘
								var _skuid = $(this).attr('data-sid'); //skuId

								if (_thisGid == _thisPro) {
									if (list[i].type == 1) {//无库存
										if (option.stockType_1 == 'true') {
											$(option.tag).eq(j).find(option.wrap).html('').append(option.cont1);
										};
										if (option.btnNullType == 'true') {//修改按钮状态
											$(option.tag).eq(j).find(option.btn).addClass(option.btnNull).attr('href', 'javascript:void(0)').unbind();
										}else{
											$(option.tag).eq(j).find(option.btn).remove();
										}
										if (option.btnText) {//修改按钮文字
											$(option.tag).eq(j).find(option.btn).html(option.btnText);
										};

										/*------------------------------------------ 暂时为单品页添加此设置 ---------------------------------------------*/
										if (_thisHaitao == 0) {//不是海淘
											$(option.btn2).addClass(option.btnNull2).attr('href', 'javascript:void(0)').unbind();
											$(option.btn4).addClass(option.btnNull4).attr('href', 'javascript:void(0)').unbind();
											_tag.dcsMultiTrack('wt.pid', _skuid, 'wt.s_cart', 'quehuo');
										}else if(_thisHaitao == 1){//是海淘
											$(option.btn3).addClass(option.btnNull3).attr('href', 'javascript:void(0)').unbind();
											$(option.btn5).addClass(option.btnNull5).attr('href', 'javascript:void(0)').unbind();
											_tag.dcsMultiTrack('wt.pid', _skuid, 'wt.s_cart', 'quehuo');
											$('.targetDeliveryDate').hide();
										}
									} else if (list[i].type == 2) {//即将无库存
										if (option.stockType_2 == 'true') {
											$(option.tag).eq(j).find(option.wrap).html('').append(option.cont2);
										}
									}
								}
							})
						}
					}
				}
			});
		},
		warehouse: [
			["103105", "104104", "104105", "104106"],//华南
			["103101", "103102", "103103", "103104", "103107"],//华东
			["105100", "105101", "105102", "105103", "105104", "106102", "106103", "106104", "106105"],//西南
			["101101", "101102", "101103", "101104", "101105", "102101", "102102", "102103"],//华北
			["103106", "104101", "104102", "104103", "106101"]//华中
		],
		getHouse: function (id) {
			var house = this.warehouse, houseIndex;
			for (var i = 0; i < house.length; i++) {
				if (!houseIndex) {
					for (var j = 0; j < house[i].length; j++) {
						if (id == house[i][j]) {
							houseIndex = i;
							break;
						}
					}
				}
			}
			return houseIndex;
		},
		setBrandLink:function(){//疯购全球链接，分仓设置
			var houseId = LFControl.cookie.Get("country_id");
			var index = this.getHouse(houseId);

			var houseArr = [
				'http://brand.lefeng.com/showGoodsList/742332752.html',//华南
				'http://brand.lefeng.com/showGoodsList/742332753.html',//华东
				'http://brand.lefeng.com/showGoodsList/742332754.html',//西南
				'http://brand.lefeng.com/showGoodsList/742332755.html',//华北
				'http://brand.lefeng.com/showGoodsList/742332756.html'];//华中
			$(".Cnav-one a").last().attr({'href':houseArr[index]+"?f=1","target":"_blank"});
		}
	}
	$(document).ready(function(){
		publicHeadAndTaul.Init();
	});

	if( true )
		module.exports=publicHeadAndTaul;


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

	var LFControl=__webpack_require__(35);

	module.exports=(function(){



	    return function(id,submited,close){

	        //LFControl.loading.Start();
	        var sessionId;


	        $.ajax({
	            url:'http://shopping.lefeng.com/ajax/checkProductAntiBrushed',
	            data:{gid:id},
	            dataType:'jsonp',
	            type:'get',
	            success:function(data){
	                if(data.code==0 && data.data==1){
	                    $('body').append(
	                        '<div class="addToCartValid-bg"></div>' +
	                        '<div class="addToCartValid">' +
	                        '<div class="addToCartValid-title">请输入验证码</div>' +
	                        '<a href="javascript:">&times</a>' +
	                        '<div class="addToCartValid-inputs">' +
	                        '<input type="text" maxlength="10" /> ' +
	                        '<img src="" alt="验证码图片" title="点击刷新验证码"/>' +
	                        '<p></p> ' +
	                        '</div>' +
	                        '<button class="addToCartValid-submit">提交</button>'+
	                        '</div>');

	                    $('.addToCartValid a').on('click', function(e){
	                        close();
	                        $('.addToCartValid-bg,.addToCartValid').remove();
	                    });

	                    $('.addToCartValid img').on('click', function(e){
	                        var self=this;
	                        $.ajax({
	                            url:'http://shopping.lefeng.com/ajax/getVerificationCode',
	                            data:{_:Math.random()},
	                            dataType:'jsonp',
	                            type:'get',
	                            success:function(data){
	                                if(data.code==0){
	                                    sessionId=data.data.sessionId;
	                                    self.src='data:image/png;base64,'+data.data.captchaPic;
	                                }
	                            }});
	                    });

	                    $('.addToCartValid-submit').click(function(e){
	                        var yzm = $.trim($('.addToCartValid-inputs input').val()||'');
	                        if(!yzm) alert('请输入验证码');
	                        else {
	                            $('.addToCartValid-bg,.addToCartValid').remove();
	                            submited(yzm, sessionId);
	                        }
	                    });

	                    $('.addToCartValid img').click();

	                }else {
	                    submited(1);
	                }

	                //LFControl.loading.End();
	            },
	            error:function(e){
	                console.log(e);
	                //LFControl.loading.End();
	            }
	        });



	    };
	})();























/***/ }),

/***/ 103:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

	
	__webpack_require__(103);

	__webpack_require__(50);
	__webpack_require__(29);

	__webpack_require__(34);


/***/ })

});*/*/
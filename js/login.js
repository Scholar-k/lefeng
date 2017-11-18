/*var login = {
	//页面初始化加载页面
	init:function() {
		$("#formSubmit").bind('click',login.doLogin);//绑定登录按钮click
		login.showYZM();//显示图形验证码
		$("#yzmPic").bind('click',login.refreshYzm);//绑定刷新图形页面click
		$("#changeYzm").bind('click',login.refreshYzm);
		login.showErrorMsg();//如果有错误信息，显示错误信息
		login.bindWeixinLogin();//绑定微信联合登陆Click事件
		login.bindSinaLogin();//绑定sina联合登陆
		login.bindQQLogin();//绑定QQ联合登陆
		login.bindLoginNameFcous();//绑定账号框的fcous事件
		login.bindPasswdFcous();//绑定密码框的fcous事件
		login.bindYzmFcous();//绑定短信验证码框的fcous事件

		//绑定回车事件
		$(document).keydown(function(event){
			switch (event.which) {
				case 13:
					$("#formSubmit").click();
				default:
			}
		});
	},
	//校验form表单
	checkForm:function(){
		var loginName = $("#loginName").val();
		var passwd = $("#passwd").val();
		var yzm = $("#yzm").val();
		var isYzmShow = $("#yzmSpan").is(":hidden");
		
		//校验账号为空
		if($.trim(loginName)==""){
			
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$("#loginNameErrorShow").html("请输入账号");
			$("#loginNameErrorShow").show();//显示提示信息
			$("#loginNameErrorPic").show();//显示提示信息
			
			return false;
		}
		//校验密码为空
		if($.trim(passwd)==""){
			login.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
			$("#passwdErrorShow").html("请输入密码");
			$("#passwdErrorShow").show();//显示提示信息
			$("#passwdErrorPic").show();//显示提示信息
			
			return false;
		}
		//校验验证码为空
		if(!isYzmShow && $.trim(yzm)==""){
			login.hideErrorShow("yzmFlag");//隐藏自己框下的所有提示
			$("#yzmErrorShow").html("请输入验证码");
			$("#yzmErrorShow").show();//显示提示信息
			$("#yzmErrorPic").show();//显示提示信息
			
			return false;
		}
		
		return true;
	},
	//登录
	doLogin:function(){
		_tag.dcsMultiTrack('wt.s_cart','login');//BI
		if(login.checkForm()){
			LFControl.loading.Start();
			$("#loginform").submit();
		}
	},
	//显示图形验证码
	showYZM:function(){
		var code = $("#code").val();
		//需要图形验证码
		if(code=="50001"){
			$("#yzmSpan").show();
		}
	},
	//刷新验证码
	refreshYzm:function(){
		$.ajax({
			contentType:"application/json",
			type:"get",
			cache:false,
			async: false,
			url:"refreshYzm",
			success: function(data){
				try{
					var jsonData = $.parseJSON(data);
					var code = jsonData.code;
					var msg = jsonData.msg;
					var sessionId = jsonData.sessionId;
					var captchaPic = jsonData.captchaPic;
					
					//需要图形验证码
					if(code=="50001"){
						$("#code").val(code);
						$("#msg").val(msg);
						$("#sessionId").val(sessionId);
						$("#yzmPicImg").attr("src",captchaPic);
						$("#yzmSpan").show();
					}else if(code=="0"){//不需要图形验证码
						$("#code").val(code);
						$("#msg").val(msg);
						$("#sessionId").val(sessionId);
						$("#yzmPicImg").attr("src",captchaPic);
						$("#yzmSpan").hide();
					}else{
						window.location.href="/toError";
					}
				}catch(e){
					window.location.href="/toError";
				}
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
		         alert("error");
		    }
		});
	},
	//显示错误提示信息
	showErrorMsg:function(){
		//判断图形验证码接口是否执行成功
		var code = $("#code").val();
		if(code!="0" && code != "50001"){
			window.location.href="/toError?returnUrl="+passCommon.passportLoginUrl+"&errorMsg="+code;
			return;
		}
		
		//提示点击登陆后错误信息提示
		var errorCode = $("#errorCode").val();
		if(errorCode != null && $.trim(errorCode)!=""){
			if($.trim(errorCode)=="90005"){
				//参数不正确，跳转到错误页面
				window.location.href="/toError?returnUrl="+passCommon.passportLoginUrl+"&errorMsg="+errorCode+":参数不正确";
				return false;
			}else if($.trim(errorCode)=="90006"){
				//alert("调用api异常");
				window.location.href="/toError?returnUrl="+passCommon.passportLoginUrl+"&errorMsg="+errorCode+":调用api异常";
				return false;
			}else if($.trim(errorCode)=="50002"){
				login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
				$("#loginNameErrorShow").html("用户名不存在");
				$("#loginNameErrorShow").show();//显示提示信息
				$("#loginNameErrorPic").show();//显示提示信息
				return false;
			}else if($.trim(errorCode)=="50004"){
				login.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
				$("#passwdErrorShow").html("用户名或密码有误");
				$("#passwdErrorShow").show();//显示提示信息
				$("#passwdmeErrorPic").show();//显示提示信息
				return false;
			}else if($.trim(errorCode)=="50012"){
				login.hideErrorShow("yzmFlag");//隐藏自己框下的所有提示
				$("#yzmErrorShow").html("验证码错误");
				$("#yzmErrorShow").show();//显示提示信息
				$("#yzmErrorPic").show();//显示提示信息
				return false;
			}else if($.trim(errorCode)=="50014"){
//				alert("第三方类型标识不支持");
//				return false;
				
				window.location.href="/toError?returnUrl="+passCommon.passportLoginUrl+"&errorMsg="+errorCode+":第三方类型标识不支持";
				return false;
			}else if($.trim(errorCode)=="50015"){
//				alert("第三方类型未开通");
//				return false;
				window.location.href="/toError?returnUrl="+passCommon.passportLoginUrl+"&errorMsg="+errorCode+":第三方类型未开通";
				return false;
			}else{
				//alert("系统错误！");
				window.location.href="/toError?returnUrl="+passCommon.passportLoginUrl+"&errorMsg="+errorCode+":系统错误";
				return false;
			}
		}
	},
	//隐藏所有错误提示
	hideAllErrorShow:function(){
		$(".errorShowFlag").html("");
		$(".errorShowFlag").hide();
	},
	//绑定微信联合登陆
	bindWeixinLogin:function(){
		$("#weiXinLogin").bind('click',function(){
			var returnUrl = $("#returnUrl").val();
			window.location.href="/toWeinxinLogin?returnUrl="+returnUrl;
		});
	},
	//绑定sina联合登陆
	bindSinaLogin:function(){
		$("#sinaLogin").bind('click',function(){
			var returnUrl = $("#returnUrl").val();
			window.location.href="/toSinaLogin?returnUrl="+returnUrl;
		});
	},
	//绑定QQ联合登陆
	bindQQLogin:function(){
		$("#qqLogin").bind('click',function(){
			var returnUrl = $("#returnUrl").val();
			window.location.href="/toQQLogin?returnUrl="+returnUrl;
		});
	},
	//绑定账号框的fcous事件
	bindLoginNameFcous:function(){
		$("#loginName").focus(function(){
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$(".successShowFlag").hide();//所有的成功提示隐藏
			$("#loginNameSuccessShow").html("请输入账号");
			$("#loginNameSuccessShow").show();//显示提示信息
			
		});
	},
	//绑定密码框的fcous事件
	bindPasswdFcous:function(){
		$("#passwd").focus(function(){
			login.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
			$(".successShowFlag").hide();//所有的成功提示隐藏
			$("#passwdSuccessShow").html("请输入密码");
			$("#passwdSuccessShow").show();//显示提示信息
			
		});
	},
	//绑定密码框的fcous事件
	bindYzmFcous:function(){
		$("#yzm").focus(function(){
			login.hideErrorShow("yzmFlag");//隐藏自己框下的所有提示
			$(".successShowFlag").hide();//所有的成功提示隐藏
			$("#yzmSuccessShow").html("请输入验证码");
			$("#yzmSuccessShow").show();//显示提示信息
			
		});
	},
	//隐藏某个输入框下所有的的提示信息和错号对号图片
	hideErrorShow:function(cssFlag){
		$("."+cssFlag).hide();
	}
	
};

$(document).ready(function () {
	login.init();
}); 









// 头部js


var loginPublicHeadAndTaul = {
	Init: function(){
		loginPublicHeadAndTaul.bind.CheadInfo();
		loginPublicHeadAndTaul.bind.AddFavorite($('#Chead-save'), '乐蜂网', 'http://www.lefeng.com');
        $('.Cfooter-cr>span').eq(1).text('天津品简电子商务有限公司');
				$('.Cfooter-cr').html('<div class="Cfooter-cr-a"><a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/76.html">关于乐蜂</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/77.html">免责声明</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/78.html">隐私声明</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/79.html">版权声明</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/help/zhaopin.html">招聘信息</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/help/73.html">联系我们</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/help/helpCenter.html">帮助中心</a> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/80.html">友情链接</a> </div> <span>Copyright <b>©</b> 2008-2016 Lefeng.com All Rights Reserved.</span> <span>天津品简电子商务有限公司</span> <a target="_blank" href="http://www.miibeian.gov.cn/?biid=7520">津ICP备15005555号-1</a>&nbsp;&nbsp;<span>京公网安备11010502014183</span> <a rel="nofollow" target="_blank" href="http://www.lefeng.com/notice/242.html">营业执照</a><div class="Cfooter-cr-info"> <span>公司全称：天津品简电子商务有限公司  </span> &nbsp; &nbsp; <span>  公司固话：400 000 1818   </span> &nbsp; &nbsp; <span>   公司地址：天津市武清区京津电子商务产业园宏瑞道18号</span> </div><div class="Cfooter-cr-img"> <a id="___szfw_logo___" class="cxwz" rel="nofollow" target="_blank" href="https://search.szfw.org/cert/l/CX20120918001688001713"></a> <a class="kxwz" rel="nofollow" target="_blank" href="https://ss.knet.cn/verifyseal.dll?sn=e15011931011457422bp2j000000&amp;ct=df&amp;a=1&amp;pa=0.1418370669707656"></a> <a class="pjzxlm" rel="nofollow" target="_blank" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1074823632"></a> <a class="itrust" rel="nofollow" target="_blank" href="http://www.315online.com.cn/member/315130044.html">中国互联网信用评价中心</a> <a href="http://www.lefeng.com/notice/84.html" target="_blank" rel="nofollow" class="xfwq"></a> </div>');
	}
};
loginPublicHeadAndTaul.bind = {
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
    AddFavorite:function(e, t, n) {
        var t = t || $("title").text(),n = n || location.href;
        e.click(function() {
            return document.all ? window.external.AddFavorite(n, t) : alert("请使用Ctrl+D加入收藏"),!1
        })
    }

}
$(document).ready(function(){
	loginPublicHeadAndTaul.Init();
});





// 正则验证common.js

var passCommon={
		
};
//登录页面URL
passCommon.passportLoginUrl="http://passport.lefeng.com/toLogin";
//注册页面URL
passCommon.passportRegisterUrl="http://passport.lefeng.com/toRegister";
//找回密码页面URL
passCommon.passportLostPwdUrl="http://passport.lefeng.com/toLostPassword1";
//地址管理页面URL
passCommon.passportAddressAdminUrl="http://passport.lefeng.com/toAddressAdmin";

passCommon.func={
		/*
		根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
		    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
		    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
		    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
		    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

		出生日期计算方法。
		    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
		    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
		下面是正则表达式:
		 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
		 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
		 15位校验规则 6位地址编码+6位出生日期+3位顺序号
		 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
		 
		 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
		                公式(1)中： 
		                i----表示号码字符从由至左包括校验码在内的位置序号； 
		                ai----表示第i位置上的号码字符值； 
		                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
		                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
		                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

		*/
		//身份证号合法性验证 
		//支持15位和18位身份证号
		//支持地址编码、出生日期、校验位验证
		identityCodeValid:function(code){
			var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
            
            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
           else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
//            if(!pass) alert(tip);
            return pass;
		}	
};








// Cookie参考
function dcsCookie() {
	typeof dcsOther == "function" ? dcsOther() : typeof dcsFPC == "function" && dcsFPC(gTimeZone)
}

function dcsGetCookie(e) {
	var t = e + "=",
		n = null;
	try {
		var r = document.cookie.indexOf(t);
		if (r > -1) if (r == 0) {
			var i = document.cookie.indexOf(";", r);
			i == -1 && (i = document.cookie.length), n = unescape(document.cookie.substring(r + t.length, i))
		} else {
			r = document.cookie.indexOf("; " + t);
			if (r > -1) {
				var i = document.cookie.indexOf("; ", r + 1);
				i == -1 && (i = document.cookie.length), n = unescape(document.cookie.substring(r + t.length + 2, i))
			}
		}
	} catch (s) {}
	return n
}

function dcsGetCrumb(e, t) {
	var n = dcsGetCookie(e).split(":");
	for (var r = 0; r < n.length; r++) {
		var i = n[r].split("=");
		if (t == i[0]) return i[1]
	}
	return null
}

function dcsGetIdCrumb(e, t) {
	var n = dcsGetCookie(e),
		r = n.substring(0, n.indexOf(":lv=")),
		i = r.split("=");
	for (var s = 0; s < i.length; s++) if (t == i[0]) return i[1];
	return null
}

function dcsFPC(e) {
	if (typeof e == "undefined") return;
	if (document.cookie.indexOf("WTLOPTOUT=") != -1) return;
	var t = gFpc,
		n = new Date,
		r = n.getTimezoneOffset() * 6e4 + e * 36e5;
	n.setTime(n.getTime() + r);
	var i = new Date(n.getTime() + 63113851500),
		s = new Date(n.getTime());
	WT.aid = WT.cid2 = WT.cid3 = WT.co_f = WT.vtid = WT.vt_f = WT.vt_f_a = WT.vt_f_s = WT.vt_f_d = WT.vt_f_tlh = WT.vt_f_tlv = WT.lvm_id = WT.cc = "";
	var o = new Date;
	WT.vt_visits = 1, WT.vt_spv = 0, WT.vt_lsv = n.getTime().toString();
	if (document.cookie.indexOf(t + "=") == -1) {
		if (typeof gWtId != "undefined" && gWtId != "") WT.co_f = gWtId;
		else if (typeof gTempWtId != "undefined" && gTempWtId != "") WT.co_f = gTempWtId, WT.vt_f = "1";
		else {
			WT.co_f = "2";
			var u = n.getTime().toString();
			for (var a = 2; a <= 32 - u.length; a++) WT.co_f += Math.floor(Math.random() * 16).toString(16);
			WT.co_f += u, WT.vt_f = "1"
		}
		typeof gWtAccountRollup == "undefined" && (WT.vt_f_a = "1"), WT.vt_f_s = WT.vt_f_d = "1", WT.vt_f_tlh = WT.vt_f_tlv = "0", WT.dl == 0 && (WT.vt_spv += 1)
	} else {
		var f = dcsGetIdCrumb(t, "id"),
			l = parseInt(dcsGetCrumb(t, "lv")),
			c = parseInt(dcsGetCrumb(t, "ss")),
			h = dcsGetCrumb(t, "vs");
		h != null && (WT.vt_visits = parseInt(h));
		var p = dcsGetCrumb(t, "spv");
		p != null && (WT.vt_spv = parseInt(p));
		var d = dcsGetCrumb(t, "lsv");
		d != null && (WT.vt_lsv = parseInt(d));
		if (f == null || f == "null" || isNaN(l) || isNaN(c)) return;
		WT.co_f = f;
		var v = new Date(l);
		WT.vt_f_tlh = Math.floor((v.getTime() - r) / 1e3), s.setTime(c), n.getTime() > v.getTime() + 18e5 || n.getTime() > s.getTime() + 288e5 ? (n.getDay() > s.getDay() || n.getMonth() > s.getMonth() || n.getYear() > s.getYear() ? WT.vt_visits = 1 : WT.vt_visits += 1, WT.dl == 0 ? WT.vt_spv = 1 : WT.vt_spv = 0, WT.vt_lsv = s.getTime().toString(), WT.vt_f_tlv = Math.floor((s.getTime() - r) / 1e3), s.setTime(n.getTime()), WT.vt_f_s = "1") : WT.dl == 0 && (WT.vt_spv += 1);
		if (n.getDay() != v.getDay() || n.getMonth() != v.getMonth() || n.getYear() != v.getYear()) WT.vt_f_d = "1";
		o.setTime(l)
	}
	WT.co_f = escape(WT.co_f), WT.vtid = WT.co_f;
	var m = "; expires=" + i.toGMTString();
	document.cookie = t + "=id=" + WT.co_f + ":lv=" + n.getTime().toString() + ":ss=" + s.getTime().toString() + ":lsv=" + WT.vt_lsv + ":vs=" + WT.vt_visits + ":spv=" + WT.vt_spv + m + "; path=/; domain=" + gFpcDom, document.cookie.indexOf(t + "=") == -1 && (WT.co_f = WT.vt_sid = WT.vt_f_s = WT.vt_f_d = WT.vt_f_tlh = WT.vt_f_tlv = "", WT.vt_f = WT.vt_f_a = "2"), WT.lf_user_id = getlogCookie("cust_id"), WT.lf_user_id && (WT.lf_user_id = encodeURIComponent(WT.lf_user_id)), WT.vt_lv = o.getTime().toString(), WT.vt_cv = n.getTime().toString(), WT.vtvs = (s.getTime() - r).toString(), WT.aid = getlogCookie("aid"), WT.aid && (WT.aid = encodeURIComponent(WT.aid)), WT.cid2 = getlogCookie("cid2"), WT.cid2 && (WT.cid2 = encodeURIComponent(WT.cid2)), WT.cid3 = getlogCookie("cid3"), WT.cid3 && (WT.cid3 = encodeURIComponent(WT.cid3)), WT.cc = getlogCookie("countyId"), WT.cc && (WT.cc = encodeURIComponent(WT.cc))
}

function dcsOther() {
	typeof WT.dcsvid != "undefined" && delete WT.dcsvid;
	var e = "wt_visitor_id";
	if (typeof DCSext[e] != "undefined") {
		var t = DCSext[e].replace(/(^\s*)|(\s*$)/g, "").toLowerCase();
		t != "" && t != "null" && (WT.dcsvid = escape(t))
	}
	if (typeof WT.dcsvid != "undefined") {
		var n = new Date,
			r = new Date(n.getTime() + 63113851500),
			i = "; expires=" + r.toGMTString();
		document.cookie = e + "=" + DCSext[e] + i + "; path=/" + (typeof gFpcDom != "undefined" && gFpcDom != "" ? "; domain=" + gFpcDom : "")
	} else {
		var t = dcsGetCookie(e);
		t != null && (t = t.replace(/(^\s*)|(\s*$)/g, "").toLowerCase(), t != "" && t != "null" && (WT.dcsvid = escape(t)))
	}
	typeof gFpc != "undefined" && dcsFPC(gTimeZone)
}

function getlogCookie(e) {
	var t = e + "=",
		n = null;
	try {
		var r = document.cookie.indexOf(t);
		if (r > -1) if (r == 0) {
			var i = document.cookie.indexOf(";", r);
			i == -1 && (i = document.cookie.length), n = decodeURIComponent(document.cookie.substring(r + t.length, i))
		} else {
			r = document.cookie.indexOf("; " + t);
			if (r > -1) {
				var i = document.cookie.indexOf("; ", r + 1);
				i == -1 && (i = document.cookie.length), n = decodeURIComponent(document.cookie.substring(r + t.length + 2, i))
			}
		}
	} catch (s) {}
	return n
}

function dcsEvt(e, t) {
	var n = e.target || e.srcElement;
	while (n && n.tagName && n.tagName.toLowerCase() != t.toLowerCase()) n = n.parentElement || n.parentNode;
	return n
}

function dcsBind(e, t, n) {
	n == 0 ? typeof window[t] == "function" && document && (document.addEventListener ? document.addEventListener(e, window[t], !0) : document.attachEvent && document.attachEvent("on" + e, window[t])) : n == 1 && typeof window[t] == "function" && window && (window.addEventListener ? window.addEventListener(e, window[t], !0) : window.attachEvent && window.attachEvent("on" + e, window[t]))
}

function dcsET() {
	var e = "mousedown";
	dcsBind(e, "dcsFormButton", 0), dcsBind(e, "dcsOffsite", 0), dcsBind(e, "dcsAnchor", 0), dcsBind(e, "dcsJavaScript", 0), dcsBind(e, "dcsHotMap", 0), dcsBind("load", "pageLoad", 1)
}

function _dcsMultiTrack() {
	dcsVar();
	var e;


	if(arguments.length != 0 && arguments[0] instanceof LFLog){
		e=arguments[0].args;
	}else{
		e=arguments;
	}

	//arguments.length != 0 && arguments[0] instanceof LFLog ? e = arguments[0].dcsMultiTrack.arguments : e = arguments;


	if (e == null) return;
	if (e.length % 2 == 0) {
		for (var t = 0; t < e.length; t += 2) e[t].toUpperCase().indexOf("WT.") == 0 ? WT[e[t].substring(3).toLowerCase()] = e[t + 1] : e[t].toUpperCase().indexOf("DCS.") == 0 ? DCS[e[t].substring(4)] = e[t + 1] : e[t].toUpperCase().indexOf("DCSext.") == 0 && (DCSext[e[t].substring(7)] = e[t + 1]);
		var n = new Date;
		DCS.dcsdat = n.getTime(), dcsFunc("dcsCookie"), WT.ti = gI18n ? dcsEscape(dcsEncode(WT.ti), I18NRE) : WT.ti;
		if (WT.dl == 0 || WT.dl == "0") WT.dl = 21;
		dcsTag()
	}
}

function dcsAdv() {
	dcsFunc("dcsET"), dcsFunc("dcsCookie", !0), dcsFunc("dcsAdSearch"), dcsFunc("dcsTP")
}

function dcsVar() {
	gImages = new Array, gIndex = 0, DCS = new Object, WT = new Object, DCSext = new Object, gQP = new Array;
	var e = new Date;
	WT.tz = e.getTimezoneOffset() / 60 * -1, WT.tz == 0 && (WT.tz = "0"), WT.bh = e.getHours(), WT.ul = navigator.appName == "Netscape" ? navigator.language : navigator.userLanguage, typeof screen == "object" && (WT.cd = navigator.appName == "Netscape" ? screen.pixelDepth : screen.colorDepth, WT.sr = screen.width + "x" + screen.height), typeof navigator.javaEnabled() == "boolean" && (WT.jo = navigator.javaEnabled() ? "Yes" : "No"), document.title && (WT.ti = gI18n ? dcsEscape(dcsEncode(document.title), I18NRE) : document.title), WT.bio = "", document.getElementById("bio") && (WT.bio = document.getElementById("bio").value), WT.js = "Yes", WT.jv = dcsJV(), document.body && document.body.addBehavior && (document.body.addBehavior("#default#clientCaps"), document.body.addBehavior("#default#homePage"), WT.hp = document.body.isHomePage(location.href) ? "1" : "0"), parseInt(navigator.appVersion) > 3 && (navigator.appName == "Microsoft Internet Explorer" && document.body ? WT.bs = document.body.offsetWidth + "x" + document.body.offsetHeight : navigator.appName == "Netscape" && (WT.bs = window.innerWidth + "x" + window.innerHeight)), WT.fi = "No";
	if (window.ActiveXObject) for (var t = 10; t > 0; t--) try {
		var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + t);
		WT.fi = "Yes", WT.fv = t + ".0";
		break
	} catch (r) {} else if (navigator.plugins && navigator.plugins.length) for (var t = 0; t < navigator.plugins.length; t++) if (navigator.plugins[t].name.indexOf("Shockwave Flash") != -1) {
		WT.fi = "Yes", WT.fv = navigator.plugins[t].description.split(" ")[2];
		break
	}
	gI18n && (WT.em = typeof encodeURIComponent == "function" ? "uri" : "esc", typeof document.defaultCharset == "string" ? WT.le = document.defaultCharset : typeof document.characterSet == "string" && (WT.le = document.characterSet)), WT.tv = "8.0.2", DCS.dcsdat = e.getTime(), DCS.dcssip = window.location.hostname, DCS.dcsuri = window.location.pathname, WT.dl = "0", WT.ssl = window.location.protocol.indexOf("https:") == 0 ? "1" : "0";
	if (window.location.search) {
		DCS.dcsqry = window.location.search;
		try {
			window.location.hash && (DCS.dcsqry = DCS.dcsqry + window.location.hash)
		} catch (e) {}
		if (gQP.length > 0) for (var t = 0; t < gQP.length; t++) {
			var i = DCS.dcsqry.indexOf(gQP[t]);
			if (i != -1) {
				var s = DCS.dcsqry.substring(0, i),
					o = DCS.dcsqry.substring(i + gQP[t].length, DCS.dcsqry.length);
				DCS.dcsqry = s + o
			}
		}
	} else try {
		window.location.hash && (DCS.dcsuri = DCS.dcsuri + window.location.hash)
	} catch (e) {}
	referer(DCS.dcssip + DCS.dcsuri + DCS.dcsqry)
}

function dcsA(e, t) {
	if (gI18n && e == "dcsqry") {
		var n = "",
			r = t.substring(1).split("&");
		for (var i = 0; i < r.length; i++) {
			var s = r[i],
				o = s.indexOf("=");
			if (o != -1) {
				var u = s.substring(0, o),
					a = s.substring(o + 1);
				i != 0 && (n += "&"), n += u + "=" + dcsEncode(a)
			}
		}
		t = t.substring(0, 1) + n
	}
	return "&" + e + "=" + dcsEscape(t, RE)
}

function dcsEscape(e, t) {
	if (typeof t != "undefined") {
		var n = new String(e);
		for (var r in t) n = n.replace(t[r], r);
		return n
	}
	return escape(e)
}

function dcsEncode(e) {
	return typeof encodeURIComponent == "function" ? encodeURIComponent(e) : escape(e)
}

function sendUrl(u) {
	// try {
	// 	var wv = "imglog__" + (new Date()).getTime(),
	// 		vv = window[wv] = new Image();
	// 	vv.onload = (vv.onerror = function() {
	// 		window[wv] = null
	// 	});
	// 	vv.src = u;
	// 	vv = null;
	// } catch (p) {
	// 	dcsCreateImage(u);
	// }
}

function dcsCreateImage(e) {
	document.images ? (gImages[gIndex] = new Image, gImages[gIndex].src = e, gIndex++) : document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="' + e + '">')
}

function dcsMeta() {
	var e;
	document.all ? e = document.all.tags("meta") : document.documentElement && (e = document.getElementsByTagName("meta"));
	if (typeof e != "undefined") {
		var t = e.length;
		for (var n = 0; n < t; n++) {
			var r = e.item(n).name,
				i = e.item(n).content,
				s = e.item(n).httpEquiv;
			if (r.length > 0) if (r.indexOf("WT.") == 0) {
				var o = !1;
				if (gI18n) {
					var u = ["mc_id", "oss", "ti"];
					for (var a = 0; a < u.length; a++) if (r.toUpperCase().indexOf("WT." + u[a].toUpperCase()) == 0) {
						o = !0;
						break
					}
				}
				WT[r.substring(3)] = o ? dcsEscape(dcsEncode(i), I18NRE) : i
			} else if (r.indexOf("DCSext.") == 0) {
				var o = !1;
				if (gI18n) {
					var u = ["wt_visitor_id"];
					for (var a = 0; a < u.length; a++) if (r.indexOf("DCSext." + u[a]) == 0) {
						o = !0;
						break
					}
				}
				DCSext[r.substring(7)] = o ? dcsEscape(dcsEncode(i), I18NRE) : i
			} else r.indexOf("DCS.") == 0 && (DCS[r.substring(4)] = gI18n && r.indexOf("DCS.dcsref") == 0 ? dcsEscape(i, I18NRE) : i);
			else if (gI18n && s == "Content-Type") {
				var f = i.toLowerCase().indexOf("charset=");
				f != -1 && (WT.mle = i.substring(f + 8))
			}
		}
	}
}

function getPageX(e) {
	var t = 0,
		n = document.documentElement,
		r = document.body;
	return Math.floor(e.pageX ? t = e.pageX : e.clientX && (t = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0))), t < 0 && (t = 0), t
}

function getPageY(e) {
	var t = 0,
		n = document.documentElement,
		r = document.body;
	return Math.floor(e.pageY ? t = e.pageY : e.clientY && (t = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0))), t < 0 && (t = 0), t
}

function getPageWidth() {
	return document.documentElement.clientWidth || document.body.clientWidth || 0 + document.documentElement.clientLeft || document.body.clientLeft || 0
}

function dcsTag() {
	if (document.cookie.indexOf("WTLOPTOUT=") != -1) return;
	var f;
	var e = f = "",
		t = "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + gDomain + (gDcsId == "" ? "" : "/" + gDcsId) + "/dcs.gif?",
		n = "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://mar.vip.com/l?";
	for (var r in DCS) DCS[r] && (e += dcsA(r, DCS[r]));
	var i = ["co_f", "vt_sid", "vt_f_tlv"];
	for (var s = 0; s < i.length; s++) {
		var o = i[s];
		WT[o] && (e += dcsA("WT." + o, WT[o]), delete WT[o])
	}
	var u;
	for (r in WT) if (WT[r]) {
		if (r == "ti") {
			u = WT[r];
			continue
		}
		e += dcsA("WT." + r, WT[r])
	}
	for (r in DCSext) DCSext[r] && (e += dcsA(r, DCSext[r]));
	var a = "";
	try {
		window && window.top && window.top.location && window.top.location.href && (a = window.top.location.href), !! a && a.length > 5 && (a = "top")
	} catch (l) {}
	e += dcsA("WT.top", a), f = n + e, e = t + e;
	var c = e;
	typeof u != undefined && u && (c += dcsA("WT.ti", u)), e.length > 2048 ? e = e.substring(0, 2040) + "&WT.tu=1" : c.length < 2048 && (e = c), sendUrl(e);
	try {} catch (p) {}
}

function dcsPrintVariables() {
	var e = "\nDomain = " + gDomain;
	e += "\nDCSId = " + gDcsId;
	for (N in DCS) e += "\nDCS." + N + " = " + DCS[N];
	for (N in WT) e += "\nWT." + N + " = " + WT[N];
	for (N in DCSext) e += "\nDCSext." + N + " = " + DCSext[N]
}

function dcsJV() {
	var e = navigator.userAgent.toLowerCase(),
		t = parseInt(navigator.appVersion),
		n = e.indexOf("mac") != -1,
		r = e.indexOf("firefox") != -1,
		i = e.indexOf("firefox/0.") != -1,
		s = e.indexOf("firefox/1.0") != -1,
		o = e.indexOf("firefox/1.5") != -1,
		u = r && !i && !s & !o,
		a = !r && e.indexOf("mozilla") != -1 && e.indexOf("compatible") == -1,
		f = a && t == 4,
		l = a && t >= 5,
		c = e.indexOf("msie") != -1 && e.indexOf("opera") == -1,
		h = c && t == 4 && e.indexOf("msie 4") != -1,
		p = c && !h,
		d = e.indexOf("opera") != -1,
		v = e.indexOf("opera 5") != -1 || e.indexOf("opera/5") != -1,
		m = e.indexOf("opera 6") != -1 || e.indexOf("opera/6") != -1,
		g = d && !v && !m,
		y = "1.1";
	return u ? y = "1.7" : o ? y = "1.6" : i || s || l || g ? y = "1.5" : n && p || m ? y = "1.4" : p || f || v ? y = "1.3" : h && (y = "1.2"), y
}

function dcsFunc(e) {
	typeof window[e] == "function" && window[e]()
}

function LFLog() {
	var self=this;
	this.dcsMultiTrack = function() {
		self.args=arguments;
		_dcsMultiTrack(this)
	}
}

function _genLvmIdC() {
	var e = new Date,
		t = e.getTime().toString(),
		n = t.length == 13 ? Math.round(Math.random() * 9e18 + 1e18).toString() + t : Math.round(Math.random() * 9e18 + 1e18).toString() + Math.round(Math.random() * 31536e6 + 12622752e5).toString();
	return n
}
var gDomain = "mar.lefeng.com",
	gDcsId = "a",
	gHotId = "b",
	gLoadId = "c",
	gMapId = "d",
	gULVM = "e",
	gFpc = "WT_FPC",
	navigationtag = "dl,div,table",
	onsitedoms = /^(\w+\.)?lefeng\.com$/,
	gTimeZone = 8,
	gFpcDom = ".lefeng.com",
dcsSplit = function(e) {
	var t = e.toLowerCase().split(","),
		n = t.length;
	for (var r = 0; r < n; r++) t[r] = t[r].replace(/^\s*/, "").replace(/\s*$/, "");
	return t
}, dcsIsOnsite = function(e) {
	if (e.length > 0) {
		e = e.toLowerCase();
		if (e == window.location.hostname.toLowerCase()) return !0;
		if (typeof onsitedoms.test == "function") return onsitedoms.test(e);
		if (onsitedoms.length > 0) {
			var t = dcsSplit(onsitedoms),
				n = t.length;
			for (var r = 0; r < n; r++) if (e == t[r]) return !0
		}
	}
	return !1
}, dcsNavigation = function(e) {
	var t = "",
		n = "",
		r = dcsSplit(navigationtag),
		i = r.length,
		s, o, u;
	for (s = 0; s < i; s++) {
		u = r[s];
		if (u.length) {
			o = dcsEvt(e, u), t = o && o.getAttribute && o.getAttribute("id") ? o.getAttribute("id") : "", n = o.className || "";
			if (t.length || n.length) break
		}
	}
	return t.length ? t : n
}, dcsAnchor = function(e) {
	e = e || window.event || "";
	if (e && (typeof e.which != "number" || e.which == 1 || e.which == 2)) {
		var t = dcsEvt(e, "A");
		if (t && t.href) {
			var n = t.hostname ? t.hostname.split(":")[0] : "";
			if (dcsIsOnsite(n)) {
				var r = t.search ? t.search.substring(t.search.indexOf("?") + 1, t.search.length) : "",
					i = t.pathname ? t.pathname.indexOf("/") != 0 ? "/" + t.pathname : t.pathname : "/",
					s = t.id;
				if (t.hash && t.hash != "" && t.hash != "#") _dcsMultiTrack("DCS.dcssip", DCS.dcssip, "DCS.dcsuri", DCS.dcsuri, "DCS.dcsqry", DCS.dcsqry, "WT.ti", "Anchor:" + t.hash, "WT.dl", "21", "WT.nv", dcsNavigation(e), "WT.na", typeof s != undefined && s ? s : "", "WT.hf", t.href);
				else {
					var o = t.innerText ? t.innerText : t.textContent;
					o = o + ":" + t.id, _dcsMultiTrack("DCS.dcssip", DCS.dcssip, "DCS.dcsuri", DCS.dcsuri, "DCS.dcsqry", DCS.dcsqry, "DCS.dcsref", DCS.dcsref, "WT.ti", "Link:" + o, "WT.dl", "21", "WT.nv", dcsNavigation(e), "WT.na", typeof s != undefined && s ? s : "", "WT.hf", t.href)
				}
			}
		}
	}
}, dcsJavaScript = function(e) {
	e = e || window.event || "";
	if (e && (typeof e.which != "number" || e.which == 1)) {
		var t = dcsEvt(e, "A");
		if (t && t.href && t.protocol) {
			var n = t.search ? t.search.substring(t.search.indexOf("?") + 1, t.search.length) : "";
			t.protocol.toLowerCase() == "javascript:" && _dcsMultiTrack("DCS.dcssip", DCS.dcssip, "DCS.dcsuri", DCS.dcsuri, "DCS.dcsqry", DCS.dcsqry, "WT.ti", "JavaScript:" + t.innerHTML, "WT.dl", "22", "WT.nv", dcsNavigation(e), "WT.hf", t.href)
		}
	}
}, dcsOffsite = function(e) {
	e = e || window.event || "";
	if (e && (typeof e.which != "number" || e.which == 1)) {
		var t = dcsEvt(e, "A");
		if (t && t.href) {
			var n = t.hostname ? t.hostname.split(":")[0] : "",
				r = t.protocol || "";
			if (n.length > 0 && r.indexOf("http") == 0 && !dcsIsOnsite(n)) {
				var i = t.search ? t.search.substring(t.search.indexOf("?") + 1, t.search.length) : "",
					s = t.pathname ? t.pathname.indexOf("/") != 0 ? "/" + t.pathname : t.pathname : "/";
				_dcsMultiTrack("DCS.dcssip", DCS.dcssip, "DCS.dcsuri", DCS.dcsuri, "DCS.dcsqry", DCS.dcsqry, "DCS.dcsref", DCS.dcsref, "WT.ti", "Offsite:" + n + s + (i.length ? "?" + i : ""), "WT.dl", "24", "WT.nv", dcsNavigation(e), "WT.hf", t.href)
			}
		}
	}
}, dcsFormButton = function(e) {
	e = e || window.event || "";
	if (e && (typeof e.which != "number" || e.which == 1)) {
		var t = ["INPUT", "BUTTON"];
		for (var n = 0; n < t.length; n++) {
			var r = dcsEvt(e, t[n]),
				i;
			r && (i = r.type || "");
			if (i && (i == "submit" || i == "image" || i == "button" || i == "reset") || i == "text" && (e.which || e.keyCode) == 13) {
				var s = "",
					o = "",
					u = 0;
				r.form ? (s = r.form.action || window.location.pathname, o = r.form.id || r.form.name || r.form.className || "Unknown", u = r.form.method && r.form.method.toLowerCase() == "post" ? "27" : "26") : (s = window.location.pathname, o = r.name || r.id || "Unknown", u = t[n].toLowerCase() == "input" ? "28" : "29"), s && o && e.keyCode != 9 && _dcsMultiTrack("DCS.dcsuri", s, "WT.ti", "FormButton:" + o, "WT.dl", u, "WT.nv", dcsNavigation(e));
				break
			}
		}
	}
};
var gImages = new Array,
	gIndex = 0,
	DCS = new Object,
	WT = new Object,
	DCSext = new Object,
	gQP = new Array,
	gI18n = !0;
if (window.RegExp) var RE = {
	"%09": /\t/g,
	"%20": / /g,
	"%23": /\#/g,
	"%26": /\&/g,
	"%2B": /\+/g,
	"%3F": /\?/g,
	"%5C": /\\/g,
	"%22": /\"/g,
	"%7F": /\x7F/g,
	"%A0": /\xA0/g
},
	I18NRE = {
		"%25": /\%/g
	};
var referer = function(e) {
		try {
			var t = "";
			try {
				if (e) {
					var n = e.indexOf("&referer=");
					if (n >= 0) {
						t = e.substring(e.indexOf("&referer=") + "&referer=".length);
						if (t != "" && t != "-") {
							var r = t.indexOf("&");
							r >= 0 && (t = t.substring(0, r)), DCS.dcsqry = DCS.dcsqry.replace("&referer=" + t, ""), DCS.dcsref = gI18n ? dcsEscape(t, I18NRE) : t;
							return
						}
					} else {
						n = e.indexOf("?referer=");
						if (n >= 0) {
							t = e.substring(e.indexOf("?referer=") + "?referer=".length);
							if (t != "" && t != "-") {
								var r = t.indexOf("&");
								r >= 0 && (t = t.substring(0, r)), DCS.dcsqry = DCS.dcsqry.replace("referer=" + t, ""), DCS.dcsref = gI18n ? dcsEscape(t, I18NRE) : t;
								return
							}
						}
					}
				}
			} catch (i) {
				DCS.dcsref = ""
			}
			window.document.referrer != "" && window.document.referrer != "-" && (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) < 4 || (DCS.dcsref = gI18n ? dcsEscape(window.document.referrer, I18NRE) : window.document.referrer))
		} catch (i) {
			DCS.dcsref = ""
		}
	};
var pageLoad = function() {
	try {
		var e = window.performance || window.webkitPerformance || window.mozPerformance || window.msPerformance || {};
		if (e) {
			var t = e.timing;
			if (t) {
				var n = t.navigationStart,
					r = t.domainLookupStart,
					i = t.domainLookupEnd,
					s = t.connectStart,
					o = t.connectEnd,
					u = t.requestStart,
					a = t.responseStart,
					f = t.responseEnd,
					l = t.fetchStart,
					c = t.domInteractive,
					h = t.domContentLoadedEventStart,
					p = t.loadEventStart,
					d = "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + gDomain + (gLoadId == "" ? "" : "/" + gLoadId) + "/dcs.gif?";
				DCS.dcssip && (d += dcsA("dcssip", DCS.dcssip)), DCS.dcsuri && (d += dcsA("dcsuri", DCS.dcsuri)), DCS.dcsqry && (d += dcsA("dcsqry", DCS.dcsqry)), d += dcsA("LT.t01", n ? n : 0), d += dcsA("LT.t02", r ? r : 0), d += dcsA("LT.t03", i ? i : 0), d += dcsA("LT.t04", s ? s : 0), d += dcsA("LT.t05", o ? o : 0), d += dcsA("LT.t06", u ? u : 0), d += dcsA("LT.t07", a ? a : 0), d += dcsA("LT.t08", f ? f : 0), d += dcsA("LT.t09", l ? l : 0), d += dcsA("LT.t10", c ? c : 0), d += dcsA("LT.t11", h ? h : 0), d += dcsA("LT.t12", p ? p : 0), navigator.userAgent && (d += dcsA("LT.ua", dcsEncode(navigator.userAgent))), sendUrl(d)
			}
		}
	} catch (v) {}
};

window._BI_HOTMAP_CLASS = {
	BIHT_PROPERTY_LAYER: "biht-layer",
	BIHT_CLASS_SINGLE: "biht-none",
	bihtCollection: function(e) {
		try {
			if (!e || !e.target) return null;
			var t = $(e.target),
				n = t[0];
			if (!n.tagName || n == document || n == window) return "";
			var r = n.tagName,
				i = "BODY",
				s = $(document.body),
				o = "";
			e.tagName = r, e.layerX = 0, e.layerY = 0;
			if (r != "BODY" && r != "HTML") {
				var u = "",
					a, f, l, c, h = !1;
				r == "A" ? o = t.attr("href") : (c = t.parent(), c[0] !== undefined && c[0].tagName == "A" && (o = c.attr("href")));
				while ( !! t[0]) {
					n = t[0];
					if (!n.tagName || n == document.documentElement || n == document || n == window) break;
					r = n.tagName;
					if (r == "BODY" || r == "HTML") break;
					!h && i == "BODY" && t.attr(this.BIHT_PROPERTY_LAYER) !== undefined ? (a = "[" + this.BIHT_PROPERTY_LAYER + "]", s = t, h = !0) : a = "", f = jQuery.trim(t.attr("class")), f.length > 0 && (-1 != f.indexOf(this.BIHT_CLASS_SINGLE) ? f = this.BIHT_CLASS_SINGLE : f = f.replace(/\s+/g, "."), a = a + "." + f), a = r + a, c = t.parent(), l = c.children(a).index(t), h ? i == "BODY" ? i = a + ":" + (-1 < l ? l : 0) : i = a + ":" + (-1 < l ? l : 0) + " " + i : u = a + ":" + (-1 < l ? l : 0) + " " + u, t = c
				}
				e.depth = jQuery.trim(u)
			} else e.depth = r;
			i = jQuery.trim(i);
			if (i != "BODY" || s[0] != document.body) {
				var p = s.offset();
				e.layerX = p.left, e.layerY = p.top
			}
			e.layer = i, e.layerWidth = Math.round(s.width()), e.layerHeight = Math.round(s.height()), e.href = jQuery.trim(o);
			var d = "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + gDomain + (gMapId == "" ? "" : "/" + gMapId) + "/dcs.gif?";
			DCS.dcssip && (d += dcsA("dcssip", DCS.dcssip)), DCS.dcsuri && (d += dcsA("dcsuri", DCS.dcsuri)), DCS.dcsqry && (d += dcsA("dcsqry", DCS.dcsqry)), d += dcsA("P.d", e.depth), d += dcsA("P.px", e.pageX), d += dcsA("P.py", e.pageY), d += dcsA("P.ox", e.offsetX), d += dcsA("P.oy", e.offsetY), d += dcsA("P.lyx", e.layerX), d += dcsA("P.lyy", e.layerY), d += dcsA("P.ly", e.layer), d += dcsA("P.lyw", e.layerWidth), d += dcsA("P.lyh", e.layerHeight), d += dcsA("P.tg", e.tagName), d += dcsA("P.hf", e.href), sendUrl(d)
		} catch (v) {}
	},
	bihtNormalizeEvent: function(e) {
		try {
			var t = Math.round(e.clientX),
				n = Math.round(e.clientY),
				r = $(document),
				i = Math.round(t + r.scrollLeft()),
				s = Math.round(n + r.scrollTop()),
				o = $(e.target || e.srcElement),
				u = o.offset();
			return {
				target: o[0],
				button: 1 === e.button ? 0 : 4 === e.button ? 1 : e.button,
				clientX: t,
				clientY: n,
				pageX: i,
				pageY: s,
				offsetX: Math.round(Math.max(0, i - u.left)),
				offsetY: Math.round(Math.max(0, s - u.top))
			}
		} catch (a) {}
	},
	initialize: function() {
		try {
			var e = this;
			document.attachEvent ? document.attachEvent("onmousedown", function(t) {
				e.bihtCollection(e.bihtNormalizeEvent(t || window.event))
			}) : document.addEventListener("mousedown", function(t) {
				e.bihtCollection(e.bihtNormalizeEvent(t || window.event))
			})
		} catch (t) {}
	}
};
var dcsHotMap = function(e) {
	try {
		e = e || window.event || "";
		if (e && (typeof e.which != "number" || e.which == 1 || e.which == 2)) {
			var t = "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + gDomain + (gHotId == "" ? "" : "/" + gHotId) + "/dcs.gif?";
			DCS.dcssip && (t += dcsA("dcssip", DCS.dcssip)), DCS.dcsuri && (t += dcsA("dcsuri", DCS.dcsuri)), DCS.dcsqry && (t += dcsA("dcsqry", DCS.dcsqry)), t += dcsA("P.w", getPageWidth(e)), t += dcsA("P.x", getPageX(e)), t += dcsA("P.y", getPageY(e));
			var n = "";
			typeof screen == "object" && (n = screen.width + "x" + screen.height), t += dcsA("P.sr", n);
			var r = dcsEvt(e, "A");
			if (r && r.href) {
				t += dcsA("P.hf", r.href);
				var i = r.id;
				t += dcsA("P.na", typeof i != undefined && i ? i : "")
			}
			t += dcsA("P.nv", dcsNavigation(e)), DCS.dcsref && (t += dcsA("P.dcsref", DCS.dcsref)), navigator.userAgent && (t += dcsA("P.ua", dcsEncode(navigator.userAgent))), sendUrl(t)
		}
	} catch (r) {}
};

dcsVar(); dcsMeta(); dcsFunc("dcsAdv"); dcsTag();

window._tag = new LFLog;

try {
	$("[bilogattr=addcartbilogclass]").click(function() {
		var e = $(this).attr("skuid");
		typeof e != undefined && e && _dcsMultiTrack("WT.ct", "button", "WT.pid", e, "WT.nu", "1")
	})
} catch (e) {}
try {
	window._BI_HOTMAP_CLASS.initialize()
} catch (e) {}*/
register = {
	init:function() {
		register.bind.bindMobileFcous();//绑定手机号框fcous
		register.bind.bindMobileBlur();
		register.bind.bindPasswdFcous();//绑定密码框fcous
		register.bind.bindPasswd1Fcous();//绑定再次密码框fcous
		register.bind.bindPasswd1Blur();//绑定再次密码框Blur
		register.bind.bindRegisterBtnClick();//绑定注册click事件
		register.bind.bindPasswdKeyUp();//绑定密码框的keyUp事件
		//绑定回车事件
		$(document).keydown(function(event){
			switch (event.which) {
				case 13:
					$("#registerBtn").click();
				default:
			}
		});
		register.func.refreshCaptcha();//获取图形验证码
		$("#yzmPic").bind('click',register.func.refreshCaptcha);//绑定刷新图形页面click
		$("#changeYzm").bind('click',register.func.refreshCaptcha);
	}
};
register.bind={
		//绑定手机号码框的fcous事件
		bindMobileFcous:function(){
			$("#mobileNo").focus(function(){
				register.func.hideErrorShow("mobileNoFlag");//隐藏自己框下的所有提示
				$(".successShowFlag").hide();//所有的成功提示隐藏
				$("#mobileNoSuccessShow").show();//显示提示信息

			});
		},
		//绑定手机号码框的Blur事件
		bindMobileBlur:function(){
			$("#mobileNo").blur(function(){
				//校验手机格式
				var mobileNo = $("#mobileNo").val();
				if(mobileNo != ""){
					if(!register.func.isPhone(mobileNo)){
						register.func.hideErrorShow("mobileNoFlag");//隐藏自己框下的所有提示
						$("#mobileNoErrorShow").html("请输入正确的手机号");
						$("#mobileNoErrorShow").show();
						$("#mobileNoErrorPic").show();
						return;
					}
				}
			});
		},
		//绑定密码框的fcous事件
		bindPasswdFcous:function(){
			$("#passwd").focus(function(){
				register.func.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
				$(".successShowFlag").hide();//所有的成功提示隐藏
				$("#passwdSuccessShow").show();//显示提示信息

			});
		},
		//绑定再次输入密码框的fcous事件
		bindPasswd1Fcous:function(){
			$("#passwd1").focus(function(){
				register.func.hideErrorShow("passwd1Flag");//隐藏自己框下的所有提示
				$(".successShowFlag").hide();//所有的成功提示隐藏
				$("#passwd1SuccessShow").show();//显示提示信息

			});
		},
		//绑定再次输入密码框的blur事件
		bindPasswd1Blur:function(){
			$("#passwd1").blur(function(){
				var passwd = $("#passwd").val();
				var passwd1 = $("#passwd1").val();
				if(passwd != passwd1){
					register.func.hideErrorShow("passwd1Flag");//隐藏自己框下的所有提示
					$("#passwd1ErrorShow").html("两次密码不一致");
					$("#passwd1ErrorPic").show();//显示提示信息
					$("#passwd1ErrorShow").show();//显示提示信息
				}
			});
		},
		//绑定注册按钮click事件
		bindRegisterBtnClick:function(){
			$("#registerBtn").bind('click',function(){
				if(!register.func.checkForm()){
					//注册
					register.func.doRegister();
				}
			});
		},
		//绑定密码框keyUp事件
		bindPasswdKeyUp:function(){
			$("#passwd").keyup(function(){
				  var passwd = $("#passwd").val();
				  //长度小于8隐藏密码级别,并返回
				  if(passwd.length<8){
					  $(".clFlag").removeClass("on");//去掉弱中强的高亮显示
					  $(".level").hide();
					  return;
				  }
				  //显示密码强度
				  $(".level").show();
				  //字符，数字，符号
				  var regs = [/[a-zA-Z]+/, /[0-9]+/, /\W+/];
				  //默认级别为1
				  var myLevel = 1;
				  //字符长度超过16级别加1
				  if(passwd.length>16){
					  myLevel = myLevel+1;
				  }
				  //满足字符加数字，级别加1
				  if(regs[0].test(passwd) && regs[1].test(passwd)){
					  myLevel = myLevel+1;
				  }
				  //满足有符号，级别加1
				  if(regs[2].test(passwd)){
					  myLevel = myLevel+1;
				  }
				  //展示相应密码强度
				  $(".clFlag").removeClass("on");//去掉弱中强的高亮显示
				  if(myLevel==1){
					  $("#cl1").addClass("on");
				  }else if(myLevel==2){
					  $("#cl2").addClass("on");
				  }else{
					  $("#cl3").addClass("on");
				  }
			});
		}
};
register.func={
		//隐藏某个输入框下所有的的提示信息和错号对号图片
		hideErrorShow:function(cssFlag){
			$("."+cssFlag).hide();
		},
		//校验手机格式
		isPhone:function(inputString){
			 var partten = /^1[3,4,5,7,8]\d{9}$/;
	         var fl=false;
	         if(partten.test(inputString))
	         {
	              return true;
	         }
	         else
	         {
	              return false;
	         }
		},
		//校验form表单
		checkForm:function(){
			//校验手机号为空
			var mobileNo = $("#mobileNo").val();
			if(mobileNo==null){
				register.func.hideErrorShow("mobileNoFlag");//隐藏自己框下的所有提示
				$("#mobileNoErrorShow").html("请输入手机号");
				$("#mobileNoErrorShow").show();
				$("#mobileNoErrorPic").show();
				//return false;
			}
			//校验手机格式
			if(!register.func.isPhone(mobileNo)){
				register.func.hideErrorShow("mobileNoFlag");//隐藏自己框下的所有提示
				$("#mobileNoErrorShow").html("请输入正确的手机号");
				$("#mobileNoErrorShow").show();
				$("#mobileNoErrorPic").show();
				//return false;
			}
			//校验密码为空
			var passwd = $("#passwd").val();
			if(passwd==null){
				register.func.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
				$("#passwdErrorShow").html("请输入密码");
				$("#passwdErrorShow").show();
				$("#passwdErrorPic").show();
				//return false;
			}
			/*校验确认密码为空(已校验密码为空,
			若确认密码为空,则不相等=>得出:确认密码无需校验为空)
			*/
			//校验密码长度小于8
			if(passwd.length<8){
				register.func.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
				$("#passwdErrorShow").html("8-20位字符，推荐字母、数字和符号组合的密码");
				$("#passwdErrorShow").show();
				$("#passwdErrorPic").show();
				//return false;
			}
			//校验两次密码不一致
			var passwd1 = $("#passwd1").val();
			if(passwd != passwd1){
				register.func.hideErrorShow("passwd1Flag");//隐藏自己框下的所有提示
				$("#passwd1ErrorShow").html("两次密码不一致");
				$("#passwd1ErrorPic").show();//显示提示信息
				$("#passwd1ErrorShow").show();//显示提示信息
				//return false;
			}
		},
		//注册
		doRegister:function(){
			var mobileNo = $("#mobileNo").val();
			var passwd = $("#passwd").val();
			//将信息存入cookie中
			var arr = [{"uname":mobileNo,"upwd":passwd}];
			//将arr中的值存入到cookie中
			document.cookie = "userlist=" + JSON.stringify( arr );
			alert("注册成功,请登录账号");
			window.location.href="http://127.0.0.1/item/login.html";
		},
		//检验密码复杂度
		checkLevel:function(){
			var val = $("passwd").val();
			var regs = [/[a-zA-Z]+/, /[0-9]+/, /\W+/];
			var n = 0;
		},
		//刷新图形验证码
		refreshCaptcha:function(){
			//此处暂时没有,不刷新
		}
};
$(document).ready(function () {
	register.init();
});




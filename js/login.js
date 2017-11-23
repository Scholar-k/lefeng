var login = {
	//页面初始化加载页面
	init:function() {
		$("#formSubmit").bind('click',login.doLogin);//绑定登录按钮click
		//$("#yzmPic").bind('click',login.refreshYzm);//绑定刷新图形页面click
		//$("#changeYzm").bind('click',login.refreshYzm);
		//login.showErrorMsg();//如果有错误信息，显示错误信息
		login.bindLoginNameFcous();//绑定账号框的fcous事件
		login.bindPasswdFcous();//绑定密码框的fcous事件
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
		
		//取出cookie
		var str = document.cookie;
		var arr  =str.split("=");
		//校验账号为空
		if(loginName == ""){
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$("#loginNameErrorShow").html("请输入账号");
			$("#loginNameErrorShow").show();//显示提示信息
			$("#loginNameErrorPic").show();//显示提示信息
			return false;
		}
		//校验密码为空
		if(passwd == ""){
			login.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
			$("#passwdErrorShow").html("请输入密码");
			$("#passwdErrorShow").show();//显示提示信息
			$("#passwdErrorPic").show();//显示提示信息
			return false;
		}
		//校验账号为未注册账号
		if(JSON.parse(arr[1])[0].uname!=loginName){
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$("#loginNameErrorShow").html("请注册账号");
			$("#loginNameErrorShow").show();//显示提示信息
			$("#loginNameErrorPic").show();//显示提示信息
			return false;
		}
		//校验账号密码是否不正确
		if(JSON.parse(arr[1])[1].upwd!=passwd){
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$("#loginNameErrorShow").html("密码不正确");
			$("#loginNameErrorShow").show();//显示提示信息
			$("#loginNameErrorPic").show();//显示提示信息
			return false;
		}
		return true;
	},
	//登录
	doLogin:function(){
		if(!login.checkForm()){
			//LFControl.loading.Start();
			$("#loginform").submit();
			alert("登录成功");
		}
	},
	//隐藏所有错误提示
	hideAllErrorShow:function(){
		$(".errorShowFlag").html("");
		$(".errorShowFlag").hide();
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
	//隐藏某个输入框下所有的的提示信息和错号对号图片
	hideErrorShow:function(cssFlag){
		$("."+cssFlag).hide();
	}
};

$(document).ready(function () {
	login.init();
});


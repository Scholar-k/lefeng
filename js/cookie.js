//设置cookie
function setCookie(key,value,day){
	if( day>0 ){
		var d = new Date();
		d.setDate( d.getDate() +day );
		document.cookie = key + "=" + value + ";expires=" + d;
	}else{
		document.cookie = key + "=" + value;
	}
}
//获取cookie
function getCookie(key){
	if( document.cookie ){//如果有cookie
		var str = document.cookie;
		var arr = str.split("; ");
		for( var i = 0 ; i < arr.length ; i++ ){
			var item = arr[i].split("=");
			if( item[0]==key ){
				return item[1];//找到了 key对应的值
			}
		}
		//如果cookie中没有key  找不到对应的值
		return "";
	}
	//如果没有cookie   
	return "";
}
//删除cookie
function removeCookie(key){
	setCookie(key,"",-1);
}

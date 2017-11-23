// 头部js
var loginPublicHeadAndTaul = {
	Init: function(){
		loginPublicHeadAndTaul.bind.CheadInfo();
        $('.Cfooter-cr>span').eq(1).text('天津品简电子商务有限公司');
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
}
$(document).ready(function(){
	loginPublicHeadAndTaul.Init();
});
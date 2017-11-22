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
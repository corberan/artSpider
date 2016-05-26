<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="css/StyleSheet.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery.js" type="text/javascript"></script>
    <script type="text/javascript">
        function DrawImage(ImgD, w, h) {
            var image = new Image();
            image.src = ImgD.src;
            if (image.width > 0 && image.height > 0) {
                flag = true;
                if (image.width / image.height >= w / h) {
                    if (image.width > w) {
                        ImgD.width = w;
                        ImgD.height = (image.height * w) / image.width;
                    } else {
                        ImgD.width = image.width;
                        ImgD.height = image.height;
                        ImgD.width = w;
                        ImgD.height = h;
                    }
                    ImgD.alt = image.width + "x" + image.height;
                }
                else {
                    if (image.height > h) {
                        ImgD.height = h;
                        ImgD.width = (image.width * h) / image.height;
                    } else {
                        ImgD.width = image.width;
                        ImgD.height = image.height;
                        ImgD.width = w;
                        ImgD.height = h;
                    }
                    ImgD.alt = image.width + "x" + image.height;
                }
            }
        }
    </script>
</head>
<body style="overflow: auto">

    <div id="topFix">
        <div id="sso_topbar" class="sso_bg">
            <div class="sso_pw fix">
                <form name="sso_member_login" id="form1" action="" method="post" target="_self">
                    <div id="sso_loginBar">
                        <div class="sso_optionInput">
                            <label class="sso_inBox">
                                <input type="text" class="sso_input" id="account" name="account" style="border-color: rgb(212, 212, 212);"/><em class="sso_inTxt">用户名</em></label>
                            <label class="sso_inBox">
                                <input type="password" id="passwd" name="passwd" class="sso_input" style="border-color: rgb(212, 212, 212);"/><em class="sso_inTxt">密码</em></label>
                        </div>
                        <a title="登录" href="javascript:void(0);" onclick="sso.login(this);return false;" class="sso_btn">登录</a>
                        <a title="忘记密码" href="javascript:void(0);" onclick="sso.go(this,'getpasswd');">忘记密码</a><a title="免费注册" href="javascript:void(0);" onclick="sso.go(this,'register');">免费注册</a>
                    </div>
                </form>
                <div class="sso_topTel"><a href="#" target="_blank"><b class="sso_fl">QQ服务：</b><span>1317585249</span></a></div>
                <div class="sso_select">
                    <div class="sso_site">
                        <div class="sso_dropdown oh" style=""><a class="sso_siteTit" href="###" title="雅昌子站">雅昌子站</a><b class="sso_dropBtn"></b></div>
                        <ul class="sso_siteList" style="overflow: hidden;">
                            <li><a href="http://huanan.artron.net/" title="华南站" target="_blank">华南站</a></li>
                            <li><a href="http://huadong.artron.net/" title="华东站" target="_blank">华东站</a></li>
                            <li><a href="http://jx.artron.net" title="江西站" target="_blank">江西站</a></li>
                            <li><a href="http://tw.artron.net/" title="台湾站" target="_blank">台湾站</a></li>
                            <li><a target="_blank" title="河南站" href="http://hn.artron.net/">河南站</a></li>
                            <li><a href="http://ebook.artron.net/" title="图书网" target="_blank">图书网</a></li>
                            <li><a target="_blank" title="交艺网" href="http://www.artronmore.net">交艺网</a></li>
                            <li><a href="http://en.artron.net/" title="英文站" target="_blank">英文站</a></li>
                        </ul>
                    </div>

                    <div class="sso_other"><a title="设为首页" onclick="SetHome(this,window.location)" href="#">设为首页</a> </div>
                </div>
            </div>
            <div class="sso_cutLine"></div>
        </div>
    </div>

    <div id="adv" class="pw oh">
        <!--拉幕begin-->
        <!--AdForward Begin:-->
        <!--AdForward End-->
        <!--拉幕end-->
        <div class="adv980" style="margin-top: 0px;">
            <!--通栏一开始-->
            <!--AdForward Begin:-->
            <!--AdForward End-->
            <!--通栏一结束-->
        </div>
        <div class="txtAdv bg mt5 fix">
        </div>
        <%--<div class="advCol oh">
                <span class="adv320 mr10">
                    <!--海报一 begin-->
                    <!--AdForward Begin:-->
                    <!--AdForward End-->
                    <!--海报一 end-->
                </span>
                <span class="adv320 mr10">
                    <!--海报二 begin-->
                    <!--AdForward Begin:-->
                    <!--AdForward End-->
                    <!--海报二 end-->
                </span><span class="adv320">
                    <!--海报三 begin-->
                    <!--AdForward Begin:-->
                    <!--AdForward End-->
                    <!--海报三 end-->
                </span>
            </div>--%>
    </div>

    <div id="top" class="fix">
        <div class="fl"><strong class="logo"><a href="http://www.artron.net" title="中国城市公共艺术资源库">中国城市公共艺术资源库</a></strong><strong class="slogan"></strong></div>
        <div id="topSearch" class="fr search tabs">
            <div class="fr findBuy">
            </div>
            <div class="fr">
                <div id="sForm">
                    <ul class="tabsTag1">
                        <li class="current click" data-url="<%=Page.ResolveUrl("~/Artistindex.aspx")%>?keyword=">艺术家</li>
                        <li data-url="<%=Page.ResolveUrl("~/index.aspx")%>?keyword=">艺术品</li>
                        <li data-url="<%=Page.ResolveUrl("~/List.aspx")%>?index=2&amp;keyword=">理论与政策</li>
                        <li data-url="<%=Page.ResolveUrl("~/List.aspx")%>?index=1&amp;keyword=">展览</li>
                        <li data-url="<%=Page.ResolveUrl("~/List.aspx")%>?index=0&amp;keyword=">资讯</li>
                    </ul>
                    <div style="clear: both;">
                        <div style="display: block;" class="tabsCon fix">
                            <a href="javascript:void(0);" onclick="formartsosubmit(0,yiso_11.value);" id="sobtn" title="">搜索</a><div style="" class="sRadius">
                                <input type="text" value="" id="yiso_11" name="keyword" class="sInput" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="serkey oh tabsCon" style="display: block;">
                <span class="fl"></span>
                <span class="fr"></span>
            </div>
        </div>
    </div>

    <div id="navNew" class=" z">
        <div class="navFirst">
            <ul class="nav0">
                <li class="art new"><a href="<%=Page.ResolveUrl("~/default.aspx")%>">首页</a><div class="icoWrap"><b></b></div>
                </li>
            </ul>
            <ul class="nav1">
                <li class="art new"><a href="<%=Page.ResolveUrl("~/Artistindex.aspx")%>">艺术家</a><div class="icoWrap"><b></b></div>
                </li>
            </ul>
            <ul class="nav2">
                <li><a href="<%=Page.ResolveUrl("~/index.aspx")%>">艺术品</a></li>
            </ul>
            <ul class="nav3">
                <li class="new"><a href="<%=Page.ResolveUrl("~/List.aspx")%>?index=2">理论与政策</a><div class="icoWrap"><b></b></div>
                </li>
            </ul>
            <ul class="nav4">
                <li><a href="<%=Page.ResolveUrl("~/List.aspx")%>?index=1">展览</a></li>
            </ul>
            <ul class="nav5">
                <li><a href="<%=Page.ResolveUrl("~/List.aspx")%>?index=0">资讯</a></li>
            </ul>
            <ul class="nav6">
                <li><a href="http://www.artebuy.com/">交艺网</a></li>
            </ul>
            <ul class="nav3">
                <li style="padding: 0 25px 0 25px;"><a href="<%=Page.ResolveUrl("~/ArtSpider.aspx")%>">艺术爬虫</a></li>
            </ul>

        </div>
        <div class="navSec">
            <ul>
                <li class="first"></li>
                <li></li>
            </ul>
        </div>
    </div>

    <div class="adv980 mt10 pw">
        <h1>说明</h1>
        <p>
            点击导航栏“艺术爬虫”进入爬虫管理页
        </p>
    </div>






    <div class=" join fix pw">
        <p class="oh contact">责任编辑：icebloom <span class="tel">13787074398</span><a href="mailto:13787074398@qq.com" class="mail">13787074398@qq.com</a></p>
    </div>

    <div class="oh bg f12 lh20 bNav mt20 ">
        <a href="http://www.artron.net/aboutus/aboutus.php" style="background-image: none;">关于我们</a>
        <a href="http://www.artron.net/aboutus/adress.php">广告业务</a>
        <a href="http://www.artron.net/aboutus/job.php">人才招聘</a>
        <a href="http://news.artron.net/morenews.php?column_id=119">雅昌动态</a>
        <a href="http://www.artron.net/aboutus/adress.php">联系我们</a>
        <a href="http://www.artron.net/map.php">网站地图</a>
        <a href="http://www.artron.net/aboutus/copyright.php">版权说明</a>
        <a href="http://www.artron.net/aboutus/mzsm.php">免责声明</a>
        <a href="http://www.artron.net/aboutus/privacy.php">隐私权保护</a>
        <a href="http://www.artron.net/link.html">友情链接</a>
        <a href="http://www.artron.com.cn">雅昌集团</a>
        <a href="http://www.artron.net/aboutus/adviser.php">专家顾问</a>
        <a href="http://www.artron.net/aboutus/law.php">法律顾问</a>

    </div>

    <div style="padding-bottom: 14px;" class="pw copyright">
        <p><span>Copyright Reserved 2000-2014</span>&nbsp;中国城市公共艺术资源库课题组&nbsp;版权所有</p>
        <p><a href="http://www.artron.net/aboutus/zs.php">电信与信息服务业务经营许可证（粤）<span>B2-20030053</span></a><a href="http://www.artron.net/aboutus/zz_artron.php">广播电视制作经营许可证（粤）字第<span>717</span>号　</a></p>
        <p><em>京公安网备<span>110113000792</span>号</em><a href="http://www.artron.net/aboutus/vz_artron.php">信息网络传播视听节目许可证<span>1909402</span>号</a><a target="_blank" href="http://www.miibeian.gov.cn">粤<span>ICP</span>备<span>11054908</span>号-<span>15</span></a></p>
        <p><a href="http://www.artron.net/aboutus/wh_artron.php">网络文化经营许可证文网文<span>［2009］086</span>号</a><a href="http://www.artron.net/aboutus/cb_artron.php">互联网出版许可证<span>［2010］445</span>号</a><a href="http://www.artron.net/aboutus/zs_site.php">可信网站验证服务证书<span>2012040503023850</span>号</a></p>
        <p align="center" style="padding: 7px 0 6px;">
            <a href="https://cert.ebs.gov.cn/21760d89-4b07-448d-aa69-a93e0a5c6ef3" target="_blank">
                <img src="https://cert.ebs.gov.cn/Images/govIcon.gif" title="深圳市市场监督管理局企业主体身份公示" alt="深圳市市场监督管理局企业主体身份公示" width="36" height="50" border="0" style="border-width: 0px; border: hidden; border: none;" /></a>
        </p>
    </div>
    <script src="js/main.js" type="text/javascript"></script>
    <script src="js/sso.js" type="text/javascript"></script>
    <script type="text/javascript">
        var sso = new sso();
        var t = Math.random();
        $.get('/login/vl.ashx?t=' + t, function (data) {
            if (typeof data == "object") {
                if (data.code == 1) {
                    $('#sso_loginBar').html(data.msg);
                    $(".sso_site").hover(function () {
                        var $dropObj = $(this).find(".sso_dropdown"),
                            slideEle = $dropObj.next("ul");

                        slideEle.css({
                            "visibility": "hidden",
                            "display": "block"
                        });
                        var liLength = slideEle.children().length,
                            liHeight = slideEle.children().outerHeight(true);
                        slideEle.css({
                            "visibility": "visible",
                            "height": "0px"
                        }).stop().animate({
                            "height": liLength * liHeight + "px"
                        }, 199, "linear");

                        $dropObj.addClass("hover");
                    }, function () {
                        $(this).children(".sso_dropdown").stop().animate({
                            "backgroundColor": "#FFF",
                            "color": "#000"
                        }, 199, function () {
                            $(this).css({
                                "backgroundColor": "",
                                "color": ""
                            }).removeClass("hover");
                        });

                        $(this).find("ul").stop().animate({
                            "height": "0px"
                        }, 199, function () {
                            $(this).css({
                                "visibility": "",
                                "display": "",
                                "height": ""
                            });
                        });
                    }
                 );
                }
            }
        });
    </script>
</body>
</html>

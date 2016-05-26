if (!AFed) { var AFed = {}; }
$.extend(AFed, {
    searchInit: function (element, alertTag) {

        var $self = $(element),

		$inputObj = $self.find(".sInput"),

		inputVal = $inputObj.val(),

		flag = false,

		classHeight =  parseInt($self.find(".classify").height());

        if (inputVal && (!alertTag)) {

            $inputObj.addClass("nobg");

        }

        else if (alertTag && (!inputVal)) {

            $inputObj.addClass("sGray").val("请输入关键词");

        }

        $self.find(".sRadius").hover(function () {

            var sInputVal = $.trim($inputObj.val());

            if (flag || (sInputVal && "请输入关键词" != sInputVal)) {

                return;

            }

            $(this).stop().css("border-color", "#D4D4D4").animate({

                "borderColor": "#0099CC"

            },

			200,

			function () {

			    $(this).closest("#sForm").addClass("on");

			    $(this).css("border-color", "#0099CC");

			});

        },

		function () {

		    var sInputVal = $.trim($inputObj.val());

		    if (!(flag || sInputVal) || ("请输入关键词" == sInputVal)) {

		        $(this).stop().css("border-color", "#0099CC").animate({

		            "borderColor": "#D4D4D4"

		        },

				200,

				function () {

				    $(this).closest("#sForm").removeClass("on");

				    $(this).css("border-color", "");

				});

		    }

		});

        $inputObj.focus(function () {

            var $sForm = $(this).closest("#sForm");

            if (alertTag) {

                $inputObj.removeClass("sGray");

                inputVal = $.trim($inputObj.val());

                if (inputVal == "请输入关键词") {

                    $inputObj.val("");

                }

            }

            else if (!alertTag) {

                $(this).addClass("nobg");

            }

            flag = true;

            $(this).prev(".class").css("visibility", "visible");

        }).blur(function () {

            flag = false;

            var $sForm = $(this).closest("#sForm"),

			     val = $.trim($(this).val());

            if ("" == val) {

                if (alertTag) {

                    $(this).addClass("sGray").val("请输入关键词");

                }

                else if (!alertTag) {

                    $(this).removeClass("nobg").val("");

                }

                $(this).parent().stop().css("border-color", "#0099CC").animate({

                    "borderColor": "#D4D4D4"

                },

				200,

				function () {

				    $(this).css("border-color", "#D4D4D4");

				});

                $sForm.removeClass("on");

            }

        });

        $self.find(".class").hover(function () {

            if ("hidden" != $(this).css("visibility")) {

                $(this).addClass("hover").children(".classify").css({

                    "height": "0",

                    "visibility": "visible"

                }).stop().animate({

                    "height": classHeight

                },

				200);

            }

        },

		function () {

		    if ("hidden" != $(this).css("visibility")) {

		        $(this).removeClass("hover").children(".classify").stop().animate({

		            "height": 0

		        },

				200,

				function () {

				    $(this).css("visibility", "hidden")

				});

		    }

		});

        $self.find(".classify").children("li").click(function () {

            $(this).closest(".class").find("em").html($(this).html());

            $(this).closest(".classify").animate({

                "height": 0

            },

			200,

			function () {

			    $(this).css("visibility", "hidden")

			});

        });

    },

    toTopInit: function () {

        var pageHeight = document.documentElement.clientHeight || document.body.clientHeight,

		scrollTop = document.documentElement.scrollTop || document.body.scrollTop,

		offsetHeight = document.body.offsetHeight,

		$anchorObj = $("#anchor"),

		footTop = $(".bNav").offset().top;

        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {

            if ((pageHeight + scrollTop) >= footTop) {

                $anchorObj.css("top", footTop - $anchorObj.outerHeight(true));

            } else {

                $anchorObj.css("top", pageHeight + scrollTop - $anchorObj.outerHeight(true) - 40);

            }

            $("#topFix").css("top", scrollTop);

        } else {

            if ((pageHeight + scrollTop) >= footTop + 40) {

                $anchorObj.css("bottom", pageHeight + scrollTop - footTop + "px");

            } else {

                $anchorObj.css("bottom", "40px");

            }

        }

        scrollTop > 0 ? $("#toTop").slideDown(250) : $("#toTop").slideUp(250);

        return false;

    },

    imgScrollInit: function (element, animeteTime, intervalTime) {
        var $self = $(element),
            animateTime = animateTime || 500,
            intervalTime = intervalTime || 3000,
            index = 1,
            ulEle = $self.children("div").children("ul"),
            ulChild = $self.children("ul"),
            liLength = ulEle.children("li").length,
            liWidth = ulEle.children("li").outerWidth(true),
            interval,
            intervalFunc = function () {
                ulChild.find("li:eq(" + index + ")").addClass("hover").siblings().removeClass("hover");
                $self.find("ul:eq(0)").animate({
                    "margin-left": liWidth * (-1) * index + "px"
                }, animateTime, function () {
                    if (index == liLength - 1) {
                        index = 0;
                    } else {
                        index++;
                    }
                });
            };

        if (liLength <= 1) {
            return;
        }
        ulEle.css("width", liWidth * liLength + "px");
        ulChild.find("li:eq(0)").addClass("hover").siblings().removeClass("hover");
        interval = setInterval(intervalFunc, intervalTime);

        ulEle.find("li").hover(function () {
            clearInterval(interval);
            $self.find("ul:eq(0)").stop();
            $(this).siblings().removeClass("hover");
            index = $(this).index();
            intervalFunc();
        }, function () {
            interval = setInterval(intervalFunc, intervalTime);
        });

        ulChild.find("li").hover(function () {
            clearInterval(interval);
            $self.find("ul:eq(0)").stop();
            $(this).siblings().removeClass("hover");
            index = $(this).index();
            intervalFunc();
        }, function () {
            interval = setInterval(intervalFunc, intervalTime);
        });
    },
    /*tab页签显隐切换*/
    tabsAlt: function (element) {
        var $self = $(element),
            tabsIndex = parseInt($self.index()),
                $conDiv = $self.closest(".tabs");
        $self.addClass("current").siblings().removeClass("current");
        $conDiv.children(".tabsCon").eq(tabsIndex).show().siblings(".tabsCon").hide();
    },
    /*页签滚动切换*/
    tabsScroll : function(element){
    var $self =$(element),
        tabsIndex=$self.index(),
        sum =$self.siblings("b").length+1,
        $conDiv=$self.closest(".tabs"),
        $firstCon=$conDiv.find(".tabsCon").eq(0),
        conHeight = $firstCon.outerHeight();
    $self.addClass("current").siblings().removeClass("current");
    tabsIndex<sum?$firstCon.animate({"margin-top":(-1)*conHeight*(tabsIndex)},600,function(){}):$firstCon.animate({"margin-top":(-1)*conHeight*(tabsIndex-1)},600,function(){});	
}			
});

AFed.imgScrollInit(".imgScroll");
AFed.imgScrollInit(".imgScrollTrade", 500, 5000);

AFed.searchInit("#minSearch", true);
AFed.toTopInit();

/*页签切换*/
$("ul.tabsTag li").hover(function () { AFed.tabsAlt(this); }, function () { });
$("artPic.tabsTag li").hover(function () { AFed.tabsAlt(this); }, function () { });

/**  展览推荐  */
var tabsConIndex = 1,
    tabsConInterval = setInterval(function () {
        tabsConIndex++;
        AFed.tabsScroll(".bTabs b:eq(" + tabsConIndex % 2 + ")");
    }, 10000);

$(".bTabs b").bind("click", function () {
    tabsConIndex++;
    clearInterval(tabsConInterval);
    tabsConInterval = setInterval(function () {
        tabsConIndex++;
        AFed.tabsScroll(".bTabs b:eq(" + tabsConIndex % 2 + ")");
    }, 10000);
    AFed.tabsScroll(this);
}).hover(function () {
    $(this).addClass("hover");
}, function () {
    $(this).removeClass("hover");
});

$(".tabsCon li").hover(function () {
    clearInterval(tabsConInterval);
}, function () {
    tabsConInterval = setInterval(function () {
        tabsConIndex++;
        AFed.tabsScroll(".bTabs b:eq(" + tabsConIndex % 2 + ")");
    }, 10000);
});

(function ($) {
    $(function () {
        setTimeout(function () {
            $(".sso_input").val("");
        }, 100);
    });

    $("#topFix").ready(function (e) {
        $(".sso_inBox").live("mouseenter", function () {
            $(this).children(".sso_input").addClass("sso_inputH").stop().animate({
                "borderColor": $("#sso_topbar").attr("data-changecolor") || "#0099CC"
            }, 199, "linear");
        }).live("mouseleave", function () {
            $(this).children(".sso_input").stop().animate({
                "borderColor": "#D4D4D4"
            }, 199, "linear", function () {
                $(this).removeClass("sso_inputH");
            });
        });
        $(".sso_inBox > .sso_inTxt").live("click", function () {
            $(this).siblings(".sso_input").trigger("focus");
        });

        $(".sso_inBox > .sso_input").live("focus", function () {
            $(this).addClass("sso_inputF").siblings(".sso_inTxt:visible").addClass("sso_inTxtOn");
        }).live("blur", function () {
            if ($(this).val() == "") {
                $(this).removeClass("sso_inputF").siblings(".sso_inTxt:visible").removeClass("sso_inTxtOn");
            }
        }).live("keydown", function (event) {
            var keyCode = event.keyCode || event.charCode;

            if (keyCode == 13) {
                $(".sso_btn").trigger("click");
                return;
            }

            if ($(this).val() == "") {
                $(this).siblings(".sso_inTxt").show();
            } else {
                $(this).siblings(".sso_inTxt").hide();
            }
        }).live("keypress", function () {
            if ($(this).val() == "") {
                $(this).siblings(".sso_inTxt").show();
            } else {
                $(this).siblings(".sso_inTxt").hide();
            }
        }).live("keyup", function () {
            if ($(this).val() == "") {
                $(this).siblings(".sso_inTxt").show();
            } else {
                $(this).siblings(".sso_inTxt").hide();
            }
        });

        /*站点切换*/
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

    });
})(jQuery)

$.ajaxSetup({ cache: false });

/* SuperSlide1.2 --  Copyright ©2012 大话主席 
 */
(function ($) {
    $.fn.slide = function (options) {
        $.fn.slide.deflunt = {
            effect: "fade", //效果 || fade：渐显； || top：上滚动；|| left：左滚动；|| topLoop：上循环滚动；|| leftLoop：左循环滚动；|| topMarquee：上无缝循环滚动；|| leftMarquee：左无缝循环滚动；
            autoPlay: false, //自动运行
            delayTime: 500, //效果持续时间
            interTime: 4000,//自动运行间隔。当effect为无缝滚动的时候，相当于运行速度。
            defaultIndex: 0,//默认的当前位置索引。0是第一个
            titCell: ".hd li",//导航元素
            mainCell: ".bd",//内容元素的父层对象
            trigger: "mouseover",//触发方式 || mouseover：鼠标移过触发；|| click：鼠标点击触发；
            scroll: 1,//每次滚动个数。
            vis: 1,//visible，可视范围个数，当内容个数少于可视个数的时候，不执行效果。
            titOnClassName: "on",//当前位置自动增加的class名称
            autoPage: false,//系统自动分页，当为true时，titCell则为导航元素父层对象，同时系统会在titCell里面自动插入分页li元素(1.2版本新增)
            prevCell: ".prev",//前一个按钮元素。
            nextCell: ".next"//后一个按钮元素。
        };

        return this.each(function () {
            var opts = $.extend({}, $.fn.slide.deflunt, options);
            var index = opts.defaultIndex;
            var prevBtn = $(opts.prevCell, $(this));
            var nextBtn = $(opts.nextCell, $(this));
            var navObj = $(opts.titCell, $(this));//导航子元素结合
            var navObjSize = navObj.size();
            var conBox = $(opts.mainCell, $(this));//内容元素父层对象
            var conBoxSize = conBox.children().size();
            var slideH = 0;
            var slideW = 0;
            var selfW = 0;
            var selfH = 0;
            var autoPlay = opts.autoPlay;
            var inter = null;//setInterval名称 
            var oldIndex = index;

            if (conBoxSize < opts.vis) return; //当内容个数少于可视个数，不执行效果。

            //处理分页
            if (navObjSize == 0) navObjSize = conBoxSize;
            if (opts.autoPage) {
                var tempS = conBoxSize - opts.vis;
                navObjSize = 1 + parseInt(tempS % opts.scroll != 0 ? (tempS / opts.scroll + 1) : (tempS / opts.scroll));
                navObj.html("");
                for (var i = 0; i < navObjSize; i++) { navObj.append("<li>" + (i + 1) + "</li>") }
                var navObj = $("li", navObj);//重置导航子元素对象
            }

            conBox.children().each(function () { //取最大值
                if ($(this).width() > selfW) { selfW = $(this).width(); slideW = $(this).outerWidth(true); }
                if ($(this).height() > selfH) { selfH = $(this).height(); slideH = $(this).outerHeight(true); }
            });

            switch (opts.effect) {
                case "top": conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + opts.vis * slideH + 'px"></div>').css({ "position": "relative", "padding": "0", "margin": "0" }).children().css({ "height": selfH }); break;
                case "left": conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + opts.vis * slideW + 'px"></div>').css({ "width": conBoxSize * slideW, "position": "relative", "overflow": "hidden", "padding": "0", "margin": "0" }).children().css({ "float": "left", "width": selfW }); break;
                case "leftLoop":
                case "leftMarquee":
                    conBox.children().clone().appendTo(conBox).clone().prependTo(conBox);
                    conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + opts.vis * slideW + 'px"></div>').css({ "width": conBoxSize * slideW * 3, "position": "relative", "overflow": "hidden", "padding": "0", "margin": "0", "left": -conBoxSize * slideW }).children().css({ "float": "left", "width": selfW }); break;
                case "topLoop":
                case "topMarquee":
                    conBox.children().clone().appendTo(conBox).clone().prependTo(conBox);
                    conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + opts.vis * slideH + 'px"></div>').css({ "height": conBoxSize * slideH * 3, "position": "relative", "padding": "0", "margin": "0", "top": -conBoxSize * slideH }).children().css({ "height": selfH }); break;
            }

            //效果函数
            var doPlay = function () {
                switch (opts.effect) {
                    case "fade": case "top": case "left": if (index >= navObjSize) { index = 0; } else if (index < 0) { index = navObjSize - 1; } break;
                    case "leftMarquee": case "topMarquee": if (index >= 2) { index = 1; } else if (index < 0) { index = 0; } break;
                    case "leftLoop": case "topLoop":
                        var tempNum = index - oldIndex;
                        if (navObjSize > 2 && tempNum == -(navObjSize - 1)) tempNum = 1;
                        if (navObjSize > 2 && tempNum == (navObjSize - 1)) tempNum = -1;
                        var scrollNum = Math.abs(tempNum * opts.scroll);
                        if (index >= navObjSize) { index = 0; } else if (index < 0) { index = navObjSize - 1; }
                        break;
                }
                switch (opts.effect) {
                    case "fade": conBox.children().stop(true, true).eq(index).fadeIn(opts.delayTime).siblings().hide(); break;
                    case "top": conBox.stop(true, true).animate({ "top": -index * opts.scroll * slideH }, opts.delayTime); break;
                    case "left": conBox.stop(true, true).animate({ "left": -index * opts.scroll * slideW }, opts.delayTime); break;
                    case "leftLoop":
                        if (tempNum < 0) {
                            conBox.stop(true, true).animate({ "left": -(conBoxSize - scrollNum) * slideW }, opts.delayTime, function () {
                                for (var i = 0; i < scrollNum; i++) { conBox.children().last().prependTo(conBox); }
                                conBox.css("left", -conBoxSize * slideW);
                            });
                        }
                        else {
                            conBox.stop(true, true).animate({ "left": -(conBoxSize + scrollNum) * slideW }, opts.delayTime, function () {
                                for (var i = 0; i < scrollNum; i++) { conBox.children().first().appendTo(conBox); }
                                conBox.css("left", -conBoxSize * slideW);
                            });
                        } break;// leftLoop end

                    case "topLoop":
                        if (tempNum < 0) {
                            conBox.stop(true, true).animate({ "top": -(conBoxSize - scrollNum) * slideH }, opts.delayTime, function () {
                                for (var i = 0; i < scrollNum; i++) { conBox.children().last().prependTo(conBox); }
                                conBox.css("top", -conBoxSize * slideH);
                            });
                        }
                        else {
                            conBox.stop(true, true).animate({ "top": -(conBoxSize + scrollNum) * slideH }, opts.delayTime, function () {
                                for (var i = 0; i < scrollNum; i++) { conBox.children().first().appendTo(conBox); }
                                conBox.css("top", -conBoxSize * slideH);
                            });
                        } break;//topLoop end

                    case "leftMarquee":
                        var tempLeft = conBox.css("left").replace("px", "");

                        if (index == 0) {
                            conBox.animate({ "left": ++tempLeft }, 0, function () {
                                if (conBox.css("left").replace("px", "") >= 0) { for (var i = 0; i < conBoxSize; i++) { conBox.children().last().prependTo(conBox); } conBox.css("left", -conBoxSize * slideW); }
                            });
                        }
                        else {
                            conBox.animate({ "left": --tempLeft }, 0, function () {
                                if (conBox.css("left").replace("px", "") <= -conBoxSize * slideW * 2) { for (var i = 0; i < conBoxSize; i++) { conBox.children().first().appendTo(conBox); } conBox.css("left", -conBoxSize * slideW); }
                            });
                        } break;// leftMarquee end

                    case "topMarquee":
                        var tempTop = conBox.css("top").replace("px", "");
                        if (index == 0) {
                            conBox.animate({ "top": ++tempTop }, 0, function () {
                                if (conBox.css("top").replace("px", "") >= 0) { for (var i = 0; i < conBoxSize; i++) { conBox.children().last().prependTo(conBox); } conBox.css("top", -conBoxSize * slideH); }
                            });
                        }
                        else {
                            conBox.animate({ "top": --tempTop }, 0, function () {
                                if (conBox.css("top").replace("px", "") <= -conBoxSize * slideH * 2) { for (var i = 0; i < conBoxSize; i++) { conBox.children().first().appendTo(conBox); } conBox.css("top", -conBoxSize * slideH); }
                            });
                        } break;// topMarquee end


                }//switch end
                navObj.removeClass(opts.titOnClassName).eq(index).addClass(opts.titOnClassName);
                oldIndex = index;
            };
            //初始化执行
            doPlay();

            //自动播放
            if (autoPlay) {
                if (opts.effect == "leftMarquee" || opts.effect == "topMarquee") {
                    index++; inter = setInterval(doPlay, opts.interTime);
                    conBox.hover(function () { if (autoPlay) { clearInterval(inter); } }, function () { if (autoPlay) { clearInterval(inter); inter = setInterval(doPlay, opts.interTime); } });
                } else {
                    inter = setInterval(function () { index++; doPlay() }, opts.interTime);
                    $(this).hover(function () { if (autoPlay) { clearInterval(inter); } }, function () { if (autoPlay) { clearInterval(inter); inter = setInterval(function () { index++; doPlay() }, opts.interTime); } });
                }
            }

            //鼠标事件
            var mst;
            if (opts.trigger == "mouseover") {
                navObj.hover(function () { clearTimeout(mst); index = navObj.index(this); mst = window.setTimeout(doPlay, 200); }, function () { if (!mst) clearTimeout(mst); });
            } else { navObj.click(function () { index = navObj.index(this); doPlay(); }) }
            nextBtn.click(function () { index++; doPlay(); });
            prevBtn.click(function () { index--; doPlay(); });

        });//each End

    };//slide End

})(jQuery);

$(".filtItem .show").toggle(function () {
    $(this).addClass("hide").next(".base").find(".ps").show();
}, function () {
    $(this).removeClass("hide").next(".base").find(".ps").hide();
})


$(function () {
    $("#sForm > .tabsTag1 > li").bind("mouseenter", function () {
        $(this).addClass('over')
    }).bind("mouseleave", function () {
        $(this).removeClass("over")
    }).bind("click", function () {

        $(this).addClass("click").siblings("li").removeClass("current").removeClass("click");
        $(this).closest(".tabs").children(".tabsCon").eq($(this).index()).show().siblings(".tabsCon").hide();
        $(this).closest("#sForm").find(".sRadius").stop().css("border-color", "#0f820c").animate(function () {
            "border-color", "#0f820c"
        }, 199);
        $(this).closest("#sForm").find(".sInput").addClass("nobg").focus();
    });
    $("#sForm .sInput").blur(function () {
        $(this).closest("#sForm").find(".click").removeClass("hover");
    })
});
function formartsosubmit(biao, txt) {
    if (biao == 0) {//点击搜索
        var URLYISO = $("#sForm .click").attr("data-url");
        if (URLYISO) {
            //window.location.href=URLYISO+encodeURI(txt);
            window.open(URLYISO + encodeURI(txt), '_blank');
        }
    } else {//submit
        var URLYISO = $("#sForm .click").attr("data-url");
        URLYISO = URLYISO + encodeURI(txt);
        if (URLYISO) {
            $('#artso_form').attr('action', URLYISO);
            //$('#artso_form').submit();
        }
    }
}
$("#sobtn").click(function () {
    var URLYISO = $("#sForm .click").attr("data-url");
    var txt = $("#yiso_11.value").value = 'undefined' ? "" : $("#yiso_11.value").value;
    if (URLYISO) {
        window.open(URLYISO + encodeURI(txt), '_blank');
    }
})
function byclass_getvalue(classval, nameval) {//js根据name获取固定class的标签value
    var obj = document.getElementsByTagName(nameval);
    var value = '';
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].className == classval) {
            var getObj = obj[i];
            value = getObj.innerHTML;//获得他的innerHTML
        }
    }
    return value;
}
function Work_cd_w(preurl) {
    var BeginDate = document.getElementById('BeginDate').value;
    var EndDate = document.getElementById('EndDate').value;
    if ((BeginDate.match(/^\d{4}$/) || BeginDate == '') && (EndDate.match(/^\d{4}$/) || EndDate == '')) {
        window.location.href = preurl + '&BeginDate=' + BeginDate + '&EndDate=' + EndDate;
    } else {
        alert('必须输入4位整数查询');
    }
}

function Work_cd_a(preurl) {
    var Author = document.getElementById('Author').value;
    window.location.href = preurl + '&Author=' + Author;
}

function setHomepage(){
    if (document.all){
        document.body.style.behavior='url(#default#homepage)';
        document.body.setHomePage('http://www.artso.artron.net/');
    }else if (window.sidebar){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch (e){
                alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage','http://www.artso.artron.net/');
    }else{
        alert('您的浏览器不支持自动自动设置首页, 请使用浏览器菜单手动设置!');
    }
}

(function ($) {
    jQuery.fn.PositionFixed = function (options) {
        var defaults = {
            css: '',
            x: 0,
            y: 0
        };
        var o = jQuery.extend(defaults, options);

        var isIe6 = false; //is ie ? yes:ie no: not ie
        if ($.browser.msie && parseInt($.browser.version) == 6)
            isIe6 = true;

        var html = $('html');
        if (isIe6 && html.css('backgroundAttachment') !== 'fixed') {
            html.css('backgroundAttachment', 'fixed')
        };

        return this.each(function () {
            var domThis = $(this)[0];
            var objThis = $(this);
            if (isIe6) {

                var left = parseInt(o.x) - html.scrollLeft(),
                       top = parseInt(o.y) - html.scrollTop()
                       width = (document.documentElement.clientWidth || document.body.clientWidth);

                objThis.css('position', 'absolute');
                objThis.css('width', width + 'px');
                domThis.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
                domThis.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');
            }
            else {
                objThis.css('position', 'fixed').css('top', o.y).css('left', o.x);
            }
        });
    };
})(jQuery)

//$('#topFix').PositionFixed({ x: 0, y: 0 });
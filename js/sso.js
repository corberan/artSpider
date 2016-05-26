function sso() {
    var appId11;
    var appId;
    var formId;
    var redirect = encodeURIComponent(window.location.href);
    if (typeof (arguments[0]) != 'undefined') {
        appId = arguments[0]
    } else {
        appId = 2;
    }
    //if (typeof (arguments[1]) != 'undefined') {
    //    formId = arguments[1]
    //} else {
    //    formId = 'form1'
    //}
    this.go = function (o, item) {
        var url;
        switch (item) {
            case 'register':
                url = '/login/Register.aspx';
                break;
            case 'login':
                url = '/login/login.aspx';
                break;
            case 'logout':
                url = 'login/logout.aspx';
                break;
            case 'getpasswd':
                url = '/login/getpassword.aspx';
                break;
            default:
                return;
                break;
        }
        o.href = url + '?appId=' + appId + '&redirect=' + redirect;
        o.click();
    }
    this.login = function () {
        //var form = document.getElementById(formId);
        //if (form == null) {
        //    alert("Error:找不到标签" + formId);
        //    return false;
        //}
        var account = document.getElementById('account');
        var passwd = document.getElementById('passwd');
        if (!account.value || account.value == '用户名') {
            alert('请输入用户名');
            account.focus();
            return false;
        }
        if (!passwd.value) {
            alert('请输入密码');
            passwd.focus();
            return false;
        }
        //form.action = "/login/login.aspx?ReturnUrl=" + redirect;
        //form.submit();
        var t = Math.random();
        //$.post("/login/l.ashx?ReturnUrl=" + redirect , {
        //    'account': account.value,
        //    'passwd': passwd.value
        //}, function (data) {
        //    if (typeof data == "object") {
        //        if (data.code == 1) {
        //            $('#sso_loginBar').html(data.msg);
        //            $(".sso_site").hover(function () {
        //                var $dropObj = $(this).find(".sso_dropdown"),
        //                    slideEle = $dropObj.next("ul");

        //                slideEle.css({
        //                    "visibility": "hidden",
        //                    "display": "block"
        //                });
        //                var liLength = slideEle.children().length,
        //                    liHeight = slideEle.children().outerHeight(true);
        //                slideEle.css({
        //                    "visibility": "visible",
        //                    "height": "0px"
        //                }).stop().animate({
        //                    "height": liLength * liHeight + "px"
        //                }, 199, "linear");

        //                $dropObj.addClass("hover");
        //            }, function () {
        //                $(this).children(".sso_dropdown").stop().animate({
        //                    "backgroundColor": "#FFF",
        //                    "color": "#000"
        //                }, 199, function () {
        //                    $(this).css({
        //                        "backgroundColor": "",
        //                        "color": ""
        //                    }).removeClass("hover");
        //                });

        //                $(this).find("ul").stop().animate({
        //                    "height": "0px"
        //                }, 199, function () {
        //                    $(this).css({
        //                        "visibility": "",
        //                        "display": "",
        //                        "height": ""
        //                    });
        //                });
        //            }
        //         );
        //        }
        //    }
        //}, 'json');


        $.ajax({
            url: "/login/l.ashx?ReturnUrl=" + redirect,
            type: 'POST',
            beforeSend: function () { $('.sso_btn').html('登录<img height="16px" width="11px" alt="加载中" src="/images/ajax-loader.gif" />'); },
            complete:function(){$('.sso_btn').html('登录')},
            data: { account: account.value, passwd: passwd.value },
            dataType:'json',
            success: function (data) {
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
                    else
                    {
                        alert('用户名或密码错误')
                    }
                }
            }
        });
    };
}


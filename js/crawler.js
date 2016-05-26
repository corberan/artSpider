// echarts 初始化与数据设置

var spiderChart = echarts.init(document.getElementById('echartsTable'), 'macarons');
var chartOption = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].value + ' 张';
        }
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            onZero: false
        },
        data: [] //238
    }],
    yAxis: [{
        name: '图片(张)',
        type: 'value',
        max: 10
    }],
    series: [{
        name: '图片',
        type: 'line',
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: []
    }]
};
//spiderChart.setOption(chartOption);

//瀑布流自适应
var currentWidth = 980;
var col = 4;
$(window).resize(function() {
    var winWidth = $(window).width();
    var conWidth;
    if (winWidth < 660) {
        conWidth = 440;
        col = 2
    } else if (winWidth < 880) {
        conWidth = 660;
        col = 3
    } else {
        conWidth = 980;
        col = 4;
    }

    if (conWidth != currentWidth) {
        currentWidth = conWidth;
        $('#container').width(conWidth);
        $('#container').BlocksIt({
            numOfCol: col,
            offsetX: 8,
            offsetY: 8
        });
    }
});


var pollRequestID; //轮询id，用于停止
var allImgsCount = 0;
var urlRegex = new RegExp(/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i);
var imgRegex = new RegExp("img", "g");
var listRegex = new RegExp("<li>", "g");

$("#scandUrls").text("这里会显示服务器的扫描状态");
resetCharts();

//刷新消息
function addMessage(msg) {
    $("#message").html("<strong>" + (new Date()).toLocaleTimeString() + " </strong>" + msg);
}

//排列图片
function arrangeImages() {
    $('#container').BlocksIt({
        numOfCol: col,
        offsetX: 8,
        offsetY: 8
    });
}

//初始化echarts图表
function resetCharts() {
    chartOption.xAxis[0].data = [(new Date()).toLocaleTimeString()];
    chartOption.series[0].data = [0];
    chartOption.yAxis[0].max = 10;
    spiderChart = echarts.init(document.getElementById('echartsTable'), 'macarons');
    spiderChart.setOption(chartOption);
}

//轮询接受图片
function getImage() {
    $.ajax({
        type: "post",
        url: "ArtSpider.aspx/getImage",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout : 1000,
        success: function (data) {
            var ImageJson = JSON.parse(data.d);
            chartOption.xAxis[0].data.push((new Date()).toLocaleTimeString());
            if (ImageJson.status == "waiting") {
                chartOption.series[0].data.push(0); //没有图片

                $("#rollBoard").find("ul").find("li:first").remove();// 删除上次留下的<li>
                $("#scandUrls").append(ImageJson.html);

                var listmc = ImageJson.html.match(listRegex);
                var liCount = listmc ? listmc.length : 0;//获得图片张数
                for (var i = 1; i < liCount; i++) {
                    $("#rollBoard").find("ul").animate({
                        marginTop: "-50px"
                    }, 30, function () {
                        $(this).css({ marginTop: "0px" }).find("li:first").remove();
                    });
                }
                $("#urlScanedCount").text(ImageJson.count);
            } else if (ImageJson.status == "got") {
                var imgmc = ImageJson.html.match(imgRegex);
                var picCount = imgmc ? imgmc.length : 0;//获得图片张数
                allImgsCount += picCount;
                $("#imgGotCount").text(allImgsCount);
                if (picCount > chartOption.yAxis[0].max) { chartOption.yAxis[0].max = picCount };
                chartOption.series[0].data.push(picCount);

                $("#container").append(ImageJson.html);
            } else if (ImageJson.status == "over") {
                window.clearInterval(pollRequestID);
                $("#scandUrls").text("扫描完成");
                $("#StartSpider").text("开始爬取");
                addMessage("扫描已完成");
            }
            spiderChart.setOption(chartOption);
        },
        error: function (err) {
            console.error("轮询无返回，"+err);
        }
    });
}


//抓取按钮绑定事件
function crawlerControl() {
    //console.log(document.getElementById('StartSpider').text);
    if ($("#StartSpider").text() == "开始爬取") {
        //var RequestURL = $("#RequestURL").attr("value");
        var RequestURL = eval(document.getElementById('RequestURL')).value;
        var KeyWord = eval(document.getElementById('KeyWord')).value;
        //var KeyWord = $("#KeyWord").attr("value");
        if (KeyWord == "" || KeyWord == "请输入关键词") {
            alert("请输入一个关键词，爬虫将爬取相关的图片");
            return;
        }
        if (urlRegex.test(RequestURL) == true) {
            if (RequestURL.indexOf("http") != 0) {
                RequestURL = "http://" + RequestURL;
            }
            addMessage("已开始!等待服务器响应...");
            $("#scandUrls").text("");
            allImgsCount = 0;
            //$("#StartSpider").attr("disabled", true);
            $.post("ArtSpider.aspx", {
                "RequestURL": RequestURL,
                "KeyWord": KeyWord
            },
            function(responseData, textStatus) {
                //$("#StartSpider").removeAttr("disabled");
                if (responseData.status == "error") {
                    alert(responseData.message);
                } else if (responseData.status == "ok") {
                    addMessage(responseData.message);
                    pollRequestID = self.setInterval("getImage()", 1000);// 开始轮询
                    self.setInterval("arrangeImages()", 5000);
                    $("#StartSpider").text("停止爬取");
                }
            }, "json");
        } else {
            alert("请输入一个正确的网址");
        }
    } else if ($("#StartSpider").text() == "停止爬取") {
        window.clearInterval(pollRequestID);
        $.ajax({
            type: "post",
            url: "ArtSpider.aspx/stopSpider",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                addMessage(data.d);
            },
            error: function (err) {
                console.error(err);
            }
        });
        $("#scandUrls").text("已停止扫描");
        $("#StartSpider").text("开始爬取");
    }
}

//清除按钮事件
function clearMsg() {
    $("#message").text("请输入网址和关键词进行操作");
    $("#scandUrls").text("这里会显示服务器的扫描状态");
    $("#container").text("");
    $("#urlScanedCount").text("0");
    $("#imgGotCount").text("0");
    $("#RequestURL").val("请输入您需要爬取的网站网址");
    $("#KeyWord").val("请输入关键词");
    resetCharts();
};


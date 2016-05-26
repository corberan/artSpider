using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Net;
using System.Text.RegularExpressions;
using System.Web.Services;
using StanSoft;
using ScrapingSpider.Core;
using ScrapingSpider.Core.Models;
using System.Threading;
using System.Diagnostics;

public partial class ArtSpider : System.Web.UI.Page
{
    private const int PUSH = 0;
    private const int POP = 1;
    private const int POPALL = 2;
    private const int RESET = 3;

    private static Object objForUrlsLock = new Object();// 用于操作url集线程同步
    private static Object objForImagesLock = new Object();// 用于操作Img集线程同步

    private static Spider spider = null;
    private static string WebSiteDomian = null;// 用户提交网址的一级域名

    private static string AllUrlsScaned = "";// 已经扫描过的网址集合，用于避免重复操作
    private static int AllUrlsScanedCount = 0;
    private static string AllImagesGot = "";// 已扫描的全部img集合，用于图片去重复

    //以下两个字串包装后会以json形式发送给客户端
    private static string UrlScanedFromLastTime = "";// 用于保存自上次客户端请求后新扫描的Url集合
    private static string ImagesHtmlCode = "";// 上次请求后新增的图片代码集合

    //一些正则
    private static Regex URLheaderRegex = new Regex(@"(\w+://)");
    private static Regex ImgLinkRegex = new Regex(@"<img\b[^<>]*?\bsrc[\s\t\r\n]*=[\s\t\r\n]*[""']?[\s\t\r\n]*(?<imgUrl>[^\s\t\r\n""'<>]*)[^<>]*?/?[\s\t\r\n]*>", RegexOptions.IgnoreCase);

    // 爬取的自动关闭与判断
    private static double LastRequestTime = 0;
    private static double LastAddUrlTime = 0;
    private static Boolean isOver = false;

    protected void Page_Load(object sender, EventArgs e)
    {
        string url = HttpContext.Current.Request["RequestURL"];
        string keyword = HttpContext.Current.Request["KeyWord"];
        if (url != null)
        {
            Response.Expires = -1;
            Response.Clear();
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.ContentType = "application/json";

            try
            {
                HttpWebRequest myHttpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                myHttpWebRequest.UserAgent = "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36";
                myHttpWebRequest.Method = "GET";
                HttpWebResponse myHttpWebResponse = (HttpWebResponse)myHttpWebRequest.GetResponse();
                if (myHttpWebResponse.StatusCode == HttpStatusCode.OK)
                {
                    WebSiteDomian = URLheaderRegex.Match(url, 0).Value + myHttpWebRequest.Host;
                    Response.Write("{\"status\": \"ok\", \"message\": \"服务器开始分析网站 " + WebSiteDomian + "，请耐心等待\"}");
                    isOver = false;
                    LastAddUrlTime = LastRequestTime = DateTime.Now.Subtract(DateTime.Parse("1970-1-1")).TotalMilliseconds / 1000;
                    StartSpider(WebSiteDomian, keyword);
                }
                else
                {
                    Response.Write("{\"status\": \"error\", \"message\": \"网站暂时无法访问(" + myHttpWebResponse.StatusCode + ")\"}");
                }
                myHttpWebResponse.Close();

            }
            catch (Exception ex)
            {
                Response.Write("{\"status\": \"error\", \"message\": \"尝试访问网站时发生错误：" + ex.Message + "\"}");
            }

            Response.Flush();
            Response.End();
        }
    }

    private void StartSpider(string domian, string keyword)
    {
        if (spider != null)
        {
            spider.Stop();
        }

        var settings = new Settings();
        settings.InitSeeds = domian;
        settings.LockHost = true;
        settings.KeepCookie = true;
        settings.Threads = 5;// 爬取线程数
        settings.UserAgent = "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36";
        settings.Timeout = 1000;
        settings.CrawlDepth = -1;// 爬取深度，-1表示遍历整个网站
        settings.LimitSpeed = false;// 是否智能控制网速，选否则会全速下载网页

        Html2Article.AppendMode = true;
        Html2Article.LimitCount = 50;
        Html2Article.Depth = 10;

        spider = new Spider(settings, null, null);
        //System.Diagnostics.Debug.WriteLine(spider);//////////////////***********
        spider.AddUrlEvent += addUrlArgs =>
        {
            return true;
        };

        spider.DataReceivedEvent += receivedArgs =>
        {
            //System.Diagnostics.Debug.WriteLine(receivedArgs.Url);
            if (URLStackOperate(POPALL, null).IndexOf(receivedArgs.Url) == -1) // 属于新链接
            {
                Article article = Html2Article.GetArticle(receivedArgs.Html);
                if (article.Content.IndexOf(keyword) != -1) // 文章包含用户输入的关键词
                {
                    if (article.ContentWithTags.IndexOf("img") != -1) // 文章包含图片
                    {
                        MatchCollection matches = ImgLinkRegex.Matches(article.ContentWithTags);// 取出所有img链接
                        foreach (Match match in matches)
                        {
                            string img = match.Groups["imgUrl"].Value; // 获得img链接
                            if (ImagesHtmlCodeStackOperate(POPALL, null, null).IndexOf(img) == -1) // 新图片
                            {
                                string HtmlCode = "<div class='grid'>"
                                + "<div class='imgholder'>"
                                + "<a href='" + receivedArgs.Url + "' target='_blank'>";
                                if (match.Groups["imgUrl"].Value.IndexOf("http") == 0)
                                {
                                    HtmlCode += "<img src='" + match.Groups["imgUrl"].Value + "'>";
                                }
                                else
                                {
                                    HtmlCode += "<img src='" + domian + match.Groups["imgUrl"].Value + "'>";
                                }
                                HtmlCode += "</a>"
                                + "</div>"
                                    //+ "<strong>" + article.Title.Substring(0, 6) + "...</strong>"
                                    //+ "<p>" + article.Content.Substring(0, 20) + "...</p>"
                                    //+ "<div class='meta'>" + domian + "</div>"
                                + "</div>";
                                ImagesHtmlCodeStackOperate(PUSH, HtmlCode, img);
                            }
                        }

                    }
                }
            }
            URLStackOperate(PUSH, receivedArgs.Url);
        };
        spider.Crawl();
    }

    private static string URLStackOperate(int command, string urls)
    {
        lock (objForUrlsLock)
        {
            if (command == PUSH && urls != null)
            {
                LastAddUrlTime = DateTime.Now.Subtract(DateTime.Parse("1970-1-1")).TotalMilliseconds / 1000; // 每次写入都会更新
                if (DateTime.Now.Subtract(DateTime.Parse("1970-1-1")).TotalMilliseconds / 1000 - LastRequestTime > 15)// 15秒没有收到用户请求
                {
                    spider.Stop();
                    return null;
                }
                AllUrlsScanedCount++;
                UrlScanedFromLastTime += "<li><strong>正在处理：</strong> " + urls + "</li>";
                AllUrlsScaned += urls;
                return null;
            }
            else if (command == POP)
            {
                if (DateTime.Now.Subtract(DateTime.Parse("1970-1-1")).TotalMilliseconds / 1000 - LastAddUrlTime > 15)// 15秒没有加入新网址，认为线程已停止
                {
                    isOver = true;
                    spider.Stop();
                }
                string back = UrlScanedFromLastTime;
                UrlScanedFromLastTime = "";// pop清空
                return back;
            }
            else if (command == POPALL)
            {
                return AllUrlsScaned;
            }
            else if (command == RESET)
            {
                AllUrlsScaned = UrlScanedFromLastTime = "";
                AllUrlsScanedCount = 0;
                return null;
            }
            else
            {
                return null;
            }
        }
    }

    private static string ImagesHtmlCodeStackOperate(int command, string codes, string imgs)
    {
        lock (objForImagesLock)
        {
            if (command == PUSH && codes != null && imgs != null)
            {
                AllImagesGot += imgs;
                ImagesHtmlCode += codes;
                return null;
            }
            else if (command == POP)
            {
                string back = ImagesHtmlCode;
                ImagesHtmlCode = "";// pop清空
                return back;
            }
            else if (command == POPALL)
            {
                return AllImagesGot;
            }
            else if (command == RESET)
            {
                AllImagesGot = "";
                ImagesHtmlCode = "";
                return null;
            }
            else
            {
                return null;
            }
        }
    }

    [WebMethod]
    public static string stopSpider()
    {
        string result = string.Empty;
        if (spider != null)
        {
            spider.Stop();
            spider = null;
            URLStackOperate(RESET, null);
            ImagesHtmlCodeStackOperate(RESET, null, null);
            result = "已停止抓取";
        }
        else
        {
            result = "爬虫没有启动";
        }
        return result;
    }


    [WebMethod]
    public static string getImage()
    {
        LastRequestTime = DateTime.Now.Subtract(DateTime.Parse("1970-1-1")).TotalMilliseconds / 1000;
        if (isOver)
        {
            return "{\"status\": \"over\"}";
        }
        string result = ImagesHtmlCodeStackOperate(POP, null, null);
        if (result.Equals(""))
        {
            result = "{\"status\": \"waiting\", \"html\": \"" + URLStackOperate(POP, null) + "\", \"count\": \"" + AllUrlsScanedCount + "\"}";
        }
        else
        {
            result = "{\"status\": \"got\", \"html\": \"" + result + "\"}";
        }
        return result;
    }

}
$(function () {
    tabPage({
        pageMain: '#pageMain',
        pageNav: '#pageNav',
        pagePrev: '#prev',
        pageNext: '#next',
        curNum: 4, /*每页显示的条数*/
        activeClass: 'active', /*高亮显示的class*/
        ini: 0/*初始化显示的页面*/
    });
    function tabPage(tabPage) {
        var pageMain = $(tabPage.pageMain);
        /*获取内容列表*/
        var pageNav = $(tabPage.pageNav);
        /*获取分页*/
        var pagePrev = $(tabPage.pagePrev);
        /*上一页*/
        var pageNext = $(tabPage.pageNext);
        /*下一页*/


        var curNum = tabPage.curNum;
        /*每页显示数*/
        var len = Math.ceil(pageMain.find("li").length / curNum);
        /*计算总页数*/
        // console.log(len);
        var pageList = '';
        /*生成页码*/
        var iNum = 0;
        /*当前的索引值*/

        for (var i = 0; i < len; i++) {
            pageList += '<a href="javascript:;">' + (i + 1) + '</a>';
        }
        pageNav.html(pageList);
        /*头一页加高亮显示*/
        pageNav.find("a:first").addClass(tabPage.activeClass);

        /*******标签页的点击事件*******/
        pageNav.find("a").each(function(){
            $(this).click(function () {
                pageNav.find("a").removeClass(tabPage.activeClass);
                $(this).addClass(tabPage.activeClass);
                iNum = $(this).index();
                $(pageMain).find("li").hide();
                for (var i = ($(this).html() - 1) * curNum; i < ($(this).html()) * curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }

            });
        })


        $(pageMain).find("li").hide();
        /************首页的显示*********/
        for (var i = 0; i < curNum; i++) {
            $(pageMain).find("li").eq(i).show()
        }


        /*下一页*/
        pageNext.click(function () {
            $(pageMain).find("li").hide();
            if (iNum == len - 1) {
                alert('已经是最后一页');
                for (var i = (len - 1) * curNum; i < len * curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }
                return false;
            } else {
                pageNav.find("a").removeClass(tabPage.activeClass);
                iNum++;
                pageNav.find("a").eq(iNum).addClass(tabPage.activeClass);
//                    ini(iNum);
            }
            for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
                $(pageMain).find("li").eq(i).show()
            }
        });
        /*上一页*/
        pagePrev.click(function () {
            $(pageMain).find("li").hide();
            if (iNum == 0) {
                alert('当前是第一页');
                for (var i = 0; i < curNum; i++) {
                    $(pageMain).find("li").eq(i).show()
                }
                return false;
            } else {
                pageNav.find("a").removeClass(tabPage.activeClass);
                iNum--;
                pageNav.find("a").eq(iNum).addClass(tabPage.activeClass);
            }
            for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
                $(pageMain).find("li").eq(i).show()
            }
        })

    }


})

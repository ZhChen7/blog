##  关于我的博客

#### 我在写的过程中遇到的问题以及相应的解决办法：

### 1.侧边栏固定问题

​    问题：因为我做的博客主要适配移动端，不是pc端，pc端的侧边栏固定应该是很简单的，如下代码就行：

~~~ css3
              position: fixed;
              top: 0;
              left: 0;
~~~

因为position: fixed属性总是*相对于*浏览器窗口来对元素进行定位。 而我想随着浏览器窗口的缩小，让我移动端的侧边栏总是固定有效视口的左上角，说说我的解决方案，我是用js控制的(一觉醒来突然想通了，想想我为什么不用js解决呢)

~~~ javascript
let sideBar_Position=function () {
    let Width=window.innerWidth
    if(Width>900){
        $('.sidebar').css({'left':(Width-750)/2-10})
    }
    window.addEventListener('resize',function () {
        let innerWidth=window.innerWidth
        if(innerWidth<=772){
            $('.sidebar').css({'left':0})
        }else{
            $('.sidebar').css({'left':(innerWidth-750)/2-10})
        }
    })
}

~~~



效果：![侧边栏位置固定]

![mark](http://static.zxinc520.com/blog/20190525/hModlCjlfsUO.png?imageslim)





### 2.侧边栏消失问题

我想我的侧边栏应该有2种消失方案：1. 点击消失

​                                                                 2.滑动消失



解决方案：

1. 点击消失  ==> 准备就用jquery的show(),和hide()  ,  就弄简单点。
2. 滑动消失  ==>

 ~~~ javascript
    $('.sidebar').on('touchstart',function (e) {
        startX = e.touches[0].clientX;
     })

    $('.sidebar').on('touchmove',function (e) {
        moveX = e.touches[0].clientX;
        distanceX = startX - moveX;
        if(distanceX>0){
            settanslateX(-distanceX)
            isMove=true
        }else{
            distanceX=0
        }
    })

    $('.sidebar').on('touchend',function (e) {
        if(isMove){
           if( distanceX<$('.sidebar>.sidebar-main').width()*2/3){
               addTranslation()
               settanslateX(0)
           }
           else {
             settanslateX(-$('.sidebar').width())
               addTranslation()
               $('.sidebar').css({
                   display:'none',
                   transition: 'width 2s,left 2s',
                   transform: 'none'
               })
           }
        }
    })
 ~~~



问题：可是写完之后发现了一个问题，当用滑动消失侧边栏后，再一次打开侧边栏，点击事件失效了（我一直没还搞懂，求懂滴大神指点指点）。



###### 3.列表动态跳转问题，列表跳转和分类列表跳转冲突问题（node.js）,

--解决方案：

~~~javascript
router.get("/:docName", function (req, res, next) {
    let docId = req.params.docName.replace(/"/g, '')
    let p = /[0-9]/;
    let b = p.test(docId);//true,说明有数字
    if (b) {
        publish.findById(docId, function (err, publish) {
            if (err) {
                return next(err)
            }
            if (publish.wholepublishIdentifying == "代码") {
                fs.readFile(__dirname + '/public/doc/' + publish.publishMainBodyUrl + '.md', 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        htmlStr = marked(data.toString());
                        res.type('html')
                        message.find({
                            message_type: publish.publishMainBodyUrl
                        }, function (err, message) {
                            if (err) {
                                return next(err)
                            }
                            message.forEach(function (e) {
                                e.UTCtodata = new Date(e.message_time).toLocaleString()
                            })
                            res.render('MainBody.html', {
                                doc: htmlStr,
                                publish: publish,
                                message: message
                            });
                        })
                    }
                });
            }
            if (publish.wholepublishIdentifying == "心得体会") {
                fs.readFile(__dirname + '/public/feelings/' + publish.publishMainBodyUrl + '.md', 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        htmlStr = marked(data.toString());
                        res.type('html')
                        message.find({
                            message_type: publish.publishMainBodyUrl
                        }, function (err, message) {
                            if (err) {
                                return next(err)
                            }
                            message.forEach(function (e) {
                                e.UTCtodata = new Date(e.message_time).toLocaleString()
                            })
                            res.render('MainBody.html', {
                                doc: htmlStr,
                                publish: publish,
                                message: message
                            });
                        })
                    }
                });
            }
        })
    } else {
        publish.find({
            publishIdentifying: req.params.docName
        }, function (err, publish) {
            if (err) {
                return next(err)
            }
            res.render('sortlayout.html', {
                publish: publish
            })
        })
    }
})
~~~



###  4:UTC时间问题

问题：将时间类型数据保存到mongodb数据库中，拿出来时发现时间变成  类似于：2019-03-15T08:44:07.842Z --- 这种UTC时间，这是mongodb数据库本身就存在的问题，自己遇到这个问题的时候，百度了很多文档，参考了很多人的解决办法，但还是不知道怎么解决，

最终好不容易想到了一种解决方案：



###### ![mark](http://static.zxinc520.com/blogimage/20190318/YiqUFRbvNCQv.png?imageslim)





![mark](http://static.zxinc520.com/blogimage/20190318/SSDuionkzdwv.png?imageslim)

有人会说为什么不把转变好的时间赋给原来的UTC时间属性，我一开始就这样写的，可是就是赋值不上去，

最终终于发现原因：因为一个是字符串，一个是对象，根本无法相互赋值。我随后也想过把对象转变为字符串然后进行赋值，可最终还是不行。无奈之下，我只好转换了思路，用了我一开始的方案，把问题解决了。





5. ### 分页效果（我参考了网上的做法-----这里是全部加载完成后做的假分页）

   解决方案：

     html

   ~~~html
   <div id="pageBox">
           <span id="prev">上一页</span>
           <ul id="pageNav"></ul>
           <span id="next">下一页</span>
       </div>
   ~~~

   css：那你自己写把。加油！

   js

   ~~~javascript
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
           console.log(len);
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
   
   ~~~

   效果：

   ![mark](http://static.zxinc520.com/blogimage/20190318/3QianS1bAQ43.png?imageslim)

<u>**当然我还遇到很多别的问题，一时间都记不起来了（之后在慢慢加上去），所以写博客的重要性就在于此了。**</u>
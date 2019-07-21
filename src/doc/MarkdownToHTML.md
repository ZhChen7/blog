# MarkdownToHtml

> 将Markdown文档转换为HTML显示

## 说明

> 本应用是采用 node.js + Express 搭建的
>
> 运用的模板：art-template
>
> - [art-template](https://aui.github.io/art-template/zh-cn/docs/index.html) 是一个简约、超快的模板引擎。

# 准备工作

我把 *MarkdownToHTML.md* 放在目录 **public/doc** 下（放在那里看你心情咯！）

## 安装marked

> npm install marked --save

# 关键步骤

路由部分关键代码：router.js  （ 里面的部分代码是关键 ）

```Javascript
src

router.get("/:docName", function (req, res, next) {
    docId = req.params.docName.replace(/"/g, '')
    publish.findById(docId, function (err, publish) {
        if (err) {
            return next(err)
        }
        fs.readFile(__dirname + src + publish.publishMainBodyUrl + '.md',           'utf-8', function (err, data) {
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
    })
})
```

## 

MainBody.html:  用art-template模板渲染后台传来的数据

```HTML
<!--
   {{@ doc }}或者  <%- doc %>
 （ @和- 很关键 ==>原文输出语句不会对 HTML 内容进行转义处理，可能存在安全风险，请谨慎使用。这个坑害我多走了好多弯路。）
-->
<div id="markfs">
    {{@ doc }} <!-- 或者  <%- doc %> -->
</div>
```



## 效果展示

![g](http://static.zxinc520.com/blogimage/20190314/x6s26FzHS5go.png?imageslim)

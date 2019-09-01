# hybrid

> 本章主要介绍 hybrid 的原理和应用。hybrid 基础部分要讲解 file 协议、webview、更新上线流程；另外，通过 h5 和 hybrid 的对比，来了解两者的异同和使用场景；最后讲解前端 JS 和客户端的通讯，包括通讯原理和 JS-bridge 的代码封装。...
>
> 社会主流 **大前端** 的概念。
>
> **知识点** 
>
> 6-1 hybrid 是什么？ 为何用 hybrid ？
>
> 6-2 hybrid 更新上线流程
>
> 6-3 hybrid 和 h5 的 主要区别？
>
> 6-4 前端 JS 和 客户端 如何通讯？
>
> The greatest test of courage on earth is to bear defeat without losing heart.
>
> 世界上对勇气的最大考验是忍受失败而不丧失信心。





### hybrid

- 移动端占大部分流量，已经远远超过 PC
- 一线互联网公司都有自己的 App
- 这些 App 中有很大比例的前端代码 ( 不要惊讶 )
- 拿微信举例，你每天浏览微信的内容，多少是前端？



### 知识点

- hybrid 是什么？ 为何用 hybrid ？
- 介绍一下 hybrid 更新 和上线的流程？
- hybrid 和 h5 的 主要区别？
- 前端 JS 和 客户端 如何通讯？



## 6-1 hybrid 是什么？ 为何用 hybrid ？

### 知识点

- hybrid 文字解释
- 存在价值，为何用 hybrid ？
- webview
- file：//协议
- hybrid 实现流程



#### hybrid 文字解释

- hybrid 即 “混合” ，即 前端 和客户端的混合开发
- 需前端开发人员 和 客户端开发人员配合完成
- 某些环节也可能涉及到 server端
- 注意：不要以为自己是前端就可以不理会客户端的知识



![mark](http://static.zxinc520.com/blog/20190829/no77eoeMXoEi.png?imageslim)



#### hybrid 存在价值

- 可以快速迭代更新【关键】（无需 app 审核，思考为何？--> 前端部分能够快速更新上线）
- 体验流畅 （ 和 NA 的体验基本类似 ）
- 减少开发和沟通成本，双端公用一套代码



#### webview

- 是 App 中的一个组件（app 可以有 webview，也可以没有）
- 用于加载 h5 页面，即一个小型的浏览器 内核

![mark](http://static.zxinc520.com/blog/20190829/I797MG2jf2xe.png?imageslim)





#### file 协议

- 其实在一开始接触 html 开发，就已经使用了 file 协议
- 只不过你当时没有 “协议” “标准” 等这些概念
- 再次强调 “协议” “标准” 的重要性 ！！！

![mark](http://static.zxinc520.com/blog/20190829/kyXpWyLb4oVR.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190829/cxJ86AeO2374.png?imageslim)

*两者的区别：*  

- file 协议：本地文件，快
- http(s) 协议：网络加载，慢



#### hybrid 具体实现

- 不是所有的场景都适合使用 hybrid
- 使用 **NA** ：体验要求极致，变化不频繁（ 如头条的首页 ）
- 使用 **hybrid** ：体验要求高，变化频繁（ 如头条的新闻详情页 ）
- 使用 **h5** ：体验无要求，不常用（如举报、反馈等页面）



**具体实现**：

- 前端 做好静态页面（html css js），将文件交给客户端
- 客户端拿到前端静态页面，以文件形式储存在 app 中
- 客户端 在一个 webview 中
- 使用 file 协议 加载静态页面

![mark](http://static.zxinc520.com/blog/20190829/RIR0zOPUN22I.png?imageslim)



#### 具体实现 -- 遗留问题：

- app 发布之后，静态文件如何实时更新？
- 静态页面如何获取内容？



### 问题解答

- hybrid 是什么？ 为何用 hybrid ？
  - hybrid 即 “混合” ，即 前端 和客户端的混合开发
  - hybrid 存在的核心意义在于快速迭代，无需审核
  - hybrid 实现流程（图），以及 webview 和 file 协议



## 6-2 hybrid 更新上线流程

- 回顾  hybrid 实现流程
- 思考 （目的，实现途径）
- 更新流程 



#### 回顾  hybrid 实现流程

![mark](http://static.zxinc520.com/blog/20190829/aeHMDopqsrCy.png?imageslim)



#### 思考 （目的，实现途径）

![mark](http://static.zxinc520.com/blog/20190829/wCDenA4EGmC8.png?imageslim)



- 要替换每个客户端的静态文件
- 只能客户端来做（客户端是我们开发的）
- 客户端去 server 下载最新的静态文件
- 我们维护 server 的静态文件

![mark](http://static.zxinc520.com/blog/20190829/H6H3arUgJB6d.png?imageslim)



*完整流程：*

- 分版本，有版本号，如 201803211015
- 将静态 文件压缩成 zip 包，上传到服务器
- 客户端每次启动，都去服务端检查版本号
- 如果服务端本版本号大于客户端版本号，就去下载最新的 zip 包
- 下载完之后解压包，然后将现有的文件覆盖



### 问题解答

- 介绍一下 hybrid 更新 和上线的流程？
  - 掌握流程图
  - 要点1：服务端的版本和 zip 包维护
  - 要点2：更新 zip 包之前，先对比版本号
  - 要点3：zip 下载解压和覆盖





## 6-3hybrid 和 h5 的 主要区别？

### 知识点

- 优点
- 缺点
- 适用的场景



#### hybrid 优点

- 体验更好，跟 NA 体验基本一致
- 可快速迭代，无需 app 审核 【关键】



#### hybrid 缺点

- 开发成本高。联调，测试，查 bug 都比较麻烦
- 运维成本高。参考此前讲过的更新上线的流程



#### 适用场景

- hybrid ：产品的稳定功能，体验要求高，迭代频繁
- h5：单次的运营活动（如 xx 红包）或 不常用功能（反馈、举报页面等）



### 问题解答

- hybrid 和 h5 的 主要区别？
  - 优点：体验好，可快速迭代
  - 缺点：开发成本高，运维成本高
  - 适用的场景：hybrid 适合产品型，h5 适合 运行型





## 6-4 前端 JS 和 客户端 如何通讯？

### 知识点

- 回顾 之前遗留的问题
- JS 和 客户端通讯的基本形式
- schema 协议简介和使用
- schema 使用的封装
- 内置上线



#### 之前遗留的问题

- 新闻详情页适用于 hybrid，前端如何 获取新闻内容 ？
  - 不能用 ajax （http(s)协议）获取。第一： 跨域  ，第二 ：速度慢
  - 客户端获取新闻内容，然后 JS 通讯拿到内容，再渲染

![mark](http://static.zxinc520.com/blog/20190829/MIj2ETWq9QH1.png?imageslim)



*JS 和 客户端通讯的基本形式* ：

- JS 访问客户端能力，传递参数 和 回调函数
- 客户端 通过 回调函数 返回内容



#### schema 协议简介和使用

- 之前介绍了 http(s) 和 file 协议
- schema 协议 ——前端和客户端通讯的约定



![mark](http://static.zxinc520.com/blog/20190829/w3OphLjO8erc.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190829/QpzXgisk6E3y.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190829/RjgtefgjYzXH.png?imageslim)



#### 模拟扫一扫前后端通讯

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<button id="btn">扫一扫</button>
<script>
    function invokeScan() {
        window['_invoke_scan_callback_'] = function (result) {
            alert(result)
        }
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        // iframe.src = 'weixin://dl/scan'  //重要
        iframe.src = 'weixin://dl/scan?k1=v1&k2=v2&k3=v3&callback=_invoke_scan_callback_'
        var body = document.body
        body.appendChild(iframe)
        setTimeout(function () {
            body.removeChild(iframe)
            iframe = null
        })
    }

    document.getElementById('btn').addEventListener('click', function () {
        invokeScan()
    })

</script>
</body>
</html>
```



#### schema  使用的封装

![mark](http://static.zxinc520.com/blog/20190829/jcvC6T5SH3Pm.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190829/fW8NCvLoYRAg.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190829/5Yhq6r9uLr7X.png?imageslim)



#### schema  封装代码

*schema  使用的封装* ：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<button id="btn1">扫一扫</button>
<button id="btn2">分享</button>
<script src="invoke.js"></script>
<script>
    //调用扫一扫
    document.getElementById('btn1').addEventListener('click', function () {
        window.invoke.scan({}, function () {
        })
    })

    //调用分享
    document.getElementById('btn2').addEventListener('click', function () {
        window.invoke.share({
            title: 'xxx',
            content: 'yyy'
        }, function (relust) {
            if (relust.error === 0) {
                alert('分享成功')
            } else {
                alert(relust.message)
            }
        })
    })
    
</script>
</body>
</html>
```



*invoke.js* ：

```js
// invoke.js
(function (window, undefined) {

    //调用 schema 的封装
    function _invoke(action, data, callback) {
        //拼装 schema 协议
        var schema = 'myapp://utils/'+action

        //拼接参数
        schema += '?a=a'
        var key
        for (key in data){
            if (data.hasOwnProperty(key)){
                schema += '&' +key +data[key]
            }
        }

        //处理 callback
        var callbackName =''
        if (typeof callback === 'string'){
            callbackName =callback
        }else{
            callbackName =action +Date.now()
            window[callbackName] =callback
        }
        schema += 'callback=callbackName'

        //触发
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = schema  //重要
        var body = document.body
        body.appendChild(iframe)
        setTimeout(function () {
            body.removeChild(iframe)
            iframe = null
        })
    }

    //暴露到全局变量
    window.invoke = {
        share: function (data, callback) {
            _invoke('share', data, callback)
        },
        scan: function (data, callback) {
            _invoke('scan', data, callback)

        },
        login: function (data, callback) {
            _invoke('login', data, callback)

        }
    }

})(window)
```



### 问题解答

- 前端 JS 和 客户端 如何通讯？
  - 通讯的基本形式：调用能力，传递参数，监听回调
  - 对 schema 协议的理解和使用 （这个协议可理解为 ：定义了前端和客户端 通信的一个标准）
  - 调用 schema 代码的封装
  - 内置上线的好处：更快、更安全


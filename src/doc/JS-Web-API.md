# JS-Web-API

> 前端JS基础面试技巧 - - **JS-Web-API  上**
>
> 讲解 JS 在浏览器中具体应用的面试题。包括 **DOM 操作**，**BOM 操作** ，**事件绑定**，**ajax**  和 **存储** ，这些类别的题目。



## 从基础知识到 JS-Web-API 

> 从基础知识 **过渡**  到 JS-Web-API 



- 回顾 JS 基础知识
- JS-Web-API 
- 总结



### 回顾 JS 基础知识

> 特点：表面看来并不能哟用于工作中开发代码
>
> 内置函数：Object，Array，Boolean，String ......
>
> 内置对象：Math，Json .....
>
> 详情请参考：[原型和原型链，闭包和作用域](http://zxinc520.com/lcj/%225d2df2cdda85353d5ca8b83f%22)   [异步和单线程](http://zxinc520.com/lcj/%225d2eeda9d797f0309cf6ab02%22) 
>
> - 我们连在网页上弹出一句 hello world 都不能实现



**知识点** ：

- 变量类型和计算
- 原型和原型链
- 闭包和作用域
- 异步和单线程
- 其它（如日期，Math，各种常用API）



- JS 基础知识：**ECMA 262 标准** 
- JS-Web-API ：**W3C 标准** 



### JS-Web-API 

> JS-Web-API 



**W3C 标准中关于 JS 的规定有** ：

- DOM 操作
- BOM 操作
- 事件绑定
- ajax 请求（包括 http 协议）
- 储存



**页面弹框 window.alert(123) ，浏览器需要做：** 

- 定义一个 window 全局变量 ，对象类型
- 给它定义一个 alert 属性，属性值是一个函数



**获取元素 document.getElementById(id)，浏览器需要做：** 

- 定义一个 document 全局变量 ，对象类型
- 给它定义一个 getElementById 属性，属性值是一个函数



**W3C 标准：** 

- W3C 标准没有规定任何 JS 基础相关的东西
- 不管什么变量类型，原型，作用域和异步
- 只管 定义用于 浏览器中 JS 操作页面的 API 和 全局变量



#### 总结：

**常说的 JS （浏览器执行的 JS ）包含两部分：** 

- JS 基础知识：**ECMA 262 标准** 
- JS-Web-API ：**W3C 标准** 



## 5-1 BOM 节点操作

> BOM 操作： **Browser**、**Object**、**Model**  （ 浏览器对象模型 ）
>
> **BOM 节点操作** 可以理解为：浏览器把拿到的 html 代码，结构化一个 浏览器 能识别并且 js 可操作的一个模型而已 。
>
> javacsript 是通过 **访问BOM** （Browser Object Model）对象来 **访问、控制、修改** 客户端(浏览器)，由于BOM的window包含了document，**window对象的属性和方法是直接可以使用而且被感知的**  ，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM（Document Object Model）模型的根节点。可以说，**BOM包含了DOM(对象)** ，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。

![mark](http://static.zxinc520.com/blog/20190718/LLToFChkpany.png?imageslim)

### 题目

- 如何检测浏览器的类型
- 拆解 url 的 各部分



### 知识点

- navigator
- screen
- location
- history



#### navigator & screen

> navigator & screen

![mark](http://static.zxinc520.com/blog/20190718/r3iKL9Xukvhh.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190718/HGtIQM9isqCI.png?imageslim)



#### location & history

> ###### location & history

![mark](http://static.zxinc520.com/blog/20190718/cbYxCVkoLMQu.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190718/wBG2i12YtTmW.png?imageslim)



### 解答

- 如何检测浏览器的类型

![mark](http://static.zxinc520.com/blog/20190718/TfK1lJ7IAry5.png?imageslim)



- 拆解 url 的 各部分

![mark](http://static.zxinc520.com/blog/20190718/UzzCgHl1fImg.png?imageslim)





## 5-2 DOM 节点操作

> **DOM 操作的重点：找到节点对节点（元素/文本/属性节点）增删改查** 
>
> **各方法和属性之间的结合操作才会使得DOM 文档活跃起来**
>
> `注意方法与属性的不同。`  **注意属性的返回值** 
>
> **注意javascript操作样式的可读可写性** 
>
> [可参考](https://juejin.im/post/5b16113f5188257d7a49ada7) 



### DOM 节点操作： 

- 获取 DOM 节点
- prototype
- Attribute



#### 获取 DOM 节点

> 获取 DOM 节点

```js
document.getElementById('id')
document.getElementByClassName('classname')
document.getElementsByTagName('tag')
document.querySelector('#foo > div.bar')
document.querySelectorAll('.bar')
```

![mark](http://static.zxinc520.com/blog/20190718/TsP71SzkfFU5.png?imageslim) 



#### prototype

> prototype

![mark](http://static.zxinc520.com/blog/20190718/nehMbgtKQirx.png?imageslim)



#### property

> property 只是一个 JS 对象的属性的修改

![mark](http://static.zxinc520.com/blog/20190718/3vippb1mnJqF.png?imageslim)



#### Attribute

> Attribute 
>
> Attribute 是对 html **标签属性** 的修改 （获取）

![mark](http://static.zxinc520.com/blog/20190718/B7FUAdLGXAHz.png?imageslim) 



 

### DOM 结构操作

> DOM 结构操作

- 新增节点
- 获取父元素
- 获取子元素
- 删除节点



#### 新增节点

> 新增节点
>
> 移动已有 的节点

```js
<script>
    var div1 = document.getElementById('div1')
    p = document.createElement('p')
    p.innerHTML = '<h3>hello world</h3>'
    div1.appendChild(p)
    var p2 = document.querySelector('.p2')
    div1.appendChild(p2)
    console.log(div1)
</script>

```

![mark](http://static.zxinc520.com/blog/20190718/e7UMDpPFqB1d.png?imageslim)



#### 获取父元素和子元素

> 获取父元素和子元素

```js
<div id="div1">
    <div id="p1">this is p1</div>
    <div id="p2">this is p2</div>
</div>

<div id="div2">
    <div id="p3">this is p3</div>
    <div id="p4">this is p4</div>
</div>
<script>
    var div1=document.getElementById('div1')
    console.log(div1.parentElement)
    console.log(div1.childNodes)

    console.log(div1.childNodes[0].nodeType)  //3
    console.log(div1.childNodes[1].nodeType)  //1
    console.log(div1.childNodes[0].nodeName)  //#text
    console.log(div1.childNodes[1].nodeName)  // DIV
</script>
```

![mark](http://static.zxinc520.com/blog/20190718/BD4IQWndiCTW.png?imageslim)





#### 解答

- DOM 是哪种基本的数据结构

  - 树

  

- DOM 操作的常用 API 有哪些

  - 获取 DOM 节点，以及节点的 property 和 Attribute
  - 获取父节点，获取子节点
  - 新增节点，删除节点

  

- DOM 节点的 Attribute 和 property 有何区别

  - property 只是一个 JS 对象的属性的修改
  - Attribute 是对 html 标签属性的修改

 

#### 重点总结

- DOM 本质
- DOM 节点操作
- DOM 结构操作



## 5-3 事件绑定

> JavaScript绑定事件的三种方式



### JavaScript绑定事件的三种方式：

- 使用内联
- 使用`.onclick`的方式
- 使用事件监听`addEventListener`的方式



#### 内联

```html
<input type="button" value="按钮" onclick="alert(1);">
```

这种方式就是在一个元素上面直接绑定了一个点击`onclick`事件，此事件为[DOM 0级标准](https://link.juejin.im/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2FDOM%2F50288%3Ffr%3Daladdin)。同时，这个事件的优先级是最高的。



#### 使用对象.事件的形式

```js
<input type="button" value="按钮">

<script type="text/javascript">
	var bt = document.getElementsBytagname("input")[0];
	bt.onclick = function(){
		alert(2)
	}
</script>
```

使用这种形式也是可以给一个DOM元素添加上一个事件。这个也是[DOM 0级标准](https://link.juejin.im/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2FDOM%2F50288%3Ffr%3Daladdin)。



#### 以上的弊端

以上两种方式都是存在一个弊端的，就是一个元素只能添加一个事件。第一种就不用说了，写在行内就一个属性。至于第二种，有的网友可能会说我可以再写一个，比如：

```js
<input type="button" value="按钮">

<script type="text/javascript">
    var bt = document.getElementsByTagName("input")[0];
    bt.onclick = function(){
        alert(2)
    }

    bt.onclick = function(){
        alert(3)
    }
</script>
```

![mark](http://static.zxinc520.com/blog/20190718/u7dGQvDbEuTR.gif)

写是可以这么写。那么我们先来看一看这个写法的意思，这种写法的本质就是在一个对象上添加一个属性，就上面的例子，就是在`bt`这个对象上添加一个`onclick`属性。那么，如果在之后的代码中也存在`bt.onclcik`，只会吧前面的给覆盖了。所以这样的写法也只能添加一个事件。

那么，问题来了。我要给一个元素（DOM对象）添加两个甚至是多个事件，使用什么呢？此时，就需要使用`addEventListener`的方式来添加事件。

```js
<input type="button" value="按钮">

<script type="text/javascript">
	var bt = document.getElementsBytagname("input")[0];
	bt.addEventListener("click", function(){
		alert(1)
	})
	bt.addEventListener("click", function(){
		alert(2)
	})
</script>
```

![mark](http://static.zxinc520.com/blog/20190718/fH7NDlrt0vLr.gif)

上面的方式就可以给一个DOM对象绑定一个或者是多个事件。**强烈推荐使用这一种绑定事件的方式**。 使用`addEventListener`的方式还可以拥有第三个参数。 [参看](https://www.runoob.com/jsref/met-element-addeventlistener.html)



**三个参数** ：

1. 事件类型，**不需要**添加上`on`
2. 事件函数
3. 是否捕获（布尔值），默认是`false`，即不捕获，那就是冒泡。



### 捕获和冒泡

#### 捕获

![mark](http://static.zxinc520.com/blog/20190718/VLE5T5uzApOX.png?imageslim)

```html
<div id="a">
    a
    <div id="b">
        b
        <div id="c">c</div>
    </div>
</div>
<script>
 	var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    // 捕获
    a.addEventListener("click", function(){
        alert("b-a")
    },true)
    b.addEventListener("click", function(){
        alert("b-b")
    },true)
    c.addEventListener("click", function(){
        alert("b-c")
    },true)
    
    //运行结果：点击c时，上面的代码的执行顺序：b-a，b-b，b-c
</script>

```





#### 冒泡

![mark](http://static.zxinc520.com/blog/20190718/eVyMTBdrppfb.png?imageslim)

```js
<div id="a">
    a
    <div id="b">
        b
        <div id="c">c</div>
    </div>
</div>
<script>
 	var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
      // 冒泡
    a.addEventListener("click", function(){
        alert("m-a")
    },false)
    b.addEventListener("click", function(){
        alert("m-b")
    },false)
    c.addEventListener("click", function(){
        alert("m-c")
    },false)
    
    //运行结果：点击c时，上面的代码的执行顺序：m-c，m-b，m-a
</script>
```



#### 停止传播

使用`stopPropagation`可以阻止事件的**传播**。不能使用`return false` ，阻止捕获也是一样，添加之后就不会在继续往下传递了。

```js
// 阻止冒泡
c.addEventListener("click", function(e){
	alert("m-c")
	e.stopPropagation(); // 此处阻止传播
},false)

// 此时的顺序：b-a,b-c,m-c。不会传递，后面的不会执行了
```



#### 关于使用`addEventListener`

**由于`addEventListener`单词太长：** 所以封装一下：

```js
function addEvent(ele,type,fn){
	ele.addEventListener(type,function(e){
		fn(e)
	})
}
```



#### 关于事件代理（委托）

如果你要给每一个`li`标签添加一个点击事件，弹出每一个`li`的索引值

```html
<ul id="box">
	<li>list-1</li>
	<li>list-2</li>
	<li>list-3</li>
	<li>list-4</li>
</ul>
```

闭包：

```js
var oLis  = document.getElementsByTagName("li");

for (var i = 0; i < oLis.length; i++) {
	(function(i){
		addEvent(oLis[i],"click",function(e){
			alert(i)
		})
	})(i)
}
```

因为你的`li`的个数可能发生改变，如果是这样的话，可能会出一些问题。

事件代理代码：

```js
var oBox = document.getElementById("box");

addEvent(oBox,'click',function(e){
	var target = e.target;
	// 判断点击的是li
	if ( target.nodeName == 'LI' ) {
		alert(target.innerHTML)
	}
})
```

这样也是可以的，不过此时的`addEvent`函数点击的时候就需要在`fn`里面判断点击的是哪一个标签。为了更好的使用`addEvent`，我们可以改进一下

```js
function addEvent(ele,type,selector,fn){
	// 如果只有三个参数，那么3,4互换
	if ( fn == null ) {
		fn = selector;
		selector = null
	}
	ele.addEventListener(type,function(e){
		var target;
		if ( selector ) {
			//  代理
			target = e.target;
			if(target.matches(selector)){
				fn.call(target.e)
			}
		} else {
			// 不代理
			fn(e)
		}
	})
}
```

这时点击`li`弹出innerHTML就可以这样实现：

```js
addEvent(oBox,'click','li',function(e){
	alert(this.innerHTML)
})
```



#### 总结：

1. **同时 存在捕获与冒泡时** ，**捕获的优先级是高于冒泡的** 。
2. 没有捕获的时候谁在前面先执行谁



如果要取消一个使用`addEventListener`绑定的事件函数，使用`removeEventListener`可以移除事件。





#### 解答

- 编写一个通用的事件监听函数

```js
function bindEvent(elem, type, seletor, fn) {
    if (fn == null) {
        fn = selector
        seletor = null
    }
    elem.addEventListener(type, function (e) {
        var target
        if (seletor) {
            target = e.target
            if (target.matches(seletor)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
```



- 描述事件冒泡的流程

  - DOM 树形结构
  - 事件冒泡
  - 阻止冒泡
  - 冒泡的应用

  

- 对于一个无线下拉加载图片的页面，如何给每个图片绑定事件

  - 使用代理
  - 知道代理的两个优点



#### 重点总结

- 通用事件绑定
- 事件冒泡
- 代理



## 5-4 Ajax

> 题目
>
> 知识点
>
> 题目



### 题目

- 手动编写一个 ajax，不依赖第三方库
- 跨域的几种实现方式



### 知识点

- XMLHttpRequest
- 状态码说明
- 跨域



#### XMLHttpRequest

> 使用XMLHttpRequest (XHR)对象可以与服务器交互。您可以从URL获取数据，而无需让整个的页面刷新。这使得Web页面可以只更新页面的局部，而不影响用户的操作。XMLHttpRequest在 [Ajax](https://developer.mozilla.org/en-US/docs/AJAX) 编程中被大量使用
>
> 尽管名称如此，XMLHttpRequest可以用于获取任何类型的数据，而不仅仅是XML，它还支持   [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)以外的协议(包括文件和ftp)。
>
> 如果您的通信需要从服务器接收事件或消息数据，请考虑通过[`EventSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)接口使用 [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)。对于 full-duplex 通信， [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) 可能是更好的选择。
>
> [可参考](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 

```js
	var xhr =new XMLHttpRequest()
    xhr.open("GET","/api",false)	//false 使用异步
    xhr.onreadystatechange=function () {
        //这里是函数异步执行，可参考之前 JS 基础中的异步 模块
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                alert(xhr.responseText)
            }
        }
    }
    xhr .send(null)
```



#### IE 兼容性问题

> [有意向者可参考](https://www.w3cschool.cn/mlb2er/3miu1pxk.html) 

- IE低版本使用 ActiveXObject，和 W3C 标准不一样
- IE低版本使用量非常少，很多网站都早已不支持
- 建议对IE低版本的兼容性：**了解即可，无需深究** 。
- 如果遇到对 IE低版本要求苛刻的面试，果断放弃



#### readyState 状态码说明

> readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。
> readyState总共有5个状态值，分别为0~4，每个值代表了不同的含义

```js
0：未初始化，还没有调用 send()方法
1：载入，已调用send()方法，XMLHttpRequest对象开始发送请求
2：载入完成，send()方法执行完成，已经接收到全部的相应内容
3：交互，正在解析响应内容
4：完成，响应内容解析完成，可以在客户端调用了
```



#### status状态码说明

> status是XMLHttpRequest对象的一个属性，表示响应的HTTP状态码
>
> [详细参考](https://www.cnblogs.com/liu-fei-fei/p/5618782.html) 

```js
1xx：信息响应类，表示接收到请求并且继续处理
2xx：处理成功响应类，表示动作被成功接收、理解和接受
3xx：重定向响应类，为了完成指定的动作，必须接受进一步处理
4xx：客户端错误，客户请求包含语法错误或者是不能正确执行
5xx：服务端错误，服务器不能正确执行一个正确的请求

200——交易成功
404——没有发现文件、查询或URl
...
```



## 5-5 跨域

> **定义** ：跨域是指从一个域名的网页去请求另一个域名的资源。比如从www.baidu.com 页面去请求 www.google.com 的资源。但是一般情况下不能这么做，它是由浏览器的同源策略造成的，是浏览器对[JavaScript](https://link.juejin.im?target=http%3A%2F%2Flib.csdn.net%2Fbase%2Fjavascript)施加的安全限制。跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域
>
> **所谓同源是指，域名，协议，端口均相同。**这里说的js跨域是指通过js在不同的域之间进行数据传输或通信，比如用ajax向一个不同的域请求数据，或者通过js获取页面中不同域的框架中(iframe)的数据。
>
> 概念：**只要协议、域名、端口有任何一个不同** ，都被当作是不同的域。算作 跨域。
>
> [参考](https://segmentfault.com/a/1190000015597029)
>
> http默认端口：80
>
> https默认端口：443

 

### 问题

- 说明什么是跨域
- JSONP
- 服务器端设置 http header



#### 什么是跨域

**跨域是**指一个**域**下的文档或脚本试图去请求另一个**域**下的资源，这里**跨域是**广义的。 其实我们通常所说的**跨域是**狭义的，**是**由浏览器同源策略限制的一类请求场景。



#### 可以跨域的三个标签

- <**img src=xxx** >   用于打点统计，统计网站可能是其它域
- <**link href=xxxx** >  可以使用CDN,CDN也是其它域
- <**script src=xxx**  > 可以使用CDN, 可以用于 **JSONP** 



####  跨域注意事项

- 所有的跨域请求都必须经过信息提供方允许
- 如果未经允许即可获取，那是浏览器同源策略出现漏洞



###  JSONP实现原理

> jsonp是一种跨域通信的手段
>
> [参考1](https://segmentfault.com/a/1190000007665361)  [参考2](https://github.com/qianlongo/zepto-analysis/issues/4) 

**jsonp是一种跨域通信的手段，它的原理其实很简单：** 

1. 客户端利用`script`标签可以跨域请求资源的性质，向网页中动态插入`script`标签，来向服务端请求数据。
2. 服务端会解析请求的`url`,至少拿到一个回调函数(比如`callback=myCallback`)参数,之后将数据放入其中返回给客户端。
3. 当然jsonp不同于平常的`ajax`请求,它仅仅支持get类型的方式



####  实现流程

1. 设定一个script标签

   ```js
   <script src="http://jsonp.js?callback=xxx"></script>
   ```

2. callback定义了一个函数名，而远程服务端通过调用指定的函数并传入参数来实现传递参数，将`fn(response)`传递回客户端

   ```php
   $callback = !empty($_GET['callback']) ? $_GET['callback'] : 'callback';
   echo $callback.'(.json_encode($data).)';
   ```

3. 客户端接收到返回的js脚本，开始解析和执行`fn(response)`



#### 服务端设置 http header

- 另外一个解决跨域的简洁方法，需要服务器端来做
- 但是作为交互方，我们必须知道这个方法
- 是将来解决跨域问题的一个趋势

![mark](http://static.zxinc520.com/blog/20190718/YNGAeXPTUx6I.png?imageslim)



#### 重点总结

- XMLHttpRequest
- 状态码说明
- 跨域





## 5-6 存储

> 题目
>
> 知识点
>
> 解答



### 题目

- 请描述一下 cookie，sessionStorage 和 localStorage的区别？



### 知识点

- cookie
- sessionStorage 和 localStorage



#### cookie

> [可参考](https://juejin.im/post/5b57dba3f265da0fb018741f) 

- 本身用于客户端和服务器端通信
- 但是它有本地储存的功能，于是就被  **借用** 
- 使用 document.cookie =  ... 获取和修改即可



#### cookie 用于储存的缺点

- **储存量太小** ，Cookie`数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。在当今新的浏览器和客户端设备版本中，支持 8192 字节的 Cookie 大小已愈发常见。
- 所有 http请求都带着，会**影响获取资源的效率** 

- 用户配置为禁用。有些用户禁用了浏览器或客户端设备接收 Cookie 的能力，因此限制了这一功能

- 由于在HTTP请求中的cookie是明文传递的，潜在的安全风险，Cookie 可能会被篡改

- 有些状态不可能保存在客户端

- cookie会被附加在每个HTTP请求中，所以无形中增加了流量

- cookie一般不可跨域使用

- 没有封装好的setCookie和getCookie方法，需要开发者自省封装



### sessionStorage 和 localStorage

- HTML5专门为储存而设计，最大容量 5M
-  API 简答易用
- localStorage.setItem(key, value); localStorage.getItem(key, value);



#### 区别：

**localStorage**  生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。

**sessionStorage** 生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。

不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），但是不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标 签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。



#### 注意

- iOS safari 隐藏模式下
- localStorage.getItem 会报错
- 建议 统一使用 try-catch 封装



### 解答

- 请描述一下 cookie，sessionStorage 和 localStorage的区别？
  - 容量
  - 是否携带到 ajax 中
  - API 易用性
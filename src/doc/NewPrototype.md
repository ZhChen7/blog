# 原型

> 本章将结合 **jQuery**  和 **zepto**  源码来讲解原型的实际应用。通过 **源码来分析**  jQuery 和 zepto 是如何使用原型的，以及通过它们的 **插件机制**，讲解 **原型的扩展性** 。
>
> 《前端 JS面试技巧》请参考我之前的博客： [前端JS基础面试技巧](http://zxinc520.com/lcj/%225d2df2cdda85353d5ca8b83f%22) 



### 关于原型

- 《前端 JS面试技巧》已经讲解过原型的 [基础知识](http://zxinc520.com/lcj/%225d2df2cdda85353d5ca8b83f%22) 
- 高级面试题，光会原型基础还不够，还要实际应用
- zepto jquery 中如何用原型
- 顺便也算是解读了 zepto 和 jquery 的部分源码



### 题目

- 说一个原型的实际应用
- 原型如何体现它的扩展性



## 原型的实际应用

> 原型的实际应用

### 知识点

- jquery 和 zepto 的简单使用
- zepto 如何使用原型
- jquery 如何使用原型

 

#### 简单使用

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>jquery test 1</p>
<p>jquery test 2</p>
<p>jquery test 3</p>

<div id="div1">
    <p>jquery test in dev</p>
</div>

<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
    var $p = $('p')
    $p.css('font-size', '40px') //css 是原型方法
    alert($p.html()) 		    //html 是原型方法

    var $div1 = $('#div1')      //css 是原型方法
    $div1.css('color', 'blue')  //html 是原型方法
    alert($div1.html())
</script>
</body>
</html>


```



#### zepto 如何使用原型

> 源码中，这里的处理情况比较复杂。但因为本次只针对原型，因此这里就弱化了

```js
(function (window) {
    //空对象
    var zepto = {}

    zepto.init = function (selector) {
        //源码中，这里的处理情况比较复杂。但因为本次只针对原型，因此这里就弱化了
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    }

    // 即使用 zepto 时候的 $
    var $ = function (selector) {
        return zepto.init(selector)
    }

    // 这就是构造函数
    function Z(dom, selector) {
        var i, len = dom ? dom.length : 0
        for (i = 0; i < len; i++) this[i] = dom[i]
        this.length = len
        this.selector = selector
    }

    zepto.Z = function (dom, selector) {
        // 注意，出现了 new 关键字
        return new Z(dom, selector)
    }

    $.fn = {
        constructor: zepto.Z,
        css: function (key, value) {

        },
        html: function (value) {

        }
    }

    zepto.Z.prototype = Z.prototype = $.fn

    window.$ = $
})(window)




```



#### jquery 如何使用原型

> 简化了源码，重在讲解 jquery 如何使用原型

```js
//简化了源码，真实源码分支很多,选取部分代码
(function (window) {
    
    var jQuery = function (selector) {
        //注意 new 关键字，第一步就找到了 构造函数
        return new jQuery.fn.init(selector)
    }

    //定义构造函数
    var init = jQuery.fn.init = function (selector) {
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))

        var i, len = dom ? dom.length : 0
        for (i = 0; i < len; i++) this[i] = dom[i]
        this.length = len
        this.selector = selector || ''
    }

    init.prototype = jQuery.fn

    //初始化 jQuery.fn
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        //其他函数...
        css: function (key, value) {

        },
        html: function (value) {

        }
    }

    //定义原型
    init.prototype = jQuery.fn
    window.$ = jQuery
})(window)
```



### 问题解答

- 描述一下 jquery 如何使用原型
- 描述一下 zepto 如何使用原型
- 再结合自己的项目经验，说一下自己开发的例子



## 如何体现原型的扩展性

> 体现原型的扩展性

### 知识点

- 总结 zepto 和 jquery 原型的使用
- 插件机制



### 总结 zepto 和 jquery 原型的使用

> 总结 zepto 和 jquery 原型的使用
>
> 相关 **代码实现**  请看上文 ：zepto 如何使用原型 和 jquery 如何使用原型



*问题一：为何要把原型方法放在 $.fn ?* 

```js
//初始化 jQuery.fn
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,

    //其他函数...
    css: function (key, value) {

    },
    html: function (value) {

    }
}

//定义原型
init.prototype = jQuery.fn
```

**解答** ：<u>因为要扩展插件</u> ，做一个简单的插件的例子

```js
// 因为要扩展插件，做一个简单的插件的例子
$.fn.getNodeName =function(){
    return this[0].nodeName
}
```

**好处**：

1. 只有 $ 会暴露在window 全局变量
2.   将插件扩展统一到 $.fn.xxx 这一接口，方便使用



## 总结

- 说一个原型的实际应用

  - 描述一下 jquery 如何使用 原型
  - 描述一下 zepto 如何使用 原型
  - 再结合自己的项目经验，说一下自己开发的例子

  

- 原型如何体现它的扩展性

  - 说一下 jquery 和 zepto 的 插件机制
  - 结合自己的开发经验，做过的基于原型的插件
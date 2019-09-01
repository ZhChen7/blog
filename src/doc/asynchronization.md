# 异步

> 本章全面讲解了 JS 异步的知识点。先从**原理开始** ，讲解什么是 **单线程**、什么是 **event loop**  ；然后讲解 jQuery 中解决 **异步的 Deferred**  以及 jQuery 初次展示出来的 **Promise 的用法**；最后再讲解 ES6 中 **Promise 的用法和标准** 。
>
> **基础篇请看** ：[异步和单线程](http://zxinc520.com/lcj/%225d2eeda9d797f0309cf6ab02%22)  



## 异步

> 高级面试

- 《[前端 JS 面试技巧](http://zxinc520.com/lcj/%225d2eeda9d797f0309cf6ab02%22)》讲到异步的基础
- 高级面试会问到更多的内容
- 如 event-loop Promise Async/Await 等



### 问题

- 什么是单线程，和异步有什么关系？ [参考 ](http://zxinc520.com/lcj/%225d2eeda9d797f0309cf6ab02%22)
- 什么是 event-loop？
- 是否用过 jQuery 的 Deferred 
- Promise 的基本使用和原理
- 介绍一下 async/await（ES7）（和 Promise 的区别、联系）
- 总结一下当前 JS 解决异步的方案





## 4-1 单线程和异步

> [单线程和异步基础篇 ](http://zxinc520.com/lcj/%225d2eeda9d797f0309cf6ab02%22) 

- 为什么是单线程？
  - 原因 - 避免 DOM 渲染冲突
    - 浏览器需要渲染DOM
    - JS 可以修改 DOM 结构
    - JS 执行的时候，浏览器 DOM 渲染会暂停
    - 两段 JS 也不能同时执行 （ 都修改 DOM 就冲突了）
    - webworker 支持多线程 ，但是不能 访问 DOM 



**单线程的解决方案** ： **异步** 



*暴露出的问题* ：

- 问题一：没按照书写方式执行，可读性差
- 问题二：callback 中不容易模块化



### 问题解答

- 什么是单线程，和异步有什么关系？
  - 单线程就是同时只做一件事，两段 JS 不能同时 执行
  - 原因就是 为了避免 DOM 渲染的冲突
  - 异步是一种 “无奈” 的解决方案，虽然有很多问题



**承上启下：** 

- 单线程 - 同时间只能做一件事
- 原因 - 避免 DOM 渲染冲突
- 解决方案 - 异步
-  异步的实现方式 - event loop



## 4-2 什么是 event-loop

> 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。 [再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html) 



### 文字解释

> event-loop

- 事件轮询， JS 实现异步 的具体解决方案
- 同步代码，直接执行
- 异步函数先放在 异步队列 中
- 待同步函数执行完毕，轮询执行 异步队列 的函数



### 实例分析

*示例一：* 

![mark](http://static.zxinc520.com/blog/20190813/mxsAJyrO4cLE.png?imageslim)



*示例二：* 



![mark](http://static.zxinc520.com/blog/20190813/kftHfWYaHL80.png?imageslim)



 *示例三：* 

![mark](http://static.zxinc520.com/blog/20190813/j3lPm5VCfcSB.png?imageslim)

**上图有2种结果**：(a是在ajax请求成功时放入异步队列，所以时间不确定)

1. d  -> c ->  a -> b
2. d -> c -> b -> a



### 问题解答

- 什么是 event-loop？
  - 事件轮询， JS 实现异步 的具体解决方案
  - 什么是异步队列，何时被放入 异步队列
  - 轮询的过程



## 4-3 jQuery 的 Deferred

> [jQuery的deferred对象详解](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html) 
>
> jQuery 1.5.0 版本开始引入的一个新功能----[deferred对象](http://api.jquery.com/category/deferred-object/)。
>
> 针对的读者是那些已经具备jQuery使用经验的开发者。如果你想了解jQuery的基本用法，请阅读 [阮一峰](http://www.ruanyifeng.com/) 编写的[《jQuery设计思想》](http://www.ruanyifeng.com/blog/2011/07/jquery_fundamentals.html)和[《jQuery最佳实践》](http://www.ruanyifeng.com/blog/2011/08/jquery_best_practices.html)。



### 知识点

- jQuery 1.5 的变化
- 使用 jQuery  Deferred
- 初步引入 Promise 概念



**注意** ：不要以为所有的网站 都是 vue 和 React 开发的



#### jQuery  1.5 之前

```js
var ajax = $.ajax({
    url: 'data.json',
    success: function () {
        console.log('success1')
        console.log('success2')
        console.log('success3')
    },
    error: function () {
        console.log('error')
    }
})
console.log(ajax)  //返回一个 XHR 对象
```



#### jQuery  1.5 之后

```js
var ajax = $.ajax('data.json')
ajax.done(function () {
    console.log('success 1')
    })
    .fail(function () {
        console.log('error')
    })
    .done(function () {
        console.log('success 2')
    })

console.log(ajax) //返回一个 deferred 对象
```



#### jQuery 1.5 的变化

- 无法改变 JS 异步和单线程的本质
- 只能从写法上杜绝 callback 这种形式
- 它是一种语法糖形式，但是解耦了代码
- 很好的体现：**开放封闭原则**  



### 使用 jQuery  Deferred

> 使用 jQuery  Deferred
>
> 对比 说明



*未使用情况：* 

```js
// 给出一段非常简单的异步操作代码，使用 setTimeout 函数
var wait = function () {
    var task = function () {
        console.log('执行完成')
    }
    setTimeout(task, 2000)
}
wait()
// 新增需求：要在执行完成之后进行某些特别复杂的操作，代码可能会很多，而且分好几个步骤
```



*使用 jQuery  Deferred*： 

```js
function waitHandle() {
    var dtd = $.Deferred() //创建一个 Deferred 对象

    var wait = function (dtd) {  //要求传入一个 Deferred 对象
        var task = function () {
            console.log('执行完成')
            dtd.resolve()   //表示异步任务已经完成
            // dtd.reject()  //表示异步任务失败或出错
        }
        setTimeout(task, 2000)
        return dtd  // 要求返回 Deferred 对象
    }

    // 注意，这里一定要有返回值
    return wait(dtd)
}


//区别于promise，好像不能链式调用
var w = waitHandle()
w.then(function () {
    console.log('ok 1')
}, function () {
    console.log('err 1')
})

w.then(function () {
    console.log('ok 2')
}, function () {
    console.log('error 2')
})

// 还有 w.done w.fail
```



### 总结

- 总结，dtd 的 API 可分成两类，用意不同
- 第一类：dtd.resolve dtd.reject
- 第二类：dtd.then dtd.done dtd.fail
- 这两类应该分开，否则后果很严重



### 问题解答

- 是否用过 jQuery 的 Deferred

  - 可以 jQuery 1.5 对ajax的改变举例
  - 说明如何简单的封装，使用 Deferred
  - 说明 ES6 promise 和 Deferred 的区别

  

**想要深入理解它，就需要知道它的前世今生。** 





## 4-4 Promise

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。
>
> 所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
>
> [ECMAScript 6 Promise 对象](http://es6.ruanyifeng.com/#docs/promise)
>
> **基础语法** 请参考我的另一篇博客： [Promise 详细分析](http://zxinc520.com/lcj/%225cbb3bf05733fa0a66088c80%22) 

`Promise`**对象有以下两个特点**。 

1. 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

注意，为了行文方便，本章后面的`resolved`统一只指`fulfilled`状态，不包含`rejected`状态。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署`Promise`更好的选择。



### 异常捕获

```js
function loadImg(src) {
    const promise = new Promise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}

var src = 'https://edu-image.nosdn.127.net/B34DC36428D2D51B8EF5EE2C83CE9BF2.png?imageView&thumbnail=241y34&quality=100'
var result = loadImg(src)

//规定 ： then 只接受一个参数，最后统一用 catch 捕获异常
result.then(function (img) {
    console.log(img.width)
    return img
}).then(function (img) {
    console.log(img.height)
}).catch(function (ex) {
    // 最后统一 catch
    console.log(ex)
})

```



### Promise.all & Promise.race

> **Promise.all**  可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
>
> **Promse.race**  就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
>
> [理解和使用Promise.all和Promise.race](https://www.jianshu.com/p/7e60fc1be1b2) 

![mark](http://static.zxinc520.com/blog/20190814/LoF987DaE10r.png?imageslim)

*演示* ：

```js
function loadImg(src) {
    const promise = new Promise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}

var src1 = 'https://edu-image.nosdn.127.net/B34DC36428D2D51B8EF5EE2C83CE9BF2.png?imageView&thumbnail=241y34&quality=100'
var src2 = 'https://www.imooc.com/static/img/index/logo.png'

var result1 = loadImg(src1)
var result2 = loadImg(src2)

Promise.all([result1, result2]).then(function (datas) {
    console.log(datas[0])
    console.log(datas[1])
})

//谁快谁先执行
Promise.race([result1, result2]).then(function (datas) {
    console.log(datas)
})
```

**Promise.all 的执行结果** ：

![mark](http://static.zxinc520.com/blog/20190814/ITqccL9zhyE0.png?imageslim)



**Promise.race 的执行结果** ：

![mark](http://static.zxinc520.com/blog/20190814/PP76XFiW0S3V.png?imageslim)



### promise 标准

- 关于 “标准” 的闲谈
- 状态变化
- then



#### 关于 “标准” 的闲谈

- 任何技术推广使用都需要一套标准来支撑
- 如 html js css http 等，无规矩不成方圆
- 任何不符合标准的东西，终将会被用户抛弃
- 不要挑战标准，不要自造标准



#### 状态变化

- 三种状态：pending fulfilled rejected
- 初始状态：pending
- **成功**：pending 变成 fulfilled ，**失败**：pending 变成 rejected
- 状态变化不可逆



#### then

- Promise 实例必须实现 then 这个方法

- then() 必须可以接受两个函数作为参数

- then() 返回的必须是一个 Promise 实例

  ![mark](http://static.zxinc520.com/blog/20190814/p2zjIfnNkjIp.png?imageslim)

  

### 问题解答

**问题：Promise 的基本使用和原理？** 

- 基本语法 （复习）
- 如何异常捕获 （ error 和 reject 都要考虑）
- 多个串联 - 链式执行的好处
- Promise.all  和  Promise.race
- Promise 标准 - 状态变化，then 函数



## 4-5 async/await

> ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
>
> async 函数是什么？一句话，它就是 Generator 函数的语法糖。
>
> [ECMAScript 6 入门](http://es6.ruanyifeng.com/)    [async 函数](http://es6.ruanyifeng.com/#docs/async) 



- then 只是将callback 拆分了
- async/await 是最直接的同步写法



![mark](http://static.zxinc520.com/blog/20190815/B2MsvoDMkq7B.png?imageslim)

**最直接的同步写法：** 

~~~js
const load = async function () {
    const result1 = await loadImg(src1)
    console.log(result1)
    const result2 = await loadImg(src2)
    console.log(result2)
}
load()
~~~



### 用法

- 使用await，函数必须用 async 标识
- await 后面跟的是一个 Promise 实例
- 需要 babel-polyfill



~~~js
function loadImg(src) {
    const promise = new Promise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}

var src1 = 'https://edu-image.nosdn.127.net/B34DC36428D2D51B8EF5EE2C83CE9BF2.png?imageView&thumbnail=241y34&quality=100'
var src2 = 'https://www.imooc.com/static/img/index/logo.png'

const load = async function () {
    const result1 = await loadImg(src1)
    console.log(result1)
    const result2 = await loadImg(src2)
    console.log(result2)
}
load()
~~~



### 问题解答

- 介绍一下 async/await（ES7）（和 Promise 的区别、联系）
  - 基本语法
  - 使用了 Promise，并没有和Promise 冲突
  - 完全是同步的写法，再也没有回调函数
  - 但是：改变不了 JS 单线程、异步的本质


## 专题总结：单线程和异步

> 拿到 字节跳动实习生offer 总结
>
> 回馈分享一波自己的知识点总结



> 希望读者依此构建自己的知识树（思维导图）
>
> 偷懒一下：可参考我自己总结思维导图 :  [点这里](https://github.com/ZhChen7/Interview-mind-map) 
>
> 附带：高频面试题积累文档。 来自于（学长、牛客网等平台）
>
> 自己开发的博客地址：[zxinc520.com](<http://zxinc520.com/>)
>
> github地址: [点击](https://github.com/ZhChen7) 



> 此篇 js - 【单线程和异步】 知识点： 全部弄懂了，面试很容易。



## 一、单线程和异步

### 1.1、同步 vs 异步

- 同步是什么？
  - 简单来说：一定要等任务执行完了，得到结果，才执行下一个任务。
  - 指某段程序执行时会阻塞其它程序执行，其表现形式为程序的执行顺序依赖程序本身的书写顺序
- 异步是什么？
  - 指某段程序执行时不会阻塞其它程序执行，其表现形式为程序的执行顺序不依赖程序本身的书写顺序
  - 实现方式：event loop【事件轮询】



### 1.2、异步和单线程

- 单线程
  - 是什么？单线程就是同时只做一件事，两段 JS 不能同时 执行
  - 为什么是单线程？
    - 避免DOM 渲染的冲突
      1. 浏览器需要渲染DOM
      2. JS 可以修改DOM 结构
      3. JS 执行的时候，浏览器DOM 渲染会暂停
      4. 两段JS 也不能同时执行（都修改DOM 就冲突了）
      5. webworker支持多线程，但是不能访问DOM

- 单线程的解决方案 ？
  - 异步
    - 异步暴露出的问题 
      1. 没按照书写方式执行，可读性差
      2. callback 中不容易模块化



- event loop
  -  是什么？
    - 事件轮询， JS 实现异步 的具体解决方案
  - 具体
    - 同步代码，直接执行
    - 异步函数先放在 异步队列 中
    - 待同步函数执行完毕，轮询执行 异步队列 的函数



### 1.3、宏队列和微队列

> `macrotask`（宏任务） 和 `microtask`（微任务）
>
> 面试常考题【promise回调函数和定时器任务的顺序问题】

- 宏任务：

  ```js
  script(整体代码)
  setTimeout
  setInterval
  I/O
  UI交互事件
  postMessage
  MessageChannel
  setImmediate(Node.js 环境)
  ```

- 微任务

  ~~~js
  Promise.then
  Object.observe
  MutaionObserver
  process.nextTick(Node.js 环境)
  ~~~

执行机制：

1. 执行一个宏任务（栈中没有就从事件队列中获取）
2. 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
3. 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
4. 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
5. 渲染完毕后，JS引擎线程继续，开始下一个宏任务（从宏任务队列中获取）

#### 经典面试题

~~~js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
~~~

~~~js
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
~~~



### 1.4、前端异步的场景

- 简单来说：所有的 “ 等待情况” 都需要异步
- 定时任务：setTimeout，setInterval
- 网络请求：ajax 请求，动态 <*img* > 加载
- 事件绑定



### 1.5、Web Worker

> 就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。



### 1.6、模块化发展历程

> 可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、<*script type="module"* > 这几个角度考虑。
>
> **作用** ：模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

1. IIFE

   - 使用自执行函数来编写模块化

   - 特点：

     在一个单独的函数作用域中执行代码，避免变量冲突。

2. AMD

   - 使用requireJS 来编写模块化

   - 特点：依赖必须提前声明好

   - 简单实现

     ~~~js
     define('./index.js',function(code){
         // code 就是index.js 返回的内容
     })
     ~~~

3. CMD

   - 使用seaJS 来编写模块化

   - 特点：支持动态引入依赖文件

   - 简单实现

     ~~~js
     define(function(require, exports, module) {  
       var indexCode = require('./index.js');
     });
     ~~~

4. CommonJS

   - nodejs 中自带的模块化
   - var fs = require('fs');

5. UMD

   - 兼容AMD，CommonJS 模块化语法

6. webpack(require.ensure)

   - webpack 2.x 版本中的代码分割

7. ES Modules

   - ES6 引入的模块化，支持import 来引入另一个 js 
   - import a from 'a';



#### 1.6.1、AMD 与 CMD 的比较

- 定义

  AMD 和 CMD 都是用于浏览器端的模块规范

- AMD

  - AMD 是 RequireJS 在推广过程中对模块定义的规范化产出
  - 其主要内容就是定义了 define 函数该如何书写，只要你按照这个规范书写模块和依赖，require.js 就能正确的进行解析。

- CMD

  - CMD 其实就是 SeaJS 在推广过程中对模块定义的规范化产出
  - 主要内容就是描述该如何定义模块，如何引入模块，如何导出模块，只要你按照这个规范书写代码，sea.js 就能正确的进行解析

- AMD 与 CMD 的区别

  1. AMD 推崇依赖前置，CMD 推崇依赖就近
  2. AMD 是提前执行，CMD 是延迟执行。



#### 1.6.2、CommonJS 与 AMD 的比较

> 在服务器端比如 node，采用的则是 CommonJS 规范。
>
> AMD 和 CMD 都是用于浏览器端的模块规范

1. CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

2. AMD规范则是非同步加载模块，允许指定回调函数。

   由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。

3. 但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。



#### 16.3、ES6 与 CommonJS 的比较

> 注意！浏览器加载 ES6 模块，也使用 <*script* > 标签，但是要加入 type="module" 属性。

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口



### 1.7、async 和 defer

- 共同点

  两者都会并行下载，不会影响页面的解析。

- defer：defer 会按照顺序在 DOMContentLoaded 前按照页面出现顺序依次执行。

- async ：async 则是下载完立即执行

- 具体解析【剖析】

  - 先来看一个普通的 script 标签。<*script src="a.js"></script* >

    - 浏览器会做如下处理：

      1、停止解析 document.

      2、请求 a.js

      3、执行 a.js 中的脚本

      4、继续解析 document

    

  - ~~~js
    <script src="d.js" defer></script>
    <script src="e.js" defer></script>
    ~~~

    不阻止解析 document， 并行下载 d.js, e.js

    即使下载完 d.js, e.js 仍继续解析 document

    按照页面中出现的顺序，在其他同步脚本执行后，DOMContentLoaded 事件前 依次执行 d.js, e.js。

  - ~~~js
    <script src="b.js" async></script>
    <script src="c.js" async></script>
    ~~~

    不阻止解析 document, 并行下载 b.js, c.js

    当脚本下载完后立即执行。（两者执行顺序不确定，执行阶段不确定，可能在 DOMContentLoaded 事件前或者后 ）



#### async 和 defer总结

- 两者都不会阻止 document 的解析

- defer 会在 DOMContentLoaded 前依次执行 （可以利用这两点哦！）

- async 则是下载完立即执行，不一定是在 DOMContentLoaded 前

- async 因为顺序无关，所以很适合像 Google Analytics 这样的无依赖脚本



### 1.8、异步编程6种解决方案

1. 回调函数（Callback）

   - 回调函数是异步操作最基本的方法

   - ajax(url, () => {

     ​    // 处理逻辑

     })

   - 缺点

     - 容易写出回调地狱（Callback hell）
     - 不能使用 try catch 捕获错误，不能直接 return

2. 事件监听

   ```js
   f1.on('done', f2);
   ```

3. 发布订阅

   ```js
   jQuery.subscribe('done', f2);
   ```

4. Promise

   - 是什么？

     - promise 是目前 JS 异步编程的主流解决方案，遵循 Promises/A+ 方案。Promise 用于异步操作，表示一个还未完成但是预期会完成的操作。
     - Promise是ES6引入的一个新的对象，他的主要作用是用来解决JS异步机制里，回调机制产生的“回调地狱”。它并不是什么突破性的API，只是封装了异步回调形式，使得异步回调可以写的更加优雅，可读性更高，而且可以链式调用。

   - 剖析

     - promise 本身相当于一个状态机，拥有三种状态

       - pending
       - fulfilled
       - rejected

       一个 promise 对象初始化时的状态是 pending，调用了 resolve 后会将 promise 的状态扭转为 fulfilled，调用 reject 后会将 promise 的状态扭转为 rejected，这两种扭转一旦发生便不能再扭转该 promise 到其他状态。

   - Promise 如何使用

     构造一个 promise 对象，并将要执行的异步函数传入到 promise 的参数中执行，并且在异步执行结束后调用 resolve( ) 函数，就可以在 promise 的 then 方法中获取到异步函数的执行结果

   - Promise原型上的方法

     1. Promise.prototype.then(onFulfilled, onRejected)
     2. Promise.prototype.catch(onRejected)
     3. Promise.prototype.finally(onFinally)

   - Promise静态方法

     1. Promise.all()

        Promise.all 接收一个 promise 对象数组作为参数，只有全部的 promise 都已经变为 fulfilled 状态后才会继续后面的处理

     2. Promise.race()

        这个函数会在 promises 中第一个 promise 的状态扭转后就开始后面的处理（fulfilled、rejected 均可）

     3. Promise.resolve()

     4. Promise.reject()

   - 优点

     将异步操作以同步操作的流程表达出来，promise链式调用，更好地解决了层层嵌套的回调地狱

   - 缺点

     1. 不能取消执行。
     2. 无法获取当前执行的进度信息（比如，要在用户界面展示进度条）。
     3. 外部无法捕捉Promise内部抛出的错误

5. generator函数

   - 是什么

     - Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
     - 如果说JavaScript是ECMAScript标准的一种具体实现、Iterator遍历器是Iterator的具体实现，那么Generator函数可以说是Iterator接口的具体实现方式。
     - Generator函数可以通过配合Thunk 函数更轻松更优雅的实现异步编程和控制流管理

   - 描述

     - 执行Generator函数会返回一个遍历器对象，每一次Generator函数里面的yield都相当一次遍历器对象的next()方法，并且可以通过next(value)方法传入自定义的value,来改变Generator函数的行为。

   - 能封装异步任务的根本原因

     - 最大特点就是可以交出函数的执行权（即暂停执行）。Generator 函数可以暂停执行和恢复执行

   - 两个特征

     - function关键字与函数名之间有一个星号
     - 函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

   - 过程

     Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）

   - Generator及其异步方面的应用

     - Generator 函数将 JavaScript 异步编程带入了一个全新的阶段

   - 总结

     调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

   - demo

     ```js
     var fetch = require('node-fetch');
     function* gen(){
       var url = 'https://api.github.com/users/github';
       var result = yield fetch(url);
       console.log(result.bio);
     }
     ```

6. async 和 await

   - 含义

     ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

   - 是什么？

     - 一句话，它就是 Generator 函数的语法糖。
     - 一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
     - async函数可以理解为内置自动执行器的Generator函数语法糖，它配合ES6的Promise近乎完美的实现了异步编程解决方案。

   - 相对于Promise，优势体现在

     1. 处理 then 的调用链，能够更清晰准确的写出代码
     2. 并且也能优雅地解决回调地狱问题

   - 相对Generator 函数，体现在以下4点

     1. 内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行
     2. 更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果
     3. 更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
     4. 返回值是 Promise。async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

   - 缺点

     当然async/await函数也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式。

#### 总结

1. JS 异步编程进化史：callback -> promise -> generator -> async + await
2. async/await 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里
3. async/await可以说是异步终极解决方案了



## 二、相关面试问题

1. 什么是单线程，和异步有什么关系？
   - 单线程就是同时只做一件事，两段 JS 不能同时 执行
   - 原因就是 为了避免 DOM 渲染的冲突
   - 异步是一种 “无奈” 的解决方案，虽然有很多问题



2. 是否用过 jQuery 的 Deferred

   - 步骤

     可以 jQuery 1.5 对ajax的改变举例

     说明如何简单的封装，使用 Deferred

     说明 ES6 promise 和 Deferred 的区别

   - jQuery 1.5 的变化

     - 无法改变 JS 异步和单线程的本质

     - 只能从写法上杜绝 callback 这种形式

     - 它是一种语法糖形式，但是解耦了代码

     - 很好的体现：开放封闭原则

     - ajax为例

       ~~~js
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
       ~~~

   - 使用 jQuery Deferred

     ~~~js
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
     ~~~

     






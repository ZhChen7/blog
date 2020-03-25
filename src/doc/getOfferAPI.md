#### 面试专题总结： API、数组、跨域、动画、事件

> 希望读者依此构建自己的知识树（思维导图）
>
> 偷懒一下：可参考我自己总结思维导图 :  [点这里](https://github.com/ZhChen7/Interview-mind-map)
>
> 附带：高频面试题积累文档。 来自于（学长、牛客网等平台）
>
> 自己开发的博客地址：[zxinc520.com](http://zxinc520.com/)
>
> github地址: [点击](https://github.com/ZhChen7)

> 此篇 js - 【API、数组、跨域、动画、事件】 知识点： 全部弄懂了，面试很容易。



### 1、数组

- 改变原数组的API
  1. push()
  2. unshift()
  3. pop()
  4. shift()
  5. reverse()
  6. splice(index, count, value1, value2....)
     - 从索引位index处删除count个元素，插入value1, value2等元素，返回被删除的元素组成的新数组(改变原数组)
  7. sort()
- 不改变原数组的API
  1. join(value)
     - 将数组用value连接为字符串，返回被连接后的字符串(不改变原数组)
     - 将数组用value连接为字符串，返回被连接后的字符串(不改变原数组)
  2. 获取子数组，包含原数组索引start的值到索引end的值，不包含end，返回获取的子数组(不改变原数组)
  3. toString()
     - 将数组中的元素用逗号拼接成字符串，返回拼接后的字符串(不改变原数组)
  4. indexOf(value)
     - 从索引为0开始，检查数组中是否包含有value，有则返回匹配到的第一个索引，没有则返回-1(不改变原数组)
  5. lastIndexOf(value)
     - 从最后的索引开始，检查数组找那个是否包含value，有则返回匹配到的第一个索引，没有返回-1(不改变原数组)
  6. concat(value)
     - 将数组和(或)值连接成新数组，返回新数组(不改变原数组)
  7. forEach()
     - 对数组进行遍历循环，对数组中每一项运行给定函数，参数都是function类型，默认有传参，参数分别为：遍历数组内容、对应的数组索引、数组本身。没有返回值
  8. map()
     - 指“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的新数组
  9. filter()
     - “过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组
  10. every()
      - 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true
  11. some()
      - 判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true
  12. reduce()
      - 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值



### 2、类数组转变为数组的方法

- 类数组的定义
  - 可以通过索引访问元素，并且拥有 length 属性
  - 没有数组的其他方法，例如 push ， forEach ， indexOf 等。
- ES5
  - Array.prototype.slice.call() 等同于 [].slice.call(arguments)
- ES6
  - Array.from()
  - ...扩展运算符
  - for of 直接遍历类数组（iterator接口）



### 3、稀疏数组和密集数组

- 稀疏数组
  - 是什么
    - 具有不连续索引的数组，其 length 属性值大于元素的个数。
  - 造成稀疏数组的操作
    1. delete 操作符
    2. 构造函数
    3. 在数组字面量中省略值
    4. 指定数组索引大于数组长度
    5. 指定数组长度大于当前数组长度
  - 缺点
    - 操作的不统一
- 密集数组
  - 是什么
    - 具有连续索引的数组，其 length 属性值等于元素的个数。
  - 创建方式
    1. Array.apply(null, Array(3)) || Array.apply(null, {length: 3})
    2. Array.from({length: 3})
    3. [...Array(4)]



### 4、柯里化函数

- 定义

  - 柯里化, 即 Currying 的音译。 Currying 是编译原理层面实现多参函数的一个技术。

- 手写柯里化函数

  - ES5写法

    ```js
    const currying = function (fn,...args) {
        if(args.length < fn.length){
            return function () {
                return currying(fn, ...args, ...arguments)
            }
        }else{
            return fn(...args)
        }
    }
    ```

  - ES6 写法（箭头函数）

    ```js
    const currying =(fn,...args)=>
        args.length < fn.length?(...argments)=> currying(fn,...args,...argments):fn(...args)
    ```



### 5、window全局对象（BOM）

1. navigator导航器对象
   - Navigator 对象包含有关浏览器的信息
   - appCodeName 返回浏览器的代码名
   - appName 返回浏览器的名称
   - appVersion 返回浏览器的平台和版本信息
   - cookieEnabled 返回指明浏览器中是否启用cookie的布尔值
   - platform 返回运行浏览器的操作系统平台
   - userAgent 返回由客户机发送服务器的user-agent头部的值
2. screen显示器对象
3. history历史对象
   - back() 返回前一个URL
   - forward() 返回下一个URL
   - go() 返回某个具体页面
4. location位置对象
   - 属性
     - hash 设置或返回从井号 (#) 开始的 URL（锚）。
     - host 设置或返回主机名和当前 URL 的端口号。
     - hostname 设置或返回当前 URL 的主机名
     - href 设置或返回完整的 URL
     - pathname 设置或返回当前 URL 的路径部分。
     - port 设置或返回当前 URL 的端口号。
     - protocol 设置或返回当前 URL 的协议。
     - search 设置或返回从问号 (?) 开始的 URL（查询部分）。
   - 方法
     - assign(URL) 加载新的文档
     - reload() 重新加载当前页面
     - replace(newURL) 用新的文档替换当前文档
5. document文档对象【DOM】



### 6、ajax 和 fetch

#### 6.1、Ajax

- 本质

  - 是在 HTTP 协议的基础上以异步的方式与服务器进行通信.

- 封装原生Ajax请求

  ```js
  function ajaxGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
    }
  }
  ```



#### 6.2、fetch

- fetch是什么

  - Fetch 是浏览器提供的原生 AJAX 接口。

- Fetch为何出现？

  - 由于原来的XMLHttpRequest不符合关注分离原则，且基于事件的模型在处理异步上已经没有现代的Promise等那么有优势。因此Fetch出现来解决这种问题。

- Fetch API

  - Fetch API 提供了能够用于操作一部分 HTTP 的 JavaScript 接口，比如 requests 和 responses。它同时也提供了一个全局的 fetch() 方法——能够简单的异步的获取资源。

    使用 window.fetch 函数可以代替以前的 $. ajax、$.get 和 $.post。

- 用法

  ```js
  fetch('http://example.com/movies.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
  ```

  

#### 6.3、readyState（状态值）

- readyState是什么
  - readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态
- 5个状态值
  - 0: 请求未初始化
  - 1: 载入，XMLHttpRequest对象开始发送请求
  - 2: 载入完成，XMLHttpRequest对象的请求发送完成
  - 3: 解析，XMLHttpRequest对象开始读取服务器的响应
  - 4: 完成，XMLHttpRequest对象读取服务器响应结束



#### 6.4、status（状态码

- status是什么

  - status是XMLHttpRequest对象的一个属性，表示响应的http状态码

- 在http1.1协议下，http状态码总共可分为5大类

  - 1xx：信息响应类，表示接收到请求并且继续处理

  - 2xx：处理成功响应类，表示动作被成功接收、理解和接受

  - 3xx：重定向响应类，为了完成指定的动作，必须接受进一步处理

  - 4xx：客户端错误，客户请求包含语法错误或者是不能正确执行

  - 5xx：服务端错误，服务器不能正确执行一个正确的请求

  - 一些常见的状态码为

    200 OK：成功，很棒。

    301永久移动：已永久移动到新位置。

    302（临时移动）：暂时移到新位置。

    304未修改：东西跟之前长一样，可以从快取拿就好。

    400错误的请求：明显的用户端错误，伺服器无法处理这个请求。

    401未经授权：未认证，可能需要登录或Token。

    403 Forbidden：没有权限。

    404未找到：找不到资源。

    500内部服务器错误：伺服器端错误。

    502错误的网关：通常是伺服器的某个服务没有正确执行。

    503服务不可用：伺服器临时维护或快挂了，暂时无法处理请求。

    504网关超时：伺服器上的服务没有回应。



### 7、Web端即时通讯技术

- Web端即时通讯技术是什么

  即时通讯技术简单的说就是实现这样一种功能：服务器端可以即时地将数据的更新或变化反应到客户端，例如消息即时推送等功能都是通过这种技术实现的。但是在Web中，由于浏览器的限制，实现即时通讯需要借助一些方法。这种限制出现的主要原因是，一般的Web通信都是浏览器先发送请求到服务器，服务器再进行响应完成数据的现实更新。

- 大体可以分为两类

  1. 一种是在HTTP基础上实现的
     - 短轮询、comet和SSE
  2. 不是在HTTP基础上实现
     - WebSocket

- 如何模拟双向通信（四种方式）

  - 短轮询
    - 客户端定时向服务器发送Ajax请求，服务器接到请求后马上返回响应信息并关闭连接。
    - 优点  ：   后端编写容易
    - 缺点  ：  请求中大半是无用，浪费宽带和服务器资源
    - 适用 ：   小型应用
  - 长轮询
    - 客户端向服务器发送Ajax请求，服务器接到请求后 hold住连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。
    - 优点 ：在无消息的情况下不会频繁的请求，耗费资源小
    - 缺点
      - 服务器hold连接会消耗资源
      - 返回数据顺序无保证，难于管理维护
  - 长连接
    - 在页面嵌入一个隐藏iframe，将这个隐藏iframe的src属性设为对一个长连接的请求或是采用 xhr请求，服务器端就能源源不断的往客户端输入数据
    - 优点    
      - 消息及时到达，不发无用请求
      - 管理起来也相对方便
    - 缺点：服务器维护一个长连接会增加开销
  - WebSocket
    - WebSocket是Html5定义的一个新协议，与传统的http协议不同，该协议可以实现服务器与客户端之间全双工通信。简单来说，首先需要在客户端和服务器端建立起一个连接，这部分需要http。连接一旦建立，客户端和服务器端就处于平等的地位，可以相互发送数据，不存在请求和响应的区别。
    - 优点：实现了双向通信
    - 缺点：服务器端的逻辑非常复杂



#### 四种Web即时通信技术比较

- 从兼容性角度考虑，短轮询>长轮询>长连接SSE>WebSocket；
- 从性能方面考虑，WebSocket>长连接SSE>长轮询>短轮询。



### 8、跨域

- 跨域是什么
  - 跨域是指从一个域名的网页去请求另一个域名的资源。
  - 跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域



#### 6种解决方案

1. 跨域资源共享（CORS）

   - 定义

     - 定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。

   - 基本思想

     - CORS背后的基本思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败

   - 两种请求

     - 简单请求
       - 就是在头信息之中，增加一个Origin字段。
     - 非简单请求
       - 会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）

   - 服务端

     - 服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问

       ```js
       //指定允许其他域名访问
       'Access-Control-Allow-Origin:*'//或指定域
       //响应类型
       'Access-Control-Allow-Methods:GET,POST'
       //响应头设置
       'Access-Control-Allow-Headers:x-requested-with,content-type'
       ```

2. jsonp

   - jsonp是什么

     - JSONP(JSON with Padding 填充式json)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。

   - 两部分组成

     - 回调函数
       - 回调函数是当响应到来时应该在页面中调用的函数
     - 数据
       - 而数据就是传入回调函数中的JSON数据。

   - 原理

     通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。（即用javascript动态加载一个script文件，同时定义一个callback函数给script执行而已。）

   - 模拟

     ```js
     <script type="text/javascript">
         function dosomething(jsondata){
             //处理获得的json数据
         }
     </script>
     <script src="http://example.com/data.php?callback=dosomething"></script>
     ```

   - 缺点

     - 我们都知道JSONP可以实现解决GET请求的跨域问题,但是不能解决POST请求的跨域问题.

3. document.domain

   - 方法

     - 通过修改document.domain来跨子域

   - 注意

     - 域必须相我们只能把document.domain设置成自身或更高一级的父域，且主同。

   - 例如：

     ```js
     <iframe id = "iframe" src="http://example.com/b.html" onload = "test()"></iframe>
     <script type="text/javascript">
         document.domain = 'example.com';//设置成主域
         function test(){
         }
     </script>
     ```

   - 作用域

     - 修改document.domain的方法只适用于不同子域的框架间的交互。

4. window.name

   - window.name 是什么
     - 是一个可读可写的属性，有个很有意思的跨页面特性
   - 方法
     - 页面如果设置了window.name，即使进行了页面跳转到了其他页面，这个window.name还是会保留。

5. postMessage

   - 定义

     postMessage是html5引入的API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递.多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案.

   - 方法使用

     - 发送数据

       - otherWindow.postMessage(message, targetOrigin, [transfer]);
       - otherWindow 【窗口的一个引用,比如iframe的contentWindow属性】

     - 接收数据

       ```js
       window.addEventListener("message", receiveMessage, false) ;
       function receiveMessage(event) {
            var origin= event.origin;
            console.log(event);
       }
       ```

   - postMessage的使用场景

     1. 跨域通信(包括GET请求和POST请求)
     2. WebWorker
        - Web Worker的使用场景
          - 用于收集埋点数据,可以用于大量复杂的数据计算,复杂的图像处理,大数据的处理.因为它不会阻碍主线程的正常执行和页面UI的渲染.
     3. Service Worker
        - 离线存储的一个最佳的解决方案

   ##### WebWorker 和 Service Worker的关系

   - 相同点
     - 相同点是在常规的js引擎线程以外开辟了新的js线程去处理一些不适合在主线程上处理的业务
   - 不同点
     - Web Worker式服务于特定页面的,而Service Worker在被注册安装之后能够在多个页面使用
     - Service Worker常驻在浏览器中,不会因为页面的关闭而被销毁.本质上,它是一个后台线程,只有你主动终结,或者浏览器回收,这个线程才会结束.
     - 生命周期,可调用的API也不同

   

   6. 代理服务器

      - 定义

        代理，也称正向代理，是指一个位于客户端和目标服务器(target server)之间的服务器，为了从目标服务器取得内容，客户端向代理发送一个请求并指定目标(目标服务器)，然后代理向目标服务器转交请求并将获得的内容返回给客户端。

      - 代理服务器，需要做以下几个步骤

        1. 接受客户端 请求 。
        2. 将 请求 转发给服务器
        3. 拿到服务器 响应 数据
        4. 将 响应 转发给客户端

   ##### CORS 和 JSONP 对比

   - CORS与JSONP相比，无疑更为先进、方便和可靠。
   - 区别
     1. JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。
     2. 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。
     3. JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS）。





### 9、动画

> requestanimationframe的出现替代setTimeout完成动画。

- setTimeout
  - setTimeout 其实就是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但利用seTimeout实现的动画在某些低端机上会出现卡顿、抖动的现象。导致setTimeout的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。
  - 原因
    1. setTimeout的执行时间并不是确定的。setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 setTimeout 的实际执行时间一般要比其设定的时间晚一些。
    2. 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。
- requestanimationframe
  - html5 为了满足高性能动画的需求而提供的API，表意是请求动画帧。



#### requestanimationframe相比setTimeout

- 优势
  1. 与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。
  2. 它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。





### 10、事件

- 事件流

  事件流描述的是从页面中接收事件的顺序，IE和Netscape提出来差不多完全相反的事件流的概念，IE事件流是事件冒泡流，Netscape事件流是事件捕获流。

- DOM事件级别

  - DOM0事件

    - 定义

      通过文档对象（document）获取元素引用，使用DOM0级方法指定的事件处理程序被认为是元素的方法，处理程序是在元素的作用域进行的，程序中this是引用的是当前元素。

    - 3个特点

      1. 触发时机：DOM0级的事件处理程式只能在事件冒泡阶段触发。

      2. 每个属性只能绑定一个事件

      3. this指针的指向

         用DOM0级的方式绑定事件是在元素对象的作用域内运行，因此在事件函数内的this属性不是引用全局对象，而是引用当前元素对象

  - DOM2事件

    - 定义

      ’DOM2级事件’定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener();所有的DOM节点都包含这两种方法。

    - DOM2级事件规定的事件流包括三个阶段

      - 事件捕获阶段
      - 处于目标阶段
      - 事件冒泡阶段

    - 优点

      可以添加多个事件处理程序

  - DOM3级

    - DOM3级事件就是在DOM2基础上增加了更多的事件类型

    - UI事件，当用户与页面上的元素交互时触发，如：load、scroll

      焦点事件，当元素获得或失去焦点时触发，如：blur、focus

      鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup

      滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel

      文本事件，当在文档中输入文本时触发，如：textInput

      键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress

      合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart

      变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified

- 机制

  1. 冒泡机制

     事件会从最内层的元素开始发生，一直向上传播，直到document对象。

  2. 捕获机制

     网景提出另一种事件流名为事件捕获(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

- 事件代理

  - 定义

    JavaScript高级程序设计上讲：事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

  - 关键

    Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源

  - 适合用事件委托的事件

    click，mousedown，mouseup，keydown，keyup，keypress

  - 不合适

    mousemove，每次都要计算它的位置，非常不好把控，在不如说focus，blur之类的，本身就没用冒泡的特性，自然就不能用事件委托了


















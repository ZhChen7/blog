## 面试专题总结：ES6知识点

> 希望读者依此构建自己的知识树（思维导图）
>
> 偷懒一下：可参考我自己总结思维导图 :  [点这里](https://github.com/ZhChen7/Interview-mind-map) 
>
> 附带：高频面试题积累文档。 来自于（学长、牛客网等平台）
>
> 自己开发的博客地址：[zxinc520.com](<http://zxinc520.com/>)
>
> github地址: [点击](https://github.com/ZhChen7) 



> 此篇 js - 【ES6 知识总结】 知识点： 全部弄懂了，面试很容易。

> 详细可参考： [ECMAScript 6 入门](https://es6.ruanyifeng.com/) 



### 1、es6 是什么

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。                                                                                                       ECMA是标准，Javascript是ECMA                                                                                                        的实现。因为js也是一种语言，但凡语言都有一套标准，而ECMA就是javascript的标准。在2015年正式发布了ECMAscript6.0，简称ES6，又称为ECMAscript2015。



### 2、var、let、const（声明方式）

- 类别
  1. 变量提升
  2. 暂时性死区
  3. 重复声明
  4. 块作用域有效
  5. 初始值
  6. 重新赋值
- 区别
  1. let/const 定义的变量不会出现变量提升，而 var 定义的变量会提升。
  2. 相同作用域中，let 和 const 不允许重复声明，var 允许重复声明。
  3. const 声明变量时必须设置初始值
  4. const 声明一个只读的常量，这个常量不可改变
  5. let/const 声明的变量仅在块级作用域中有效。而 var 声明的变量在块级作用域外仍能访问到。
  6. 顶层作用域中 var 声明的变量挂在window上(浏览器环境)
  7. let/const有暂时性死区的问题，即let/const 声明的变量，在定义之前都是不可用的。如果使用会抛出错误。



### 3、 变量的解构赋值

- 数组解构赋值

  let [aa, bb, cc] = [0, 1, 2];

- 对象解构赋值

  ~~~js
  let { cnName, enName } = {
    id: '151521574',
    cnName: '张生',
    enName: 'Ronnie'
  };
  console.log(cnName, enName); //'张生'，'Ronnie'
  ~~~





### 4、箭头函数

> es6之前的函数的this指向调用函数时所在的对象，而箭头函数的this指向函数定义时所在的对象

#### 箭头函数及其this问题 

1. this对象的指向是可变的，但是在箭头函数中，它是固定的。
2. this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
3. 箭头函数里面根本没有自己的this，而是引用外层的this。
4. 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向



### 5、Symbol

- 是什么？

  symbols 是一种无法被重建的基本类型。这时 symbols 有点类似与对象创建的实例互相不相等的情况，但同时 symbols 又是一种无法被改变的基本类型数据。

  ~~~js
  const s1 = Symbol();
  const s2 = Symbol();
  console.log(s1 === s2); // false
  ~~~

- 作用

  1. symbols 作为对象的属性
  2. 阻止对象属性名冲突 （扩展对象属性很有用）
  3. 模拟私有属性



### 6、Module模块

> 可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、<*script type="module"* > 这几个角度考虑。
>
> **作用** ：模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

#### 模块化发展历程

1. IIFE

   - 使用自执行函数来编写模块化

   - 特点：

     在一个单独的函数作用域中执行代码，避免变量冲突。

2. AMD

   - 使用requireJS 来编写模块化

   - 特点：依赖必须提前声明好

   - 简单实现

     ```js
     define('./index.js',function(code){
         // code 就是index.js 返回的内容
     })
     ```

3. CMD

   - 使用seaJS 来编写模块化

   - 特点：支持动态引入依赖文件

   - 简单实现

     ```js
     define(function(require, exports, module) {  
       var indexCode = require('./index.js');
     });
     ```

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



#### 6.1、AMD 与 CMD 的比较

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



#### 6.2、CommonJS 与 AMD 的比较

> 在服务器端比如 node，采用的则是 CommonJS 规范。
>
> AMD 和 CMD 都是用于浏览器端的模块规范

1. CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

2. AMD规范则是非同步加载模块，允许指定回调函数。

   由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。

3. 但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。



#### 6.3、ES6 与 CommonJS 的比较

> 注意！浏览器加载 ES6 模块，也使用 <*script* > 标签，但是要加入 type="module" 属性。

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口



### 7、异步编程6种解决方案

1. 回调函数（Callback）

   - 回调函数是异步操作最基本的方法

   - ajax(url, () => {

     ​    // 处理逻辑

     })

   - 缺点

     - 容易写出回调地狱（Callback hell）
     - 不能使用 try catch 捕获错误，不能直接 return

2. 事件监听

   ~~~js
   f1.on('done', f2);
   ~~~

3. 发布订阅

   ~~~js
   jQuery.subscribe('done', f2);
   ~~~

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

     ~~~js
     var fetch = require('node-fetch');
     function* gen(){
       var url = 'https://api.github.com/users/github';
       var result = yield fetch(url);
       console.log(result.bio);
     }
     ~~~

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



### 8、Class

> ES6 的class可以看作只是一个ES5生成实例对象的构造函数的语法糖。它参考了java语言，定义了一个类的概念，让对象原型写法更加清晰，对象实例化更像是一种面向对象编程。Class类可以通过extends实现继承。

- 语法

  - super关键字的使用
  - static关键字

- ES5/ES6 的继承除了写法以外还有什么区别？

  1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
  2. class 声明内部会启用严格模式
  3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的
  4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用
  5. 必须使用 new 调用 class
  6. class 内部无法重写类名

  ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this

- 优点

  但是某些时候，我们使用es6的类可以让我们的代码的可读性更高



### 9、Set 和 Map

- Set
  - 是什么
    - Set是一种叫做集合的数据结构
    - Set是ES6引入的一种类似Array的新的数据结构，Set实例的成员类似于数组item成员，区别是Set实例的成员都是唯一，不重复的。这个特性可以轻松地实现数组去重。
  - 应用场景
    - 数组去重
  - 特点
    1. 成员唯一、无序且不重复
    2. [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
    3. 可以遍历，方法有：add、delete、has
- WeakSet
  - 特点
    1. 成员都是对象
    2. 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
    3. 不能遍历，方法有add、delete、has
- Map
  - 是什么
    - Map是一种叫做字典的数据结构
    - Map是ES6引入的一种类似Object的新的数据结构，Map可以理解为是Object的超集，打破了以传统键值对形式定义对象，对象的key不再局限于字符串，也可以是Object。可以更加全面的描述对象的属性。
  - 应用场景
    - 数据存储
  - 特点
    - 本质上是键值对的集合，类似集合
    - 可以遍历，方法很多可以跟各种数据格式转换
- WeakMap
  - 特点
    - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
    - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    - 不能遍历，方法有get、set、has、delete
- Set 和 Map
  - Set和Map主要的应用场景在于数组去重和数据存储
  - 原来Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构
- Set与WeakSet区别
  1. WeakSet只能存放对象
  2. WeakSet不支持遍历, 没有size属性
  3. WeakSet存放的对象不会计入到对象的引用技术, 因此不会影响GC的回收
  4. WeakSet存在的对象如果在外界消失了, 那么在WeakSet里面也会不存在
- Map与WeakMap区别
  1. WeakMap只能接受对象作为键名字(null除外)
  2. WeakMap键名指向对象不会计入对象的引用数



### 10、ES6对String字符串类型做的常用升级优化

- 优化部分
  - ES6新增了字符串模板，在拼接大段字符串时，用反斜杠(`)取代以往的字符串相加的形式，能保留所有空格和换行，使得字符串拼接看起来更加直观，更加优雅。
- 升级部分
  - ES6在String原型上新增了includes()方法，用于取代传统的只能用indexOf查找包含字符的方法(indexOf返回-1表示没查到不如includes方法返回false更明确，语义更清晰), 此外还新增了startsWith(), endsWith(), padStart(),padEnd(),repeat()等方法，可方便的用于查找，补全字符串。



### 11、ES6对Number数字类型做的常用升级优化?

- 优化部分
  - ES6在Number原型上新增了isFinite(), isNaN()方法，用来取代传统的全局isFinite(), isNaN()方法检测数值是否有限、是否是NaN。ES5的isFinite(), isNaN()方法都会先将非数值类型的参数转化为Number类型再做判断，这其实是不合理的，最造成isNaN('NaN') === true的奇怪行为--'NaN'是一个字符串，但是isNaN却说这就是NaN。而Number.isFinite()和Number.isNaN()则不会有此类问题(Number.isNaN('NaN') === false)。
- 升级部分
  - ES6在Math对象上新增了Math.cbrt()，trunc()，hypot()等等较多的科学计数法运算方法，可以更加全面的进行立方根、求和立方根等等科学计算。



### 12、ES6对Array数组类型做的常用升级优化

- 优化部分
  - 数组解构赋值。ES6可以直接以let [a,b,c] = [1,2,3]形式进行变量赋值，在声明较多变量时，不用再写很多let(var),且映射关系清晰，且支持赋默认值
  - 扩展运算符。ES6新增的扩展运算符(...)(重要),可以轻松的实现数组和松散序列的相互转化，可以取代arguments对象和apply方法，轻松获取未知参数个数情况下的参数集合。（尤其是在ES5中，arguments并不是一个真正的数组，而是一个类数组的对象，但是扩展运算符的逆运算却可以返回一个真正的数组）。扩展运算符还可以轻松方便的实现数组的复制和解构赋值（let a = [2,3,4]; let b = [...a]）
- 升级部分
  - ES6在Array原型上新增了find()方法，用于取代传统的只能用indexOf查找包含数组项目的方法,且修复了indexOf查找不到NaN的bug([NaN].indexOf(NaN) === -1).此外还新增了copyWithin(), includes(), fill(),flat()等方法，可方便的用于字符串的查找，补全,转换等



### 13、ES6对Object类型做的常用升级优化

- 优化部分

  1. 对象属性变量式声明。ES6可以直接以变量形式声明对象属性或者方法，。比传统的键值对形式声明更加简洁，更加方便，语义更加清晰。
  2. 对象的解构赋值
  3. 对象的扩展运算符(...)
  4. super 关键字。ES6在Class类里新增了类似this的关键字super。同this总是指向当前函数所在的对象不同，super关键字总是指向当前函数所在对象的原型对象。

- 升级部分

  1.   ES6在Object原型上新增了is()方法，做两个目标对象的相等比较，用来完善'==='方法。'==='方法中NaN === NaN //false其实是不合理的，Object.is修复了这个小bug。(Object.is(NaN, NaN) // true)

  2. ES6在Object原型上新增了assign()方法，用于对象新增属性或者多个对象合并。

     ~~~js
     const target = { a: 1 };
     const source1 = { b: 2 };
     const source2 = { c: 3 };
     Object.assign(target, source1, source2);
     target // {a:1, b:2, c:3}
     ~~~

  3. ES6在Object原型上新增了getOwnPropertyDescriptors()方法，此方法增强了ES5中getOwnPropertyDescriptor()方法，可以获取指定对象所有自身属性的描述对象。结合defineProperties()方法，可以完美复制对象，包括复制get和set属性。

  4.  ES6在Object原型上新增了getPrototypeOf()和setPrototypeOf()方法，用来获取或设置当前对象的prototype对象。获取或设置当前对象的prototype对象时，都应该采用ES6新增的标准用法。

  5. ES6在Object原型上还新增了Object.keys()，Object.values()，Object.entries()方法，用来获取对象的所有键、所有值和所有键值对数组。



### 14、ES6对Function函数类型做的常用升级优化

- 优化部分

  - 箭头函数(核心)。箭头函数里没有自己的this,这改变了以往JS函数中最让人难以理解的this运行机制
    1.  箭头函数内的this指向的是函数定义时所在的对象，而不是函数执行时所在的对象。
    2. 箭头函数不能用作构造函数，因为它没有自己的this，无法实例化。
    3. 也是因为箭头函数没有自己的this,所以箭头函数 内也不存在arguments对象。（可以用扩展运算符代替）

- 升级部分

  - ES6新增了双冒号运算符，用来取代以往的bind，call,和apply(浏览器暂不支持，Babel已经支持转码)

    ~~~js
    foo::bar;
    // 等同于
    bar.bind(foo);
    
    foo::bar(...arguments);
    // 等同于
    bar.apply(foo, arguments);
    ~~~





### 15、Proxy

Proxy是ES6新增的一个构造函数，这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。



### 16、Reflect

- 是什么
  - Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API
- 作用
  1. 一是将原生的一些零散分布在Object、Function或者全局函数里的方法(如apply、delete、get、set等等)，统一整合到Reflect上，这样可以更加方便更加统一的管理一些原生API。
  2. 其次就是因为Proxy可以改写默认的原生API，如果一旦原生API别改写可能就找不到了，所以Reflect也可以起到备份原生API的作用，使得即使原生API被改写了之后，也可以在被改写之后的API用上默认的API。





### 17、Iterator

- 是什么
  - 一种设计标准，来统一所有可遍历类型的遍历方式。Iterator正是这样一种标准。或者说是一种规范理念
- 解决的问题
  - Set、Map都不能用for循环遍历，解决这个问题有两种方案，一种是为Set、Map单独新增一个用来遍历的API，另一种是为Set、Map、Array、Object新增一个统一的遍历API，显然，第二种更好，ES6也就顺其自然的需要一种设计标准，来统一所有可遍历类型的遍历方式。
- Iterator标准的具体实现
  - Iterator标准的具体实现是Iterator遍历器。Iterator标准规定，所有部署了key值为[Symbol.iterator]，且[Symbol.iterator]的value是标准的Iterator接口函数(标准的Iterator接口函数: 该函数必须返回一个对象，且对象中包含next方法，且执行next()能返回包含value/done属性的Iterator对象)的对象，都称之为可遍历对象，next()后返回的Iterator对象也就是Iterator遍历器。



### 18、for...in 和for...of有什么区别

- ES6规定，有所部署了载了Iterator接口的对象(可遍历对象)都可以通过for...of去遍历，而for..in仅仅可以遍历对象。

- 使用for...of的好处

  - 这也就意味着，数组也可以用for...of遍历，这极大地方便了数组的取值，且避免了很多程序用for..in去遍历数组的恶习。

    上面提到的扩展运算符本质上也就是for..of循环的一种实现。





### 19、module、export、import

- module、export、import是ES6用来统一前端模块化方案的设计思路和实现方案
- 作用
  - export、import的出现统一了前端模块化的实现方案，整合规范了浏览器/服务端的模块化方法，用来取代传统的AMD/CMD、requireJS、seaJS、commondJS等等一系列前端模块不同的实现方案，使前端模块化更加统一规范，JS也能更加能实现大型的应用程序开发。
- 注意
  - import引入的模块是静态加载（编译阶段加载）而不是动态加载（运行时加载）
  - import引入export导出的接口值是动态绑定关系，即通过该接口，可以取到模块内部实时的值





### 20、 Iterator和for...of（Iterator遍历器的实现）

~~~js
//自定义迭代器
let a = makeiterator([1, 2])
function makeiterator(arr) {
    var nextindex = 0
    return {
        next: function () {
            return nextindex < arr.length ?
                {value: arr[nextindex++], done: false} :
                {value: undefined, done: true}
        }
    }
}
~~~

~~~js
// Symbol.iterator遍历器接口
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
~~~



### 21、循环语法比较及使用场景（for、forEach、for...in、for...of）

for循环的速度是最快的,是最老的循环,也是优化得最好的,其次是for-of这个是es6才新增的循环非常好用,最慢是for-in我们可以作一下速度排序 

~~~js
 for > for-of > forEach > filter > map > for-in
~~~


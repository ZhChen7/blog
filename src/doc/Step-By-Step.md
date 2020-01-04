

## 【Step-By-Step】一周面试题深入解析 / 周刊 01 

> 已完结~
>
> 今天 2019/11/04  😜 (ง •_•)ง



### 1.如何正确判断this的指向？(2019-09-19)

如果用一句话说明 this 的指向，那么即是: 谁调用它，this 就指向谁。

但是仅通过这句话，我们很多时候并不能准确判断 this 的指向。因此我们需要借助一些规则去帮助自己：

this 的指向可以按照以下顺序判断:

**1、全局环境中的 this** 

浏览器环境：无论是否在 [严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode) 下，在全局执行环境中（在任何函数体外部）this 都指向全局对象 `window`;

node 环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部），this 都是空对象 `{}`

**2、是否是 `new` 绑定** 

如果是 `new` 绑定，并且构造函数中没有返回 function 或者是 object，那么 this 指向这个新对象。如下:

> 构造函数返回值不是 function 或 object。

```js
function Super(age) {
    this.age = age;
}

let instance = new Super('26');
console.log(instance.age); //26
```



> 构造函数返回值是 function 或 object，这种情况下 this 指向的是返回的对象。

```js
function Super(age) {
    this.age = age;
    let obj = {a: '2'};
    return obj;
}


let instance = new Super('hello');
console.log(instance.age); //undefined
```



你可以想知道为什么会这样？我们来看一下 `new` 的实现原理:

1. 创建一个新对象。
2. 这个新对象会被执行 `[[原型]]` 连接。
3. 属性和方法被加入到 this 引用的对象中。并执行了构造函数中的方法.
4. 如果函数没有返回其他对象，那么 this 指向这个新对象，否则 this 指向构造函数中返回的对象。

```js
function new(func) {
    let target = {};
    target.__proto__ = func.prototype;
    let res = func.call(target);
    //排除 null 的情况
    if (res && typeof(res) == "object" || typeof(res) == "function") 		{
    	return res;
    	}
    return target;
}		
```

**3**、函数是否通过 call,apply 调用，或者使用了 bind 绑定，如果是，那么this绑定的就是指定的对象【归结为显式绑定】。 

```js
function info(){
    console.log(this.age);
}
var person = {
    age: 20,
    info
}
var age = 28;
var info = person.info;
info.call(person);   //20
info.apply(person);  //20
info.bind(person)(); //20
```

这里同样需要注意一种**特殊**情况，如果 call,apply 或者 bind 传入的第一个参数值是 `undefined` 或者 `null`，严格模式下 this 的值为传入的值 null /undefined。非严格模式下，实际应用的默认绑定规则，this 指向全局对象(node环境为global，浏览器环境为window)

```js
function info(){
    //node环境中:非严格模式 global，严格模式为null
    //浏览器环境中:非严格模式 window，严格模式为null
    console.log(this);
    console.log(this.age);
}
var person = {
    age: 20,
    info
}
var age = 28;
var info = person.info;
//严格模式抛出错误；
//非严格模式，node下输出undefined（因为全局的age不会挂在 global 上）
//非严格模式。浏览器环境下输出 28（因为全局的age会挂在 window 上）
info.call(null);
```

**4、**隐式绑定，函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的隐式调用为: `xxx.fn()`

```js
function info(){
    console.log(this.age);
}
var person = {
    age: 20,
    info
}
var age = 28;
person.info(); //20;执行的是隐式绑定
```

**5、** 默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

非严格模式： node环境，执行全局对象 global，浏览器环境，执行全局对象 window。

严格模式：执行 undefined

```js
function info(){
    console.log(this.age);
}
var age = 28;
//严格模式；抛错
//非严格模式，node下输出 undefined（因为全局的age不会挂在 global 上）
//非严格模式。浏览器环境下输出 28（因为全局的age会挂在 window 上）
//严格模式抛出，因为 this 此时是 undefined
info(); 
```

**6、**  箭头函数的情况：

```js
let obj = {
    age: 20,
    info: function() {
        return () => {
            console.log(this.age); //this继承的是外层上下文绑定的this
        }
    }
}

let person = {age: 28};
let info = obj.info();
info(); //20

let info2 = obj.info.call(person);
info2(); //28
```

[点击查看更多](https://github.com/YvetteLau/Step-By-Step/issues/1)



### 2.JS中原始类型有哪几种？null 是对象吗？原始数据类型和复杂数据类型有什么区别？(2019-09-20)

**目前，JS原始类型有六种，分别为:**

- Boolean
- String
- Number
- Undefined
- Null
- Symbol(ES6新增)

ES10新增了一种基本数据类型：BigInt

复杂数据类型只有一种: Object

null 不是一个对象，尽管 `typeof null` 输出的是 `object`，这是一个历史遗留问题，JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，`null` 表示为全零，所以将它错误的判断为 `object` 。

**基本数据类型和复杂数据类型的区别为:** 

1、内存的分配不同

- 基本数据类型存储在栈中。
- 复杂数据类型存储在堆中，栈中存储的变量，是指向堆中的引用地址。

2、访问机制不同

- 基本数据类型是按值访问
- 复杂数据类型按引用访问，JS不允许直接访问保存在堆内存中的对象，在访问一个对象时，首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值。

3、复制变量时不同(a=b)

- 基本数据类型：a=b;是将b中保存的原始值的副本赋值给新变量a，a和b完全独立，互不影响
- 复杂数据类型：a=b;将b保存的对象内存的引用地址赋值给了新变量a;a和b指向了同一个堆内存地址，其中一个值发生了改变，另一个也会改变。

4、参数传递的不同(实参/形参)

函数传参都是按值传递(栈中的存储的内容)：基本数据类型，拷贝的是值；复杂数据类型，拷贝的是引用地址

> [点击查看更多](https://github.com/YvetteLau/Step-By-Step/issues/5) 



### 3.说一说你对HTML5语义化的理解(2019-09-21)

语义化意味着顾名思义，HTML5的语义化指的是合理正确的使用语义化的标签来创建页面结构，如 header,footer,nav，从标签上即可以直观的知道这个标签的作用，而不是滥用div。

**语义化的优点有:** 

- 代码结构清晰，易于阅读，利于开发和维护
- 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
- 有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重
- 

### 4.如何让 (a == 1 && a == 2 && a == 3) 的值为true？(2019-09-22)

> [可参考](https://github.com/YvetteLau/Blog/issues/31) 

**4.1 利用隐式转换规则** 

`==` 操作符在左右数据类型不一致时，会先进行隐式转换。

`a == 1 && a == 2 && a == 3` 的值意味着其不可能是基本数据类型。因为如果 a 是 null 或者是 undefined bool类型，都不可能返回true。

因此可以推测 a 是复杂数据类型，JS 中复杂数据类型只有 `object`，回忆一下，Object 转换为原始类型会调用什么方法？

- 如果部署了 `[Symbol.toPrimitive]` 接口，那么调用此接口，若返回的不是基本数据类型，抛出错误。
- 如果没有部署 `[Symbol.toPrimitive]` 接口，那么根据要转换的类型，先调用 `valueOf` / `toString`
  1. 非Date类型对象，`hint` 是 `default` 时，调用顺序为：`valueOf` >>> `toString`，即`valueOf` 返回的不是基本数据类型，才会继续调用 `toString`，如果`toString` 返回的还不是基本数据类型，那么抛出错误。
  2. 如果 `hint` 是 `string`(Date对象的hint默认是string) ，调用顺序为：`toString` >>> `valueOf`，即`toString` 返回的不是基本数据类型，才会继续调用 `valueOf`，如果`valueOf` 返回的还不是基本数据类型，那么抛出错误。
  3. 如果 `hint` 是 `number`，调用顺序为： `valueOf` >>> `toString`

那么对于这道题，只要 `[Symbol.toPrimitive]` 接口，第一次返回的值是 1，然后递增，即成功成立。

```js
let a = {
    [Symbol.toPrimitive]: (function(hint) {
            let i = 1;
            //闭包的特性之一：i 不会被回收
            return function() {
                return i++;
            }
    })()
}
console.log(a == 1 && a == 2 && a == 3); //true
```

调用 `valueOf` 接口的情况：

```js
let a = {
    valueOf: (function() {
        let i = 1;
        //闭包的特性之一：i 不会被回收
        return function() {
            return i++;
        }
    })()
}
console.log(a == 1 && a == 2 && a == 3); //true
```

另外，除了i自增的方法外，还可以利用 正则，如下

```js
let a = {
    reg: /\d/g,
    valueOf () {
        return this.reg.exec(123)[0]
    }
}
console.log(a == 1 && a == 2 && a == 3); //true
```

**4.2 利用数据劫持** 

使用 `Object.defineProperty` 定义的属性，在获取属性时，会调用 `get` 方法。利用这个特性，我们在 `window` 对象上定义 `a` 属性，如下：

```js
let i = 1;
Object.defineProperty(window, 'a', {
    get: function() {
        return i++;
    }
});
console.log(a == 1 && a == 2 && a == 3); //true
```

ES6 新增了 `Proxy` ，此处我们同样可以利用 `Proxy` 去实现，如下：

```js
let a = new Proxy({}, {
    i: 1,
    get: function () {
        return () => this.i++;
    }
});
console.log(a == 1 && a == 2 && a == 3); // true
```

**4.3 数组的 `toString` 接口默认调用数组的 `join` 方法，重写数组的 `join` 方法。**

```js
let a = [1, 2, 3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3); //true
```

**4.4 利用 `with` 关键字** 

```js
let i = 0;

with ({
    get a() {
        return ++i;
    }
}) {
    console.log(a == 1 && a == 2 && a == 3); //true
}
```



### 5.防抖(debounce)函数的作用是什么？有哪些应用场景，请实现一个防抖函数。(2019-09-23) 

> [可参考第三题 ](http://zxinc520.com/lcj/%225d84756e662e3d49cc2c5b01%22) 

#### 防抖函数的作用

防抖函数的作用就是控制函数在一定时间内的执行次数。防抖意味着N秒内函数只会被执行一次，如果N秒内再次被触发，则重新计算延迟时间。

举例说明：小思最近在减肥，但是她非常贪吃。为此，与其男朋友约定好，如果10天不吃零食，就可以购买一个包(不要问为什么是包，因为包治百病)。但是如果中间吃了一次零食，那么就要重新计算时间，直到小思坚持10天没有吃零食，才能购买一个包。所以，管不住嘴的小思，没有机会买包(悲伤的故事)...这就是**防抖**。

不管吃没吃零食，每10天买一个包，中间想买包，忍着，等到第十天的时候再买，这种情况是**节流**。如何控制女朋友的消费，各位攻城狮们，get到了吗？防抖可比节流有效多了！

#### 防抖应用场景

1. 搜索框输入查询，如果用户一直在输入中，没有必要不停地调用去请求服务端接口，等用户停止输入的时候，再调用，设置一个合适的时间间隔，有效减轻服务端压力。
2. 表单验证
3. 按钮提交事件。
4. 浏览器窗口缩放，resize事件等。



## 【Step-By-Step】一周面试题深入解析 / 周刊 02

> 本周面试题一览:

- 节流(throttle)函数的作用是什么？有哪些应用场景，请实现一个节流函数
- 说一说你对JS执行上下文栈和作用域链的理解？
- 什么是BFC？BFC的布局规则是什么？如何创建BFC？
- let、const、var 的区别有哪些？
- 深拷贝和浅拷贝的区别是什么？如何实现一个深拷贝？



### 6. 节流(throttle)函数的作用是什么？有哪些应用场景，请实现一个节流函数。(2019-09-24)

> **解析**： [可参考第三题 ](http://zxinc520.com/lcj/%225d84756e662e3d49cc2c5b01%22) 

**节流函数的作用：**

节流函数的作用是规定一个单位时间，在这个单位时间内最多只能触发一次函数执行，如果这个单位时间内多次触发函数，只能有一次生效。

举例说明：小明的妈妈和小明约定好，如果小明在周考中取得满分，那么当月可以带他去游乐场玩，但是一个月最多只能去一次。

这其实就是一个节流的例子，在一个月的时间内，去游乐场最多只能触发一次。即使这个时间周期内，小明取得多次满分。

**节流应用场景：** 

1.按钮点击事件

2.拖拽事件

3.onScoll

4.计算鼠标移动的距离(mousemove)

### 7. 说一说你对JS执行上下文栈和作用域链的理解？(2019-09-24)

[JS执行上下文](https://tc39.github.io/ecma262/?nsukey=rQHqMrFpKq6JJN%2F%2FOeubPCslaSTSRyuc%2FXCznnIDze1SGzwva5SZtzixJ13p2gAlxua95Xa7fraZXwj5tyLRDK33%2BpNhyfKR%2FxyzhWNyB%2FqaIlsDGyQBckNoHQGPveOB24M%2BcK%2FgF8Tg1ehUGLWiCvumxdgcQwZOWj2BGfD3n%2FY%3D#sec-execution-contexts)

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。

> 执行上下文类型分为：

- 全局执行上下文
- 函数执行上下文
- eval函数执行上下文(不被推荐)

执行上下文创建过程中，需要做以下几件事:

1. 创建变量对象：首先初始化函数的参数arguments，提升函数声明和变量声明。
2. 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。
3. 确定this的值，即 ResolveThisBinding



**作用域** 

**作用域**负责收集和维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。—— 摘录自《你不知道的JavaScript》(上卷)

作用域有两种工作模型：词法作用域和动态作用域，JS采用的是**词法作用域**工作模型，词法作用域意味着作用域是由书写代码时变量和函数声明的位置决定的。(`with` 和 `eval` 能够修改词法作用域，但是不推荐使用，对此不做特别说明)

> 作用域分为：

- 全局作用域
- 函数作用域
- 块级作用域

**JS执行上下文栈(后面简称执行栈)** 

执行栈，也叫做调用栈，具有 **LIFO** (后进先出) 结构，用于存储在代码执行期间创建的所有执行上下文。

> 规则如下：

- 首次运行JavaScript代码的时候,会创建一个全局执行的上下文并Push到当前的执行栈中，每当发生函数调用，引擎都会为该函数创建一个新的函数执行上下文并Push当前执行栈的栈顶。
- 当栈顶的函数运行完成后，其对应的函数执行上下文将会从执行栈中Pop出，上下文的控制权将移动到当前执行栈的下一个执行上下文。

以一段代码具体说明：

```js
function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
```

`Global Execution Context` (即全局执行上下文)首先入栈，过程如下：

![mark](http://static.zxinc520.com/blog/20190925/KgyYmKIHz7fx.png?imageslim)



**作用域链** 

作用域链就是从当前作用域开始一层一层向上寻找某个变量，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链。

### 8. 什么是BFC？BFC的布局规则是什么？如何创建BFC？(2019-09-25)

> 什么是BFC
>
> BFC 是 Block Formatting Context 的缩写，即块格式化上下文。我们来看一下CSS2.1规范中对 BFC 的说明
>
> 浮动、绝对定位的元素、非块级盒子的块容器（如inline-blocks、table-cells 和 table-captions），以及`overflow`的值不为`visible`（该值已传播到视区时除外）为其内容建立新的块格式上下文。

[BFC布局规则](https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#block-formatting)

- BFC内，盒子依次垂直排列。
- BFC内，两个盒子的垂直距离由 `margin` 属性决定。属于同一个BFC的两个相邻Box的margin会发生重叠【符合合并原则的margin合并后是使用大的margin】
- BFC内，每个盒子的左外边缘接触内部盒子的左边缘（对于从右到左的格式，右边缘接触）。即使在存在浮动的情况下也是如此。除非创建新的BFC。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算。

**如何创建BFC** 

- 根元素
- 浮动元素（float 属性不为 none）
- position 为 absolute 或 relative
- overflow 不为 visible 的块元素
- display 为 inline-block, table-cell, table-caption

**BFC的应用** 

1. 防止 margin 重叠

根据BFC规则，同一个BFC内的两个两个相邻Box的 `margin` 会发生重叠，因此我们可以在div外面再嵌套一层容器，并且触发该容器生成一个 BFC，这样 `<div class="a"></div>` 就会属于两个 BFC，自然也就不会再发生 `margin` 重叠

```HTML
<style>
    .a{
        height: 100px;
        width: 100px;
        margin: 50px;
        background: pink;
    }
    .container{
        overflow: auto; /*触发生成BFC*/
    }
</style>
<body>
    <div class="container">
        <div class="a"></div>
    </div>    
    <div class="a"></div>
</body>
```



2. 清除内部浮动

```HTML
<style>
    <style>
    .a{
        height: 100px;
        width: 100px;
        margin: 10px;
        background: pink;
        float: left;
    }
    .container{
        width: 120px;
        display: inline-block;/*触发生成BFC*/
        border: 2px solid black; 
    }
</style>
</style>
<body>
    <div class="container">
        <div class="a"></div>
    </div>
</body>
```

container 的高度没有被撑开，如果我们希望 container 的高度能够包含浮动元素，那么可以创建一个新的 BFC，因为根据 BFC 的规则，计算 BFC 的高度时，浮动元素也参与计算。

3. 自适应多栏布局

```HTML
<style>
    body{
        width: 500px;
    }
    .a{
        height: 150px;
        width: 100px;
        background: pink;
        float: left;
    }
    .b{
        height: 200px;
        overflow: hidden; /*触发生成BFC*/
        background: blue;
    }
</style>
<body>
    <div class="a"></div>
    <div class="b"></div>
</body>   
```



![mark](http://static.zxinc520.com/blog/20190925/zIMIHi7uVOq6.png?imageslim)

> 加了 `overflow: hidden;` 触发生成 BFC

![mark](http://static.zxinc520.com/blog/20190925/BFiWOckmwL9V.png?imageslim)





### 9. let、const、var 的区别有哪些？(2019-09-26)

![mark](http://static.zxinc520.com/blog/20190926/0imlOVJDQTTd.png?imageslim)



1. let/const 定义的变量不会出现变量提升，而 var 定义的变量会提升。
2. 相同作用域中，let 和 const 不允许重复声明，var 允许重复声明。
3. cosnt 声明变量时必须设置初始值
4. const 声明一个只读的常量，这个常量不可改变
5. let/const 声明的变量仅在块级作用域中有效。而 var 声明的变量在块级作用域外仍能访问到。
6. 顶层作用域中 var 声明的变量挂在window上(浏览器环境)
7. let/const有暂时性死区的问题，即let/const 声明的变量，在定义之前都是不可用的。如果使用会抛出错误。



### 10. 深拷贝和浅拷贝的区别是什么？如何实现一个深拷贝？(2019-09-27)

> 深拷贝和浅拷贝是针对复杂数据类型来说的。

**深拷贝**

> 深拷贝复制变量值，对于非基本类型的变量，则递归至基本类型变量后，再复制。 深拷贝后的对象与原来的对象是完全隔离的，互不影响，对一个对象的修改并不会影响另一个对象。

**浅拷贝**

> 浅拷贝是会将对象的每个属性进行依次复制，但是当对象的属性值是引用类型时，实质复制的是其引用，当引用指向的值改变时也会跟着变化。

可以使用 `for in`、 `Object.assign`、 扩展运算符 `...` 、`Array.prototype.slice()`、`Array.prototype.concat()` 等，例如:

```js
let obj = {
    name: 'Yvette',
    age: 18,
    hobbies: ['reading', 'photography']
}
let obj2 = Object.assign({}, obj);
let obj3 = {...obj};

obj.name = 'Jack';
obj.hobbies.push('coding');
console.log(obj);//{ name: 'Jack', age: 18,hobbies: [ 'reading', 'photography', 'coding' ] }
console.log(obj2);//{ name: 'Yvette', age: 18,hobbies: [ 'reading', 'photography', 'coding' ] }
console.log(obj3);//{ name: 'Yvette', age: 18,hobbies: [ 'reading', 'photography', 'coding' ] }
```

可以看出浅拷贝只最第一层属性进行了拷贝，当第一层的属性值是基本数据类型时，新的对象和原对象互不影响，但是如果第一层的属性值是复杂数据类型，那么新对象和原对象的属性值其指向的是同一块内存地址。来看一下使用 `for in` 实现浅拷贝。

```js
let obj = {
    name: 'Yvette',
    age: 18,
    hobbies: ['reading', 'photography']
}
let newObj = {};
for(let key in obj){
    newObj[key] = obj[key]; 
    //这一步不需要多说吧，复杂数据类型栈中存的是对应的地址，因此赋值操作，相当于两个属性值指向同一个内存空间
}
console.log(newObj);
//{ name: 'Yvette', age: 18, hobbies: [ 'reading', 'photography' ] }
obj.age = 20;
obj.hobbies.pop();
console.log(newObj);
//{ name: 'Yvette', age: 18, hobbies: [ 'reading' ] }
```



**深拷贝实现**

> 深拷贝最简单的实现是: `JSON.parse(JSON.stringify(obj))`

```js
let obj = {
    name: 'Yvette',
    age: 18,
    hobbies: ['reading', 'photography']
}
let newObj = JSON.parse(JSON.stringify(obj));//newObj和obj互不影响
obj.hobbies.push('coding');
console.log(newObj);//{ name: 'Yvette', age: 18, hobbies: [ 'reading', 'photography' ] }
```

`JSON.parse(JSON.stringify(obj))` 是最简单的实现方式，但是有一点缺陷：

1. 对象的属性值是函数时，无法拷贝。

```js
let obj = {
    name: 'Yvette',
    age: 18,
    hobbies: ['reading', 'photography'],
    sayHi: function() {
        console.log(sayHi);
    }
}
let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj);//{ name: 'Yvette', age: 18, hobbies: [ 'reading', 'photography' ] }
```

2. 原型链上的属性无法获取

```js
function Super() {

}
Super.prototype.location = 'NanJing';
function Child(name, age, hobbies) {
    this.name = name;
    this.age = age;
}
Child.prototype = new Super();

let obj = new Child('Yvette', 18);
console.log(obj.location); //NanJing
let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj);//{ name: 'Yvette', age: 18}
console.log(newObj.location);//undefined;原型链上的属性无法获取
```

3.不能正确的处理 Date 类型的数据

4.不能处理 RegExp

5.会忽略 symbol

6.会忽略 undefined



> 2.实现一个 deepClone 函数

1. 如果是基本数据类型，直接返回
2. 如果是 `RegExp` 或者 `Date` 类型，返回对应类型
3. 如果是复杂数据类型，递归。

```js
function deepClone(obj) { //递归拷贝
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
    let t = new obj.constructor();
    for(let key in obj) {
        //如果 obj[key] 是复杂数据类型，递归
        if(obj.hasOwnProperty(key)){//是否是自身的属性
            t[key] = deepClone(obj[key]);
        }
    }
    return t;
}
```

测试:

```js
function Super() {

}
Super.prototype.location = 'NanJing';
function Child(name, age, hobbies) {
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
}
Child.prototype = new Super();

let obj = new Child('Yvette', 18, ['reading', 'photography']);
obj.sayHi = function () {
    console.log('hi');
}
console.log(obj.location); //NanJing
let newObj = deepClone(obj);
console.log(newObj);//
console.log(newObj.location);//NanJing 可以获取到原型链上的属性
newObj.sayHi();//hi 函数属性拷贝正常
```



## 【Step-By-Step】一周面试题深入解析 / 周刊03

> 本周面试题一览:

- 什么是XSS攻击，XSS 攻击可以分为哪几类？我们如何防范XSS攻击？
- 如何隐藏页面中的某个元素？
- 浏览器事件代理机制的原理是什么？
- setTimeout 倒计时为什么会出现误差？

### 11. 什么是XSS攻击，XSS攻击可以分为哪几类？我们如何防范XSS攻击？（2019-09-28）

> [源地址](https://github.com/YvetteLau/Blog/issues/33) 

**1. XSS攻击** 

XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。

XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，利用这些信息冒充用户向网站发起攻击者定义的请求。

**XSS分类** 

根据攻击的来源，XSS攻击可以分为存储型(持久性)、反射型(非持久型)和DOM型三种。下面我们来详细了解一下这三种XSS攻击：



> 1.1 反射型XSS

当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。Web服务器将注入脚本，比如一个错误信息，搜索结果等，未进行过滤直接返回到用户的浏览器上。

> 反射型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 `URL`，其中包含恶意代码。
2. 用户打开带有恶意代码的 `URL` 时，网站服务端将恶意代码从 `URL` 中取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

反射型 XSS 漏洞常见于通过 `URL` 传递参数的功能，如网站搜索、跳转等。由于需要用户主动打开恶意的 `URL` 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。

如果不希望被前端拿到cookie，后端可以设置 `httpOnly` (不过这不是 `XSS攻击` 的解决方案，只能降低受损范围)

> 如何防范反射型XSS攻击

**对字符串进行编码。**

对url的查询参数进行转义后再输出到页面

```js
app.get('/welcome', function(req, res) {
    //对查询参数进行编码，避免反射型 XSS攻击
    res.send(`${encodeURIComponent(req.query.type)}`); 
});
```



> 1.2 DOM 型 XSS

DOM 型 XSS 攻击，实际上就是前端 `JavaScript` 代码不够严谨，把不可信的内容插入到了页面。在使用 `.innerHTML`、`.outerHTML`、`.appendChild`、`document.write()`等API时要特别小心，不要把不可信的数据作为 HTML 插到页面上，尽量使用 `.innerText`、`.textContent`、`.setAttribute()` 等。

> DOM 型 XSS 的攻击步骤：

1. 攻击者构造出特殊数据，其中包含恶意代码。
2. 用户浏览器执行了恶意代码。
3. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

> 如何防范 DOM 型 XSS 攻击

防范 DOM 型 XSS 攻击的核心就是对输入内容进行转义(DOM 中的内联事件监听器和链接跳转都能把字符串作为代码运行，需要对其内容进行检查)。

1.对于`url`链接(例如图片的`src`属性)，那么直接使用 `encodeURIComponent` 来转义。

2.非`url`，我们可以这样进行编码：

```js
function encodeHtml(str) {
    return str.replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
```

DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞。



> 1.3 存储型XSS

恶意脚本永久存储在目标服务器上。当浏览器请求数据时，脚本从服务器传回并执行，影响范围比反射型和DOM型XSS更大。存储型XSS攻击的原因仍然是没有做好数据过滤：前端提交数据至服务端时，没有做好过滤；服务端在接受到数据时，在存储之前，没有做过滤；前端从服务端请求到数据，没有过滤输出

> 存储型 XSS 的攻击步骤：

1. 攻击者将恶意代码提交到目标网站的数据库中。
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

> 如何防范存储型XSS攻击：

1. 前端数据传递给服务器之前，先转义/过滤(防范不了抓包修改数据的情况)
2. 服务器接收到数据，在存储到数据库之前，进行转义/过滤
3. 前端接收到服务器传递过来的数据，在展示到页面前，先进行转义/过滤

**除了谨慎的转义，我们还需要其他一些手段来防范XSS攻击:**

**1.Content Security Policy**

在服务端使用 HTTP的 `Content-Security-Policy` 头部来指定策略，或者在前端设置 `meta` 标签。

例如下面的配置只允许加载同域下的资源：

```js
Content-Security-Policy: default-src 'self'
```

```html
<meta http-equiv="Content-Security-Policy" content="form-action 'self';">
```

前端和服务端设置 CSP 的效果相同，但是`meta`无法使用`report`

严格的 CSP 在 XSS 的防范中可以起到以下的作用：

1. 禁止加载外域代码，防止复杂的攻击逻辑。
2. 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
3. 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
4. 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
5. 合理使用上报可以及时发现 XSS，利于尽快修复问题。

**2.输入内容长度控制**

对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。

**3.输入内容限制**

对于部分输入，可以限定不能包含特殊字符或者仅能输入数字等。

**4.其他安全措施**

- HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
- 验证码：防止脚本冒充用户提交危险操作。

> [点击查看更多](https://github.com/YvetteLau/Step-By-Step/issues/18)





### 12.如何隐藏页面中的某个元素？（2019-09-29）

**隐藏类型：** 

屏幕并不是唯一的输出机制，比如说屏幕上看不见的元素（隐藏的元素），其中一些依然能够被读屏软件阅读出来（因为读屏软件依赖于可访问性树来阐述）。为了消除它们之间的歧义，我们将其归为三大类：

- 完全隐藏：元素从渲染树中消失，不占据空间。
- 视觉上的隐藏：屏幕中不可见，占据空间。
- 语义上的隐藏：读屏软件不可读，但正常占据空。



完全隐藏：

1. `display` 属性(不占据空间)

HTML5 新增属性，相当于 `display: none`

```html
<div hidden></div>
```

2. hidden 属性 (不占据空间)



视觉上的隐藏：

**利用 `position` 和 盒模型 将元素移出可视区范围**

1. 设置 `posoition` 为 `absolute` 或 `fixed`，�通过设置 `top`、`left` 等值，将其移出可视区域。(可视区域不占位)

2. 设置 `position` 为 `relative`，通过设置 `top`、`left` 等值，将其移出可视区域。（可视区域占位）；如希望其在可视区域不占位置，需同时设置 `height: 0`;

3. 设置 margin 值，将其移出可视区域范围（可视区域占位）；如果希望其在可视区域不占位，需同时设置 `height: 0`;

   

**利用 transfrom** 

1. 缩放

```css
transform: scale(0);
```

2. 移动 `translateX`, `translateY`

```css
transform: translateX(-99999px);

```

3. 旋转 `rotate`

```css
transform: rotateY(90deg);

```



**设置其大小为0** 

1. 宽高为0，字体大小为0

```css
height: 0;
width: 0;
font-size: 0;

```

2. 宽高为0，超出隐藏

```css
height: 0;
width: 0;
overflow: hidden;

```



设置透明度为0

`visibility`属性

层级覆盖，`z-index` 属性

```css
position: relative;
z-index: -999;

```

再设置一个层级较高的元素覆盖在此元素上。

clip-path 裁剪

```css
clip-path: polygon(0 0, 0 0, 0 0, 0 0);

```



### 13.浏览器事件代理机制的原理是什么？（2019-09-30）

**事件代理机制的原理** 

事件代理又称为事件委托，在祖先级 DOM 元素绑定一个事件，当触发子孙级DOM元素的事件时，利用事件冒泡的原理来触发绑定在祖先级 DOM 的事件。因为事件会从目标元素一层层冒泡至 document 对象。

**为什么要事件代理？** 

1. 添加到页面上的事件数量会影响页面的运行性能，如果添加的事件过多，会导致网页的性能下降。采用事件代理的方式，可以大大减少注册事件的个数。
2. 事件代理的当时，某个子孙元素是动态增加的，不需要再次对其进行事件绑定。
3. 不用担心某个注册了事件的DOM元素被移除后，可能无法回收其事件处理程序，我们只要把事件处理程序委托给更高层级的元素，就可以避免此问题。
4. 允许给一个事件注册多个监听。
5. 提供了一种更精细的手段控制 `listener` 的触发阶段(可以选择捕获或者是冒泡)。
6. 对任何 `DOM` 元素都是有效的，而不仅仅是对 `HTML` 元素有效。



[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) : 

addEventListener 接受3个参数，分别是要处理的事件名、实现了 EventListener 接口的对象或者是一个函数、一个对象/一个布尔值

```js
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);

```

**options(对象) | 可选**

- capture: `Boolean`。true 表示在捕获阶段触发，false表示在冒泡阶段触发。默认是 false。
- once:`Boolean`。true 表示listener 在添加之后最多只调用一次，listener 会在其被调用之后自动移除。默认是 false。
- passive: `Boolean`。true 表示 listener 永远不会调用 `preventDefault()`。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。默认是 false。

**useCapture(Boolean) | 可选**

`useCapture` 默认为 false。表示冒泡阶段调用事件处理程序，若设置为 true，表示在捕获阶段调用事件处理程序。

> 如将页面中的所有click事件都代理到document上:

```js
document.addEventListener('click', function (e) {
    console.log(e.target);
    /**
    * 捕获阶段调用调用事件处理程序，eventPhase是 1; 
    * 处于目标，eventPhase是2 
    * 冒泡阶段调用事件处理程序，eventPhase是 3；
    */ 
    console.log(e.eventPhase);
    
}, false);

```

与 `addEventListener` 相对应的是 `removeEventListener`,用于移除事件监听。

### 14. setTimeout 倒计时为什么会出现误差？ （2019-10-08）

`setTimeout` 只能保证延时或间隔不小于设定的时间。因为它实际上只是将回调添加到了宏任务队列中，但是如果主线程上有任务还没有执行完成，它必须要等待。

如果你对前面这句话不是非常理解，那么有必要了解一下 JS的运行机制。

**JS的运行机制** 

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在"任务队列"(task queue)。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

如 `setTimeout(()=>{callback();}, 1000)` ，即表示在1s之后将 `callback` 放到宏任务队列中，当1s的时间到达时，如果主线程上有其它任务在执行，那么 `callback` 就必须要等待，另外 `callback` 的执行也需要时间，因此 `setTimeout` 的时间间隔是有误差的，它只能保证延时不小于设置的时间。

**如何减少 `setTimeout` 的误差** 

我们只能减少执行多次的 `setTimeout` 的误差，例如倒计时功能。

倒计时的时间通常都是从服务端获取的。造成误差的原因：

1.没有考虑误差时间（函数执行的时间/其它代码的阻塞）

2.没有考虑浏览器的“休眠”

完全消除 `setTimeout`的误差是不可能的，但是我们减少 `setTimeout` 的误差。通过对下一次任务的调用时间进行修正，来减少误差。

```js
let count = 0;
let countdown = 5000; //服务器返回的倒计时时间
let interval = 1000;
let startTime = new Date().getTime();
let timer = setTimeout(countDownStart, interval); //首次执行
//定时器测试
function countDownStart() {
    count++;
    const offset = new Date().getTime() - (startTime + count * 1000);
    const nextInterval = interval - offset; //修正后的延时时间
    if (nextInterval < 0) {
        nextInterval = 0;
    }
    countdown -= interval;
    console.log("误差：" + offset + "ms，下一次执行：" + nextInterval + "ms后，离活动开始还有：" + countdown + "ms");
    if (countdown <= 0) {
        clearTimeout(timer);
    } else {
        timer = setTimeout(countDownStart, nextInterval);
    }
}

```

如果当前页面是不可见的，那么倒计时会出现大于100ms的误差时间。因此在页面显示时，应该重新从服务端获取剩余时间进行倒计时。当然，为了更好的性能，当倒计时不可见(Tab页切换/倒计时内容不在可视区时)，可以选择停止倒计时。

为此，我们可以监听 `visibityChange` 事件进行处理。

> [点击查看更多](https://github.com/YvetteLau/Step-By-Step/issues/21)





## 【Step-By-Step】一周面试题深入解析 / 周刊04

> 本周面试题一览:

- [什么是闭包？闭包的作用是什么？](https://github.com/YvetteLau/Blog/issues/34)
- 实现 Promise.all 方法
- 异步加载 js 脚本的方法有哪些？
- 请实现一个 flattenDeep 函数，把嵌套的数组扁平化
- 可迭代对象有什么特点？



### 15. 什么是闭包？闭包的作用是什么？ （2019-10-09）

**什么是闭包？** 

闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包最常用的方式就是在一个函数内部创建另一个函数。

**闭包的作用：** 

1. 能够访问函数定义时所在的词法作用域(阻止其被回收)。
2. 私有化变量

```js
function base() {
    let x = 10; //私有变量
    return {
        getX: function() {
            return x;
        }
    }
}
let obj = base();
console.log(obj.getX()); //10

```

3. 模拟块级作用域

```js
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = (function(j){
        return function () {
            console.log(j);
        }
    })(i);
}
a[6](); // 6

```

4. 创建模块

```js
function coolModule() {
    let name = 'Yvette';
    let age = 20;
    function sayName() {
        console.log(name);
    }
    function sayAge() {
        console.log(age);
    }
    return {
        sayName,
        sayAge
    }
}
let info = coolModule();
info.sayName(); //'Yvette'

```

模块模式具有两个必备的条件(来自《你不知道的JavaScript》)

- 必须有外部的封闭函数，该函数必须至少被调用一次(每次调用都会创建一个新的模块实例)
- 封闭函数必须返回至少**一个**内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

闭包的缺点

闭包会导致函数的变量一直保存在内存中，过多的闭包可能会导致内存泄漏



### 16. 实现 Promise.all 方法 （2019-10-10）

在实现 Promise.all 方法之前，我们首先要知道 Promise.all 的功能和特点，因为在清楚了 Promise.all 功能和特点的情况下，我们才能进一步去写实现。

**Promise.all 功能**

`Promise.all(iterable)` 返回一个新的 Promise 实例。此实例在 `iterable` 参数内所有的 `promise` 都 `fulfilled` 或者参数中不包含 `promise` 时，状态变成 `fulfilled`；如果参数中 `promise` 有一个失败`rejected`，此实例回调失败，失败原因的是第一个失败 `promise` 的返回结果。

```js
let p = Promise.all([p1, p2, p3]);

```

p的状态由 p1,p2,p3决定，分成以下；两种情况：

（1）只有p1、p2、p3的状态都变成 `fulfilled`，p的状态才会变成 `fulfilled`，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被 `rejected`，p的状态就变成 `rejected`，此时第一个被reject的实例的返回值，会传递给p的回调函数。

**Promise.all 的特点**

> Promise.all 的返回值是一个 promise 实例

- 如果传入的参数为空的可迭代对象，`Promise.all` 会 **同步** 返回一个已完成状态的 `promise`
- 如果传入的参数中不包含任何 promise,`Promise.all` 会 **异步** 返回一个已完成状态的 `promise`
- 其它情况下，`Promise.all` 返回一个 **处理中（pending）** 状态的 `promise`.

> Promise.all 返回的 promise 的状态

- 如果传入的参数中的 promise 都变成完成状态，`Promise.all` 返回的 `promise` 异步地变为完成。
- 如果传入的参数中，有一个 `promise` 失败，`Promise.all` 异步地将失败的那个结果给失败状态的回调函数，而不管其它 `promise` 是否完成
- 在任何情况下，`Promise.all` 返回的 `promise` 的完成状态的结果都是一个数组

**Promise.all 实现** 

```js
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        //Array.from 将可迭代对象转换成数组
        promises = Array.from(promises);
        if (promises.length === 0) {
            resolve([]);
        } else {
            let result = [];
            let index = 0;
            for (let i = 0;  i < promises.length; i++ ) {
                //考虑到 i 可能是 thenable 对象也可能是普通值
                Promise.resolve(promises[i]).then(data => {
                    result[i] = data;
                    if (++index === promises.length) {
                        //所有的 promises 状态都是 fulfilled，promise.all返回的实例才变成 fulfilled 态
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                    return;
                });
            }
        }
    });
}

```



### 17. 异步加载 js 脚本的方法有哪些？ （2019-10-11）

1. `<script>` 标签中增加 `async`(html5) 或者 `defer`(html4) 属性,脚本就会异步加载。

```js
<script src="../XXX.js" defer></script>

```

`defer` 和 `async` 的区别在于：

- `defer` 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），在window.onload 之前执行；
- `async` 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
- 如果有多个 `defer` 脚本，会按照它们在页面出现的顺序加载
- 多个 `async` 脚本不能保证加载顺序



2. 动态创建 `script` 标签

动态创建的 `script` ，设置 `src` 并不会开始下载，而是要添加到文档中，JS文件才会开始下载。

```js
let script = document.createElement('script');
script.src = 'XXX.js';
// 添加到html文件中才会开始下载
document.body.append(script);

```



3. XHR 异步加载JS

```js
let xhr = new XMLHttpRequest();
xhr.open("get", "js/xxx.js",true);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        eval(xhr.responseText);
    }
}

```



### 18. 请实现一个 flattenDeep 函数，把嵌套的数组扁平化 （2019-10-13）

**解析：** 

1. 利用 `Array.prototype.flat` 

ES6 为数组实例新增了 `flat` 方法，用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数组没有影响。

`flat` 默认只会 “拉平” 一层，如果想要 “拉平” 多层的嵌套数组，需要给 `flat` 传递一个整数，表示想要拉平的层数。

```js
function flattenDeep(arr, deepLength) {
    return arr.flat(deepLength);
}
console.log(flattenDeep([1, [2, [3, [4]], 5]], 3));

```

```js
function flattenDeep(arr) {
    // return arr.join(',').split(',').map(Number);
    return arr.toString().split(',').map(Number);
}
console.log(flattenDeep([1, [2, [3, [4]], 5]]));

```

2. 利用 reduce 和 concat:

```js
function flattenDeep(arr){
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
console.log(flattenDeep([1, [2, [3, [4]], 5]]));

```

3. 使用 stack 无限反嵌套多层嵌套数组

```js
function flattenDeep(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // 使用 pop 从 stack 中取出并移除值
        const next = stack.pop();
        if (Array.isArray(next)) {
            // 使用 push 送回内层数组中的元素，不会改动原始输入 original input
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    // 使用 reverse 恢复原数组的顺序
    return res.reverse();
}
console.log(flattenDeep([1, [2, [3, [4]], 5]]));

```



### 19. 可迭代对象有什么特点  （2019-10-14）

ES6 规定，默认的 `Iterator` 接口部署在数据结构的 `Symbol.iterator` 属性，换个角度，也可以认为，一个数据结构只要具有 `Symbol.iterator` 属性(`Symbol.iterator` 方法对应的是遍历器生成函数，返回的是一个遍历器对象)，那么就可以其认为是可迭代的。

**可迭代对象的特点** 

- 具有 `Symbol.iterator` 属性，`Symbol.iterator()` 返回的是一个遍历器对象
- 可以使用 `for ... of` 进行循环

```js
let array = [1, 2, 3, 4];
let iter = array[Symbol.iterator]();
console.log(iter.next()); //{ value: 1, done: false }
console.log(iter.next()); //{ value: 2, done: false }
console.log(iter.next()); //{ value: 3, done: false }

```

原生具有 `Iterator` 接口的数据结构：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

#### 自定义一个可迭代对象

上面我们说，一个对象只有具有正确的 `Symbol.iterator` 属性，那么其就是可迭代的，因此，我们可以通过给对象新增 `Symbol.iterator` 使其可迭代

```js
let obj = {
    name: "Yvette",
    age: 18,
    job: 'engineer',
    *[Symbol.iterator]() {
        const self = this;
        const keys = Object.keys(self);
        for (let index = 0; index < keys.length; index++) {
            yield self[keys[index]];//yield表达式仅能使用在 Generator 函数中
        }
    }
};

for (var key of obj) {
    console.log(key); //Yvette 18 engineer
}

```



## 【Step-By-Step】高频面试题深入解析 / 周刊05 本周面试题一览:

> 本周面试题一览:
>
> #### 

- 实现 Promise.race 方法
- JSONP 原理及简单实现
- 实现一个数组去重的方法
- 清楚浮动的方法有哪些
- 编写一个通用的柯里化函数 currying



### 20. 实现 Promise.race 方法（2019-10-16）

在实现 `Promise.race` 方法之前，我们首先要知道 `Promise.race` 的功能和特点，因为在清楚了 `Promise.race` 功能和特点的情况下，我们才能进一步去写实现。

**Promise.race 功能**

`Promise.race(iterable)` 返回一个 promise，一旦 `iterable` 中的一个 `promise` 状态是 `fulfilled` / `rejected` ，那么 `Promise.race` 返回的 `promise` 状态是 `fulfilled` / `rejected`.

```js
let p = Promise.race([p1, p2, p3]);

```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给 p 的回调函数。

**Promise.race 的特点**

> Promise.race 的返回值是一个 promise 实例

- 如果传入的参数为空的可迭代对象，那么 `Promise.race` 返回的 `promise` 永远是 `pending` 态
- 如果传入的参数中不包含任何 `promise`，`Promise.race` 会返回一个处理中（pending）的 `promise`
- 如果 `iterable` 包含一个或多个非 `promise` 值或已经解决的promise，则 `Promise.race` 将解析为 `iterable` 中找到的第一个值。

**Promise.race 的实现**

```js
Promise.race = function (promises) {
    //promises传入的是可迭代对象(省略参数合法性判断)
    promises = Array.from(promises);//将可迭代对象转换为数组
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            //空的可迭代对象;
            //用于在pending态
        } else {
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then((data) => {
                    resolve(data);
                }).catch((reason) => {
                    reject(reason);
                })
            }
        }
    });
}

```





### 21. JSONP原理及简单实现 (2019-10-17)

尽管浏览器有同源策略，但是 `<script>` 标签的 `src` 属性不会被同源策略所约束，可以获取任意服务器上的脚本并执行。`jsonp` 通过插入 `script` 标签的方式来实现跨域，参数只能通过 `url` 传入，仅能支持 `get` 请求。

**实现原理:** 

- Step1: 创建 callback 方法
- Step2: 插入 script 标签
- Step3: 后台接受到请求，解析前端传过去的 callback 方法，返回该方法的调用，并且数据作为参数传入该方法
- Step4: 前端执行服务端返回的方法调用



**jsonp源码实现** 

```js
function jsonp({url, params, callback}) {
    return new Promise((resolve, reject) => {
        //创建script标签
        let script = document.createElement('script');
        //将回调函数挂在 window 上
        window[callback] = function(data) {
            resolve(data);
            //代码执行后，删除插入的script标签
            document.body.removeChild(script);
        }
        //回调函数加在请求地址上
        params = {...params, callback} //wb=b&callback=show
        let arrs = [];
        for(let key in params) {
            arrs.push(`${key}=${params[key]}`);
        }
        script.src = `${url}?${arrs.join('&')}`;
        document.body.appendChild(script);
    });
}

```

使用:

```js
function show(data) {
    console.log(data);
}
jsonp({
    url: 'http://localhost:3000/show',
    params: {
        //code
    },
    callback: 'show'
}).then(data => {
    console.log(data);
})

```

服务端代码(node):

```js
//express启动一个后台服务
let express = require('express');
let app = express();

app.get('/show', (req, res) => {
    let {callback} = req.query; //获取传来的callback函数名，callback是key
    res.send(`${callback}('Hello!')`);
});
app.listen(3000);

```



### 22、实现一个数组去重的方法 (2019-10-18)

1. 法1: 利用ES6新增数据类型 `Set ` ：[...new Set(arry)
2. 利用 `indexOf` `includes`

```js
function uniq(arry) {
    var result = [];
    for (var i = 0; i < arry.length; i++) {
        if (result.indexOf(arry[i]) === -1) {
            //如 result 中没有 arry[i],则添加到数组中
            result.push(arry[i])
        }
    }
    return result;
}

```

3. 利用 `reduce`

```js
function uniq(arry) {
    return arry.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
}

```

4. 利用 `Map`

```js
function uniq(arry) {
    let map = new Map();
    let result = new Array();
    for (let i = 0; i < arry.length; i++) {
        if (map.has(arry[i])) {
            map.set(arry[i], true);
        } else {
            map.set(arry[i], false);
            result.push(arry[i]);
        }
    }
    return result;
}

```



### 23、清除浮动的方法有哪些？ (2019-10-20)

**解析：** 

总体来说就两点吧：

1. 利用 clear 元素
2. 利用 BFC 布局规则





### 24. 编写一个通用的柯里化函数 currying   (2019-10-20)

在开始之前，我们首先需要搞清楚函数[柯里化](https://github.com/mqyqingfeng/Blog/issues/42)的概念。

> curry 的这种用途可以理解为：参数复用。本质上是降低通用性，提高适用性。

函数柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

```js
const currying = (fn, ...args) =>
    args.length < fn.length
        //参数长度不足时，重新柯里化该函数，等待接受新参数
        ? (...arguments) => currying(fn, ...args, ...arguments)
        //参数长度满足时，执行函数
        : fn(...args);
function sumFn(a, b, c) {
    return a + b + c;
}
var sum = currying(sumFn);
console.log(sum(2)(3)(5));//10
console.log(sum(2, 3, 5));//10
console.log(sum(2)(3, 5));//10
console.log(sum(2, 3)(5));//10

```

> 函数柯里化的主要作用：

- 参数复用
- 提前返回 – 返回接受余下的参数且返回结果的新函数
- 延迟执行 – 返回新函数，等待执行



## 【Step-By-Step】高频面试题深入解析 / 周刊06 

> 本周面试题一览:

- 原型链继承的基本思路是什么？有什么优缺点？
- 借用构造函数和组合继承基本思路是什么？有什么优缺点？
- 原型式继承的基本思路是什么？有什么优缺点？
- 寄生式继承的基本思路是什么？有什么优缺点？
- 寄生组合式继承的基本思路是什么？有什么优缺点？

本周是继承专题，在开始之前，需要先了解构造函数、原型和原型链的相关知识。



#### 构造函数

构造函数和普通函数的区别仅在于调用它们的方式不同，任何函数，只要通过 `new` 操作符来调用，那它就可以作为构造函数；任何函数，如果不通过 `new` 操作符来调用，那么它就是一个普通函数。

实例拥有 `constructor(构造函数)` 属性，该属性返回创建实例对象的构造函数。

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var Yvette = new Person('刘小夕', 20);
console.log(Yvette.constructor === Person); //true

```

有一点需要说明的是，除了基本数据类型的 `constructor` 外( `null` 和 `undefined` 无 `constructor` 属性)，`constructor` 属性是可以被重写的。因此检测对象类型时，`instanceof` 操作符比 `contsrutor` 更可靠一些。

```js
function Person(name) {
    this.name = name;
}
function SuperType() { }
var Yvette = new Person('刘小夕');
console.log(Yvette.constructor); //[Function: Person]
Yvette.constructor = SuperType;
console.log(Yvette.constructor); //[Function: SuperType]

```





#### 原型

我们创建的每个函数都有 `prototype` 属性，这个属性指向函数的原型对象。原型对象的**用途**是包含可以由特定类型的所有实例共享的属性和方法。

在默认情况下，所有原型对象都会自动获得一个 `constructor` 属性，这个属性包含一个指向 `prototype` 属性所在函数的指针。

当调用构造函数创建一个新实例后，该实例的内部将包含一个指针，指向构造函数的原型对象(可以通过实例的 [`__proto__`](https://www.zhihu.com/question/34183746) 来访问构造函数的原型对象)。 [参考](https://www.zhihu.com/question/34183746)

```js
function f() {}
f.prototype.sayhi=function (name) {
    this.name=name
}

var a=new f()
console.log(f.prototype)  //f { sayhi: [Function] }
console.log(f.prototype.constructor) //[Function: f]
console.log(a.__proto__)  //f { sayhi: [Function] }
console.log(f.__proto__)  //[Function]


```

总结：
1.对象有属性__proto__,指向该对象的构造函数的原型对象。
2.方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。

讲完啦，欢迎各种批评指正完善探讨，共同进步~

![](https://camo.githubusercontent.com/16602b6909621ce63a882221389c062c4d032256/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434534366564343366333030363430353439383465356332346466373930393962312f3239353432)



#### 原型链

简单回顾一下构造函数、原型和实例的关系：

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个可以执行原型对象的内部指针(可以通过 `__proto` 访问)。

假如我们让原型对象等于另一个类型的实例，那么此时原型对象包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。加入另一个原型又是另一个类型的实例，那么上述关系仍然成立，如此层层递进，就构成了实例与原型的链条，这就是原型链的基本概念

```js
function SuperType() {
    this.type = 'animal'
}
SuperType.prototype.getType = function() {
    console.log(this.type);
}
function SubType() {

}
SubType.prototype = new SuperType();
SubType.prototype.sayHello = function() {
    console.log('hello');
}
function SimType(name) {
    this.name = name;
}
SimType.prototype = new SubType();
SimType.prototype.sayHi = function() {
    console.log('hi');
}
var instance = new SimType('刘小夕');
instance.getType(); //animal

```

![](https://camo.githubusercontent.com/bb69ed50e52bf2d899a093cbe685074f28cacc0f/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434565333233613738316338613737653239363833373531643965333236653139342f3239353434)

调用 `instance.getType()` 会调用以下的搜索步骤:

1. 搜索 `instance` 实例
2. 搜索 `SimType.prototype`
3. 搜索 `SubType.prototype`
4. 搜索 `SuperType.prototype`，找到了 `getType` 方法

在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链的末端才会停下来。

所有引用类型都继承了 `Object`，这个继承也是通过原型链实现的。如果在 `SuperType.prototype` 还没有找到 `getType`，就会到 `Object.prototype`中找(图中少画了一环)。





#### 原型链继承

原型链继承的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

如 `SubType.prototype = new SuperType()`;



```js
function SuperType() {
    this.name = 'Yvette';
    this.colors = ['pink', 'blue', 'green'];
}
SuperType.prototype.getName = function () {
    return this.name;
}
function SubType() {
    this.age = 22;
}
SubType.prototype = new SuperType();

SubType.prototype.getAge = function() {
    return this.age;
}

// console.log(SubType.prototype.constructor) //[Function: SuperType]
SubType.prototype.constructor = SubType;


let instance1 = new SubType();
instance1.colors.push('yellow');
console.log(instance1.getName()); //'Yvette'
console.log(instance1.colors);//[ 'pink', 'blue', 'green', 'yellow' ]

let instance2 = new SubType();
console.log(instance2.colors);//[ 'pink', 'blue', 'green', 'yellow' ]

```

可以看出 `colors` 属性会被所有的实例共享(instance1、instance2、...)。

> 缺点：

1. 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享。
2. 在创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数。



#### 借用构造函数

**借用构造函数**的技术，其基本思想为:

在子类型的构造函数中调用超类型构造函数。

```js
function SuperType(name) {
    this.name = name
    this.colors = ['pink', 'blue', 'green']
}

function SubType(name) {
    SuperType.call(this, name)
}

let intance1 = new SubType('zc')
console.log(intance1.name)  //zc

```

> 优点:

1. 可以向超类传递参数
2. 解决了原型中包含引用类型值被所有实例共享的问题

> 缺点:

1. 方法都在构造函数中定义，函数复用无从谈起，另外超类型原型中定义的方法对于子类型而言都是不可见的。





#### 组合继承

组合继承指的是将原型链和借用构造函数技术组合到一块，从而发挥二者之长的一种继承模式。基本思路：

使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

```js
function SuperType(name) {
    this.name = name;
    this.colors = ['pink', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
}
// console.log(SuperType)

function SuberType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

SuberType.prototype = new SuperType();
SuberType.prototype.constructor = SuberType;
SuberType.prototype.sayAge = function () {
    console.log(this.age);
}
let instance1 = new SuberType('Yvette', 20);
instance1.colors.push('yellow');
console.log(instance1.colors); //[ 'pink', 'blue', 'green', 'yellow' ]
instance1.sayName(); //Yvette

let instance2 = new SuberType('Jack', 22);
console.log(instance2.colors); //[ 'pink', 'blue', 'green' ]
instance2.sayName();//Jack

```

> 缺点:

- 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

> 优点:

- 可以向超类传递参数
- 每个实例都有自己的属性
- 实现了函数复用



#### 原型式继承

> [浅拷贝与深拷贝](https://juejin.im/post/5b5dcf8351882519790c9a2e) 

原型继承的基本思想：

借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

```

在 `object()` 函数内部，先穿甲一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例，从本质上讲，`object()` 对传入的对象执行了一次浅拷贝。

ECMAScript5通过新增 `Object.create()`方法规范了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象(可以覆盖原型对象上的同名属性)，在传入一个参数的情况下，`Object.create()` 和 `object()` 方法的行为相同。

```js
var person = {
    name: 'Yvette',
    hobbies: ['reading', 'photography']
}
var person1 = Object.create(person);
person1.name = 'Jack';
person1.hobbies.push('coding');
var person2 = Object.create(person);
person2.name = 'Echo';
person2.hobbies.push('running');
console.log(person.hobbies);//[ 'reading', 'photography', 'coding', 'running' ]
console.log(person1.hobbies);//[ 'reading', 'photography', 'coding', 'running' ]

```

在没有必要创建构造函数，仅让一个对象与另一个对象保持相似的情况下，原型式继承是可以胜任的。

> 缺点:

同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。



#### 寄生式继承

寄生式继承是与原型式继承紧密相关的一种思路。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部已某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```js
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function createAnother(original) {
    var clone = object(original);//通过调用函数创建一个新对象
    clone.sayHi = function () {//以某种方式增强这个对象
        console.log('hi');
    };
    return clone;//返回这个对象
}
var person = {
    name: 'Yvette',
    hobbies: ['reading', 'photography']
};

var person2 = createAnother(person);
person2.sayHi(); //hi

```

基于 `person` 返回了一个新对象 -—— `person2`，新对象不仅具有 `person` 的所有属性和方法，而且还有自己的 `sayHi()` 方法。在考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

> 缺点：

- 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下。
- 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

#### 寄生组合式继承

所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路：

不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示：

```js
function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType;//增强对象
    subType.prototype = prototype;//指定对象
}

```

- 第一步：创建超类型原型的一个副本
- 第二步：为创建的副本添加 `constructor` 属性
- 第三步：将新创建的对象赋值给子类型的原型

至此，我们就可以通过调用 `inheritPrototype` 来替换为子类型原型赋值的语句：

```js
function SuperType(name) {
    this.name = name;
    this.colors = ['pink', 'blue', 'green'];
}
//...code
function SuberType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SuberType, SuperType);
//...code

```

> 优点:

只调用了一次超类构造函数，效率更高。避免在`SuberType.prototype`上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。

因此寄生组合继承是引用类型最理性的继承范式。



#### ES6 继承

`Class` 可以通过extends关键字实现继承，如:

```js
class SuperType {
    constructor(age) {
        this.age = age;
    }

    getAge() {
        console.log(this.age);
    }
}

class SubType extends SuperType {
    constructor(age, name) {
        super(age); // 调用父类的constructor(x, y)
        this.name = name;
    }

    getName() {
        console.log(this.name);
    }
}

let instance = new SubType(22, '刘小夕');
instance.getAge(); //22

```

对于ES6的 `class` 需要做以下几点说明：

1. 类的数据类型就是函数，类本身就指向构造函数。

```js
console.log(typeof SuperType);//function
console.log(SuperType === SuperType.prototype.constructor); //true

```

2. 类的内部所有定义的方法，都是不可枚举的。(ES5原型上的方法默认是可枚举的)

```js
Object.keys(SuperType.prototype);

```

3. `constructor` 方法是类的默认方法，通过 `new` 命令生成对象实例时，自动调用该方法。一个类必须有`constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。
4. `Class` 不能像构造函数那样直接调用，会抛出错误。

使用 `extends` 关键字实现继承，有一点需要特别说明：

- 子类必须在 `constructor` 中调用 `super` 方法，否则新建实例时会报错。如果没有子类没有定义 `constructor` 方法，那么这个方法会被默认添加。在子类的构造函数中，只有调用 `super` 之后，才能使用 `this`关键字，否则报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

```js
class SubType extends SuperType {
    constructor(...args) {
        super(...args);
    }
}

```



## 【Step-By-Step】高频面试题深入解析 / 周刊07

> 本周面试题一览:

- [实现一个 JSON.stringify](https://github.com/YvetteLau/Step-By-Step/issues/39)
- [实现一个 JSON.parse](https://github.com/YvetteLau/Step-By-Step/issues/40)
- [实现一个观察者模式](https://github.com/YvetteLau/Step-By-Step/issues/41)
- [使用CSS让一个元素水平垂直居中有哪些方式](https://github.com/YvetteLau/Step-By-Step/issues/42)
- [ES6模块和CommonJS模块有哪些差异？](https://github.com/YvetteLau/Step-By-Step/issues/43)



### 1. 实现一个 `JSON.stringify` （2019-10-27）

`JSON.stringify([, replacer [, space])` 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串。此处模拟实现，不考虑可选的第二个参数 `replacer` 和第三个参数 `space`，如果对这两个参数的作用还不了解，建议阅读 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 文档。

> `JSON.stringify()` 将值转换成对应的 `JSON` 格式:

1、基本数据类型：

- undefined 转换之后仍是 undefined(类型也是 `undefined`)
- boolean 值转换之后是字符串 `"false"/"true"`
- number 类型(除了 `NaN` 和 `Infinity`)转换之后是字符串类型的数值
- symbol 转换之后是 `undefined`
- null 转换之后是字符串 `"null"`
- string 转换之后仍是string
- `NaN` 和 `Infinity` 转换之后是字符串 `"null"`

2、如果是函数类型

- 转换之后是 `undefined`

3、如果是对象类型(非函数)

- 如果有 `toJSON()` 方法，那么序列化 `toJSON()` 的返回值。
- 如果是一个数组
  - 如果属性值中出现了 `undefined`、任意的函数以及 `symbol`，转换成字符串 `"null"`
- 如果是 `RegExp` 对象。
  返回 `{}` (类型是 string)
- 如果是 `Date` 对象，返回 `Date` 的 `toJSON` 字符串值
- 如果是普通对象；
  - 如果属性值中出现了 `undefined`、任意的函数以及 symbol 值，忽略。
  - 所有以 `symbol` 为属性键的属性都会被完全忽略掉。

4、对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

> 模拟实现

```js
function jsonStringify(data) {
    let dataType = typeof data;
    if (dataType !== 'object') {
        let result = data;
        //data 可能是 string/number/null/undefined/boolean
        if (Number.isNaN(data) || data === Infinity) {
            //NaN 和 Infinity 序列化返回 "null"
            result = "null";
        } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
            //function 、undefined 、symbol 序列化返回 undefined
            return undefined;
        } else if (dataType === 'string') {
            result = '"' + data + '"';
        }
        //boolean 返回 String()
        return String(result);
    } else if (dataType === 'object') {
        if (data === null) {
            return "null";
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return jsonStringify(data.toJSON());
        } else if (data instanceof Array) {
            let result = [];
            //如果是数组
            //toJSON 方法可以存在于原型链中
            data.forEach((item, index) => {
                if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                result[index] = "null";
            } else {
                result[index] = jsonStringify(item);
            }
        });
            result = "[" + result + "]";
            return result.replace(/'/g, '"');

        } else {
            //普通对象
            /**
             * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
             * symbol key 忽略
             * undefined、函数、symbol 为属性值，被忽略
             */
            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') {
                //key 如果是symbol对象，忽略
                if (data[item] !== undefined && typeof data[item] !== 'function'
                    && typeof data[item] !== 'symbol') {
                    //键值如果是 undefined、函数、symbol 为属性值，忽略
                    result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
                }
            }
        });
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}

```



### 2. 实现一个 `JSON.parse ` （2019-10-28）

`JSON.parse(JSON.parse(text[, reviver])` 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换。此处模拟实现，不考虑可选的第二个参数 `reviver` ，如果对这个参数的作用还不了解，建议阅读 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 文档。



**第一种方式 eval** 

最简单，最直观的方式就是调用 `eval`

```js
var json = '{"name":"小姐姐", "age":20}';
var obj = eval("(" + json + ")");  // obj 就是 json 反序列化之后得到的对象

```

直接调用 `eval` 存在 `XSS` 漏洞，数据中可能不是 `json` 数据，而是可执行的 `JavaScript` 代码。因此，在调用 `eval` 之前，需要对数据进行校验。

```js
var rx_one = /^[\],:{}\s]*$/;
var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rx_four = /(?:^|:|,)(?:\s*\[)+/g;

if (
    rx_one.test(
        json
            .replace(rx_two, "@")
            .replace(rx_three, "]")
            .replace(rx_four, "")
    )
) {
    var obj = eval("(" +json + ")");
}

```

`JSON` 是 JS 的子集，可以直接交给 `eval` 运行。



**第二种方式 `new Function`** 

`Function` 与 `eval` 有相同的字符串参数特性。

```js
var json = '{"name":"小姐姐", "age":20}';
var obj = (new Function('return ' + json))();

```



### 3. 实现一个观察者模式  （2019-10-29）

观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新。观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯。

观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

```js
//有一家猎人工会，其中每个猎人都具有发布任务(publish)，订阅任务(subscribe)的功能
//他们都有一个订阅列表来记录谁订阅了自己
//定义一个猎人类
//包括姓名，级别，订阅列表
function Hunter(name, level) {
    this.name = name
    this.level = level
    this.list = []
}

Hunter.prototype.publish = function (money) {
    console.log(this.level + '猎人' + this.name + '寻求帮助')
    this.list.forEach(function (item, index) {
        item(money)
    })
}

Hunter.prototype.subscribe = function (targrt, fn) {
    console.log(this.level + '猎人' + this.name + '订阅了' + targrt.name)
    targrt.list.push(fn)
}

//猎人工会走来了几个猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')

//Peter等级较低，可能需要帮助，所以小明，小金，小张都订阅了Peter
hunterMing.subscribe(hunterPeter, function (money) {
    console.log('小明表示：' + (money > 200 ? '' : '暂时很忙，不能') + '给予帮助')
});
hunterJin.subscribe(hunterPeter, function () {
    console.log('小金表示：给予帮助')
});
hunterZhang.subscribe(hunterPeter, function () {
    console.log('小张表示：给予帮助')
});

//Peter遇到困难，赏金198寻求帮助
hunterPeter.publish(198);

//猎人们(观察者)关联他们感兴趣的猎人(目标对象)，如Peter，当Peter有困难时，会自动通知给他们（观察者）

```



### 5. ES6模块和 `CommonJS` 模块有哪些差异？（2019-10-30）

> [参考](https://github.com/YvetteLau/Blog/issues/38) 

1. `CommonJS` 模块是运行时加载，ES6模块是编译时输出接口。

- ES6模块在编译时，就能确定模块的依赖关系，以及输入和输出的变量。ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
- `CommonJS` 加载的是一个对象，该对象只有在脚本运行完才会生成。

2. `CommonJS` 模块输出的是一个值的拷贝，ES6模块输出的是值的引用。

```txt
- `CommonJS` 输出的是一个值的拷贝(注意基本数据类型/复杂数据类型)
    
- ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

```

3. ES6 模块自动采用严格模式，无论模块头部是否写了 `"use strict";`
4. require 可以做动态加载，`import` 语句做不到，`import` 语句必须位于顶层作用域中。
5. ES6 模块的输入变量是只读的，不能对其进行重新赋值
6. 当使用require命令加载某个模块时，就会运行整个模块的代码。
7. 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。






















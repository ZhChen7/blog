## 【Step-By-Step】一周面试题深入解析 / 周刊 01 

> 待更新状态
>
> 今天 2019/9/20

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




# 前端JS基础面试技巧

> 讲解 JS 基础语法相关的面试题，分析原理以及解答方法。这一章节讲解了基础知识的第一部分：变量的类型和计算。以及JS “三座大山” —— 原型、作用域和异步中的： 原型和原型链、作用域和闭包。
>
> 知识点：
>
> 2-1  变量类型和计算
>
> 2-2   原型和原型链
>
> 2-3 函数声明和函数表达式
>
> 2-4 作用域和闭包



![mark](http://static.zxinc520.com/blog/20190715/A5zp7Ltc8RyD.png?imageslim)



**关于面试**

- 基层工程师 - *基础知识*
- 高级工程师 - *项目经验*
- 架构师 -  *解决方案*



## 先从几道面试题入手

- JS 中使用 **typeof** 能得到的哪些类型？
  - 考点：*JS 变量类型*
- 何时使用 **===** 何时使用 **== **？
  - 考点：*强制类型转换*
- **window.onload** 和 **DOMContentLoaded** 的区别？
  - 考点：*浏览器的渲染过程*
- 用 JS 创建10个 a 标签，点击的时候弹出来对应的序号
  - 考点：*作用域*
- 简述如何实现一个**模块加载器**，实现类似 **require.js** 的基本功能
  - 考点：*JS 模块化* 
- 实现数组的 **随机排序** 
  - 考点：*JS 基础算法* 

![mark](http://static.zxinc520.com/blog/20190715/HysLOVvbjQLN.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190715/YKiIQGW864fb.png?imageslim)



# 知识体系

> 题目
>
> 知识点
>
> 解答



## 2-1 变量类型和计算

> 2-1 变量类型和计算
>
> 题目
>
> 知识点 
>
> 解答



### 题目

- JS 中使用 **typeof** 能得到的哪些类型？
- 何时使用 **===** 何时使用 **== **？
- JS 中有哪些 **内置函数**
- JS 变量按照 **存储方式**  分为哪些类型，并描述其特点
- 如何理解 **JSON** 



### 知识点 

- 变量类型
  - 值类型 vs 引用类型
  - typeof 运算符 详解
- 变量计算



### 变量类型

> 值类型 vs 引用类型



#### 值类型

> **值类型 (基本数据类型) 的值是按值访问的。**
>
> 基本类型的值是**不可变的**，基本类型的比较是它们的**值的比较**，基本类型的变量是存放在 **栈内存（Stack）里的**。
>
> **JavaScript** 数据**类型** 值**类型**(**基本类型**)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol (ES6提供的新的类型)。
>
> 6种基本数据类型:**string**、**number**、**boolean**、**undefined**、**null** 、**Symbol** 。

![mark](http://static.zxinc520.com/blog/20190715/Ss70W0DDyFPT.png?imageslim)



#### 引用类型

> **引用类型的值是按引用访问的。**
>
> 引用类型的值是**可变的**，引用类型的比较是**引用的比较**，引用类型的值是保存在 **堆内存（Heap）中的对象（Object）**。
>
> 特点：无限制扩展属性
>
> **3种** 主要引用类型：对象（**Object**）、数组（**Array**）、函数（**Function**）
>
> 细分的话，有：`Object 类型`、`Array 类型`、`Date 类型`、`RegExp 类型`、`Function 类型` 等。

![mark](http://static.zxinc520.com/blog/20190715/znhFw1Srcm3D.png?imageslim)



#### 数据类型

> **值类型(基本类型) **+ **引用数据类型**
>
> <u>7种数据类型</u>：**number**、**string**、**boolean**、**undefined**、**null**、**Symbol** 、**Object (Object、Array、Function)** 。



#### typeof 运算符

> **7** 种类型：**undefined**、**string**、**number**、**boolean**、**object**、**function** 、**symbol**（ES6提供的新的类型）
>
> 注意：typeof  **null**  // object
>
> typeof 运算符 **只能** 区分 **值类型** 的 类型，对于引用类型的 **对象**、**数组**  **区分不出来** 。

![mark](http://static.zxinc520.com/blog/20190715/k3tYgoHSpYgy.png?imageslim)



### 变量计算

> 这个主要针对值类型- 强制类型转换



**4种强制类型转换：**

- 字符串拼接
- == 运算符
- if 语句
- 逻辑运算



#### 字符串拼接

![mark](http://static.zxinc520.com/blog/20190715/WBxaMX9CiLmz.png?imageslim)



#### == 运算符

![mark](http://static.zxinc520.com/blog/20190715/PTp1mF5ulTVw.png?imageslim)



#### if 语句

> if 语句
>
> <u>false 情况</u>：**0**、**NaN**、**'<空字符串>'**、**null**、**undefine**  、**false**

![mark](http://static.zxinc520.com/blog/20190715/C387EiaoakPe.png?imageslim)



#### 逻辑运算符

![mark](http://static.zxinc520.com/blog/20190715/4sGRvRvO2x65.png?imageslim)

  

#### 何时使用 === 和 ==

> 何时使用 === 和 ==？
>
> 解答：参考jQuery源码中推荐的写法，除了**判断对象属性是否为空** 和 **看是否函数的参数为空 ** 的情况 ，其余的都用 **===**  。
>
> `==` : 只进行值的比较
>
> `===`  : 不仅进行值得比较，还要进行数据类型的比较

![mark](http://static.zxinc520.com/blog/20190715/dfHpCgG4HQNR.png?imageslim)



#### JS中的内置函数

> JS中的内置函数的作用

![mark](http://static.zxinc520.com/blog/20190715/BDtLCAEhGEUX.png?imageslim)



#### JS按存储方式区分变量类型

> [参考1](https://segmentfault.com/a/1190000006752076)
>
> [参考2](https://www.cnblogs.com/leiting/p/8081413.html)
>
> 基本类型的值是不可变的

![mark](http://static.zxinc520.com/blog/20190715/0cbg9UtuHTED.png?imageslim)



#### 如何理解 JSON

> JS 内置对象，Math也是内置对象
>
> 注意：JSON 既是一个JS **内置对象**，也是一种 **数据格式**。

![mark](http://static.zxinc520.com/blog/20190715/5bkwAGYcMzH8.png?imageslim)





## 2-2 原型和原型链

> 2-2 原型和原型链
>
> 题目
>
> 知识点 
>
> 解答



### 题目

- 如何准确判断一个变量是 **数组类型** 
- 写一个原型链继承的例子
- 描述 new 一个对象的过程
- zepto (或其他框架) 源码中如何使用原型链



### 知识点

- 构造函数
- 构造函数-扩展
- 原型规则和示例
- 原型链 
- instanceof



#### 构造函数

> 函数名 习惯 **第一个字母大写**（ 高级程序员规范）

![mark](http://static.zxinc520.com/blog/20190715/aYlOy0sAIxjg.png?imageslim)



#### 构造函数扩展

> 构造函数扩展
>
> 函数扩展 ---- **语法糖** 

![mark](http://static.zxinc520.com/blog/20190715/KAiPkbgM6g8k.png?imageslim)



#### 5条原型规则和示例

> 5条原型规则
>
> **原型规则** 是学习 **原型链** 的基础



**5条原型规则 ：**

1. 所有的 **引用类型** (对象，数组，函数)，都具有对象特性，即可 **自由扩展** 属性（除了null以外）。

2. 所有的 **引用类型** (对象，数组，函数)，都有一个`__proto__` （ *隐式原型* ）属性，属性值都是一个普通对象。

   ![mark](http://static.zxinc520.com/blog/20190715/i237crTwXpRw.png?imageslim)

3. 所有的函数都有一个`prototype` （ *显示原型* ）属性，属性值是一个普通对象。 

4. 所有的引用类型(对象，数组，函数)，`__proto__`属性值指向它的构造函数的`prototype`属性值。

   ![mark](http://static.zxinc520.com/blog/20190715/gbOkNmykomux.png?imageslim)

5. 当试图得到一个引用类型的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`(即它的构造函数的`prototype`)中去找。



**示例** ：

![mark](http://static.zxinc520.com/blog/20190715/CKA2EOYdkSQ5.png?imageslim)



**循环自身的属性：**

![mark](http://static.zxinc520.com/blog/20190715/kAsCaFM5fgCq.png?imageslim)



#### 原型链

> 这种搜索的轨迹,形似一条长链, 又因 prototype 在这个游戏规则中充当链接的作用,于是我们把这种实例与原型的链条称作 **原型链**
>
> [参考](https://juejin.im/post/58f94c9bb123db411953691b) 

![mark](http://static.zxinc520.com/blog/20190716/zjK7G9Pwib6K.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190716/hyX26borV0mF.png?imageslim)





#### instanceof

> 用于 判断 **引用类型** 属于哪个 构造函数的方法
>
> **instanceof 运算符 ** 用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
>
> [参看MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 

![mark](http://static.zxinc520.com/blog/20190716/mHVNeyIgfsSE.png?imageslim)

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);//  true

console.log(auto instanceof Object);// true
```



### 解答

- 如何准确判断一个变量是 **数组类型** 

  - arr instanceof Arrar

  

- 写一个原型链继承的例子、

```js
function Elem(id) {
    this.elem = document.getElementById(id)
}

Elem.prototype.html = function (val) {
    var elem = this.elem
    if (val) {
        elem.innerHTML = val
        return this //链式操作
    } else {
        return elem.innerText
    }
}
Elem.prototype.on = function (type, fn) {
    var elem = this.elem
    elem.addEventListener(type, fn)
    return this
}

var div1 = new Elem('div1')
div1.html('<p>hello world</p>').on('click', function () {
    alert('clicked')
})

```



- 描述 new 一个对象的过程

  ![mark](http://static.zxinc520.com/blog/20190716/fEURg05c9KBT.png?imageslim)

  

- zepto (或其他框架) 源码中如何使用原型链

  ![mark](http://static.zxinc520.com/blog/20190716/6vDDJLlWz5AQ.png?imageslim)



## 2-3 函数声明和函数表达式

> 函数声明和函数表达式



#### 函数声明

```js
fn() //执行
function fn(){
    //声明
}
```



#### 函数表达式

> 把var定义的变量提前：相当于：先定义 **var fn**  --- > 然后执行 **fn()**

```js
fn() // TypeError: fn is not a function
var fn=function（）{
    // 表达式
}
```



**相关的例子（函数执行的顺序）：** 

```js
console.log(a)  // undefined
var a=100
```

```js
fn('zhouchen')
function fn(name) {
    age=20
    console.log(name,age)
    var age
}
//output：zhouchen 20
```



```js
fn('zhouchen')
function fn(name) {
    console.log(arguments) // 参数的集合
    age = 20
    console.log(name, age)
    var age
    
    bar(100)
    function bar(num) {
        console.log(num)
    }
}
/*
    { '0': 'zhouchen' }
    zhouchen 20
    100
*/
```



## 2-4 作用域和闭包

> 作用域和闭包
>
> 题目
>
> 知识点
>
> 解答



### 题目

- 说一下对变量提升的理解
- 说明 this 几种 不同的使用场景
- 创建10个 a 标签，点击的时候弹出来对应的序号
- 如何理解作用域
- 实际开发中闭包的应用



### 知识点

- 执行上下文

- this

- 作用域

- 作用域链

- 闭包

  

#### 执行上下文

> 执行上下文

![mark](http://static.zxinc520.com/blog/20190716/slpXIRmFPFUC.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190716/yGYEzQ0mBi3H.png?imageslim)

  

#### this

> this要在 **执行时** 才能确定值，**定义时** 无法确认

![mark](http://static.zxinc520.com/blog/20190716/y7uMvda2zozx.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190716/X4ErfYyomFle.png?imageslim)



#### 块级作用域

> 任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。
>
> **JS** 并 **不支持  块级作用域**，它**只支持 函数作用域** ，<u>而且在一个函数中的**任何位置定义的变量** 在该函数中的 **任何地方都是可见的** 。</u> 

```js
  if(true){
    var name='zhouchen'
    }
  console.log(name) // zhouchen
```



#### 链式作用域

> **如何从外部读取局部变量？** 
>
> 出于种种原因，我们有时候需要得到函数内的局部变量。但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现。
>
> 那就是在函数的内部，再定义一个函数。

```js
　　function f1(){

　　　　var n=999;

　　　　function f2(){
　　　　　　alert(n); // 999
　　　　}

　　}
```

在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是Javascript语言特有的 "**链式作用域" 结构**（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。



#### 闭包

> 上一节代码中的 f2函数，就是闭包。
>
> 简单来说：闭包就是 **能够读取其他函数内部变量的函数**。
>
> 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成 **定义在一个函数内部的函数** 。 
>
> 所以，在本质上，<u>闭包就是将函数内部和函数外部连接起来的一座桥梁</u>。
>
> [参考阮一峰的网络日志 ](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)



#### 闭包的用途

> 闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。



#### 实际开发中闭包的应用

> 实际开发中闭包的应用

![mark](http://static.zxinc520.com/blog/20190716/oAEdrQVxx55a.png?imageslim)



### 解题

- 说一下对变量提升的理解

  - 变量定义
  - 函数声明 （ 注意和 函数表达式 的区别）

  

- 说明 this 几种 不同的使用场景

  - [参考1](https://blog.csdn.net/weixin_40387601/article/details/80313884)
  - [参考2](https://blog.csdn.net/sinat_32067081/article/details/53047149) 

  

- 创建10个 a 标签，点击的时候弹出来对应的序号

  ![mark](http://static.zxinc520.com/blog/20190716/jpCryHpWtFmQ.png?imageslim)

  ![mark](http://static.zxinc520.com/blog/20190716/JOON77hWUAPT.png?imageslim)

  

- 如何理解作用域

  - 自由变量
  - 作用域连，即自由变量的查找
  - 闭包的两个场景

  

- 实际开发中闭包的应用

  ![mark](http://static.zxinc520.com/blog/20190716/DOiHXt0yUzLP.png?imageslim)
# 前端JS基础面试技巧

> 前端JS基础面试技巧 --  **JS基础知识下** 
>
> JS 三座大山：**原型原型链** 、**作用域闭包** 、**异步和单线程** 。
>
> 知识点：
>
> 3-1 异步和单线程
>
> 3-2 日期和math
>
> - 日期
> - Math
> - 数组 API
> - 对象 API



## 3-1 异步和单线程

> 异步和单线程
>
> 题目
>
> 知识点
>
> 解答



### 题目

- 同步和异步的区别是什么？分别举一个同步和异步的例子
- 一个关于 setTimeout 的笔试题
- 前端使用异步的场景有哪些



### 知识点

- 什么是异步（对比同步）
- 前端使用异步的场景
- 异步个单线程



### 什么是异步

> 异步（Asynchronous）
>
> 一般而言，操作分为发出调用和得到结果两步。发出调用后一直等待，直到拿到结果（这段时间不能做任何事）为 **同步** ；发出调用后不等待，继续执行下一个任务，就是 **异步任务** 。
>
> [参考](https://www.jianshu.com/p/667936441cb5) 

```js
console.log(100)
setTimeout(function () {
    console.log(200)
},1000)
console.log(300)
/*
    100
    300
    200
*/
```





#### 何时需要异步？

- 在可能发生等待的情况

- 等待过程中不能像 alert 一样阻塞程序运行

- 因此，所有的 “ 等待情况” 都需要异步

  

#### 前端使用异步的场景

- 定时任务：**setTimeout**，**setInterval**

- 网络请求：**ajax 请求**，**动态**  <**img**>  **加载** 

- **事件绑定** 

   

### 单线程

> **Javascript是单线程的**   [参考](https://www.cnblogs.com/Mainz/p/3552717.html) 
>
> JS的单线程是指一个浏览器进程中只有一个JS的执行线程，同一时刻内只会有一段代码在执行
>
> 在某个特定的时刻只有特定的代码能够被执行，并 **阻塞**  其它的代码。

```js
console.log(100)
setTimeout(function () {
    console.log(200)
})
console.log(300)
```

**上面代码执行过程：** 

![mark](http://static.zxinc520.com/blog/20190717/kEQlmncCXtel.png?imageslim)



#### 重点总结

- 异步和同步的区别
- 异步和单线程的关系
- 异步在前端的引用场景



### 解答

- 同步和异步的区别是什么？分别举一个同步和异步的例子

  - *同步* 是 **阻塞模式** ，*异步* 是 **非阻塞模式** 。

    *同步*  就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会 **一直等待下去** ，知道收到返回信息才继续执行下去；

    *异步*  是指进程 **不需要一直等下去** ，而是 **继续执行下面的操作**，不管其他进程的状态。当有消息返回式系统会通知进程进行处理，这样可以提高执行的效率。

  - alert 是 同步， setTimeout 是 异步



- 一个关于 setTimeout 的笔试题

```js
console.log(1)
setTimeout(function () {
    console.log(2)
}, 0)
console.log(3)

setTimeout(function () {
    console.log(4)
}, 1000)
console.log(5)
/* 
	1
    3
    5
    2
    4
*/
```



- 前端使用异步的场景有哪些
  - 定时任务：**setTimeout**，**setInterval**
  - 网络请求：**ajax 请求**，**动态**  <**img**>  **加载** 
  - **事件绑定** 



## 3-2 日期和math

> 题目
>
> 知识点
>
> 解答



### 题目

- 获取 2017 -06 -10 格式的日期
- 获取  随机数，要求是长度一致 的字符串格式
- 写一个 能遍历对象 和数组 的通用 forEach 函数



### 知识点

- 日期
- Math
- 数组 API
- 对象 API



#### 日期

> **日期对象用于处理日期和时间。** 
>
> [JavaScript Date 对象API](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)

![mark](http://static.zxinc520.com/blog/20190717/3ijIzI0Frks1.png?imageslim) 



#### Math

> **Math** 是一个内置对象， 它具有数学常数和函数的属性和方法。不是一个函数对象。
>
> [Math Api](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 
>
> 描述：与其它全局对象不同的是, `Math` 不是一个构造器.  `Math` 的所有属性和方法都是静态的. 你用到的常数pi可以用 `Math.PI` 表示,用 `x` 作参数 Math.sin(x)调用sin函数. JavaScript中的常数, 是以全精度的实数定义的.
>
> Math.random() 在前端的作用：随时改变，清除缓存。



#### 数组 API

> [参考](http://louiszhai.github.io/2017/04/28/array/#Array%E6%9E%84%E9%80%A0%E5%99%A8)
>
> 详情可以参考我的博客：[JavaScript 数组那些事](http://zxinc520.com/lcj/%225d119841fd02ab26e068eb0a%22) 



**面试官最常问的几个**   ：

- forEach   遍历所有元素
- every    判断所有元素是否都符合条件
- some   判断是否有至少一个元素符合条件
- sort   排序
- map  对元素重新组装，生成新数组
- filter 过滤符合条件的元素



#### 对象 API

> **Object.prototype API**  
>
> `Object.prototype` 表示对象的原型对象
> `Object.prototype` 属性的属性特征
>
> [参考](https://www.jianshu.com/p/2f43db2b656c)

![mark](http://static.zxinc520.com/blog/20190717/mOpzx9LK1xmu.png?imageslim)



### 解答

- 获取  2019-07-17 格式的日期

```js
function formatDate(dt) {
    if (!dt) {
        dt = new Date()
    }
    var dt = new Date()
    var year = dt.getFullYear()
    var month = dt.getMonth() + 1
    var data = dt.getDate()
    if (month < 10) {
        month = '0' + month
    }
    if (data < 10) {
        data = '0' + data
    }
    return year + '-' + month + '-' + data
}

var dt = new Date()
console.log(formatDate(dt))

//  2019-07-17
```



- 获取  随机数，要求是长度一致 的字符串格式

```js
var random = Math.random()
random =random +'0000000000'
random = random.slice(0,10)
console.log(random)
```



- 写一个 能遍历对象 和数组 的通用 forEach 函数

```js
// 写一个 能遍历对象 和数组 的通用 forEach 函数
function forEach(obj, fn) {
    
    if (obj instanceof Array) {
        obj.forEach(function (item, index) {
            fn(item, index)
        })
    } else {
        for (let key in obj) {
            fn(key, obj[key])
        }
    }
}

// 使用  forEach 函数
var arr = [1, 2, 3]
var obj = {x: 100, y: 200}

forEach(arr, function (index, item) {
    console.log(index + '---' + item)
})

forEach(obj, function (key, value) {
    console.log(key, value)
})

/*
	2---1
    3---2
    x 100
    y 200
*/
```


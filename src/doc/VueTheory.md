# MVVM 和 vue

> 本章首先介绍了 **jQuery 开发方式和框架开发方式的区别** ，引导学生进入框架开发的思路转变。然后通过 MVC 模式引入 **MVVM** ，在两者比较让学生更快熟悉 MVVM 。最后结合实例，详细讲解 vue 的 **实现原理** ，包括 **响应式**、**模板解析**、**渲染** 这三大要素。...
>
> 
>
> 高级面试：**vue 知识点** 
>
> 放弃该放弃的是无奈，放弃不该放弃的是无能，不放弃该放弃的是无知，不放弃不该放弃的是执著！
>
> It is helpless to give up the waiver. It is incompetence to give up what should not be given up. It is ignorance that does not give up the waiver. It is attachment that does not give up and should not give up!



### 知识点

- 如何 理解 MVVM
- 如何 实现 MVVM
- 是否解读过 vue 源码



### 题目

- 说一下 使用 jQuery 和 使用框架的区别
- 说一下 对 MVVM 的理解
- vue 中如何实现 **响应式** 
- vue 中如何解析 **模板** 
- vue 的 整个实现流程



## 使用 jQuery 和 使用框架的区别

### 实现

- jQuery  实现 todo-list
- vue 实现 todo-list
- jQuery  和 框架的区别



#### jQuery  实现 todo-list

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="text" id="txt-title">
<button id="btn-submit">submit</button>
<div>
    <ul id="ul-list"></ul>
</div>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
    var $txtTitle = $('#txt-title')
    var $ulList = $('#ul-list')
    var $btnSubmit = $('#btn-submit')
    $btnSubmit.click(function () {
        var title = $txtTitle.val()
        if (!title){
            return
        }
        var $li = $(`<li>${title}</li>`)
        $ulList.append($li)
        $txtTitle.val('')

    })

</script>
</body>
</html>
```

![mark](http://static.zxinc520.com/blog/20190902/BaCUCHQ12jJW.gif)

#### vue 实现 todo-list

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div>
        <input type="text" v-model="title">
        <button @click="add">submit</button>
    </div>
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>

<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            title: '',
            list: []
        },
        methods: {
            add: function () {
                this.list.push(this.title)
                this.title = ''
            }
        }
    })
</script>
</body>
</html>
```

![mark](http://static.zxinc520.com/blog/20190903/sQq0jR7s1E7E.gif)



### 两者的区别

- **数据** 和 **视图** 的分离
- 以数据驱动视图



### 问题解答

- 说一下 使用 jQuery 和 使用框架的区别 ？
  - **数据** 和 **视图** 的分离，<u>解耦</u>（ *开放封闭原则*  ）
  - 以数据驱动视图，只关心数据变化，DOM 操作被封装





## 说一下 对 MVVM 的理解

> 目前前端框架中，最为出色的要属Vue和React了，这俩个框架的核心理念都**是数据驱动页面渲染**，同时他们都是MVVM模式的框架，**MVVM模式** 中的M还是固定表示Modal，V还是表死View，这俩个基本都是不会发生变化，一个页面必然需要数据和渲染俩个部分，那么变化的是如何将Modal渲染到View的过程变了，在MVVM模式中，将View和Modal绑定在一起，只要Modal发生了变化，View就会自动更新，不需要我们认为的再去写如何操作DOM更新的过程了



### 知识点

- MVC
- MVVM
- 关于 ViewModel



#### MVC

- M -Model 数据
- V - View 视图、界面
- C - Controller 控制器 、逻辑处理



![mark](http://static.zxinc520.com/blog/20190903/k21xefObaEwr.png?imageslim)



**MVC**模式（Model–view–controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。

在前端的 **MVC模式** 中，M还是表示Modal层，负责与后台交互数据，V表示View，负责页面上DOM的渲染，C表示绑定在DOM元素上的事件，当Controllor中的事件被调用，会去调用Modal中的数据，然后交给View重新渲染数据



#### MVVM

- M  - Model 模型、数据
- V  -  View 视图、模板（ 视图和模板是分离的 ）
- ViewModel  -  **连接**  Model 和 View 



![mark](http://static.zxinc520.com/blog/20190903/23g0MdeUf9sw.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190903/1qFclAqzYLGt.png?imageslim)



#### 关于 ViewModel

- MVVM 不算是一种创新
- 但其中的 ViewModel 确实是一种创新
- 真正 结合前端场景应用的创建



### 问题解答

- 说一下 对 MVVM 的理解
  - MVVM  - Model View ViewModel
  - 三者之间的联系。以及如何对应到各段代码
  - ViewModel 的理解，联系 View 和 Model



# MVVM 框架的三大要素

### 流程

- 再次分析 demo
- 三要素总结



### 三要素

- 响应式：vue 如何监听到 data 的每个属性变化？
- 模板引擎：vue 的模板如何被解析，指令如何处理？
- 渲染：vue的模板如何被渲染成html？以及渲染过程



## vue 中如何实现响应式

### 知识点

- 什么是响应式？
- Object.defineProperty
- 模拟



#### 什么是响应式？

- 修改 data 属性后，vue 立刻监听到
- data 属性被代理到 vm 上
- 演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div>{{age}}</div>
    <div>{{name}}</div>
</div>
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            name: '张三',
            age: '18'
        }
    })
</script>
</body>
</html>
```







![mark](http://static.zxinc520.com/blog/20190904/h1SkefYXlHkn.gif)







#### Object.defineProperty

> `Object.defineProperty()`  方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。 
>
> **语法** ：Object.defineProperty(obj, prop, descriptor) 
>
> **参数** ：
>
> <u>Object.defineProperty(obj, prop, descriptor)</u> 
>
> **obj** ：要在其上定义属性的对象。
>
> **prop**  ：要定义或修改的属性的名称。
>
> **descriptor**   ：将被定义或修改的属性描述符。

```js
var obj={
    name:'张三',
    age:25
}
console.log(obj.name) //获取属性的时候，如何监听到？
obj.age=26  //赋值属性的时候，如何监听到？
```



*Object.defineProperty：* 

```js
var obj = {}
var name = '张三'
Object.defineProperty(obj, "name", {
    get: function () {
        console.log('get')
        return name
    },
    set: function (newVal) {
        console.log('set')
        name = newVal
    }
})

console.log(obj.name)
obj.name = 'list'
```



### 模拟实现

> 模拟实现 Vue 如何监听data

```js
/*
* 如何监听data
var vm=new Vue({
    el:'张三',
    data:{
        name:'张三',
        age:20
    }
})
*/

//模拟实现
var vm = {}
var data = {
    price: 100,
    name: '张三'
}

var key, value
for (key in data) {
    //命中闭包。新建一个函数，保证 key 的独立的作用域
    (function (key) {
        Object.defineProperty(vm, key, {
            get: function () {
                console.log('get')  //监听
                return data[key]
            },
            set: function (newVal) {
                console.log('set')  //监听
                data[key] = newVal
            }
        })
    })(key)
}
```

![mark](http://static.zxinc520.com/blog/20190904/P570ewmXOdNX.gif)







### 问题解答



- 什么是响应式？
  - 关键是理解  Object.defineProperty
  - 将 data 的属性代理到 vm 上



## vue 中如何解析模板

### 知识点

- 模板是什么？
- render 函数
- render 函数 与 vdom



#### 模板是什么？

- 本质：字符串
- 有逻辑，如 v-if 、v-for 等
- 与 html 格式很像，但有很大区别
- 最终还要转换为 html 来显示



- **模板最终必须转化成 JS 代码** ，因为：
  - 有逻辑（v-if、v-for），必须用  JS 才能实现 （ 图灵完备 ） 
  - 转换成 html 渲染页面，必须用 JS 才能实现
  - 因此，模板最重要转换成 一个 JS 函数 （render 函数）

```html
<div id="app">
    <div>
        <input type="text" v-model="title">
        <button @click="add">submit</button>
    </div>
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>
```

 

#### render 函数 - with 的用法

> with 的用法 --- **自己开发的代码尽量不要使用！** 

```js
var obj = {
    name: '张三',
    age: 20,
    getAddress: function () {
        alert('beijing')
    }
}

// 不使用 with
function fn() {
    alert(obj.name)
    alert(obj.age)
    obj.getAddress()
}
fn()
```

```js
var obj = {
    name: '张三',
    age: 20,
    getAddress: function () {
        alert('beijing')
    }
}

// 使用 with
function fn1() {
    with (obj) {
        alert(obj.name)
        alert(obj.age)
        getAddress()
    }

}
fn1()
```

#### render函数

![mark](http://static.zxinc520.com/blog/20190905/igfqtojmzQ4H.png?imageslim)



#### 总结

- 模板中所有信息都包含在了 render 函数中
- this 即 vm
- price 即 this.price 即 vm.price ，即 data 中的 price
- _c 即 this. _c   即 vm. _c 





#### render 函数剖析

- 从哪里可以看到 render 函数？
- 复杂一点的例子，render 函数是什么样子的？
- v- if 、v-for 、v-on 都是怎么处理的？



#### 看一下 todo-list demo 的 render函数

```html
<div id="app">
    <div>
        <input type="text" v-model="title">
        <button @click="add">submit</button>
    </div>
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>
```

```js
with (this) {
    return _c('div', {attrs: {"id": "app"}}, [_c('div', [_c('input', {
        directives: [{
            name: "model",
            rawName: "v-model",
            value: (title),
            expression: "title"
        }], attrs: {"type": "text"}, domProps: {"value": (title)}, on: {
            "input": function ($event) {
                if ($event.target.composing) return;
                title = $event.target.value
            }
        }
    }), _v(" "), _c('button', {on: {"click": add}}, [_v("submit")])]), _v(" "), _c('ul', _l((list), function (item) {
        return _c('li', [_v(_s(item))])
    }), 0)])
}
```

- 根据 todo-list demo 的 render 函数
- v- model 是怎么实现的？
- v-on :click  是怎么实现的？
- v- for 是怎么实现的？



#### 重要

```js
/*
    vue2.0 开始支持预编译

    开发环境 ：写模板

    编译打包

    生产环境：JS
    --------------------------------------------
    React 组件化
    
    JSX 模板
    编译 ： -> JS 代码
    
*/
```



### 渲染

- 已经解决了 模板中 “逻辑” （v-for、v-if ）的问题 

- 还剩下模板生成 html 问题

- 另外，vm._c 是什么？ render 函数 返回了什么？



##### 先复习一下 vdom 的知识

> 可参考 [vdom篇](http://zxinc520.com/lcj/%225d63a1bce9920a5ce05e2c3b%22) 

vdom 的如何应用，核心 API 是什么？

- 介绍 [snabbdom](https://github.com/snabbdom/snabbdom)
- 重做 之前的 demo
- 核心 API



##### render 函数和 vdom

![mark](http://static.zxinc520.com/blog/20190905/ldxxH0zJ4t3s.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190905/MykHq1vOBFyL.png?imageslim)

- updataComponent 中实现了 vdom 的 patch
- 页面首次渲染执行 updataComponent
- data 中每次修改属性，执行 updataComponent



### 问题解答

- vue 中如何解析 **模板** 
  - 模板：字符串，有逻辑，嵌入 JS 变量......
  - 模板必须转换成 JS 代码（有逻辑，渲染 html，JS 变量）
  - render 函数是什么样子的
  - render 函数执行是返回 vnode
  - updataComponent



# vue的整个实现流程

### 整个实现流程

- 第一步：解析模板成 render 函数

  - with 的用法
  - 模板中的所有信息都被 render 函数 包含
  - 模板中用到的  data中的属性，都变成了 JS 变量
  - 模板中的 v-model、v-for、v-on 都变成了 JS 逻辑
  - render 函数返回 vnode

  

- 第二步：响应式开始监听

  - Object.defineProperty
  - 将 data 的属性代理到 vm 上

  

- 第三步：首次渲染，显示页面，且绑定依赖

  - 初次渲染，执行 updataComponent  ，执行 vm.render()
  - 执行 render 函数，会访问到 vm.list 和 vm.title
  - 会被响应式的 get 方法监听到 （后面详细讲）
  - 执行 updataComponent ，会被 vdom 的 patch 方法
  - patch 将 vnode 渲染成 DOM ，初次渲染完成

  ------

  - 为何要监听 get，直接监听 set 不行吗？
  - data 中有很多属性，有些被用到，有些可能不被用到
  - 被用到的会走到 get ，不被用到的 不会走到 get
  - 未走到 get中的属性，set 的时候我们也无需关心
  - **避免不必要的重复渲染** 



- 第四步：data 属性变化，触发 rerender
  - 修改属性，被响应式 的 set 监听到
  - set 中执行 updataComponent 
  - updataComponent 重新执行 vm.render()
  - 生成的 vnode 和 prevVnode，通过 patch 进行比较



### 问题解答

- vue 的整个实现流程？
  - 第一步：解析模板成 render 函数
  - 第二步：响应式开始监听
  - 第三步：首次渲染，显示页面，且绑定依赖
  - 第四步：data 属性变化，触发 rerender



# 总结

- 说一下 使用 jQuery 和 使用框架的区别

  - **数据** 和 **视图** 的分离，<u>解耦</u>（ *开放封闭原则*  ）
  - 以数据驱动视图，只关心数据变化，DOM 操作被封装

  

- 什么是 MVVM ？

  - MVVM  - Model View ViewModel

  - 三者之间的联系。以及如何对应到各段代码
  - ViewModel 的理解，联系 View 和 Model



### 三要素

- 响应式：vue 如何监听到 data 的每个属性变化？
- 模板引擎：vue 的模板如何被解析，指令如何处理？
- 渲染：vue的模板如何被渲染成html？以及渲染过程？



- Vue 如何实现响应式？
  - 关键是理解  Object.defineProperty
  - 将 data 的属性代理到 vm 上



- vue 中如何解析 **模板** ？
  - 模板：字符串，有逻辑，嵌入 JS 变量......
  - 模板必须转换成 JS 代码（有逻辑，渲染 html，JS 变量）
  - render 函数是什么样子的
  - render 函数执行是返回 vnode
  - updataComponent



- vue 的整个实现流程？
  - 第一步：解析模板成 render 函数
  - 第二步：响应式开始监听
  - 第三步：首次渲染，显示页面，且绑定依赖
  - 第四步：data 属性变化，触发 rerender
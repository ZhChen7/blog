# ES6 语法

> 本章主要讲解工作中最常用的 ES6 语法，包括 **Module Class Promise**  等语法，还会介绍使用 **babel webpack rollup**  来搭建 ES6 编译环境。
>
> [ECMAScript 6 入门](http://es6.ruanyifeng.com/) 



## ES6 使用

- 开发环境已经普及使用
- 浏览器环境却支持不好（ 需要开发环境编译 ）
- 内容很多，重点了解常用语法
- 面试：开发环境的使用 + 重点语法的掌握



### 问题

- ES6 模块化如何使用，开发环境如何打包
- Class 和 普通构造函数 有何区别 ？
- Promise 的基本使用和原理
- 总结一下 ES6 其它常用功能





## 2-1 ES6 模块化语法

> ES6 模块化如何使用，开发环境如何打包

### 知识点

**ES6 模块化如何使用，开发环境如何打包:** 

- 模块化的基本语法
- 开发环境的配置
- 关于 JS 众多 模块化标准



#### export 语法

> export 语法

```js
/*util1.js*/
export default {
    a: 100
}

/*util2.js*/
export function fn1() {
    alert('fn1')
}
export function fn2() {
    alert('fn2')
}


/*index.js*/
import util1 from './util1.js'
import {fn1, fn2} from './util2.js'

console.log(util1)
fn1()
fn2()

```



#### 开发环境 - babel

> Babel是一个JavaScript编译器。[官网](https://babeljs.io/) 
>
> 使用技巧 可参考  [React学习第一天 ：webpack中使用Babel配置](http://zxinc520.com/lcj/%225cc4640d9b3032095d9e5754%22)  
>
> 和  [Vue第六天学习 ：webpack中 babel 的配置](http://zxinc520.com/lcj/%225cb72a04009ae94788aa0d7f%22)



#### 开发环境  - webpack

> 开发环境  - webpack - *webpack* 是一个模块打包器  [官网](https://webpack.js.org/)  
>
> 详情 可参考我的博客：[Vue第五天：webpack](http://zxinc520.com/lcj/%225cb181596d3d4a5cb52b65c9%22)  和  [Vue第六天学习：深入webpack](http://zxinc520.com/lcj/%225cb72a04009ae94788aa0d7f%22) 以及 [React学习第一天：创建基本的webpack4.x项目 ](http://zxinc520.com/lcj/%225cc4640d9b3032095d9e5754%22)



#### rollup.js

> 概述 (Overview)  [中文文档](https://www.rollupjs.com/guide/zh)   [官网](https://rollupjs.org/guide/en/) 
>
> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验
>
> **rollup 功能单一（极致）  ，webpack 功能强大**   





#### 关于 JS 众多 模块化标准

> 关于 JS 众多 模块化标准
>
> 详情可参考我的博客：[开发环境： 模块化](http://zxinc520.com/lcj/%225d31940b724e8113740499b3%22)



**发展过程** 

- 没有模块化
- AMD 成为 标准，require.js （也有 CMD【**用的不多** 】）
- 前端打包工具，nodejs 模块化可以被使用
- ES6 出现 ，想统一现在所有的模块化标准
- nodejs 积极支持，浏览器尚未统一
- 你可以自造 lib，但是不要自造标准



### 问题解答

- 语法：import export （注意有无 default）
- 环境：babel 编译 ES6 语法，模块化可用 webpack 和 rollup
- 扩展：说一下自己对模块化标准统一的期待





## 2-2 Class 和 普通构造函数有何区别

> Class 和 普通构造函数有何区别
>
> [我的博客：React学习第二天：了解 class](http://zxinc520.com/lcj/%225cd03896bd482e21ac46a9d4%22) 



### 知识点

- JS 构造函数
- Class  基本语法
- 语法糖
- 继承



### 问题解答

- Class 和 普通构造函数 有何区别 ？
  - Class在语法上更加贴合面向对象的写法
  - Class 实现继承更加易读、易理解
  - 更易于写 java 等后端语言的使用
  - 本质还是语法糖， 使用 prototype  



## 2-3 Promise 的基本使用

### Promise 的基本使用

> 可参考我的博客：[Promise  详细分析](http://zxinc520.com/lcj/%225cbb3bf05733fa0a66088c80%22) 



- Callback Hell
- Promise 语法 



#### Callback Hell

```js
function loadImg(src, callback, fail) {
    var img = document.createElement('img')
    img.onload = function () {
        callback(img)
    }
    img.onerror = function () {
        fail()
    }
    img.src = src
}

var src = 'https://edu-image.nosdn.127.net/B34DC36428D2D51B8EF5EE2C83CE9BF2.png?imageView&thumbnail=241y34&quality=100'
loadImg(src, function (img) {
    console.log(img.width)
}, function () {
    console.log('failed')
})
```



#### Promise 语法 

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

result.then(function (img) {
    console.log(img.width)
}, function () {
    console.log('faild')
})

result.then(function (img) {
    console.log(img.height)
})
```



### 问题解答

- Promise 的基本使用和原理?
  - new Promise 实例，而且要 return
  - new Promise 时要传入函数，函数有 resolve, reject  两个参数
  - 成功时执行 resolve() 失败时执行 reject()
  - then 监听结果



## 2-4 总结一下 ES6 其它常用功能

### 知识点

- let/const
- 多行字符串/模板变量
- 解构赋值
- 块级作用域
- 函数默认参数
- 箭头函数



#### let/const

![mark](http://static.zxinc520.com/blog/20190804/IjRCPysI3ja5.png?imageslim)





#### 多行字符串/模板变量

![mark](http://static.zxinc520.com/blog/20190804/cmkreCVTvB3f.png?imageslim)



#### 解构赋值

![mark](http://static.zxinc520.com/blog/20190804/tkv3jll7XPJG.png?imageslim)



#### 块级作用域

![mark](http://static.zxinc520.com/blog/20190804/vqFw5Cyt1Okg.png?imageslim)



#### 函数默认参数

![mark](http://static.zxinc520.com/blog/20190804/rDHBLwq6djzQ.png?imageslim)



#### 箭头函数

![mark](http://static.zxinc520.com/blog/20190804/26aXyJj3eE8M.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190804/XppPYlgRUceY.png?imageslim)


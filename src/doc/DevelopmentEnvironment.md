# 开发环境

> 讲解在面试过程中，面试官可能会问及的前端开发环境的问题，例如 **IDE** ，**Git** ，**模块化** ，**打包工具** ，**上线流程** ，这些类别的题目。
>
> 知识点：
>
> 7-1 IDE 
>
> 7-2 Git
>
> 7-3 模块化
>
> 7-4 构建工具
>
> 7-5 上线和回滚



### 关于开发环境

- 面试官想通过开发环境了解面试者的经验
- 开发环境，最能体现工作产出的效率
- 会以聊天的形式为主，而不是出具体的问题



## 知识点

> **IDE** ，**Git** ，**JS模块化**  ，**打包工具** ，**上线流程** ，

- IDE （ 写代码的效率 ）
- git （ 代码版本管理 ，多人协作开发 ）
- JS 模块化
- 打包工具
- 上线回滚的流程



## 7-1 IDE 

- webstorm （  我平常基本用的就是 **webstorm**  ）
- sublime
- vscode
- atom
- 插件 插件 插件 ！！！

![mark](http://static.zxinc520.com/blog/20190719/MxVs8IUJKDhO.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190719/QNC5aBgIVByU.png?imageslim)



**注意：**  

- 千万不要说你使用 Dreamweaver 或者 notpad ++
- 不做 .net 也不要用 Visual Studio
- 不做 java 也不要用 eclipse



## 7-2 Git

> Git 详细介绍：可参考的的博客：[Git篇](http://zxinc520.com/lcj/%225d285a027b8c9f7d8dc4f627%22)  

- 正式项目都需要代码版本管理
- 大型项目需要多人协作开发
- Git 和 linux 是一个作者





## 7-3 模块化

> 模块化编程就是通过组合一些__相对独立可复用的模块__来进行功能的实现，其最核心的两部分是__定义模块__和__引入模块__；
>
> - 定义模块时，每个模块内部的执行逻辑是不被外部感知的，只是导出（暴露）出部分方法和数据；
> - 引入模块时，同步 / 异步去加载待引入的代码，执行并获取到其暴露的方法和数据；
>
> **模块化的发展情况** ：无模块化-->CommonJS规范-->AMD规范-->CMD规范-->ES6模块化
>
> [Javascript 模块化指北](https://juejin.im/post/5b6c222a6fb9a04fde5af4ee) 
>
> [这一次，我要弄懂javascript的模块化](https://juejin.im/post/5b4420e7f265da0f4b7a7b27)   



### 知识点

- 不使用模块化的情况
- 使用模块化
- AMD
- CommonJS



#### 无模块化

script标签引入js文件，相互罗列，但是被依赖的放在前面，否则使用就会报错。如下：

```js
   <script src="jquery.js"></script>
　　<script src="jquery_scroller.js"></script>
　　<script src="main.js"></script>
　　<script src="other1.js"></script>
　　<script src="other2.js"></script>
　　<script src="other3.js"></script>
```

​    即简单的将所有的js文件统统放在一起。但是这些文件的顺序还不能出错，比如jquery需要先引入，才能引入jquery插件，才能在其他的文件中使用jquery。缺点很明显：

- 污染全局作用域
- 维护成本高
- 依赖关系不明显





### AMD规范

> 异步模块定义（**AMD**）API指定了一种定义模块的机制，以便可以异步加载模块及其依赖项。这特别适用于浏览器环境，其中模块的同步加载会导致性能，可用性，调试和跨域访问问题。



- require.js  <https://requirejs.org/> 
- 全局 define 函数
- 全局 require 函数
- 依赖 JS 会自动、异步加载



AMD标准中，定义了下面三个API：

```javascript
require([module], callback)
define(id, [depends], callback)
require.config()
```

即通过define来**定义**一个模块，然后使用require来**加载**一个模块, 使用require.config()指定引用路径。



#### 举例说明： 

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" data-main="./main.js">
</script>
```

*main.js:*

```js
define(["./a.js"], function (a) {
    var data = new Date()
    a.printDate(data)
});
```

*a.js:* 

```js
define(["./a-util.js"], function (aUtil) {
    var a = {
        printDate: function (data) {
            console.log(aUtil.aGetFormatDate(data))
        }
    }
    return a
});
```

*a-util.js:* 

```js
define(["./util.js"], function (util) {
    var aUtil = {
        aGetFormatDate: function (data) {
            return util.getFormatDate(data, 2)
        }
    }
    return aUtil
});
```

*util.js:* 

```js
define(function () {
    var util = {
        getFormatDate: function (data, type) {
            if (type === 1) {
                return '2019-07-19'
            }
            if (type === 2) {
                return '2019年6月20日'
            }
        }
    }
    return util
});
```

![mark](http://static.zxinc520.com/blog/20190719/tVkLYFlEzrtH.png?imageslim)



### CommonJS

> 2009 年 ry 发布 Node.js 的第一个版本，CommonJS 作为其中最核心的特性之一，适用于服务端下的场景；历年来的考察和时间的洗礼，以及前端工程化对其的充分支持，CommonJS 被广泛运用于 Node.js 和浏览器；

```js
// Core Module
const cp = require('child_process');
// Npm Module
const axios = require('axios');
// Custom Module
const foo = require('./foo');

module.exports = { axios };
exports.foo = foo;
```



**规范**  

- module (Object): 模块本身
- exports (*): 模块的导出部分，即暴露出来的内容
- require (Function): 加载模块的函数，获得目标模块的导出值（基础类型为复制，引用类型为浅拷贝），可以加载内置模块、npm 模块和自定义模块。



**nodejs 模块化规范，现在被大量用前端，原因** ：

- 前端开发依赖的插件课库，都可以从 npm 中获取
- 构建工具的高度自动化，使得使用 npm 的成本非常低
- CommonJS 不会异步加载 JS ，而是同步一次性加载出来



#### 使用 CommonJS

> **module**  (Object)、**exports**  (*)、**require**  (Function)

```js
//util.ls
module.export = {
    getFormatDate: function (data, type) {
        if (type === 1) {
            return '2019-07-19'
        }
        if (type === 2) {
            return '2019年6月20日'
        }
    }
}

//a-util.js
var util =require('util.js')
module.export={
    aGetFormatDate: function (data) {
        return util.getFormatDate(data, 2)
    }
}
```

#### 特性总结

- 同步执行模块声明和引入逻辑，分析一些复杂的依赖引用（如循环依赖）时需注意；
- 缓存机制，性能更优，同时限制了内存占用；
- Module 模块可供改造的灵活度高，可以实现一些定制需求（如热更新、任意文件类型模块支持）；



#### AMD 和 CommonJS的使用场景

- 需要异步加载 JS ，使用 AMD
- 使用了npm之后建议使用 CommonJS



### 重点总结

- AMD
- CommonJS
- 两者的区别



## 7-4 构建工具

> 我们一定会感叹前端技术发展之快，各种可以提高开发效率的新思想和框架层出不穷。但是他们都有一个共同特点：源代码无法直接运行，必须通过转换后才能正常运行。
>
> 比如：Grunt 、Gulp、FIS 3、**Webpack**  ...
>
> [前端构建工具发展及其比较](https://juejin.im/entry/5ae5c8c9f265da0b9f400d8e) 
>
> [webpack学习可参考我的博客 ](http://zxinc520.com/lcj/%225cb181596d3d4a5cb52b65c9%22) 和 [我的另一篇博客](http://zxinc520.com/lcj/%225cb72a04009ae94788aa0d7f%22)  均有 涉及。

构建工具就是做这件事，将源代码转换成可以执行的JavaScript、CSS、HTML 代码，包括如下内容：

- 代码转换：将 TypeScript 编译成JavaScript、将 SCSS 编译成 CSS等。
- 文件优化：压缩JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分代码让其异步记在。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件。
- 自动刷新：监听本地源代码变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，将一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。构建为前端开发注入了更大的活力，解放了我们的生产力。

历史上先后出现了一系列构建工具，他们各有优缺点。由于前端工程师很熟悉 JavaScript，Node.js 又可以胜任所有构建需求，所以大多数构建工具都是用 Node.js 开发的。



## 7-5 上线和回滚

- 不会有具体的问题，交流询问的方式



### 知识点

- 上线和回滚的基本流程
- linux 基本命令



#### 上线和回滚的基本流程

- 是非常重要的开发环节
- 各个公司的具体流程不同
- 由专门的工具后者系统完成，我们无需关心细节

- 如果你没有参与过，面试时也要说出要点
- 只讲要点，具体实现无法讲解



### 上线流程要点

- 将测试完成的代码提交到git 版本库的master 分支
- 将当前服务器的代码全部打包并记录版本号，备份
- 将 master 分支的代码提交覆盖到线上服务器，生成新版本号



### 回滚的流程要点

- 将当前服务器的代码打包并记录版本号，备份
- 将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号



### linux 基本命令

- 服务器使用 linux 居多，server版，只有命令行
- 测试环境要匹配线上环境，因此也是 linux
- 经常需要登录测试机来自己配置，获取数据

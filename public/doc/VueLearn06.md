## Vue第六天学习

> file-loader（解决webpack打包图片路径问题，字体路径问题）
>
> webpack中 babel 的配置（处理高级的es6语法或者es7语法）
>
> Vue中的render 函数
>
> 在 webpack 构建的项目中，使用Vue 进行开发
>
> export default 和 export 的使用方式
>
> 结合webpack使用 vue-router
>
> 组件中style标签lang属性和scoped属性的介绍
>
> 抽离路由模块
>
> 一个人如果不想输，就要不断学好眼前的东西，它们将来都会大有用处…

## webpack 后续问题

##### 问题：Webpack打包图片路径问题

![mark](http://static.zxinc520.com/blog/20190415/EHGtOouC7m7W.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190415/67j7Iq3tsM4q.png?imageslim)



#### 在页面中引入图片有两种方式

- img标签引入
- css引入



## 解决方案：Webpack使用file-loader处理图片

### 安装：**file-loader** 包

1.  运行 `npm i url-loader file-loader -D`  来安装 **file-loader** 包

![mark](http://static.zxinc520.com/blog/20190415/tFYCSVQRUkQu.png?imageslim)

​	

2.  配置 webpack.config.js 文件

![mark](http://static.zxinc520.com/blog/20190415/cELvBLsveIEX.png?imageslim)



3.   运行` npm run dev`

![mark](http://static.zxinc520.com/blog/20190415/VVGGMT2828JL.gif)



### file-loader 参数

- `limit`  给定的值，是图片的大小，单位是 byte，如果我们引用的 图片，**大于 **给定的值，则会被转为**base64格式** 的字符串，如果，图片**小于或等于 **给定的 limit 值，则不会被转为 base64的 字符串
  ![mark](http://static.zxinc520.com/blog/20190416/XiEHyP6vdL8s.png?imageslim)

  ![mark](http://static.zxinc520.com/blog/20190416/T1MukN0guNf5.png?imageslim)

  ![mark](http://static.zxinc520.com/blog/20190416/FPE7T3OUKGxd.png?imageslim)

  

- `name`  属性 使图片路径url 不变

![mark](http://static.zxinc520.com/blog/20190416/wX5GMiFDX3zF.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190416/9qKydj98tyeA.png?imageslim)







## 处理字体文件 路径问题

> 使用 **file-loader**

问题描述：引入bootstrap 字体图标库，但报错！

![mark](http://static.zxinc520.com/blog/20190416/1tjFUEn3NBee.png?imageslim)



**解决方案**：

1.  配置 webpack.config.js 

```javascript
{test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//这是 处理 字体文件的 loader
```

![mark](http://static.zxinc520.com/blog/20190417/K7a1le382DJs.png?imageslim)

2.  运行 `npm run dev`



# webpack中 babel 的配置

[babel介绍 ](https://www.babeljs.cn/docs/index.html)

**问题描述**：

1.  webpack中默认只能处理一部分es6语法，一些更高级的es6语法或者es7语法webpack处理不了，这时候就需要借助第三方loader帮助webpack处理这些语法
2.  class是es6中提供的语法，是用来实现es6中面向对象编程的方式，class和static与Java中类似

![mark](http://static.zxinc520.com/blog/20190416/4zFaWW0Qqco2.png?imageslim)

**解决方案**：

1.  通过 **babel** 可以将高级语法转化为低级语法
2.  安装，运行两个命令，安装两套包，去安装 babel 相关的功能
   - **第一套包**：`npm i babel-core babel-loader babel-plugin-transform-runtime -D` 
   - **第二套包**：`npm i babel-preset-env babel-preset-stage-0 -D`
3.  打开webpack配置文件，在module节点写的rules数组中添加一个新的匹配规则

```javascript
	{test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
```

![mark](http://static.zxinc520.com/blog/20190416/T3zLwVwLDPgf.png?imageslim)

<!--在配置babel的loader规则时必须把node_module目录通过exclude排除-->

**排除node_module目录的原因:**

- 如果排除node_module，babel会把node_module目录下的所有第三方js文件都打包编译，这会非常消耗CPU，同时打包速度非常慢
- babel 把node_module中的js文件转化完毕项目也无法正常运行

4.  在项目的根目录中新建一个叫做 **.babelrc** 的 babel 配置文件，这个配置文件属于 **json格式**

```javascript
{
    "presets":["env","stage-0"],
    "plugins":["transform-runtime"]
}
```

![mark](http://static.zxinc520.com/blog/20190416/Mddz8O6ipjPl.png?imageslim)



**报错：**

![mark](http://static.zxinc520.com/blog/20190416/6PopTItC2OrO.png?imageslim)

**解决方案：**执行 `npm i babel-loader@7`

![mark](http://static.zxinc520.com/blog/20190416/HJupUdf1JIBA.png?imageslim)



**报错：**

![mark](http://static.zxinc520.com/blog/20190416/dYb1bw19ID0Y.png?imageslim)

**啊啊啊啊~~ 崩溃！！**



## 修改之后还是跑不起来----醉了！！

![mark](http://static.zxinc520.com/blog/20190416/dK1vXd5NuoO4.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190416/sEpb3GoWOHIM.png?imageslim)

**报错：**

![mark](http://static.zxinc520.com/blog/20190416/vh340CYSUk0d.png?imageslim)

## 升级总结（[来自百度](https://segmentfault.com/a/1190000016458913)）

#### -babel 升级 7.X 踩坑记录

1. babel 包名改变，以前安装是 `npm i babel-*` 现在安装 babel 系列需要写成 `npm i @babel/*`
2. `.babelrc` 文件写法改变，`preset plugins` 等全部写成 `@babel/*` 的形式

```shell
npm:
- babel-preset-env
+ @babel/preset-env
- babel-preset-react
+ @babel/preset-react
- babel-preset-stage-0
 
.babelrc:
- "presets": ["react", "env", "stage-0", "mobx"]
+ "presets": ["@babel/preset-react", "@babel/preset-env", "mobx"]
```

除了上述的`preset`，我还用了`babel-preset-mobx`
但是没找到 `@babel/preset-mobx`，从[babel-preset-mobx git提交日志](https://github.com/zwhitchcox/babel-preset-mobx/commits/master)上看，作者已经支持了最新的`babel`。在之后的测试中，发现`mobx`的功能也能正常使用。
另外，[stage-*已弃用](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)







## 使用Vue实例的render方法

> Vue 推荐使用在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 **render 函数**，它比 template 更接近编译器。



*基本使用**

```html
<div id="app"></div>
<script>
    let login = {
        template: '<h1>login 组件</h1>'
    }
    
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        render(createElement) {
            return createElement(login)
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blog/20190417/El6GtYoXY4Wm.png?imageslim)





## 在 webpack 构建的项目中，使用Vue 进行开发

- 在普通网页中如何使用Vue
  - 1.使用 script 标签，引入 Vue 的包
  - 2.在 index 页面中，创建 一个 id 为 app div 容器
  - 3.通过 new Vue 得到一个 vm 的实例



## 重点：在webpack 中 尝试 使用 Vue

1.  **直接导入 Vue包**：

   ![mark](http://static.zxinc520.com/blog/20190417/fl74cG8ej4BE.png?imageslim)

**结果报错**：

![mark](http://static.zxinc520.com/blog/20190417/wte2gIV3SL5L.png?imageslim)

<!--注意：在webpack 中 使用 `import Vue from 'vue'`导入的 Vue 构造函数，功能不完整，只提供了 **runtime-only** 的方式，并没有提供 像网页中-->

![mark](http://static.zxinc520.com/blog/20190417/FDsekOzOdqSz.png?imageslim)



#### - 回顾 ：包的 **查找** 规则

1.  找 项目根目录中有没有 node_modules 的文件夹
2.  在node_modules  中，根据包名，找对应的 vue 文件夹
3.  在 vue 文件夹中，找 一个叫 package.json 的包配置文件
4.  在 package.json 文件中，查找 一个 main 属性【mian属性指定了这个包在被加载的时候的入口文件】



**解决方案1**：

![mark](http://static.zxinc520.com/blog/20190417/Q2FwTyktL3nF.png?imageslim)



**解决方案2**：

![mark](http://static.zxinc520.com/blog/20190417/67SE8EyWVRmn.png?imageslim)



**解决方案3（更优雅）：**

![mark](http://static.zxinc520.com/blog/20190417/Cfv9yq1PVXPl.png?imageslim)



## 定义 文件形式 vue组件 加载到页面上

**例如**：

![mark](http://static.zxinc520.com/blog/20190417/znhigwsi4kiE.png?imageslim)

**报错：**

![mark](http://static.zxinc520.com/blog/20190417/6ag81mxVMdjN.png?imageslim)



**原因：**

- 默认，webpack 无法打包 .vue 文件，需要安装 **相关的 loader*



**解决方案：**

1. 安装：执行 `npm i vue-loader vue-template-compiler -D` 命令

2. 配置  webpack.config.js 文件

```javascript
{test:/\.vue$/,use:'vue-loader'} 	//处理 .vue后缀名的 loader
```

![mark](http://static.zxinc520.com/blog/20190417/8cY6BeLLmNt2.png?imageslim)

结果：还是报错

![mark](http://static.zxinc520.com/blog/20190417/VgCmomodVkuA.png?imageslim)



#### 原因：Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin 的.

解决：在 **webpack.config.js** 中加入

```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    devtool: "sourcemap",
    entry: './js/entry.js', 
    output: {
        filename: 'bundle.js' 
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module : {}
}

```

![mark](http://static.zxinc520.com/blog/20190417/4zePeemdDl56.png?imageslim)



**使用 render 函数 ：**

![mark](http://static.zxinc520.com/blog/20190417/z60O8OR9qlLk.png?imageslim)![mark](http://static.zxinc520.com/blog/20190417/NG0rBbunP4N7.png?imageslim)





## 总结梳理：

#### 总结梳理： webpack 中如何使用 vue

1. 安装vue的包：  cnpm i vue -S

2. 由于 在 webpack 中，推荐使用 .vue 这个组件模板文件定义组件，所以，需要安装 能解析这种文件的 loader  ，执行命令： `cnpm i vue-loader vue-template-complier -D`

3. 在 main.js 中，导入 vue 模块  import Vue from 'vue'

4. 定义一个 .vue 结尾的组件，其中，组件有三部分组成： template script style

5. 使用 import login from './login.vue' 导入这个组件

6. 创建 vm 的实例 var vm = new Vue({ el: '#app', render: c => c(login) })

7. 在页面中创建一个 id 为 app 的 div 元素，作为我们 vm 实例要控制的区域；





## export default 和 export 的使用方式

**基本使用：**

```vue
<template>
    <div>
        <h3>这是登录组件，vue 文件定义出来的--{{msg}}</h3>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:'哈哈哈'
            }
        },
        methods: {
            show() {
                console.log('调用了 login.vue 中的show 方法！')
            }
        }
    }
</script>

<style>
    
</style>
```

![mark](http://static.zxinc520.com/blog/20190417/VJ8FVeRYb0oV.png?imageslim)

## export，import ，export default是什么？

ES6模块主要有两个功能：export和import
**export** 用于对外输出本模块（一个文件可以理解为一个模块）变量的接口
**import** 用于在一个模块中加载另一个含有export接口的模块。
也就是说使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。这几个都是ES6的语法。



- 注意：export default 向外暴露的成员，可以使用任意的变量来接受
- 注意：在一个模块中，export default 只允许向外暴露一次
- 注意：在一个模块中，可以同时使用 export 和 export default 向外暴露成员



```javascript
在 Node中，使用 var 名称= require('模块标识符')

module.exports和 exports 来暴露成员
```



## export与export default

上面讲的是export和import，但是 **export** 跟 **export default** 有什么区别呢？如下：

1.  export与export default均可用于导出常量、函数、文件、模块等
2.  你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
3.  在一个文件或模块中，export、import可以有多个，export default 仅有一个，**export default** 只能导出**一个默认模块**，这个模块**可以匿名**（ 引入的时候可以给这个模块取任意名字，例如 "obj"，且不需要用大括号括起来。）

**export ：**

```javascript
//demo1.js
export const str = 'hello world'

export function f(a){
    return a+1
}
```

对应的引入方式：

```javascript
//demo2.js
import { str, f } from 'demo1'
```

**export default**：

```javascript
//demo1.js
export default {
    a: 'hello',
    b: 'world'      
}
```

对应的引入方式：

```javascript
//demo2.js
import obj from 'demo1'
```

4.  通过export方式导出，在导入时要**加 { }**，export default则 **不需要**

这样来说其实很多时候export与export default可以实现同样的目的，只是用法有些区别。注意第四条，通过export方式导出，在导入时要加{ }，export default则不需要。使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名。

例如：

```javascript
var name="李四";
export { name }
//import { name } from "/.a.js" 
可以写成：
var name="李四";
export default name
//import name from "/.a.js" 这里name不需要大括号
```



### 说明与比较：new Vue() 和 export default {}？

在生成、导出、导入、使用 Vue 组件的时候，像我这种新手就会常常被位于不同文件的 `new Vue()` 和 `export default{}` 搞得晕头转向。它们含义到底是什么，又有什么异同呢？

首先，Vue 是什么？ po 主的理解是 Vue 就是一个构造函数，生成的实例是一个巨大的对象，可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。

所以渲染的时候，可以使用构造 Vue 实例的方式来渲染相应的 html 页面：

```javascript
new Vue({
    el: '#app'
    ...
})
```

那么 export default {} 又是来干嘛的？

这是在复用组件的时候用到的。假设我们写了一个单页面组件 A 文件，而在另一个文件 B 里面需要用到它，那么就要用 [ES6 的 import/export 语法](http://es6.ruanyifeng.com/?search=%E7%9C%81%E7%95%A5&x=0&y=0#docs/module) ，在文件 A 中定义输出接口 `export **`，在文件 B 中引入 `import **`，然后再生成一个 Vue 实例 `new Vue (**)`，把引入的组件用起来，这样就可以复用组件 A 去配合文件 B 生成 html 页面了。



## 结合webpack使用vue-router

1.  安装  `npm i vue-router -S `

例：

目录结构：

![mark](http://static.zxinc520.com/blog/20190417/MFFstwRsuS8S.png?imageslim)

**main.js：**

```javascript
//在 webpack 构建的项目中，使用Vue 进行开发
import Vue from '../node_modules/vue/dist/vue.js'
//1. 导入 vue-router 包
import VueRouter from 'vue-router'

//2. 手动安装
Vue.use(VueRouter)

//导入app组件
import app from './App.vue'
//导入 Account 组件
import account from './main/Account.vue'
//导入 GoodsList 组件
import goodslist from './main/GoodsList.vue'

//3. 创建路由对象
let router = new VueRouter({
    routes: [
        {path: '/account', component: account},
        {path: '/goodslist', component: goodslist}
    ]
})

let vm = new Vue({
    el: '#app',
    data: {
        msg: "12322"
    },
    render: c => c(app),
    router
})
//注意：App 这个组件，是通过 VM 实例的 render 函数，渲染出来的，render 函数如果要渲染 组件渲染出来的组件，只能是 el ：'#app' 所指定的 元素中

//Account 和 GoodsList 组件，是通过 路由匹配监听到的，所以，这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去
```



**App.vue:**

```vue
<template>
    <div>
        <h1>这是app组件</h1>
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
</script>
<style>
</style>
```

![mark](http://static.zxinc520.com/blog/20190417/8RslBeQhHAvx.gif)





## webpack-路由嵌套

目录结构：

![mark](http://static.zxinc520.com/blog/20190417/KpfhuMnyjazc.png?imageslim)



**main.js:**

```javascript
//在 webpack 构建的项目中，使用Vue 进行开发
import Vue from '../node_modules/vue/dist/vue.js'
//1. 导入 vue-router 包
import VueRouter from 'vue-router'

//2. 手动安装
Vue.use(VueRouter)

//导入app组件
import app from './App.vue'
//导入 Account 组件
import account from './main/Account.vue'
//导入 GoodsList 组件
import goodslist from './main/GoodsList.vue'

import login from './son/login.vue'
import register from './son/register.vue'

//3. 创建路由对象
let router = new VueRouter({
    routes: [
        {
            path: '/account',
            component: account,
            children: [
                {path: 'login', component: login},
                {path: 'register', component: register}
            ]
        },
        {path: '/goodslist', component: goodslist}
    ]
})

let vm = new Vue({
    el: '#app',
    data: {
        msg: "12322"
    },
    render: c => c(app),
    router
})
//注意：App 这个组件，是通过 VM 实例的 render 函数，渲染出来的，render 函数如果要渲染 组件渲染出来的组件，只能是 el ：'#app' 所指定的 元素中

//Account 和 GoodsList 组件，是通过 路由匹配监听到的，所以，这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去
```



**App.vue:**

```vue
<template>
    <div>
        <h1>这是app组件</h1>
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
</script>

<style>
</style>
```



**Account:**

```vue
<template>
    <div>
        <h1>这是Account组件</h1>

        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
</script>

<style>
</style>
```

![mark](http://static.zxinc520.com/blog/20190417/tSeVisl10K0W.gif)

## 组件中style标签lang属性和scoped属性的介绍

**scoped：**在子组件中设置style属性，如果不加scoped属性，如果是单页面程序，样式就会作用到全局中去，加了scoped属性以后，表示限制了该样式作用域只在该组件中。

```vue
<template>
    <div>
        <h1>这是goods组件</h1>

    </div>
</template>

<script></script>

<style scoped>

    div{
        color: red;
    }
</style>
```



**lang属性：**普通的style标签只支持普通的样式,如果想启用scss或less,需要为style设置lang属性

```vue
<template>
    <div>
        <h1>这是account组件</h1>

    </div>
</template>

<script></script>

<style lang="scss" scoped>
    body{
        div{
            font-style: italic;

        }
    }
</style>
```



## 抽离路由模块

目录结构：

![mark](http://static.zxinc520.com/blog/20190417/imC2sybXMC8G.png?imageslim)

**main.js:**

```javascript
//在 webpack 构建的项目中，使用Vue 进行开发
import Vue from '../node_modules/vue/dist/vue.js'
//1. 导入 vue-router 包
import VueRouter from 'vue-router'

//2. 手动安装
Vue.use(VueRouter)

//导入app组件
import app from './App.vue'
//导入 自定义路由模块
import router from './router.js'

let vm = new Vue({
    el: '#app',
    data: {
        msg: "12322"
    },
    render: c => c(app),
    router
})
//注意：App 这个组件，是通过 VM 实例的 render 函数，渲染出来的，render 函数如果要渲染 组件渲染出来的组件，只能是 el ：'#app' 所指定的 元素中

//Account 和 GoodsList 组件，是通过 路由匹配监听到的，所以，这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去
```



**router.js:**

```javascript
import VueRouter from 'vue-router'

//导入 Account 组件
import account from './main/Account.vue'
//导入 GoodsList 组件
import goodslist from './main/GoodsList.vue'

import login from './son/login.vue'
import register from './son/register.vue'
//3. 创建路由对象
let router = new VueRouter({
    routes: [
        {
            path: '/account',
            component: account,
            children: [
                {path: 'login', component: login},
                {path: 'register', component: register}
            ]
        },
        {path: '/goodslist', component: goodslist}
    ]
})

export default router
```


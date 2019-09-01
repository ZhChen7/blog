# Vue第五天

> 监听事件（keyup ，watch ，computed  ）
>
> nrm （简单介绍了下）
>
> webpack （很重要！很关键！很实用！重点中的重点！知识点有点多，得慢慢品味！）



## 监听事件

#### 需求：实现名称监听案例

#### 1.keyup 事件监听

```html
<div id="app">
    <input type="text" v-model="firstName" @keyup="getFullName">
    <input type="text" v-model="lastName" @keyup="getFullName">
    <input type="text" v-model="fullName">
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            firstName:'',
            lastName:'',
            fullName:''
        },
        methods: {
            getFullName(){
                this.fullName=this.firstName+this.lastName
            }
        }
    })
</script>
```

#### 2.使用  watch 监听 （ 更常用 -- 用途更广 ）

```html
<div id="app">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <input type="text" v-model="fullName">
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            firstName: '',
            lastName: '',
            fullName: ''
        },
        //使用这个 属性，可以监视 data 中指定数据的变化，然后触发这个 watch 中对应的 function 处理函数
        watch: {
            firstName(newVal, oldVal) {
                // this.fullName = this.firstName + this.lastName
                this.fullName = newVal + this.lastName
            },
            lastName(newVal, oldVal) {
                // this.fullName = this.firstName + this.lastName
                this.fullName = this.firstName + newVal
            }
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blog/20190412/4gxmjjUxK2At.gif)

- ##### watch  监听 路由 改变

```html
<div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
</div>

<script>
    let login = {
        template: '<h3>这是登录子组件</h3>'
    }
    let register = {
        template: '<h3>这是注册子组件</h3>'
    }

    let router = new VueRouter({
        routes: [
            {
                path: '/login', component: login
            },
            {
                path: '/register', component: register
            }
        ],
        linkActiveClass: 'myactive'
    })
    
    let vm = new Vue({
        el: '#app',
        data: {},
        router,
        watch: {
            '$route.path'(newVal, oldVal) {
                if (newVal == '/login') {
                    console.log('欢迎来到登录页面')
                } else if(newVal == '/register'){
                    console.log('欢迎来到注册页面')
                }
            }
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blog/20190412/6V2XPG6gVhim.gif)

#### 3. computed  监听

```html
<div id="app">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <input type="text" v-model="fullName">
</div>
<script>
    let vm = new Vue({	
        el: '#app',
        data: {
            firstName: '',
            lastName: ''
        },
        //计算属性：在引用的时候，一定不要加() 去调用，直接把它当作 普通属性去使用就好了
        //只要 计算属性，这个方法内部，所用到的 任何 data 中的数据发生了变化，就会立即重新 计算 这个属性的值
        //计算属性的求值结果，会被缓存起来，方便下次直接使用；如果 计算属性中的数据 都没有发生变化，则不会 重新对 计算属性求值
        computed: {
            fullName() {
                return this.firstName + this.lastName
            }
        }
    })
</script>
```

#### **methods,watch,computed的区别**

1. `computed` 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
2. `methods` 方法表示一个具体的操作，主要书写业务逻辑；
3. `watch` 一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是 computed 和 methods 的结合体；



## nrm

- 什么是nrm?

  **nrm** 是一个 `npm` 源管理器，允许你快速地在 `npm` 源间切换

- 安装 nrm

  在命令行执行命令，`npm install -g nrm`，全局安装nrm。



![mark](http://static.zxinc520.com/blog/20190412/2eNadQOmpWKL.png?imageslim)

- 切换

  如果要切换到`taobao`源，执行命令`nrm use taobao`。

![mark](http://static.zxinc520.com/blog/20190412/4BzzVOzz2ER5.png?imageslim)



## webpack

#### 1.在网页中会引用哪些常见的静态资源？

- JS
  - .js  .jsx  .coffee  .ts（TypeScript 类 C# 语言）
- CSS
  - .css .less .sass .scss
- Images
  - .jpg .png .gif .bmp .svg
- 字体文件（Fonts）
  - .svg .ttf .eot .woff .woff2
- 模板文件
  - .ejs .jade .vue【这是在webpack中定义组件的方式，推荐这么用】



#### 2.网页中引入的静态资源多了以后有什么问题？？？

1. 网页加载速度慢， 因为 我们要发起很多的二次请求；
2. 要处理错综复杂的依赖关系



#### 3.如何解决上述两个问题

1. 合并、压缩、精灵图、图片的 Base64 编码
2. 可以使用之前学过的requireJS、也可以使用webpack可以解决各个包之间的复杂依赖关系；



#### 4.什么是 webpack?

webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；





#### 5.如何完美实现上述的2种解决方案

1. 使用 [Gulp](https://www.gulpjs.com.cn/)， 是基于 task 任务的；
2. 使用 [Webpack](https://webpack.github.io/)， 是基于整个项目进行构建的；
   - 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
   - 根据官网的图片介绍webpack打包的过程
   - [webpack官网](http://webpack.github.io/)



#### 6.webpack安装的两种方式

1. 运行`npm i webpack -g ` 全局安装webpack，这样就能在全局使用webpack的命令
2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目依赖中





## webpack 小案例

**最终实现效果图：**

![mark](http://static.zxinc520.com/blog/20190413/Nhxhjre7JLIk.gif)



## 第一阶段：用webpack打包 main.js 文件生成 bundle.js 文件

***目录结构***：

![mark](http://static.zxinc520.com/blog/20190412/lCOHlyRXWvxs.png?imageslim)



**index.html**：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="../dist/bundle.js"></script>
    </head>
    <body>
        <ul>
            <li>这是第1个li</li>
            <li>这是第2个li</li>
            <li>这是第3个li</li>
            <li>这是第4个li</li>
            <li>这是第5个li</li>
            <li>这是第6个li</li>
            <li>这是第7个li</li>
            <li>这是第8个li</li>
            <li>这是第9个li</li>
            <li>这是第10个li</li>
        </ul>
    </body>
</html>
```

**main.js:**

```javascript
// main.js 是我们项目的JS的入口文件

//1.导入 Jquery
// import *** from *** 是 ES6 中导入模块的方式
//由于 ES6 语法太高级了，浏览器解析不了，所以，执行会报错
import $ from 'jquery'

$(function () {
    $('li:odd').css({
        'background':'red'
    })
    $('li:even').css({
        'background':function () {
            return '#'+'D97634'
        }
    })
})

```

1.安装完相关包之后，在根目录下运行 `webpack .\src\main.js -o .\dist\bundle.js`

![mark](http://static.zxinc520.com/blog/20190412/VN1klW9vTlKk.png?imageslim)

运行结果：

![mark](http://static.zxinc520.com/blog/20190412/cCQTanNAophR.png?imageslim)



## 第二阶段：配置  webpack.config.js

> Webpack 在执行的时候，除了在 **命令行传入参数**，还可以通过指定的 **配置文件** 来执行。默认情况下，会搜索当前目录的 `webpack.config.js` 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 `--config` 选项来指定配置文件。



##### 当我们在 控制台，直接输入 **webpack** 命令执行的时候，webpack 做了以下几步：

1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
2. webpack 就会去 项目的 根目录中，查找一个叫做 `webpack.config.js` 的配置文件
3. 当找到配置文件后，webpack 会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中，导出的配置对象
4. 当 webpack 拿到 配置对象后，就拿到了 配置对象中，指定的 入口  和 出口，然后进行打包构建；



**webpack.config.js**：

```javascript
const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
    output: { // 输出文件相关的配置
        path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' // 这是指定 输出的文件的名称
    }
}
```



- 然后再根目录下运行 webpack

![mark](http://static.zxinc520.com/blog/20190412/Jtcry4FyA52b.png?imageslim)



## 使用 webpack-dev-server 这个工具，来实现自动打包编译的功能

1. 运行 `npm i webpack-dev-server -D` 把这个工具安装到项目的本地开发依赖  [npm install --save 和 npm install -d的区别](https://blog.csdn.net/wangguoyu1996/article/details/80443861)
2. 安装完毕后，这个 工具的用法， 和 webpack 命令的用法，完全一样
3. 由于，我们是在项目中，本地安装的 webpack-dev-server ， 所以，无法把它当作 脚本命令，在powershell 终端中直接运行；（只有那些 安装到 全局 -g 的工具，才能在 终端中正常执行）
4. 注意： webpack-dev-server 这个工具，如果想要正常运行，要求，在本地项目中，必须安装 webpack
5. webpack-dev-server 帮我们打包生成的 bundle.js 文件，并没有存放到 实际的 物理磁盘上；而是，直接托管到了 电脑的内存中，所以，我们在 项目根目录中，根本找不到 这个打包好的 bundle.js;
6. 我们可以认为， webpack-dev-server 把打包好的 文件，以一种虚拟的形式，托管到了 咱们项目的 根目录中，虽然我们看不到它，但是，可以认为， 和 dist  src   node_modules  平级，有一个看不见的文件，叫做 bundle.js



- 再 package.json 文件中 配置 `webpack-dev-server `

![mark](http://static.zxinc520.com/blog/20190413/0mEiuATRmg4V.png?imageslim)



- 在根目录下运行命令：`npm run dev`

![mark](http://static.zxinc520.com/blog/20190413/01rkpce0a7ou.png?imageslim)

#### 自动编译（保存代码即自动刷新浏览器）

![mark](http://static.zxinc520.com/blog/20190413/sEKMRkaMQOuX.png?imageslim)



## 运行 npm run dev 后  自动 **打开对应端口号**的浏览器窗口  改端口号 显示内容 

### 方式一：配置 `package.json` 文件 

优点：-------推荐，简单，直接。在开发中更常用。

**package.json:**

![mark](http://static.zxinc520.com/blog/20190413/bhRisI6Rkma4.png?imageslim)



### 方式二：配置  webpack.config.js  文件

- 相比之下 麻烦一点

**webpack.config.js：**

```javascript
const path = require('path')
// 启用热更新的 第2步
const webpack = require('webpack')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
    output: { // 输出文件相关的配置
        path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' // 这是指定 输出的文件的名称
    },
    devServer: { //这是配置  dev-server 命令参数的第二种形式，相对来说，麻烦一点。
        open: true,//自动打开浏览器
        port: 3000,//设置启动时候的运行端口
        contentBase: 'src',
        hot: true //启用热更新 第1步
    },
    plugins: [ //配置插件的节点
        new webpack.HotModuleReplacementPlugin() // new 一个热更新的 模块对象， 这是 启用热更新的第 3 步
    ]
}
```



## 使用  html-webpack-plugin  插件

> 配合 `webpack-dev-server` 工具使用
>
> 作用：为 html文件中引入的外部资源



**这个插件的两个作用：**

- 为html文件中引入的外部资源如`script`、`link`动态添加每次compile后的hash，防止引用缓存的外部文件问题
- 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置**N**个`html-webpack-plugin`可以生成**N**个页面入口



**实例作用（简单来说）**：  

1. 自动在内存中根据指定页面生成一个内存的页面

2. 自动，把打包好的 bundle.js 追加到页面中去

   ![mark](http://static.zxinc520.com/blog/20190413/A77bGaRpNnBK.png?imageslim)

###### **安装使用如下：**

一、首先安装html-webpack-plugin插件

​	在cmd中打开项目，输入 	`npm i html-webpack-plugin -D` 

二、在webpack-config.js的plugins里面添加 信息，如下图

![mark](http://static.zxinc520.com/blog/20190413/FtRgDnktWRwG.png?imageslim)

然后在cmd中输入 `npm run dev` ，即可以在项目文件夹下自动生成 index.html。如果报错，则表示，未安装html-webpack-plugin插件。

 注：不配置任何选项的`html-webpack-plugin`插件，他会默认将webpack中的`entry`配置所有入口thunk和`extract-text-webpack-plugin`抽取的css样式都插入到文件指定的位置





## webpack 处理第三方文件类型的过程

#### 需求：打包处理  css 文件

**注意：**

- webpack, 默认只能打包处理 JS 类型的文件，无法处理 其它的非 JS 类型的文件； 如果要处理 非JS类型的文件，我们需要手动安装一些 合适 第三方 loader 加载器；

- 1.如果想要打包处理 css 文件，需要安装 `npm i style-loader css-loader -D`

  ![mark](http://static.zxinc520.com/blog/20190413/oqXTmYRoKMoA.png?imageslim)

- 2.打开 webpack.config.js 这个配置文件，在 里面，新增一个 配置节点，叫做 module, 它是一个对象；在 这个 module 对象身上，有个 rules 属性，这个 rules 属性是个 数组；这个数组中，存放了，所有第三方文件的 匹配和 处理规则；

  ![mark](http://static.zxinc520.com/blog/20190413/Xu64lPnxIQLS.png?imageslim)



**webpack 处理第三方文件类型的过程：**

1. 发现这个 要处理的文件不是JS文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则
2. 如果能找到对应的规则， 就会调用 对应的 loader 处理 这种文件类型；
3. 在调用loader 的时候，是从后往前调用的；
4. 当最后的一个 loader 调用完毕，会把 处理的结果，直接交给 webpack 进行 打包合并，最终输出到  bundle.js 中去



## 打包 less 文件

**第一步：安装包：**

1. 安装  `npm i less-loader -D`

   ![mark](http://static.zxinc520.com/blog/20190413/0bSMpt6TO1EJ.png?imageslim)



2. less-loader 内部依赖 less 包，所以安装 `npm i less -D`

![mark](http://static.zxinc520.com/blog/20190413/5RJ7elAXllGf.png?imageslim)



 **第二步：配置  webpack.config.js 文件**

![mark](http://static.zxinc520.com/blog/20190413/qjRV20IM5XiU.png?imageslim)

第三步：根目录下 运行 `npm run dev`

![mark](http://static.zxinc520.com/blog/20190413/Nhxhjre7JLIk.gif)

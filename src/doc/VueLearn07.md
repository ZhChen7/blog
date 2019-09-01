# Vue第七天学习

> Mint-UI 学习
>
> MUI

## Mint-UI 

### 基于 Vue.js 的移动端组件库

**特性介绍：**[Mint-UI官网](http://mint-ui.github.io/#!/zh-cn)

1. Mint UI 包含丰富的 CSS 和 JS 组件，能够满足日常的移动端开发需要。通过它，可以快速构建出风格统一的页面，提升开发效率。
2. 真正意义上的按需加载组件。可以只加载声明过的组件及其样式文件，无需再纠结文件体积过大。
3. 考虑到移动端的性能门槛，Mint UI 采用 CSS3 处理各种动效，避免浏览器进行不必要的重绘和重排，从而使用户获得流畅顺滑的体验。
4. 依托 Vue.js 高效的组件化方案，Mint UI 做到了轻量化。即使全部引入，压缩后的文件体积也仅有 ~30kb (JS + CSS) gzip。



**安装：**

```shell
// 安装
# Vue 1.x
npm install mint-ui@1 -S
# Vue 2.0
npm install mint-ui -S
```

**来自官网**：

```javascript
// 引入全部组件
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
// 按需引入部分组件
import { Cell, Checklist } from 'minu-ui';
Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
```



### **项目演示：**

项目目录：

![mark](http://static.zxinc520.com/blog/20190418/udiBT1HHpIk4.png?imageslim)



**main.js:**

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入所以的 MintUI 组件
//导入 mint-ui
import MintUI from 'mint-ui' //把所有的组件都导入进来
//这里可以 省略 node_modules 目录
import 'mint-ui/lib/style.css'

Vue.use(MintUI);//把所有的组件，注册为全局的组件

//导入app组件
import app from './App.vue'
//导入 自定义路由模块
import router from './router.js'

let vm = new Vue({
    el: '#app',
    data: {
        msg: "123"
    },
    render: c => c(app),
    router
})
```

**App.vue:**

```vue
<template>
    <div>
        <h1>这是app组件</h1>
        <mt-button type="primary" size="large">default</mt-button>
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



![mark](http://static.zxinc520.com/blog/20190418/L8Aec7UwlBhj.png?imageslim)



## JS components 使用

#### 例如：使用  **Toast 组件**

App.vue:

```vue
<template>
    <div>
        <h1>这是app组件</h1>
        <mt-button type="primary" size="large" @click="show">default</mt-button>
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    
    export default {
        data() {
            return {}
        },
        methods: {
            show() {
                Toast({
                    message: 'Upload Complete',
                    position: 'middle',
                    duration: 5000
                });
            }
        }
    }
</script>

<style>
</style>
```

![mark](http://static.zxinc520.com/blog/20190418/4i9Jbv1iwEGP.gif)

## 使用 **bootstrap 图标** 配合 **Toast 组件 **使用

1.  安装bootstrap包

```shell
npm i bootstrap@3.3.7 -S
```

2.  在 main.js 文件

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
```

3.  在 App.vue 文件里

![mark](http://static.zxinc520.com/blog/20190418/07pVWBGzLVEB.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190418/9NNEMXf71zIY.gif)

#### 自定义图标颜色

![mark](http://static.zxinc520.com/blog/20190418/7x5iyU8lwDzL.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190418/IX8tRWh9aU8d.gif)



## 模拟 完成接收数据  Toast 组件消失需求

### 需求： 1s 后 Toast 组件消失需求

**App.vue:**

```vue
<template>
    <div>
        <h1>这是app组件</h1>
        <mt-button type="primary" size="large" @click="show">default</mt-button>
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                instance: null
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.show()
                setTimeout(() => {
                    this.instance.close()
                }, 1000)
            },
            show() {
                this.instance = Toast({
                    message: 'Upload Complete',
                    duration: -1,
                    position: 'middle',
                    duration: 5000,
                    iconClass: 'glyphicon glyphicon-heart',
                    className: 'mytoast'
                });
            }
        }
    }
</script>

<style>
</style>
```

![mark](http://static.zxinc520.com/blog/20190418/qPQ3yPDUEMHo.gif)

## babel-plugin-component 插件

**作用**：为了项目整体内容不过于庞大，按需加载是许多第三方的库和插件必不可少的，于是使用了官方提供的按需加载插件[babel-plugin-component](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FElementUI%2Fbabel-plugin-component)

### 按需导入：

1. 1.安装：

```shell
npm install babel-plugin-component -D
```

2. 2.修改 **.babelrc** 里面的 **plugins** ：

```json
{
  "presets": [
    "env",
    "stage-0"
  ],
  "plugins": [
    "transform-runtime",
    [
      "component",
      [
        {
          "libraryName": "mint-ui",
          "style": true
        }
      ]
    ]
  ]
}
```

## 项目改造

#### 按需导入

**mian.js:**

```javascript
import 'mint-ui/lib/style.css'

//按需导入
import { Button } from 'mint-ui'
Vue.component('mybtn', Button)//导入自定义的 mybtn 按钮组件
```

**App.vue:**

```vue
<template>
    <div>
        <h1>这是app组件</h1>
        <mybtn type="primary">mybtn</mybtn>
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>
        <router-view></router-view>
    </div>
</templat
```

![mark](http://static.zxinc520.com/blog/20190418/Kh82KQyT57d4.png?imageslim)

## MUI

> 注意： MUI 不同于 Mint-UI，MUI只是开发出来的一套好用的代码片段，里面提供了配套的样式、配套的HTML代码段，类似于 Bootstrap； 而 Mint-UI，是真正的组件库，是使用 Vue 技术封装出来的 成套的组件，可以无缝的和 VUE项目进行集成开发；
> 因此，从体验上来说， Mint-UI体验更好，因为这是别人帮我们开发好的现成的Vue组件；
> 从体验上来说， MUI和Bootstrap类似；
> 理论上，任何项目都可以使用 MUI 或 Bootstrap，但是，MInt-UI只适用于Vue项目；

**mui框架：**性能和体验的差距，一直是mobile app开发者放弃HTML5的首要原因。 浏览器天生的切页白屏、不忍直视的转页动画、浮动元素的抖动、无法流畅下拉刷新等问题，这些都让HTML5开发者倍感挫败，尤其拿到Android低端机运行，摔手机的心都有； 另一方面，浏览器默认控件样式又少又丑，制作一个漂亮的控件非常麻烦，也有一些制作简单的ui框架但性能低下。

mui框架有效的解决了这些问题，这是一个可以方便开发出高性能App的框架，也是目前最接近原生App效果的框架。



**注意：** MUI 并不能使用  npm 去下载，需要自己手动从 github 上，下载现成的包，自己解压出来，然后手动拷贝到项目中使用；



1.  下载 MUI包 从 github 上

### 使用：

**在main.js导入MUI包:**

```javascript
import './lib/dist/css/mui.min.css'
```

**在App.vue 中使用（例如一个 按钮）：**

```html
<button type="button" class="mui-btn mui-btn-royal">Badge button <span class="mui-badge mui-badge-royal">999</span></button>
```

![mark](http://static.zxinc520.com/blog/20190418/TxVONoruT7Xq.png?imageslim)






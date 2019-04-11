## Vue第三天

> 过渡效果
>
> 组件

# 过渡效果

### 概述

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：

- 1.在 CSS 过渡和动画中自动应用 class
- 2.可以配合使用第三方 CSS 动画库，如 Animate.css
- 3.在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 4.可以配合使用第三方 JavaScript 动画库，如 [Velocity.js](https://github.com/shepherdwind/velocity.js)

### 1.使用过度类名实现动画

- 写个简单例子说明：

```html
 <!--自定义两组样式，来控制 transition 内部的元素实现动画-->
<style>
    /* v-enter ：  【这是一个时间点】 是进入之前,元素的起始状态，此时还没有开始进入
       v-leave-to：【这是一个时间点】 是动画离开之后，离开的终止状态，此时， 元素动画已经结束
    */
    .v-enter, .v-leave-to {
        opacity: 0;
        transform: translateX(80px);
    }
    /*
      v-enter-active: 入场动画的时间段
      v-leave-active：离场动画的时间段
    */
    .v-enter-active, .v-leave-active {
        transition: all 2s;
    }
</style>

<div id="app">
    <button @click="flag=!flag">点击</button>
    <!--1. transition 元素，是Vue 官方提供的-->
    <transition>
        <h3 v-if="flag">这是一个h3</h3>
    </transition>
</div>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            flag: true
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190408/saPf7Rw6MKa5.gif)

- 修改v-前缀(自定义前缀)

```html
<style>
    .my-enter, .my-leave-to {
        opacity: 0;
        transform: translateY(-80px);
    }
    .my-enter-active, .my-leave-active {
        transition: all 2s;
    }
</style>
<body>
    <button @click="flag1=!flag1">点击</button>
    <!--1. transition 元素，是Vue 官方提供的-->
    <transition name="my">
        <h6 v-if="flag1">这是一个h6</h6>
    </transition>
</body>
```

### 2.使用第三方类实现动画

[animate.css官网](https://daneden.github.io/animate.css/)

[在线cdn](https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css)

```html
<link rel="stylesheet" href="../../animate.css">
<div id="app">
    <button @click="flag=!flag">点击</button>
    <!--使用 transition 元素 包裹起来-->
        <transition 
                enter-active-class="bounceIn" 
                leave-active-class="bounceOut"     
                :duration="{enter:200,leave:400}">
         <h3 v-if="flag">这是一个h3</h3>
      </transition>
</div>
```

- 直接使用在元素身上

```html
<transition >
    <h3  class="animated infinite bounce delay-2s">这是一个h3</h3>
</transition>
```

### 3.JavaScript钩子

- html:

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

- js

```javascript
methods: {
  // 进入中
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
      done()
  },
  afterEnter: function (el) {
  },
  enterCancelled: function (el) {
  },

  // 离开时
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

##### 案例：小球动画

```html
<div id="app">
    <button @click="flag = !flag">加入购物车</button>
    <!--使用 transition 元素把 小球包裹起来-->
    <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                >
        <div v-show="flag" class="ball"></div>
    </transition>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            flag: false
        },
        methods: {
        //注意：动画钩子函数的第一个参数 el ，表示 要执行动画的那个 DOM 元素，是个原生的JS 对象
            beforeEnter(el) {
        //beforeEnter : 表示动画入场之前，此时，动画尚未开始，可以在 beforeEnter中，设置元素开始动画之前的起始样式
                el.style.transform = 'translate(0,0)'
            },
            enter(el, done) {
                el.offsetWidth
                //这句话，没有实际的作用，但是，如果不写，出不来动画效果
                //可以认为  el.offsetWidth 会强制动画刷新
                // enter 表示动画 开始之后的样式，这里，可以设置小球完成动画之后的,结束状态
                el.style.transform = 'translate(150px,150px)'
                el.style.transition = 'all 2s'

                //这里的done， 起始就是 afterEnter 这个函数。也就是说：done 是afterEnter函数的引用
                done()
            },
            afterEnter(el) {
              //动画完成之后，会调用 afterEnter()
                this.flag = !this.flag
            }
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190408/KnduLdOBz0cI.gif)

### 列表过渡

目前为止，关于过渡我们已经讲到：

- 单个节点
- 一次渲染多个节点

那么怎么同时渲染整个列表，比如使用 `v-for` ？在这种场景中，使用`<transition-group>` 组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 不同于 `<transition>`， 它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` 特性更换为其他元素。
- 元素 **一定需要** 指定唯一的 `key` 特性值



举例说明：

- 列表添加动画

```html
<style>
    .v-enter, .v-leave-to {
        opacity: 0;
        transform: translateY(80px);
    }

    .v-enter-active, .v-leave-active {
        transition: all 2s;
    }
</style>

    <div id="app">
        <ul>
            <!--在实现列表过度的时候，如果需要过度的元素，是通过 v-for 循环渲染出来的，不能使用transition 包裹，需要使用transitionGroup-->
            <!--如果要为 v-for 循环创建的元素设置动画，必须为每一个元素 设置 :key 属性-->
            <transition-group>
                <li v-for="item in list" :key="item.id">{{item.id}}---					{{item.name}}</li>
            </transition-group>
        </ul>
        <label for="id">id:</label>
        <input type="text" v-model="id" id="id">
        <label for="name">name:</label>
        <input type="text" v-model="name" id="name">
        <button @click="add">添加</button>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                list: [{
                    id: 1, name: '张三'
                }, {
                    id: 2, name: '李四'
                }, {
                    id: 3, name: '王五'
                }, {
                    id: 4, name: '赵二'
                }, {
                    id: 5, name: '王八'
                }
                      ],
                id: '',
                name: ''
            },
            methods: {
                add() {
                    this.list.push({id: this.id, name: this.name})
                    this.id = '',
                    this.name = ''
                }
            }
        })
    </script>
```

![mark](http://static.zxinc520.com/blogimage/20190408/BniWO4XoExQy.gif)

- 删除动画

```html
<style>
    .v-enter, .v-leave-to {
        opacity: 0;
        transform: translateY(80px);
    }
    .v-enter-active, .v-leave-active {
        transition: all 2s;
    }
    
     /*下面的 .v-move和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐飘上来的效果*/
    .v-move{
        transition: all 3s ease;
    }
    .v-leave-active{
        position: absolute;
    }
</style>

<ul>    
    <transition-group>
        <li v-for="(item,i) in list" :key="item.id" @click="del(i)">			{{item.id}}---{{item.name}}</li>
    </transition-group>
</ul>
```

![mark](http://static.zxinc520.com/blogimage/20190408/vkbO2TDtKy2q.gif)

- 实现入场时候的效果（ appear 属性）

```html
<ul>
    <!--给 transition-group 添加 appear 属性，实现入场时候的效果-->
    <transition-group appear>
        <li v-for="(item,i) in list" :key="item.id" @click="del(i)">			{{item.id}}---{{item.name}}</li>
    </transition-group>
</ul>
```

![mark](http://static.zxinc520.com/blogimage/20190408/yEodBeN1cCdm.gif)

- 解决 ul 标签下 span 包裹问题

![mark](http://static.zxinc520.com/blogimage/20190402/vn2iYgGzCqCz.png?imageslim)

- 解决方案
- 去掉 ul 标签，并给 transition-group 标签加 tag="ul" 。

```html
<transition-group appear tag="ul">
    <li v-for="(item,i) in list" :key="item.id" @click="del(i)">			{{item.id}}---{{item.name}}</li>
</transition-group>
```



# 组件

## 什么是组件？

> 组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。
>
> 组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可



## 组件化和模块化的不同：

### 组件化 

> ​        就是**"基础库"**或者**“基础组件"，**意思是把代码重复的部分提炼出一个个组件供给功能使用。
>
> ​        使用：Dialog，各种自定义的UI控件、能在项目或者不同项目重复应用的代码等等。
>
> ​        目的：复用，解耦。
>
> ​        依赖：组件之间低依赖，比较独立。
>
> ​        架构定位：纵向分层（位于架构底层，被其他层所依赖）。

### 模块化 

> ​        就是**"业务框架"**或者**“业务模块"**，也可以理解为“框架”，意思是把功能进行划分，将同一类型的代码整合在一起，所以模块的功能相对复杂，但都同属于一个业务。
>
> ​        使用：按照项目功能需求划分成不同类型的业务框架（例如：注册、登录、外卖、直播.....）
>
> ​        目的：隔离/封装 （高内聚）。
>
> ​        依赖：模块之间有依赖的关系，可通过路由器进行模块之间的耦合问题。
>
> ​        架构定位：横向分块（位于架构业务框架层）。

#### **总结**

​           其实组件相当于**库**，把一些能在**项目里或者不同类型项目中**可复用的代码进行工具性的封装。

​           而模块相应于**业务逻辑模块**，把**同一类型项目里**的功能逻辑进行进行需求性的封装。



## 创建组件实例：

> 注意：不论是哪种方式创建出来的组件，组件的 template 属性指向的模板内容必须有且只能有唯			一的一个根元素

### 全局组件

#### 创建组件的方式1

实例：

```html
<div id="app">
    <my-com1></my-com1>
</div>
<script>
    //1.1 使用 Vue.extend 来创建全局的Vue组件
    let com1 = Vue.extend({
        template: '<h3>这是使用 Vue.extend 创建的组件</h3>'
    })

    //1.2 使用  Vue.component('组件的名称'，创建出来的组件模板对象)
    //如果 使用  Vue.component定义全局组件的时候，组件名称使用了 驼峰命名，则在引用组件的时候，需要把大写的驼峰改为小写的字母，两个单词之间，使用 - 链接
    //如果不使用驼峰，则直接拿名称来使用
    Vue.component('myCom1', com1)

    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190402/AE4CTF8EzGix.png?imageslim)

#### 简化：

```javascript
Vue.component('myCom1', Vue.extend({
        template: '<h3>这是使用 Vue.extend 创建的组件</h3>'
}))	
```



#### 创建组件的方式2

实例

```html
<div id="app">
    <my-com2></my-com2>
</div>
<script>
    Vue.component('myCom2', {
        //注意：不论是哪种方式创建出来的组件，组件的 template 属性指向的模板内容必须有且只能有唯一的一个根元素
        template: '<h3>这是直接使用 Vue.component 创建出来的组件</h3>'
    }) 
</script>

```

![mark](http://static.zxinc520.com/blogimage/20190402/EiTu5Mwl5jpJ.png?imageslim)



#### 创建组件的方式3

```html
<div id="app">
    <my-com3></my-com3>
</div>
<!--在 被控制的 #app 外面，使用 template 元素，定义组件的 HTML 模板结构-->
<template id="tmp1">
    <div>
        <h3>这是通过 template 元素，在外部定义的组件结构，这个方式，有代码的智能提示和				高亮</h3>
        <h4>好用不错哦！</h4>
    </div>
</template>

<script>
    Vue.component('myCom3', {
        template: '#tmp1'
    })

    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190402/V6vcm4TQjGh1.png?imageslim)

### 私有组件

- 自定义一个私有组件

```html
<div id="app">
    <login></login>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        components:{ //定义实例内部私有组件
            login:{
                template: '<h2>这是定义实例内部私有组件</h2>'
            }
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190402/oA5piSDptycq.png?imageslim)

 同理而言：或者这样处理

```html
<div id="app">
    <login></login>
</div>
<!--在 被控制的 #app 外面，使用 template 元素，定义组件的 HTML 模板结构-->
<template id="tmp2">
    <div>
        <h2>这是定义实例内部私有组件</h2>
    </div>
</template>
<script>
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        components:{ //定义实例内部私有组件
            login:{
                template: '#tmp2'
            }
        }
    })
</script>
```



## 组件中的data和methods

> 1.组件可以有自己的 data 数据
>
> 2.组件的 data 和 实例的data 有点不一样，实例中的data可以为一个对象，但组件的 data 必须为一个方法
>
> 3.组件中的 data 除了为一个方法之外，这个方法内部，还必须返回一个对象才行

```javascript
Vue.component('myCom1', {
    template: '<h3>{{msg}}</h3>',
    data: function () {
        return {
            msg:'这是组件中定义的数据'
        }
    }
})
```

![mark](http://static.zxinc520.com/blogimage/20190402/IbE2L3d6S5x8.png?imageslim)



## 组件切换

#### v-if 和 v-else （ 2个组件之间切换 ）

```html
<div id="app">
    <a href="" @click.prevent="flag=true">登陆</a>
    <a href="" @click.prevent="flag=false">注册</a>
    <login v-if="flag" ></login>
    <register v-else="flag" ></register>
</div>
```

![mark](http://static.zxinc520.com/blogimage/20190402/wjg1VesuOq1U.png?imageslim)

#### component :is实现多个组件之间的切换

> <!--Vue 提供了 component ，来展示对应名称的组件-->
>
> <!--component 是一个占位符，:is 属性,可以用来指定展示的组件的名称-->

```html
<div id="app">
    <a href="" @click.prevent="comName='login'">登陆</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <!--Vue 提供了 component ，来展示对应名称的组件-->
    <!--component 是一个占位符，:is 属性,可以用来指定展示的组件的名称-->
    <component :is="comName"></component>
</div>
<script>
    Vue.component('login', {
        template: '<h3>{{msg}}</h3>',
        data: function () {
            return {
                msg: '这是登陆'
            }
        }
    })
    
    Vue.component('register', {
        template: '<h3>{{msg}}</h3>',
        data: function () {
            return {
                msg: '这是注册'
            }
        }
    })
    
    let vm = new Vue({
        el: '#app',
        data: {
            comName: 'login'
        },
        methods: {}
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190402/lhRHsBxN0qN2.png?imageslim)

<!--总结：当前学习了几个 Vue 提供的标签了-->

<!-- component, template, transition , transitionGroup -->



#### 多个组件切换动画

```html
<style>
    .v-enter, .v-leave-to {
        opacity: 0;
        transform: translateX(80px);
    }

    .v-enter-active, .v-leave-active {
        transition: all 2s;
    }
</style>

    <div id="app">
        <a href="" @click.prevent="comName='login'">登陆</a>
        <a href="" @click.prevent="comName='register'">注册</a>

        <!--通过 mode 属性，设置组件切换时候的 模式-->
        <transition mode="out-in">
            <component :is="comName"></component>
        </transition>
    </div>
```

![mark](http://static.zxinc520.com/blogimage/20190408/Th9ksgrvutDI.gif)


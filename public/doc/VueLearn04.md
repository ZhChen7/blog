## Vue第四天

> 父子组件间通信
>
> ref 获取 DOM 元素 和 组件
>
> 路由

### 父组件向子组件传值

##### 1.子组件使用父组件中的数据

- 初步尝试---（错误分析）

![mark](http://static.zxinc520.com/blogimage/20190408/mHq7etHeHLPb.png?imageslim)

- 正确使用方法

```html
<div id="app">
    <!--父组件,可以在引用子组件的时候，通过 属性绑定（v-bind：） 的形式，把需要 传递给子组件 的数据，以属性绑定的形式，传递到子组件内部，供子组件使用-->
    <com1 v-bind:parentmsg="msg"></com1>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '123 父组件中的数据'
        },
        methods: {},
        components: {
            com1: {
                //props中的数据，都是只读的，无法重新赋值。
                props: ['parentmsg'],//把父组件传递过来的 parentmsg 属性，先在 props 数组中，先定义一下，这样才能使用这个数据
                template: '<h1>这是子组件---{{parentmsg}}</h1>'
            }
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190408/mUupYQNPh2hG.png?imageslim)

##### 2.子组件使用父组件中的方法

```html
<div id="app">
    <com1 @func="show"></com1>
</div>

<template id="tmp1">
    <div>
        <h1>这是子组件</h1>
        <button @click="myclick">这是子组件的中的按钮</button>
    </div>
</template>
<script>
    let com2 = {
        template: '#tmp1',
        methods: {
            myclick() {
                //  emit 英文原意：是触发，调用，发射的意思
                this.$emit('func')
            }
        }
    }

    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            show() {
                console.log('调用父组件身上的show方法')
            }
        },
        components: {
            com1: com2
        }
    })
</script>
```



![mark](http://static.zxinc520.com/blogimage/20190408/bmsCo9BvmEsC.gif)

### 子组件向父组件传值

- 设置参数（ 供子组件传递参数 ）

![mark](http://static.zxinc520.com/blogimage/20190408/nbHBhOYbCy7g.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190408/R3Te7QLYkM8o.png?imageslim)

- 列举 list 数据对象 说明

```html
<div id="app">
    <com1 @func="show"></com1>
</div>

<template id="tmp1">
    <div>
        <h1>这是子组件</h1>
        <button @click="myclick">这是子组件的中的按钮</button>
    </div>
</template>

<script>
    let com2 = {
        template: '#tmp1',
        data () {
            return {
                list: [{'id': '1', 'age': '18'}]
            }
        },
        methods: {
            myclick() {
                // emit 英文原意：是触发，调用，发射的意思
                this.$emit('func', this.list)
            }
        }
    }

    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            show(data) {
                console.log(data)
            }
        },
        components: {
            com1: com2
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190408/PgXfzpoRW7u9.png?imageslim)





## 组件案例-发表评论

> 发表评论案例
>
> 所需知识点： 父子组件传值，localStorage 本地储存

代码：

```html
<div id="app">
    <comment-box @func="loadlocalStorage"></comment-box> <!--评论组件调用-->
    <ul class="list-group">
        <li class="list-group-item" v-for="item in list" :key="item.id">
            <span class="badge">{{item.user}}</span>
            {{item.content}}
        </li>
    </ul>
</div>

<!--评论组件模板-->
<template id="tmp1">
    <div>
        <div class="form-group">
            <label for="exampleInputEmail1">user：</label>
            <input type="search" class="form-control" 	             		                        id="exampleInputEmail1" placeholder="user" v-model="user">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail2">content：</label>
            <textarea class="form-control" id="exampleInputEmail2" v-model="content"                placeholder="发表留言"></textarea>
        </div>
        <button type="button" class="btn btn-primary" style="margin-bottom: 15px"                       @click="Postcomment">发表
   </div>
</template>

    <script>
        let commentBox = {
            template: '#tmp1',
            data() {
                return {
                    user: '',
                    content: ''
                }
            },
            methods: {
                Postcomment() {
                    //分析：发表评论的业务逻辑
                    //1.评论数据存到哪里去？ 存放到 localStorage 中 	 		            	                       localStorage.setItem('cmts','')
                    //2.先组织出一个最新的评论数据对象
                    //3.想办法，把 第二步中，得到的评论对象。保存到 localStorage 中
                    //   3.1 localStorage 只支持存放字符串数据，要先调用 	  JSON.stringify
                    //   3.2 在保存最新的 评论数据之前，要先从 localStorage 获取之前的评论数据  （string），转换为一个数组对象然后把最新的评论，push到这个数组               
                    //   3.3 如果获取到的localStorage中 的评论字符串，为空不存在，则 可以 返回一个'[]' ,让JSON.parse 去转换
                    //   3.4 把 最新的 评论列表数组，再次调用 JSON.stringify 转换为 数组字符串，然后调用 localStorage.setItem()

                    let comment = {id: Date.now(), user: this.user, content: this.content}

                    //从 localStorage 获取所有的评论
                    let list = JSON.parse(localStorage.getItem('cmts') || '[]')

                    list.unshift(comment)
                    //重新保存 最新的评论数据
                    localStorage.setItem('cmts', JSON.stringify(list))
                    this.user = this.content = ''
                    this.$emit('func')
                }
            }
        }

        let vm = new Vue({
            el: '#app',
            data: {
                list: [{id: Date.now(), user: '李白', content: '天生我材必有用'},
                       {id: Date.now(), user: '张三', content: '锄禾日当午'},
                       {id: Date.now(), user: '李四', content: '白日依山尽'}]
            },
            created() {
                //从本地的 localStorage 中加载评论列表
                this.list = JSON.parse(localStorage.getItem('cmts') || '[]')
            },
            methods: {
                loadlocalStorage() {
                    this.list = JSON.parse(localStorage.getItem('cmts') || '[]')
                }
            },
            components: {
                commentBox: commentBox
            }
    </script>
```

![mark](http://static.zxinc520.com/blogimage/20190409/Xoa1oQoFqxaT.gif)



## ref获取DOM元素和组件

#### ref获取DOM元素

- 基本使用

```html
<div id="app">
    <button @click="getElement">获取元素</button>
    <h3 id="myh3" ref="myh3">今天阳光明媚</h3>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            getElement() {
                // console.log(document.getElementById('myh3').innerText)
                console.log(this.$refs.myh3.innerText)
            }
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190409/yp3VYrRba9dD.gif)



#### ref获取组件

```html
<div id="app">
    <button @click="getElement">获取元素</button>
    <h3 id="myh3" ref="myh3">今天阳光明媚</h3>
    <hr>
    <login ref="mylogin"></login>
</div>
<script>
    let login = {
        template: '<h1>这是组件</h1>',
        data() {
            return {
                msg: '这是子组件的数据'
            }
        },
        methods: {
            show() {
                console.log('这是子组件的show方法')
            }
        }
    }

    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            getElement() {
                // console.log(document.getElementById('myh3').innerText)
                // console.log(this.$refs.myh3.innerText)
                console.log(this.$refs.mylogin.msg)
            }
        },
        components: {
            login
        }
    })
</script>
```

![mark](http://static.zxinc520.com/blogimage/20190409/4uo8wLRXKSxg.gif)







## 路由

### 什么是路由？

   [可以参考](https://blog.csdn.net/deaidai/article/details/80351187)

> 后端路由：对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；
>
> 前端路由：对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；
>
> 在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由）；URL中的hash（井号）



[Vue Router](https://router.vuejs.org/installation.html#direct-download-cdn)

​             [实用小文档](http://www.shouce.ren/api/view/a/11771)

- 路由的基本使用
- 登陆和注册路由切换小案例：

```html
<script src="../../vue.min.js"></script>
<!--1.安装 vue-router 路由模块-->
<script src="../vue-router.js"></script>
<div id="app">
    <!--在后面 a标签 会被 router-link 所替代-->
    <a href="#/login">登陆</a>
    <a href="#/register">注册</a>
    <!--这是 vue-router 提供的元素，专门用来 当作占位符的，将来，路由规则，匹配到的组件，就会展示到这个 router-view 中去-->
    <!--所以：我们可以把 router-view 认为是一个 占位符-->
    <router-view></router-view>
</div>
<script>
    //组件模板对象
    let login = {
        template: '<h1>登陆组件</h1>'
    }

    let register = {
        template: '<h1>注册组件</h1>'
    }
    
    //2. 创建 一个路由对象，当 导入 vue-router 包之后，在window 全局对象中，就有了一个 路由的构造函数，叫做 VueRouter
    // 在new 路由对象的时候，可以为 构造函数，传递一个配置对象
    let routerobj = new VueRouter({
        // routes :这个配置对象中的 route 表示 【路由匹配规则】 的意思
        routes: [//路由匹配规则
                //每个路由规则，都是一个对象，这个规则对象身上，有两个必须的属性
                //属性1 是 path ，表示哪个路由链接地址；
                //属性2 是 component ，表示，如果 路由是前面匹配到的 path，则展示 component 属性对应的那个组件
            {path: '/login', component: login},
            {path: '/register', component: register}
        ]
    })

    let vm = new Vue({
        el: '#app',
        data: {
            msg: 'sadsad'
        },
        router: routerobj //将路由规则对象，注册到 vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件
    })

</script>
```

![mark](http://static.zxinc520.com/blogimage/20190409/4t7CscuJJf8F.gif)

- router-link 的使用（替代 a 标签）：

![mark](http://static.zxinc520.com/blogimage/20190409/xwcN5dtoch9i.png?imageslim)







- 首页重定向（根路径重定向）

![mark](http://static.zxinc520.com/blogimage/20190409/HGW7GfOFp4CR.png?imageslim)



- 路由高亮效果

![mark](http://static.zxinc520.com/blogimage/20190409/90MOyhi4OgDj.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190409/tksHtocLC0RB.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190409/CiOF0kzonIuk.gif)





- 在路由中使用 动画

![mark](http://static.zxinc520.com/blog/20190409/Boq0wxt3SD6W.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190409/x9en06UnaelG.gif)



#### 路由规则中定义参数

- 传参方式一：

```html
<div id="app">
    <router-link to="/login?id=10">登陆</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
</div>
<script>
    //组件模板对象
    let login = {
        template: '<h1>登陆组件</h1>',
        created() {
            console.log(this.$route)
        }
    }

    let register = {
        template: '<h1>注册组件</h1>'
    }

    let routerobj = new VueRouter({
        routes: [                           //路由匹配规则
            {path: '/', redirect: '/login'},//这里的 redirect 和 Node 中 的redirect 完全是两回事
            {path: '/login', component: login},
            {path: '/register', component: register}
        ]
    })

    let vm = new Vue({
        el: '#app',
        data: {
            msg: 'sadsad'
        },
        router: routerobj //将路由规则对象，注册到 vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件
    })
</script>
```

![mark](http://static.zxinc520.com/blog/20190409/fPdxBv6111Wc.png?imageslim)



- 拿到参数渲染到组件上

![mark](http://static.zxinc520.com/blog/20190409/4nCicLNRvHdI.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190409/0ljG17fNlXkA.png?imageslim)

或者：==>更简洁，直观！

![mark](http://static.zxinc520.com/blog/20190409/qBOfGm2x0N46.png?imageslim)







- 传值方式二：

![mark](http://static.zxinc520.com/blog/20190409/XX9MBioYl1Cu.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190409/crPnx2YQN3Hl.png?imageslim)

#### 路由的嵌套

- children 的使用

```html
<div id="app">
    <router-link to="/account">account</router-link>
    <router-view></router-view>
</div>

<template id="tmp1">
    <div>
        <h1>这是account组件</h1>
        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    let account = {
        template: '#tmp1'
    }

    let login = {
        template: '<h3>login</h3>'
    }

    let register = {
        template: '<h3>register</h3>'
    }

    let router = new VueRouter({
        routes: [{
            path: '/account',
            component: account,
            /*使用 children 属性，实现子路由，同时，子路由的 path 前面，不要带 / ，
否则永远以根路径开始请求，这样不方便我们用户去理解URL地址*/
            children: [
                {path: 'login', component: login},
                {path: 'register', component: register}
            ]
        }]
    })

    let vm = new Vue({
        el: '#app',
        data: {
            msg: '哈哈'
        },
        router
    })
</script>
```

![mark](http://static.zxinc520.com/blog/20190410/gPhEsa53qYkp.gif)

## 路由-命名视图实现经典布局

- 命名视图实现经典布局

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .header{
        height: 80px;
        background: orange;
    }
    .container{
        display: flex;
        height: 400px;
    }
    .left{
        background: #2b542c;
        flex: 2;
    }
    .main{
        background: red;
        flex: 8;

    }
</style>

<div id="app">
    <router-view></router-view>
    <div class="container">
        <router-view name="left"></router-view>
        <router-view name="main"></router-view>
    </div>
</div>

<script>
    let header = {
        template: '<h1 class="header">Header头部区域</h1>'
    }
    let leftBox = {
        template: '<h1 class="left">leftBox区域</h1>'
    }
    let mainBox = {
        template: '<h1 class="main">mainBox区域</h1>'
    }

    let router = new VueRouter({
        routes: [
            // {path:'/',component:header},
            // {path:'/left',component:leftBox},
            // {path:'/main',component:mainBox}
            {
                path: '/', components: {
                    default: header,
                    left: leftBox,
                    main: mainBox
                }
            }
        ]
    })

    let vm = new Vue({
        el: '#app',
        data: {
            msg: '哈啊哈'
        },
        router
    })
</script>
```

![mark](http://static.zxinc520.com/blog/20190410/kLyVGLuGTNQU.png?imageslim)






















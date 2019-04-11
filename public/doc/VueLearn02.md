## Vue第二天

> 以做案例逐渐深入学习
>
> 打好基础很重要！
>
> *believe in yourself* 

#### 品牌列表案例

~~~html
<div id="app">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <div class="panel-title">添加品牌</div>
        </div>
        <div class="panel-body form-inline">
            <label for="id">id: </label>
            <input type="text" class="form-control" v-model="id" id="id">
            <label for="name">name: </label>
            <input type="text" class="form-control" v-model="name" id="name">
            <button class="btn  btn-primary" @click="add">添加</button>
        </div>
    </div>
    <table class="table table-bordered table-hover table-striped">
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>ctime</th>
                <th>Operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.ctime}}</td>
                <td><a href="" @click.prevent="del(item.id)">删除</a></td>
            </tr>
        </tbody>
    </table>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            id: '',
            name: '',
            list: [{
                id: 1, name: '奔驰', ctime: new Date()
            }, {
                id: 2, name: '宝马', ctime: new Date()
            }]
        },
        methods: {
            add() {
                let car = {id: this.id, name: this.name, ctime: new Date()}
                this.list.push(car)
                this.name = this.id = ''
            },
            del(id) {

                let index = this.list.findIndex((item) => {
                    if (item.id == id) {
                        return true
                    }
                })
                this.list.splice(index, 1)
            }
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/IdnBfABbITPK.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190328/62jdzeY5BOrT.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190328/bSDUCjvTlY6Y.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190328/qNRshJrorrew.png?imageslim)



#### 增加搜索功能

1. 方法一

~~~html
<tr v-for="item in search(keywords)" :key="item.id">
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.ctime}}</td>
    <td><a href="" @click.prevent="del(item.id)">删除</a></td>
</tr>
<script>
    methods: {
        search(keywords){//根据关键字进行数据的搜索
            let newList=[]
            this.list.forEach((item)=>{
                if(item.name.indexOf(keywords)!= -1){
                    newList.push(item)
                }
            })
            return newList
        }
    }
</script>
~~~

2. 方法二  (使用 filter)

~~~html
<script>
    methods: {
        search(keywords){//根据关键字进行数据的搜索
            let newList = []
                //注意 ：foreach some filter findIndex 这些都属于数组的新方法
                //都会对数组中的每一项，进行遍历，执行相关的操作
                //注意：Es6中，为字符串提供了一个新方法 ，叫做String.prototype.includes('要包含的字符串，如果包含返回true')         
            newList = this.list.filter((item) => {
                // if(item.name.indexOf(keywords)!= -1)
                if (item.name.includes(keywords)) {
                    return item
                }
            })
            return newList
        }
    }
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/mtKxnpNYuRqG.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190328/m5EeSUQtLPF8.png?imageslim)

## 过滤器

### 全局过滤器

- 过滤器的定义语法

​      **Vue.filter('过滤器的名称',function(){})**

~~~javascript
//过滤器中的function，第一个参数，已经被规定死了，永远都是 过滤器 管道符前面 传递过来的数据
Vue.filter('过滤器的名称',function(data){
    return data + '123'
})
~~~



- 写一个例子

~~~html
<div id="app">
    {{ msg | msgFormat}}
</div>
<script>
    //定义一个Vue 全局的过滤器 名字叫做 msgFormat
    Vue.filter('msgFormat',function (msg) {
        //字符串 replace方法，第一个参数，除了可以写一个 字符串之外，还可以定义一个正则表达式
        // return msg.replace('拼尽全力','开心快乐')
        return msg.replace(/拼尽全力/g,'开心快乐')
    })
    let vm =new Vue({
        el:'#app',
        data:{
            msg:'人活着就要拼尽全力！拼尽全力，拼尽全力，拼尽全力！'
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/E2cejpC39vcl.png?imageslim)

- 使用过滤器时（传参数）

~~~html
   <div id="app">
       {{ msg | msgFormat('开心快乐')}}
   </div>
    <script>
        //定义一个Vue 全局的过滤器 名字叫做 msgFormat
        Vue.filter('msgFormat',function (msg,arg) {
            //字符串 replace方法，第一个参数，除了可以写一个 字符串之外，还可以定义一个正则
           // return msg.replace('拼尽全力','开心快乐')
            return msg.replace(/拼尽全力/g,arg)
        })
        let vm =new Vue({
            el:'#app',
            data:{
               msg:'人活着就要拼尽全力！拼尽全力，拼尽全力，拼尽全力！'
            }
        })
    </script>
~~~

- 使用过滤器时（传多个参数）

~~~html
   <div id="app">
       {{ msg | msgFormat('开心快乐','123')}}
   </div>
    <script>
        //定义一个Vue 全局的过滤器 名字叫做 msgFormat
        Vue.filter('msgFormat',function (msg,arg,arg2) {
            //字符串 replace方法，第一个参数，除了可以写一个 字符串之外，还可以定义一个正则
           // return msg.replace('拼尽全力','开心快乐')
            return msg.replace(/拼尽全力/g,arg+arg2)
        })
        let vm =new Vue({
            el:'#app',
            data:{
               msg:'人活着就要拼尽全力！拼尽全力，拼尽全力，拼尽全力！'
            }
        })
    </script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/fhuGqD3vbBl5.png?imageslim)

- 使用过滤器时（多次调用）

~~~html
<div id="app">
    {{ msg | msgFormat('开心快乐','123') | test}}
</div>
<script>
    //定义一个Vue 全局的过滤器 名字叫做 msgFormat
    Vue.filter('msgFormat', function (msg, arg, arg2) {
        //字符串 replace方法，第一个参数，除了可以写一个 字符串之外，还可以定义一个正则
        // return msg.replace('拼尽全力','开心快乐')
        return msg.replace(/拼尽全力/g, arg + arg2)
    })
    
    Vue.filter('test', function (msg) {
        return msg + 'test'
    })
    
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '人活着就要拼尽全力！拼尽全力，拼尽全力，拼尽全力！'
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/1l2JyRlfFVKL.png?imageslim)

##### 修改品牌列表案例，进行时间的格式化

- 关键代码：

~~~html
<td>{{item.ctime | dataFormat}}</td>
<script>
    //全局的过滤器,进行时间的格式化
    Vue.filter('dataFormat',function (data) {
        //根据给定的时间字符串,得到特定的时间
        let dt =new Date(data)
        let y=dt.getFullYear()
        let m=dt.getMonth()+1
        let d=dt.getDate()
        // return y + '-' + m + '-' + d
        return `${y}-${m}-${d}`
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/or9QSA0r1Adn.png?imageslim)



- 功能改进

~~~html
<td>{{item.ctime | dataFormat('')}}</td>
<script>
    //全局的过滤器,进行时间的格式化
    Vue.filter('dataFormat',function (data,pattern) {
        //根据给定的时间字符串,得到特定的时间
        let dt =new Date(data)
        let y=dt.getFullYear()
        let m=dt.getMonth()+1
        let d=dt.getDate()
        // return y + '-' + m + '-' + d
        if(pattern && pattern.toLowerCase()=== 'yyyy-mm-dd'){
            return `${y}-${m}-${d}`
        }else{
            let hh =dt.getHours()
            let mm =dt.getMinutes()
            let ss =dt.getSeconds()
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/ow9K3Omz64dG.png?imageslim)



### 局部过滤器

- 例子

  <!--定义一个私有的过滤器（局部）-->

  - 过滤器调用的时候，采用的是就近原则，如果私有过滤器和全局过滤器名称一致了，这时候优先调用私有过滤器

~~~html
<div id="app1">
    {{msg | dataFormat}}
</div>
<div id="app2">
    {{msg}}
</div>
<script>
    let vm1=new Vue({
        el:'#app1',
        data: {
            msg: new Date()
        },
        methods:{},
        filters:{
            dataFormat:function (data,pattern) {
                let dt =new Date(data)
                let y=dt.getFullYear()
                let m=dt.getMonth()+1
                let d=dt.getDate()
                if(pattern && pattern.toLowerCase()=== 'yyyy-mm-dd'){
                    return `${y}-${m}-${d}`
                }else{
                    let hh =dt.getHours()
                    let mm =dt.getMinutes()
                    let ss =dt.getSeconds()
                    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
                }
            }
        }
    })
    let vm2=new Vue({
        el:'#app2',
        data:{
            msg: new Date()
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190328/AfDdXTwFOveq.png?imageslim)



- 时间补0的情况（如：2019-03-29 21:48:20）
  - padStart()的运用

~~~javascript
let m=(dt.getMonth()+1).toString().padStart(2,'0')
let d=dt.getDate().toString().padStart(2,'0')
~~~





## 按键修饰符

- 按回车键添加数据（不用按添加按钮）

~~~html
<input type="text" class="form-control" v-model="name" id="name" @keyup.enter="add">
<button class="btn  btn-primary" @click="add">添加</button>
~~~



- 自定义全局按键修饰符

~~~html
<input type="text" class="form-control" v-model="name" id="name" @keyup.f2="add">
<script>
    //自定义全局按键修饰符
     Vue.config.keyCodes.f2=113
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190329/2DmzaiYUgToA.gif)



## 自定义全局（私有）的指令

### 自定义全局指令

- 自定义一个自动获取焦点的指令（v-focus）

~~~javascript
//参数一：指令的名称，在定义的时候，指令的名称前面，不需要加 v- 前缀，
//在调用的时候，必须 在指令名称前 加上 v- 前缀来调用
//参数二：是一个对象，在这个对象身上，有一些指令相关的函数，这些函数可以在特定的阶段执行相关的操作
Vue.directive('focus', {
    bind: function (el) { //每当指令绑定到元素上的时候，会立即执行这个 bind 函数，只执行一次
        //注意：在每个函数中，第一个参数永远是el，表示被绑定了指令的那个元素，这个el 参数，是一个元素的JS对象
        //在元素 刚绑定指令的时候，还没有插入到 DOM 中去，这时候，调用 focus 方法没有作用
        //因为，一个元素，只有插入 DOM 之后，才能获取焦点
        // el.focus()
    },
    inserted: function (el) { //inserted 表示元素 插入到DOM中的时候，会执行 inserted 函数                                  【触发一次】
        el.focus()
        //和JS行为有关的操作，最好在 inserted 中去执行，防止 JS 行为不生效
    },
    updated: function () { //当vNode更新的时候，会执行 updated，可能会触发多次

    }
})
~~~

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：[参考文档](https://www.cnblogs.com/ftxc/p/8086008.html)

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- unbind：只调用一次，指令与元素解绑时调用。

  

- 指令钩子函数会被传入以下参数：
  - el：指令所绑定的元素，可以用来直接操作 DOM 。
  - binding：一个对象，包含以下属性：
    name：指令名，不包括 v- 前缀。
    value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
    oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

![mark](http://static.zxinc520.com/blogimage/20190329/QfOUnkjKHsEA.png?imageslim)

- 自定义一个 设置字体颜色的 指令（v-color）

~~~javascript
//样式，只要通过指令绑定了元素，不管这个元素有没有被插入到页面中去，这个元素肯定有了一个内联的样式
//将来元素肯定会显示到页面中去，这时候，浏览器的渲染引擎必然会解析样式，应用给这个元素
bind: function (el) {
    el.style.color = 'red'
    //和样式相关的操作，一般都可以在 bind 执行
  }
})
~~~

- 自定义一个 设置字体颜色的 指令 ( 传参数 )

~~~html
<input class="form-control" id="search" type="text"  v-model="keywords" 
v-color="'blue'" v-focus>
<script>
    Vue.directive('color', {
        bind: function (el, binding) {
            el.style.color = binding.value
            //对比 value 和 expression 
            console.log(binding.value)
            console.log(binding.expression)
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190329/mnJeqSiyTLNO.png?imageslim)

### 自定义私有指令

~~~javascript
let vm1 = new Vue({
    el: '#app1',
    data: {},
    methods: {},
    directives: { //自定义私有指令
        'fontweight': {
            bind: function (el,binding) {
                el.style.fontWeight =binding.value
            }
        }
    }
})
~~~



#### 函数简写

大多数情况下，我们可能想在 `bind` 和 `update` 钩子上做重复动作，并且不想关心其它的钩子函数。可以这样写:

```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

例如：自定义一个字体大小的指令

~~~javascript
directives: { //自定义私有指令
        'fontsize': function (el, binding) { //这个 function 等同于 把代码写到 bind 和 	update 中去
            el.style.fontSize = parseInt(binding.value)+ 'px'
        }
}	
~~~



## Vue实例的生命周期

1. 生命周期钩子 = 生命周期函数  = 生命周期事件
2. 举例说明：

~~~html
<div id="app">
    <button @click="msg='no'">修改msg</button>
    <h3 id="h3">{{msg}}</h3>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            msg: 'ok'
        },
        methods: {
            show() {
                console.log('执行了show方法')
            }
        },
        beforeCreate() {//这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它
            // console.log(this.msg) //undefined
            // this.show()           //TypeError: this.show is not a function
            // 注意：在beforeCreate 生命周期函数执行的时候，data和methods 中的数据未被初始化
        },
        created() {//这是我们遇到的第二个生命周期函数
            // console.log(this.msg) //ok
            // this.show()  //执行了show方法
            //在 created中，data 和 methods 都已经被初始化好了！
            //如果要调用 methods 中的方法，或者操作 data中的数据，最早，只能在 created 中操作
        },
        beforeMount() {//这是我们遇到的第三个生命周期函数，表示模板已经在内存中编辑完成了，但是尚未把 模板渲染到 页面中
            console.log(document.getElementById('h3').innerText)  // {{msg}}
            //在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
        },
        mounted() {//这是我们遇到的第四个生命周期函数，表示内存中的模板，已经真实的挂载到页面中去，用户可以看到渲染好的页面
            console.log(document.getElementById('h3').innerText)  // ok
            //注意：mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示,实例已经被完全创建好了，
            // 此时，如果没有其它操作，这个实例，就静静的 躺在内存中，一动不动。
        },

        //接下来是运行中的两个事件
        beforeUpdate() { //这时候表示，我们的界面还没有被更新 【数据被更新了吗？数据肯定被更新了】
            // console.log(document.getElementById('h3').innerText) //没有输出任何东西
            console.log('界面上元素的内容：' +                 document.getElementById('h3').innerText) //界面上元素的内容：ok
            console.log('data中 msg 数据是：' + this.msg)  //data中 msg 数据是：no
            //得出结论：当执行 beforeUpdate 的时候，页面中显示的数据还是旧的，此时 data 数据是最新的，页面尚未和最新的数据 保持同步
        },
        updated() {
            console.log('界面上元素的内容：' +                		 document.getElementById('h3').innerText) //界面上元素的内容：no
            console.log('data中 msg 数据是：' + this.msg)  //data中 msg 数据是：no
            // updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的
        }
    })
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190330/4A8AYanLcI7i.png?imageslim)

## Vue-resource 实现 get，post，jsonp请求

<!--除了Vue-resource之外，还可以使用 `axios` 的第三方包实现数据的请求-->

[ Vue-resource 和 axios 的区别](http://www.cnblogs.com/both-eyes/p/10122243.html)

- Vue-resource 的基本使用

~~~html
<script src="../../vue.min.js"></script>
<script src="../../vue-resource-1.3.4.js"></script>
<div id="app">
    <button @click="getInfo">get请求</button>
</div>
<script>
let vm = new Vue({
    el: '#app',
    data: {
        msg: '这是一句话！'
    },
    methods: {
        getInfo() {
            this.$http.get('../../data.json').then(function (result) {
                console.log(result)
            })
        }
    }
})
</script>
~~~

![mark](http://static.zxinc520.com/blogimage/20190330/sND0YtQhlkeL.png?imageslim)





- get，post，jsonp请求

~~~html
<div id="app">
    <button @click="getInfo">get请求</button>
    <button @click="postInfo">post请求</button>
    <button @click="jsonpInfo">jsonp请求</button>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '这是一句话！'
        },
        methods: {
            getInfo() { //发起 get 请求
                this.$http.get('../../data.json').then(function (result) {
                    //通过 result.body 拿到服务器返回的成功的数据
                    console.log(result.body)
                })
            },
            postInfo() { //发起 post  请求
               this.$http.post('../../data.json', {}, {}).then(function (result) {
                    //通过 result.body 拿到服务器返回的成功的数据
                    console.log(result.body)
                })
            },
            jsonpInfo() { //发起 jsonp 请求
                this.$http.jsonp('../../data.json').then(function (result) {
                    //通过 result.body 拿到服务器返回的成功的数据
                    console.log(result.body)
                })
            }
        }
    })
</script>
~~~
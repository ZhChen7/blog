## Vue第一天

> 这是我第5遍学习Vue了（可能是因为感觉自己达不到游刃有余的感觉吧，也可能是以前学的不系统，要学就得学扎实了。）

- 创建一个实例

  ```html
  <script src="../../vue.min.js"></script>
  <div id="app">
      <p>{{ title }}</p>
  </div>
  <script>
      let vm = new Vue({
          el: '#app',
          data: {
              title: '欢迎学习Vue！'
          }
      })
  </script>
  ```

  ### 指令：

1. v-cloak （ 能够解决 插值表达式闪烁问题 ）

   ```html
   <style>
       [v-cloak]{
           display: none;
       }
   </style>
   <div id="app">
       <p v-cloak>{{ title }}</p>
   </div>
   ```

2. v-text  ( 功能与插值表达式相同，优点：没有闪烁问题 ，缺点：会覆盖元素中原本的内容)

   ```html
   <p v-text=“title”></p>
   ```

   

3. v-html  (能够解析文本里面的HTML标签)

   ```html
   <p v-html="msg"></p>
   ```

4. v-bind（ 用于绑定属性的指令 ）(简写形式   :  )

   ```html
    <input type="button" value="按钮"  v-bind:title="mytitle">
    <input type="button" value="按钮"  :title="mytitle">
   ```

5. v-on ( 绑定事件 ) （简写形式 @ ）

```html
<input type="button" value="按钮"    v-on:click="alert('hello')">
<input type="button" value="按钮"    @click="alert('hello')">
```



## 练习



1. 跑马灯

```html
<div id="app">
    <p>{{msg}}</p>
    <input type="button" value="开始" @click="start">
    <input type="button" value="停止" @click="stop">
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '猥琐发育，别浪~~~~',
            timer: null
        },
        methods: {
            start() {
                if (this.timer != null) return;
                this.timer = setInterval(() => {
                    let start = this.msg.substring(0, 1)
                    let end = this.msg.substring(1)
                    this.msg = end + start
                }, 200)
            },
            stop() {
                clearInterval(this.timer)
                this.timer = null
            }
        }
    })
</script>
```



![mark](http://static.zxinc520.com/blogimage/20190322/KCTsr3d2g1EG.png?imageslim)







## 事件修饰符

1. stop ( 阻止冒泡 )

   ```html
   <div id="app">
       <div class="inner" @click="DivClick">
           <input type="button" value="点击" @click.stop="BtnClick">
       </div>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {},
           methods: {
               DivClick() {
                   console.log('触发了inner点击事件')
               },
               BtnClick() {
                   console.log('触发了按钮点击事件')
               }
           }
       })
   </script>
   ```

   ![mark](http://static.zxinc520.com/blogimage/20190322/NjmXomRJ4g4P.png?imageslim)



2. prevent (  阻止默认行为 )

```html
    <a href="http://www.baidu.com" @click.prevent="linkClick">去百度</a>
```



![mark](http://static.zxinc520.com/blogimage/20190322/DPTRjEbdvTuS.png?imageslim)

3. capture （捕获触发事件机制）（从外向里 ）

```html
<div class="inner" @click.capture="DivClick">
    <input type="button" value="点击" @click="BtnClick">
</div>
```

![mark](http://static.zxinc520.com/blogimage/20190322/SmpSkg4nCGn0.png?imageslim)

4. self   ( 只有点击当前元素才能触发事件)

   <!--.self 只会阻止自己身上冒泡行为的触发，并不会真正阻止 冒泡行为-->

   ```html
   <div class="inner" @click.self="DivClick">
       <input type="button" value="点击" @click="BtnClick">
   </div>
   ```

   ![mark](http://static.zxinc520.com/blogimage/20190322/3pybyy00aAn9.png?imageslim)

5. once （只触发一次事件）

   ```  html
   <a href="http://www.baidu.com" @click.prevent.once="linkClick">去百度</a>
   ```

## v-model 

<!-- v-bind 只能实现单向绑定，从 M 自动绑定到 V ，无法实现数据的双向绑定-->

<!--使用 ：v-model 可以实现 表单元素 和 Model 中数据的双向数据绑定-->

<!--注意 ：v-model 只能运用到 表单元素中-->

<!--input(radio,text,address,email...) select checkbox textarea-->

- 案例（计算器）

1. ```html
   <div id="app">
       <input type="text" v-model="n1">
       <select name="" id="" v-model="opt">
           <option value="+">+</option>
           <option value="-">-</option>
           <option value="*">*</option>
           <option value="/">/</option>
       </select>
       <input type="text" v-model="n2">
       <input type="button" value="=" @click="btnClick">
       <input type="text" v-model="result">
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               n1: 0,
               n2: 0,
               result: 0,
               opt: '+'
           },
           methods: {
               btnClick() {
                    switch (this.opt) {
                       case '+':
                           this.result = parseInt(this.n1) + parseInt(this.n2)
                           break
                       case '-':
                           this.result = parseInt(this.n1) - parseInt(this.n2)
                           break
                       case '*':
                           this.result = parseInt(this.n1) * parseInt(this.n2)
                           break
                       case '/':
                           this.result = parseInt(this.n1) / parseInt(this.n2)
                           break
                   }
               }
           }
       })
   </script>
   ```

2. 代码优化（投机取巧，正式开发中尽量少用）（使用 eval，eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码）

   ```html
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               n1: 0,
               n2: 0,
               result: 0,
               opt: '+'
           },
           methods: {
               btnClick() {
                   // switch (this.opt) {
                   //     case '+':
                   //         this.result = parseInt(this.n1) + parseInt(this.n2)
                   //         break
                   //     case '-':
                   //         this.result = parseInt(this.n1) - parseInt(this.n2)
                   //         break
                   //     case '*':
                   //         this.result = parseInt(this.n1) * parseInt(this.n2)
                   //         break
                   //     case '/':
                   //         this.result = parseInt(this.n1) / parseInt(this.n2)
                   //         break
                   // }
                   let codeStr = 'parseInt(this.n1)' + this.opt + 'parseInt(this.n2)'
                   this.result = eval(codeStr)
               }
           }
       })
   </script>
   ```

![mark](http://static.zxinc520.com/blogimage/20190323/xYFJRqe4Ivuf.png?imageslim)



![mark](http://static.zxinc520.com/blogimage/20190323/ju1GHCX1FzMc.png?imageslim)





## Vue中使用样式



### 使用class样式

1. 第一种方式：直接传递一个数组

   ```html
       <style>
           .red{
               color: red;
           }
   
           .thin{
               font-weight: 200;
           }
   
           .italic{
               font-style: italic;
           }
       </style>
   <div id="app">
          <h1 :class="['red','thin','italic']">这是h1</h1>
   </div>
   ```

   

2. 在数组中使用三元表达式

   ```html
   <div id="app">
          <h1 :class="['red','thin',flag?'italic':'']">这是h1</h1>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
              flag:true
           }
       })
   </script>
   ```

   或者：

   ```html
   <div id="app">
          <h1 :class="['red','thin',{'italic':flag}]">这是h1</h1>
   </div>
   ```

   

3. 直接使用对象（true和false可用变量来代替）

   ```html
   <div id="app">
           <h1 :class="{red:true,thin:true,italic:false}">这是h1</h1>
   </div>
   ```

   

4. data里面定义

   ```html
   <div id="app">
          <h1 :class="classObj">这是h1</h1>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               classObj:{red:true,thin:true,italic:true}
           }
       })
   </script>
   ```

   

### 使用内联样式

1. 直接使用

   ```html
    <h1 :style="{color:'red','font-weight':200}">这是h1</h1>
   ```

2. data里面调用

   ```html
   <div id="app">
          <h1 :style="styleObj">这是h1</h1>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               styleObj:{color:'red','font-weight':200}
           }
       })
   </script>
   ```

   

3. 运用数组

   ```html
   <div id="app">
          <h1 :style="[styleObj1,styleObj2]">这是h1</h1>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               styleObj1:{color:'red','font-weight':200},
               styleObj2:{'font-style':'italic'}
           }
       })
   </script>
   ```

   

## Vue指令之 V-for 和 key属性

<!--v-for使用的过程中一般要加上 key 属性，保证数据的唯一性-->

1. v-for 简单实用

   ```html
   <div id="app">
       <ul>
           <li v-for="item in list">{{item}}</li>
       </ul>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
              list:[1,2,3,4,5,6]
           }
       })
   </script>
   ```

   ![mark](http://static.zxinc520.com/blogimage/20190323/CUbor8Fl39AJ.png?imageslim)

2. 索引值：

```html
<div id="app">
    <ul>
        <li v-for="(item,index) in list">{{item}}---{{index}}</li>
    </ul>
</div>
```

![mark](http://static.zxinc520.com/blogimage/20190323/eChPoVycrqGB.png?imageslim)



3. 循环对象数组

   ```html
   <div id="app">
       <ul>
           <li v-for="(item,index) in list">{{item.id}}---{{item.name}}---{{index}}		</li>
       </ul>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               list: [
                   {
                       id: 1,
                       name: '张三'
                   },
                   {
                       id: 2,
                       name: '李四'
                   },
                   {
                       id: 3,
                       name: '王五'
                   },
                   {
                       id: 4,
                       name: '隔壁老王'
                   }
               ]
           }
       })
   </script>
   ```

![mark](http://static.zxinc520.com/blogimage/20190323/UBp33b7hpd6L.png?imageslim)

4. 遍历对象

   ```html
   <div id="app">
       <ul>
           <li v-for="(val,key,index) in user">{{key}}--{{val}}---{{index}}</li>
       </ul>
   </div>
   <script>
       let vm = new Vue({
           el: '#app',
           data: {
               user:
                   {
                       id: 1,
                       name: '张三',
                       hobby:'打篮球',
                       sex:'男'
                   }
           }
       })
   </script>
   ```

   

   ![mark](http://static.zxinc520.com/blogimage/20190323/7z0KTgVSTrnT.png?imageslim)

5. 迭代数字

   ```html
   <div id="app">
      <p v-for="count in 5">这是第 {{count}} 次循环</p>
   </div>
   ```

   ![mark](http://static.zxinc520.com/blogimage/20190323/pkTWMsrKq3K5.png?imageslim)



## Vue指令之 v-if 和 v-show

1. 基本使用

```html
<div id="app">
    <h3 v-if="flag">这是v-if控制的元素</h3>
    <h3 v-show="flag">这是v-show控制的元素</h3>
    <button @click="flag=!flag">点击</button>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
           flag:true
        }
    })
</script>
```



![mark](http://static.zxinc520.com/blogimage/20190323/RvJkAeqmP7pU.png?imageslim)

![mark](http://static.zxinc520.com/blogimage/20190323/Pt5eFpvu4dpd.png?imageslim)



<!-- v-if 有较高的切换性能消耗-->

<!-- v-show 有较高的初始渲染消耗-->

<!-- 如果元素涉及频繁的切换，最好不要使用 v-if-->





## 总结

1. [MVC 和 MVVM 的区别](https://blog.csdn.net/qq_42329594/article/details/81380665)

2. 学习了Vue中最基本的代码结构
3.  基本指令
4. 事件修饰符
5. v-for 要会使用 key 属性
6. v-model 只能应用于表单元素

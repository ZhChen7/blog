# React学习第二天

> React学习第二天
>
> 创建组件的方式（ function 和 class）
>
> ES6 扩展运算符使用
>
> 抽离 jsx 组件
>
> 如何省略 **<u>jsx</u>** 后缀名？
>
> 使用@别名表示路径
>
> 两种创建组件方式的对比
>
> 评论列表案例
>
> 没有收拾残局的能力，就别放纵善变的情绪！！！



## 创建组件

### 第一种创建组件的方式

```js
//第一步：导入包
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

function Hello() {
    return <div>这是一个组件</div>
}

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Hello></Hello>
</div>, document.getElementById('app'))
```

![mark](http://static.zxinc520.com/blog/20190506/tppNOX2JwhMa.png?imageslim)

#### 接受外部传值

```js
function Hello(props){
    console.log(props)
    return <div>这是一个组件---{props.name}---{props.age}</div>
}

const dog={
    name:'大黄',
    age:'18'
}

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Hello name={dog.name} age={dog.age}></Hello>
    </div>, document.getElementById('app'))
```

![mark](http://static.zxinc520.com/blog/20190506/Ebp8WSqvYzTi.png?imageslim)

<!--注意：不论是 Vue 还是 React，组件中的props永远都是只读的，不能被赋值！-->

<!--组件 首字母 必须为大写！-->



#### 改进：使用ES6 扩展运算符

```js
function Hello(props){
    console.log(props)
    return <div>这是一个组件---{props.name}---{props.age}</div>
}

const dog={
    name:'大黄',
    age:'18'
}

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Hello {...dog}></Hello>
</div>, document.getElementById('app'))
```





#### 抽离 jsx 组件

```js
//第一步：导入包
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

import Hello from './components/Hello.jsx'

const dog={
    name:'大黄',
    age:'18'
}

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Hello {...dog}></Hello>
</div>, document.getElementById('app'))


```

![mark](http://static.zxinc520.com/blog/20190506/oiuJeOYjfvf4.png?imageslim)

**Hello.jsx:**

```js
import React from "react";

//创建并导出
export default function Hello(props){
    console.log(props)
    return <div>这是一个组件---{props.name}---{props.age}</div>
}
```





#### 如何省略 **<u>jsx</u>** 后缀名？

![mark](http://static.zxinc520.com/blog/20190506/Vt3JwXFKXg8w.png?imageslim)

**配置 webpack.config.js 文件：**

```js
resolve:{
    extensions:['.js','.jsx','.json']
}
```





#### 使用@别名表示路径

![mark](http://static.zxinc520.com/blog/20190506/1o1dm0J9gRPc.png?imageslim)

**配置 webpack.config.js 文件：**

```js
resolve:{
    extensions:['.js','.jsx','.json'],
        alias:{
            '@':path.join(__dirname,'./src') //这样，@ 就表示 项目根目录中的src 这一层路径
        }
}
```





### 第二种创建组件的方式

> 使用 class 关键字来创建自建
>
> ES6 中 class 关键字，是实现面向对象编程的新形式（语法糖）

#### 了解 class

1. 创建一个类并提供参数

```js
class Animate {
  constructor(name,age){
      this.name=name
      this.age=age
  }
}

let p1 =new Animate('大黄',3)
console.log(p1)
```

![mark](http://static.zxinc520.com/blog/20190506/S8PirbufxcXt.png?imageslim)





#### 挂载原型对象的实例方法（ function 和 class 方法对比）

```js
function f(name, age) {
    this.name = name
    this.age = age
}

f.prototype.show = function () {
    console.log('这是实例方法！')
}

let p = new f('大黄', 3)
console.log(p)

console.log('--------------------------------')

class Animate {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    show() {
        console.log('这是实例方法！')
    }
}

let p1 = new Animate('大黄', 3)
console.log(p1)
```



![mark](http://static.zxinc520.com/blog/20190506/CfW0S1Lz9HP8.png?imageslim)





#### 静态方法

```js
//使用 function创建对象
function f() {}

//静态方法
f.show=function(){
    console.log('这是function创建的 f 的静态 show 方法')
}
f.show()

console.log('--------------分割线------------------')

//使用class 创建对象
class Animate {
    //静态方法
    static info='这是class方法创建的静态方法！'
}
console.log(Animate.info)
```

![mark](http://static.zxinc520.com/blog/20190506/JdrMb039jWqx.png?imageslim)





#### extends 继承 

```js
//这是父类
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

class American extends Person {}

const a1 = new American('Jack', 22)
console.log(a1)

class Chinese extends Person {}

const c1 = new Chinese('张三', 22)
console.log(c1)
```

![mark](http://static.zxinc520.com/blog/20190506/9iKF2u3HOaF1.png?imageslim)





#### super 调用父类 constructor     [可以参考](https://juejin.im/post/5b3f23066fb9a04fe820cdbe)

```js
//这是父类
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    sayHello() {
        console.log('大家好！')
    }
}

class American extends Person {
    constructor(name, age) {
        super(name, age)
    }
}

const a1 = new American('Jack', 22)
console.log(a1)
console.log(a1.sayHello())

class Chinese extends Person {
    constructor(name, age,IDNumber) {
        super(name, age)
        this.IDNumber=IDNumber
    }
}

const c1 = new Chinese('张三', 22,'1213123')
console.log(c1)
```

![mark](http://static.zxinc520.com/blog/20190506/dokRjyuJrlg5.png?imageslim)





#### 子类没有定义 constructor，会默认添加

```js
class Chinese extends Person {
}

// 等同于
class Chinese extends Person {
  constructor(...args) {
    super(...args);
  }
}
```



### 使用class关键字创建组件

#### 基本结构

```js
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

//如果使用class 定义组件，必须让自己的组件，继承自 React.Component
class Movie extends React.Component {
    //在组件内部，必须有 render 函数，作用：渲染当前组件对应的 虚拟DOM 结构
    render() {
        //render 函数中，必须 返回合法的 JSX 虚拟DOM 结构
       return <div>这是class创建组件的方式</div>
    }
}

//使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Movie></Movie>
</div>, document.getElementById('app'))
```

![mark](http://static.zxinc520.com/blog/20190506/pUNFRBHpnlsL.png?imageslim)





#### 传递参数

```js
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

class Movie extends React.Component {
    //使用class关键字创建的组件中，如果想使用外界传递过来的 props 参数，不需接受，直接通过 this.props.*** 来访问！
    render() {
        return <div>这是class创建组件的方式--{this.props.name}--{this.props.age}---{this.props.hobby}</div>
    }
}

const dog = {
    name: '小黄',
    age: '18',
    hobby: 'play games'
}

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Movie {...dog}></Movie>
</div>, document.getElementById('app'))

```

![mark](http://static.zxinc520.com/blog/20190506/3McvjLR2OU4B.png?imageslim)

## 这两种创建组件方式的对比

> 注意：使用 **function** 创建的组件只有props，没有自己的私有数据 和生命周期 函数
>
> 注意：使用 **class 关键字 **创建的组件，有自己的私有数据；



1. 用 **构造函数** 创建出来的组件：叫做 “ <u>无状态组件</u> ”
2. 用 **class 关键字** 创建出来的组件：叫做 “ <u>有状态组件</u> ”

> **有状态组件**和 **无状态组件** 之间的本质区别就是：有无 **state属性**

[可以参考](https://www.cnblogs.com/wonyun/p/5930333.html)

```js
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

class Movie extends React.Component {
    constructor(){
        super()
        this.state={
            msg:'大家好啊！我是class私有数据！'
        }//相当于 Vue 里面的 data(){ return {}}函数
    }

    //使用class关键字创建的组件中，如果想使用外界传递过来的 props 参数，不需接受，直接通过 this.props.*** 来访问！
    render() {
        return <div>这是class创建组件的方式--{this.props.name}
            <p>{this.state.msg}</p>
            </div>
    }
}

const dog = {
    name: '小黄',
    age: '18',
    hobby: 'play games'
}
//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <Movie {...dog}></Movie>
</div>, document.getElementById('app'))
```

​      ![mark](http://static.zxinc520.com/blog/20190506/6hl8wJm5c3p4.png?imageslim)



## 评论列表案例

##### 初步实现：

```js
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

//使用 function 定义 普通的无状态组件
function CmtItem(props) {
    return <div>
        <h3>评论人：{props.user}</h3>
        <p>评论内容：{props.content}</p>
    </div>
}

class CmtList extends React.Component {
    constructor() {
        super()
        this.state = {
            CommentList: [
                {id: 1, user: '张三', content: '哈哈哈哈哈'},
                {id: 2, user: '李四', content: '打游戏'},
                {id: 3, user: '王五', content: '唱歌，喝酒'},
                {id: 4, user: '王麦子', content: '到处happy'},
                {id: 5, user: '周琛', content: '帅的不要不要了！'}
            ]
        }
    }

    render() {
        return <div>
            <h1>这是评论列表组件</h1>
            {this.state.CommentList.map(item =>
                <CmtItem {...item} key={item.id}></CmtItem>
            )}

        </div>
    }
}

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <CmtList></CmtList>
</div>, document.getElementById('app'))
```

![mark](http://static.zxinc520.com/blog/20190506/1Ql2PHx2l6B3.png?imageslim)

#### 抽离各模块

> 便于减少一个文件的代码量，并且符合一种模块化思想

![mark](http://static.zxinc520.com/blog/20190506/57OxaxsjtBwa.png?imageslim)

index.js

```js
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的
·
import CmtList from '@/components/CmtList'

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <CmtList></CmtList>
</div>, document.getElementById('app'))
```

CmtList.jsx:

```js
import React from "react";
import CmtItem from '@/components/CmtItem'

export default class CmtList extends React.Component {
    constructor() {
        super()
        this.state = {
            CommentList: [
                {id: 1, user: '张三', content: '哈哈哈哈哈'},
                {id: 2, user: '李四', content: '打游戏'},
                {id: 3, user: '王五', content: '唱歌，喝酒'},
                {id: 4, user: '王麦子', content: '到处happy'},
                {id: 5, user: '周琛', content: '帅的不要不要了！'}
            ]
        }
    }

    render() {
        return <div>
            <h1>这是评论列表组件</h1>
            {this.state.CommentList.map(item =>
                <CmtItem {...item} key={item.id}></CmtItem>
            )}

        </div>
    }
}
```

CmtItem.jsx：

```js
import React from 'react'
//使用 function 定义 普通的无状态组件
export default function CmtItem(props) {
    return <div>
        <h3>评论人：{props.user}</h3>
        <p>评论内容：{props.content}</p>
    </div>
}
```

![mark](http://static.zxinc520.com/blog/20190506/pSXgFJCzlL44.png?imageslim)

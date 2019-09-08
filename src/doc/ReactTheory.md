# 组件化和 React

> 本章先带领学生做一个 React 的实例，熟悉 React 开发环境、以及 **组件化** 的概念。然后，通过实例来讲解 React 的 **实现原理**，包括 **JSX 的本质** 、**虚拟 DOM 和 JSX 的结合**、以及 **setState** 。最后，**对比 vue 和 React**  ，分析两者的异同。
>
> 组件化和 React 高级面试知识点
>
> Think great thoughts and you will be great!
>
> 心怀伟大的理想，你将会变得伟大。



### 知识点

- 是否做过 React 开发？
- React 以及组件化的一些核心概念
- 实现流程  

 

### 题目

- 说一下对组件化的理解
- JSX 本质是什么？
- JSX 和 vdom 的关系？
- 说一下 setState 的过程
- 阐述一下对 React 和 Vue  的 认识



#### 回顾 [React](https://zh-hans.reactjs.org/)  

1. 创建一个基本的React 应用

   [Create React App](https://github.com/facebookincubator/create-react-app) 是一个用于**学习 React** 的舒适环境，也是用 React 创建**新的单页应用**的最佳方式。

   它会配置你的开发环境，以便使你能够使用最新的 JavaScript 特性，提供良好的开发体验，并为生产环境优化你的应用程序。你需要在你的机器上安装 Node >= 8.10 和 npm >= 5.6。要创建项目，请执行：

   ```shell
   npx create-react-app my-app
   cd my-app
   npm start
   ```

   

2. 用 React 实现 **to-do-list** ：

```js
import React, {Component} from 'react'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            title: ''
        }
    }

    render() {
        const list = this.state.list
        return (
            <div>
                <input type="text" value={this.state.title} onChange={this.changeHandle.bind(this)}/>
                <button onClick={this.clickHandle.bind(this)}>Submit</button>
                <ul>
                    {
                        list.map((item, index) => {
                            return <li key={index}> {item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }

    changeHandle(e) {
        this.setState({
            title: e.target.value
        })
    }

    addTitle(title) {
        const currentList = this.state.list
        this.setState({
            list: currentList.concat(title)
        })
        console.log(this.state.list)
    }

    clickHandle(e) {
        const title = this.state.title
        this.addTitle(title)
        this.setState({
            title: ''
        })
    }
}

export default Todo
```

![mark](http://static.zxinc520.com/blog/20190907/GRlG7LRoeKp7.gif)

## 7-1 说一下对组件化的理解

### 知识点

- 组件的 **封装** 
- 组件的 **复用** 



#### 组件的封装

- 视图
- 数据
- 变化逻辑 （ 数据驱动视图变化 ）

![mark](http://static.zxinc520.com/blog/20190907/m1BCsjY31wOd.png?imageslim)





#### 组件的 复用

- props 传递
- 复用

![mark](http://static.zxinc520.com/blog/20190907/dSD9f5yFTKYD.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190907/dig0u7rhRuJi.png?imageslim)



### 题目

- 说一下对组件化的理解？
  - 组件的封装：封装视图、数据、变化逻辑
  - 组件的复用：props传递、复用



## 7-2 JSX 本质是什么

### 知识点

- JSX 语法
- JSX 解析成 JS 
- 独立的标准



#### JSX 语法

- html 形式
- 引入 JS 变量和表达式
- if ... else ...
- 循环
- style 和 className
- 事件



#### 提出疑问

- JSX 语法根本无法被浏览器所解析
- 那么它如何在浏览器运行



#### JSX 解析

- JSX 其实是语法糖
- 开发环境会将 JSX 编译成 JS 代码
- JSX 的写法 大大降低了学习成本和 编码工作量



![mark](http://static.zxinc520.com/blog/20190907/Xy8TYGeoHcWC.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190907/yjXVnlK8oLfk.png?imageslim)



#### JSX 独立的标准

- JSX 是 React 引入的，但不是 React 独有的
- React 已经将它作为一个独立的标准开放，其它项目也可用
- React.createElement 是可以自定义修改的
- 说明：本身功能已经完备；和其它标准兼容和扩展性没问题



### 问题解答

- JSX 本质是什么？
  - JSX 语法（标签、JS 表达式、判断、循环、事件绑定）
  - JSX 本质就是语法糖，需被解析成 JS 才能运行
  - JSX 是独立的标准，可被其它项目使用





## 7-3 JSX 和 vdom 的关系

### 知识点

- 分析：为何需要 vdom
- React.createElement 和 h
- 何时 patch？
- 自定义组件的解析



#### 为何需要 vdom

- vdom 是 React 初次推广开来的，结合 JSX
- JSX 就是模板，最终要渲染成 html
- 初次渲染 + 修改 state  后的 re-render
- 正好 符合 vdom 的应用场景



#### 回顾 [vdom](http://www.zxinc520.com/lcj/%225d63a1bce9920a5ce05e2c3b%22) 

- vdom 如何应用，核心 API 是 什么？
  - 如何使用？ 可用 snabbdom的 用法 来 举例
  - 核心 函数 ：h 函数，patch 函数

**核心 API** ：

- h（'<标签名>'，{ ... 属性 ... }，[... 子元素 ...]）
- h（'<标签名>'，{ ... 属性 ... }，[ ‘....’]）
- patch（container，vnode）
- patch（vnode，newVnode）



#### React.createElement 和 h

![mark](http://static.zxinc520.com/blog/20190907/hro0P4sQFQug.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190907/3N0XehWXEtQa.png?imageslim)



#### 何时 patch

- 初次渲染 - ReactDOM.render (< App />,container)
- 会触发 patch (container,vnode)
- re-render - setState
- 会触发 patch (vnode,newVnode)



#### 自定义组件的解析

- 'div' - 直接渲染 < div> 即可，vdom 可以做到
- Input 和 List ，是自定义组件 （class），vdom 默认不认识
- 因此 Input 和 List 定义的时候 必须声明 render 函数
- 根据 props 初始化实例，然后执行实例的 render 函数
- render 函数返回的还是 vnode 对象

![mark](http://static.zxinc520.com/blog/20190907/q3iTc0PViQbi.png?imageslim)



### 问题解答

- 为何需要vdom：JSX 需要渲染成 html，数据驱动视图
- React.createElement 和 h ，都生成 vnode
- 何时 patch：ReactDOM.render(...) 和 setState
- 自定义组件的解析：初始化实例，然后执行 render





## 7-4 说一下 setState 的过程

### 知识点

- setState 的异步
- vue 修改属性也是 异步
- setState 的过程



#### setState 的异步

![mark](http://static.zxinc520.com/blog/20190907/z8fAo7IMaYcs.png?imageslim)



#### setState 为何需要异步？

- 可能会一次执行 多次 setState
- 你无法规定、限制用户如何使用 setState
- 没必要每次 setState 都重新渲染，考虑性能
- 即便是每次重新渲染，用户也看不到中间的效果
- 只看到最后的结果即可

![mark](http://static.zxinc520.com/blog/20190907/0E8yvUnt3JOn.png?imageslim)





#### vue 修改属性也是异步

- 效果、原因和 setState 一样
- 对比记忆，印象深刻



#### vue的整个实现流程

- 第一步：解析模板成 render 函数
- 第二步：响应式开始监听
- 第三步：首次渲染，显示页面，且绑定依赖
- 第四步：data 属性变化（ **异步** ），触发 rerender



##### data 属性变化

- 修改属性，被响应式 的 set 监听到
- set 中执行 updataComponent   （  **异步**   ）
- updataComponent 重新执行 vm.render()
- 生成的 vnode 和 prevVnode，通过 patch 进行比较
- 渲染到 html 中



#### setState 的过程

- 每个组件实例，都有 renderComponent 方法
- 执行 renderComponent 会重新执行实例的 render
- render 函数返回 newVnode，然后拿到 preVnode
- 执行 patch （preVnode，newVnode）

```js
/* renderComponent方法 大致模拟*/
class Component {
    constructor(props) {

    }

    renderComponent() {
        const preVnode = this._vnode
        const newVnode = this.render()
        patch(preVnode, newVnode)
        this._vnode = newVnode
    }
}
```



### 问题解答

- setState 的异步：效果、原因
- vue 修改属性也是异步：效果、原因
- setState 的过程：最终走到  patch(preVnode, newVnode)





# 7-5 总结

- 说一下对组件化的理解？
  - 组件的封装：封装视图、数据、变化逻辑
  - 组件的复用：props传递、复用

- JSX 本质是什么？
  - JSX 语法（标签、JS 表达式、判断、循环、事件绑定）
  - JSX 本质就是语法糖，需被解析成 JS 才能运行
  - JSX 是独立的标准，可被其它项目使用



- JSX 和 vdom 的关系？

  - 为何需要vdom：JSX 需要渲染成 html，数据驱动视图
  - React.createElement 和 h ，都生成 vnode
  - 何时 patch：ReactDOM.render(...) 和 setState
  - 自定义组件的解析：初始化实例，然后执行 render

  

- 说一下 setState 的过程
  - setState 的异步：效果、原因
  - vue 修改属性也是异步：效果、原因
  - setState 的过程：最终走到  patch(preVnode, newVnode)



## 7-6 React Vs vue

### 知识点

- 两者的本质区别
- 看模板和组件化的区别
- 两者共同点
- 总结问题的答案



#### 两者的本质区别

- vue - 本质是 MVVM 框架，由MVC 发展而来
- React - 本质是前端组件化框架，有后端组件化发展而来



#### 模板的区别

- vue - 使用模板 （ 最初由 angular 提出）
- React - 使用 JSX
- **模板语法 **上，我更倾向于 JSX
- **模板分离** 上，我更加倾向于 vue

![mark](http://static.zxinc520.com/blog/20190907/3TJdcbF6Ud41.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190907/oPnkXYam0Ovp.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190907/O7ONMqnOcIxs.png?imageslim)



- 模板应该 和 JS 逻辑分离
- 回顾 ”开放封闭原则“



#### 组件化的区别

- React 本身就是组件化，没有组件化就不是 React
- vue 也支持组件化，不过是在 MVVM 上的扩展
- 查阅 vue 组件化的文档，洋洋洒洒很多（ 侧面反映 ）
- 对于组件化，我更倾向于 React，做的彻底而清晰



#### 两者的共同点

- 都支持组件化
- 都是数据驱动视图



### 问题解答

- 阐述一下对 React 和 Vue  的 认识
  - 国内使用，首推 vue。文档更易读、易学、社区够大
  - 如果团队水平较高，推荐使用 React。组件化 和 JSX
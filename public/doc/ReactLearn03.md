## React 第三天学习

> 在 react 项目中 添加样式
>
> 加载外部 css 样式文件
>
> css样式作用域的问题（modules，localIdentName， local 和 global）
>
> 在 React项目中 使用 bootsrtap（ 使用 sass ）
>
> React 中 绑定事件
>
> React中双向绑定事件（e.target.value 和 this.refs.txt.value）
>
> React组件的生命周期
>
> Dream what you want to dream; go where you want to go; be what you want to be, because you have only one life and one chance to do all the things you want to do！
>
> 做你想做的梦吧，去你想去的地方吧，成为你想成为的人吧，因为你只有一次生命，一个机会去做所有那些你想做的事。



## 在 react 项目中 添加样式

### 第一种方式：

```js
<h1 style={{color:'red',fontSize:'50px'}}>这是评论列表组件</h1>
```



#### 第一层封装：

**将样式对象抽离出来**

```js
const cmtStyle={color:'red',fontSize:'30px'}

<h1 style={cmtStyle}>这是评论列表组件</h1>
```



#### 第二层封装

**合并成一个大的样式对象**

```js
import React from 'react'

const styles = {
    Item: {border: '1px dashed #ccc', margin: '10px 10px'},
    user: {color: '#333'},
    content: {color: 'green', fontSize: '22px'}
}

export default function CmtItem(props) {
    return <div style={styles.Item}>
        <h3 style={styles.user}>评论人：{props.user}</h3>
        <p style={styles.content}>评论内容：{props.content}</p>
    </div>
}
```

![mark](http://static.zxinc520.com/blog/20190508/ivSmbt2swrg3.png?imageslim)

#### 第三层封装

**抽离为单独的 样式表模块**

![mark](http://static.zxinc520.com/blog/20190508/Gg6ricXHCgO0.png?imageslim)



*CmtItem.jsx*：

```js
import React from 'react
import styles from '@/components/styles'

export default function CmtItem(props) {
    return <div style={styles.Item}>
        <h3 style={styles.user}>评论人：{props.user}</h3>
        <p style={styles.content}>评论内容：{props.content}</p>
    </div>
}
```



*styles.js*:

```js
export default {
    Item: {border: '1px dashed #ccc', margin: '10px 10px'},
    user: {color: '#333'},
    content: {color: 'green', fontSize: '22px'}
}
```



## 加载外部 css 样式文件

*index.js*:

```js
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

import CmtList from '@/components/CmtList'

//使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div>
    <CmtList></CmtList>
</div>, document.getElementById('app'))              
```



*CmtList.jsx*：

```js
import React from "react";
import CmtItem from '@/components/CmtItem'

const cmtStyle = {color: 'red', fontSize: '30px', textAlign: 'center'}
import cssobj from cmtList.scss


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



*CmtItem.jsx*：

```js
import React from 'react'

import styles from '@/components/styles'

export default function CmtItem(props) {
    return <div style={styles.Item}>
        <h1 style={styles.user} >评论人：{props.user}</h1>
        <p >评论内容：{props.content}</p>
    </div>
}
```



*webpack.config.js*:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlplugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html'
})

module.exports = {
    mode: 'production',
    devServer: {
        open: true,
        port: 3000,
        contentBase: path.join(__dirname, 'src')
    },
    plugins: [
        htmlplugin
    ],
    module: {
        rules: [
            {
                test: /\.m?js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', [
                            "@babel/preset-react",
                            {
                                "pragmaFrag": "DomFrag", // default is React.Fragment
                                "throwIfNamespace": false // defaults to true
                            }
                        ]],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {test:/\.css$/,use:['style-loader,css-loader']}
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.json'],
        alias:{
          '@':path.join(__dirname,'./src') //这样，@ 就表示 项目根目录中 的src 这一层路径
        }
    }
}
```





#### 配置好相应的文件后，但是却意外的发生了错误！

![mark](http://static.zxinc520.com/blog/20190511/GMbDLo9GrxeD.png?imageslim)



查阅资料：参考  [[Error: Cannot resolve module 'style-loader'](https://stackoverflow.com/questions/35171288/error-cannot-resolve-module-style-loader)](https://stackoverflow.com/questions/35171288/error-cannot-resolve-module-style-loader)

但是不知咋地，我瞎弄了一下，突然就好了！~

*结果*：

![mark](http://static.zxinc520.com/blog/20190509/o8CRGPxVP3S2.png?imageslim)



## 引出 css样式作用域的问题

#### 给普通样式表加模块化    

> CSS MODULE是一种css in javascript的方式，当我们把一个css文件import到一个js模块时，这个css文件会暴露一个对象，这个对象映射所有的本地和全局css类名

​		 [你真的知道 css-loader 怎么用吗？](https://juejin.im/entry/5826e755c4c9710054313d6e)

### modules

**操作**：

1. 1.配置 ***webpack.config.js***:

   追加参数 *modules*：表示为 普通的 css 样式表，启用模块化。

```js
{test:/\.css$/,use:['style-loader','css-loader?modules']}
```

***注意***：

- 1.css模块化，只针对 **类选择器** 和 **Id 选择器**生效。
- 2.css 模块化，不会将 **标签选择器** 模块化。



***使用***：

```js
import cssobj from cmtList.scss

<h1 className={cssobj.title}>这是评论列表组件</h1>
```



![mark](http://static.zxinc520.com/blog/20190509/uBEiMLCl4Po1.png?imageslim)

 

### localIdentName

> 通常modules参数还要通过localIdentName的配合来设置css的类名。在上文中我们看到没有设置localIdentName的css编译后是一串随机字符串，可读性很差，因此我们还需要对它的类名进行处理，这就用到了localIdentName。

![mark](http://static.zxinc520.com/blog/20190509/LmY7Up6tjWsL.png?imageslim)

使用 localIdentName 设置 css-modules 模式下local 类名的命名。

*例如*：

【path】：

```js
{test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[path]']}
```

![mark](http://static.zxinc520.com/blog/20190511/6kzRvdhhMCya.png?imageslim)



【path】【name】：

```js
{test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[path][name]']}

```

![mark](http://static.zxinc520.com/blog/20190511/1fSFPLQWlGcr.png?imageslim)



【path】【name】【local】：

```js
{test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]']}
```

![mark](http://static.zxinc520.com/blog/20190509/mnElXq2M49y5.png?imageslim)





【path】【name】【local】【hash】：

```js
{test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash]']}
```

![mark](http://static.zxinc520.com/blog/20190511/f0mCgGRosdOV.png?imageslim)







### 通过 local 和 global 设置类名是否被模块化

> 被 **:local()** 包裹起来的类名，会被模块化，默认情况下，所有的类名和ID 都被模块化了。
>
> 被 :global() 包裹起来的类名，不会被模块化，而会全局生效。

**需求**：

![mark](http://static.zxinc520.com/blog/20190511/1nDtTim2qWpX.png?imageslim)



解决方案： [可以参考](https://zhuanlan.zhihu.com/p/23843710)

```css
:global(.test){
    margin:10px 10px;
}
```

**结果** ：

- test类名 *未被模块化* ，而是 *全局生效*：

![mark](http://static.zxinc520.com/blog/20190509/mxSgHjcOQL7t.png?imageslim)





## 在 React项目中 使用 bootsrtap

1. 1.安装 bootstrap  我一般使用 3.3.7 版本

```shell
npm i bootstrap@3.3.7 -S
```

2. 2.安装 相关 路径 图标 加载依赖

```shell
npm i url-loader file-loader -D
```

3. 3.配置 webpack-config-js 文件

```js
{test:/\.ttf|woff|woff2|eot|svg$/,use:'url-loader'}
```

4. 4.导入 **bootstrap包** 并且 使用 *bootstrap类*

```js
import bootcss from 'bootstrap/dist/css/bootstrap.min.css'

<button className={[bootcss.btn,bootcss['btn-primary']].join(' ')}>点我</button>
```

![mark](http://static.zxinc520.com/blog/20190509/AIA3b6TmGWOP.png?imageslim)



### 升级：

   问题：className={[bootcss.btn,bootcss['btn-primary']].join(' ')}  **这样调用太麻烦了**

> *自己规定*：
>
> **第三方的 样式表**：(例如: bootsrtap等 )都是以  .css 结尾，这样，我们不要为普通的 .css 启用模块化。
>
> **自己定义样式表**：都要以 .scss 或 .less 结尾，只为 .scss 或 .less  结尾的启用模块化。



### 使用 sass 

> ​	    [Sass/Scss、Less是什么?](https://www.cnblogs.com/wangpenghui522/p/5467560.html)

1. 1.安装：

```shell
npm i sass-loader node-sass -D
```

2.配置 *webpack.comfig.js* :

```js
{test:/\.css$/,use:['style-loader','css-loader']},
    
{test:/\.scss/,use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','sass-loader']}
```

3. 导入 **bootstrap包** 并且 使用 *bootstrap类* （ *只用导入第三方路径即可*  ）

```js
import 'bootstrap/dist/css/bootstrap.min.css'

<button className='btn btn-danger'>点我</button>
```

![mark](http://static.zxinc520.com/blog/20190511/nsjoVX1si22z.png?imageslim)



## React 中 绑定事件

#### 基本使用

*BindEvent.jsx*:

```js
import React from 'react'

export default class BindEvent extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render() {
        return<div>
              BindEvent组件
            <hr/>
            <button onClick={function () {
                console.log('ok')
            }}>按钮</button>
            </div>
    }
}
```

![mark](http://static.zxinc520.com/blog/20190511/QvadnFjsB97L.gif)

*分离*：

```js
import React from 'react'

export default class BindEvent extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return <div>
            <h1>BindEvent组件！</h1>
            <hr/>
            <button onClick={() => {
                this.myClickHandler()
            }}>你敢点我吗？
            </button>
        </div>
    }

    myClickHandler=()=>{
        alert('这是myClickHandler方法！')
    }
}
```

![mark](http://static.zxinc520.com/blog/20190511/9kb9Av4PcP9d.gif)

*传递参数*：

```js
import React from 'react'

export default class BindEvent extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return <div>
            <h1>BindEvent组件！</h1>
            <hr/>
            <button onClick={() => {
                this.myClickHandler('哈哈哈哈哈哈！')
            }}>你敢点我吗？
            </button>
        </div>
    }

    myClickHandler=(arg1)=>{
        alert('这是myClickHandler方法！'+arg1)
    }
}
```

![mark](http://static.zxinc520.com/blog/20190511/x9zF0YsaynFo.gif)





### 需求：点击按钮，改变 **this.state** 里面的值

> this.setState 方法的使用
>
> **注意**：this.setState 方法的执行是 **异步** 的

![mark](http://static.zxinc520.com/blog/20190511/1TfoRzRHPm3H.png?imageslim)



```js
import React from 'react'

export default class BindEvent extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '周琛！'
        }
    }

    render() {
        return <div>
            <h1>BindEvent组件！</h1>
            <hr/>
            <button onClick={() => {
                this.myClickHandler('哈哈哈哈哈哈！', '大傻瓜！')
            }}>你敢点我吗？
            </button>
            <h3>{this.state.msg}</h3>
        </div>
    }

    myClickHandler = (arg1, arg2) => {
        // alert('这是myClickHandler方法！'+arg1+arg2)
        this.setState({
            msg: '张三'
        })
    }
}
```

![mark](http://static.zxinc520.com/blog/20190511/AVQprOBiH0De.gif)

**注意**：在执行 this.setState 后，又想立即拿到最新的 state 值，需要使用 this.setState({},callback)

```js
 myClickHandler = (arg1, arg2) => {
        // alert('这是myClickHandler方法！'+arg1+arg2)
        this.setState({
            msg: '张三' + arg1 + arg2
        }, function () {
            console.log(this.state.msg)
        })
    }
```



## React中绑定文本框与State中的值

> 类似于 Vue 的双向绑定

#### 第一种双向绑定实现方式

```js
<input type="text" style={{width: '100%'}} value={this.state.msg} onChange={(e) => this.txtChanged(e)}/>

txtChanged = (e) => {
    this.setState({
        msg: e.target.value
    })
}
```

![mark](http://static.zxinc520.com/blog/20190511/k4Pz5wOdvDMe.gif)





### 使用 ref 获取DOM 元素引用

> Vue中，Vue为页面上的元素提供了 ref 的属性，获取元素引用，则需要使用 **this.$refs** 引用名称
>
> React中 获取元素的引用 ：**this.refs**



第二种双向绑定实现方式

```js
<input type="text" style={{width: '100%'}} value={this.state.msg} onChange={(e) => this.txtChanged(e)} ref="txt"/>

    txtChanged = (e) => {
    this.setState({
        msg: this.refs.txt.value
    })
}    
```



## React组件的生命周期

[可以参考](https://juejin.im/post/5a062fb551882535cd4a4ce3)

![mark](http://static.zxinc520.com/blog/20190512/WR2qsCelssvf.webp)

> 如图，React生命周期主要包括三个阶段：初始化阶段、运行中阶段和销毁阶段，在React不同的生命周期里，会依次触发不同的钩子函数，下面我们就来详细介绍一下React的生命周期函数










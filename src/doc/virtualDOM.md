# 虚拟 DOM

> 本章分析了**虚拟 DOM**  的使用场景、**常用 API**、以及 **diff 算法** 的代码框架。通过学习和了解虚拟 DOM ，为后面的 vue 和 React 学习打好基础。
>
> 
>
> **知识点** 
>
> 5-1 什么是 vdom，为何使用 vdom？
>
> 5-2 vdom 的如何应用，核心 API 是什么？
>
> 5-3 介绍 一下 diff  算法 
>
> 
>
> Ignorance is the curse of God, knowledge the wing wherewith we fly to heaven.——William Shakespeare
>
> 无知乃是罪恶，知识乃是我们借以飞向天堂的翅膀。——莎士比亚



### virtual dom

- vdom 是 vue 和 React 的核心，先讲哪个都绕不开它
- vdom 比较独立，使用也比较简单
- 如果面试问到 vue 和 React 的实现，免不了问 vdom



### 问题

- vdom 是什么？为何会存在 vdom？
- vdom 的如何应用，核心 API 是什么？
- 介绍一下 diff 算法



## 5-1 什么是 vdom，为何使用 vdom？

### 知识点

- 什么是 vdom？
- 设计一个需求场景
- 用 jQuery 实现
- 遇到的问题



#### 什么是 vdom？

- virtual dom，虚拟 DOM 
- 用 JS 模拟 DOM 结构
- DOM 变化的对比，放在 JS 层来做 （ 图灵完备语言 ）
- 提高重绘性能



```js
<ul id="list">
    <li class="item">Item 1</li>
	<li class="item">Item 2</li>
</ul>
```

**用 JS 模拟 DOM**  

```JS
// vdom
{
    tag:'ul',
    attrs:{
        id:'list'
    },
    children:[
        {
            tag:'li',
            attrs:{className:'item'},
            children:['Item 1']
        },
        {
            tag:'li',
            attrs:{className:'item'},
            children:['Item 2']
        }
    ]
}
```



#### 设计一个需求场景

```js
/*
* 1.将该数据展示成一个表格
* 2.随便修改一个信息，表格也跟着修改
* */
[
    {
    name: '张三',
    age: '20',
    address: '北京'
    }, {
    name: '李四',
    age: '21',
    address: '上海'
    }, {
    name: '王五',
    age: '22',
    address: '广州'
    }
]
```

*jQuery 实现* ：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="container"></div>
<button id="btn-change">change</button>

<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
    var data = [
        {
            name: '张三',
            age: '20',
            address: '北京'
        }, {
            name: '李四',
            age: '21',
            address: '上海'
        }, {
            name: '王五',
            age: '22',
            address: '广州'
        }
    ]

    //渲染函数
    function render(data) {
        var $container = $('#container')
        //清空容器
        $container.html('')

        //拼接  table
        var $table = $('<table>')
        $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'))
        data.forEach(function (item) {
            $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td></tr>'))
        })

        //渲染 到页面   jQuery放在这里：只有 一次DOM渲染，性能更好，但是 并不符合理想情况
        $container.append($table)
    }

    $('#btn-change').click(function () {
        data[1].age = 30
        data[2].address = '深圳'
        //  re-render 再次渲染
        render(data)
    })

    //页面加载完，立即执行
    render(data)
</script>
</body>
</html>
```

![mark](http://static.zxinc520.com/blog/20190826/fnRWrTN8GFST.gif)



#### 遇到的问题

- DOM 操作是 “昂贵”的，js **运行效率高** 
- 尽量减少 DOM 操作 ，而不是  “推倒重来”
- 项目越复杂 ，影响就越严重
- vdom 即可解决这个问题



#### 问题解答

- vdom 是什么？为何会存在 vdom？
  -  virtual dom，虚拟 DOM 
  - 用 JS 模拟 DOM 结构
  - DOM 操作非常 “昂贵”
  - 将 DOM 对比操作放在 JS  层，提高效率



- vdom 的如何应用，核心 API 是什么？
  - 介绍  [snabbdom](https://github.com/snabbdom/snabbdom)  
  - 重做 之前的 demo
  - 核心 API



## 5-2 vdom 的如何应用，核心 API 是什么？

> 介绍  snabbdom ：一个 vdom 实现库。  



### 介绍  snabbdom  

> 虚拟DOM非常棒。它允许我们将应用程序的视图表示为其状态的函数。但现有的解决方案太过臃肿，太慢，缺乏功能，API偏向于OOP和/或缺少我需要的功能。
>
> [Snabbdom](https://github.com/snabbdom/snabbdom) 由一个非常简单，高性能和可扩展的核心组成，只有≈200SLOC。它提供了模块化架构，具有丰富的功能，可通过自定义模块进 为了保持核心简单，所有非必要功能都委托给模块。
>
> 你可以将 Snabbdom 塑造成你想要的任何东西！选择，选择和自定义所需的功能。或者，您可以使用默认扩展并获得具有高性能，小尺寸和下面列出的所有功能的虚拟DOM库。



#### 介绍  snabbdom - h 函数

![mark](http://static.zxinc520.com/blog/20190826/DY84t1uJz1C3.png?imageslim)

#### 介绍 snabbdom -patch 函数

![mark](http://static.zxinc520.com/blog/20190826/dbhW2mzgt6n3.png?imageslim)



### 使用 snabbdom 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="container"></div>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.min.js"></script>
<script>
    var snabbdom = window.snabbdom

    //定义 patch
    var patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
    ])

    // 定义 h
    var h = snabbdom.h

    var container = document.getElementById('container')

    //生成 vnode
    var vnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 1'),
        h('li.item', {}, 'Item 2')
    ])

    patch(container, vnode)

    document.getElementById('btn-change').addEventListener('click', function () {
        //生成 newVnode
        var newVnode = h('ul#list', {}, [
            h('li.item', {}, 'Item 1'),
            h('li.item', {}, 'Item B'),
            h('li.item', {}, 'Item 3')
        ])
        patch(vnode, newVnode)
    })
</script>
</body>
</html>
```

![mark](http://static.zxinc520.com/blog/20190826/o5jyCvk0PiHc.gif)





### 重做 之前的 demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="container"></div>
<button id="btn-change">change</button>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.min.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.min.js"></script>
<script>
    var snabbdom = window.snabbdom

    //定义 patch
    var patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
    ])

    // 定义 h
    var h = snabbdom.h

    //原始数据
    var data = [
        {
            name: '张三',
            age: '20',
            address: '北京'
        }, {
            name: '李四',
            age: '21',
            address: '上海'
        }, {
            name: '王五',
            age: '22',
            address: '广州'
        }
    ]

    //把表也放在 data 中
    data.unshift({
        name: '姓名',
        age: '年龄',
        address: '地址'
    })

    var container = document.getElementById('container')

    //渲染函数
    var vnode

    function render(data) {
        var newVnode = h('table', {}, data.map(function (item) {
            var tds = []
            var i
            for (i in item) {
                if (item.hasOwnProperty(i)) {
                    tds.push(h('td', {}, item[i] + ''))
                }
            }
            return h('tr', {}, tds)
        }))

        if (vnode) {
            // 再次渲染
            patch(vnode, newVnode)
        } else {
            // 初次渲染
            patch(container, newVnode)
        }
        vnode = newVnode
    }

    // 初次渲染
    render(data)

    var btnChange = document.getElementById('btn-change')
    btnChange.addEventListener('click', function () {
        data[1].age = 30
        data[2].address = '深圳'
        //re-render
        render(data)
    })
</script>
</body>
</html>
```

![mark](http://static.zxinc520.com/blog/20190826/c9oXjl7n0ScN.gif)



### 核心  API 

- h（'<标签名>'，{ ... 属性 ... }，[... 子元素 ...]）
- h（'<标签名>'，{  ... 属性 ... }，[ ‘....’]）
- patch（container，vnode）
- patch（vnode，newVnode）



### 问题解答

- vdom 的如何应用，核心 API 是什么？
  -  如何使用？  可用  snabbdom的 用法 来 举例
  -  核心 函数 ：h 函数，patch 函数





## 5-3 介绍 一下 diff  算法 



### 题目

- 什么是 diff 算法？
- 去繁就简
- vdom 为何用 diff  算法 ？
- diff 算法 的 实现流程



#### 什么是 diff 算法

> diff 算法 一直在我们身边 
>
> <u>并不是 Vue 和 React  创造出来的概念</u> 

*diff算法命令演示*  ：

- linux系统下： `diff  log1.txt  log2.txt`  ：比较2个文件的不同 
- `git  diff xxxx`  的示例 ： git里面比较不同版本间的代码差异



#### 去繁就简

- diff 算法非常复杂，实现难度很大，源码量很大
- 去繁就简，讲明白核心流程 ，不关心细节
- 面试官也大部分都不清楚细节，但是很关心核心流程 
- 去繁就简之后，依然 具有很大挑战性，并不简单  



#### vdom 为何用diff  算法 

- DOM 操作是 “昂贵”的，因此尽量减少DOM 操作 
- 找出本次 DOM  必须更新的节点来更新，其它的 不更新
- 这个 “ 找出 ” 的过程，就需要 diff 算法



### diff 实现过程

- patch （container，vnode）
- patch （vnode，newVnode）



#### patch （container，vnode）

![mark](http://static.zxinc520.com/blog/20190826/EQNow2OMou5G.png?imageslim)



**核心：如何使用 左边的 JS 节点 生成  右侧 Dom 节点？**   

![mark](http://static.zxinc520.com/blog/20190826/xcTxunRSOhnV.png?imageslim)



#### patch （vnode，newVnode）

> 核心：**对比 **

![mark](http://static.zxinc520.com/blog/20190826/3a4N2wzMJLaA.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190826/k1hdRameLCv5.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190826/hycgLD8H9RuC.png?imageslim)







#### diff 实现过程

- patch （container，vnode）和 patch （vnode，newVnode）
- createElment
- updataChildren



### 问题解答

- 介绍一下  diff 算法？
  - 知道什么是 diff 算法，是linux 的基础命令
  - vdom 中 应用 diff算法目的： 是为了 找出需要更新的节点
  - diff 实现：patch （container，vnode）和  patch （vnode，newVnode）
  - 核心 逻辑 ， createElment 和 updataChildren










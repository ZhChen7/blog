## Promise

> 前言: Promise是 **异步编程** 的一种解决方案, 相比传统的解决方案--->回调函数和事件更加强大.由社区最早提出和实现,ES6将其写进了语言标准,统一了用法,原生提供了Promise对象.
>
> 没有Promise之前,解决异步都是依赖回调,但执行多个具备前后顺序的异步操作时代码就会非常乱并且出现问题难调试.
>
> Promise 的 **本质** 是要干什么的：就是单纯的为了解决 **回调地狱问题**，但是并不能帮我们减少代码量。



### "回调地狱"是什么

”回调地狱“也叫”回调金字塔“，我们平时写代码的时候 js如果异步 回调是不可避免的
例如 ajax不断的进行异步请求数据 回调方法里还要对数据进行处理，继续回调...形成回调地狱
这会使得我们的代码可读性变差，出现问题 不好调试 也会导致性能下降

而nodejs 是一种单线程的事件驱动而且是非阻塞的I/O模型，而I/O模型，是异步的，这样nodejs在处理结果的时候 就需要在回调函数中执行，这样也就形成了回调地狱。

![mark](http://static.zxinc520.com/blog/20190420/4iquo6cVxxSQ.jpg?imageslim)



### Promise介绍

Promise就是实现异步编程的一种解决方案，核心就是Promise对象。Promise对象就像一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。它可以将异步操作以同步操作的流程表达出来，避免层层嵌套(callback)的毁掉函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。 

**Promise对象的两个特点**：

1. （1）对象的状态不受外界影响。有三种状态：pending(进行中)、resolved(已成功)、rejected(已失败); 
2. （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为resolved和从pending变为rejected。 

**Promise缺点：** 

1. （1）无法取消Promise，一旦新建它就会立即执行，无法中途取消; 
2. （2）如果不设置回调函数，Promise内部抛出的错误，不会反应到外部; 
3. （3）当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

------

#### **基本概念：**

1. 1.Promise 是一个构造函数，既然是构造函数，那么，我们就可以 new Promise() 得到一个Promise  的实例

2. 2.在Promise 上，有两个函数，分别叫做 **resolve**（成功之后的回调函数） 和 **reject**（失败之后的回调函数）

3. 3.在 Promise  构造函数的 Prototype 属性上，有一个 **.then()** 方法，也就说，只要是 Promise 构造函数创建的实例，都可以访问到 .then() 方法。

4. 4.Promise 表示一个 异步操作，每当我们 new 一个 Promise 的实例，这个实例，就表示一个具体的异步操作

5. 5.既然 Promise 创建的实例，是一个异步操作，那么，这个 异步操作的结果，只能有两种状态：

   ​		5.1 状态1： 异步执行成功了，需要在内部调用成功的回调函数（**resolve**），把结果返回给调用者。

   ​		5.2 状态2： 异步执行失败了，需要在内部调用失败的回调函数（**reject**），把结果返回给调用者。

   ​		5.3 由于 Promise 的实例，是一个异步操作，所以，内部拿到 操作结果后，无法使用 return 把操作的结果返回给调用者；这时候，只能使用回调函数的形式，来把 成功 或 失败的结果，返回给调用者。

6. 6.我们可以在 new 出来的 Promise  实例上，调用 **.then() 方法**，【预先】为这个 Promise 异步操作指定 成功（**resolve**）和 失败（**reject**）回调函数



## 关于Promise要解决回调地狱问题的说明

**实验需求**：你要封装一个方法，我给你一个要读取文件的路径，你这个方法帮我读取文件，并把内容返回给我。



**代码实际演示**：

**目录结构：**

![mark](http://static.zxinc520.com/blog/20190420/djU0REH3KKbb.png?imageslim)

### 第一步：初步实现一个读取文件的功能：

**封装读取文件的方法.js**：

```javascript
// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法帮我读取文件，并把内容返回给我

const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, './files/1.txt'), 'utf-8', (err, dataStr) => {
    if (err) {
        throw err
    }
    console.log(dataStr)
})
```

运行结果：

![mark](http://static.zxinc520.com/blog/20190420/TR4X4SXC6m2m.png?imageslim)



### 第二步：封装一个读取文件的方法

**封装读取文件的方法.js**：

```javascript
const fs = require('fs')
const path = require('path')

//初衷 ：给定文件路径 ，返回读取到的内容
function getFileByPath(fpath) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            throw err
        }
        return dataStr
    })
}

let result= getFileByPath(path.join(__dirname, './files/1.txt'))
console.log(result)
```

结果：

![mark](http://static.zxinc520.com/blog/20190420/4LrSd5ascJjT.png?imageslim)



### **解决方案：使用回调函数**

------

**封装读取文件的方法.js**：

```javascript
const fs = require('fs')
const path = require('path')

//使用回调函数
function getFileByPath(fpath,callback) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
           return callback(err)
        }
        callback(dataStr)
    })
}

getFileByPath(path.join(__dirname, './files/1.txt'),(dataStr)=>{
    console.log(dataStr)
})
```

运行结果：

![mark](http://static.zxinc520.com/blog/20190420/U5MDnc8QChTb.png?imageslim)



## 封装读取文件的方法--改进：

- **callback中，设置两个参数（err, dataStr）**

**封装读取文件的方法.js**：

```javascript
const fs = require('fs')
const path = require('path')

//使用回调函数
//我们可以规定一下，callback中，有两个参数，第一个参数是失败的结果，第二个参数是成功的结果
//同时，我们规定了：如果成功后，返回的结果，应该位于callback 参数的第二个位置，此时，第一个位置由于没有出错，所以放一个null，如果失败了则第一个位置放置 Error对象，第二个位置放置一个 undefined

function getFileByPath(fpath, callback) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            return callback(err)
        }
        callback(null, dataStr)
    })
}

getFileByPath(path.join(__dirname, './files/1.txt'), (err, dataStr) => {
    if (err) {
        return console.log(err.message)
    }
    console.log(dataStr)
})
```

![mark](http://static.zxinc520.com/blog/20190420/Gi6Iffxxw1Jk.png?imageslim)



## 封装读取文件的方法-提高版

- **拆分成 两个 回调（getFileByPath (fpath, succCb, errCb)）**

**封装读取文件的方法-提高版.js：**

```javascript
const fs = require('fs')
const path = require('path')

//使用两个回调---便于理解
function getFileByPath(fpath, succCb, errCb) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            return errCb(err)
        }
        succCb(dataStr)
    })
}

getFileByPath(path.join(__dirname, './files/1.txt'), (dataStr) => {
    console.log('成功的结果，使用成功的回调succCb: ' + dataStr)
}, (err) => {
    console.log('失败的结果，使用失败的回调errCb: ' + err.message)
})
```

**成功的结果：**

![mark](http://static.zxinc520.com/blog/20190420/OfeQfiHdiJVC.png?imageslim)



**失败的结果：**

![mark](http://static.zxinc520.com/blog/20190420/uVvrqObQxNtc.png?imageslim)







## 回调嵌套

### 需求：先读取文件1，在读取文件2，最后读取文件3

初步实现：

```javascript
//使用回调函数
function getFileByPath(fpath, callback) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            return callback(err.message)
        }
        callback(dataStr)
    })
}

//回调地狱
getFileByPath(path.join(__dirname, './files/1.txt'), (dataStr) => {
    console.log(dataStr)
    getFileByPath(path.join(__dirname, './files/2.txt'), (dataStr) => {
        console.log(dataStr)
        getFileByPath(path.join(__dirname, './files/3.txt'), (dataStr) => {
            console.log(dataStr)
        })
    })
})
```



**运行结果：**

![mark](http://static.zxinc520.com/blog/20190420/lQlQH83IcW3B.png?imageslim)



使用  **Promise **:

```javascript
const fs = require('fs')
const path = require('path')

function getFileByPath(fpath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, fpath), 'utf-8', (err, dataStr) => {
            if (err) {
                return reject(err)
            }
            resolve(dataStr)
        })
    })
}

getFileByPath('./files/1.txt')
    .then(function (data) {
        console.log(data)
        //读取文件2
        return getFileByPath('./files/2.txt')
    })
    .then(function (data) {
        console.log(data)
        //读取文件3
        return getFileByPath('./files/3.txt')
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (err) {
        console.log(err.message)
    })
```

![mark](http://static.zxinc520.com/blog/20190420/G1arCfeFpYYK.png?imageslim)



## Ajax使用 then方法高逼格请求数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="./node_modules/jquery/dist/jquery.min.js"></script>
</head>
<body>
<button id="btn">按钮</button>
<script>
    $(function () {
        $('#btn').click(function () {
            $.ajax({
                url: './data.json',
                type: 'get',
                dataType: 'json'
            }).then((data) => {
                console.log(data)
            })
        })
    })
</script>
</body>
</html>

```

运行结果：

![mark](http://static.zxinc520.com/blog/20190420/Raly4WtVEqEx.gif)






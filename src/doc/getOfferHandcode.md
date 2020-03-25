## 面试专题总结：手撕代码

> 希望读者依此构建自己的知识树（思维导图）
>
> 偷懒一下：可参考我自己总结思维导图 :  [点这里](https://github.com/ZhChen7/Interview-mind-map) 
>
> 手撕代码地址：[地址](https://github.com/ZhChen7/Technical-interview) 
>
> 附带：高频面试题积累文档。 来自于（学长、牛客网等平台）
>
> 自己开发的博客地址：[zxinc520.com](<http://zxinc520.com/>)
>
> github地址: [点击](https://github.com/ZhChen7) 



> 此篇 js - 【手撕代码】 知识点： 全部弄懂了，面试很容易。



### 1、Promise（A+规范）、then、all方法

~~~js
/*
     Promise：构造 Promise 函数对象
     excutor: 执行构造器 （同步执行）
*/
function Promise(excutor) {

    const _that = this
    _that.status = 'pending' // 给 promise对象指定 status属性,初始值为 pending
    _that.data = undefined   //给 promise 对象指定一个用于储存结果数据的属性
    _that.callbacks = [] // 每个元素的结构：{ onFulfilled(){}, onRejected(){}}

    function resolve(value) {

        // 如果当前状态不是 pending，直接结束
        if (_that.status !== 'pending') return


        // 将 状态改为 resolved
        _that.status = 'resolved'

        // 保存 value 数据
        _that.data = value

        // 如果有待执行callback 函数，立刻异步执行回调函数
        if (_that.callbacks.length > 0) {
            setTimeout(() => {
                _that.callbacks.forEach(callbacksObj => {
                    callbacksObj.onFulfilled(value)
                })
            })
        }
    }


    function reject(reason) {

        // 如果当前状态不是 pending，直接结束
        if (_that.status !== 'pending') return

        // 将 状态改为 rejected
        _that.status = 'rejected'

        // 保存 value 数据
        _that.data = reason

        // 如果有待执行callback 函数，立刻异步执行回调函数
        if (_that.callbacks.length > 0) {
            setTimeout(() => {
                _that.callbacks.forEach(callbacksObj => {
                    callbacksObj.onRejected(reason)
                })
            })
        }
    }


    //立刻同步执行 excutor
    try {
        excutor(resolve, reject)
    } catch (error) { //如果执行器抛出异常，promise对象变为 rejected 状态
        reject(error)
    }
}


/*
          Promise原型对象的 then() --- *思路*

            1、指定成功和失败的回调函数
            2、返回一个新的 promise 对象
            3、返回promise的结果由 onFulfilled/onRejected执行结果决定
            4、指定 onFulfilled/onRejected的默认值
         */
Promise.prototype.then = function (onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : reason => reason //向后传递成功的value

    //指定默认的失败的回调（实现错误/异常穿透的关键点）
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { //向后传递失败的reason
        throw reason
    }

    const _that = this


    //返回一个新的promise 对象
    return new Promise((resolve, reject) => {

        /*
                    调用指定的回调函数处理，根据执行结果，改变return的promise的状态
                 */
        function handle(callback) {
            /*
                           1. 如果抛出异常，return 的promise就会失败，reason 就是 error
                           2. 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
                           3.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
                        */

            try {
                const result = callback(_that.data)

                // 3.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
                if (result instanceof Promise) {
                    // result.then(
                    //     value => resolve(value), //当result成功时，让return的promise也成功
                    //     reason => reject(reason)  //当result失败时，让return的promise也失败
                    // )

                    result.then(resolve, reject)

                } else {
                    //  2. 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
                    resolve(result)
                }
            } catch (error) {
                //1. 如果抛出异常，return 的promise就会失败，reason 就是 error

                reject(error)
            }
        }


        if (_that.status === 'pending') {
            //假设当前状态还是 pending 状态，将回调函数 保存起来
            _that.callbacks.push({
                onFulfilled(value) {
                    handle(onFulfilled) //改promise的状态为 onFulfilled状态
                },
                onRejected(reason) {
                    handle(onRejected)  //改promise的状态为 onRejected状态
                }
            })
        } else if (_that.status === 'resolved') { //如果当前是resolved状态，异步执行onresolved并改变return的promise状态
            setTimeout(() => {
                handle(onFulfilled)
            })
        } else { //onRejected
            setTimeout(() => { //如果当前是rejected状态，异步执行onRejected并改变return的promise状态
                handle(onRejected)
            })
        }

    })

}


/*
            Promise原型对象的 catch()
            指定失败的回调函数
            返回一个新的 promise 对象
         */
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}

Promise.prototype.finally = function (callback) {
    return this.then(value => {
        Promise.resolve(callback(value))
    }, reason => {
        Promise.resolve(callback(reason))
    })
}

/*
            Promise函数对象的 resolve()
            返回 指定结果的 "成功" 的 promise 对象
         */
Promise.resolve = function (value) {
    //返回 一个 成功/失败 的promise
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) { //使用value的结果作为 promise 的结果
            value.then(resolve, reject)
        } else { //value不是promise => promise变为成功，数据是 value
            resolve(value)
        }
    })

}

/*
            Promise函数对象的 reject()
            返回 指定结果的 "失败" 的 promise 对象
         */
Promise.reject = function (reason) {

    //返回 一个失败的 promise
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}


/*
            Promise函数对象的 all()
            返回 一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就 失败
         */
Promise.all = function (promises) {

    const values = Array.apply(null, {length: promises.length})//用来保存所有成功 value的数组
    let resolvedCount = 0

    return new Promise((resolve, reject) => {

        //遍历获取每一个 promise的结果
        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                //p成功，将成功的 value 保存 values
                // values.push(value)  => 不能这样
                value => {

                    resolvedCount++ //成功的次数

                    values[index] = value

                    //如果全部成功了，将return的 promise 改为成功
                    if (resolvedCount === promises.length) {
                        resolve(values)
                    }

                },
                reason => { //只要一个失败了，return 的promise就失败
                    reject(reason)
                }
            )
        })
    })
}


/*
            Promise函数对象的 race()
            返回 一个promise，其结果由第一个完成的promise来决定
         */
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        //遍历获取每一个 promise的结果
        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                value => { // 一旦由成功了，将return 变为失败
                    resolve(value)
                },

                reason => { //只要一个失败了，return 的promise就失败
                    reject(reason)
                }
            )
        })
    })
}
~~~



### 2、手写 call apply bind 

~~~js
// 自定义apply函数
Function.prototype.apply1 = function (obj, arg) {
    //context为null或者是undefined时,设置默认值
    if (!obj) {
        obj = typeof window === 'undefined' ? global : window
    }
    obj.fn = this
    let result = null
    //undefined 或者 是 null 不是 Iterator 对象，不能被 ...
    if (arg === undefined || arg === null) {
        result = obj.fn(arg)
    } else {
        result = obj.fn(...arg)
    }
    delete obj.fn
    return result
}


// 自定义 call 函数
Function.prototype.call1 = function (obj, ...arg) {
    if (!obj) {
        obj = typeof window === 'undefined' ? global : window
    }
    obj.fn = this
    let result = null
    result = obj.fn(...arg)
    delete obj.fn
    return result
}

// 自定义 bind 函数
Function.prototype.bind = function (obj, ...arg) {
    if (!obj) {
        obj = typeof window === 'undefined' ? global : window
    }
    let self = this
    let args = arg

    function f() {}

    f.prototype = this.prototype
    let bound = function () {
        let res = [...args, ...arguments]
        let obj = this instanceof f ? this : obj
        return self.apply(obj, res)
    }
    bound.prototype = new f()
    return bound
}
~~~



### 3、Promise 封装Ajax方法

~~~js
function ajax(url, methods,data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(methods, url, true)
        xhr.send(data)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText)
            }else{
                reject(xhr.status)
            }
        }
    })
}
~~~



### 4、异步加载图片

~~~js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}
~~~



### 5、防抖，节流

~~~js
//防抖
function debounce(fn, delay) {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}


//节流
function throttle(fn,delay) {
    let canRun = true
    return function () {
        if(!canRun) return
        canRun = false
        setTimeout(()=>{
            fn.apply(this,arguments)
            canRun = true
        },delay)
    }
}
~~~



### 6、圣杯、双飞翼

#### 圣杯

~~~html
<style>
        *{
            padding: 0;
            margin: 0;
        }
        .container{
            overflow: hidden;
            padding: 0 100px 0 100px;

        }

        .middle,.left,.right{
            position: relative;
            float: left;
        }

        .left{
            width: 100px;
            height: 100px;
            background: red;
            margin-left: -100%;
            left: -100px;
        }

        .right{
            width: 100px;
            height: 100px;
            background: green;
            margin-left: -100px;
            right: -100px;

        }
        .middle{
            background: blue;
            width: 100%;
            height: 300px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="middle"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
~~~

#### 双飞翼

~~~html
<style>
        .container {
            overflow: hidden;
        }
        .middle, .left, .right {
            float: left;
            height: 100px;
        }
        .left {
            width: 100px;
            background: red;
            margin-left: -100%;
        }
        .right {
            width: 100px;
            background: blue;
            margin-left: -100px;
        }
        .middle {
            width: 100%;
            background: aqua;
        }
        .inner {
            margin: 0 100px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="middle">
        <div class="inner">middle</div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
~~~



### 7、继承相关

#### 7.1、原型链继承

- 原型链继承的基本思想：是利用原型让一个引用类型继承另一个引用类型的属性和方法。

  如 SubType.prototype = new SuperType();

  ```js
  function SuperType() {
      this.name = 'Yvette';
  }
  function SubType() {
      this.age = 22;
  }
  SubType.prototype = new SuperType();
  ```

- 缺点

  1. 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享
  2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数

  

#### 7.2、借用构造函数

- 其基本思想为:在子类型的构造函数中调用超类型构造函数。

  ```js
  function SuperType(name) {
      this.name = name
  }
  function SubType(name) {
      SuperType.call(this, name)
  }
  ```

- 优点

  1. 可以向超类传递参数
  2. 解决了原型中包含引用类型值被所有实例共享的问题

- 缺点

  1. 方法都在构造函数中定义，函数复用无从谈起
  2. 另外超类型原型中定义的方法对于子类型而言都是不可见的



#### 7.3、组合继承

- 组合继承指的是将原型链和借用构造函数技术组合到一块，从而发挥二者之长的一种继承模式。基本思路：使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

  ```js
  function SuperType() {
      this.name = 'zc'
      this.colors = ['pink', 'blue', 'green'];
  }
  function SubType() {
      SuperType.call(this)
  }
  SubType.prototype = new SuperType
  SubType.prototype.constructor = SubType
  let a = new SubType()
  let b = new SubType()
  
  a.colors.push('red')
  console.log(a.colors)//[ 'pink', 'blue', 'green', 'red' ]
  console.log(b.colors)//[ 'pink', 'blue', 'green' ]
  ```

- 优点

  1. 可以向超类传递参数
  2. 每个实例都有自己的属性
  3. 实现了函数复用

- 缺点

  1. 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

  

#### 7.4、原型式继承

- 原型式继承继承的基本思想：在 object() 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例，从本质上讲，object() 对传入的对象执行了一次浅拷贝。

  ECMAScript5通过新增 Object.create()方法规范了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象(可以覆盖原型对象上的同名属性)，在传入一个参数的情况下，Object.create() 和 object() 方法的行为相同。

  ```js
  function object(o) {
      function F() { }
      F.prototype = o;
      return new F();
  }
  ```

- 缺点

  1. 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享



#### 7.5、寄生式继承

- 寄生式继承是与原型式继承紧密相关的一种思路。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部已某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

  ```js
  function object(o) {
      function F() { }
      F.prototype = o;
      return new F();
  }
  function createAnother(original) {
      var clone = object(original);//通过调用函数创建一个新对象
      clone.sayHi = function () {//以某种方式增强这个对象
          console.log('hi');
      };
      return clone;//返回这个对象
  }
  ```

- 优点

  1. 基于 person 返回了一个新对象 -—— person2，新对象不仅具有 person 的所有属性和方法，而且还有自己的 sayHi() 方法。在考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

- 缺点

  1. 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下。
  2. 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

  

#### 7.6、寄生组合式继承

- 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路：

  不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

  ```js
  function inheritPrototype(subType, superType) {
      var prototype = object(superType.prototype); //创建对象
      prototype.constructor = subType;//增强对象
      subType.prototype = prototype;//指定对象
  }
  function SuperType(name) {
      this.name = name;
      this.colors = ['pink', 'blue', 'green'];
  }
  function SuberType(name, age) {
      SuperType.call(this, name);
      this.age = age;
  }
  inheritPrototype(SuberType, SuperType);
  ```

- 步骤

  第一步：创建超类型原型的一个副本

  第二步：为创建的副本添加 constructor 属性

  第三步：将新创建的对象赋值给子类型的原型

- 优点

  1. 只调用了一次超类构造函数，效率更高。避免在SuberType.prototype上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。因此寄生组合继承是引用类型最理性的继承范式。



#### 7.7、ES6 继承

- Class 可以通过extends关键字实现继承

  ```js
  class SuperType {
      constructor(age) {
          this.age = age;
      }
      getAge() {
          console.log(this.age);
      }
  }
  class SubType extends SuperType {
      constructor(age, name) {
          super(age); // 调用父类的constructor(x, y)
          this.name = name;
      }
      getName() {
          console.log(this.name);
      }
  }
  ```

- 对于ES6的 class 需要做以下几点说明

  1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
  2. class 声明内部会启用严格模式。
  3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
  4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
  5. 必须使用 new 调用 class
  6. class 内部无法重写类名



#### 使用 extends 关键字实现继承，有几点需要特别说明

- 子类必须在 constructor 中调用 super 方法，否则新建实例时会报错。如果没有子类没有定义 constructor 方法，那么这个方法会被默认添加。在子类的构造函数中，只有调用 super 之后，才能使用 this关键字，否则报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
- ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this





### 8、自定义new过程

~~~js
function _new(fn,...arg) {
    let obj = {}
    obj.__proto__= fn.prototype
    let ret= fn.apply(obj,arg)
    return  ret instanceof Object ? ret:obj
}
~~~



### 9、手写递归方法实现深拷贝

~~~js
// 手写实现深拷贝
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

function clone(target) {
    let targrtType = checkedType(target)
    let result = null
    if (targrtType === "Object") {
        result = {}
    } else if (targrtType === "Array") {
        result = []
    } else {
        return target
    }
    for (let item in target) {
        let value = target[item]
        if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
            result[item] = clone(value)
        } else {
            result[item] = value
        }
    }
    return result
}
~~~



### 10、实现一个柯里化函数

~~~js
//ES5写法
const currying = function (fn,...args) {
    if(args.length < fn.length){
        return function () {
            return currying(fn, ...args, ...arguments)
        }
    }else{
        return fn(...args)
    }
}

//ES6写法
const currying =(fn,...args)=>
    args.length < fn.length?(...argments)=> currying(fn,...args,...argments):fn(...args)
~~~



### 11、双向绑定（手写）

~~~js
// Object.defineProperty 写法
let vm = {}
let obj = {
    name: 'zc',
    age: '123'
}

for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        Object.defineProperty(vm, key, {
            get: function () {
                return obj[key]
            },
            set: function (newvalue) {
                obj[key] = newvalue
            }
        })
    }
}

obj.age ='111'
vm.age ='112221'

console.log(vm.age)
console.log(obj.age)
~~~

~~~js
// Proxy 写法
let vm = new Proxy(obj,{
    get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
})
~~~



### 10、JS发布订阅模式

~~~js

let pubSub = {
    list: {},
    subscribe: function (key, fn) {  //订阅
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
    },
    publish: function (key, ...args) {  //发布
        for (let fn of this.list[key]) {
            fn.apply(this, args)
        }
    },
    unSubscribe: function (key, fn) { //取消订阅
        let fnlist = this.list[key]
        if (!fnlist) return
        if (!fn) {
            fnlist.length = 0
        } else {
            fnlist.forEach((item, index) => {
                if (item === index) {
                    fnlist.splice(index, 1)
                }
            })
        }
    }

}

pubSub.subscribe('onwork', time => {
    console.log(`上班了：${time}`);
})
pubSub.subscribe('offwork', time => {
    console.log(`下班了：${time}`);
})
pubSub.subscribe('launch', time => {
    console.log(`吃饭了：${time}`);
})

// // 发布
pubSub.publish('offwork', '18:00:00');
pubSub.publish('launch', '12:00:00');

pubSub.unSubscribe('onwork');
pubSub.publish('onwork', '1222:00:00');
~~~



### 11、JS 获取url参数

~~~js
let test='?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=21331&rsv_pq=b8627e62001efbb9&rsv_t=eef5sqIQ98s66yOwueYH5BWlFUARj0PkHBdCA4ahbSVYQA5qO9MBoZPC0mU&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=5&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&inputT=509&rsv_sug4=509'

function f(str) {
    let str1 = str.slice(1)
    let arr=str1.split('&')
    console.log(arr)
    let map = new Map()

    arr.map(item=>{
      const [key,value] = item.split('=')
        map.set(key,decodeURIComponent(value))
    })

  return map
}


for (let item of  f(test)) {
    console.log(item)
}

~~~



### 12、二叉树

~~~js
//1、求二叉树中的节点个数
function getNodenum(root) {
    if (root == null) {
        return
    }
    return getNodenum(root.left) + getNodenum(root.right) + 1
}

//2、求二叉树的最大深度
function maxDepth(root) {
    if (root == null) {
        return
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

//3.二叉树的最小深度
function minDepth(root) {
    if (root == null) return
    let left = minDepth(root.left)
    let right = minDepth(root.right)
    return (left == 0 || right == 0) ? left + right + 1 : Math.min(left, right) + 1
}

//4.先序遍历（递归）
function preroot(root, callback) {
    if (root != null) {
        callback(root.key)
        preroot(root.left, callback)
        preroot(root.right, callback)
    }

}

//先序遍历（非递归）
function preroot(root) {
    let stack = [],
        result = []
    if (root != null) {
        stack.push(root)
    }
    while (stack.length != 0) {
        let temp = stack.pop()
        result.push(temp.key)

        if (temp.left != null) {
            stack.push(temp.left)
        }
        if (temp.right != null) {
            stack.push(temp.right)
        }
    }
    return result
}

//5 中序遍历（递归）
function middleroot(root, callback) {
    if (root != null) {
        preroot(root.left, callback)
        callback(root.key)
        preroot(root.right, callback)
    }
}

//5.1 中序遍历（非递归）
function middleroot(root) {
    let stack = [],
        result = []
    while (true) {
        while (root != null) {
            stack.push(root)
            root = root.left
        }
        if (stack.length == 0) {
            break
        }
        let temp = stack.pop()
        result.push(temp.key)
        stack.push(temp.right)
    }
    return result
}


//分层遍历（递归）
function bfs(root) {
    let queue = [],
        result = []
    let pointer = 0
    if (root != null) {
        queue.push(root)
    }
    let bfsFun = function () {
        let temp = queue[pointer]
        if (temp) {
            result.push(temp.key)
            if (temp.left) {
                queue.push(temp.left)
            }
            if (temp.right) {
                queue.push(temp.right)
            }
            pointer++
            bfsFun()
        }

    }
    bfsFun()
    return result
}

//分层遍历（非递归）
function bfs(root) {
    let queue = [],
        result = []
    if (root !== null) {
        queue.push(root)
    }
    let pointer = 0
    while (pointer < queue.length) {
        let temp = queue[pointer++]
        result.push(temp.key)
        temp.left && queue.push(temp.left)
        temp.right && queue.push(temp.right)
    }
    return result
}

// 按之字形顺序打印二叉树
function zhiRoot(root) {
    let stack1 = [],
        stack2 = [],
        result = []

    if (root != null) {
        stack1.push(root)
    }
    let flag = 1
    while (stack1.length != 0 || stack2.length != 0) {
        const list = []
        if (flag % 2) {
            while (stack1.length != 0) {
                let temp = stack2.pop()
                list.push(temp.key)
                temp.left && stack2.push(temp.left)
                temp.right && stack2.push(temp.right)
            }
        } else {
            while (stack2.length != 0) {
                let temp = stack1.pop()
                list.push(temp.key)
                temp.left && stack1.push(temp.left)
                temp.right && stack1.push(temp.right)
            }
        }
        i++
        result.push(list)
    }
    return result
}


function Print(root) {
    const result = [];

    if (root === null) {
        return result;
    }

    const stack1 = [];
    const stack2 = [];

    stack1.push(root);
    let flag = 1;
    while (stack1.length !== 0 || stack2.length !== 0) {
        const list = [];
        if (flag % 2) {
            while (stack1.length !== 0) {
                const temp = stack2.pop()
                list.push(temp.val);
                temp.left && stack2.push(temp.left)
                temp.right && stack2.push(temp.right)
            }
        } else {
            while (stack2.length !== 0) {
                const temp = stack1.pop()
                list.push(tmp.val);
                temp.left && stack1.push(temp.left)
                temp.right && stack1.push(temp.right)
            }
        }
        i++;
        result.push(list);
    }
    return result;
}


//7、求二叉树第K层的节点个数
function getknum(root, k) {
    if (root == null || k < 0) {
        return
    }
    if (root !== null && k == 1) {
        return 1
    }
    return getknum(root.left, k - 1) + getknum(root.right, k - 1)
}

//8.求二叉树第K层的叶子节点个数
function getksonnum(root, k) {
    if (root == null || k < 0) {
        return
    }
    if (root != null && k == 1) {
        if (root.left == null && root.right == null) {
            return 1
        } else {
            return 0
        }
    }
    return getksonnum(root, k - 1) + getksonnum(root, k - 1)
}


//反转二叉树
function reverseRoot(root) {
    if (root == null) {
        return
    }
    let temp = root.left
    root.left = reverseRoot(root.right)
    root.right = reverseRoot(temp)
    return root
}


// 求二叉树的直径
function longerlength(root) {
    let path = 0
    getlongerlength(root)
    return path

    function getlongerlength(root) {
        if (root == null) {
            return
        }
        let left = longerlength(root.left)
        let right = longerlength(root.right)
        path = Math.max(path, left + right)
        return Math.max(left, right) + 1
    }

}

// 二叉树中和为某一值的路径
function getPath(root, target) {
    let result = []
    if (root) {
        findPath(root, target, [], 0, result)
    }
    return result

    function findPath(root, target, stack, sum, result) {
        stack.push(root.key)
        sum += root.key
        if (!root.left && !root.right && sum === target) {
            result.push(stack.slice(0))
        }
        if (root.left) {
            findPath(root.left, target, stack, sum, result)
        }
        if (root.right) {
            findPath(root.right, target, stack, sum, result)
        }
        stack.pop()
    }

}

//给定一棵二叉搜索树，请找出其中的第k小的结点。(中序遍历+ k小)
~~~



### 13、实现一个链表

~~~js
function linkedList() {
    function node(data) {
        this.data = data
        this.next = null
    }

    this.head = null
    this.length = 0


    linkedList.prototype.append = function (data) {
        let newnode = new node(data)
        if (this.head == null) {
            this.head = newnode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newnode
            this.length++
        }
    }
    linkedList.prototype.find =function(data){
        let current = this.head
        while(current.next){
            if(current.data ===data){
                break
            }
            current = current.next
        }
        return current
    }

    linkedList.prototype.fixed=function(data,newdata){
           let current= this.find(data)
           current.data= newdata
    }

    linkedList.prototype.prefind =function(data){
        let current = this.head
        while(current.next){
            if(current.next.data ===data){
                break
            }
            current = current.next
        }
        return current
    }

    linkedList.prototype.delete = function (data) {

            if(this.head.data === data){
                this.head = this.head.next
                return
            }
            let prenode=this.prefind(data)
            let current=this.find(data)
            prenode = current.next
    }

    linkedList.prototype.toString = function () {
        let result = ''
        let current = this.head
        while (current) {
            result += current.data + "->"
            current = current.next
        }
        return result
    }

}
let a = new linkedList()
a.append('abc')
a.append('abcd')
a.append('abcde')
console.log(a.toString())

a.fixed('abc',11111)
console.log(a.toString())
~~~



### 14、哈希表

~~~js
//链地址法
//装载因子（0.25，0.75）
function HashTable() {
    //属性
    this.storage = []   //存储的位置
    this.count = 0     // 数目
    this.limit = 7    //最终限制数组的大小

    //方法
    // 哈希函数
    HashTable.prototype.hashFunc = function (str, size) {
        //1、定义 hashCode变量
        let hashCode = 0
        for (let i = 0; i < str.length; i++) {
            //2、霍纳算法，来计算hashCode的值
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        //3、取余操作
        let index = hashCode % size
        return index
    }


    //插入&修改操作
    HashTable.prototype.put = function (key, value) {
        //1.根据key获取对应的 index
        let index = this.hashFunc(key, this.limit)
        // 2、根据 index 取出对应的 bucket
        let bucket = this.storage[index]

        //3、判断 bucket是否为空
        if (bucket == null) {
            bucket = []
            this.storage[index] = bucket
        }
        //4、判断是否是修改数据
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                tuple[1] = value
                return
            }
        }
        //5.添加操作
        bucket.push([key, value])
        this.count++

        //判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            this.resize(this.limit * 2)
        } 

    }

    //获取操作
    HashTable.prototype.get = function (key) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]
        if (bucket == null) {
            return false
        }
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) {
                return tuple[1]
            }
        }
    }
    HashTable.prototype.remove = function (key) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]
        if (bucket == null) {
            return null
        }
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                bucket.splice(i, 1)
                this.count--

                //缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.75) {
                    this.resize(Math.floor(this.limit / 2))
                }

                return tuple[1]
            }
        }
        return null
    }

    //哈希表的扩容、
    HashTable.prototype.resize = function (newLimit) {
        //1.保存旧的数据内容
        let oldStorage = this.storage
        //2. 重置所有的属性

        this.storage = []
        this.count = 0
        this.limit = newLimit


        //3.遍历 oldStorage 所有的 bucket
        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i]
            if (bucket == null) {
                continue
            }
            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[i]
                this.put(tuple[0], tuple[1])

            }
        }

    }

}
let a = new HashTable()
a.put('zc', '15')
a.put('zc1', '115')
a.put('z1', '115')
a.put('asd', '115')
a.put('wew', '115')
a.remove('wew')
console.log(a.get('wew'))
~~~



### 15、图

~~~js
function Queue() {
    //栈中的属性
    this.items = []

    //1.压入栈push()
    Queue.prototype.enqueue = function (...element) {
        this.items.push(...element)
    }

    //2.从队列中删除前端元素
    Queue.prototype.dequeue = function () {
        return this.items.shift()
    }

    //3.查看一下前端元素
    Queue.prototype.front = function () {
        return this.items[0]
    }

    //4.判断栈是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    //5.获取栈中元素的个数
    Queue.prototype.size = function () {
        return this.items.length
    }
    //6.toString方法
    Queue.prototype.toString = function () {
        return this.items.toString().split(',').join(' ')
    }
}

function Graph() {
    //属性： 顶点（数组）/边（字典）
    this.vertexes = []    //顶点
    this.edges = new Map()   //边

    //方法
    //增加对应顶点的方法
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }

    Graph.prototype.addEdge = function (v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    //实现toString 方法
    Graph.prototype.toString = function () {
        //定义字符转，保存最终的结构
        let resultString = ""
        for (let i = 0; i < this.vertexes.length; i++) {
            resultString += this.vertexes[i] + '->'
            let vEdges = this.edges.get(this.vertexes[i])
            for (let j = 0; j < vEdges.length; j++) {
                resultString += vEdges[j] + ' '
            }
            resultString += "\n"
        }
        return resultString
    }

    //图的遍历

    //初始化状态颜色
    Graph.prototype.initializeColor = function () {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }
        return colors
    }

    //广度优先搜索算法(BFS)  基于队列完成
    Graph.prototype.bfs = function (initV, handler) {
        //1.初始化颜色
        let colors = this.initializeColor()

        //2.创建队列
        let queue = new Queue()

        //3.将顶点加入队列中
        queue.enqueue(initV)

        //4.循环从队列中取出元素
        while (!queue.isEmpty()) {
            // 4.1从队列取出一个顶点
            let v = queue.dequeue()

            //4.2 获取和顶点相连的另外顶点
            let vList = this.edges.get(v)

            //4.3 将v的颜色设置为灰色
            colors[v] = 'gray'

            //4.4  遍历所有的顶点，并且加入到队列中
            for (let i = 0; i < vList.length; i++) {
                let e = vList[i]
                if (colors[e] == 'white') {
                    colors[e] = 'gray'
                    queue.enqueue(e)
                }
            }

            //4.5 访问顶点
             handler(v)

            //4.6 将顶点设置为黑色
            colors[v] = 'black'
        }
    }


    //广度优先搜索算法（DFS）
    Graph.prototype.dfs = function (initV, handler) {
        let colors = this.initializeColor()

        //递归访问
        this.dfsVisit(initV, colors, handler)

    }

    Graph.prototype.dfsVisit = function (v, colors, handler) {
        //1.将颜色设置为灰色
        colors[v] = 'gray'
        //2.处理V节点
        handler(v)

        //3.访问v相连的顶点
        let vList = this.edges.get(v)
        for (let i = 0; i < vList.length; i++) {
            let e = vList[i]
            if (colors[e] === 'white') {
                this.dfsVisit(e, colors, handler)
            }
        }

        //4.将v设置为黑色
        colors[v] = 'black'
    }
}
~~~



### 16、几种排序算法的实现

~~~js
function ArrayList() {
    this.array = []

    ArrayList.prototype.insert = function (item) {
        this.array.push(item)
    }

    ArrayList.prototype.toString = function () {
        return this.array.join('-')
    }

    ArrayList.prototype.swap = function (m, n) {
        let temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }
    //实现排序算法
    //冒泡排序
    ArrayList.prototype.bubbles = function () {
        if (this.array === null || this.array.length < 2) return this.array
        let length = this.array.length
        for (let i = length - 1; i >= 0; i--) {
            for (let j = 0; j < i; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1)
                }
            }
        }
    }

    //选择排序
    ArrayList.prototype.selectSort = function () {
        if (this.array === null || this.array.length < 2) return this.array
        let length = this.array.length
        for (let i = 0; i < length - 1; i++) {
            let min = i
            for (let j = i + 1; j < length; j++) {
                if (this.array[min] > this.array[j]) {
                    min = j
                }
            }
            this.swap(min, i)
        }
    }

    //插入排序
    ArrayList.prototype.insertSort = function () {
        if (this.array === null || this.array.length < 2) return this.array
        let length = this.array.length

        for (let i = 1; i < length; i++) {
            var temp = this.array[i]
            let j = i
            while (this.array[j - 1] > temp && j > 0) {
                this.array[j] = this.array[j - 1]
                j--
            }
            this.array[j] = temp
        }
    }

    //高级排序
    //希尔排序 (对插入排序的升级)
    ArrayList.prototype.shellSort = function () {
        if (this.array === null || this.array.length < 2) return this.array
        let length = this.array.length
        //初始化增量
        var gap = Math.floor(length / 2)
        // whlie循环
        while (gap > 1) {
            for (let i = gap; i < length; i++) {
                let temp = this.array[i]
                let j = i
                while (this.array[j - gap] > temp && j > gap - 1) {
                    this.array[j] = this.array[j - gap]
                    j -= gap
                }
                this.array[j] = temp
            }
            gap = Math.floor(gap / 2)
        }
    }
}
~~~

~~~js
// 快排
function median(arr, left, right) {
    let center = Math.floor(left + (right - left) / 2)
    if (arr[left] > arr[center]) {
        swap(arr, left, right)
    }
    if (arr[center] > arr[right]) {
        swap(arr, center, right)
    }
    if (arr[left] > arr[right]) {
        swap(arr, left, right)
    }
    swap(center, right - 1)
    return arr[right - 1]
}
function swap(arr, m, n) {
    let temp = arr[m]
    arr[m] = arr[n]
    arr[n] = temp
}
function quickSort(arr) {
    if(arr.length<=1){
        return arr
    }
   return quickSortFun(arr, 0, arr.length - 1)
}
function quickSortFun(arr, left, right) {
    if(left<right){
        let pivot = median(arr, left, right)
        let i = 0
        let j = right - 1
        while (true) {
            while (arr[++i] < pivot) {
            }
            while (arr[--j] > pivot && j>left) {
            }
            if (i < j) {
                swap(arr, i, j)
            } else {
                break
            }
        }
        if(i<right){
            swap(arr, i, right - 1)
        }
        quickSortFun(arr, left, i - 1)
        quickSortFun(arr, i + 1, right)
    }
    return arr
}
console.log(quickSort([1,4,2,3,1]))
~~~



### 17、手写迭代器

~~~js
var it = makeIterator(["a", "b"]);
console.log(it.next())
console.log(it.next())
console.log(it.next())

function makeIterator(array) {
    let nextindex=0
    return{
        next:function () {
            if(nextindex<array.length){
                return {value:array[nextindex++],done:false}
            }else{
                return {value: undefined,done: true}
            }
        }
    }
}
~~~



### 18、最大连续子序列

~~~js
let arr = [1, -5, 8, 3, -4, 15, -8]


// function getNum(arr) {
//     let length = arr.length
//     let maxmun=0
//     for (let i = 0; i <length ; i++) {
//         let sum=arr[i]
//         for (let j = i+1; j < length; j++) {
//             sum+=arr[j]
//             if(sum>maxmun){
//                 maxmun = sum
//             }
//
//         }
//     }
//     return maxmun
// }

function getNum(arr) {
    let max = 0
    let sum = 0
    for (let num of arr) {
        if (sum < 0) {
            sum = 0
        }
        sum += num
        max = Math.max(max, sum)
    }
    return max
}

console.log(getNum(arr))
~~~



### 19、实现一个EventListener类，包含on，off，emit方法

~~~js
//实现一个EventListener类，包含on，off，emit方法
class EventListener {
    constructor() {
        this.list = {}
    }

    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)

    }

    emit(key, ...args) {
        for (let fn of this.list[key]) {
            fn.apply(this, args)
        }
    }

    off(key, fn) {
        let fnlist = this.list[key]
        if (!fnlist) return
        if (!fn) {
            fnlist.length = 0
        } else {
            fnlist.forEach((item, index) => {
                if (item === fn) {
                    fnlist.splice(index, 1)
                }
            })
        }

    }
}

let obj1 = new EventListener()


obj1.on('work', value => {
    console.log(`我是${value}啊`)
})

obj1.on('eat', value => {
    console.log(`我在${value}啊`)
})


obj1.emit('work', 'zc')

obj1.off('eat')

obj1.emit('eat', '吃西瓜')
~~~



### 20、sleep函数

> 用promise写一个delay函数

~~~js
function sleep(time) {
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,time)
    })
}

sleep(1000).then(value=>{
    console.log('11111')
})

~~~



### 21、手写斐波那契

~~~js
// 递归
function getnum(num) {
    if(num<=1) return 1
    return getnum(num-1)+getnum(num-2)
}
console.log(getnum(2))
// ----------------------------------

//动态规划
function getnum(n) {
  let temp=[]
    if(n==1||n==2){
        return 1
    }else{
        temp[1]=1
        temp[2]=2
        for (let i = 3; i <n ; i++) {
            temp[i] = temp[i-1] + temp[i-2]
        }
        return temp[i-1]
    }
}


~~~



### 22、只包含'(', ')', '[', ']', '{', '}' 的字符串，判断是否有效。

~~~js
var isValid = function(s) {
    var rightSymbols = [];
    for (var i = 0; i < s.length; i++) {
        if(s[i] == "("){
            rightSymbols.push(")");
        }else if(s[i] == "{"){
            rightSymbols.push("}");
        }else if(s[i] == "["){
            rightSymbols.push("]");
        }else if(rightSymbols.pop() != s[i] ){
            return false;
        }
    }
    return !rightSymbols.length;
};

~~~



### 23、数组中只出现一次的数字

~~~js
let arr=[1,2,3,4,3,2,1]
const p=arr.reduce((a,b)=>{
    return a^b
})
console.log(p)
~~~



### 24、数组最大深度

~~~js
let arr = [1, [1, [3], 2], 2, [1], 3, 4]
let count = 0

function getDep(arr) {
    let p = false
    p = arr.some(item => {
        return item.length > 0
    })

    if (p) {
        count++
        getDep(arr.flat())
    } else {
        return count
    }
}
console.log(getDep(arr))
~~~



### 25、递归数组扁平化

~~~js
let arr= [1,2,3,2,[2,3],[2,[1],2]]
function wrap() {
    let ret=[]
    return function flatten(arr) {
        for(let item of arr){
            if(item.constructor === Array){
               ret.concat(flatten(item))
            }else{
                ret.push(item)
            }
        }
        return ret
    }
}
console.log(wrap()(arr))
~~~





### 26、模拟js精度丢失问题

> IEEE 754标准

~~~js
function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}
console.log(add(0.1,0.2))
~~~



### 27、单例模式

~~~js
// 单例模式不透明
function singleTon(name) {
    this.name = name
    this.instance = null
}

singleTon.prototype.getName=function () {
    console.log(this.name)
}

singleTon.getInstance = function (name) {
     if(!this.instance){
         this.instance = new singleTon(name)
     }
     return this.instance
}

var b = singleTon.getInstance('bbbbb')
var a = singleTon.getInstance('a')

console.log(a)
console.log(b)

// ----------------------------------

// 单例模式不透明（闭包）
function singleTon(name) {
    this.name = name
}

singleTon.prototype.getName=function () {
    console.log(this.name)
}

singleTon.getInstance = (function () {
    let instance = null
    return function (name) {
        return instance || (instance = new singleTon(name))
    }
})()

var a = singleTon.getInstance('a')
var b = singleTon.getInstance('bbbbb')
var c = singleTon.getInstance('cccccc')

console.log(a)
console.log(b)
console.log(c)
~~~

~~~js
//	单例模式透明
let getInstance = (function () {
    let instance = null
    return function (name) {
        if (!instance){
            this.name = name
            return instance=this
        }
        return instance
    }
})()

let a= new getInstance('aa')
let b= new getInstance('bbbb')
console.log(a)
console.log(b)
~~~

~~~js
// let getSingle = function (fn) {
//     let result= null
//     return function () {
//        return result || (result = fn.call(this,...arguments))
//     }
// }

// 通用的单例验证方法
const getSingle = function (fn){
    let result;
    return function (){
        return result || (result = fn.apply(this, arguments));
    };
};

function a(name) {
    this.name = name
}

var b =  getSingle(a)

var d = b('bbb','xxx','yyyyy')
var c = b('aaa')

console.log(d)
console.log(c)
~~~



### 28、策略模式

~~~js
// 策略类（开发人员）
var Strategies = {
    "backend": function(task) {
        console.log('进行后端任务：', task);
    },
    "frontend": function(task) {
        console.log('进行前端任务：', task);
    },
    "testend": function(task) {
        console.log('进行测试任务：', task);
    }
};
//  环境类（开发组长）
var Context = function(type, task) {
    typeof Strategies[type] === 'function' && Strategies[type](task);
}

~~~



### 29、代理模式

~~~js
//【图片预加载 -- 代理模式】

//定义本体 
let myImg=(function () {
    var img = new Image()
    document.body.append(img)
    return {
        setsrc(src){
            this.src=src
        }
    }
})()

//代理函数
let Proxysetimg = (function () {
    var img = new Image()
    img.onload =function () {
        myImg.setsrc(this.src)
    }
    return{
        setsrc(src){
            myImg.setsrc('./loading.gif')
            img.src = src
        }
    }

})()
Proxysetimg('./111.png')
~~~



### 30、观察者模式

~~~js
// 目标者类
class Subject {
    constructor() {
        this.observers = [];  // 观察者列表
    }
    // 添加
    add(observer) {
        this.observers.push(observer);
    }

    // 删除
    remove(observer) {
        let idx = this.observers.findIndex(item => item === observer);
        idx > -1 && this.observers.splice(idx, 1);
    }

    // 通知
    notify() {
        for (let observer of this.observers) {
            observer.update();
        }
    }
}

// 观察者类
class Observer {
    constructor(name) {
        this.name = name;
    }

    // 目标对象更新时触发的回调
    update() {
        console.log(`目标者通知我更新了，我是：${this.name}`);
    }
}

// 实例化目标者
let subject = new Subject();

// 实例化两个观察者
let obs1 = new Observer('前端开发者');
let obs2 = new Observer('后端开发者');

// 向目标者添加观察者
subject.add(obs1);
subject.add(obs2);

// 目标者通知更新
subject.notify();
// 输出：
// 目标者通知我更新了，我是前端开发者
// 目标者通知我更新了，我是后端开发者

~~~



### 31、命令模式

~~~js
class Receiver {  // 接收者类
    execute() {
        console.log('接收者执行请求');
    }
}

class Command {   // 命令对象类
    constructor(receiver) {
        this.receiver = receiver;
    }
    execute () {    // 调用接收者对应接口执行
        console.log('命令对象->接收者->对应接口执行');
        this.receiver.execute();
    }
}

class Invoker {   // 发布者类
    constructor(command) {
        this.command = command;
    }
    invoke() {      // 发布请求，调用命令对象
        console.log('发布者发布请求');
        this.command.execute();
    }
}

const warehouse = new Receiver();       // 仓库
const order = new Command(warehouse);   // 订单
const client = new Invoker(order);      // 客户
client.invoke();
~~~



### 32、Promise 处理文件读取

~~~js
const fs = require('fs')
const path = require('path');

const readfile = function (filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, filename), 'utf-8', function (error, data) {
            if (error) return reject(error)
            resolve(data)
        })
    })
}

readfile('./01.txt')
    .then(value => {
        console.log(value)
        return readfile('./02.txt')
    })
    .then(value => {
        console.log(value)
        return readfile('./03.txt')
    })
    .then(value => {
        console.log(value)
    }).catch(reason => {
    console.log(reason)
})
~~~



### 33、 Generator 函数文件读取

~~~js
const fs = require('fs')
const path = require('path');

const readfile = function (filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, filename), 'utf8', function (error, data) {
            if (error) return reject(error)
            resolve(data)
        })
    })
}
function* gen() {
    yield readfile('./01.txt')
    yield readfile('./02.txt')
    yield readfile('./03.txt')
}
const result = gen()

result.next().value.then(value=>{
    console.log(value)
    return result.next().value
}).then(value => {
    console.log(value)
    return result.next().value
}).then(value => {
    console.log(value)
}).catch(reason => {
    console.log(reason)
})

~~~



### 34、async 函数文件读取

~~~js
const fs = require('fs')
const path = require('path');

const readfile = function (filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, filename), 'utf8', function (error, data) {
            if (error) return reject(error)
            resolve(data)
        })
    })
}
async function gen() {
    try{
        const f1=await readfile('./01.txt')
        const f2=await readfile('./02.txt')
        const f3 = await readfile('./03.txt')
        console.log(f1)
        console.log(f2)
        console.log(f3)
    }catch (e) {
        console.log(e)
    }
}
gen()
~~~




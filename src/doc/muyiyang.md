## 每日一题

> 每天一道大厂前端面试题，一年后再回头，会感谢曾经努力的自己！
>
> 待更新状态
>
> 今天 2019/12/23 ~ 💪



### [第 1 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/blob/master/datum/summary.md#%E7%AC%AC-1-%E9%A2%98%E5%86%99-react--vue-%E9%A1%B9%E7%9B%AE%E6%97%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%9C%A8%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%86%99-key%E5%85%B6%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88) （2019/9/19）

**题目**：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

**公司**：滴滴、饿了么

**需了解** ：vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点。在vue的diff函数中。可以先了解一下diff算法。
在交叉对比的时候，当新节点跟旧节点`头尾交叉对比`没有结果的时候，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用一种遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言。map映射的速度更快。

**答案**： 

> key是给每一个vnode的唯一id,可以`依靠key`,更`准确`, 更`快`的拿到oldVnode中对应的vnode节点。
>
> key的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度。

1、更准确

因为带key就不是`就地复用`了，在sameNode函数 `a.key === b.key`对比中可以避免就地复用的情况。所以会更加准确。

2、更快

利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)



### [第 2 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4)（2019/9/20）

**题目**：`['1', '2', '3'].map(parseInt)` what & why ?

**答案** ：第一眼看到这个题目的时候，脑海跳出的答案是 [1, 2, 3]，但是 **真正的答案是[1, NaN, NaN]**。

```js
    console.log(parseInt('12'));//12
    console.log(parseInt('08'));//8
    console.log(parseInt('0x16')); //22
    console.log(parseInt('-12')); //-12
    console.log(parseInt('   -12'));//-12
    console.log(parseInt('   -  12'));///NAN
    console.log(parseInt('124ref')); //124
    console.log(parseInt('ref'));   //NAN
```

以上几乎就是`parseInt`函数一个形式参数时的所有情况

radix形参没指定的时候是**10**，其次他是具有有效范围滴：[2, 36]和特殊值0
下面是英语渣渣的我翻译后，简化的`parseInt`执行步骤：（ECMAScript原解析->[传送门](http://www.ecma-international.org/ecma-262/6.0/#sec-parseint-string-radix)）

1. 将第一个形参转换为字符串
2. 识别string转换是否有**code unit**，如果有 -> `-`标记为负数，`0x`或`0X`则把radix赋值为**16**
3. radix形参（int类型）是否存在，存在则重新赋值（会对实参进行Int32转化，无法转换成int类型则不会重新赋值radix）
4. radix为0，则设置radix为默认值10
5. 如果radix为1，或者大于等于37，parseInt直接返回**NaN**
6. 如果radix为[2, 36]时则代表，string参数分别是二进制，三进制（如果有得话~）...三十六进制类型
7. 然后对string进行的radix进制 -> 十进制转换

以上就是`parseInt`转换时的步骤，那么我们来开始解释`['1', '2', '3'].map(parseInt)`
**at first, 答案是[1, NaN, NaN]**

```js
(function (){
        var ret = ['1', '2', '3'].map((value, index)=>{
            console.log(value, index);
            return parseInt(value, index);
        });
        console.log(ret);
    })();
```

这是`['1', '2', '3'].map(parseInt)`内部执行的剖析，`value`和`index`相信大家都懂，不懂请自行[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map),执行步骤为：
`value='1',index=0` -> `parseInt(value, index)`
`value='2',index=1` -> `parseInt(value, index)`
`value='3',index=2` -> `parseInt(value, index)`
抽离出来，其实就是

```js
parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);
```

`parseInt('3', 2)`这是根据二进制对字符串`3`进行十进制转换对吧！！！
exm???有毛病?没毛病，老铁，就是......你家二进制有`3`?二进制不就是`0`和`1`啊

因此返回**NaN**。

解决方案：

```js
function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// Actual result is an array of numbers (as expected)

// Same as above, but using the concise arrow function syntax
['1', '2', '3'].map( str => parseInt(str) );

// A simpler way to achieve the above, while avoiding the "gotcha":
['1', '2', '3'].map(Number); // [1, 2, 3]

// But unlike parseInt(), Number() will also return a float or (resolved) exponential notation:
['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]
// For comparison, if we use parseInt() on the array above:
['1.1', '2.2e2', '3e300'].map( str => parseInt(str) ); // [1, 2, 3]
```



### [第 3 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)（2019/9/21）

**题目**：什么是防抖和节流？有什么区别？如何实现？

**公司** ：挖财

**解析** ：

1、**防抖**

> 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

思路：

> 每次触发事件时都取消之前的延时调用方法

```js
    function debounce(fn,delay) {
        let timeout = null // 创建一个标记用来存放定时器的返回值
        return function () {
            clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
            timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
                fn.apply(this, arguments)
        }, delay)
        };
    }
    function sayHi() {
        console.log('防抖成功');
    }

    var inp = document.getElementById('inp')
    inp.addEventListener('input', debounce(sayHi,500)) // 防抖
```

提出问题：请问，为什么要 fn.apply(this, arguments);而不是这样 fn()

解答：加上 apply 确保 在 sayHi 函数里的 this 指向的是 input对象(不然就指向 window 了，不是我们想要的)。
这里的箭头函数依旧是指向 input 对象。

![mark](http://static.zxinc520.com/blog/20190921/g4jPyh09vVh7.gif)

防抖应用场景：

1. 搜索框输入查询，如果用户一直在输入中，没有必要不停地调用去请求服务端接口，等用户停止输入的时候，再调用，设置一个合适的时间间隔，有效减轻服务端压力。
2. 表单验证
3. 按钮提交事件。
4. 浏览器窗口缩放，resize事件等。



2、**节流**

> 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

思路：

> 每次触发事件时都判断当前是否有等待执行的延时函数

```js
  function throttle(fn,delay) {
        let canRun = true; // 通过闭包保存一个标记
        return function () {
            if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
            canRun = false; // 立即设置为false
            setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
                fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            canRun = true;
        }, 500);
        };
    }
    function sayHi(e) {
        console.log(e.target.innerWidth, e.target.innerHeight);
    }
    window.addEventListener('resize', throttle(sayHi,500));
```

![mark](http://static.zxinc520.com/blog/20190921/nJbaVeD1wpaz.gif)



### [第 4 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/blob/master/datum/summary.md#%E7%AC%AC-4-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-setmapweakset-%E5%92%8C-weakmap-%E7%9A%84%E5%8C%BA%E5%88%AB) (2019/9/22)

**题目** ：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

**解析：** [木易杨前端进阶](https://muyiy.cn/question/js/4.html) 

```txt
Set
    成员唯一、无序且不重复
    [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
    可以遍历，方法有：add、delete、has
    
WeakSet
    成员都是对象
    成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
    不能遍历，方法有add、delete、has
    
Map
    本质上是键值对的集合，类似集合
    可以遍历，方法很多可以跟各种数据格式转换
    
WeakMap
    只接受对象作为键名（null除外），不接受其他类型的值作为键名
    键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    不能遍历，方法有get、set、has、delete
 
 Set与WeakSet区别:
    1. WeakSet只能存放对象
    2. WeakSet不支持遍历, 没有size熟悉
    3. WeakSet存放的对象不会计入到对象的引用技术, 因此不会影响GC的回收
    4. WeakSet存在的对象如果在外界消失了, 那么在WeakSet里面也会不存在
    
 Map与WeakMap区别
 	1. WeakMap只能接受对象作为键名字(null除外)
	2. WeakMap键名指向对象不会计入对象的引用数
```



### [第 5 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/9) (2019/9/22)

**题目：** 介绍下深度优先遍历和广度优先遍历，如何实现？

解析： 我先学习一下啥是  深度优先 和 广度优先... 惭愧！！！



### [第 6 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/10) （2019/9/23）

**题目** ：请分别用深度优先思想和广度优先思想实现一个拷贝函数？

> 弄懂了 优先遍历和广度优先遍历 再来做





### [第 7 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20) （2019/9/23）

**题目** ：ES5/ES6 的继承除了写法以外还有什么区别？

**解析** ： [更多](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)

1. `class` 声明会提升，但不会初始化赋值。`Foo` 进入暂时性死区，类似于 `let`、`const` 声明变量。
2. `class` 声明内部会启用严格模式。
3. `class` 的所有方法（包括静态方法和实例方法）都是不可枚举的。
4. `class` 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有`[[construct]]`，不能使用 `new` 来调用。
5. 必须使用 `new` 调用 `class`。
6. `class` 内部无法重写类名。



### [第 8 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)（2019/9/24）

**题目：** setTimeout、Promise、Async/Await 的区别 ？

**知识点** ：这里涉及到`Microtasks`、`Macrotasks`、event loop 以及 JS 的异步运行机制。[可参考](https://github.com/sisterAn/blog/issues/21) 

**解析** ： 

```txt
我觉得这题主要是考察这三者在事件循环中的区别，事件循环中分为宏任务队列和微任务队列。
其中 setTimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行；
promise.then里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；async函数表示函数里面可能会有异步方法，await后面跟一个表达式，async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。
```

**1、setTimeout**

```js
console.log('script start')	//1. 打印 script start
setTimeout(function(){
    console.log('settimeout')	// 4. 打印 settimeout
})	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')	//3. 打印 script start
// 输出顺序：script start->script end->settimeout

```

**2、 Promise** 

Promise本身是**同步的立即执行函数**， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。

```js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout

```

当JS主线程执行到Promise对象时，

- promise1.then() 的回调就是一个 task
- promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue
- promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中
- setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

**3. async/await** 

```js
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end

```

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

举个例子：

```js
async function func1() {
    return 1
}

console.log(func1())

```

![mark](http://static.zxinc520.com/blog/20190924/M0YN5oCKtEhr.png?imageslim)

很显然，func1的运行结果其实就是一个Promise对象。因此我们也可以使用then来处理后续逻辑。

```js
func1().then(res => {
    console.log(res);  // 30
}

```

await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。

> 更多可见 [setTimeout、Promise、Async/Await](https://github.com/sisterAn/blog/issues/21)



### [第 9 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)（2019/9/25）

**题目** ： Async/Await 如何通过同步的方式实现异步？

**公司** ：头条、微医   

**解析** ：  [Async/Await 如何通过同步的方式实现异步](Async/Await 如何通过同步的方式实现异步) 

首先，`async/await` 是 `Generator` 的语法糖

先来看一下二者的对比：

```JS
// Generator
run(function*() {
  const res1 = yield readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
  console.log(res1);
  const res2 = yield readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
  console.log(res2);
});

// async/await
const readFile = async ()=>{
  const res1 = await readFile(path.resolve(__dirname, '../data/a.json'), { encoding: 'utf8' });
  console.log(res1);
  const res2 = await readFile(path.resolve(__dirname, '../data/b.json'), { encoding: 'utf8' });
  console.log(res2);
  return 'done'；
}
const res = readFile();

```

可以看到，`async function` 代替了 `function*`，`await` 代替了 `yield`，同时也无需自己手写一个自动执行器 `run` 了

现在再来看看`async/await` 的特点：

- 当 `await` 后面跟的是 Promise 对象时，才会异步执行，其它类型的数据会同步执行
- 执行 `const res = readFile();` 返回的仍然是个 Promise 对象，上面代码中的 `return 'done';` 会直接被下面 `then` 函数接收到

```JS
res.then(data => {
  console.log(data); // done
});

```



### [第 10 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)（2019/9/26）

**题目类型** ：异步笔试题

**公司** ：头条

> 请写出下面代码的运行结果

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
/*  
    script start
    async1 start
    async2
    promise1
    script end
    async1 end
    promise2
    setTimeout
*/

```



### [第 11 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8) （2019/9/26）

**公司** ：携程

> 已知如下数组：
>
> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b}) //使用 flat
//或
Array.from(new Set(arr.toString().split(','))).sort((a,b)=>{return a-b}).map(Number) //利用 toString()

```



### [第 12 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/11) （2019/9/27）

**题目：** JS 异步解决方案的发展历程以及优缺点。

**公司** ：滴滴、挖财、微医、海康

**解析：** 

1. **回调函数（callback）** 

```js
setTimeout(() => {
    // callback 函数体
}, 1000)

```

**缺点**：回调地狱，不能用 try catch 捕获错误，不能 return 

回调地狱的根本问题在于：

- 缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
- 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，即（**控制反转**）
- 嵌套函数过多的多话，很难处理错误

**优点** ：解决了同步的问题（只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。）

2. **Promise** 

Promise就是为了解决callback的问题而产生的。

Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise，如果我们在 then 中 return ，return 的结果会被 Promise.resolve() 包装

**优点** ：解决了回调地狱的问题

```js
ajax('XXX1')
  .then(res => {
      // 操作逻辑
      return ajax('XXX2')
  }).then(res => {
      // 操作逻辑
      return ajax('XXX3')
  }).then(res => {
      // 操作逻辑
  })

```

**缺点** ：无法取消 Promise ，错误需要通过回调函数来捕获

3. **Generato** 

**特点** ：可以控制函数的执行，可以配合 co 函数库使用

```js
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()

```

4. **Async/await** 

async、await 是异步的终极解决方案

**优点**：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题

**缺点**：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch('XXX1')
  await fetch('XXX2')
  await fetch('XXX3')
}

```

下面来看一个使用 `await` 的例子：

```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1

```

对于以上代码你可能会有疑惑，让我来解释下原因

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，**generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来**
- 因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise`的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。



### [第 13 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/19) （2019/9/28）

**题目** ：Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

**公司** ：微医

```txt
看过 Event Loop 基础原理的就明白，Promise构造函数是同步执行，而 .then .catch .啥啥的是异步（还有process.nextTick等等，大家可以查），
而且放到了微队列中，async/await 中，await 前面的是同步，await 后面的是异步，写法上是这样，但是其实是 语法糖，最后还会转为 Promise.then的形式

.then()当然是同步执行，只不过是.then的cb被放入了微任务队列，产生了异步执行

promise是微观任务，setTimeout是宏观任务，先执行微观任务，在执行宏观任务；微观任务里，先执行同步再执行异步

```





### [第 14 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/12) （2019/9/29）

**题目** ：情人节福利题，如何实现一个 new ？

**公司**：兑吧

**解析** ：  [new创建对象的过程发生了什么](https://alexzhong22c.github.io/2017/08/12/js-new-happen/#%E6%8E%A7%E5%88%B6%E5%8F%B0%E7%BB%93%E6%9E%9C%E8%A7%A3%E6%9E%90)

```js
// new 的作用
// 创建一个新对象obj
// 把obj的__proto__指向Dog.prototype 实现继承
// 执行构造函数，传递参数，改变this指向 Dog.call(obj, ...args)
// 最后把obj赋值给sanmao
var _new = function() {
  let constructor = Array.prototype.shift.call(arguments)
  let args = arguments
  const obj = new Object()
  obj.__proto__ = constructor.prototype
  constructor.call(obj, ...args)
  return obj
}
var simao = _new(Dog, 'simao')
simao.bark()
simao.sayName()
console.log(simao instanceof Dog) // true

```

```js
// 这样写是不是简单点啊
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}

```



### [第 15 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14) （2019/9/30）

**题目** ：简单讲解一下http2的多路复用

**公司**：网易 

**解析** ：

```txt
在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

    第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
    
    第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。
    
HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

```



### [第 16 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15) （2019/10/01）

**题目** ：谈谈你对TCP三次握手和四次挥手的理解

**解析** ：[关于三次握手与四次挥手面试官想考我们什么？--- 不看后悔系列](https://juejin.im/post/5ccd0dfc6fb9a0324a08bb73)

三次握手：

1. 第一次握手：客户端给服务器发送一个 SYN 报文。
2. 第二次握手：服务器收到 SYN 报文之后，会应答一个 SYN+ACK 报文。
3. 第三次握手：客户端收到 SYN+ACK 报文之后，会回应一个 ACK 报文。
4. 服务器收到 ACK 报文之后，三次握手建立完成。

> **这里我顺便解释一下为啥只有三次握手才能确认双方的接受与发送能力是否正常，而两次却不可以**：
> 第一次握手：客户端发送网络包，服务端收到了。这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。
> 第二次握手：服务端发包，客户端收到了。这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常。
> 第三次握手：客户端发包，服务端收到了。这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。

四次挥手:

1. 第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于**FIN_WAIT1**状态。
2. 第二次握手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 + 1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 **CLOSE_WAIT**状态。
3. 第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 **LAST_ACK** 的状态。
4. 第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 + 1 作为自己 ACK 报文的序列号值，此时客户端处于 **TIME_WAIT** 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态
5. 服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。

这里特别需要主要的就是**TIME_WAIT**这个状态了，这个是面试的高频考点，就是要理解，为什么客户端发送 ACK 之后不直接关闭，而是要等一阵子才关闭。这其中的原因就是，要确保服务器是否已经收到了我们的 ACK 报文，如果没有收到的话，服务器会重新发 FIN 报文给客户端，客户端再次收到 ACK 报文之后，就知道之前的 ACK 报文丢失了，然后再次发送 ACK 报文。

至于 TIME_WAIT 持续的时间至少是一个报文的来回时间。一般会设置一个计时，如果过了这个计时没有再次收到 FIN 报文，则代表对方成功就是 ACK 报文，此时处于 CLOSED 状态。



### [第 17 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/21) （2019/10/08）

**题目** ：  A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态 ？

> 如果A 与 B 建立了正常连接后，从未相互发过数据，这个时候 B 突然机器重启，问 A 此时处于 TCP 什么状态？如何消除服务器程序中的这个状态？（超纲题，了解即可）





### [第 18 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17) （2019/10/08）

**题目** ：React 中 setState 什么时候是同步的，什么时候是异步的？

**公司** ：微医    [React中setState真的是异步的吗](https://juejin.im/post/5ac1aaad6fb9a028d444bb87) 

```txt
1.在组件生命周期中或者react事件绑定中，setState是通过异步更新的。
2.在延时的回调或者原生事件绑定的回调中调用setState不一定是异步的。
这个结果并不说明setState异步执行的说法是错误的，更加准确的说法应该是setState不能保证同步执行。
Dan Abramov也多次提到今后会将setState彻底改造为异步的，从js conf中提到的suspend新特新也印证了这一点。

```

```txt
这里所说的同步异步，并非真正的同步异步，通常是同步执行的。
这里的异步指的是多个状态会合成到一起进行批量更新。

```



### [第 19 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18) （2019/10/08）

**题目** ：React setState 笔试题，下面的代码输出什么？

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};

```

```js
1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。

2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。

3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。

//输出： 0 0 2 3

```



### [第 20 题  ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22) （2019/10/09）

**题目** ：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

 **解析** ：

**1、npm 模块安装机制：**

- 发出`npm install`命令
- 查询node_modules目录之中是否已经存在指定模块
  - 若存在，不再重新安装
  - 若不存在
    - npm 向 registry 查询模块压缩包的网址
    - 下载压缩包，存放在根目录下的`.npm`目录里
    - 解压压缩包到当前项目的`node_modules`目录

**2、npm 实现原理** 

输入 npm install 命令并敲下回车后，会经历如下几个阶段（以 npm 5.5.1 为例）：

1. **执行工程自身 preinstall**

当前 npm 工程如果定义了 preinstall 钩子此时会被执行。

2. **确定首层依赖模块**

首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。

工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

3. **获取模块**

获取模块是一个递归的过程，分为以下几步：

- 获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
- 获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
- 查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。

4. **模块扁平化（dedupe）**

上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 A 模块依赖于 loadsh，B 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。

从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有**重复模块**时，则将其丢弃。

这里需要对**重复模块**进行一个定义，它指的是**模块名相同**且 **semver 兼容。每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个兼容**版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。

比如 node-modules 下 foo 模块依赖 lodash@^1.0.0，bar 模块依赖 lodash@^1.1.0，则 **^1.1.0** 为兼容版本。

而当 foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0，则依据 semver 的规则，二者不存在兼容版本。会将一个版本放在 node_modules 中，另一个仍保留在依赖树里。

举个例子，假设一个依赖树原本是这样：

node_modules
-- foo
---- lodash@version1

-- bar
---- lodash@version2

假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：

node_modules
-- foo

-- bar

-- lodash（保留的版本为兼容版本）

假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：

node_modules
-- foo
-- lodash@version1

-- bar
---- lodash@version2

5. **安装模块**

这一步将会更新工程中的 node_modules，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。

6. **执行工程自身生命周期**

当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。

最后一步是生成或更新版本描述文件，npm install 过程完成。

参考 [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)

[详解npm的模块安装机制](https://www.bbsmax.com/A/qVdemmnEdP/)

[npm install的实现原理](https://www.zhihu.com/question/66629910)



### [第 21 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/23)  （2019/10/10）

**题目：** 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

**解析：**

**1、Object.prototype.toString.call()**  

每一个继承 Object 的对象都有 `toString` 方法，如果 `toString` 方法没有重写的话，会返回 `[Object type]`，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 `toString` 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。

```js
const an = ['Hello','An'];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"

```

这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

```js
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"

```

`Object.prototype.toString.call()` 常用于判断浏览器内置对象时。

更多实现可见 [谈谈 Object.prototype.toString](https://juejin.im/post/591647550ce4630069df1c4a)

**2、instanceof** 

`instanceof`  的内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

使用 `instanceof`判断一个对象是否为数组，`instanceof` 会判断这个对象的原型链上是否会找到对应的 `Array` 的原型，找到返回 `true`，否则返回 `false`。

```js
[]  instanceof Array; // true

```

但 `instanceof` 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

```js
[]  instanceof Object; // true

```

**3、Array.isArray()**

- 功能：用来判断对象是否为数组

- instanceof 与 isArray

  当检测Array实例时，`Array.isArray` 优于 `instanceof` ，因为 `Array.isArray` 可以检测出 `iframes`

  ```js
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  xArray = window.frames[window.frames.length-1].Array;
  var arr = new xArray(1,2,3); // [1,2,3]
  
  // Correctly checking for Array
  Array.isArray(arr);  // true
  Object.prototype.toString.call(arr); // true
  // Considered harmful, because doesn't work though iframes
  arr instanceof Array; // false
  
  ```

- `Array.isArray()` 与 `Object.prototype.toString.call()`

  `Array.isArray()`是ES5新增的方法，当不存在 `Array.isArray()` ，可以用 `Object.prototype.toString.call()` 实现。

  ```
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  
  ```

  

### [第 22 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24) （2019/10/11）

**题目：** 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化？

**解析：**  [浏览器的回流与重绘 (Reflow & Repaint)](https://juejin.im/post/5a9923e9518825558251c96a)

**1、浏览器渲染机制** 

- 浏览器采用流式布局模型（`Flow Based Layout`）
- 浏览器会把`HTML`解析成`DOM`，把`CSS`解析成`CSSOM`，`DOM`和`CSSOM`合并就产生了渲染树（`Render Tree`）。
- 有了`RenderTree`，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
- 由于浏览器使用流式布局，对`Render Tree`的计算通常只需要遍历一次就可以完成，**但table及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是为什么要避免使用table布局的原因之一**。

**2、重绘** 

由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如`outline`, `visibility`, `color`、`background-color`等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。

**3、回流** 

回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。

```html
<body>
<div class="error">
    <h4>我的组件</h4>
    <p><strong>错误：</strong>错误的描述…</p>
    <h5>错误纠正</h5>
    <ol>
        <li>第一步</li>
        <li>第二步</li>
    </ol>
</div>
</body>

```

在上面的HTML片段中，对该段落(`<p>`标签)回流将会引发强烈的回流，因为它是一个子节点。这也导致了祖先的回流（`div.error`和`body` – 视浏览器而定）。此外，`<h5>`和`<ol>`也会有简单的回流，因为其在DOM中在回流元素之后。**大部分的回流将导致页面的重新渲染。**

**回流必定会发生重绘，重绘不一定会引发回流。**

**4、浏览器优化** 

现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个浏览器刷新（即16.6ms）才会清空队列，但当你**获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值**。

主要包括以下属性或方法：

- `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
- `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
- `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
- `width`、`height`
- `getComputedStyle()`
- `getBoundingClientRect()`

所以，我们应该避免频繁的使用上述的属性，他们都会强制渲染刷新队列**。**

**5、减少重绘与回流**

1. CSS

   - **使用 transform 替代 top**

   - **使用 visibility 替换 display: none** ，因为前者只会引起重绘，后者会引发回流（改变了布局

   - **避免使用table布局**，可能很小的一个小改动会造成整个 `table` 的重新布局。

   - **尽可能在DOM树的最末端改变class**，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

   - **避免设置多层内联样式**，CSS 选择符**从右往左**匹配查找，避免节点层级过多。

     ```html
     <div>
       <a> <span></span> </a>
     </div>
     <style>
       span {
         color: red;
       }
       div > a > span {
         color: red;
       }
     </style>
     
     ```

     对于第一种设置样式的方式来说，浏览器只需要找到页面中所有的 `span` 标签然后设置颜色，但是对于第二种设置样式的方式来说，浏览器首先需要找到所有的 `span` 标签，然后找到 `span` 标签上的 `a` 标签，最后再去找到 `div` 标签，然后给符合这种条件的 `span` 标签设置颜色，这样的递归过程就很复杂。所以我们应该尽可能的避免写**过于具体**的 CSS 选择器，然后对于 HTML 来说也尽量少的添加无意义标签，保证**层级扁平**。

   - **将动画效果应用到position属性为absolute或fixed的元素上**，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 `requestAnimationFrame`，详见[探讨 requestAnimationFrame](https://github.com/LuNaHaiJiao/blog/issues/30)。

   - **避免使用CSS表达式**，可能会引发回流。

   - **将频繁重绘或者回流的节点设置为图层**，图层能够阻止该节点的渲染行为影响别的节点，例如`will-change`、`video`、`iframe`等标签，浏览器会自动将该节点变为图层。

   - **CSS3 硬件加速（GPU加速）**，使用css3硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

2. JavaScript

   - **避免频繁操作样式**，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。
   - **避免频繁操作DOM**，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。
   - **避免频繁读取会引发回流/重绘的属性**，如果确实需要多次使用，就用一个变量缓存起来。
   - **对具有复杂动画的元素使用绝对定位**，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

详见[浏览器的重绘与回流（Repaint、Reflow）](https://github.com/sisterAn/blog/issues/33)



### [第 23 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/25)（2019/10/12）

**题目：** 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

**解析：** 

我们先来看下这两个模式的实现结构：

![](https://img-blog.csdnimg.cn/20190329182209470.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hmODcyOTE0MzM0,size_16,color_FFFFFF,t_70)

观察者模式： 观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

发布订阅模式： 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。



**区别：** 

观察者模式和发布订阅模式最大的区别就是发布订阅模式有个事件调度中心。

观察者模式由具体目标调度，每个被订阅的目标里面都需要有对观察者的处理，这种处理方式比较直接粗暴，但是会造成代码的冗余。

而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰，消除了发布者和订阅者之间的依赖。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。比如发布者发布了很多消息，但是不想所有的订阅者都接收到，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

**观察者模式是不是发布订阅模式** 

网上关于这个问题的回答，出现了两极分化，有认为发布订阅模式就是观察者模式的，也有认为观察者模式和发布订阅模式是真不一样的。

其实我不知道发布订阅模式是不是观察者模式，就像我不知道辨别模式的关键是设计意图还是设计结构（理念），虽然《JavaScript设计模式与开发实践》一书中说了分辨模式的关键是意图而不是结构。

如果以结构来分辨模式，发布订阅模式相比观察者模式多了一个中间件订阅器，所以发布订阅模式是不同于观察者模式的；如果以意图来分辨模式，他们都是实现了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新，那么他们就是同一种模式，发布订阅模式是在观察者模式的基础上做的优化升级。

不过，不管他们是不是同一个设计模式，他们的实现方式确实有差别，我们在使用的时候应该根据场景来判断选择哪个。





### [第 24 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/45) （2019/10/13）

**题目：** 聊聊 Redux 和 Vuex 的设计思想 

**解析：** [关于Flux,Vuex,Redux的思考](https://juejin.im/post/5b6d75dce51d4533d20487b0)   [Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)

Flux是一种前端状态管理架构思想，专门解决软件的结构问题。
基于Flux的设计思想，出现了一批前端状态管理框架。
他们给出了一些库用于实现Flux的思想，并在Flux的基础上做了一些改进。
在这些框架里，当前最热门的莫过于Redux和Vuex了

**Flux** 

Flux数据流的顺序是:

View发起Action->Action传递到Dispatcher->Dispatcher将通知Store->Store的状态改变通知View进行改变

**Redux**

Redux相对于Flux的改进：

- 把store和Dispatcher合并,结构更加简单清晰
- 新增state角色，代表每个时间点store对应的值，对状态的管理更加明确

Redux数据流的顺序是:

View调用store.dispatch发起Action->store接受Action(action传入reducer函数,reducer函数返回一个新的state)->通知store.subscribe订阅的重新渲染函数

ps:[阮一峰老师的Redux+React小demo](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Freactjs%2Fredux%2Ftree%2Fmaster%2Fexamples%2Fcounter)

**Vuex** 

Vuex是专门为Vue设计的状态管理框架,
同样基于Flux架构，并吸收了Redux的优点

Vuex相对于Redux的不同点有:

- 改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，
  无需switch,只需在对应的mutation函数里改变state值即可
- 由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可

Vuex数据流的顺序是:

View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变(vue检测到数据变化自动渲染)





### [第 25 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26) （2019/10/14）

**题目：** 说说浏览器和 Node 事件循环的区别

**解析：**

**浏览器** 

**关于微任务和宏任务在浏览器的执行顺序是这样的：**

- 执行一只task（宏任务）
- 执行完micro-task队列 （微任务）

如此循环往复下去

> 浏览器的task（宏任务）执行顺序在 [html#event-loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) 里面有讲就不翻译了
> 常见的 task（宏任务） 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。
> 常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5新特性) 等。

![](https://user-gold-cdn.xitu.io/2019/1/10/1683863633586974?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**Node** 

Node的事件循环是libuv实现的，引用一张官网的图：

![](https://user-images.githubusercontent.com/20101525/53734427-eba9e880-3ebe-11e9-8511-eb4948e336ae.png)

大体的task（宏任务）执行顺序是这样的：

- timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。
- pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare：仅系统内部使用。
- poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。
- check 检测：setImmediate() 回调函数在这里执行。
- close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。

**微任务和宏任务在Node的执行顺序**

Node 10以前：

- 执行完一个阶段的所有任务
- 执行完nextTick队列里面的内容
- 然后执行完微任务队列的内容

Node 11以后：
和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列



### [第 26 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28) （2019/10/16）

**题目：** 介绍模块化发展历程

> 可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、`<script type="module">` 这几个角度考虑。

**解析：**  [es6,amd,smd,commonjs 思维导图](https://www.processon.com/view/link/5c8409bbe4b02b2ce492286a)

模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

**IIFE**： 使用自执行函数来编写模块化，特点：**在一个单独的函数作用域中执行代码，避免变量冲突**。

```js
(function(){
  return {
	data:[]
  }
})()

```

**AMD**： 使用requireJS 来编写模块化，特点：**依赖必须提前声明好**。

```js
define('./index.js',function(code){
	// code 就是index.js 返回的内容
})

```

**CMD**： 使用seaJS 来编写模块化，特点：**支持动态引入依赖文件**。

```js
define(function(require, exports, module) {  
  var indexCode = require('./index.js');
});

```

**CommonJS**： nodejs 中自带的模块化。

```js
var fs = require('fs');

```

**UMD**：兼容AMD，CommonJS 模块化语法。

**webpack(require.ensure)**：webpack 2.x 版本中的代码分割。

**ES Modules**： ES6 引入的模块化，支持import 来引入另一个 js 。

```js
import a from 'a';

```



### [第 27 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30)  （2019/10/16）

**题目：** 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。

**解析：** 

在ES5中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

```js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}

```

但ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

```js
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined

```



**在函数的内部属性`[[Scopes]]`中找到了** 

![](https://user-gold-cdn.xitu.io/2018/12/8/1678e8be5c831804?imageslim)

> 如上图，在全局作用域中用`const`声明的变量在函数`noop`中可以正常访问，没有问题。我用`dir`方法打印出函数`noop`的属性，最后在`[[Scopes]]`属性内找到了消失的全局变量`abcd`。



### [第 28 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/31)  （2019/10/17）

**题目：** cookie 和 token 都存放在 header 中，为什么不会劫持 token？

**解析：** 

1. 首先token不是防止XSS的，而是为了防止CSRF的；
2. CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token

------



> cookie：登陆后后端生成一个sessionid放在cookie中返回给客户端，并且服务端一直记录着这个sessionid，客户端以后每次请求都会带上这个sessionid，服务端通过这个sessionid来验证身份之类的操作。所以别人拿到了cookie拿到了sessionid后，就可以完全替代你。

> token：登陆后后端不返回一个token给客户端，客户端将这个token存储起来，然后每次客户端请求都需要开发者手动将token放在header中带过去，服务端每次只需要对这个token进行验证就能使用token中的信息来进行下一步操作了。

> xss：用户通过各种方式将恶意代码注入到其他用户的页面中。就可以通过脚本获取信息，发起请求，之类的操作。

> csrf：跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。这利用了web中用户身份验证的一个漏洞：**简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的**。csrf并不能够拿到用户的任何信息，它只是欺骗用户浏览器，让其以用户的名义进行操作。

> csrf例子：假如一家银行用以运行转账操作的URL地址如下： <http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName>
> 那么，一个恶意攻击者可以在另一个网站上放置如下代码： `<img src="<http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman>">`
> 如果有账户名为Alice的用户访问了恶意站点，而她之前刚访问过银行不久，登录信息尚未过期，那么她就会损失1000资金。

上面的两种攻击方式，如果被xss攻击了，不管是token还是cookie，都能被拿到，所以对于xss攻击来说，cookie和token没有什么区别。但是对于csrf来说就有区别了。

以上面的csrf攻击为例：

- cookie：用户点击了链接，cookie未失效，导致发起请求后后端以为是用户正常操作，于是进行扣款操作。
- token：用户点击链接，由于浏览器不会自动带上token，所以即使发了请求，后端的token验证不会通过，所以不会进行扣款操作。

这是个人理解的为什么只劫持cookie不劫持token的原因。



### [第 29 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/34) （2019/10/17）

**题目：** 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

**解析：** 

VM 主要做了两件微小的事情：

- 从 M 到 V 的映射（Data Binding），这样可以大量节省你人肉来 update View 的代码（将数据绑定到view）
- 从 V 到 M 的事件监听（DOM Listeners），这样你的 Model 会随着 View 触发事件而改变 （view改变的时候改变数据）

**1、M 到 V 实现**

做到这件事的第一步是形成类似于：

```js
// template
var tpl = '<p>{{ text }}</p>';
// data
var data = {
text: ‘This is some text‘
};
// magic process
template(tpl, data); // '<p>This is some text</p>'

```

中间的 magic process 是模板引擎所做的事情，已经有非常多种模板引擎可供选择

- [JavaScript templates](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en/docs/JavaScript_templates)

当然你比较喜欢造轮子的话也可以自己实现一个

- [一个 JavaScript 模板引擎的实现](https://link.zhihu.com/?target=http%3A//kyleslight.net/article/27)

无论是 Angular 的 $scope，React 的 state 还是 Vue 的 data 都提供了一个较为核心的 model 对象用来保存模型的状态；它们的模板引擎稍有差别，不过大体思路相似；拿到渲染后的 string 接下来做什么不言而喻了（中间还有很多处理，例如利用 model 的 diff 来最小量更新 view ）。

但是仅仅是这样并不够，我们需要知道什么时候来更新 view（ 即 render ），一般来说主要的 VM 做了以下几种选择：

- VM 实例初始化时
- model 动态修改时

其中初始化拿到 model 对象然后 render 没什么好讲的；model 被修改的时候如何监听属性的改变是一个问题，目前有以下几种思路：

- 借助于 Object 的 observe 方法
- 自己在 set，以及数组的常用操作里触发 change 事件
- 手动 setState()，然后在里面触发 change 事件

知道了触发 render 的时机以及如何 render，一个简单的 M 到 V 映射就实现了。

**2、V 到 M 实现**

从 V 到 M 主要由两类（ 虽然本质上都是监听 DOM ）构成，一类是用户自定义的 listener， 一类是 VM 自动处理的含有 value 属性元素的 listener

第一类类似于你在 Vue 里用 v-on 时绑定的那样，VM 在实例化得时候可以将所有用户自定义的 listener 一次性代理到根元素上，这些 listener 可以访问到你的 model 对象，这样你就可以在 listener 中改变 model

第二类类似于对含有 v-model 与 value 元素的自动处理，我们期望的是例如在一个输入框内

```js
<input type="text" v-model="message" />

```

输入值，那么我与之对应的 model 属性 message 也会随之改变，相当于 VM 做了一个默认的 listener，它会监听这些元素的改变然后自动改变 model，具体如何实现相信你也明白了



### [第 30 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39)   （2019/10/18）

**题目：** 两个数组合并成一个数组

> 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。

```js
function MergeArray(arr1, arr2) {
    var a2 = arr2.map((item) => {
        return item + 3
    })
    var arr = [...arr1, ...a2].sort()
    return arr.map((item) => {
        if (item.includes(3)) {
            return item.split('')[0]
        }
        return item
    })
}

```



### 第 31 题 （2019/10/18）

**题目：** 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}

```

**解析：** 

1. 使用闭包：

```js
for (var i = 0; i< 10; i++){
    ((i)=> {
        setTimeout(() => {
            console.log(i);
        }, 1000)
    })(i)
}

```

2. 使用 let

```js
for (let i = 0; i< 10; i++){
    setTimeout(() => {
        console.log(i);
    }, 1000)
}

```



### [第 32 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47)  （2019/10/19）

**题目：** Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

**解析：** 

作者：尤雨溪

链接：https://www.zhihu.com/question/31809713/answer/53544875

来源：知乎

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

**1. 原生 DOM 操作 vs. 通过框架封装操作。**

这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

**2. 对 React 的 Virtual DOM 的误解。**

React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：

- innerHTML:  render html string **O(template size)** + 重新创建所有 DOM 元素 **O(DOM size)**
- Virtual DOM: render Virtual DOM + diff **O(template size)** + 必要的 DOM 更新 **O(DOM change)**

Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了 1）不管你的数据变化多少，每次重绘的性能都可以接受；2) 你依然可以用类似 innerHTML 的思路去写你的应用。

**3. MVVM vs. Virtual DOM**

相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的 

O(watcher count) 

的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是

 O(change)

：

- 脏检查：scope digest **O(watcher count)** + 必要 DOM 更新 **O(DOM change)**
- 依赖收集：重新收集依赖 **O(data change)** + 必要 DOM 更新 **O(DOM change)**

可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。

MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: [dbmon](https://link.zhihu.com/?target=http%3A//vuejs.github.io/js-repaint-perfs/) (注意 Angular 默认版本无优化，优化过的在下面）

顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

**4. 性能比较也要看场合**

在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。在我看来 Virtual DOM 真正的价值从来都不是性能，而是它 1) 为函数式的 UI 编程方式打开了大门；2) 可以渲染到 DOM 以外的 backend，比如 ReactNative。



### [第 33 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/48)  （2019/10/20）

**题目：** 下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

```

**解析：** 

非严格模式：【输出函数体】

```js
ƒ b(){
    b = 20;
    console.log(b); 
}

```

严格模式：【报错】

```js
//"Uncaught TypeError: Assignment to constant variable."

```

> 针对这题，在知乎上看到别人的回答说：
>
> 1. 函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。
> 2. 对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。
> 3. IIFE中的函数是函数表达式，而不是函数声明。
>
> 实际上，有点类似于以下代码，但不完全相同，因为使用const不管在什么模式下，都会TypeError类型的错误
>
> > ```
> > const foo = function () {
> > foo = 10;
> > console.log(foo)
> > }
> > (foo)() // Uncaught TypeError: Assignment to constant variable.
> > 
> > ```
>
> 我的理解是，b函数是一个相当于用const定义的常量，内部无法进行重新赋值，如果在严格模式下，会报错"Uncaught TypeError: Assignment to constant variable."
> 例如下面的：
>
> > ```
> > var b = 10;
> > (function b() {
> > 'use strict'
> > b = 20;
> > console.log(b)
> > })() // "Uncaught TypeError: Assignment to constant variable."
> > 
> > ```

这个回答主要表达的是：函数表达式的函数名只在该函数内部有效，且绑定是常量类似 const，不能修改





### [第 34 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/51)（2019/10/21） 

**题目：** 简单改造下面的代码，使之分别打印 10 和 20。

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

```



打印 20：

方法一：

```js
var b = 10;
(function b(b){
    b = 20;
    console.log(b);
})(b);

```

方法二：

```js
var b = 10;
(function b(){
    var b = 20;
    console.log(b);
})();


```



打印 10：

方法一：（挂载在 全局window 上）

```js
var b = 10;
(function b(b){
    window.b = 20;
    console.log(b);
})(b);

```

方法二： （挂载在 b函数（函数也是特殊的对象）上）

```js
var b = 10;
(function b(b){
    b.b = 20;
    console.log(b);
})(b);


```



### [第 35题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/51)  （2019/10/22）

**题目**：浏览器缓存读取规则 ?

> 可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？

**解析：**   [深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)   [一文读懂前端缓存](https://juejin.im/post/5c22ee806fb9a049fb43b2c5?utm_source=gold_browser_extension)

对于第一个问题前面的文章都说得很详细了我这里就不再多余述
第二个问题可以参考我写的[博文](https://jayzangwill.github.io/blog/2019/02/07/cache/) **命中强制缓存时，该从哪拿缓存**
小节。总的来说：

1. 如果开启了Service Worker首先会从Service Worker中拿
2. 如果新开一个以前打开过的页面缓存会从Disk Cache中拿（称为是命中强缓存）
3. 刷新当前页面时浏览器会根据当前运行环境内存来决定是从Memory Cache还是从Disk Cache中拿（可以看到下图最后几个文件有时候是从Memory Cache中拿有时候是从Disk Cache中拿）

###### ![](https://camo.githubusercontent.com/6254fa34eb5e693a51cb2b5b2eb257f38f0b1634/68747470733a2f2f6a61797a616e6777696c6c2e6769746875622e696f2f626c6f672f696d672f63616368652f7765697a68695f312e676966)



### [第 36 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54)   （2019/10/22）

**题目：** 使用迭代的方式实现 flatten 函数。

**解析：** 

```js
//使用迭代的方式实现flatten函数
/**
 * 使用递归的方式处理
 * wrap内保存结果ret
 * 返回一个递归函数
 *
 * @returns
 */

var arr=[1,2,3,[4,5],[6,[7,[8]]]]
console.log(wrap()(arr))

function wrap() {
    var ret=[]
    return function flatten(arr) {
        for (let item of arr){
            if (item.constructor === Array){
                   ret.concat(flatten(item))
            }else{
                 ret.push(item)
            }
        }
        return ret
    }
}

```



### [第 37 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65)    （2019/10/22）

 **题目：**  为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

**解析：**  待续...



### [第 38 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/57)  （2019/10/23）

**题目：** 下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}

```

**公司：** 京东

**考点**： 隐式类型转换

**解析：**  [从 (a==1&&a==2&&a==3) 成立中看javascript的隐式类型转换](https://yq.aliyun.com/articles/399499)

 **关于 === 于 ==** 

> 但是我比较喜欢的一本书 ` You don't know JS`,中作者也写道过一个我比较赞同的观点
>
> 很多开发者认为 === 的行为更加容易预测，从而主张使用 === 而远离 ==。我认为这种观点是非常短视的，如果你花点时间去搞清楚它的工作原理，== 将是你开发的强大工具

1. 运算子是对象时候的valueOf toString 方法

```js
const a = {
    i: 1,
    toString: function () {
        return a.i++;
    }
}

if(a == 1 && a == 2 && a == 3) {
    console.log('1'); //1
    console.log(a.i)  //4
}

```

如果原始类型的值和对象比较，对象会转为原始类型的值，再进行比较。`(我想到的也是这种方法)`，对象转换成原始类型的值，算法是先调用`valueOf`方法；如果返回的还是对象，再接着调用`toString`方法。我们每次比较时候都会执行方法返回 `a` 的 `i` 属性同时也改变 `i` 的值,所以上面 `if` 执行完以后 `a` 的 `i` 属性已经变为了 4，**这里也表现出了 == 比较是有可能会对变量带来副作用的**



**利用数组的特性** 

```js
var a=[1,2,3]
a.join= a.shift

if(a == 1 && a == 2 && a == 3) {
    console.log('1');
}

```

这个答案还是比较巧妙的，我们知道 `array` 也属于对象，应该和对象的规则一样。关于 `array` 的原型链上的 `toString` 方法

> 对于数组对象，toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。

可以看到数组 `toString` 会调用本身的 `join` 方法，这里把自己的`join`方法该写为`shift`,每次返回第一个元素，而且原数组删除第一个值，正好可以使判断成立。**这里 == 比较也带来的副作用**

**利用with 关键字**

```js
var i = 0;

with({
    get a() {
        return ++i;
    }
}) {
    if (a == 1 && a == 2 && a == 3)
        console.log("1");
}

```

`with` 也是被严重建议不使用的对象，这里也是利用它的特性在代码块里面利用对象的 `get` 方法动态返回 `i`.

**和with类似修改window的get方法** 

```js
var val = 0;
Object.defineProperty(window, 'a', {
    get: function() {
        return ++val;
    }
});
if (a == 1 && a == 2 && a == 3) {
    console.log('yay');
}

```

我们知道我们用的全局变量也相当于 `window` 对象上的一个属性，这里用`defineProperty` 定义了 `a`的 `get` 也使得其动态返回值。和`with` 有一些类似。



**es6的Symbol特性** 

```js
let a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)};

console.log(a == 1 && a == 2 && a == 3);

```

`ES6` 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。我们之前在定义类的内部私有属性时候习惯用 `__xxx` ,这种命名方式避免别人定义相同的属性名覆盖原来的属性，有了 `Symbol ` 之后我们完全可以用 `Symbol`值来代替这种方法，而且完全不用担心被覆盖。

除了定义自己使用的 `Symbol` 值以外，`ES6` 还提供了 11 个内置的 `Symbol` 值，指向语言内部使用的方法。`Symbol.toPrimitive`就是其中一个，它指向一个方法，表示该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。这里就是改变这个属性，把它的值改为一个 `闭包` 返回的函数。



### [第 39 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59)  （2019/10/24）

**题目：** 介绍下 BFC 及其应用

**解析：** 

 BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

1. html 根元素
2. float 浮动
3. 绝对定位
4. overflow 不为 visiable
5. display 为表格布局或者弹性布局

BFC 主要的作用是：

1. 清除浮动
2. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题





### [第 40 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60)  （2019/10/25）

**题目：** 在 Vue 中，子组件为何不可以修改父组件传递的 Prop?

> 如果修改了，Vue 是如何监控到属性的修改并给出警告的。

**解析：** 

1. 子组件为何不可以修改父组件传递的 Prop
   单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
2. 如果修改了，Vue 是如何监控到属性的修改并给出警告的。

```js
if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }

```

在initProps的时候，在defineReactive时通过判断是否在开发环境，如果是开发环境，会在触发set的时候判断是否此key是否处于updatingChildren中被修改，如果不是，说明此修改来自子组件，触发warning提示。

> 需要特别注意的是，当你从子组件修改的prop属于基础类型时会触发提示。 这种情况下，你是无法修改父组件的数据源的， 因为基础类型赋值时是值拷贝。你直接将另一个非基础类型（Object, array）赋值到此key时也会触发提示(但实际上不会影响父组件的数据源)， 当你修改object的属性时不会触发提示，并且会修改父组件数据源的数据。



### [第 41题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/61)  （2019/10/25）

**题目：** 下面代码输出什么

```js
var a = 10;
(function () {
    console.log(a)  // undefined
    a = 5  
    console.log(window.a) // 10
    var a = 20;  
    console.log(a) //20
})()

```

**解析：** 分别为undefined　10　20，原因是作用域问题，在内部声名var a = 20;相当于先声明var a;然后再执行赋值操作，这是在ＩＩＦＥ内形成的独立作用域，如果把var a=20注释掉，那么a只有在外部有声明，显示的就是外部的Ａ变量的值了。结果Ａ会是10　5　5



### [第 42 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63) （2019/10/25）

**题目：** 实现一个 sleep 函数

> 比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现

```js
//Promise1
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}

function output(){
  console.log(1);
}
sleep(output,1000);

```

参考：

- [Promise | 自个写一个Promise | Generator](https://blog.csdn.net/ImagineCode/article/details/81089107)



### [第 43 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/66)  （2019/10/26）

**题目：** 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

**解析：** 

原题目：

> 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

我的答案：

```js
[102, 15, 22, 29, 3, 8]

```

解析：

根据MDN上对`Array.sort()`的解释，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。所以`'102'` 会排在 `'15'` 前面。以下是MDN中的解释原文：

> The sort() method sorts the elements of an array in place and returns the array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.



### [第 44 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/70)（2019/10/26）

**题目：**  介绍 HTTPS 握手过程

**解析：** ~~



### [第 45 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/74)  （2019/10/26）

**题目：** HTTPS 握手过程中，客户端如何验证证书的合法性

**解析：** ~~



### [第 46 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/76) （2019/10/26）

**题目：** 输出以下代码执行的结果并解释为什么

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
/*
结果：
    Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
    2: 1
    3: 2
    length: 4
    push: ƒ push()
    splice: ƒ splice()
    __proto__: Object
*/

```

我的理解是这样的
1: call push这个方法如果对象有length属性，length属性会加1 并且返回，这个是在某本书的上看到的，一直记得。
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push#Description)

> push方法将值追加到数组中。
>
> push 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
>
> 唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

1. 调用push方法的时候会在调用对象的key=length的地方做一个赋值，不管前面key有没有值，也就是说在调用push的时候 对象实际被理解为了[0:undefined,1:undefined,2:3,3:4],
   这样也就有了结果里面的
   key===2 value =1
   key===3 value =2
   3.额外的
   这个对象如果有push和splice会输出会转换为数组，下图为去掉splice

![](https://user-images.githubusercontent.com/11674767/55370329-b8459280-552c-11e9-96ec-0924b03f70a4.png)

包含splice方法

![](https://user-images.githubusercontent.com/11674767/55370427-065a9600-552d-11e9-9525-236038e73009.png)





### [第 47 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/81) （2019/10/27）

**题目：** 双向绑定和 vuex 是否冲突

**解析：** 

在严格模式下直接使用确实会有问题。
解决方案：

> 官网说的比较详细
> <https://vuex.vuejs.org/zh/guide/forms.html>

```js
<input v-model="message" />

```

```js
computed: {
    message: {
        set (value) {
            this.$store.dispatch('updateMessage', value);
        },
        get () {
            return this.$store.state.obj.message
        }
    }
}
mutations: {
    UPDATE_MESSAGE (state, v) {
        state.obj.message = v;
    }
}
actions: {
    update_message ({ commit }, v) {
        commit('UPDATE_MESSAGE', v);
    }
}

```



### [第 48 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/84)  （2019/10/27）

**题目：** call 和 apply 的区别是什么，哪个性能更好一些

**解析：** 

> `**call()**` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
>
> **apply()** 方法调用一个具有给定`this`值的函数，以及作为一个数组（或[类似数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）提供的参数。

1. Function.prototype.apply和Function.prototype.call 的作用是一样的，区别在于传入参数的不同；
2. 第一个参数都是，指定函数体内this的指向；
3. 第二个参数开始不同，apply是传入**带下标的集合**，数组或者类数组，apply把它传给函数作为参数，call从第二个开始**传入的参数是不固定的，都会传给函数作为参数**。
4. call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式，参考[call和apply的性能对比](https://github.com/noneven/__/issues/6)



### [第 49 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87)  （2019/10/27）

**题目：** 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

**解析：**  [数据埋点是什么？设置埋点的意义是什么？](https://www.zhihu.com/question/36411025)

> **1. 埋点是什么？** 
>
> 所谓“埋点”，是 **数据采集领域**（尤其是用户行为数据采集领域）的术语，指的是针对特定用户行为或事件进行捕获、处理和发送的相关技术及其实施过程。比如用户某个icon点击次数、观看某个视频的时长等等。
>
> 埋点的技术实质，是先监听软件应用运行过程中的事件，当需要关注的事件发生时进行判断和捕获。
>
> 特别注意需要明确事件发生时间点、判别条件，这里如果遇到不清楚的，需要和开发沟通清楚，避免采集数据与理想存在差异。例如：期望采集某个app的某个广告的有效曝光数，有效曝光的判别条件是停留时长超过1秒且有效加载出广告内容。
>
> **解答：** 

作用：工作中，用于前端监控，比如曝光等等，谷歌和百度的都是用的1x1 像素的透明 gif 图片；
why?

1. 没有跨域问题，一般这种上报数据，代码要写通用的；（排除ajax）
2. 不会阻塞页面加载，影响用户的体验，只要new Image对象就好了；（排除JS/CSS文件资源方式上报）
3. 在所有图片中，体积最小；（比较PNG/JPG）



### [第 50 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/88)（2019/10/28）

**题目：** 实现 (5).add(3).minus(2) 功能。

> 例： 5 + 3 - 2，结果为 6

**公司**：百度 

**解析：** 

```js
Number.prototype.add = function (num) {
    return this.valueOf() + num
}

Number.prototype.minus = function (num) {
    return this.valueOf() - num
}

console.log((5).add(3).minus(2))

```



### [第 51 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/90) （2019/10/28）

**题目：** Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

> 为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？

**解析：** 不懂~~~



### [第 52 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/92) （2019/10/28）

**题目：** 怎么让一个 div 水平垂直居中

**解析：** 

```html
<div class="parent">
  <div class="child"></div>
</div>

```

1、利用 flex

```css
div.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

```

2、绝对定位

```css
div.parent {
    position: relative; 
}
div.child {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
}
/* 或者 */
div.child {
    width: 50px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -5px;
}
/* 或 */
div.child {
    width: 50px;
    height: 10px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

```

3、网格布局

```css
div.parent {
    display: grid;
}
div.child {
    justify-self: center;
    align-self: center;
}

```

4、

```css
div.parent {
    font-size: 0;
    text-align: center;
    &::before {
        content: "";
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
    }
}
div.child{
  display: inline-block;
  vertical-align: middle;
}

```

5、补充

```css
div.parent{
  display:flex;
}
div.child{
  margin:auto;
}

```

```css
div.parent {
display: table;
}
div.child {
display: table-cell
vertical-align: middle;
text-align: center;
}

```



### [第 53 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/93) （2019/10/29）

**题目：** 输出以下代码的执行结果并解释为什么

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)  //undefined	
console.log(b.x) //{ n: 2 }
console.log(a) //{ n: 2 }
console.log(b) //{ n: 1, x: { n: 2 } }

```

**解析：** 

```tet
首先，a和b同时引用了{n:2}对象，接着执行到a.x = a = {n：2}语句，尽管赋值是从右到左的没错，但是.的优先级比=要高，所以这里首先执行a.x，相当于为a（或者b）所指向的{n:1}对象新增了一个属性x，即此时对象将变为{n:1;x:undefined}。之后按正常情况，从右到左进行赋值，此时执行a ={n:2}的时候，a的引用改变，指向了新对象{n：2},而b依然指向的是旧对象。之后执行a.x = {n：2}的时候，并不会重新解析一遍a，而是沿用最初解析a.x时候的a，也即旧对象，故此时旧对象的x的值为{n：2}，旧对象为 {n:1;x:{n：2}}，它被b引用着。
后面输出a.x的时候，又要解析a了，此时的a是指向新对象的a，而这个新对象是没有x属性的，故访问时输出undefined；而访问b.x的时候，将输出旧对象的x的值，即{n:2}。

```



### [第 54 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/94) （2019/10/29）

**题目：** 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？

**解析：** 

```js
// 冒泡排序
function BubbleSort (nums, n) {
    if (nums == null || nums.length < 2) return nums
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (nums[j + 1] < nums[j]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
            }
        }
    }
    return nums
}

```

性质：

1、时间复杂度：O(n^2) 

2、空间复杂度：O(1)

3、稳定排序 

4、原地排序

```js
// 改进冒泡排序
function bubbleSort1(arr) {
    let i = arr.length - 1;

    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
    console.log(arr);
}

```



### [第 55 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/96) （2019/10/30）

**题目：** 某公司 1 到 12 月份的销售额存在一个对象里面

> 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

> `**Array.from()**` 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

```js
var obj = {1: 222, 2: 123, 5: 888}
function f(obj) {
    obj.length = 13
    return Array.from(obj).slice(1).map(item = > {
        return  item === undefined ? null : item
    })
}
console.log(f(obj)) 
//[ 222, 123, null, null, 888, null, null, null, null, null, null, null ]

```



### [第 56 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/98)  （2019/10/30）

**题目：** 要求设计 LazyMan 类，实现以下功能。

**考点**：数据结构  

```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

```

**解析：** ~~~





### [第 57 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/100)（2019/10/31）

**题目：** 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

**解析：** 

> 总结一下：

**结构:** 
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

**继承：**
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

**性能：**
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少

**联系** ：它们都能让元素不可见



### [第 58 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/101)（2019/10/31）

**题目：** 第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

**解析：** 

> 引入箭头函数有两个方面的作用：更简短的函数并且不绑定this

箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

1. 箭头函数**没有 this**，它会从自己的**作用域链**的上一层继承 this（因此无法使用 apply / call / bind 进行绑定 this 值）；
2. 不可以使用 **arguments 对象**，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
3. 不可以使用 [yield 命令](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)，因此箭头函数不能用作 Generator 函数。
4. 无法使用 **new 实例化对象**，因为普通构造函数通过 new 实例化对象时 this 指向实例对象，而箭头函数没有 this 值，同时 箭头函数也没有 prototype。

new 过程大致是这样的：

```js
function newFunc(father, ...rest) {
  var result = {};
  result.__proto__ = father.prototype;
  var result2 = father.apply(result, rest);
  if (
    (typeof result2 === 'object' || typeof result2 === 'function') &&
    result2 !== null
  ) {
    return result2;
  }
  return result;
}

```



### [第 59 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/102) （2019/10/31）

**题目：** 给定两个数组，写一个方法来计算它们的交集。

> 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

```js
var nums1 = [1, 2, 2, 1], nums2 = [2, 2, 3, 4];
// 1.
// 有个问题， [NaN].indexOf(NaN) === -1
var newArr1 = nums1.filter(function(item) {
     return nums2.indexOf(item) > -1;
});

// 2.
var newArr2 = nums1.filter((item) => {
     return nums2.includes(item);
});

```



### [第 60 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/105)  （2019/10/31）

**题目：** 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

> <img src="1.jpg" style="width:480px!important;”>

**解决方案：** 

1. `max-width: 300px`
2. `transform: scale(0.625,0.625) ` 
3. `zoom: 0.625`;  [MDN：zoom](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@viewport/zoom) 
4. 解法：

```css
box-sizing: border-box;
padding: 0 90px;

```

5. js：`document.getElementsByTagName('img')[0].style.width='300px'`





### [第 61 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/106) （2019/11/01）

**题目：** 介绍下如何实现 token 加密 ?

**解析：** 

> 这个题目是问：生成token的方法，比如 **JWT**，还是说利用加密算法，比如对称加密或者非对称加密 加密生成后的token ?



这边也是这么做的，后端根据token来查权限和是否登录以及失效等

> token 加密方式：
>
> - 服务器通过私钥对一部分信息进行加密生成签名，并将签名和数据拼接在一起作为 token 的一部分。例如 JWT。
> - 使用客户端的 UA 或其他数据作为干扰码对 token 进行加密。

相关参考文章：

- [Token - 服务端身份验证的流行方案](https://www.jianshu.com/p/e0ac7c3067eb)
- [基于 Token 的身份验证：JSON Web Token](https://ninghao.net/blog/2834)



> jwt举例
>
> 1. 需要一个secret（随机数）
> 2. 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
> 3. 前端每次request在header中带上token
> 4. 后端用同样的算法解密

这边也是这么做的，后端根据token来查权限和是否登录以及失效等



### [第 62 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/107) （2019/11/01）

**题目：** redux 为什么要把 reducer 设计成纯函数

**解析：** 学习  react ~~



### [第 63 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/108)（2019/11/02）

**题目：** 如何设计实现无缝轮播如何设计实现无缝轮播

**解析：** 

```txt
无限轮播基本插件都可以做到,不过要使用原生代码实现无缝滚动的话我可以提点思路,
因为轮播图基本都在ul盒子里面的li元素,
首先获取第一个li元素和最后一个li元素,
克隆第一个li元素,和最后一个li元素,
分别插入到lastli的后面和firstli的前面,
然后监听滚动事件,如果滑动距离超过x或-x,让其实现跳转下一张图或者跳转上一张,(此处最好设置滑动距离),
然后在滑动最后一张实现最后一张和克隆第一张的无缝转换,当到克隆的第一张的时候停下的时候,,让其切入真的第一张,则实现无线滑动,向前滑动同理

```



### [第 64 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/109)（2019/11/02）

**题目：**模拟实现一个 Promise.finally        

**知识点**  ：异步

**解析：** 



### [第 65 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/111) （2019/11/02）

**题目：** `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？

**解析：** 

应该是 `a.b.c.d` 比 `a['b']['c']['d']` 性能高点，后者还要考虑 `[ ]` 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。
下图是两者的 [AST](https://segmentfault.com/a/1190000016231512)  (抽象语法树) 对比：

![](https://user-images.githubusercontent.com/9009389/56872978-501d9a00-6a61-11e9-9e69-85ff00c031fc.png)





### [第 66 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/112)  （2019/11/02）

**题目：** ES6 代码转成 ES5 代码的实现思路是什么

**解析：** 

回到正题上来，说到 ES6 代码转成 ES5 代码，我们肯定会想到 Babel。所以，我们可以参考 Babel 的实现方式。

那么 Babel 是如何把 ES6 转成 ES5 呢，其大致分为三步：

- 将代码字符串解析成抽象语法树，即所谓的 [AST](https://segmentfault.com/a/1190000016231512)
- 对 [AST](https://segmentfault.com/a/1190000016231512) 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
- 根据处理后的 [AST](https://segmentfault.com/a/1190000016231512) 再生成代码字符串

基于此，其实我们自己就可以实现一个简单的“编译器”，用于把 ES6 代码转成 ES5。

比如，可以使用 `@babel/parser` 的 `parse` 方法，将代码字符串解析成 AST；使用 `@babel/core` 的 `transformFromAstSync` 方法，对 AST 进行处理，将其转成 ES5 并生成相应的代码字符串；过程中，可能还需要使用 `@babel/traverse` 来获取依赖文件等。对此感兴趣的可以看看[这个](https://github.com/FishPlusOrange/easy-webpack)。



### [第 67 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/113) （2019/11/03）

**题目：** 数组编程题

> 随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。

```js
/*
	我理解是：去重排序数组后，分类连续数列。
*/
let initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 20) })

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

function GetArr(arr) {
   var  newarr = Array.from(new Set(arr)).sort((a, b) => a - b)
    var pre = 0, cur = 1
    var count = 1
    var xarr = [newarr[0]]
    var Finllyarr = []
    while (cur <= newarr.length) {
        if (newarr[cur] - newarr[pre] === count) {
            xarr.push(newarr[cur])
        } else {
            pre = cur
            count = 0
            Finllyarr.push(xarr)
            xarr = [newarr[pre]]
        }
        cur++
        count++
    }
    return Finllyarr
}
console.log(GetArr(initArr))

```



### [第 68 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/115) （2019/11/04）

**题目：** 如何解决移动端 Retina 屏 1px 像素问题

**解析：**  [7 种方法解决移动端 Retina 屏幕 1px 边框问题](https://juejin.im/entry/584e427361ff4b006cd22c7c) 

1. 0.5px边框
2. 使用border-image实现
3. 使用background-image实现
4. 多背景渐变实现
5. 使用box-shadow模拟边框
6. viewport + rem 实现
7. 伪类 + transform 实现





### [第 69 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/116) （2019/11/07）

**题目：** 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。

解析

1. 利用 ASCII 码 （A: 65 ，Z：90，a：97，z：122）

```js
function Getstr(str) {
    return str.split('').map(item => {
        if(item.charCodeAt() <= 90 && item.charCodeAt() >= 65) return item.toLowerCase()
    else return item.toUpperCase()}).join('')
}

```

2. 利用 小技巧

```js
function Getstr(str) {
    return str.split('').map(item => {
        return item === item.toUpperCase()? item.toLowerCase():item.toUpperCase()
    }).join('')
}

```





### [第 70 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/118) （2019/11/08）

**题目：**  介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

**解析：** 

```txt
1.当修改了一个或多个文件；
2.文件系统接收更改并通知webpack；
3.webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4.HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5.HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。

```





### [第 71 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/119) （2019/11/14）

**题目：** 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

**解析：** 

```js
// 因为 T 的 length 是一定的，所以在循环S的的时候 ，循环当前项 i 后面至少还有 T.length 个元素
const find = (S, T) => {
  if (S.length < T.length) return -1;
  for (let i = 0; i < S.length - T.length ; i++) {
      if (S.substr(i, T.length) === T) return i ;
  };
  return -1;
};

```

```js
// 方法一：
const find = (S, T) => S.search(T)

// 方法二：
const find = (S, T) => {
  const matched = S.match(T) 
  return matched ? matched.index : -1 
}

```



### [第 72 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/121)  （2019/11/15）

**题目：**为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。

**解析：** 

- for 循环没有任何额外的函数调用栈和上下文；
- forEach函数签名实际上是

```js
array.forEach(function(currentValue, index, arr), thisValue)

```

它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能；



### [第 73 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/122) （2019/11/15）

**题目：** 介绍下 BFC、IFC、GFC 和 FFC 

**解析：** 

**BFC（Block formatting contexts）：块级格式上下文**
页面上的一个隔离的渲染区域，那么他是如何产生的呢？可以触发BFC的元素有float、position、overflow、display：table-cell/ inline-block/table-caption ；BFC有什么作用呢？比如说实现多栏布局’

**IFC（Inline formatting contexts）：内联格式上下文**
IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同
IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。
那么IFC一般有什么用呢？
水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

**GFC（GrideLayout formatting contexts）：网格布局格式化上下文**
当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

**FFC（Flex formatting contexts）:自适应格式上下文**
display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

[在这](http://www.cnblogs.com/dingyufenglian/p/4845477.html)



### [第 74 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/123)    （2019/11/16）

**题目：** 使用 JavaScript Proxy 实现简单的数据绑定

**解析：** ~~



### [第 75 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/124)  （2019/11/17）

**题目：** 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少

**解析：** 

**考点：**  <u>JavaScript 数组底层原理</u> 

数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

得出结论：**消耗时间几乎一致，差异可以忽略不计**

> Chrome 浏览器JS引擎 V8中，数组有两种存储模式，一种是类似C语言中的线性结构存储（索引值连续，且都是正整数的情况下），一种是采用Hash结构存储（索引值为负数，数组稀疏，间隔比较大）；

JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。

> 推荐一下这篇文章：[深究 JavaScript 数组](https://juejin.im/entry/59ae664d518825244d207196)



### [第 76 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/125)  （2019/11/17）

> 输出以下代码运行结果
>
> **考点** ：这题考察的是对象的键名的转换。
>
> - 对象的键名只能是字符串和 Symbol 类型。
> - 其他类型的键名会被转换成字符串类型。
> - 对象转字符串默认会调用 toString 方法。

```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);  //c

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]); //b

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]); //c

```

解析：

```js
// example 1
var a={}, b='123', c=123;
a[b]='b';

// c 的键名会被转换成字符串'123'，这里会把 b 覆盖掉。
a[c]='c';  

// 输出 c
console.log(a[b]);

---------------------
    
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  

// b 是 Symbol 类型，不需要转换。
a[b]='b';

// c 是 Symbol 类型，不需要转换。任何一个 Symbol 类型的值都是不相等的，所以不会覆盖掉 b。
a[c]='c';

// 输出 b
console.log(a[b]);

---------------------
    
// example 3
var a={}, b={key:'123'}, c={key:'456'};  

// b 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。
a[b]='b';

// c 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
a[c]='c';  

// 输出 c
console.log(a[b]);    

```





### [第 77 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/126)  （2019/11/18）

**题目：** 

> 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1：

```js
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

```

示例 2：

```js
输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释: 
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100

```



**解析：**

```js
function rotateArr(arr, k) {
    for (var i = 0; i < k; i++) {
        arr.unshift(arr.pop())
    }
   return arr
}

```



### [第 78 题 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/128) （2019/11/18）

**题目** ：Vue 的父组件和子组件生命周期钩子执行顺序是什么

**解析：** 

> 总结：<u>从外到内，再从内到外</u>

1. 加载渲染过程
   `父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`
2. 子组件更新过程
   `父beforeUpdate->子beforeUpdate->子updated->父updated`
3. 父组件更新过程
   `父beforeUpdate->父updated`
4. 销毁过程
   `父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`



![](https://segmentfault.com/img/bVbePUv?w=302&h=298)





### [第 79 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/129)  （2019/11/18）

**题目：** input 搜索如何防抖，如何处理中文输入

**解析：**  [input事件中文触发多次问题研究](https://segmentfault.com/a/1190000013094932)

简易防抖：

```js
function debounce(fn, delay) {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            fn.apply(this, arguments)
        }, delay)
    }
}

```





### [第 80 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/130) （2019/11/19）

**题目：** 介绍下 Promise.all 使用、原理实现及错误处理







### [第 81 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/131) （2019/11/19）

**题目：**  打印出 1 - 10000 之间的所有对称数

> 例如：121、1331 等

```js
function f(num) {
    return num.toString() === num.toString().split('').reverse().join('')
}

for (var i = 1; i <= 10000; i++) {
    if (f(i)) {
        console.log(i)
    }
}

```







### [第 82 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/132)   （2019/11/19）

> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
>
> 示例:
>
> ```js
> 输入: [0,1,0,3,12]
> 输出: [1,3,12,0,0]
> 
> ```
>
> 说明:
>
> 1. 必须在原数组上操作，不能拷贝额外的数组。
> 2. 尽量减少操作次数。

**解析：** 

```js
function Movezero(arr) {
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            arr[index++] = arr[i]
        }
    }
    while (index < arr.length) {
        arr[index++] = 0
    }
    return arr
}


```







### [第 83 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/133)  （2019/11/20）

**题目：** var、let 和 const 区别的实现原理是什么

**解析：** 

**区别：**

1. var声明的变量会挂载在window上，而let和const声明的变量不会

2. var声明变量存在变量提升，let和const不存在变量提升

3. let和const声明形成块作用域，而var不存在此作用域

4. 同一作用域下let和const不能声明同名变量，而var可以

5. let、const存在暂存死区

6. const

   1. 一旦声明必须赋值,不能使用null占位。
   2. 声明后不能再修改
   3. 如果声明的是复合类型数据，可以修改其属性*

   

**var、let、const实现原理** 

记得JS权威指南中有一句很精辟的描述:　”JavaScript中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里.”

以下属于推测，在网上没查到确凿的原理机制（若有误望指正）：

原理大概是：在js解析的时候，优先解析const，因为它不能修改的是栈内存在的值和地址。然后解析let 因为没有块作用域可能底层有处理，最后解析var





### [第 84 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134) （2019/11/21）

**题目：** 请实现一个 add 函数，满足以下功能。

**知识点** ：函数柯里化    [题解](https://github.com/chokcoco/cnblogsArticle/issues/15)    <u>运用了函数会自行调用 `valueOf` 方法这个技巧</u> 

> ```js
> add(1); 			// 1
> add(1)(2);  	// 3
> add(1)(2)(3)；// 6
> add(1)(2, 3); // 6
> add(1, 2)(3); // 6
> add(1, 2, 3); // 6
> 
> ```

之前参阅 2 篇文章，可以参考一二。
1、[【进阶 6-1 期】JavaScript 高阶函数浅析](https://github.com/yygmind/blog/issues/36#%E6%80%9D%E8%80%83%E9%A2%98)
2、[【进阶 6-2 期】深入高阶函数应用之柯里化](https://github.com/yygmind/blog/issues/37)

其中第一篇文章给出了前三个功能的实现，并没有覆盖到后面三种。
第二篇文章实现了一个通用的柯里化函数，覆盖实现了所有功能。

**解析：** 

**去重**（ <u>数字组数</u>  ） ：使用高阶函数：

```js
const arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr2 = arr1.filter( (element, index, self) => {
    return self.indexOf( element ) === index;
});

console.log( arr2 );
// [1, 2, 3, 5, 4]
console.log( arr1 );
// [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]

```



函数作为返回值输出

```js
let isType = type => obj => {
    return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
}
isType('String')('123');	// true
isType('Array')([1, 2, 3]);	// true
isType('Number')(123);			// true

```



答案：

```js
function add () {
    console.log('进入add');
    var args = Array.prototype.slice.call(arguments);

    var fn = function () {
        var arg_fn = Array.prototype.slice.call(arguments);
        console.log('调用fn');
        return add.apply(null, args.concat(arg_fn));
    }

    fn.valueOf = function () {
        console.log('调用valueOf');
        return args.reduce(function(a, b) {
            return a + b;
        })
    }

    return fn;
}
/*
    add(1);
    // 输出如下：
    // 进入add
    // 调用valueOf
    // 1

    add(1)(2);
    // 输出如下：
    // 进入add
    // 调用fn
    // 进入add
    // 调用valueOf
    // 3
    
    add(1)(2)(3);
    // 输出如下：
    // 进入add
    // 调用fn
    // 进入add
    // 调用fn
    // 进入add
    // 调用valueOf
    // 6
*/

```

这里有个规律，如果只改写 `valueOf()` 或是 `toString()` 其中一个，会优先调用被改写了的方法，而如果两个同时改写，则会像 String 转换规则一样，优先查询 `valueOf()` 方法，在 `valueOf() `方法返回的是非原始类型的情况下再查询 `toString()` 方法。





### [第 85 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/135)  （2019/11/23）

**题目：** react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

> 如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。

**解析：** 

从最终渲染的 DOM 来看，这两者都是链接，都是 `<a>` 标签，区别是：
`<Link>` 是 react-router 里实现路由跳转的链接，一般配合 `<Route>` 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，`<Link>` 的“跳转”行为只会触发相匹配的 `<Route>` 对应的页面内容更新，而不会刷新整个页面。
而 `<a>` 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）。





### [第 86 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/136)  （2019/11/23）

**题目：** 周一算法题之「两数之和」

> 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
>
> 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
>
> 示例：
>
> ```js
> 给定 nums = [2, 7, 11, 15], target = 9
> 
> 因为 nums[0] + nums[1] = 2 + 7 = 9
> 所以返回 [0, 1]
> 
> ```

**公司** ：京东、快手

```js
function Getarr(num,target) {
    var pre=0, cur=num.length-1
    if(num.length<2){
        return '至少提供2个数字'
    }
    while(pre<cur){
        result= num[pre] + num[cur]
        if (result>target){
            cur--
        }else if(result<target){
            pre++
        }else{
            return [pre,cur]
        }
    }
}

```





### [第 87 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/138) （2019/11/24）

**题目：**在输入框中如何判断输入的是一个正确的网址。

**解析：**    <u>location 可以获取本页面的URL 信息</u> 

> 不上正则，一个简单的玩法

```JS
function isUrl(url) {
	const a = document.createElement('a')
	a.href = url
	return [
		/^(http|https):$/.test(a.protocol), // "https:" 协议
		a.host,  						//  "baidu.com" => 端口（port）
		a.pathname !== url,				// "/"
		a.pathname !== `/${url}`,
	].find(x => !x) === undefined
}

```

利用 `URL()` 构造函数返回一个新创建的 [`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 对象 

```js
function isUrl(url) {
       try {
           new URL(url);
           return true;
       }catch(err){
     return false;
}}

```

```js
const isUrl = urlStr => {
    try {
        const { href, origin, host, hostname, pathname } = new URL(urlStr)
        return href && origin && host && hostname && pathname && true
    } catch (e) {
        return false
    }
}

```



**正则：** 

```js
 /^(https?:\/\/)?([a-z0-9]\.|[a-z0-9][-a-z0-9]*[a-z0-9]\.)*([a-z]+)(:\d+)?(\/.*)?$/;

```



 

### [第 88 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/139)  （2019/12/04）

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```js
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];

```



**解析：** ~~









### [第 89 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/140)  （2019/12/04）

**题目** ：设计并实现 Promise.race()

**解析：**  代写~



### [第 90 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/141)  （2019/12/05）

**题目：** 实现模糊搜索结果的关键词高亮显示

![mark](http://static.zxinc520.com/blog/20191205/sF0nw6wEI0qf.png?imageslim)

> 考虑节流、缓存。其实还可以上列表diff+定时清理缓存

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>auto complete</title>
    <style>
        bdi {
            color: rgb(0, 136, 255);
        }

        li {
            list-style: none;
        }
    </style>
</head>
<body>
<input class="inp" type="text">
<section>
    <ul class="container"></ul>
</section>
</body>
<script>

    function debounce(fn, timeout = 300) {
        let t;
        return (...args) => {
            if (t) {
                clearTimeout(t);
            }
            t = setTimeout(() => {
                fn.apply(fn, args);
        }, timeout);
        }
    }

    function memorize(fn) {
        const cache = new Map();
        return (name) => {
            if (!name) {
                container.innerHTML = '';
                return;
            }
            if (cache.get(name)) {
                container.innerHTML = cache.get(name);
                return;
            }
            const res = fn.call(fn, name).join('');
            cache.set(name, res);
            container.innerHTML = res;
        }
    }

    function handleInput(value) {
        const reg = new RegExp(`\(${value}\)`);
        const search = data.reduce((res, cur) => {
            if (reg.test(cur)) {
            const match = RegExp.$1;
            res.push(`<li>${cur.replace(match, '<bdi>$&</bdi>')}</li>`);
        }
        return res;
    }, []);
        return search;
    }

    const data = ["上海野生动物园", "上饶野生动物园", "北京巷子", "上海中心", "上海黄埔江", "迪士尼上海", "陆家嘴上海中心"]

    const container = document.querySelector('.container');

    const memorizeInput = memorize(handleInput);

    document.querySelector('.inp').addEventListener('input', debounce(e => {

        console.log(e.target.value)
        memorizeInput(e.target.value)
    }))
</script>
</html>

```



### [第 91 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/142) （2019/12/05）

**题目：** 介绍下 HTTPS 中间人攻击

**解析：** 

https协议由 http + ssl 协议构成，具体的链接过程可参考[SSL或TLS握手的概述](https://github.com/lvwxx/blog/issues/3)

中间人攻击过程如下：

1. 服务器向客户端发送公钥。
2. 攻击者截获公钥，保留在自己手上。
3. 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
4. 客户端收到伪造的公钥后，生成加密hash值发给服务器。
5. 攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
6. 同时生成假的加密hash值，发给服务器。
7. 服务器用私钥解密获得假秘钥。
8. 服务器用加秘钥加密传输信息

防范方法：

1. 服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

 



### [第 92 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/143) （2019/12/15）

**题目：**已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```js
const value = '112'
const fn = (value) => {
...
}
fn(value) // 输出 [1， 11， 112]

```

**解析：**

```js
const value = '112'
const fn = (value) => {
    let arr=[]
    for (var i = 0; i < value.length; i++) {
       arr.push(value.slice(0,i+1))
    }
   return arr.map(Number)
}

```



### [第 93 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/144)  （2019/12/15）

**题目：** 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。

示例 1：

```js
nums1 = [1, 3]
nums2 = [2]

```

中位数是 2.0

示例 2：

```js
nums1 = [1, 2]
nums2 = [3, 4]

```

中位数是(2 + 3) / 2 = 2.5



**解析：** 



### [第 94 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/145)  （2019/12/15）

**题目：** vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

**解析:** 

> Well, delegation has two main advantages: one is practical - it saves you from having to add (and remove!!) those listeners individually. But Vue already does that for you.
>
> The other one is performance / memory. But since every click listener in a v-vor loop would use the same callback, this is minimal unless you have hundreds or thousands of rows.
>
> And finally, you can use delegation pretty easily by adding an @click listener to the <ul> element instead of the children. But then you have to resort to checks on the click target to evaluate which item in your data it might represent. So I would only use that if you truly find any performance problems without delegation.

好，委派有两个主要优点：一个是实用的-它使您不必分别添加（和删除！）这些侦听器。 但是Vue已经为您做到了。

另一个是性能/内存。 但是，由于v-vor循环中的每个单击侦听器都将使用相同的回调，因此除非您有成百上千的行，否则这是最小的。

最后，您可以通过在<*ul* >元素（而不是子元素）中添加@click侦听器来轻松使用委派。 但是随后，您必须求助于点击目标，以评估数据中可能代表的项目。 因此，只有在您真正发现任何性能问题而没有委派的情况下，我才使用它。



### [第 95 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/148)  （2019/12/23）

**题目：**   模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

**解析：** 

> 一个不考虑其他数据类型的公共方法，基本满足大部分场景
>
> ```js
> function deepCopy(target, cache = new Set()) {
> if (typeof target !== 'object' || cache.has(target)) {
>  return target
> }
> if (Array.isArray(target)) {
>  target.map(t => {
>    cache.add(t)
>    return t
>  })
> } else {
>  return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].reduce((res, key) => {
>    cache.add(target[key])
>    res[key] = deepCopy(target[key], cache)
>    return res
>  }, target.constructor !== Object ? Object.create(target.constructor.prototype) : {})
> }
> }
> 
> ```
>
> 主要问题是
>
> 1. symbol作为key，不会被遍历到，所以stringify和parse是不行的
> 2. 有环引用，stringify和parse也会报错
>
> 我们另外用`getOwnPropertySymbols`可以获取symbol key可以解决问题1，用集合记忆曾经遍历过的对象可以解决问题2。当然，还有很多数据类型要独立去拷贝。比如拷贝一个RegExp，lodash是最全的数据类型拷贝了，有空可以研究一下
>
> 另外，如果不考虑用symbol做key，还有两种黑科技深拷贝，可以解决环引用的问题，比stringify和parse优雅强一些
>
> ```js
> function deepCopyByHistory(target) {
> const prev = history.state
> history.replaceState(target, document.title)
> const res = history.state
> history.replaceState(prev, document.title)
> return res
> }
> 
> async function deepCopyByMessageChannel(target) {
> return new Promise(resolve => {
>  const channel = new MessageChannel()
>  channel.port2.onmessage = ev => resolve(ev.data)
>  channel.port1.postMessage(target)
> }).then(data => data)
> }
> 
> ```
>
> 无论哪种方法，它们都有一个共性：失去了继承关系，所以剩下的需要我们手动补上去了，故有`Object.create(target.constructor.prototype)`的操作

有两个问题：

1. 如果 `target` 是一个数组，拷贝结果没有返回
2. 如果 `target` 是一个函数，函数没有被深拷贝
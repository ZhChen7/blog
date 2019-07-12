## JavaScript 数组那些事

> JavaScript数据结构与算法 --- **数组** 篇
>
> 迭代器函数
>
> ECMAScript 6 和 数组 新功能



## 数组

> 数组对象的作用是：使用单独的变量名来存储一系列的值**.**
>
> [总的方法参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 数组相关操作:

#### 添加元素

- 添加末尾元素

  ~~~js
  arr.push(11)
  arr.push(12,13)
  ~~~

  

- 添加首位元素

  ~~~js
  arr.unshift()
  ~~~

  

#### 删除元素

- 删除末尾元素

  ~~~js
  arr.pop()
  ~~~

  

- 删除首位元素

  ~~~js
  arr.shift()
  ~~~

  

#### 在任意位置添加或删除元素

> **splice()** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

~~~js
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');

// 插入到索引为1的位置
console.log(months);
// 结果: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// 从索引为4开始 删除一个数据并添加一个 May数据
console.log(months);
// 结果: Array ['Jan', 'Feb', 'March', 'April', 'May']
~~~



## 迭代器函数

> 处理集合中的每个项是很常见的操作。JavaScript 提供了许多迭代集合的方法，从简单的[`for`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for)循环到[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)和[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)。迭代器和生成器将迭代的概念直接带入核心语言，并提供了一种机制来自定义[`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)循环的行为 。

### every:

> `**every()**` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
>
> 描述: `every` 方法为数组中的每个元素执行一次 `callback` 函数，直到它找到一个会使 `callback` 返回 [falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) 的元素。如果发现了一个这样的元素，`every` 方法将会立即返回 `false`。否则，`callback` 为每一个元素返回 `true`，`every` 就会返回 `true`。`callback` 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。
>
> **注意**：若收到一个空数组，此方法在一切情况下都会返回 `true`。

~~~js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
~~~



### some:

> `**some()**` 方法测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
>
> `some()` 为数组中的每一个元素执行一次 `callback` 函数，直到找到一个使得 callback **返回一个“真值”**（即可转换为布尔值 true 的值）。如果找到了这样一个值，`some()` 将会立即返回 `true`。否则，`some()` 返回 `false`。`callback` 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
>
> `callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。

~~~js
function isBelowThreshold(currentValue) {
    return currentValue < 40;
}

var array1 = [1, 30, 41, 29, 10, 13];
var array2=[41,42,43,44,45]
array1.some(isBelowThreshold)	//true
array2.some(isBelowThreshold) 	//false
~~~



### foreach:

> `**forEach()**` 方法对数组的每个元素执行一次提供的函数。
>
> `forEach` 方法按升序为数组中含有效值的每一项执行一次`callback` 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)



> **注意：** foreach 没有办法中止或者跳出 `forEach()` 循环，除了抛出一个异常。如果你需要这样，使用 `forEach()` 方法是错误的。
>
> 若你需要提前终止循环，你可以使用：
>
> - 简单循环
> - [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环
> - [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
> - [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
> - [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
> - [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
>
> 这些数组方法可以对数组元素判断，以便确定是否需要继续遍历：[`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)，[`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)，[`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)，[`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
>
> 译者注：若条件允许，也可以使用 [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 提前过滤出需要遍历的部分，再用 `forEach()` 处理。

~~~js
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"
~~~



### map 和 filter 方法

> JavaScript还有两个会 **返回新数组** 的遍历方法.



#### map

> `**map()**` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
>
> `map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)）组合起来形成一个新数组。 `callback` 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。

~~~js
var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
~~~



#### filter

> `**filter()**` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
>
> `filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 true 或[等价于 true 的值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)的元素创建一个新数组。`callback` 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 `callback` 测试的元素会被跳过，不会被包含在新数组中.

~~~js
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

/* 上面是ES6里面的箭头函数,下面是完整版
* const result = words.filter(function (e) {
    return e.length>6
});
**/

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

~~~



### reduce:

> `**reduce()**` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
>
> `reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：
>
> - `accumulator 累计器`
> - `currentValue 当前值`
> - `currentIndex 当前索引`
> - `array 数组`

~~~js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
~~~



*假如运行下段`reduce()`代码*：

```js
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

*callback 被调用四次，每次调用的参数和返回值如下表*：

![mark](http://static.zxinc520.com/blog/20190625/FxoC6IyrTRcr.png?imageslim)

## ECMAScript 6 和 数组 新功能

> ECMAScript 6 和 数组 新功能
>
> 这里主要介绍下  **数组ES6**  新特性
>
> [Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)



### for ...of 循环迭代

> **强大的 for-of 循环**
>
> 还记得在《[深入浅出 ES6（一）：ES6 是什么](http://www.infoq.com/cn/articles/es6-in-depth-an-introduction)》中我向你们承诺过的话么？ES6 不会破坏你已经写好的 JS 代码。目前看来，成千上万的 Web 网站依赖 for-in 循环，其中一些网站甚至将其用于数组遍历。如果想通过修正 for-in 循环增加数组遍历支持会让这一切变得更加混乱，因此，标准委员会在 ES6 中增加了一种新的循环语法来解决目前的问题。
>
> [参考](https://www.infoq.cn/article/es6-in-depth-iterators-and-the-for-of-loop)



------

#### 关于 for...in

> 这  **绝对是一个糟糕的选择**

```js
 for (var index in myArray) { // 千万别这样做 
  console.log(myArray[index]);
}
```

这 **绝对是一个糟糕的选择**，为什么呢？

- 在这段代码中，赋给 index 的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”，这给编码过程带来极大的不便。
- 作用于数组的 for-in 循环体除了遍历数组元素外，还会遍历[自定义](https://developer.mozilla.org/en-US/docs/Glossary/Expando)属性。举个例子，如果你的数组中有一个可枚举属性 myArray.name，循环将额外执行一次，遍历到名为“name”的索引。就连数组原型链上的属性都能被访问到。
- 最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
- 简而言之，for-in 是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。

------



### 强大的 for-of 循环

> 我们将要探究一下 [for-of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 循环的外表下隐藏着哪些强大的功能。
>
> [参考](https://www.infoq.cn/article/es6-in-depth-iterators-and-the-for-of-loop)

**优势:**

- 这是最简洁、最直接的遍历数组元素的语法
- 这个方法避开了 for-in 循环的所有缺陷
- 与 forEach() 不同的是，它可以正确响应 **break**、**continue** 和 **return** 语句

~~~js
for (var value of myArray) {
  console.log(value);
}
~~~



## 使用ES6新的迭代器

> 使用ES6新的迭代器
>
> [参考](http://es6.ruanyifeng.com/#docs/iterator)

### Iterator（遍历器）的概念 

JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。



**Iterator 的作用有三个**：

- 一是为各种数据结构，提供一个统一的、简便的访问接口；

- 二是使得数据结构的成员能够按某种次序排列；

- 三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。



**Iterator 的遍历过程是这样的** :

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束

~~~js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
~~~

上面代码定义了一个`makeIterator`函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组`['a', 'b']`执行这个函数，就会返回该数组的遍历器对象（即指针对象）`it`。



### 默认 Iterator 接口

> Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环（详见下文）。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
>
> 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

下面的例子是数组的`Symbol.iterator`属性。

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

上面代码中，变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。



### 数组的entries、keys和values 方法

> ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用`for...of`循环进行遍历，唯一的区别是`keys()`方法是对 **键名** 的遍历、`values()`方法是对 **键值** 的遍历，`entries()`方法是对 **键值对** 的遍历。

~~~js
for (let index of ['a', 'b'].keys()) {
 console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
 console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
 console.log(index, elem);
}
// 0 "a"
// 1 "b"
~~~

如果不使用`for...of`循环，可以手动调用遍历器对象的`next`方法，进行遍历。

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```



### Array.from()方法

> `Array.from()`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
>
> [参考](http://www.waibo.wang/bible/es6/html/8/8.2.html)

~~~js
let arrayLike = {
 '0': 'a',
 '1': 'b',
 '2': 'c',
 length: 3
};

// ES5的写法 ==> [].slice.call(arguments)能将具有length属性的对象转成数组：
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
~~~

[你遇到过 [ ].slice.call() 吗？](https://www.jianshu.com/p/ae57baecc57d)



实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象。`Array.from()`方法都可以将它们转为真正的数组。

```js
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
 console.log(p);
});

// arguments对象
function foo() {
 var args = Array.from(arguments);
 // ...
}
```

上面代码中，`querySelectorAll`方法返回的是一个类似数组的对象，可以将这个对象转为真正的数组，再使用`forEach`方法。



只要是部署了 Iterator 接口的数据结构，`Array.from()`方法都能将其转为数组。

~~~js
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
~~~



值得提醒的是，扩展运算符（`...`）也可以将某些数据结构转为数组。

~~~js
// arguments对象
function foo() {
 const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]
~~~

扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。`Array.from()`方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有`length`属性。因此，任何有`length`属性的对象，都可以通过`Array.from()`方法转为数组，而此时扩展运算符就无法转换。



对于还没有部署该方法的浏览器，可以用`Array.prototype.slice`方法替代。

~~~js
const toArray = (() =>
 Array.from ? Array.from : obj => [].slice.call(obj)
)();
~~~



Array.from()`方法还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

~~~js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

arr1=Array.from([1,2,3],e=>e*e)
console.log(arr1)//  [ 1, 4, 9 ]

~~~



### Array.of()方法

> `Array.of()`方法用于将一组值，转换为数组。

~~~js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
~~~

这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。

~~~js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

let arr=new Array(3)
console.log(arr)  //[ <3 empty items> ]

let arr=new Array(3)
console.log(arr.length) // 3
~~~

上面代码中，`Array`方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。



`Array.of()`方法基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。

~~~js
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
~~~

`Array.of()`方法总是返回参数值组成的数组。如果没有参数，就返回一个空数组。



`Array.of()`方法可以用下面的代码模拟实现。

~~~js
function ArrayOf(){
 return [].slice.call(arguments);
}
~~~



### 数组实例的fill()方法

> `fill()`方法使用给定值，填充一个数组。
>
> [参考](http://www.waibo.wang/bible/es6/html/8/8.6.html)

~~~js
['a', 'b', 'c'].fill(7)	// [7, 7, 7]

let arr=new Array(3).fill(7)
console.log(arr)  // [7, 7, 7]
~~~

上面代码表明，`fill()`方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。



`fill()`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

~~~js
['a', 'b', 'c'].fill(7, 1, 2)  // ['a', 7, 'c']
['a', 'b', 'c',1,2,3].fill(7, 1, 4)  // [ 'a', 7, 7, 7, 2, 3 ]
~~~

上面代码表示，`fill()`方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。



### 数组实例的copyWithin()方法

> 数组实例的`copyWithin()`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

<u>Array.prototype.copyWithin(target, start = 0, end = this.length)</u> ：

- 它接受三个参数。
  - target（必需）：从该位置开始替换数据。
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
  - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转为数值。

~~~js
[1, 2, 3, 4, 5].copyWithin(0, 3) // [4, 5, 3, 4, 5]
~~~

上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。

~~~js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1) // [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3) // {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
~~~



### 扩展运算符

> 扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

~~~js
console.log(...[1, 2, 3]) // 1 2 3

console.log(1, ...[2, 3, 4], 5) // 1 2 3 4 5

[...document.querySelectorAll('div')] // [<div>, <div>, <div>]
~~~

该运算符主要用于函数调用。

~~~js
function push(array, ...items) {
 array.push(...items);
}

function add(x, y) {
 return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
~~~

上面代码中，`array.push(...items)`和`add(...numbers)`这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。



扩展运算符与正常的函数参数可以结合使用，非常灵活。

~~~js
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
~~~



#### 替代数组的 apply 方法

> 由于扩展运算符可以展开数组，所以不再需要`apply`方法，将数组转为函数的参数了。

~~~js
// ES5 的写法
function f(x, y, z) {}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {}
let args = [0, 1, 2];
f(...args);
~~~

下面是扩展运算符取代`apply`方法的一个实际的例子，应用`Math.max`方法，简化求出一个数组最大元素的写法。

~~~js
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
~~~

上面代码中，由于 JavaScript 不提供求数组最大元素的函数，所以只能套用`Math.max`函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用`Math.max`了。

另一个例子是通过`push`函数，将一个数组添加到另一个数组的尾部。

~~~js
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
~~~



### 扩展运算符的应用

> 扩展运算符的应用

#### 复制数组

扩展运算符提供了复制数组的简便写法

~~~js
const a1 = [1, 2]; 

const a2 = [...a1];  // 写法一

const [...a2] = a1; // 写法二 
~~~

上面的两种写法，`a2`都是`a1`的克隆。

#### 合并数组

扩展运算符提供了数组合并的新写法。

~~~js
// ES5
[1, 2].concat(more)

// ES6
[1, 2, ...more]
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3] // [ 'a', 'b', 'c', 'd', 'e' ]
~~~



#### 字符串

扩展运算符还可以将字符串转为真正的数组。

~~~js
[...'hello'] // [ "h", "e", "l", "l", "o" ]
~~~

上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

~~~js
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
~~~



### 数组实例的find() 和 findIndex()方法

> 数组实例的`find()`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。
>
> ECMAScript6---find() 和 findIndex()方法------搜索

~~~js
[1, 4, -5, 10].find((n) => n < 0) // -5
~~~

上面代码找出数组中第一个小于 0 的成员。



~~~js
[1, 5, 10, 15].find(function(value, index, arr) {
 return value > 9;
}) // 10
~~~

上面代码中，`find()`方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

这两个方法都可以接受第二个参数，用来绑定回调函数的`**this`对象**  。

 

另外，这两个方法都可以发现`NaN`，弥补了数组的`indexOf()`方法的不足。

~~~js
[NaN].indexOf(NaN) // -1

[NaN].findIndex(y => Object.is(NaN, y)) // 0
~~~

上面代码中，`indexOf`方法无法识别数组的`NaN`成员，但是`findIndex()`方法可以借助`Object.is`方法做到。



### 数组实例的includes()方法

> `Array.prototype.includes()`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes()`方法类似。ES2016 引入了该方法。
>
> ECMAScript7 ---includes()方法 ------搜索

~~~js
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false
[1, 2, NaN].includes(NaN) // true
~~~



该方法的第二个参数表示搜索的起始位置，默认为`0`。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为`-4`，但数组长度为`3`），则会重置为从`0`开始。

~~~js
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true

[1,2,3,4,5].includes(2,1) //true
[1,2,3,4,5].includes(2,2) //false
~~~



没有该方法之前，我们通常使用数组的`indexOf()`方法，检查是否包含某个值。

~~~js
if (arr.indexOf(el) !== -1) {
 // ...
}
~~~

`indexOf()`方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够直观。二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对`NaN`的误判。

~~~js
[NaN].indexOf(NaN) // -1
~~~

另外，Map 和 Set 数据结构有一个`has`方法，需要注意与`includes()`区分。

- Map 结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
- Set 结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。



### 数组的空位

> 数组的空位，是指数组的某一个位置没有任何值。比如，`Array`构造函数返回的数组都是空位。

~~~js
Array(3) // [, , ,]
~~~

上面代码中，`Array(3)`返回一个具有 3 个空位的数组。

注意，空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。空位是没有任何值，`in`运算符可以说明这一点。

~~~js
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
~~~

上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。



#### ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

- `forEach()`,`filter()`,`reduce()`,`every()`和`some()`都会跳过空位。
- `map()`会跳过空位，但会保留这个值
- `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。

~~~js
// forEach方法
[,'a'].forEach((x,i) => console.log(x+'---'+i)); // a---1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => return x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false
~~~



#### ES6 则是明确将空位转为`undefined`。

`Array.from`方法会将数组的空位，转为`undefined`，也就是说，这个方法不会忽略空位。

~~~js
Array.from(['a',,'b']) // [ "a", undefined, "b" ]
~~~



扩展运算符（`...`）也会将空位转为`undefined`。

~~~js
[...['a',,'b']] // [ "a", undefined, "b" ]
~~~



copyWithin() 会连空位一起拷贝

~~~js
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
~~~



`fill()`会将空位视为正常的数组位置。

~~~js
new Array(3).fill('a') // ["a","a","a"]
~~~



`for...of`循环也会遍历空位。

~~~js
let arr = [, ,];
for (let i of arr) {
 console.log(1);
}
// 1
// 1
~~~

上面代码中，数组`arr`有两个空位，`for...of`并没有忽略它们。如果**改成`map`方法遍历**，空位是会**跳过**的。

`entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`。

~~~js
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
~~~



## 组数排序

> 组数排序



### sort

> `**sort()**` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。排序算法现在是[稳定的](https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95#.E7.A9.A9.E5.AE.9A.E6.80.A7)。默认排序顺序是根据字符串Unicode码点。
>
> 由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。
>
> **sort()** 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
>
> [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

~~~JS
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

var array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
~~~



#### 描述：

​		如果没有指明 `compareFunction` ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 `compareFunction`），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。

如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

- 如果 `compareFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；

- 如果 `compareFunction(a, b)` 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

- 如果 `compareFunction(a, b)` 大于 0 ， b 会被排列到 a 之前。
- `compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

~~~js
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
    
  if (a > b ) {
    return 1;
  }
    
  // a must be equal to b
  return 0;
}
~~~

要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

~~~js
function compareNumbers(a, b) {
  return a - b;
}
~~~

`sort` 方法可以使用 [函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function) 方便地书写：

~~~js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);

// [1, 2, 3, 4, 5]
~~~



## 输出数组为字符串

> 输出数组为字符串

### toString 和 join 

> 将数组转为字符串

#### toString

> `**toString()**` 返回一个字符串，表示指定的数组及其元素。
>
> [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)对象覆盖了[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)的 `toString` 方法。对于数组对象，`toString` 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。
>
> 当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 `toString` 方法。

~~~js
var array1 = [1, 2, 'a', '1a'];

console.log(array1.toString()); // "1,2,a,1a"
~~~



#### join

> 该`**join()**`方法通过连接数组（或类[数组对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）中的所有元素（由逗号或指定的分隔符字符串分隔）来创建并返回新字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。
>
> 指定用于分隔数组的每对相邻元素的字符串。如有必要，分隔符将转换为字符串。如果省略，则数组元素用逗号（“，”）分隔。如果`separator`是空字符串，则连接所有元素，它们之间没有任何字符。

~~~js
var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join()); //  "Fire,Air,Water"

console.log(elements.join('')); // "FireAirWater"

console.log(elements.join('-')); //  "Fire-Air-Water"


~~~



下面的示例创建一个`a`包含三个元素的数组，然后将数组连接四次：使用默认分隔符，然后是逗号和空格，然后是加号和空字符串

~~~js
var a = ['Wind', 'Water', 'Fire'];
a.join();      // 'Wind,Water,Fire'
a.join(', ');  // 'Wind, Water, Fire'
a.join(' + '); // 'Wind + Water + Fire'
a.join('');    // 'WindWaterFire'
~~~



**加入类似数组的对象**

以下示例`arguments`通过调用[`Function.prototype.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)on来连接类似于array的对象（）`Array.prototype.join`。

~~~js
function f(a, b, c) {
  var s = Array.prototype.join.call(arguments);
  console.log(s); // '1,a,true'
}
f(1, 'a', true);
//expected output: "1,a,true"
~~~


## JavaScript变量类型和计算

> 拿到 字节跳动实习生offer 总结
>
> 回馈分享一波自己的知识点总结



> 希望读者依此构建自己的知识树（思维导图）
>
> 偷懒一下：可参考我自己总结思维导图 :  [点这里](https://github.com/ZhChen7/Interview-mind-map) 
>
> 附带：高频面试题积累文档。 来自于（学长、牛客网等平台）
>
> 自己开发的博客地址：[zxinc520.com](<http://zxinc520.com/>)
>
> github地址: [点击](https://github.com/ZhChen7) 



> 此篇 js - 【变量类型和计算】 知识点： 全部弄懂了，面试很容易。





## 一、变量类型

### 1.1、类型

- 值类型（基本数据类型）           
  - string,number,boolean,undefined,null,symbol 6种
- 引用类型
  - Object、Array、Funtion。细分的话：有Object、Array、Funtion、Date、RegExp 等



### 1.2、值类型（基本数据类型）和引用类型区别

1. 内存的分配不同
   - 基本数据类型存储在栈中。
   - 复杂数据类型存储在堆中，栈中存储的变量，是指向堆中的引用地址

> 栈（操作系统）：由操作系统自动分配释放 ，存放函数的参数值和局部变量的值等。堆（操作系统）： 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链表。其实在堆中一般存放变量是一些对象类型

2. 访问机制不同：值类型按值访问，引用类型按引用访问
3. 复变量时不同(a=b)
   - 基本数据类型：a=b;是将b中保存的原始值的副本赋值给新变量a，a和b完全独立，互不影响
   - 复杂数据类型：a=b;将b保存的对象内存的引用地址赋值给了新变量a;a和b指向了同一个堆内存地址，其中一个值发生了改变，另一个也会改变。
4. 参数传递的不同(实参/形参)
   - 函数传参都是按值传递(栈中的存储的内容)：基本数据类型，拷贝的是值；复杂数据类型，拷贝的是引用地址



### 1.3、JavaScript判断数据类型

1. typeof 

   - typeof 运算符 只能 区分 值类型 的 类型，对于引用类型的 对象、数组 区分不出来 
   - 注意：typeof null===“object” typeof new Function(); // function 有效

2. instanceof

   - instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例
   - 缺点：instanceof运算符只能用于对象（纯对象和数组），不适用原始类型（Undefined、Null、Boolean、Number 和 String）的值。

3. Object.prototype.toString.call()

   - 可以通过Object.prototype.toString方法准确判断某个对象值属于哪种内置类型。

4. constructor

   - constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

   - ~~~js
     var f = new F();
     f.constructor === F;// true
     ~~~





## 二、变量计算（强制类型转换）

### 2.1、显示强制类型转换

1. 字符串和数字之间的显示转换

   - String()

   - Number()

   - 日期显示转换为数字(+)

     - 一元运算符 + 的另一个常见用途是将日期(Date)对象强制类型转换为数字，返回结果为Unix时间戳。

     - ~~~js
       var time = new Date()
       +time
       ~~~

   - 奇特的~运算符

     - ~x 大致等同于 -(x+1)
     - ~和indexOf()一起可以将结果强制类型转换为真/假值，如果indexOf()返回-1，~将其转换为假值0，其他情况一律转换为真值。

   - ~~字位截除

   - 显式解析数字字符串

     - Number()
     - parseInt()
     - parseFloat()

2. 显式转换为布尔值

   - Boolean()
   - (!!)显式强制类型转换为布尔值最常用地方法是!!

3. 抽象值操作

   - ToString
   - ToNumber
   - ToBoolean



### 2.2、隐式强制类型转换

1. 转成字符串的

   - 字符串拼接

     ~~~js
     var a = [1,2]
     var b = [3,4]
     a + b   //"1,23,4"
     ~~~

   - 因为数组的valueOf()操作无法得到简单基本类型值，于是调用toString()，因此两个数组变成了"1,2"和"3,4"，+将它们拼接后返回。

2. 隐式强制类型转换为布尔值

   - if()语句中的条件判断表达式
   - for(..; ..; ..)语句中的条件判断表达式
   - while()和do .. while()
   - ? : 中的条件判断表达式
   - 逻辑运算符||和&&左边的操作数

3. 布尔值到数字

4. ||和&&(选择器运算符)

   - ES5规范中说到：&&和||运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值。
     - 对于||来说，如果条件判断结果为true就返回第一个操作数的值，如果为false就返回第二个操作数的值。
     - 对于&&来说，如果条件判断结果为true就返回第二个操作数的值，如果为false就返回第一个操作数的值。



### 2.3、== 和 ===(宽松相等和严格相等)

> 区别：==允许在相等比较中进行强制类型转换，而===不允许。

#### 2.3.1、经典问题【 if(a == 1 && a == 2 && a == 3) 】

~~~js
if(a == 1 && a == 2 && a == 3){
    //... 使之成立    
}
~~~

#### 思考方向 ---  【**利用隐式转换规则**】

`==` 操作符在左右数据类型不一致时，会先进行隐式转换。

`a == 1 && a == 2 && a == 3` 的值意味着其不可能是基本数据类型。因为如果 a 是 null 或者是 undefined bool类型，都不可能返回true。

因此可以推测 a 是复杂数据类型，JS 中复杂数据类型只有 `object`，回忆一下，Object 转换为原始类型会调用什么方法？

- 如果部署了 `[Symbol.toPrimitive]` 接口，那么调用此接口，若返回的不是基本数据类型，抛出错误。
- 如果没有部署[Symbol.toPrimitive]接口，那么根据要转换的类型，先调用valueOf/toString
  1. 非Date类型对象，`hint` 是 `default` 时，调用顺序为：`valueOf` >>> `toString`，即`valueOf` 返回的不是基本数据类型，才会继续调用 `toString`，如果`toString` 返回的还不是基本数据类型，那么抛出错误。
  2. 如果 `hint` 是 `string`(Date对象的hint默认是string) ，调用顺序为：`toString` >>> `valueOf`，即`toString` 返回的不是基本数据类型，才会继续调用 `valueOf`，如果`valueOf` 返回的还不是基本数据类型，那么抛出错误。
  3. 如果 `hint` 是 `number`，调用顺序为： `valueOf` >>> `toString`

### 7种解决方案

1. 利用 [Symbol.toPrimitive] 接口

   ~~~js
   let a = {
       [Symbol.toPrimitive]: (function(hint) {
               let i = 1;
               return function() {
                   return i++;
               }
       })()
   }
   console.log(a == 1 && a == 2 && a == 3); //true
   ~~~

2. 调用 valueOf 接口

   ~~~js
   let a = {
       valueOf: (function() {
           let i = 1;
           return function() {
               return i++;
           }
       })()
   }
   console.log(a == 1 && a == 2 && a == 3); //true
   ~~~

3. 利用 正则

   ~~~js
   let a = {
       reg: /\d/g,
       valueOf () {
           return this.reg.exec(123)[0]
       }
   }
   console.log(a == 1 && a == 2 && a == 3); //true
   ~~~

4. 利用数据劫持

   - 使用 Object.defineProperty 定义的属性，在获取属性时，会调用 get 方法。利用这个特性，我们在 window 对象上定义 a 属性

     ~~~js
     let i = 1;
     Object.defineProperty(window, 'a', {
         get: function() {
             return i++;
         }
     });
     console.log(a == 1 && a == 2 && a == 3); //true
     ~~~

5. 利用ES6 Proxy

   ~~~js
   let a = new Proxy({}, {
       i: 1,
       get: function () {
           return () => this.i++;
       }
   });
   console.log(a == 1 && a == 2 && a == 3); // true
   ~~~

6. 重写数组的 join 

   ~~~js
   let a = [1, 2, 3];
   a.join = a.shift;
   console.log(a == 1 && a == 2 && a == 3); //true
   ~~~

7. 利用 with 关键字



> 注意：0 == '\n'   //true



## 三、相关典型问题

- JS 中使用 typeof 能得到的哪些类型
- 何时使用 === 何时使用 == 
  - 除了判断 **对象属性是否为空** 和 **看是否函数的参数为空**   的情况 ，其余的都用 === 。
- JS 中有哪些 内置函数
- JS 变量按照 存储方式 分为哪些类型，并描述其特点
- 如何理解 JSON








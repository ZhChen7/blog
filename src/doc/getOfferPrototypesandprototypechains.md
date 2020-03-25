## JavaScript 原型和原型链

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



> 此篇 js - 【原型和原型链】 知识点： 全部弄懂了，面试很容易。



## 一、原型和原型定义

### 1.1、背景

JavaScript 中除了基础类型外的数据类型，都是对象（引用类型）。但是由于其没有 类（class，ES6 引入了 class，但其只是语法糖）的概念，如何将所有对象联系起来就成立一个问题，于是就有了原型和原型链的概念。

### 1.2、原型是什么？

> 原型是一个prototype对象，用于表示对象之间的关系。

### 1.3、原型链

每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。以上一整个原型与原型层层相链接的过程即为原型链

### 1.4、公式

~~~js
var 对象 = new 函数()
对象.__proto__ === 对象的构造函数.prototype
~~~



## 二、7大继承写法

> 常考点【熟练掌握】

### 2.1、原型链继承

- 原型链继承的基本思想：是利用原型让一个引用类型继承另一个引用类型的属性和方法。

  如 SubType.prototype = new SuperType();

  ~~~js
  function SuperType() {
      this.name = 'Yvette';
  }
  function SubType() {
      this.age = 22;
  }
  SubType.prototype = new SuperType();
  ~~~

- 缺点

  1. 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享
  2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数

  

### 2.2、借用构造函数

- 其基本思想为:在子类型的构造函数中调用超类型构造函数。

  ~~~js
  function SuperType(name) {
      this.name = name
  }
  function SubType(name) {
      SuperType.call(this, name)
  }
  ~~~

- 优点

  1. 可以向超类传递参数
  2. 解决了原型中包含引用类型值被所有实例共享的问题

- 缺点

  1. 方法都在构造函数中定义，函数复用无从谈起
  2. 另外超类型原型中定义的方法对于子类型而言都是不可见的



### 2.3、组合继承

- 组合继承指的是将原型链和借用构造函数技术组合到一块，从而发挥二者之长的一种继承模式。基本思路：使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

  ~~~js
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
  ~~~

- 优点

  1. 可以向超类传递参数
  2. 每个实例都有自己的属性
  3. 实现了函数复用

- 缺点

  1. 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

  

### 2.4、原型式继承

- 原型式继承继承的基本思想：在 object() 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例，从本质上讲，object() 对传入的对象执行了一次浅拷贝。

  ECMAScript5通过新增 Object.create()方法规范了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象(可以覆盖原型对象上的同名属性)，在传入一个参数的情况下，Object.create() 和 object() 方法的行为相同。

  ~~~js
  function object(o) {
      function F() { }
      F.prototype = o;
      return new F();
  }
  ~~~

- 缺点

  1. 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享



### 2.5、寄生式继承

- 寄生式继承是与原型式继承紧密相关的一种思路。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部已某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

  ~~~js
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
  ~~~

- 优点

  1. 基于 person 返回了一个新对象 -—— person2，新对象不仅具有 person 的所有属性和方法，而且还有自己的 sayHi() 方法。在考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

- 缺点

  1. 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下。
  2. 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

  

### 2.6、寄生组合式继承

- 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路：

  不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

  ~~~js
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
  ~~~

- 步骤

  第一步：创建超类型原型的一个副本

  第二步：为创建的副本添加 constructor 属性

  第三步：将新创建的对象赋值给子类型的原型

- 优点

  1. 只调用了一次超类构造函数，效率更高。避免在SuberType.prototype上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。因此寄生组合继承是引用类型最理性的继承范式。



### 2.7、ES6 继承

- Class 可以通过extends关键字实现继承

  ~~~js
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
  ~~~

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





## 三、相关题目

### 3.1、写一个原型链继承的例子

- 详细请观看上文。



### 3.2、描述new一个对象的过程

#### 3.2.1、思路分析

1. 创建一个新对象obj
2. 把obj的__proto__指向 构造函数.prototype 实现继承
3. 执行构造函数，传递参数，改变this指向
4. 最后把obj返回

~~~js
伪代码：new Person("John") = {
                var obj = {};
	obj.__proto__ = Person.prototype; 
	var result = Person.call(obj,"John");
	return typeof result === 'object' ? result : obj; // 如果无返回值或者返回一个非对象值，则将obj返回作为新对象
}
~~~

#### 3.2.2、优秀的写法

~~~js
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
~~~

**或** 【个人倾向于后面一种】

~~~js
function _new(fn,...arg) {
    let obj = {}
    obj.__proto__ = fn.prototype
    let ret= fn.apply(obj,arg)
    return  ret instanceof Object ? ret:obj
}
~~~

#### 3.2.3、为什么 `return ret instanceof Object ? ret : obj;` 需要存在这一步骤？

> 这是因为new一个实例的时候，如果没有return，
>
> 就会根据构造函数内部this绑定的值生成对象，如果有返回值，
>
> 就会根据返回值生成对象，为了模拟这一效果，就需要判断apply后是否有返回值。



#### 3.2.4、总结new的过程中发生了什么

1. 令john的__proto__属性指向Person.prototype，确立了这条原型链， 导致 john 能通过原型链继承Person.prototype 中的部分属性，可以简单地视john和Person.prototype是继承关系。

2. john是 Person构造函数 的实例     john instanceof Person; //true  

3. 我们再来了解一下 instanceof 的内部原理，以应证我们的图是正确的

   ~~~js
   var L = A.__proto__;
   var R = B.prototype;
   if(L === R)
       return true;
   ~~~

   




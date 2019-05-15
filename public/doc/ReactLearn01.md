## React学习第一天

> ReactJS简介
>
> ReactJS的背景和原理
>
> 三大主流前端框架React、Vue、Angular
>
> Vue与React两个框架的区别和优势对比
>
> React（虚拟DOM，DIff算法）
>
> 创建基本的webpack4.x项目（ 并且解决了之前的一个bug ）
>
> 在项目中使用 react
>
> 把圈子变小 把语言变干净 把成绩往上提 把故事往心里收 现在想要的三年后都会有 ！o(*￣▽￣*)ブ

#### 1、ReactJS简介

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。

#### 2、ReactJS的背景和原理

在Web开发中，我们总需要将变化的数据实时反应到UI上，这时就需要对DOM进行操作。而复杂或频繁的DOM操作通常是性能瓶颈产生的原因（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。

React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A变成B，然后又从B变成A，React会认为UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，而对实际DOM进行操作的仅仅是Diff部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。

如果你像在90年代那样写过服务器端Render的纯Web页面那么应该知道，服务器端所要做的就是根据数据Render出HTML送到浏览器端。如果这时因为用户的一个点击需要改变某个状态文字，那么也是通过刷新整个页面来完成的。服务器端并不需要知道是哪一小段HTML发生了变化，而只需要根据数据刷新整个页面。换句话说，任何UI的变化都是通过整体刷新来完成的。而React将这种开发模式以高性能的方式带到了前端，每做一点界面的更新，你都可以认为刷新了整个页面。至于如何进行局部更新以保证性能，则是React框架要完成的事情。

借用Facebook介绍React的视频中聊天应用的例子，当一条新的消息过来时，你的开发过程需要知道哪条数据过来了，如何将新的DOM结点添加到当前DOM树上；而基于React的开发思路，你永远只需要关心数据整体，两次数据之间的UI如何变化，则完全交给框架去做。可以看到，使用React大大降低了逻辑复杂性，意味着开发难度降低，可能产生Bug的机会也更少。

------

#### 清楚理解两个概念：

1. (1). **ibrary(库)**：小而巧的库，只提供特定的API；优点就是 船小好调头。可以很方便的从一个库切换到另外的库；但是代码几乎不会改变。
2. (2). **Framework(框架)**：大而全的是框架；框架提供了一整套的解决方案；所以，如果在项目中间，想切换到另外的框架，是比较困难的。



# 三大主流前端框架React、Vue、Angular

![mark](http://static.zxinc520.com/blog/20190423/Q4Mrbn6pFhYJ.jpg?imageslim)

React（ **最流行** ）起源于 Facebook 的内部项目，用来架设 Instagram 的网站， 并于 2013年 5 月开源。React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。它有以下的特性：

1.声明式设计：React采用声明范式，可以轻松描述应用。

2.高效：React通过对DOM的模拟，最大限度地减少与DOM的交互。

3.灵活：React可以与已知的库或框架很好地配合。

```shell
1. 速度快：在UI渲染过程中，React通过在虚拟DOM中的微操作来实现对实际DOM的局部更新。
2. 跨浏览器兼容：虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。
3. 模块化：为你程序编写独立的模块化UI组件，这样当某个或某些组件出现问题是，可以方便地进行隔离。
4. 单向数据流：Flux是一个用于在JavaScript应用中创建单向数据层的架构，它随着React视图库的开发而被Facebook概念化。
5. 同构、纯粹的javascript：因为搜索引擎的爬虫程序依赖的是服务端响应而不是JavaScript的执行，预渲染你的应用有助于搜索引擎优化。
6.兼容性好：比如使用RequireJS来加载和打包，而Browserify和Webpack适用于构建大型应用。它们使得那些艰难的任务不再让人望而生畏。
缺点：
React本身只是一个V而已，并不是一个完整的框架，所以如果是大型项目想要一套完整的框架的话，基本都需要加上ReactRouter和Flux才能写大型应用。
```

![mark](http://static.zxinc520.com/blog/20190423/7hBjb1epQFoH.webp)

Vue ( **目前市场上的主流** ) 是尤雨溪编写的一个构建数据驱动的Web界面的库，准确来说不是一个框架，它聚焦在V（view）视图层。

它有以下的特性：

1.轻量级的框架

2.双向数据绑定

3.指令

4.插件化

```
优点：
1. 简单：官方文档很清晰，比 Angular 简单易学。
2. 快速：异步批处理方式更新 DOM。
3. 组合：用解耦的、可复用的组件组合你的应用程序。
4. 紧凑：~18kb min+gzip，且无依赖。
5. 强大：表达式 无需声明依赖的可推导属性 (computed properties)。
6. 对模块友好：可以通过 NPM、Bower 或 Duo 安装，不强迫你所有的代码都遵循 Angular 的各种规定，使用场景更加灵活。
缺点：
1. 新生儿：Vue.js是一个新的项目，没有angular那么成熟。
2. 影响度不是很大：google了一下，有关于Vue.js多样性或者说丰富性少于其他一些有名的库。
3. 不支持IE8
```

![mark](http://static.zxinc520.com/blog/20190423/bu0preO1hhfc.webp)

Angular（ **最早** ）是一款优秀的前端JS框架，已经被用于Google的多款产品当中。

它有以下的特性：

1.良好的应用程序结构

2.双向数据绑定

3.指令

4.HTML模板

5.可嵌入、注入和测试

```shell
优点：
1. 模板功能强大丰富，自带了极其丰富的angular指令。
2. 是一个比较完善的前端框架，包含服务，模板，数据双向绑定，模块化，路由，过滤器，依赖注入等所有功能；
3. 自定义指令，自定义指令后可以在项目中多次使用。
4. ng模块化比较大胆的引入了Java的一些东西（依赖注入），能够很容易的写出可复用的代码，对于敏捷开发的团队来说非常有帮助。
5. angularjs是互联网巨人谷歌开发，这也意味着他有一个坚实的基础和社区支持。
缺点：
1. angular 入门很容易 但深入后概念很多, 学习中较难理解.
2. 文档例子非常少, 官方的文档基本只写了api, 一个例子都没有, 很多时候具体怎么用都是google来的, 或直接问misko,angular的作者.
3. 对IE6/7 兼容不算特别好, 就是可以用jQuery自己手写代码解决一些.
4. 指令的应用的最佳实践教程少, angular其实很灵活, 如果不看一些作者的使用原则,很容易写出 四不像的代码, 例如js中还是像jQuery的思想有很多dom操作.
5. DI 依赖注入 如果代码压缩需要显示声明.
```



# [Vue与React两个框架的区别和优势对比](http://caibaojian.com/vue-vs-react.html)

Vue与React的区别：  [可以参考](https://www.jianshu.com/p/174e8028eabd) 

[如果你喜欢用模板搭建应用（或者有这个想法），请选择Vue]()

Vue应用的默认选项是把markup放在HTML文件中。数据绑定表达式采用的是和Angular相似的mustache语法，而指令（特殊的HTML属性）用来向模板添加功能。

相比之下，React应用不使用模板，它要求开发者借助JSX在JavaScript中创建DOM。

对于来自标准Web开发方式的新开发者，模板更容易理解。但是一些资深开发者也喜欢模板，因为模板可以更好的把布局和功能分割开来，还可以使用Pug之类的模板引擎。

但是使用模板的代价是不得不学习所有的HTML扩展语法，而渲染函数只需要会标准的HTML和JavaScript。而且比起模板，渲染函数更加容易调试和[测试](https://link.jianshu.com?t=http://lib.csdn.net/base/softwaretest)。当然你不应该因为这方面的原因错过Vue，因为在Vue2.0中提供了使用模板或者渲染函数的选项。



[如果你喜欢简单和“能用就行”的东西，请选择Vue]()

一个简单的Vue项目可以不需要转译直接运行在浏览器中，所以使用Vue可以像使用[jQuery](https://link.jianshu.com?t=http://lib.csdn.net/base/jquery)一样简单。当然这对于React来说在技术上也是可行的，但是典型的React代码是重度依赖于JSX和诸如class之类的ES6特性的。

Vue的简单在程序设计的时候体现更深，让我们来比较一下两个框架是怎样处理应用数据的（也就是state）。



React中是通过比较当前state和前一个state来决定何时在DOM中进行重渲染以及渲染的内容，因此需要不可变（immutable）的state。

Vue中的数据是可变（mutated）的，所以同样的操作看起来更加简洁。

让我们来看看Vue中是如何进行状态管理的。当向state添加一个新对象的时候，Vue将遍历其中的所有属性并且转换为getter，setter方法，现在Vue的响应系统开始保持对state的跟踪了，当state中的内容发生变化的时候就会自动重新渲染DOM。令人称道的是，Vue中改变state的状态的操作不仅更加简洁，而且它的重新渲染系统也比React 的更快更有效率。

Vue的响应系统还有有些坑的，例如：它不能检测属性的添加和删除和某些数组更改。这时候就要用到Vue API中的类似于React的set方法来解决。



[如果你想要你的应用尽可能的小和快，请选择Vue]()

当应用程序的状态改变时，React和Vue都将构建一个虚拟DOM并同步到真实DOM中。 两者都有各自的方法优化这个过程。

Vue核心开发者提供了一个benchmark测试，可以看出Vue的渲染系统比React的更快。测试方法是10000个项目的列表渲染100次，结果如下图。从实用的观点来看，这种benchmark只和边缘情况有关，大部分应用程序中不会经常进行这种操作，所以这不应该被视为一个重要的比较点。但是，页面大小是与所有项目有关的，这方面Vue再次领先，它目前的版本压缩后只有25.6KB。React要实现同样的功能，你需要React DOM（37.4KB）和React with Addon库（11.4KB），共计44.8KB，几乎是Vue的两倍大。双倍的体积并不能带来双倍的功能。



[如果你打算构建一个大型应用程序，请选择React]()

像文章开头那种同时用Vue和React实现的简单应用程序，可能会让一个开发者潜意识中更加倾向于Vue。这是因为基于模板的应用程序第一眼看上去更加好理解，而且能很快跑起来。但是这些好处引入的技术债会阻碍应用扩展到更大的规模。模板容易出现很难注意到的运行时错误，同时也很难去测试，重构和分解。

相比之下，Javascript模板可以组织成具有很好的分解性和干（DRY）代码的组件，干代码的可重用性和可测试性更好。Vue也有组件系统和渲染函数，但是React的渲染系统可配置性更强，还有诸如浅（shallow）渲染的特性，和React的测试工具结合起来使用，使代码的可测试性和可维护性更好。

与此同时，React的immutable应用状态可能写起来不够简洁，但它在大型应用中意义非凡，因为透明度和可测试性在大型项目中变得至关重要。



[如果你想要一个同时适用于Web端和原生APP的框架，请选择React]()

[React Native](https://link.jianshu.com?t=http://lib.csdn.net/base/reactnative)是一个使用Javascript构建移动端原生应用程序（[iOS](https://link.jianshu.com?t=http://lib.csdn.net/base/ios)，[Android](https://link.jianshu.com?t=http://lib.csdn.net/base/android)）的库。 它与React.js相同，只是不使用Web组件，而是使用原生组件。 如果你学过React.js，很快就能上手React Native，反之亦然。

它的意义在于，开发者只需要一套知识和工具就能开发Web应用和移动端原生应用。如果你想同时做Web端开发和移动端开发，React为你准备了一份大礼。

阿里的Weex也是一个跨平台UI项目，目前它以Vue为灵感，使用了许多相同的语法，同时计划在未来完全集成Vue，然而集成的时间和细节还不清楚。因为Vue将HTML模板作为它设计的核心部分，并且现有特性不支持自定义渲染，因此很难看出目前的Vue.js的跨平台能力能像React和React Native一样强大。



[如果你想要最大的生态系统，请选择React]()

毫无疑问，React是目前最受欢迎的前端框架。它在NPM上每个月的下载量超过了250万次，相比之下，Vue是22.5万次。人气不仅仅是一个肤浅的数字，这意味着更多的文章，教程和更多Stack Overflow的解答，还意味有着更多的工具和插件可以在项目中使用，让开发者不再孤立无援。

这两个框架都是开源的，但是React诞生于Facebook，有Facebook背书，它的开发者和Facebook都承诺会持续维护React。相比之下，Vue是独立开发者尤雨溪的作品。尤雨溪目前在全职维护Vue，也有一些公司资助Vue，但是规模和Facebook和Google没得比。不过请对Vue的团队放心，它的小规模和独立性并没有成为劣势，Vue有着固定的发布周期，甚至更令人称道的是，Github上Vue只有54个open issue，3456个closed issue，作为对比，React有多达530个open issue，3447个closed issue。

总结一下，我们发现的，Vue的优势是：

模板和渲染函数的弹性选择

简单的语法和项目配置

更快的渲染速度和更小的体积

React的优势是：

更适合大型应用和更好的可测试性

Web端和移动端原生APP通吃

更大的生态系统，更多的支持和好用的工具

然而，React和Vue都是很优秀的框架，它们之间的相似之处多过不同之处，并且大部分的优秀功能是相通的：

用虚拟DOM实现快速渲染

轻量级

响应式组件

服务端渲染

集成路由工具，打包工具，状态管理工具的难度低

优秀的支持和社区



## React

### 1. 虚拟DOM（Virtual Document Object Model）

- DOM的本质什么：浏览器中的概念，用JS对象来表示 页面上的 元素，并提供了操作 DOM对象的API。
- 什么是React中的虚拟DOM：是框架中的概念，是 程序员 用 JS对象来模拟 页面上的 DOM和DOM嵌套。

## DOM

先直接说一下，DOM意思是**文档对象模型（Dcoument Object Model）**，它是一个结构化文本的抽象。对于Web开发者，这个文本是一段HTML代码，DOM也就被叫做HTML DOM。HTML的元素在DOM中变成了节点。

所以，HTML是一段文本，DOM就是这段文本在内存中的表示。

> 可以对比一个程序的一个进程实例。对于一个程序，可以存在多个进程，就像一段同样的HTML可以有多个DOM一样。（例：同一个页面被多个tab加载）。

在HTML DOM中提供了遍历和修改节点的接口（API）。像*getElementById*或者*removeChild*这样的方法。我们一般使用JavaScript来操作DOM，这是因为……好吧，天知道为什么。:)

所以，只要我们想要动态修改网页的内容的时候，我们就修改DOM。

```javascript
var item = document.getElementById("myLI");
item.parentNode.removeChild(item);
```

所谓*document*就是根节点的抽象，而*getElementById*，*parentNode*和*emoveChild*则是HTML DOM API中的方法。

## 虚拟DOM

首先 - 虚拟DOM不是React发明的，但是React用了它且免费提供。

虚拟DOM是HTML DOM的抽象。它是轻量的，是从浏览器特定（Browser-specific，这里意指特定的浏览器需要特定的实现）实现细节中提取出来的。由于DOM本身就已经是一个抽象了，所以虚拟DOM，实际上，是一个抽象的抽象。

也许把虚拟DOM当做React的本地和简化版的HTML DOM更好。它允许React跳过既慢又限于特定浏览器的真实DOM操作，以在这个抽象世界中做自己的计算。

常规DOM和虚拟DOM二者并没有什么大的不同。这也是为什么React代码的JSX部分可以看起来几乎跟纯HTML很像的原因。

```javascript
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <div>
          Hello, world! I am a CommentBox.
        </div>
      </div>
    );
  }
});
```

在大多数情况下，当你有一段HTML代码且想要将其写成一个React组件时，你只需要做这个。

1. 在render方法中返回HTML代码；
2. 将class属性替换成className属性，因为class在JavaScript中是一个保留关键字。

二者之间还有一些，相当细微的区别。

- 虚拟DOM的这些属性不在真实的DOM中出现——key，ref和dangerouslySetInnerHTML。[查看更多](https://facebook.github.io/react/docs/special-non-dom-attributes.html)
- React范的DOM引入了[一些限制](https://facebook.github.io/react/docs/dom-differences.html)



## 为什么需要虚拟DOM？

先介绍浏览器加载一个HTML文件需要做哪些事，帮助我们理解为什么我们需要虚拟DOM。webkit引擎的处理流程，一图胜千言：



![mark](http://static.zxinc520.com/blog/20190425/tKU23C1t4RLN.webp)



所有浏览器的引擎工作流程都差不多，如上图大致分5步：创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting

第一步，用HTML分析器，分析HTML元素，构建一颗DOM树。

第二步：用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表。

第三步：将上面的DOM树和样式表，关联起来，构建一颗Render树。这一过程又称为Attachment。每个DOM节点都有attach方法，接受样式信息，返回一个render对象（又名renderer）。这些render对象最终会被构建成一颗Render树。

第四步：有了Render树后，浏览器开始布局，会为每个Render树上的节点确定一个在显示屏上出现的精确坐标值。

第五步：Render数有了，节点显示的位置坐标也有了，最后就是调用每个节点的paint方法，让它们显示出来。

当你用传统的源生api或jQuery去操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程。比如当你在一次操作时，需要更新10个DOM节点，理想状态是一次性构建完DOM树，再执行后续操作。但浏览器没这么智能，收到第一个更新DOM请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程。显然例如计算DOM节点的坐标值等都是白白浪费性能，可能这次计算完，紧接着的下一个DOM更新请求，这个节点的坐标值就变了，前面的一次计算是无用功。

即使计算机硬件一直在更新迭代，操作DOM的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户的体验。真实的DOM节点，哪怕一个最简单的div也包含着很多属性，可以打印出来直观感受一下：

虚拟DOM就是为了解决这个浏览器性能问题而被设计出来的。例如前面的例子，假如一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地的一个js对象中，最终将这个js对象一次性attach到DOM树上，通知浏览器去执行绘制工作，这样可以避免大量的无谓的计算量。



## Virtual DOM 算法

可以用新渲染的对象树去和旧的树进行对比，记录这两棵树差异。记录下来的不同就是我们需要对页面真正的 DOM 操作，然后把它们应用在真正的 DOM 树上，页面就变更了。这样就可以做到：视图的结构确实是整个全新渲染了，但是最后操作DOM的时候确实只变更有不同的地方。

这就是所谓的 Virtual DOM 算法。包括几个步骤：

1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

## DIff算法

比较两棵DOM树的差异是Virtual DOM算法最核心的部分.简单的说就是新旧虚拟dom 的比较，如果有差异就以新的为准，然后再插入的真实的dom中，重新渲染。、 借网络一张图片说明:

![mark](http://static.zxinc520.com/blog/20190427/TBHlLkPiRjat.webp)

**比较只会在同层级进行, 不会跨层级比较。**
比较后会出现四种情况：
1、此节点是否被移除 -> 添加新的节点 
2、属性是否被改变 -> 旧属性改为新属性
3、文本内容被改变-> 旧内容改为新内容
4、节点要被整个替换 -> 结构完全不相同 移除整个替换



## 创建基本的webpack4.x项目

1. 1.运行 `npm init -y`快速初始化下项目
2. 2.在项目根目录创建 **src** 源代码目录 和 **dist** 产品目录
3. 3.在src目录下创建 index.html
4. 4.使用 npm 安装webpack，运行 `npm i webpack webpack-cli -D`
5. 5.注意：webpack4.x提供了 约定大于配置的概念；目的是为了尽量减少 配置文件的体积。
   - 默认约定了
     - 打包的入口是 `src` ->` index.js`
     - 打包的输出文件是 `dist` -> `main.js`
     - 4.x中新增的mode项：<u>development</u> 和 <u>production</u>

![mark](http://static.zxinc520.com/blog/20190427/N7Qiefkt9Fwn.png?imageslim)

[mode  介绍](https://www.webpackjs.com/concepts/mode/)

​	**mode** 参数：（<u>development</u> 和 <u>production</u> ）：决定了 配置代码 （压缩代码体积）是否被压缩。

![mark](http://static.zxinc520.com/blog/20190427/3EKcIY3d4kos.png?imageslim)



### 配置 webpack-dev-server (自动打包)

> [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 能够用于快速开发应用程序

1. 1.安装：运行：`npm i webpack-dev-server -D`
2. 2.配置 <u>package.json</u>

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server"
}
```

- 可以在<u>*webpack.config.js*</u> 配置相应的 devServer（自动打开窗口，配置端口号，首页路径展示情况）

![mark](http://static.zxinc520.com/blog/20190427/oznoq3LcPA3S.png?imageslim)



### 配置 html-webpack-plugin 

> [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用[lodash模板](https://lodash.com/docs#template)提供你自己的模板，或使用你自己的[loader](https://webpack.docschina.org/loaders)。

1. 1.安装：运行：`npm i html-webpack-plugin -D`
2. 2.2.配置 <u>package.json</u>

![mark](http://static.zxinc520.com/blog/20190427/uzkbRIjYKMqF.png?imageslim)



### 配置 Babel

> [Babel](https://babeljs.io/)是一个广泛使用的转码器，可以将ES6代码转为ES5代码

[ webpack中使用Babel官方文档 ](https://webpack.docschina.org/loaders/babel-loader/#%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3)

1. 1.安装 `npm install -D babel-loader @babel/core @babel/preset-env webpack`

2. 2.<u>在 webpack 配置对象中，需要将 babel-loader 添加到 module 列表中，就像下面这样</u>

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

------

### 解决之前遇到的一个BUG

![mark](http://static.zxinc520.com/blog/20190427/FnivOIm1VIRg.png?imageslim)

![1556355771552](http://static.zxinc520.com/blog/20190416/vh340CYSUk0d.png?imageslim)

**解决方案**：

1. 1.安装：`npm i @babel/plugin-proposal-class-properties -D`
2. 2.配置 `webpack.config.js`

![mark](http://static.zxinc520.com/blog/20190427/OWlsS3uCQONs.png?imageslim)

**运行结果**：

![mark](http://static.zxinc520.com/blog/20190427/gHK6mpqXfQca.png?imageslim)





## 在项目中使用 react

1. 1.运行 `npm i react react-dom -s` 安装包
   - react：专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
   - react-dom：专门进行DOM操作的，最主要的应用场景，就是 ReactDOM.render()

<u>尝试写一个react项目</u>：

**index.js**:

```javascript
//第一步：导入包
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

//第二步：创建虚拟DOM元素
//参数1：创建的元素的类型，字符串，表示元素的名称
//参数2：是一个对象或 null，表示 当前这个DOM 元素的属性
//参数3：子节点（包括 其它 虚拟DOM 获取 文本子节点）
//参数n：其它子节点
const myh1=React.createElement('h1',{id:'myh1',title:'this id h1'},'这是一个大大H1！')

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
//参数一：要渲染的那个虚拟DOM元素
//参数二：指定页面上的DOM元素，当作容器
ReactDOM.render(myh1,document.getElementById('app'))
```

**index.html**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

![mark](http://static.zxinc520.com/blog/20190427/AHtHc973OThy.png?imageslim)





## 创建DOM结构

### 方式一：（~基本不用）

**index.js**:

```javascript
//第一步：导入包
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

//第二步：创建虚拟DOM元素
const myh1=React.createElement('h1',{id:'myh1',title:'this id h1'},'这是一个大大H1！')
const mydiv=React.createElement('div',null,'这是一个div元素',myh1)

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(mydiv,document.getElementById('app'))
```



### 方式二：JSX 语法 （~ important）

> JSX语法：看起来可能有些奇怪的标签语法既不是字符串也不是 HTML。
>
> JSX语法的本质，还是在运行的时候，被转换成了 <u>**React.createElement 形式**</u>来执行的

使用 **babel** 将JSX 语法转换为 <u>React.createElement 形式</u>  [JSX官方详细介绍](https://react.docschina.org/docs/introducing-jsx.html)

关键包：运行 `npm install --save-dev @babel/preset-react` [可以参考babel官方文档](https://babeljs.io/docs/en/babel-preset-react)

![mark](http://static.zxinc520.com/blog/20190427/NHy4KwgF4SNN.png?imageslim)

原因：<u>少写了中括号。（粗心大意了）</u>不该！！~~~



**配置 <u>webpack.config.js</u>** 

```javascript
//配置 @babel/preset-react
module: {
        rules: [
            {
                test: /\.m?js$/,
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
            }
        ]
    }
```



------

##### **在 JSX 中使用表达式**：[ JSX中使用表达式](https://react.docschina.org/docs/introducing-jsx.html)

```javascript
//第一步：导入包
import React from 'react' //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //把创建好的 组件 和 虚拟DOM 放到页面上展示的

let a = 10
let str = 'zc'
let arr = [<h1>这是h1</h1>, <h2>这是h2</h2>]
let arr1 = ['周琛', '张三', '李四', '王五']

//第三步：使用 ReactDOM 把虚拟 DOM 渲染到页面上
ReactDOM.render(<div title={str}>
    {a + 11}
    <hr/>
    {arr}
    <hr/>
    {arr1.map(item => {
        return <h3>{item}</h3>
    })}
</div>, document.getElementById('app'))
```

![mark](http://static.zxinc520.com/blog/20190427/EfbH8hDEnVn0.png?imageslim)






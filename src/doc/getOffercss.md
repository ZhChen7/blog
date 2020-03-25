## css面试考点全面总结

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



> 此篇 css考点 共总结 17 大知识点： 全部弄懂了，面试很容易。



### 1、盒模型(box model)

#### 1.1、是什么？

> 网页设计中css技术所使用的一种思维模型

#### 1.2、为什么会出现不同模型

当年微软的IE浏览器占据超过80%市场份额的时候，想自己独立制定一套浏览器标准，其中就包括IE的盒模型，但是有很多公司不同意IE的做法，他们遵循的是W3C的标准来定制浏览器，也就造成了现在浏览器不同的CSS盒模型，但是仍有很多老网站采用的是老IE的标准(怪异模式)，因此很多浏览器保留了IE的怪异模式。

#### 1.3、盒模型的两种标准

- 标准模型
  - 元素宽高＝内容（content）的宽高
- IE 模型
  - 元素宽高＝内容（content）＋填充（padding）＋边框 （border） 的总宽高

#### 1.4、组成

- content
- padding
- border
- margin

#### 1.5、CSS3中标准或者怪异模式之间的切换（box-sizing）

- box-sizing ： content-box 采用标准模式 也是默认样式
- box-sizing： border-box 采用ie怪异模式



### 2、IFC与BFC

#### 2.1、BFC

> BFC | 块级格式化上下文（Block Formatting Context）

##### BFC布局规则

1. 内部的Box会在垂直方向，一个接一个地放置。

2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

3. 每个元素的左外边缘（margin-left)， 与包含块的左边（contain box left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。

4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

##### BFC使用场景

- 外边距折叠问题
- 清除浮动

##### 触发BFC的方法

- float属性不为none
- 元素的 position 为 absolute 或 fixed
- display属性为下列之一:table-cell | table-caption| inline-block | flex | inline-flex
- overflow属性不为visible



#### 2.2、IFC

> IFC |行内格式化上下文（Inline Formatting Context）

##### IFC布局规则

在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 margin，border 和 padding在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。



### 3、margin塌陷及合并问题

> 注意：margin塌陷问题和合并问题都只对垂直方向有效

#### 3.1、margin塌陷问题

- 描述

  这个问题是一个经典的浏览器内核问题。具体表现是当两个元素嵌套到一起时，外层盒模型的margin-top取两个元素中margin-top较大的值。

  因为在正常的情况下内层元素是相对于外层元素进行移动，但是这时内层元素却相对于整个文档进行移动，好像外层元素没有“棚顶”一样，因此叫margin塌陷问题。

- 解决方法

  1. 给外层元素认为加一个“棚顶”:border。

     这种方法虽然能够解决问题，但是在日常开发中我们不使用它，因为他在外观上对元素进行了改变。

  2. 触发BFC

     - float属性不为none
     - 元素的 position 为 absolute 或 fixed
     - display属性为下列之一:table-cell | table-caption| inline-block | flex | inline-flex
     - overflow属性不为visible



#### 3.2、margin合并问题

- 描述：具体表现为两个元素并列时，两者相隔的外边距取的是两者所设置margin的最大值。
- margin合并问题解决办法
  - 我们仍然用bfc来解决。可以给其中一个元素包起来，在外层元素中设置bfc渲染规则。此时这个元素的渲染规则就改变了，就能够解决这个问题。





### 4、float 

#### 4.1、浮动模型

块状元素这么霸道都是独占一行，如果现在我们想让两个块状元素并排显示，怎么办呢？不要着急，设置元素浮动就可以实现这一愿望。

任何元素在默认情况下是不能浮动的，但可以通过float属性将元素定义为浮动，如div、p、table、img等元素都可以被定义为浮动。通过下面代码实现两个div元素在一行显示。

#### 4.2、清除浮动

1. 浮动元素后面的同级标签加clear: both | left | right属性

   ~~~css
   推荐使用：after（伪类） 伪类原理：相当于在父元素里添加一个子元素（默认内联元素），用来清除容器内的浮动元素。                                       	display: "block";
       clear:both;
       height:0;
       content: "";
   ~~~

2. 触发BFC

   - float属性不为none
   - 元素的 position 为 absolute 或 fixed
   - display属性为下列之一:table-cell | table-caption| inline-block | flex | inline-flex
   - overflow属性不为visible



### 5、flex

#### 5.1、描述

2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

Flex 布局将成为未来布局的首选方案。

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活。

任何一个容器都可以指定为 Flex 布局。



#### 5.2、容器的属性

- flex-direction  
  - row | row-reverse | column | column-reverse
- flex-wrap 
  - flex-wrap: nowrap | wrap | wrap-reverse;
- flex-flow 
  - 属性是 flex-direction 和 flex-wrap 的简写
- justify-content 
  - justify-content: flex-start | flex-end | center | space-between | space-around;
- align-items 
  - align-items: flex-start | flex-end | center | baseline | stretch;
- align-content 
  - align-content: flex-start | flex-end | center | space-between | space-around | stretch;





### 6、CSS浏览器兼容性的4个解决方案

- 浏览器CSS样式初始化

- 浏览器私有属性

  - 我们经常会在某个CSS的属性前添加一些前缀，比如-webkit- ，-moz- ，-ms-，这些就是浏览器的私有属性。                                                                                   -webkit- (谷歌, Safari, 新版Opera浏览器, 以及几乎所有iOS系统中的浏览器(包括iOS 系统中的火狐浏览器); 简单的说，所有基于WebKit 内核的浏览器)

    -moz- (火狐浏览器)

    -o- (旧版Opera浏览器)

    -ms- (IE浏览器 和 Edge浏览器)

  - 对于私有属性的顺序要注意，把标准写法放到最后，兼容性写法放到前面

- CSS hack语法

  - 有时我们需要针对不同的浏览器或不同版本写特定的CSS样式，这种针对不同的浏览器/不同版本写相应的CSS code的过程，叫做CSS hack!

  - 例如IE：

    ~~~js
     <!--[if <keywords>? IE <version>?]>
    	 代码块，可以是html，css，js
    <![endif]-->
    ~~~

- 自动化插件

  - Autoprefixer是一款自动管理浏览器前缀的插件，它可以解析CSS文件并且添加浏览器前缀到CSS内容里，使用Can I Use（caniuse网站）的数据来决定哪些前缀是需要的。
  - 目前webpack、gulp、grunt都有相应的插件，如果还没有使用，那就赶紧应用到我们的项目中吧，别再让CSS兼容性浪费你的时间！



### 7、position（定位）

#### 7.1、文档流 

简单说就是元素按照其在 HTML 中的位置顺序决定排布的过程。HTML的布局机制就是用文档流模型的，即块元素（block）独占一行，内联元素（inline），不独占一行。

一般使用margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔。margin用于布局分开元素使元素与元素互不相干；padding用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段“距离”。

只要不是float和绝对定位方式布局的，都在文档流里面。

#### 7.2、属性

- static
- relative(相对定位）
- absolute
- fixed
- z-index
  - z-index指定了一个元素及其子元素的 z-order，元素之间有重叠的时候，z-index可以决定让哪一个元素在上方。通常来说 z-index 较大的元素会覆盖较小的一个。仅对定位的元素有效。 元素之间重叠默认的顺序是后面的元素会盖住前面的元素。如果设置了z-index可以改变这个顺序。但只对同级的元素有效。父元素永远在子元素后面。

### 8、行内元素 和 块级元素

##### 区别

- 块元素，总是在新行上开始；内联元素，和其他元素在一行
- 块元素，能容纳其他块元素或者内联元素；内联元素，只能容纳文本或其他内联元素
- 块元素中高度，行高以及顶和底边距都可以控制；内联元素中高，行高及顶和底边距不可改变。



### 9、Sass/Scss、Less、stylus

#### 9.1、CSS预处理器

- 概念

  CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。

- 优点

  虽然各种预处理器功能强大，但使用最多的，还是以下特性：变量（variables），代码混合（ mixins），嵌套（nested rules）以及 代码模块化(Modules)。



#### 9.2、区别

- 编译环境不一样

  Sass的安装需要Ruby环境，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放到项目中，也有 Less.app、SimpleLess、CodeKit.app这样的工具，也有在线编译地址。Stylus需要安装node，然后安装最新的stylus包即可使用

- 变量符不一样

  Less是@，而Scss是$， Stylus样式中声明变量没有任何限定，你可以使用“$”符号开始。

- 输出设置

- 处理条件语句

- 引用外部CSS文件

- Sass和Less的工具库不同



### 10、css3动画

#### 10.1、常用特效/变换（transform）

- scale（2D缩放）
- rotate（2D旋转）
- translate（2D位移）
- skew（2D倾斜）



#### 10.2、animation

- 属性
  - animation-name ：规定需要绑定到选择器的 keyframe 名称。
  -  animation-duration：规定完成动画所花费的时间，以秒或毫秒计。
  - animation-timing-function：规定动画的速度曲线。
  -  animation-delay ：规定在动画开始之前的延迟。
  - animation-iteration-count：规定动画应该播放的次数。
  - animation-direction ：规定是否应该轮流反向播放动画。
  - animation-fill-mode ：规定动画在播放之前或之后，其动画效果是否可见

- 简写：

  animation: name duration timing-function delay iteration-count direction fill-mode;

- 举例：

  animation: wang 3s linear 1s infinite alternate forwards ;

  

#### 10.3、keyframes

- 这个属性用来定义一系列关键帧。也就是在动画运行的全过程中的一个个中间点。

  ~~~css
  @keyframes zoomIn {
      0%{ transform: scale(0);}
      60%{ transform: scale(1.1);}
      100% { transform: scale(1);}
  }
  ~~~

  

### 11、居中布局

1. 使用Flex

2. 使用绝对定位

3. inline-block

   ~~~html
   .parent2{
       text-align: center;
   }
   .parent2 span{
       display: inline-block;
       height:50%
   }
   .parent2 .child{
       display: inline-block;
       color: #fff;
   }
   <div class="parent2">
       <span></span>
       <div class="child">hello world-2</div>
   </div>
   ~~~

4. 使用 table 和 table-cell

   ~~~css
   .parent1{
       display: table;
   }
   .parent1 .child{
       display: table-cell;
   }
   ~~~

5. 子元素是单行文本

   设置父元素的 text-align 和 line-height = height

6. 利用 grid 布局

   ~~~css
   .container {
       display: grid;
   }
   .box {
       justify-self: center; 
       align-self: center;
   }
   ~~~

7. 利用绝对定位和 margin:auto

   ~~~css
   /* 无需知道被居中元素的宽高 */
   .box {
       position: absolute;
       left: 0;
       top: 0;
       right: 0;
       bottom: 0;
       margin: auto;
   }
   .container {
       position: relative;
   }
   ~~~



### 12、等高布局

1. flex布局

2. 使用负margin-bottom和正padding-bottom对冲实现

   ~~~css
   .Article>li {
       float: left;
       margin: 0 10px -9999px 0;
       padding-bottom: 9999px;
   }
   ~~~

3. 模仿table布局

   父：display: table;   子： display: table-cell;

4. grid布局



### 13、三栏布局

#### 13.1、特点

- 两侧宽度固定，中间宽度自适应
- 中间部分在DOM结构上优先，以便先行渲染
- 都需要一个格外的Div.container
- 允许任意列的高度最高



#### 13.2、圣杯布局

- 特点 ：使用了相对定位
- 优势：在DOM结构上显得更加值观和自然

**实现**

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



#### 13.3、双飞翼布局

- 特点：不需要定位，只用了浮动和负边距
- 优势
  - 不需要使用定位，所以更加简洁
  - 允许的页面最小宽度通常比圣杯布局更小

**实现：**

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



#### 13.4、区别

两者都是为了不让左右俩不遮住middle，经典圣杯布局通过父亲padding给左右俩腾位置从而不会遮住middle内容，而双飞翼是middle设置margin，限制内部内容区域，从而左右俩遮的地方不会影响到middle内容

对于三栏布局，modern solution是 flex box/ grid 布局，这两者可以轻松实现 mobile-friendly的方案，也可以控制顺序，middle依然可以先渲染，2019年兼容性不错了，如果APP无视IE，这是优选



### 14、多栏布局

#### 14.1、栅格系统（grid systems）

- 特点  ：利用浮动实现的多栏布局
- 表现 ： Bootstrap

#### 14.2、多列布局

- 特点：将内容按指定的列数排列

- 表现  ：报纸排版

- 使用方式： 通过css3的column

  - IE10及以上和其它现代浏览器
  - 但 -webkit- 以及 -moz- 前缀不能省略
  - 比flex弹性布局更稳定、更兼容

- 语法

  - columns: <'column-width'> || <'column-count'> 

    设置对象的列数和每列的宽度。复合属性。

  - column-width ：设置对象的宽度

  - column-count ：用来定义对象中的列数，使用数字 1-10表示

  -  column-gap ：设置列与列之间的间距

  - column-rule：<' column-rule-width '> || <' column-rule-style '> || <' column-rule-color '>

    - 设置对象的列与列之间的边框。复合属性
    - column-rule: 10px solid #090;

  - column-fill：auto | balance

    - 设置对象所有列的高度是否统一





### 15、弹性布局（Flexbox）

- CSS3引入的新模式
  - 用来为盒装模型提供的最大的灵活性
  - 目前已经得到了所有现代浏览器的支持
- 优势
  - 轻松实现视图大小变化时对元素的相对位置的大小的保持
  - 减少了对浮动布局的依赖以及重置元素的大小
- 注意
  - Webkit 内核的浏览器，必须加上 -webkit前缀                  display：-webkit-flex
  - 子元素的float、clear和vertical-align 属性失效



### 16、流式布局

- 主要靠百分比进行排版
- 对应布局
  - 瀑布流布局
    - 表现 ：参差不齐的多栏布局
    - 实现方式 ： 同样可以用column实现



### 17、响应式布局

- 特点
  - 一个网站能够兼容多个终端
  - 解决不用设备之间分辨率之间的兼容问题
- 实现方式
  - css3的媒体查询
  - 检测设备屏幕大小，通过css媒体查询来有针对性的更改页面的布局
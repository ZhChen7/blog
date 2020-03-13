## 前端面试每日三加一

> 待更新状态
>
> 今天 2019/12/24 ~ ✌
>
> [网页版标签分类](https://www.kancloud.cn/aya001001/fe-interview/1054361)  



### 第1天 (2019.09.19）

**总览**： 

- [html] [页面导入样式时，使用link和@import有什么区别？](https://github.com/haizlin/fe-interview/issues/1)
- [css] [圣杯布局和双飞翼布局的理解和区别，并用代码实现](https://github.com/haizlin/fe-interview/issues/2)
- [js] [用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值](https://github.com/haizlin/fe-interview/issues/3)



1、【html】：页面导入样式时，使用link和@import有什么区别？

**解析**： 

区别：

1. link是HTML标签，[@import](https://github.com/import)是css提供的。
2. link引入的样式页面加载时同时加载，[@import](https://github.com/import)引入的样式需等页面加载完成后再加载。
3. link没有兼容性问题，[@import](https://github.com/import)不兼容ie5以下。
4. link可以通过js操作DOM动态引入样式表改变样式，而[@import](https://github.com/import)不可以。



2、【css】：圣杯布局和双飞翼布局的理解和区别，并用代码实现

**解析：**

     **作用**：圣杯布局和双飞翼布局解决的问题是一样的，就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。

  **区别**：两者都是为了不让左右俩不遮住middle，经典圣杯布局通过父亲padding给左右俩腾位置从而不会遮住middle内容，而双飞翼是middle设置margin，限制内部内容区域，从而左右俩遮的地方不会影响到middle内容

对于三栏布局，modern solution是 flex box/ grid 布局，这两者可以轻松实现 mobile-friendly的方案，也可以控制顺序，middle依然可以先渲染，9012年兼容性不错了，如果APP无视IE，这是优选



3、【js】：用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

这一题是起源题

描述：

这是一道大题目，把考点拆成了4个小项；需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）：

1. 生成一个长度为5的空数组arr。
2. 生成一个（2－32）之间的随机整数rand。
3. 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]
4. 最终输出一个长度为5，且内容不重复的数组arr。

```js
let arr = new Array(5)
let i = 0
AddRandom(arr, creatrandomnum())

function AddRandom(arr, randomnum) {
    if (arr.indexOf(randomnum) < 0) {
        arr[i] = randomnum
        i++
    } else {
        randomnum = creatrandomnum()
    }
    if (i >= 5) {
        console.log(arr)
        return arr
    } else {
        AddRandom(arr, randomnum)
    }
}

function creatrandomnum() {
    return Math.floor(Math.random() * (32 - 2) + 2) //不含最大值，含最小值 [2-33)
}
```

点评：
知识点：递归、随机数
难点：1颗星
这道题主要是想考递归的用法，同时顺带考了生成指定范围的随机数方法。





### 第2天 (2019.09.20)

**总览** ：

- [html] [html的元素有哪些（包含H5）？](https://github.com/haizlin/fe-interview/issues/4)
- [css] [CSS3有哪些新增的特性？](https://github.com/haizlin/fe-interview/issues/5)
- [js] [写一个方法去掉字符串中的空格](https://github.com/haizlin/fe-interview/issues/6)



1、【html】 html的元素有哪些（包含H5）？

```tex
行内元素：
- a
- b
- span
- strong
- i
- em
- button
- input
- label
- br
- textarea
- select

块元素 ：
- div
- p
- h1-h6
- ol
- ul
- li
- table
- tbody
- td
- tr
- thead
- dl
- dt
- dd

H5新增元素：
- section
- article
- audio
- video
- hearder
- footer
- small
```

2、【css】 CSS3有哪些新增的特性？

> [前端面试之 CSS3 新特性](https://juejin.im/entry/595f1e3c5188250d914dd53c)

```css
边框(borders):
    border-radius 圆角
    box-shadow 盒阴影
    border-image 边框图像
背景:
    background-size 背景图片的尺寸
    background_origin 背景图片的定位区域
    background-clip 背景图片的绘制区域
渐变：
    linear-gradient 线性渐变
    radial-gradient 径向渐变
文本效果;
    word-break
    word-wrap
    text-overflow
    text-shadow
    text-wrap
    text-outline
    text-justify
转换：
2D转换属性
    transform
    transform-origin
2D转换方法
    translate(x,y)
    translateX(n)
    translateY(n)
    rotate(angle)
    scale(n)
    scaleX(n)
    scaleY(n)
    rotate(angle)
    matrix(n,n,n,n,n,n)
3D转换：
*3D转换属性：

    transform
    transform-origin
    transform-style
3D转换方法
    translate3d(x,y,z)
    translateX(x)
    translateY(y)
    translateZ(z)
    scale3d(x,y,z)
    scaleX(x)
    scaleY(y)
    scaleZ(z)
    rotate3d(x,y,z,angle)
    rotateX(x)
    rotateY(y)
    rotateZ(z)
    perspective(n)
过渡
	transition
动画
	@Keyframes规则
	animation
弹性盒子(flexbox)
多媒体查询@media
```



3、【js】 写一个方法去掉字符串中的空格 

> 写一个方法去掉字符串中的空格，要求传入不同的类型分别能去掉前、后、前后、中间的空格
>
> 知识点：正则表达式、数组的API

```js
var str = '  abc d e f  g ';
function trim(str) {
    var reg = /\s+/g;
    if (typeof str === 'string') {
        var trimStr = str.replace(reg, '');
    }
    console.log(trimStr)
}
trim(str)
```

```js
var trim = function(str){
return str.replace(/\s*/g,"");
}
str.replace(/\s*/g,""); //去除字符串内所有的空格
str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
str.replace(/^\s*/,""); //去除字符串内左侧的空格
str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格
```

```js
var str = '  abc d e f  g ';
console.log(str.split(' ').join(''))
```



### 第3天 (2019.09.21)

**总览** ：

- [html] [HTML全局属性(global attribute)有哪些（包含H5）？](https://github.com/haizlin/fe-interview/issues/7)
- [css] [在页面上隐藏元素的方法有哪些？](https://github.com/haizlin/fe-interview/issues/8)
- [js] [去除字符串中最后一个指定的字符](https://github.com/haizlin/fe-interview/issues/9)



1、【html 】HTML全局属性(global attribute)有哪些（包含H5）？

```txt
全局属性：用于任何HTML5元素的属性

    accesskey ：规定激活元素的快捷键；
    class ：规定元素的一个或多个类名（引用样式表中的类）；
    contenteditable ：规定元素内容是否可编辑；
    contextmenu ：规定元素的上下文菜单。上下文菜单在用户点击元素时显示。
    data-* ：用于存储页面或应用程序的私有定制数据。
    dir ：规定元素中内容的文本方向。
    draggable ：规定元素是否可拖动。
    dropzone： 规定在拖动被拖动数据时是否进行复制、移动或链接。
    hidden ： 样式上会导致元素不显示，但是不能用这个属性实现样式。
    id 规定元素的唯一： id。
    lang ：规定元素内容的语言。
    spellcheck： 规定是否对元素进行拼写和语法检查。
    style ：规定元素的CSS行内元素。
    tabindex ：规定元素的tab键次序。
    title： 规定有关元素的额外信息。
    translate ：规定是否应该翻译元素内容。
```



2、【css】： 在页面上隐藏元素的方法有哪些？

```txt
占位:
    -visibility: hidden;
    -margin-left: -100%;
    -opacity: 0;
    -transform: scale(0);
    
不占位:
    -display: none;
    -width: 0; height: 0; overflow: hidden;
    
仅对块内文本元素:
    -text-indent: -9999px;
    -font-size: 0;
    
 利用 position （absolute 的情况下）
    left/right/top/bottom: 9999px/-9999px 让元素在视区外
    z-index: -9999 放到最底层，同一位置可以让其他元素把这个给遮掉
```



3、【js】去除字符串中最后一个指定的字符

```js
function GetLaststr(s,target) {
    if (typeof s!= 'string') return false
    let index = s.lastIndexOf(target);
    return s.substring(0,index ) + s.substring(index+1,s.length);
}

```

```js
function delLast(str, target) {
    return str.split('').reverse().join('').replace(target,'').split('').reverse().join('');
}

```



### 第4天 (2019.09.22)

**总览：** 

- [html] [HTML5的文件离线储存怎么使用，工作原理是什么？](https://github.com/haizlin/fe-interview/issues/10)
- [css] [CSS选择器有哪些？哪些属性可以继承？](https://github.com/haizlin/fe-interview/issues/11)
- [js] [写一个方法把下划线命名转成大驼峰命名](https://github.com/haizlin/fe-interview/issues/12)



1、【html】 HTML5的文件离线储存怎么使用，工作原理是什么？

> [有趣的HTML5：离线存储](https://segmentfault.com/a/1190000000732617) 

```txt
优点:
没有网络时可以浏览,加快资源的加载速度,减少服务器负载

使用:
只需要在页面头部加入,然后创建manifest.appcache文件

浏览器如何解析manifest
    1.在线情况:浏览器发现html头部有manifest属性,他会请求manifest文件,如果是第一次访问,那么浏览器会根据manifest文件的内容下载相应的资源并且进行离线存储.如果已经访问过并存储,那么浏览器使用 离线的资源价值,然后对比新的文件,如果没有发生改变就不做任何操作,如果文件改变了,那么就会重新下载文件中的资源并进行离线存储
    2.离线情况:浏览器就直接使用离线存储资源

```



2、【css】CSS选择器有哪些？哪些属性可以继承？

```css
选择器:
    通配符,id,class,标签,后代选择器,子选择器,兄弟选择器,属性选择器,伪类选择器,伪元素选择器

可继承的属性:
    字体属性:font-size,font-weight,font-style,font-family
    文本属性:text-indent,text-align,line-height,word-spacing,letter-spacing,color,direction,text-transform
    元素可见性:visibility,opacity
    光标属性:cursor

```

3、【js】 写一个方法把下划线命名转成大驼峰命名

```js
 function changeStr(str){
   if(str.split('_').length==1)return;
   str.split('_').reduce((a,b)=>{
     return a+b.substr(0,1).toUpperCase() + b.substr(1)
   })
}

```



### 第5天 (2019.09.23)

**总览** ：

- [html] [简述超链接target属性的取值和作用](https://github.com/haizlin/fe-interview/issues/13)
- [css] [CSS3新增伪类有哪些并简要描述](https://github.com/haizlin/fe-interview/issues/14)
- [js] [写一个把字符串大小写切换的方法](https://github.com/haizlin/fe-interview/issues/15)



1、【html】 简述超链接target属性的取值和作用 

`a` 标签的 `target` 属性一共有四个值。

- `_self`

  默认属性。在当前窗口或者框架中加载目标文档。

- `_blank`

  打开新的窗口或者新的标签页。在使用这个属性时，最好添加 `rel="noopener norefferrer"` 属性，防止打开的新窗口对原窗口进行篡改。防止 `window.opener` API 的恶意行为。

- `_parent`

  在 `frame` 或者 `iframe` 中使用较多。在父级框架中载入目标文档，当 `a` 标签本身在顶层时，与 `_self` 相同。

- `_top`

  在 `frame` 或者 `iframe` 中使用较多。直接在顶层的框架中载入目标文档，加载整个窗口。



2、【css】CSS3新增伪类有哪些并简要描述 

CSS3 中规定伪类使用一个 `:` 来表示；伪元素则使用 `::` 来表示。

CSS3 中新增的伪元素有以下这些:

- `:first-child / :last-child` 表示子元素结构关系的
- `:nth-child() / nth-last-child()` 用来控制奇数、偶数行的（控制表单奇数、偶数行的样式）
- `:first-of-type / :last-of-type` 表示一组兄弟元素中其类型的第一个元素 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type)
- `:nth-of-type() / :nth-last-of-type()` 这个选择器匹配那些在相同兄弟节点中的位置与模式 an+b 匹配的相同元素` [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)
- `:root` html 根元素
- `:not()` 否定选择器，用的比较多
- `:only-child` 只有一个子元素时才会生效
- `:empty` 选择连空格都没有的元素



3、【js】写一个把字符串大小写切换的方法

正则表达式：

```js
function caseConvert(str){
    return str.replace(/([a-z]*)([A-Z]*)/g, (m, s1, s2)=>{
        return `${s1.toUpperCase()}${s2.toLowerCase()}`
    })
}

```

利用 toUpperCase() ：

```js
let str = 'aBcDeFgH'
let arr = []
for(let item of str) {
    if (item === item.toUpperCase()) {
        item = item.toLowerCase()
    } else {
        item = item.toUpperCase()
    }
    arr.push(item)
}
let newStr = arr.join('')

```



### 第6天 (2019.09.24)

**总览：** 

- [html] [label都有哪些作用？并举相应的例子说明](https://github.com/haizlin/fe-interview/issues/16)
- [css] [用css创建一个三角形，并简述原理](https://github.com/haizlin/fe-interview/issues/17)
- [js] [写一个去除制表符和换行符的方法](https://github.com/haizlin/fe-interview/issues/18)



1、【html】label都有哪些作用？并举相应的例子说明

**解析**:

1. 互相关联的机制  

表示用户界面中某个元素的说明
增加命中区域，屏幕阅读器可以读出标签。使使用辅助技术的用户更容易理解输入 哪些数据

2. 利用`label`"模拟"`button`来解决不同浏览器原生`button`样式不同的问题
3. 结合`checkbox`、`radio`表单元素实现纯CSS状态切换，这样的实例就太多了。比如控制CSS动画播放和停止。下面是一部分代码。[详细实例地址](https://codepen.io/mts123/pen/EzqdbM)*
4. `input`的`focus`事件会触发锚点定位，我们可以利用`label`当触发器实现选项卡切换效果。下面代码选自张鑫旭《CSS世界》



2、【css】用css创建一个三角形，并简述原理 

```css
#triangle{
    width: 0;
    height: 0;
    margin: 100px auto;
    border-top: 50px solid transparent;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 50px solid red;
}

```

3、【js】写一个去除制表符和换行符的方法

```js
function fn(str) {
    var s = str.replace(/\t\n\v\r\f+/g,'');
    return s;
}

```

### 第7天 (2019.09.25)

**总览** ：

- [html] [iframe框架都有哪些优缺点？](https://github.com/haizlin/fe-interview/issues/19)
- [css] [简述你对BFC规范的理解](https://github.com/haizlin/fe-interview/issues/20)
- [js] [统计某一字符或字符串在另一个字符串中出现的次数](https://github.com/haizlin/fe-interview/issues/21)



1、【html】iframe框架都有哪些优缺点？

iframe是一种框架，也是一种很常见的网页嵌入方式

**iframe的优点：** 

1.iframe能够原封不动的把嵌入的网页展现出来。

2.如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。

3.网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。

4.如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。

**iframe的缺点** ：

1.会产生很多页面，不容易管理。

2.iframe框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。

3.代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理iframe中的内容，所以使用iframe会不利于搜索引擎优化。

4.很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。

5.iframe框架页面会增加服务器的http请求，对于大型网站是不可取的。

分析了这么多，现在基本上都是用Ajax来代替iframe，所以iframe已经渐渐的退出了前端开发



2.【css】简述你对BFC规范的理解 

> [[布局概念] 关于CSS-BFC深入理解](https://juejin.im/post/5909db2fda2f60005d2093db)  

**块格式化上下文（Block Formatting Context，BFC）** 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

```txt
BFC：是CSS中的一个渲染机制，BFC就相当于一个盒子，内部的元素与外界的元素互不干扰。它不会影响外部的布局，外部的布局也不会影响到它。

形成条件（任意一条）
    float的值不是none
    position 的值不是static或者relative
    display的值是inline-block,table-cell,flex,table-caption或者inline-flex
    overflow的值不是visible
    
特性 
    内部的盒子会在垂直方向上一个接一个的放置
    对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关。
    每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
    BFC的区域不会与float的元素区域重叠
    计算BFC的高度时，浮动子元素也参与计算
    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

```



3、【js】 统计某一字符或字符串在另一个字符串中出现的次数

```JS
function strCount(str, target) {
    let count = 0
    if (!target) return count
    while(str.match(target)) {
        str = str.replace(target, '')
        count++
    }
    return count
}

```



### 第8天 (2019.09.26)

总览：

- [html] [简述下html5的离线储存原理，同时说明如何使用？](https://github.com/haizlin/fe-interview/issues/22)
- [css] [清除浮动的方式有哪些及优缺点？](https://github.com/haizlin/fe-interview/issues/23)
- [js] [写一个加密字符串的方法](https://github.com/haizlin/fe-interview/issues/24)

1、【html】 简述下html5的离线储存原理，同时说明如何使用？

```html
原理：

HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

如何使用：

①　页面头部像下面一样加入一个manifest的属性。

<!DOCTYPE HTML>
<html manifest = "cache.manifest">
	...
</html>
在cache.manifest文件的编写离线存储的资源。

CACHE MANIFEST
    	#v0.1
    	CACHE:
   	 		js/index.js
    		css/index.css
    	NETWORK:
    		images/logo.png
    	FALLBACK:
    		*.html /404.html /* / /404.html 或 /html/ /404.html 也可*/

以#号开头的是注释，一般会在第二行写个版本号，用来在缓存的文件更新时，更新manifest以实现浏览器重新下载新的文件，可以是版本号，时间戳或md5码等。

离线存储的 manifest一般由三个部分组成：

    ①　CACHE：必选，表示需要离线存储的资源列表，由于包含manifest文件的页面将被自动离线存储，所以不需要把页面自身也列出来。

    ②　NETWORK：可选，可以使用通配符，表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在CACHE和NETWORK中有一个相同的资源，那么这个资源还是会被离线存储，也就是说CACHE的优先级更高。

    ③　FALLBACK：可选，表示如果访问第一个资源失败，那么就使用第二个资源来替换他，如/html/ /404.html表示用 “404.html” 替代 /html/ 目录中的所有文件，/ /404.html表示用 “404.html” 替代当前目录中的所有文件，*.html /404.html表示用 “404.html” 替代 所有html文件。

```



2、【css】清除浮动的方式有哪些及优缺点？

唠叨：

- 在现在的实际工作当中我已经很少用浮动来布局了，真的很少，刚开始学习的时候用的还蛮多，现在Flex布局，标准文档流以及 定位 已经可以满足大部分的布局需求了。
- 浮动带来的问题是盒子塌陷问题，所以我们就来解决这个问题吧

**解决方案**

1. 给外部盒子也添加浮动

把外部盒子也从标准文档流中抽离，让它和孩子们见面。
**缺点** ：可读性差，不易于维护（别人很难理解为什么要给父元素也添上float），而且可能需要调整整个页面布局。

2. 在外部盒子内最下方添上带clear属性的空盒子

可以是div也可以是其它块级元素，把 `<div style="clear:both;"></div>`放在盒内底部，用最下面的空盒子清除浮动，把盒子重新撑起来。
**缺点**：引入了冗余元素

3. 用overflow:hidden清除浮动 ，外层父元素使用 `overflow:hidden;` 属性触发 BFC，让内层的 `float` 不会影响外层的布局

给外部盒子添上这个属性就好了，非常简单。
**缺点** ：有可能造成溢出元素不可见，影响展示效果。

4. 用after伪元素清除浮动  ( 比较常用的方式 )

给外部盒子的after伪元素设置clear属性，再隐藏它
这其实是对空盒子方案的改进，一种纯CSS的解决方案，不用引入冗余元素。



3、【js】  简要描述下什么是回调函数并写一个例子出来

> 回调是把一个函数作为参数传递给另一个函数，当该函数满足某个条件时触发该参数函数。
> 主要用于异步操作 例如网络请求 防止页面同步代码阻塞导致渲染线程停止

```js
function longTask(callback,timeout) {
  setTimeout(callback,timeout)
}
longTask(()=>{console.log("回调任务被执行了");},2000);
console.log("我是同步代码 不会阻塞我");

```



### 第9天 (2019.09.27)

**总览：**

- [html] [浏览器内多个标签页之间的通信方式有哪些？](https://github.com/haizlin/fe-interview/issues/25)
- [css] [简述下你理解的优雅降级和渐进增强](https://github.com/haizlin/fe-interview/issues/26)
- [js] [写一个判断数据类型的方法](https://github.com/haizlin/fe-interview/issues/27)



1、【html】浏览器内多个标签页之间的通信方式有哪些？

> [实现多个标签页之间通信的几种方法](https://juejin.im/post/5acdba01f265da23826e5633) 

```txt
完全答案：
    WebSocket （可跨域）
    postMessage（可跨域）
    Worker之SharedWorker
    Server-Sent Events
    localStorage
    BroadcastChannel
    Cookies

```



2、【css】 简述下你理解的优雅降级和渐进增强

> [前端面试题-渐进增强和优雅降级](https://segmentfault.com/a/1190000013818745)

```txt
简介：渐进增强和优雅降级这两个概念是在 CSS3 出现之后火起来的。由于低级浏览器不支持 CSS3，但是 CSS3 特效太优秀不忍放弃，所以在高级浏览器中使用 CSS3，而在低级浏览器只保证最基本的功能。

优雅降级：
	先不考虑兼容，优先最新版本浏览器效果，之后再逐渐兼容低版本浏览器。

渐进增强：
    考虑兼容，以较低（多）浏览器效果为主，之后再逐渐增加对新版本浏览器的支持，以内容为主。也是多数公司所采用的方法。

```



3、【js】 写一个判断数据类型的方法

> 考点：Object.prototype.toString 方法

```js
const typeCheck = (obj) => {
    const typeStr = Object.prototype.toString.call(obj);
    console.log(typeStr)
    return typeStr.toLowerCase().slice(8, typeStr.length - 1);
};

```



### 第10天 (2019.09.28)

**总览** ：

- [html] [viewport常见设置都有哪些？](https://github.com/haizlin/fe-interview/issues/28)
- [css] [对比下px、em、rem有什么不同？](https://github.com/haizlin/fe-interview/issues/29)
- [js] [简要描述下什么是回调函数并写一个例子出来](https://github.com/haizlin/fe-interview/issues/30)



1、【html】 viewport常见设置都有哪些？

**解析** ：

在移动端做开发时，必须要搞清楚 `viewport` 这一设置。

`viewport` 就是视区窗口，也就是浏览器中显示网页的部分。PC 端上基本等于设备显示区域，但在移动端上 `viewport` 会超出设备的显示区域（即会有横向滚动条出现）。
设备默认的 `viewport` 在 980 - 1024 之间。

为了让移动端可以很好地显示页面，因此需要对 `viewport` 进行设置。相关的设置值如下：

![mark](http://static.zxinc520.com/blog/20190928/QQxtaIhl4ArA.png?imageslim)

```html
// width=device-width, initial-scale=1.0 是为了兼容不同浏览器
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
/>

```



2、【css】 对比下px、em、rem有什么不同？

- px: 绝对固定的值，无论页面放大或者缩小都不会改变。
- em: 相对父元素字体大小的倍数。如果父元素的字体为 `12px`，那么子元素 `1em` 就是 `24px`。由于是相对父级的倍数，所以多层嵌套时，倍数关系的计算会很头痛。
- rem: 相对根元素字体大小的倍数。相对于 `html` 的字体大小，如果不做任何修改，浏览器默认字体大小为 `16px`。

> **小技巧**  

如果为了方便计算 `rem`，可以设置 `font-size= 62.5%` 这样一来默认的字体就变成 `10px` 了。之后的 `rem` 就是以 `10` 为基准了。



3、【js】 简要描述下什么是回调函数并写一个例子出来

回调函数首先作为一个函数的参数传入，当这个函数执行后再执行的函数，往往会依赖前一个函数执行的结果。
在 `javascript` 中，对于 I/O、HTTP 请求等异步操作，为了控制执行的顺序就需要使用回调的方法。

```js
// 第三个参数就是回调函数
function func1(param1, param2, ..., callback){
  // To do some action
  // 往往会在最后调用 callback 并且传入操作过的参数
  callback(cbParam1, cbParam2, ...)
}

// 实际调用的时候
func1(param1, param2, ..., (cbParam1, cbParam2, ...) => {
  // To do some action
})

```

当有过个任务需要顺序执行时，如果采用回调函数的形式就会出现我们熟悉的“回调地狱”的情况。为了解决这个问题，在 ES6 中就有了 `Promise` 和 `async/await` 方法。
目前看来 `async/await` 在异步写法上较为优雅。



### 第11天 (2019.09.29)

**总览：** 

- [html] [你对标签语义化的理解是什么？](https://github.com/haizlin/fe-interview/issues/31)
- [css] [css常用的布局方式有哪些？](https://github.com/haizlin/fe-interview/issues/32)
- [js] [简要描述下JS有哪些内置的对象](https://github.com/haizlin/fe-interview/issues/33)

1、【html】 你对标签语义化的理解是什么？

```txt
①去掉或者丢失样式的时候能够让页面呈现出清晰的结构；

②有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；

③方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；

④便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

```



2、【css】css常用的布局方式有哪些？

- 流式布局: 最基本的布局，就是顺着 html 像流水一样流下来
- 绝对定位: 利用 `position: absolute` 进行绝对定位的布局
- float 布局: 最初用来解决多栏布局的问题。比如圣杯、双飞燕的布局都可以用 `float` 来实现
- 珊格布局: bootstrap 用的布局，把页面分为 24 分，通过 row 和 col 进行布局
- flex 布局: css3 的布局可以非常灵活地进行布局和排版
- grid 布局: 网格布局



3.【js】简要描述下JS有哪些内置的对象？

> [JS所有内置对象属性和方法汇总](https://segmentfault.com/a/1190000011467723)

**JavaScript有3大对象，分别是本地对象、内置对象和宿主对象。** 

```txt
本地对象：这些引用类型在运行过程中需要通过new来创建所需的实例对象。
包含：Object、Array、Date、RegExp、Function、Boolean、Number、String等。

内置对象：内置对象是本地对象的子集。
包含：Global和Math。
ECMAScript5中增添了JSON这个存在于全局的内置对象。

宿主对象：对于嵌入到网页中的JS来说，其宿主对象就是浏览器提供的对象，浏览器对象有很多，如Window和Document等。
所有的DOM和BOM对象都属于宿主对象。

```



### 第12天 (2019.09.30)

**总览** ：

- [html] [常见的浏览器内核都有哪些？并介绍下你对内核的理解](https://github.com/haizlin/fe-interview/issues/34)
- [css] [说说你对css盒子模型的理解](https://github.com/haizlin/fe-interview/issues/35)
- [js] [写一个获取当前url查询字符串中的参数的方法](https://github.com/haizlin/fe-interview/issues/36)
- [软技能] [网页应用从服务器主动推送到客户端有那些方式？](https://github.com/haizlin/fe-interview/issues/37)



1、【html】常见的浏览器内核都有哪些？并介绍下你对内核的理解

**常见的浏览器内核：**

```txt
Trident内核：IE，360，搜过浏览器；
Gecko内核：Netscape6及以上版本，
Presto内核：Opera
Blink内核：Opera；
Webkit内核：Safari，Chrome

```



**介绍一下对浏览器内核的理解**

> 主要分成两个部分：渲染引擎(Render Engine)和 JS引擎。

**渲染引擎**：负责取得网页的内容(html,xml和图像等)，整理讯息(例如假如css)，以及计算网页的显示方式，然后输出到显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不同。所有网页浏览器、电子邮件客户端以及它需要编辑、显示网络内容的应用程序都需要内核。

**JS引擎**：解析和执行JavaScript来实现网页的动态效果。 

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向与只指渲染引擎。



2.【css】说说你对css盒子模型的理解？

> [面试官：谈谈你对 CSS 盒模型的认识?（你确定会？）](https://segmentfault.com/a/1190000015235886)

涉及知识点(层层递进):

> 1. 基本概念：标准模型+ IE模型(区别)
> 2. CSS如何设置这两种模型
> 3. JS如何设置获取盒子模型对应的宽和高
> 4. 实例题(根据盒模型解释边距重叠)
> 5. BFC(边距重叠解决方案)



**1.基本概念：标准模型+IE模型**

标准盒子模型：包括margin,border,padding,content,<u>并且content部分不包括其他部分</u>
IE盒子模型：包括margin,border,padding,content，<u>content包含了border和padding</u>

**2.css如何设置这两种模式**

标准盒模型：box-sizing:content-box
IE盒模型：box-sizing:border-box

**3.js如何设置获取盒子模型对应的宽和高**

1. dom.style.width:

> 只能获取内联样式，因此是不准确的

2. dom.currentStyle.width 

> 与window.getComputedStyle方法功能相同，实现在旧版本的IE浏览器中
> 3）window.getComputedStyle(dom).width:
> 方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性值。因此输出是准确的
> 4）dom.getBoundingClientRect().width
> 返回一个DOMRect对象，这个对象是由该元素的getClientRects()方法返回的一组矩形的集合。
> DOMRect对象包含了一组用于描述边框的只读属性--left,top,right,bottom,单位为像素。除了width和height外的属性都是相对于视口的左上角位置而言的。



3、【js】 写一个获取当前url查询字符串中的参数的方法 

```js
/*
	例如网址：http://zxinc520.com/?a=hello&b=world
	window.location.search = " ?a=hello&b=world "
*/ 

function params() {
  let search = window.location.search;
  search = search.substr(1, search.length);
  const res = {};
  if (!search) return res;
  search.split('&').map(item => {
    const [key, value] = item.split('=');
    res[key] = decodeURIComponent(value);
  });
  return res;
}

```

4、【软技能】 网页应用从服务器主动推送到客户端有那些方式？

```txt
1. html5 websocket
2. WebSocket 通过 Flash
3. XHR长时间连接
4. XHR Multipart Streaming
5. 不可见的Iframe
6. <script>标签的长时间连接(可跨域)

```



### 第13天 (2019.10.08)

总览：

- [html] [html5中的form怎么关闭自动完成？](https://github.com/haizlin/fe-interview/issues/38)
- [css] [::before和:after中单冒号和双冒号的区别是什么，这两个伪元素有什么作用？](https://github.com/haizlin/fe-interview/issues/39)
- [js] [说说你对javascript的作用域的理解](https://github.com/haizlin/fe-interview/issues/40)
- [软技能] [http都有哪些状态码？](https://github.com/haizlin/fe-interview/issues/41)



1、【html】 html5中的form怎么关闭自动完成？

```txt
h5新增的补全功能，菜鸟教程上写的比较含糊比较难懂；
解释： 在部分浏览器上，foucs输入框可以把之前输入过的值自动填入，如果不想自动填入，可以关掉它；
autocomplete="off"
默认是"on" 开启状态

一般业务下不会调整这个自动完成，因为对产品来说简化用户操作，建议打开

```



2、【css】::before和:after中单冒号和双冒号的区别是什么，这两个伪元素有什么作用？

```txt
:表示伪类，是一种样式，比如:hover, :active等
::表示伪元素，是具体的内容，比如::before是在元素前面插入内容，::after则是在元素后面插入内容，不过需要content配合，并且插入的内容是inline的。
:before和:after其实还是表示伪元素，在css3中已经修订为::before和::after了，只是为了能兼容IE浏览器，所以也可以表示成:before和:after

```

```txt
:: 和 : 是 CSS3 中为了区别伪类和伪元素所用的不同的写法。:: 表示伪元素，目前两种写法都被兼容。
::before,::after 可以在一个 DOM 元素的前面和后面增加一个伪元素。可以用来清除浮动、为元素增加特殊效果（如前面有特殊符号等）。
::before 和 ::after 默认添加的是 inlne 元素，通过 content 属性来设置展示的内容，并且必须要设置 content 属性。content 属性可以利用 attr 与元素的相关内容做联动。

```



3、【js】说说你对javascript的作用域的理解？

```txt
1、全局作用域。这个没啥说的，就是在顶层环境中申明的变量都是全局作用域，他们的属性其实都在window对象下面。

2、函数作用域。在函数内部定义的变量都是函数作用域，只能在函数中访问到，当然也可以通过闭包来访问。除此之外，在其他地方是没法访问函数内部的变量的。
局部作用域。es6中新增的特性，弥补了以前只能使用匿名及时运行函数来创建局部变量的缺陷。使用很简单，直接用let来申明变量就行。也可以使用const来申明变量，表明这是常数。

3、作用域链。要说清这个，需要首先明白javascript的代码运行过程。假设现在有个函数funcA，在该函数内部申明了一个局部变量a，在函数内部又定义了一个函数funcB，在函数B中申明了变量b。如下：
    function funcA () {
    let a;
    function funcB () {
    let b;
    }
    }
    
当进入funcA时，这时候会把变量a压入当前的作用域A中，并且将作用域A入栈，当进入funcB时，则会把变量b压入当前的作用域B中，并且将作用域B入栈，那么这时候栈中就有了作用域A和作用域B，当在funcB中查找某个变量时，会先从当前的作用域B中查找，如果没有的话，那么就根据栈中的作用域依次往上查找，这就是作用域链。

```



4、【软技能】http都有哪些状态码？

```txt
200 成功
301 重定向
304 (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
400 (错误请求) 服务器不理解请求的语法。
403 (禁止) 服务器拒绝请求。
404 (未找到) 服务器找不到请求的网页。
500 (服务器内部错误) 服务器遇到错误，无法完成请求。
501 (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
502 (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。
503 (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。
504 (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
505 (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。

常见状态码：
    2xx 成功
    3xx 重定向
    4xx 未找到资源
    5xx 服务器异常

```



### 第14天 (2019.10.09)

**总览** ：

- [html] [为什么HTML5只需要写<*!DOCTYPE HTML* >就可以？](https://github.com/haizlin/fe-interview/issues/42)
- [css] [position:fixed;在ios下无效该怎么办？](https://github.com/haizlin/fe-interview/issues/43)
- [js] [什么是闭包？优缺点分别是什么？](https://github.com/haizlin/fe-interview/issues/44)
- [软技能] [你最喜欢用哪些编辑器？喜欢它的理由是什么？](https://github.com/haizlin/fe-interview/issues/45)

1、【html】为什么HTML5只需要写<*!DOCTYPE HTML* >就可以？ 

**解析**： 

```txt
<!DOCTYPE>只是一个说明，用来告诉浏览器当前的html页面是用什么版本的html写的。
html4.01的<!DOCTYPE>引用了DTD（document type define），因为html4.01是基于SGML的，而它引用的DTD指明了html的规则，从而浏览器能正确的渲染页面。而html5不是基于SGML所以不需要引用DTD。

翻译一下：SGML，即一般标准标记语言，是一个用于定义文档标记语言标准的集合。
总结一下：因为html4是基于SGML这个标记语言的集合，既然是集合说明里面有各种的标准，那么DTD就是指出了当前html文件是用的是哪个SGML规则。
html5不存在这个问题，所以只需要简单的声明浏览器就可以正确渲染页面啦

```



2、【css】 position:fixed;在ios下无效该怎么办？

当采用 `fixed` 做吸底、吸顶布局时，如果触发键盘弹出事件则 `fixed` 属性会失效，布局就会被扰乱。其原因解释如下：

> 软键盘唤起后，页面的 fixed 元素将失效（即无法浮动，也可以理解为变成了 absolute 定位），所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。

第三方库 `isScroll.js` 可以解决此问题。  



3、【js】 什么是闭包？优缺点分别是什么？

**解析** ：

闭包是可以访问另一个函数作用域的函数。由于 `javascript` 的特性，外层的函数无法访问内部函数的变量；而内部函数可以访问外部函数的变量（即作用域链）。

```js
function a(){
	var b = 1;
	var c = 2;
	// 这个函数就是个闭包，可以访问外层 a 函数的变量
	return function(){
		var d = 3;
		return b + c + d;
	}
}

var e = a();
console.log(e());

```

因此，使用闭包可以隐藏变量以及防止变量被篡改和作用域的污染，从而实现封装。
而缺点就是由于保留了作用域链，会增加内存的开销。因此需要注意内存的使用，并且防止内存泄露的问题。



4、【软技能】 你最喜欢用哪些编辑器？喜欢它的理由是什么？

解析：

webstorm ： 喜欢它不需要理由！



### 第15天 (2019.10.10)

**总览：** 

- [html] [title与h1的区别、b与strong的区别、i与em的区别？](https://github.com/haizlin/fe-interview/issues/46)
- [css] [style标签写在body前和body后的区别是什么？](https://github.com/haizlin/fe-interview/issues/47)
- [js] [写一个数组去重的方法（支持多维数组）](https://github.com/haizlin/fe-interview/issues/48)
- [软技能] [对于加班你是怎么看的？](https://github.com/haizlin/fe-interview/issues/49)



1、【html】title与h1的区别、b与strong的区别、i与em的区别？

```txt
关于 title 和 h1，title 是网页的标题。主要面向的对象是搜索引擎和通过搜索结果过来的人（面向外人，可以理解为报纸首页的标题）。而 h1 是网页内部的标题，是给已经进到页面的人看的（可以理解为报纸某个版面的大标题）。从人类的语境上来理解，两者并没有差别。

b 与 strong 的效果人眼上是无法区分的。在语义上，b 仅表示加粗既装饰用，我们应该使用 CSS 而不应该使用 b；而 strong 则表示被包围的内容很重要，是语气上的感觉。对于搜索引擎来说，会把 b 和 strong 视为同一含义。因此我们在使用上需要注意。

i 与 em 的区别类似 b 和 strong 的区别。i 用于斜体展示，我们应该使用 CSS 而不应该使用 i；而 em 则是对内容的强调，但程度没有 strong 那么高。同样，对搜索引擎来说，两者是没有区别的。

```



2、【css】style标签写在body前和body后的区别是什么？

> 参考文章：
> [Will it be a wrong idea to have  in <*body* >?](https://softwareengineering.stackexchange.com/questions/224422/will-it-be-a-wrong-idea-to-have-style-in-body)
> [W3C The style element](https://www.w3.org/TR/html52/document-metadata.html#the-style-element)
> [什么是 FOUC？如何避免 FOUC？](https://www.cnblogs.com/xianyulaodi/p/5198603.html)
> [Understanding the Critical Rendering Path](https://bitsofco.de/understanding-the-critical-rendering-path/)

```txt
在 HTML4 的时候，不应该把 style 放到 body 中间。

浏览器在渲染页面时 DOM 和 CSSOM 是并行的，然后两者结合形成 Render Tree 显示页面。从直觉上来说，style 写在 body 前不会对 DOM 的渲染进行阻塞；而写在 body 内会对 DOM 渲染进行阻塞。会产生 FOUC（Flash of Unstyled Content) 的现象，既一瞬间的白屏或者样式的突然变化（原因是 Render Tree 重新生成了）。

不过 W3C 在 HTML5.2 的定义中对于 style 标签的使用的定义中是允许将 style 放到 body 中的。

Contexts in which this element can be used:
Where metadata content is expected.
In a noscript element that is a child of a head element.
In the body, where flow content is expected.

```



3、【js】写一个数组去重的方法（支持多维数组）

> [5种方法实现数组扁平化](https://juejin.im/post/5adc8e396fb9a07aa0479725)
>
> [7种方法实现数组去重](https://juejin.im/post/5aed6110518825671b026bed) 

```js
var arr=[[1,2,3],[4,5,6],[7,8,9,3,2]]
console.log(Array.from(new Set(arr.toString().split(',').map(Number)))  )
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

```



4、【软技能】对于加班你是怎么看的？

1. 首先，始终要以工作效率为首要目标，不能出现为了加班而故意降低白天的工作效率。
2. 其次，在保证了白天的工作效率以后，如果确实需要加班，则可以适度的加班，但不能超过10点，不然肯定影响第二天的效率。



### 第16天 (2019.10.11)

**总览：** 

- [html] [元素的alt和title有什么区别？](https://github.com/haizlin/fe-interview/issues/50)
- [css] [请描述margin边界叠加是什么及解决方案](https://github.com/haizlin/fe-interview/issues/51)
- [js] [返回到顶部的方法有哪些？把其中一个方法出来](https://github.com/haizlin/fe-interview/issues/52)
- [软技能] [你在的公司有没有做代码审查（CodeReview）？如果有是怎么做的？如果没有你觉得应该怎么做才更好？](https://github.com/haizlin/fe-interview/issues/53)

1、【html】元素的alt和title有什么区别？

**ALT 属性：**  

最常见用在 `<img>` 标签上，那我们先来看下 `<img>` 标签的 `alt` 属性。

`alt` 属性是一个必需的属性，它规定在图像无法显示时的替代文本。

假设由于下列原因用户无法查看图像，`alt` 属性可以为图像提供替代的信息：

- 网速太慢
- `src` 属性中的错误
- 浏览器禁用图像
- 用户使用的是屏幕阅读器

<*img* > 标签的 alt 属性指定了替代文本，用于在图像无法显示或者用户禁用图像显示时，代替图像显示在浏览器中的内容

**TITLE 属性： **

`title` 属性规定关于元素的额外信息。

这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）。

提示：`title` 属性常与 `form` 以及 `a` 元素一同使用，以提供关于输入格式和链接目标的信息。同时它也是 `abbr` 和 `acronym` 元素的必需属性。当然 `title` 属性是比较广泛使用的，可以用在除了`base`，`basefont`，`head`，`html`，`meta`，`param`，`script` 和 `title` 之外的所有标签。但是并不是必须的。

`title` 属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的。这样就使得访问者知道那些链接将会带他们到什么地方，他们就不会加载一个可能完全不感兴趣的页面。另外一个潜在的应用就是为图像提供额外的说明信息，比如日期或者其他非本质的信息。

2、【css】请描述margin边界叠加是什么及解决方案 

```txt
1，使用padding代替，但是父盒子要减去相应的高度
2，使用boder（透明）代替（不推荐，不符合书写规范，如果父盒子子盒子时有颜色的不好处理）
3，给父盒子设置overflow：hidden(如果有移除元素无法使用)
4，给父盒子设置1px的padding
5，给父盒子设置1px的透明border，高度减1px
6，子盒子使用定位position
7，子盒子浮动, 但是居中比较难以控制
8，给子盒子设置display: inline-block;
9，子盒子上面放一个table标签

```

3、【js】 返回到顶部的方法有哪些？把其中一个方法写出来

1. 锚点

使用锚点链接是一种简单的返回顶部的功能实现。该实现主要在页面顶部放置一个指定名称的锚点链接，然后在页面下方放置一个返回到该锚点的链接，用户点击该链接即可返回到该锚点所在的顶部位置

```html
<div id="topAnchor"></div>
<a href="#topAnchor">回到顶部</a>

```

2. scrollTop

　scrollTop属性表示被隐藏在内容区域上方的像素数。元素未滚动时，scrollTop的值为0，如果元素被垂直滚动了，scrollTop的值大于0，且表示元素上方不可见内容的像素宽度

　　由于scrollTop是可写的，可以利用scrollTop来实现回到顶部的功能

　　[注意]关于页面的scrollTop的兼容问题详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5831640.html#anchor4)

```js
function scrollTop(){
    if((document.body.scrollTop || document.documentElement.scrollTop) != 0){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}
btn.onclick = scrollTop;

```



3. [scrollTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo) 和  [window.scroll()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)

```js
window.scrollTo( 0, 1000 );

// 设置滚动行为改为平滑的滚动
window.scrollTo({ 
    top: 1000, 
    behavior: "smooth" 
});

```

```js
window.scroll({
  top: 100,
  left: 100,
  behavior: 'smooth'
});

```

4. [Window.scrollBy()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy)

> 在窗口中按指定的偏移量滚动文档。

向下滚动一页：

```js
window.scrollBy(0, window.innerHeight);

```

向上滚动一页：

```js
window.scrollBy(0, -window.innerHeight);

```

使用 options：

```js
window.scrollBy({   
  top: 100,
  left: 100,   
  behavior: "smooth" 
});

```



4.【软技能】你在的公司有没有做代码审查（CodeReview）？如果有是怎么做的？如果没有你觉得应该怎么做才更好？

```txt
1、有独立的代码审查部门，定期发送邮件给相关人员，里面有本部门全部项目的代码质量统计，在代码过差时依次向上级发通知
2、依据每个组内风格，有的组在每次合并生产环境都会review
3、总的来说代码审查是好事，但如果出现咸鱼池塘以及产品流程不规范导致迭代需求过多而不合理，会造成很多困扰，自身也可能流于形式，一定要结合实际情况来看

```



### 第17天 (2019.10.13)

**总览：** 

- [html] [你认为table的作用和优缺点是什么呢？](https://github.com/haizlin/fe-interview/issues/54)
- [css] [解释下 CSS sprites的原理和优缺点分别是什么？](https://github.com/haizlin/fe-interview/issues/55)
- [js] [typeof('abc')和typeof 'abc'都是string, 那么typeof是操作符还是函数？](https://github.com/haizlin/fe-interview/issues/56)
- [软技能] [说说你对SVN和GIT的理解和区别](https://github.com/haizlin/fe-interview/issues/57)



1、【html】你认为table的作用和优缺点是什么呢？

**解析：** 

```txt
优点：样式简单，构建方便，兼容良好
缺点：在于会多处非常多的 DOM 节点（想想一个 td 里面再来一个 table），会导致页面加载变慢、影响加载和渲染，维护麻烦，不利于 SEO（table 原本就不是用来布局的）。也因此，在 CSS 成熟之后，table 布局马上就变成历史了。

```



2、【css】解释下 CSS sprites的原理和优缺点分别是什么？

CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字精确的定位出[背景图片](https://baike.baidu.com/item/%E8%83%8C%E6%99%AF%E5%9B%BE%E7%89%87)的位置。

**优点：**

- 减少网页的http请求，大大的提高页面的性能
- 减少图片的字节
- 解决了网页设计师在图片命名上的困扰
- 更换风格方便，维护起来更加方便

**缺点：** 

- 在图片合并的时候，要留好足够的空间，防止板块内出现不必要的背景；最痛苦的是在宽屏，高分辨率的屏幕下的自适应页面，你的图片如果不够宽，很容易出现背景断裂；
- CSS Sprites在开发的时候比较麻烦，通过[photoshop](https://baike.baidu.com/item/photoshop)或其他工具测量计算每一个背景单元的精确位置



3、【js】typeof('abc')和typeof 'abc'都是string, 那么typeof是操作符还是函数？

`typeof` 是**操作符**，不是函数。可以添加括号，但是括号的作用是进行分组而非函数的调用。

> 参考自 <JavaScript 高级程序设计>



4、【软技能】 说说你对SVN和GIT的理解和区别 ？

**解析：**  [话说Svn与Git的区别](https://www.jianshu.com/p/bfec042349ca)

- **最核心的区别** ：Git是**分布式**SCM，而SVN是基于**服务器**的，也就是说每个开发者本地都有一套git库，每个人维护自己的版本（或者合并其他人的版本），而SVN是每个人写完代码后都及时的checkin到服务器上，进行合并。

- Git把内容按元数据方式存储，而SVN是按文件

- Git没有一个全局版本号，而SVN有：目前为止这是跟SVN相比Git缺少的最大的一个特征。

- Git的内容的完整性要优于SVN: GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。

- Git下载下来后，在OffLine状态下可以看到所有的Log,SVN不可以。

- 刚开始用时很狗血的一点，SVN必须先Update才能Commit,忘记了合并时就会出现一些错误，git还是比较少的出现这种情况。

- 克隆一份全新的目录以同样拥有五个分支来说，SVN是同时复製5个版本的文件,也就是说重复五次同样的动作。而Git只是获取文件的每个版本的 元素，然后只载入主要的分支(master)在我的经验,克隆一个拥有将近一万个提交(commit),五个分支,每个分支有大约1500个文件的 SVN,耗了将近一个小时！而Git只用了区区的1分钟！

- 版本库（repository):SVN只能有一个指定中央版本库。当这个中央版本库有问题时，所有工作成员都一起瘫痪直到版本库维修完毕或者新的版本库设立完成。而 Git可以有无限个版本库。

  .....

最后总结一下：

SVN的特点是简单，只是需要一个放代码的地方时用是OK的。

Git的特点版本控制可以不依赖网络做任何事情，对分支和合并有更好的支持(当然这是开发者最关心的地方)，不过想各位能更好使用它，需要花点时间尝试下。



### 第18天  (2019.10.14)

**总览：** 

- [html] [怎样在页面上实现一个圆形的可点击区域？](https://github.com/haizlin/fe-interview/issues/58)
- [css] [什么是FOUC？你是如何避免FOUC的？](https://github.com/haizlin/fe-interview/issues/59)
- [js] [你理解的"use strict";是什么?使用它有什么优缺点？](https://github.com/haizlin/fe-interview/issues/60)
- [软技能] [你如何看待团建的？你们团建一般都怎么实施？](https://github.com/haizlin/fe-interview/issues/61)

1、【html】怎样在页面上实现一个圆形的可点击区域？

- DOM 元素配合 `border-radius: 50%` 即可实现圆形点击区域。[例子](https://codepen.io/Konata9/pen/zgNJVy?editors=1111)
- 利用 `<map>` 和 `<area>` 标签设置圆形点击区域。参考文章:[HTML 标签及在实际开发中的应用](https://www.zhangxinxu.com/wordpress/2017/05/html-area-map/)
- 利用 SVG 作出圆形，然后添加点击事件。
- 如果在 `canvas` 上，就需要画出圆形，然后计算鼠标的坐标是否落在圆内。



2、【css】什么是FOUC？你是如何避免FOUC的？

**解析：** [什么是FOUC？如何避免FOUC？](https://www.cnblogs.com/xianyulaodi/p/5198603.html)

**什么叫做 FOUC 浏览器样式闪烁**

```txt
如果使用import方法对css进行导入,会导致某些页面在Windows 下的Internet Explorer出现一些奇怪的现象

以无样式显示页面内容的瞬间闪烁,

这种现象称之为文档样式短暂失效(Flash of Unstyled Content),简称为FOUC.

```

原因大致为：

1. 使用import方法导入样式表。
2. 将样式表放在页面底部
3. 有几个样式表，放在html结构的不同位置。

其实原理很清楚：当样式表晚于结构性html 加载，当加载到此样式表时，页面将停止之前的渲染。

此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

**解决方法** ：使用link标签将样式表放在文档head中



3、【js】 你理解的"use strict";是什么?使用它有什么优缺点？

**解析：**  [JavaScript 严格模式(use strict)](https://www.runoob.com/js/js-strict.html) 

> JavaScript 严格模式（strict mode）即在严格的条件下运行。

严格模式，其实就是更严格了

> 设立"严格模式"的目的，主要有以下几个：
>
> - 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
> - 消除代码运行的一些不安全之处，保证代码运行的安全；
> - 提高编译器效率，增加运行速度；
> - 为未来新版本的Javascript做好铺垫。

我放几个常见的吧，详情可以去下面的文章中看

1. 禁止this关键字指向全局对象 （严格模式下的 全局中的this 是undefined 不是window）
2. 禁止在函数内部遍历调用栈
3. 全局变量必须显式声明
4. arguments不再追踪参数的变化

```js
(function(){
	"use strict"
	b=1//Uncaught ReferenceError: b is not defined
})()

```

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode>
<http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html>



4、【软技能】你如何看待团建的？你们团建一般都怎么实施？

```txt
公司希望团建加强团队的凝聚力，大家可能在想：怎么可能能加强，吃喝玩乐，玩几个游戏就可以加强了？其实公司加强的是对公司有认可度的那群人的凝聚力，而不是那群打酱油，每天骂公司、摸鱼的那群人的凝聚力。
团建人太多了确实没太大的意义，更多就是完成公司的政治任务，对外宣传。我经常是参加团建的时候去认识公司的那些高级领导，和他们聊聊天，混个脸熟。后面我更多就带着小组的人一起出去浪，或者带着其他想和我们一起出去浪的同事出去浪，很多时候都是 AA 或者公司出一小部分，因为只要走公司账，他们经常玩不尽兴，总想着钱太少，玩的没意思，并且又有占便宜的心理，总之会玩的不舒服，所以很多时候我们都是自费出去玩。大家都是在外面打工的一群人，周末有很大一部分人想出去玩但是一个人不知道干啥，所以有一群人出去玩就会玩的比较好。
个人做法、看法，随意评价

```





### 第19天 (2019.10.16)

**总览：**

- [html] [说说你对html中的置换元素和非置换元素的理解](https://github.com/haizlin/fe-interview/issues/62)
- [css] [css的属性content有什么作用呢？有哪些场景可以用到？](https://github.com/haizlin/fe-interview/issues/63)
- [js] ["attribute"和"property"有什么不同？](https://github.com/haizlin/fe-interview/issues/64)
- [软技能] [最近都流行些什么？你经常会浏览哪些网站？](https://github.com/haizlin/fe-interview/issues/65)

1、【html】 说说你对html中的置换元素和非置换元素的理解 ？

**置换元素** 

置换元素是指：浏览器根据元素的标签和属性，来决定元素的具体显示内容。

例如：浏览器根据<*img* >标签的src属性显示图片。根据标签的type属性决定显示输入框还是按钮。



> 置换元素在其显示中生成了框，这也就是有的内联元素能够设置宽高的原因。

html中的<*img*><*input*><*textarea*><*select*><*object*>都是置换元素，这些置换元素往往没有实际内容，即是一个空元素。



**非置换元素** 

浏览器中的大多数元素都是不可置换元素，即其内容直接展示给浏览器。

例如<*label*>标签，<*p*>标签里的内容会被浏览器直接显示给用户。



2、【css】 css的属性content有什么作用呢？有哪些场景可以用到？

**解析：** [CSS属性content有什么作用呢？有哪些场景可以用到？](https://xiangshuo.blog.csdn.net/article/details/89843456) [MDN:content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content)

CSS的 `content` CSS 属性用于在元素的  [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) 和 [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after) 伪元素中插入内容。使用`content` 属性插入的内容都是匿名的*可替换元素。*

**场景：**

1. content: string value 字符串

   可以加入任何字符，包括 Unicode 编码等各种字符。

   ```html
   <a class="demo" href="https://www.xunlei.com/" title="精彩，一下就有">精彩，一下就有</a>
   
   .demo:after{
   	content: "↗"
   }
   
   ```

   

2. 我们还可以通过 `content` 内字符串的变化，实现类似 加载中… 的动画效果

   ```css
   .demo:after{
   	animation: dot 1.6s linear both;
   }
   @keyframe dot{
   	0%{ content: "." }
   	33%{ content: ".." }
   	66%{ content: "..." }
   	100%{ content: "." }
   }
   
   ```

   

![](https://img-blog.csdnimg.cn/20190508094105804.gif)

3. content: uri value 外部资源，用于引用媒体文件，图片，图标，SVG等。

```css
.demo:after{
	content: url(https://img-vip-ssl.a.88cdn.com/img/xunleiadmin/5b9889e14dcdc.png);
}

```



3、【js】 "attribute"和"property"有什么不同？

**attribute** 是我们在 **html** 代码中经常看到的键值对

```js
<input id="the-input" type="text" value="Name:" />

```

上面代码中的 input 节点有三个 attribute:

- id : the-input
- type : text
- value : Name:

**property** 是 attribute 对应的 DOM 节点的 对象属性 (Object field),

```js
HTMLInputElement.id === 'the-input'
HTMLInputElement.type === 'text'
HTMLInputElement.value === 'Name:'

```



**区别：**

```js
<input id="the-input" type="typo" value="Name:" /> // 在页面加载后,
我们在这个input中输入 "Jack"

```

让我们来看看上面这个 input 节点的 attribute 和 property:

```js
// attribute still remains the original value
input.getAttribute('id') // the-input
input.getAttribute('type') // typo
input.getAttribute('value') // Name:

// property is a different story
input.id // the-input
input.type //  text
input.value // Jack

```

可以看到, 在 attribute 中, 值仍然是 html 代码中的值. 而在 property 中, type 被自动修正为了 **text**, 而 value 随着用户改变 input 的输入, 也变更为了 **Jack**

**这就是 attribute 和 Property 间的区别:** 

attribute 会始终保持 html 代码中的初始值, 而 Property 是有可能变化的.

> 其实, 我们从这两个单词的名称也能看出些端倪:

**attribute** 从语义上, 更倾向于不可变更的

而 **property** 从语义上更倾向于在其生命周期中是可变的

**Attribute or Property 可以自定义吗?** ：attribute 可以 property 不行



4、【软技能】最近都流行些什么？你经常会浏览哪些网站？

慕课网、掘金、github、stackoverflow/segmentfault、Google、相关技术官网文档





### 第20天 (2019.10.17)

**总览：** 

- [html] [请描述HTML元素的显示优先级](https://github.com/haizlin/fe-interview/issues/66)
- [css] [要让Chrome支持小于12px的文字怎么做？](https://github.com/haizlin/fe-interview/issues/67)
- [js] [写一个验证身份证号的方法](https://github.com/haizlin/fe-interview/issues/68)
- [软技能] [你会手写原生js代码吗？](https://github.com/haizlin/fe-interview/issues/69)



1、【html】请描述HTML元素的显示优先级 

**解析：** [HTML元素的显示优先级](https://www.jianshu.com/p/868a7d16fb68) 

**帧元素>HTML元素优先，表单元素总>非表单元素优先**
层级显示优先级： `frameset > 表单元素 > 非表单元素`

- 表单元素包括：文本输入框，密码输入框，单选框，复选框，文本输入域，列表框等等；
- 非表单元素包括：连接（a），div,table,span等。

所有的html元素又可以根据其显示分成两类：有窗口元素以及无窗口元素。有窗口元素总是显示在无窗口元素的前面。
有窗口元素包括：select元素，object元素，以及frames元素等等。
无窗口元素：大部分html元素都是无窗口元素。

按照浏览器类型比较，HTML元素的显示次序也有所不同：



2、【css】要让Chrome支持小于12px的文字怎么做？

**解析：** 

Chrome 中有最小字号的限制，一般为 12px。原因是 Chrome 认为小于这个字号会影响阅读。

当需要小于 12px 字体的时候，有以下几个方法可以使用。

- -webkit-text-size-adjust:none; 这个属性在高版本的 Chrome 中已经被废除。

- 使用 `transform: scale(0.5, 0.5)`，但使用transform

  需要注意下面几点：

  - `transform` 对行内元素无效，因此要么使用 `display: block;` 要么使用 `display: inline-block;`
  - `transform` 即使进行了缩放，原来元素还是会占据对应的位置。因此需要做调整，最好是在外面再包一层元素，以免影响其他元素。

- 作为图片。

最好的办法还是进行切图，或者就不要使用小于 12px 的字体。



3、【js】 写一个验证身份证号的方法 

> 分析：身份证号码的组成：地址码6位+年份码4位+月份码2位+日期码2位+顺序码3位+校验码1位

**解析：** 

1. 粗暴型: 只考虑位数、最后的 x \d{17}[\dXx]
2. 一般型: /^\d{6}\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{3}[\dXx]$/



4、【软技能】你会手写原生js代码吗？

 **解析：** 

其实是要看你理解原生的定义了。不管现在用的什么框架，我们很多写的业务代码不都是原生的嘛。还有很多公用的方法，一般用的是原生的js。



### 第21天 (2019.10.18)

**总览：** 

- [html] [谈谈你对input元素中readonly和disabled属性的理解](https://github.com/haizlin/fe-interview/issues/70)
- [css] [说说你对line-height是如何理解的？](https://github.com/haizlin/fe-interview/issues/71)
- [js] [写一个方法验证是否为中文](https://github.com/haizlin/fe-interview/issues/72)
- [软技能] [来说说你对重绘和重排的理解，以及如何优化？](https://github.com/haizlin/fe-interview/issues/73)

1、【html】 谈谈你对input元素中readonly和disabled属性的理解  

**解析：** 

- 相同点：都会使文本框变成只读，不可编辑。
- 不同点：
  1.disabled属性在将input文本框变成只读不可编辑的同时，还会使文本框变灰，但是readonly不会。
  2.disabled属性修饰后的文本框内容，在不可编辑的同时，通过js也是获取不到的。但是用readonly修饰后的文本框内容，是可以通过js获取到的，也就只是简单的不可编辑而已！
  3.disabled属性对input文本框，单选radio,多选checkbox都适用，但是readonly就不适用，用它修饰后的单选以及多选按钮仍然是可以编辑状态的。

```txt
总结了前面老哥们的回答，再加上自己查了一下。

在表现上 readonly 和 disabled 都不能让用户对 input 进行编辑。但从含义上两者还是有较大的差别的。
readonly 直译为 “只读”，一般用于只允许用户填写一次的信息，提交过一次之后，就不允许再次修改了。

disabled 直译为 “禁用”，即这个 input 就是不允许填写和使用的（可能是因为权限或者其他原因）。
因此在外观上，readonly 与普通 input 无异，只是点击后无法进行编辑；而 disabled 的 input 呈灰色，也不允许点击。从这两点其实也可以看出，对于 input 的事件，readonly 会响应，而 disabled 是不响应的。并且在传输数据上，disabled 的数据是不会被获取和上传，readonly 的数据会被获取和上传。

```



2、【css】 说说你对line-height是如何理解的？

`line-height` 在日常用的最多的是让单行文字垂直居中（其实不需要设置 `height`，一个 `line-height` 即可）。因为 `line-height - font-size` 为行距，一般会近似平分到文字的上下两边，使文字看上去垂直居中。如果需要多行文字的垂直居中，还需要加上 `vertical-align: middle;`。

`line-height` 可以不设置单位，表示 `font-size` 的倍数。

另外对于非替换元素的纯内联元素，其高度是由 `line-height` 所决定的。



3【js】  写一个方法验证是否为中文

> 由于中文比较特殊，最稳妥的还是使用 `unicode` 来进行匹配。这两个 `unicode` 分别表示第一个和最后一个汉字。

```js
function isChinese(str) {
  const re = /^[\u4e00-\u9fa5]+$/;
  return re.test(str);
}

```



4、【软技能】来说说你对重绘和重排的理解，以及如何优化？

**重绘：** 

当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。
触发重绘的条件：改变元素外观属性。如：color，background-color，font-size等。

**重排(回流)：** 

当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。
重绘和重排的关系：在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为重绘。
所以，**重排必定会引发重绘，但重绘不一定会引发重排**。
　　触发重排的条件：任何页面布局和几何属性的改变都会触发重排，
比如：
　　1、页面渲染初始化；(无法避免)
　　2、添加或删除可见的DOM元素；
　　3、元素位置的改变，或者使用动画；
　　4、元素尺寸的改变——大小，外边距，边框；
　　5、浏览器窗口尺寸的变化（resize事件发生时）；
　　6、填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变；
触发重排的条件：改变元素的大小 位置 等如：width、height、pading、margin、position等，　添加删除DOM操作等
**重绘重排的代价：耗时，导致浏览器卡慢。**

**优化** 

1、浏览器自己的优化：浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。
2、我们要注意的优化：我们要减少重绘和重排就是要减少对渲染树的操作，则我们可以合并多次的DOM和样式的修改。并减少对style样式的请求。
（1）直接改变元素的className
（2）display：none；先设置元素为display：none；然后进行页面布局等操作；设置完成后将元素设置为display：block；这样的话就只引发两次重绘和重排；
（3）不要经常访问浏览器的flush队列属性；如果一定要访问，可以利用缓存。将访问的值存储起来，接下来使用就不会再引发回流；
（4）使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；
（5）将需要多次重排的元素，position属性设为absolute或fixed，元素脱离了文档流，它的变化不会影响到其他元素；
（6）如果需要创建多个DOM节点，可以使用DocumentFragment创建完后一次性的加入document；



### 第22天 (2019.10.20)

**总览：** 

- [html] [js放在html的``和``有什么区别？](https://github.com/haizlin/fe-interview/issues/74)
- [css] [说说浏览器解析CSS选择器的过程？](https://github.com/haizlin/fe-interview/issues/75)
- [js] [你对new操作符的理解是什么？手动实现一个new方法](https://github.com/haizlin/fe-interview/issues/76)
- [软技能] [前端工程师这个职位你是怎么样理解的？聊聊它的前景？](https://github.com/haizlin/fe-interview/issues/77)

1、【html】 js放在html的<*body*>和<*head* >有什么区别？

```txt
js 放在 <head> 中，如果不添加 async 或者 defer 时，当浏览器遇到 script 时，会阻塞 DOM 树的构建，进而影响页面的加载。当 js 文件较多时，页面白屏的时间也会变长。

在这个过程中，如果解析器遇到了一个脚本(script)，它就会停下来，并且执行这个脚本，然后才会继续解析 HTML。如果遇到了一个引用外部资源的脚本(script)，它就必须停下来等待这个脚本资源的下载，而这个行为会导致一个或者多个的网络往返，并且会延迟页面的首次渲染时间。

把 js 放到 <body> 里（一般在 </body> 的上面）时，由于 DOM 时顺序解析的，因此 js 不会阻塞 DOM 的解析。对于必须要在 DOM 解析前就要加载的 js，我们需要放在 <head> 中。

```



2、【css】说说浏览器解析CSS选择器的过程？

**解析：** 浏览器对于 CSS 选择器的解析过程是从右向左的。

```css
.class ul li span {
  // css 属性
}

```

如果是这样的一个结构，浏览器会从右向左开始解析。因为一般来说，最右侧的节点范围反而会比较大，越向左限定的条件就越多。也因此 CSS 的选择器设计上不宜嵌套过多，会带来性能上的问题。



3、【js】你对new操作符的理解是什么？手动实现一个new方法

**解析：** 

**new 的理解**

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

**new步骤**

模拟new操作前，要先知道new操作是发生了什么，就拿`new Object()`举例:

1. 创建一个新对象
2. 把新对象的原型指向构造函数的prototype
3. 把构造函数里的this指向新对象
4. 返回这个新对象

**构造函数：**

先准备一个构造函数来`new`使用。

```js
function constructorFunction(name, age){
  this.name = name;
  this.age = age;
}
constructorFunction.prototype.say = function(){
  return 'Hello '+ this.name
}

```

**原生new：**

```js
var obj = new constructorFunction('willian', 18)
console.log(obj.name, obj.age);//'willian', 18
console.log(obj.say())//Hello willian

```

**模拟new**

模拟的`new `暂称为`newNew `（囡..囡 哈哈~）
使用：`newNew(constructor, arg1, arg2, ..) `第0个参数传入构造函数，1~n个参数是构造函数的形参。
使用上面的构造函数试一下：

```js
function newNew(){
 var newObj = {}
 // 1. 创建一个新对象
 var Con = [].shift.call(arguments)
 // 得到构造函数
 newObj.__proto__ = Con.prototype;
 // 2. 把新对象的原型指向构造函数的prototype
 var res = Con.apply(newObj, arguments)
 // 3. 把构造函数里的this指向新对象
 return typeof res === 'object' ? res : newObj;
 // 4. 返回新对象
}
var obj = newNew(constructorFunction, 'willian', 18)
console.log(obj.name, obj.age);//'willian', 18
console.log(obj.say())//Hello willian

```

得到和new 一样的答案，说明模拟成功。
你也可以F12 打开控制台试一试。
以上参考：

1. [mqyqingfeng/Blog#13](https://github.com/mqyqingfeng/Blog/issues/13)
2. <https://blog.csdn.net/liwenfei123/article/details/80580883>



3、【软技能】 前端工程师这个职位你是怎么样理解的？聊聊它的前景？

```txt
广义的来说，只要涉及展示的都属于前端，包括各种系统，图片，动画，看得见就可以。从这个角度来说，前端永远不会被抛弃，会被淘汰的只有个体，因为个体是有极限，有局限的。
个人需要精确的定位，例如web工程师，也可以是电影特效工程师，工程师还分为软件硬件呢。

前景
具体到互联网行业的前端前景，在可见的范围内，前端承担的责任会增加而不是减少，保持进步就不会被淘汰，这点对于任何行业都一样，被抛弃的根本原因在于自身没有匹配需求的能力，而不是客观因素，那只是诱因，且必然发生。
话说本人是先从事一段时间后端才渐渐偏向前端的，正是因为看得见，便于分享的东西更吸引人。不是后端做不到，只是觉得旅途会更轻松一些

```

```txt
通过各种终端来向用户展示数据，或者给用户提供一些和后台的交互接口。
前景：首先，在我看来，一切和用户交互的终端都可以属于前端。并且随着现在跨端开发框架的兴起，比如Electron框架等，也使得前端的那套开发技术栈以及开发流程可以复制到桌面端来，使得前端的范畴越来越广泛。
并且，随着AR，VR技术的兴起，手机app中应用了大量的3维场景来提高用户体验，比如手机app上看房，看车，甚至是看一个城市的街景，都已经有了3D的场景，并且用户还能进行简单的操作。而这些都对前端提出了更高的要求

```



### 第23天（2019.10.21）

**总览：**

- [html] [关于`*form*`标签的编码类型属性你有一些了解？](https://github.com/haizlin/fe-interview/issues/78)
- [css] [说说CSS的优先级是如何计算的？](https://github.com/haizlin/fe-interview/issues/79)
- [js] [0.1 + 0.2、0.1 + 0.3和0.1 * 0.2分别等于多少？并解释下为什么？](https://github.com/haizlin/fe-interview/issues/80)
- [软技能] [说说一件或几件（介绍下除了工作外）你觉得能为你面试加分的事](https://github.com/haizlin/fe-interview/issues/81)



1、【html】 第23天关于<*form*>标签的enctype属性你有什么了解？

**解析：** 

`<form>`标签的`enctype`属性，用于控制表单上传的数据的编码格式。其值和HTTP请求的`Content-type`值相同。在数据提交到服务器之前，会以`enctype`值进行编码。

`enctype` 对应的值如下

| 值                              | 用法                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| 应用程序/ x-www-form-urlencoded | 默认值，预设所有字符转进行编码（将空格转换为“ +”符号，特殊字符转换为ASCII HEX值） |
| 多部分/表单数据                 | 不会对字符进行编码，当表单中有文件时必须要此编码             |
| 文字/纯文字                     | 将空格转换为“ +”符号，但不编码特殊字符                       |

参考文章：
[HTML `form` enctype属性](https://www.runoob.com/tags/att-form-enctype.html)



2、【css】说说CSS的优先级是如何计算的？

**解析：** [点击此处](https://github.com/ZhChen7/Technical-interview/blob/master/1%20HTML-CSS/1%20%20CSS%E6%9D%83%E9%87%8D%E5%8F%8A%E5%85%B6%E5%BC%95%E5%85%A5%E6%96%B9%E5%BC%8F.md)



3、【js】 0.1 + 0.2、0.1 + 0.3和0.1 * 0.2分别等于多少？并解释下为什么？

**解析：** 

> 用一句话概括就是：
>
> EcmaScrpt规范定义Number的类型遵循了IEEE754-2008中的64位浮点数规则定义的小数后的有效位数至多为52位导致计算出现精度丢失问题！

这个问题也算是经常遇到的面试题之一了，楼上说的对，简单来说就是js中采用IEEE754的双精度标准，因为精度不足导致的问题，只是二进制表示0.1时这这样表示`1001100110011...`（0011无线循环），那么这些循环的数字被js裁剪后，就会出现精度丢失的问题，也就造成了`0.1`不再是` 0.1 了`，而是变成了`0.100000000000000002`

我们可以来测试一下：

```js
0.100000000000000002 === 0.1//true

```

那么同样的，0.2在二进制也是无限循环的，被裁剪后也失去了精度变成了`0.200000000000000002`：

```js
0.200000000000000002 === 0.2 // true

```

由此我们可以得出：

```js
0.1 + 0.2 === 0.30000000000000004//true

```

所以自然`0.1+0.2!=0.3`。
那么如何解决这个问题；使用原生最简单的方法：

```js
parseFloat((0.1+0.2).toFixed(10)) === 0.3//true

```

参考：
深度剖析0.1 +0.2 === 0.30000000000000004的原因：[https](https://www.jianshu.com/p/d6b81e4e25e3) ://www.jianshu.com/p/d6b81e4e25e3



【软技能】 说说一件或几件（介绍下除了工作外）你觉得能为你面试加分的事

比如可以这么回答：

1. 每年都要跑满1000公里，已经坚持3年了
2. 我风雨无阻每天早上4：30起床坚持阅读，坚持了10年，已经习惯了！
3. 我坚持每周至少三次去锻炼身体
4. ……
   可以从坚持、勇敢、适应环境、担当、人际关系等个人性格特点方面回答。



### 第24天（2019.10.22）

**总览：** 

- [html] [说说你对属性data-的理解](https://github.com/haizlin/fe-interview/issues/82)
- [css] [你有用过CSS预处理器吗？喜欢用哪个？原理是什么？](https://github.com/haizlin/fe-interview/issues/83)
- [js] [如何快速让一个数组乱序，写出来](https://github.com/haizlin/fe-interview/issues/84)
- [软技能] [你经历过老板要求兼容IE吗？IE几？有什么感悟？](https://github.com/haizlin/fe-interview/issues/85)https://github.com/haizlin/fe-interview/issues/85)

1、【html】 说说你对属性data-的理解？

```txt
首先定义一下：data-是h5对自定义标签属性扩展的知识点，可以存储自定义属性，可以通过js获取到，一般会存储业务需要的数据，和vue中的bind很类似的
是暂存非用户输入的数据

```



2、【css】你有用过CSS预处理器吗？喜欢用哪个？原理是什么？

它能让你的CSS具备更加简洁、适应性更强、可读性更强、层级关系更加明显、更易于代码的维护等诸多好处。
CSS预处理器种类繁多，目前Sass、Less、用的比较多。
使用功能：
1、嵌套：反映层级和约束
2、变量和计算： 减少重复代码
3、Extend 和 Mixin 代码片段 (用的少)
4、循环：适用于复杂有规律的样式
5、import css 文件模块化
具体使用方法 均可百度



3、【js】如何快速让一个数组乱序，写出来

```js
// 如何快速让一个数组乱序，写出来
var arr= [1,2,3,4,5]
arr.sort(()=> Math.random()>0.5?1:-1)
console.log(arr);// 乱序

```



4、【软技能】 你经历过老板要求兼容IE吗？IE几？有什么感悟

```txt
IE6，7一年，IE8半年，IE9一直以来的最低标准。
近半年PC项目直接Chrome，移动端项目直接-webkit-
总结就是最近没有兼容问题，爽。
感受就是兼容确实没啥大问题，你知道了IE的兼容问题之后尽量避开和熟练掌握对应的hack方法，其实也没有特别恐怖，怎么说呢，就是解决问题吧。
稳住，我们能赢！

```



### 第25天 (2019.10.23)

**总览：** 

- [html] [请说说<*script*>、<*script async*>和<*script defer*>的区别 ](https://github.com/haizlin/fe-interview/issues/86)
- [css] [在页面中的应该使用奇数还是偶数的字体？为什么呢？](https://github.com/haizlin/fe-interview/issues/87)
- [js] [写一个判断设备来源的方法](https://github.com/haizlin/fe-interview/issues/88)
- [软技能] [说说你工作中遇到过比较难的技术问题是什么？是如何解决的？](https://github.com/haizlin/fe-interview/issues/89)



1、【html】  请说说<*script*>、<*script async*>和<*script defer*>的区别 

单纯的 `<script>` 会阻塞 DOM 的渲染，如果放在 `<head>` 标签中，对页面的显示会有延迟。如果是用过 `src` 引入外部资源时，浏览器会先停止解析下载外部资源，之后再执行其中的 `javaScript`（即立即加载并渲染）。

在添加 `async` 或者 `defer` 之后，`<script>` 的下载不会阻塞 DOM 的渲染。两者的区别如下：

- `async` 在脚本下载完成后立即执行（此时会阻塞 DOM 的渲染），并且多个 `async` 脚本存在时，执行的顺序取决于下载完成的顺序。因此对于有前后依赖关系的脚本（比如 jQuery 以及依赖 jQuery 的组件库，就不适合 `async`）
- `defer` 在的脚本执行放在 DOM 渲染之后（对于老的浏览器如果不支持 `defer` 就不行了）。并且多个脚本时，其执行顺序时按照引入顺序执行的。比较符合实际项目众多的需求，但为了兼容老版本浏览器，最佳的实践还是把 `<script>` 放在 `</body>` 前。

参考文章：
[スクリプトの非同期読み込み(async, defer の違い)](https://www.wakuwakubank.com/posts/614-javascript-async-defer/)
[defer 和 async 的区别](https://segmentfault.com/q/1010000000640869)



2、【css】 在页面中的应该使用奇数还是偶数的字体？为什么呢？

```txt
常用偶数号字体,但奇数号字体也没关系,例如 知乎正文使用15px字体,豆瓣电影使用13px字体
UI设计师导出的设计稿一般都是偶数号字体
偶数字号容易和页面其他标签的其他属性形成比例关系
Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，
而 13、15、17 px 时用的是小一号的点阵（即每个字占的空间大了 1 px，但点阵没变），于是略显稀
疏。(没试过)

```



3、【js】 写一个判断设备来源的方法 

> 根据navigator.userAgent 来判断

```js
 function deviceType(){
        var ua = navigator.userAgent;
        var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        for(var i=0, i<agent.length; i++){
            if(ua.indexOf(agent[i])>0){
                alert(agent[i])
                break
            }
        }
    }

```



4、【软技能】说说你工作中遇到过比较难的技术问题是什么？是如何解决的？

> 这是在面试中经常被问到的一个问题，目的是查看面试者解决问题的能力。这里不做详细的某个技术难点来讲，因为可能你认为很难得问题，在别人那里根本不是事，就讲一下回答这个问题的思路吧。
> 这里的问题代表某个bug或某个难搞的需求。

回答思路：

1. 问题出现的背景，比如说：‘在使用Vue开发xxx功能时中遇到xxx...’
2. 问题出现的原因在哪里，如果定位到的。比如：'在使用xx调试发现的问题出现在xx..'
3. 查找问题解决方法，比如：‘在xx论坛看到解决方法，在某某交流群内提问，询问身边(网上)的技术大佬’
4. 问题解决后达到了什么效果，比如：‘加载速度提升了约4倍，受到领导同事的一致好评..’
5. 问题解决后有什么感悟或收获，比如：‘原来使用xx方法就能xx，记录到我的bug-log中..’



### 第26天 (2019.10.24)

**总览：**

- [html] [解释下你对GBK和UTF-8的理解？并说说页面上产生乱码的可能原因](https://github.com/haizlin/fe-interview/issues/90)
- [css] [说说你对z-index的理解](https://github.com/haizlin/fe-interview/issues/91)
- [js] [说说bind、call、apply的区别？并手写实现一个bind的方法](https://github.com/haizlin/fe-interview/issues/92)
- [软技能] [你对Git的branch及工作流的理解是什么？](https://github.com/haizlin/fe-interview/issues/93)

1、【html】 解释下你对GBK和UTF-8的理解？并说说页面上产生乱码的可能原因

**gbk和utf8的理解** 

我们这里将以最简单最容易理解的方式来描述GBK和UTF8的区别，以及它们分别是什么。

GBK编码：是指中国的中文字符，其它它包含了简体中文与繁体中文字符，另外还有一种字符“gb2312”，这种字符仅能存储简体中文字符。

UTF-8编码：它是一种全国家通过的一种编码，如果你的网站涉及到多个国家的语言，那么建议你选择UTF-8编码。

**GBK和UTF8有什么区别？** 

UTF8编码格式很强大，支持所有国家的语言，正是因为它的强大，才会导致它占用的空间大小要比GBK大，对于网站打开速度而言，也是有一定影响的。

GBK编码格式，它的功能少，仅限于中文字符，当然它所占用的空间大小会随着它的功能而减少，打开网页的速度比较快。

2、【css】说说你对z-index的理解？

**z-index理解** 

当网页上出现多个由绝对定位（position:absolute）或固定定位（position:fixed）所产生的浮动层时，必然就会产生一个问题，就是当这些层的位置产生重合时，谁在谁的上面呢？或者说谁看得见、谁看不见呢？这时候就可以通过设置`z-index`的值来解决，这个值较大的就在上面，较小的在下面。

> `z-index`的意思就是在z轴的顺序，如果说网页是由x轴和y轴所决定的一个平面，那么z轴就是垂直于屏幕的一条虚拟坐标轴，浮动层就在这个坐标轴上，那么它们的顺序号就决定了谁上谁下了。

参考：

- 关于z-index 那些你不知道的事：<https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892> 
- MDN[z-index]： <https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index>  



3、【js】 说说bind、call、apply的区别？并手写实现一个bind的方法 

`call`和`apply`都是为了解决改变`this`的指向。作用都是相同的，只是传参的方式不同。

除了第一个参数外，`call`可以接收一个参数列表，`apply`只接受一个参数数组。 `bind`绑定完之后返回一个新的函数，不执行。

```js
Function.prototype.myCall = function (context = window) {
  context.fn = this;

  var args = [...arguments].slice(1);

  var result = context.fn(...args);
  // 执行完后干掉
  delete context.fn;
  return result;
}

```

```js
Function.prototype.myApply = function (context = window) {
  context.fn = this;

  var result
  // 判断 arguments[1] 是不是 undefined
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result;

```

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

```



4、【软技能】 你对Git的branch及工作流的理解是什么？

待续~





### 第27天 (2019.10.25)

**总览：** 

- [html] [说说你对影子(Shadow)DOM的了解](https://github.com/haizlin/fe-interview/issues/94)
- [css] [怎样修改chrome记住密码后自动填充表单的黄色背景？](https://github.com/haizlin/fe-interview/issues/95)
- [js] [说说你对arguments的理解，它是数组吗？](https://github.com/haizlin/fe-interview/issues/96)
- [软技能] [你为什么离职呢？](https://github.com/haizlin/fe-interview/issues/97)



1、【html】说说你对影子(Shadow)DOM的了解

> [影子节点ShadowDOM](https://juejin.im/post/59f2ef2d6fb9a045076ee831)

`Shadow DOM` 可以想象成我们在 Vue 或者 React 中使用的一个个组件，是一种将 HTML 结构、Style 封装起来的结构。我们熟悉的 `<video>` 标签，其实就是 `Shadow DOM` 的封装。

借用 MDN 上的图，可以看到 `Shadow DOM` 允许我们在 DOM 文档中插入一个 DOM 的子树。`Shadow Tree` 会挂在 `Shadow host` 对应的 DOM 上。之后，`Shadow DOM` 与外层 DOM 不会相互影响，因此可以放心用来做组件。

![](https://camo.githubusercontent.com/d64532b4dc47ac438a7a0614887f198e4d0f8dfa/68747470733a2f2f6d646e2e6d6f7a696c6c6164656d6f732e6f72672f66696c65732f31353738382f736861646f772d646f6d2e706e67)



具体的例子可以参考 MDN 给出的案例[``](https://github.com/mdn/web-components-examples/tree/master/popup-info-box-web-component)

这个例子告诉我们可以利用 `Shadow DOM` 封装自己的 `tag` 标签，并且可以在网页中使用。

参考文章：
[使用 shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
[神奇的 Shadow DOM](https://aotu.io/notes/2016/06/24/Shadow-DOM/index.html)

2、【css】怎样修改chrome记住密码后自动填充表单的黄色背景？

设置表单属性 autocomplete="off" 或者改变背景颜色为白色或透明



3、【js】说说你对arguments的理解，它是数组吗？

> `arguments`是一个对象。
>
> js不能像java一样实现重载，`arguments`对象可以模拟重载。
>
> js中每个函数都会有`arguments`这个实例，它引用着函数的实参，可以用数组下标的方式"[]"引用`arguments`的元素。`arguments.length`为函数实参个数，`arguments.callee`引用函数自身。
>
> arguments他的特性和使用方法

**特性：**

1. arguments对象和Function是分不开的。
2. 因为arguments这个对象不能显式创建。
3. arguments对象只有函数开始时才可用。

**使用方法：** 

虽然arguments对象并不是一个数组，但是访问单个参数的方式与访问数组元素的方式相同

例如：

arguments[0],arguments[1]...

```txt
arguments 不是数组，是类数组。
类数组 转 数组的方法有

[...arguments]
Array.from(arguments)
Array.prototype.slice.call(arguments)

```





### 第28天 (2019.10.26)

**总览：** 

- [html] [说说你对`<meta>`标签的理解](https://github.com/haizlin/fe-interview/issues/98)
- [css] [rgba()和opacity这两个的透明效果有什么区别呢？](https://github.com/haizlin/fe-interview/issues/99)
- [js] [解释下这段代码的意思！](https://github.com/haizlin/fe-interview/issues/100)
- [软技能] [在浏览器中输入url到页面显示出来的过程发生了什么？](https://github.com/haizlin/fe-interview/issues/101)

1、【html】  说说你对<*meta* >标签的理解

**解析：**[关于 HTML 中 meta 标签的理解和总结](https://juejin.im/entry/588074c62f301e00696b481d) 

**简介**

> 这儿采用英文版W3school的解释:
>
> The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.

不难看出，其中的关键是metadata，中文名叫元数据，是用于描述数据的数据。它不会显示在页面上，但是机器却可以识别。这么一来meta标签的作用方式就很好理解了。

**用处** 

meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务

**组成**

**1、name属性**

name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。
meta标签中name属性语法格式是：

```html
<meta name="参数" content="具体的描述">。

```

其中name属性共有以下几种参数。**(A-C为常用属性)**

- A. keywords(关键字)

  - 说明：用于告诉搜索引擎，你网页的关键字

  举例：

```html
<meta name="keywords" content="Lxxyx,博客，文科生，前端">

```

- B. description(网站内容的描述)

  - 说明：用于告诉搜索引擎，你网站的主要内容。

  举例：

  ```html
  <meta name="description" content="文科生，热爱前端与编程。目前大二，这是我的前端博客">
  
  ```

- C. viewport(移动端的窗口)

  - 说明：这个概念较为复杂，具体的会在下篇博文中讲述。
    这个属性常用于设计移动端网页。在用bootstrap,AmazeUI等框架时候都有用过viewport。

  举例（常用范例）：

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  ```

  

- D. robots(定义搜索引擎爬虫的索引方式)

  - 说明：robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。
    content的参数有all,none,index,noindex,follow,nofollow。默认是all

  举例：

  ```html
  <meta name="robots" content="none">
  
  ```

  具体参数如下：

  1.none : 搜索引擎将忽略此网页，等价于noindex，nofollow。
  2.noindex : 搜索引擎不索引此网页。
  3.nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
  4.all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。
  5.index : 搜索引擎索引此网页。
  6.follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。



- E. author(作者)

  - 说明：用于标注网页作者

  举例：

  ```html
  <meta name="author" content="Lxxyx,841380530@qq.com">
  
  ```

- F. generator(网页制作软件)

  - 说明：用于标明网页是什么软件做的

  举例: (不知道能不能这样写)：

  ```html
  <meta name="generator" content="Sublime Text3">
  
  ```

- G. copyright(版权)

  - 说明：用于标注版权信息

  举例：

  ```html
  <meta name="copyright" content="Lxxyx"> //代表该网站为Lxxyx个人版权所有。
  
  ```

- H. revisit-after(搜索引擎爬虫重访时间)

  - 说明：如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。
    举例：

  ```html
  <meta name="revisit-after" content="7 days" >
  
  ```

- I. renderer(双核浏览器渲染方式)

  - 说明：renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。

  ```html
  <meta name="renderer" content="webkit"> //默认webkit内核
  <meta name="renderer" content="ie-comp"> //默认IE兼容模式
  <meta name="renderer" content="ie-stand"> //默认IE标准模式
  
  ```



**2、http-equiv属性** 

> 这个我所认为的http-equiv意思的简介。
> `相当于HTTP的作用，比如说定义些HTTP参数啥的。`

meta标签中http-equiv属性语法格式是：

```html
<meta http-equiv="参数" content="具体的描述">

```

其中http-equiv属性主要有以下几种参数：

- A. content-Type(设定网页字符集)(推荐使用HTML5的方式)

  - 说明：用于设定网页字符集，便于浏览器解析与渲染页面

  ```html
  <meta http-equiv="content-Type" content="text/html;charset=utf-8">  //旧的HTML，不推荐
  
  <meta charset="utf-8"> //HTML5设定网页字符集的方式，推荐使用UTF-8
  
  ```

  

- B. X-UA-Compatible(浏览器采取何种版本渲染当前页面)

  - 说明：用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见。）

  举例：

  ```html
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE和Chrome使用最新版本渲染当前页面
  
  ```

  

- C. cache-control(指定请求和响应遵循的缓存机制)

**用法1.**

说明：指导浏览器如何缓存某个响应以及缓存多长时间。这一段内容我在网上找了很久，但都没有找到满意的。
最后终于在Google Developers中发现了我想要的答案。

![](https://user-gold-cdn.xitu.io/2017/1/19/5dc80e2e097679bc7c9822ccc293489c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

举例:

```html
<meta http-equiv="cache-control" content="no-cache">

```

共有以下几种用法：

1. no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
2. no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
3. public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
4. private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
5. maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。

> [参考链接：HTTP缓存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn#cache-control)

**用法2.(禁止百度自动转码)**

说明：用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。所以可以在head中加入例子中的那句话，就可以避免百度自动转码了。
举例：

```html
<meta http-equiv="Cache-Control" content="no-siteapp" />

```

- D. expires(网页到期时间)
  - 说明:用于设定网页的到期时间，过期后网页必须到服务器上重新传输。
    举例：

```html
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />

```



- E. refresh(自动刷新并指向某页面)
  - 说明：网页将在设定的时间内，自动刷新并调向设定的网址。
    举例:

```js
<meta http-equiv="refresh" content="2；URL=http://www.lxxyx.win/"> //意思是2秒后跳转向我的博客

```

- F. Set-Cookie(cookie设定)
  - 说明：如果网页过期。那么这个网页存在本地的cookies也会被自动删除。

```js
<meta http-equiv="Set-Cookie" content="name, date"> //格式

<meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT"> //具体范例

```



2、【css】 rgba()和opacity这两个的透明效果有什么区别呢？

1.`opacity` 是属性，`rgba()`是函数，计算之后是个属性值；
2.`opacity` 作用于元素和元素的内容，内容会继承元素的透明度，取值0-1；
3.`rgba()` 一般作为背景色 `background-color` 或者颜色 `color` 的属性值，透明度由其中的 `alpha` 值生效，取值0-1；

**扩展：**
1.`transparent` 也是透明，是个属性值，颜色值，跟`#000`是一类，不过它是关键字来描述。
2.如何隐藏一个元素？

```txt
回复@xiangshuo1992
隐藏元素可以从属性上进行隐藏，
display：none 通过定义自身的隐藏，并没有在页面存在dom节点，所以重新显示的时候，会导致页面重排。
visibility：hidden, 上面的不同，虽为隐藏，但在页面上还是有dom节点，个人认为比display：none较优。
opacity:1 透明度 给元素定义 隐藏、透明 是独立的透明属性,
transparent 透明颜色 是作为透明的颜色值使用，常见用在border隐藏做三角形,
rgba(0,0,0,1) 是颜色值的一种复合写法，既能显示颜色也能配合透明效果,
z-index=-1 定义层级属性若平常的页面显示为一，想看不到显示，可以把层级降低 用平常页面成为遮罩层，达到隐藏效果，换而言之，想突出一个元素也可把层级调大，类似于绝对定位的绝对效果。
, 还有一种是通过css3新增 用transform变化属性 rotate旋转 角度，也是可以达到隐藏效果，这里就涉及三维空间的思考。
欢迎大家，提出补充和有问题的地方。大家相互交流

```

```txt
@hbl045 visibility：hidden 视觉上隐藏了，但是DOM布局占位还在，所以有可能会影响现有的布局，应用场景并不多

隐藏元素也可以 transform: scale(0); 跟 visibility：hidden 一样，占位也是一直在的。
也可以设置宽高为零
还可以通过定位或者 translate 移出可视区域。

```





3、【js】解释下这段代码的意思！

```js
[].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) })

```

解析：

> 随机颜色获取：‘#’+(~~(Math.random() * (1 << 24))).toString(16)

**作用** 

> 在你的Chrome浏览器的控制台中输入这段代码，你会发现不同HTML层都被使用不同的颜色添加了一个高亮的边框。是不是非常酷？但是，简单来说，这段代码只是首先获取了所有的页面元素，然后使用一个不同的颜色为它们添加了一个1px的边框。

**解析** 

- `[].forEach.call() `=> 调用引用数组的forEach方法
- `$$('*') `=> `document.querySelectorAll('*')`
- `~~a` => `parseInt(a)`
- `1<<24` => 对二进数1小数点右移24位
- `(parseInt(Math.random()*(1<<24)).toString(16))` => 获得了一个位于`0-16777216`之间的随机整数，也就是随机颜色，再使用`toString(16)`将它转化为十六进制数。

```js
// $$('*') 为获取所有 dom 元素，返回数组
[].forEach.call($$("*"), function(a) {
  // forEach 的回调函数，这里的 a 是数组中每个 dom 元素，不是 a 标签
  a.style.outline =
    // ～～是取整 1<<24 是位运算 结果为 16777216
    // 之后的 toString(16) 为进行 16 进制的转换 即颜色
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});

```

因此这段代码的意思为，给页面所有 dom 元素添加随机颜色的边框。



4、【软技能】在浏览器中输入url到页面显示出来的过程发生了什么？ 

总体来说分为以下几个过程:  [从输入URL到页面加载发生了什么](https://segmentfault.com/a/1190000006879700)

1. DNS解析
2. TCP连接
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面
6. 连接结束



### 第29天 (2019.10.27)

**总览：** 

- [html] [你了解什么是无障碍web（WAI）吗？在开发过程中要怎么做呢？](https://github.com/haizlin/fe-interview/issues/102)
- [css] [请描述css的权重计算规则](https://github.com/haizlin/fe-interview/issues/103)
- [js] [写一个获取数组的最大值、最小值的方法](https://github.com/haizlin/fe-interview/issues/104)
- [软技能] [在工作中能让你最有成就感的是什么？并介绍下你最得意的作品吧](https://github.com/haizlin/fe-interview/issues/105)



1、【html】你了解什么是无障碍web（WAI）吗？在开发过程中要怎么做呢？

无障碍 web 是指能让视觉障碍的人也能根据屏幕阅读器的提示阅读网页。这一块只知道一个大致概念，国内使用较少（甚至还遇到过加了 `title` 被测试提 bug 的情况）

目前能想到的只有下面几点：

- 尽可能地使用语义化标签，如 `<section>`, `<article>` 等标签
- `img` 标签添加 `alt`
- `button` 或者按钮上添加 `title`
- 表单尽量使用 `label` for 可以和控件的 id 进行关联

参考文章：
[无障碍 Web](https://mp.weixin.qq.com/s/3QNXBpGB0ZiroV8OGnXCbA)



2、【css】 请描述css的权重计算规则

权重值计算

| 选择器                         | 案例          | 权重值   |
| ------------------------------ | ------------- | -------- |
| !important                     | !important    | Infinity |
| 内联样式                       | style=".."    | 1000     |
| ID                             | #id           | 100      |
| class                          | .class        | 10       |
| 属性                           | [type='text'] | 10       |
| 伪类                           | :hover        | 10       |
| 标签                           | p             | 1        |
| 伪元素                         | ::first-line  | 1        |
| 相邻选择器、子代选择器、通配符 | * > +         | 0        |

**比较规则：**

- 1000>100。也就是说从左往右逐个等级比较，前一等级相等才往后比。
- 在权重相同的情况下，后面的样式会覆盖掉前面的样式。
- 继承属性没有权重值
- 通配符、子选择器、相邻选择器等的。虽然权值为0，但是也比继承的样式优先。
- ie6以上才支持`important`，并且尽量少用它。



3、【js】 写一个获取数组的最大值、最小值的方法 

**解析：**

```js
Array.prototype.max = function() {
    return Math.max.apply(null, this)
}

```

es6:

```js
Math.max(...array)

```



4、【软技能】在工作中能让你最有成就感的是什么？并介绍下你最得意的作品吧 





### 第30天 (2019.10.28)

**总览：** 

- [html] [网页上的验证码是为了解决什么问题？说说你了解的验证码种类有哪些](https://github.com/haizlin/fe-interview/issues/106)
- [css] [描述下你所了解的图片格式及使用场景](https://github.com/haizlin/fe-interview/issues/107)
- [js] [写一个方法判断字符串是否为回文字符串](https://github.com/haizlin/fe-interview/issues/108)
- [软技能] [解释下CRLF是什么？](https://github.com/haizlin/fe-interview/issues/109)



1、【html】 网页上的验证码是为了解决什么问题？说说你了解的验证码种类有哪些

**解决的问题：** 

1. 防止机器行为，确定是人为操作，比如登陆、发帖等。
2. 保护服务器，比如12306买票的时候，各种抢购的时候。

**验证码的类型：** 

> 其实这种方式本质上是出于对系统的保护

1. 滑动
2. 手机验证码
3. 图形验证码



2、【css】 描述下你所了解的图片格式及使用场景

通常网页在显示的图片（图形）的时候，有以下几种格式：GIF、PNG、JPG、SVG，还有个比较新的WebP格式。

▍GIF

优点：GIF是动态的；支持无损耗压缩和透明度。

缺点：的详细的图片和写实摄影图像会丢失颜色信息；在大多数情况下，无损耗压缩效果不如 JPEG 格式或 PNG 格式；GIF 支持有限的透明度，没有半透明效果或褪色效果。

适用场景：主要用于比较小的动态图标。

▍PNG

优点：PNG格式图片是无损压缩的图片，能在保证最不失真的情况下尽可能压缩图像文件的大小；图片质量高；色彩表现好；支持透明效果；提供锋利的线条和边缘，所以做出的logo等小图标效果会更好；更好地展示文字、颜色相近的图片。

缺点：占内存大,会导致网页加载速度慢；对于需要高保真的较复杂的图像，PNG虽然能无损压缩，但图片文件较大，不适合应用在Web页面上。

适用场景：主要用于小图标或颜色简单对比强烈的小的背景图。

▍JPG

优点：占用内存小，网页加载速度快。

缺点：JPG格式图片是有损压缩的图片，有损压缩会使原始图片数据质量下降，即JPG会在压缩图片时降低品质。

适用场景：由于这种格式图片对色彩表现比较好，所以适用于色彩丰富的图片。主要用于摄影作品或者大的背景图等。不合适文字比较多的图片。

▍SVG

优点：SVG是矢量图形，不受像素影响，在不同平台上都表现良好；可以通过JS控制实现动画效果。

缺点：DOM比正常的图形慢，而且如果其结点多而杂，就更慢；不能与HTML内容集成。

适用场景：主要用于设计模型的展示等。

▍WebP

优点：WebP格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有JPEG的2/3，并能节省大量的服务器宽带资源和数据空间。

缺点：相较编码JPEG文件，编码同样质量的WebP文件需要占用更多的计算资源。

适用场景：WebP既支持有损压缩也支持无损压缩。将来可能是JPEG的代替品。



3、【js】写一个方法判断字符串是否为回文字符串

> 考点：正则表达式、数组API

```js
var isPalindrome = function(s) {
  if (s.length === 1) return true
  const str = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  const strReverse = str.split('').reverse().join('')
  return str === strReverse
};

```



4、【软技能】 解释下CRLF是什么？

> CRLF 是carriagereturnlinefeed的缩写。中文意思是回车换行。





### 第31天 (2019.10.29)

**总览：**

- [html] [DOM和BOM有什么区别？](https://github.com/haizlin/fe-interview/issues/110)
- [css] [让网页的字体变得清晰，变细用CSS怎么做？](https://github.com/haizlin/fe-interview/issues/111)
- [js] [写一个方法把0和1互转（0置1，1置0）](https://github.com/haizlin/fe-interview/issues/112)
- [软技能] [对于有压力时，你是怎么抗压的？](https://github.com/haizlin/fe-interview/issues/113)



1、【html】 DOM和BOM有什么区别？

> BOM是Browser Object Model的缩写，即浏览器对象模型。DOM是Document Object Model的缩写，即文档对象模型。他们都是浏览器提供给JavaScript的API接口。

**BOM指 浏览器对象模型** 

提供了独立于内容而与浏览器窗口进行交互的对象。描述了与浏览器进行交互的方法和接口，可以对浏览器窗口进行访问和操作，譬如可以弹出新的窗口，改变状态栏中的文本。

**DOM指 文档对象模型** 

DOM 是针对 HTML 的基于树的 API。描述了处理网页内容的方法和接口，是 HTML 的API，DOM 把整个页面规划成由节点层级构成的文档。

注意: 只有 JS 的宿主环境是浏览器的时候才有 DOM 和 BOM ，在 Node 中是没有这两个对象的。

![mark](http://static.zxinc520.com/blog/20191029/g9qOHtCPLxyr.png?imageslim)



2、【css】 让网页的字体变得清晰，变细用CSS怎么做？

**解析：** 

- 第一个反应是想到 `font-weight: lighter;` ，简单测试了下，是有效的，不过没有多平台测试。
- 第二个想到的是 `font-family` 设置偏细的字体
- 第三个是在重置样式里见过，针对MAC，IOS平台，有个 `-webkit-webkit-font-smoothing: antialiased` 样式。





3、【js】 写一个方法把0和1互转（0置1，1置0）

> 学学 js里面中的特殊符号用法，了解写

定义 `var a`：

- !a && 1 || 0 ;
- ~a+2
- +!a
- a === 1 ? 0 : 1  （ 三元表达式 ）



4、【软技能】 对于有压力时，你是怎么抗压的？

现代人有点压力的正常的，我觉得抗压也是每一个成年人都要掌握的。
或者说排解压力比较准确吧，每个人都不一样，这里我就分享自己的解压方式吧。
解压方式：

1. 听歌，压力大的时候在网易云上听会自己喜欢的歌。
2. 运动，如果有时间就去运动吧，有时间就去打球、跑步，运动完之后一天的压力和疲惫都会减轻了很多。
3. 找朋友倾诉，记住要找知心朋友，尽量不要找家人，不要让家人担心。

**其实我觉得最重要的一点是：提高自己的能力，让那些对你有压力的事情变得简单，你自然就不会有压力的。**





### 第32天 (2019.10.30)

**总览：** 

- [html] [说说你对HTML元素的显示优先级的理解](https://github.com/haizlin/fe-interview/issues/114)
- [css] [说下line-height三种赋值方式有何区别？](https://github.com/haizlin/fe-interview/issues/115)
- [js] [造成内存泄漏的操作有哪些？](https://github.com/haizlin/fe-interview/issues/116)
- [软技能] [你在上一家公司工作流程是怎么样的，如何与其他人协作的？是怎样跨部门合作的？](https://github.com/haizlin/fe-interview/issues/117)



1、【html】 说说你对HTML元素的显示优先级的理解

**解析：** [HTML元素的显示优先级](https://www.jianshu.com/p/868a7d16fb68)   <u>与20题一样</u>

**考点**： [frameset](https://www.icode9.com/tags-frameset-0.html),[优先级](https://www.icode9.com/tags-%E4%BC%98%E5%85%88%E7%BA%A7-0.html),[元素](https://www.icode9.com/tags-%E5%85%83%E7%B4%A0-0.html),[html](https://www.icode9.com/tags-html-0.html),[表单](https://www.icode9.com/tags-%E8%A1%A8%E5%8D%95-0.html),[面试](https://www.icode9.com/tags-%E9%9D%A2%E8%AF%95-0.html),[HTML](https://www.icode9.com/tags-HTML-0.html),[窗口](https://www.icode9.com/tags-%E7%AA%97%E5%8F%A3-0.html)

**帧元素>HTML元素优先，表单元素总>非表单元素优先**
层级显示优先级： `frameset > 表单元素 > 非表单元素`

- 表单元素包括：文本输入框，密码输入框，单选框，复选框，文本输入域，列表框等等；
- 非表单元素包括：连接（a），div,table,span等。

所有的html元素又可以根据其显示分成两类：有窗口元素以及无窗口元素。有窗口元素总是显示在无窗口元素的前面。
有窗口元素包括：select元素，object元素，以及frames元素等等。
无窗口元素：大部分html元素都是无窗口元素。

按照浏览器类型比较，HTML元素的显示次序也有所不同：



2、【css】说下line-height三种赋值方式有何区别？

```html
<div class="parent1">
    <div class="child">line-height: 1.5em;</div>
</div>
<div class="parent2">
    <div class="child">line-height: 1.5;</div>
</div>

```



![](https://user-gold-cdn.xitu.io/2018/1/28/1613cfa1c9610935?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到，当设置`line-height: 1.5em`时，很明显子div的文字已经超出自己的行高范围了，设置`line-height: 1.5`时子div的文字没有超出自己的行高。

这是由于CSS继承时的计算方式区别造成的，如示例，当我们给类名为parent1的父div设置`line-height：1.5em`时，该div的`font-size`为14，此时经过计算父div的`line-height`为14px*1.5=21px，然后子div的`line-height`就会继承21px这个值，而子div的`font-size`为26px，自然会超出自己的行高范围。

而当我们给类名为parent2的父div设置`line-height：1.5`时，子div会直接继承`line-height：1.5`，然后计算26px*1.5=39px，不会超出自己的行高范围。

经过测试`line-height: 150%`和`line-height: 1.5em`相同，都是先计算然后把固定的行高继承给子元素，所以我们可以总结一下，**继承line-height的时候，带单位的先计算再继承，不带单位的直接继承**。



3、【js】 造成内存泄漏的操作有哪些？

**解析：** [JS哪些操作会造成内存泄漏？](https://www.jianshu.com/p/763ba9562864)

现在的GC好像是越来越牛逼了，有时候感觉无效的闭包都能被回收掉（还没有做过测试）

1. 意外的全局变量引起的内存泄漏
2. 闭包引起的内存泄漏（主要是**循环引用** ，其实和 **闭包**的关系不大）
3. 没有清理的DOM元素
4. 被遗忘的定时器或者回调
5. 子元素存在引用引起的内存泄漏



### 第33天 (2019.10.30)

**总览：** 

- [html] [html和html5有什么区别呢？](https://github.com/haizlin/fe-interview/issues/118)
- [css] [用CSS绘制一个三角形](https://github.com/haizlin/fe-interview/issues/119)
- [js] [说说你对this的理解](https://github.com/haizlin/fe-interview/issues/120)
- [软技能] [你对全栈工程师的理解是什么？](https://github.com/haizlin/fe-interview/issues/121)



1、【html】html和html5有什么区别呢？

1. HTML5简化了很多细微的语法，例如doctype的声明，只需要写<!doctype html>就行了。HTML5与HTML5，XHTML1兼容，但是与SGML不兼容。
2. 新增与语义化标签【header、footer、section、article等】
3. canvas替代Flash

```txt
html4一下是基于SGML（标准通用标记语言）的，H5不是，因为HTML要写很长的DTD规范描述，H5不用写
H5在HTML基础上增加了很多语义化的标签以及canvas和svg，媒体等的支持

```



2、【css】 用CSS绘制一个三角形 

```css
.triangle{
    width: 0;
    border-bottom: 35px solid lightgreen;
    border-left: 35px solid transparent;
}

```



3、【js】说说你对this的理解？

基本上可以归为四类，

- 全局this 是window （默认指向）
- 函数this 是调用者  （隐式指向）
- call 和 apply bind的this第一个参数 （显示指向）
- 构造函数的this 是new 之后的新对象 （构造器）



4、【软技能】 你对全栈工程师的理解是什么？ 

首先，我对于全栈工程师的要求很高。

1. 独立完成页面
2. 独立完成接口
3. 超强学习能力



### 第34天 (2019.10.31)

**总览：** 

- [html] [Standards模式和Quirks模式有什么区别？](https://github.com/haizlin/fe-interview/issues/122)
- [css] [浏览器是怎样判断元素是否和某个CSS选择器匹配？](https://github.com/haizlin/fe-interview/issues/123)
- [js] [请用canvas写一个关于520浪漫表白的代码](https://github.com/haizlin/fe-interview/issues/124)
- [软技能] [你了解什么是技术债务吗？](https://github.com/haizlin/fe-interview/issues/125)



1、【html】 Standards模式和Quirks模式有什么区别？

解析：

后来查了下是浏览器渲染模式，最大区别还是盒模型的解释吧

标准盒模型：元素内容的宽度 = width ；元素的实际宽度= width+ 2*padding + 2*border

怪异盒模型：元素内容宽度 = width - border 2 - paddin 2 ；实际宽度 = width



2、【css】浏览器是怎样判断元素是否和某个CSS选择器匹配？

先产生一个元素集合，然后从后往前判断；

> 浏览器先产生一个元素集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到真个选择器都匹配完，还在集合中的元素就匹配这个选择器了。

**举个例子：**

有选择器：
`div.ready #wrapper > .bg-red`
先把所有元素 `class` 中有 `bg-red` 的元素拿出来组成一个集合，然后上一层，对每一个集合中的元素，如果元素的 `parent id `不为 `#wrapper `则把元素从集合中删去。 再向上，从这个元素的父元素开始向上找，没有找到一个 `tagName` 为 `div` 且 `class` 中有 `ready` 的元素，就把原来的元素从集合中删去。
至此这个选择器匹配结束，所有还在集合中的元素满足。大体就是这样，不过浏览器还会有一些奇怪的优化。
如图：

![](https://user-images.githubusercontent.com/29278068/57994240-c9535e80-7aee-11e9-8f26-9b660fb478b9.jpg)

**注意：** 

1、为什么从后往前匹配因为效率和文档流的解析方向。效率不必说，找元素的父亲和之前的兄弟比遍历所哟儿子快而且方便。关于文档流的解析方向，是因为现在的` CSS`，一个元素只要确定了这个元素在文档流之前出现过的所有元素，就能确定他的匹配情况；应用在即使 `html` 没有载入完成，浏览器也能根据已经载入的这一部分信息完全确定出现过的元素的属性。

2、为什么是用集合主要也还是效率。基于` CSS Rule` 数量远远小于元素数量的假设和索引的运用，遍历每一条 `CSS Rule` 通过集合筛选，比遍历每一个元素再遍历每一条 `Rule` 匹配要快得多。



3、【js】 请用canvas写一个关于520浪漫表白的代码 ？

解析：  嘻嘻嘻~~老衲  阿弥陀佛



4、【软技能】  你了解什么是技术债务吗？

> [参考](https://github.com/haizlin/fe-interview/issues/125)





### 第35天 (2019.11.01)

**总览：** 

- [html] [用一个div模拟textarea的实现](https://github.com/haizlin/fe-interview/issues/128)
- [css] [使用flex实现三栏布局，两边固定，中间自适应](https://github.com/haizlin/fe-interview/issues/129)
- [js] [请你解释一个为什么10.toFixed(10)会报错？](https://github.com/haizlin/fe-interview/issues/130)
- [软技能] [谈一谈你知道的前端性能优化方案有哪些？](https://github.com/haizlin/fe-interview/issues/131)

1、【html】 用一个div模拟textarea的实现 

**解析：** 

```html
 <style>
        .edit{
            width: 300px;
            height: 200px;
            padding: 5px;
            border: solid 1px #ccc;
            resize: both;
            overflow:auto;
        }
    </style>
<div class="edit" contenteditable="true">
    这里是可以编辑的内容，配合容器的 overflow ，多行截断，自定义滚动条，简直好用的不要不要的。
</div>

```



2、【css】 使用flex实现三栏布局，两边固定，中间自适应

```html
<style>
    .box {
        display: flex;
    }
    .left, .right {
        width: 100px;
        height: 100px;
        background: red;
        flex: 0 0 auto;
    }
    .middle {
        flex: 1 1 auto;
        width: 100%;
        height: 100px;
        background: salmon;
    }
</style>

<div class="box">
    <div class="left"></div>
    <div class="middle"></div>
    <div class="right"></div>
</div>

```



3、【js】 请你解释一个为什么10.toFixed(10)会报错？

之所以会报错，是因为在这里的 `.` 发生了歧义，它既可以理解为小数点，也可以理解为对方法的调用。
因为这个点紧跟于一个数字之后，按照规范，解释器就把它判断为一个小数点。

所以我们可以这样修改下：

```js
(10).toFixed(10
10..toFixed(10)
10 .toFixed(10)
10.0.toFixed(10)

```

当然出现这个报错是因为前面这个数是整数，如果本来就是小数就不会出现这个报错。



4、【软技能】 谈一谈你知道的前端性能优化方案有哪些？

这个优化的范围挺大，但是总归可以分为 **服务端优化** 和 **客户端优化** 。

> 整理如下

**客户端优化** 

- 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
- 使用CSS雪碧图（CSS Sprites）CSS Sprites一句话：将多个图片合并到一张单独的图片，这样就大大减少了页面中图片的HTTP请求。
- 减少DOM操作次数，优化javascript性能。
- 少用全局变量、减少DOM操作、缓存DOM节点查找的结果。减少IO读取操作。
- 延迟加载 | 延迟渲染
- 图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。
- 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。

**服务端优化** 

- 尽量减少响应的体积，比如用 gzip 压缩，优化图片字节数，压缩 css 和 js；或加快文件读取速度，优化服务端的缓存策略。
- 客户端优化 dom、css 和 js 的代码和加载顺序；或进行服务器端渲染，减轻客户端渲染的压力。
- 优化网络路由，比如增加 CDN 缓存；或增加并发处理能力，比如服务端设置多个域名，客户端使用多个域名同时请求资源，增加并发量。

**最后** 

　　对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。
　　减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

涉及的知识点太多，从客户端浏览器、渲染机制、缓存、 网络请求、代码压缩合并、图片格式、服务器代理、数据库的查询.....
暂时只能想到这么多，觉得自己答得并不是很好，希望有大佬回答一下这个问题。

```txt
缓存
http缓存 设置好cache-control expires Last-modified；
前端缓存 对于一些页面今天配置直接存储到localStorage中；对于长期不发生改变的代码可以直接通过server-work存储到本地；

优化加载
webpack 开启 tree-shaking 减少代码体积
通过preload prefetch优化加载资源的时间
import('').then()异步加载资源
图片小于30k的图片直接做成base64；
对于首屏的样式可以直接内嵌到html中；

服务端渲染
SSR
对于首页可以直接通过node jade模板引擎输出，其他页面继续使用前端渲染，优化首屏、SEO

```



### 第36天 (2019.11.02)

**总览：** 

- [html] [HTML与XHTML二者有不同?](https://github.com/haizlin/fe-interview/issues/132)
- [css] [写出主流浏览器内核私有属性的css前缀](https://github.com/haizlin/fe-interview/issues/133)
- [js] [请手写一个幻灯片的效果](https://github.com/haizlin/fe-interview/issues/134)
- [软技能] [对于前端安全，你了解多少？说说你对XSS和CSRF的理解](https://github.com/haizlin/fe-interview/issues/135)



1、【html】 HTML与XHTML二者有不同？

**解析：** [HTML、XML、XHTML 有什么区别](https://www.jianshu.com/p/8e65f98980bb) 

**定义：** 

- HTML：HyperText Markup Language / 超文本标记语言
- XML: Extensible Markup Language / 可扩展标记语言
- XHTML: Extensible Hypertext Markup Language / 可扩展超文本标记语

**作为一个前端，最熟悉是就是 HTML 了，所以我们先从 HTML 说起。** 

HTML 是用来描述和定义网页内容的标记语言，是构成网页的最基本的东西。
 所谓超文本，就是说它除了能标记文本，还能标记其他的内容，比如：图片，链接，音频，视频等。
 它的作用就是一个规范，告诉所有浏览器都统一标准，比如我给这段文字加个 `<p>` 标签，那就是告诉浏览器：这是一个段落。我加个 `<img>` 标签：这是一张图片，别弄错了。浏览器看到后，就会正确解析，产生相应的行为。

**然后说一下 XML** 

它的表现形式就是给一个文档加一堆标签，说明每段文字是干什么的，有什么意义。这样做的目的是方便存储、传输、分享数据，人和机器都可以很方便的阅读。XML 和 HTML 有一个明显的区别就是：HTML 的标签都是预定义的，你不可以自己随便增加，比如你不能自造一个标签叫 `<nihao>`, 但是 XML 可以，你可以自己“发明”标签————这也是“可扩展的”一个含义。

**HTML 和 XML 一结合，就产生了 XHTML** 

XHTML 就是以 XML 的语法形式来写 HTML.
 XHTML 出现的原因是：HTML 是一种语法形式比较松散的标记语言，语法要求也不严格。比如大小可以混用，属性值随便你加不加引号，单引号还是双引号也随便你，标签也可以不闭合。HTML 标准的制定者 W3C 一看这样下去不行，所谓无规矩不成方圆，所以就把 XML 的语法形式往 HTML 上一套，出现了 XHTML，所以你也可以把 XHTML 理解为 HTML 的严格语法形式，除此之外，其它方面基本一样。
 比如 XHTML 有一些强制的要求，如下：

1. 必须包含一个文件头声明 `<!DOCTYPE>` 
2. 所有元素名必须小写
3. 所有空元素必须关闭
4. 所有属性名必须小写
5. 所有属性值必须加引号
6. 所有布尔值属性必须加上属性值



2、【css】  写出主流浏览器内核私有属性的css前缀

完善一下：现在用 scss 等预处理器用多了，前缀确实不怎么关注了。

-webkit- (谷歌, Safari, 新版 Opera 浏览器等)
-moz- (火狐浏览器)
-o- (旧版 Opera 浏览器等)
-ms- (IE 浏览器 和 Edge 浏览器)



3、【js】 请手写一个幻灯片（轮播）的效果

**思路一** ：元素并排浮动 改变offset
**思路二** ：position 层叠 改变z-Index



4、【软技能】 对于前端安全，你了解多少？说说你对XSS和CSRF的理解？

**解析：** [源地址](https://github.com/YvetteLau/Blog/issues/33) 

- xss 输入+脚本
- csrf 偷信息伪造请求



### 第37天 (2019.11.02)

**总览：** 

- [html] [html5哪些标签可以优化SEO?](https://github.com/haizlin/fe-interview/issues/136)
- [css] [不使用border画出1px高的线，在不同浏览器的标准和怪异模式下都能保持效果一样](https://github.com/haizlin/fe-interview/issues/137)
- [js] [找到字符串中最长的单词，并返回它的长度](https://github.com/haizlin/fe-interview/issues/138)
- [软技能] [如果让你快速使用一门你不熟悉的新技术，你该怎么办？](https://github.com/haizlin/fe-interview/issues/139)



1、【html】 html5哪些标签可以优化SEO?

**解析：**

meta信息中的title，description，keyword。尽量使用语义化的标签，不要都是div

优化 SEO 应该是可以给爬虫有比较明确的含义的标签。尽可能地不要使用 `div` 到底。

- meta: meta 标签中的 keywords 和 description
- h1-h6
- nav
- section
- article
- footer
- header



2、【css】不使用border画出1px高的线，在不同浏览器的标准和怪异模式下都能保持效果一样

**解析：** 

```html
<hr size="1">
<div style="height: 1px; width: 100%;background: black"></div>

```



3、【js】 找到字符串中最长的单词，并返回它的长度

```js
const str = 'aaa b cc, hello word'
str.split(/\s|,/).reduce((acc, cur) => acc > cur.length ? acc : cur.length)

```



4、【软技能】如果让你快速使用一门你不熟悉的新技术，你该怎么办？

我现在的做法：
1、一定先去官网查看官方文档和API，其他别人写的教程无视。
2、下载官方Demo运行学习。
3、自己练习1~2个Demo，涵盖常用的重要的API的使用，实践学习理解，有问题就谷歌。
4、运用到项目中。



### 第38天 (2019.11.04)

**总览：** 

- [html] [说说你对cookie和session的理解](https://github.com/haizlin/fe-interview/issues/140)
- [css] [实现单行文本居中和多行文本左对齐并超出显示"..."](https://github.com/haizlin/fe-interview/issues/141)
- [js] [说说你对eval的理解](https://github.com/haizlin/fe-interview/issues/142)
- [软技能] [你知道网页三剑客指的是什么吗？你有用过Dreamwear吗？](https://github.com/haizlin/fe-interview/issues/143)



1、【html】说说你对cookie和session的理解？

**解析：** 

```txt
由于 http 是无状态的，服务端没法记录客户端的状态。因此 cookie 和 session 本身就是为了记录客户端的状态。

只是 cookie 是存放在客户端而 session 是记录在服务端。cookie 可以在客户端生成也可以由服务器生成传给客户端，通过 name=value 的形式存储数据。

一般 cookie 会记录一个由服务端生成的 token，session 同样会记录这个 token。服务端就可以通过 token 来鉴别身份。

```

```txt
cookie: 可以通过客户端, 服务端设置, 容量小, 可以通过设置domain来实现同步登录, 除了name, value, 它还有多个选项, domain, path, secure, expires, 客户端和服务端可以通过cookie来通讯, 传递信息

session: 由服务端设置并发起, 是服务端对于用户行为的一种凭证, 通常也是由cookie来维持这种关系, 比如session_id, 或者现在webstorm设置的Webstorm-bb00fc34等! 通过这种维持两者的关系,

```

```txt
cookie: name=value 形式，可以设置过期时间，一般用来保持状态，不然每次都要登录

session：也是保存状态，在服务端产生，一些敏感信息放在服务端session，然后产生一个 sessionId,通过 cookie 传到客户端，然后每次客户端请求会带cookie，服务端从cookie中获取sessionID，从而获取敏感信息。不过浏览器一关就没了，不关过一会儿也会失效

把session放入cookie中便有了session cookie 2223

```



2、【css】  实现单行文本居中和多行文本左对齐并超出显示"..."

**解析：**  有点懵~~~

```css
.one {
  text-align: center
}

.multi {
  overflow: hidden
  text-overflow: ellipsis
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
}

```



3、【js】 说说你对eval的理解？

`eval()` 相当于一个小型的js解析器，接受一个字符串，可以把字符串解析成js代码并执行，所以有很有大的安全隐患，并且写进去的代码都是字符串，不利于维护，使用它执行代码性能也会大大折扣，所以正常情况下不建议使用

执行 js代码，有性能问题，又可以执行一些恶意代码。webpack中处理soucemap就用到了eval，所有一个东西用途还是需要看场景。



### 第39天 (2019.11.08)

**总览：** 

- [html] [title与h1、b与strong、i与em的区别分别是什么？](https://github.com/haizlin/fe-interview/issues/144)
- [css] [写出你知道的CSS水平和垂直居中的方法](https://github.com/haizlin/fe-interview/issues/145)
- [js] [说说你对模块化的理解](https://github.com/haizlin/fe-interview/issues/146)
- [软技能] [公钥加密和私钥加密是什么？](https://github.com/haizlin/fe-interview/issues/147)



1、【html】 title与h1、b与strong、i与em的区别分别是什么？

关于 `title` 和 `h1`，`title` 是网页的标题。主要面向的对象是搜索引擎和通过搜索结果过来的人（面向外人，可以理解为报纸首页的标题）。而 `h1` 是网页内部的标题，是给已经进到页面的人看的（可以理解为报纸某个版面的大标题）。从人类的语境上来理解，两者并没有差别。

`b` 与 `strong` 的效果人眼上是无法区分的。在语义上，`b` 仅表示加粗既装饰用，我们应该使用 CSS 而不应该使用 `b`；而 `strong` 则表示被包围的内容很重要，是语气上的感觉。对于搜索引擎来说，会把 `b` 和 `strong` 视为同一含义。因此我们在使用上需要注意。

`i` 与 `em` 的区别类似 `b` 和 `strong` 的区别。`i` 用于斜体展示，我们应该使用 CSS 而不应该使用 `i`；而 `em` 则是对内容的强调，但程度没有 `strong` 那么高。同样，对搜索引擎来说，两者是没有区别的。



3、【js】 说说你对模块化的理解？

模块化解决了代码污染的问题。提高了代码的重复率以及让多人合作编程了可能。

**模块化分为：** 

- AMD: require.js 为代表，依赖前置，一律先加载再使用。
- CMD: sea.js 为代表，依赖就近原则。
- UMD: 同时支持 AMD 和 CMD 方法。
- ES6 import/export



4、【软技能】 公钥加密和私钥加密是什么？

公钥加密，私钥解密吧。非对称加密的方式，比如rsa方式。对称加密des



### 第40天  (2019.11.17)

**总览：** 

- [html] [html5都有哪些新的特性？移除了哪些元素？](https://github.com/haizlin/fe-interview/issues/148)
- [css] [怎么才能让图文不可复制？](https://github.com/haizlin/fe-interview/issues/149)
- [js] [为什么会有跨域问题？怎么解决跨域？](https://github.com/haizlin/fe-interview/issues/150)
- [软技能] [说说你对NodeJs的理解及用途](https://github.com/haizlin/fe-interview/issues/151)



1、【html】 html5都有哪些新的特性？移除了哪些元素？

1. 语义化的标签，header,footer,nav,section,article等。
2. 表单类型增多，date,datetime,email,range,url,time等。
3. 视频音频标签，localstorage,sessionstorage等。canvas，拖动的api。
4. 移除了basefont，big，center，font,s，strike，tt，u，frame，frameset，noframes；



2、【css】 怎么才能让图文不可复制 ?

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select) 

```css
.unselectable {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
     user-select: none;
}

```



3、【js】  为什么会有跨域问题？怎么解决跨域？

> 跨域一句话的理解就是：服务端和请求端的地址不一样。 

浏览器为了安全，产生了同源策略，协议、域名、端口有一个不同，就会产生跨域。跨域方式有jsonp,代理方式，cors，domain改变主域相同，postmessage也可以

**什么是跨域**

Ajax 的便利性大家都清楚，可以在不向服务器提交完整的页面的情况下，实现局部更新页面。但是浏览器处于对安全方面的考虑，不允许跨域调用其他页面的对象。
其实这个也不能怪浏览器，假设谁都可以随随便便向你发送请求，那样有很大的安全隐患。
根据浏览器的同源策略, 只有当协议，域名，端口相同的时候才算是同源, 反之则均视为是一个跨域的请求.
也就是说我刚刚的Vue端口是`8081`，服务端端口是`8080`，端口不一样，因为同源策略的存在 ，所有我的请求会失败。



**怎么解决跨域**    [参考](https://github.com/haizlin/fe-interview/issues/150) 

1. JSONP
2. CORS
3. Server Proxy



**总结** 

常用的跨域方式基本就是这三种：

1. JSONP
   优点是可以兼容老浏览器，缺点是只能发送GET请求
2. CORS
   优点简单方便，支持post请求，缺点是需要后端的配合,不支持老版浏览器。。
3. Server Proxy
   优点是前端正常发送ajax请求，缺点是后端会二次请求。

参考资料：

- 跨域资源共享 CORS 详解[阮一峰的博客]：<http://www.ruanyifeng.com/blog/2016/04/cors.html>
- 关于跨域，你想知道的全在这里：<https://zhuanlan.zhihu.com/p/25778815>
- 不要再问我跨域的问题了[sf]：<https://segmentfault.com/a/1190000015597029>
- 关于跨域,以及跨域的几种方式[cnblog]：<https://www.cnblogs.com/chenshishuo/p/4919224.html>
- 浏览器的同源策略[MDN]:<https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy>



4、【软技能】说说你对NodeJs的理解及用途？

> [Node.js是用来做什么的？](https://www.zhihu.com/question/33578075) 

 Node.js是一个javascript运行环境。它让javascript可以开发后端程序，实现几乎其他后端语言实现的所有功能，可以与PHP、Java、Python、.NET、Ruby等后端语言平起平坐。

Nodejs是基于V8引擎，V8是Google发布的开源JavaScript引擎，本身就是用于Chrome浏览器的js解释部分，但是Ryan Dahl 这哥们，鬼才般的，把这个V8搬到了服务器上，用于做服务器的软件。

优势：

1. Nodejs语法完全是js语法，只要你懂js基础就可以学会Nodejs后端开发
2. NodeJs超强的高并发能力
3. 实现高性能服务器
4. 开发周期短、开发成本低、学习成本低



**Node.js能干什么** 

![](https://img-blog.csdnimg.cn/20181107112112563.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2NzQyNzIw,size_16,color_FFFFFF,t_70)





### 第41天 (2019.11.17)

**总览：** 

- [html] [webSocket怎么做兼容处理？](https://github.com/haizlin/fe-interview/issues/152)
- [css] [怎么让英文单词的首字母大写？](https://github.com/haizlin/fe-interview/issues/153)
- [js] [说说你对IIFE的理解](https://github.com/haizlin/fe-interview/issues/154)
- [软技能] [你有自己的博客吗？平时自己有写一些技术文章吗？](https://github.com/haizlin/fe-interview/issues/155)



1、【html】 webSocket怎么做兼容处理？

> [如何解决WebSocket的兼容性](https://juejin.im/post/5aef0e9c518825673a20754d) 



2、【css】怎么让英文单词的首字母大写？

```css
.demo {
  text-transform: capitalize;
}

/* Keyword values */
text-transform: capitalize;
text-transform: uppercase;
text-transform: lowercase;
text-transform: none;
text-transform: full-width;

```

capitalize
这个关键字强制每个单词的首字母转换为大写。

uppercase
这个关键字强制所有字符被转换为大写。

lowercase
这个关键字强制所有字符被转换为小写。

none
这个关键字阻止所有字符的大小写被转换。

full-width （实验性属性值）
这个关键字强制字符 — 主要是表意字符和拉丁文字 — 书写进一个方形里，并允许它们按照一般的东亚文字（比如中文或日文）对齐。

除了以上，还有一些基本上不会用到的默认值等，就不多说了。

```css
/* Global values */
text-transform: inherit;
text-transform: initial;
text-transform: unset;

```



3、【js】说说你对IIFE的理解

> 最大的作用是创建一个**独立的作用域**

用IIFE（匿名函数立即执行）实现，针对**不需要复用的功能模块**可以用IIFE完全消除全局变量，所以一般IIFE都是用来辅助命名空间/模块化方式的











### 第42天 (2019.11.18)

**总览：** 

- [html] [解释下什么是ISISO8859-2字符集？](https://github.com/haizlin/fe-interview/issues/156)
- [css] [重置（初始化）css的作用是什么？](https://github.com/haizlin/fe-interview/issues/158)
- [js] [window对象和document对象有干什么区别？](https://github.com/haizlin/fe-interview/issues/157)
- [软技能] [你现在在团队是什么角色，有起到了什么显著的作用吗？](https://github.com/haizlin/fe-interview/issues/159)



1、【html】解释下什么是ISISO8859-2字符集？

当今开发环境下，对于一个字符集，通常情况下，我们只需要有两个认识：

> - 它是 UTF-8 吗？
> - 如果不是，那它兼容 UTF-8 吗？

对于 ISO-8859，回答是：

> 它不是 UTF-8，但它兼容 UTF-8。它是 UTF-8 的子集。

当然，知道了也没用。你还是用 UTF-8。

> 注：你如果接手一个遗留项目，可能会接触到和 UTF-8 不同的其他字符集。你的开发体验通常会很差，因为其他工具都用 UTF-8。所以，最好的方法是：不要接手非 UTF-8 的遗留项目。

------

这个知识点在非科班的来看算是比较偏门的了。
查了一下才知道，原来是Ascll扩展部分的字符集。

> ISO/IEC 8859-1，又称Latin-1或“西欧语言”，ISO/IEC 8859-2 Latin-2或“中欧语言”，是国际标准化组织内ISO/IEC 8859的8位字符集。它以ASCII为基础，在空置的0xA0-0xFF的范围内，加入192个字母及符号，藉以供使用变音符号的拉丁字母语言使用。

我觉得可以把它看做是Ascll码的一部分



2、【css】 第42天 重置（初始化）css的作用是什么？

> 我理解的，简单讲主要是为了 统一各个浏览器自带的默认样式而诞生的。

这是一个，还有就是 **视觉问题** ，浏览器默认样式会影响我们的设计还原，而且默认样式一般不够美观，满足不了定制化的视觉需求，达不到视觉产品的信息传达目标。



3、【js】 window对象和document对象有什么区别？

```js
Window是浏览器的对象可以称为宿主对象。宿主对象包括（Bom，setTimeout，storage，work Server等 ）
Document是文档对象，以html形式展示。是window对象里面的 一部分。

## window对象
   代表浏览器中的一个打开的窗口或者框架，window对象会在或者每次出现时被自动创建，在客户端JavaScript中，Window对象是全局对象global，所有的表达式都在当前的环境中计算，要引用当前的窗口不需要特殊的语法，可以把那个窗口属性作为全局变量使用，例如：可以只写document，而不必写window.document。同样可以把窗口的对象方法当做函数来使用，如：只写alert()，而不必写window.alert.
window对象实现了核心JavaScript所定义的全局属性和方法。

## document对象
   代表整个HTML文档，可以用来访问页面中的所有元素 。
每一个载入浏览器的HTML文档都会成为document对象。document对象使我们可以使用脚本(js)中对HTML页面中的所有元素进行访问。
document对象是window对象的一部分可以通过window.document属性对其进行访问
HTMLDocument接口进行了扩展，定义HTML专用的属性和方法，很多属性和方法都是HTMLCollection对象，其中保存了对锚、表单、链接以及其他可脚本元素的引用。

```





### 第43天 (2019.05.29)

**总览：** 

- [html] [如何让元素固定在页面底部？有哪些比较好的实践？](https://github.com/haizlin/fe-interview/issues/161)
- [css] [span与span之间有看不见的空白间隔是什么原因引起的？有什么解决办法？](https://github.com/haizlin/fe-interview/issues/162)
- [js] [JQuery的源码看过吗？能不能简单概括一下它的实现原理？](https://github.com/haizlin/fe-interview/issues/163)
- [软技能] [最近在学什么？能谈谈你未来3，5年给自己的规划吗？](https://github.com/haizlin/fe-interview/issues/164)



1、【html】 如何让元素固定在页面底部？有哪些比较好的实践？

解析：这个是在结构的底部还是视图的底部 ，视图底部就是 fixed，结构的底部就是 sticky footer 布局咯~



2、【css】span与span之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

> [张鑫旭](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)

1. 方法之移除空格  

   ```css
   <div class="space">
       <a href="##">
       惆怅</a><a href="##">
       淡定</a><a href="##">
       热血</a>
   </div>
   
   ```

2. 使用margin负值

3. 让闭合标签吃胶囊

4. 使用font-size:0

5. 使用letter-spacing

6. 使用word-spacing

7. 其他成品方法



3、【js】JQuery的源码看过吗？能不能简单概括一下它的实现原理？

```js
(function(window,undefined,document){
  function jQuery(prop){
    return new jQuery.prototype.init()
  }
  jQuery.prototype = {
    contructor:jQuery,
    init:function(prop){},
    //  ...
 }
 jQuery.prototype.init.prototype = jQuery.prototype;
 window['jQuery'] = window['$'] = new jQuery()
})(window,undefined,document)

```

jQuery是通过封装浏览器原生的DOM API实现dom元素的选取，然后封装到jQuery对象中去，同时根据浏览器检测对不同浏览器操作不同的APi .jQuery 对象上高度集成了超的API。当然 jQuery 还有做的更多比如，我们可以new jQuery('div'),也可以直接$('div'),这个巧妙地运算就是上面init方法；如果页面已经有$时，jQuery会先将$接管把之前$的全局名保存下来 等后面使用是在释放、。。。大致了解。



4、【软技能】 最近在学什么？能谈谈你未来3，5年给自己的规划吗？







### 第44天 (2019.11.19) 

**总览：** 

- [html] [说说video标签中预加载视频用到的属性是什么？](https://github.com/haizlin/fe-interview/issues/165)
- [css] [手写一个满屏品字布局的方案](https://github.com/haizlin/fe-interview/issues/166)
- [js] [深度克隆对象的方法有哪些，并把你认为最好的写出来](https://github.com/haizlin/fe-interview/issues/167)
- [软技能] [说说你对http、https、http2的理解](https://github.com/haizlin/fe-interview/issues/168)



1、【html】 说说video标签中预加载视频用到的属性是什么？

> preload

| 属性     | 值       | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| autoplay | autoplay | 如果出现该属性，则视频在就绪后马上播放。                     |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| height   | pixels   | 设置视频播放器的高度。                                       |
| loop     | loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| preload  | preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| src      | url      | 要播放的视频的 URL。                                         |
| width    | pixels   | 设置视频播放器的宽度。                                       |





2、【css】手写一个满屏品字布局的方案？

> flex 、float、grid布局



3、【js】 深度克隆对象的方法有哪些，并把你认为最好的写出来

> [面试官:请你实现一个深克隆](https://juejin.im/post/5abb55ee6fb9a028e33b7e0a)

1、前几年微博上流传着一个传说中最便捷实现深克隆的方法, JSON对象parse方法可以将JSON字符串反序列化成JS对象，stringify方法可以将JS对象序列化成JSON字符串,这两个方法结合起来就能产生一个便捷的深克隆.

```js
const newObj = JSON.parse(JSON.stringify(oldObj));

```

**缺点**：

1. 它无法实现对函数 、RegExp等特殊对象的克隆
2. 会抛弃对象的constructor,所有的构造函数会指向Object
3. 对象有循环引用,会报错



2. 构造一个深克隆函数

![](https://user-gold-cdn.xitu.io/2018/3/28/1626bc7a5caf947c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



4、【软技能】说说你对http、https、http2的理解？

> [说说你对http、https、http2.0的理解？](https://juejin.im/post/5d4a47226fb9a06b0a275f33)





### 第45天 (2019.11.23)

**总览：** 

- [html] [xml与html有什么区别？](https://github.com/haizlin/fe-interview/issues/169)
- [css] [你知道的等高布局有多少种？写出来](https://github.com/haizlin/fe-interview/issues/170)
- [js] [写出几种创建对象的方式，并说说他们的区别是什么？](https://github.com/haizlin/fe-interview/issues/171)
- [软技能] [从你的角度上来讲，你觉得如何管理前端团队？](https://github.com/haizlin/fe-interview/issues/172)



1、【html】 xml与html有什么区别？

> XML：
> 必须闭合；元素嵌套正确；标签小写； 必须有根元素

1. html不区分大小写，xml区分大小写
2. html可以没有闭合标签，xml必须有闭合标签
3. html可以拥有不带值的属性名，xml中所有的属性必须带值
4. html是用于显示数据，xml主要用于描述，存放数据
5. XML 的多个空格不会被合并成一个空格，而 HTML 会。



2、【css】 你知道的等高布局有多少种？写出来

> [常用的多列等高布局](https://juejin.im/post/5b0fb34151882515662238fd) 

1. 使用负margin-bottom和正padding-bottom对冲实现 

   ```css
   .Article>li {
       float: left;
       margin: 0 10px -9999px 0;
       padding-bottom: 9999px;
       background: #4577dc;
       width: 200px;
       color: #fff;
   }
   
   ```

2. flex布局 

3. 模仿table布局

4. grid布局

5. js计算 





3、【js】 写出几种创建对象的方式，并说说他们的区别是什么？

```js
const a = new Object() // 创建, 不推荐  ---new 实例化
const b = {} // 赋值, 性能比a要好  --字面量
const c = Object.create() // 继承创建, Object.create(null) 很多框架都有用来做性能优化

```

**new Object()**

直接通过构造函数创建一个新对象。

```
var obj = new Object()
//等同于 var obj = {}

```

使用字面量的方式更简单，其实他俩是一样的。
优点是足够简单，缺点是每个对象都是独立的。

**工厂模式** 

```js
function createObj(name,age){
    var obj = {};
    obj.name=name;
    obj.age=age;
    return obj
}
var Anson = createObj('Anson', 18)
console.log(Anson)
//{name: "Anson", age: 18}

```

优点是 可以解决创建多个相似对象的问题，缺点是 无法识别对象的类型。

**构造函数**

```js
function Person(name,age){
    this.name =name;
    this.age=age;
    this.sayName =function (){ alert(this.name) }
}
var person = new Person('小明',13);
console.log(person);
//Person {name: "小明", age: 13, sayName: ƒ}

```

优点是 可以创建特定类型的对象，缺点是 多个实例重复创建方法

**（构造函数+原型）组合模式**

```js
function Person(name, age){
    this.name = name;
    this.age = age;
    Person.prototype.sayName = function (){ alert(this.name) }
 }
var person = new Person('小白',18)
console.log(person);
//Person {name: "小白", age: 18} __proto__ -> sayName: ƒ ()

```

优点 多个实例引用一个原型上的方法 比较常用

**动态原型**

```js
function Person(name,age){
    this.name=name
    this.age =age
    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){ alert(this.name) }
  }
}
var person = new Person('小红',15)
console.log(person);
//Person {name: "小红", age: 15} 动态创建sayName: ƒ ()

```

优点 可以判断某个方法是否有效，来决定是否需要初始化原型，if只会在仅在碰到第一个实例调用方法
时会执行，此后所有实例共享此方法，需要注意的一点是，不能重新原型对象。

**寄生构造函数模式**

```js
function Person(name,age,job){
    var o=new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function(){
        console.log(this.name)
    }
    return o;
}
var friend=new Person("her",18,"Front-end Engineer");
friend.sayName();
//her

```

除了使用`new`操作符，其他的和工厂函数一样，可以为对象创建构造函数。

**稳妥模式**

```js
function Person(name, age){
    var o={};
    o.sayName=function(){ alert(name) }
    return o;
}
var person = ('小亮'，24);
person.sayName();//’小亮‘

```

除了使用`person.sayName()`之外 ，没有办法在访问到name的值，适合在某些安全执行环景下使用。

**Object.create()**

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

```

传入一个原型对象，创建一个新对象，使用现有的对象来提供新创建的对象的__proto__，实现继承。

**参考：**《JavaScript高级程序设计第三版》、[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)



### 第46天 (2019.11.24)

**总览：** 

- [html] [页面中怎么嵌入Flash？有哪些方法？写出来](https://github.com/haizlin/fe-interview/issues/173)
- [css] [说说你对媒体查询的理解](https://github.com/haizlin/fe-interview/issues/174)
- [js] [写一个使两个整数进行交换的方法（不能使用临时变量）](https://github.com/haizlin/fe-interview/issues/175)
- [软技能] [说说你对本项目的看法及建议](https://github.com/haizlin/fe-interview/issues/176)



1、【html】 页面中怎么嵌入Flash？有哪些方法？写出来

> [从对象到iframe - 其他嵌入技术](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/%E5%85%B6%E4%BB%96%E5%B5%8C%E5%85%A5%E6%8A%80%E6%9C%AF) 
>
> 看一些能让您在网页中嵌入各种内容类型的元素： [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe), [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 和[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) 元素。`<iframe>`用于嵌入其他网页，另外两个元素则允许您嵌入PDF，SVG，甚至Flash — 一种正在被淘汰的技术，但您仍然会时不时的看到它。
>
> | 预备知识： | 基本的计算机素养，[安装基础软件](https://developer.mozilla.org/zh-CN/Learn/Getting_started_with_the_web/Installing_basic_software)，[文件处理](https://developer.mozilla.org/zh-CN/Learn/Getting_started_with_the_web/Dealing_with_files) 的基本知识，熟悉HTML基础知识（阅读 [开始学习 HTML](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)）以及本模块中以前的文章。 |
> | ---------- | ------------------------------------------------------------ |
> | 学习目标： | 要了解如何使用`<object>、`[``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed)以及[``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)在网页中嵌入部件，例如Flash电影或其他网页。 |
>
> <*embed* >和<*object* >元素
>
> <*embed* >和<*object* >元素的功能不同于`<iframe>`—— 这些元素是用来嵌入多种类型的外部内容的通用嵌入工具，其中包括像Java小程序和Flash，PDF（可在浏览器中显示为一个PDF插件）这样的插件技术，甚至像视频，SVG和图像的内容！
>
> **注意**：**插件**是一种对浏览器原生无法读取的内容提供访问权限的软件。



**页面中怎么嵌入Flash？** 

1. object + embed       传统的方法
2. 单object
3. 双object
4. flex提供的标准方法
5. swfobject
6. 单embed显示 ie7和ff3下都能正常显示



2、【css】 说说你对媒体查询的理解？

> 为了适应不同的设备终端

![](https://img-blog.csdnimg.cn/20190522114353452.png)



3、【js】 写一个使两个整数进行交换的方法（不能使用临时变量）

 **解析：** 

- ES5

```js
var a = 1,b = 2;
a = b+a;
b = a-b;
a = a-b;

```

- ES6

```js
let [a,b] = [b,a]  

```

异或取值

```js
a ^= b;
b ^= a;
a ^= b;

```





### 第47天  (2019.12.05)

**总览：** 

- [html] [HTML5如何使用音频和视频？](https://github.com/haizlin/fe-interview/issues/177)
- [css] [你是怎样抽离样式模块的？](https://github.com/haizlin/fe-interview/issues/178)
- [js] [请说说你对事件冒泡机制的理解？](https://github.com/haizlin/fe-interview/issues/179)
- [软技能] [如果HR说要做背调，还要你给出近三个月的银行流水，你该怎么办？](https://github.com/haizlin/fe-interview/issues/180)



1、【html】HTML5如何使用音频和视频？

HTML5 新标签可以直接用video和audio，但是想要自动播放还有些兼容性问题，在手机上各浏览器需要做兼容处理。



2、【css】你是怎样抽离样式模块的？

样式模块？
通过组件化思想，用 [BEM ](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)方式命名。





3、【js】  [请说说你对事件冒泡机制的理解？](https://github.com/haizlin/fe-interview/issues/179) 

按照W3C事件模型，事件流按照次序依次为`捕获阶段`， `目标阶段`，`冒泡阶段`。如果事件绑定时候，禁止了冒泡，则事件流会停止在目标阶段。

先说两个有关DOM事件流的概念`事件冒泡`和`事件捕获`。

- 事件冒泡： 事件沿着DOM树向上通知
- 事件捕获：和事件冒泡相反，事件沿着DOM数向下通知

开发者可以自己决定事件处理注册到捕获阶段，或者是冒泡阶段。
`element1.addEventListener('click',doSomething2,true)` 如果最后一个参数为true，则注册到捕获阶段。

**事件委托(事件代理)**
介绍完上面的，事件委托是时候登场了。事件委托简单说起来就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。





### 第48天  (2019.12.05)

**总览：** 

- [html] [说说你对WEB标准和W3C的理解与认识？](https://github.com/haizlin/fe-interview/issues/181)
- [css] [你知道全屏滚动的原理是什么吗？它用到了CSS的那些属性？](https://github.com/haizlin/fe-interview/issues/182)
- [js] [你对事件循环有了解吗？说说看！](https://github.com/haizlin/fe-interview/issues/183)
- [软技能] [最近996一词很火，谈谈你对996的看法](https://github.com/haizlin/fe-interview/issues/184)



1、【html】  说说你对WEB标准和W3C的理解与认识？



**web标准** 

- 什么是web标准：一系列标准的集合，包括结构化标准语言（html等）、表现标准语言（css）、行为标准语言（EMCAScript等）。这些标准大部分由万维网联盟起草和发布 
- 为什么使用web标准：为了解决因浏览器版本不同、软硬件设备不同导致的需多版本开发的问题 

```js
html是名词--表现
css是形容词--结构
javascript是动词--行为

```

以上这三个东西就形成了一个完整的网页，但是js改变时，可以会造成css和html的混乱，让这三个的界限不是那么清晰。

这个时候，web标准就出来了，web标准一般是将该三部分独立分开，使其更具有模块化。

W3C对web标准提出了规范化的要求，也就是在实际编程中的一些代码规范：包含如下几点

1.对于结构要求：（标签规范可以提高搜索引擎对页面的抓取效率，对SEO很有帮助）

标签字母要小写
标签要闭合
标签不允许随意嵌套
2.对于css和js来说

尽量使用外链css样式表和js脚本。是结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。
样式尽量少用行间样式表，使结构与表现分离，标签的id和class等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版



**W3C**：万维网联盟，是一个web开发的国际性联盟



2、【css】知道全屏滚动的原理是什么吗？它用到了CSS的哪些属性？

**一、知识点** 

- JS 滚动监听事件
- JS 移动端touch监听事件
- 函数节流
- DOM操作



**二、代码分析**  

**1.CSS** 

html, body设置 overflow 为 hidden, 让视图中只包括一个分页;设置滑动分页的长宽都是 100%; 外部容器设置 transition 过渡效果, 并设置为相对定位, 滚动是修改外部容器的 Top 值, 实现滚动效果.

```css
html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.page-container {
  position: relative;
  top: 0;
  transition: all 1000ms ease;
  touch-action: none;
}
.page-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}

```

**2.HTML** 

初始三个分页

```html
<div class="page-container">
  <div class="page-item">1</div>
  <div class="page-item">2</div>
  <div class="page-item">3</div>
</div>

```

**3.JavaScript** 

1.初始化值
容器高度设置为窗口高度

```js
var container = document.querySelector('.page-container')
// 获取根元素高度, 页面可视高度
var viewHeight = document.documentElement.clientHeight
// 获取滚动的页数
var pageNum = document.querySelectorAll('.page-item').length
// 初始化当前位置, 距离原始顶部距离
var currentPosition = 0
// 设置页面高度
container.style.height = viewHeight + 'px'

```

2.初始化滚动事件
向下滚动时, 当 `currentPosition` 比 `-整体分页高度` 大的时候(绝对值相比小的时候), 向下滚动;向上滚动时, 当 `currentPosition` 大于 `0` 的时候, 向上滚动.

```js
// 向下滚动页面
function goDown () {
  if (currentPosition > - viewHeight * (pageNum - 1)) {
    currentPosition = currentPosition - viewHeight
    container.style.top = currentPosition + 'px'
  }
}

// 向上滚动页面
function goUp () {
  if (currentPosition < 0) {
    currentPosition = currentPosition + viewHeight
    container.style.top = currentPosition + 'px'
  }
}

```

3.节流函数
即在规定时间内只会触发一次指定方法, 用于滚动时防止多次触发

```
function throttle (fn, delay) {
  let baseTime = 0
  return function () {
    const currentTime = Date.now()
    if (baseTime + delay < currentTime) {
      fn.apply(this, arguments)
      baseTime = currentTime
    }
  }js
}

```

4.监听鼠标滚动
滚动事件`firefox`与其他浏览器的事件不同, 所以需要进行判断. `deltaY`大于`0`的时候, 想下滚动; 反之, 向上滚动.

```js
var handlerWheel = throttle(scrollMove, 1000)
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousewheel_event#The_detail_property
// firefox的页面滚动事件其他浏览器不一样
if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
  document.addEventListener('mousewheel', handlerWheel)
} else {
  document.addEventListener('DOMMouseScroll', handlerWheel)
}
function scrollMove (e) {
  if (e.deltaY > 0) {
    goDown()
  } else {
    goUp()
  }
}

```

5.监听移动端touch操作
当 touch 的最终位置大于起始位置时, 则页面向上滚动; 反之, 向下滚动.

```js
var touchStartY = 0
document.addEventListener('touchstart', event => {
  touchStartY = event.touches[0].pageY
})
var handleTouchEnd = throttle(touchEnd, 500)
document.addEventListener('touchend', handleTouchEnd)
function touchEnd (e) {
  var touchEndY = e.changedTouches[0].pageY
  if (touchEndY - touchStartY < 0) { // 向上滑动, 页面向下滚动
    goDown()
  } else {
    goUp()
  }
}

```



### 第49天 (2019.12.15)

- [html] [说说你对target="_blank"的理解？有啥安全性问题？如何防范？](https://github.com/haizlin/fe-interview/issues/185)
- [css] [假如设计稿使用了非标准的字体，你该如何去实现它？](https://github.com/haizlin/fe-interview/issues/186)
- [js] [写个还剩下多少天过年的倒计时](https://github.com/haizlin/fe-interview/issues/187)
- [软技能] [你有遇到过字体侵权的事吗？如何解决？](https://github.com/haizlin/fe-interview/issues/188)



1【html】说说你对target="_blank"的理解？有啥安全性问题？如何防范？

> 通常在网页中使用链接时，你很可能会添加一个简单的 target="_blank" 属性到 a 标签上来让浏览器用一个新的标签页来打开一个 URL 地址。但是这一属性正在成为网络钓鱼者攻击的机会。 [你从未注意的隐藏危险](https://zhuanlan.zhihu.com/p/53132574) 



2、【css】 假如设计稿使用了非标准的字体，你该如何去实现它？

解析：设计的职责是美观，前端的职责是尽可能还原，设计之所以会使用非标准的字体、甚至侵权的字体是因为不了解技术实现和版权意识。
所以先 **沟通** ，告知设计实际的情况，然后在综合考量的情况下应该尽可能去实现，通常采用 **载入字体** 和 **图片化** 的方式。



3、【js】写个还剩下多少天过年的倒计时

```js
Math.floor((new Date("2019-12-31") - Date.now()) / (10**5 *36*24))

```





### 第50天 (2019.12.24)

- [html] [Ajax与Flash的优缺点分别是什么？](https://github.com/haizlin/fe-interview/issues/189)
- [css] [列举CSS优化、提高性能的方法](https://github.com/haizlin/fe-interview/issues/190)
- [js] [请写出一个函数求出N的阶乘（即N!）](https://github.com/haizlin/fe-interview/issues/191)
- [软技能] [说说你对http、https的理解](https://github.com/haizlin/fe-interview/issues/192)



2、【css】 列举CSS优化、提高性能的方法

 加载性能

1. 压缩CSS
2. 通过link方式加载，而不是[@import](https://github.com/import)
3. 复合属性其实分开写，执行效率更高，因为CSS最终也还是要去解析如 `margin-left: left;`

选择器性能

1. 尽量少的使用嵌套，可以采用BEM的方式来解决命名冲突
2. 尽量少甚至是不使用标签选择器，这个性能实在是差，同样的还有`*`选择器
3. 利用继承，减少代码量

渲染性能

1. 慎重使用高性能属性：浮动、定位；
2. 尽量减少页面重排、重绘；
3. css雪碧图
4. 自定义web字体，尽量少用
5. 尽量减少使用昂贵属性，如box-shadow/border-radius/filter/透明度/:nth-child等
6. 使用`transform`来变换而不是宽高等会造成重绘的属性

暂且先这样吧，看来想回答好，得好好梳理下了。






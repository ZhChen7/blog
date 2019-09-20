## 前端面试每日三加一

> 待更新状态
>
> 今天 2019/9/20

### 第1天 (2019.09.19)

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






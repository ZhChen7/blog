# 微信小程序笔记上

> 微信小程序学习笔记上
>
> 初步接触小程序
>
> 基础内容介绍
>
> 开发者文档
>
> app.js 全局生命周期函数
>
> WXML 数据绑定
>
> 通过 wx.request 请求数据
>
> 微信小程序里列表渲染
>
> 页面相关事件处理函数
>
> True mastery of any skill takes a lifetime.
>
> 对任何技能的掌握都需要一生的刻苦操练。



# 小程序简介

> 小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。
>
> 微信小程序使用了前端技术栈 JavaScript/WXML/WXSS。

[相关介绍](https://developers.weixin.qq.com/miniprogram/dev/quickstart/basic/introduction.html)



**微信小程序使用了前端技术栈 JavaScript/WXML/WXSS。但和常规的前端开发又有一些区别：** [可以参考](https://juejin.im/entry/581db98fa0bb9f0058abffea)

1. **JavaScript**: 微信小程序的 JavaScript 运行环境即不是 Browser 也不是 Node.js。它运行在微信 App 的上下文中，不能操作 Browser context 下的 DOM，也不能通过 N*ode.js 相关接口访问操作系统 API。所以，严格意义来讲，微信小程序并不是 Html5，虽然开发过程和用到的技术栈和 Html5 是相通的。
2. **WXML：**作为微信小程序的展示层，并不是使用 Html，而是自己发明的基于 XML 语法的描述。
3. **WXSS：**用来修饰展示层的样式。官方的描述是 “ WXSS (WeiXin Style Sheets) 是一套样式语言，用于描述 WXML 的组件样式。WXSS 用来决定 WXML 的组件应该怎么显示。” “我们的 WXSS 具有 CSS 大部分特性...我们对 CSS 进行了扩充以及修改。”基于 CSS2 还是 CSS3？大部分是哪些部分？是否支持 CSS3 里的动画？不得而知。



#### 目录结构：

![mark](http://static.zxinc520.com/blog/20190514/yTqqYeB2UoIS.png?imageslim)



1. `app.js`做为小程序的入口，里面有个App实例，每个小程序只会有一个App实例，小程序启动以后触发onLaunch函数执行，获取用户信息
2. `app.json`是小程序的所有全局配置，`pages`字段放置所有页面的路径，`window`字段定义所有页面的顶部背景颜色，文字颜色 详细配置请[戳这里👇](https://link.juejin.im?target=https%3A%2F%2Fmp.weixin.qq.com%2Fdebug%2Fwxadoc%2Fdev%2Fframework%2Fconfig.html)
3. `app.wxss`文件就是页面公用的样式，仅支持部分css选择器
4. `wxml`就是我们的HTML文件，常用标签为 `view` 、`text` 等，没有所谓的`div`、`span`、`p`一类的标签了，我们习惯称它们为组件



------



> **设计理念：**
>
> 小程序内部可以理解成一个mvvm的框架，分为逻辑层和视图层，逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。



------

![mark](http://static.zxinc520.com/blog/20190514/U6eXvlL8evmQ.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190514/m4UDxEkFa1ae.png?imageslim)



## 开始上手

> **开始正式学习**
>
> 基础学习部分

### 加载一张图片

![mark](http://static.zxinc520.com/blog/20190514/GnYuPkAo16G5.png?imageslim)

*简单使用样式*：

![mark](http://static.zxinc520.com/blog/20190514/gvNQzg8BaF74.png?imageslim)



## WXSS

> WXSS (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式。
>
> WXSS 用来决定 WXML 的组件应该怎么显示。	[可以参考官网](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

为了适应广大的前端开发者，WXSS 具有 CSS 大部分特性。同时为了更适合开发微信小程序，WXSS 对 CSS 进行了扩充以及修改。

与 CSS 相比，WXSS 扩展的特性有：

- 尺寸单位
- 样式导入



## 尺寸单位

​	**rpx**（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素

![mark](http://static.zxinc520.com/blog/20190514/57Wa2m8PEEyp.png?imageslim)

**建议：** 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。

**注意：** 在较小的屏幕上不可避免的会有一些毛刺，请在开发时尽量避免这种情况。



## 全局样式与局部样式

定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。

 

## 开发者文档

> [开发者文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)
>
> **不会** 或 **忘了** 就查文档！

### image:

​	**解决图片缩放问题：**

- mode （ 常用下面2个属性值缩放图片 ）
  - aspectFit：缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
  - aspectFill：缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。

![mark](http://static.zxinc520.com/blog/20190520/XC3RPCh4fJdY.png?imageslim)



### swiper

> [看开发者文档](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)
>
> 轮播组件：调用相应的标签及参数设置

![mark](http://static.zxinc520.com/blog/20190520/PgOdEdCQrqvp.gif)



## 解读 app.json

> 小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置。文件内容为一个 JSON 对象，有以下属性：
>
> [可以参考官网](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)



### pages

> 用于指定小程序由哪些页面组成，每一项都对应一个页面的 路径（含文件名） 信息。文件名不需要写文件后缀，框架会自动去寻找对于位置的 `.json`, `.js`, `.wxml`, `.wxss` 四个文件进行处理。



### window

> 用于设置小程序的状态栏、导航条、标题、窗口背景色。

例如：

```js
{
  "window": {
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "微信接口功能演示",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light"
  }
}
```



### tabBar

> 如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。

```js
 "tabBar": {
    "color": "#333",
    "selectedColor": "#f30",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "assets/tabs/icon1.png",
      "selectedIconPath": "assets/tabs/icon1.png"
    },
    {
      "pagePath": "pages/message/message",
      "text": "消息",
      "iconPath": "assets/tabs/icon1.png",
      "selectedIconPath": "assets/tabs/icon1.png"
    },
    {
      "pagePath": "pages/index/index",
      "text": "个人中心",
      "iconPath": "assets/tabs/icon1.png",
      "selectedIconPath": "assets/tabs/icon1.png"
    },
    {
      "pagePath": "pages/index/index",
      "text": "综合",
      "iconPath": "assets/tabs/icon1.png",
      "selectedIconPath": "assets/tabs/icon1.png"
    }]
  }
```

![mark](http://static.zxinc520.com/blog/20190521/OCDT2PNCaB4Y.png?imageslim)

*等等等... 不了解就看文档！*

**注意： 所以看开发者文档很重要！** 

[点一下就可以看了，别懒！](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)



## app.js 全局生命周期函数

> app.js 全局生命周期函数

*在app.js文件中* ， 定义了一些生命周期方法 ， onLaunch，onShow，onHide，onError，以及任意开发者添加的函数或者数据（通过this可以访问）

**以下是各个生命周期方法作用和描述：**

1. **onLaunch 生命周期函数** --监听小程序初始化 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
2. **onShow 生命周期函数**--监听小程序显示 当小程序启动，或从后台进入前台显示，会触发 onShow
3. **onHide 生命周期函数**--监听小程序隐藏 当小程序从前台进入后台，会触发 onHide
4. **onError 错误监听函数** 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息

其他 Any 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问

*index.js:* （个人感觉 和 **Vue** 真的好像，如果熟悉Vue的话，这理解起来应该没有难度。）

```js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    listarr:0,
  },
//监听小程序初始化 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLoad: function (option) {
    wx.request({
      url: 'https://www.baifubao.com/callback',
      success: (res)=>{
        this.setData({
          listarr: res.statusCode
        })
      },
    })
  }
})
```

**注意：着重关注 onLoad 函数，因为使用最频繁！**



## WXML 数据绑定

> WXML 中的动态数据均来自对应 Page 的 data。

### 内容

```html
<view>{{ message }}</view>
```

```js
Page({
  data: {
    message: 'Hello World!'
  }
})
```

![mark](http://static.zxinc520.com/blog/20190526/Dr9a1AITnQo7.png?imageslim)

#### 特别注意：

1. 花括号和引号之间不能有空格
2. 不能直接写 checked=“false”，其计算结果是一个字符串，转成 boolean 类型后转为真值。



## 通过 wx.request 请求数据

> 通过 wx.request 请求数据

```js
  wx.request({
      url: '',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
          console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
```

![mark](http://static.zxinc520.com/blog/20190527/x00Ledvp9GT7.png?imageslim)



**setData**：接受 <u>wx.request</u> 请求的数据，赋值给 Page里面的data（然后通过插值表达式渲染到页面）

```js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    listarr:0,
  },
  onLoad: function (option) {
    wx.request({
      url: 'https://www.baifubao.com/callback',
      success: (res)=>{
        console.log(res)
        
        this.setData({
          listarr: res.statusCode
        })

      },
    })
}})
```



## 微信小程序里列表渲染

> ### wx:for
>
> 在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。
>
> 默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`



*类比于 Vue：*  

```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

*微信小程序里面：*

```js
<view wx:for="{{array}}">{{index}}: {{item.message}}</view>
```

```js
Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
```

#### wx:key  

​	[可以参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/list.html)

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 [``](https://developers.weixin.qq.com/miniprogram/dev/component/input.html) 中的输入内容，[``](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html)的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符。

1. 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
2. 保留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字，如：

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

**如不提供 wx:key，会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。**

```html
<switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;">
  {{item.id}}
</switch>
<button bindtap="switch">Switch</button>
<button bindtap="addToFront">Add to the front</button>

<switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;">
  {{item}}
</switch>
<button bindtap="addNumberToFront">Add to the front</button>
```

```js
Page({
  data: {
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  }
})
```



## 页面相关事件处理函数

> 页面相关事件处理函数（**下拉刷新**，**滑到底部加载更多**等）
>
> [可以参考](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.startPullDownRefresh.html)

**下拉事件和触底事件**：

```js
 //页面相关事件处理函数---监听用户下拉动作
    onPullDownRefresh:function(){
      console.log('下拉！')
    },
    //页面上拉触底事件的处理函数
    onReachBottom:function(){
      console.log('上拉')
    }
```



## 导航栏

> [可以参考官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html)
>
> js文件

|                  函数API                   |             功能             |
| :----------------------------------------: | :--------------------------: |
| wx.showNavigationBarLoading(Object object) | 在当前页面显示导航条加载动画 |
|  wx.setNavigationBarTitle(Object object)   |    动态设置当前页面的标题    |
|  wx.setNavigationBarColor(Object object)   |      设置页面导航条颜色      |
| wx.hideNavigationBarLoading(Object object) | 在当前页面隐藏导航条加载动画 |

![mark](http://static.zxinc520.com/blog/20190603/DXIDRjESGUHv.gif)



## 界面交互

> [参考官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)

#### 示例代码  

```js
wx.showToast({
  title: '成功w',
  icon: 'success',
  duration: 2000
})
```

![mark](http://static.zxinc520.com/blog/20190603/fRajsw7UWlQc.gif)





## 下拉刷新

> 下拉刷新( **配合** 页面*相关事件处理函数*---监听用户下拉动作)

**index.json:**

```js
{
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "dark"
}
```

**index.js:**

```js
   //页面相关事件处理函数---监听用户下拉动作
    onPullDownRefresh:function(){
      console.log('下拉！')
    },
```

![mark](http://static.zxinc520.com/blog/20190603/bHEJTM3fLLsC.gif)

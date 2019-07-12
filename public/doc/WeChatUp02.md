# 微信小程序笔记下

> 微信小程序笔记下
>
> input
>
> color 属性
>
> bindchange
>
> wxs 页面脚本 
>
> 微信小程序事件 **冒泡 **和事件 **传参**
>
> 服务号、订阅号
>
> sdk



## 微信小程序组件

### 表单组件

#### input

> 输入框。该组件是[原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)，使用时请注意相关限制
>
> [可以参考](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)

```html
<!-- 输入框 -->
<view>
  <input type='text' placeholder='text'></input>
  <input type='password' placeholder='password'></input>
  <input type='number' placeholder='number'></input>
  <input type='idcard' placeholder='idcard'></input>
  <input type='digit' placeholder='digit'></input>

  <!-- 单选框 -->
  <radio-group>
     <radio>单选框</radio>
     <radio>单选框</radio>
  </radio-group>

  <!-- 多选框 -->
<checkbox-group>
   <checkbox>多选框</checkbox>
   <checkbox>多选框</checkbox>
   <checkbox>多选框</checkbox>
</checkbox-group>

</view>


```

![mark](http://static.zxinc520.com/blog/20190605/iBUB5P8LKOTz.png?imageslim)



### 改变颜色

> **color属性**

```html
  <!-- 单选框 -->
  <radio-group>
     <radio color='#f30'>单选框</radio>
     <radio>单选框</radio>
  </radio-group>

  <!-- 多选框 -->
<checkbox-group>
   <checkbox color='#f30'>多选框</checkbox>
   <checkbox>多选框</checkbox>
   <checkbox>多选框</checkbox>
</checkbox-group>
```

![mark](http://static.zxinc520.com/blog/20190605/0lbNety1l8Nr.gif)

- checked：默认选中
- disabled: 禁用

### bindchange

> [checkbox-group](https://developers.weixin.qq.com/miniprogram/dev/component/checkbox-group.html)中选中项发生改变时触发 change 事件，detail = {value:[选中的checkbox的value的数组]}
>
> **单选框** 和 **复选框** 都能用！



**例如：**

```html
 <!-- 单选框 -->
  <radio-group  ='radiobindchangefun' data-index="1">
     <radio color='#f30' value='nan'>单选框</radio>
     <radio value='nv'>单选框</radio>
  </radio-group>
```

**index.js：** 

```js
  radiobindchangefun(e){
    console.log(e.detail.value)
  }
```

![mark](http://static.zxinc520.com/blog/20190605/HhwLwtgLFk7s.gif)



## wxs页面脚本 

> WXS（WeiXin Script）是小程序的一套脚本语言，结合 `WXML`，可以构建出页面的结构。
>
> WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。
>
> **用的相对不多**

- [WXS 模块](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html)
- [变量](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/02variate.html)
- [注释](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/03annotation.html)
- [运算符](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/04operator.html)
- [语句](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/05statement.html)
- [数据类型](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/06datatype.html)
- [基础类库](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/07basiclibrary.html)

```html
<wxs module="foo">
  var sum=function(a,b){
      return a+b;
  }
  module.exports.sum=sum
</wxs>

<view>{{foo.sum(1,2)}}</view>
```

![mark](http://static.zxinc520.com/blog/20190605/sEHFhCJgcSTT.png?imageslim)



## 微信小程序事件冒泡和事件传参

> 微信小程序事件冒泡和事件传参
>
> [参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)

### 事件绑定和冒泡

事件绑定的写法同组件的属性，以 key、value 的形式。

- key 以`bind`或`catch`开头，然后跟上事件的类型，如`bindtap`、`catchtouchstart`。自基础库版本 [1.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 起，在非[原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)中，`bind`和`catch`后可以紧跟一个冒号，其含义不变，如`bind:tap`、`catch:touchstart`。
- value 是一个字符串，需要在对应的 Page 中定义同名的函数。不然当触发事件的时候会报错。

`bind`事件绑定**不会阻止**冒泡事件向上冒泡，`catch`事件绑定**可以阻止**冒泡事件向上冒泡。

```html
<view class='father' bindtap='ClickFatherEvent'>
  <view class='son'  catchtap='ClickSonEvent'>
  </view>
</view>
```

![mark](http://static.zxinc520.com/blog/20190610/iYPyQKFs0uUh.gif)



### 事件传参

> 自定义属性传参 ( **data-index="1"** ) 

```html
<view class='father' bindtap='ClickFatherEvent' data-index="1">
  <view class='son'  catchtap='ClickSonEvent'>
  </view>
</view>
```

```js
ClickFatherEvent(event){
    console.log('father')
    console.log(event.currentTarget.dataset.index)
}
```

![mark](http://static.zxinc520.com/blog/20190611/QGePjx2yA28Q.gif)



## 服务号

> 服务号：为企业和组织提供更强大的业务服务与用户管理能力，主要偏向服务类交互（功能类似12315，114，银行，提供绑定信息，服务交互的）；
>
> 适用人群：媒体、企业、政府或其他组织。
>
> 群发次数：服务号1个月（按自然月）内可发送4条群发消息。
>
> [可以参考](https://kf.qq.com/faq/120911VrYVrA150918fMZ77R.html?scene_id=kf3386)



## 订阅号

> # 什么是订阅号？
>
> 订阅号：为媒体和个人提供一种新的信息传播方式，主要功能是在微信侧给用户传达资讯；（功能类似报纸杂志，提供新闻信息或娱乐趣事）
>
> 适用人群：个人、媒体、企业、政府或其他组织。
>
> 群发次数：订阅号（认证用户、非认证用户）1天内可群发1条消息。



**温馨提示：**

1. 如果想用公众平台简单发发消息，做宣传推广服务，建议可选择订阅号；
2. 如果想用公众平台进行商品销售，建议可选择服务号，后续可认证再申请微信支付商户；





## sdk

> [软件开发工具包](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7%E5%8C%85)（缩写：**SDK**、外语全称：**Software Development Kit）**一般都是一些[软件工程师](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%B8%88/836275)为特定的[软件包](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%8C%85/10508451)、[软件框架](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E6%A1%86%E6%9E%B6/1471931)、[硬件](https://baike.baidu.com/item/%E7%A1%AC%E4%BB%B6/479446)平台、[操作系统](https://baike.baidu.com/item/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/192)等建立应用软件时的[开发工具](https://baike.baidu.com/item/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/10464557)的集合。 [1] 
>
> 软件开发工具包括广义上指[辅助](https://baike.baidu.com/item/%E8%BE%85%E5%8A%A9/1045139)开发某一类软件的相关文档、范例和工具的[集合](https://baike.baidu.com/item/%E9%9B%86%E5%90%88/73081)。
>
> 软件开发工具包是一些被软件工程师用于为特定的软件包、软件框架、硬件平台、操作系统等创建应用软件的开发工具的集合，一般而言SDK即开发 [Windows](https://baike.baidu.com/item/Windows) 平台下的应用程序所使用的 SDK。它可以简单的为某个[程序设计语言](https://baike.baidu.com/item/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E8%AF%AD%E8%A8%80/2317999)提供[应用程序接口](https://baike.baidu.com/item/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3/10418844) **API**的一些文件，但也可能包括能与某种[嵌入式系统](https://baike.baidu.com/item/%E5%B5%8C%E5%85%A5%E5%BC%8F%E7%B3%BB%E7%BB%9F/186978)通讯的复杂的硬件。一般的工具包括用于调试和其他用途的实用工具。SDK 还经常包括示例代码、支持性的技术注解或者其他的为基本参考资料澄清疑点的支持文档。
>
> 为了鼓励开发者使用其系统或者语言，许多 SDK 是[免费](https://baike.baidu.com/item/%E5%85%8D%E8%B4%B9/131326)提供的。[软件工程师](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%B8%88/836275)通常从目标系统开发者那里获得软件开发包，也可以直接从互联网下载，有时也被作为[营销手段](https://baike.baidu.com/item/%E8%90%A5%E9%94%80%E6%89%8B%E6%AE%B5)。例如，营销公司会免费提供构建SDK 以鼓励人们使用它，从而会吸引更多人由于能免费为其编程而购买其构件。
>
> SDK 可能附带了使其不能在不兼容的许可证下开发软件的许可证。例如产品供应商提供一个专有的 SDK 可能与自由软件开发抵触。[GPL](https://baike.baidu.com/item/GPL) 能使 SDK 与专有软件开发近乎不兼容。[LGPL](https://baike.baidu.com/item/LGPL) 下的 SDK 则没有这个问题。
>
> [可参考官方解释](https://baike.baidu.com/item/SDK/7815680)
>
> [微信JS-SDK说明文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)


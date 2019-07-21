# 解决mongodb 取出时是 UTC时间问题。

## 问题描述

#### 		问题：将一个时间类型数据保存到mongodb数据库中，在数据库中时间还是正常的时间，如：

![mark](http://static.zxinc520.com/blogimage/20190318/n3ekfX3CcF0P.png?imageslim)



**但是后台拿出来的时候却是这样的（node.js）**

![mark](http://static.zxinc520.com/blogimage/20190318/3KOdujSN2DnV.png?imageslim)



*解决方案：*

 网上查阅了很多资料，可我没找到一个解决方案（可能我比较傻吧），我只有自己想解决方案。



# 我的解决步骤：

#### 1.将UTC时间转换为data类型时间



```javascript
/*publish在这里是一个数组，数组里面的每一项都是一个对象。 
  比如：publish[0].publishDate = 2019-03-15T08:44:07.842Z
*/
/*遍历publish数组*/
      publish.forEach(function (e) {
          console.log(new Date(e.publishDate).toLocaleString())    
        })
```

**结果：**

![mark](http://static.zxinc520.com/blogimage/20190318/okqlTlNhFEPQ.png?imageslim)

瞬间特别开心，以为解决了，谁知？（哎！）



#### 2.我开始将转变后的时间赋给原对象：



```javascript
/*遍历publish数组*/
      publish.forEach(function (e) {
             e.publishDate = new Date(e.publishDate).toLocaleString()
             console.log(e.publishDate)
        })
```



**结果：**

![mark](http://static.zxinc520.com/blogimage/20190318/woBo6Xdm0nCl.png?imageslim)



我百思不得其解，我也不知道为什么会这样，我想不可能啊！

于是：我想方设法查明其中的原有，最终我发现了一个问题：

```javascript
   console.log(typeof(publish[0].publishDate)) //object
   console.log(typeof(new Date(publish[0].publishDate).toLocaleString()))//string

```



原来是**类型不一样**，怪不得不能直接赋值，<u>我何不把它们转换成一样的类型，然后进行赋值呢，于是，我有进行了下面的操作：</u>

```javascript
       publish.forEach(function (e) {
             e.publishDate =JSON.parse(new Date(e.publishDate).toLocaleString())
            console.log(e.publishDate)
        })
```

但结果报错了：

![mark](http://static.zxinc520.com/blogimage/20190318/RQVh7hC91D61.png?imageslim)



## 3.在我无限困惑的时候：我终于想到了一种可行的解决方案===>

#### 我给publish新加了一个属性值：

![mark](http://static.zxinc520.com/blogimage/20190318/F7Dap7RvsP1D.png?imageslim)

**然后在代码中**：

```javascript
      publish.forEach(function (e) {
             e.UTCtodata =new Date(e.publishDate).toLocaleString()
             console.log(e.UTCtodata)
        })
```



结果：

![mark](http://static.zxinc520.com/blogimage/20190318/OetS9laujbDI.png?imageslim)



#### 渲染到页面：

```html
 <span class="list_time_submit">{{publish[i].UTCtodata}}</span>
```



**页面效果：**

![mark](http://static.zxinc520.com/blogimage/20190318/4vr3aw5u3e55.png?imageslim)



这就是我解决mongodb取出时间是UTC时间的解决办法，如果你们有特别好，特别简单的处理办法，可一定要告诉我哦！

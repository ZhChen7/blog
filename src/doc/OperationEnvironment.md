

# 运行环境

> 讲解 JS 代码在浏览器中运行的相关问题，例如 **页面加载和渲染**，**性能优化**，**安全性** ，这些类别的题目。
>
> 知识点：
>
> 8-1 页面加载过程
>
> 8-2 性能优化



- 浏览器就可以通过访问链接来得到页面内容
- 通过绘制和渲染，显示出页面的最终的样子



## 整个过程中，我们需要考虑什么问题？

### 3个重点

- 页面加载过程
- 性能优化
- 安全性



## 8-1 页面加载过程

> 题目
>
> 知识点
>
> 解答



### 题目

- 从输入url 到得到 html 的详细过程
- window.onload 和 DOMContentLoaded 的区别？



### 知识点

- 加载资源的形式
- 加载一个资源的过程
- 浏览器渲染页面的过程



#### 加载资源的形式

- 输入 url （或跳转页面）加载 html
- url: <https://www.imooc.com/>
- 加载 html 中的静态资源
- script标签中资源的加载: <**script src="/static/jsjquery.js"></script** >



#### 加载一个资源的过程

1. 浏览器根据DNS服务器得到域名的IP地址
2. 向这个IP的机器发送 http 请求
3. 服务器收到、处理并返回 http 请求
4. 浏览器得到返回内容



#### 浏览器渲染页面的过程：

1.根据HTML结构生成DOM Tree
2.根据CSS生成CSSOM
3.将DOM和CSSOM整合形成RenderTree
4.根据RenderTree开始渲染和展示
5.遇到<**script** >时，会执行并阻止渲染。



#### 思考

- **为何要把 css 放在head中？** 
  - css放在body标签尾部时, DOMTree构建完成之后便开始构建RenderTree, 并计算布局渲染网页, 等加载解析完css之后, 开始构建CSSOMTree, 并和DOMTree重新构建RenderTree, 重新计算布局渲染网页
  - css放在head标签中时, 先加载css, 之后解析css构建CSSOMTree, 于此同时构建DOMTree, CSSOMTree和DOMTree都构建完毕之后开始构建RenderTree, 计算布局渲染网页

对比两者, css放在head标签中比css放在body标签尾部少了一次构建RenderTree, 一次计算布局和一次渲染网页, 因此性能会更好; 并且css放在body标签尾部时会在网页中短暂出现"裸奔"的HTML, 这不利于用户体验

------



- **为何要把 js 放在 body 最下面？** ，<u>既然Dom树完全生成好后才能显示“没有图片的首屏”，浏览器又必须读完全部HTML才能生成完整的Dom树，script标签不放在body底部是不是也一样？</u>

  - —— JS 放在底部可以保证让浏览器优先渲染完现有的 HTML 内容，让用户先看到内容，体验好。另外，JS 执行如果涉及 DOM 操作，得等待 DOM 解析完成才行，JS 放在底部执行时，HTML 肯定都解析成了 DOM 结构。JS 如果放在 HTML 顶部，JS 执行的时候 HTML 还没来得及转换为 DOM 结构，可能会报错。 [JS 一定要放在 Body 的最底部么？聊聊浏览器的渲染机制](https://segmentfault.com/a/1190000004292479) 

  

 

#### window.onload 和 DOMContentLoaded

![mark](http://static.zxinc520.com/blog/20190719/sSK9VYP2CSRd.png?imageslim)



### 解答

- 从输入url 到得到 html 的详细过程

  - 浏览器根据DNS服务器得到域名的IP地址
  - 向这个IP的机器发送 http 请求
  - 服务器收到、处理并返回 http 请求
  - 浏览器得到返回内容

  

- window.onload 和 DOMContentLoaded 的区别？

  - window.onload： 页面的全部资源加载完才会执行，包括图片、视频等
  - DOMContentLoaded： DOM渲染完即可执行，此时图片、视频还没有加载完

 

## 8-2 性能优化

> [2018 前端性能优化清单](https://juejin.im/post/5a966bd16fb9a0635172a50a) 
>
> 关于 **性能优化** 是个大的面，这篇文章主要涉及到 **前端** 的几个点，如 **前端性能优化** 的流程、常见技术手段、工具等。
>
> 提及 **前端性能优化** ，大家应该都会想到 **雅虎军规**，本文会结合 **雅虎军规** 融入自己的了解知识，进行的总结和梳理 😜



### 我们先来看看 👀 雅虎军规 的 35 条 ：

- 尽量减少 HTTP 请求个数——须权衡
- 使用 **CDN**（内容分发网络）
- 为文件头指定 Expires 或 Cache-Control ，使内容具有缓存性。
- 避免空的 src 和 href
- 使用 gzip 压缩内容
- 把 CSS 放到顶部
- 把 JS 放到底部
- 避免使用 CSS 表达式
- 将 CSS 和 JS 放到外部文件中
- 减少 DNS 查找次数
- 精简 CSS 和 JS
- 避免跳转
- 剔除重复的 JS 和 CSS
- 配置 ETags
- 使 AJAX 可缓存
- 尽早刷新输出缓冲
- 使用 GET 来完成 AJAX 请求
- 延迟加载
- 预加载
- 减少 DOM 元素个数
- 根据域名划分页面内容
- 尽量减少 iframe 的个数
- 避免 404
- 减少 Cookie 的大小
- 使用无 cookie 的域
- 减少 DOM 访问
- 开发智能事件处理程序
- 用  代替 @import
- 避免使用滤镜
- 优化图像
- 优化 CSS Spirite
- 不要在 HTML 中缩放图像——须权衡
- favicon.ico要小而且可缓存
- 保持单个内容小于25K
- 打包组件成复合文本

------



- 这本身就是一个综合性的问题
- 没有标准答案，如果要非常全面，能写一本书
- 只关注核心点，针对面试



### 原则

- 多使用内存、缓存或其他方法
- 减少 CPU 计算、减少网络请求



### 从哪里入手

- 加载页面和静态资源
- 页面渲染



### 加载资源优化

- 静态资源的压缩合并
- 静态资源缓存
- 使用 CDN 让资源加载更快
- 使用 SSR 后端渲染，数据直接输出到 HTML 中



### 渲染优化

- CSS 放前面 ，JS 放后面
- 懒加载 （图片懒加载、下拉加载更多）
- 减少 DOM 查询 ，对DOM 查询做缓存
- 减少 DOM 操作，多个操作尽量合并 在一起执行
- 事件节流
- 尽早执行操作 （如 DOMContentLoaded）



### 优化示例

> 展示几个优化示例

#### 资源合并

```js
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>

//资源合并
<script src="abc.js"></script>
```



#### 缓存

- 通过连接名字控制缓存
- <**script src="adc_1.js"></script** >
- 只有内容改变的时候，连接名称才会改变
- <**script src="adc_2.js"></script** > 



#### CDN

> 2个在线的好用的CDN网站：
>
> <https://www.bootcdn.cn/>
>
> <https://cdnjs.com/>

![mark](http://static.zxinc520.com/blog/20190719/wqVaD4amGTnT.png?imageslim)





#### 使用 SSR 后端渲染

- 现在 Vue React 提出了这样的概念
- 其实 jsp php asp 都属于后端渲染



#### 懒加载

![mark](http://static.zxinc520.com/blog/20190719/dNHq1Xfe0Ep5.png?imageslim)



#### 缓存DOM 查询

![mark](http://static.zxinc520.com/blog/20190719/4xj98cKCzJh9.png?imageslim)



#### 合并 DOM 插入

![mark](http://static.zxinc520.com/blog/20190719/S7Fvwi6QNApC.png?imageslim)

 

#### 事件节流

![mark](http://static.zxinc520.com/blog/20190719/vHApgiVQan6S.png?imageslim)



#### 尽早操作

![mark](http://static.zxinc520.com/blog/20190719/q8SS7PiiaKI4.png?imageslim)
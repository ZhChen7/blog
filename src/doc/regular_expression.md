# 正则表达式

> 正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript中，正则表达式也是对象。这些模式被用于 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 的 [`exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [`test`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) 方法, 以及 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 的 [`match`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)、[`matchAll`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)、[`replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)、[`search`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search) 和 [`split`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 方法。本章介绍 JavaScript [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)。



辅助正则可视化网站：[https://regexper.com/](https://regexper.com/)



**使用正则表达式的方法**

| 方法                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) | 一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回 null）。 |
| [`test`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) | 一个在字符串中测试是否匹配的RegExp方法，它返回 true 或 false。 |
| [`match`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) | 一个在字符串中执行查找匹配的String方法，它返回一个数组，在未匹配到时会返回 null。 |
| [`matchAll`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) | 一个在字符串中执行查找所有匹配的String方法，它返回一个迭代器（iterator）。 |
| [`search`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search) | 一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。 |
| [`replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) | 一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。 |
| [`split`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) | 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 `String` 方法。 |



## REGEXP对象

- JavaScript 通过内置函数对象 RegExp 支持正则表达式
- 有两种方法实例化 RegExp 对象
  - 字面量
  - 构造函数



### 字面量

```js
var reg=/\bis\b/g

console.log('he is dog ,he love she how are you is'.replace(reg,'IS'))
// he IS dog ,he love she how are you IS
```



### 构造函数

```js
var reg=new RegExp('\\bis\\b','g')
console.log('he is dog ,he love she how are you is'.replace(reg,'IS'))

// he IS dog ,he love she how are you IS
```





#### 修饰符

在 JavaScript 中，**正则表达式标志**：

- `i`

  不区分大小写搜索。

- `g`

  全局搜索。

- `m`

  多行搜索。

- `u`

  使用unicode码的模式进行匹配。

- `y`

  执行“粘性”搜索,匹配从目标字符串的当前位置开始，可以使用y标志。

- `s`

  允许 `.` 匹配换行符。

  

#### 元字符

- 正则表达式由两种基本字符类型组成：
  - 原义文本字符
  - 元字符
- 元字符是在正则表达式中有特殊含义的非字母字符



| 元字符    | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| \         | 将下一个字符标记为特殊字符或字面值。例如，n 匹配字符 *n*，而 \n 匹配换行符。序列 \\ 匹配 \，而 \( 匹配 (。 |
| ^         | 匹配输入的开始部分。                                         |
| $         | 匹配输入的结束部分。                                         |
| *         | 零次或更多次匹配前面的字符。例如，zo* 匹配 *z* 或 *zoo*。    |
| +         | 一次或更多次匹配前面的字符。例如，zo+ 匹配 *zoo*，但是不匹配 *z*。 |
| ?         | 零次或一次匹配前面的字符。例如，a?ve? 匹配 *never* 中的 *ve*。 |
| .         | 匹配任何单个字符，但换行符除外。                             |
| (pattern) | 匹配模式并记住匹配项。通过使用以下代码，匹配的子串可以检索自生成的匹配项集合：Item [0]...[n]。要匹配圆括号字符 ( )，请使用 \( 或 \)。 |
| x\|y      | 匹配 x 或 y。 例如，z\|wood 匹配 *z* 或 *wood*。(z\|w)oo 匹配 *zoo* 或 *wood*。 |
| {n}       | n 是一个非负整数。精确匹配 n 次。例如，o{2} 不匹配 *Bob* 中的 *o*，但是匹配 *foooood* 中的前两个 *o*。 |
| {n,}      | 在此表达式中，n 是一个非负整数。至少 n 次匹配前面的字符。例如，o{2,} 不匹配 *Bob* 中的 *o*，但是匹配 *foooood* 中的所有 *o*。o{1,} 表达式等效于 o+，o{0,} 等效于 o*。 |
| {n,m}     | m 和 n 变量是非负整数。至少 n 次且至多 m 次匹配前面的字符。例如，o{1,3} 匹配 *fooooood* 中的前三个 *o*。o{0,1} 表达式等效于 o?。 |
| [xyz]     | 一个字符集。匹配任意一个包含的字符。例如，[abc] 匹配 *plain* 中的 *a*。 |
| [^xyz]    | 一个否定字符集。匹配任何未包含的字符。例如，[^abc] 匹配 *plain* 中的 *p*。 |
| [a-z]     | 字符范围。匹配指定范围中的任何字符。例如，[a-z] 匹配英语字母中的任何小写的字母字符。 |
| [^m-z]    | 一个否定字符范围。匹配未在指定范围中的任何字符。例如，[m-z] 匹配未在范围 *m* 到 *z* 之间的任何字符。 |
| \A        | 仅匹配字符串的开头。                                         |
| \b        | 匹配某个单词边界，即，某个单词和空格之间的位置。例如，er\b 匹配 *never* 中的 *er*，但是不匹配 *verb* 中的 *er*。 |
| \B        | 匹配非单词边界。ea*r\B 表达式匹配 *never early* 中的 *ear*。 |
| \d        | 匹配数字字符。                                               |
| \D        | 匹配非数字字符。                                             |
| \f        | 匹配换页字符。                                               |
| \n        | 匹配换行符。                                                 |
| \r        | 匹配回车字符。                                               |
| \s        | 匹配任何空格，包括空白、制表符、换页字符等等。               |
| \S        | 匹配任何非空格字符。                                         |
| \t        | 匹配跳进字符。                                               |
| \v        | 匹配垂直跳进字符。                                           |
| \w        | 匹配任何单词字符，包括下划线。此表达式等效于 [A-Za-z0-9_]。  |
| \W        | 匹配任何非单词字符。此表达式等效于 [^A-Za-z0-9__]。          |
| \z        | 仅匹配字符串的结尾。                                         |
| \Z        | 仅匹配字符串的结尾，或者结尾的换行符之前。                   |

**字符类：**

```js
'a1b2c3d4'.replace(/[abc]/g,'X')
//"X1X2X3d4"
```

```js
'a1b2c3d4'.replace(/[^abc]/g,'X')
//"aXbXcXXX"
```



**范围类：**

```js
'a1b2c3d4zcczx'.replace(/[a-z]/g,'Q')
//"Q1Q2Q3Q4QQQQQ"

'a1b2c3d4zcczxAAAAAAA'.replace(/[a-zA-Z]/g,'Q')
//"Q1Q2Q3Q4QQQQQQQQQQQQ"

'2016-09-12'.replace(/[0-9]/g,'A')
//"AAAA-AA-AA"

'2016-09-12'.replace(/[0-9-]/g,'A')
//"AAAAAAAAAA"
```



**预定义类：** 

![mark](http://static.zxinc520.com/blog/20191009/FsMlDwV4Kfrh.png?imageslim)

```js
//匹配一个 ab + 数字 + 任意字符 的字符串
ab\d.
```



**边界：** 

![mark](http://static.zxinc520.com/blog/20191009/UQyV6XeWDuqI.png?imageslim)



```js
'this is a boy'.replace(/\bis\b/g,'IS')
//"this IS a boy"

'@13@12331'.replace(/@./g,'Q')
//"Q3Q2331"

'@13@12331'.replace(/^@./g,'Q')
//"Q3@12331"

'@13@12331@'.replace(/.@$/g,'Q')
//"@13@1233Q"
```



**量词：** 

![mark](http://static.zxinc520.com/blog/20191009/KsjXw8IGYwJD.png?imageslim)



**贪婪模式：** 

```js
'12345678'.replace(/\d{3,6}/g,'a')
//"a78"
```



**非贪婪模式：** 

```js
'12345678'.replace(/\d{3,6}?/g,'a')
//"aa78"
```



**分组：** 

```js
'a1b2c3d4'.replace(/([a-zA-z]\d){3}/g,'A')
//"Ad4"
```





**或：** 

```js
'123456789122312'.replace(/(123|456)/g,'A')
//"AA789122312"
```



**反向引用：**

```js
'2019-10-09'.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$3/$2/$1')
//"09/10/2019"
```



**前瞻：** 

- 正则表达式从文本头部向尾部开始解析，文本尾部方向，称为“前”
- **前瞻** 就是正则表达式匹配到规则的时候，向前检查是否符合断言，后顾/后瞻 方向相反
- JavaScript 不支持 后顾
- 符合和不符合特定断言称为 **肯定/正向**  匹配 和 **否定/负向**  匹配

![mark](http://static.zxinc520.com/blog/20191009/VS8ezfIwVH95.png?imageslim)



```js
'a2*3'.replace(/\w(?=\d)/g,'A')
//"A2*3"
```





### 对象属性

- global：是否全文搜索，默认 false
- ignore case：是否大小写敏感，默认是 false
- multiline：多行搜索，默认值是 false
- lastIndex: 是当前表达式匹配内容的最后一个字符的下一个位置
- source：正则表达式的文本字符串



## [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

> `test()` 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 `true` 或 `false`。

```js
var reg1=/\w/
reg1.test('a')
//true
```

注意：/g（全局匹配 ） 使用test方法，结果不稳定！





## [RegExp.prototype.exec()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

> `exec() `方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。
>
> 如果你只是为了判断是否匹配（true或 false），可以使用 [`RegExp.test()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) 方法，或者 [`String.search()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search) 方法。  


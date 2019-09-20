## 每日一题

> 每天一道大厂前端面试题，一年后再回头，会感谢曾经努力的自己！
>
> 待更新状态
>
> 今天 2019/9/20



### [第 1 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/blob/master/datum/summary.md#%E7%AC%AC-1-%E9%A2%98%E5%86%99-react--vue-%E9%A1%B9%E7%9B%AE%E6%97%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%9C%A8%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%86%99-key%E5%85%B6%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)

**题目**：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

**公司**：滴滴、饿了么

**需了解** ：vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点。在vue的diff函数中。可以先了解一下diff算法。
在交叉对比的时候，当新节点跟旧节点`头尾交叉对比`没有结果的时候，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用一种遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言。map映射的速度更快。

**答案**： 

> key是给每一个vnode的唯一id,可以`依靠key`,更`准确`, 更`快`的拿到oldVnode中对应的vnode节点。
>
> key的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度。

1、更准确

因为带key就不是`就地复用`了，在sameNode函数 `a.key === b.key`对比中可以避免就地复用的情况。所以会更加准确。

2、更快

利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)



### 第 2 题

**题目**：`['1', '2', '3'].map(parseInt)` what & why ?

**答案** ：第一眼看到这个题目的时候，脑海跳出的答案是 [1, 2, 3]，但是 **真正的答案是[1, NaN, NaN]**。

```js
    console.log(parseInt('12'));//12
    console.log(parseInt('08'));//8
    console.log(parseInt('0x16')); //22
    console.log(parseInt('-12')); //-12
    console.log(parseInt('   -12'));//-12
    console.log(parseInt('   -  12'));///NAN
    console.log(parseInt('124ref')); //124
    console.log(parseInt('ref'));   //NAN
```

以上几乎就是`parseInt`函数一个形式参数时的所有情况

radix形参没指定的时候是**10**，其次他是具有有效范围滴：[2, 36]和特殊值0
下面是英语渣渣的我翻译后，简化的`parseInt`执行步骤：（ECMAScript原解析->[传送门](http://www.ecma-international.org/ecma-262/6.0/#sec-parseint-string-radix)）

1. 将第一个形参转换为字符串
2. 识别string转换是否有**code unit**，如果有 -> `-`标记为负数，`0x`或`0X`则把radix赋值为**16**
3. radix形参（int类型）是否存在，存在则重新赋值（会对实参进行Int32转化，无法转换成int类型则不会重新赋值radix）
4. radix为0，则设置radix为默认值10
5. 如果radix为1，或者大于等于37，parseInt直接返回**NaN**
6. 如果radix为[2, 36]时则代表，string参数分别是二进制，三进制（如果有得话~）...三十六进制类型
7. 然后对string进行的radix进制 -> 十进制转换

以上就是`parseInt`转换时的步骤，那么我们来开始解释`['1', '2', '3'].map(parseInt)`
**at first, 答案是[1, NaN, NaN]**

```js
(function (){
        var ret = ['1', '2', '3'].map((value, index)=>{
            console.log(value, index);
            return parseInt(value, index);
        });
        console.log(ret);
    })();
```

这是`['1', '2', '3'].map(parseInt)`内部执行的剖析，`value`和`index`相信大家都懂，不懂请自行[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map),执行步骤为：
`value='1',index=0` -> `parseInt(value, index)`
`value='2',index=1` -> `parseInt(value, index)`
`value='3',index=2` -> `parseInt(value, index)`
抽离出来，其实就是

```js
parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);
```

`parseInt('3', 2)`这是根据二进制对字符串`3`进行十进制转换对吧！！！
exm???有毛病?没毛病，老铁，就是......你家二进制有`3`?二进制不就是`0`和`1`啊

因此返回**NaN**。
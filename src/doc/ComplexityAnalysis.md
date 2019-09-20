# 面试中的复杂度分析

> 很多同学一提起复杂度分析就头疼，马上想起了《算法导论》中复杂的数学推导。但其实在一般的企业面试中，对复杂度的分析要求并没有那么高，但也是绕不过去的坎儿。在这一章，和大家介绍一下，面试中需要掌握的复杂度分析。...



## 2-1 究竟什么是大O（Big O）

#### 大O？

- n 表示数据规模
- O（f(n)）表示运行算法所需要执行的指令数，和 f(n) 成正比

#### 例如

- 二分查找法 O(logn)    ---     所需执行指令数 ：a * logn
- 寻找 数组中的最大/最小值 O(n)    --- 所需执行指令数 ：b * n
- 归并排序算法O(nlogn)   ---  所需执行指令数 ：c * nlogn
- 选择排序法O(n^2)  ---  所需执行指令数 ：d * n^2



### 到底什么是 Big O？

![mark](http://static.zxinc520.com/blog/20190909/61aLQ2wE8prQ.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190909/2PO7UfwEDOpW.png?imageslim)



**在学术界**，严格来讲，O(f(n)) 表示算法执行的上界

归并排序算法的时间复杂度是O(nlogn)的，同时也是O（n^2）



**在业界**，我们就使用O来表示算法执行的最低上界

我们一般不会说归并排序是O(n^2)的



#### 例子

- O（nlogn + n）= O （nlogn）
- O（nlogn + n^2）=O（n^2）



#### 无法判断

- O（AlogA + B） 		-- A 与 B 无法确定
- O（AlogA + B ^2）



- 对邻接表实现的图进行遍历
  - 时间复杂度：O（ V  + E ）



### 一个时间复杂度的问题

有一个字符串数组，将数组中的每一个字符串按照字母序排序；之后再将整个字符串数组按照字典序排序。整个操作的时间复杂度？

![mark](http://static.zxinc520.com/blog/20190909/8cfiXUHkirne.png?imageslim)

正确解答：

- 假设最长的字符串长度为 s ；数组中有 n 个字符串
- 对每个字符串排序：O（slogs）
- 将数组中的每一个字符串按照字母序排序：O（n * slog(s) ）
- 将整个字符串数组按照字典序排序：O（s * nlog(n) ）

![mark](http://static.zxinc520.com/blog/20190909/Q5nKtKe1dCi7.png?imageslim)



### 算法复杂度在有些情况是用例相关的

- 插入排序 O（n ^ 2）
  - 最差情况：O（n ^ 2）
  - 最好情况：O（n）
  - 平均情况：O（n ^ 2）



- 快速排序算法 O （nlogn）
  - 最差情况：O（n ^ 2）
  - 最好情况：O（ nlogn ）
  - 平均情况：O（ nlogn ）



## 2-2 对数据规模有一个概念

### 抛出问题

对 10 ^ 5 的数据进行选择排序，结果计算机假死？



- 如果要想在 1s 之内解决问题：
  - O（n ^ 2）的算法可以处理大约 10 ^ 4 级别的数据
  - O（ n ）的算法可以处理大约 10 ^ 8 级别的数据
  - O（ nlogn ）的算法可以处理大约 10 ^7级别的数据



### 空间复杂度

- 多开一个辅助的数组：O（n）
- 多开一个辅助的二维数组：O（n ^ 2）
- 多开常数空间：O（1）



![mark](http://static.zxinc520.com/blog/20190909/7uFcA2L2OHhI.png?imageslim)



## 2-3 简单的复杂度分析



### O（1）：

![mark](http://static.zxinc520.com/blog/20190909/wmyLLvW5hvGh.png?imageslim)



### O（ n ）：

![mark](http://static.zxinc520.com/blog/20190909/R4zqgJ9zJqqs.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190909/fujJT4N78Ybh.png?imageslim)

1/2 *n次 swap 操作也是：O(n) 。



### O（n ^ 2）: ( 选择排序 )

![mark](http://static.zxinc520.com/blog/20190909/HPtrTeSx6DsB.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190909/rh5JcB9dA8ux.png?imageslim)



并不是所有双重循环都是 O（n ^ 2）：例如 【因为里面的循环次数是固定的 】 

![mark](http://static.zxinc520.com/blog/20190909/Vs0lBjzBPEi9.png?imageslim)

下面算法是 O（logn）级别的： 【 自增并不是每次都加1 】

![mark](http://static.zxinc520.com/blog/20190909/QJC2YLSAOdAk.png?imageslim)

下面算法是O（ sqrt (n) ）【 判断 n 是不是 一个素数】

![mark](http://static.zxinc520.com/blog/20190909/QeClcFN8EsWa.png?imageslim)



### O（logn）：（ 二分查找法 ）

![mark](http://static.zxinc520.com/blog/20190909/HCC3KITFnmlL.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190909/Y18HXPKRMICe.png?imageslim)

#### 整形转成字符串

![mark](http://static.zxinc520.com/blog/20190909/gDCAKNS0NtKo.png?imageslim)





### log 以2为底 和 以  10为底有区别吗

![mark](http://static.zxinc520.com/blog/20190909/hhkkzyo7uTJM.png?imageslim)



## 2-4 亲自试验自己算法的时间复杂度

### 复杂度实验

实验，观察趋势

每次 将数据规模提高两倍，看时间的变化





## 2-5 递归算法的复杂度分析

> 不是有递归的函数就一定是 O（ nlogn  ）！



### 递归中进行一次递归调用的复杂度分析

二分法使用递归：

![mark](http://static.zxinc520.com/blog/20190911/Vrm1PVyknLyf.png?imageslim)



![mark](http://static.zxinc520.com/blog/20190911/HKc9QUhHzufd.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190911/Mrr5oypWBxGk.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190911/1hAzDU4ifP7w.png?imageslim)

引申：上述 函数增加求 负次幂？



### 递归中进行多次递归调用

![mark](http://static.zxinc520.com/blog/20190911/DmVGKhPNOvil.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190911/vlrGbmrXl4uo.png?imageslim)



深度不一样，并不是所有 多次递归调用 的时间复杂度 为：O（2 ^ n）

![mark](http://static.zxinc520.com/blog/20190911/copG1I1hd0ya.png?imageslim)





#### 递归函数的时间复杂度

查阅 **主定理** （面试一般不考察）  





## 2-6 均摊时间复杂度分析（Amortized Time Analysis）

![mark](http://static.zxinc520.com/blog/20190911/lH5rYQsGwqtN.png?imageslim)







##  2-7 避免复杂度的震荡



![mark](http://static.zxinc520.com/blog/20190911/glngyIU8g3Mi.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190911/AFsH4CLIkIE3.png?imageslim)





### 复杂度的震荡的解决方案



![mark](http://static.zxinc520.com/blog/20190911/hwAvgAw9rUM1.png?imageslim)




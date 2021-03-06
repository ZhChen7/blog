# 算法面试到底是什么鬼?

> 玩转算法面试 从真题到思维全面提升算法思维
>
> 为了面试，更为了提升你的算法思维
>
> 一提起算法面试，很多同学就会心有余悸。可其实，大多数企业的算法面试，并没有那么可怕。并不是一定要啃完整本《算法导论》，才能玩儿转算法面试；也并不是只有ACM参赛选手，才能笑傲算法面试。恰恰相反，大多数算法面试关注的算法思维，其实很基础。在这一章，和大家聊一聊，算法面试，到底是什么鬼？...



## 1-1 算法面试不仅仅是正确的回答问题

#### 算法面试是什么？

- 让大家在面对面试中的算法问题时，有一个合理的思考路径
  - 不代表能够“正确”回答每一个算法问题，但是合理的思考方向其实更重要，这也是正确完成算法面试问题的前提
  - 算法面试优秀不意味着技术面试优秀
  - 技术面试优秀不意味着能够拿到 Offer



### 引言

#### 问题：对一组数据进行排序

不假思索思考方向：

- 快速排序算法 O（nlogn）



**正确的方式**是：应该和面试官探讨（ **思考路径** ）：

- 这组数据有什么样的特征？
  - 有没有可能包含有大量重复的元素？
  - 如果有这种可能的话，三路快排是更好的选择。
- 这组数据有什么样的特征？
  - 是否大部分数据距离它正确的位置很近？是否近乎有序？
  - 如果是这样的话，插入排序是更好的选择
- 这组数据有什么样的特征？
  - 是否数据的取值范围非常有限？比如对学生成绩排序
  - 如果是这样的话，计数排序是更好的选择
- 对排序有什么额外的要求？
  - 是否需要稳定排序？
  - 如果是的话，归并排序是更好的选择
- 数据的存储状况是怎么样的？
  - 是否是使用链表存储的？
  - 如果是的话，归并排序是更好的选择
- 数据的存储状态是怎样的？
  - 数据的大小是否可以装载在内存里？
  - 数据量很大，或者内存很小，不足以装载在内存里，需要使用外排序算法



## 1-2 什么是“正确”的回答一个算法问题

**正确**  还包含对问题的独到见解；优化；代码规范；容错性

如果是 非常难的问题，对你的竞争对手来说，也是难的。

关键在于你所表达出的解决问题的思路

甚至通过表达解题思路的方向，得出结论：这个问题的解决方案，应该在哪一个领域，我可以通过查阅或者进一步学习解决问题



### 常见问题

- 项目经历 和 项目中遇到的实际问题
- 你遇到的印象最深的 bug 是什么？
- 面向对象
- 设计模式
- 网络相关；安全相关；内存相关；并发相关
- 系统设计；scalability



技术面试只是面试的一部分。面试不仅仅是考察你的技术水平，还是了解你的过去以及形成的思考行为方式

关于过去：参与项目至关重要



#### 项目经历

- 本科生
  - 毕业设计
  - 其它课程设计(大作业，大一点的程序设计等等)
- 如何找到项目？
  - 实习
  - 参与实战课程学习
    - 慕课网
    - Coursera
- 创建自己的项目
  - 自己做小应用：计划表；备忘录；播放器...
  - 自己解决小问题：爬虫；数据分析；词频统计
  - “不是项目” 的项目：一本优秀的技术书籍的代码整理等...
  - 分享：自己的技术博客；github等等...



#### 行为类问题

通过过去了解你的思考行为方式？

- 遇到的最大的挑战？
- 犯过的错误？
- 遭遇的失败？
- 最享受的工作内容？
- 遇到冲突的处理方式？
- 做的最与众不同的事儿？



#### 准备好合适的问题问面试官

- 整个小组的大概运行模式是怎样的？
- 整个项目的后续规划是如何的？
- 这个产品中的某个问题是如何解决的？
- 为什么会选择某些技术？标准？
- 我对某个技术很感兴趣，在你的小组中我会有怎样的机会深入这种技术？



**算法面试仍然是非常重要的一部分** 



## 1-3 如何准备算法面试

准备面试 和 准备算法面试 是两个概念

算法面试 ，只是面试中的一个环节



## 算法面试并没有那么难

- 远远不需要啃完一本 《算法导论》
  - 过于强调理论证明
- 高级数据结构 和 算法面试提及的概率很低
  - 红黑树
  - 计算几何
  - B - Tree
  - 数论
  - 斐波那契堆
  - FFT

**算法面试远远不需要达到信息学竞赛的水平** 。

![mark](http://static.zxinc520.com/blog/20190908/CNmOn2PupuUn.png?imageslim)



### 算法面试的准备范围

- 不要轻视基础算法 和 数据结构，而只关注 “有意思” 的题目

重点关注：

- 各种排序算法
- 基础数据结构和算法的实现：如堆、二叉树、图....
- 基础数据结构的使用：如链表、栈、队列、哈希表、图、Trie、并查集...
- 基础算法：深度优先、广度优先、二分查找、递归...
- 基本算法思想：递归、分治、回溯搜索、贪心、动态规划...



### 选择合适的 OJ

> OJ：online judge
>
> 在线判题系统

 ![mark](http://static.zxinc520.com/blog/20190908/iW0zhuflnMIs.png?imageslim)



### 推荐

- [LeetCode](https://leetcode-cn.com/)  （ 源于真实的面试问题 ）
- [HackerRank](https://www.hackerrank.com/)   （ 对问题分类很详细 ，更难一点，辅助作用）



**注意**： 在学习和实践做题之间，要掌握平衡



## 1-4 解决算法面试问题的整体思路

### 注意题目中的条件

- 给定一个有序数组...
  - **有序**： 是不是可以使用二分查找法
- 有一些题目中的条件本质是暗示：
  - 设计一个O（nlogn）的算法 
    - 分治法
  - 无需考虑额外的空间
    - 开辟额外的空间
  - 数据规模大概是 10000
    - O（n的二次方）

### 当没有思路的时候

- 自己给自己几个简单的测试用例，试验一下
- 不要忽视暴力解法。暴力解法通常是思考的起点

#### 不要忽视暴力法

![mark](http://static.zxinc520.com/blog/20190908/4H4HSG2k68nE.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190908/DTm490pyX7Vm.png?imageslim)



## 优化算法

### 无头绪的思路

- 遍历常见的算法思路
- 遍历常见的数据结构
- 空间 和 时间的 交换 （ 哈希表 ）
- 预处理信息 （ 排序 ）
- 在瓶颈处寻找答案：O（nlogn）+ O（n ∧ 2）；O（n∧3）



### 实际编写问题

- 极端条件的判断
  - 数组为空？字符串为空？数量为0? 指针为 NULL ？
- 变量名
- 模块化，复用性
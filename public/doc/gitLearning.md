# Git 学习

> Git 学习



### 什么是 Git？

> git -- fast版本控制
>
> [官方网站](https://git-scm.com/)

- Git是一个[免费的开源](https://git-scm.com/about/free-and-open-source) 分布式版本控制系统，旨在快速高效地处理从小型到大型项目的所有事务
- Git [易于学习](https://git-scm.com/doc)， [占地面积小，具有闪电般快速的性能](https://git-scm.com/about/small-and-fast)。它超越了Subversion，CVS，Perforce和ClearCase等SCM工具，具有[廉价本地分支](https://git-scm.com/about/branching-and-merging)，便捷的[临时区域](https://git-scm.com/about/staging-area)和 [多个工作流程等功能](https://git-scm.com/about/distributed)。



### 安装 Git

> [廖雪峰的官方网站 git 安装](https://www.liaoxuefeng.com/wiki/896043488029600/896067074338496)

鼠标 **右键**，选中 `Git Bash Here` 在里面输入相关命令：

![mark](http://static.zxinc520.com/blog/20190711/litoDVMJqNVb.png?imageslim)



## 使用 Git

### 初始化 Git 仓储/（仓库）

1. **新建**一个文件夹

![mark](http://static.zxinc520.com/blog/20190711/9NbV1d2Bf3H2.png?imageslim)



2. **进入**文件夹，鼠标**右键** 选中 `Git Bash Here`，输入命令 `git init` 回车。

![mark](http://static.zxinc520.com/blog/20190711/PApIqKpihnsJ.gif)





### 配置使用者的用户名和邮箱 

> 配置使用者的用户名和邮箱 （自报家门）,每一次备份都会把当前备份者的信息存储起来。
>
> **配置用户名** ： `git config --global user.name "zhouchen"`
>
> **配置邮箱**： `git config --global user.email "1583741285@qq.com"` 

1. 配置使用者的**用户名**：**进入**文件夹，鼠标**右键** 选中 `Git Bash Here`，

   输入命令  `git config --global user.name "zhouchen"` 回车 。

![mark](http://static.zxinc520.com/blog/20190711/FUG7gTH6S2Mh.png?imageslim)

2. 同样的配置使用者的 **邮箱**：**进入**文件夹，鼠标**右键** 选中 `Git Bash Here`，

   输入命令  `git config --global user.email "1583741285@qq.com"` 回车 。

![mark](http://static.zxinc520.com/blog/20190711/p62Mz0UPYcY9.png?imageslim)



### 把代码 存储到仓库中

> 把代码 存储到仓库中

**需求**：将 readme.md 文件 存储到仓库中

![mark](http://static.zxinc520.com/blog/20190711/KwUDn18LHU1f.png?imageslim)

1. **进入**文件夹，鼠标**右键** 选中 `Git Bash Here`，

   输入命令 `git add ./readme.md` 回车 。

![mark](http://static.zxinc520.com/blog/20190711/P1DnSzDuSOBO.png?imageslim)



2.  紧接上一步，输入命令 `git commit -m "add Introductions"` 回车 。

   <u>add Introductions</u>-----可以自定义，一个辅助的解释 **说明**。

![mark](http://static.zxinc520.com/blog/20190711/FqHM4n7stzsF.png?imageslim)



#### 查看提交状态

命令：`git status`

![mark](http://static.zxinc520.com/blog/20190711/85IXkLM5Wusf.png?imageslim)



#### add 补充 -- 添加到大门口

命令 ：`git add .`



#### 一次性 -- 放入仓库

> 合并 add 和 commit 命令

命令：`git commit --all -m "这是一次性的操作"`





### git 查看日志

> 查看日志----能够查看自己提交的信息
>
> `git log`：查看历史提交的日志
>
> `git log --oneline` 可以看到精简版的日志

命令：`git log`

![mark](http://static.zxinc520.com/blog/20190711/PBubR1jYW0fX.png?imageslim)



命令：`git log --oneline`  

![mark](http://static.zxinc520.com/blog/20190711/bDLltWMjdSo2.png?imageslim)



### git 版本回退

> git 版本回退
>
> 场景：如果最后一次提交的代码有误，可以通过git 版本回退，回到代码无误的那一个状态。

1.  使用命令 `git log --oneline`查看状态

![mark](http://static.zxinc520.com/blog/20190711/3RDzcU0Fo8Vy.png?imageslim)

2. 命令：`git reset --hard Head~0 ` ( 向后退 **0** 次)

![mark](http://static.zxinc520.com/blog/20190711/Uobb7X1EwPUd.png?imageslim)

3. 命令：`git reset --hard Head~1` （向后退 **1** 次）；此时代码回退了**一次** 。

![mark](http://static.zxinc520.com/blog/20190711/3lM4UYpv7mQw.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190711/rwuTTeqbAFNc.png?imageslim)


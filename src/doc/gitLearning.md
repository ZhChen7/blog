# Git 学习

> **Git 学习**
>
> Git的优势
>
> Git与SVN的主要区别
>
> 安装 Git
>
> 初始化 Git 仓储/（仓库）
>
> 配置使用者的用户名和邮箱 
>
> 把代码 存储到仓库中
>
> Git 查看日志
>
> Git 版本回退
>
> Git 分支的新建与合并
>
> 上传至 github
>
> 通过 ssh 方式 上传 代码
>
> push 和 pull 简写



### 什么是 Git？

> git -- fast版本控制
>
> Git 是由“Linux之父” **Linus Torvalds** 创建的。因为他发现找不到满意的方案来管理 Linux Kernel 联合开发的版本控制，就自己写了 Git。
>
> [官方网站](https://git-scm.com/)

- Git是一个[免费的开源](https://git-scm.com/about/free-and-open-source) 分布式版本控制系统，旨在快速高效地处理从小型到大型项目的所有事务
- Git [易于学习](https://git-scm.com/doc)， [占地面积小，具有闪电般快速的性能](https://git-scm.com/about/small-and-fast)。它超越了Subversion，CVS，Perforce和ClearCase等SCM工具，具有[廉价本地分支](https://git-scm.com/about/branching-and-merging)，便捷的[临时区域](https://git-scm.com/about/staging-area)和 [多个工作流程等功能](https://git-scm.com/about/distributed)。



### Git的优势

说到优势，那么自然是相对与SVN而言的

1. **版本库本地化，支持离线提交，相对独立不影响协同开发。**每个开发者都拥有自己的版本控制库，在自己的版本库上可以任意的执行提交代码、创建分支等行为。例如，开发者认为自己提交的代码有问题？没关系，因为版本库是自己的，回滚历史、反复提交、归并分支并不会影响到其他开发者。

2. **更少的“仓库污染”。**git对于每个工程只会产生一个.git目录，这个工程所有的版本控制信息都在这个目录中，不会像SVN那样在每个目录下都产生.svn目录。

3. **把内容按元数据方式存储，完整克隆版本库。**所有版本信息位于.git目录中，它是处于你的机器上的一个克隆版的版本库，它拥有中心版本库上所有的东西，例如标签、分支、版本记录等。

4. **支持快速切换分支方便合并，比较合并性能好。**在同一目录下即可切换不同的分支，方便合并，且合并文件速度比SVN快。

5. **分布式版本库，无单点故障，内容完整性好。**内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。

   

### Git与SVN的主要区别

Git是**分布式**SCM，而SVN是基于**服务器**的，也就是说每个开发者本地都有一套git库，每个人维护自己的版本（或者合并其他人的版本），而SVN是每个人写完代码后都及时的checkin到服务器上，进行合并。



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





### Git 查看日志

> 查看日志----能够查看自己提交的信息
>
> `git log`：查看历史提交的日志
>
> `git log --oneline` 可以看到精简版的日志

命令：`git log`

![mark](http://static.zxinc520.com/blog/20190711/PBubR1jYW0fX.png?imageslim)



命令：`git log --oneline`  

![mark](http://static.zxinc520.com/blog/20190711/bDLltWMjdSo2.png?imageslim)



### Git 版本回退

> git 版本回退
>
> 场景：如果最后一次提交的代码有误，可以通过git 版本回退，回到代码无误的那一个状态。

#### 根据索引回退

1.  使用命令 `git log --oneline`查看状态

![mark](http://static.zxinc520.com/blog/20190711/3RDzcU0Fo8Vy.png?imageslim)

2. 命令：`git reset --hard Head~0 ` ( 向后退 **0** 次)

![mark](http://static.zxinc520.com/blog/20190711/Uobb7X1EwPUd.png?imageslim)

3. 命令：`git reset --hard Head~1` （向后退 **1** 次）；此时代码回退了**一次** 。

![mark](http://static.zxinc520.com/blog/20190711/3lM4UYpv7mQw.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190711/rwuTTeqbAFNc.png?imageslim)



#### 通过版本号回退

> 通过版本号回退

![mark](http://static.zxinc520.com/blog/20190712/VsLjP0uf8h8D.png?imageslim)

命令：`git reset --hard ac97cbc `  回车执行

![mark](http://static.zxinc520.com/blog/20190712/puqQzAUO57un.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190712/4b2kofXa5m3B.png?imageslim)



#### git reflog

> 可以看到每一次切换版本记录

命令：`git reflog` 查看总体记录

![mark](http://static.zxinc520.com/blog/20190712/rIsddoYu54q2.png?imageslim)





### Git 分支的新建与合并

> git 创建分支
>
> 运用场景：放开发者只开发完成部分代码，想保存代码,为了能够后续继续开发，可以创建分支。

**现在让我们来看一个简单的分支与合并的例子，实际工作中大体也会用到这样的工作流程：**

1. 开发某个网站。
2. 为实现某个新的需求，创建一个分支。
3. 在这个分支上开展工作。

**假设此时，你突然接到一个电话说有个很严重的问题需要紧急修补，那么可以按照下面的方式处理：**

1. 返回到原先已经发布到生产服务器上的分支。
2. 为这次紧急修补建立一个新分支，并在其中修复问题。
3. 通过测试后，回到生产服务器所在的分支，将修补分支合并进来，然后再推送到生产服务器上。
4. 切换到之前实现新需求的分支，继续工作。



### Git 分支的新建

**新建分支** ：命令：`git branch <name>`

![mark](http://static.zxinc520.com/blog/20190712/vCIxtjnYlgsu.png?imageslim)

**查看分支信息** ：命令：`git branch` （ **绿色**  --> 代表正处于此分支）

![mark](http://static.zxinc520.com/blog/20190712/R3t4POgEphiO.png?imageslim)

**切换分支** ：命令 `git checkout dev`

![mark](http://static.zxinc520.com/blog/20190712/MQQVVoNGu41k.png?imageslim)



#### 在分支中提交部分代码

> 类似于主分支 提交（一样）

![mark](http://static.zxinc520.com/blog/20190712/gBcACkrl5Gxf.png?imageslim)



### Git 合并分支

> 合并分支
>
> **需求**：将 dev 分支 合并到主分支（master分支）上。

1.  切换到 **master** 分支：命令：`git checkout master`

![mark](http://static.zxinc520.com/blog/20190712/bKIzXXwv3Xnm.png?imageslim)

2. 合并 dev 分支 到 master 分支上：命令：`git merge dev`

![mark](http://static.zxinc520.com/blog/20190712/uMQR0k4u6qTT.png?imageslim)

3. 查看自己的提交记录 命令：`git log --oneline`

![mark](http://static.zxinc520.com/blog/20190712/gu7FKi6tGBkf.png?imageslim)



### 上传至 github

> `git push [地址] master`
>
> [参考廖雪峰的官方网站 github 篇](https://www.liaoxuefeng.com/wiki/896043488029600/900937935629664)
>
> 【地址】：例如：https://github.com/ZhChen7/Travel.git



**git push** 推项目到 github：`git push [地址] master`



####  从 github 拉下项目

> github 拉下项目
>
> 【地址】：例如：https://github.com/ZhChen7/Travel.git



**git pull** 从 github 拉下项目 ：`git pull [地址] master`

**git clone** 从 github 复制项目（往往在第一次使用）：`git clone [地址]`



### 通过 ssh 方式 上传 代码

> 公钥 和 私钥 ；两者之间是有关联的。



1. 生成 **公钥** 和 **私钥** 

   命令：`ssh-keygen -t rsa -C <邮箱>`

![mark](http://static.zxinc520.com/blog/20190712/2GKvEKipn11B.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190712/9qHzNoUvBgy2.png?imageslim)



**找到生成的文件** ：

![mark](http://static.zxinc520.com/blog/20190712/DPxGphRT9AXv.png?imageslim)



**给自己的github 配置 ssh** ：

![mark](http://static.zxinc520.com/blog/20190712/eK9KUtgXVIrN.png?imageslim)





### 提交冲突

> 先 **pull** 还是 先 **push**
>
> 应用场景：多人共同提交时，产生提交冲突时。



**解决方案**：**先pull** 然后 **后push**







### push 和 pull 简写

> push 和 pull 简写
>
> 【地址简写】：`git remote add <变量名> <远程地址>` 



**配置远程地址**（设置别名）：方便每一次不用输入很长的地址

命令：`git remote add origin git@github.com:ZhChen7/Travel.git`

即：为 `git@github.com:ZhChen7/Travel.git`设置别名：  **origin ** 



#### 默认关联

> 当我们在 push时，加上 **-u 参数** ，那么在**下次 push 时**；只用 写 `git push` 即可上传代码。
>
> （加上 **-u** 之后，git 会把当前分支 与 远程指定的分支 进行**关联**）



下次 直接写 `git push` 相当于 写 `git push origin master` 。
# 操作系统课程设计

![mark](http://static.zxinc520.com/blog/20190615/PaXCTq1hgEbO.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190615/HbzHoGRT91yz.png?imageslim)



| 课题 | 操作系统             |
| ---- | -------------------- |
| 院系 | 计算机与信息工程学院 |
| 班级 | 1701                 |
| 姓名 | 周琛                 |
| 学号 | 2017115010124        |

 

 

## 实验一  处理器调度

### 一、实习内容

​	选择一个调度算法，实现处理器调度。

### 二、实习目的

​	在采用多道程序设计的系统中，往往有若干个进程同时处于就绪状态。当就绪进程个数大于处理器数时，就必须依照某种策略来决定哪些进程优先占用处理器。本实习模拟在单处理器情况下的处理器调度，帮助学生加深了解处理器调度的工作。

### 三、实习题目

​	本实习有两个题，学生可选择其中的一题做实习。

​	第一题：设计一个**按优先数调度算法**实现处理器调度的程序。

#### 提示:

1. 假定系统有五个进程，每一个进程用一个进程控制块PCB来代表，进程控制块的**格式为**：

   ![mark](http://static.zxinc520.com/blog/20190615/BvLSkm8uRm2W.png?imageslim)

其中，进程名——作为进程的标识，假设五个进程的进程名分别为P1，P2，P3，P4，P5。

- 指针——按优先数的大小把五个进程连成队列，用指针指出下一个进程的进程控制块的首地址，最后一个进程中的指针为“0”。
- 要求运行时间——假设进程需要运行的单位时间数。
- 优先数——赋予进程的优先数，调度时总是选取优先数大的进程先执行。
- 状态——可假设有两种状态，“就绪”状态和“结束”状态。五个进程的初始状态都为“就绪”，用“R”表示，当一个进程运行结束后，它的状态为“结束”，用“E”表示。

2. 在每次运行你所设计的处理器调度程序之前，为每个进程任意确定它的“优先数”和“要求运行时间”。
3. 为了调度方便，把五个进程按给定的优先数从大到小连成队列。用一单元指出队首进程，用指针指出队列的连接情况。例：

 

  **队首标志**

![mark](http://static.zxinc520.com/blog/20190615/cAeym1O3lvaj.png?imageslim)

4. 处理器调度总是选队首进程运行。采用动态改变优先数的办法，进程每运行一次优先数就减“1”。由于本实习是模拟处理器调度，所以，对被选中的进程并不实际的启动运行，而是执行：

![mark](http://static.zxinc520.com/blog/20190615/nEAGCE9sJJqJ.png?imageslim)



**提醒注意的是：**在实际的系统中，当一个进程被选中运行时，必须恢复进程的现场，让它占有处理器运行，直到出现等待事件或运行结束。在这里省去了这些工作。

5. 进程运行一次后，若要求运行时间¹0，则再将它加入队列（按优先数大小插入，且置队首标志）；若要求运行时间=0，则把它的状态修改成“结束”（E），且退出队列。
6. 若“就绪”状态的进程队列不为空，则重复上面（4）和（5）的步骤，直到所有进程都成为“结束”状态。
7. 在所设计的程序中应有显示或打印语句，能显示或打印每次被选中进程的进程名以及运行一次后进程队列的变化。
8. 为五个进程任意确定一组“优先数”和“要求运行时间”，启动所设计的处理器调度程序，显示或打印逐次被选中进程的进程名以及进程控制块的动态变化过程。

 

**源代码:**

```js
#include <stdio.h>
#include <string.h> //strcpy()
#include<stdlib.h>//malloc()
void insertQuestion();
void insertNode(char ProcessName[5],int Priority,int Time);
void view();
void arithmetic();
typedef struct process
{
    char ProcessName[5];
    int Priority;
    int Time;
    int processState;
    struct process *next;
}nodelist;

nodelist *pHead=NULL;//存放调度的首节点地址

int main(){
    insertQuestion();
    arithmetic();
    // view();
    return 0;
}

//添加问题
void insertQuestion()
{
    void insertNode(char ProcessName[5],int Priority,int Time);
    char ProcessName[5];
    int Priority;
    int Time;
    int i=0;
    int n;
    scanf("%d",&n);
    for (i = 0; i < n; i++)
    {
      scanf("%s %d %d",ProcessName,&Priority,&Time);
      insertNode(ProcessName,Priority,Time);
    }
}

//将数据插入链表
void insertNode(char ProcessName[5],int Priority,int Time)
{
    //申请存储空间
    nodelist *pNew=(nodelist *)malloc(sizeof(nodelist));
    nodelist *p,*q;
    strcpy(pNew->ProcessName,ProcessName);
    pNew->Priority = Priority;
    pNew->Time = Time;
    pNew->processState=1;
    pNew->next=NULL;
        if(pHead==NULL) //插入前链表为空，新插入的节点为头节点
        {
            pHead=pNew;    
        }
        else  
        {
            p=pHead;
            if(p->next!=0)   
            {
                while(p->next!=0)
                {
                q=p->next;
                p=q;
                }
                p->next=pNew;
                pNew->next=NULL;
            }
            else if (p->next==0) 
            {
                p->next=pNew;
                p=pNew;
                pNew->next=NULL;
            }

        }
}

//显示链表中的数据
void view()
{
    /* 显示所有的结果 */
    nodelist *p=pHead;
    if(pHead!=NULL)
    {      
    	    printf("进程名\t优先数\t时间\t就绪状态\n");
            while(p!=NULL)
            {    
                printf("%s\t",p->ProcessName);
                printf("%d\t",p->Priority);
                printf("%d\t",p->Time);
                 printf("%d\t",p->processState);
                p=p->next;
                printf("\n");
            }
    }
    else
    {
      printf("链表中啥都没有！\n");
    }
}


void arithmetic()
{
    //相关算法实现
    nodelist *p=pHead;
    nodelist *q=pHead;
    nodelist *m=pHead;
    int max=p->Priority;
    int flag=0;
    int i;
    int sum=0;
    char firstName[5];
    char ReturnProcessName[5];
    strcpy(ReturnProcessName,p->ProcessName);

    if(pHead!=NULL)
    {      

    while(m!=0){
        sum+=m->Time;
        m=m->next;
    }


        for (i = 0; i < sum; ++i)
        {
            while(p!=NULL)
            {    
                if( max < (p->Priority) && (p->Time>0)){
                    max= p->Priority;
                    strcpy(ReturnProcessName,p->ProcessName);
                    flag=1;
                }

              
                p=p->next;

            }
                      while(q!=NULL)
                        {    
                            if(strcmp(q->ProcessName,ReturnProcessName) == 0){
                            	printf("\n");
                            	printf("被选中进程的进程名:");
                                printf("%s\n",q->ProcessName);
                                q->Priority--;
                                q->Time--;
                            }
	                              if (q->Time==0)
					                {
					                	q->processState=0;
					                }
                            q=q->next;                    
                        }
                    p=pHead;
                    q=pHead;
                    max=p->Priority;
                    printf("\n");
                    printf("运行一次后进程队列的变化:\n");
                    printf("----------------------------------\n");
                    view();
                    printf("\n");

                    strcpy(ReturnProcessName,p->ProcessName);            
        }        
    }
}
```



**运行结果:**

![mark](http://static.zxinc520.com/blog/20190615/1Xn16500J847.jpg?imageslim)

 

![mark](http://static.zxinc520.com/blog/20190615/qCGSz0Azzdif.jpg?imageslim)

![mark](http://static.zxinc520.com/blog/20190615/FMiq4WyNObOV.gif)

 

 

## 实验二   主存储器空间的分配和回收

### 一、实习内容

​	主存储器空间的分配和回收。

### 二、实习目的

​	一个好的计算机系统不仅要有一个足够容量的、存取速度高的、稳定可靠的主存储器，而且要能合理地分配和使用这些存储空间。当用户提出申请存储器空间时，存储管理必须根据申请者的要求，按一定的策略分析主存空间的使用情况，找出足够的空闲区域分配给申请者。当作业撤离或主动归还主存资源时，则存储管理要收回作业占用的主存空间或归还部分主存空间。主存的分配和回收的实现虽与主存储器的管理方式有关的，通过本实习帮助学生理解在不同的存储管理方式下应怎样实现主存空间的分配和回收。

### 三、实习题目

​	模拟在分页式管理方式下采用位示图来表示主存分配情况，实现主存空间的分配和回收。

#### 提示：

1. 分页式存储器把主存分成大小相等的若干块，作业的信息也按块的大小分页，作业装入主存时可把作业的信息按页分散存放在主存的空闲块中，为了说明主存中哪些块已经被占用，哪些块是尚未分配的空闲块，可用一张位示图来指出。位示图可由若干存储单元来构成，其中每一位与一个物理块对应，用0/1表示对应块为空闲/已占用。

2. 假设某系统的主存被分成大小相等的64块，则位示图可用8个字节来构成，另用一单元记录当前空闲块数。如果已有第0，1，4，5，6，9，11，13，24，31，共10个主存块被占用了，那么位示图情况如下：

    ![mark](http://static.zxinc520.com/blog/20190615/y2yBXTmrC7SP.png?imageslim)

 

3. 当要装入一个作业时，根据作业对主存的需要量，先查当前空闲块数是否能满足作业要求，若不能满足则输出分配不成功。若能满足，则查位示图，找出为“0”的一些位，置上占用标志“1”，从“当前空闲块数”中减去本次占用块数。

![mark](http://static.zxinc520.com/blog/20190615/Wq5YpOTIc25K.png?imageslim)



其中，j表示找到的是第n个字节，I表示对应的是第n位。

根据分配给作业的块号，为作业建立一张**页表**，页表格式：

 ![mark](http://static.zxinc520.com/blog/20190615/fWnQmUT7up8x.png?imageslim)

 

4. 当一个作业执行结束，归还主存时，根据该作业的页表可以知道应归还的块号，由块号可计算出在位示图中的对应位置，把对应位的占用标志清成“0”，表示对应的块已成为空闲块。归还的块数加入到当前空闲块数中。由块号计算在位示图中的位置的公式如下：

   ![mark](http://static.zxinc520.com/blog/20190615/0zJ5vnMejiNd.png?imageslim)

   

5. 设计实现主存分配和回收的程序。假定位示图的初始状态如（2）所述，现有一信息量为5页的作业要装入，运行你所设计的分配程序，为作业分配主存且建立页表（格式如（3）所述）。然后假定有另一作业执行结束，它占用的块号为第4，5，6和31块，运行你所设计的回收程序，收回作业归还的主存块。

要求能显示和打印分配或回收前后的位示图和当前空闲块数，对完成一次分配后还要显示或打印为作业建立的页表。

### 四、实习报告

1. 实习题目。
2. 程序中使用的数据结构及符号说明。
3. 流程图。
4. 打印一份源程序并附上注释。
5. 打印程序运行时的初值和运行结果，要求如下：



#### 输出要求: 

​		打印位示图和当前空闲块数的初值；要求装入的作业对主存的申请量，为作业分配后的位示图、当前空闲块数和页表；作业归还的块号、回收作业所占主存后的位示图和当前空闲块数。

 

 

**源代码:**

```js
#include "stdio.h"
int main()
{
  int arr[64]={0};
  int n=0;
  int sumsheng=54;
  int i=0,j=0;
  int count=0;
  int indexI=0;
  int flag=0;
  int arr1[64];
  int finallyIndex=0;
  int arrindex=0;
  int arrindex2=0;
  int indexflag=0;
  int x[64]={0};
  int ReturnNum=0;
  int term;
  arr[0]=1;
  arr[1]=1;
  arr[4]=1;
  arr[5]=1;
  arr[6]=1;
  arr[9]=1;
  arr[11]=1;
  arr[13]=1;
  arr[24]=1;
  arr[31]=1;


  printf("装入的作业对主存的申请量:");
  scanf("%d",&n);

  // printf("%d\n", sumsheng);
printf("\n");
printf("\n");
printf("-------------------------------------\n");
printf("初始位示图:\n");
for (i = 0; i < 64; i++)
{
  if (i%8==0)
  {
    printf("\n");
  }
  printf("%d ",arr[i]);
}
printf("\n");
printf("\n");
printf("当前空闲块数的初值:%d\n",sumsheng );
printf("-------------------------------------\n");  
printf("\n");
printf("\n");
printf("\n");
sumsheng=sumsheng-n;

if (n>sumsheng)
    {
      printf("分配不成功\n");
    }else{
        for (i = 0; i < 64; i++)
        {
          if (arr[i]==0)
          {
            indexI=i;
            goto LOOP;
          }
        }
     
       LOOP:for(i=indexI;i<64;i++){

          if (arr[i]==0)
          {
            arr[i]=1;
            arr1[indexflag]=i;
            indexflag++;
            count++;
            if(count==n){
                 finallyIndex=i;
                 goto A;

            }
          }
        }
       A:printf("\n");
      
    }



printf("-------------------------------------\n");
printf("为作业分配后的位示图:\n");
for (i = 0; i < 64; i++)
{
  if (i%8==0)
  {
    printf("\n");
  }
  printf("%d ",arr[i]);
}
printf("\n");
printf("\n");
printf("为作业分配后的空闲块数:%d\n",sumsheng);
printf("\n");
printf("页表:\n");
printf("页号\t块号\n");
for (i = 0; i < n; i++)
{
  printf("%d\t%d\n",i,arr1[i]);
}
printf("-------------------------------------\n"); 


printf("\n");
printf("\n");
printf("\n");
printf("-------------------------------------\n"); 
printf("输入作业归还的块号的数量:");
scanf("%d",&ReturnNum);
printf("输入作业归还的块号:");
 for (i = 0; i <ReturnNum ; i++)
    {
        scanf("%d",&x[i]);  
    }

    for (i = 0; i < ReturnNum; i++)
    {
       term=x[i];
       arr[term]=0;
    }
printf("回收作业所占主存后的位示图:\n");
for (i = 0; i < 64; i++)
{
  if (i%8==0)
  {
    printf("\n");
  }
  printf("%d ",arr[i]);
}
printf("\n");
printf("\n");
printf("当前空闲块数:%d\n",sumsheng+ReturnNum);
printf("-------------------------------------\n"); 
    return 0;
}
```



**运行结果:**

![mark](http://static.zxinc520.com/blog/20190615/oPYSHAezbqWC.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190615/5tuH6MxvT5cc.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190615/Mhg1pbnGuPwe.png?imageslim)

![mark](http://static.zxinc520.com/blog/20190615/DePT3qGywNBk.gif)

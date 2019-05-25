## 操作系统进程调度作业

> 操作系统进程调度作业
>
> 锻炼下思维！

#### 进程调度1

问题描述：要求输入3个进程，找出最先执行的那个进程的进程名。（如果遇到优先级一样，按照输入顺序执行。），本题中，优先数数值大的表示优先级比较高。

输入格式：程序要求输入3行，以回车符号作为分隔，每行有3个数据，以空格作为分隔。首先输入一个字符串（长度小于等于10），为进程名，第2个数据类型为整型，表示进程的优先数，第3个数据类型为整型，表示进程的运行时间。

输出格式：输出一个字符串，为最先执行进程的进程名。

*样例输入1：*

P1 1 1

P2 2 2

P3 3 3

样例输出1：

P3



 

*样例输入2：*

P1 10 10

P2 100 100

P3 100 100 

样例输出2：

P2

**链表实现：**

```js
#include <stdio.h>
#include <string.h> //strcpy()
#include <stdlib.h>//malloc()
void insertQuestion();
void insertNode(char ProcessName[5],int Priority,int Time);
void view();
void arithmetic();
typedef struct process
{
	char ProcessName[5];
	int Priority;
	int Time;
	struct process *next;
}nodelist;

nodelist *pHead=NULL;//存放调度的首节点地址

int main(void){
    insertQuestion();
    arithmetic();
	system("pause");
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
	for (i = 0; i < 3; i++)
	{
	  scanf("%s",ProcessName);
	  scanf("%d",&Priority);
	  scanf("%d",&Time);
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
	pNew->next=NULL;
	// printf("5\n");
		if(pHead==NULL) //插入前链表为空，新插入的节点为头节点
		{
			pHead=pNew;	
			//p1=pHead;
		}
		else  
		{
			//将地址为pNew的节点插入到首地址为pHead的链表的尾部
			/*p1->next=pNew;
			p1=pNew;    
			pNew->next=NULL;*/
			p=pHead;
			//q=(nodelist *)malloc(sizeof(nodelist));
			if(p->next!=0)     //文件不为空，即pHead后面有数据
			{
				while(p->next!=0)
				{
				q=p->next;
			    p=q;
				}
				p->next=pNew;
				pNew->next=NULL;
			}
			else if (p->next==0) //只有头结点，即pHead后面无数据
			{
				//将地址为pNew的节点插入到首地址为pHead的链表的尾部
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
			while(p!=NULL)
			{	
				printf("%s ",p->ProcessName);
				printf("%d ",p->Priority);
				printf("%d ",p->Time);
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
	int max=p->Priority;
	int flag=0;
	char firstName[5];
	char ReturnProcessName[5];
	strcpy(firstName,p->ProcessName);
	if(pHead!=NULL)
	{      
			while(p!=NULL)
			{	
				if( max < (p->Priority)){
                    max= p->Priority;
                    strcpy(ReturnProcessName,p->ProcessName);
					flag=1;
				}
				p=p->next;
			}
	}
	if(flag==1){
		printf("%s\n",ReturnProcessName);
	}else{
		printf("%s\n",firstName);
	}
	
}
```

![mark](http://static.zxinc520.com/blog/20190513/liF2w98LPKem.gif)

​				 ![mark](http://static.zxinc520.com/blog/20190513/XXOxTOQJ8P0H.gif)	

#### 进程调度2

问题描述：要求输入N个进程（0<N<=100），找出最后执行的那个进程的进程名。（如果遇到优先级一样，按照输入顺序执行。），本题中，优先数数值较高的优先级也较高。

输入格式：程序首先要求输入一个整型值N，接下来输入为N行，以回车符号作为分隔，每行有3个数据，以空格作为分隔。首先输入一个字符串（长度小于等于10），该字符串为进程名。第2个数据类型为整型，表示进程的优先数。第3个数据类型为整型，表示进程的运行时间。

输出格式：输出一个字符串，为最后执行进程的进程名。

 

*样例输入1：*

3

P1 1 1

P2 2 2

P3 3 3

样例输出1：

P3

 



*样例输入2：*

2

P1 10 10

P2 100 100

样例输出2：

P2



**源代码：**

```js
#include <stdio.h>
#include <string.h> //strcpy()
#include <stdlib.h>//malloc()
void insertQuestion();
void insertNode(char ProcessName[5],int Priority,int Time);
void view();
void arithmetic();
typedef struct process
{
	char ProcessName[5];
	int Priority;
	int Time;
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
	pNew->next=NULL;
	// printf("5\n");
		if(pHead==NULL) //插入前链表为空，新插入的节点为头节点
		{
			pHead=pNew;	
			//p1=pHead;
		}
		else  
		{
			//将地址为pNew的节点插入到首地址为pHead的链表的尾部
			/*p1->next=pNew;
			p1=pNew;    
			pNew->next=NULL;*/
			p=pHead;
			//q=(nodelist *)malloc(sizeof(nodelist));
			if(p->next!=0)     //文件不为空，即pHead后面有数据
			{
				while(p->next!=0)
				{
				q=p->next;
			    p=q;
				}
				p->next=pNew;
				pNew->next=NULL;
			}
			else if (p->next==0) //只有头结点，即pHead后面无数据
			{
				//将地址为pNew的节点插入到首地址为pHead的链表的尾部
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
			while(p!=NULL)
			{	
				printf("%s ",p->ProcessName);
				printf("%d ",p->Priority);
				printf("%d ",p->Time);
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
	char FinallProcessName[5];
	strcpy(ReturnProcessName,p->ProcessName);



	if(pHead!=NULL)
	{      

	while(m!=0){
		sum+=m->Time;
	    m=m->next;
	}
    // printf("1\n");
    // printf("%d\n",sum);
    // printf("2\n");


		for (int i = 0; i < sum; ++i)
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
							// printf("ReturnProcessName:%s\n", ReturnProcessName);
					      	//printf("q->ProcessName:%s\n",q->ProcessName);
					      	//printf("\n");
				  	while(q!=NULL)
						{	
							 // printf("ReturnProcessName:%s\n", ReturnProcessName);
      						 // printf("q->ProcessName:%s\n",q->ProcessName);
							if(strcmp(q->ProcessName,ReturnProcessName) == 0){
								// printf("%s ",q->ProcessName);
                                strcpy(FinallProcessName,q->ProcessName);
								q->Priority--;
								q->Time--;
							}
							q=q->next;					
						}
					p=pHead;
					q=pHead;
					max=p->Priority;
					// printf("\n");
					// view();
					// printf("\n");
					
					strcpy(ReturnProcessName,p->ProcessName);
			
		}	
			printf("%s\n",FinallProcessName);
	}
}
```

![mark](http://static.zxinc520.com/blog/20190513/HbsJqnfhPfHR.gif)



![mark](http://static.zxinc520.com/blog/20190513/Ge7alyBXmauM.gif)

#### 进程调度3

问题描述：要求输入N个进程（N为正整型数，0<N<=25535），输出按照优先级从高到低执行的进程名字符串序列,直至结束。（如果遇到优先级一样，按照输入顺序先后执行。），本题中，优先数数值较高的进程，优先级也较高。

输入格式：程序首先要求输入一个整型变量N，接下来输入为N行，以回车符号作为分隔，每行有3个数据，以空格作为分隔。首先输入一个字符串（长度小于等于10），该字符串为进程名。第2个数据类型为整型，表示进程的优先数。第3个数据类型为整型，表示进程的运行时间。

输出格式：输出1行，M个字符串，字符串之间用空格作为分隔。

 

样例输入1：

3

P1 1 1

P2 2 2

P3 3 3

样例输出1：

P3 P2 P3 P1 P2 P3

 



样例输入2：

2

P1 3 3

P2 1 1

样例输出2：

P1 P1 P1 P2

 



样例输入3：

100

P0 0 1 P1 1 1 P2 2 1 P3 3 1 P4 4 1 P5 5 1 P6 6 1 P7 7 1 P8 8 1 P9 9 1 P10 10 1 P11 11 1 P12 12 1 P13 13 1 P14 14 1 P15 15 1 P16 16 1 P17 17 1 P18 18 1 P19 19 1 P20 20 1 P21 21 1 P22 22 1 P23 23 1 P24 24 1 P25 25 1 P26 26 1 P27 27 1 P28 28 1 P29 29 1 P30 30 1 P31 31 1 P32 32 1 P33 33 1 P34 34 1 P35 35 1 P36 36 1 P37 37 1 P38 38 1 P39 39 1 P40 40 1 P41 41 1 P42 42 1 P43 43 1 P44 44 1 P45 45 1 P46 46 1 P47 47 1 P48 48 1 P49 49 1 P50 50 1 P51 51 1 P52 52 1 P53 53 1 P54 54 1 P55 55 1 P56 56 1 P57 57 1 P58 58 1 P59 59 1 P60 60 1 P61 61 1 P62 62 1 P63 63 1 P64 64 1 P65 65 1 P66 66 1 P67 67 1 P68 68 1 P69 69 1 P70 70 1 P71 71 1 P72 72 1 P73 73 1 P74 74 1 P75 75 1 P76 76 1 P77 77 1 P78 78 1 P79 79 1 P80 80 1 P81 81 1 P82 82 1 P83 83 1 P84 84 1 P85 85 1 P86 86 1 P87 87 1 P88 88 1 P89 89 1 P90 90 1 P91 91 1 P92 92 1 P93 93 1 P94 94 1 P95 95 1 P96 96 1 P97 97 1 P98 98 1 P99 99 1

样例输出3：

P100 P99 P98 P97 P96 P95 P94 P93 P92 P91 P90 P89 P88 P87 P86 P85 P84 P83 P82 P81 P80 P79 P78 P77 P76 P75 P74 P73 P72 P71 P70 P69 P68 P67 P66 P65 P64 P63 P62 P61 P60 P59 P58 P57 P56 P55 P54 P53 P52 P51 P50 P49 P48 P47 P46 P45 P44 P43 P42 P41 P40 P39 P38 P37 P36 P35 P34 P33 P32 P31 P30 P29 P28 P27 P26 P25 P24 P23 P22 P21 P20 P19 P18 P17 P16 P15 P14 P13 P12 P11 P10 P9 P8 P7 P6 P5 P4 P3 P2 P1



源代码：

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
	pNew->next=NULL;
	// printf("5\n");
		if(pHead==NULL) //插入前链表为空，新插入的节点为头节点
		{
			pHead=pNew;	
			//p1=pHead;
		}
		else  
		{
			//将地址为pNew的节点插入到首地址为pHead的链表的尾部
			/*p1->next=pNew;
			p1=pNew;    
			pNew->next=NULL;*/
			p=pHead;
			//q=(nodelist *)malloc(sizeof(nodelist));
			if(p->next!=0)     //文件不为空，即pHead后面有数据
			{
				while(p->next!=0)
				{
				q=p->next;
			    p=q;
				}
				p->next=pNew;
				pNew->next=NULL;
			}
			else if (p->next==0) //只有头结点，即pHead后面无数据
			{
				//将地址为pNew的节点插入到首地址为pHead的链表的尾部
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
			while(p!=NULL)
			{	
				printf("%s ",p->ProcessName);
				printf("%d ",p->Priority);
				printf("%d ",p->Time);
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
    // printf("1\n");
    // printf("%d\n",sum);
    // printf("2\n");


		for (int i = 0; i < sum; ++i)
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
					// printf("ReturnProcessName:%s\n", ReturnProcessName);
                    //printf("q->ProcessName:%s\n",q->ProcessName);
                    //printf("\n");
				  	while(q!=NULL)
						{	
							 // printf("ReturnProcessName:%s\n", ReturnProcessName);
      						 // printf("q->ProcessName:%s\n",q->ProcessName);
							if(strcmp(q->ProcessName,ReturnProcessName) == 0){
								printf("%s ",q->ProcessName);
								q->Priority--;
								q->Time--;
							}
							q=q->next;					
						}
					p=pHead;
					q=pHead;
					max=p->Priority;
					// printf("\n");
					// view();
					// printf("\n");
					
					strcpy(ReturnProcessName,p->ProcessName);			
		}		
	}
}
```

![mark](http://static.zxinc520.com/blog/20190513/fWvr6o5WnCac.gif)

![mark](http://static.zxinc520.com/blog/20190513/UBx2BDfscUbD.gif)



#### 进程调度4：时间片轮转

问题描述：要求输入N个进程（0<N<=100），输入时间片M（0<M〈=5），按照进程输入的顺序以时间片轮转的方法输出指定的第K轮（K>0）执行的那个进程的进程名。

 

输入格式：程序首先输入一个正整数M（0<M〈=5）作为时间片，下一行输入一个正整数N（0<N<=100），接下来输入为N行，以回车符号作为分隔，每行有2个数据，以空格作为分隔。第一个数据是字符串（长度小于等于10），该字符串为进程名，第2个数据类型为整型，表示该进程需要的运行时间。最后输入一个正整数K，作为时间片轮转的次数（次数从1开始计数）。

 

输出格式：输出一个字符串，为最后执行进程的进程名；若无进程运行，则输出“over”（不含双引号，所有字母皆为小写）。

 

样例输入1：

1

3

P1 1

P2 2

P3 3

3

样例输出1：P3

 

样例输入2：

1

3

P1 1

P2 2

P3 3

10

样例输出2：over

 

样例输入3：

2

3

P1 1

P2 2

P3 3

4

样例输出3：P3



*代码展示：*

```js
#include <stdio.h>
#include <string.h> //strcpy()
#include<stdlib.h>//malloc()
void insertQuestion();
 void insertNode(char ProcessName[5],int Time);
void view();
void arithmetic(int M,int n,int count);
typedef struct process
{
    char ProcessName[5];
    int Priority;
    int Time;
    struct process *next;
}nodelist;

nodelist *pHead=NULL;//存放调度的首节点地址

int main(){
    insertQuestion();
    // view();
    return 0;
}

//添加问题
void insertQuestion()
{
    void insertNode(char ProcessName[5],int Time);
	void arithmetic(int M,int n,int count);
    char ProcessName[5];
    int Priority;
    int Time;
    int i=0;
    int n;
	int M;
	int count;
	scanf("%d",&M);
    scanf("%d",&n);
    for (i = 0; i < n; i++)
    {
      scanf("%s %d",ProcessName,&Time);
      insertNode(ProcessName,Time);
    }
	scanf("%d",&count);
	arithmetic(M,n,count);
}

//将数据插入链表
void insertNode(char ProcessName[5],int Time)
{
    //申请存储空间
    nodelist *pNew=(nodelist *)malloc(sizeof(nodelist));
    nodelist *p,*q;
    strcpy(pNew->ProcessName,ProcessName);
    pNew->Time = Time;
    pNew->next=NULL;
    // printf("5\n");
        if(pHead==NULL) //插入前链表为空，新插入的节点为头节点
        {
            pHead=pNew;    
            //p1=pHead;
        }
        else  
        {
            //将地址为pNew的节点插入到首地址为pHead的链表的尾部
            /*p1->next=pNew;
            p1=pNew;    
            pNew->next=NULL;*/
            p=pHead;
            //q=(nodelist *)malloc(sizeof(nodelist));
            if(p->next!=0)     //文件不为空，即pHead后面有数据
            {
                while(p->next!=0)
                {
                q=p->next;
                p=q;
                }
                p->next=pNew;
                pNew->next=NULL;
            }
            else if (p->next==0) //只有头结点，即pHead后面无数据
            {
                //将地址为pNew的节点插入到首地址为pHead的链表的尾部
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
            while(p!=NULL)
            {    
                printf("%s ",p->ProcessName);
                printf("%d ",p->Time);
                p=p->next;
                printf("\n");
            }
    }
    else
    {
      printf("链表中啥都没有！\n");
    }
}


void arithmetic(int M,int n,int count)
{
    //相关算法实现
    nodelist *p=pHead;
    int index=0;
    int i=0;
    int forcount=0;
    int Numcount=0;
    int sum=0;
    int flag=0;
    int finallyNum=0;
	 // printf("%d %d %d\n",M,n,count);
     // printf("%d\n",count/n);

    if(count%n==0)
    {
        forcount=count/n;
    }else{
        forcount=count/n+1;
    } 
     // printf("forcount:%d\n", forcount);
     for (i = 0; i < forcount; i++)
         {
                    while(p!=NULL)
                    {    

                        if(p->Time>0){

                            p->Time=p->Time - M;
                            // printf("%s\n",p->ProcessName);
                            // view();
                            // printf("\n");
                            Numcount++;
                            // printf("%d\n",Numcount);
                            finallyNum=Numcount;
                            if (Numcount==count)
                            {
                              printf("%s\n",p->ProcessName);  
                            }
                        }
                        
                         p=p->next;
                    }
                    p=pHead;
         }   
if(finallyNum < count){
   printf("over\n");
}     
}
```

![mark](http://static.zxinc520.com/blog/20190522/EE00fbgzk6Ho.gif)

![mark](http://static.zxinc520.com/blog/20190522/FAQDVGbxoawJ.gif)

![mark](http://static.zxinc520.com/blog/20190522/ddwSvMe4TwsW.gif)

------



#### 存储管理1

问题描述：现有一个8*8的存储器，要对其空间进行分配。（下标从0开始，最后一个内存块下标为63）。现已有块号为1、7、13、23、47、59的几个内存块被占用。现操作系统要求申请N块内存空间（0<N<=64），当输入的块数N超出其剩余空闲块数的时候，输出为“false”，当输入为合理范围的时候，就输出其以行主序分配的最后一个内存空间的下标。 

 

输入格式：程序要求输入一个整型数N，表示要申请分配空间的大小。

 

输出格式：输出为一个整型数，表示最后一个被分配空间的下标。

 

样例输入1：

3

样例输出1：

3

 

样例输入2：

100

样例输出2：

false

 

样例输入3：

50

样例输出3：

54



*源代码*：

```js
#include <stdio.h>
int main()
{
    int arr[64]={0};
    int i=0;
    int n;
    int count=0;
    arr[1]=1;
    arr[7]=1;
    arr[13]=1;
    arr[23]=1;
    arr[47]=1;
    arr[59]=1;
    scanf("%d",&n);
    if (n>58)
    {
    	printf("false\n");
    }else{
    	 for (i = 0; i < n+1; i++)
		    {
		    	if (arr[i]==1)
		    	{
		    		count++;
		   		}
		 	}
 	printf("%d\n", count+n-1);
    }   
	return 0;
}
```



![mark](http://static.zxinc520.com/blog/20190522/fhJf38dsniWT.gif)

![mark](http://static.zxinc520.com/blog/20190522/G8b9fg3D0LVM.gif)

![mark](http://static.zxinc520.com/blog/20190522/cy8XL8vNxJrJ.gif)



#### 存储管理2

问题描述：现有一个8*8的存储器，要对其空间进行分配。（下标从0开始，最后一个内存块下标为63）。现已有块号为2、7、13、23、37、47、59、61的几个内存块被占用。要求输入需分配的进程数M（0<M<=56），接下来输入为M个整型数，每个数为各个进程需占用的内存块数。当分配到某进程时，其剩余空闲块数可以分配，就输出当前进程分配的最后一个内存空间的下标。当分配到某进程时，其进程块数超出剩余空闲块数无法分配，输出为“false”（不含双引号，且为全小写）。输出的多个下标（或"false"）之间用空格隔开。 

 

输入格式：程序输入分为两行，第一行要求输入一个整型数M，表示要所需分配空间的进程数，接下来的第二行输入M个整型数，每个数之间用空格隔开，表示M个进程每个进程占用的内存空间大小。

 

输出格式：输出为M组整型数（或"false"），每个整型数表示该进程最后一个被分配的内存空间的下标（或"false"），下标（或"false"）之间用空格隔开。

 

样例输入1：

3

3 3 3

样例输出1：

3 6 10

 

样例输入2：

4

3 3 64 3

样例输出2：

3 6 false 10

*源代码：*

```js
#include <stdio.h>
int main()
{
	void funsave(int n,int arr[64],int residue);
    int arr[64]={0};
    int num[200]={0};
    int inputnum;
    int i=0;
    int x[64]={0};
    int sumsheng=56;
    arr[2]=1;
    arr[7]=1;
    arr[13]=1;
    arr[23]=1;
    arr[37]=1;
    arr[47]=1;
    arr[59]=1;
    arr[61]=1;
    scanf("%d",&inputnum);
    for (i = 0; i < inputnum; i++)
    {
        scanf("%d",&num[i]);
        sumsheng=sumsheng-num[i];
        x[i]=sumsheng;
    }

     
     for (i = 0; i < inputnum; i++)
     {
     	funsave(num[i],arr,x[i]);
     }
      
	return 0;
}

void funsave(int n,int arr[64],int residue){
    int i=0;
    int count=0;
    int indexI=0;
    int flag=0;
    
	if (n>58)
    {
    	printf("false ");
    }else{
    	 if (arr[0]==0)
    	 {
    	 	 for (i = 0; i < n; i++)
		    {
		    	if (arr[i]==1)
		    	{
		    		count++;
		   		}
		 	}
    	 }else{

    	 	 for (i = 0; i < 64; i++)
		    {
		    	if (arr[i]==0)
		    	{
		    		count=i;
		    		goto LOOP;
		   		}

		 	}
    	 }
    	
	LOOP: printf("%d ", count+n-1);
    }

 if( n <residue ){
	for (i = 0; i < count+n; i++)
	   {
	   	  arr[i]=1;
	   }
 }
}
```

![mark](http://static.zxinc520.com/blog/20190523/iyJhP4Rqt9KS.gif)

![mark](http://static.zxinc520.com/blog/20190523/ri4eCOgCqxI1.gif)


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

---
layout: post
title: Kruskal——Networking
date: 2013-04-29 22:22:21.000000000 +02:00
summary: Networking problem with kruskal algorithm
categories:
- Development
tags:
- algorithm
- c
- graph
- kruskal
status: publish
type: post
published: true

---

###Networking###


**Description**

You are assigned to design network connections between certain points in a wide area. You are given a set of points in the area, and a set of possible routes for the cables that may connect pairs of points. For each possible route between two points, you are given the length of the cable that is needed to connect the points over that route. Note that there may exist many possible routes between two given points. It is assumed that the given possible routes connect (directly or indirectly) each two points in the area.

Your task is to design the network for the area, so that there is a connection (direct or indirect) between every two points (i.e., all the points are interconnected, but not necessarily by a direct cable), and that the total length of the used cable is minimal.

**Input**

The input file consists of a number of data sets. Each data set defines one required network. The first line of the set contains two integers: the first defines the number P of the given points, and the second the number R of given routes between the points. The following R lines define the given routes between the points, each giving three integer numbers: the first two numbers identify the points, and the third gives the length of the route. The numbers are separated with white spaces. A data set giving only one number P=0 denotes the end of the input. The data sets are separated with an empty line.

The maximal number of points is 50. The maximal length of a given route is 100. The number of possible routes is unlimited. The nodes are identified with integers between 1 and P (inclusive). The routes between two points i and j may be given as i j or as j i.

**Output**

For each data set, print one number on a separate line that gives the total length of the cable used for the entire designed network.

Sample Input

`1 0`

`2 3`

`1 2 37`

`2 1 17`

`1 2 68`

`3 7`

`1 2 19`

`2 3 11`

`3 1 7`

`1 3 5`

`2 3 89`

`3 1 91`

`1 2 32`

`5 7`

`1 2 5`

`2 3 7`

`2 4 8`

`4 5 11`

`3 5 10`

`1 5 6`

`4 2 12`

`0`

Sample Output

`0 17 16 26 `


Kruskal最小生成树。思路是首先各个点各自所属一个集合，然后按顺序排列权值，从最小的边开始，如果这条边连接的两个点不在一个集合，就取并，直至遍历了所有边。其中采用了并查集的方式，确定点是否在一个集合中。Kruskal算法同的Prim基本思想都是贪心，只不过Kruskal从边开始，Prim从点开始。对于本题，最开始一直是Rumtime Error，很郁闷，之后仔细看了下题，发现所给数据中可能有重复给两个点之间的权值，所以开的数组n有点小了，只有55，导致在运行时越界了，最后发现后将n数组大小改为10000然后AC了。代码如下：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Note: 题目中一对点可能有多组数据，所以数组尽量开大一些！！Runtime Error的原因。
int p, r, res;
int father[10000];

typedef struct node {
    int a, b, w;
} Node;

Node n[10000];

int getF(int v)
{
    if (father[v] == v) return v;
    else
    {
        father[v] = getF(father[v]);
        return father[v];
    }
}

int Union(int a, int b)
{
    int fa = getF(a);
    int fb = getF(b);
    if (fa != fb)
    {
        father[fa] = fb;
        return 1;
    }
    return 0;
}

int compare(const void *a, const void *b)
{
    Node arg1 = *(Node *)(a);
    Node arg2 = *(Node *)(b);
    if (arg1.w > arg2.w) return 1;
    if (arg1.w < arg2.w) return -1;
    return 0;
}

int main(int argc, const char * argv[])
{
    while (scanf("%d", &p) && p) {
        scanf("%d", &r);
        for (int i = 0; i < r; i++)
        {
            scanf("%d%d%d", &n[i].a, &n[i].b, &n[i].w);
            father[i] = i;
        }
        res = 0;
        qsort(n, r, sizeof(Node), compare); // 权值递增
        for (int i = 0; i < r; i++)
            if (Union(n[i].a, n[i].b)) // 若a、b不在一个集合，连接
                res += n[i].w;
        printf("%d\n", res);
    }
    return 0;
}
```
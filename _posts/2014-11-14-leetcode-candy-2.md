---
layout: post
title: '[LeetCode] Candy'
date: 2014-11-14 03:38:48.000000000 +01:00
summary: "分糖果问题，每个小孩有一个分数，要求对任意一个小孩，如果他的分数比相邻的小孩高，那么他必须分到比相邻小孩要多的糖果。并且每个小孩只要分到一个。"
categories:
- Development
tags:
- greedy
- LeetCode
status: publish
type: post
published: true

---

## [Candy](https://oj.leetcode.com/problems/candy/)

分糖果问题，每个小孩有一个分数，要求对任意一个小孩，如果他的分数比相邻的小孩高，那么他必须分到比相邻小孩要多的糖果。并且每个小孩只要分到一个。

* [latex]n[/latex]: 小孩的总数
* [latex]R[i][/latex]: 第 [latex]i[/latex] 个小孩的分数
* [latex]C[i][/latex]: 第 [latex]i[/latex] 个小孩分到的糖果

**思路如下，两次分糖:**

两次分糖都是贪心思路，每次尽量分最少的糖给每个小孩。

**第一次分糖**

从左到右，只考虑每个小孩的左邻居，如果左邻居的分数比自己低，那么就在左邻居的基础上多拿到一个糖，反之就拿一个。第一次遍历后，就保证对每一个小孩，如果左邻居分数比自己低，那么自己就可以拿到比左邻居多一个糖。换言之对 [latex]i >= 2[/latex] ，如果 [latex]R[i] > R[i - 1][/latex] ，那么 [latex]C[i] = C[i - 1] + 1[/latex] 。

**第二次分糖**

从右到左，只考虑每个小孩的右邻居，如果右邻居分数比自己低，那么应该比右邻居多拿一个糖。这样所得到的一组糖就满保证了对每一个小孩，如果右邻居分数比自己低，那么自己就可以比右邻居多拿一个糖。

获得两次分糖的结果后，每个孩子手上就分到了两把糖，一把满足左侧邻居要求，一把满足右侧邻居要求，且糖的数量是最少的。如果要同时满足两边邻居的要求，就直接选择两把糖中较多的给孩子即可。



实际实现时，可以在第二次分糖的同时统计总共分出去了多少糖。代码如下：

```c++
class Solution {
public:
    int candy(vector<int> &ratings) {
        int num = ratings.size();
        if (num == 0) return 0;

        vector<int> candies(num, 1);

        for (int i = 1; i < num; ++i)
            if (ratings[i] > ratings[i - 1])
                candies[i] = candies[i - 1] + 1;

        int res = candies[num - 1];
        for (int i = num - 2; i >= 0; --i)
        {
            if (ratings[i] > ratings[i + 1])
                candies[i] = max(candies[i], candies[i + 1] + 1);
            res += candies[i];
        }

        return res;
    }
};
```



另一种方法是一次遍历即可计算出总共应该分出去多少糖。从左到右遍历，如果是递增序列，那么当前孩子每次比上一个孩子多分到一个糖；如果序列开始递减，纪录下开始递减的位置以及递减序列中第一个孩子分到的糖。在这个递减序列的计算中，首先给孩子一个糖，如果序列长度小于递减序列中第一个孩子的长度，那么条件依然满足，反之，给第一个孩子多给一个糖，同时更新这个递减序列中拿糖数量最多的孩子手上的糖。

代码如下，maximumIndex代表递减序列第一个孩子的索引值，maximumCandy代表递减序列第一个孩子拿到糖的数量，curCandyNum代表为当前孩子分到糖的数量：

```c++
class Solution {
public:
    int candy(vector<int> &ratings) {
        int num = ratings.size();
        if (num == 0) return 0;

        int res = 1, maximumIndex = 0, curCandyNum = 1, maximumCandy = 1;
        for (int i = 1; i < num; ++i) {
            if (ratings[i] > ratings[i - 1])
            {
                curCandyNum++;
                res += curCandyNum;
                maximumIndex = i;
                maximumCandy = curCandyNum;
            }
            else if (ratings[i] < ratings[i - 1])
            {
                curCandyNum = 1;
                if (i - maximumIndex > maximumCandy - 1)
                {
                    res += i - maximumIndex + 1;
                    maximumCandy++;
                }
                else
                {
                    res += i - maximumIndex;
                }
            }
            else
            {
                curCandyNum = 1;
                res += curCandyNum;
                maximumIndex = i;
                maximumCandy = 1;
            }
        }

        return res;
    }
};
```
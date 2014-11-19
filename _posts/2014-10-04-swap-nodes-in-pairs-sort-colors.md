---
layout: post
title: Swap Nodes in Pairs & Sort Colors
date: 2014-10-04 02:12:26.000000000 +02:00
summary: "交换相邻结点，用两个指针，交换逻辑如下图：..."
categories:
- Development
tags: 
- LeetCode
- linked list
- array
- two point
- sort
status: publish
type: post
published: true

---

## [Swap Nodes in Pairs](https://oj.leetcode.com/submissions/detail/11797418/)

交换相邻结点，用两个指针，交换逻辑如下图：[![Swap-Nodes-in-Pairs](assets/Swap-Nodes-in-Pairs.png)](http://blog.boylee.me/wp-content/uploads/2014/10/Swap-Nodes-in-Pairs.png)

红色结点即2和3为要交换的结点，Pre和Cur为两个指针执行交换逻辑，三条指针更改逻辑顺序为红绿蓝。

实现过程可以先处理头结点特殊情况，也可以创建新的头结点消除原头结点的特殊情况，代码如下：

{% highlight c++ linenos %}
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *swapPairs(ListNode *head) {
        ListNode *start = new ListNode(0);
        start->next = head;
        ListNode *pre = start, *cur = start->next;

        while (cur != NULL && cur->next != NULL)
        {
            pre->next = cur->next;
            cur->next = cur->next->next;
            pre->next->next = cur;
            pre = cur;
            cur = pre->next;
        }
        return start->next;
    }
};
{% endhighlight %}




## [Sort Colors](https://oj.leetcode.com/problems/sort-colors/)

我也不知道怎么说，一上来就直接开两个int，分别计算红和白出现次数，然后再循环一次按出现次数赋值，直接就AC了。代码如下，if和switch这里是顺手用的：

{% highlight c++ linenos %}
class Solution {
public:
    void sortColors(int A[], int n) {
        int r = 0, w = 0;
        for (int i = 0; i < n; ++i)
        {
            switch (A[i])
            {
                case 0:
                    r++;
                    break;
                case 1:
                    w++;
                    break;
                default:
                    break;
            }
        }

        for (int i = 0; i < n; ++i)
        {
            if (i < r)
                A[i] = 0;
            else if (i < r + w)
                A[i] = 1;
            else 
                A[i] = 2;
        }
    }
};
{% endhighlight %}

还仔细琢磨为什么排序复杂度是[latex]O(n)[/latex]，比学过那么多排序都快，半天才意识到这个根本不是基于比较的排序。然后就进一步了解了一下计数排序，优化了一下代码，边计数边赋值。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    void sortColors(int A[], int n) {
        int r = 0, w = 0;
        for (int i = 0; i < n; ++i)
        {
            int t = A[i];
            A[i] = 2;
            if (t == 0)
            {
                A[w++] = 1;
                A[r++] = 0;
            }
            else if (t == 1)
                A[w++] = 1;
        }
    }
};
{% endhighlight %}
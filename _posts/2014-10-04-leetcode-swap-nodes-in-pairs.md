---
layout: post
title: '[LeetCode] Swap Nodes in Pairs'
date: 2014-10-04 02:12:26.000000000 +02:00
summary: "交换相邻结点，用两个指针，交换逻辑如下图：..."
categories:
- Development
tags: 
- LeetCode
- linked list
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

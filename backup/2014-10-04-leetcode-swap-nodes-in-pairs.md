---
layout: post
title: '[LeetCode] Swap Nodes in Pairs'
date: 2014-10-04 02:12:26.000000000 +02:00
summary: "Given a linked list, swap every two adjacent nodes and return its head."
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

> Given a linked list, swap every two adjacent nodes and return its head.
>
> For example,
> Given `1->2->3->4`, you should return the list as `2->1->4->3`.
>
> Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.

交换相邻结点，用两个指针。假设结点2和3为当前需要交换的两个结点，结点1为这对pair的前驱，结点4为其后继。交换逻辑如下图：
![swap_nodes_in_pairs]({{ site.baseurl }}/assets/2014-10-04-leetcode-swap-nodes-in-pairs/swap_nodes_in_pairs.png)

处理过程可以创建dummyHead结点以头结点消除原头结点的特殊情况，代码如下：

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
        ListNode dummyHead(0);
        dummyHead.next = head;
        ListNode *pre = &dummyHead, *cur = dummyHead.next;

        while (cur != NULL && cur->next != NULL)
        {
            pre->next = cur->next;
            cur->next = cur->next->next;
            pre->next->next = cur;
            pre = cur;
            cur = pre->next;
        }
        return dummyHead.next;
    }
};
{% endhighlight %}

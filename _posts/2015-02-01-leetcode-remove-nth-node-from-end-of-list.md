---
layout: post
title: '[LeetCode] Remove Nth Node From End of List'
date: 2015-02-01 13:43:30.000000000 +08:00
summary: 'Given a linked list, remove the $n^{th}$ node from the end of list and return its head.'
categories:
- Development
tags:
- LeetCode
- linked list
- two point
status: publish
type: post
published: true

---

## [Remove Nth Node From End of List](https://oj.leetcode.com/problems/remove-nth-node-from-end-of-list/)

> Given a linked list, remove the $n^{th}$ node from the end of list and return its head.
> 
> **Note:**
> Given n will always be valid.
> Try to do this in one pass.

删除链表的倒数第n个结点。解决思路很简单，用两个指针，第一个先跑n个结点，接着第二个也开始跑。当第二个指针到达链表尾部的时候，那么第一个结点就需要删除的结点。

处理中要注意的就是倒数第n个结点还有可能是头结点，所以添加一个dummyHead可以简化代码，消除头结点的特殊性。代码如下：

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
    ListNode *removeNthFromEnd(ListNode *head, int n) {
        ListNode dummyHead(0);
        ListNode *first = &dummyHead, *second = &dummyHead;
        
        dummyHead.next = head;
        while (n--) first = first->next;
        while (first->next != NULL)
        {
            second = second->next;
            first = first->next;
        }
        second->next = second->next->next;
        
        return dummyHead.next;
    }
};
{% endhighlight %}
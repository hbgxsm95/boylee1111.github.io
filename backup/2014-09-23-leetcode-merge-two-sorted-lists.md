---
layout: post
title: '[LeetCode] Merge Two Sorted Lists'
date: 2014-09-23 20:00:45.000000000 +02:00
summary: "Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists."
categories:
- Development
tags:
- LeetCode
- linked list
status: publish
type: post
published: true

---

## [Merge Two Sorted Lists](https://oj.leetcode.com/problems/merge-two-sorted-lists/)

> Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

merge两个有序链表，思路如下，先通过判断l1和l2的头结点，找到merge之后表的头结点，然后边移动l1和l2指针边进行判断，将较小的连接到merge之后的表上即可，某一个链表跑到尾部之后，直接将另一个链表的剩余元素全部链接到merge之后表的尾部即可。

由于最初两个链表首先需要判断头结点，可以通过新建一个dummyHead，然后就消除了头结点的特殊情况，代码如下：

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
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;

        ListNode dummyHead(0);
        ListNode *cur = &dummyHead;
        while (l1 != NULL && l2 != NULL)
        {
            if (l1->val < l2->val)
            {
                cur->next = l1;
                l1 = l1->next;
            }
            else
            {
                cur->next = l2;
                l2 = l2->next;
            }
            cur = cur->next;
        }
        if (l1 == NULL) cur->next = l2;
        if (l2 == NULL) cur->next = l1;
        
        return dummyHead.next;
    }
};
{% endhighlight %}

另外，[GZShi](https://oj.leetcode.com/discuss/user/GZShi)还有一个递归版本，形式非常简单也非常好理解。

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
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;

        if (l1->val < l2->val)
        {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        }
        else
        {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }
};
{% endhighlight %}
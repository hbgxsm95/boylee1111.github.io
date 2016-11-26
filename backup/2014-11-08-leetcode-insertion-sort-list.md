---
layout: post
title: '[LeetCode] Insertion Sort List'
date: 2014-11-08 05:32:42.000000000 +01:00
summary: "Sort a linked list using insertion sort."
categories:
- Development
tags:
- LeetCode
- linked list
- sort
status: publish
type: post
published: true

---

## [Insertion Sort List](https://oj.leetcode.com/problems/insertion-sort-list/)

> Sort a linked list using insertion sort.

使用插入排序方法对链表进行排序。

思路如下：dummyHead用于纪录排序后的链表，left表示剩余还未操作的元素。每次从left里面取出第一个节点插入到现有的已经有序的dummyHead节点中，直至left为空。代码如下：

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
    ListNode *insertionSortList(ListNode *head) {
        ListNode dummyHead(0);
        dummyHead.next = NULL;

        ListNode *cur, *left = head;
        while (left != NULL)
        {
            cur = &dummyHead;
            while (cur->next != NULL && cur->next->val < left->val)
                cur = cur->next;
            ListNode *tmp = left->next;
            left->next = cur->next;
            cur->next = left;
            left = tmp;
        }

        return dummyHead.next;
    }
};
{% endhighlight %}
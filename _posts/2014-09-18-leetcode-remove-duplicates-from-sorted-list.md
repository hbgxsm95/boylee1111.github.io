---
layout: post
title: '[LeetCode] Remove Duplicates from Sorted List'
date: 2014-09-18 01:57:30.000000000 +02:00
summary: "Given a sorted linked list, delete all duplicates such that each element appear only once."
categories:
- Development
tags:
- LeetCode
- linked list
status: publish
type: post
published: true

---

## [Remove Duplicates from Sorted List](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-list/)

> Given a sorted linked list, delete all duplicates such that each element appear only once.
>
> For example,
> Given `1->1->2`, return `1->2`.
> Given `1->1->2->3->3`, return `1->2->3`.

删除一个有序链表的重复元素。建一个指针从头开始，如果当前值和下一个节点值相等，则当前节点next指针指向后两个节点；如果不同，简单移动指针即可。代码如下：

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
    ListNode *deleteDuplicates(ListNode *head) {
        if (head == NULL) return head;
        ListNode *cur = head;
        while (cur->next != NULL)
            if (cur->val == cur->next->val)
                cur->next = cur->next->next;
            else
                cur = cur->next;
        return head;
    }
};
{% endhighlight %}
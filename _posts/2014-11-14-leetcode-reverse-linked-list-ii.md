---
layout: post
title: '[LeetCode] Reverse Linked List II'
date: 2014-11-14 04:05:11.000000000 +01:00
summary: Reverse a linked list in a range. There are two steps to achieve this goal ...
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
## [Reverse Linked List II](https://oj.leetcode.com/problems/reverse-linked-list-ii/)

Reverse a linked list in a range. There are two steps to achieve this goal:

1.  Find the **start point** of the range;
2.  From start point, reverse the list to the **end point**.

Two pointers are used to reverse the list, **slow** pointer is set at the start point, **fast** pointer is used to traverse every node in the range and concatenate to the **slow** pointer. If the range is starting at head, then dummyHead can be used to eliminate the particularity of head node.

Here is the code:

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
    ListNode *reverseBetween(ListNode *head, int m, int n) {
        ListNode dummyHead(0);
        dummyHead.next = head;

        n -= m;
        ListNode *slow = &dummyHead;
        while (--m > 0) slow = slow->next;
        ListNode *fast = slow->next;
        while (n-- > 0)
        {
            ListNode *tmp = fast->next;
            fast->next = fast->next->next;
            tmp->next = slow->next;
            slow->next = tmp;
        }

        return dummyHead.next;
    }
};
{% endhighlight %}
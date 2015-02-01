---
layout: post
title: '[LeetCode] Sort List'
date: 2015-01-21 22:18:30.000000000 +08:00
summary: Sort a linked list in $O(n \log n)$ time using constant space complexity.
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

## [Sort List](https://oj.leetcode.com/problems/sort-list/)

> Sort a linked list in $O(n \log n)$ time using constant space complexity.

题目描述非常简单，对一个链表以$O(n \log n)$的时间复杂度排序。一想到$O(n \log n)$的时间复杂度，比较熟悉的无非是快速排序(Quicksort)，归并排序(Mergesort)，堆排序(Heapsort)。在当前情况下，快排似乎不好用，一方面链表是单向的，另一方面链表不断的交换也不方便；堆排序需要建立堆，但是因为堆更容易用数组来表示，因为需要直接访问，而链表根据索引去访问是需要搜索的；所以只剩下来归并排序似乎可以解决。

归并排序算是一个典型的分治解决问题的方法，每次把当前链表分为两部分小的链表进行排序，如此递归下去，最终再两两进行合并。在链表中找到中间位置可以通过同时跑两个指针fast和slow，fast每次跑两步，slow每次跑一步。当fast到达终点的时候，slow即为链表中央了。具体归并排序的算法[wiki](http://zh.wikipedia.org/zh/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F)挺详细的。代码如下：

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
    ListNode *sortList(ListNode *head) {
        if (head != NULL && head->next != NULL)
        {
            ListNode *slow = head, *fast = head, *tmp = head;
            while (fast != NULL && fast->next != NULL)
            {
                fast = fast->next->next;
                tmp = slow;
                slow = slow->next;
            }
            tmp->next = NULL;
            
            // Split
            head = sortList(head);
            slow = sortList(slow);
            
            // Merge
            ListNode dummyHead(0);
            tmp = &dummyHead;
            while (head != NULL && slow != NULL)
            {
                if (head->val < slow->val)
                {
                    tmp->next = head;
                    head = head->next;
                }
                else
                {
                    tmp->next = slow;
                    slow = slow->next;
                }
                tmp = tmp->next;
            }
            if (head != NULL) tmp->next = head;
            if (slow != NULL) tmp->next = slow;
            head = dummyHead.next;
        }
        
        return head;
    }
};
{% endhighlight %}
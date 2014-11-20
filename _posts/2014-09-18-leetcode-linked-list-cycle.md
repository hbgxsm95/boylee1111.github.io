---
layout: post
title: '[LeetCode] Linked List Cycle'
date: 2014-09-18 01:57:30.000000000 +02:00
summary: "检查链表是否有环的题，最基本的思路比较简单，遍历环直到下一个指针等于头指针即有环，否则无环。"
categories:
- Development
tags:
- LeetCode
- two point
- linked list
status: publish
type: post
published: true

---

## [Linked List Cycle](https://oj.leetcode.com/problems/linked-list-cycle/)

检查链表是否有环的题，最基本的思路比较简单，遍历环直到下一个指针等于头指针即有环，否则无环。

因为运气比较好，想到之前在哪里看到有一个"龟兔算法"，思路是两个指针同时从头指针出发，一个每次走一步，一个每次走两步，如果走得快先走到底则没有环，如果两个指针相遇说明存在环。顺着这个思路尝试果然AC了。进一步了解之后才知道这个算法是Floyd发明的，想想看人家研究了10年出来的结果现在我们就可以直接使用也是蛮有趣的。

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
    bool hasCycle(ListNode *head) {
        ListNode *p1 = head;
        ListNode *p2 = head;
        while (p2 != NULL && p2->next != NULL)
        {
            p1 = p1->next;
            p2 = p2->next->next;
            if (p1 == p2)
                return true;
        }
        return false;
    }
};
{% endhighlight %}
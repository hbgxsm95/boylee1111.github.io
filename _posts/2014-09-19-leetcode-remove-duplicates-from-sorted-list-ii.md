---
layout: post
title: '[LeetCode] Remove Duplicates from Sorted List II '
date: 2014-09-19 04:57:30.000000000 +02:00
summary: "Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list."
categories:
- Development
tags:
- LeetCode
- linked list
status: publish
type: post
published: true

---

## [Remove Duplicates from Sorted List II](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

> Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.
>
> For example,
> Given `1->2->3->3->4->4->5`, return `1->2->5`.
> Given `1->1->1->2->3`, return `2->3`.

类似[Remove Duplicates from Sorted Lists]({{ site.baseurl }}/development/2014/09/18/leetcode-remove-duplicates-from-sorted-list/)删除重复元素，唯一区别在于前一个问题要保留一个，而这个问题要求全部删除。

通过两个begin和end指针来找出重复元素的范围。

若链表为`1->2->3->3->4->4->5`，假设begin在值为2的结点处，那么end发现之后有两个值为3的结点，那么直接连接begin到值为4的结点处。若没有重复则begin继续逐步前移。通过添加dummyHead可以消除头结点出现重复的特殊情况，代码如下：

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
        ListNode dummyHead(0);
        dummyHead.next = head;
        
        ListNode *begin = &dummyHead, *end;
        while (begin->next != NULL) {
            end = begin->next;
            while (end->next != NULL && end->next->val == begin->next->val) end = end->next;
            if (begin->next != end) // there are some duplicates
                begin->next = end->next;
            else
                begin = begin->next;
        }
        
        return dummyHead.next;
    }
};
{% endhighlight %}
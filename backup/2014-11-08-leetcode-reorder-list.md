---
layout: post
title: '[LeetCode] Reorder List'
date: 2014-11-08 05:36:40.000000000 +01:00
summary: Given a singly linked list L&#58; $L_0 \to L_1 \to \ldots \to L\_{n-1} \to L_n$, reorder it to&#58; $L_0 \to L_n \to L_1 \to L\_{n-1} \to L_2 \to L_{n-2} \to \ldots$
categories:
- Development
tags:
- LeetCode
- linked list
status: publish
type: post
published: true

---

## [Reorder List](https://oj.leetcode.com/problems/reorder-list/)
> Given a singly linked list L: $L_0 \to L_1 \to \ldots \to L\_{n-1} \to L_n$, reorder it to: $L_0 \to L_n \to L_1 \to L\_{n-1} \to L_2 \to L_{n-2} \to \ldots$
>
> You must do this in-place without altering the nodes' values.
>
> For example,
> Given `{1,2,3,4}`, reorder it to `{1,4,2,3}`.

思路分三步：Split->Reverse->Merge

**Split**

一个fast指针，一个slow指针。fast每次跑两步，slow每次跑一步，当fast到表尾即slow正好在表中央。加dummyHead主要是为了在Split结束之后如果为偶数，正好中央；如果是奇数，则在长度除以2向下取模位置。

**Reverse**

将后半段链表逆序，从第一个节点开始，将之后的每一个节点追加到dummyHead之后即可。

**Merge**

现在链表分别是前半段和逆序的后半段，用former指针和latter指针分别遍历两个链表即可，每次各从两个链表取一个即可。

代码如下：

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
    void reorderList(ListNode *head) {
        ListNode dummyHead(0);
        dummyHead.next = head;

        // Split
        ListNode *slow = &dummyHead, *fast = &dummyHead;
        while (fast != NULL && fast->next != NULL)
        {
            slow = slow->next;
            fast = fast->next->next;
        }
        dummyHead.next = slow->next;
        slow->next = NULL;

        // Reverse
        ListNode *cur = dummyHead.next;
        while (cur != NULL && cur->next != NULL)
        {
            ListNode *tmp = cur->next;
            cur->next = cur->next->next;
            tmp->next = dummyHead.next;
            dummyHead.next = tmp;
        }

        // Merge
        ListNode *former = head, *latter = dummyHead.next;
        while (former != NULL && latter != NULL) {
            ListNode *tmp = latter->next;
            latter->next = former->next;
            former->next = latter;
            former = former->next->next;
            latter = tmp;
        }
    }
};
{% endhighlight %}
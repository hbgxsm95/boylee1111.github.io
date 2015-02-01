---
layout: post
title: '[LeetCode] Rotate List'
date: 2014-11-13 04:33:56.000000000 +01:00
summary: "Given a list, rotate the list to the right by k places, where k is non-negative."
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

## [Rotate List](https://oj.leetcode.com/problems/rotate-list/)

> Given a list, rotate the list to the right by k places, where k is non-negative.
>
> For example:
> Given `1->2->3->4->5->NULL` and k = `2`,
> return `4->5->1->2->3->NULL`.


右移给定链表k个位置。首先要找到移动的中枢，即移动为为头节点的位置。

可以通过两个指针fast和slow来找这个位置，让fast指针先走k步，然后同时移动fast和slow指针直到fast指针到达链表尾部。这个时候slow指针所指的位置即旋转后的新的头节点。

在实际寻找过程中还要考虑所给k值大于链表总长度，可以通过在第一次移动fast指针的同时计算链表长度解决。如果还未移动k步fast就到达尾部，说明k值是大于链表长度的。这时也计算出了链表长度，通过对k取模即可得到最少的移动步数。此时再通过同样的方法即可计算出旋转中枢点。

知道中枢点后直接将链表尾部和头部相连，并将中枢点设置为新的头节点即可。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    ListNode *rotateRight(ListNode *head, int k) {
        if (k == 0 || head == NULL) return head;

        int len = 1;
        ListNode *slow = head, *fast = head;
        while (k-- != 0 && fast->next != NULL)
        {
            fast = fast->next;
            len++;
        }
        if (k != -1)
        {
            k %= len;
            fast = head;
            while (k--)
                fast = fast->next;
        }
        while (fast->next != NULL)
        {
            fast = fast->next;
            slow = slow->next;
        }
        fast->next = head;
        head = slow->next;
        slow->next = NULL;

        return head;
    }
};
{% endhighlight %}
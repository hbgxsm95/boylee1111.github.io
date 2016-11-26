---
layout: post
title: '[LeetCode] Reverse Nodes in k-Group'
date: 2014-11-14 04:31:16.000000000 +01:00
summary: "Given a linked list, reverse the nodes of a linked list k at a time and return its modified list."
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
## [Reverse Nodes in k-Group](https://oj.leetcode.com/problems/reverse-nodes-in-k-group/)

> Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
> 
> If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.
> You may not alter the values in the nodes, only nodes itself may be changed.
> Only constant memory is allowed.
>
> For example,
> Given this linked list: `1->2->3->4->5`
> For k = `2`, you should return: `2->1->4->3->5`
> For k = `3`, you should return: `3->2->1->4->5`

Advance version of [Reverse Linked List II]({{ site.baseurl }}/development/2014/11/14/leetcode-reverse-linked-list-ii/). Reverse the nodes group whose length is k. It's easier to implement by iterate every k range.

Specially, there is a demand that "If the number of nodes is not a multiple of _k_ then left-out nodes in the end should remain as it is." To solve this problem, a **pilot** pointer could be used to explore in advance. If the length is enough then reverse, or the whole list has already reversed.

Summarily, there are three main steps to reverse list in k-group:

1.  **pilot** pointer check whether next group is valid;
2.  If next group is valid, **slow** pointer is set at the start point of group; Otherwise, end the algorithm;
3.  **fast** pointer will traverse the every node in group, and concatenate each node as next node of **slow**.

Here is the code, **dummyHead** pointer is used to eliminate the particularity of head node:

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
    ListNode *reverseKGroup(ListNode *head, int k) {
        ListNode dummyHead(0);
        dummyHead.next = head;
        
        ListNode *slow = &dummyHead, *fast, *pilot = head;
        while (true)
        {
            int rest = k;
            while (pilot != NULL && rest--) pilot = pilot->next;
            if (pilot == NULL && rest != 0) break;

            fast = slow->next;
            while (fast->next != pilot)
            {
                ListNode *tmp = fast->next;
                fast->next = fast->next->next;
                tmp->next = slow->next;
                slow->next = tmp;
            }
            slow = fast;
        }

        return dummyHead.next;
    }
};
{% endhighlight %}
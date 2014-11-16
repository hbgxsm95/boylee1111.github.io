---
layout: post
title: '[LeetCode] Partition List'
date: 2014-11-13 04:40:16.000000000 +01:00
summary: "分割链表，将比指定值小的都移动到链表前部分，大的移动到后部分。"
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

## [Partition List](https://oj.leetcode.com/problems/partition-list/)

分割链表，将比指定值小的都移动到链表前部分，大的移动到后部分。

通过两个指针完成寻找和移动过程。首先一直向前找，直到找到比指定值大的第一个数停止。此时fast指针继续向前，slow指针停留在原地，当fast指针找到比指定值小的之后的时候，将其追加到slow指针的后面，slow指针前进一步；fast继续向前找直到尾部，这样所有值比指定值小的节点就移动到了链表的前端。通过添加dummyHead就可以简化对头部节点的处理。代码如下：

```c++
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
    ListNode *partition(ListNode *head, int x) {
        ListNode dummyHead(0);
        dummyHead.next = head;

        ListNode *fast = &dummyHead;
        while (fast->next != NULL && fast->next->val < x) fast = fast->next;

        ListNode *slow = fast;
        while (fast->next != NULL)
        {
            if (fast->next->val < x)
            {
                ListNode *tmp = fast->next;
                fast->next = fast->next->next;
                tmp->next = slow->next;
                slow->next = tmp;
                slow = slow->next;
            }
            else
            {
                fast = fast->next;
            }
        }

        return dummyHead.next;
    }
};
```
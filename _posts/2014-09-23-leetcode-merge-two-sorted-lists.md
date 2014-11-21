---
layout: post
title: '[LeetCode] Merge Two Sorted Lists'
date: 2014-09-23 20:00:45.000000000 +02:00
summary: "merge两个有序链表，思路如下，先通过判断l1和l2的头结点，找到merge之后表的头结点，然后边移动l1和l2指针边进行判断，将较小的连接到merge之后的表上即可，某一个链表跑到尾部之后，直接将另一个链表的剩余元素全部链接到merge之后表的尾部即可。"
categories:
- Development
tags:
- LeetCode
- linked list
status: publish
type: post
published: true

---

## [Merge Two Sorted Lists](https://oj.leetcode.com/problems/merge-two-sorted-lists/)

merge两个有序链表，思路如下，先通过判断l1和l2的头结点，找到merge之后表的头结点，然后边移动l1和l2指针边进行判断，将较小的连接到merge之后的表上即可，某一个链表跑到尾部之后，直接将另一个链表的剩余元素全部链接到merge之后表的尾部即可。代码如下：

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
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;

        ListNode *head, *cur;
        if (l1->val < l2->val)
        {
            head = cur = l1;
            l1 = l1->next;
        }
        else 
        {
            head = cur = l2;
            l2 = l2->next;
        }
        while (l1 != NULL && l2 != NULL)
        {
            if (l1->val < l2->val)
            {
                cur->next = l1;
                l1 = l1->next;
            }
            else
            {
                cur->next = l2;
                l2 = l2->next;
            }
            cur = cur->next;
        }
        if (l1 == NULL) cur->next = l2;
        if (l2 == NULL) cur->next = l1;
        return head;
    }
};
{% endhighlight %}

其上代码可以进行优化，由于head是个特殊结点，新建一个头结点，然后就消除了head这个头结点的特殊情况，代码如下：

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
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;

        ListNode *start = new ListNode(0);
        ListNode *cur = start;
        while (l1 != NULL && l2 != NULL)
        {
            if (l1->val < l2->val)
            {
                cur->next = l1;
                l1 = l1->next;
            }
            else
            {
                cur->next = l2;
                l2 = l2->next;
            }
            cur = cur->next;
        }
        if (l1 == NULL) cur->next = l2;
        if (l2 == NULL) cur->next = l1;
        return start->next;
    }
};
{% endhighlight %}

以上代码内存释放的问题就略过了。

另外，[GZShi](https://oj.leetcode.com/discuss/user/GZShi)还有一个递归版本，形式非常简单也非常好理解。

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
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;

        if (l1->val < l2->val)
        {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        }
        else
        {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }
};
{% endhighlight %}
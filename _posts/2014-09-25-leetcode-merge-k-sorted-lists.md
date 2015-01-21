---
layout: post
title: '[LeetCode] Merge k Sorted Lists'
date: 2014-09-25 12:51:30.000000000 +08:00
summary: '在基于Merge Two Sorted Lists上的扩展，合并多个有序数列。'
categories:
- Development
tags:
- LeetCode
- heap
- divide and conquer
- linked list
status: publish
type: post
published: true

---

## [Merge k Sorted Lists](https://oj.leetcode.com/problems/merge-k-sorted-lists/)

在基于[Merge Two Sorted Lists]({{ site.baseurl }}/development/2014/09/23/leetcode-merge-two-sorted-lists/)上的扩展，合并多个有序数列。

**思路一：分治法**

对于$k$个有序的链表，可以分为两部分即第一个到第$k \over 2$个和第${k \over 2} + 1$到第$k$个。那么此时问题就是分别合并两个较小数量的有序链表，然后合并两个有序链表。如此递归下去即可以分治解决问题，代码如下：

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
    ListNode *mergeKLists(vector<ListNode *> &lists) {
        int size = lists.size();
        
        if (size == 0)
            return NULL;
        else if (size == 1)
            return lists[0];
        else if (size == 2)
            return mergeTwoLists(lists[0], lists[1]);
        else
        {
            vector<ListNode *> former(lists.begin(), lists.begin() +size / 2),
                               latter(lists.begin() + size / 2, lists.end());
            return mergeTwoLists(mergeKLists(former), mergeKLists(latter));;
        }
    }
    
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2)
    {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;
        
        ListNode dummyHead(0);
        ListNode *p = &dummyHead;
        while (l1 != NULL && l2 != NULL) {
            if (l1->val > l2->val)
            {
                p->next = l2;
                l2 = l2->next;
            }
            else
            {
                p->next = l1;
                l1 = l1->next;
            }
            p = p->next;
        }
        if (l1 != NULL) p->next = l1;
        if (l2 != NULL) p->next = l2;
        
        return dummyHead.next;
    }
};
{% endhighlight %}

可以容易的看出，分的时间复杂度为$O(\log k)$，合并的时间复杂度为$n$，所以整个过程时间复杂度为$O(n \log k)$。

**思路二：堆排序**

从讨论区看到的[riccardo](https://oj.leetcode.com/discuss/user/riccardo)的解决方案。即以链表的头结点为基准生成最小堆，每次取出最上层的链表追加到我们需要的结果上；如果取出后链表长度仍然大于一，那么再放入堆中进行调整。如此反复，直到堆为空即得到了合并后的链表。代码如下：

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
    ListNode *mergeKLists(vector<ListNode *> &lists) {
        auto it_begin = begin(lists);
        auto it_end = end(lists);
        it_end = remove_if(it_begin, it_end, isNull);
        if (it_begin == it_end) return NULL;
        
        make_heap(it_begin, it_end, preMin);
        
        ListNode dummyHead(0);
        dummyHead.next = *it_begin;
        ListNode *p = *it_begin;
        
        while (distance(it_begin, it_end) > 1)
        {
            pop_heap(it_begin, it_end, preMin);
            
            --it_end;
            *it_end = (*it_end)->next;
            
            if (*it_end) {
                
                ++it_end;
                push_heap(it_begin, it_end, preMin);
            }
            
            p->next = *it_begin;
            p = p->next;
        }
        
        return dummyHead.next;
    }
    
    static bool isNull(ListNode *l)
    {
        return l == NULL;
    }
    
    static bool preMin(ListNode *l1, ListNode *l2)
    {
        return l1->val > l2->val;
    }
};
{% endhighlight %}

堆排序的时间复杂度就是$O(n \log k)$。
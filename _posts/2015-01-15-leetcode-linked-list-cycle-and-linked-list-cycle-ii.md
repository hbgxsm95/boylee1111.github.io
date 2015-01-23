---
layout: post
title: '[LeetCode] Linked List Cycle & Linked List Cycle II'
date: 2015-01-15 22:48:30.000000000 +08:00
summary: '检查链表是否有环的题，因为运气比较好，想到之前在哪里看到有一个"龟兔算法"，思路是两个指针同时从头指针出发，一个每次走一步，一个每次走两步，如果走得快先走到底则没有环，如果两个指针相遇说明存在环。'
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

检查链表是否有环的题，因为运气比较好，想到之前在哪里看到有一个"龟兔算法"，思路是两个指针同时从头指针出发，一个每次走一步，一个每次走两步，如果走得快先走到底则没有环，如果两个指针相遇说明存在环。顺着这个思路尝试果然AC了。进一步了解之后才知道这个算法是Floyd发明的，想想看人家研究了10年出来的结果现在我们就可以直接使用也是蛮有趣的。

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

<br/>

## [Linked List Cycle II](https://oj.leetcode.com/problems/linked-list-cycle-ii/)

这个问题是基于上一个确定是否存在环的情况下寻找环的起始点。当第一次两点相遇时，令其中一指针从链表头重新开始跑，当两者再次相遇时即有相遇点为环起点，推理如下：

![linked_list_cycle_ii]({{ site.baseurl }}/assets/2015-01-15-leetcode-linked-list-cycle-and-linked-list-cycle-ii/linked_list_cycle_ii.png){: .center-image }

设$O$为链表起点，$P$为环的起点，$Q$为第一次相遇点。$a$为链表起点到环起点的距离，$b$为从环起点出发到相遇点的距离，$c$为从相遇点出发再次回到环起点的位置。

纪录指针为slow和fast，第一次相遇时slow指针走的距离为$a + b$，fast指针走的距离为$a + n(b + c) + b$，其中$n$为fast遇到slow指针之前已经跑过的圈数。由于fast指针是slow指针速度的两倍，所以有

$$2(a + b) = a + n(b + c) + b$$

化简后得出

$$a + b = n(b + c)$$

继续调整上式有

$$a = (n - 1)(b + c) + c$$

此时很容易看出，从$O$到$P$的距离$a$等于$n-1$圈的距离加上一个$c$的距离。换句话说，如果此时slow从头开始，fast从$Q$点开始，并以相同的速度前进。那么当slow指针从$O$点到达$P$点时，fast指针绕了环$(n - 1)$圈恰好也到达$P$点，所以就保证了两指针在环起点相遇。代码如下：

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
    ListNode *detectCycle(ListNode *head) {
        ListNode *p1 = head;
        ListNode *p2 = head;
        while (p2 != NULL && p2->next != NULL)
        {
            p1 = p1->next;
            p2 = p2->next->next;
            if (p1 == p2)
            {
                p1 = head;
                while (p1 != p2)
                {
                    p1 = p1->next;
                    p2 = p2->next;
                }
                return p1;
            }
        }
        return NULL;
    }
};{% endhighlight %}
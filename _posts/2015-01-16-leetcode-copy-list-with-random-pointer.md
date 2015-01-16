---
layout: post
title: '[LeetCode] Copy List with Random Pointer'
date: 2015-01-16 16:48:30.000000000 +08:00
summary: '检查链表是否有环的题，因为运气比较好，想到之前在哪里看到有一个"龟兔算法"，思路是两个指针同时从头指针出发，一个每次走一步，一个每次走两步，如果走得快先走到底则没有环，如果两个指针相遇说明存在环。'
categories:
- Development
tags:
- LeetCode
- hash table
- linked list
status: publish
type: post
published: true

---

## [Copy List with Random Pointer](https://oj.leetcode.com/problems/copy-list-with-random-pointer/)

深拷贝一个含有random指针的链表。唯一问题就是如何确定新的链表的random指针。

**方法一：**

采用map将旧的结点和新的结点关联，首先拷贝一份链表，此时新的链表的random指针还未确定。再遍历一遍链表，此时通过旧的random指针找到的链表作为新的结点的key就可以找到对应的random指针指向的结点，代码如下：

{% highlight c++ linenos %}
/**
 * Definition for singly-linked list with a random pointer.
 * struct RandomListNode {
 *     int label;
 *     RandomListNode *next, *random;
 *     RandomListNode(int x) : label(x), next(NULL), random(NULL) {}
 * };
 */
class Solution {
public:
    RandomListNode *copyRandomList(RandomListNode *head) {
        if (head == NULL) return NULL;
        
        unordered_map<RandomListNode *, RandomListNode *> old_new_map;
        RandomListNode *newHead = new RandomListNode(head->label), *p_old, *p_new;
        p_old = head;
        p_new = newHead;
        old_new_map[head] = newHead;

        while (p_old->next != NULL)
        {
            p_old = p_old->next;
            p_new->next = new RandomListNode(p_old->label);
            p_new = p_new->next;
            old_new_map[p_old] = p_new;
        }
        
        p_old = head;
        while (p_old != NULL)
        {
            if (p_old->random != NULL) old_new_map[p_old]->random = old_new_map[p_old->random];
            p_old = p_old->next;
        }
        
        return newHead;
    }
};
{% endhighlight %}

时间复杂度为$O(n)$，但是空间上使用了map进行映射。



**方法二：**

这个思路是讨论区[PaladinHL](https://oj.leetcode.com/discuss/user/PaladinHL)提出的，简直是天才啊。

原链表如下：

$$
(node_0) \\
\downarrow \\
(node_1) \\
\downarrow \\
... \\
\downarrow \\
(node_n)
$$

首先复制一份链表如下：

$$
(node_0) \\
\downarrow \\
(node_0 \; copy) \\
\downarrow \\
(node_1) \\
\downarrow \\
(node_1 \; copy) \\
\downarrow \\
... \\
\downarrow \\
(node_n) \\
\downarrow \\
(node_n \; copy)
$$

再遍历一遍现在两倍长度的链表，对每一个旧结点，它的next即copy的新结点，而这个新结点的random指针指向的就是旧结点random志向的结点的下一个结点。遍历完之后整个链表已经复制完成，最后再进行复原即可。代码如下：

{% highlight c++ linenos %}
/**
 * Definition for singly-linked list with a random pointer.
 * struct RandomListNode {
 *     int label;
 *     RandomListNode *next, *random;
 *     RandomListNode(int x) : label(x), next(NULL), random(NULL) {}
 * };
 */
class Solution {
public:
    RandomListNode *copyRandomList(RandomListNode *head) {
        if (head == NULL) return NULL;
            
        RandomListNode *p = head, *tmp;
        do {
            tmp = p->next;
            p->next = new RandomListNode(p->label);
            p->next->next = tmp;
            p = p->next->next;
        } while (p != NULL);
        
        p = head;
        while (p != NULL) {
            tmp = p->next;
            p->next->random = (p->random == NULL ? NULL : p->random->next);
            p = p->next->next;
        }
        
        RandomListNode *newHead = head->next;
        p = head;
        while (p != NULL) {
            tmp = p->next;
            p->next = p->next->next;
            if (tmp->next != NULL)
                tmp->next = tmp->next->next;
            p = p->next;
        }
        
        return newHead;
    }
};

{% endhighlight %}
---
layout: post
title: '[LeetCode] Intersection of Two Linked Lists'
date: 2015-01-14 20:20:11.000000000 +8:00
summary: '给定一个数组和一个值，找出数组中两个数的和为给定值的索引。一看到第一反应就是暴力循环，但毋庸置疑有更优的解决方案。'
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
## [Intersection of Two Linked Lists](https://oj.leetcode.com/problems/intersection-of-two-linked-lists/)

找出两个链表的相交点。先上来是比较直接的思路，要想找到这个点，那么就需要两个指针同时跑并判断。因为要满足两个指针是同时出发且同时到达终点，即链表尾部，那么就需要找到指针的出发起点。对于较短的链表容易知道就是头部，而较长的链表则需要先截掉头部一部分直到和较短链表同样长度。那么就需要计算出两个链表的长度差，通过遍历一遍可以得到结果。接着较长的链表先跑这个差值的距离，然后两个一起跑，直到两者相遇，否则就是没有相交点。代码如下：

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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (headA == NULL || headB == NULL) return NULL;
        
        int lenA = findLength(headA);
        int lenB = findLength(headB);
        int lenDiff = lenB - lenA;
        
        ListNode *fast, *slow;
        if (lenDiff >= 0)
        {
            fast = headB;
            slow = headA;
        }
        else if (lenDiff < 0)
        {
            fast = headA;
            slow = headB;
        }
        lenDiff = abs(lenDiff);
        
        while (lenDiff--) fast = fast->next;
        while (fast != slow)
        {
            fast = fast->next;
            slow = slow->next;
            
            if (fast == slow) return fast;
        }
        
        return fast;
    }
    
    int findLength(ListNode *head)
    {
        int len = 0;
        while (head != NULL)
        {
            len++;
            head = head->next;
        }
        return len;
    }
};
{% endhighlight %}


但实际可以两个指针同时从头开始跑。假设链表A和链表B并且A大于等于B，指针pA和pB同时分别从链表头出发。指针pB先到达尾部的时候令其返回至链表A的头部，那么可以知道现在A和B的距离为链表B的长度。继续向前直到pA到达尾部，那么此时pB指针所在的位置即较长链表A的出发点。然后再将pA重新返回至链表B的头部，两指针边跑边判断就可以了。代码如下：

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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (headA == NULL || headB == NULL) return NULL;
        
        ListNode *p1 = headA, *p2 = headB;
        while (p1 != NULL && p2 != NULL && p1 != p2) {
            p1 = p1->next;
            p2 = p2->next;
        }
        
        if (p1 == p2) return p1;
        if (p1 == NULL) p1 = headB;
        if (p2 == NULL) p2 = headA;
        
        while (p1 != NULL && p2 != NULL) {
            p1 = p1->next;
            p2 = p2->next;
        }
        
        if (p1 == NULL) p1 = headB;
        if (p2 == NULL) p2 = headA;
        
        while (p1 != p2) {
            p1 = p1->next;
            p2 = p2->next;
        }
        
        return p1;
    }
};
{% endhighlight %}

最后发现这段代码是可以合并的，包在一个循环里。代码如下：

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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (headA == NULL || headB == NULL) return NULL;
        
        ListNode *p1 = headA, *p2 = headB;
        while (p1 != NULL && p2 != NULL && p1 != p2) {
            p1 = p1->next;
            p2 = p2->next;
            
            if (p1 == p2) return p1;
            
            if (p1 == NULL) p1 = headB;
            if (p2 == NULL) p2 = headA;
        }
    
        return p1;
    }
};
{% endhighlight %}
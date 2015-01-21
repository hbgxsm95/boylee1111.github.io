---
layout: post
title: '[LeetCode] Add Two Numbers'
date: 2014-12-13 10:21:21.000000000 +01:00
summary: 两个以链表形式存储的两个数相加，每一个结点代表一位，头结点为最低位，尾结点为最高位。
categories:
- Development
tags:
- LeetCode
- linked list
- math
status: publish
type: post
published: true

---
## [Add Two Numbers](https://oj.leetcode.com/problems/add-two-numbers/)

两个以链表形式存储的两个数相加，每一个结点代表一位，头结点为最低位，尾结点为最高位。还是最基本的两数相加的思路，换种形式而已，最后如果有进位，在结尾新建一个结点即可。代码如下：

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
    ListNode *addTwoNumbers(ListNode *l1, ListNode *l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;
        int carry = 0;
        
        ListNode res(0);
        ListNode *cur = &res, *p1 = l1, *p2 = l2;
        int num1 = 0, num2 = 0;
        
        while (p1 != NULL || p2 != NULL)
        {
            num1 = p1 == NULL ? 0 : p1->val;
            num2 = p2 == NULL ? 0 : p2->val;
            
            int value = num1 + num2 + carry;
            cur->next = new ListNode(value % 10);
            cur = cur->next;
            carry = value / 10;
            
            p1 = p1 == NULL ? p1 : p1->next;
            p2 = p2 == NULL ? p2 : p2->next;
        }
        if (carry != 0) cur->next = new ListNode(carry);
        
        return res.next;
    }
};
{% endhighlight %}

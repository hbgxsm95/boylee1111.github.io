---
layout: post
title: Same Tree & Reverse Integer
date: 2014-09-12 01:42:07.000000000 +02:00
summary: "难度不大，递归，一个树相等的条件是结点同为空或结点值相同且左树右树相等。"
categories:
- Development
tags:
- c
- LeetCode
status: publish
type: post
published: true

---

## [Same Tree](https://oj.leetcode.com/problems/same-tree/)

难度不大，递归，一个树相等的条件是结点同为空或结点值相同且左树右树相等。

{% highlight c++ linenos %}
/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode *p, TreeNode *q) {
        if (p == NULL || q == NULL)
            return p == q;
        else
            return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
{% endhighlight %}




## [Reverse Integer](https://oj.leetcode.com/problems/reverse-integer/)

之前做过，也没什么难度。无非从最后一位取，取出来每次扩大十倍。

{% highlight c++ linenos %}
class Solution {
public:
    int reverse(int x) {
        int result = 0;
        while (x != 0)
        {
            result = result * 10 + x % 10;
            x = x / 10;
        }
        return result;
    }
};
{% endhighlight %}

同时原题还提了几个issue

* 如果整数的最后一位或几位为0，输出结果为什么？比如10，100这样的数。
* 逆序之后的整数可能溢出，如何解决这种情况？

首先最后几位是0的情况想到了，介于提供的函数输入值为int，返回值也为int。那不就是意思最终只看数本身是否逆序了，如果100逆序非要是001的话不就是字符串的形式了，就似乎不符合题目提供的函数样板了。

关于溢出的问题确实没想到，虽然平时做项目考虑的不少，但每次做解决算法问题时总是不喜欢考虑各种异常的情况，只找解决方案，这个以后要多注意注意。
---
layout: post
title: '[LeetCode] Same Tree'
date: 2014-09-12 01:42:07.000000000 +02:00
summary: "难度不大，递归，一个树相等的条件是结点同为空或结点值相同且左树右树相等。"
categories:
- Development
tags:
- tree
- DFS
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

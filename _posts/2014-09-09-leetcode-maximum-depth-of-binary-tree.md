---
layout: post
title: '[LeetCode] Maximum Depth of Binary Tree'
date: 2014-09-09 20:06:48.000000000 +02:00
summary: "比较简单，就是递归。"
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

## [Maximum Depth of Binary Tree](https://oj.leetcode.com/problems/maximum-depth-of-binary-tree/)

比较简单，就是递归。

先是没优化的代码：

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
    int maxDepth(TreeNode *root) {
        if (root == NULL) return 0;
        if (root->left == NULL && root->right == NULL) return 1;
        else if (root->left == NULL && root->right != NULL) return 1 + maxDepth(root->right);
        else if (root->right == NULL && root->left != NULL) return 1 + maxDepth(root->left);
        else
        {
            int leftDepth = maxDepth(root->left);
            int rightDepth = maxDepth(root->right);
            if (leftDepth > rightDepth)
                return leftDepth + 1;
            else
                return rightDepth + 1;
        }
    }
};
{% endhighlight %}

实际上递归过程第一步就是判断根节点是否为NULL，所以前三种if情况实际是可以合为一种情况的。

优化后代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int maxDepth(TreeNode *root) {
        if (root == NULL) return 0;
        return 1 + (maxDepth(root->left) > maxDepth(root->right) ? 
            maxDepth(root->left) : maxDepth(root->right));
    }
};
{% endhighlight %}

这样实际有一个问题就是递归的时候如果编译器没有优化return部分的语句，每次递归过程都会被调用两次。所以最终改为如下代码：

{% highlight c++ linenos %}
class Solution {
public:
    int maxDepth(TreeNode *root) {
        if (root == NULL) return 0;
        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);
        return 1 + (leftDepth > rightDepth ? leftDepth : rightDepth);
    }
};
{% endhighlight %}

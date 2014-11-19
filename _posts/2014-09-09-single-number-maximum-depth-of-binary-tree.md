---
layout: post
title: Single Number & Maximum Depth of Binary Tree
date: 2014-09-09 20:06:48.000000000 +02:00
summary: "起初看错题，以为是一个数组中有一个数重复出现两次，找出这个数，时间复杂度还要求是线性的，想了半天也不知道怎么搞。"
categories:
- Development
tags:
- bit
- LeetCode
status: publish
type: post
published: true

---

## [Single Number](https://oj.leetcode.com/problems/single-number/)

起初看错题，以为是一个数组中有一个数重复出现两次，找出这个数，时间复杂度还要求是线性的，想了半天也不知道怎么搞。

仔细一看原来是说一个数组中除了一个数出现一次之外，其他的都出现了两次，找出只出现了一次的那个数。

第一反应当然是遍历比较，或排序找出单个的数，这样时间复杂度就是O(n2)。因为要求是线性，就意味着只遍历一次。于是用异或的特性，相同的数字异或为0。那么异或所有数之后结果就是要找的元素。

代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int singleNumber(int A[], int n) {
        int result = 0;
        for (int i = 0; i < n; ++i) {
            result = result ^ A[i];
        }
        return result;
    }
};
{% endhighlight %}




## [Maximum Depth of Binary Tree](https://oj.leetcode.com/problems/maximum-depth-of-binary-tree/)

比较简单，就是递归。

先是没优化的代码，分情况一步步来：

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


leetcode先从最简单的两道题开始练练手。

---
layout: post
title: '[LeetCode] Binary Tree Preorder Traversal'
date: 2015-02-02 16:11:30.000000000 +08:00
summary: "Given a binary tree, return the preorder traversal of its nodes' values."
categories:
- Development
tags:
- LeetCode
- stack
- tree
status: publish
type: post
published: true

---

## [Binary Tree Preorder Traversal](https://oj.leetcode.com/problems/binary-tree-preorder-traversal/)

> Given a binary tree, return the preorder traversal of its nodes' values.
>
> **Note:** Recursive solution is trivial, could you do it iteratively?

先序遍历二叉树，递归的方法非常简单，这里要求用迭代的方式解决。首先从递归形式来看，无非遍历当前结点，然后遍历左子树，最后遍历右子树。迭代的思路步骤如下：

1. 创建一个栈，并将根结点入栈；
2. 取栈顶非`NULL`元素进行访问，同时分别将此元素的右子树结点和左子树结点顺序入栈；
3. 若栈为空，遍历结束；反之，重复步骤2。

代码如下：

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
    vector<int> preorderTraversal(TreeNode *root) {
        vector<int> res;
        stack<TreeNode *> s;
        s.push(root);
        
        while (!s.empty())
        {
            TreeNode *node = s.top();
            s.pop();
            if (node == NULL) continue;
            res.push_back(node->val);
            s.push(node->right);
            s.push(node->left);
        }
        
        return res;
    }
};
{% endhighlight %}
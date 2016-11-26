---
layout: post
title: '[LeetCode] Symmetric Tree'
date: 2014-09-24 16:30:30.000000000 +02:00
summary: "判断是否对称树，递归实现。三种情况："
categories:
- Development
tags:
- LeetCode
- tree
- DFS
status: publish
type: post
published: true

---

## [Symmetric Tree](https://oj.leetcode.com/problems/symmetric-tree/)

判断是否对称树，递归实现。三种情况：

- 两个结点都空：真
- 两个结点一空一非空：假
- 两个结点都非空：值相等，并且左结点的左树和右结点的右树对称，左结点的右树和右结点的左树对称。

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
    bool isSymmetric(TreeNode *root) {
        if (root == NULL) return true;
        return isValueSame(root->left, root->right);
    }

    bool isValueSame(TreeNode *left, TreeNode *right)
    {
        if (left == NULL || right == NULL) return left == right;
        else return left->val == right->val && isValueSame(left->left, right->right) && isValueSame(left->right, right->left);
    }
};
{% endhighlight %}

还有一种迭代的方法，[xuanaux](https://oj.leetcode.com/discuss/user/xuanaux)，不过他本人用的是栈，我改成了队列。代码如下：

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
    bool isSymmetric(TreeNode *root) {
        if (root == NULL) return true;
        queue<TreeNode *> q1;
        queue<TreeNode *> q2;
        q1.push(root->left);
        q2.push(root->right);

        while (!q1.empty() && !q2.empty())
        {
            TreeNode *n1 = q1.front();
            TreeNode *n2 = q2.front();
            q1.pop();
            q2.pop();
            if (n1 == NULL && n2 == NULL) continue;
            if (n1 == NULL || n2 == NULL) return false;
            if (n1->val != n2->val) return false;
            q1.push(n1->left);
            q2.push(n2->right);
            q1.push(n1->right);
            q2.push(n2->left);
        }
       return true;
    }
};
{% endhighlight %}

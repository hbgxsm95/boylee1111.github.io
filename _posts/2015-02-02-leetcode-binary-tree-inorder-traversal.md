---
layout: post
title: '[LeetCode] Binary Tree Inorder Traversal'
date: 2015-02-02 16:21:30.000000000 +08:00
summary: "Given a binary tree, return the inorder traversal of its nodes' values."
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

> Given a binary tree, return the inorder traversal of its nodes' values.
>
> **Note:** Recursive solution is trivial, could you do it iteratively?

中序遍历二叉树，要求用迭代的方式解决。首先从递归形式来看，遍历顺序为左子树，当前结点，右子树。迭代思路步骤如下：

1. 创建一个栈，并将根结点入栈，同时把当前结点设为根结点；
2. 判断当前是否为`NULL`：
    1. 若是`NULL`，则一直搜索至最左结点，并将所有经过的结点入栈；
    2. 若非`NULL`，则取栈顶元素同时进行访问，并将当前结点设为栈顶元素的右子树结点；
3. 若栈为空且当前结点为`NULL`，遍历结束；反之，返回步骤2。

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
    vector<int> inorderTraversal(TreeNode *root) {
        vector<int> res;
        stack<TreeNode *> s;
        TreeNode *current = root;
        
        while (!s.empty() || current != NULL)
        {
            if (current != NULL)
            {
                s.push(current);
                current = current->left;
                continue;
            }
            TreeNode *node = s.top();
            s.pop();
            res.push_back(node->val);
            current = node->right;
        }
        
        return res;
    }
};
{% endhighlight %}
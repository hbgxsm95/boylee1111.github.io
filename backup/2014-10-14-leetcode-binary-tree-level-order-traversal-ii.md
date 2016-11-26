---
layout: post
title: '[LeetCode] Binary Tree Level Order Traversal II'
date: 2014-10-14 00:11:34.000000000 +02:00
summary: "对于二叉树层序便利比较熟悉的就是BFS的方法了，用队列实现，实现时候遇到了一个问题是，如何判断这个结点是那一层的，想到一种方法是用两个队列，一个当前层，另一个是下一层。"
categories:
- Development
tags: 
- LeetCode
- BFS
- tree
status: publish
type: post
published: true

---

## [Binary Tree Level Order Traversal II](https://oj.leetcode.com/problems/binary-tree-level-order-traversal-ii/)

> Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

与[Binary Tree Level Order Traversal](/development/2014/10/13/leetcode-binary-tree-level-order-traversal/)唯一的区别就是这次采用bottom-up的形式遍历。其实可以直接用上一个答案最后reverse一下数组就行，当然是很没有必要的。算法思路和上一个一样，用队列一层一层便利，只不过采用的递归的方法，每次递归之后在加入到结果vector中，这样就保证是逆序的了。代码如下：

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
    vector<vector<int> > levelOrde    rBottom(TreeNode *root) {
        vector<vector<int> > res;
        if (root == NULL) return res;

        queue<TreeNode *> q;
        q.push(root);
        generateLevel(q, res);
        return res;
    }

    void generateLevel(queue<TreeNode *>& q, vector<vector<int> >& res)
    {
        if (q.empty()) return;

        vector<int> vec;
        queue<TreeNode *> nextQueue;
        while (!q.empty())
        {
            TreeNode *t = q.front();
            q.pop();
            vec.push_back(t->val);
            if (t->left != NULL) nextQueue.push(t->left);
            if (t->right != NULL) nextQueue.push(t->right);
        }
        generateLevel(nextQueue, res);
        res.push_back(vec);
    }
};
{% endhighlight %}

实际把`generateLevel(nextQueue, res);`和`res.push_back(vec);`交换一下就是[Binary Tree Level Order Traversal](/development/2014/10/13/leetcode-binary-tree-level-order-traversal/)的递归答案。
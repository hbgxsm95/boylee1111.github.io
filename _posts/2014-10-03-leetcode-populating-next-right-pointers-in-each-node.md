---
layout: post
title: '[LeetCode] Populating Next Right Pointers in Each Node'
date: 2014-10-03 18:43:29.000000000 +02:00
summary: "给定结点数量，计算可以生成几种二叉搜索树。动态规划，给定值为0或1时，都只有一种，即空树和只有一个跟结点的树。"
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

## [Populating Next Right Pointers in Each Node](https://oj.leetcode.com/problems/populating-next-right-pointers-in-each-node/)

开一个pre结点，一个cur结点。pre结点代表连接某一层其上一层的头结点，cur则是从pre开始，从某一层左侧循环到右侧。连接逻辑即先连接左右子树，然后如果cur-next不为空，则连接右子树和下一个结点的做子树，如此循环。

代码如下：

{% highlight c++ linenos %}
/**
 * Definition for binary tree with next pointer.
 * struct TreeLinkNode {
 *  int val;
 *  TreeLinkNode *left, *right, *next;
 *  TreeLinkNode(int x) : val(x), left(NULL), right(NULL), next(NULL) {}
 * };
 */
class Solution {
public:
    void connect(TreeLinkNode *root) {
        if (root == NULL) return;
        TreeLinkNode *pre = root, *cur;

        while (pre->left != NULL)
        {
            cur = pre;
            while (cur != NULL)
            {
                cur->left->next = cur->right;
                if (cur->next != NULL)
                    cur->right->next = cur->next->left;
                cur = cur->next;
            }
            pre = pre->left;
        }
    }
};
{% endhighlight %}
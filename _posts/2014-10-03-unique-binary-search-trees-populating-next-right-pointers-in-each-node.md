---
layout: post
title: Unique Binary Search Trees & Populating Next Right Pointers in Each Node
date: 2014-10-03 18:43:29.000000000 +02:00
summary: "给定结点数量，计算可以生成几种二叉搜索树。动态规划，给定值为0或1时，都只有一种，即空树和只有一个跟结点的树。"
categories:
- Development
tags:
- c
- LeetCode
status: publish
type: post
published: true

---

## [Unique Binary Search Trees](https://oj.leetcode.com/problems/unique-binary-search-trees/)

给定结点数量，计算可以生成几种二叉搜索树。动态规划，给定值为0或1时，都只有一种，即空树和只有一个跟结点的树。记为[latex]C_0 = 0[/latex], [latex]C_1 = 0[/latex]。

当给定两个结点的时候，如果1当做根结点，那么有一种情况，左侧空树，右侧为2；如果2当做根结点，同样左侧为1，右侧为空树。那么有[latex]C_2 = C_0 * C_1 + C_1 * C_0[/latex]。

当给定三个结点的时候，如果1当做根结点，那么有只能是左侧空树，右侧为有以1和2两个结点的子搜索树；如果2当做根结点，只能左侧一个以1为结点的子搜索树，右侧一个以2为结点的子搜索树；如果3当根结点，那么只能左侧有以1和2为两个结点的子搜索树，右侧为空树。那么有[latex]C_3 = C_0 * C_2 + C_1 * C_1 + C_2 * C_0[/latex]。

那么就可以推出递归公式为:

[latex]C_n = \sum\limits_{i=0}^{n-1} C_i * C_{n-i-1}[/latex]

代码如下：

```c++
class Solution {
public:
    int numTrees(int n) {
        vector<int> A(n + 1, 0);
        A[0] = A[1] = 1;
        for (int i = 2; i <= n; ++i)
            for (int j = 0; j < i; ++j)
                A[i] += A[j] * A[i - 1 - j];
        return A[n];
    }
};
```





## [Populating Next Right Pointers in Each Node](https://oj.leetcode.com/problems/populating-next-right-pointers-in-each-node/)

开一个pre结点，一个cur结点。pre结点代表连接某一层其上一层的头结点，cur则是从pre开始，从某一层左侧循环到右侧。连接逻辑即先连接左右子树，然后如果cur-next不为空，则连接右子树和下一个结点的做子树，如此循环。

代码如下：

```c++
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
```
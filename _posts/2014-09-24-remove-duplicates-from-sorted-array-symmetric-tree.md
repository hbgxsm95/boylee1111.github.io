---
layout: post
title: Remove Duplicates from Sorted Array & Symmetric Tree
date: 2014-09-24 16:30:30.000000000 +02:00
summary: "删除有序数组中多余元素，数组长度小于2时即特殊情况，直接返回数组长度。"
categories:
- Development
tags:
- LeetCode
- array
- two point
- tree
- DFS
status: publish
type: post
published: true

---

## [Remove Duplicates from Sorted Array](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array/)

删除有序数组中多余元素，数组长度小于2时即特殊情况，直接返回数组长度。

对于剩余情况，索引i遍历数组，j用来表示循环过程中数组的长度，则有A[i]和A[j]不相等时，将A[i]给A[j]，否则继续遍历，这样就保证了A[0-j]这个数组是有序不重复的，即一个循环不变量。最终的数组就是没有重复元素的，数组即有j+1个元素。代码如下：


{% highlight c++ linenos %}
class Solution {
public:
    int removeDuplicates(int A[], int n) {
        if (n <= 1) return n;
        int j = 0;
        for (int i = 1; i < n; ++i)
            if (A[i] != A[j])
                A[++j] = A[i];
        return j + 1;
    }
};
{% endhighlight %}




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

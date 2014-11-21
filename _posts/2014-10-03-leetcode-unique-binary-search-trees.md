---
layout: post
title: '[LeetCode] Unique Binary Search Trees'
date: 2014-10-03 18:43:29.000000000 +02:00
summary: "给定结点数量，计算可以生成几种二叉搜索树。动态规划，给定值为0或1时，都只有一种，即空树和只有一个跟结点的树。"
categories:
- Development
tags:
- LeetCode
- tree
- DP
- dynamic programming
status: publish
type: post
published: true

---

## [Unique Binary Search Trees](https://oj.leetcode.com/problems/unique-binary-search-trees/)

给定结点数量，计算可以生成几种二叉搜索树。动态规划，给定值为0或1时，都只有一种，即空树和只有一个跟结点的树。记为[latex]C_0 = 0[/latex], [latex]C_1 = 0[/latex]。

当给定两个结点的时候，如果1当做根结点，那么有一种情况，左侧空树，右侧为2；如果2当做根结点，同样左侧为1，右侧为空树。那么有[latex]C_2 = C_0 \times C_1 + C_1 \times C_0[/latex]。

当给定三个结点的时候，如果1当做根结点，那么有只能是左侧空树，右侧为有以1和2两个结点的子搜索树；如果2当做根结点，只能左侧一个以1为结点的子搜索树，右侧一个以2为结点的子搜索树；如果3当根结点，那么只能左侧有以1和2为两个结点的子搜索树，右侧为空树。那么有[latex]C_3 = C_0 \times C_2 + C_1 \times C_1 + C_2 \times C_0[/latex]。

那么就可以推出递归公式为:

$$C_n = \sum\limits_{i=0}^{n-1} C_i \times C_{n-i-1}$$

代码如下：

{% highlight c++ linenos %}
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
{% endhighlight %}

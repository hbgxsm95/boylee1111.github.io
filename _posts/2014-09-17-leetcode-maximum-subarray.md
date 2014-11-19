---
layout: post
title: '[LeetCode] Maximum Subarray'
date: 2014-09-17 00:12:31.000000000 +02:00
summary: "最大子数组问题，给一个数组，求一个子数组保证相比其他子数组这个子数组内所有数之和最大。"
categories:
- Development
tags:
- DP
- dynamic programming
- array
- LeetCode
status: publish
type: post
published: true

---

##[Maximum Subarray](https://oj.leetcode.com/problems/maximum-subarray/)


最大子数组问题，给一个数组，求一个子数组保证相比其他子数组这个子数组内所有数之和最大。

依然是DP问题。假设新开一个数组B，B[i]的意义如下：

对A[0]到A[i]这个数组，包含A[i]的子数组的和的最大值。当然我们不知道这个子数组具体是什么，但是我们知道这个子数组的和为B[i]，并且是相对于其他包含A[i]的子数组中和最大的那一个。

在这个假设之下，那么B[i + 1]的值即为B[i] + A[i + 1]和A[i + 1]中较大的一个。

通过这个思路我们可以构建出数组B，那么数组B中最大的元素值就是我们所要求的A的子数组和最大值。

实际解题中，我们没有必要给数组B分配空间，因为我们所要的值只不过是B数组中最大的那一项。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int maxSubArray(int A[], int n) {
        int res = A[0], lastMax = A[0];
        for (int i = 1; i < n; ++i)
        {
            lastMax = max(lastMax + A[i], A[i]);
            res = max(res, lastMax);
        }
        return res;
    }
};
{% endhighlight %}

题目还有扩展，尝试用分治的思路解决，回头再说。
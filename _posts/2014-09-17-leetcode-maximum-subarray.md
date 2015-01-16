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
- divide and conquer
status: publish
type: post
published: true

---

##[Maximum Subarray](https://oj.leetcode.com/problems/maximum-subarray/)


最大子数组问题，给一个数组，求一个子数组保证相比其他子数组这个子数组内所有数之和最大。

**方法一：DP**

假设新开一个数组B，B[i]的意义如下：

对A[0]到A[i]这个数组，包含A[i]的子数组的和的最大值。当然我们不知道这个子数组具体是什么，但是我们知道这个子数组的和为B[i]，并且是相对于其他包含A[i]的子数组中和最大的那一个。在这个假设之下，那么B[i + 1]的值即为B[i] + A[i + 1]和A[i + 1]中较大的一个。

通过这个思路我们可以构建出数组B，那么数组B中最大的元素值就是我们所要求的A的子数组和最大值。

用数组$S(i)$表示数组A[0 ... i-1]的和的最大值，数组B[0 ... i-1]的最大值，那么有状态转换方程如下：

{% raw %}$$S(i) = \left\{ \begin{array}{ll}
1 & i = 1;\\
max(S(i - 1) + A[i], A[i]) & else.\end{array} \right.$${% endraw %}

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

**方法二：分治法**

在讨论区看到的[porker2008](https://oj.leetcode.com/discuss/user/porker2008)的思路。主要分三步：

1. 选择数组的中间值，那么解分两种情况，包含当前中间值和不包含中间值；
2. 根据是否包含中间值分类：
    1. 如果包含中间值，那么解是左侧数组的后缀的最大和，右侧数组前缀的最大和与中间值的总和；
    2. 如果不包含中间值，那么解是左侧子数组最大和或右侧子数组最大和；
3. 解为步骤二里三种情况中的最大值。

代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int maxSubArray(int A[], int n) {
        if (n == 0) return 0;
        return findMaxSubArray(A, 0, n - 1);
    }
    
    int findMaxSubArray(int A[], int left, int right)
    {
        if (left == right) return A[left];
        int mid = (left + right) / 2;
        int leftMaxSum = findMaxSubArray(A, left, mid);
        int rightMaxSum = findMaxSubArray(A, mid + 1, right);
        int leftSuffixMaxSum = 0, rightPrefixMaxSum = 0, temp = 0;
        for (int i = mid - 1; i >= left; --i) {
            temp += A[i];
            leftSuffixMaxSum = max(temp, leftSuffixMaxSum);
        }
        temp = 0;
        for (int i = mid + 1; i <= right; ++i) {
            temp += A[i];
            rightPrefixMaxSum = max(temp, rightPrefixMaxSum);
        }
        return max(leftSuffixMaxSum + A[mid] + rightPrefixMaxSum, max(leftMaxSum, rightMaxSum));
    }
};
{% endhighlight %}

相比之下，DP的方法时间复杂度是$O(n)$，而采用分治法则复杂度为$O(n \log n)$，相比之下DP方法更优也更容易想到，但是分治法在这里的使用也真是挺巧妙的。
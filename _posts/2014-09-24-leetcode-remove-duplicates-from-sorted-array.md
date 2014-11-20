---
layout: post
title: '[LeetCode] Remove Duplicates from Sorted Array'
date: 2014-09-24 16:30:30.000000000 +02:00
summary: "删除有序数组中多余元素，数组长度小于2时即特殊情况，直接返回数组长度。"
categories:
- Development
tags:
- LeetCode
- array
- two point
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
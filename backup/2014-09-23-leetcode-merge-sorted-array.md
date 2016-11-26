---
layout: post
title: '[LeetCode] Merge Sorted Array'
date: 2014-09-23 20:00:45.000000000 +02:00
summary: "merge两个有序数组，开始思路是创建一个新的数组复制一份A，merge过程类似链表，从头到尾先判断再复制。但这样本身复制A数组过程就消耗空间时间。"
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

## [Merge Sorted Array](https://oj.leetcode.com/problems/merge-sorted-array/)

merge两个有序数组，开始思路是创建一个新的数组复制一份A，merge过程类似链表，从头到尾先判断再复制。但这样本身复制A数组过程就消耗空间时间。改变思路从尾部开始复制，那么就省去了复制数组A的过程，还有一个好处就是当最后B数组全部merge之后就不用考虑A数组，因为整个数组A已经有序了。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    void merge(int A[], int m, int B[], int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (i >= 0 && j >= 0)
            A[k--] = A[i] > B[j] ? A[i--] : B[j--];
        while (j >= 0)
            A[k--] = B[j--];
    }
};
{% endhighlight %}

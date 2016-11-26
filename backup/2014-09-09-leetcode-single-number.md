---
layout: post
title: '[LeetCode] Single Number'
date: 2014-09-09 20:06:48.000000000 +02:00
summary: "起初看错题，以为是一个数组中有一个数重复出现两次，找出这个数，时间复杂度还要求是线性的，想了半天也不知道怎么搞。"
categories:
- Development
tags:
- bit
- LeetCode
status: publish
type: post
published: true

---

## [Single Number](https://oj.leetcode.com/problems/single-number/)

一个数组中除了一个数出现一次之外，其他的都出现了两次，找出只出现了一次的那个数。

因为要求是线性，就意味着只遍历一次。于是用异或的特性，相同的数字异或为0。那么异或所有数之后结果就是要找的元素。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int singleNumber(int A[], int n) {
        int result = 0;
        for (int i = 0; i < n; ++i) {
            result = result ^ A[i];
        }
        return result;
    }
};
{% endhighlight %}

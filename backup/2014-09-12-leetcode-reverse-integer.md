---
layout: post
title: '[LeetCode] Reverse Integer'
date: 2014-09-12 01:42:07.000000000 +02:00
summary: "之前做过，AC没什么难度。无非从最后一位取，取出来每次扩大十倍。"
categories:
- Development
tags:
- LeetCode
- math
status: publish
type: post
published: true

---

## [Reverse Integer](https://oj.leetcode.com/problems/reverse-integer/)

之前做过，AC没什么难度。无非从最后一位取，取出来每次扩大十倍。

{% highlight c++ linenos %}
class Solution {
public:
    int reverse(int x) {
        int result = 0;
        while (x != 0)
        {
            result = result * 10 + x % 10;
            x = x / 10;
        }
        return result;
    }
};
{% endhighlight %}

同时原题还提了几个issue

* 如果整数的最后一位或几位为0，输出结果为什么？比如10，100这样的数。
* 逆序之后的整数可能溢出，如何解决这种情况？

首先最后几位是0的情况想到了，介于提供的函数输入值为int，返回值也为int。那不就是意思最终只看数本身是否逆序了，如果100逆序非要是001的话不就是字符串的形式了，就似乎不符合题目提供的函数样板了。

关于溢出的问题确实没想到，虽然平时做项目考虑的不少，但每次做解决算法问题时总是不喜欢考虑各种异常的情况，只找解决方案，这个以后要多注意注意。
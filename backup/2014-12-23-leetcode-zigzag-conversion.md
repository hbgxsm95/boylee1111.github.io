---
layout: post
title: '[LeetCode] ZigZag Conversion'
date: 2014-12-23 13:09:11.000000000 +01:00
summary: '题意要求给定一个ZigZag形式的字符串，然后以行的形式重新遍历一遍。'
categories:
- Development
tags:
- LeetCode
- string
- math
status: publish
type: post
published: true

---
## [ZigZag Conversion](https://oj.leetcode.com/problems/zigzag-conversion/)

题意要求给定一个ZigZag形式的字符串，然后以行的形式重新遍历一遍。整个看来主要就是找规律，str代表字串，row代表要求的行数：

- 第一行或最后一行：前一个数和后一个数之差为$(row - 1) * 2$
- 其他行，行数为$i$：除了满足上一条之外，在这两个数中间还有一个数，和前一个数的差为$(row - i) * 2 - 2$

规律找出来的就是逻辑实现了，外层循环便利row边，内层循环直到到达字符串尾：代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    string convert(string s, int nRows) {
        string res = "";
        if (nRows == 1) return s;
        for (int i = 0; i < nRows; ++i)
        {
            int j = i;
            while (j < s.length())
            {
                res += s[j];
                if (i != 0 && i != nRows - 1 && j + (nRows - i) * 2 - 2 < s.length())
                    res += s[j + (nRows - i) * 2 - 2];
                j += (nRows - 1) * 2;
            }
        }
        return res;
    }
};
{% endhighlight %}
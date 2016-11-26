---
layout: post
title: '[LeetCode] Decode Ways'
date: 2014-11-13 04:15:33.000000000 +01:00
summary: "Calculate all the ways of decoding. This problem is similar to ..."
categories:
- Development
tags:
- DP
- dynamic programming
- LeetCode
status: publish
type: post
published: true

---

## [Decode Ways](https://oj.leetcode.com/problems/decode-ways/)

Calculate all the ways of decoding. This problem is similar to [Climbing Stairs]({{ site.baseurl }}/development/2014/11/13/leetcode-climbing-stairs/). The difference is that the validity of decoding needs to be checked.

When the string is empty or the first digit is '0', the number of decoding is 0. Otherwise, the first digit only has 1 way of decoding.

If length larger than 2, two steps for calculating the decode ways of previous $n$ digits are mandatory:

1. If current digit can be decoded individually, the ways of decoding is equal to the previous number of decoding ways. [latex]N_n = N_{n - 1}[/latex].
2. If current digit could be combined with previous digit, the ultimated number of decoding is current value plus the number of previous one. Owing to the $N_n$ has already assigned as $N\_{n - 1}$ at previous step, then $N_n = N_n + N_{n - 2}$.


The array used to save all the decoding ways can be simplified. The space complixity can be reduced via only recording the previous two number of decoding way.


Here is the code:

{% highlight c++ linenos %}
class Solution {
public:
    int numDecodings(string s) {
        if (s == "" || s[0] == '0') return 0;

        int pre1 = 1, pre2 = 1, cur = 0;
        for (int i = 1; i < s.size(); ++i)
        {
            if (s[i] > '0') cur = pre1;
            if (s[i - 1] == '1' || (s[i - 1] == '2' && s[i] <= '6')) cur += pre2;
            pre2 = pre1;
            pre1 = cur;
            cur = 0;
        }

        return pre1;
    }
};
{% endhighlight %}
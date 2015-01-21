---
layout: post
title: '[LeetCode] Add Binary'
date: 2014-12-13 10:20:21.000000000 +01:00
summary: 字符串形式的二进制数相加，非常简单的字符串处理。每次找到相同位次的数相加，然后纪录一个进位即可。
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
## [Add Binary](https://oj.leetcode.com/problems/add-binary/)

字符串形式的二进制数相加，非常简单的字符串处理。每次找到相同位次的数相加，然后纪录一个进位即可。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    string addBinary(string a, string b) {
        string res = "";
        int carry = 0;
        int m = a.length(), n = b.length();
        int length = max(m, n);
        
        for (int i = 0; i < length; ++i)
        {
            char x = (i < m ? a[m - i - 1] : '0');
            char y = (i < n ? b[n - i - 1] : '0');
            char num = x + y + carry - '0';
            carry = 0;
            if (num >= '2')
            {
                carry = 1;
                num -= 2;
            }
            res = num + res;
        }
        if (carry == 1) res = "1" + res;
        return res;
    }
};
{% endhighlight %}

---
layout: post
title: '[LeetCode] Count and Say'
date: 2014-12-19 18:44:11.000000000 +01:00
summary: 'To be honest, I took lots of time to understand the problem. Finally, I got it clear, just print how you read the string by “quantity + number”.'
categories:
- Development
tags:
- LeetCode
- string
status: publish
type: post
published: true

---
## [Count and Say](https://oj.leetcode.com/problems/count-and-say/)

To be honest, I took lots of time to understand the problem. Finally, I got it clear, just print how you read the string by "quantity + number". Like "1", read off as "one 1", namely "11". Then "11" read off as "two 1", namely "21".

Here is the example of output:

- `1`
- `11`
- `21`
- `1211`
- `111221`
- `312211`
- `13112221`
- `1113213211`
- `31131211131221`
- `13211311123113112211`

Outter loop is the determined by $n$, inner loop generate next round digits string according to the current one. Here is the code with simulation approach:

{% highlight c++ linenos %}
class Solution {
public:
    string countAndSay(int n) {
        string res = "1";
        
        for (int i = 1; i < n; ++i)
        {
            string temp = "";
            for (int j = 0; j < res.length();)
            {
                char x = res[j];
                char count = '0';
                do
                {
                    count++;
                    j++;
                } while (x == res[j]);
                temp = temp + count + x;
            }
            res = temp;
        }
        
        return res;
    }
};
{% endhighlight %}
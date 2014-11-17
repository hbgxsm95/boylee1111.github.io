---
layout: post
title: '[LeetCode] Restore IP Addresses'
date: 2014-11-14 02:20:21.000000000 +01:00
summary: 恢复字符串所有可能的IP地址，可以回溯或者直接字符串处理。
categories:
- Development
tags:
- backtracking
- LeetCode
- string
status: publish
type: post
published: true

---
## [Restore IP Addresses](https://oj.leetcode.com/problems/restore-ip-addresses/)

恢复字符串所有可能的IP地址，可以回溯或者直接字符串处理。

**回溯法**

每次取分割出来最多三位进行判断，如果符合就继续分割剩余部分，最多分四次。思路比较简单，但是对点的处理导致有些烦，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    string solution = "";
    vector<string> res;

    vector<string> restoreIpAddresses(string s) {
        generateIpAddress(0, s);

        return res;
    }

    void generateIpAddress(int step, string restStr)
    {
        if (restStr.length() < 4 - step || restStr.length() > 3 * (4 - step)) return ;
        if (step == 4 && restStr == "")
        {
            res.push_back(solution.substr(0, solution.length() - 1));
            return ;
        }
        for (int i = 1; i <= 3 && i <= restStr.length(); ++i)
        {
            string seg = restStr.substr(0, i);
            if (isValid(seg))
            {
                solution += seg + '.';
                generateIpAddress(step + 1, restStr.substr(i));
                solution = solution.substr(0, solution.length() - i - 1);
            }
        }
    }

    bool isValid(string s)
    {
        int length = s.size();
        if (length > 1 && s[0] == '0') return false;
        if (stoi(s) <= 255) return true;
        return false;
    }
};
{% endhighlight %}


**直接处理**

遍历三个点所有可能的位置，并且判断产生的IP地址是否合理，三层循环解决，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;

        int length = s.length();
        if (length < 4 || length > 12) return res;

        for (int i = 1; i <= 3; ++i)
            for (int j = i + 1; j <= i + 4; ++j)
                for (int k = j + 1; k <= j + 4; ++k)
                {
                    if (length - k < 1 || length - k > 3) continue;
                    string first = s.substr(0, i);
                    string second = s.substr(i, j - i);
                    string third = s.substr(j, k - j);
                    string fourth = s.substr(k);
                    if (isValid(first) && isValid(second) && isValid(third) && isValid(fourth))
                        res.push_back(first + '.' + second + '.' + third + '.' + fourth);
                }

        return res;
    }

    bool isValid(string s)
    {
        int length = s.size();
        if (length > 1 && s[0] == '0') return false;
        if (stoi(s) <= 255) return true;
        return false;
    }
};
{% endhighlight %}
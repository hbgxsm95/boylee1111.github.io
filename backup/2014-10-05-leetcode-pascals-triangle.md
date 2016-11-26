---
layout: post
title: "[LeetCode] Pascal's Triangle"
date: 2014-10-05 02:45:58.000000000 +02:00
summary: "就是杨辉三角了，很明显的DP思路。对于第i行第一个和最后一个数都为1，第j个数即有..."
categories:
- Development
tags:
- array
- DP
- dynamic programming
- math
- LeetCode
status: publish
type: post
published: true

---

## [Pascal's Triangle](https://oj.leetcode.com/problems/pascals-triangle/)

就是杨辉三角了，很明显的DP思路。对于第i行第一个和最后一个数都为1，第j个数即有

$$V_{i, j} = V_{i - 1, j - 1} + V_{i - 1, j}$$

代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<vector<int> > generate(int numRows) {
        vector<vector<int> > res;
        if (numRows == 0) return res;
        res.push_back(vector<int>(1, 1));
        if (numRows == 1) return res;

        for (int i = 1; i < numRows; ++i)
        {
            vector<int> v(i + 1, 1);
            for (int j = 0; j < i - 1; ++j)
                v[j + 1] = res[i - 1][j] + res[i - 1][j + 1];
            res.push_back(v);
        }

        return res;
    }
};
{% endhighlight %}

对于杨辉三角还有公式可以用，对第n行第i个值为[latex]{n-1 \choose i-1}[/latex]，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<vector<int> > generate(int numRows) {
        vector<vector<int> > res;
        if (numRows == 0) return res;
        res.push_back(vector<int>(1, 1));
        if (numRows == 1) return res;

        for (int i = 1; i < numRows; ++i)
        {
            vector<int> v(i + 1, 1);
            for (int j = 0; j < i - 1; ++j)
                v[j + 1] = v[j] * (i - j) / (j + 1);
            res.push_back(v);
        }

        return res;
    }
};
{% endhighlight %}
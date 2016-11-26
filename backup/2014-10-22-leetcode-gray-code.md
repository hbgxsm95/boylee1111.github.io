---
layout: post
title: '[LeetCode] Gray Code'
date: 2014-10-22 22:55:48.000000000 +02:00
summary: "求格雷码问题，看到标签之后想到回溯法。"
categories:
- Development
tags:
- backtracking
- DP
- dynamic programming
- LeetCode
status: publish
type: post
published: true

---

## [Gray Code](https://oj.leetcode.com/problems/gray-code/)


求格雷码问题，看到标签之后想到回溯法。

回溯思路如下：先塞一个0到结果数组里，用一个数组标记是否访问过此数，如果没有访问过就判断是否与结果数组最后一个是只相差一位的，不是就判断下一个数，如果是的话就标记此数被访问过，继续找下一个数。

方法比较好理解，因为递归效率很低，当 [latex]n = 8[/latex] 的时候就开始吃不消了，跑OJ果断TLE了，也算一种思路，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<int> grayCode(int n) {
        int total = (int)pow(2.0, n);
        vector<int> res;
        vector<bool> visit(total, false);
        res.push_back(0);
        visit[0] = true;
        generateGrayCode(total, visit, res);
        return res;
    }

    void generateGrayCode(int& total, vector<bool>& visit, vector<int>& res)
    {
        for (int i = 1; i < total; ++i)
            if (!visit[i])
            {
                int lastVal = res.back();
                if (isSuccessive(lastVal, i))
                {
                    visit[i] = true;
                    res.push_back(i);
                    generateGrayCode(total, visit, res);
                    if (res.size() == total) return;
                    visit[i] = false;
                    res.pop_back();
                }
            }
    }

    bool isSuccessive(int a, int b)
    {
        int v = a ^ b;
        while ((v & 1) != 1)
            v = v >> 1;
        return v == 1;
    }
};
{% endhighlight %}

然后尝试修改了一下代码，求出在n情况下所有格雷码组，效率当然更低了，因为几乎要尝试遍历每一种置换。[latex]n = 4[/latex] 的时候结果都已经5712个结果了。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<vector<int> > grayCode(int n) {
        int total = pow(2, n);
        vector<vector<int> > res;
        vector<bool> visit(total, false);
        vector<int> solution;
        solution.push_back(0);
        visit[0] = true;
        generateGrayCode(total, visit, solution, res);
        return res;
    }

    void generateGrayCode(int& total, vector<bool>& visit, vector<int>& solution, vector<vector<int> >& res)
    {
        if (solution.size() == total)
            res.push_back(solution);
        for (int i = 1; i < total; ++i)
            if (!visit[i])
            {
                int lastVal = solution.back();
                if (isSuccessive(lastVal, i))
                {
                    visit[i] = true;
                    solution.push_back(i);
                    generateGrayCode(total, visit, solution, res);
                    solution.pop_back();
                    visit[i] = false;
                }
            }
    }

    bool isSuccessive(int a, int b)
    {
        int v = a ^ b;
        while ((v & 1) != 1)
            v = v >> 1;
        return v == 1;
    }
};
{% endhighlight %}




回溯没法完美解决，Wiki上有生成Gray Code的公式[Converting to and from Gray Code](http://en.wikipedia.org/wiki/Gray_code#Converting_to_and_from_Gray_code)，用这个公式可以快速解决，时间复杂度只有 [latex]O(2^n)[/latex] ，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<int> grayCode(int n) {
        int total = pow(2, n);
        vector<int> res(total, 0);
        for (int i = 0; i < total; ++i)
            res[i] = (i >> 1) ^ i;
        return res;
    }
};
{% endhighlight %}

[What if I have no knowledge over Gray Code before?](https://oj.leetcode.com/discuss/1525/what-if-i-have-no-knowledge-over-gray-code-before)

讨论区这个问题下有一个DP的解决思路，描述了一种格雷码的排列规律。

* 当 [latex]n = 1[/latex] 时，排列为 [latex]0, 1[/latex]
* 当 [latex]n = 2[/latex] 时，排列为 [latex]00, 01, 11, 10[/latex]
* 当 [latex]n = 3[/latex] 时，排列为 [latex]000, 001, 011, 010, 110, 111, 101, 100[/latex]

每次当n加增加一时，前一半为上一次的结果前面加0，后一半为上一次结果逆序并在前面加1。换句话说，新的结果除去最高位是对称的。那么从 [latex]n = 1[/latex]开始求解，每次在上一次结果后追加新的解，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<int> grayCode(int n) {
        int total = (int)pow(2.0, n), number = 1, prefix;
        vector<int> res(total, 0);

        for (int i = 0; i < n; ++i)
        {
            prefix = 1 << i;
            number *= 2;
            for (int j = number / 2; j < number; ++j)
                res[j] = res[number - j - 1] + prefix;
        }

        return res;
    }
};{% endhighlight %}
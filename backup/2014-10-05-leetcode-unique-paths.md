---
layout: post
title: '[LeetCode] Unique Paths'
date: 2014-10-05 02:45:58.000000000 +02:00
summary: "<strong>方法一</strong>：最先想到的DP思路。"
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

## [Unique Paths](https://oj.leetcode.com/problems/unique-paths/)

**方法一**：最先想到的DP思路。因为机器人只能向右向下走，那么对每一格，到达的方法数即为到达这一格左侧格子的方法数加上到达这一个上侧格子的方法数。对于最左侧和最上侧每一格子到达方法数都为一。用[latex]C_{i,j}[/latex]表示到达格子[latex]i, j[/latex]的方法数，那么有

{% raw %}$$C_{i, j} = \left\{ \begin{array}{ll}
1 & i = 1;\\
1 & j = 1;\\
C_{i-1, j} + C_{i, j - 1} & else.\end{array} \right. $${% endraw %}


事件复杂度为[latex]O(mn)[/latex]在实际实现的时候并不需要保存最终的二位数组，只需要一维即可。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> A(n, 1);

        for (int i = 1; i < m; ++i)
            for (int j = 1; j < n; ++j)
                A[j] = A[j - 1] + A[j];
        return A[n - 1];
    }
};
{% endhighlight %}

<br />

**方法二**：换个角度思考，机器人只能向右向下，如果格子是[latex]m \times n[/latex]的，那么要走到右下角需要的步数为[latex]m + n - 2[/latex]，但对于这[latex]m + n - 2[/latex]步，必须有[latex]m - 1[/latex]步是向下的或者[latex]n-1[/latex]步是向右的。那么就到达方法数就相当于从[latex]m + n - 2[/latex]步中选[latex]m - 1[/latex]步或[latex]n - 1[/latex]步。即得出公式[latex]{m + n - 2 \choose m - 1}[/latex]或[latex]{m + n - 2 \choose n - 1}[/latex]，时间复杂度为[latex]O(m)[/latex]或[latex]O(n)[/latex]，代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int uniquePaths(int m, int n) {
        int r = min(m, n) - 1, N = m + n - 2;
        long long res = 1;
        for (int i = 0; i < r; ++i)
        {
            res *= N - i;
            res /= i + 1;
        }

        return res;
    }
};
{% endhighlight %}

用公式最初使用int的时候溢出了，long long最终AC了，公式虽然时间复杂度低，但溢出是个问题。
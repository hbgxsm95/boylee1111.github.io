---
layout: post
title: '[LeetCode] Combinations'
date: 2014-12-17 22:43:21.000000000 +01:00
summary: "Given two integers n and k, return all possible combinations of k numbers out of 1 ... n."
categories:
- Development
tags:
- LeetCode
- backtracking
status: publish
type: post
published: true

---
## [Combinations](https://oj.leetcode.com/problems/combinations/)

> Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.
>
> For example,
> If n = 4 and k = 2, a solution is:
> [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4] ]

计算整数的组合，即${n \choose k}$的所有结果。采用回溯的思路，solution为遍历出来的结果，当它的size等于k时即为一个有效结果。并同时用一个visited数组记录哪些结点被访问过，访问过继续，没有访问过则下一层递归。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<vector<int> > combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> solution;
        vector<bool> visited(n + 1, false);
        
        generateCombination(n, k, 1, visited, solution, res);
        
        return res;
    }
    
    void generateCombination(int &n, int &k, int start, vector<bool> visited, vector<int>& solution, vector<vector<int> >& res)
    {
        if (solution.size() == k)
        {
            res.push_back(solution);
            return;
        }
        for (int i = start; i <= n; ++i)
        {
            if (!visited[i])
            {
                visited[i] = true;
                solution.push_back(i);
                generateCombination(n, k, i + 1, visited, solution, res);
                solution.pop_back();
                visited[i] = false;
            }
        }
    }
};
{% endhighlight %}

---
layout: post
title: '[LeetCode] Combinations'
date: 2014-12-17 22:43:21.000000000 +01:00
summary: 计算整数的组合...
categories:
- Development
tags:
- LeetCode
- linked list
- Math
status: publish
type: post
published: true

---
## [Combinations](https://oj.leetcode.com/problems/combinations/)

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

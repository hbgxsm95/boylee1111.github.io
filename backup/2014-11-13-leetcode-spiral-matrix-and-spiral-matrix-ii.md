---
layout: post
title: '[LeetCode] Spiral Matrix & Spiral Matrix II'
date: 2014-11-13 04:26:03.000000000 +01:00
summary: "旋转矩阵，完全是找数学规律。从外到内按照top->right->bottom->left的顺序一圈一圈的遍历即可。用l, r, t, b分别表示左右上下的索引，l和r所在的列以及t和b所在的行即当前遍历的那一圈。"
categories:
- Development
tags:
- array
- LeetCode
status: publish
type: post
published: true

---

## [Spiral Matrix](https://oj.leetcode.com/problems/spiral-matrix/)

旋转矩阵，完全是找数学规律。从外到内按照top->right->bottom->left的顺序一圈一圈的遍历即可。用l, r, t, b分别表示左右上下的索引，l和r所在的列以及t和b所在的行即当前遍历的那一圈。当行数大于列数并且行数为奇数，那么最后中间一列属于特殊情况，只需要遍历一遍；同样列数大于行数并且列数为奇数是亦然。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int> > &matrix) {

        vector<int> res;
        if (matrix.size() == 0) return res;

        int rows = matrix.size(), cols = matrix[0].size();
        int l = 0, r = cols - 1, t = 0, b = rows - 1;
        while (l < r && t < b)
        {
            for (int i = l; i < r; ++i) res.push_back(matrix[t][i]);
            for (int i = t; i < b; ++i) res.push_back(matrix[i][r]);
            for (int i = r; i > l; --i) res.push_back(matrix[b][i]);
            for (int i = b; i > t; --i) res.push_back(matrix[i][l]);
            l++; r--; t++; b--;
        }
        if (l == r)
            for (int i = t; i <= b; ++i)
                res.push_back(matrix[i][r]);
        else if  (t == b)
            for (int i = l; i <= r; ++i)
                res.push_back(matrix[t][i]);

        return res;
    }
};
{% endhighlight %}

## [Spiral Matrix II](https://oj.leetcode.com/problems/spiral-matrix-ii/)

和上一个问题相比可以说简单了一些，因为行和列是相同的，所以最后的一圈特殊情况就不存在了。同样按照top->right->bottom->left的顺序遍历一遍，用一个count计数器不断赋值即可。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<vector<int> > generateMatrix(int n) {
        vector<vector<int> > res(n, vector<int>(n, 0));
        int size = (n + 1) / 2, count = 1;

        for (int i = 0; i < size; ++i)
        {
            for (int j = i; j < n - i; ++j) res[i][j] = count++;
            for (int j = i + 1; j < n - i; ++j) res[j][n - i - 1] = count++;
            for (int j = n - i - 2; j >= i; --j) res[n - i - 1][j] = count++;
            for (int j = n - i - 2; j >= i + 1; --j) res[j][i] = count++;
        }

        return res;
    }
};
{% endhighlight %}
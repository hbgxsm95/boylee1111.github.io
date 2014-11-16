---
layout: post
title: Best Time to Buy and Sell Stock && Best Time to Buy and Sell Stock II
date: 2014-10-12 17:57:16.000000000 +02:00
summary: "买卖存货问题，因为是一次性获得最大利润，所以思路比较简单。"
categories:
- Development
tags:
- LeetCode
status: publish
type: post
published: true

---

## [Best Time to Buy and Sell Stock](https://oj.leetcode.com/problems/best-time-to-buy-and-sell-stock/)

买卖存货问题，因为是一次性获得最大利润，所以思路比较简单。代码如下：

```c++
class Solution {
public:
    int maxProfit(vector<int> &prices) {
        int days = prices.size(), buy = INT_MAX, profit = 0;

        for (int i = 0; i < days; ++i)
        {
            buy = min(buy, prices[i]);
            profit = max(profit, prices[i] - buy);
        }

        return profit;
    }
};
```





## [Best Time to Buy and Sell Stock II](https://oj.leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

和上一问题唯一区别即可以进行多次买卖，并计算最大利润。实际要求的就是这个价格数组中所有的递增序列，而利润即每个递增序列头尾差之和。实现过程中用一个low变量标记每一个递增序列头的位置，代码如下：

```c++
class Solution {
public:
    int maxProfit(vector<int> &prices) {
        int low = 0, profit = 0, days = prices.size();

        for (int i = 1; i < days; ++i)
        {
            if (prices[i] <= prices[i - 1])
            {
                profit += prices[i - 1] - prices[low];
                low = i;
            }
        }

        if (days > 0) profit += prices[days - 1] - prices[low];

        return profit;
    }
};
```

之后看到[jyan](https://oj.leetcode.com/discuss/user/jyan)的代码如下：

```c++
class Solution {
public:
    int maxProfit(vector<int> &prices) {
        int profit = 0, days = prices.size();

        for (int i = 1; i < days; ++i)
            if (prices[i] > prices[i - 1])
                profit += prices[i] - prices[i - 1];

        return profit;
    }
};
```

的确实际在求解过程中不需要关注哪个序列是递增的，我们只要保证当天元素价格比前一天高就可以盈利，低就说明这个递增序列结束了。从代码角度讲，虽然违反了原题每天只能卖或买的规则，但代码只是计算结果，只要思路还是对就行。
---
layout: post
title: '[LeetCode] Two Sum'
date: 2015-01-13 13:03:11.000000000 +08:00
summary: 'Given an array of integers, find two numbers such that they add up to a specific target number.'
categories:
- Development
tags:
- LeetCode
- array
- hash table
status: publish
type: post
published: true

---
## [Two Sum](https://oj.leetcode.com/problems/two-sum/)

> Given an array of integers, find two numbers such that they add up to a specific target number.
> 
> The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
> 
> You may assume that each input would have exactly one solution.
> 
> **Input**: numbers = { 2, 7, 11, 15 }, target = 9
> 
> **Output**: index1 = 1, index2 = 2

给定一个数组和一个值，找出数组中两个数的和为给定值的索引。一看到第一反应就是暴力循环，但毋庸置疑有更优的解决方案。看了讨论才想到用map来做。

遍历一遍数组，用一个map记录已经遍历过的数，其中key为数本身，value为数的索引。对于每一个新的被遍历的数，首先计算出与目标值的差。然后查找这个差值是否是map的一个key，如果是，那么这两个数的和即为目标数。返回两数索引即可。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    vector<int> twoSum(vector<int> &numbers, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < numbers.size(); ++i) {
            int diff = target - numbers[i];
            if (map.find(diff) != map.end())
                return vector<int>{ map[diff] + 1, i + 1 };
            map[numbers[i]] = i;
        }
        
        return vector<int>();
    }
};{% endhighlight %}
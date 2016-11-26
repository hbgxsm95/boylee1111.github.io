---
layout: post
title: '[LeetCode] Container With Most Water'
date: 2014-12-19 16:04:21.000000000 +01:00
summary: 简述就是从平面坐标系一组点中找两点，使得其与x轴组成的水槽可以容纳最多的水。
categories:
- Development
tags:
- LeetCode
- array
- two point
status: publish
type: post
published: true

---
## [Container With Most Water](https://oj.leetcode.com/problems/container-with-most-water/)

简述就是从平面坐标系一组点中找两点，使得其与x轴组成的水槽可以容纳最多的水。从两个各设置一个index开始扫描，由于每次向内容器的宽度减少了，则只有最短板的高度增加才有可能使得容器容积增大。所以每次从两个板中取最短的一个向内移动，并判断是否得到更大容积的容器，得到更大容积则记录最大值，否则继续查找知道两个点重合。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int maxArea(vector<int> &height) {
        int left = 0, right = height.size() - 1, res = 0;
        while (left < right)
        {
            res = max(res, min(height[left], height[right]) * (right - left));
            height[left] > height[right] ? right-- : left++;
        }
        return res;
    }
};
{% endhighlight %}
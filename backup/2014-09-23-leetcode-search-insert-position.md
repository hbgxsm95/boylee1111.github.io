---
layout: post
title: '[LeetCode] Search Insert Position'
date: 2014-09-23 16:03:31.000000000 +02:00
summary: "不用考虑，直接二分搜索，时间复杂度O(logn)。"
categories:
- Development
tags:
- LeetCode
- array
- binary search
status: publish
type: post
published: true

---

## [Search Insert Position](https://oj.leetcode.com/problems/search-insert-position/)

不用考虑，直接二分搜索，时间复杂度O(logn)。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int searchInsert(int A[], int n, int target) {
        int low = 0, high = n - 1;

        while (low <= high)
        {
            int mid = (high + low) / 2;
            if (A[mid] == target)
                return mid;
            else if (A[mid] > target)
                high = mid - 1;
            else
                low = mid + 1;
        }
        return low;
    }
};
{% endhighlight %}
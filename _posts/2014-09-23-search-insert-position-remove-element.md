---
layout: post
title: Search Insert Position & Remove Element
date: 2014-09-23 16:03:31.000000000 +02:00
summary: "不用考虑，直接二分搜索，时间复杂度O(logn)。"
categories:
- Development
tags:
- c
- LeetCode
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





## [Remove Element](https://oj.leetcode.com/problems/remove-element/)

我看到的思路是，从头开始找，如果发现相等的，那么从数组尾部取一个值移过来。

因为结果不care数组的order，一方面减少了数组移动的麻烦，一方面使得在查找过程中数组长度一直在变小，所以循环次数相应减少。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int removeElement(int A[], int n, int elem) {
        int i = 0;
        while (i < n)
        {
            if (A[i] == elem)
                A[i--] = A[n-- - 1];
            i++;
        }
        return n;
    }
};
{% endhighlight %}

另外看到了[daxianji007](https://oj.leetcode.com/discuss/user/daxianji007)的很简洁的一段代码：

{% highlight c++ linenos %}
int removeElement(int A[], int n, int elem) {
    int begin=0;
    for(int i=0;i<n;i++) if(A[i]!=elem) A[begin++]=A[i];
    return begin;
}
{% endhighlight %}

不过这段代码在最差情况下，当第一个数就是被删除的数的话，那么之后就要不断移动元素，直到循环结束。
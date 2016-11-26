---
layout: post
title: '[LeetCode] Sort Colors'
date: 2014-10-04 02:12:26.000000000 +02:00
summary: "看到题之后，一上来就直接开两个int，分别计算红和白出现次数，然后再循环一次按出现次数赋值，直接就AC了。"
categories:
- Development
tags: 
- LeetCode
- array
- two point
- sort
status: publish
type: post
published: true

---

## [Sort Colors](https://oj.leetcode.com/problems/sort-colors/)

看到题之后，一上来就直接开两个int，分别计算红和白出现次数，然后再循环一次按出现次数赋值，直接就AC了。代码如下，if和switch这里是顺手用的：


{% highlight c++ linenos %}
class Solution {
public:
    void sortColors(int A[], int n) {
        int r = 0, w = 0;
        for (int i = 0; i < n; ++i)
        {
            switch (A[i])
            {
                case 0:
                    r++;
                    break;
                case 1:
                    w++;
                    break;
                default:
                    break;
            }
        }
        
        for (int i = 0; i < n; ++i)
        {
            if (i < r)
                A[i] = 0;
            else if (i < r + w)
                A[i] = 1;
            else 
                A[i] = 2;
        }
    }
};
{% endhighlight %}

还仔细琢磨为什么排序复杂度是$O(n)$，比学过那么多排序都快，半天才意识到这个根本不是基于比较的排序。然后就进一步了解了一下计数排序，优化了一下代码，边计数边赋值。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    void sortColors(int A[], int n) {
        int r = 0, w = 0;
        for (int i = 0; i < n; ++i)
        {
            int t = A[i];
            A[i] = 2;
            if (t == 0)
            {
                A[w++] = 1;
                A[r++] = 0;
            }
            else if (t == 1)
            {
                A[w++] = 1;
            }
        }
    }
};
{% endhighlight %}
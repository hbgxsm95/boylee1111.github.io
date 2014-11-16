---
layout: post
title: '[LeetCode] Climbing Stairs'
date: 2014-11-13 04:10:38.000000000 +01:00
summary: "Calculate the ways of climbing to the top. It's a simple and classical DP problem."
categories:
- Development
tags:
- DP
- dynamic programming
- LeetCode
status: publish
type: post
published: true

---

## [Climbing Stairs](https://oj.leetcode.com/problems/climbing-stairs/)

Calculate the ways of climbing to the top. It's a simple and classical DP problem.

Using [latex]N_i[/latex] to represent the ways of reaching level [latex]i[/latex].

For any [latex]i >= 2[/latex], there are two ways to reach to level [latex]i[/latex]:

* From the level [latex]i - 2[/latex], climbing two steps once to level [latex]i[/latex];
* From the level [latex]i - 1[/latex], climbing one step to level [latex]i[/latex];

Then the transformation equation is determined:

[latex]N_i = N_{i - 2} + N_{i - 1}[/latex]

Specially, if [latex]i = 0[/latex] or [latex]i = 1[/latex], [latex]N_i = 1[/latex].

We can using constant space by only recording the previous two results of climbing.

Here is the code:

```c++
class Solution {
public:
    int climbStairs(int n) {
        int w1 = 1, w2 = 1, w3;
        for (int i = 2; i <= n; ++i)
        {
            w3 = w2;
            w2 = w1 + w2;
            w1 = w3;
        }
        return w2;
    }
};
```
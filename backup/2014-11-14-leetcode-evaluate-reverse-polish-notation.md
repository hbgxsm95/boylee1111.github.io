---
layout: post
title: '[LeetCode] Evaluate Reverse Polish Notation'
date: 2014-11-14 02:14:30.000000000 +01:00
summary: 计算逆波兰表达式，比直接计算表达式还要简单，少了转化为逆波兰表达式的过程，也不需要handle表达式异常的情况。
categories:
- Development
tags:
- LeetCode
- Reverse Polish Notation
- RPN
- stack
status: publish
type: post
published: true

---

## [Evaluate Reverse Polish Notation](https://oj.leetcode.com/problems/evaluate-reverse-polish-notation/)

计算逆波兰表达式，比直接计算表达式还要简单，少了转化为逆波兰表达式的过程，也不需要handle表达式异常的情况。直接用栈即可，是数字就入栈，是符号就取栈顶两数字进行计算，计算结果再次入栈。代码如下：

{% highlight c++ linenos %}
class Solution {
public:
    int evalRPN(vector<string> &tokens) {
        stack<int> s;

        for (int i = 0; i < tokens.size(); ++i)
        {
            if (tokens[i].size() > 1 ||  (tokens[i][0] >= '0' && tokens[i][0] <= '9'))
            {
                s.push(toInt(tokens[i]));
            }
            else
            {
                int a = s.top();
                s.pop();
                int b = s.top();
                s.pop();
                if (tokens[i] == "+") b += a;
                else if (tokens[i] == "-") b -= a;
                else if (tokens[i] == "*") b *= a;
                else if (tokens[i] == "/") b /= a;
                s.push(b);
            }
        }
        return s.top();
    }

    int toInt(string s)
    {
        int i = 0, res = 0;
        if (s[0] == '-') i = 1;
        for (; i < s.length(); ++i)
            res = res * 10 + s[i] - '0';
        return s[0] == '-' ? -res : res;
    }
};
{% endhighlight %}
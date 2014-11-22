---
layout: post
title: Func&lt;T&gt; and Expression&lt;Func&lt;T&gt;&gt;
date: 2014-08-12 03:23:43.000000000 +02:00
summary: "When I used <code>Func&lt;T&gt;</code>&nbsp;or <code>Expression&lt;Func&lt;T&gt;&gt;</code>&nbsp;as parameter of function, I found both ..."
categories:
- Development
tags:
- c#
- .NET
status: publish
type: post
published: true

---

When I used `Func<T>` or `Expression<Func<T>>` as parameter of function, I found both are support [lambda expression](http://msdn.microsoft.com/en-us/library/bb397687.aspx), and most are literally the same. This made me think the difference between `Func<T>` and `Expression<Func<T>>`.



## Func&lt;T&gt;

[Here](http://msdn.microsoft.com/en-us/library/bb534960.aspx) is MSDN official document. According to the definition, Func<T> is actually a simplified version of delegate.

{% highlight c# linenos %}
public delegate TResult Func<out TResult>()
{% endhighlight %}

`Func<TResult>`  assists developer to create delegate without explicit delegate declaration. The template T is the type of return value. In this way, the function can be assign to `Func<TResult>`  property and invoke directly. MS provides 17 delegate function, corresponding the count of parameters, the last template TResult is always type of return value.

Similarly, MS also provides `Action<T>` as simplified version of delegate, the only difference is `Action<T>` doesn't support return value.



## Expression&lt;Func&lt;T&gt;&gt;

[Here](http://msdn.microsoft.com/en-us/library/bb335710.aspx) is MSDN official document. It accepts a delegate as template, generally is Func or Action. As MS describe, `Expression<TDelegate>` is a data structure in form of an expression tree, to represent a lambda expression.

Conceptually, it is just a data structure with all the information of lambda expression, not a real anonymous function, cannot be execute immediately. In other words, Func or Action will generate IL while compiling, but Expression just generates a structure.

There are two approaches to form a expression tree, one is through expression syntax itself, another is using API. Two ways below are the same.

{% highlight c# linenos %}
Expression<Func<int>> expr;
expr = () => 10; // lambda expression syntax
expr = Expression.Lambda<Func<int>>(Expression.Constant(10)); // API
{% endhighlight %}

And `Expression<TDelegate>` provides the `Compile()`  method. Through this, lambda expression can be compile at the runtime, the type of return value is the delegate after compiling. Then this function can be invoked manually.

By the way, expression tree is also an interesting thing, and worth discussion.



## Summary

`Func<TResult>` and `Action<T>` is the another way to implement delegate, namely, like a function pointer. `Expression<TDelegate>` is a very interesting topic with many knowledge inside. Both bring many benefits for programming.

* One advantage of `Expression<TDelegate>` is that it contains many information of lambda expression. Through this, we can get some name as string format of property without "magical string". [Here](http://blog.boylee.me/dev/wpf-interface-inotifypropertychanged/) is an example. Nevertheless, this way will cost some performance of application.

* The most benefit thing of `Expression<TDelegate>` is applied in Entity Framework. **IEnumerable works with Func and IQueryable works with Expression**. What stores in IEnumerable is already localized, namely, store in memory. But IQueryable not, IQueryable take the feature of lambda expression, execute the code while localizing. So it will optimizes the lambda expression before compilation and execution. In this way, the database could get the efficient SQL operations.
---
layout: post
title: 'Lazy Converter from <code>NS_ENUM</code> to <code>NSString</code>'
date: 2015-03-02 11:44:30.000000000 +08:00
summary: '现给定<code>NS_ENUM</code>如下，打算转换成<code>NSString</code>，最简单的方式即switch或if-else语句，其中switch效率高一些。'
categories:
- Development
tags:
- iOS
- objective-c
status: draft
type: post
published: true

---

现给定`NS_ENUM`如下，打算转换成`NSString`，最简单的方式即switch或if-else语句，其中switch效率高一些。

{% highlight objective-c linenos %}
typedef NS_ENUM(NSInteger, HumanGenders) {
    Male,
    Femal,
    Agender,
    Bigender,
    Genderqueer
};
{% endhighlight %}

这类问题的处理可以采用一种延迟加载的方法进行转换，代码如下：

{% highlight objective-c linenos %}
const NSArray *___HumanGenders;

#define cHumanGendersGet (___HumanGenders == nil ? ___HumanGenders =\
@[\
@"男性",\
@"女性",\
@"无性别",\
@"双性别",\
@"性别酷儿"\
] : ___HumanGenders)

#define cHumanGendersTitleLabel(gender) ([cHumanGendersGet objectAtIndex:gender])
#define cHumanGendersTitleEnum(gender) ([cHumanGendersGet indexOfObject:gender])
{% endhighlight %}

这样的加载方式的好处：

1. 当数组较大时，可以将加载过程延后到第一次使用，可以在这之间加快启动速度，减少内存占用；
2. 当这个转换过程在运行时不确定是否需要时，通过延迟加载，可以有效的减少不必要的开销。

同时存在的问题即由于一次加载整个数组，当转换过程的使用率较低时，相比在使用某个`NS_ENUM`值，再给对应的`NSString`分配空间的方式来说，即耗费的内存又占用了时间。


--------

**Update:**

Swift为`enum`类型提供了Raw Value，可以很好的解决`enum`和`string`互相转换的问题。具体内容之后更新......

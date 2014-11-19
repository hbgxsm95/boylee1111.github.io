---
layout: post
title: WPF Interface —— INotifyPropertyChanged
date: 2014-06-14 18:27:13.000000000 +02:00
summary: "The most valuable and fancy thing WPF is <strong>Data Binding</strong>. There are two ways to create a binding object, implement <strong>INotifyPropertyChanged</strong> or create <strong>DependencyProperties</strong>."
categories:
- Development
tags:
- c#
- mvvm
- wpf
- xaml
- .net
status: publish
type: post
published: true

---

The most valuable and fancy thing WPF is **Data Binding**. There are two ways to create a binding object, implement **INotifyPropertyChanged** or create **DependencyProperties**. [Dependency Property Overview](http://msdn.microsoft.com/en-us/library/ms752914.aspx)



### What is INotifyPropertyChanged

> The INotifyPropertyChanged interface is used to notify clients, typically binding clients, that a property value has changed. 
>
> -- MSDN

`INotifyPropertyChanged` interface contains an event `PropertyChanged` that will be triggered when property changed. Specifically, implement this interface means that if the value of a property is changed, other objects that bind this property will be updated automatically and synchronously, and the UI part as well. Generally, the majority of objects that do some data bindings need to implement this interface. And the objects implement this interface play a role as ViewModel in [The MVVM Pattern](http://msdn.microsoft.com/en-us/library/hh848246.aspx).



### How to use INotifyPropertyChanged

#### Common Approach

This part is based on The MVVM Pattern. Most time I prefer implement a base ViewModel to implement  INotifyPropertyChanged interface, then other ViewModels inherit this base ViewModel will implement this interface as well:

{% highlight c# linenos %}
public class ViewModelBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        virtual internal protected void OnPropertyChanged(string propertyName)
        {
            if (null != this.PropertyChanged)
            {
                this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    }
{% endhighlight %}

For the properties that need to notify the object that binding them:

{% highlight c# linenos %}
public class ViewModel : ViewModelBase
    {
        private int _myField;
        public int MyProperty
        {
            get { return _myField; }
            set
            {
                _myField = value;
                OnPropertyChanged("MyProperty");
            }
        }
    }
{% endhighlight %}

This the most common approach. And the drawback is obvious, The name of property is the parameter of method OnPropertyChanged, then we hatch out the 'magic string'.



#### Lambda Expression Approach

If we use Lambda Expression to implement it, we need to add a method in ViewModelBase:

{% highlight c# linenos %}
virtual internal protected void SetProperty<T>(ref T propField, T value, Expression<Func<T>> expr)
{
    var bodyExpr = expr.Body as System.Linq.Expressions.MemberExpression;
    if (null == bodyExpr)
    {
        throw new ArgumentException("Expression must be a MemberExpression!", "expr");
    }
    var propInfo = bodyExpr.Member as PropertyInfo;
    if (null == propInfo)
    {
        throw new ArgumentException("Expression must be a PropertyExpression!", "expr");
    }
    var propName = propInfo.Name;
    propField = value;
    this.OnPropertyChanged(propName);
}
{% endhighlight %}

Then the setter of property can be modified like this:

{% highlight c# linenos %}
private int _myField;

public int MyProperty
{
    get { return _myField; }
    set { base.SetProperty(ref _myField, value, () => this.MyProperty); }
}
{% endhighlight %}

Obviously, the most benefit is the magic string that same as the property name is eliminated. But is will bring some other problems. This approach adopts the reflection mechanism in .Net Framwork, which is a luxury consume for system performance. There are some testing In this article([MVVM – Lambda vs INotifyPropertyChanged vs DependencyObject](http://blog.quantumbitdesigns.com/2010/01/26/mvvm-lambda-vs-inotifypropertychanged-vs-dependencyobject/)). According to the result, The timing consuming of lambda expr. is 3 times than common approach, and the memory consuming is nearly 8 times.



### Summary

It's obvious that using ViewModel to implement INotifyPropertyChanged demands more codes. Actually, every .xaml file contains a .cs as code behind. We could use Dependency Property in the code behind of .xaml and binding data to the view. It seems to be a easier and more acceptable way. So why using INotifyPropertyChanged?

* If we binding data in the code behind, we can avoid to do some logic thing in this part. Neverthless, the .cs behind the .xaml of some view with complex functionalities will be larger and larger. For the function extend and maintenance will be difficult. So INotifyPropertyChanged interface is clearer to the relation of View and Model.

* I have to say the code behind is a terrible design at most situation. Compared with ViewModel, the code behind will mix the user behaviors and business logic in one part. The worst result is that the unit testing will be difficult in this condition.(If using ViewModel, we can using function call to simulate the user behavior, but in the code behind, we have to create a view to when testing the business logic part).

* About the second point, I don't mean cast away the code behind thoroughly. Actually, I think it is acceptable if the code behind just do some thing related view.
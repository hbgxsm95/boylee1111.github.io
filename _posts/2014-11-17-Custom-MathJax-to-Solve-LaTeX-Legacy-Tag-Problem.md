---
layout: post
title: 'Custom MathJax to Solve LaTeX Legacy Tag Problem'
date: 2014-11-17 20:38:18.000000000 +01:00
summary: "After I migrated my blog from WordPress to Github Page, I chooose MathJax as rendering engine."
categories:
- Development
tags:
- WordPress
- GitHub Page
- jekyll
- MathJax
status: publish
type: post
published: true

---

After I migrated my blog from WordPress to Github Page, I chooose [MathJax](http://www.mathjax.org) as rendering engine.

Engine itself works fine. But I meet a tiresome problem. My WordPress use tag **[latex]** and **[/latex]** to indicate the formula. Unfortunately, MathJax cannot render these legacies staff directly.

Then a lot of codes like this appeared in my posts: `[latex]C_2 = C_0 \times C_1 + C_1 \times C_0[/latex]`

<br/>

Of course, a simple script with Regex can solve this problem easily. But MathJax provides many options to custom engine itself. So I choose to define **[latex]** and **[/latex]** as my custom tags. I add code below to the place that is in the front of loading the engine.

{% highlight html %}
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: { inlineMath: [['$','$'], ['[latex]','[/latex]']] }
    });
</script>
<!-- Loading MathJax Engine -->
{% endhighlight %}

Not only solved legacy tag problem, but extended tag "**$**". Now I can work with using original LaTeX inline formula tag "**$**". Now, everything looks so pretty: [latex]C_2 = C_0 \times C_1 + C_1 \times C_0[/latex].

<br/>

[Here](http://docs.mathjax.org/en/latest/options/hub.html) is more configuration options of MathJax.

In addition, I disabled the contexual menu, which was lauched by right click. Also, showing loading and rendering message to visitor looks not cool.
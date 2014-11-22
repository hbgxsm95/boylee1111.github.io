---
layout: post
title: 'Tips For Sorting Tags In GitHub Page With Jekyll'
date: 2014-11-20 21:18:18.000000000 +01:00
summary: "While adding <strong>Tags</strong> pages, I was stuck owing to the order of tags."
categories:
- Development
tags:
- jekyll
- Liquid
- GitHub Page
status: publish
type: post
published: true

---

While adding **Tags** pages with jekyll, I was stuck owing to display order of tags. Here are two different approaching of how to sort tags:

- For **Tags** page, I'd like order all tags via count. Therefore I can easily see which tag is popular. And visitor will clearly know what skills I master.
- For every single **Post**, I want to order its tags alphabetically. If two posts have the same tags but difference order, it looks weird.

I was stuck because liquid filter doesn't provide function that sort all elements with a custom comparison. But liquid has other convenient filters. The problems could be solved with different idea.

Here are the solutions for these two requirements:

- Three steps for sorting tags by count is mandatory:
    1. Create an variable to store the appearance times of the most popular tag. The variable is called **max_tag_count**;
    2. The first loop is from **max_tag_count** to **1**, which is used to list all the possible count number. The value is called **i**;
    3. The second loop traveses all tags of site. For every tag, if the count is equal to **i**, which is value of first loop, then this tag is chose.
    
    Inside the loop we can manipulate the tag chosen. Here is the liquid code:

{% highlight liquid linenos %}
{% raw %}
{% assign max_tag_count = 0 %}
{% for tag in site.tags %}
  {% if tag[1].size > tags_max %}
    {% assign max_tag_count = tag[1].size %}
  {% endif %}
{% endfor %}
{% for i in (1..max_tag_count) reversed %}
  {% for tag in site.tags %}
    {% if tag[1].size == i %}
      <!-- Manipulation Code -->
    {% endif %}
  {% endfor %}
{% endfor %}
{% endraw %}
{% endhighlight %}
    
- Sort tags alphabetically there is a common solution. First connect all the tag with separator ' '(space), which cannot be avoided or changed while connecting. Then split it as array with ' '(space) and sort the array. It's very simple, but there are two reasons why I don't apply it to my site:
    1. The comparison for sorting string is the ASCII of first character. In this way, the tag starts with uppercase is always show first, like the 'WordPress' is before 'c++', which I'm not content with.
    2. If tag contain any ' '(space), the original tag will be changed while splitting. For example, I use _GitHub Page_ as a tag. It will be separated as two tags, which is _GitHub_ and _Page_. This is unacceptable.
    
    Using lowercase version of tag can solve these problems easily. But sometimes it changes some original noun. There are always people prefer _GitHub_ or _OS X_ rather than _github_ or _os x_.
    
    I use this approach to solve these problem:
    1. First step is the same as the common idea that create the string separated by ' '(space). But before concatenating the tag, I use lowercase and replace all ' '(space) in tag with other character that never used in my tags. I choose '\*' as the substitute.
    2. Then splitting the string with character ' '(space), the array is called **sorted_post_tags**. There is no loss for tag information, only tiny change, like _GitHub Page_ now is stored as _github*page_.
    3. First loop traverse **sorted_post_tags** array, the value is called **sorted_tag**.
    4. Inner loop traverses all the original post tags. For every element, which is called **tag**, first transfering it as lowercase and replace ' '(space) with '*', which is called **downcase_tag**. If **downcase_tag** is equal to the **sorted_tag**, then **tag** will be chose.
    
    Inside the loop we can manipulate the tag chosen. Here is the liquid code:

{% highlight liquid linenos %}
{% raw %}
{% capture tags %}
  {% for tag in page.tags %}
    {{ tag | downcase | replace:' ','*' }}
  {% endfor %}
{% endcapture %}
{% assign sorted_post_tags = tags | split:' ' | sort %}
{% for sorted_tag in sorted_post_tags %}
  {% for tag in page.tags %}
    {% assign downcase_tag = tag | downcase | replace:' ','*' %}
    {% if downcase_tag == sorted_tag %}
      <!-- Manipulation Code -->
    {% endif %}
  {% endfor %}
{% endfor %}
{% endraw %}
{% endhighlight %}
<br>
Though the number of syntax and filters of liquid is limited under GitHub Page with jekyll, it can implement plenty of fantastic staff. And [here](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) is official document of liquid for designers.
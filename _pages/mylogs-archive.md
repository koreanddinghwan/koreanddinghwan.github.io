---
title: Mylogs
layout: collection
permalink: /mylogs/
collection: mylogs
entries_layout: grid
classes: wide
---

Sample document listing for the collection `_portfolio`.

{% assign posts = site.mylogs %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
---
title:  "[jekyll & github] jekyll post에 대해"
excerpt: "jekyll post"

categories:
  - blog
tags:
  - [blog, jekyll, github, git, liquid]

toc: true
toc_sticky: true

date: 2021-10-04
last_modified_at: 2021-10-04

---


# 페이지에 포스트 목록을 생성하는 방법

## 지킬이 페이지에서 포스트 목록을 생성하는 방법

[지킬의 포스트목록 표시 방법 소개](https://jekyllrb-ko.github.io/docs/posts/_)

```ruby
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
```

여기선 이런 코드를 소개하고있는데 어떤 역할을 하는지 내 블로그를 토대로 공부해보자.

<br/>
<br/>

## _pages

_pages의 내 카테고리들 하단에는 

```ruby
{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
```

이 코드들이 들어 있다.  
blog 카테고리에 해당하는 post들을 모아 posts에 할당하고,  각 post에 대해서 archive-single2를 적용한다.  
archive-single2는 [식빵맘님 블로그](https://ansohxxn.github.io/blog/jekyll-directory-structure/)에서 복붙했다. 참고  
<br/><br/>

## archive-single2

```ruby
<div class="{{ include.type | default: "list" }}__item">
    <article class="archive-item">
        <div>
            <span>
              <a href="{{ post.url | relative_url }}">{{post.title}}</a>
            </span>
            <small> 
              <i class="fas fa-fw fa-calendar-alt" aria-hidden="true"> </i>{{ post.date | date: " %Y.%m.%d" }}
              {% if site.category_archive.type and post.categories[0] and site.tag_archive.type and post.tags[0] %}
                {%- include post__taxonomy.html -%}
              {% endif %}
            </small>
        </div>
      </article>
</div>
```

 
```
<a href="{{ post.url | relative_url }}">{{post.title}}</a>
```
각 포스트의 제목에 post.url(파일경로)와 relative_url인 블로그 이름을 붙여 링크를 생성한다.  
<br/>

예를들어 baseurl이 lightbig이고
post의 파일 경로가 blog/blog-references.md라면
<br/>
"lightbig/blog/blog-references"가 경로로 붙게된다.<br/><br/>

<br/>
여기서 relative_url은 baseurl을 의미하는데, config.yml에서 수정이 가능하다. 깃허브페이지로 호스팅할때는 해당 블로그의 repo이름으로 해야한다.  

반대로 absolute_url은 url과 baseurl을 모두 이어붙이는 방식이다.  
해당 링크로 가는 전체 url이 링크로 붙게 된다.




<br/><br/>

# 각 카테고리에 대해 포스트를 나열하는 방법

## 공식문서에서의 코드

지킬 공식문서에서는 각 카테고리에 대해 포스트를 나열하는 방법에 대해 이렇게 표현한다.

```ruby
{% for category in site.categories %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
```

## category-archive
_pages에 category-archive라는 페이지를 만들었는데, 이 페이지는 모든 카테고리들을 모아서 아카이브형태로 보여주는 카테고리라고 할 수 있겠다.  

```md
    ---
    title: "Category"
    layout: categories
    permalink: /categories/
    author_profile: true
    sidebar_main: true
    ---
```

<br/>
홈페이지에서 category를 클릭하면 각 카테고리별로 글을 나열한 페이지가 나온다. 이에 대한 코드는

```ruby'
  {% for i in (1..categories_max) reversed %}
    {% for category in site.categories %}
      {% if category[1].size == i %}
        <section id="{{ category[0] | slugify | downcase }}" class="taxonomy__section">
          <h2 class="archive__subtitle">{{ category[0] }}</h2>
          <div class="entries-{{ page.entries_layout | default: 'list' }}">
            {% for post in category.last %}
              <article class="archive-item">
                <div>
                    <span>
                      <a href="{{ post.url | absolute_url }}">{{post.title}}</a>&nbsp
                    </span>
                    <small> 
                      <i class="fas fa-fw fa-calendar-alt" aria-hidden="true"> </i>{{ post.date | date: " %Y.%m.%d" }}
                      {% if site.category_archive.type and post.categories[0] and site.tag_archive.type and post.tags[0] %}
                        {%- include post__taxonomy.html -%}
                      {% endif %}
                    </small>
                </div>
              </article>
            {% endfor %}
          </div>
          <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
        </section>
      {% endif %}
    {% endfor %}
  {% endfor %}'
```

이렇게 저장되어있다.


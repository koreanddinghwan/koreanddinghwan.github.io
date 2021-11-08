---
title:  "[jekyll & github] Collection의 grid로 Mylog 탭 만들기"
excerpt: "mmistakes collection"

categories:
  - blog
tags:
  - [blog, jekyll, github, git, liquid]

toc: true
toc_sticky: true

date: 2021-11-08
last_modified_at: 2021-11-08
---
참고[Minimal Mistakes 공식 사이트](https://mmistakes.github.io/minimal-mistakes/)

네비게이션 바에 about을 지우고, 그 자리에 내 개인적인 일상글들을 올리는 공간을 만들고싶다.

<img src="https://user-images.githubusercontent.com/76278794/140687771-d07897db-8431-440b-9422-0c9eacdde668.png">  

네비게이션 바 

<br>

<img src = "https://user-images.githubusercontent.com/76278794/140687957-3df3af65-c061-4b5d-88a1-6d512c10ddf0.png">
My Logs를 누르면 화면에 보여질 블로그 글 -출처(Minimal Mistakes의 sample collections)


# 공식문서

공식문서에서 collection layout을 사용해 grid 형식의 템플릿을 사용하는 방법에 대해 잘 나와있다.  
[Working with Collections-mmistakes](https://mmistakes.github.io/minimal-mistakes/docs/collections/)

<br><br>

## 1._config.yml 수정

```yml
collections:
  mylogs:
    output: true
    permalink: /:collection/:path/
```
collections를 선언해주면 index.html이 블로그 폴더에서 mylogs라는 폴더에서 파일들을 불러올 수 있다.

```yml
defaults:
  - scope:
      path: ""
      type: mylogs
    values:
      layout: single
      read_time: false
      author_profile: false
      share: false
      comments: false
```
mylogs의 게시물들에 대해서 디폴틀값을 설정한다.  
깔끔하게 내 일상글들만 보이게 하고 싶어서 프로필, read_time 등을 false를 주었다. 

<br><br>

# pages에 mylogs 추가

```md
---
title: My logs
layout: collection
permalink: /mylogs/
collection: mylogs
entries_layout: grid
classes: wide
header:
    image: assets/images/mylogs.jpeg
---

지극히 개인적인 글들을 보관하는 장소입니다.  
별 내용은 없습니다.
```
mylogs 폴더 안의 파일들을 모아 한 번에 표시할때 어떻게 보여질 것인가를 정의하는 파일

layout: collection으로 mylogs 폴더의 파일들을 모아서 한번에 collection layout으로 보이게 설정.  
permalink는 네비게이션바의 링크와 동일하게  
collection: mylogs로 mylogs 폴더를 불러온다.  
entries_layout: grid는 collumn&row 형태로 게시물 표현
classes: wide로 순수히 내 글만 보이게끔 설정한다.

<br><br>

# 네비게이션바 수정

```yml
main:
  - title: "My Logs"
    url: /mylogs/
  - title: "Category"
    url: /categories/
```
네비게이션 바는 _data/navigation.yml에서 수정 가능하다.  
url은 내 블로그의 주소에 덧붙여질 주소를 추가하면된다.
<br>
<br>







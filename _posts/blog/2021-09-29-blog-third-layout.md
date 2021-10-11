---
title:  "[jekyll & github] layout에 대한 개념"
excerpt: "layout이 뭔데?"

categories:
  - blog
tags:
  - [blog, jekyll, github, git]

toc: true
toc_sticky: true

date: 2021-09-29
last_modified_at: 2021-10-01

---

# layout

테마에 포함된 모든 레이아웃, 모양, 컨텐츠 유형을 찾을 수 있다.
<hr/>

## default layout

다른 모든 레이아웃에서 상속된다. 이 레이아웃에는   
    
    - <head> elements  
    - masthead navigation links  
    -  content  
    - page footer  
    - scripts  
    
이 작성된다. 

지킬의 블로그 페이지는 어떻게 구성되어있을까?

index.html의 layout은 home.html이고, home.html의 레이아웃은 archive이다. archive.html의 레이아웃은 default이다.
<br/>
우리는 가장 안쪽인 default를 먼저 보자.

<hr>

## default.html

여기의 헤드태그를 보게되면 include head.html과 head/custom.html이 있는데, _include 폴더 안의 head.html과 includes폴더 안 head폴더 내 custom.html을 불러오겠다는 의미이다.  
<br/>
또 이어서 head.html의 안에는 seo.html파일을 불러오겠다고 되어있는데, 이를 보면 처음보는 방식으로 쓰여진 if문과 이에 변수를 할당하는 문장들, 그리고 뒤에 title을 시작으로 웹페이지를 구성하는 목록이 시작된다. 
<br/><br/>
seo.html이 끝나고 다시 head.html의 나머지 코드가 실행된다. 
밑에 보면 css파일을 불러오는 명령어도 있다. head.html 코드 불러온 후, custom.html을 불러온 다음에 default.html이 다시 이어진다.
<br/><br/>
이제부터 body class가 layout—로 선언되는데, 

    layout--{{ page.layout | default: layout.layout }}{% if page.classes or layout.classes %}{{ page.classes | default: layout.classes | join: ' ' | prepend: ' ' }}{% endif %}">

이 명령어로 layout—home wide가 불러와진다. 
home.html에 class가 wide로 선언되어 있는걸 보면 이 코드가 실행된 결과가 home wide인 것 같은데 이건 문법공부를 해야 알 것 같다.
<br/><br/>
이 밑에 skip-links.html, browser-upgrade.html, masthead.html이 불러와진다.
<br/><br/>
재미있는점은 이 코드들은 다른 include와는 다르게 include-cached로 불러와진다는 점인데, 아마 웹페이지에 처음 접속하면 지금 페이지를 무조건 1번은 거쳐야하기에 지속적으로 사용되는 html파일을 cach형태로 불러오는게 아닌가 싶다. <br/><br/><br/>

skip-links.html에는 
```html

<nav class="skip-links">
<ul>
<li><a href="#site-nav" class="screen-reader-shortcut"></a></li>
<li><a href="#main" class="screen-reader-shortcut"</a></li>
<li><a href="#footer" class="screen-reader-shortcut"></a></li>
</ul>
</nav>
    
```
가 리스트 형태로 작성되어 있는 것을 볼 수 있다. 개발자도구에서 눌러보면 딱히 누를 수 있는 버튼
<br/>
browser-upgrade.html에는 ie 9에서 쓰이는 코드가 있나보다. 다들 크롬쓰니까 패스.  
<br/>
masthead.html이 불러와지는데, 이 문서를 보면 사이트 상단의 모양이 masthead로 클래스 선언되어 있는 것을 볼 수 있다.
<br/>
 logo와 title에 홈으로 들어가지는 링크가 걸려있고, search_toggle처럼 검색창, greedy-nav가 있는 것을 볼 수 있다.  
visible-links 클래스를 보면 site.data.navigation.main을 하나씩 for문으로 불러오는 것 같은데,  
blog이름.data파일.navigation파일.main.yml에서 link 를 하나씩 불러온다.
<br/>
<br/>
<br/>
link는 -로 구분되어 
<br/>
   title: "a"<br/>
   url: "b"  

<br/>
이 저장되어있는데, {{link.url | relative_url}}은 상대경로인 "/blog이름"에 "/b"를 붙이겠다는 의미이다.<br/>
이렇게 navigation이 구성된다. 
<br/><br/>

<hr>

## Content

content는 기본적으로 지킬의 전역변수로서 레이아웃 파일 내, 포스트 또는 페이지로 감싸진 렌더링된 컨텐츠.<br/>
포스트나 페이지 파일에는 정의되어 있지 않다.
<br/>

처음에 설명했다시피 우리는 지금 index.html이 아닌 default.html을 먼저 보고 있다. 
블로그에 접속하면 맨 처음으로 불러와지는 페이지는
<br/>
index.html->home.html->archive.html->default.html
<br/>이다.

default.html 의 content 부분에는 이 레이아웃을 불러온 레이아웃의 컨텐츠가 들어가게된다. 
<br/>

현재 archive.html안에있는 내용들을 모두 default레이아웃의 content안에 포장해서 넣는다는 의미이다. 
<br/>
이 과정을 반복하면 우리는 현재 우리가 보고있는 화면의 소스를 만들 수 있다. 
<br/>
<br/>

<hr>

## 레이아웃을 기초로 사용자가 정의한 클래스들

페이지에서 '검사'를 눌러보면 boby 태그 클래스에 <br/>
layout--name 이런 식으로 선언되어 있는 것을 볼 수 있다. <br/>
현재 페이지가 어떤 레이아웃을 기반으로 불러와졌는지 알 수 있다. <br/>
```
    --
    layout:splash<br/>
    classes:<br/>
        -landing<br/>
    -dark-theme 
```        
이런 식으로 선언하면

```
<body class="layout--splash alnding dark-them">
```

으로 출력되는 것을 볼 수 있다.
<br/><br/>

<hr>

## Canonical url
<br/>
표준 url, pages 에서 선언이 가능하다.

```
canonical_url: "link"
```

으로 head태그에 링크 생성이 가능하다.
<br/><br/>

<hr>

## Compressed url
<br/>
html을 순수 liquid언어로 압축하는 지킬 레이아웃이다. <br/>
잘 사용하지 않는다.
<br/><br/>

<hr>

## Single layout
<br/>
가장 많이 사용하게될 레이아웃이다.<br/>
config.yml에서 우리는 post들의 디폴트값을
<br/> layout:single로 두었기 때문에 <br/>
모든 게시물들은 single layout을 기본으로 한다.  
<br/><br/>

<hr>

## Wide page
<br/>
메인 컨텐츠를 오른쪽으로 확장하여 일반적으로 목차가 차지하는 공간을 채운다. <br/>게시물 또는 페이지의 yaml front matter에 선언한다.
<br/>
<br/>

<hr>

## 목차
<br/>
각 게시물과 페이지에 자동 생성 목차 목록을 만든다.<br/>
yaml front matter에 선언한다.<br/>
규칙적인 목차가 쓰여야 규칙적인 목차가 생성된다.<br/>
<br/>

<hr>

## Archive layout
<br/>
카테고리 버튼을 누르면 보이는 페이지가 아카이브 레이아웃이다.<br/>
Minimal mitakes 공식 깃허브에서 샘플 페이지를 만들어 제공하고 있다.<br/>

[링크](https://mmistakes.github.io/minimal-mistakes/docs/layouts/)
<br/>
<br/>

<hr>
 
## 그리드 보기
<br/>
포트폴리오 보여줄때 사용하는 그리드이다.<br/>
archive-single 레이아웃에 type=grid를 추가해서 만들면<br/>
게시물을 4열 그리드에 만들어 줄 것이다. <br/>
pages에서 yaml front matter를 <br/>

    layout: collection
    entries_layout:grid

로 설정한다.
<br/>
헤더 이미지도 추가 가능하다.

<br/><br/>
<hr>

## Taxonomy archives

<br/>
페이지 상단에 네비게이션 바를 누르게 되면, 우리는 해당하는 링크로 이동하게된다.<br/>
그 링크는 _pages 에서 해당하는 페이지 파일을 불러오게되는데, <br/>
페이지 파일에 레이아웃이 선언되어있어 그 레이아웃을 가져오게된다.<br/>
그렇게 한 페이지가 만들어지는 것이다.<br/>
그래서 상단 네비게이션바를 누를때 적절한 페이지가 호출되기 위해서는<br/>
_pages파일 안에 적절한 파일이 존재해야한다.<br/>
<br/>

### layout:posts
연도별로 분류된 모든 포스트를 보여주는 레이아웃이다. 
<br/>
layout:archive를 가진다.
<br/><br/>

### layout:categories
카테고리별로 분류된 모든 게시물을 보여주는 레이아웃이다.
<br/>
layout:archuve를 가진다.
<br/><br/>

### layout:tags
태그별로 그룹된 게시물을 보여준다. 
<br/>
layout:archuve를 가진다.
<br/><br/>

### layout:collection
이 레이아웃은 특정 콜렉션으로 묶인 문서들만을 보여준다.
<br/>

layout:archive를 가진다.
<br/>

        collection: # collection name
        entries_layout: # list (default), grid
        show_excerpts: # true (default), false
        sort_by: # date (default), title or any metadata key added to the collection's documents
        sort_order: # forward (default), reverse
archive에 이 값들이 선언된 것과 동일하다.
<br/><br/>

그리고 pages에 recipes.md를 만들어 모든 문서를 보여주는 페이지를 만든다.
<br/>

        title: Recipes
        layout: collection
        permalink: /recipes/
        collection: recipes
이제 다양한 방식으로 정렬이 가능하다. <br/>

    sort_by: ~

<br/><br/>

### layout:category

특정 카테고리별로 그룹화된 모든 게시물을표현한다. 
<br/>
layout:archive에
taxonomy와 entries_layout을 선언해준것과 같다.<br/>
카테고리를 하나 선택해 그 카테고리 내의 내용들만 모두 보여주는 레이아웃이다. <br/>
<br/>


### layout:tag

특정태그로 그룹화된 모든 게시물을 표시한다.<br/>
해당태그 내의 게시물들만 보여준다.<br/>
<br/>

### layout:home
간단한 홈 페이지로 사용가능한 archive 파생 레이아웃이다.<br/>
_config.yml에서 paginate설정을 기반으로 페이지 매김목록을 표시한다.<br/>

<br/>
<br/>
<hr>

## Header teaser image
<br/>
헤더에 이미지를 넣을 수 있다.<br/>
기본적으로 이미지는 /assets/images/filename.jpg의 형식으로 저장된다. <br/>
이는  _config.yml에서 author의 이미지 참조에도 적용된다 
<br/>
포스트에 yaml frontmatter를 추가하면 된다.

    header:
    image: /assets/images/image-filename.jpg

헤더 이미지의 경우 블로그 포스팅 시에는 자주 사용하지 않을 것 같다. <br/>
나중에 필요하면 공식문서 참조할 것.
<br/><br/>
<hr>

## 사이드바에 표시할 것들

페이지의 기본 컨텐츠의 왼쪽공간은 원래 비어있지만<br/>
작성자 프로필, 사용자 지정 콘텐츠 등을 표시할 수 잇다.
<br/>
<br/>

### 작성자 프로필
config.yml에 디폴트 설정에서 author_profile: true를 해주던가<br/>
패이지 yaml서문에서 각각 설정해주는 방법이 있다.<br/>


### 커스텀 사이드바 컨텐츠
[식빵맘님 깃허브](https://ansohxxn.github.io/blog/category/#-%EC%84%9C%EB%A1%A0)를 참고하는 것을 추천한다.<br/>

처음에 막무가내로 복붙만 할때는 어떻게 작동하는지 전혀 이해할 수 없었다.<br/>
하지만 공식문서도 보고, 웹 페이지가 어떻게 구성되고있는지 한줄한줄 따져가며 공부하다보니 조금은 이해가 되는 것 같다. <br/>개발자도구 최고
<br/><br/>

<br/>

<br/>


암튼 우리는 글을 쓸때마다 카테고리와 태그를 달아서 글을 쓴다.<br/>
우리는 같은 카테고리를 가진 게시물만을 모아두는 페이지를 만드는데, 이를 _categories폴더 안에 md파일로 만든다.<br/>
이 md파일은 해당 카테고리페이지가 어떻게 구성되는지 정보를 담고 있다.<br/>
보통 레이아웃은 archive로 한다.
<br/> 링크는 categories/blog로한다. 이렇게 설정하면 우리가 사이드바에서 어떤 카테고리 버튼을 누른다면 이 페이지로 접속될 것이다.<br/>
각 카테고리별로 나는 식빵맘님의 single2를 각 페이지의 하단에 작성했다.<br/>

```liquid
% assign posts = site.categories.Cpp %
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
```

카테고리 안의 각 포스트들에 대해서 archive-single2를 적용한다는 의미이다.<br/>

이렇게 되면 archive-single2에서 링크가  post.url에 relative_url을 더하게 된다.
<br/>

post.url은 각 포스트의 url값에 더해 /lightbig/이라는 상대경로를 붙여서 링크를 만들 수 있다. 
<br/>

이렇게 만든 페이지들을 모아서 사이드바에 띄운다.
<br/>























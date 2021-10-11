---
title:  "[jekyll & github] 공식문서 공부"
excerpt: "mmistakes의 공식문서 공부"

categories:
  - blog
tags:
  - [blog, jekyll, github, git]

toc: true
toc_sticky: true

date: 2021-09-29
last_modified_at: 2021-10-01

---



# 구조

```
inimal-mistakes
├── _data                      # 테마 커스터마이징 위한 데이터파일들
|  ├── navigation.yml          # 메인 네비게이션 링크(우측상단)
|  └── ui-text.yml             # 테마의 UI에서 쓰이는 문자
├── _includes
|  |                             스닙펫(재사용가능코드의미)
|  ├── analytics-providers     # snippets for analytics (Google and custom)
|  ├── comments-providers      # snippets for comments
|  ├── footer
|  |  └── custom.html          # custom snippets to add to site footer
|  ├── head
|  |  └── custom.html          # custom snippets to add to site head
|  ├── feature_row             # feature row helper
|  ├── gallery                 # image gallery helper
|  ├── group-by-array          # group by array helper for archives
|  ├── nav_list                # navigation list helper
|  ├── toc                     # table of contents helper
|  └── ...
├── _layouts
|  ├── archive-taxonomy.html   # tag/category archive for Jekyll Archives plugin
|  ├── archive.html            # archive base
|  ├── categories.html         # archive listing posts grouped by category
|  ├── category.html           # archive listing posts grouped by specific category
|  ├── collection.html         # archive listing documents in a specific collection
|  ├── compress.html           # compresses HTML in pure Liquid
|  ├── default.html            # base for all other layouts
|  ├── home.html               # home page
|  ├── posts.html              # archive listing posts grouped by year
|  ├── search.html             # search page
|  ├── single.html             # single document (post/page/etc)
|  ├── tag.html                # archive listing posts grouped by specific tag
|  ├── tags.html               # archive listing posts grouped by tags
|  └── splash.html             # splash page
├── _sass                      # SCSS partials
├── assets
|  ├── css
|  |  └── main.scss            # main stylesheet, loads SCSS partials from _sass
|  ├── images                  # image assets for posts/pages/collections/etc.
|  ├── js
|  |  ├── plugins              # jQuery plugins
|  |  ├── vendor               # vendor scripts
|  |  ├── _main.js             # plugin settings and other scripts to load after jQuery
|  |  └── main.min.js          # optimized and concatenated script file loaded before </body>
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
├── index.html                 # paginated home page showing recent posts
└── package.json               # NPM build scripts
```

<br/>

## 구성

_config.yml 에서 변경한다. <br/><br/>

## skin: 테마의 색 구성표를 변경

minimal_mistakes_skin: "default" # "air", "aqua", "contrast"<br/><br/>

## site url

깃허브 페이지에서 호스팅할 경우에는 url은

[https://mmistakes.github.io가](https://mmistakes.github.io가) 될 것이다.<br/><br/>

## site base url

지킬 커뮤니티에서 많은 혼란을 야기하는 옵션인데, 깃허브 프로젝트로 페이지 호스팅하지 않을때는 건들지마라.  
만약 mmistake 데모사이트로 예시를 들자면 <br/>base-url은 
/minimal-mistakes가 될거다. 
<br/><br/>

## site repository

repository:"username/repo-name" 으로 작성한다.
<br/><br/>

## site scripts

```
<head>나 </body>요소에 head_scripts 또는 footer_scripts의 경로를 지정해 스크립트를 추가할 수 있다.
이건 자바스크립트를 공부해야 알 수 있을 듯!
```
<br/><br/>

## site default teaser image

"연관 게시물"모듈에서 쓰이는 대체 티저 이미지를 할당하기위해서 

/assets/images 폴더에 사진을 넣고, _config.yml에서 해당 파일 이름을 추가한다
ex)teaser: /assets/images/500*300.png

header도 동일하다.<br/><br/>

## site masthead logo

사이트 타이틀에 로고를 넣기위해 /assets/images/에 사진을 넣고 _config.yml에서 파일 이름을 추가한다.
logo: "/assets/images/88*88.png"<br/><br/>

## site masthead title

사이트의 이름은 초기설정으로 site title이 config.yml에서 사용되는데, 
masthead_title: "name"에 이름을 작성해 오버라이딩 할 수 있다.<br/><br/>

## breadcrumb navigation(beta)

글 위에 home/blog/jekyll & github 공식문서 훑어보기
이처럼 서브네비게이션바가 뜨는 것을 의미하는데, 베타버전이라 그런지 아직은 불완전하다  
이를 막기 위해서 
```
1. category를  permalink: /:categories/:title/ 이렇게 사용하거나
2. 수동으로 각 카테고리의 페이지를 만들어라... 
```
이건데 이건 나중에 써봐야 알 듯 싶다. 지금 주먹구구식으로 만들어진 페이지에서 아직 작동하기에..

breadcrumb의 start link나 separator character는 ul text data file에서 변경가능!<br/><br/>

## post dates

각 포스트의 게시날짜를 보여주게 할 수 있다.
각 포스트에 show_date: true를 추가하면 해당 포스트에만 적용되고
_config.yml의 defaults values에서 이를 추가하면 모든 포스트에 적용된다. 

*config.yml을 오버라이딩하는 방식으로, 작성날짜를 숨기고 싶은 포스트가 있다면 해당 포스트의 앞에 
show_date: false를 하자.*

기본적인 date format dms %b %-d, %y로 되어있는데 이는 febuary 24, 2016 이렇게 표현된다.
_config.yml에서 이를 추가해서 수정가능하다.<br/><br/>

## reading time

나는 이게 처음에 되게 의아했는데 이 테마에서는 200단어를 기준으로 200단어당 1분이 걸린다고 계산을 하나보다. *config.yml에서 words_*per_minute에 해당 단위가 할당되어있는데
이 또한 각 포스트에 적용하거나 config에서 추가할 수 있다.

같은 오버라이딩 방식으로 특정 포스트에서는 read time이 안보이게 하고 싶다면 그 포스트에서만 false를 해주면된다.
words_per_minute도 위와 같은 방식으로 오버라이딩 가능하다.<br/><br/>

## page meta separator

page date 와 reading time이 둘 다 허용되어있을때, 
구분자를 커스텀하기 위해서는 *sass/파일을 수정해야한다. 
.page*_meta-sep::before 에 해당 css가 저장되어 있는데, 이를 수정해아한다.<br/><br/>

## comments

disqus, discourse, facebook 등 이 이 테마 안에 저장되어있는데, 
comment provider를 설정하고, md파일에서 comments:true하거나 config에서 comments: true하면 적용된다. <br/><br/>

## outputting

기본 설정은
permalink:/:categories/:title/.이다. 만약에 내가 2020-01-01-first-blog.md를 categories:-blog에 생성한다면 지킬은 _site/blog/first-blog/index.html을 생성할것이다.<br/><br/>
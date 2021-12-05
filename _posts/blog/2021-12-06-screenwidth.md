---
title: "[jekyll & github] 블로그 화면 넓히기"
excerpt: "mmistakes width"

categories:
  - blog
tags:
  - [blog, jekyll, github, git, liquid]

toc: true
toc_sticky: true

date: 2021-12-06
last_modified_at: 2021-12-06
---

<br>
<br>

# 블로그 화면이 좁아요

jekyll mmistakes로 블로그를 만들었는데, post를 조회했을때, 내용이 너무 좁아서 답답해보이는 느낌이 있다.

\_sass 폴더의 \_variables.scss를 확인해보면 scss상에서 사용하는 변수들이  
`$변수명: 값`이렇게 선언되어 있는 것을 볼 수 있는데, 화면의 max-width값을 선언하고 있는 부분이

```scss
small: 600px !default;
$medium: 768px !default;
$medium-wide: 900px !default;
$large: 1024px !default;
$x-large: 1280px !default;
$max-width: $x-large !default;
```

이렇게 선언되어있는 것을 볼 수 있다.  
그리고 이 변수들은 화면의 크기를 결정하는 scss는 \_page.scss에 있다.

```scss
#main {
  @include clearfix;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 1em;
  -webkit-animation: $intro-transition;
  animation: $intro-transition;
  max-width: 100%;
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;

  @include breakpoint($x-large) {
    max-width: $max-width;
  }
}
```

<br>

여기서 화면의 최대값을 설정하는 max-width값을 수정하기위해 \_variable.scss에서 큰 변수를 더 추가하고 `#main의 breackpoint`의 매개변수를 수정해주었다.

```scss
$small: 600px !default;
$medium: 768px !default;
$medium-wide: 900px !default;
$large: 1024px !default;
$x-large: 1280px !default;
$xx-large: 1440px !default;
$xxx-large: 1600px !default;
$max-width: $xxx-large !default;
```

```scss
#main {
  @include clearfix;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 1em;
  -webkit-animation: $intro-transition;
  animation: $intro-transition;
  max-width: 100%;
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;

  @include breakpoint($xxx-large) {
    max-width: $max-width;
  }
}
```

이렇게 #main의 max-width값을 설정해주면 breadcrumbs가 따로노는 느낌을 받을 수 있는데, `_navigation.scss`에서

```scss
.breadcrumbs {
  @include clearfix;
  margin: 0 auto;
  max-width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  font-family: $sans-serif;
  -webkit-animation: $intro-transition;
  animation: $intro-transition;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;

  @include breakpoint($xxx-large) {
    max-width: $max-width;
  }
```

똑같이 breackpoint와 max-width값을 변경해주자.

<br>
<br><br>
수정했는데, 좀 이상한 부분이 있다 -> 개발자도구로 해당 요소의 css확인 -> @미디어쿼리로 max-width값이 다른 변수로 선언되어있을 확률이 높으니 해당 파일을 찾아 css를 수정하면 그만이다.

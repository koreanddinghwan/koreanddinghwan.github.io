---
title:  "[Frontend] 인프런css"
excerpt: "인프런으로 배우는 css"

categories:
  - css
tags:
  - css
  - frontend
  - inlearn

toc: true
toc_sticky: true
 
date: 2021-09-25
last_modified_at: 2021-09-25
---


# CSS란

정의-Cascading Style Sheets:HTML 웹문서의 스타일을 표현하는 언어로 html코드로 작성된 웹 요소들이 어떻게 표시되어야하는지 정의한다.

특징-선택자(selecter)와 속성, 속성값으로 이루어진다.
```
body {

font-size: 9px;

}
```
<br><br>

# CSS

화면상 html로 이루어진 요소들에 대응해 스타일 세트를 각각 적용한다.

{}중괄호로 이루어진 속성세트를 각 태그, 클래스, id에 적용할 수 있다.

적용된 속성세트들을 css파일로 저장해 html파일들에 import를 할 수 있다. 

<br><br>

## 💡 CSS선언하는법

CSS를 HTML에 적용하는 방법에는 3가지 종류가 있다.  
<br>

### ✏️ 인라인 스타일

각 HTML 태그에 직접 style 속성을 이용해 선언한다.
```
<div style="font-size:11pt; color:white;" >....</div>
```

사실상 많이 쓰지 않는데, 만약에 우리가 이렇게 스타일을 인라인에 지정하게되면 유지관리보수에 드는 시간이 많아지게된다.

<br>

### ✏️ 내부 스타일 선언

같은 html파일 내에 style 태그를 사용해서 태그 내부에 선언한다. 보통 head태그 내에 style태그를 작성하고, 선택자라는 문법을 사용해 문서 내 요소를 선택해 스타일을 지정한다.

```
<style>

p { ~~

}

div { ~~

}

#id {

}

.class{

}

</style>

```
이 역시 인라인 선언과 비슷한 문제가 발생한다. html의 모든 style태그를 수정해야하는 어려움이 있기 때문이다.
<br>

### ✏️ 외부 스타일 시트

위 문제들을 해결할 수 있다. html문서 외부에 css파일을 만들고 html문서가 이 css파일을 참조하게 만들면 css파일 하나만 수정하고도 이를 참조하는 html문서 모두를 수정할 수 있게 된다.

```
<head>

<link rel="stylesheet" type="text/css" href="main.css/>

</head>
```

<br><Br>

## 💡 글자와 관련한 스타일

<br><br>

### ✏️ 색

-color, background-color

 1. hexcode

빛의 3원색값을 16진수로 2자리씩표현해 6자리 코드 만든다.
( 0~255, 0~255, 0~255) → #00 00 00 ~ #ff ff ff

15*15 = 255

 2. rgb

10진수로 각 색의 강도를 표현한다.( 0~255, 0~255, 0~255)

<br>

### ✏️ 폰트
```
-font-family:글씨체

폰트명을 직접 작성해 지정한다. 폰트명이 띄워쓰기 포함하면 ""로 묶는다. 
글씨체를 선언할 경우에는 연속해서 선택할 수 있다. 만약에 폰트가 없다면 다음 폰트가 적용되게한다. 

내가 지정한 폰트가 다 없을때는 알아서 선택되도록 serif, cursive, monospace 중 특성을 가진 폰트를 알아서 선택하도록 할 수 있습니다.

serif: 꺾임이 있음 san-serif:꺽임이 없음

-font-size:글씨 크기

글씨, 컨테이터 크기 단위는 px,pt,em,%가있다.

-px : 화면 픽셀 갯수단위, 해상도에 따라 달라짐

-pt: 1pt는 1/72인치기준

-em: 상대크기, 부모요소에서 사용된 크기에 비해 얼마의 비율로 결정할지

-%:상대크기, 부모요소 컨테이너 크기에서 얼만큼 차지할지.

-font-weight:글자 굵기

-line-height:줄 간격  
```

<br>

### ✏️ 문장, 문단과 관련된 스타일
```
-text-align:정렬방식 left, right, center,justify(균등정렬)

-text-indent:첫 글자 들여쓰기 수준, px이용해 들여쓰기 적용

-text-decoration:글자 장식, underline, overline, line-through(취소선) 적용
```
<br>

### ✏️ 크기 속성
```
width:

height:
```
%는 부모요소 크기에 대해 상대적으로 정해진다. 

<br><Br>

# Css셀렉터

내외부 스타일 시트에서 html요소를 선택할 수 있게하는 문법

-tag선택자 : 모든 특정 태그 선택

-class선택자 : 여러 요소를 그룹으로 선택

속성으로 class를 지정한다.
문서 내에서 여러개 지정가능하다.

```
<div class="description-text">~</div>
<div class="description-text">~</div>
<div class="description-text">~</div>

.description-text {

css 속성선언

}
```

-id선택자 : 하나의 요소를 특정

id는 문서 내에서 하나만 존재해야한다.
```
<div id="html_id">~</div>

#html_id {

css 속성선언

}
```
<br><BR>

## 💡 조합 선택자

특정 요소 하위에 있는 요소를 선택한다.  
2개 이상의 선택자를 합치는 개념  
<br>

### ✏️ 자식조합선택자
부모 선택자 바로 하위요소 > 기호사용  
<br>

### ✏️ 자손조합선택자
부모 선택자의 모든 하위요소 > 띄어쓰기 사용


<img src="https://user-images.githubusercontent.com/76278794/137426565-031b8087-9266-44d3-8faa-a757ef3108df.png">

여기서 em태그는 ol > li > em 으로 계층이 이루어져 색상적용이 안된다.  
적용하기 위해서는 ol em 으로 적용 or li >em 으로 수정해야한다.

<br><Br>

## 💡 상태,반응 선택자

:콜론기호를 사용한다. 요소가 특정 상태가 되었을때만 선택된다.  
1개 선택자에 대해 부연설명과 조건을 붙이는 개념  
<br>


### ✏️ 반응 선택자

hover: 마우스가 커서 위에

active: 활성화된

visited:방문한 링크

<br>

반응선택자는 보통 a태그와 같이 사용하게된다. 
```
a: hover {

color : blue

}
```
<br><Br>

### ✏️ 상태 선택자

focus:입력, 버튼에 포커스

enabled:사용가능한

disable:사용불가능한

<br>

상태 선택자는 input태그와 같이 사용하게된다.
```
input: focus {

color : red

}
```

<br><Br>

### ✏️ 특성 선택자

요소에 부여된 특성의 존재 여부나 그 값에 따라 선택한다. 대괄호를 사용해서 특성을 지정한다.
1개 선택자에 대한 부연설명과 조건부여
```
-a[href=https://www.inflearn.com/] {

속성지정

}

-input[type="text"] {

속성지정

}
```

<br><br>

# 여백관련속성, margin, padding

<img src="https://user-images.githubusercontent.com/76278794/137427220-e45c6fcb-5a25-426c-9774-691acc16ad72.png">

크롬창에서 f12를 누르면 computed 에서 위 정보를 알 수 있다!
<br>

## 💡 padding과 margin에 값을 주는 방법  
```
(margin)padding: 40px  →상하좌우여백   
(margin)padding: 40px  20px →상하, 좌우  
(margin)padding: 40px 20px 10px 5px →상, 우, 하, 좌 (시계방향)  
margin:{특정숫자} auto → 좌우 여백은 중앙에 맞게 알아서 적용한다.
```
따라서 
width + 2*padding: 블럭 요소의 실제 너비
height + 2*padding: 블럭요소의 실제 높이
<br><br>

## 💡 배경속성, background

```
background-color:배경색
background-image:url("c\rda\~.jpg");
background-repeat:배경이미지 반복 여부 
background-position: 배경 이미지 위치
```

<br><br>

## 💡 magin과 padding의 관계

<img src="https://user-images.githubusercontent.com/76278794/137427398-afeb732e-448d-4ccb-b0b8-34e86534327e.png">

```
1. class="in" 이라는 박스 안에는 문자열이 content로 들어있고, class="out"은 이를 감싸는 형태
2. [div.in] 이 width, height가 100%로 설정되어 div.in의 부모요소인 out의 width와 height를 꽉 채우는 형태로 박스가 채워진다.→100px, 100px
3. div.out이 이후 padding:10px이 선언되면
out box model의 width, height는100 + 2*padding(20) 으로 120이된다. 
4. padding: 내부 content 와 border사이 간격이므로 class in에 적용되는 크기는 여전히 100px이다.
```

margin:5px이 out box에 선언된다면 border의 경계선에서 5px의 margin이 추가된다.
만약 box끼리 margin이 겹치게된다면 더 큰 margin으로 수렴한다.
<br><br><br>


# 요소들의 위치배치규칙, display,float,position

```
display: 해당 요소가 어떻게 보여질지 정한다

none: 화면에 보이지 않게한다.

block: 블록요소형태로 표현한다.(한줄차지)

inline: 인라인 요소 형태로 표현한다.(크기지정불가)
**inline-block: 크기가 지정 가능한 블록요소로 표현하되 inline처럼 같은 줄에 다른 요소가 위치 가능하다.

flex, grid: flex와 grid레이아웃을 사용할 수 있다.

float : 화면 내용을 무시하고 좌측, 우측으로 위치조정, 기존의 영역을 밀어냄

left, right: 우선정렬

position: 위치 값을 직접 정할 수 있는 규칙을 적용(absolute, relative,fixed)
               left, top, right, bottom 속성과 같이 사용해야한다.

absolute:절대좌표값지정
relative:현재위치에서 바로앞 요소에 대한 상대적인 좌표로 이동
fixed:스크롤내려도 위치 그대로임.
static:그냥 기본값
```

<br><br><br>

# 테두리 속성
## 💡 테두리 굵기 border

특정 요소에 테두리를 지정한다

border-width: 굵기

border-style: solid, dotted, dashed, double

border-color: 선 색

border: 굵 종 색  
<br>

## 💡 테두리 그림자 shadow

box-shadow: 테두리 외부에 그림자 효과를 준다.
box-shadow: 5px 10px →오른쪽 5px, 아래 10px

box-shadow: 5px 10px #000000 색상도 부여

box-shadow: 5px 10px 8px #000000 8px정도 그림자 흐리게 지정

box-shadow: 5px 10px 8px 10px #000000 10px정도 주변으로 그림자 퍼지게  
<br>


## 💡 테두리 둥글게 border-radius

border-radius: 25px → 25px만큼 상하좌우 테두리 둥글게  
border-radius: 25px 5px →좌측상단 우측하단은 25px, 우측상단 좌측하단은 5px   
border-radius: 25px 5px 15px  → 좌측상단, 우측상단 좌측하단, 우측하단  
border-radius: 25px 5px 15px 20px → 좌측상단, 우측상단, 우측하단, 좌측하단  
border-radius: 50%는 원이된다.
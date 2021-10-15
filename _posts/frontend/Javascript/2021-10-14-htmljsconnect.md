---
title:  "[javascript] html코드에 javascript 가져오기"
excerpt: "javascript 삽입"

categories:
  - javascript
tags:
  - [javascript, js]

toc: true
toc_sticky: true

date: 2021-10-04
last_modified_at: 2021-10-04
---

# 자바스크립트의 작성방식
```
-인라인 스타일 html 태그에 이벤트 속성으로 직접 작성한다.
-내부 스크립트:<script></script>에 작성
-❗️외부 스크립트: js파일에 작성 후 <script>태그로 import한다.
```

## 💡 외부 스크립트로 자바스크립트 파일 불러오기
```html
<body>
    <script type="text/javascript" src="파일위치"></script>
</body>
```

<br><br>

## 💡 script태그를 위에 쓰지 않는 이유

CSS파일은 html코드의 상단에서 작성해주었다.  
하지만 JS파일은 상단에서 작성하지 않는다.  
<br>
html파일을 웹 브라우저가 읽고,  
브라우저가 자바스크립트를 인터프리터로 다루게 되는데,  
이때 브라우저가 해당 Js파일 위치로 가서 데이터를 읽어온다.  

만약 html코드를 읽기 전에 JS파일을 불러온다면, 이 시간동안 HTML파일이 로드되지 않아  
화면상에 흰 화면만 노출되게된다.

<br>
<br>


# DOM

dom은 프로그래밍 언어에서 html문서의 정보를 다룰 수 있게 프로그래밍 인터페이스를 제공하는 객체 모델이다.  

<img src="https://user-images.githubusercontent.com/76278794/137271716-4e6d4813-6664-4226-86c2-63170ad3cf20.jpeg">

    - 자바스크립트가 접근할 수 있게해주기 위해 웹브라우저가 html을 그려줌과 동시에 dom으로 변환한다.  
    - html의 각 element에 대응되게하는 객체를 형성한다.  
    - 각 요소는 각 dom객체에 연결되어 화면에 그려지게된다. 
    - 화면에 실행될때, javascript가 dom객체를 실시간으로 변경하면, 연결된 html
    의 element들도 동시에 변경된다.

이를 좀 더 상세하게 알아보면

1. html태그로 작성된 element는 DOM Object로 표현된다.
2. 모든 element는 속성, 이벤트, 프로퍼티의 구성을 가진다.
3. html코드는 DOM형태로 해석되어 CSS적용, Javascript와 상호작용이 이루어진다.

## 💡 DOM의 객체 생성
DOM은 html 파일의 구조를 계층적으로 정리해 원하는 객체에 접근할 수 있다.(Tree 구조)
<img src="https://user-images.githubusercontent.com/76278794/137275947-033e49df-a77b-4631-9e2c-84f7de2390b8.jpeg">



## 💡 주요객체
-document: html 문서 전체, 최상위 root객체  

-element : document 하위의 화면 요소들을 의미한다. dom에서는 계층적인 형태로 존재한다.

<br><br>


## 💡 DOM접근함수
원하는 DOM객체를 리턴받는 함수  
- document.getElementByid(elementid):요소의 id 값(html태그의 id 속성)으로 요소를 가져온다.  

- document.getElementsByTagName(name):요소의 태그 종류로 (html tag)요소들을 가져온다.   
태그가 여러개일 수 있으므로 배열형태로 가져온다.  

- document.getElementsByClassName(className):요소들의 class값으로 요소들을 가져온다.  
클래스값도 여러개일 수 있으므로 배열형태로 가져온다.  


<br><br>

## 💡 QuerySelector

document.querySelector(selector): 선택자 문법으로 문서 내의 요소들을 가져온다.


querySelector() -> 가장 처음요소 1개만  
querySelectorAll() -> 모든요소, 배열  
querySelector는 element도 사용가능하다  


class 가 panels인 div 내의 li 요소를 가져온다.
```
var element = document.querySelector("div.panels li");
```
<br><br>

## 💡 DOM 객체 추가
DOM객체를 생성해 DOM구조에 추가하면 화면에 표시된다.


document.createElement(tagName): 새로운 DOM노드객체를 생성한다.  
계층적으로 정리한 트리구조에서 각 점을 노드라고 부르는데, 화면에 추가할 노드 객체를 생성할 수 있다.


(DOM객체 변수).appendChild(삽입할 DOM 노드객체): 특정 DOM객체 하위에 다른 DOM 객체를 삽입한다.  
위의 노드객체를 생성한 후, 어디에 넣어야 할 지를 결정해준다.

```
var div = document.getElementByid('panels')
var element = document.createElement('p')
element.innerHTML = 'p 태그의 내용입니다.'
div.appendchild(element)

```
<br><br>

### 예시

<img src="https://user-images.githubusercontent.com/76278794/137424142-660432f0-2378-4ecd-b369-f9aad00ad420.png">  

구글 홈페이지에서 이 요소는 

```
<div id ="SIvCob">~</div>
```
이렇게 선언되어있다. 
<br><br>

배운 순서대로 적용하면,

```
1. Dom 객체의 ID를 기준으로 리턴받는다.
var SIvCob = document.getElementById('SIvCob');

2. 만들고자하는 DOM 객체를 생성한다.
var newElement = document.createElement('p');

3. 새로 만든 DOM객체에 내용삽입
newElement.innerText = '안뇽';

4. 원하는 위치에 DOM객체 삽입
SIvCob.appendChild(newElement)
```
<br>

<img src="https://user-images.githubusercontent.com/76278794/137424639-a41d0697-5143-4537-917f-10d6701577f6.png">

<br><br>

## 💡 DOM 객체 수정, 제거
DOM 접근 API를 사용해 필요한 객체를 가져와서 innerHTML이나 style 속성으로 객체를 수정할 수 있다.

- element.innerHTML  

요소 내부의 콘텐츠 값에 접근하거나, 값을 지정한다.
element.innerText는 단순히 문자열을 쓰는 역할을 하지만  
innerHTML은 html코드가 들어가서 html이 그려지게된다.
<br>
- element.style  

요소가 가지고 있는 style을 지정할 수 있다.  
element.style.display = 'none'  
element.style.fontSize = '11pt'  
css 상에서 폰트사이즈는 font-size로 지정했다.  
하지만 DOM객체로 넘어오면서 '-'은 사라지고 다음 글자가 capital이 된다.

- element.remove()
해당 요소를 제거한다.



# 이벤트
DOM기반의 요소들은 event를 감지해서 그 이벤트가 감지되었을 때 원하는 코드가 실행되도록 할 수 있다.  


event listener 어떤 이벤트가 발생했을떄, 특정 자바스크립트 코드가 실행되도록한다.

## 종류
많은 이벤트들이 DOM차원에서 미리 정의되어 있다.
-click
-mousemove
-keypress
-submit
-load




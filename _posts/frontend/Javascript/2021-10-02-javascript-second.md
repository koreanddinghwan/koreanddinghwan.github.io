---
title:  "[javascript] 연산자"
excerpt: "html과 css를 배우고나서."

categories:
  - javascript
tags:
  - [javascript, js]

toc: true
toc_sticky: true

date: 2021-10-02
last_modified_at: 2021-10-02
---

# 비교연산자
<br/>
결과를 boolean(true/false) 으로 반환한다.

```javascript
    == 값이 같다.
    != 값이 다르다.
    === 값이 같고, 데이터타입도 일치한다.
    <
    >
    <=
    >=

```
<br/><br/>

# 논리연산자
<br/>
boolean을 연산할 수 있다.

```
    && and와 같음
    || or와 같음
    !  not과 같음
```
<br/><br/>
# 연산자의 우선순위 
<br/>
 괄호 → 증감 연산자 → 산술 연산자 → 비교 연산자 → 논리 연산자 → 대입 연산자  <br/>
 괄호가 가장 순위가 높습니다. 증감 연산자와 NOT 논리 연산자는 산술 연산자보다 우선순위가 높습니다.

<br/><br/>

# 삼항 연산자
<br/>

```
condition ? value if true : value if false
```
condition-> 우리가 판단하고자 하는 것  <br/><br/>
?와 : 사이의 코드는 condition이 참이면 실행된다.<br/>  
: 뒤의 코드는 condition이 거짓이면 실행된다.<br/>



<br/><br/>

# 단항 연산자 
<br/>

```
delete:객체를 삭제하는 단항연산자이다.

typeof():변수의 타입을 반환하는 함수이다.
```


<br/><br/>

# 비트 연산자 
<br/>

이진수 연산시 사용하는 연산자이다.
```
&,|,^,~,>>,<<,>>>
```

<br/><br/>
---
title:  "[javascript] 조건문과 반복문"
excerpt: "조건문과 반복문이란"

categories:
  - javascript
tags:
  - [javascript, js]

toc: true
toc_sticky: true

date: 2021-10-03
last_modified_at: 2021-10-03
---


# 조건문
조건의 참 거짓에 따라 원하는 코드를 실행한다.  

<br/><br/>

## If 조건문
if , else의 키워드로 조건문을 구성한다.

```javascript
if condition{

    코드

}else if{

    코드

}else {

    코드

}
```
else if로 조건을 계속 추가할 수 있다.  <br/>
<br/><br/>
또한 실행코드가 한줄이면 중괄호 생략이 가능하다.
```
if condition console.log()
```
<br/><br/>
## Switch 문
swithch 와 case의 조합으로 조건문을 만든다.

```
switch(표현식){

  case 값1:
    표현식==값1일때 코드
    break;

  case 값2:
    표현식==값2일때 코드
    break;

  default:
    모든 조건에 해당하지 않을때 코드
}
```
if의 조건문과는 다르게 switch의 표현식에는 변수, 함수 등이 들어갈 수 있다.  

<br/>
<br/>

# 반복문
특정 코드를 반복해서 실행하고싶을때 사용한다.

<br/>
<br/>

## for문

조건식을 만족하는 한, 코드를 계속 반복한다.

```javascript:for.javascript
for (초기식;조건식;증감식) {
  반복 실행할 코드
}
```

초기식에 증감할 변수를 할당하고, <br/>
조건식에 반복실행할 횟수를 부등호 형식으로 할당<br/>
증감식에 증감할 변수의 증감량을 결정한다.<br/>

초기식 만족->조건식 판별
<br/>
조건식 만족->반복실행할 코드 실행
<br/>
증감식 실행->조건식 판별
<br/>
<br/>

## while문
조건을 만족하는한 계속 실행한다.
```
while (조건식) {
  반복 실행될 코드
}
```




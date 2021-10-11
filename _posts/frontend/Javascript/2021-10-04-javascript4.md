---
title:  "[javascript] 배열형, 객체"
excerpt: "배열형과 객체의 사용"

categories:
  - javascript
tags:
  - [javascript, js]

toc: true
toc_sticky: true

date: 2021-10-04
last_modified_at: 2021-10-04
---

# 배열형

## 배열형이란
인덱스 기반으로 값을 순서대로 삽입할 수 있는 특별한 객체형태.  
파이썬의 리스트와 같은 개념이다.  
인덱스는 위치를 의미하고 0부터 시작한다.  
<br/>
```
var array=[0,10,20]
array[0];->0
array[2];->20
```
<br/>

## 배열형 값의 삽입과 제거

```
length: 배열의 '크기'를 리턴(인덱스 0,1,2를 갖는다면 크기는3)
push(): 배열에 맨 뒤에 새로운 값을 추가한다.
ushift(): 배열에 맨 앞에 새로운 값을 추가한다.
pop(): 배열의 '마지막 값'을 리턴하면서 제거한다.
shift(): 배열의 '처음값'을 리턴하면서 제거한다.
```

<br/>
<br/>


# 객체형
## 객체 자료형, property

property는 값이나 함수(method)를 가질 수 있다.  
파이썬의 딕셔너리와 같다.  
key-value형태를 갖고있다.  
value값에는 함수가 들어갈 수 있다.

```
   username:      "lb'
(property name)  value
```

<br/>

## 객체 자료형의 변경

객체에 접근하거나 값을 저장하기 위해서는 .기호를 사용해야한다.
```
var object = {username:'blog', date: '2021-10-04'}
object.username -> 'blog'를 리턴
objects.date = '2021-10-03' -> date값을 변경 
objects.online = true -> online값을 프로퍼티에 추가하고 true로 지정한다.
```

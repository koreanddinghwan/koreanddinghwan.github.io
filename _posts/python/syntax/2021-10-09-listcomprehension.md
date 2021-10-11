---
title:  "[Python 문법공부] 리스트 표현식"
excerpt: "리스트 표현식에 대해"

categories:
  - pythonsyntax
tags:
  - [python, syntax, list-comprehension]

toc: true
toc_sticky: true

date: 2021-10-09
last_modified_at: 2021-10-09

---


# 리스트 표현식

## 표현 방법

2가지 방식이 있다.

```python
[식 for 변수 in 리스트]
list(식 for 변수 in 리스트)
>>> a = [i for i in range(10)]      

>>> a
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

>>> b = list(i for i in range(10))    

>>> b
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
<br>
<br>

## [ ] 리스트 표현식에서 조건문 사용
```python
a = [i for i in range(10) if i % 2 == 0]
>>> a
[0,2,4,6,8]
```

<br>
<br>

조건식을 여러번 사용할 수도 있다.
단, 처리순서는 가장 먼저 실행되는 for문이 먼저이다.
```python
a = [i *j for i in range(1,10) 
          for j in range(2,10)]
>>>a
[2,3,4,5,6,7,8,9,4,6,8,10...]
```
  
<br>

리스트 원소들에 연산을 할 수 있다.

```python
a = [i*2 for i in range(10)]

>>> a
[0,2,4,6,8,10,12,14,16,18]

```

<br>
<br>
<br>

# list()와 [ ]의 차이점

```python
a = (1,2,3)
b = (4,5,6)

>>> list(a) + list(b)
[1,2,3,4,5,6]

>>> [a] + [b]
[(1,2,3), (4,5,6)]
```

list()함수는 tuple내의 원소들을 강제로 리스트 원소로 할당한다.  
<br>
하지만 대괄호 [ ]은 새로운 리스트 메모리에 각 원소 객체의 주소를 가리키는 방식을 사용한다.  
리스트표현식을 사용할 때는 대괄호를 이용한다.  
<br><br>






<br/>
<br>
<br>

---
title:  "[Datastructure] 해시테이블"
excerpt: "파이썬 자료구조"

categories:
  - datastructurepy
tags:
  - [computer science, data structure, python, hashtable]

toc: true
toc_sticky: true
 
date: 2021-11-10
last_modified_at: 2021-11-10
---

# 💡 해시테이블 소개

해시테이블: 매우 빠른 연산을 지원한다.  
해시 테이블은 실용성이 뛰어나 광범위한 분야에서 사용된다.  

일반 딕셔너리의 문제는 삽입,삭제,탐색이 자료안의 모든 정보를 탐색해야하기 때문에 시간복잡도가 O(N)이라는 것이다.  



이를 개선하는 방법으로 해시테이블이 사용된다.  
해시테이블을 사용하는 간단한 방법에 대해 알아보자.  

## ✏️ 예시

<img src="https://user-images.githubusercontent.com/76278794/141069723-a78981f1-4312-41cb-9e80-d961df9a95e6.jpeg">


    key:value 형태로 item 62:"새"가 주어진다.
    funtion(%10)으로 연산한 값 2번 인덱스에 item을 넣는다.

기본적인 자료구조의 탐색연산은 모든 테이블의 원소들을 검색해야하니 O(N)의 시간복잡도이지만,  
해시테이블을 사용하면 62 % 10 = 2 번 인덱스에서 찾으면 되니 O(1)의 시간복잡도를 가질 수 있다.  

<br>

여기서 fuction의 역할이 중요한데, 이 fuction은 자료의 key값을 연산해 어느 인덱스에 해당 자료가 들어가야하는지 결정한다.  
이 function을 <b>해시함수(hash function)</b>이라고 한다.  

<br>
밑에서 후술하겠지만, 예시로 든 위의 해시함수는 72,82와 같은 key값이 들어오면 이전에 해시테이블에 넣어 둔 자료와 충돌하게된다.  
이를 <b>collision</b>이 발생했다고 한다.  

<br>
해시함수에서 collision이 발생했을때, 이를 해결하는 방법을 <b>collision resolution method</b>라고 부른다.

<br><br>

## ✏️ 해시함수의 종류
<br>

### Perfect hash func
완전해시함수는 collision 없이 1대1 매핑하는 함수이다.  
가장 이상적인 형태의 해시함수이지만, 이를 계산하기 매우 어렵고, 비효율적이다.  

<br>

### ❗️ C-Universal hash func

c-universal 해시함수는 서로 다른 임의의 두 키값의 해시함수값이 같을 확률이 해시테이블 크기에 반비례하는 해시함수이다.  
식으로 표현하면

    prob(f(x) == f(y)) = c/magnitude(c는 0보다 큰 임의의 실수 상수)  


<br>

## ✏️ 현실에서 자주쓰이는 해시 함수

### ❗️ Division hash func
키값을 소수로나눈 나머지를 해시테이블의 길이로나눈 나머지

    f(k) = (key%prime_num) % magnitude


# 💡 충돌 해결 방법

해시함수로 키값을 연산할때, 함수값이 같은 키값이 있다면 이 키값끼리 충돌이 발생했다고 정의한다.  
이를 해결하는 방법에는 Open addressing과 Chaining 두 가지 방법이 있다.  

## ✏️ Open addressing 
### ❗️ linear probing

![스크린샷 2021-11-17 오후 2 10 09](https://user-images.githubusercontent.com/76278794/142138647-34c95f5c-72cf-435b-9571-38293216011b.png)

키값을 넣어야하는 테이블에 값이 이미 있다면, 그 다음 테이블에 넣는다.  

### ❗️ quadratic probing

<img width="159" alt="스크린샷 2021-11-17 오후 2 14 59" src="https://user-images.githubusercontent.com/76278794/142139092-81039c3d-62c3-4289-94e3-6bbf1fb8e75c.png">

키값의 해시테이블이 차 있다면 k+1^2, k+2^2,,,의 순서로 넣는다.  


### ❗️ double probing

해시함수를 2개 사용한다.  
한 해시함수로 연산한 해시테이블의 인덱스값이 중복된다면, 다른 해시함수로 연산한 값을 더해가면서 구한다.  

## ✏️ Chaining

해시테이블의 각 슬롯이 한방향 연결리스트로 구현되어 있다.  
이에따라 충돌 key의 평균 개수는 각 슬롯별 연결리스트의 평균 길이와 같다.  


# 💡 해시 자료구조의 성능평가

해시테이블의 크기를 m(magnitude)라고하고, 테이블에 저장된 아이템의 개수를 n이라고 가정한다. 

## ✏️ Load factor

LF = n / m

해시테이블의 크기가 작고, 아이템의 개수가 많아질수록 LF가 커진다.  
그에 따라 충돌횟수도 증가한다.

## ✏️ Collision ratio

(number of collisions) / n

비율이 작을 수록 연산 시간이 작아진다.  


## ✏️ Set, Search, Remove 성능

보통 이 3가지 연산은 cluster size의 크기에 영향을 받는다.(cluster size가 크면 성능 감소)  

그리고 이 cluster size는 해시함수의 성능과 충돌회피방법에 따라 달라진다.  
해시함수의 성능이 좋으면 당연히 클러스터의 크기가 줄어들고,  
충돌회피방법(linear, quadratic, double 등)에 따라 성능이 달라진다.  

open addressing의 경우, c-universal hash function을 사용하고
클러스터의 크기는 m>2n 이라는 조건 하에서 클러스터의 평균 사이즈가 O(1)이 된다.  
이에 따라 set,search,remove 의 성능도 평균적으로 O(1)이 된다.  

chaining의 경우,  c-universal hash function을 사용하게 되면, O(1) 시간 내에 연산이 가능하다.  

# 💡 구현

파이썬의 `dict`는 해시 테이블로 관리되는 매우 효율적인 자료구조로 해시 테이블과 지원하는 연산이 같다!


파이썬의 dict는 c로 구현되어 있는데, (버전마다 다르지만) resize는 초기 해시테이블의 사이즈는 8이다.  

8개 슬롯으로 시작해 전체 슬롯의 1/3은 항상 비어있도록 유지해야한다.  

따라서 2/3 이상 슬롯이 차면 해시 테이블의 슬롯을 2배 늘려 resize한다.  
이때, 한 번 resize할때마다 연산 시간이 늘어나게 된다.  
하지만 resize하는 연산회수의 평균을 내보면 상수시간(O(1))의 연산을 한다.  

이처럼 연산의 수행시간을 평균으로 계산하는 방법을 amorized time analysis라고 한다.  


# 참고 자료 
😇 [신찬수 교수님 자료구조 강의](https://www.youtube.com/c/ChanSuShin/featured)   
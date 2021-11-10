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

# 해시테이블 소개

해시테이블: 매우 빠른 연산을 지원한다.  
해시 테이블은 실용성이 뛰어나 광범위한 분야에서 사용된다.  

일반 딕셔너리의 문제는 삽입,삭제,탐색이 자료안의 모든 정보를 탐색해야하기 때문에 시간복잡도가 O(N)이라는 것이다.  



이를 개선하는 방법으로 해시테이블이 사용된다.  
해시테이블을 사용하는 간단한 방법에 대해 알아보자.  

## 💡예시

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

## 💡해시함수의 종류
<br>

### Perfect hash func
완전해시함수는 collision 없이 1대1 매핑하는 함수이다.  
가장 이상적인 형태의 해시함수이지만, 이를 계산하기 매우 어렵고, 비효율적이다.  

<br>

### C-Universal hash func

c-universal 해시함수는 서로 다른 임의의 두 키값의 해시함수값이 같을 확률이 해시테이블 크기에 반비례하는 해시함수이다.  
식으로 표현하면

    prob(f(x) == f(y)) = c/magnitude(c는 0보다 큰 임의의 실수 상수)  


<br>

### Division hash func
키값을 소수로나눈 나머지를 해시테이블의 길이로나눈 나머지

    f(k) = (key%prime_num) % magnitude








# 참고 자료 
😇 [신찬수 교수님 자료구조 강의](https://www.youtube.com/c/ChanSuShin/featured)  
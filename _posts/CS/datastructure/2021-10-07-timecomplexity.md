---
title:  "[Datastructure] 알고리즘의 시간복잡도"
excerpt: "파이썬 자료구조"

categories:
  - datastructurepy
tags:
  - computer science
  - data structure
  - python
  - time complexity

toc: true
toc_sticky: true
 
date: 2021-10-07
last_modified_at: 2021-10-07
---

# 자료구조와 알고리즘의 성능

    자료구조와 알고리즘을 설계 → 코드 → 컴퓨터에서 실행  
    문제점 1. Hw/Sw에 따라 다른 성능  
    문제점 2. 다양한 크기의 입력

따라서 소프트웨어와 하드웨어환경과 독립적인  
**<u>1가상컴퓨터(virtual machine)</u>**에 알고리즘을 기술할   
**<u>2가상언어(pseudo language)</u>**로  
**<u>3가상코드(psuedo code)</u>**를 작성한다.

<br/>
우리가 이 3가지를 약속하면 하드웨어와 소프트웨어 환경에 독립적인 상황에서 객관적으로 알고리즘을 비교할 수 있다.
<br/>
<br/>
<br/>

## 가상컴퓨터
<br/>

### 역사
원조는 튜링 머신인데, 후에 폰 노이만이 현재 컴퓨터에 가장 가까운 형태를 제시한다.  
<br/>

### **R**andom **A**ccess **M**achine모델  
RAM모델 = CPU(연산) + Memory(데이터저장) + 기본연산  
<br/>

### 기본연산
1 단위시간에 수행되는 연산의 모음이다.  

    -배정,대입,복사연산  
     ex) a=b, b를 읽어 a를 쓰기  

    -산술연산 
     ex) +,-,*,/   
     주의) %,올림,내림,반올림은 포함x

    -비교연산 
     ex) >,>=,<,<=,==,!= 
     a>b는 a-b< 0 을 판별하는 것과 같다. 이 또한 기본연산에서 1시간으로 가정한다. 

    -논리연산 
     ex) and, or, not

    -비트연산
     ex)bit-and, or, not
<br/>
<br/>
<br/>

## 가상언어
<br/>

```
기본연산  
조건문   
반복문    
함수정의, 호출, 리턴
```
을 제공하는 언어이다.
<br/>
<br/>
<br/>

## 가상코드
<br/>

### 기본연산 예시  

![virtualcode](https://user-images.githubusercontent.com/76278794/136416229-86bf1157-557a-4184-b5f6-e2e1469eb58f.jpeg)  
<br/>

### 평균내기

모든 입력에 대해 기본연산횟수를 더한 후, 평균을 내는 방법  
하지만 이 방법은 현실적으로 불가능하다.  
<br/>
<br/>

## <u>**Worst case time complexity**</u>
연산이 가장 많이 필요한 입력에 대한 기본연산 횟수를 측정한다.  
이 방법이 일반적으로 알고리즘분야에서 시간복잡도를 정의하는 방법이다.  
단점: 정확도 ▽  
장점: 어떤 입력에 대해서도 wtc보다 수행시간이 크지 않다.
</br>
<br>

### WTC의 적용
위 예시에 WTC를 적용해보자.  
A가 오름차순정렬되어있을때, if문이 true가되어 대입연산이 한번 더 실행되므로  
기본연산 횟수가 가장 많다.  
```
A=[0,1,2,5,9]
1.cur_max에 A[0] 대입 
2.cur_max와 A[1] 비교, if문 true
3.if문 실행, cur_max = A[1]
4.cur_max와 A[2] 비교, if문 true
5.if문 실행, cur_max = A[2]
6.cur_max와 A[3] 비교, if문 true
7.if문 실행, cur_max = A[3]
8.cur_max와 A[4] 비교, if문 true
9.if문 실행, cur_max = A[4]


맨 처음 대입연산 1번
+
for문의 if 비교,대입연산 2번 * for문 싸이클(n-1)번

T(n) = 1 + 2(n-1) = 
2n - 1(번)
```

<br>
<br/>

### WTC 예시
```python
def sum(A,n):
    sum = 0
    for i in range(n):
        if A[i] % 2 == 0:
            sum += A[i]
    return sum
```
```
wtc일 경우, 모든 A의 요소가 짝수일때 가정.
1.sum 대입연산 ▷ 1번
2.if A[i] % 2 == 0: 에서 산술연산 %와 비교연산 ==  ▷ 2번
3.sum = sum + A[i] 에서 대입연산 =과 산술연산 +    ▷ 2번

맨처음 대입연산 1번
+
for 문 내의 기본연산 4번 * for문 싸이클 n번
T(n) = 1 + 4n
```
<br>
<br>

```python

def sum2(A,n)
    sum = 0
    for i in range(n):
        for j in range(i, n):
            sum += A[i] * A[j]
    return sum
```

```
1.sum 대입연산 ▷ 1번
2.바깥 for문 n번
3.안쪽 for문 내에서 대입연산, 산술연산 2번 ▷ 3번
4.안쪽 for문은
i=0, j는 n번
i=1, j는 n-1번
.
.
.
i=n-1, j는 1번

j를 모두 합하면 j for문이 몇 번 수행되는지 알 수 있는데,  
n(n+1)/2 번 수행된다.


T(n) = 1 + 3*(n(n+1)/2)
```
sum1과 sum2를 비교하면, sum2는 n이 제곱되어있으므로  
입력값이 늘어남에따라 wtc가 sum1에 비해 더 크게 증가함을 알 수 있다.


# 참고자료
개인적인 공부를 위한 글이며, 모든 저작권은 신천수 교수님께 있습니다.  
자세한 강의 내용은 신천수 교수님 강의를 참고하시면 좋을 것 같습니다.  
[신천수 교수님 자료구조 강의](https://www.youtube.com/c/ChanSuShin/featured)
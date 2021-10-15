---
title:  "[Algorithm] 메모이제이션(memoization)"
excerpt: "알고리즘"

categories:
  - algorithm
tags:
  - computer science
  - algorithm
  - memoization

toc: true
toc_sticky: true
 
date: 2021-10-15
last_modified_at: 2021-10-15
---


# 메모이제이션

## 메모이제이션이란

동적프로그래밍(Dynamic Programming)은 중복되는 문제가 있을 때, 재귀 관계를 상향식으로 해결한다.  
메모이제이션은 최적화 문제를 풀 때, Caching 방식을 이용해 중복계산을 방지하고, 획기적으로 계산 시간을 줄인다.  
이미 계산된 값을 테이블에 저장해 중복되는 계산이 발생할 경우, 불러온다.

<br><br>

# 피보나치 수열에 적용


## 시간복잡도 O(2^n)
피보나치수열 함수를 만든다고 가정해보자.
```python
def fibo(n):
  if n >= 1: #fibo(0) = 0, fibo(1) = 1 이다.
    return n
  else:
    else:
      return fibo(n-1) + fibo(n-2)
```

<br>
<br>

이를 트리형태로 나타내면,  
<img src = "https://user-images.githubusercontent.com/76278794/137487576-54dce025-cd40-401b-9f06-5dd08c65e8d0.jpeg" width = 400>  

재귀함수 형태로 시간복잡도는 O(2^n)이 되어 매우 비효율적이다. 

# 메모이제이션을 적용한 피보나치수열 
피보나치 수열을 메모이제이션 적용하면  
계산값을 해시테이블(list)에 각각의 계산된 객체주소를 저장하면서 나아가는형태로 나타내면
```python
def fibo(n):
  F = [0,1] + [0]*(n-1) #fibo(0), fibo(1)의 값을 가진 길이 n의 리스트를 생성(caching)
  for i in range(2,n+1) #피보나치수열은 fibo(2)부터 n까지 계산한다.
    F[i] = F[i-1] + F[i-2] #인덱스 기준 2개 앞의 값을 더한다.
```
<br>
<br>
하지만 이렇게 테이블을 미리 만들어놓고 코드를 작성하게 될 경우,   

함수를 호출할때마다 테이블을 다시 만들게된다.  
따라서, 재귀함수에서 메모제이션을 적용하고, 함수 밖에서 캐시를 만들면
```python
def fibo(n):
  if n<= 1:
    return 1
  else:
    if F[n] == -1:
      F[n] = fibo(n-1) + fibo(n-2)
      return F[n]

n = int(input())

if n >= 2:
  F = [0,1] + [-1]*(n-1)

print(n,fibo(n))
```
으로 한 번 호출된 함수는 바깥 테이블에 저장되어, 함수를 여러번 호출해도 테이블은 1번만 만들어지게된다.





# 참고자료
[주니온TV 아무거나연구소](https://www.youtube.com/watch?v=YNIasN6kT2M)

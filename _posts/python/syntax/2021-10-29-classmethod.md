---
title:  "[Python 문법공부] 클래스, 메서드"
excerpt: "클래스와 메서드에 대해서"

categories:
  - pythonsyntax
tags:
  - [python, syntax, class, method]

toc: true
toc_sticky: true

date: 2021-10-29
last_modified_at: 2021-10-29
---

# 클래스와 메서드의 관계

클래스는 내가 자료구조를 공부하면서 배운 스택, 큐, 연결리스트 등을 공부하면서 자연스럽게 접할 수 있었다.  
```python:
class stack:
    def __init__(self): #클래스의 객체생성함수.
        self.items = []

    def push(self,val): #삽입
        self.items.append(val)

    def pop(self): #마지막 값 삭제, 리턴
        try:
            return self.items.pop()
        except:
            print("stack is empty now")

    def top(self) #마지막 값 리턴
        try:
            return self.items[-1]

        except:
            print("stack is empty now")

    def __len__(self): #len으로 호출하면 길이만 리턴한다.
        return len(self.items)

    def isEmpty(self): #0개면 true, 0이 아니면 false를 반환한다.
        return len(self) == 0

```

이렇게 스택이라는 자료구조의 클래스를 선언했었다.  
클래스는 객체를 표현하기 위한 문법이다.  
파이썬에서 객체를 만들기 위해서 사용하는 것이 클래스이다.  

클래스를 표현하기위해서는 <b>속성</b>과 <b>메서드</b>가 필요하다.  

일단 메서드를 만드는 방법에 대해서 먼저 공부해보자.

<br>
<br>

## 인스턴스 생성 및 메서드 호출

위의 스택코드를 활용하자.  
```python
teststack = stack() #스택클래스의 인스턴스 생성
```
이렇게 teststack 이라는 객체는 stack()이라는 클래스를 가진다.  
따라서 stack()의 메서드(클래스의 함수들)을 사용할 수 있다.

```python
teststack.top() #스택의 가장 위의값 리턴
>>stack is empty now
```
이렇게 호출해낼 수 있다!

<br>
<br>

## 파이썬에서 기본적으로 주어진 클래스
우리가 흔히 사용하는 리스트, 딕셔너리도 사실은 클래스이다.  
이걸 알아보기위해서는

```python
a = list(range(10)) #a라는 객체에 list라는 클래스를 할당하는데, a는 list클래스의 인스턴스가되며 값은 range(10)이다.
a.append(5) #.append는 list라는 클래스에 작성된 메서드이다. 
```

아직 감이 안온다고? 그렇다면  
```python
print(isinstance(a,list))
```
를 해보자. a라는 인스턴스가 list클래스의 인스턴스이면 true가, 아니라면 false가 출력된다.

<br>
<br>


# 클래스와 속성

클래스의 속성은  `__init__()`메서드 안에서 self.속성에 값을 할당한다.

```python
class stack:
    def __init__(self): #클래스의 개게생성함수.
            self.items = []
```
속성을 확인하기 위해서 객체를 만들어 속성을 호출해보면,
```python
test = stack()
print(test.items)
>>> []
```

()괄호 안에 self가 들어가있는 것을 인스턴스 속성이라고한다.  
인스턴스 속성은 인스턴스 각각 설정된 속성을 의미한다.  
<br>
test라는 인스턴스는 stack 클래스가 설정되었고,  
속성값을 호출하기위해서는 test.items로 호출하면된다.  
`__init__`메서드는 클래스에 괄호를 붙여서 인스턴스를 만들때 자동으로 호출된다.  
<br>
이렇게 init처럼 앞뒤로 __가 붙은 메서드는 파이썬이 자동으로 호출해주는 메서드이다.  

<br>
<br>

## self란

self는 인스턴스 자기자신을 의미한다.
```python
test = stack()
```
이렇게 인스턴스를 클래스명에 ()를 붙여서 만들었는데,  self에 자동으로 test가 들어가게 된다.  

<br>
<br>

## 메서드를 호출하면서 값을 입력받기

```python
def push(self,val): #삽입
        self.items.append(val)
```

```python
test.push(5)
print(test.items)
>>>[5]
```
가된다. self를 제외한 매개변수를 받아 메서드 내에서 사용할 수 있다!

<br>
<br>


## 비공개 속성 설정
```python
class stack:
    def __init__(self, val): #클래스의 개게생성함수.
            self.items = []
            self.__value = val
st = stack(5)

print(st.items)
>>> []
print(st.__value)
>>> AttributeError: 'stack' object has no attribute '__value'
```

속성에 __를 붙이게되면 비공개 속성으로 설정되어 클래스 바깥에서 접근할 수 없다.  
비공개클래스는 클래스 내부의 메서드에서만 사용가능하다.  

# 클래스 속성

클래스 속성은 인스턴스 속성과 달리  
클래스가 만든 모든 인스턴스에서 공유하게된다.  

```python
class stack():
    accumulatedtstack = []
    def __init__(self,val):
        self.items = []
        self.value = val
        self.items.append(val)
        stack.accumulatedtstack.append(val)


test1 = stack(5)
print(stack.accumulatedtstack)
print(test1.items)

test2 = stack(0)
print(stack.accumulatedtstack)
print(test2.items)

>>> [5]
>>> [5]
>>> [5,0]
>>> [0]
```
이렇게 클래스 속성의 경우, 각각 다른 인스턴스가 공유할 수 있다.  


## 속성, 메서드 이름을 찾는 순서





# 인스턴스 속성



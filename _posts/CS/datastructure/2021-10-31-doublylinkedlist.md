---
title:  "[Datastructure] 양방향 연결리스트"
excerpt: "파이썬 자료구조"

categories:
  - datastructurepy
tags:
  - [computer science, data structure, python, doubly linked list]

toc: true
toc_sticky: true
 
date: 2021-10-31
last_modified_at: 2021-10-31
---

# 양방향 연결 리스트란

1. 한방향 연결 리스트의 단점을 보완한다.
2. 한방향 연결 리스트의 경우, popback과 같은 리스트의 끝의 값을 찾는 연산으로 인해 시간복잡도가 O(N)이다.
3. 양방향 연결리스트는 각 노드가 next node와 prev의 노드정보를 담는다.
4. 따라서 한방향 연결리스트에 비해 시간복잡도가 크게 줄어든다.
5. head node와 tail node는 항상 None인 더미노드이다.

## 노드

1. key,next,prev의 세가지 정보를 기본적으로 담는다.
2. 양방향연결리스트의 기본 원칙은 빈 리스트라도 dummy node(None)이 있어야 한다는 것이다. 


```python
class Node: #노드클래스는 리스트의 헤드노드가 Nond이라는 dummy node를 염두에두고 설정한다.
    def __init__(self, key = None): #노드인스턴스 생성함수, 자동호출, key값 미설정시 None설정
        self.key = key #키값은 선언되는 키값이된다.
        self.next = self #미설정시, 자기자신
        self.prev = self #미설정시, 자기자신

    def __str__(self):
        return str(self.key)
```

# 양방향 연결리스트

```python
class Doublylinkedlist:
    def __init__(self):
        self.head = Node()
        self.size = 0

    def __iter__(self):
        v = self.head
        while v != None:
            yield v
            v = v.next
        
    def __str__(self):
        return "->".join(str(v) for v in self)
        
    def __len__(self):
        return self.size
```


## 지원연산

### splice(중요!)
splice(a,b,x)란  
a의 앞부터 b의 뒤 까지의 노드들을 떼어내어 x뒤에 붙이는 연산을 의미한다.  

1. ap는 a의 이전노드, bn은 b의 다음노드를 의미한다.
2. 총 6번의 연산이 필요하다.
3. 경우(1) a,b의 앞뒤로 원래 리스트의 연결을 바꾸는 cut연산(2)
4. 경우(2) a,b를 붙인paste 리스트에서 앞뒤로 링크를 수정(4)
5. 조건 1. a,b가 동일하거나 a 다음에 b가 와야한다.
6. 조건 2. head node와 x는 a,b사이에 존재하면 안된다.

```python
def splice(self, a, b, x):
    #경우(1) cut #| ap a .. .. b bn -> ap bn
    ap = a.prev
    bn = b.next

    ap.next = bn
    bn.prev = ap

    #경우(2) paste #| x xn -> x a .. .. .. b xn
    xn = x.next #원래 x의 다음 노드를 xn이라고 할당
    x.next = a
    a.prev = x

    xn.prev = b
    b.next = xn
```


### 이동연산

1. splice 연산을 활용해 이동, 삽입연산을 간단하게 만들 수 있다.
2. splice연산의 경우, (a,a,x)라면 단순히 a를 x앞뒤로 옮기는것에 불과하다.
3. 하지만 a가 Node(key)로 바뀌면, 키값을 가진 노드를 생성하므로, 새로운 노드를 생성해 x 앞뒤에 붙일 수 있게 된다.
4. pushfront,back의 경우, self.head가 더미노드로, 앞뒤로 리스트의 마지막값, 첫값을 가진다는 것을 이용한다.

```python
def moveAfter(self,a,x): #| ap a an | xp x xn 
    # -> |ap an| xp x a xn
    self.splice(a,a,x) #와 동일.
        

def moveBefore(self,a,x): #a를 x뒤로 붙이기
    self.splice(a,a,x.prev) #와 동일

def insertAfter(self, x, key): #새로운 노드를 생성해 x뒤에
    self.moveAfter(self, Node(key), x) #키로 노드를 생성하면 초기에prev,next가 자기자신이다.

def insertBefore(self, x, key):
    self.moveBefore(self, Node(key), x)

def pushfront(self, key):
    self.insertAfter(self, self.head, key) #self.head는 더미노드.self.head의 다음값은 리스트의 처음 값


def pushback(self, key):
    self.insertBefore(self, self.head, key) #self.head는 더미노드.self.head의 이전값은 리스트의 마지막값
```

# 참고자료
개인적인 공부를 위한 글이며, 모든 저작권은 신천수 교수님께 있습니다.  
자세한 강의 내용은 신천수 교수님 강의를 참고하시면 좋을 것 같습니다.  
😇 [신천수 교수님 자료구조 강의](https://www.youtube.com/c/ChanSuShin/featured)  
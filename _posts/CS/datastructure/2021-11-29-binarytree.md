---
title:  "[Datastructure] 이진트리"
excerpt: "파이썬 자료구조"

categories:
  - datastructurepy
tags:
  - [computer science, data structure, python, binarytree]

toc: true
toc_sticky: true
 
date: 2021-11-29
last_modified_at: 2021-11-29
---

# 참고 자료 
😇 [신찬수 교수님 자료구조 강의](https://www.youtube.com/c/ChanSuShin/featured)   

# 이진트리

## 정의
이진트리는 트리인데, 각 노드의 자식노드가 2개 이하인 트리이다.  
일반적으로 자식노드가 많으면 유용한데, 삽입,삭제연산이 복잡해지기때문에 이진트리를 가장 많이 사용한다.  
<br>
이진트리를 표현하는 방법 중에 리스트 또는 배열에 저장하는 방법을 배웠는데, 이런 자료구조를 heap이라고 배웠다.  
힙이라는 자료구조는 모양성질과 힙성질 모두 갖춰야하기때문에 `makeheap`이라는 함수를 구현했다. (python에서는 쉽게 heapq module사용가능)  
이렇게 배열상으로 나열을하면 메모리상에 낭비가 있었는데, 다른 표현법으로 노드와 링크를 직접적으로 표현하면 해결가능하다.  

<br><br>

## 표현

연결리스트를 공부했을때 노드, 링크를 표현했는데,  
이진트리를 노드와 링크로 부모링크, 왼쪽, 오른쪽 자식링크, 키값을 표현하면 직접적으로 표현할 수 있다.  
<img src="https://user-images.githubusercontent.com/76278794/143864541-71179a8c-0e2e-48f0-8370-6c048a30439e.jpeg" width="200"> 

<br>

또한, 이 노드에 다른 정보를 담고싶다면 key값 이외에 다른 값을 묶어서 넣을수도 있다.  



<img src= "https://user-images.githubusercontent.com/76278794/143864582-bfdf16c6-08ad-43b3-9157-cd0bc3842adb.jpeg" width="200">   

이런 이진트리를 노드를 이용해 표현하면

<br>


<img src="https://user-images.githubusercontent.com/76278794/143864622-764e19d3-faee-4751-8a51-9aefece43a4e.jpeg">  
이렇게 된다.


Binary 클래스가 각 노드들에 대해 insert, find, delete 등의 연산을 해야하기 때문에 Node클래스는 Binary 클래스의 하위 클래스가 되어야한다.  

<br><br>

## 노드클래스 정의

```python
class Node: #초기값은 None
    def __init__(self,key=None,parent=None,left=None,right=None):
        self.key = key
        self.parent = parent
        self.left = left
        self.right = right

        #print시 출력할 것
    def __str__(self):
        return str(self.key)
```

<br><br>

## 순회

Binary클래스에서 선언된 노드들의 key값을 모두 출력하고 싶을때는 어떻게 해야할까?  

Binary tree에서 각 노드들에 방문하는 일정한 규칙을 `순회(traversal)`이라고 한다.  

순회방법에는 일반적으로 3가지가 존재한다.

    preorder (MLR방식)
    inoder (LMR방식)
    postorder (LRM)

여기서 M,L,R은 각각 자기자신, 왼쪽자식노드, 오른쪽자신노드를 의미한다.  

이 방식은 각 노드들에서 `재귀적`으로 적용한다.  



preorder방식
<img src="https://user-images.githubusercontent.com/76278794/143872059-1d1bd055-56b0-431d-b92d-60e365378e17.jpeg" width="300">

<br>

inorder방식
<img src="https://user-images.githubusercontent.com/76278794/143869925-ea371da3-24d1-4d8e-b22e-433533db915c.jpeg" width="300">

<br>

postorder방식
<img src="https://user-images.githubusercontent.com/76278794/143870344-329974b9-ddfa-43d8-b05d-326812d881ea.jpeg" width="300">


## preorder 메서드 구현

```python
def preorder(self):
    if self != None:
        print(self.key) #M

        if self.left: #L
            self.left.preorder()

        if self.right: #R
            self.right.preorder()
```

재귀적으로 preorder 메서드를 호출한다.  
print문의 위치에 따라 MLR인지, LMR인지, LRM인지로 나뉜다.  


+) 만약에 이 세가지 순회 중에서 2가지 순회가 주어진다면 이진 트리를 복원할 수 있다.


<br><BR>

# 이진탐색트리

이진트리에서 search를 효율적으로 하기위한 자료구조이다.  
영어로 `Binary Search Tree`, `BST`라고 부른다

이진탐색트리를 만들기 위해서는
    
    1. 각 노드의 왼쪽 subtree의 키값은 부모노드의 key값보다 작거나 같아야한다. 
    2. 오른쪽 subtree의 키값은 노드의 key값보다커야한다. 

위 조건이 갖춰져야한다.  

이 조건을 만족하게되면, 각 부모노드를 기준으로 작은 값들이 왼쪽subtree에, 큰 값들이 오른쪽subtree에 저장된다.  

이렇게 저장되면 찾고싶은 값을 찾기위한 시간복잡도가 `트리의 높이`에 따라 달라진다.

<img src="https://user-images.githubusercontent.com/76278794/143902580-24a18dea-6c7b-498c-b981-b31a0c342afb.jpeg">

    search(19)
    15 -> 19는 15보다 크므로 오른쪽 subtree로
    20 -> 19는 20보다 작으므로 왼쪽 subtree로
    17 -> 19는 17보다 크므로 오른쪽 subtree로
    19 -> search complete

    search(5)
    15 -> 5는 15보다 작으므로 왼쪽 subtree로
    4 -> 5는 4보다 크므로 오른쪽 subtree로
    오른쪽 subtree None -> 찾고자하는 값 없음


## BST클래스 정의 코드

BST 클래스를 선언해 BST클래스의 메서드를 선언해야한다.  
BST 클래스는 root와 size정보, 이터레이터를 정의하자.

```python
class BST:
    def __init__(self):
        self.root = None
        self.size = 0
    
    def __len__(self):
        return self.size

    def __iter__(self):
        return self.root.__iter___() 
```

<br><Br>

## find_loc함수 구현  



BST에서 search나 insert를 하기위해서는 현재 찾고자하는 키값이 어디있는지 찾아야한다. 이를 `find_loc()`메서드로 구현한다.  

만약 key값 노드가 있다면 해당 노드를 리턴하고,  
없다면 그 노드가 삽입되어야하는 부모노드를 리턴한다.  

<br>

`find_loc()`은 search연산에서는 리턴값이 search값과 같다면 그 노드가 있는 것이고, 리턴값이 부모노드라서 search값과 다른 경우에는 그 노드가 없는 것이다.  


insert연산에서는 리턴값이 insert값과 같다면 이미 있는 값이고, 다르다면 부모노드가 리턴된 것이므로 해당 부모노드의 자식노드로 insert값을 삽입한다. 

<br>

```python
def find_loc(self,key):
    #트리 크기가 0일때
    if self.size == 0:
        return None

    # 부모노드부터 find시작
    p = None
    v = self.root

    while v: #v에 값이 있어야함
        #v의 key값이 찾고자하는 key값과 같으면 해당노드리턴
        if v.key == key:
            return v

        #다르면 p에는 현재노드를, v에는 key값과 비교해 left or right 부여
        elif v.key < key:
            p = v
            v = v.right
        else:
            p = v
            v = v.left
    
    #while문에서 return되지 않으면 p에 leaf(트리의 끝부분)이 저장되어있다.
    return p 
```

<br><br>

## search연산

```python
def search(self,key):
    #p에는 
    #find_loc으로 찾았다면 해당키의 현재 노드가,
    #찾지 못했다면 해당키가 들어가야하는 부모노드가 할당
    p = self.find_loc(key)

    #p에 찾은 key의 노드가 들어가있다면 p.key == key
    if p.key == key:
        #해당 노드 리턴
        return p

    #p에 부모노드가 할당되어 p.key가 매개변수 key와 다르다면    
    else:
        #None리턴
        return None
```

<br><br>

## insert연산 

```python
def insert(self,key):
    #search와 동일
    p = self.find_loc(key)

    #p가 None이라면 BST가 비어있는 경우라서 추가해야만하는 경우
    #p.key와 key가 다르다면 p에는 새로운 key를 만들 부모노드가 할당
    #즉, insert 하는 경우
    if p == None or p.key != key:
        #해당 key로 새로운 노드 선언
        v = Node(key)
        
        #p가 None이라면 BST의 root노드를 새로 정의해줘야함
        if p == None:
            self.root = v

        else:
            #새로운 노드의 부모를 p로 설정
            v.parent = p

            #부모노드와 새로운노드의 key를 비교해 연결
            if p.key >= key:
                p.left = v
            else:
                p.right = v
        
        #insert 성공시, BST의 크기 1 증가
        self.size += 1

    # BST가 비어있지 않으면서 p.key와 key가 같다면
    # BST에 이미 insert하고자하는 key값이 존재하는 것
    # 즉, insert하지 않는경우
    else:
        print('key is already in tree")
        # p에 insert하고자하는 key값의 노드가 할당되어있음
        # 중복허용하지 않으면 return None
        return p
```



## delete연산

삭제방법은 `merging`,`copying`의 2가지 버전이 있다.  

<br>

### merging

<br>

x라는 노드를 지울때, x노드가 가진 키값을 찾아야하는데, `find_loc`함수로 키값의 위치를 찾아 `merging`함수에 넘겨주면된다.  

없애고나서가 문제인데, 삭제하고자하는 노드가 leaf노드가 아닌경우, 연결된 subtree노드들의 부모노드를 다시 설정해주어야한다.  

여기서 `merging`과 `copying`의 차이가 생기는데, merging은 삭제된 노드의 왼쪽 subtree를 삭제된 노드의 위치로 옮기고, 왼쪽 subtree에서 가장 큰 노드 m의 오른쪽 자식 노드로 오른쪽 subtree를 연결한다.  

<img src="https://user-images.githubusercontent.com/76278794/143970631-14bcd2ea-a096-481c-a3a8-845761a9c4d7.jpeg">



위 방식을 적용할때 2가지 경우로 나뉜다.  

1. 삭제할 x가 루트노드인 경우

left subtree에서 가장 큰 값 m의 right subtree로 삭제한 x의 right subtree가 위치한다. 그리고 left subtree의 최상단 노드가 새로운 root 노드가 된다.  

만약 left subtree가 None이라면 x의 right subtree가 새로운 루트가되고, right subtree의 최상단 노드가 새로운 root 노드가 된다.

<br>

2. 삭제할 x가 루트노드가 아닌경우

x의 부모노드에 left subtree를 연결한다. 그리고 left subtree에서 가장 큰값 m에 right subtree를 연결한다.  

만약 left subtree가 None이라면 right subtree가 x의 부모노드에 직접 연결된다.



코드  
```python
def deleteByMerging(self, x):
    a = x.left
    b = x.right
    pt = x.parent
    #c =  #x 자리를 대체할 노드
    #s =  #Left에서 가장 큰 노드

    #left subtree가 None일때
    if a == None:
        #x자리에 right subtree b를 직접 넣는다.
        c = b
        #
        s = pt

    #left subtree가 None이 아닐때
    else:
        c = a

        #a에서 가장 큰 key값 가진 노드 m 찾기
        m = a
        while m.right:
            m = m.right
        
        # right subtree가 존재한다면 
        if b:
            # b와 m을 연결
            b.parent = m
            m.right = b
        
        s = m



```




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






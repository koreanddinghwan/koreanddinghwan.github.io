---
title:  "[Datastructure] 균형이진탐색트리"
excerpt: "파이썬 자료구조"

categories:
  - datastructurepy
tags:
  - [computer science, data structure, python, BST]

toc: true
toc_sticky: true
 
date: 2021-11-30
last_modified_at: 2021-11-30
---

# 참고 자료 
😇 [신찬수 교수님 자료구조 강의](https://www.youtube.com/c/ChanSuShin/featured)  



# 균형이진탐색트리

## 개요
앞에서 이진탐색트리를 공부할때, 각 노드마다 left subtree의 키값들이 right subtree의 키값보다 작다는게 보장되었다.  

이진탐색트리에서 연산은 find_loc 함수를 이용하기때문에 O(h) 시간복잡도를 가진다.  
따라서 탐색을 효율적으로 하기위해서는 트리의 높이 h를 최소화해야한다는 결론이 나온다.  

트리의 높이를 최소화하기 위해서는 앞서 공부했던 `heap의 모양성질`을 만족해야한다는 결론이 나온다.  
이를 만족하면 트리의 높이는 최소 log(n+1)이 된다.  

따라서 균형이진탐색트리는 이진트리를 구성할때, 트리의 높이를 log(n+1)에 가깝게 유지한다.  

균형이진탐색트리의 종류에는 AVL트리, Red-Black트리, (2,3,4)트리, Splay 트리 등이 있다.

이 트리들은 트리의 높이가 log(n)를 유지하도록 강제하며 탐색연산이 O(logN)에 가깝도록한다.

<br><br>

## Rotation

균형이진탐색트리가 트리의 높이를 유지하는 방법으로 Rotation을 사용한다.  

1. left rotation과 right rotation은 서로 대칭적이다.  
2. BST의 순서는 변하지 않는다.  

<img src="https://user-images.githubusercontent.com/76278794/143992769-2d83c4b8-1f93-44f4-b07d-acee00ef6341.jpeg">

rotation을 사용하면 회전기준이 되는 노드를 기준으로 양쪽 subtree의 균형을 조정할 수 있다.  
rotation을 한번 혹은 여러번 사용해 tree의 높이를 logN에 가깝게 유지하자.  

<br><br>

### rotation 함수 구현
```python
def rotateRight(self, z):
    #z가 None일때
    if z == None:
        return 
    
    #x가 None일때
    if x == None:
        return
    
    #b에 x의 오른쪽 subtree할당
    b = x.right
    #x의 parent로 z의 parent할당 <1>
    x.parent = z.parent
    #z의 parent가 None이 아니라면 parent에서 x로 가는 링크 수정해줘야한다.
    if z.parent:
        #z의 parent 기준으로 z가 왼쪽에 있다면<2>
        if z.parent.left == z:
            z.parent.left = x
        #z의 parent 기준으로 z가 오른쪽에 있다면<2>
        else:
            z.parent.right = x

    #링크수정 <3>
    x.right = z
    #<4>
    z.parent = x
    #<5>
    z.left = b

    #b가 None이 아니라면<6>
    if b:
        b.parent = z

    #z가 root노드였다면
    if self.root == z:
        self.root = x
```
rotationLeft도 동일하게 구현한다.
<br><br>

# AVL 트리

모든 노드에 대해서 노드의 왼족 부르티와 오른쪽 부트리의 높이차가 1 이하인 BST를 의미한다.  



<br><br>

# Red-Black 트리

<br><br>

# 2,3,4 트리

<br><br>

# Splay 트리



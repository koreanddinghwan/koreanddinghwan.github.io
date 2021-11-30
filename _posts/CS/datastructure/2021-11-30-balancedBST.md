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
[8iggy님 블로그](https://8iggy.tistory.com/111)
[geeksforgeeks](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/)


# 균형이진탐색트리

## 균형이진탐색트리를 사용하는 이유
앞에서 이진탐색트리를 공부할때, 각 노드마다 left subtree의 키값들이 right subtree의 키값보다 작다는게 보장되었다.  

이진탐색트리에서 대부분의 연산은 find_loc 함수를 이용하기때문에 O(h) 시간복잡도를 가진다.  
따라서 탐색을 효율적으로 하기위해서는 트리의 높이 h를 최소화해야한다는 결론이 나온다.  

트리의 높이를 최소화하기 위해서는 앞서 공부했던 `heap의 모양성질`을 만족해야한다는 결론이 나온다.  
이를 만족하면 트리의 높이는 최소 log(n+1)이 된다.  

따라서 균형이진탐색트리는 이진트리를 구성할때, 트리의 높이를 log(n+1)에 가깝게 유지한다.  

균형이진탐색트리의 종류에는 AVL트리, Red-Black트리, (2,3,4)트리, Splay 트리 등이 있다.

이 트리들은 트리의 높이가 log(n)를 유지하도록 강제하며 연산이 `O(logN)`에 가깝도록한다.

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

 모든 노드에 대해서 노드의 왼족 부트리와 오른쪽 부트리의 높이차가 1 이하인 BST를 의미한다.  

<img src = "https://user-images.githubusercontent.com/76278794/143999515-05d2e9f3-c424-472b-960a-c94b49bbb5c5.png">

![image](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/AVL_Tree_Example.gif/220px-AVL_Tree_Example.gif)
<br><br>

## AVL트리의 높이 증명

Nh를 높이가 h인 AVL 트리 중, 최소 노드의 개수로 정의한다.  

<img src="https://user-images.githubusercontent.com/76278794/144005404-1b52758b-ecdb-45c4-b747-6a63967e58f9.jpeg">

규칙성을 찾을 수 있는데, 피보나치 수열과 비슷하다.  
1,2,4로 시작하는 피보나치 수열이다.

<br>

<img src="https://user-images.githubusercontent.com/76278794/144005500-f80194d3-d9bb-484c-b599-56dc3d28c55f.jpeg">
부등식의 성질을 이용해 O(h) <= O(logN) 임이 증명된다. 

<br><br>

## AVL트리 클래스

Node 클래스에서 각 노드 자기자신의 `높이` 정보가 저장되어야한다.  
```python
class TreeNode(object):
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1
```

AVL클래스는 BST클래스를 부모클래스로 상속받아 사용하는데, BST클래스에서 insert, delete, search 연산을 정의해두었기 때문에 이 메서드들을 상속받아 사용할 수 있다.  

하지만 insert나 delete같은 노드의 위치가 변하는 메서드에서 높이 정보가 변경되어야하기에 `메서드 오버라이딩`을 통해 insert, delete연산을 새로 정의한다.  

또한, 원래 파이썬에서는 상속한 클래스의 메서드를 호출하기 위해서는 상속받은 클래스 내에서 기반클래스의 __init__메서드를 `super.__init__()`으로 호출해주어야한다.  

하지만 아래의 경우, AVL클래스의 __init__메서드가 호출되지 않아 파이썬이 자동으로 기반클래스 BST의 __init__메서드를 호출하므로  
`super.__init__`을 호출할 필요가 없다. 
[파이썬 클래스 상속](https://koreanddinghwan.github.io/pythonsyntax/inheritance/)

<br><br>

## AVL트리 삽입연산

```python
class AVL(BST):
    def insert(self,key):
        #BST의 insert함수 호출
        v = super(AVL,self).insert(key)
```

<br>

### BST의 insert메서드의 균형문제

AVL클래스에서 BST클래스의 insert함수가 호출되었으므로 이 값이 무슨 값을 가지는지 알아야한다.  

BST의 insert함수
```python
def insert(self,key):
    p = self.find_loc(key)
    if p == None or p.key != key:
        v = Node(key)
        if p == None:
            self.root = v
        else:
            v.parent = p
            if p.key >= key:
                p.left = v
            else:
                p.right = v
        self.size += 1
        return v
    else:
        print('key is already in tree")
        return p
```

1. BST의 insert함수의 경우, insert했으면 v가, insert하지 못한다면 p가 리턴된다.  
2. p에는 insert되어야하는 부모노드가 할당된다.
3. v에는 insert에 성공한, 부모노드와 연결된 새로운 노드 v가 할당된다.

BST클래스의 insert메서드는 트리의 높이를 최소화하는 것에 관심이 없고,  
root부터 타고 내려와서 가장 빠르게 값을 insert할 수 있는 것에만 관심이있다.  
이때, 양쪽 트리의 `balance`가 깨진다면 트리의 높이를 균형맞춰주는 Rebalance가 필요하다.  

<br><br>

### Rebalance

rebalance는 `insert된 노드의 부모노드를 타고 올라가면서 자식노드의 균형을 맞추면된다.`  

균형을 맞춰야하는 기준을 수식으로 표현하면  

    left subtree height – right subtree height = BF

좌변의 식을 균형인수 `Balance Factor, BF`라고 부른다.  

균형인수가 중요한 이유는 균형인수에 따라 rotation으로 서브트리의 높이를 맞춰줄 수 있기 때문이다.  

<br><br>

### rotation 순서

삽입된 노드에서 root노드까지타고 올라가면서 
a)AVL에서 처음으로 균형이 깨진 노드를 z라고한다.  
b)z의 child를 y라고 한다. (left child or right child)
c)y의 child를 x라고한다. (left child or right child)

위의 경우에 따라 4가지 case중 하나가 된다.  

<br>

1) left-left

```
T1, T2, T3 and T4 are subtrees.
         z                                      y 
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \ 
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
```

2) left-right
```
     z                               z                           x
    / \                            /   \                        /  \ 
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2
```

3) right-right
```
  z                                y
 /  \                            /   \ 
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
```

4) right-left
```
   z                            z                            x
  / \                          / \                          /  \ 
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
```

각 경우에 맞게 rebalance 함수를 호출한다.(경우에 맞는 rotation을 호출)

<br><br>

### code(geeksforgeeks)

```python
# AVL트리

# 노드클래스 정의
class TreeNode(object):
	def __init__(self, val):
		self.val = val
		self.left = None
		self.right = None
		self.height = 1

#AVL트리 정의(max-AVL)
class AVL_Tree(object):

	#재귀함수 형태로 구현
	def insert(self, root, key):
	
		# Step 1 - 일반적인 BST에서 삽입
		if not root: #root가 없다면(트리가 비어있다면)
			return TreeNode(key)
        
        
		elif key < root.val: #재귀함수로 호출하며 알맞은 자리를 찾아간다.
			root.left = self.insert(root.left, key)
		else:
			root.right = self.insert(root.right, key)

        ##여기서 노드가 알맞은 자리를 찾아가있음

		# Step 2 - 재귀함수로 호출된 노드들에 대해 높이가 각각 1씩 증가한다.
        #자리 찾으며 내려오면서 높이를 1씩 증가시키면서 내려온다.
		root.height = 1 + max(self.getHeight(root.left),
						self.getHeight(root.right))

		# Step 3 - 균형인수구하기
		balance = self.getBalance(root)

		# Step 4 - 각 케이스에따라 rotation실행
		# Case 1 - Left Left
		if balance > 1 and key < root.left.val:
			return self.rightRotate(root)

		# Case 2 - Right Right
		if balance < -1 and key > root.right.val:
			return self.leftRotate(root)

		# Case 3 - Left Right
		if balance > 1 and key > root.left.val:
			root.left = self.leftRotate(root.left)
			return self.rightRotate(root)

		# Case 4 - Right Left
		if balance < -1 and key < root.right.val:
			root.right = self.rightRotate(root.right)
			return self.leftRotate(root)

		return root

	def leftRotate(self, z):

		y = z.right
		T2 = y.left

        # rotation 실행
		y.left = z
		z.right = T2

		# 높이 증가
		z.height = 1 + max(self.getHeight(z.left),
						self.getHeight(z.right))
		y.height = 1 + max(self.getHeight(y.left),
						self.getHeight(y.right))

		# 새로운 root 리턴
		return y

	def rightRotate(self, z):

		y = z.left
		T3 = y.right

		# rotation 실행
		y.right = z
		z.left = T3

		#  높이 증가
		z.height = 1 + max(self.getHeight(z.left),
						self.getHeight(z.right))
		y.height = 1 + max(self.getHeight(y.left),
						self.getHeight(y.right))

		# 새로운 root 리턴
		return y

	def getHeight(self, root):
		if not root:
			return 0

		return root.height

	def getBalance(self, root):
		if not root:
			return 0

		return self.getHeight(root.left) - self.getHeight(root.right)

	def preOrder(self, root):

		if not root:
			return

		print("{0} ".format(root.val), end="")
		self.preOrder(root.left)
		self.preOrder(root.right)
```


## AVL트리 삭제연산

BST클래스에서 delete연산을 구현했다.  
delete연산 이후에 발생하는 불균형은 insert와 비슷하게 구현할 수 있다.(4 경우 중 1이기 때문이다.)  

1) BST delete로 노드v를 삭제
2) v로부터 부모노드를 따라가며 불균형노드를 찾는다. 처음으로 나타난 불균형노드z, z의 자식노드 중 높은 높이를 가진 노드y, y의 자식노드 중 높은 높이를 가진 노드z를 찾는다. 
3) insert처럼 4가지 경우로 나뉜다.

a) left-left
```
    T1, T2, T3 and T4 are subtrees.
         z                                      y 
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \ 
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
```

b) left-right
```
     z                               z                           x
    / \                            /   \                        /  \ 
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2
```

c) right-right 
```
z                                y
 /  \                            /   \ 
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
```

d) right-left
```
   z                            z                            x
  / \                          / \                          /  \ 
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
```

4) insert와는 다르게 rotation을 실시한 이후에도 균형이 안맞는 경우가 생길 수 있다.  

<br><br>

### insert의 rotation과 다른점

`왜냐하면 z의 조상노드도 균형인수가 1보다 작아야하기 때문이다.`

rotation을 실행하면, z노드를 기준으로 rotation을 하기때문에 z를 root로하는 subtree의 균형은 맞춰졌지만,  
균형을 잡으며 subtree의 전체 높이가 1 감소했기 때문이다.  
z의 부모노드를 w라고 했을때, w의 left subtree height가 5, z의 height가 4였다면  
delete이후에 z를 root로하는 subtree의 균형을 맞췄다고 하더라도, 균형을 맞춘 subtree의 height가 1 줄어들어서 w의 균형이 맞지 않게된다.  

예시) <img src="https://user-images.githubusercontent.com/76278794/144099675-f89c4cee-dec5-459b-82cc-972a39305dad.jpeg">


따라서 루트까지 올라가면서 균형을 맞추는 연산을 해야하는데, 이 과정이 O(logn)회전을 요구한다.

`insert에서 이 문제가 발생하지 않는 이유는,  
insert에서는 insert된 노드를 갖는 tree들의 높이가 1 높아지기 때문에 rotation으로 높이가 1 낮아져도 상쇄되기 때문이다. ` 


<br><br>

### code
```python
# Python code to delete a node in AVL tree
# Generic tree node class
class TreeNode(object):
	def __init__(self, val):
		self.val = val
		self.left = None
		self.right = None
		self.height = 1

# AVL tree class which supports insertion,
# deletion operations
class AVL_Tree(object):

	def insert(self, root, key):
		
		# Step 1 - Perform normal BST
		if not root:
			return TreeNode(key)
		elif key < root.val:
			root.left = self.insert(root.left, key)
		else:
			root.right = self.insert(root.right, key)

		# Step 2 - Update the height of the
		# ancestor node
		root.height = 1 + max(self.getHeight(root.left),
						self.getHeight(root.right))

		# Step 3 - Get the balance factor
		balance = self.getBalance(root)

		# Step 4 - If the node is unbalanced,
		# then try out the 4 cases
		# Case 1 - Left Left
		if balance > 1 and key < root.left.val:
			return self.rightRotate(root)

		# Case 2 - Right Right
		if balance < -1 and key > root.right.val:
			return self.leftRotate(root)

		# Case 3 - Left Right
		if balance > 1 and key > root.left.val:
			root.left = self.leftRotate(root.left)
			return self.rightRotate(root)

		# Case 4 - Right Left
		if balance < -1 and key < root.right.val:
			root.right = self.rightRotate(root.right)
			return self.leftRotate(root)

		return root

	# Recursive function to delete a node with
	# given key from subtree with given root.
	# It returns root of the modified subtree.
	def delete(self, root, key):

		# Step 1 - Perform standard BST delete
		if not root:
			return root

		elif key < root.val:
			root.left = self.delete(root.left, key)

		elif key > root.val:
			root.right = self.delete(root.right, key)

		else:
			if root.left is None:
				temp = root.right
				root = None
				return temp

			elif root.right is None:
				temp = root.left
				root = None
				return temp

			temp = self.getMinValueNode(root.right)
			root.val = temp.val
			root.right = self.delete(root.right,
									temp.val)

		# If the tree has only one node,
		# simply return it
		if root is None:
			return root

		# Step 2 - Update the height of the
		# ancestor node
		root.height = 1 + max(self.getHeight(root.left),
							self.getHeight(root.right))

		# Step 3 - Get the balance factor
		balance = self.getBalance(root)

		# Step 4 - If the node is unbalanced,
		# then try out the 4 cases
		# Case 1 - Left Left
		if balance > 1 and self.getBalance(root.left) >= 0:
			return self.rightRotate(root)

		# Case 2 - Right Right
		if balance < -1 and self.getBalance(root.right) <= 0:
			return self.leftRotate(root)

		# Case 3 - Left Right
		if balance > 1 and self.getBalance(root.left) < 0:
			root.left = self.leftRotate(root.left)
			return self.rightRotate(root)

		# Case 4 - Right Left
		if balance < -1 and self.getBalance(root.right) > 0:
			root.right = self.rightRotate(root.right)
			return self.leftRotate(root)

		return root

	def leftRotate(self, z):

		y = z.right
		T2 = y.left

		# Perform rotation
		y.left = z
		z.right = T2

		# Update heights
		z.height = 1 + max(self.getHeight(z.left),
						self.getHeight(z.right))
		y.height = 1 + max(self.getHeight(y.left),
						self.getHeight(y.right))

		# Return the new root
		return y

	def rightRotate(self, z):

		y = z.left
		T3 = y.right

		# Perform rotation
		y.right = z
		z.left = T3

		# Update heights
		z.height = 1 + max(self.getHeight(z.left),
						self.getHeight(z.right))
		y.height = 1 + max(self.getHeight(y.left),
						self.getHeight(y.right))

		# Return the new root
		return y

	def getHeight(self, root):
		if not root:
			return 0

		return root.height

	def getBalance(self, root):
		if not root:
			return 0

		return self.getHeight(root.left) - self.getHeight(root.right)

	def getMinValueNode(self, root):
		if root is None or root.left is None:
			return root

		return self.getMinValueNode(root.left)

	def preOrder(self, root):

		if not root:
			return

		print("{0} ".format(root.val), end="")
		self.preOrder(root.left)
		self.preOrder(root.right)

```

# Red-Black 트리

<br><br>

# 2,3,4 트리

<br><br>

# Splay 트리


  
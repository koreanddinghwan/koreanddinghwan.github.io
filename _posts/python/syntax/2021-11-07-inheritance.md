---
title:  "[Python 문법공부] 클래스 상속"
excerpt: "클래스 상속과 추상 클래스"

categories:
  - pythonsyntax
tags:
  - [python, syntax, class, inheritance]

toc: true
toc_sticky: true

date: 2021-11-07
last_modified_at: 2021-11-07
---




# 클래스 상속

클래스 상속이란 파생클래스가 기반클래스의 기능을 상속한다는 의미이다.  
클래스 상속을 사용하면 클래스간 중복되는 코드를 작성하지 않아도 되어  
코드의 재사용성이 높다.  

    기반클래스 = 부모클래스 = 슈퍼클래스  
    파생클래스 = 자식클래스 = 서브클래스  

```python
class superclass:
    def supergreeting(self):
        print('hello im superclass')

class subclass(superclass): #파생클래스가 기반클래스를 상속
    def subgreeting(self):
        print('im subclass')

sub = subclass()
```
위 코드에서 sub.supergreeting()을 실행하면 기반클래스의  
print('hello im superclass') 가 실행된다.  
<br>




## 상속관계

클래스의 상속관계를 확인하기 위해서는 

    issubclass(subclass,superclass)

함수를 이용해 파악한다.  
상속관계는 is-a 관계라고 부르기도 한다.


## 포함관계

```python
class Person:
    def greeting(self):
        print('안녕하세요.')
 
class PersonList:
    def __init__(self):
        self.person_list = []    # 리스트 속성에 Person 인스턴스를 넣어서 관리
 
    def append_person(self, person):    # 리스트 속성에 Person 인스턴스를 추가하는 함수
        self.person_list.append(person)

a = Person() #a라는 사람 인스턴스 선언
lst = PersonList() #lst라는 인스턴스 선언.
lst.append_person(a) #lst 인스턴스에 a라는 사람인스턴스를 추가
lst.person_list[0].greeting() #lst인스턴스에서 접근가능
```

여기선 PersonList의 인스턴스 속성인
self.person_list에 매개변수로 다른 클래스의 인스턴스를 만들어 넣는 것이기 때문에 포함관계이다.  
포함관계는 has-a관계라고 부르기도한다.

<br>
<br>

## super()

```python
class Person:
    def __init__(self):
        print('Person __init__')
        self.hello = '안녕하세요.'
 
class Student(Person):
    def __init__(self):
        print('Student __init__')
        self.school = '파이썬 코딩 도장'

james = Student()
```


james는 Person 클래스를 상속한 student의 인스턴스이다.  
따라서 student클래스의 self.school은 호출이 가능하다.  
<br>
하지만 student클래스가 상속한 Person클래스의 속성 self.hello는 사용이 불가능하다.  

그 이유는 james 인스턴스가 만들어지면서 자동으로 __init__메서드가 실행되면서  
self.school의 명령어가 실행됐지만, person클래스의 __init__메서드는 실행되지 않아  
self.hello명령어가 실행되지 않았기 때문이다.  

상속한 클래스의 __init__메서드를 호출하기 위해서는  
파생클래스에서 

    super().__init__()
을 실행해줘야한다.  
super()는 기반클래스를 의미한다.  

<br>
단 파생 클래스에 __init__메서드가 존재하지 않는다면  
파이썬은 자동으로 기반클래스에서 __init__메서드를 호출하기 때문에 
super()를 사용할 필요가 없다.

<br>
<br>

# 메서드 오버라이딩

메서드 오버라이딩은 기반클래스의 함수명을 유지하면서 파생클래스에 함수를 덮어쓰기를 하는 것을 의미한다.  

메서드 오버라이딩을 하는 이유로는 함수명을 일관적으로 유지함으로써 유지보수를 용이하게하기 위함이다.  

```python
class Person:
    def greeting(self):
        print('안녕하세요.')
 
class Student(Person):
    def greeting(self):
        print('안녕하세요. 저는 파이썬 코딩 도장 학생입니다.')
 
james = Student()
james.greeting()
```
위 코드에서는 파생클래스의 greeting이 실행된다.  

<br><br>

# 다중상속

말 그대로 파생클래스를 만들 때, 여러개의 기반클래스를 상속하는 개념이다.  

파생클래스의 매개변수로 기반클래스를 넣어주면된다.

```python
class A:
    def greeting(self):
        print('안녕하세요. A입니다.')
 
class B(A):
    def greeting(self):
        print('안녕하세요. B입니다.')
 
class C(A):
    def greeting(self):
        print('안녕하세요. C입니다.')
 
class D(B, C):
    pass
 
x = D()
x.greeting()    # 안녕하세요. B입니다
```

다중 상속의 문제점은 파생클래스와 기반클래스간 관계가 다이아몬드 형태로 이루어질때이다.   

greeting이라는 메서드를 호출해야하는데, 어느 클래스에서 greeting 메서드를
호출해야할까?  


<br>

파이썬에서는 이럴 때 mro(Method Resolution Order)
를 따른다.  
D.mro()를 실행해보면 

    [<class '__main__.D'>, <class '__main__.B'>,
    <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]

이렇게 출력되는 것을 볼 수 있다.  

메서드를 찾는 순서는 자기자신 D, 그리고 클래스 선언 시 괄호의 왼쪽부터
B,C 그리고 이들의 기반클래스 A이다.  

여기서 object클래스란 파이썬의 모든 클래스의 조상인데, 파이썬 3에서는 모든 클래스가 object 클래스를 기본적으로 상속받기에 object를 생략한다.  
그래서 우리가 클래스를 만들때 괄호없이 만들 수가 있었던 것이다.

<br><br>

# 추상 클래스

추상 클래스는 파생 클래스가 반드시 만들어야하는 메서드를 강제한다.  
추상클래스는 말그대로 '추상'이기때문에 인스턴스를 만들지 못한다.  
따라서 인스턴스 메서드를 호출할 일도 없기 때문에 메서드는 빈 상태로 둔다.


```python
from abc import *
 
class StudentBase(metaclass=ABCMeta):
    @abstractmethod
    def study(self):
        pass
 
    @abstractmethod
    def go_to_school(self):
        pass
 
class Student(StudentBase):
    def study(self):
        print('공부하기')
 
james = Student()
james.study()
```

이 코드에서 james = Student()는 오류가 발생한다.  
파생클래스인 Student클래스가 상속하는 StudentBase가 추상클래스로 선언되어 있는데,  
추상클래스에서 강제된 메서드 중, go_to_school 이란 메서드를  
파생 클래스인 Student클래스에서 구현하지 않았기 때문이다.  
---
title:  "[Python 문법공부] 모듈, 패키지"
excerpt: "모듈과 패키지의 사용"

categories:
  - pythonsyntax
tags:
  - [python, syntax, module, package]

toc: true
toc_sticky: true

date: 2021-11-02
last_modified_at: 2021-11-02
---

# 모듈
관련이 있는, 변수 클래스 함수등 파이썬 구성요소를 모아놓은 파일이다.   
작성 중인 파일에서 다른 파일의 어떠한 변수, 클래스, 함수들을 가져올 수 있다.    

sys, math, random 등의 모듈들은 빌트인 모듈로 파이썬에서 기본적으로 제공하는 모듈들이다.   
그래서 `print(sys.path)`를 해보면 파이썬이 모듈을 불러오는 경로가 문자열형태로 리스트화되어있는 것을 볼 수 있다.   
이런 모듈의 경로를 따라 우리가 파일 안에서 import했을때, 모듈이 들어와지는 것이다.  

```python
import sys
print(sys.path)

>>>['/Users/ddinghwan/Documents/GitHub/lightbig/_posts/CS/datastructure', '/Library/Frameworks/Python.framework/Versions/3.9/lib/python39.zip', '/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9', '/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/lib-dynload', '/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages']
```
만약 import하고자하는 module이 위의 경로에 없다면 어떻게 경로를 추가할 수 있을까?  

<br><br>

## 상대경로로 모듈을 import하는 방법


현재 python을 실행하는 파일의 상대경로로 module의 디렉터리주소를 특정하면된다.  

import 파일명.파일명.. 이렇게 import가 쉽게 된다.  

파이썬은 패키지로 분할된 개별적인 모듈로 구성된다.   
기본적으로 알아야하는 것은 상대경로에 접근하기위해서는   
`../`로 부모디렉터리에, `./`로 현재 디렉터리의 주소를 생략해서 작성할 수 있다는 것이다.   

이렇게 모듈을 import하는 방법에는 여러가지가 있는데,  

1. 단순히 import a.b.c로 import
2. from a.b import c
3. from a.b import * #모든 모듈 import
4. from a.b import c as d #d라는 별칭으로 import


<br><br>

## sys.path에 디렉터리를 추가해 모듈을 import하는 방법
모듈의 path는 리스트로 만들어져있다.  
sys.path를 해보면 sys모듈의 경로가 주루룩 나오는데, 해당 경로로 우리는 모듈을 추가할 수 있다.   
sys.path는 리스트로 이루어져있으므로, sys.path.append 메서드로 모듈의 파일주소를 추가해주면된다.  
만약 mymodules폴더 안에 내 모듈이 들어가 있다면   
sys.path에 '/Users/ddinghwan/mymodules'을 추가하면 된다.   
그리고 `import 모듈명`으로 모듈주소를 추가해주면 이제 우리는 이 파일 안에 있는 모듈들을 사용할 수 있게 된다!   

다만, 파일을 새로 작성할때마다, 우리는 계속 이 주소를 `sys.path`에 추가해줘야한다는 단점이있다.   

이런 단점을 보완하기 위해서는 python path에 영구적으로 모듈위치를 등록해야하는데, 모듈 이름을 잘 못 지었다가는 영원히....다른 모듈 못 사용할수도있다.   
리스트의 특성상, 파일을 찾으면 그 뒤로는 검색하지 않기때문이다.   

가장 간단한 방법으로는 그냥 a라는 모듈을 기존 python path폴더에 넣는 방법이 있다.  

<br><br>

## __name__ 내장변수

자 그럼 모듈을 import했을때, 모듈 내의 있는 함수, 변수, 클래스등을 제외한    
명령어들을 불러오지않기위해서는 어떻게해야할까?  

파이썬은 모듈이 실행되는 위치를 `__name__` 내장변수를 이용해 구분한다.  

모듈파일에

```python
if __name__ == "__main__":
    명령어들
```

`__name__`은 현재 모듈의 이름을 담고있는 내장변수이다.  
직접 실행된 모듈의 경우(모듈파일 자체에서 실행된경우)-> `__main__`이라는 값을 가지게되며  
명령어들이 실행되는 반면에,   
다른 파일에서 직접실행되지 않은 import된 모듈은   
모듈의 `__name__`이 모듈의 모듈이름을 가지게된다.   

이렇게 모듈안에 명령어들이 들어가있으면 이 명령어들은  
파일을 실행하는 위치가 나 자신이 아니라면 실행되지 않는다!    
모듈을 만들때, 테스트코드를 위 조건문 아래에 위치시키면 효율적으로 프로그래밍을 할 수 있다.    

<br><br>

## package에 __init__.py가 있는 경우

`__init__.py`는 import로 패키지 디렉터리를 불러올때 가장 먼저 실행되는 파일이다.  
이름 그대로 패키지를 초기화하는 역할을 한다.  

<br>

각 패키지마다 있는 __init__은 파이썬에게 패키지 안의 모듈이 import가능한 패키지라는 것을 인식시켜준다.   
단, 파이썬3.3부터는 없어도 패키지로 인식된다.    
하위호환을 위해서 작성하는 것을 추천한다.  
__all__ = ['모듈명'] 으로 선언되어있는데, 리스트 안에 import가 가능한 모듈들의 파일명들을 넣어야한다.   

또는 `__init__.py` 파일 내에서 from ~ import 문법으로 경롷상 import할 모듈을 선택할 수 있다.  
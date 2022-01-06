---
title: "[C] Hello world!"
excerpt: "C언어 맛보기"

categories:
  - c
tags:
  - [c, syntax]

toc: true
toc_sticky: true

date: 2022-01-06
last_modified_at: 2022-01-06
---

<br><br>

# HelloWorld로 시작.

```c
#include <stdio.h>

int main() {
    printf("Hello World!\n");
    return 0;
}
```

<br>

## include

괄호 안의 파일을 우리 프로그램으로 불러온다는 의미.  
해당 파일의 내요잉 컴파일할 때 우리 파일에 그대로 복사되어 불러와진다.  
stdio.h에 printf 함수가 정의되어있기 때문에 사용할 수 있는 것이다.

<br>

## int main() {}

main은 함수를 의미. main이라는 함수는 C프로그램이 처음으로 시작한는 부분이다.

컴파일러에 C언어로 코딩된 파일을 넣으면, main의 첫 번째 명령어의 주소값이 CPU의 명령어 레지스터값에 전달된다.

함수 앞의 int는 main()함수가 종료되면 정수형 값을 반환한다는 의미이다.

<br>

## printf

`standard input and output`, stdio 헤더파일 을 include 하고 있기에,  
이 파일 내의 printf 함수를 사용할 수 있다.

<br><br>

# 주석

```c
/* 요렇게
    선언가능 기본방식임.*/
```

한줄씩 선언하고 싶으면 `//`이렇게 선언할수도있는데, C99에 도입된 기능임.  
norminette에서는 거부할수도있음.

<br><br>

# 진수법

컴퓨터의 가장 기본단위는 1bit이다.

1bit는 0또는 1의 값을 나타낸다.(전기신호가 있으면1, 없으면0) 따라서 이는 이진법이라고 말할 수 있을 것이다.

그 다음 단위인 byte는 이 1bit가 8개 모인 것이다.

컴퓨터가 명령을 처리하는 방식, 그리고 변수들의 자료형들에 대해 공부하면서 십진법, 이진법, 16진법 이 3가지를 정말 많이 볼 것이다.

계산법은...중딩수학이니까 알아서 하세용~!

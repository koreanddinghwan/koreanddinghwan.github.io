---
title: "[C 문법공부] C언어 변수의 종류"
excerpt: "C언어 자료형태"

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

# 변수

<br>

## 변수란

컴퓨터는 데이터를 기억하기위해 메모리(RAM)에 전기적인 신호를 써 놓는다.

RAM은 32비트 CPU기준으로 4GB, 42억 bit만큼의 방을 가질 수 있다.  
통상적으로 32bit만큼의 수를 모두 쓰는 것이 힘들어서 16진법으로 주소값을 나타낸다.

<br>

## 변수선언

```c++
#include <stdio.h>
int main() {
    int a;
    a = 10;
    printf("a의 값은 : %d\n",a);
    return 0;
}
```

```bash
a 의 값은 : 10
```

여기서 변수가 선언된 곳은

```c++
int a;
```

이 명령어인데,  
a라는 변수에 int형의 자료를 보관하는 메모리를 할당하겠다는 의미이다.

<br>

## 자료형별 크기 및 범위

<br>

### 표

| 타입      | 크기  | 범위                                                |
| --------- | ----- | --------------------------------------------------- |
| char      | 1Byte | 1Byte => 8bit => 2^8 = 256, -128 ~ 127까지를 의미함 |
| short     | 2Byte | 16bit, 2^16 = 64436, -32768 ~ 32767                 |
| int       | 4Byte | 32bit, 2^32 = 4294967296, -2147483648 ~ 2147483647  |
| long      | 8Byte | 64bit, 2^64 = 18446744073709551616                  |
| long long | 8Byte | ''                                                  |
| float     | 4Byte | 32bit, 1.175494e-38~3.402823e+38                    |
| double    | 8Byte | 64bit, 2.225074e-308~1.797693e+308                  |

<br>

### sizeof연산자

```c++
#include <stdio.h>

int main() {

	char a;
	a = 127;
	a = sizeof(a);
	printf("size of char a : %d\n",a );

	short c;
	c = 1;
	c = sizeof(c);
	printf("size of short c : %d\n",c);

	int d;
	d = 32767;
	d = sizeof(d);
	printf("size of int d : %d\n",d);

	long e;
	e = 12;
	e= sizeof(e);
	printf("size of long : %ld\n",e);

	long long f;
	f = 123;
	f = sizeof(f);
	printf("size of long long : %lld\n",f);

	float g;
	g = 1.123f;
	g = sizeof(g);
	printf("size of float: %f\n", g);

	double h;
	h = 0.123;
	h = sizeof(h);
	printf("size of double: %f\n", h);

	return 0;
}
```

```sh
size of char a : 1
size of short c : 2
size of int d : 4
size of long : 8
size of long long : 8
size of float: 4.000000
size of double: 8.000000
```

각 자료형 별로 크기를 sizeof로 알 수 있다.

<br>

### 추가적으로 알아야할 변수표현

- 표현범위 별

`signed` : 범위를 음수포함한다.  
`unsigned` : 범위를 양수만을 취급.

<br>

- 인자 출력형식 별

`%d` : 10진수 출력
`%o` : 8진수 출력
`%x` : 16진수 출력
`%f` : 실수형으로 출력

<br>

- 실수형 변수

float과 double을 선언할때, float의 숫자 뒤에는 f를 붙여줘야한다.  
`%f`로 실수형 변수를 출력하는 형식을 지정할 수 있다.  
`%f`를 사용할때 인자로 들어오는 값은 반드시 .0을 붙여주어야한다.

`%.2f` : 소수점아래 2자리에서 반올림해준다.  
`%5d` : 인자를 5자리 맞춰서 출력. 인자가 더 길다면 그대로 출력, 짧다면 앞에 빈공간으로
`%6.3f` : 6자리로 맞추되 소수점 3번째 자리에서 반올림, 자리수에는 소수점도 포함된다.

<br>

- 변수 작명

오래된 C언어는 원래 최상단에 변수선언이 있어야한다.

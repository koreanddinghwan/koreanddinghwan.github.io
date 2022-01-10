---
title: "[C] 자료형별 크기, 접미사, 출력형식 등 정리"
excerpt: "조건문 사용하기"

categories:
  - c
tags:
  - [c, syntax]

toc: true
toc_sticky: true

date: 2022-01-09
last_modified_at: 2022-01-09
---

<br>
<br>

# 자료형별 크기

| 타입        | 크기       | 범위                                                |
| ----------- | ---------- | --------------------------------------------------- |
| char        | 1Byte      | 1Byte => 8bit => 2^8 = 256, -128 ~ 127까지를 의미함 |
| short       | 2Byte      | 16bit, 2^16 = 64436, -32768 ~ 32767                 |
| int         | 4Byte      | 32bit, 2^32 = 4294967296, -2147483648 ~ 2147483647  |
| long        | 8Byte      | 64bit, 2^64 = 18446744073709551616                  |
| long long   | 8Byte      | ''                                                  |
| float       | 4Byte      | 32bit, 1.175494e-38~3.402823e+38                    |
| double      | 8Byte      | 64bit, 2.225074e-308~1.797693e+308                  |
| logn double | 8Byte 이상 | double 이상의 표현범위                              |

<br>

# unsigned 정수 자료형

| 타입               | 크기  | 범위                                |
| ------------------ | ----- | ----------------------------------- |
| char               | 1Byte | -128 ~ 127까지를 의미함             |
| unsigned char      | 1Byte | 0 이상 (128 + 127) 이하             |
| short              | 2Byte | -32768이상 32767 이하               |
| unsigned short     | 2Byte | 0 이상 (32768 + 32767)이하          |
| int                | 4Byte | -2147483648 이상 2147483647 이하    |
| unsigned int       | 4Byte | 0 이상 (2147483648+2147483647) 이하 |
| long               | 4Byte | -2147483648 이상 2147483647 이하    |
| unsigned long      | 4Byte | 0 이상 (2147483648+2147483647) 이하 |
| long long          | 8Byte | -2^64 이상 +(2^64-1)이하            |
| unsigned long long | 8Byte | 0 이상 2^64+(2^64-1) 이하           |

# 리터럴 상수 접미사

int형으로 표현가능한 정수형 상수는 int형 메모리에 저장하기로 약속.  
double형으로 표현가능한 정수형 상수는 double형 메모리에 저장하기로 약속.

| 타입               | 접미사 | 사용 예시                          |
| ------------------ | ------ | ---------------------------------- |
| unsigned int       | U      | unsigned int n = 1231U;            |
| long               | L      | long n = 1234L;                    |
| unsigned long      | UL     | unsigned long n = 2343UL;          |
| long long          | LL     | long long n = 34123LL;             |
| unsigned long long | ULL    | unsigned long long n = 3241234ULL; |
| float              | f      | float i = 13.342f;                 |
| long double        | l      | long double i = 12.324l;           |

# printf 서식문자

| 서식문자 | 출력대상(자료형) | 출력형태                            |
| -------- | ---------------- | ----------------------------------- |
| %d       | char, short, int | 부호 있는 10진수 정수               |
| %ld      | long             | 부호 있는 10진수 정수               |
| %lld     | long long        | 부호 있는 10진수 정수               |
| %u       | unsigned int     | 부호 없는 10진수 정수               |
| %o       | unsigned int     | 부호 없는 8진수 정수                |
| %x       | unsigned int     | 부호 없는 16진수 정수               |
| %f       | float, double    | 10진수 방식의 부동소수점 실수       |
| %lf      | long double      | 10진수 방식의 부동소수점 실수       |
| %e       | float, double    | e 방식으로 표현하는 부동소수점 실수 |
| %g       | float, double    | 값에따라 %f와 %e 사이에서 선택      |
| %c       | char, short, int | 값에 대응하는 문자                  |
| %s       | char\*           | 문자열                              |
| %p       | void\*           | 포인터의 주소 값                    |

%와 서식문자 사이에 -를 넣으면 왼쪽정렬이 되고, 숫자를 넣으면 필드의 폭(자리값)을 지정할 수 있다.

# 자료형 형변환

## 대입연산시

```c++
double num1 = 256;
```

int형 정수를 double 자료형으로 변환

대입연산시에는 자료형변환에 따른 데이터 손실을 고려해야함.

## 정수의 승격

int보다 작은 크기의 정수형 데이터(char, short)는 int형 데이터로 형 변환이 되어서 연산된다.

## 피연산자의 불일치

```c++
double num1 = 5.15 + 19;
```

double + int 자료를 연산하면 자연스럽게 int가 double로 바뀐다.

int -> long -> long long -> float -> double -> long double

자료형의 손실이 최소화하는 방향으로 형변환됨.

## 명시적 형변환

형 변환 연산자에 의해서 강제로 일어나는 형변환.

`divResult = (double)num1 / num2;`  
이런식으로 앞에 괄호로 형변환을 강제로 일으킬 수 있다.

# 특수문자 종류

| 특수문자 | 의미         |
| -------- | ------------ |
| \a       | 경고음       |
| \b       | 백스페이스   |
| \f       | 폼 피드      |
| \n       | 줄바꿈(개행) |
| \r       | 캐리지 리턴  |
| \t       | 탭           |
| \v       | 수평 탭      |
| \'       | 작은 따옴표  |
| \"       | 큰 따옴표    |
| \?       | 물음표       |
| \\       | 역슬래쉬     |

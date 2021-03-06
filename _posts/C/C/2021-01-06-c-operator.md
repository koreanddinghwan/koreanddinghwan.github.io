---
title: "[C 문법공부] 연산자 종류"
excerpt: "C언어 연산자"

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

# 산술연산자,대입연산자

<br>

## 계산

```c++
#include <stdio.h>
int main() {
	int a, b;
	a = 10;
	b = 3;
	printf("a + b 는 : %d \n", a + b);
	printf("a - b 는 : %d \n", a - b);
	printf("a * b 는 : %d \n", a * b);
	printf("a / b 는 : %d \n", a / b);
	printf("a %% b 는 : %d \n", a % b);
	return 0;
}
```

```bash
a + b 는 : 13
a - b 는 : 7
a * b 는 : 30
a / b 는 : 3
a % b 는 : 1
```

a 와 b는 int형으로 각각 정수데이터만 담당한다.  
+, -, \*는 평이하기에 패스.  
나눗셈 / 의 경우, a와 b가 정수데이터만 처리하기 때문에 10을 3으로 나누면 3.3333이지만 정수부분만 남게된다.
%연산자는 표현방법으로 %%을 사용해야한다. %하나만 사용하면 %d, %f와 헷갈림.

<br>

## 연산 시 형변환

나눗셈시에 조심할 것으로는

```c
#include <stdio.h>
int main() {
	int a, b;
	a = 10;
	b = 3;
	printf("a / b 는 %f \n", a / b);
	return 0;
}
```

이 코드는 컴파일하면 에러가 날수도 있음.

그 이유에 대해서 생각해보자면,

정수 / 정수 = 정수형변수 로 항상 유지된다.  
따라서 %f를 사용하면 정수형 변수를 실수형 포맷팅으로 하는 것이기 때문에 오류가난다.

그런데 다른 변수형끼리 계산할때는 어떻게 될까?

```c
#include <stdio.h>

int main() {
	int a;
	double b;

	a = 10;
	b = 3;
	printf("a / b 는 : %f \n", a / b);
	printf("b / a 는 : %f \n", b / a);
	return 0;
}
```

```sh
a / b 는 : 3.333333
b / a 는 : 0.300000
```

여기서 int형과 double형 변수간 계산이 이뤄지고 있는데,  
`자료형이 다른 두 변수를 연산할 때, 숫자의 범위가 큰 자료형으로 자료형들이 바뀐다.`

따라서 연산 후 결과는 모두 double 자료형일 것이므로 실수형 값 포매팅인 %f를 사용해야한다.

<br>

## 대입연산자

```c
#include <stdio.h>
int main() {
	int a = 3;
	a = a + 3;
	printf("a의 값은 :%d \n", a);
	return 0;
}
```

연산 우선순위에서 +가 =보다 먼저되기때문에 a=6이 된다.

## 연산자 줄이기

#include <stdio.h>

```c
int main() {
	int a = 1, b = 1, c = 1, d = 1;
	// int a = b = c = d = 1;
	a = a + 1;
	printf("a : %d \n", a);
	b += 1;
	printf("b : %d \n", b);
	++c;
	printf("c : %d \n", c);
	d++;
	printf("d : %d \n", d);
}
```

```sh
a : 2
b : 2
c : 2
d : 2
```

++c; d++ 이렇게 다른 모냥이 있는데, 앞이랑 뒤에 있는 것의 의미가 뭘까?

++이 앞에 있으면 `전위형`으로 1을 더한 후 결과를 리턴하고
++이 뒤에 있으면 `후위형`으로 결과를 리턴하고 1을 더한다.

더 자세한 예시를 들면,

```c
#include <stdio.h>

int main() {
	int a = 1;

	printf("++a : %d \n", ++a); /*postfix */

	a = 1;
	printf("a++ : %d \n", a++); /*prefix*/
	printf("a : %d \n", a);

	return 0;
}
```

```sh
++a : 2
a++ : 1
a : 2
```

<br><br>

# 비트연산자, 쉬프트연산자

비트 하나하나에 대해 연산하는 연산자를 비트연산자라고한다.

<br>

## 연산자 종류

1. AND 연산 &
2. OR 연산 |
3. XOR 연산 ^
4. 반전 ~
5. 쉬프트 연산 >>, <<

<br>

### AND 연산

비교하는 두 이진수에 대해서 두수의 각 자리수를 비교해 둘 다 1이어야 1이 된다.

```sh
0011 & 1110 => 0010
```

<br>

### OR 연산

두 수 중 하나라도 1이면 1이된다.

```sh
0011 | 1110 => 1111
```

<br>

### XOR 연산

두 수가 달라야 1이된다.

```sh
0011 ^ 1110 => 1101
```

<br>

### 반전연산

기존 이진수를 1은 0으로, 0은 1로 반전한다.

```sh
~0011 => 1100
```

여기서 중요한게 있는데, 만약 선언된 자료형이 int형이라면 4바이트=32비트이다.

그래서

```c++
#include <stdio.h>

int main() {
	int a;
	a = 0x0A; /*2진법 => 1010*/

	printf("%x",~a);
}
```

원래라면 0101이 나와야 정상이지만, 출력이

```sh
fffffff5
```

이것은 무슨의미일까?

0x0A를 2진법으로 표현하면 1010이지만, `int의 자료형이 4byte, 32bit이므로`

```sh
00000000 00000000 00000000 00001010
```

이 0x0A의 이진수이다.

따라서 이를 반전하면

```sh
11111111 11111111 11111111 11110101
```

이 되므로, 이는

`0xfffffff5`가 된다.

이와 같은 논리로 쉬프트연산을 할 수 있다.

<br>

### 쉬프트 연산

쉬프트 연산에는 2가지가 있다.

`<<` 는 비트를 왼쪽으로 쉬프트 시키는데, 뒤에서 새로 채워지는 부분은 무조건 0이다.

`>>` 는 비트를 오른쪽으로 쉬프트 시키는데, 앞부분에 맨 왼쪽에 있던 수가 채워진다.

```c++
#include <stdio.h>

int main() {
	int a;
	int b;

	a = 0xAF; // 10101111
	b = 0xB5; // 10110101

	printf("%x\n",a << 2);
	printf("%x\n",b >> 3);
}
```

이를 출력하면

```sh
2bc
16
```

이렇게 된다.

10101111을 `<<` 쉬프트하면 앞의 숫자들이 버려질 것 같지만, 반전연산과 같은 이유로  
`00000000 00000000 00000010 10111100` 으로 앞쪽 빈 자리로 옮겨간 것이다.

마찬가지로  
10110101을 `>>` 쉬프트하면 맨 앞의 1로 채워져서 11110110이 되어야 할 것 같지만,
`00000000 00000000 00000000 00010110` 으로 맨 앞이 0이기 때문에 0으로 채워져야한다.

<br><br>

# 오버플로우와 언더플로우

<br>

## 음수를 나타내는 방법

C언어가 음수를 표현하는 방식은 간단하게 2의 보수표현법으로 나타낸다.  
2의 보수 표현법을 사용하기 위해선, 양수의 이진수를 반전시킨다음 1을 더한다.
따라서 맨 앞자리에 1이 있다면 음수이다.

4비트짜리 자료형이 있다고 가정하자.

이 자료형의 범위는 (-8 ~ 7) 이다.

| 음수 | 이진수 | 양수,0 | 이진수 |
| ---- | ------ | ------ | ------ |
| -1   | 1111   | 0      | 0000   |
| -2   | 1110   | 1      | 0001   |
| -3   | 1101   | 2      | 0010   |
| -4   | 1100   | 3      | 0011   |
| -5   | 1011   | 4      | 0100   |
| -6   | 1010   | 5      | 0101   |
| -7   | 1001   | 6      | 0110   |
| -8   | 1000   | 7      | 0111   |

이렇게 2의 보수 표현법으로 컴퓨터가 음수를 인식하게된다.  
맨 앞자리 수가 1일때를 음수로 인식하기 때문에 나머지 자리수 2^3 만큼이 음수가 된다.  
양수일때는 맨 앞자리가 0일때인데, 0을 포함하고 있기 때문에 양수는 음수보다 1개가 적을 수 밖에 없다.

<br>

### 오버플로우, 언더플로우

정수 자료형에는 int, short, char, long, longlong 등이 있다.

이 자료형들에는 범위가 정해져있는데, 범위의 최댓값을 넘어서면 오버플로우가, 최솟값보다 작아지면 언더플로우가 발생한다.

위의 4비트 자료형을 예시로 들자면,  
7(0111)에서 1을 더하면 1000이 되어 -8로 컴퓨터가 인식하게된다.

이러한 로직이 모든 자료형에 통용되게된다.

<br>

### unsigned?

맨 앞자리에 1이 붙어있는 수를 양수로 인식하면된다.

| 음수 | 이진수 | 양수,0 | 이진수 |
| ---- | ------ | ------ | ------ |
| 15   | 1111   | 0      | 0000   |
| 14   | 1110   | 1      | 0001   |
| 13   | 1101   | 2      | 0010   |
| 12   | 1100   | 3      | 0011   |
| 11   | 1011   | 4      | 0100   |
| 10   | 1010   | 5      | 0101   |
| 9    | 1001   | 6      | 0110   |
| 8    | 1000   | 7      | 0111   |

15보다 커지면 1111에서 1이 더해지며 0이된다.  
반대로 0보다 작아지면 0000에서 1111이 되면서 15가된다.

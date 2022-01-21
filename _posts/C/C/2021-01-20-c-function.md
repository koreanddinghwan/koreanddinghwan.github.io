---
title: "[C 문법공부] 함수, 변수"
excerpt: "분할정복"

categories:
  - c
tags:
  - [c, syntax]

toc: true
toc_sticky: true

date: 2022-01-20
last_modified_at: 2022-01-20
---

<br><br>

복잡한 문제를 main함수로만 정복하는 것은 무리이다.
작은 크기의 함수로 나누어서 정복하는 것이 실력이다.
작은 크기의 함수로 나누면 코드의 재사용성이 크게 높아진다.

<br><br>

# 💡 printf함수는 실제로 값을 반환한다.

printf 함수는 전달되는 인자들을 각각 서식에 따라 모니터에 출력한다.  
printf함수는 이런 기능뿐만 아니라, \0(NULL 문자)를 포함해 모니터에 출력한 문자열의 길이를 리턴한다.

<br><br>

# 💡 함수의 종류

함수는 `전달인자의 유무`와 `반환 값의 유무`에 따라 4개의 형태로 나뉜다.

## ✏️ 유형 1. 전달인자 반환 값 모두 있는 경우

가장 기본적인 형태.

```c++
int Add (int num1, int num2)
{
  int result = num1 + num2;
  return result;
}
```

int : 함수가 반환하는 값의 형태(반환형)  
Add : 함수의 이름  
(int num1, int num2) : 전달 인자의 자료형과 함수 내에서 사용될 이름  
return result : 반환되는 값.

여기서 `return result`에 집중해야하는데,  
`실제로 함수가 호출되면, 함수의 호출문이 반환 값(result)로 대체된다.`

## ✏️ 유형 2. 전달인자나 반환 값이 없는 경우

`void`를 사용하면 나머지 3가지의 경우를 구현할 수 있다.

### 전달 인자는 있지만 반환값이 없는 경우

```c++
void ShowAddResult(int num)
{
  ...
}
```

이처럼 반환되는 자료형이 `void`로 선언되며, 함수의 몸체 부분에 `return 값이 존재하지 않는다.`

<br>

### 전달 인자는 없지만 반환값이 있는 경우

```c++
int Addresult(void)
{
  return ...
}
```

함수의 전달 인자로 `void`를 전달하면 `인자를 전달하지 않는다`라는 의미이다.

<br>

### 전달 인자, 반환값이 모두 없는 경우

```c++
void printresult(void)
{
  ...
}
```

함수의 반환 자료형, 전달인자 모두 void로 선언하면 매개변수도 없고 반환값도 없는 함수를 구현할 수 있다.

<br><br>

# 💡 return의 의미

return문은 2가지 의미가 있다.

► 함수를 빠져나간다.
► 값을 반환한다.

❗️ void 반환형인 함수에서도 return문을 사용해 함수호출을 종료할 수 있다.

<br><br>

# 함수의 선언과 정의 분리

함수를 항상 맨 위에서 선언해둘 필요는 없다.  
가독성을 위해서 함수의 위치를 적절하게 조정할 수 있는데, 함수의 선언과 정의를 분리할 수 있다.

```c++
int Increment(int n); //함수 선언

int main()
{
  int num=2;
  num = Increament(num);
  return 0;
}

int Increment(int n) //함수의 정의
{
  n++;
  return n;
}
```

컴파일러는 함수 선언문을 만나면 코드의 아래쪽에서 함수가 정의되어있는 곳을 찾아서 컴파일을 할 수 있다.

<br><br>

# 변수의 존재기간, 접근범위

변수의 선언 위치와 함수는 깊은 관계가 있다.

변수는 선언되는 위치에 따라 지역 변수와 전역 변수로 나뉘는데, 이 차이는

► 메모리 상에 존재하는 기간

► 변수에 접근할 수 있는 범위

이에 대해 차이가 생긴다.

<br>

## 지역변수

지역변수의 `지역`이란 `중괄호`에 의해 형성되는 영역을 의미하며, 중괄호 내에서 선언되는 모든 변수는 지역변수이다.

그리고 이 지역변수는 `선언된 지역 내에서만 유효`한 특성을 가진다.

그리고 이 지역변수는 `스택(stack)`이라는 메모리 영역에 할당된다.

지역변수는 지역이 중괄호로 시작되면 이 영역에 저장되어 사용되다가, 중괄호가 닫히거나, 함수가 리턴되면 소멸된다.

```c++
#include <stdio.h>

int SimpleFuncOne(void)
{
  int num = 10; //지역변수
  num++;
  printf("simpleFuncOne num: %d\n", num); //위의 num이 유효함
  return 0;
}

int SimpleFuncTwo(void)
{
  int num1 = 20;
  int num2 = 30;
  num1++, num2--;
  printf("num1 & num2 : %d %d \n", num1, num2); //위의 20, 30이 유효
  return 0;
}

int main()
{
  int num = 17;
  SimpleFuncOne();
  SumpleFuncTwo();
  printf("main num : %d\n", num); //main의 num 17이 유효
  return 0;
}
```

위의 코드를 실행하면

```bash
simpleFuncOne num: 11
num1 & num2 : 21 29
main num : 17
```

변수의 이름이 중첩됨에도 정상적으로 출력된다.

지역 변수의 특성때문에 지역 변수는 선언된 지역이 다르면 이름이 같아도 문제가 되지 않기 때문이다.

이런 지역변수는 다른 특징으로는 `지역 외부의 지역변수에 접근할 수 있다.`는 점이다.

지역 외부에서 다른 지역 내부로 지역변수를 참조할 수 없지만, 지역 내부에서 지역 외부의 지역변수를 참조할 수는 있다는 뜻.

`매개변수도 지역변수의 일종이다.`

<br>

## 전역변수

중괄호 내에 선언되지 않는 변수.

특징으로는

► 프로그램이 실행되면 메모리 공간이 할당되어 프로그램이 종료될때까지 메모리 공간에 남아있는다.  
► 별도의 값으로 초기화하지 않으면 0으로 초기화
► 프로그램 전체 영역에서 접근 가능하다.

이런 편리함이 있지만, 지나치게 많이 선언된 전역변수는 `스파게티 코드`로 이어져 프로그램이 복잡해질 수 있다.

❗️전역변수와 동일한 이름의 지역변수가 선언되면, 해당 지역에서는 지역 변수로 접근이 이뤄진다.

```c++
#include <stdio.h>
void Add(int val);
int num; //전역변수는 선언시 기본적으로 0으로 초기화.

int main(void)
{
  printf("num: %d \n", num);
  Add(3);//전역변수 num 3증가
  printf("num: %d \n", num);
  num++;//전역변수 num 1증가
  printf("num: %d \n", num);
  return 0;
}

void Add(int val)
{
  num += val;
}
```

<br>

## static변수

지역변수에 static 선언이 추가되면 전역변수의 성격이 추가된다.

► 선언된 함수 내에서만 접근이 가능하다. (지역변수 특성)
► 선언시 1회 초기화되며 프로그램 종료 시까지 메모리 공간에 존재한다. (전역변수 특성)

❗️ static으로 선언된 지역변수는 위치에 따라 선언되는 것이 아닌, `전역변수와 동일한 시기에 할당되고 소멸`된다.  
❗️ 단지, 접근 가능함 범위를 한정하기 위해 중괄호 내에 위치하는 것이다.

```c++
#include <stdio.h>

void SimpleFunc(void)
{
  static int num1 = 0; //static 변수 num1
  int num2 = 0;//지역변수 num2, 함수호출할때마다 0으로 초기화됨.
  num1++, num2++; //num2 는 지역변수, 항상 1값이 된다. static변수 num1은 함수호출할때마다 초기화되지않고, 1씩증가됨.
  printf("static : %d, local: %d \n", num1, num2);
}

int main(void)
{
  int i;
  for(i=0;i<3;i++)
    SimpleFunc();
  return 0;
}
```

<br>

## register변수

레지스터는 CPU에 존재하는 작은 메모리인데, CPU내에 존재하기에 연산 속도가 매우 `빠르다.`

이런 레지스터의 활용에 대해 컴파일러에게 힌트를 주는 선언이 register선언이다.

하지만, `레지스터 선언을 한다고 하더라도 반드시 컴파일러가 레지스터를 활용하는 것은 아니다.`

컴파일러는 이 레지스터 선언을 힌트로 해당 변수를 레지스터에 저장할지 말지 결정한다.

<br>
<br>

# 재귀함수

► `함수 내에서 자기 자신을 다시 호출하는 함수`

► `함수를 실행하는 도중, 자기 자신이 다시 호출되면, 자신의 복사본을 하나 더 만들어서 복사본을 실행하게 된다.`

어려운 문제를 단순화 하는데 사용되는 중요한 무기이기에 자료구조나 알고리즘에서 많이 사용된다.

팩토리얼과 같은 수학적 수식을 쉽게 코드로 옮길 수 있다.

```c++
#include <stdio.h>

int Factorial(int num)
{
	if (num == 0)
		return 1;

	if (num == 1)
		return 1;

	return num*Factorial(num-1);
}


int main()
{
	printf("%d\n", Factorial(5));

	return 0;
}
```

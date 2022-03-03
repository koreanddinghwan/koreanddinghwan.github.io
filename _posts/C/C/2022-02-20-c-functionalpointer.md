---
title: "[C 언어] 함수 포인터 사용"
excerpt: "함수형 포인터 정리"

categories:
  - c
tags:
  - [c, syntax]

toc: true
toc_sticky: true

date: 2022-02-20
last_modified_at: 2022-02-20
---

# 함수 포인터

함수를 배열, 구조체에서 사용  
함수를 함수의 매개변수로 넘겨주기  
반환값으로 가져오기 등을 할 수 있음.

함수 이름도 포인터라서 메모리주소가 나온다.

# 사용법

```c++
void    hello()
{
    printf("Hello world!\n");
}
```

hello 함수 선언

```c++
void    (*fp)();
```

리턴값이 void, 매개변수가 없는 함수포인터 선언

```c++
void    hello()
{
    printf("Hello world!\n");
}

void    bonjour()
{
    printf("bonjour le monde!\n");
}

int main()
{
    void (*fp)();

    fp = hello;
    fp();

    fp = bonjour;
    fp();

    return (0);
}
```

함수의 이름 자체도 포인터이므로, 동일한 자료형, 매개변수를 가진 함수포인터를 선언해  
함수를 가리키도록하면 `()`로 사용할 수 있다.

# 반환값과 매개변수가 있는 함수포인터

```c++
void    ft_putnbr(int nb)
{
    if (nb == -2147483648)
    {
        write(1, "-2147483648", 1);
    }

    if (nb < 10)
    {
        ft_putchar(nb % 10);
    }
    else
    {
        ft_putchar(nb % 10);
        ft_putnbr(nb / 10);
    }
}
```

이런 형태의 함수를 사용하기위해선 매개변수가 있는 함수포인터를 선언해야한다.

```c++
int main()
{
    void    (*fp)(int);

    fp = ft_putnbr;
    fp(3123123);
    fp(1231231);
    return 0;
}
```

원 함수의 반환값 자료형과 매개변수 자료형이 동잃하게 포인터를 선언해주면된다.

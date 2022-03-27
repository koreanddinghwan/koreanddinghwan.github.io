---
title: "GetNextLine(1)"
excerpt: "Reading a line on a fd is way too tedious"

categories:
  - getnextline
tags:
  - 42seoul

toc: true
toc_sticky: true

date: 2022-03-19
last_modified_at: 2022-03-19
---

간만에 자그마한 프로젝트이다.  
get_next_line은 파일 디스크립터로부터 텍스트를 읽어들이는 함수를 작성한다.

<br>

# file discroptor

## 표준입출력에러

파일 디스크립터는 맨 처음에 `write()`함수를 작성할 때, 처음 만나게된다.  
이때 찾아본 파일 디스크립터는 유닉스 시스템에서 기본적으로 3개를 가진다고 배웠다.

| 이름      | fd  | 설명                                                                              |
| --------- | --- | --------------------------------------------------------------------------------- |
| 표준 입력 | 0   | 입력의 기본적인 데이터 스트림, 터미널에선 유저의 키보드 입력을 기본으로한다.      |
| 표준 출력 | 1   | 출력에 대한 기본인 데이터스트림, 터미널에선 유저 스크린에 나타난다.               |
| 표준 에러 | 2   | 에러가 발생에 관련한 기본적인 데이터 스트림, 터미널에서 유저의 스크린에 나타난다. |

<br>

이후, 피신때 C10에서 파일 입출력에 대해 배웠다.

`프로세스가 파일을 성공적으로 열었을때, 커널의 global file table에서 해당 파일을 가리키는 file discripter를 리턴한다.`  

<img src="https://user-images.githubusercontent.com/76278794/159051065-2724b5ff-f335-4ec7-bf6f-46991ff09d5f.jpeg">

이렇게 파일 디스크립터가 쌓일 수 있는데, 사용자가 새로운 파일을 연다면 3부터 할당된다.  

<br>

## OPEN_MAX

이렇게 쌓일 수 있는 파일 디스크립터는 사용중인 OS에 따라 다르다.  

```shell
%getconf OPEN_MAX
```
OPEN_MAX는 환경변수로, 위 명령어를 쉘에서 사용하면 OS가 동시에 열 수 있는 최대 파일의 개수를 알려준다.  

<br><br>

# 시스템 입출력함수

## open

이 파일 디스크립터를 얻는 방법은 `fcntl.h`에 정의된 open함수를 사용하면된다.  

```c
int	open(const char *path, int oflag, ...);
```

► 여기서 path는 읽어들일 파일의 경로이다.  


► oflag는 파일을 read할때 사용할 옵션이다.  

oflag에는 아래 세개 중 적어도 1개를 사용해야한다.  

```
O_RDONLY        open for reading only
O_WRONLY        open for writing only
O_RDWR          open for reading and writing
```

► 뒤에 가변인자가 오는 이유는 oflag가 O_CREAT flag일때, 생성한 파일의 권한(chmod)를 정의하기 위함이다.  



리턴 값으로 정수가 반환된다. open함수가 반환하는 정수가 바로 파일 디스크립터이다.  
만약 이 리턴값이 `음수`라면, open의 실패한 경우이고, errno가 설정된다.  

<br><br>

## read

open을 했으니, 파일디스크립터로부터 파일을 읽어들여야한다.  
이때 사용되는게 `read`함수이고, `unistd.h`에 정의되어있다.  

```c
ssize_t read(int 수fildes, void *buf, size_t nbyte);
```

nbyte만큼, fildes로부터 데이터를 읽어들여서 buf에 저장하려고 시도한다.  

성공적으로 읽어들였다면, read한 byte만큼을 리턴하게된다.  
파일이 끝났다면 0을 리턴한다.  
읽는데에 실패하면 -1을 리턴하고 errno를 설정한다.  

리턴값 자료형이 ssize_t인데, size_t가 부호없는 8바이트 정수(64bit)임에 반해,  
ssize_t는 `부호 있는 8바이트 정수`이다.  
`sys/types.h`를 인클루드하면 사용할 수 있다.  

<br><br>

## close

```c
int close(int fildes);
```

close함수의 인자로 파일디스크립터를 주게되면 해당 프로세스의 파일테이블에서 파일디스크립터를 삭제한다.  
성공할 경우, 0을 리턴하나 실패할경우 errno를 설정하고 -1를 리턴한다.  


<br><br>

# 정적변수

c언어에서 정적변수는 많이 사용되는데, 전역변수와 정적변수를 구분하는게 종종 프로그래머들에게 어렵게 다가온다고한다.  

정적변수는 프로그램 실행 전체에 관여한다.  

►정적변수가 선언되면, 복사본이 생성되어 할당된 값을 계속 유지한다.  
►프로그램이 시작되면 할당되어 실행이 종료되면 사라진다.  
►정적변수의 값은 할당되지 않은 경우에 0으로 초기화된다.(지역변수와 차이점)  
►함수 내부에서 선언되면 해당 함수에서만 사용되며, 외부에서 선언되면 전역변수화된다.  
►정적변수는 구조체 내부에서 선언되면 안된다.  

<br><br>



<br><br>

# ref

[computerhope.com](https://www.computerhope.com/jargon/f/file-descriptor.htm)
[Learn About Static Variable in C With Coding Example](https://prod-mpc.upgrad.com/blog/static-variable-in-c/)
[Static Variables in C](https://www.geeksforgeeks.org/static-variables-in-c/)

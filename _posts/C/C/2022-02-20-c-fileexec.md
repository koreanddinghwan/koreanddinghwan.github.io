---
title: "[C 언어] 파일관련 함수 정리"
excerpt: "파일관련 함수 정리"

categories:
  - c
tags:
  - [c, syntax]

toc: true
toc_sticky: true

date: 2022-02-20
last_modified_at: 2022-02-20
---

# open

헤더 : fcntl.h

형태 : `int open (const char *FILENAME, int FLAGS[,mode_t MODE])`

FILENAME : 열고자하는 대상파일 이름  
FLAGS : 파일에대한 열기옵션  
MODE : O_CREAT 옵션으로 파일 생성시 지정되는 접근권한

반환 값 : int,
파일 열기에 실패하면 -1, 파일 열기에 성공하면 파일 디스크립터(fd)의 양의 정수 값 반환.

fd란 0,1,2로 대표되는 입출력 스트림의 연장선이라고 생각하면됨.  
0 : stdin  
1 : stdout  
2 : stderr

이런 기본 입출력 스트림이 있는데, 파일에 열기에 성공하면 현재 프로세스에서 3부터 fd가 지정된다.

열기 옵션에서 자주사용되는 옵션으로는

O_RDONLY : 읽기전용  
O_WRONLY : 쓰기전용  
O_RDWR : 읽기, 쓰기  
이 있다.

# read

open함수로 파일 열기에 성공하면 fd가 반환되는데, 이 변수를 사용해 파일에 접근해서 내용을 읽어온다.

헤더 : unistd.h  
형태 : `ssize_t read (int fd, void *buf, size_t nbytes)`  
인수 : int fd 파일 디스크립터
void \*buf 파일을 읽어들일 버퍼(임시공간)  
 size_t nbytes : 버퍼의 크기

반환값 : int  
파일 읽기에 실패하면 -1, 읽기에 성공하면 읽어들인 바이트 수를 반환한다.

# close

open 함수로 파일열기에 성공해 fd가 양의 정수값을 가질때, 이 파일디스크립터 번호로 연결된 파일을 사용중지한다.

헤더 : unistd.h  
형태 : `int close(int fd)`  
인수 : int fd  
반환 값 :
close 성공 시 0, 실패 시 -1

# strerr

시스템 오류 번호에 대한 오류 메세지를 문자열로 반환해준다.

헤더 : string.h  
형태 : `char *strerror(int errnum)`  
인수 : errno, errno 전역변수는 errno.h 헤더에 포함되어있다.

# basename

path의 끝 node의 이름을 얻는 함수, 파일정보이면 파일명을 얻는다.

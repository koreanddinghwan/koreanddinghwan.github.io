---
title: "Born2beroot(1)"
excerpt: "This document is a System Administration related exercise"

categories:
  - born2beroot
tags:
  - 42seoul

toc: true
toc_sticky: true

date: 2022-03-27
last_modified_at: 2022-03-31
---

시스템 관리와 관련된 프로젝트.

UTM이나 VirtualBox를 이용해야한다.

VirtualBox는 오라클이 개발 중인 소프트웨어이다.  
리눅스, 맥, 윈도우 등을 가상화하는 소프트웨어, 현존하는 대부분의 OS들을 사용해 볼 수 있다.
문제는 내가 사용중인 m1 맥에서 지원을 안한다.

<br><br>

# 리눅스의 역사

## 1969년

현대의 모든 운영체제는 AT&T Bell LAbs에서 Dennis Ritchie 와 Ken Thompson이 C언어와 Unix 운영체제를 개발한 것을 뿌리로 한다.(뭐하는 사람들이지?)

그들은 버클리 캘리포니아의 히피족들에게 소스 코드를 공유했다.  
1975년 AT&T가 유닉스를 상업적으로 판매하기 시작하면서, 소스코드의 절반 정도가 다른 사람들에 의해 작성되었다.
히피들은 회사가 자신들이 만든 소프트웨어를 판매한 것에 만족하지 않았고, 법적 공방 끝에 Unix는 2가지의 버전으로 나뉘게 되는데,

- official AT&T Unix
- free BSD Unix

이렇게 나뉘게 된다.

FreeBSD, OpenBSD, NetBSD, DragonFly BSD 및 PC-BSD와 같은 후속 BSD 개발은 오늘날에도 여전히 진행 중이다.

<br>

## 1980년대

80년대에는 많은 회사들이 그들만의 Unix를 개발하기 시작했다.(IBM ► AIX,SunOS)  
이에 따라 유닉스가 분리되기 시작했는데, 이를 끝낸 사람이 Richard Stallman이고, 리눅스의 뿌리가 여기서부터 시작된다.  
이 사람은 GNU 프로젝트를 시작해 모든 사람이 자유롭게 사용하고, 일할 수 있는 운영체제를 만드는 것을 목표로 했다.  
오늘 날, Linux에서 사용되는 커맨드 명령어들은 GNU tool이다.

<br>

## 1990년대

Linux Torvald가 학생시절에 386컴퓨터로 POSIX 호환 커널을 새로 썼다.(학생...일때?)  
이것이 바로 `리눅스 커널`이다.  
그는 이 소스코드를 온라인에 올렸고, 많은 사람들이 GNU 도구들과 커널의 조합에 환호했다.

<br>

## 2015년

오늘날 97%의 슈퍼컴퓨터들, 80%의 스마트폰, 수백만대의 데스크탑, 70%의 웹서버, 대다수의 태블릿 컴퓨터들, 그리고 전자기기들이 리눅스를 사용한다.

2015년에 수많은 기업의 개발자들의 기여로 작성된 수백줄의 소스코드로 Linux kernel 4.0이 출시됐다.

<br><br>

# 리눅스 배포판

<img src="https://user-images.githubusercontent.com/76278794/160754147-4c3f54c3-ce1c-456e-959a-52c0d6cde62d.png" width="600">

리눅스 배포판은 리눅스 커널 위에 있는 소프트웨어들의 모음이다.  
이러한 배포판은 서버 소프트웨어, 시스템 관리 도구, 메뉴얼, 데스크톱 어플리케이션을 중앙 보안 소프트웨어 저장소에 번들할 수 있다.

<br>

## 종류

- Red Hat
  Red Hat은 리눅스 개발을 주력으로하는 큰 회사이다. 수백명의 리눅스 전문가들이 있고, 지원이 잘 되기로 유명하다.  
  Red Hat Enterprise Linux(RHEL) 와 Fedora를 무료로 공급하는데, RHEL은 릴리즈 이후 7년간 지원되고, 안정적인 것이 특징이다.
  Fedora는 지원은 없지만 업데이트가 빠르다.

- Ubuntu
  Canonical은 우분투 리눅스를 2004년부터 배포했고, 가정용 사용자에게서 빠르게 인기를 끌었다.
  명령줄 볼 필요없이 사용하기 쉬운 그래픽 리눅스 데스크톱을 목표로한다.

- Debian
  데비안에는 기업이 없다. 대신, 2년마다 데비안 프로젝트 리더를 선출하는 수천명의 개발자들이 있다.  
  데이반은 리눅스 배포판 중 가장 안정적으로 평가되고, 우분투 릴리즈의 기반이 되기도 한다.  
  데비안은 stable, test, unstable 이렇게 3가지 버전이 있다.

- Other
  CentOS, Oracle Enterprise Linux, Scientific Linux같은 배포판은 Red Hat Enterprise Linux를 기반으로하고, 비슷하다.  
  Edubuntu 처럼 \*buntu로 이름이 끝나는 배포판은 우분투를 기반으로하고, 데비안과 비슷하다.

<br>

## 고르는 기준

| Name       | Reasons                                                 |
| ---------- | ------------------------------------------------------- |
| RHEL       | 관리자이고, 좋은 지원 계약을 원할때                     |
| CentOS     | Red Hat을 원하지만, Red Hat의 지원 계약이 필요없을때    |
| Fedora     | 데스크탑이나 노트북에 Red Hat을 깔고싶을때              |
| Linux Mint | 영화, 음악, 게임을 하는 개인적인 그래픽 컴퓨터를 원할때 |
| Debian     | 서버, 랩탑이나 다른 장치                                |
| Ubuntu     | 데비안을 기반으로하는, 가장 유명한 배포판               |
| Kali       | 예리한 해킹 인터페이스                                  |

리눅스 커맨드라인 도구를 연습하고싶으면 Debian server나 CentOS server를 깔자.

<br><br>

# 사용자관리

- 리눅스는 다중 사용자 시스템, 1대의 리눅스에서 사용자 여러 명이 동시에 접속해 사용할 수 있다.
- root 이름의 super user가 있는데, root 사용자는 시스템의 모든 작업을 실행할 수 있다.
- root user는 user를 생성할 수 있는데, 모든 사용자들은 하나 이상의 그룹에 속해있다.

<br>

## 유저 정보

- 현재 사용자의 username은
  `whoami` 로 확인한다.

- 현재 시스템의 모든 유저의 정보는

  ```
  cat /etc/passwd
  ```

  로 확인한다.

  <img width="735" alt="스크린샷 2022-03-30 오후 2 10 25" src="https://user-images.githubusercontent.com/76278794/160755727-732d8ad0-9c47-4500-87bf-a3fbf6548d3f.png">

  각 줄은 `사용자 이름 : 암호 : 사용자ID : 사용자가 소속된 그룹 ID : 전체이름 : 홈 디렉터리 : 기본쉘` 이다.

<br>

- 각 사용자가 속한 그룹의 정보는 `ect/group`파일에 저장되어있다.

  <img width="733" alt="스크린샷 2022-03-30 오후 2 14 37" src="https://user-images.githubusercontent.com/76278794/160756233-04c6bf27-b1b9-4343-8e22-b8e385374e81.png">

  각 줄은 `그룹 이름 : 비밀번호 : 그룹 ID : 그룹에 속한 사용자 이름`이다.

<br>

## 사용자 추가

- useradd 새로운 사용자를 추가한다. 이에따라 /etc/passwd에 새로운 행이 추가된다.
  - useradd newuser ► newuser 이름의 사용자 생성
  - useradd `-u` 1111 newuser ► 사용자를 생성하면서 사용자 ID를 1111로 설정
  - useradd `-g` mygroup newuser ► 사용자를 생성하면서 그룹을 mygroup으로 설정(mygroup이 먼저 있어야함)
  - useradd `-d` /newhome newuser ► 사용자를 생성하면서 홈 디렉터리를 /newhome으로 지정
  - useradd `-s` /bin/csh newuser ► 사용자를 생성하면서 기본 쉘을 csh로 지정

<br>

- passwd 사용자의 비밀번호를 지정하거나 변경한다.
  - passwd newuser ► 사용자의 비밀번호를 지정또는 변경

<br>

- usermod 사용자의 속성을 변경, adduser와 비슷함.

<br>

- userdel 사용자를 삭제
  - userdel newuser ► newuser 사용자 삭제
  - userdel -r newuser ► 사용자를 삭제하면서 홈디렉터리도 삭제한다.

<br>

- chage `사용자의 암호를 주기적으로 변경하도록 설정`
  - chage -l newuser ► newuser 사용자에 설정된 사항 확인
  - chage -m 2 newuser ► newuser 사용자에 설정한 암호를 사용해야하는 최소 일자를 지정
  - chage -M 30 newuser ► newuser 사용자가 설정한 암호를 사용할 수 있는 최대 일자
  - chage -E 2026/12/12 newuser ► newuser 사용자의 비밀번호 만료날짜 지정
  - chage -W 10 newuser ► newuser에 설정된 암호가 만료되기 전에 경고하는 기간, 지정하지 않으면 기본은 7일이다.

<br>

- groups 사용자가 소속된 그룹을 보여준다.
  - groups ► 현재 사용자가 소속된 그룹을 보여준다.
  - groups newuser ► newuser가 소속된 그룹을 보여준다.

<br>

- groupadd 새로운 그룹을 생성한다.

  - groupadd newgroup ► newgroup이라는 그룹을 생성한다.
  - groupadd -g 2222 newgroup ► newgroup 그룹을 생성하면서 그룹 ID를 2222로 지정한다.

- groupmode 그룹의 속성을 변경한다.

  - groupmod -n mygroup newgroup ► newgroup 그룹의 이름을 mygroup으로 지정한다.

<br>

## su

- su 커맨드는 어떤 유저가 다른 유저의 계정으로 쉘을 구동할 수 있게 해준다.
  su username ► username으로 쉘을 구동(환경변수는 유지)
  su root ► root 계정으로 쉘을 구동, root 계정은 어떤 계정이든 비밀번호를 몰라도 이동할 수 있다.
  su - username ► 위의 `su username`과는 다른 것이, 이 커맨드는 환경변수까지 username의 것으로 바꿔준다.

- `sudo su -`
  우분투나 수분투 시스템에서는 root user가 패스워드 셋을 가지고 있지 않아서 root로 로그인 하는 것이 불가능하다.  
  그래서 첫 번째 유저가 /etc/sudoers를 통해 모든 sudo 권한이 주어지게된다.  
  관리 그룹에 속하는 모든 유저가 sudo를 사용해 모든 명령을 root로 실행할 수 있다.

<br><br>

# password

## passwd

- passwd 커맨드로 유저의 비밀번호를 세팅할 수 있다.  
  이전 비밀번호를 기억하고 있어야하고, 새로운 비밀번호는 2번 입력해야한다.

- passwd는 유저가 너무 단순한 패스워드를 입력하는 것을 방지할 수 있다.  
  root유저는 이러한 규칙을 따를 필요가 없으며, 비밀번호 변경시에도 이전 비밀번호를 필요로하지 않는다.

<br>

## shadow file

- 유저의 비밀번호는 암호화되어 `/etc/shadow`안에 저장된다.  
  이 파일은 읽기전용이고, root유저만 읽을 수 있다.

- 암호화는 crypt 함수에 의해 진행된다.

<br>

## 사용자를 생성하면서 비밀번호 설정하기

<br>

1. 사용자를 추가할때 비밀번호를 같이 설정하는 가장 쉬운 방법은
   `user -m username`  
   `passwd username` 으로 하는 것!

2. 다른 방법으로는 useradd 시, -p 옵션을 사용하는 것이다.  
   이 옵션은 암호화된 비밀번호를 요구로하는데, `openssl passwd` 커맨드로 실행할 수 있다.

- `openssl passwd PASSWORD`는 같은 비밀번호에 대해 각기 다른 해시를 생성하는데, 이에따라 salt가 사용된다.  
  salt 값은 선택할 수 있고, 해시값의 첫 번째 2개로 확인된다.

3. 세번째 옵션으로는 crpyt 함수를 통해 C 프로그램을 작성하는 것이다.

```c++
#include <stdio.h>
#define __USE_XOPEN #include <unistd.h>
int main(int argc, char** argv)
{
if(argc==3)
  {
      printf("%s\n", crypt(argv[1],argv[2]));
  }
else {
      printf("Usage: MyCrypt $password $salt\n" );
  }
return 0; }
```

crypt 함수는 인자를 2개를 받는데, password와 salt값을 받는다.  
 salt를 통해 4096개의 암호화 알고리즘 중 하나를 선택하게끔 교란하는데에 사용되고,  
 이 때문에 암호가 동일한 사용자가 /etc/shadow에 동일한 항목을 가질 수 없다.

crypt 함수는 기본적으로 `DES 알고리즘`을 사용하는데, 오래되고 크랙당하기 쉽다.  
그래서 `md5 패스워드`를 사용하게되는데, `salt를 $1$`로 시작하게끔 하는 것이다.

<br>

## 비밀번호 규칙

1. `etc/login.defs` 파일은 로그인 패키지 정의를 컨트롤하는 파일이다.  
   이 파일에는 유저의 비밀번호 길이나, 만료일을 정하는 세팅이 존재하고, 이를 수정하면 된다.  
   이 방식은 오래된 방식이고, 이 역할을 최근에 `pam.d`폴더 안에서 실행하는 것을 알 수 있다. [ostechnix](https://ostechnix.com/how-to-set-password-policies-in-linux/)  
   passwd가 실행되면서 `pam.d`안의 설정을 긁어오게되는데, 이때 설정이 먹히게된다.  
   복잡한 설정은
   [pwquality](https://manpages.debian.org/stretch/libpam-pwquality/pam_pwquality.8.en.html)
   [conf](https://manpages.debian.org/stretch/libpwquality-common/pwquality.conf.5.en.html)
   [설정](https://www.server-world.info/en/note?os=Debian_10&p=password)를 참고

2. chage
   유저의 한 계정에 대해 비밀번호 만료일이나, 비밀번호 길이 등을 세팅할 수 있는 명령어이다.
   -l 옵션으로 해당 계정의 비밀번호가 어떻게 세팅되어있는지 알 수 있다.

- REF
- [버추얼박스 위키피디아](https://ko.wikipedia.org/wiki/%EB%B2%84%EC%B6%94%EC%96%BC%EB%B0%95%EC%8A%A4)
- [Linux Fundamentals - Paul Cobbaut](https://linux-training.be/linuxfun.pdf)

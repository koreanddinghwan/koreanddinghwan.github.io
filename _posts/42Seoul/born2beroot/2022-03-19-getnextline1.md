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
last_modified_at: 2022-03-27
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

## 1990년대

Linux Torvald가 학생시절에 386컴퓨터로 POSIX 호환 커널을 새로 썼다.(학생...일때?)  
그는 이 소스코드를 온라인에 올렸고, 많은 사람들이 GNU 도구들과 커널의 조합에 환호했다.

## 2015년

오늘날 97%의 슈퍼컴퓨터들, 80%의 스마트폰, 수백만대의 데스크탑, 70%의 웹서버, 대다수의 태블릿 컴퓨터들, 그리고 전자기기들이 리눅스를 사용한다.

2015년에 수많은 기업의 개발자들의 기여로 작성된 수백줄의 소스코드로 Linux kernel 4.0이 출시됐다.

<br><br>

# 리눅스 배포판

리눅스 배포판은 리눅스 커널 위에 있는 소프트웨어들의 모음이다.  
이러한 배포판은 서버 소프트웨어, 시스템 관리 도구, 메뉴얼, 데스크톱 어플리케이션을 중앙 보안 소프트웨어 저장소에 번들할 수 있다.

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

- REF
- [버추얼박스 위키피디아](https://ko.wikipedia.org/wiki/%EB%B2%84%EC%B6%94%EC%96%BC%EB%B0%95%EC%8A%A4)
- [Linux Fundamentals - Paul Cobbaut](https://linux-training.be/linuxfun.pdf)

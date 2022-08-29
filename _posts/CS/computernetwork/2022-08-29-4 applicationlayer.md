---
title: "[Computer Network] Application Layer"
excerpt: "Http, SMTP, TCP, UDP"

categories:
  - computernetwork
tags:
  - computer science
  - network
  - Application Layer
  - HTTP
  - HTTPS
  - TCP
  - UDP

toc: true
toc_sticky: true

date: 2022-08-29
last_modified_at: 2022-08-29
---

# Application Layer

- 네트워크 어플리케이션 개발의 핵심은 네트워크에서 `end system에서 작동하는 프로그램을 작성`하는 것이다.
- 이런 어플리케이션에는 예시로 `웹의 브라우저와 서버`가 있다.
- 이런 어플리케이션을 개발할때 우리는 라우터나 L2 switch같은 장치들에서 동작하는 소프트웨어를 작성할 필요가 없고, 할 수도 없다.

<br>

# Principles of Network Applications

## Network Application Architectures

- 어플리케이션 개발자의 관점에서 네트워크 아키텍처는 고정되어있고, 어플리케이션에 특정한 서비스를 제공한다.
- 반면, 어플리케이션 아키텍처는 `개발자에 의해 디자인`되고, `어떻게 다양한 host에서 어플리케이션이 구성되는지 지시`한다.
- 일반저긍로 어플리케이션 아키텍처는 가장 많이 사용되는 `client-server` 와 `P2P`아키텍처가 있다.

<br>

### client-server

<img width="490" alt="스크린샷 2022-08-29 오후 12 44 26" src="https://user-images.githubusercontent.com/76278794/187118871-48519de0-04c3-497d-b241-e3c4b0c36e7c.png">

- `server`
	- `server 라고 불리는 인터넷에 상시 접속된 호스트`가 있다.
	- server는 `수많은 client로부터의 요청을 처리`한다.
	- `영구적인 IP주소`를 가진다.
		- client는 이 주소를 향해 패킷을 보낸다.
	- `확장성을 위한 data center`를 가진다.
		- data center는 많은 수의 호스트를 수용할 수 있다.
		- 가상 서버를 만드는 데에 사용된다.

- `client`
	- client끼리가 아닌, server와 통신한다.
	- 간헐적으로 연결될 수 있다.
	- 다양한 주소를 가질 수 있다.

<br>

### P2P

<img width="460" alt="스크린샷 2022-08-29 오후 12 50 45" src="https://user-images.githubusercontent.com/76278794/187119442-4e2821fb-aa92-492e-8e62-7f69dd22514e.png">

- server는 인터넷에 상시접속되어있지 않다.
- 임의의 host들끼리 통신한다.
- 각 peer가 client면서 동시에 server의 역할을 한다.
- 따라서 peer의 수에따른 `self scalability`를 가진다.
- peer들은 간헐적으로 인터넷에 연결되고, 다양한 주소를 가질 수 있기에 관리에 어려움이 따른다.

<br><br>

## Process Communicating

- 실제 통신하는건 프로그램이 아닌 작동중인 `프로세스`다.
- `동일한 호스트 내부`에서는 `IPC(inter-process-communication)`을 사용해 프로세스간 통신을 구현한다.
	- file, semaphore, pipe, shared memory, signal, message queue 등등,,,

- `서로 다른 호스트`간에는 `message`를 교환함으로써 통신한다.


### Client Server Processes


- Client process : 통신을 시작하는 프로세스
- Server process : 연견을 대기하는 프로세스

- client-server 아키텍처의 대표적인 예시인 웹에서는 browser가 client 프로세스이고, web server가 server 프로세스이다.
- P2P 아키텍처에서는 각 프로세스가 client 프로세스이면서 server 프로세스이다.

<br>

### Socket(API)

<img width="985" alt="스크린샷 2022-08-29 오후 1 02 56" src="https://user-images.githubusercontent.com/76278794/187120661-a16fa3f0-a066-46e8-8904-724a41bbd201.png">

- 각각의 프로세스는 `message`를 `socket`으로부터 받거나, 보낸다.
- 소켓은 호스트 내부에서 응용계층과 전송계층 사이에 있는 interface이기 때문에, `API(Application Programming Interface)`라고도 불린다.
- `어플리케이션 개발자는 소켓의 응용계층의 모든 부분을 제어하나, 소켓의 전송계층 부분은 조금밖에 제어하지 못한다.`
	- 전송계층에서는 어떤 전송계층 프로토콜을 사용할지와
	- 최대 버퍼크기와 최대 세그먼트 크기와 같은 인자를 결정할 수 있다.

<br>

### Addressing Process

<img width="1057" alt="스크린샷 2022-08-29 오후 1 05 26" src="https://user-images.githubusercontent.com/76278794/187120942-c6b2944e-2586-475a-8685-463222bec6c2.png">

- 프로세스가 message를 받기위해선 식별자가 필요하다.
- 이 식별자는 
	- `IP address`
	- `port number`로 이루어져있다.

- `IP주소`는 네트워크 상에서 internet protocol을 사용하는 호스트를 식별하는 유일한 숫자인데, 호스트 내부에서 수많은 프로세스가 동작하고 있으므로, 프로세스를 식별하기위한 것이 `포트번호`이다.

<br>

## Transport services available to applications

- 소켓이 어플리케이션 프로세스와 전송계층 프로토콜 사이의 인터페이스일때, 송신측 어플리케이션은 소켓에 message를 보내게된다. 
- 또한, 이 소켓의 반대편에서 전송계층 프로토콜은 수신측 프로세스의 소켓으로부터 message를 얻게된다.

- 어플리케이션을 개발할때, 사용할 전송계층 프로토콜을 선택해야하는데, 개발하고자하는 어플리케이션의 특성에 따라 다른 프로토콜을 선택할 수 있다.
- 전송계층 프로토콜은 어플리케이션에 다양한 서비스들을 제공하는데, 크게 4개의 측면으로 분류할 수 있다.

### Reliable Data Transfer

- 패킷이 전송되면서 lost될수도 있는데, 금융앱이나, 웹앱에서는 이런 data loss가 치명적일 수 있다.
- 이러한 어플리케이션들은 데이터가 수신측 어플리케이션에 `올바르게, 모두`전달되었다는 것을 보장할 필요가 있다.
- 만약 프로토콜이 이 서비스를 제공한다면, `reliable data transfer`를 제공한다고 말한다.
- 만약 프로토콜이 이 서비스를 제공하지 않는다면, 수식측 프로세스에 데이터가 전달되지 않을수도 있다.
	- 이는 `loss-tolerant-application`, 멀티미디어 어플리케이션 등에서는 이런 data loss를 어느정도 용인한다.

<br>

### Throughput

- `available throughput`은 `송신측 호스트가 수신측 호스트에 bit를 전달하는 속도`를 의미한다.
- 네트워크 경로를 다른 세션들이 공유할수도 있고, 왔다갔다 할 수 있기에, 시간에 따라 이 속도는 `변동성이 크다`.
- 따라서 전송계층 프로토콜은 `특정한 속도의 guranteed throughput`을 제공할 수 있다. 
- 이러한 서비스를 사용하는 어플리케이션은 `guaranteed available throughput of r bit/sec`의 전송속도를 요구로할때, 전송계층 프로토콜은 `항상 최소한 r bits/sec의 처리량`을 보장한다.
- `available throughput`에 맞춰서 인코딩 속도를 조절해야하는데, guranteed throughput을 보장하지 않는다면, throughput보다 낮은 속도로 인코딩을 해야한다.
	- 예를들어, 인터넷 전화 어플리케이션이 초당 32kb를 인코딩한다고 했을때, 만약 전송계층 프로토콜이 이 처리량을 만족하지 못하면, 어플리케이션은 인코딩 속도를 낮추거나, 잃어버린 bit를 포기해야한다.

<br>


- `bandwidth-sensitive application`은 처리량 요구사항을 가진 응용프로그램을 의미한다. 처리량 요구사항에 맞춰서 인코딩 속도를 조절하게된다.
- `elastic application`은 처리량이 정해져있지 않은 응용 프로그램을 의미한다. 처리량은 많으면 많을수록 좋다.

<br>

### Timing

- 전송계층 프로토콜은 `timing guarantee`를 제공할 수 있다.
- throughput guarantee에따라서 다양한 형태의 timing guarantee가 존재할 수 있다.
- 예를들어, `송신자가 socket에 보내는 모든 bit가 수신자측 socket에 100msec 이내로 도착`을 보장하는 것이 예시이다.
- 이러한 예시는 멀티플레이 게임, 실시간 어플리케이션, 가상환경 등에서 사용될 수 있다.

- 게임할때, 이런 timing guarantee가 제공되지 않는다면 그 게임을 하는 사람의 만족도는 낮아질 것이다.
- 비 실시간 어플리케이션의 경우에도 낮은 딜레이가 선호되겠지만, 위의 경우보다는 딜레이에 있어서 제약이 크지는 않을 것이다.

<br>

### Security

- 전송계층 프로토콜은 보안 서비스를 제공하기도 하는데, 송신측 호스트의 전송프로토콜에서 data를 암호화하고, 수신측 호스트의 전송프로토콜에서 암호화된 data를 해제하는 방법이 있다.
- 두 프로세스간 비밀성을 지킬 수 있다.


<br>
<br>

## Transport Services Provided by Internet

- 전송계층 프로토콜의 구체적 예시인 TCP와 UDP를 예시로 생각해보자.
- 인터넷은 `TCP와 UDP`를 사용할 수 있게해준다.
- 개발자가 인터넷의 응용프로그램을 만들때, 둘 중 하나를 선택해서 만들 수 있다.

<br>

### TCP services

- `Connection-oriented(연결지향형)`
	- TCP는 응용계층 message가 전달되기 전에 `전송계층 제어 정보(transport-layer control information`을 교환한다.
	- 이 교환을 `handshaking`이라고하고, 이는 client와 server가 패킷을 주고받을 수 있게 준비하게끔해준다.
	- handshaking과정이 끝나면, `TCP connection`이라는 양방향 연결이 프로세스 사이에 생기게되고, 이때부터 두 프로세스는 동시에 메세지를 주고받을 수 있게된다.
	- 프로세스가 message전송을 완료하면 이 연결을 끊게된다.

<br>

- `Reliable data transfer(신뢰적 데이터 전송)`
	- 프로세스는 TCP를 사용해 모든 데이터가 `오류없이 순서대로` 전달되게끔할 수 있다.

<br>

- `congestion-control`
	- 통신하는 프로세스의 직접적인 이익이 아닌, 인터넷의 전반적인 품질 향상을 위한 서비스를 포함한다.
	- TCP의 혼잡제어 메커니즘은 수신측과 송신측 사이의 네트워크가 혼잡하면 송신 프로세스를 조절한다.

<br>

- `flow control`
	- 송신측이 수신측의 처리속도보다 빠른속도로 데이터를 보내지 못하게한다.

<br>

- 제공하지 않는 것
	- timing
	- minimum throughput guarantee
	- security

### SSL

- SSL은 응용계층에서 구현된다.
- TCP프로토콜을 강화한다.
	- TCP connection을 암호화한다.
	- 데이터 무결성을 보장한다.
	- end point 인증을 제공한다.

- 응용프로그램이 message를 `SSL socket`에 먼저 던져서 암호화한 다음, 이를 TCP socket에 던지게된다.
- TCP socket은 인터넷을 타고 수신측 host의 TCP socket에 도착하고, SSL socket으로 던져져 암호화가 해제된다.

### UDP services

- `unreliable data transfer`
	- 수신, 송신 프로세스간 비신뢰성 데이터 전송 서비스를 제공한다.
	- 프로세스가 UDP 소켓에 message를 전송하면, UDP는 해당 message가 전송이 될거라는 보장을 하지 않는다.
	- 순서대로 수신되지 않을 수 있다.

<br>

- 제공하지 않는 것
	- congestion-control 메커니즘
	- flow-control
	- throughput guarantee
	- security
	- connection setup

<br>
<br>

## Application Layer Protocol

- 응용계층 프로토콜은 서로 다른 종단시스템에서 동작중인 응용프로그램의 프로세스가 어떻게 message를 서로에게 전달하는지를 정의한다.
- message의 종류(response, request)
- 다양한 message에따라 필드가 어떻게 기술되는지에 대한 구문
- 각 필드의 정보가 어떤 의미인지
- 프로세스가 message를 언제, 어떻게 보내고 받는지에 대한 규칙

<br>

- HTTP와 같은 응용계층 프로토콜은 `RFCs`에 정의되어있다.
- 기업 내부에서 사용되는 프로토콜(카카오톡 LOCO프로토콜)은 여기에 없다.







---
title: "[Computer Network] IP Protocol"
excerpt: "IPv4, IPv6 등등"

categories:
  - computernetwork
tags:
  - computer science
  - Network
  - Network Layer
  - IPv4
  - IPv6
  - Addressing

toc: true
toc_sticky: true

date: 2022-08-10
last_modified_at: 2022-08-11
---


# The Internet Protocol(IP) : IPv4, Addressing, IPv6...

- 오늘날 인터넷의 네트워크 계층에서 가장 중요한 요소이며, 가장 유명한 Internet Protocol(IP)에 대해 알아보자.
- 오늘날, IP는 `IPv4`와 `IPv6` 2가지의 버전으로 작동한다. 
- 이에 대해 공부해보고, 인터넷의 네트워크 계층을 이해하는데에 가장 중요한 요소인 `Addressing`에 대해서도 공부해볼 것이다.

<br>

## 4.3.1 IPv4 Datagram Format

- <img width="740" alt="스크린샷 2022-08-10 오후 7 14 10" src="https://user-images.githubusercontent.com/76278794/183876918-8d6d78bd-a7d1-4c9a-86a5-2b408ecfcbf1.png">

- 네트워크 계층의 패킷은 `Datagram`으로 불린다.
- `IPv4`에서 datagram이 어떻게 이루어져있는지 먼저 알아보자.

1. `Version number`
	- 4bit, IP 프로토콜의 버전을 나타낸다. Version number에 따라서 남은 bit를 어떻게 해석할것인지 결정한다.

<br>

2. `Header length`
	- 4bit, IPv4가 다양한 option을 가질수도 있기에, 실제 Data(payload)가 어디서부터 시작하는지 나타낸다.
	- 대부분의 datagram들이 option을 가지지 않아서, `일반적으로 헤더는 20-byte`를 가진다.(그림에서 option층과 data층 빼면 32bit * 5 = 20byte)

<br>

3. `Type of service`
	- TOS비트는 IPv4헤더에 포함되어있고, 실시간 datagram(ex, IP telephony application)과 비실시간 트래픽(ex, FTP)을 구분하기위해서 사용된다.
	- 전송계층에 대해서 공부하면 TOS비트의 2개가 명시적 혼잡도 알림에 사용된다.

<br>

4. `Datagram length`
	- 헤더와 데이터를 포함한 datagram의 전체 길이를 byte단위로 나타낸다.
	- 16bit이므로 IP datagram의 최대 길이는 65535이다. 
	- 일반적으로 datagram은 1500byte보다 작기에, 오버플로우 등은 크게 고려할 사항은 아니다.

<br>

5. `Identifier, Flags, Fragmentation Offset`
	- 이 3개는 `IP fragmentation`과 관련이 있다.
	- IPv6에서는 이를 허용하지 않는다.

<br>

6. `Time-to-live`
	- TTL 필드는 네트워크에서 datagram이 계속 순환하지 못하게한다.
	- 이 필드의 값은 datagram이 라우터에 의해 처리될때마다 감소하고, 0이되면 이 datagram을 받은 라우터는 이 패킷을 drop해야한다.

<br>

7. `Protocol`
	- IP datagram이 destination에 도착했을때만 사용된다.
	- 이 필드의 값은 IP datagram의 Data(payload)가 전달되어야하는 특정 전송계층 프로토콜을 나타낸다.
	- 이 필드가 6이라면 TCP에, 17은 UDP에 전달된다.
	- 프로토콜 숫자는 네트워크 계층와 전송계층을 연결해준다.
		- 비슷하게, 포트번호는 전송계층와 응용계층을 연결해준다.
		- 링크계층의 프레임에도 네트워크계층와 링크계층을 연결해주는 특수필드가 존재한다.

<br>

8. `Header checksum`
	- datagram을 전달받은 라우터가 bit-error를 발견하게하는 필드이다.
	- 헤더의 각 `2byte를 숫자로 취급`하고, 이 숫자들을 모두 더한 후, `one's complement arithmetic`을 통해 0을 1로, 1을 0으로 바꾼다.
	- 이렇게 더해진 숫자는 checksum 필드에 저장된다.
	- 라우터는 IP datagram을 받을때마다 header checksum을 연산하는데, datagram header의 checksum이 연산된 checksum과 다를 경우 오류를 감지한다. 라우터는 오류가 감지된 datagram을 삭제한다.
	- `TTL필드 및 Option필드`가 바뀔 수 있으므로 checksum은 각 라우터마다 다시 연산되고 저장되어야한다.
	- 가장 빠른 Internet checksum 알고리즘은 [RFC 1071]이다.
	- 전송계층과 네트워크 계층에서 모두 checksum을 연산하는데, 그렇게 하는 이유는
		1. IP header는 IP 계층에서만, TCP/UDP checksum은 TCP/UDP segment에 걸쳐서 연산된다는 차이
		2. TCP/UDP 와 IP가 동일한 프로토콜 스택에 있을 필요가 없다.

<br>

9. `source, destination IP address`
	- source와 destination의 IP 주소를 필드에 작성한다.
	- source host는 destination IP주소를 찾을때 `DNS`를 사용하기도한다.

<br>

10. `Options`
	- IP 헤더의 확장을 허용한다.
	- 거의 사용되지 않는데, 그 이유는 이 옵션처리를 하는데에 오버헤드가 발생하기때문이다.
	- Option필드로 인해 datagram필드가 가변적으로 변하기 때문에, datagram별로 라우터에서 처리되는 시간이 달라진다.
	- 고성능 라우터와 host에서 IP 프로세싱에서 중요한 요소이므로, IPv6에서는 사용되지 않는다.

11. `Data(paylaod)`
	- 전송할 data를 작성하는 필드.
	- 네트워크 계층이 전송계층 segment를 datagram화 시키므로, 이 영역은 전송계층 segment를 의미한다.
	- 위의 경우는 TCP/UDP 프로토콜일때인데, data field는 ICMP 메시지같은 형태의 데이터도 옮길 수 있다.

<br>

- IP datagram 헤더의 길이가 옵션이 없는 일반적인 경우에 20byte임을 공부했는데,
	- `만약 datagram이 TCP segment를 옮긴다면, datagram은 20byte의 IP header에 더해 20byte의 TCP헤더를 포함해 총 40바이트의 헤더를 응용계층 메시지와 함께 옮기게된다.`

<br>
<br>

## 4.3.2 IPv4 Datagram Fragmentation

- <img src="https://user-images.githubusercontent.com/76278794/184073061-7dbc5f26-34a7-4e04-8701-52018d8e6068.png">

- 모든 링크계층 프로토콜이 동일한 크기의 네트워크 계층 패킷을 옮기는 것은 아니다.
- 몇몇 프로토콜은 큰 datagram을 옮길 수 있고, 몇몇은 작은 datagram을 옮긴다.
- 예를들어, 이더넷 frame은 1500byte의 데이터를 옮기는데 반해, wide-area links는 576byte를 옮긴다.
- 링크계층 frame이 옮길 수 있는 데이터의 최대 크기를 `maximum transmission unit(MTU)`라고 한다.
	- 각 IP datagram이 캡슐화되어 링크계층 frame이 되는데, `링크계층 프로토콜의 MTU가 IP datagram의 길이에 대한 제한을 건다.`
	- 문제는 송신자와 수신자 사이의 링크들은 다른 링크계층 프로토콜을 사용할 것이고, 다른 크기의 MTU를 가질 것이라는 것이다.

<br>

- 라우터입장에서, IP datagram을 link로부터 전달받아 이를 포워딩해야한다.
- 포워딩테이블에서 outgoing link를 찾을 건데, `outgoing link의 MTU가 전송해야하는 IP datagram의 크기보다 작다`고 생각해보자.
- 이를 전송하기 위해서, `IP datagram을 작은 크기로 나누어서 전송`한다.
- 나누어진 IP datagram들은 각각 링크 계층 frame으로 캡슐화되어 보내진다.
- 이렇게 잘게 나누어진 datagram들을 `fragment`라고한다.

<br>

- 이 fragment들은 목적지에서 전송계층에 도착하기 전에 재조합되어야하는데, `TCP UDP`는 네트워크 계층으로부터 완전한 datagram을 받도록 고안되어 있기때문에, IPv4에서는 datagram 재조합을 라우터에서 하는게 아닌, end system에서 하게된다.

<br>

- host가 같은 source host로부터 일련의 datagram을 받으면, 재조합을 하기위해 이 datagram이 어떤 datagram의 일부분일지, 아니면 그 자체일지를 판단해야하는데, 
	- 이런 판단을 할 수 있게하는 필드가 `flags, identification, fragmentation offset`필드이다.
	- datagram을 만들면 송신측 호스트는 source, destination 주소뿐만아니라 `identification number`를 작성한다.
	- 일반적으로 송신측 호스트는 datagram을 보낼때마다 `identification number`를 증가시키는데, router가 datagram을 나눠야한다면, `fragment들은 원본 datagram의 source, destination 주소뿐만아니라 identification number`정보가 붙여진다.
	- 특히, IP는 비신뢰성을 가지므로, 모든 fragment가 목적지에 도달하지 못할수도 있는데, 
		- destination host에서는 마지막 fragment의 `flag`를 0으로, 나머지를 1로 설정하는 방법으로 마지막 fragment를 인식하며, 
		- 중간에 소실된 fragment를 확인하기위해 `offset field`를 사용해 fragment를 재조합한다.


<br><br>

## 4.3.3 IPv4 Addressing


- `interface`
	- host는 일반적으로 네트워크에 `단일 link`를 가진다.
		- host가 datagram을 보낼때 이 link를 통해 보내게된다.
		- `호스트와 물리적 link사이의 경계를 interface`라고 한다.
	- 라우터의 역할은 datagram을 link로부터 받아서 다른 link로 포워딩하는 것이다.
	- 라우터는 2개 이상의 link를 가지고 있을 수 있는데, `router와 link 사이 경계도 interface`라고 부른다.
	- 모든 호스트와 라우터가 IP datagram을 주고받을 수 있으므로, `IP는 각각의 호스트와 라우터 자신만의 IP주소를 가진 interface를 필요로한다.`

<br>

- `dotted-decimal-notation`
	- IPv4에서 32bit의 길이를 가지므로, 42억개 가량의 IP주소를 가질 수 있다.
	- 이 주소들은 `dotted-decimal-notation`으로 작성되는데, 각 1byte를 10진법으로 표현하는 방식이다.
	- global internet에서 모든 interface들은 `NATs의 interface를 제외하곤` 모두 `unique`해야한다.
	- interface 주소의 일부분은 interface가 연결된 `subnet`에 의해 결정된다.

<br>

<img src="https://user-images.githubusercontent.com/76278794/184074528-13f7a07e-e8d4-4bcf-80e1-0fed6c3a9543.png">

- 위 그림은 1개의 라우터가 7개의 호스트를 연결하는 그림이다.
- host와 router의 주소를 잘 보면, 왼쪽3개의 host는 `223.1.1.xxx`, 하단은 `223.1.3.xxx`, 오른쪽은 `223.1.2.xxx`로 시작하는 것을 볼 수 있다.
- IP 주소상에서 각 구역의 host들은 모두 같은 `left most 24bit`를 가지고 있다.
- 라우터가 없는 네트워크에 서로 연결되어있다.(그림에서 라우터와 호스트 사이의 빈 공간이 네트워크임)
- 이 네트워크는 이더넷 LAN, 혹은 WIFI등으로 연결된다.

<br>

- `subnet mask`
	- <img src="https://user-images.githubusercontent.com/76278794/184086428-81724538-c263-4736-9b7c-aa976f3d9bb9.png">

	- 왼쪽의 3개의 호스트의 interface와 router의 interface는 `subnet`이라는 것을 구성하게된다.
	- IP addressing은 이 subnet에 `223.1.1.0/24`라는 주소를 부여하게된다.
	- 여기서 `슬래시(/24)를 subnet mask`라고 부른다.
	- 32bit중 24bit가 subnet address를 정의한다는 것을 나타낸다.
	- 따라서, `223.1.1.0/24`라는 subnet은 세개의 호스트 Interface(223.1.1.1, 223.1.1.2, 223.1.1.3)와 라우터 interface(223.1.1.4)로 구성된다.
	- 이 서브넷에 호스트를 추가하고 싶다면, `223.1.1.xxx`형태의 주소로 추가해야한다.

<br>

- 라우터간 연결
	- <img src="https://user-images.githubusercontent.com/76278794/184086584-e0c0e1ae-1d12-438f-854a-28efee213675.png">
	- 라우터 사이이에서도 `subnet`이 구성될 수 있다.
	- 위 그림에서 host와 라우터의 interface가 구성하는 3개의 subnet에 더해
	- 라우터와 라우터를 연결하는 네트워크들 모두 subnet을 구성하게된다.

<br>

- `Classless Interdomain Routing(CIDR)`
	- CIDR은 subnet addressing을 일반화하는데, 32bit IP address는 subnet mask에 의해 두 부분으로 분리된다.
	- 서브넷 마스크는 IP address의 부분 네트워크를 구성하며, 그리고 이는 종종 `prefix`라고도 불린다.
	- 같은 prefix를 공유하는 네트워크를 organiztion이라 칭할때,
		- `organization 밖의 라우터가 destination address가 특정 organization 안으로 포워딩한다면, 서브넷 마스크만을 필요로한다.`
		- `서브넷 마스크bit의 갯수를 뺀 나머지 bit는 organization 내부에서 디바이스를 구분하는데에 사용된다.`
		- 혹은 또 다른 서브넷을 구성하는데에 사용될 수 있다.
	- <img src="https://user-images.githubusercontent.com/76278794/184112762-996b850a-a953-444d-9519-8489b305c2d3.png">
	

<br>

- `Classful addressing`
	- <img src="https://user-images.githubusercontent.com/76278794/184111617-abc885cc-6bfc-449b-ae69-605f77973456.png">
	- <img src="https://user-images.githubusercontent.com/76278794/184407333-1c47605f-9d1b-4bc4-ba7f-26dcb3ed53ea.jpg">
	- CIDR이전에는 IP addressing에서 Classful addressing을 사용했다.
	- 클래스별로 분류해서 네트워크를 구분하는 방식이다.
	- Class D와 E는 특별한 용도로 사용된다.
	- 또한 각 클래스별 주소의 `Start address(== NET ID bit)는 각 디바이스가 자신이 어디에 연결되어있는지 인식하는 용도로 사용`되고, `End address(== 다음 클래스의 NET ID bit - 1)은 broadcast 주소로 사용되어 해당 네트워크에 연결된 기기가 broadcast주소로 패킷을 보내게되면, 네트워크에 연결된 모든 기기가 그 패킷을 받게된다.`
	- Classful addressing은 8, 16, 24bit(class A, B C)의 네트워크 part가 고정된 탓에, 불필요한 주소를 너무 많이 허용한다던가, 너무 적에 허용하는 문제가 있다.


<br>

- `Address aggregation(route aggregation, route summarization)`

	<img width="717" alt="스크린샷 2022-08-18 오후 3 05 22" src="https://user-images.githubusercontent.com/76278794/185306000-41e2464e-1e21-43e4-8c21-a8d90b2499cc.png">

	- 8개의 조직이 `CIDR`을 통해 인터넷에 연결되는 방법에 대해 묘사한다.
	- `Fly-By-Night-ISP`는 `200.23.16.0/20`과 첫 20bit가 일치하는 datagram을 전송하라고 외부에 표현한다.
	- 인터넷의 입장에서는 ISP가 던져주는 datagram의 첫 20bit에만 관심이 있을 뿐, 실제로 8개의 조직과 ISP가 구성하는 subnet들을 알 필요는 없다.
	- 이런 방법을 `Address aggregation`이라고 한다.

<br>

- 하지만, 주소가 계층적구조로 되어있지 않다면 어떻게될까?
- `Fly-By-Night-ISP`가 `ISPs-R-Us`기업을 인수하고, 조직1이 `ISPs-R-Us`로 연결되어야한다면?
	- 조직1의 주소블록은 ISPs-R-Us의 주소블록 바깥에 있으므로, 
		- `ISPs-R-Us`의 주소블록`(199.31.0.0/16)`으로 조직1의 모든 라우터와 호스트의 주소를 이에 속하게 수정해줘야하지만, 이는 비용이 매우 크다.
	- 이에대한 해결책으로, `조직1의 주소를 유지하고, ISPs-R-Us가 조직 1의 주소블록을 제공하면된다.`
	- <img width="746" alt="스크린샷 2022-08-18 오후 3 26 35" src="https://user-images.githubusercontent.com/76278794/185309220-c9e9cb50-05cb-465b-8288-99da888fa9d9.png">


<br>

- `주소블록을 얻는 방법`
	- 어떻게 조직이 각 장치에 주소블록을 얻고, 어떻게 장치들이 조직의 주소블록으로부터 주소가 할당되는지 알아보자.

	- 네트워크 관리자가 조직의 서브넷에서 사용될 IP주소 블록을 얻기위해서 ISP에 이미 할당된 더 큰 주소블록을 제공하는 ISP에 접근해야한다.
	- 예를들어, ISP에는 이미 주소블록 `200.23.16.20/20`이 할당되어있고, 이 주소블록이 8개의 조직을 위한 동일한 크기의 주소블록으로 나뉠 수 있다.
	- <img src="https://user-images.githubusercontent.com/76278794/185417834-27240063-ffed-4672-a0cb-81a9ada8145f.jpeg" width="1200">


<br>
<br>

### DHCP

- Dynamic Host Configuration Protocol

<img src="https://user-images.githubusercontent.com/76278794/185758763-338b109a-12da-46bd-9fed-faff21a24f66.png">

- 위에서 말한 조직이 주소블록을 얻었다면, 이를 통해 각각의 호스트와 라우터 인터페이스에 아이피를 할당할 수 있다.
- `수작업`으로 모든 아이피를 할당할수도 있지만, 일반적으로 `DHCP`를 이용한다.
- 응용계층에 속한 프로토콜로써, 4절차(연결 했던적이 있다면 선행 2개 절차는 생략가능, RFC2131)로 DHCP server로부터 주소를 할당받는다.
- DHCP는 호스트가 주소를 자동으로 얻을 수 있게한다.
- DHCP는 호스트의 아이피를 주는 것 뿐만아니라, 서브넷 마스크, default gateway, local DNS server에 대한 정보를 호스트에게 제공한다.

<br>

- DHCP는 이렇게 자동화된 측면이 있어서 `plug-and-play` 혹은 `zeroconf` 프로토콜이라고도 불린다.



## NAT

- network address translation

- 오늘날 인터넷 공유기에는 NAT 기능이 탑재되어있다.
- 패킷의 소스와 목적지의 IP주소를 NAT translation table을 통해 재기록해준다.

<img src="https://user-images.githubusercontent.com/76278794/185757300-100300ba-7df7-4fa4-9070-ab5ec064f566.png">

- 로컬 네트웨크 내에 있는 모든 호스트들은 private ip(사설 IP)를 가진다.
	- (10/8, 172.16/12, 192.168/16)
- 장점
	1. 호스트에 IP를 주기위해서는 router에 1개의 IP주소만 주면된다.
	2. 로컬 네트워크 내의 호스트의 주소를 라우터 밖의 네트워크에 상관없이 변경이 가능하다.
	3. 로컬 네트워크 내의 주소와 상관없이, ISP의 주소를 바꿀 수 있다.
	4. 로컬 네트워크의 IP주소가 직접적으로 표현되지 않는다.

- 작동
	- `outgoing datagram replace`
		- source의 IP주소와 포트를 NAT IP adderss와 새로운 port로 변환한다
	- `remember`
		- 위 두개가 어떻게 변환되는지 기억하고 있어야한다.
	- `incoming datagram replace`
		- NAT table에서 destination의 IP주소와 포트를 source의 IP주소와 포트로 변환한다.

- 논쟁
	- 주소의 부족은 IPv6로 해소되었다.
	- 라우터는 layer 3까지만 처리해야하는데, 포트번호(응용계층)까지 수정해버린다.
	- 클라이언트가 NAT건너의 서버에 접속하고싶을때는 어떡하는가?

<br>
<br>

## IPv6

- 인터넷의 유래는 원래 국방부에서만들어진 ARPANET이다.
- 1970년대에는 인터넷이 이렇게 발달할 줄 몰랐기에, IP주소를 43억개 가량(4byte)로하면 충분할 줄 알았으나, 오늘날에는 이로는 부족하게 되었다.
- <img width="594" alt="스크린샷 2022-08-21 오후 2 47 01" src="https://user-images.githubusercontent.com/76278794/185777454-53deb98d-84a3-417b-aacd-c31498ffe505.png">

### 형식

- 고정된 헤더크기 : IPv4에서는 optional 포맷이 존재해서 가변크기의 헤더를 가지지만, IPv6는 40byte의 고정된 헤더크기를 가진다.

- 버전 : 데이터그램이 IPv4인지 IPv6인지
- 트래픽 클래스 : 특정 데이터그램들에게 흐름 내에서 우선순위를 줄 수도 있다.
- 확장된 주소 : IPv4에서는 주소가 32bit였으나, IPv6에서는 IP 주소의 크기를 128bit까지 확장한다.
- Flow label : IP가 비연결성이나, 흐름 라벨을 통해 연결지향성을 가질 수 있게 할 수 있다.
	- 라우터가 흐름 라벨 테이블을 유지하는데, 각 흐름별 요구사항을 만족시켜 특정한 처리가 가능하다.
- Payload length : 데이터그램 헤더를 포함해 데이터그램의 총 길이를 바이트단위로 표현한다.
- Next header : 이 데이터그램이 어느 프로토콜에 전달될지를 나타낸다, 전송계층에 전달된다면 TCP나 UDP가 될 것.
- Hop limit : 패킷이 이동할 수 있는 최대 횟수를 나타낸다. 0이되면 패킷이 삭제된다.

<br>

### IPv4 -> IPv6(터널링)

- IPv4 기반 시스템과 IPv6기반 시스템간 통신이 불가능할까? 
- 이는 일반적으로 `터널링`을 통해 IPv4패킷을 IPv6로 변환해서 해결한다.
- 터널링은 IPv6의 데이터그램을 IPv4의 payload로 옮기는 것을 의미한다.
- <img width="735" alt="스크린샷 2022-08-21 오후 3 22 35" src="https://user-images.githubusercontent.com/76278794/185778422-64411689-9730-48a3-ae86-a940f76c0725.png">

<br>

- IPv4 라우터를 모두 IPv6로 대체하는 것은 시간이 오래걸리기에, IPv6 라우터 사이에 IPv4라우터 네트워크가 존재할 수 있다.
- <img width="656" alt="스크린샷 2022-08-21 오후 3 30 57" src="https://user-images.githubusercontent.com/76278794/185778677-d4775e13-acc3-4a9c-8ad5-7b44cfb99185.png">
- 이 경우, 일반적으로 B와 E 라우터는 IPv6, IPv4를 모두 사용할 수 있는 듀얼 스택 라우터이다.
- IPv4 네트워크 망으로 들어가는 라우터인 B에서 C라우터에 IPv6 데이터그램을 캡슐화해 IPv4 데이터그램화시키고, 이 데이터그램이 IPv4 네트워크 망을 빠져나올 시점인 E에서는 F에 캡슐화를 해제해서 IPv6 데이터그램화 시켜 F에 전달한다.

<br><br>

Ref : [컴퓨터 네트워크 - 하향식 접근](https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm)  
	[StackOverFlow:Why can't I use the first or last address in a subnet?](https://superuser.com/questions/1111437/why-cant-i-use-the-first-or-last-address-in-a-subnet)  
	[geeks for geeks Classfull IP addressing](https://www.geeksforgeeks.org/introduction-of-classful-ip-addressing/)

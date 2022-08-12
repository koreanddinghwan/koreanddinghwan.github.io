---
title: "[Computer Network] Network Layer"
excerpt: "for net-practice"

categories:
  - computernetwork
tags:
  - computer science
  - Network
  - Network Layer
  - control plane
  - data plane
  - routing table

toc: true
toc_sticky: true

date: 2022-08-07
last_modified_at: 2022-08-10
---

Ref : [컴퓨터 네트워크 - 하향식 접근](https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm)

# 4 네트워크 계층 : data plane

- 전송계층은 네트워크 계층의 호스트간 통신 서비스를 이용해 다양한 프로세스간 통신 서비스를 제공한다.
- 전송계층은 네트워크 계층에서 구현된게 뭔지 알 수 없는데, 네트워크 계층에서 일어나는 호스트간 통신 서비스는 어떻게 일어날까?

<br>

- 네트워크에 존재하는 모든 호스트와 라우터는 네트워크 계층을 가지고 있으므로, 네트워크 계층의 프로토콜을 공부하는 것은 인터넷 프로토콜 스위트에서 가장 어렵다.

## data-plane & control-plane

- 네트워크 계층을 공부할때는 2가지로 나눠서 공부하게되는데,
  - `data plane`
    data plane은 라우터에 도착한 input link의 datagram이 어떻게 output link로 포워딩되는지 결정하는 역할을 한다.

    - `전통적인 IP 포워딩`(datagram의 destination 주소에 의존해 포워딩하는 방법)과 
    - `generalized 포워딩`(포워딩뿐만아니라, datagram의 헤더의 다른 필드를 사용해 작동한다.)
    - 또한 IPv4 와 IPv6를 공부하게된다.  

  - `control plane` 
    control plane은 soure host로부터 destination host로 datagram이 라우터를 타고 전달될때 어떻게 이를 제어하는지 로직에 대해 공부한다..
    - `OSPF`, `BGP`같은 라우팅 알고리즘에 공부하게된다.
  
- 전통적으로 control-plane 라우팅 프로토콜과 data-plane 포워딩은 융통성없이 라우터에 함께 구현되어왔다.  
`Software-defined networking(SDN)`은 control-plane을 `remote controller`라는 분리된 서비스로 구현함으로써 분리한다.  

- 네트워크 계층을 공부할때는 data-plane과 control-plane이 네트워크 계층에서 어떻게 작동하는지 구분해서 공부하는게 컴퓨터 네트워크에서 네트워크 계층이 어떤 역할을 하는지 현대적인 관점으로 볼 수 있으며, 구조화된 공부를 할 수 있게 해준다.

<br>
<br>

# 4.1 Network layer overview

<img width="800" alt="Screen Shot 2022-08-08 at 1 43 01 PM" src="https://user-images.githubusercontent.com/76278794/183340849-8a9dd2fa-0688-4b5c-b1fc-bb31a68c0740.png">

- end system H1과 H2간 네트워크 예시
- 이 사이에는 수많은 router가 존재한다.
- H1이 H2에 정보를 보내고싶어한다고 생각할때, 네트워크 계층이 호스트들과 사이의 라우터에서 어떤 역할을 할까?

- H1의 네트워크 계층은 전송계층으로부터 segment를 받아서 캡슐화를 통해 datagram을 만들고, 이를 인접한 라우터에 보낸다.
- H2의 네트워크 계층은 인접한 R2라우터로부터 datagram을 전달받는데, 전송계층 segment를 추출하고, 이 segment를 전송계층에 전달한다.
- 각 라우터의 `data-plane`의 역할은 input link의 datagram을 output link로 포워딩하는 것이다.
- `control-plane`의 역할은 datagram이 완전하게 전달되도록 `포워딩을 조직화`하는 것이다.
- 라우터들은 응용계층, 전송계층의 프로토콜을 사용하지 않기때문에 네트워크 계층 위의 프로토콜 스택은 없다.


## 4.1.1 Forwarding and Routing : Data-Plane and Control-Plane

### network-layer functions

- 포워딩과 라우팅은 혼재되어 사용되는데, 공부할때는 이를 엄격하게 구분해서 해야 구조화하기 쉽다.

1. 포워딩
  - 라우터의 input link로 들어온 패킷을 적절한 output link로 보낸다.
  - 포워딩은 data-plane의 한 기능이다.
  - 포워딩은 `패킷을 input link interface에서 output link interface로 전달하는 라우터 내부 행동`이다.
  - 포워딩은 매우 짧은 시간에 일어나며, 하드웨어단에서 일어난다.

2. 라우팅
  - 송신측에서 들어온 패킷을 수신측으로 전달할때 route나 path를 정해야한다.
  - 이를 계산하는 알고리즘을 `routing algorithm`이라고한다.
  - 라우팅은 control-plane에 구현되어있다.
  - `source에서 destination으로 패킷을 전달하는 경로를 결정하는 네트워크 전체의 프로세스`를 말한다.
  - 라우팅은 포워딩보다 긴 시간동안 일어나며, 소프트웨어에서 일어난다.

<br>

### routing table


- 모든 네트워크 라우터의 핵심적인 요소는 `routing table`이다.
- 라우터는 전달받은 패킷의 헤더의 1개이상의 필드의 값을 분석해 이 헤더값들을 인덱스로 사용해 포워딩 테이블의 넣는다.
- 포워딩 테이블에 저장된 값들은 패킷이 포워딩될 라우터의 outgoing link를 의미하게된다.

  - 예를들어, 헤더필드의 값이 `0110`이라면, 라우터는 포워딩테이블에서 이를 key로 사용해 output link interface가 2임을 결정하게된다.
  - 그리고 라우터는 내부적으로 해당패킷을 interface 2로 포워딩한다.

- 포워딩은 data-plane에서 일어나는 네트워크 계층의 핵심적인 기능이다.

<br>

### Control Plane:The Traditional Approach

<img width="925" alt="Screen Shot 2022-08-08 at 2 03 37 PM" src="https://user-images.githubusercontent.com/76278794/183342991-432d49d3-eaeb-4db5-892a-b010b3abf278.png">

- 라우팅 테이블이 어떻게 미리 설정되어있을까?
- 이에대한 고민은 라우팅과 포워딩의 중요한 상호작용을 나타낸다.

<br>

- 라우팅 알고리즘은 포워딩 테이블의 내용을 결정한다.
- 라우팅 알고리즘은 각각의 모든 라우터에서 실행되며, 이 라우터는 각각 포워딩과 라우팅 기능을 포함한다.
- 한개의 라우터의 라우팅 알고리즘 기능은 포워딩 테이블의 값을 계산하기위해서 다른 라우터의 라우팅 알고리즘 기능과 통신한다.
- 이 통신은 `라우팅 프로토콜`에 의해서 라우팅 정보를 잠은 라우팅 메세지를 교환하믕로써 일어난다.

<br>

### Control Plane:The SDN Approach

<img width="800" alt="Screen Shot 2022-08-09 at 12 37 56 PM" src="https://user-images.githubusercontent.com/76278794/183558753-020e1ce0-48f3-492a-b05b-70daf8a867d1.png">

- 각각의 라우터가 다른 라우터의 라우팅 요소와 통신하는 전통적인 접근은 최근까지도 자주 사용되었다.
- 위의 그림은 물리적으로 분리된 `remote controller`가 각각의 라우터에서 사용될 포워딩 테이블을 연산하고 배분한다.
- Traditional Approach와 똑같은 data plane 요소를 가지지만, control-plane 라우팅 기능은 물리적인 라우터로부터 분리되어있다.
  - SDN Approach에서 라우터는 오직 포워딩 기능만하고, remote controller가 포워딩 테이블을 연산하고 분배하게된다.

<br>

- `Remote Controller`
  - remote controller는 높은 안정성과 중복성을 갖춘 data center에서 구현되어 있을 수 있으며, ISP나 써드파티에 의해 관리될 수 있다.
  - 라우터와 remote controller가 통신하는 방식은 포워딩테이블과 라우팅에 필요한 정보를 담은 message를 교환함으로써 일어난다.
  - 이런 remote controller는 소프트웨어로 구현되는데, 오픈소스로 공개되고 있다.

<br>

## 4.1.2 Network Service Model

- 네트워크 계층이 제공하는 몇가지 형태의 서비스를 먼저 살펴보자.
- 전송계층이 패킷을 네트워크에 보내면, 전송계층은 패킷을 목적지에 전달할 수 있을까?
- 복수의 패킷이 보내지면, 보내진 순서대로 전송계층에 도달할까?
- 2개의 연속된 패킷을 보낼때 이 사이의 시간이 받을때의 시간차이와 동일할까?
- 네트워크가 혼잡성에 대해 피드백을 제공할까?

위와 같은 질문들은 네트워크 계층이 제공하는 서비스 모델에 의해 결정된다.
- `network service model`은 송신측과 수신측의 패킷 전달의 특성을 결정한다.

<br>

- 네트워크 계층이 제공하는 서비스들
  1. `Guaranteed delivery`
    - 소스 호스트가 전달하는 패킷이 목적지 호스트에게 전달될 것이라는 것을 보장.
  2. `Guaranteed delivery with bounded delay`
    - 패킷 전달의 보장뿐만아니라, 지정된 host-to-host 지연 범위 내에 전달될 것이라는 것을 보장
  3. `In-order packet delivery`
    - 패킷이 전송된 순서대로 도착한다는 것을 보장
  4. `Guaranteed minimal bandwidth`
    - 지정된 비트 전송 속도로 작동한다는 것을 보장.
    - 송신측 호스트가 지정된 속도로 비트를 보내면 모든 패킷이 목적지 호스트로 전달된다는 것을 보장한다.
  5. `Security`
    - 네트워크 계층이 모든 datagram을 암호화해 전송계층 segment들의 비밀을 보장한다.
  
이것들은 네트워크 계층이 제공하는 서비스의 일부분이다.

<br>

- `best-effort service`
  - 인터넷의 네트워크 계층이 제공하는 단일한 서비스.
  - Guaranteed delivery, Guaranteed delivery with bounded delay, Guaranteed minimal bandwidth를 보장하지 않는다.
  - 마치, 제공하는 서비스가 전혀 없다는 것을 의미하고, 또는 대상에 패킷을 전달하지 않는 네트워크도 이 정의를 충족한다.

다른 네트워크 아키텍쳐들은 이를 뛰어넘는 서비스 모델을 정의하고 구현했다.  

- `ATM(Asynchronous Transfer Model) network architecture`는 inorder delay, bounded delay, minimal bandwidth를 제공한다.

- `Interserv architecture`는 end-end delay와 congestion-free 통신을 제공한다.

흥미로운 점은, 이렇게 많은 대안들이 있음에도 불구하고, `적절한 대역폭`을 제공하는 `best-effort service`는 넷플릭스, 스카이프 페이스타임 등의 넓은 범위의 어플리케이션을 구동할 수 있을 정도로 충분히 좋다는 것이 증명되었다.  


<br>
<br>

# 4.2 What's Inside a Router?

<img width="886" alt="Screen Shot 2022-08-09 at 8 05 25 PM" src="https://user-images.githubusercontent.com/76278794/183632832-899e10ec-a078-4699-8fe8-fec2a2c530ce.png">

- `router's four components`

  1. `input ports`
    - 라우터에서 들어오는 물리적 링크를 종료하는 `물리적 계층의 기능`을 한다.(`line termination`)
      - 이는 input port의 가장 왼쪽 박스와 output port의 가장 오른쪽 박스로 나타낸다.
    - `링크계층의 기능`도 수행한다.(`Data link processing`)
      - 들어오는 링크의 링크 계층과 상호운용되어야한다.
      - 이는 input port와 output port의 중간 박스로 나타낸다.
    - `lookup function`
      - 도착한 패킷이 switching fabric을 통해 어느 output port로 나가야하는지 결정하기 위해 포워딩 테이블을 참조한다.
      - input port의 가장 오른쪽 박스에서 일어난다.
    - 프로토콜 정보를 담는 `Control packet`들이 input port에서 routing processor로 전달된다.
    - 이 input port와 output port들은 물리적인 input interface와 output interface이다.

  <br>

  2. `switching fabric`
    - 라우터의 input port와 output port를 연결한다.
    - <img src="https://user-images.githubusercontent.com/76278794/183713563-0b967388-deb9-4148-81ea-7c33498276aa.png" width="600">

  <br>

  3. `output ports`
    - switching fabric이 전달한 패킷을 저장하며, 이 패킷들을 link layer, physical layer기능을 수행해 outgoing link로 전송한다.
    - 링크가 양방향일때, output port는 일반적으로 동일한 line card에 있는 해당 링크의 input port와 쌍을 이룬다.

  <br>

  4. `routing processor`
    - 라우팅 프로세서는 `control-plane`의 기능을 한다.
    - `traditional` 라우터는 라우팅 프로토콜을 수행하고, 라우팅 테이블을 유지하며, 링크의 상태 정보를 붙이고, 라우터를 의한 포워딩 테이블을 구성하낟.
    - `SDN` 라우터는 라우팅 프로세서는 `remote controller`가 연산한 포워딩 테이블 목록을 받기위해 remote controller와 통신하는 책임만 있다.
    - 라우팅 프로세서는 네트워크 관리 기능도 수행한다.

<br>

- input port, output port, switching fabric같은 data-plane 하드웨어가 `나노초`단위로 작업을 수행하는데 반해,  
- 라우팅 프로토콜을 수행하고, 올라가거나 내려가는 연결된 링크에 응답하고, SDN에서 remote controller와 통신하고, 네트워크 관리를 하는 기능들은 `밀리초 ~ 초`단위로 수행된다.  
  - 이런 `control plane` 기능들은 소프트웨어에 구현되어있으며, 라우팅 프로세서에 의해 실행된다.  

<br>

## 4.2.1 Input Port Processing and Destination-Based Forwarding

<img src="https://user-images.githubusercontent.com/76278794/183710999-84b9f26d-51fc-4dfa-8ee8-dffd31adb75a.png" width="800">

- 위의 4.2의 처음 그림에서 input port의 3개의 박스는 이렇게 정리할 수 있다.
  - `Line termination`
    - 위에서 언급했듯, 물리적 계층의 기능을 구현한다.  

  <br>

  - `Data link processing(protocol, decapsulation)`
    - 마찬가지로, 링크계층의 기능을 수행한다.

  <br>

  - `lookup`
    - 라우터의 작업중 가장 중요한 요소.
    - `도착한 패킷을 forwarding table을 참조해 switching fabric을 통해 어떤 output port로 나가야하는지를 정한다.`
      - 물론, 이 포워딩 테이블은 라우팅 프로토콜을 사용하거나, 다른 네트워크의 라우팅 프로세서를 사용하거나, SDN remote controller를 통해 받는다.
    - 포워딩 테이블은 4.2의 첫 그림에서 `라우팅 프로세서 -> input port`로 이어진 점선으로 표시된 별도의 `BUS(PCI 버스)`를 통해 `line card`로 복사된다.  
    - 각각의 input port마다의 line card로 복사되기 때문에 패킷마다 중앙집중된 라우팅 프로세서를 호출하지 않고 포워딩 결정을 지역적으로 할 수 있으므로, 중앙 처리 병목현상을 방지할 수 있다.  

<br>

- `Destination Based Forwarding`
  - <img src="https://user-images.githubusercontent.com/76278794/183714295-3f49fc4e-9294-45fa-bf24-e253be1068e3.png" width="800">
  - 정말 간단한 `Destination Based Forwarding`에 대해 언급한다.
  - 32비트 IP 주소에서, 가능한 모든 경우의 수에 대해서 포워딩 테이블을 브루트포스 방식으로 구현하면 42억개정도가 나온다.
  - 이렇게 구현할 필요 없이, 포워딩 테이블을 4개의 목록으로 나눠서 구현할 수 있다.
  - <img src="https://user-images.githubusercontent.com/76278794/183715280-0c852f41-f748-4a0d-9ca9-52508f02b088.png" width="600">
  - 이 방법이 `longest prefix matching` 방법이다.

<br>

- `Longest prefix matching`
  - 두가지의 예시로 설명한다.
  - <img src="https://user-images.githubusercontent.com/76278794/183724527-3d3e9e21-77eb-41cf-b99b-d9d672e592a2.png" width="500">  

    - 첫번째 DA는 포워딩 테이블의 첫번째 목록과 첫 21bit가 일치하므로, 라우터는 패킷을 interface 0으로 포워딩한다.
    - 두번째 DA는 포워딩 테이블의 두번째 목록과 24bit, 세번째 목록과 21bit가 일치하는데, 이처럼 복수의 목록과 bit가 일치할 경우, 라우터는 `Longest prefix matching rule`을 적용해 가장 긴 bit가 일치하는 두번째 목록으로 포워딩한다.
    - 좀 더 자세한것은 4.3에서 설명한다.

<br>

- 하드웨어 로직이 포워딩 테이블에서 logest prefix match만을 찾기때문에 lookup자체는 굉장히 쉽다.
- 다만, 기가바이트 단위의 큰 전송시간에서, lookup은 나노초 단위에서 일어나야하므로, 큰 테이블에서 선형적인 탐색이 요구되는데, fast lookup algorithm을 찾아볼 수 있다.
- 메모리 접근시간에 특별한 주의를 기울여야하기에, DRAM과 SRAM 메모리를 사용할 수 있다ㅏ.
- 특히 `TCAM(Ternary Content Addressable Memory)`가 lookup에 자주 사용된다.
  - TCAM을 사용하면 32bit IP 주소가 메모리에 표현되어 상수시간 안에 해당 주소에 대한 포워딩 테이블의 목록을 반환한다.

<br>

- 패킷의 ouput port가 lookup에 의해 정해지면, 해당 패킷은 switching fabric을 통해 전달된다.
- 몇몇 디자인에서, 패킷이 switching fabric에 전달되기전에 일시적으로 `block`될 수 있는데, block된 패킷은 input port의 queue에 들어가게되며, 스케쥴화된다. 
- lookup에 대해 많이 알아봤지만, 물리적 계층과 링크 계층 프로세싱이 반드시 일어나야하고, 패킷의 버전이 확인되어야하며, checksum과 time-to-live 필드는 확인뿐만아니라 재작성되어야한다. 또한, 네트워크 관리에 사용되는 카운터또한 업데이트 되어야한다.

<br>

- `match plus action`
  - 패킷이 destination IP address를 찾는 (match), 그리고 패킷을 switching fabric으로 전송하는(action)을 일컫는 말.
  - 위의 예시는 라우터뿐만 아니라 네트워크 기기들에서 수행되는 것들의 예시 중 하나일 뿐이다.

<br>

## 4.2.2 Switching

- 패킷이 실제로 input port로부터 output port로 포워딩되는 곳은 switching fabric이다.
- 이러한 Switching은 다양한 방식으로 구현된다.

1. Switching via memory
  - <img src="https://user-images.githubusercontent.com/76278794/183809478-1c14a176-0329-4c13-80b0-9b6d298a4f4c.png" width="600">
  - 오래전 라우터와 전통적인 컴퓨터는 Switching을 CPU의 직접적인 제어(routing processor)로 구현했다.
  - input port와 output port가 전통적인 컴퓨터의 `I/O device`처럼 작동했다.
  - 패킷이 도착한 input port는 routing processor에 `interrupt`를 보내고, 해당 패킷은 routing processor로 복사됬다.
  - routing processor는 패킷의 헤더에서 도착지 주소를 추출하고, look up을 수행하고, 다시 해당 패킷을 output port의 버퍼로 복사한다.
  - 초당 최대 B의 패킷이 쓰이거나 읽힐 수 있을 때, input port에서 output port로 패킷이 전달되는 전체 속도(포워딩 처리량)은 B/2보다 작아야한다.
  - shared system bus를 통해 한번에 하나의 읽기/쓰기 작업만 할 수 있으므로, 두 패킷이 다른 output port를 가지더라도 동시에 전달될 수 없다.
  - 이러한 방법은 공유 메모리 멀티 프로세서와 매우 유사한데, line card에서 프로세싱되어 패킷이 적절한 output port의 메모리로 전달되는게 비슷하다.

<br>

2. Switching via a bus
  - <img src="https://user-images.githubusercontent.com/76278794/183815939-25870f5e-43a6-48c3-bf97-135ca2794982.png" width="600">
  - `라우팅 프로세서의 개입 없이` input port는 패킷을 output port에 공유 버스를 사용해 직접 패킷을 전달한다.
  - input port가 패킷에 스위치 내부 라벨(헤더)를 미리 넣고, 패킷이 어디로 전송될지 local output port를 표시하고 패킷을 버스로 전송한다.
  - 모든 output port가 패킷을 수신하지만, 미리 넣어놓은 라벨과 일치하는 포트만 패킷을 유지한다.
  - 동시에 목적지가 다른 여러 패킷이 도착했을때는 하나의 패킷만 버스에 유지될 수 있으므로, 스위칭 속도는 버스의 스피드로 한정된다.

<br>

3. Switching via interconnection network
  - <img src="https://user-images.githubusercontent.com/76278794/183816019-3cd38532-587a-4cc0-ae77-e8d5328e0e35.png" width="400" height="500">
  - bus를 통해 패킷을 전달하는 것은 한번에 하나의 패킷만 bus에 담을 수 있다는 단점이 있다.
  - 따라서, 멀티프로세서 컴퓨터 아키텍처의 프로세서를 연결하는 것처럼 상호연결 네트워크를 사용하는 것이다.

<br>

## 4.2.3 Output Port Processing

- <img src="https://user-images.githubusercontent.com/76278794/183821279-84bd78cd-9b3a-4ff7-bf9c-bd950fb4bf73.png">
- output port processing은 output port의 메모리에 저장된 패킷을 output link로 전송한다.
- 이는 전송을 위한 패킷을 선택하고, dequeuing하고, 필요한 링크계층, 물리적계층 전송 기능을 수행하는 것을 포함한다.


<br>

## 4.2.4 Where Does Queuing Occur?

- 패킷의 queue는 input port와 output port 모두에서 형성된다.
- 이런 큐들은 메모리가 부족해 고갈될 수 있어서 `packet loss`가 발생하게된다.
- N개의 input port와 N개의 output port가 있을때, input line과 output line의 속도가 Rline의 속도로 패킷을 전달한다 가정
- 패킷을 어떤 링크로 전달하든, 동일한 시간이 걸린다고 가정하자.
- Rswitch를 input port에서 output port로 switching fabric의 전송속도를 정의한다고 할때,
  - 만약 Rswitch가 Rline보다 N배 빠르다면, 최악의 상황에서도 큐는 거의 비어있을 것이다.

<br>

- `input queuing`
  - <img src="https://user-images.githubusercontent.com/76278794/183824607-9fc8bdf6-9d5e-49cf-a0f5-b0951d419dc2.png"> 
  - 그런데, 만약 Rswitch가 충분히 빠르지 않다면, 어떻게 될까?
  - `switching fabric은 한 번에 하나의 패킷만 전달할 수 있다 가정하에`, 2개의 패킷 중 하나는 block상태로 input queue에 있을 것이다.
  - 이 예시에서, 좌측 하단 Line의 뒤쪽 패킷은 output port가 비어있어서 경합이 발생하지 않음에도 앞쪽 패킷이 좌측 상단의 패킷과 경합이 생겼기에 block되어버린다.
  - 이런 현상은 `head-of-the-line(HOL) blocking`현상이라고도하는데, block된 다른 패킷이 존재할 경우, output port가 아무런 일을 하지 않더라도 input queue의 패킷이 기다려야하는 것을 의미한다.
  - HOL현상으로 인해 Input queue는 기하급수적으로 증가할 것이고, 이에따라 packet loss가 발생할 가능성이 커질 것이다.
  - 이런 HOL현상을 해결하는 방법에는 `virtual output queues`라는 해결책 등이 존재한다.

<br>

- `output queuing`
  - <img src="https://user-images.githubusercontent.com/76278794/183824920-662c4cf9-bfcc-491a-9132-a53850dbd349.png">
  - Rswitch가 Rline보다 N배 빠르고, N개 포트 모두 동시에 같은 output port로 방향이 정해졌다고 생각해보자.
  - 동시에 여러개의 패킷을 전송할 수 있기에 1개의 패킷을 전송하는 단위 시간에 3개의 패킷 모두 output port의 queue에 전송되게된다.
  - 이에따라 output port의 queue에서도 packet loss가 발생할수도 있다.

  - 다음 단위시간에 2개의 패킷이 도달하는데, 하나의 패킷이 아까랑 똑같은 output port로 향하는 것을 볼 수 있다.
  - 여기서 `packet scheduler`가 output port에서 어떤 패킷을 먼저 outgoing link로 전송할지 결정하게된다.

<br>

## 4.2.5 packet scheduling

- 큐에 있는 패킷을 어떤 순서로 보낼것인지 결정한다.

- `FIFO`
  - <img width="885" alt="스크린샷 2022-08-10 오후 4 19 00" src="https://user-images.githubusercontent.com/76278794/183839309-1368c065-2d07-499f-b61c-81f0617c2816.png">

  - 선입선출 방식의 스케쥴링은 도착한 순서대로 패킷을 보낸다.
   - <img width="1038" alt="스크린샷 2022-08-10 오후 4 22 31" src="https://user-images.githubusercontent.com/76278794/183839956-0017412e-8662-4ca6-929d-78b34beb24df.png">

<br>

- `Priority queuing`

  - <img width="814" alt="스크린샷 2022-08-10 오후 4 23 48" src="https://user-images.githubusercontent.com/76278794/183840183-f9a24c4c-e464-44bf-941c-e640867d2a64.png">

  - 패킷이 도착하는 즉시 우선순위를 파악해 우선순위 클래스로 분류한다.
  - 각각의 우선순위 클래스는 자신만의 큐를 가지고 있으며 전달될 패킷을 결정할때, 높은 우선순위의 큐부터 전송을 시작한다.
  - <img width="1034" alt="스크린샷 2022-08-10 오후 4 27 25" src="https://user-images.githubusercontent.com/76278794/183840894-52398e2e-c130-40ca-a01d-b3b6ee515306.png">
  - 1과 3이 높은 우선순위의 패킷이라 가정할때, 2가 3보다 먼저 도착했음에도 불구하고 3의 전송을 먼저 처리한다.
  - 또한 패킷4를 보면 낮은 우선순위의 패킷이 처리되는 도중에 도착했는데, 이때는 처리되고있는 패킷의 처리를 완료한 후에 처리한다.
    - 이를 `non-preemptive packet queuing`이라고 하며, 비선점 패킷 큐이다

- `Round Robin and Weighted Fair Queuing`

  - 라운드로빈 큐를 사용하면 패킷은 우선순위 큐를 사용하는 것처럼 클래스별로 정렬된다.
  - 하지만, 라운드로빈은 우선순위를 우선시하기보다는, 클래스 간 균등한 처리를 하는 것을 제공한다.
  - 라운드로빈 스케쥴링은 클래스 1패킷이 전송되면, 클래스2 패킷을 전송하고, 이어서 클래스 1패킷, 클래스 2 패킷을 계속 전송한다.
    - 이런 방식을 `work-conserving queuing`이라고 하며, 전송 대기중인 패킷이 있을때 link가 idle상태에 있는 것을 방지한다.
    - 지정된 클래스의 패킷을 먼저 찾지만, 찾을 수 없으면 다음 클래스의 패킷을 찾는다.
    - <img width="1036" alt="스크린샷 2022-08-10 오후 6 27 48" src="https://user-images.githubusercontent.com/76278794/183866745-205fa85e-9fa1-4964-938f-d8dd813cec58.png">
    - 패킷 1,2,4가 클래스1, 3,5가 클래스2에 속한다.
    - 패킷 1은 output queue에 오자마자 전송이 시작되고, 이 와중에 패킷 2와 3이 도착한다.
    - 패킷 1의 전송이 끝나면 link 스케쥴러는 클래스2의 패킷을 찾기때문에 패킷3가 전송된다.
    - 패킷 3의 전송이 끝나면 다시 클래스1의 패킷을 찾기에 패킷2가 전송된다.

  - 라운드 로빈 큐의 일반화된 형태는 `weighted fair queuing(WFQ)`이다.
    - <img width="865" alt="스크린샷 2022-08-10 오후 6 20 59" src="https://user-images.githubusercontent.com/76278794/183865217-403556a2-697a-48f9-8eaf-0a449d71f6ce.png">

    - WFQ는 도착한 패킷을 클래스별로 큐로 유지하되, 라운드로빈 스케쥴링을 통해 클래스 1,2,3 을 순환하면서 전송하게된다.
    - WFQ는 `work-conserving queuing`이기때문에 클래스 큐가 비어있으면 즉각 다음 클래스로 이동한다.

<br>
<br>


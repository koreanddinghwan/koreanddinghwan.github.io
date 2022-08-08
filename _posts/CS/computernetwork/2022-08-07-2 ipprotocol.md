---
title: "[Computer Network] Network Layer"
excerpt: "for net-practice"

categories:
  - computernetwork
tags:
  - computer science
  - Network
  - Ip Protocol
  - Network Layer

toc: true
toc_sticky: true

date: 2022-08-07
last_modified_at: 2022-08-08
---

Ref : [컴퓨터 네트워크 - 하향식 접근](https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm)

# 네트워크 계층 : data plane

- 전송계층은 네트워크 계층의 호스트간 통신 서비스를 이용해 다양한 프로세스간 통신 서비스를 제공한다.
- 전송계층은 네트워크 계층에서 구현된게 뭔지 알 수 없는데, 네트워크 계층에서 일어나는 호스트간 통신 서비스는 어떻게 일어날까?

<br>

- 네트워크에 존재하는 모든 호스트와 라우터는 네트워크 계층을 가지고 있으므로, 네트워크 계층의 프로토콜을 공부하는 것은 인터넷 프로토콜 스위트에서 가장 어렵다.

## data-plane & control-plane

- 네트워크 계층을 공부할때는 2가지로 나눠서 공부하게되는데,
  - `data plane`
    data plane은 라우터에 도착한 input link의 datagra이 어떻게 output link로 포워딩되는지 결정하는 역할을 한다.

    - `전통적인 IP 포워딩`(datagram의 destination 주소에 의존해 포워딩하는 방법)과 
    - `generalized 포워딩`(포워딩뿐만아니라, datagram의 헤더의 다른 필드를 사용해 작동한다.)
    - 또한 IPv4 와 IPv6를 공부하게된다.  

  - `control plane` 
    control plane은 soure host로부터 destination host로 datagram이 라우터를 타고 전달될때 어떻게 이를 제어하는지 로직에 대해 공부한다.
  으로 나누어서 공부하게된다.
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

<img width="925" alt="Screen Shot 2022-08-08 at 2 03 37 PM" src="https://user-images.githubusercontent.com/76278794/183342991-432d49d3-eaeb-4db5-892a-b010b3abf278.png">

- 모든 네트워크 라우터의 핵심적인 요소는 `routing table`이다.
- 라우터는 전달받은 패킷의 헤더의 1개이상의 필드의 값을 분석해 이 헤더값들을 인덱스로 사용해 포워딩 테이블의 넣는다.
- 포워딩 테이블에 저장된 값들은 패킷이 포워딩될 라우터의 outgoing link를 의미하게된다.

  - 예를들어, 헤더필드의 값이 `0110`이라면, 라우터는 포워딩테이블에서 이를 key로 사용해 output link interface가 2임을 결정하게된다.
  - 그리고 라우터는 내부적으로 해당패킷을 interface 2fh vhdnjeldgkrpehlsek.

- 포워딩은 data-plane에서 일어나는 네트워크 계층의 핵심적인 기능이다.

<br>

### Control Plane:The Traditional Approach

- 라우팅 테이블이 어떻게 미리 설정되어있을까?
- 이에대한 고민은 라우팅과 포워딩의 중요한 상호작용을 나타낸다.

<br>

- 라우팅 알고리즘은 포워딩 테이블의 내용을 결정한다.
- 라우팅 알고리즘은 각각의 모든 라우터에서 실행되며, 이 라우터는 각각 포워딩과 라우팅 기능을 포함한다.
- 한개의 라우터의 라우팅 알고리즘 기능은 포워딩 테이블의 값을 계산하기위해서 다른 라우터의 라우팅 알고리즘 기능과 통신한다.
- 이 통신은 `라우팅 프로토콜`에 의해서 라우팅 정보를 잠은 라우팅 메세지를 교환하믕로써 일어난다.

<br>

### Control Plane:The SDN Approach



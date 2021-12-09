---
title: "[React] 이벤트 핸들링"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React]

toc: true
toc_sticky: true

date: 2021-12-09
last_modified_at: 2021-12-09
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)

<br><br>

# 리액트의 이벤트핸들링

## 주의사항

1. 이벤트이름은 카멜표기법으로 작성해야한다
2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수형태의 값을 전달한다.
3. DOM요소에만 이벤트를 설정할 수 있다, 컴포넌트에는 이벤트리스너를 달아줄 수 없다.

# 예제로 이벤트핸들링 익히기

### 4.2.1 컴포넌트 생성 및 불러오기

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나입력하세요"
          onChange={(e) => {
            console.log(e);
          }}
        ></input>
      </div>
    );
  }
}
export default EventPractice;
```

<img width="575" alt="스크린샷 2021-12-07 오후 7 03 27" src="https://user-images.githubusercontent.com/76278794/145008569-61c06113-8c11-47df-9780-763a26ea5581.png">

여기서 event 객체는 Syntheticevent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체.
SyntheticEvent는 이벤트가 끝나면 이벤트가 초기화되기때문에 정보를 참조할 수 없다.  
입력되는 각각의 값이 바로바로 사라지기때문에 onChange만 달아준다고 값을 변경할 수는 없다.
이 이벤트 객체를 참조할 일이 있다면, e.persist()함수를 호출해 값을 유지해야한다. 또는 state에 따로 값을 유지해야한다.

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나입력하세요"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></input>
      </div>
    );
  }
}
export default EventPractice;
```

input 안의 내용이 바뀔때마다 바뀐 값을 콘솔에서 출력한다.

#### 4.2.2.2 state에 input값 담기

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };
  render() {
    return (
      <div>
        <h1>이벤트연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나입력하세요"
          value={this.state.message}
          onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}
        ></input>
      </div>
    );
  }
}
export default EventPractice;
```

state에서 message state의 초기값을 설정,  
input에서 onChange이벤트가 일어나면, setState가 message state를 업데이트한다.  
input에서 변화가 생기면 setState함수가 state를 계속 갱신할 것이다.

#### 4.2.2.3 메시지창 띄우고 초기화

```jsx
<button
  onClick={() => {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }}
>
  확인
</button>
```

버튼이 클릭되면 onClick함수 호출, alert로 현재 state의 message를 창으로 띄우고, setState로 message를 초기화한다.

### 4.2.3 임의 메서드 만들기

리액트에서 이벤트 리스너를 달아줄때, 코드를 전달하기보다는 함수를 전달하라고 배웠다.  
가독성이 훨씬 좋다.

리팩토링

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleClick(e) {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나입력하세요"
          value={this.state.message}
          onChange={this.handleChange}
        ></input>
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
export default EventPractice;
```

constructor함수를 보면 .bind(this)로 컴포넌트 자기자신과 함수를 바인딩하는 작업이 이루어지고있는데,  
클래스의 임의의 메서드가 이벤트로 등록되는 과정에서 this와의 관계가 끊어지므로, 메서드와 컴포넌트 this를 바인딩해주어야한다.  
bind()함수는 괄호 안 인자와 함수를 bind해서 새로운 객체를 리턴하는 함수이다.

#### 4.2.3.2 Property initialize Syntax

위에서 살펴본 메서드바인딩은 생성자 부분에서 하고 있다.  
새로운 메서드를 만들때마다 constructor에서 수정해주어야하기때문에 이를 더 간단하게 해주는 바벨의 transform-class-properties 문법이 있는데, 화살표 함수 형태로 메서드를 정의하면 바인딩 과정이 필요없다.

```jsx
handleChange = (e) => {
  this.setState({
    message: e.target.value,
  });
};

handleClick = (e) => {
  alert(this.state.message);
  this.setState({
    message: "",
  });
};
```

### 4.2.4. input 여러개 다루기

input이 여러개일때는 어떻게 다루어야할까?
쉽게 생각하면 input마다 새로운 메서드를 정의하고, 달아줄수도있는데, 더 쉽게 처리하기위해서는 이벤트 객체를 이용해야한다.

```jsx
<input
  type="text"
  name="username"
  placeholder="사용자명"
  value={this.state.username}
  onChange={this.handleChange}
></input>
```

이 태그는 value값을 state의 username으로 유지한다.  
onChange 이벤트가 발생하면 handleChange라는 함수가 실행되는데,

```jsx
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};
```

handleChange함수는 이벤트객체의 e.target.name을 키값으로 state를 변경한다.  
객체안에서 key값을 대괄호[]로 감싸면 그 안의 레퍼런스가 가리키는 값이 실제 키값으로 사용된다.  
따라서 위의 setState는 실제로 이렇게 작동한다.

```jsx
this.setState({
  username: e.target.value,
});
```

### 4.2.5 onKeyPress 이벤트 핸들링

name="message" 인 input에서 엔터가 눌리면 handleClick메서드를 호출하기위해서는

```jsx
<input
  type="text"
  name="message"
  placeholder="아무거나입력하세요"
  value={this.state.message}
  onChange={this.handleChange}
  onKeyPress={this.handleKeyPress}
></input>
```

이렇게 input태그에 onKeyPress 이벤트리스너를 달고, 함수를 호출하도록하고

```jsx
handleKeyPress = (e) => {
  if (e.key === "Enter") {
    this.handleClick();
  }
};
```

이벤트 객체의 key가 Enter면 handleClick함수를 호출하도록 하면된다.

## 4.3 함수형 컴포넌트로 교체

```jsx
import { useState } from "react";

const EventPractice = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    alert(username + ":" + message);
    setMessage("");
    setUsername("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChangeUsername}
      ></input>
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력하세요"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      ></input>
      <button onClick={onClick}>확인</button>
    </div>
  );
};
export default EventPractice;
```

클래스형 컴포넌트와 다른점은

1. useState로 state 선언을 해주었다는 것
2. 클래스형 컴포넌트에서 handleChange를 username과 message에 대한 함수로 분리

이 두가지가 있다.

input 태그가 2개밖에 없어서 분리된 함수도 2개밖에 안되지만, input이 여러개가 있다면?

이를 해결하기 위해선 useState에 객체를 넣는 방법이 있다.

```jsx
import { useState } from "react";

const EventPractice = () => {
  //객체로 useState의 초기값을 설정,
  //form에 초기 객체가 들어있음
  const [form, setForm] = useState({
    username: "",
    message: "",
  });

  const { username, message } = form; //비구조화할당,

  const onChange = (e) => {
    //spread연산자 ... 으로 form을 풀고,
    const nextForm = {
      ...form,
      //이벤트 객체로 키값에 접근해 원하는 값으로 덮어씌운다
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onClick = () => {
    alert(username + "::" + message);
    //세터함수
    setForm({
      username: "",
      message: "",
    });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력하세요"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      ></input>
      <button onClick={onClick}>확인</button>
    </div>
  );
};
export default EventPractice;
```

useState의 초기값으로 username과 message를 키로하는 객체를 초기값으로 부여한다.

비구조화할당문법으로 form의 username과 message를 태그들이 접근할 수 있도록 변수선언해준다.

onChange함수는 이벤트객체 e를 인자로 받는데, 이 인자 e로 이벤트가 발생한 input의 name에 접근한다.

```jsx
const onChange = (e) => {
  //spread연산자 ... 으로 form을 풀고,
  const nextForm = {
    ...form,
    //이벤트 객체로 키값에 접근해 원하는 값으로 덮어씌운다
    [e.target.name]: e.target.value,
  };
  setForm(nextForm);
};
```

현재 state로 선언되어있는 form객체를 복사해와서 nextForm이라는 새로운 객체를 선언해 안에 spread연산자로 풀어준다(사본생성)  
그리고 변화가 생긴 input의 name을 키로하는 value를 수정해준다.  
수정이 완료되면 setForm으로 세터함수를 실행한다.

onClick이벤트함수는 실행되었을때, 경고창 alert 이후 setForm으로 초기화해준다.

```jsx
const onClick = () => {
  alert(username + "::" + message);
  //세터
  setForm({
    username: "",
    message: "",
  });
};
```

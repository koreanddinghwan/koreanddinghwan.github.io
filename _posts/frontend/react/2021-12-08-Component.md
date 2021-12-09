---
title: "[React] 컴포넌트"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React]

toc: true
toc_sticky: true

date: 2021-12-08
last_modified_at: 2021-12-08
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)

<br><br>

# 컴포넌트

리액트는 컴포넌트로 웹 UI를 구성하는데, 컴포넌트는 클래스형, 함수형 2가지 종류가 있다.  
리액트 공식문서에서는 함수형 컴포넌트와 같이 Hooks의 사용을 권장한다.  
하지만 클래스형 컴포넌트가 여전히 지원되고 있으므로 알고 있어야한다.

<br>

함수형 컴포넌트의 장점으로

- 선언하기 편하다
- 메모리 자원을 클래스보다 덜 사용한다.
- 메모리 자원이 작아 프로젝트 빌드 후에도 파일 크기가 작다

라는 장점이 있다.

Hooks의 도입 이후, state와 라이프사이클 API가 사용가능해졌다.

이 책에서는 클래스형 컴포넌트를 초반에 다루고 이후에 Hooks를 다루면서 함수형 컴포넌트를 더 많이 사용한다.

<br><br>

## 클래스형 컴포넌트

```jsx
class App extends Component {
  render() {
    const name = "react";
    return <div className="react">{name}</div>;
  }
}
```

<br><br>

## 함수형 컴포넌트

```jsx
const App = () => {
  const name = "react";
  return <div>{react}</div>;
};
```

<br><br>

# 컴포넌트 생성

컴포넌트를 새로 만들때는 크게 3가지 작업으로 분류된다.

1. 파일 만들기
2. 컴포넌트 코드 작성하기
3. 컴포넌트 모듈 내보내기 및 불러오기

<br><br>

## 파일 만들기

컴포넌트를 보관하는 디렉터리에 `컴포넌트이름.js`의 파일을 생성한다.  
이때, 컴포넌트 이름은 대문자로 시작하는게 헷갈리지 않는다. 왜냐하면 컴포넌트를 사용할때, JSX문법으로 컴포넌트는 대문자로 시작해야하기 때문이다.

<br><br>

## 코드작성

위에서 살펴본 함수형 컴포넌트나 클래스형 컴포넌트로 코드를 작성한다.  
함수형 컴포넌트에서 사용된 화살표 문법은 이전에 function을 완전히 대체하지 못하는데,  
서로가 가리키는 `this`의 값이 다르다.

```js
function BlackDog() {
  this.name = "흰둥이";
  return {
    name: "검둥이",
    bark: function () {
      console.log(this.name + "멍멍");
    },
  };
}

const blackDog = new BlackDog();
blackDog.bark();
//=> 검둥이 멍멍
```

일반 함수는 자신이 종속된 객체 자체를 가리키지만,

```js
function WhiteDog() {
  this.name = "흰둥이";
  return {
    name: "검둥이",
    bark: () => {
      console.log(this.name + "멍멍");
    },
  };
}

const whiteDog = new WhiteDog();
whiteDog.bark();
//=>흰둥이 멍멍
```

화살표함수는 자신이 종속된 인스턴스를 가리킨다.

(참고, mozila)[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions]

<br><br>

## 모듈 내보내기, 불러오기

내보내기 할때는

```jsx
export default 컴포넌트명;
```

불러올때는

```jsx
import 컴포넌트명 from "경로";
```

<br><br>

# props

props는 property를 줄인 표현으로 컴포넌트의 속성 설정 시 사용한다.  
A라는 컴포넌트의 props는 A의 부모컴포넌트에서 설정한다.

<br><br>

## 부모가 자식에게 props 전달

```jsx
import MyComponent from "./MyComponents";

const App = () => {
  return <MyComponent name="react" />;
};

export default App;
```

부모컴포넌트 App에서 자식컴포넌트 MyComponent에게로 props전달

```jsx
import React from "react";

const MyComponent = (props) => {
  return <div>나의 새로운 {props.name}컴포넌트</div>;
};
export default MyComponent;
```

자식 컴포넌트에서 `파라미터`로 받아와서 중괄호 형태로 사용한다.

<br><br>

## 기본값 설정

부모 컴포넌트로부터 props가 전달되지 않았을 때 사용할 기본값을 자식 컴포넌트에서 정의한다.

```jsx
import React from "react";

const MyComponent = (props) => {
  return <div>{props.name}</div>;
};

MyComponent.defaultProps = {
  name: "홍길동",
};

export default MyComponent;
```

<br><br>

## 태그 사이의 내용을 전달하는 children

부모컴포넌트에서 자식컴포넌트를 사용할때, 태그 사이에 내용을 작성할 수 있는데, 자식 컴포넌트는 이를 props.children 받는다.

-부모컴포넌트

```jsx
import MyComponent from "./MyComponent.js";

const App = () => {
    return <Mycomponent>children</MyComponent>
}

export default App
```

-자식컴포넌트

```jsx
import React from "react";
const MyComponent = (props) => {
  return (
    <div>
      나의 새로운 {props.name}컴포넌트
      <div>{props.children}이건 children props입니다.</div>
    </div>
  );
};

MyComponent.defaultProps = {
  name: "홍길동",
};
export default MyComponent;
```

화면상에 부모컴포넌트가 자식컴포넌트를 사용할때 태그 사이에 적은 children이 자식 컴포넌트의 props.children으로 전달된다.

자식 컴포넌트가 호출될 때, console.log(props)를 해보면,

```js
{children: 'children', name: '홍길동'}
```

props가 이런 객체를 전달하는 것을 알 수 있다.  
<br><br>

## 비구조화문법으로 필요한 props 추출

위에서 전달받은 객체를 ES6의 비구조화 문법을 사용해 값을 바로 추출해낼 수 있다.

```jsx
import React from "react";

const MyComponent = ({ name, children }) => {
  return (
    <div>
      나의 새로운 {name}컴포넌트
      <div>{children}이건 children props입니다.</div>
    </div>
  );
};
export default MyComponent;
```

props 파라미터로 전달받을 때, 변수에 바로 할당하고 사용한다.  
조금 더 직관적으로 컴포넌트에서 props를 사용할 수 있다.

<br><br>

## propTypes

컴포넌트의 필수 props나 타입을 지정할때는 `propTypes`모듈을 사용한다

```js
import propTypes from "prop-types";
```

### props의 타입 지정

```js
MyComponent.propTypes = {
  name: propTypes.string,
};
```

자식 컴포넌트에서 부모컴포넌트로부터 전달받을 자료형태를 정의한다.

<img src="https://user-images.githubusercontent.com/76278794/144861568-2085cf20-f638-48f4-9ff0-83c5683dd36c.png">
잘못된 타입의 props가 전달되었음을 개발자에게 알릴 수 있다.

### 필수 props 지정

propTypes를 지정하고 isrequired 메서드로 반드시 전달받아야하는 props를 정의한다.

isRequired가 필요한 이유는 props가 전달되어 컴포넌트에서 사용될때, props가 전달되지 않아도 아무런 경고창을 발생시키지 않아 오류가능성이 있기 때문이다.

```js
---
MyComponent.propTypes = {
  name: propTypes.string,
  favoritenumber: propTypes.number.isRequired,
};
---
```

콘솔창에서 개발자에게 필수 propTypes가 잘못되었다는 것을 알려준다.

![스크린샷 2021-12-06 오후 11 26 21](https://user-images.githubusercontent.com/76278794/144863322-dba4b4e6-b929-4a7d-9338-4ebb6c070ed2.png)

### propTypes 종류

1. array : 배열
2. arrayOf(다른 propType) : 특정 propType으로 이루어진 배열을 의미. arrayof(propTypes.obj)은 객체로 이루어진 배열을 의미
3. bool : true or false
4. func : 함수
5. number : 숫자
6. object : 객체
7. string : 문자열
8. symbol : ES6에서 추가된 symbol타입, 특정 키값을 symbol로 선언하면 어떤 객체의 키값으로 symbol을 줄 수 있음. python의 dict에서 키값을 주는것과 같음. iterable하지 않아서 객체를 for문돌려도 키값은 제외하고 for문을 돌린다.
9. node : 렌더링가능한 모든 것
10. instanceOf(클래스) : 특정 클래스의 인스턴스
11. oneOf(['dog', 'cat']) : 주어진 배열 요소 중 하나
12. oneOfType([propTypes.string, propTypes.number]) : 주어진 배열 안의 종류 중 하나
13. objectOf(propTypes.number) : 객체의 모든 값이 특정 propType인 객체
14. shape({name : propTypes.string, num : propTypes.number}) : 객체의 특정 키의 값을 propTypes로 준 객체
15. exect({name : propTypes.string, num : propTypes.number}) : 객체의 특정 키의 값이 특정 propTypes가 아니어야함

참고
(npmjs package설명)[https://www.npmjs.com/package/prop-types]

<br><br>

## 클래스형 컴포넌트에서 props 사용

함수형 컴포넌트를 클래스형 컴포넌트로 바꾸면 다음과 같다.

```jsx
import React from "react";
import propTypes from "prop-types";
import { Component } from "react";

class MyComponent extends Component {
  render() {
    const { name, favoritenumber, children } = this.props;
    return (
      <div>
        hello, my name is {name}
        children value is {children}
        my favnumber is {favoritenumber}
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: "기본이름",
};

MyComponent.propTypes = {
  name: propTypes.string,
  favoritenumber: propTypes.number.isRequired,
};
export default MyComponent;
```

클래스형 컴포넌트 내부에서 defaulProps나 propTypes를 지정할수도 있다.

```jsx
import React from "react";
import propTypes from "prop-types";
import { Component } from "react";

class MyComponent extends Component {
  static defaultProps = {
    name: "기본이름",
  };
  static propTypes = {
    name: propTypes.string,
    favoritenumber: propTypes.number.isRequired,
  };

  render() {
    const { name, favoritenumber, children } = this.props;
    return (
      <div>
        hello, my name is {name}
        children value is {children}
        my favnumber is {favoritenumber}
      </div>
    );
  }
}

export default MyComponent;
```

<br><br>

# state

리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다.  
props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값, 컴포넌트 자신은 전달받은 props를 읽기 전용으로만 사용할 수 있다.

이 props를 수정하기 위해서는 부모컴포넌트에서 바꿔주어야한다.

## 클래스형 컴포넌트에서 state

```jsx
import {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number : 0;
        }
    }
    render() {
        const {number} = this.state
        return (
            <div>
        <h1>{number}</h1>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
          }}
        >
          Click!
        </button>
      </div>
        )
    }
}

export default Counter
```

JS기본 문법으로 생각하면, `class Child extends Parent`는 부모클래스를 확장하는 문법이다.  
따라서 클래스형 컴포넌트는 `Component라는 부모클래스`를 `확장`하는 Counter 클래스를 정의하는 것이다.

클래스형 컴포넌트에서 state를 정의하기 위해선 constructor 메서드를 작성한다.  
이때, super(props)는 부모클래스의 생성자함수를 호출하는데, `Component`의 생성자함수를 호출한다.

<br><br>

### state 객체 안에 여러 값이 있을 때

```js
<button
  onClick={() => {
    this.setState({ number: number + 1 });
  }}
>
  Click!
</button>
```

setState함수는 인자로 전달된 객체 안에 있는 값만 바꿔준다.

<br><br>

### constructor 없이 state 선언

```js
state = {
  number: 0,
  fixedNumber: 0,
};
```

직접적으로 state를 표현하면 constructor 없이도 state 초기값 설정가능

<br><br>

### setState의 비동기성

리액트는 setState함수로 state를 업데이트할때 비동기적으로 업데이트한다.  
state가 변경될때마다 렌더링하는 것은 비효율적이기 때문.

```jsx
import { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>바뀌는 값{number}</h1>
        <h2>바뀌지 않는 값{fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState({ number: number + 2 });
            console.log("+2", number);
            this.setState({ number: number + 1 });
            console.log("+1", number);
          }}
        >
          Click!
        </button>
      </div>
    );
  }
}
export default Counter;
```

<img src="https://user-images.githubusercontent.com/76278794/144974071-0fdc3a57-9dc3-4c58-a5bf-14770d08369f.png">

`setState로 state를 변경했음에도 console.log로 state를 출력해보면 state에 아무런 변화가 생기지 않았음을 알 수 있다.`

리액트 공식문서에서는 react가 성능을 위해 여러 setState()호출을 단일 업데이트로 한꺼번에 처리할 수 있다고 명시했다.  
이걸 `비동기적`업데이트라고 한다.  
여러개의 setState호출을 이렇게 비동기적으로 업데이트하는 걸 `batching`이라고도하는데, onClick함수가 시작되고 종료된 시점이 batching의 단위이다.

이렇게 batching이 되면, 마지막에 호출된 setState만이 적용되는 것을 볼 수 있는데,

동일 이벤트 리스너에서 `setState 여러번 처리할 때, 동일한 state에 대해 setState를 실행하고 싶다면`,

해결책으로 책에서는 this.setState를 사용할때 객체 대신, 함수를 인수로 넣어준다고한다.  
함수를 인자로 넣을때, prevState를 매개변수로 넣어 이전 state를 바탕으로 setState가 연산되고, 새로운 state를 리턴하게된다.

```js
this.setState((prevState, props) => {
  return {
    업데이트내용,
  };
});
```

prevState는 기존상태, props는 현재 갖고있는 props를 의미, 업데이트 과정에서 props 필요없으면 생략가능

```jsx
import { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>바뀌는 값{number}</h1>
        <h2>바뀌지 않는 값{fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState((prevState) => {
              return {
                number: prevState.number + 1,
              };
            });
            this.setState((prevState) => ({
              number: prevState.number + 1,
            }));
          }}
        >
          Click!
        </button>
      </div>
    );
  }
}
export default Counter;
```

1. onClick 이벤트 발생
2. react가 setState 감지, 업데이트 목록에 setState를 넣어둠
3. 각각의 setState가 이전 state를 기준으로 업데이트하므로 최종 state.number는 +2가된다.

<br><br>

### setState이후 특정작업 실행

setState의 첫번째 인자로 함수를 주었는데, setState로 값을 업데이트하고 특정 작업을 하고싶다면 setState의 두번째 인자로 콜백함수를 등록해 작업을 처리할 수 있다. (setState완료 후, 작업)

```jsx
<button
onClock={() => {
  this.setState({
    number : number + 1
  }, () => {console.log('setState호출')})
}}>
```

그런데, 문득 setState가 여러개 호출될때, 각각에 대해 후속작업이 명시되면 어떻게 될까가 궁금했다.

```jsx
<button
  onClick={() => {
    this.setState(
      (prevState) => {
        return {
          number: prevState.number + 2,
        };
      },
      () => {
        console.log(this.state);
      }
    );
    this.setState(
      (prevState) => ({
        number: prevState.number + 1,
      }),
      () => console.log(this.state)
    );
  }}
>
  Click!
</button>
```

<img src = "https://user-images.githubusercontent.com/76278794/144985621-ee625537-94ac-423a-9c4c-0657e0cfcd4f.png">
이렇게 setState가 종료된 이후의 값을 기준으로 console이 출력되는 것을 볼 수 있다.

그렇다면 만약 다른 state가 껴있다면?

```jsx
<button
  onClick={() => {
    this.setState(
      (prevState) => {
        return {
          number: prevState.number + 2,
        };
      },
      () => {
        console.log(this.state);
      }
    );
    this.setState(
      (prevState) => ({
        number: prevState.number + 1,
      }),
      () => console.log(this.state)
    );
    this.setState(
      {
        testnumber: testnumber + 1,
      },
      () => {
        console.log(this.state);
      }
    );
  }}
>
  Click!
</button>
```

<img src="https://user-images.githubusercontent.com/76278794/144986159-c8a58400-5118-47e5-9eb0-7dddc673f315.png">

역시 setState가 모두 종료된 이후, console이 출력되는 것을 볼 수 있다.

setState는 batching되어 state를 일괄적으로 업데이트하는데, 그 이후 console.log의 연산은 setState가 끝나고 순차적으로 실행된다.

```jsx
<button
  onClick={() => {
    this.setState(
      (prevState) => {
        return {
          number: prevState.number + 2,
        };
      },
      () => {
        console.log(this.state);
      }
    );
    this.setState(
      {
        testnumber: testnumber + 1,
      },
      () => {
        console.log(this.state.testnumber);
      }
    );
    this.setState(
      (prevState) => ({
        number: prevState.number + 1,
      }),
      () => console.log(this.state)
    );
  }}
>
  Click!
</button>
```

<img src="https://user-images.githubusercontent.com/76278794/144986585-fa8c4155-4d89-4e7f-a579-8d770137e759.png">

이렇게 순서가 바뀐 것을 볼 수 있다.

1. setState로 state에 대한 업데이트 실행
2. 이후 각 setState에 대한 콜백함수를 위에서부터 순차적으로 실행
   이 순서이다.

<br><br>

## 함수형 컴포넌트에서 state

함수형 컴포넌트에서는 useState라는 함수로 state를 선언한다.  
이 과정에서 Hooks를 사용한다.

```jsx
import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState("");
  const onClickEnter = () => setMessage("안녕하세요");
  const onClickLeave = () => setMessage("안녕하 가세요!");

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  );
};

export default Say;
```

useState함수의 인자에는 state의 `초기값`을 넣어줄 수 있는데, 클래스형 컴포넌트에서 state에 객체 형태를 넣어준것과 달리 useState의 인자에는 무엇이든 올 수 있다.  
이 useState함수를 호출하면 배열이 리턴되는데,  
첫 번째 원소로는 `현재 상태`,  
두 번째 원소로는 이 `상태를 바꿔주는 함수`가 리턴된다.  
이 상태를 바꿔주는 함수를 `새터(setter)함수`라고한다. 클래스형 컴포넌트의 setState()함수가 새터함수였다.

<br><br>

## state를 update할때 주의사항

state를 사용할때는 setState를 사용하거나 useState로 받은 세터함수를 사용해야한다.

그리고 state를 업데이트할때는 사본을 만들고, 사본에 값을 업데이트하고 사본을 세터함수로 업데이트한다.

객체에 대한 사본을 만들때는 `...`으로 사용하는 spread연산자를 사용하고, 배열에 대한 사본은 slice()같은 내장함수를 사용한다.

---
title: "[React] 컴포넌트"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React, JSX]

toc: true
toc_sticky: true

date: 2021-12-07
last_modified_at: 2021-12-07
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

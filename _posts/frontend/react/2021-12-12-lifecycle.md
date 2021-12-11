---
title: "[React] 라이프사이클 메서드"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React]

toc: true
toc_sticky: true

date: 2021-12-11
last_modified_at: 2021-12-11
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)

<br><br>

# 라이프사이클 메서드

컴포넌트의 수명주기는 렌더링 되기전에서 시작해 페이지에서 사라질때 끝난다.  
컴포넌트를 업데이트하기 전후로, 혹은 렌더링할때 작업을 처리해야할수도 있고, 불필요한 없데이트를 방지해야할때도 있다.  
이때 라이프사이클 메서드를 사용한다.  
이 라이프사이클 메서드는 클래스형 컴포넌트에서만 사용한다. 함수형 컴포넌트에서는 Hooks를 사용해야한다.
<br><br>

## 라이프사이클 분류

will이 붙은 메서드는 특정 작업 이전, did가 붙은 메서드는 특정 작업 이후에 실행되는 메서드이다.
컴포넌트 클래스에서 덮어 씌워 사용한다.  
크게 3 카테고리로 나뉜다.
<br><br>

### 마운트

마운트 : DOM이 생성되고 웹 브라우저상에 나타남

1. 컴포넌트 생성
2. constructor
3. getDerivedStateFromProps
4. render
5. componentDidMount

<br><br>

### 업데이트

-업데이트 해야하는 경우

- 부모 컴포넌트가 넘겨주는 props 변경
- 자신의 state 변경
- 부모 컴포넌트의 리렌더링
- forceUpdate로 강제로 렌더링\

-업데이트 인식 이후

1. getDerivedStateFromProps
2. shouldComponentUpdate
3. render
4. getSnapshotBeforeUpdate
5. 웹 브라우저 상의 실제 DOM변화
6. componentDidUpdate

<br><br>

### 언마운트

언마운트 : 컴포넌트를 DOM에서 제거

1. componentWillUnmount

<br><br>

# 각 메서드 설명

## 마운트

### 1.constructor

컴포넌트의 `생성자` 메서드, 컴포넌트를 만들때 가장 처음으로 실행된다.  
이 메서드에서 초기 state 설정가능

<br><br>

### 2. getDerivedStateFromProps

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
        return { value : nextProps.value}
    }
    return null
}
```

Props로 받아온 값과 state를 동기화한다.

<br><br>

### 3. render

이 메서드 안에서 this.props나 this.state에 접근.  
주의할 사항으로 이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용해선 안되고, 브라우저의 DOM에 접근해선 안된다.  
위 작업을 하기 위해선 componentDidMount에서 처리해야한다.

<br><br>

### 4. componentDidMount

컴포넌트를 만들고, 첫 렌더링이 끝나면 호출된다.  
다른 라이브러리, 프레임워크 함수를 호출하거나, 이벤트 등록, setTimeout, setInterval, 네트워크 요청과 같은 ``비동기작업`을 처리한다.

<br><br>

## 업데이트

### 1. getDerivedStateFromProps

위와 동일

<br><br>

### 2. shouldComponentUpdate

```js
shouldComponentUpdate(nextProps, nextState) {...}
```

props나 state가 변경되었을때, 리렌더링 여부를 결정하는 메서드이다.

인자로 들어온 nextProps와 nextState가 새로 설정될 props와 state이며,  
이를 현재 state와 props, this.state와 this.props로 비교한다.

이 메서드는 true나 false를 리턴해 이에따라 리렌더링을 실시한다.  
따로 설정하지 않는다면 기본값으로 true가 리턴된다.

프로젝트의 성능을 최적화할때, 리렌더링을 방지함으로써 불필요한 렌더링을 막을 수 있다.

<br><br>

### 3. render

동일

<br><br>

### 4. getSnapshotBeforeUpdate

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
  if (prevState.array !== this.state.array) {
    const { scrollTop, scrollHeight} = this.list
    return { scrollTop, scrollHeight}
  }
}
```

브라우저상에 DOM이 실제로 변하기 전에 호출된다.  
여기서의 리턴값은 componentDidUpdate에서 파라미터로 활용된다
업데이트하기 직전의 값을 참고할 일이 있을때 활용한다.(스크롤바의 위치같은..)

<br><br>

### 5. 브라우저 상에서 DOM변화

<br><br>

### 6. componentDidUpdate

```js
componentDidUpdate(prevProps, prevState, snapshot){...}
```

리렌더링을 완료한 후 실행, 업데이트가 끝난 시점에 실행된다.  
DOM관련 처리를 해도 무방하며, prevProps나 prevState같이 이전 데이터에 접근할 수 있다.  
또한 위의 getSnapshotBeforeUpdate에서 리턴값을 3번째 인자 snapshot으로 전달받는다.

<br><br>

## 언마운트

### 1. componentWillUnmount

컴포넌트를 DOM에서 제거할때 실행. componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM 등을 여기서 제거한다.

<br><br>

## 오류체크

### 1. componentDidCatch

컴포넌트 렌더링 도중에 에러발생 시, 오류 UI를 보여 줄 수 있게 해준다.

```js
componentDidCatch(error, info) {
  this.setState({
    error: true
  });
  console.log({error, info
})
}
```

이 메서드는 자신에게 발생하는 에러가 아닌, `this.props.children`으로 전달되는 컴포넌트에서 발생하는 에러를 잡아낸다.  
`error`는 파라미터에 어떤 에러가 발생했는지 알려주고, `info` 파라미터는 어디 있는 코드에서 오류가 발생했는지 알려준다.

<br><br>

# 라이프사이클 메서드 사용

```jsx
import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };
  render() {
    console.log("App컴포넌트 렌더링");
    return (
      <div>
        <button onClick={this.handleClick}>랜덤색상</button>
        <LifeCycleSample color={this.state.color}></LifeCycleSample>
      </div>
    );
  }
}

export default App;
```

```jsx
import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    //초기 state
    number: 0,
    color: null,
  };

  myRef = null; //Ref설정부분

  constructor(props) {
    //생성자
    super(props);
    console.log("contructor");
  }

  //부모컴포넌트로부터 전달받은 props를 state와 동기화시킨다.
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  //컴포넌트의 첫 렌더링이 완료
  componentDidMount() {
    console.log("componentDidMount");
  }

  //update를 인식하면 nextprops와 nextstate를 인자로 갖는다.
  //
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않는다.
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  //update이후, 이전 props와 이전 state에 대한 정보를 componentDidUpdate에서 snapshot 파라미터로 전달한다.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.state.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  //snapshot 파라미터는 getSnapshotBeforeUpdate 메서드에서 리턴된 파라미터.
  //리턴된 파라미터가 있다면 이전  색상 속성을 조회
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("snapshot, 업데이트 이전 색", snapshot);
    }
  }

  render() {
    const style = {
      color: this.props.color,
    };
    console.log("LifeCycleSample Rendered");
    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}
export default LifeCycleSample;
```

<br><br>

## 초기렌더링

1. App 컴포넌트 렌더링
2. LifeCycleSample 컴포넌트 호출
3. LifeCycleSample constructor 호출
4. getDerivedStatefromProps 호출, 부모컴포넌트가 전달하고있는 color props를 자식컴포넌트의 state와 동기화
5. 자식 컴포넌트 렌더링(재귀적으로)
6. 첫 렌더링 마친 이후 componentDidMount 호출

<br><br>

## 업데이트(색상)

1. 부모컴포넌트에서 button 클릭 => 부모컴포넌트의 state변화인식 => 업데이트인식 => 부모컴포넌트 다시 렌더링 => 자식컴포넌트도 리렌더링
2. 변경된 color가 자식컴포넌트에게 props로 전달
3. 자식컴포넌트에서 getDerivedStateFromProps 호출, 전달된 props가 nextProps, prevState는 업데이트 이전상태의 자식컴포넌트의 state
4. shouldComponentUpdate 호출, nextProps에 전달된 props, nextState에 업데이트될 state가 온다.
5. 렌더링함수 호출
6. getSnapshotBeforeUpdate 호출, 렌더링 이후 이전 props와 현재 바뀐 state의 색이 다르면 ref로 달린 태그의 style을 리턴한다.(snpshot)
7. 이 시점에서 실제 웹브라우저 DOM에 변화가 생긴다.
8. componentDidUpdate 호출, prevProps나 prevState를 인자로 가지고, snapshot파라미터도 가지고 있어서 업데이트 이전의 값으로 작업이 가능함.

<br><br>

## 업데이트(숫자)

1. number state는 color와는 다르게 자식 컴포넌트에서만 유지되고 있다.
2. 더하기 버튼 클릭 => 자식컴포넌트가 state변화 인식 => 업데이트 인식
3. getDerivedStateFromProps는 color변화가 감지되지않아 null이 리턴(props로 인해 바뀐 state가 없음)
4. shouldComponentUpdate는 바뀐 state의 1의자리 숫자가 4만 아니면 리렌더링한다. 4라면 여기서 업데이트종료, 리렌더링호출 x
5. 리렌더링(4가 아닐때)
6. getSnapshotBeforeUpdate, 색 그대로이므로 null 리턴
7. componentDidUpdate 호출

<br><br>

# 오류잡아내기

```jsx
<div>
  {this.props.missing.value}
  <h1 style={style} ref={(ref) => (this.myRef = ref)}>
    {this.state.number}
  </h1>
  <p>color : {this.state.color}</p>
  <button onClick={this.handleClick}>더하기</button>
</div>
```

오류가 났을때, 에러를 캐치하는 과정

Error를 잡기 위해선 `componentDidCatch`사용해야한다.

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log("error");
  }
  render() {
    if (this.state.error) return <div>에러발생</div>;
    return this.props.children;
  }
}
export default ErrorBoundary;
```

에러가 발생하면 렌더링할 컴포넌트를 정의

```jsx
<ErrorBoundary>
  <LifeCycleSample color={this.state.color}></LifeCycleSample>
</ErrorBoundary>
```

상위 컴포넌트에서 감싸준다.

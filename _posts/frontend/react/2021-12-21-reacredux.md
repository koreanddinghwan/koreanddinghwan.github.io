---
title: "[React] 리액트 리덕스"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React, react-redux]

toc: false
toc_sticky: false

date: 2021-12-21
last_modified_at: 2021-12-21
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)

<br><br>

# 리액트 리덕스

리액트에서 리덕스를 사용할때, 리덕스를 사용하는 패턴이 있다.

프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는 형태로 많이 사용된다.

리액트라는 라이브러리 특성상 state가 props로 전달되어 자식컴포넌트에서 사용되는데, 이러한 특성을 사용한다.

프레젠테이셔널 컴포넌트는 props를 받아와서 UI상 보여주기만 하는 컴포넌트를 의미하고,  
컨테이너 컴포넌트는 리덕스와 연동해 리덕스로부터 상태를 받아와 dispatch하는 컴포넌트를 의미한다.

## 리덕스를 사용하는 구조

위에서 언급했듯, 프레젠테이셔널 컴포넌트, 컨테이너 컴포넌트와 더불어 리듀스함수를 정의할 폴더가 필요하다.

리덕스 공식문서에서는 `actions`, `constants`, `reducers` 이렇게 3가지의 폴더로 나누지만, 새로운 액션마다 3가지의 파일을 수정해서 불편하다.

Ducks패턴은 `modules` 폴더 하나에 기능별로 나누어 정리하는 방식이다.

# 프레젠테이셔널 컴포넌트

프레젠테이셔널 컴포넌트는 props를 받아와서 태그들에 달아주는 역할만을 한다는 것을 기억하자.

## Counter

```jsx
import React from "react";

const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h2>{number}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;
```

## TodoItem

```jsx
import React from "react";

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input type="checkbox"></input>
      <span>예제</span>
      <button>삭제하기</button>
    </div>
  );
};

const Todos = ({
  todos,
  onToggle,
  onRemove,
  input,
  onChangeInput,
  onInsert,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input></input>
        <button type="submit">등록</button>
      </form>
      <div>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
      </div>
    </div>
  );
};

export default Todos;
```

차후에, TodoItem에 전달되는 props는 수정되어야한다.

# Reducer

## counter.js

```js
//action Type
const INCREASE = `counter/INCREASE`;
const DECREASE = `counter/DECREASE`;

//action creator
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//initialState
const initialState = {
  number: 0,
};

//reducer

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };

    default:
      return state;
  }
}

export default counter;
```

<br>

## todos.js

```jsx
//action type
const CHANGE_INPUT = `todos/CHANGE_INPUT`;
const INSERT = `todos/INSERT`;
const REMOVE = `todos/REMOVE`;
const TOGGLE = `todos/TOGGLE`;

//ACTION CREATORS
export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

let id = 3;
export const insert = (text) => ({
  type: INSERT,
  todo: {
    //INSERT dispatch시, 새로운 todo객체를 만들어서 todos에 넣어줘야한다.
    text,
    id: id++,
    done: false,
  },
});

export const toggle = (id) => ({
  //체크박스 상태역전
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  //삭제
  type: REMOVE,
  id,
});

const initialState = {
  input: ``,
  todos: [
    { id: 0, text: "리덕스 기초", done: true },
    { id: 1, text: "바닐라 리덕스", done: true },
    { id: 2, text: "리액트 리덕스", done: false },
  ],
};

function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input, //액션 객체에서 받아온 input값으로 업데이트
      };
    case INSERT:
      return {
        ...state, //불변성.
        todos: state.todos.concat(action.todo), //action객체에는 text를 파라미터로 만든 새로운 todo가 있음.
      };

    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map(
          (todo) =>
            todo.id === action.id ? { ...todo, done: !todo.done } : todo //불변성을 지키면서, done의 상태만 역전
        ),
      };
    default:
      return state;
  }
}
export default todos;
```

## rootReducer

store를 열땐 reducer를 하나만 사용해야한다.  
여러개의 reducer를 묶을때는 `combineReducers`를 사용한다.

```js
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

combineReducer가 선언된 파일의 이름이 index.js면 다른 파일에서 불러올때 디렉터리 `./modules`까지만 적어도 불러올 수 있다.

# 리덕스 적용

reducer를 하나로 합치고, 프레젠테이셔널 컴포넌트까지 만들었다.  
이제 스토어를 만들어야한다.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import rootReducer from "./modules";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

# 컨테이너 컴포넌트

컨테이너 컴포넌트는 store에 접근해 state를 받아오고, dispatch로 state를 변경할 수 있다.

```jsx
import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter
      number={number}
      onIncrease={increase}
      onDecrease={decrease}
    ></Counter>
  );
};
```

위를 보면 알 수 있듯, 컨테이너 컴포넌트는 프레젠테이셔널 컴포넌트를 감싸고 props로 state나 이벤트를 전달한다.

`connect`로 리덕스 스토어와 컨테이너 컴포넌트를 연결할 수 있다.  
`connect(mapStateToProps, mapDispatchToProps)(CounterContainer)` 이렇게 연결해야하는데,

`mapStateToProps`는 리덕스 스토어의 state를 컨테이너 컴포넌트의 props로 전달해주는 함수이고, `mapDispatchToProps`는 리덕스 스토어의 액션생성함수를 props로 전달해주는 함수이다.

이렇게 connect로 컨테이터 컴포넌트와 리덕스를 연결하는 방법에는 여러가지가 있다.

## 내부선언

connect함수의 내부 파라미터에 함수를 직접선언하는 방식이다.

```jsx
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    increase: () => {
      dispatch(increase());
    },
    decrease: () => {
      dispatch(decrease());
    },
  })
)(CounterContainer);
```

## bindActionCreators

불필요한 코드를 더 줄여주는 함수이다.

```jsx
import { bindActionCreators } from "redux";

...

export default connect(
  (state) => ({ number: state.counter.number }),
  (dispatch) => bindActionCreators({ increase, decrease }, dispatch)
)(CounterContainer);
```

## 객체형태로넣기

`mapDispatchToProps`에 액션생성함수를 객체형태로 넣어주면 bindActionCreators의 작업을 리덕스가 알아서 해준다.

```jsx
export default connect((state) => ({ number: state.counter.number }), {
  increase,
  decrease,
})(CounterContainer);
```

---
title: "[React] Redux-thunk"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React, Middleware]

toc: false
toc_sticky: false

date: 2021-12-22
last_modified_at: 2021-12-22
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)

[redux-middleware](https://youtu.be/AgO7YcJeBh4)

# 미들웨어

![스크린샷 2021-12-23 오전 12 44 48](https://user-images.githubusercontent.com/76278794/147118362-77a47fae-35d6-45d9-84f6-cc3cebbbe3b6.png)

미들웨어를 사용하면 `컴포넌트에서 발생한 액션`이 `리듀서를 통해 dispatch되기 전`에 해야하는 작업을 처리할 수 있다.

컴포넌트에서 발생한 액션이 오류가 일어나면 `취소`하거나, 혹은 다른 액션을 `추가`하는 등 여러가지의 작업을 할 수 있다.

미들웨어를 사용하기 위해선 `redux`에서 제공하는 `applyMiddleWare` 함수를 사용한다.

```js
const myLogger = (store) => (next) => (action) => {
  console.log("액션이 기록됨", action);
  next(action);
};
```

`next는 리덕스가 제공하는 메서드`이다.  
next(action)을 사용하면, `다음 미들웨어에게 액션을 넘겨주거나`, `미들웨어가 없다면 리듀서에게 액션을 넘겨줘 dispatch할 수 있게`해준다.

따라서, next(action)을 사용하지 않으면 액션이 리듀서에게 전달되지 않고, 무시된다.

또는 내부에서 store.dispatch를 사용하면 첫번째 미들웨어부터 다시 처리한다(재귀)

ES6에서 제공하는 화살표 문법이 어색하다면, 이렇게 바꿀수도 있다.

```js
const myLogger = function (store) {
  return function (next) {
    return function (action) {
      console.log("액션이 기록됨", action);
      next(action);
    };
  };
};
```

이 패턴을 염두에 두고만 있으면된다. 미들웨어는 대부분 다른 사람들이 만들어놓은 라이브러리에서 가져온다.

# 동기적 사용예시

동기적으로 미들웨어를 사용하는 예시를 들어볼까한다.

이 미들웨어를 사용하기 위해선

```js
const store = createStore(rootReducer, applyMiddleware(myLogger));
```

이렇게 사용할 수 있다.

만약 이 미들웨어가 마지막 미들웨어라면 next(action)으로 리듀서에게 액션이 전달되어 store의 state가 변하고, 컴포넌트가 리렌더링 될 것이다.

다른 예시를 보자.

```js
const myLogger = (store) => (next) => (action) => {
  console.group(action && action.type);
  console.log("이전상태", store.getState());
  console.log("액션", action);
  next(action);
  console.log("다음상태", store.getState());
  console.groupEnd();
};
```

짜잔, `next(action)`을 기준으로 미들웨어가 처리하는 작업이 나뉜다.  
이 미들웨어 또한, 마지막 미들웨어라고 가정했을때, `next(action)`이 리듀서에게 액션을 전달함으로써 아래쪽 코드에서의 store의 state는 업데이트된 상태일 것이다.

# 비동기적 작업을 하는 미들웨어 사용하기

리덕스를 사용할때, 비동기적 작업을 처리하기위해선 2가지의 미들웨어를 사용할 수 있다.

- redux-thunk

비동기 작업을 처리할때, 액션을 디스패치할때 객체가 아닌, `함수`를 디스패치할 수 있게 해준다.

- redux-saga

특정 액션이 디스패치됐을 때, 정해진 로직에 따라 다른 액션을 디스패치시키는 규칙을 작성해 비동기작업을 처리한다.

redux-thunk를 먼저 사용해보자.

## redux-thunk

thunk란 `특정 작업을 나중에 할 수 있도록 미루기 위해 함수형태로 감싼 것`을 의미한다.

thunk라이브러리를 사용하면 이런 thunk함수를 만들어서 디스패치할 수 있다.

```js
const thunk = () => (dispatch, getState) => {
  //dispatch로 새 액션을 디스패치하거나, getState로 현재 상태 참조가능
};
```

### 예시-setTimeout

이걸 사용하는 예시로,

```js
export const increase = createAction(INCREASE);

export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase()); //1초뒤 엑션을 dispatch하는 함수
  }, 1000);
};
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
  },
  initialState
);
```

1. increase라는 action creator를 선언
2. increaseAsync라는 thunk함수를 선언한다.
3. 이 내부에는 1초 뒤 increase를 디스패치하는 함수가 dispatch함수로 전달된다.

```js
import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increaseAsync } from "../modules/counter";

const CounterContainer = ({ number, increaseAsync }) => {
  return <Counter number={number} onIncrease={increaseAsync}></Counter>;
};

export default connect(
  (state) => ({
    number: state.counter,
  }),

  { increaseAsync }
)(CounterContainer);
```

그리고 컨테이너 컴포넌트에서 thunk함수를 props로 전달해 store와 연결하고,

```jsx
import React from "react";

const Counter = ({ number, onIncrease }) => {
  return (
    <div>
      <h2>{number}</h2>
      <button onClick={onIncrease}>+1</button>
    </div>
  );
};

export default Counter;
```

프레젠테이셔널 컴포넌트에서 props로 버튼에 달아주면된다.

버튼을 눌러보면....

![스크린샷 2021-12-23 오전 1 47 37](https://user-images.githubusercontent.com/76278794/147126923-ddb9f279-6a9e-43e4-9490-0329267e50ba.png)

이렇게 버튼이 눌리면 처음에 dispatch되는 액션은 함수형태, 두번째 액션은 객체형태로 되는 것을 볼 수 있다.

### 예시-axios(promise 객체)

API호출할때는 `프로미스 기반`의 axios를 사용하는게 편하다.

```jsx
import axios from "axios";

export const getPost = (id) => axios.get(`url`);
export const getUsers = (id) => axios.get(`url`);
```

api를 호출하는 파일을 따로 작성하면 가독성에도 좋고, 유지보수, 그리고 다른 파일에서도 편하게 사용할 수 있다.

<br>

그리고 sample 리듀서를 정의한다.

```jsx
import { handleActions } from "redux-actions";

import * as api from "../lib/api";

//action type

const GET_POST = "sample/GET_POST"; //요청의 시작되거나 마무리된것을 알린다.
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS"; //요청이 시작되거나 마무리된걸 알린다.
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//thunk함수생성
//thunk는 시작, 성공, 실패할때마다 (type마다)다른 액션을 디스패치한다.

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST });
  try {
    const response = await api.getPost(id); //axios.get(URL~id)
    dispatch({
      //위에서 오류안나면 dispatch로 액션함수실행함.
      type: GET_POST_SUCCESS,
      payload: response.data,
    }); //요청성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e; //컴포넌트에 에러를 던져줌.
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS }); //요청을 시작한 것을 알린다.
  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    }); //요청성공
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    }); //에러발생
    throw e; //컴포넌트단에서 에러 발생한걸 알 수 있게 해준다.
  }
};

//초기상태 선언,
//요청의 로딩중 상태는 loading이라는 객체에서 관리
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null, //getPost로 가져올 데이터의 초기상태
  users: null, //getUsers로 가져올 데이터의 초기상태
};

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true, //요청이 시작됨을 알림
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, //요청완료됨을 알림
      },
      post: action.payload, //= response.data
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, //요청완료됨을 알림
      },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true, //요청이 시작됨을 알림
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, //요청완료됨을 알림
      },
      users: action.payload, //response.data
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, //요청완료됨을 알림
      },
    }),
  },
  initialState
);

export default sample;
```

<br>

프레젠테이셔널 컴포넌트 정의

```jsx
import React from "react";

const Sample = ({ loadingPost, loadingUsers, post, users }) => {
  console.log("Sample컴포넌트");
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && "로딩중..."}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr></hr>
      <section>
        <h2>유저</h2>
        {loadingUsers && "로딩중..."}
        {!loadingUsers && users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.id} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
export default Sample;
```

<br>

컨테이너 컴포넌트를 정의한다.

```jsx
import React from "react";
import Sample from "../components/Sample";
import { connect } from "react-redux";
import { getPost, getUsers } from "../modules/sample";
import { useEffect } from "react";

const SampleContainer = ({
  //state
  loadingPost,
  loadingUsers,
  post,
  users,
  //thunk function
  getPost,
  getUsers,
}) => {
  useEffect(() => {
    //첫 마운트시에 실행, getPost나 getUsers가 바뀔때만 실행됨.
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);
  console.log("SampleContainer");

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    ></Sample>
  );
};

export default connect(
  ({ sample }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: sample.loading.GET_POST,
    loadingUsers: sample.loading.GET_USERS,
  }),
  { getUsers, getPost }
)(SampleContainer);
```

<br>

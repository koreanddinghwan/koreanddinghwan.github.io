---
title: "[React] Redux-saga"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React, Middleware, redux-saga]

toc: false
toc_sticky: false

date: 2021-12-29
last_modified_at: 2021-12-29
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)  
[redux-saga](https://redux-saga.js.org/docs/)

# 리덕스 사가란

redux는 상태관리할때, dispatch하게되면 즉각적으로 state가 수정된다.  
이에따라 비동기작업을 처리해야하는 api요청과같은 작업을 위해서 redux-thunk를 사용하는데, `redux-saga`는 redux-thunk 다음으로 많이 사용하는 미들웨어이다.

redux-thunk는 `함수형태의 액션`을 디스패치하는 방식이었는데, redux-saga는 제너레이터 함수 로직을 이용해 비동기작업을 처리한다.

redux-saga는

- 기존 요청을 취소(불필요한 중복 요청 방지)
- 특정 액션이 발생하면 다른 액션을 발생시키거나, API 요청을 할때,
- 웹소켓(실시간)
- API 요청 실패 시 재요청

위와 같은 작업을 할 때 유리하다.

<br>

## 제너레이터 함수

리덕스 사가가 제너레이터 함수 로직을 사용한다는데, 제너레이터 함수 로직을 처음 접한다면 어려울수도 있다.

제너레이터는 함수 안에서 `yield`라는 키워드를 사용하면 된다.  
제너레이터는 `발생자`라고 불리기도 한다.

제너레이터는 함수를 호출하고, `.next()`메서드를 호출할때마다 `yield`까지의 코드를 실행한다.

<br>

### 예시

```js
function* generatorFunction() {
  console.log("안녕");
  yield 1;

  console.log("제너레이터 함수");
  yield 2;

  console.log("function*");
  yield 3;

  return 4;
}
```

위 함수를 실행해보면

<img width="628" alt="스크린샷 2021-12-29 오후 9 41 04" src="https://user-images.githubusercontent.com/76278794/147663271-d5e5cca2-082e-47d0-b48d-8cd703e47422.png">

1. 제너레이터함수를 실행하면 제너레이터 객체를 반환한다.
2. 이 제너레이터 객체는 .next() 메서드를 가진다
3. .next()메서드를 호출할때마다 다음 yield까지의 코드가 실행된다.
4. 이 yield로 함수 바깥으로 전달한 값이 .next() 메서드의 반환값이 된다.

<br><br>

# 리덕스 사가로 비동기카운터 만들기

기본적인 용어를 알고가야한다.

- delay : 프로미스 객체를 반환하는 함수. 제너레이터를 블락하기위해 사용한다.
- put : 특정 액션을 디스패치한다. 효과(Effect)를 발생시킨다.
- takeEvery : 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
- takeLatest : 들어오는 액션에 대해 특정 작업을 처리하는데, 만약 완료되지 않은 이전 작업이 있다면 취소처리하고 가장 최근의 작업만 수행한다.
- all : 사가를 합쳐주는 함수

<br>

## 사가

```js
import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

//////////
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);
////////
//사가 액션타입
const INCREASE_ASYNC = `counter/INCREASE_ASYNC`;
const DECREASE_ASYNC = `counter/DECREASE_ASYNC`;

//사가 액션생성함수
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

//saga
function* increaseSaga() {
  yield delay(1000);
  yield put(increase()); //특정 액션을 디스패치
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); //모든 액션에 대한 처리

  yield takeLatest(DECREASE_ASYNC, decreaseSaga); //가장 최근의 것만 처리, 나머진 무시
}

export default counter;
```

<br>

## 루트 사가

루트 리듀서가 있는 위치에 루트 사가를 만들어준다.  
all 함수를 import해서 사가들을 하나로 합쳐줘야한다.

```js
export function* rootSaga() {
  yield all([counterSaga()]);
}
```

<br>

## 사가 미들웨어

루트사가를 만들었으니 스토어에서 사가 미들웨어를 적용해줘야한다.

```js
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(loggerMiddleware, ReduxThunk, sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);
```

<br><br>

# API요청 상태관리

call api는 프로미스함수에 인자를 넣는 api이다.

여기서 사용하는 call은 api.getPost가 get메서드로 특정 value값을 가져온다.

그런데 axios에 의해 promise객체를 반환해서 가져오기때문에 이 promise가 resolved될때까지 제너레이터가 멈춘다.

## sample 리덕스 모듈

```js
import { handleActions, createActions } from "redux-actions";
import { put, call, takeLatest } from "redux-saga";
import { startLoading, finishLoading } from "./loading";

import * as api from "../lib/api";
import createAction from "redux-actions/lib/createAction";

//action type

const GET_POST = "sample/GET_POST"; //요청의 시작되거나 마무리된것을 알린다.
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS"; //요청이 시작되거나 마무리된걸 알린다.
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//액션생성함수
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

//getPostSaga
function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); //로딩시작,loading.js모듈이 GET_POST를 액션타입으로하는 state를 true로

  try {
    const post = yield call(api.getPost, action.payload);
    //call(프로미스 반환하는 함수, 왼쪽 함수에 넣을 인자)
    //= api.getPost(action.payload)
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST)); //요청완료
}
function* getUsersSaga(action) {
  yield put(startLoading(GET_USERS));

  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

//초기상태 선언,
//요청의 로딩중 상태는 loading이라는 객체에서 관리
const initialState = {
  post: null, //getPost로 가져올 데이터의 초기상태
  users: null, //getUsers로 가져올 데이터의 초기상태
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default sample;
```

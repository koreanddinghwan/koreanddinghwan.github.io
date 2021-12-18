---
title: "[javascript] Promise, async, await"
excerpt: "자바스크립트의 비동기작업을 효율적으로 처리하자"

categories:
  - javascript
tags:
  - [javascript, promise, async, await]

toc: true
toc_sticky: true

date: 2021-12-18
last_modified_at: 2021-12-18
---

<br><br>

<br><br>

# 자바스크립트 동작원리

자바스크립트는 동기적이다.  
`hoisting`이 된 이후부터 작성한 코드들이 실행되기때문.

hoisting이란 `변수선언, 함수선언`이 가장 먼저 실행되고, 코드가 나타나는 순서로 실행된다는 것.

![browser-structure](https://user-images.githubusercontent.com/76278794/146628244-903ede34-8a2f-4129-bcd2-62d68298e96d.png)

그리고 자바스크립트 엔진은 `싱글 스레드`이다.  
기본적으로 단 하나의 작업을 할 수 있는데, 이 작업을 하는 곳을 `call stack`이라고 부른다.

비동기적으로 이벤트를 처리하거나 Promise, setTimeout같은 작업은 Web API에서 처리된다.

Web API에서 처리된 작업들은 `call Stack이 비어있을 때만` call stack으로 불러와져 처리된다.

이런 동작원리로 인해 개발자가 눈으로 읽어 내려가면서 생각하는 작업순서와 자바스크립트엔진이 실제로 처리하는 작업순서가 달라진다.

또, 무수히 많은 콜백함수들이 서로 물고 늘어지면서 코드의 로직도 이해하기 어려워진다.

이걸 해결하기위한게 promise이며, promise를 쉽게 이용할 수 있는게 `async await`문법이다.

# 콜백함수

```js
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}
increase(0, (result) => {
  console.log(result);
});
```

`increase`라는 함수는 number파라미터를 받아 1초뒤에 10을 더하고, 콜백함수에 그 값을 넣어서 실행하는 함수.

해당 함수가 실행된 `직후`, 어떤 작업을 하고 싶다면, 콜백함수를 파라미터로 넣어주면된다.

## 콜백지옥

그런데, `함수를 작업하고나서, 연쇄적인 작업을 정의`하기위해선? 어떻게해야할까

가령 어떤 API를 fetch한다고 생각하면, 데이터를 받아오고 -> json형태로 파싱하고 -> 현재 서버의 DB와 비교해 달라진 부분을 패치하고 -> ....

복잡한 과정에 대해 생각하기보단, `단순한 과정`을 정의하고 복잡한 과정으로 치환해서 생각해보자.

단순한과정으로 생각해보면 위의 함수를 4번 실행해 10, 20, 30, 40을 출력하도록해보자.

```js
increse(0, (result) => {
  console.log(result); //여기서 result는 10
  increase(result, (result) => {
    console.log(result); //20
    increase(result, (result) => {
      console.log(result); //30
      increase(result, (result) => {
        console.log(result); //40
      });
    });
  });
});
```

`wow`  
매우 단순화해서 생각했는데도, 이렇게 더러운 코드가 나온다.

result 값을 전역 필드에 정의하면 되는거 아니냐고? -> 실제 JS로 프로젝트 코딩할때는, 전역필드에 변수를 선언하는 일이 거~의 없다.

이런 콜백지옥에서 구원해줄 방안으로 도입된 것이 `promise`이다.

# promise

`promise`는 ES6에서 도입되었다.

promise 객체는 다음과 같이 만들 수 있다.

```js
let promise = new Promise(funciton (resolve, reject) {
    ~executor~
})
```

`Promise`를 선언할때 전달되는 함수를 `executor`라고 하고, 이에 전달되는 인수를 `resolve, reject`라고 한다.  
executor는 promise가 만들어질때 자동으로 실행되고, 인수 resolve와 reject는 `자바스크립트가 자체적으로 제공하는 콜백`이다.

Promise 객체는 `state`와 `result`라는 내부 프로퍼티를 기본적으로 가진다.  
resolve나 reject에 의해 이 내부 프로퍼티가 변화한다.

- state: 기본값은 `pending`, resolve가 호출되면 `fufilled`, reject가 호출되면 `rejected`
- result: 기본값은 `undefined`, resolve(value)가 호출되면 `value`, reject(error)가 호출되면 `error`

위의 코드를 promise로 나타내보자.

```js
function incease(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10; //인수로 받은 파라미터에 10을 넣는다.

      if (result > 50) {
        //에러체크
        //만약 50보다 커지면
        const error = new Error("numberistoobig"); //error 만들고,
        return reject(error); //reject(error)로 promise 객체의 내부 프로퍼티의 result값은 error가 되고, state값도 rejected가된다.
      }

      return resolve(result); //에러가 안나면, resolve호출되면서 내부 프로퍼티로 state는 fulfilled, result는 계산된 result값이 된다.
    }, 1000);
  });

  return promise;
}

increase(0)
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .catch((error) => {
    console.log(error);
  });
```

`.then`은 `resolve`된 result 값을 받아올 수 있다.  
`.then`을 사용하면 콜백함수 속에 콜백함수를 넣지 않아도되기 때문에 코드의 가독성이 높다.

# async,await

ES8에서 도입된 문법.  
`async`와 `await` 이 둘을 사용하면 위의 promise 객체를 더 쉽게 사용할 수 있다.

```js
function incease(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10; //인수로 받은 파라미터에 10을 넣는다.

      if (result > 50) {
        //에러체크
        //만약 50보다 커지면
        const error = new Error("numberistoobig"); //error 만들고,
        return reject(error); //reject(error)로 promise 객체의 내부 프로퍼티의 result값은 error가 되고, state값도 rejected가된다.
      }

      return resolve(result); //에러가 안나면, resolve호출되면서 내부 프로퍼티로 state는 fulfilled, result는 계산된 result값이 된다.
    }, 1000);
  });

  return promise;
}

async function example() {
  try {
    let result = await increase(0);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
```

1. async가 붙은 함수는 반드시 promise를 반환하고, promise가 아닌건 promise로 감싸서 반환한다.
2. await은 promise객체를 리턴하는 함수에만 선언할 수 있다.
3. await은 async가 선언된 함수 내부에서만 선언이 가능하다.
4. await은 promise가 처리될때까지 기다린다는 의미인데, 기다리는동안 자바스크립트엔진이 다른 일을 할 수 있다.
5. try~ catch 구문으로 try할때 발생한 error를 처리할 수 있다.

# 리액트에서 사용해보기

`promise`나 `async`, `await`은 `API`로 데이터를 받아와야할때 정~말 많이 사용한다.

현재 필자가 공부하고있는 리액트에서 사용해볼건데, 리액트의 `axios`라는 라이브러리를 사용할 것이다.

`axios`는 promise기반으로 HTTP요청을 처리하기때문에, 좋은 예시가 될 수 있다고 생각한다.

```js
npm i axios
```

그리고 App 컴포넌트에서 `데이터를 요청하고` 동시에 `렌더링`을 해볼건데,

```js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null); //초기값 null인 데이터 state
  const onClick = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        setData(response);
      });
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      <div>
        {data && (
          <textarea
            rows={7}
            value={JSON.stringify(data, null, 2)}
            readOnly={true}
          ></textarea>
        )}
      </div>
    </div>
  );
}
export default App;
```

axios.get()은 파라미터로 전달된 주소에 get요청을 한다.  
프로미스 객체를 리턴하므로, `.then`을 사용함녀 `resolve된 value값`을 파마미터로 전달한다.  
그리고 이 `response`는 `JSON`이 기본형태이므로, 문자열화해서 textarea에 value값으로 전달하면된다.

위 코드를 `async, await`을 적용하면

```js
const onClick = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/2"
    );
    setData(response);
  } catch (error) {
    setData(error);
  }
};
```

.then으로 resolve된 값을 가져올땐 error체킹을 안했는데, 여기선 try~catch로 에러를 처리했다.

`async`가 `onClick` 화살표 함수 선언부분 앞에 작성되어있고, `response`를 가져올때 `axios.get`으로 값을 가져올때까지 기다리고, setData로 리렌더링일어난다.

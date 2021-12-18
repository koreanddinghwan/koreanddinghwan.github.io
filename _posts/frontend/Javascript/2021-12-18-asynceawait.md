<br><br>

# 자바스크립트 동작원리

자바스크립트는 동기적이다.  
`hoisting`이 된 이후부터 작성한 코드들이 실행되기때문.

hoisting이란 `변수선언, 함수선언`이 가장 먼저 실행되고, 코드가 나타나는 순서로 실행된다는 것.

# promise

async와 await을 이해하기 위해선 promise를 먼저 알아야한다.

promise 객체는 다음과 같이 만들 수 있다.

```js
let promise = new Promise(funciton (resolve, reject) {
    ~executor~
})
```

`Promise`를 선언할때 전달되는 함수를 `executor`라고 하고, 이에 전달되는 인수를 `resolve, reject`라고 한다.  
executor는 promise가 만들어질때 자동으로 실행되고, 인수 resolve와 reject는 자바스크립트가 자체적으로 제공하는 콜백이다.

Promise 객체는 `state`와 `result`라는 내부 프로퍼티를 기본적으로 가진다.  
resolve나 reject에 의해 이 내부 프로퍼티가 변화한다.

- state: 기본값은 `pending`, resolve가 호출되면 `fufilled`, reject가 호출되면 `rejected`
- result: 기본값은 `undefined`, resolve(value)가 호출되면 `value`, reject(error)가 호출되면 `error`

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done"), 3000);
  alert("resolved!");
});
```

# async,await

ES6에서 놀라울정도로 자주 만나는 문법이 `async`와 `await`이다.

이 둘을 사용하면 위의 promise 객체를 더 쉽게 사용할 수 있다.

```js
async function fetchData () => {
    try {
        let response = await fetch("데이터를 요청할 서버의 URL주소");
        let json = await response.json();
    } catch (error) {
        console.log('error')
    }
}
```

이런 식으로 처리가 가능한데, async와 await을 이해하기위해서는 자바스크립트가 비동기처리를 어떻게 하는지 알아야한다.

기본적으로 콜백함수들은 가장 마지막에 실행된다.(비동기식 처리됨)  
그런데 이런 비동기식 처리가 계속되면 콜백지옥에 걸리게된다.

콜백지옥이란, 간단히 말하면 콜백함수 속에 콜백함수 속에 콜백함수를 호출하는 방식이다.

자바스크립트의 동작원리가 비동기식 처리를 해야하는 코드들은 queue에 저장해두고, 나머지 동기식 처리 코드들이 Stack에서 모두 실행되고 나서야  
비동기코드들을 처리하기 때문에, 개발자의 입장에서 보는 코드와 자바스크립트가 보는 코드가 다르다. => 작업이 꼬인다.

이걸 해결하기위한게 promise이며, promise를 쉽게 이용할 수 있는게 `async await`문법이다.

async ~ await을 하게되면, async로 선언된 함수 내부에서, await으로 실행되는 명령어들은  
해당 명령어의 처리가 끝나기 전까지 실행되지 않아 위에서부터 순서대로 작성된다.

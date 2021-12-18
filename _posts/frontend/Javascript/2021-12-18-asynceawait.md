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

`async`와 `await` 이 둘을 사용하면 위의 promise 객체를 더 쉽게 사용할 수 있다.

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

1. async가 붙은 함수는 반드시 promise를 반환하고, promise가 아닌건 promise로 감싸서 반환한다.
2. await은 promise객체를 리턴하는 함수에만 선언할 수 있다.
3. await은 async가 선언된 함수 내부에서만 선언이 가능하다.
4. await은 promise가 처리될때까지 기다린다는 의미인데, 기다리는동안 자바스크립트엔진이 다른 일을 할 수 있다.

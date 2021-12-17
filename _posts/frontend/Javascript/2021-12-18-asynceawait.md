---
title: "[javascript] Async, await"
excerpt: "Async, await"

categories:
  - javascript
tags:
  - [javascript, js, Async, await]

toc: true
toc_sticky: true

date: 2021-12-18
last_modified_at: 2021-12-18
---

<br><br>

# async,await

ES6에서 놀라울정도로 자주 만나는 문법이 `async`와 `await`이다.

이전에 살펴봤던 ajax의 최신기술인 fetch도

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

자바스크립트의 동작원리가 비동기식 처리를 해야하는 콜백함수들은 queue에 저장해두고, 나머지 동기식 처리 코드들이 모두 실행되고 나서야  
콜백함수들을 처리하기 때문에, 개발자의 입장에서 보는 코드와 자바스크립트가 보는 코드가 다르다. => 작업이 꼬인다.

이걸 해결하기위한게 promise이며, promise를 쉽게 이용할 수 있는게 `async await`문법이다.

async ~ await을 하게되면, async로 선언된 함수 내부에서, await으로 실행되는 명령어들은  
해당 명령어의 처리가 끝나기 전까지 실행되지 않아 위에서부터 순서대로 작성된다.

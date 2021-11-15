---
title:  "[React Native][생활코딩]"
excerpt: "리액트 설치, 리액트 샘플 웹앱 파일구조"

categories:
  - React
tags:
  - [React Native, 생활코딩]

toc: true
toc_sticky: true

date: 2021-11-12
last_modified_at: 2021-11-12
---


# 설치  

## npm 다운로드 이후

```bash
npm install -g create-react-app
```
이렇게 전역공간에 npm을 설치한다.  

터미널에서 설치하고자하는 폴더로 들어가서 (`cd 파일명`)  
`npm create-react-app` 실행


### 새로운 폴더에서 npm create-react-app 안되는 경우

새로운 폴더에서 안되는 경우도 있다. 이때는 전역공간에 create-react-app이 만들어지지 않았기때문이다. 

```
$ npm config set prefix /usr/local
$ sudo npm install -g create-react-app
$ create-react-app my-app
```

위 명령어를 작성하면 새로운 폴더에 리액트 개발환경 설정이 가능하다.

# VS Code에서 샘플 웹앱 실행

vs code 상에서 설정->명령 팔레트 에서 `터미널:새 터미널 만들기` 검색 후,  
터미널로 해당 폴더에 접근  
`npm run start`로 react 웹앱이 실행되고, 코드를 실시간으로 수정할 수 있다. 

    실행 : `npm run start`
    실행 종료 : `control + c`

# 샘플 웹앱


```bash
├── node_modules
├── public
│   ├── index.html
│   └── manifest.json
│   
├── src
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── setupTests.js
│   └── reportWebVitals.js
├── package.json
└── package-lock.json
``` 

파비콘, 로고 등을 삭제한 현재 폴더의 모습.

지킬 블로그나, 예전에 프론트 조금 끄적거렸을때도 `index.html`로 웹 페이지를 처음 구동하곤 했었다.  

리액트는 `index.html`은 src의 정보를 담는 그릇으로만 사용된다.  
실질적인 코드들은 src안의 파일들로 작성된다.  

index.js에서 src의 파일들을 import해 index.html에 해당 파일들을 React의 문법으로 삽입한다.  

## index.js

```js:index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
```
blablabal...  

<br>
그런데 익숙한 명령어 하나가 있다.  

```js
document.getElementById('root')
```
이 명령어는 html에서 root id를 가진 dom객체를 가져온다.  
그러면  

```js
ReactDOM.render(
<React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```
이 명렁어의 대략적 의미는, React 문법을 통해   
`root라는 id를 가진 dom 객체에 <App />을 넣는다` 정도 일 것이다.  
이 App이란 녀석은 `import App from './App';` 여기서 import되었고, 사용자 정의태그이다.  
App.js에서 App이라는 함수,모듈,변수 등을 넣으라는 것이다.  


## App.js

App은 클래스 형식으로 표현된 리액트 컴포넌트로 만들어졌다. 

```js:App.js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        Hello, React!
      </div>
    );
  }
}

export default App;
```

리액트로부터 React와 Component를 import 했다.  
그리고 밑의 class는 리액트 컴포넌트를 class 형식으로 표현한다.  
return은 최소한 하나의 태그가 있어야한다.  


## index.css

```css:index.css
body {
  background-color: aqua;
}

div .App {
  text-align: center;
}
```

```css:App.css
.App {
  font-size: 35px;
}
```

css를 구성하는 파일들이다.  
index.css에서 body 태그에 css를 적용할수도, 혹은  
App.css에서 body 태그에 css를 적용할수도 있다.  

컴포넌트별로 각각 css파일을 import하여 개별적으로 css를 관리할 수 있어 유지보수에 용이하다.  


# 배포

새로고침버튼을 오른쪽 클릭하면 Empty Cashe and Hard Reload를 할 수 있다.  
이 버튼을 누르면 캐시를 모두 삭제할 수 있다.  

리액트는 개발의 편의성을 위해 여러가지 기능을 추가하므로, create-react-app은 파일의 무게가 상당히 무겁다.  

따라서 배포모드의 어플리케이션을 `빌드`하기 위해서는 

```bash
npm run build
```
를 해준다.  


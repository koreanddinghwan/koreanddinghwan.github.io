---
title:  "[React Native][생활코딩]이벤트 state props ~ "
excerpt: "19강 ~ 26강"

categories:
  - Reactegoing
tags:
  - [React Native, 생활코딩]

toc: true
toc_sticky: true

date: 2021-11-17
last_modified_at: 2021-11-17
---

# state,props,render

어플리케이션을 역동적으로 만들어주는 이벤트 props, state, event가 서로 상호작용하면서 어플리케이션을 역동적으로 만들어준다.  
Content 컴포넌트가 현재 웹페이지가 어느 사이트인지에 따라 웹페이지의 새로고침 없이 화면이 그려지도록 할 수 있다.

<br>

## state 수정


링크를 클릭하면 해당 동작에 따라 웹페이지가 변경되게해야한다.  
리액트에서 현재 페이지가 어느 페이지인지 알려주는 요소로 mode라는 state를 생성한다.

mode의 state를 welcome과 read로 구분해 `첫 페이지`인지 `컨텐츠 페이지`인지를 알려준다.  


```js:App.js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'welcome',
      subject: {title:'WEB', sub:'World wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents: [
        {id:1, title:'REACT', desc:'HTML is a programming laguage ^^'},
        {id:2, title: 'Vue', desc:'vue is vue'},
        {id:3, title: 'angular', desc:'hello angular'}
      ]
    }
  }

```


리액트에서는 props나 state의 값이 변경되면 해당 컴포넌트의 render()함수가 다시 호출된다.  
그리고 그 render함수가 다시 호출됨에따라 `자식 컴포넌트`들도 다시 render()함수가 호출되게된다.  

<br>

## render함수 수정

```js:App.js
render() {
  var _title, _desc = null; //초기값은 null
  if (this.state.mode === 'welcome') {
    _title = this.state.welcome.title
    _desc = this.state.welcome.desc
  } else if (this.state.mode === 'read') {
    _title = this.state.contents[0].title; //인덱스넘버는 나중에 수정
    _desc = this.state.contents[0].desc; //인덱스넘버는 나중에 수정
  }
}
```

컴포넌트에 props로 전달할 _title과 _desc를 변수로 선언한다.   
이 변수들은 현재 mode가 welcome인지 read인지에 따라 다른 값을 받는다.  

그리고 return의 Content부분이 현재 mode에 따라 다른 title과 desc를 props로 가지도록 수정한다.  

```js:App.js
<Content title={_title} desc={_desc}>
```

<br><br>

# event

html에서 a태그는 기본적으로 태그를 클릭하면 웹페이지가 초기화된다.  
이것을 막기 위해서는 onClick 속성의 함수가 기본적으로 생성하는 매개변수인 e 프로퍼티 중에서  
defaultPrevented를 true로 바꿔줘야한다. 

```js:App.js
// <Subject/> 컴포넌트 잠시 생략
<header>
  <h2>
    <a href="/" 
    // 이벤트 속성의 함수의 첫 번째 인자로 e를 주게되면, 해당 이벤트가 가진 속성을 의미한다.
      onClick={ function(e) {
        // 이벤트에서 기본적인 동작을 막는다.
      e.preventDefault();
      }
        }>
    {this.state.subject.title}
    </a>
  </h2>

  {this.state.subject.sub}
</header>
```

<br><br>

## 이벤트를 통해 state 변경하기

```js:App.js
// <Subject/> 컴포넌트 잠시 생략
<header>
  <h2>
    <a href="/" 
    // 이벤트 속성의 함수의 첫 번째 인자로 e를 주게되면, 해당 이벤트가 가진 속성을 의미한다.
      onClick={ function(e) {
        // 이벤트에서 기본적인 동작을 막는다.
      e.preventDefault();
      }
        }>
    {this.state.subject.title}
    </a>
  </h2>

  {this.state.subject.sub}
</header>
```

위 코드에서 `h2 태그`를 클릭하게되면 홈페이지로 이동한다.  
이때, `mode`를 `welcome`으로 바꿔주어야하는데,  
이를 위해서 이벤트 함수 안에 App 컴포넌트의 state에서 mode를 바꿔야한다.  

<Br><br>

## setState()


    `e.preventDefault()` 아래에 `this.state.mode = 'welcome'`을 넣어서 바꿀 수 없다.  

그 이유로는 

첫번째로, 이벤트 속성의 함수에서 `this`가 무엇인지 알 수 없다.  

이를 해결하기위해 익명 함수의 끝에 `.bind(this)`를 붙여주어 이 함수가 this라는 이 컴포넌트를 인식할 수 있게 해야한다.  

<br>
<br>

두번째로 리액트는 `state`를 동기적으로 업데이트하지 않는다.[참고 리액트 공식문서](https://ko.reactjs.org/docs/faq-state.html)  

```
이전 절에서 설명했듯이 모든 컴포넌트가 자신의 이벤트 핸들러에서  
`setState()`를 호출할 때까지 React는 리렌더링을 하지 않고 내부적으로 “기다리고 있습니다”. 이를 통해 불필요한 렌더링을 방지하면서 성능을 향상시킵니다.  
```

따라서 현재 state.mode를 'welcome'으로 바꾸더라도, 리액트는 setState()함수가 호출될때까지 변경된 값을 유지하고 기다린다.  
그리고 `setState()`함수가 호출되면 리렌더링한다.  이를 통해 불필요한 렌더링을 방지하며 성능을 향상시킨다.  


```js:App.js
<header> 
          <h2>
            <a href="/" onClick={ function(e) {
              e.preventDefault();
              this.setState({
                mode:'welcome'
              })
            }.bind(this)}>
            {this.state.subject.title}
            </a>
          </h2>
          {this.state.subject.sub}
        </header>

```
이 문제들에 대해 좀 더 자세히 알아보자
<br><Br>

### bind() 함수 이해하기

`this`는 `render()`라는 함수 '안'에서만 해당 컴포넌트 자체를 가리킨다.



---
title:  "[React Native][생활코딩]이벤트 state props ~ "
excerpt: "19강 ~ 강"

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








# event

html에서 a태그는 기본적으로 태그를 클릭하면 웹페이지가 초기화된다.  
이것을 막기 위해서는 onClick 속성의 함수가 기본적으로 생성하는 매개변수인 e 프로퍼티 중에서  
defaultPrevented를 true로 바꿔줘야한다. 

```js:App.js
<header>
  <h2>
    <a href="/" 
      onClick={ function(e) {
      e.preventDefault();
      }
        }>
    {this.state.subject.title}
    </a>
  </h2>

  {this.state.subject.sub}
</header>
```










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


어플리케이션을 역동적으로 만들어주는 이벤트
props, state, event가 서로 상호작용하면서 어플리케이션을 역동적으로 만들어준다.  


리액트에서는 props나 state의 값이 변경되면 해당 컴포넌트의 render()함수가 다시 호출된다.  

그리고 그 render함수가 다시 호출됨에따라 자식 컴포넌트들도 다시 render()함수가 호출되게된다.  








링크를 클릭하면 해당 동작에 따라 웹페이지가 변경되게해야한다.  
mode라는 값을 state에 만들어 현재 페이지가 어디에 있는지 인식시켜야한다. 







html에서 a태그는 기본적으로 태그를 클릭하면 웹페이지가 초기화된다.  
이것을 막기 위해서는 onClick 속성의 함수가 기본적으로 생성하는 매개변수인 e 프로퍼티 중에서  
defaultPrevented를 true로 바꿔줘야한다. 

```


```


```js:App.js
<header>
  <h2>
    <a href="/" 
      onClick={ function(e) {
      e.preventDefault();
      console.log(e)  
      }
        }>
    {this.state.subject.title}
    </a>
  </h2>

  {this.state.subject.sub}
</header>
```










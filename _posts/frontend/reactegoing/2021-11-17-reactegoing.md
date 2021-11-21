---
title:  "[React Native][생활코딩]이벤트 state props ~ 컴포넌트 이벤트 만들기"
excerpt: "19강 ~ 26강"

categories:
  - Reactegoing
tags:
  - [React Native, 생활코딩]

toc: true
toc_sticky: true

date: 2021-11-17
last_modified_at: 2021-11-22
---

# state,props,render

어플리케이션을 역동적으로 만들어주는 이벤트 props, state, event가 서로 상호작용하면서 어플리케이션을 역동적으로 만들어준다.  
Content 컴포넌트가 현재 웹페이지가 어느 사이트인지에 따라 웹페이지의 새로고침 없이 화면이 그려지도록 할 수 있다.

<br>

## 💡state 수정


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

## 💡render함수 수정

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

## 💡이벤트를 통해 state 변경하기

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

## 💡함수를 통해 state를 변경할때 주의사항

<br><br>


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


### ✏️ bind 함수 이해하기

<br>

bind함수는 함수와 객체를 묶어주는 역할을 한다.  
  
bind함수의 괄호 안에 객체를 넣으면 `이 객체를 this로 하는 새로운 함수가 복제`되어 만들어진다.  

```js
<a href="/" onClick={ function(e) {
        e.preventDefault();
        this.setState({
          mode:'welcome'
        })
        }.bind(this)}>
        {this.state.subject.title}
  </a>
```

따라서 위 스크립트에서 this는 App이라는 컴포넌트를 의미하므로  
this.setState로 App 컴포넌트의 state에 접근할 수 있게된다.  

<br><br>

### ✏️ setState함수 이해하기


```javascript

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


  render() {
    let _title, _desc = null; 
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read'){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc
    }


    return (
      <div className='App'>

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
        
        <Toc data = {this.state.contents}/>
        
        <Content 
        title={_title} 
        desc={_desc}/>
      </div>
    );
  }
}

export default App;
```


App컴포넌트는 크게 3부분으로 나눌 수 있다.  

1. 생성자(constructor)

2. render

3. render함수 내에 return

<br>

❗️생성자는 컴포넌트가 생성될 때, 기본적으로 생성된다.  

❗️그리고 render함수를 통해 컴포넌트에 그릴 내용을 결정한다.  

❗️render함수에서 if문을 통해 현재 mode가 welcome인지 read인지에 따라 보여줄 내용을 state로부터 받아 변수에 저장하고, 이 저장된 변수를 이용해 return 함수에서 컴포넌트를 그린다.  

이 과정은 사용자가 웹 사이트를 접속해 화면을 볼 수 있으면 끝난 것이다.  

<br><Br>

이 시점에서 state.mode를 변경하는 링크를 클릭하면

``` 
this.state.mode = 'welcome'
```
이 명령어는 객체의 프로퍼티값을 바꿀 수는 있지만, 리액트가 이 변경된 값을 기준으로 리렌더링을 하지 않는다.  
<br>

```
this.setState({mode:'welcome'})
```
이렇게 명령해야 리액트가 state값이 변경된 것을 인식할 수 있다.  

setState()가 중요한 이유는 리렌더링할 시점을 개발자가 정할 수 있다는 것이다.  
return 부분에서 변경해야할 값들을 this.state로 변경해 유지하고, setState를 통해  
`특정 시점`에 리렌더링을 할 수 있다.  


<br><Br>

# 컴포넌트 이벤트 만들기

<br><br>

## 💡자식 컴포넌트에서 부모컴포넌트의 state를 변경하기

자식컴포넌트의 이벤트로 부모컴포넌트의 state를 변경하기위해선  
부모컴포넌트에서 state를 변경하는 이벤트를 정의하고,  
자식 컴포넌트가 이를 props로 전달받아 실행할 수 있게 해야한다.


```js
<Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage = {function(){
          this.setState({
            mode:'welcome'
          })
        }.bind(this)}/>
```

부모컴포넌트 App에서 state를 변경하는 이벤트onChangePage를 정의해 자식컴포넌트 Subject에 props의 형태로 전달한다.


```js
class Subject extends Component {
    render() {
      return (
        <header>
          <h1>
            <a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
              
            }.bind(this)}>{this.props.title}</a>
            
            <div/>

            {this.props.sub}
          </h1>
        </header>
      )
    }
  }
export default Subject;
```
자식 컴포넌트 Subject에서 태그의 이벤트 함수에 `bind(this)`로 함수와 자식컴포넌트객체를 연결하고,  
props로 전달받은 이벤트 onChangePage를 실행할 수 있다.  



<br><br>

지금까지 홈페이지로만 이동하는 이벤트를 정의했는데, 
Toc 컴포넌트의 li 요소의 a태그들도 각각 누르면 mode가 read로 변경되어야한다.  

```js
<Toc 
        data = {this.state.contents}
        onChangePage = {function(){
          this.setState({
            mode:'read'
          })
        }.bind(this)}/>
```

```js
import React, { Component } from 'react';

class Subject extends Component {
    render() {
      return (
        <header>
          <h1>
            <a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}>
              {this.props.title}
            </a>
            <div>
            {this.props.sub}
            </div>
          </h1>
        </header>
      )
    }
  }

export default Subject;
```

<br><br>

## 자식컴포넌트로부터 부모컴포넌트에게 값 전달하기

<br><br>
클릭된 Toc 컴포넌트의 li 요소에 따라 Content컴포넌트의 내용이 변경되어야한다.  

현재 렌더링할 컨텐츠의 id를 부모컴포넌트에 state로 넣어준다.  

```js
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
      ],
      selectedcontentid: null
    }
  }
```

<br><Br>

### ✏️ target의 dataset으로 전달하기

<br><Br>


```js
class Toc extends Component {
    render() {
      var lst = [];
      var data = this.props.data
      let i = 0;
      while(i < data.length) {
        lst.push(<li key={data[i].id}>
          <a
            data-id = {data[i].id}
            href="/" 
            onClick={function(e) {
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
              }.bind(this)}>{data[i].title}</a>
          </li>)
        i += 1;
      }
      return (
        <nav>
          <ul>
            {lst}
          </ul>
        </nav>
      )
    }
  }
```

```js
-App.js-
<Toc 
        data = {this.state.contents}
        onChangePage = {function(id){
          this.setState({
            mode:'read',
            selectedcontentid:parseInt(id)
          })
        }.bind(this)}
        />
```


부모컴포넌트의 state를 변경하기 위해서는 자식컴포넌트에서 부모컴포넌트에게로 현재 사용자가 클릭한 버튼의 데이터를 넘겨주어야한다.  

부모컴포넌트와 자식컴포넌트를 props `onChangePage`로 연결했기 때문에 자식 컴포넌트 기준에서, 이 함수를 호출할때  

매개변수로 이 정보를 넘겨주고, 부모컴포넌트가 정의한 이 함수는 이 정보로 state를 변경할 수 있다.

`data-`를 접두사로 태그에 속성을 부여하면 이벤트가 발생한 태그의 이벤트 객체 `e`에서 `target`이라는 프로퍼티에서 `dataset`이라는 프로퍼티로 접근이 가능하다.  

<br><br>

### ✏️ bind 함수 이용

또는 bind함수를 이용할 수도 있다.  
bind함수는 함수 뒤에 붙어 이 함수가 함수 바깥 객체를 인식하게끔 해준다.  
bind(this)다음 인자로 함수 바깥의 객체를 넘겨주게되면,  
해당 함수는 이 인자를 매개변수로 사용할 수 있게 된다. (전역변수->지역변수)  

함수의 매개변수의 첫번째 인자 자리에 밀어넣으면 된다.  
```js
while(i < data.length) {
        lst.push(<li key={data[i].id}>
          <a
            href="/" 
            onClick={function(id,e) {
              e.preventDefault();
              this.props.onChangePage(id);
              }.bind(this,data[i].id)}>{data[i].title}</a>
          </li>)
        i += 1;
      }
```
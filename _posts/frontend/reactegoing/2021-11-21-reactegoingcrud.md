---
title:  "[React Native][생활코딩] CRUD"
excerpt: "28강 ~ 40강"

categories:
  - Reactegoing
tags:
  - [React Native, 생활코딩]

toc: true
toc_sticky: true

date: 2021-11-21
last_modified_at: 2021-11-22
---

# CRUD 소개

모든 정보기술은 기본적으로 create, read, update, delete의 기능을 가진다.  
sql에서도 쿼리에 대해 처음 배울때, CRUD로 입문했었다.  

<br><br>

## 컴포넌트 구성


CRUD에 해당하는 각 버튼을 페이지의 컴포넌트로 만들자.  
read는 현재 mode:read에서 구현되어있다.  
delete의 경우, 링크를 클릭하는 것이 아닌 button으로 구현한다.  


```js
import React, { Component } from 'react';

class Control extends Component {
    render() {
      return (
        <ul>
          <li>
            <a href="/create">
              create
            </a>
          </li>
          <li>
            <a href="/update">
              update
            </a>
          </li>
          <li>
            <input type='button' value='delete'>

            </input>
          </li>
        </ul>
      )
    }
  }

export default Control;
```

이제 App.js에서 해당 컴포넌트를 사용할 수 있다.

```JS
import Control from './components/control';
```

<br><br>

## 부모, 자식 컴포넌트 연결

각 버튼이 눌리면 현재 mode를 바꿔야하므로 자식->부모에게로 데이터가 이동해야한다.  

### 자식컴포넌트(control.js) 수정

각 버튼은 onClick시 preventdefault로 페이지의 새로고침을 방지한다.  

그리고 각 태그별로 props로 부모컴포넌트에게서 함수를 전달받고, 여기에 매개변수로 현재 mode를 전달한다.  


```js
import React, { Component } from 'react';

class Control extends Component {
    render() {
      return (
        <ul>
          <li>
            <a href="/create" onClick = {function(e) {
              e.preventDefault();
              this.props.onChangeMode('Create');

            }.bind(this)}>
              create
            </a>
          </li>
          <li>
            <a href="/update" onClick = {function(e) {
              e.preventDefault();
              this.props.onChangeMode('Update');

            }.bind(this)}>
              update
            </a>
          </li>
          <li>
            <input type='button' value='delete' onClick = {function(e) {
              e.preventDefault();
              this.props.onChangeMode('Delete');

            }.bind(this)}>

            </input>
          </li>
        </ul>
      )
    }
  }

export default Control;
```

<br><br>

### 부모컴포넌트(App.js) 수정

부모컴포넌트가 자식컴포넌트가 호출할 함수를 props로 정의한다.   

이 함수는 부모컴포넌트의 state를 변경하는데, 이 함수는 자식컴포넌트로부터 매개변수로 현재 mode를 전달받는다.  


```js
<Control 
onChangeMode = {function(_mode) {
    this.setState({
    mode : _mode
})

}.bind(this)}
    />
```


<br><br>

# Create 구현

## content 구분

create 클릭 시, content 영역이 create에서 사용되는 content로 바뀌어야한다.  

기존의 content는 read mode에서 사용되는 content이므로, 이름을 Readcontent로 바꾸자.  

그리고 create mode에서 사용될 content를 createcontent라는 컴포넌트로 새로 만든다.  


```js
--ReadContent--
import React, { Component } from 'react';

class  ReadContent extends Component {
    render() {
      return (
        <article>
          <h1>{this.props.title}</h1>
          {this.props.desc}
        </article>
      )
    }
  }

  export default ReadContent;
```

```js
--CreateContent--
import React, { Component } from 'react';

class  CreateContent extends Component {
    render() {
      return (
        <article>
          <h2>Create</h2>
          <form></form>
          
        </article>
      )
    }
  }

  export default CreateContent;
```

<br><br>

## mode에 따라 표시될 content 바꾸기

이전에는 content에서 바뀌는 내용이 props로 title과 desc로 전달되었다.  

그래서 각각의 props가 content 컴포넌트의 내용을 구성했다.  

readcontent 처럼 createcontent를 props의 값으로만 변경하는 것은 불필요한 낭비이므로,  

create content 컴포넌트 자체를 새로 구성하는게 낫다.  

if ~ else 문으로 현재 mode에 따라 화면에 포시되는 내용을 구분하고 있으므로, else if 분기점을 하나 추가해 Create mode일때를 구분한다.

```js
//state의 mode가 Create일때
    } else if (this.state.mode === 'Create') {

    }
```

<br><br>

렌더링할 컴포넌트에 대해 생각해봐야하는데,  

현재 mode에 따라 각각 다른 컴포넌트를 렌더링 해야한다.  

따라서 렌더링할 대상을 컴포넌트 자체를 의미하는게 아닌, 변수에 컴포넌트를 담아 mode에 따라 다른 컴포넌트가 변수에 담기게 하는게 좋다.  

_article이라는 변수를 만들고, 이 변수에 if~else문의 각 분기점마다 다른 컴포넌트가 담기게한다.  

그리고 return 부분에서 이 변수를 렌더링한다.   

```js
--App.js--
  render() {
    let _title, _desc, _article = null; //_title과 _desc변수 초기 선언
    //state의 mode가 welcome일대
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>
    
    //state의 mode가 read일때
    } else if (this.state.mode === 'read'){
      var i = 0
      while (i<this.state.contents.length) {
        var data = this.state.contents[i]
        if (data.id === this.state.selectedcontentid) {
          _title = data.title;
          _desc = data.desc;
        break
        }
        i += 1;
      }
      _article = <ReadContent title={_title} desc={_desc}/>

    //state의 mode가 Create일때
    } else if (this.state.mode === 'Create') {
      _article = <Createcontent/>
    }
```


```js
--App.js, return--
    <Control 
    onChangeMode = {function(_mode) {
      this.setState({
        mode : _mode
    })

    }.bind(this)}
      />
    
    {_article}
  </div>
);
```



<br><br>


## createcontent의 form영역 정의


form 태그 구현

```js
import React, { Component } from 'react';

class  CreateContent extends Component {
    render() {
      return (
        <article>
          <h2>Create</h2>

          <form action='/create_process' method='post' onSubmit={function(e){
            e.preventDefault();
            console.log('submit')
          }.bind(this)}
          >

            <p>
            <input type='text' placeholder='title' name='title'></input>
            </p>
            <p>
              <textarea name='desc' placeholder='description'>

              </textarea>
            </p>
            <p>
              <input type='submit'></input>
            </p>
          </form>
          
        </article>
      )
    }
  }

  export default CreateContent;
```

1. method를 post로해야 url에 노출되지 않는다. 

2. submit버튼 누르면 action의 url로 데이터가 전송된다.

3. 그리고 form태그의 submit type의 input이 있으면 만약 submit시, form태그의 onSubmit이 실행되도록 약속되어있다.

4. form태그의 submit버튼 클릭하면 action 링크로 가야하지만 이를 막기위해 preventDefault달아준다.

<br><br>

## form태그의 제출정보를 부모 컴포넌트에 전달하기  

<br>

form태그의 제출 버튼이 눌리면 title과 desc의 정보가 부모컴포넌트의 state값을 바꿔야한다.  

form태그의 submit버튼의 기본동작을 막기위해 e.preventDefault를 달아줬는데,  
이때 e를 console.log로 출력해보면 target이

<img width="200" src="https://user-images.githubusercontent.com/76278794/142763659-c03c9bb4-de47-4151-8b8c-0ef06d12301d.png">
<img width="200" src="https://user-images.githubusercontent.com/76278794/142763661-bf70834b-750f-420d-8a72-993152196cd7.png">

form태그 안의 input들에 입력된 value값들을 저장하고 있는 것을 알 수 있다.  

<br>

```js
<form action='/create_process' method='post' onSubmit={function(e){
  e.preventDefault();
  let title = e.target.title.value
  let desc = e.target.desc.value
  console.log(e)
  this.props.onSubmit(title,desc);
}.bind(this)}>
```

이걸 변수에 저장해 부모컴포넌트에게 던져주자  

이제 부모컴포넌트는 이 변수들을 매개변수로 사용할 수 있다.  

<br><br>

## 받은 정보로 state값 변경


```js
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

```
부모 컴포넌트의 this.state.contents는 리스트로 정의되어있다.  

우리는 제출받은 정보를 이 리스트의 끝에 추가해야한다.  

id값은 생성자에 별도로 변수를 만들고, 추가할때마다 1씩 증가하게하자.

```js
constructor(props) {
    super(props);
    // 현재 컨텐츠에 추가되어있는 id넘버링 유지
    this.max_content_id = 3;
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
```

<br>

그리고 state에 변경사항을 반영하고, 이것 만으로는 리액트가 렌더링하지 않으므로  
setState함수를 통해 변경사항을 렌더링한다.  

```js
else if (this.state.mode === 'Create') {
      _article = <Createcontent onSubmit={function( _title, _desc){
        this.max_content_id += 1;
        this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: this.state.contents
        })
      }.bind(this)}/>
    }
```

<br><br>

# state를 변경할때, 주의사항(불변성)

현재 state에 변경사항을 직접 반영함으로써 setState로 변경값을 렌더링했다.  
하지만 이렇게 직접적으로 이전 state를 변경하는 것은 좋은 방법이 아니다.    
push로 배열을 추가하게되면 `원본데이터`를 바꾼다.  
원본데이터와 원본데이터를 바꾼 데이터가 참조하는 메모리가 `같기`때문에  
내용물까지도 모두 살펴봐야한다는 것이다.  

`최적화나 버그수정 시에 어려움이 뒤따르므로 깊은 복사 concat을 사용해 원본 데이터의 불변성을 유지해야한다.`

변경이 일어난 객체의 프로퍼티만 비교함으로써 React에서 최적화가 가능하다.

<br>

이해하기가 살짝 어려웠는데, 
만약 contents의 1000만개 +1개의 값이 추가되었다고 생각해보자.  

원본 데이터를 변경했으면 현재 데이터와 1000만개를 다 비교하면서 true,false를 따져가면서 1000만 1개째에서  
`앗 원본데이터랑 지금 데이터랑 1000만 1개째에서 다르네요! 데이터가 다르니 다시 렌더링할게요!` 겠지만  

원본 데이터를 깊은 복사하고, 새로운 데이터에 1개를 집어넣으면  
`1000만 1개를 모두 비교할 필요 없이, 바로 다시 렌더링할 수 있다!`

<br>

또는 이렇게 말할수도 있겠다.  

```
--원본데이터를 변경했을때--
현재 state : 새우깡포장지에 들어있는 새우깡들
바뀐 state : 새우깡포장지에 들어있는 새우깡들 + 새로운 데이터 고구마깡 1개
```
바뀐 고구마깡 1개를 찾기위해 state안에 들어있는 모든 새우깡을 살펴가면서 고구마깡을 찾는다.  

```
--원본데이터를 복사해 바뀐 데이터를 반영--
현재 state : 새우깡포장지에 들어있는 새우깡들
바뀐 state : 홈런볼포장지에 들어있는 새우깡들  + 새로운 데이터 고구마깡 1개
```
포장지(참조하는 메모리값)부터 다르니까, 내용물을 볼 필요도 없이 다시 렌더링한다.


`즉, 깊은 복사를 했다는 것은 개발자가 리액트에게 현재 렌더링할 데이터가 변경되었다는 것을 알리는 것이다.`



# shouldcomponentupdate

지금 toc component는 내용이 바뀌지 않아도 계속 렌더링이 불필요하게 반복된다.  
이렇게 불필요한 동작들을 막는 것을 흔히 `성능 최적화`라고 한다.  

<code>shouldComponentUpdate(nextProps, nextState)</code>






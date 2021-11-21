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




# Create 구현

create 클릭 시, content 영역이 create에서 사용되는 content로 바뀌어야한다.  

기존의 content는 read mode에서 사용되는 content이므로, 이름을 Readcontent로 바꾸자.  

그리고 create mode에서 사용될 content를 createcontent라는 컴포넌트로 새로 만든다.  


```


```







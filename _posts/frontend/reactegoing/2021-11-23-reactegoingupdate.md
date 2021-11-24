---
title:  "[React Native][생활코딩] Update"
excerpt: "36강 ~ 40강"

categories:
  - Reactegoing
tags:
  - [React Native, 생활코딩]

toc: true
toc_sticky: true

date: 2021-11-23
last_modified_at: 2021-11-23
---

# Update 기능

자신이 수정하고싶은 데이터를 수정하는 기능  

1. 현재 렌더링하고 있는 컨텐츠에서, control 컴포넌트로 App 컴포넌트의 state가 `mode:'update'`로 바뀔 때, 렌더링 중인 컨텐츠를 가져와야한다.


# 함수구분

## getReadContent()

읽어올 데이터를 구분한다.  

Toc 컴포넌트는 유저가 Toc에서 렌더링하는 각 컨텐츠를 클릭하면 해당 컨텐츠의 id를 selectedcontentid로 수정한다.  

현재 state에 저장된 각 컨텐츠의 id값을 비교해가면서 같으면 해당 컨텐츠(data)를
리턴하는 함수이다.  

```javascript
getReadContent() {
    let i = 0
    while (i < this.state.contents.length) {
      let data = this.state.contents[i]
      if (data.id === this.state.selectedcontentid) {
        return data
        break
      }
      i += 1;
    }
  }
```

<br>




## getContent()

기존에 if~else로 각 mode를 구분해 렌더링할 컨텐츠를 구분하던 명령문을 함수로 묶은 것이다.  

다른 점은, getReadContent()가 현재 렌더링할 데이터를 리턴하므로, 이 함수를 이용해 mode === 'read'일때 명령문을 바꿔야한다.  

```javascript
//state의 mode가 read일때
    } else if (this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}/>

```



# 현재 렌더링중인 데이터 가져오기

```js
} else if (this.state.mode === 'Update') {
      _content = this.getReadContent();
      //UpdateContent에 props로 현재 컨텐츠를 전달
      _article = <UpdateContent data={_content} onSubmit={function(){

      }.bind(this)}/>
    }
    return _article
  }
```

현재 렌더링 중인 데이터를 UpdateContent 컴포넌트에 props로 전달했다.(부모->자식)  

<br>

## props는 read only

그리고 UpdateContent 컴포넌트 리턴값의 input과 textarea에 value로  
props에 전달된 값들을 출력할 수 있다.  

```js
<p>
    <input 
    type='text' 
    placeholder='title' 
    name='title'
    value={this.props.data.title}></input>
</p>

<p>
    <textarea 
    name='desc' 
    placeholder='description'
    value={this.props.data.desc}></textarea>
</p>
```

<br>

하지만 value값들에 직접적으로 props의 값을 넣으면 리액트가 스스로 해당 데이터의 수정이 불가능하도록 막는다.  

<img width="474" alt="스크린샷 2021-11-23 오후 9 51 22" src="https://user-images.githubusercontent.com/76278794/143027160-67d9f74a-ac26-4a9e-bd06-ebed1b6425bf.png">  

이를 해석하면, form 필드의 value값으로 props를 사용했는데, `onChange hadler`없이는 read only 필드만 만들 것이다 라는 뜻이다.  

부모컴포넌트로부터 전달받은 props를 자식 컴포넌트가 직접적으로 제어하지 못하게 하기 위해서 이런 것이 아닐까 싶다.  

onChange 이벤트리스너를 설치해 바뀌는 값들을 `자식컴포넌트`의 state가 바뀌도록하자.  

<br><br>

## 자식 컴포넌트에 state 생성


```js
class UpdateContent extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc
    }
  }
```

```js
<p>
<input 
type='text' 
placeholder='title' 
name='title'
value={this.state.title}
onChange={function(e){
    this.setState({title:e.target.value})
}.bind(this)}></input>
</p>
```

input에 변화가 생길때마다 input의 value값을 state의 title에 저장하고 리렌더링한다.  

<br>

동일하게 textarea도 onChange 속성을 달아주자.

```js
<p>
    <textarea 
        name='desc' 
        placeholder='description'
        value={this.state.desc}
        onChange={function(e){
        this.setState({desc:e.target.value})
        }.bind(this)}>
    </textarea>
</p>
```

<br>

업데이트 하기위해서는 어떤 컨텐츠를 수정할 것인가에 대한 정보도 필요하다.   
식별자로써, 현재 업데이트 하고있는 내용이 어떤 것인지에 대한 정보를 담는 태그를 만들자.  

```js
<input type='hidden' name = 'id' value = {this.state.id}></input>
```

<br><br>

### 리팩토링

onChange 이벤트 리스너의 함수를 따로 선언해주자.  

```js
inputFormHandler(e) {
    this.setState({
        [e.target.name]:e.target.value
    })
}
```
대괄호 문법은 자바스크립트 최신 문법이다. 

<br>

그리고 이 함수에 무조건 달리는 `.bind(this)`를 생성자에서 정의하자 

```js
this.inputFormHandler = this.inputFormHandler.bind(this)
```

<br>

이제 태그들의 이벤트 리스너 함수들을 다시 작성해주자
```js
<textarea 
        name='desc' 
        placeholder='description'
        value={this.state.desc}
        onChange={this.inputFormHandler}>
</textarea>
```
```js
<input 
    type='text' 
    placeholder='title' 
    name='title'
    value={this.state.title}
    onChange={this.inputFormHandler}>
</input>
```


<br>




# 부모 컴포넌트에 자식 컴포넌트의 현재 state 전달

updatecontent컴포넌트의 폼 제출시 form 태그의 onSubmit 함수가 실행된다. 이 함수는 부모 컴포넌트에게 현재 자식컴포넌트의 state를  
전달할 수 있다.

```js
<form action='/Update_process' 
        method='post' 
        onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
                this.state.id,
                this.state.title,
                this.state.desc,
                );
            }.bind(this)}
          >
```


```js
_article = <UpdateContent 
      data={_content}
      onSubmit={function(_id,_title,_desc){ //UpdateContent의 form태그가 id,title,desc제출함
        //과거 컨텐츠 완전복사(원본을 완전 복사한 다른 객체를 만든다., 깊은복사)
        const _contents = Array.from(this.state.contents);

        //submit된 contents의 id와 같은 content를 _content에서 찾는다.
        let i = 0;
        while (i < _contents.length) {
          if (_id === _contents[i].id) {
            _contents[i].title = _title
            _contents[i].desc = _desc
            break;
          }
          i += 1
        }

        this.setState({
          contents:_contents
        })
      }.bind(this)}/>

```

자식 컴포넌트로부터 _id, _title, _desc 정보가 오면 부모 컴포넌트의 onSubmit 함수가 연산을 실행한다.  

`const _contents = Array.from(this.state.contents)`로 불변성을 유지하기 위해 깊은 복사를 실행한다.  

그리고 사용자가 수정한 id값이 자식 컴포넌트로부터 전달되었으므로, _contents에서 수정된 id를 가진 컨텐츠를 찾는다.  

해당 컨텐츠의 title과 desc는 자식 컴포넌트가 전달한 값으로 교체된다.  

그리고 변경된 _contents를 setState()함수를 불러와 contents를 변경하고, 리렌더링한다.  


<br><br>


# Delete 기능


delete 버튼을 누르면, 현재 보고있는 페이지의 컨텐츠가 사라져야한다.  

delete버튼이 눌리면 control 컴포넌트에서 onClick 이벤트 리스너로 onChangemode함수가 부모 컴포넌트로부터 실행된다.  

mode가 Delete로 바뀌게 되고, 이에 따라 우리는 삭제연산을 수행해야한다.  

삭제해야하는 배열을 완전 복사해 새로운 변수 `_contents`로 선언하고, 여기에서

현재 선텍된 컨텐츠의 id값을 가진 컨텐츠를 삭제한다.  

그리고 setState함수를 통해 부모컴포넌트의 state값을 변경한다.

```js
<Control 
        onChangeMode = {function(_mode) {
          if (_mode === 'Delete') { //만약 클릭된 control이 delete라면
            if (window.confirm('delete?')) { //사용자가 삭제 확인 버튼을 누른다면
              //완전복사
              const _contents = Array.from(this.state.contents)
              let i = 0;
              while (i < _contents.length) {
                if (this.state.selectedcontentid === _contents[i].id) { //만약 찾으면
                  _contents.splice(i,1);

                  break
                }
                i += 1
              }

              this.setState({
                mode:'welcome',
                contents: _contents,
              })
            }
          } else {
          this.setState({
            mode : _mode
            })
          }
        }.bind(this)}
        />

```






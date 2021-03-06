---
title:  "[javascript] 함수,스코프"
excerpt: "변수가 쓰이는 방법에 주의하자."

categories:
  - javascript
tags:
  - [javascript, js]

toc: true
toc_sticky: true

date: 2021-10-04
last_modified_at: 2021-10-14
---

# 함수

## 💡 fuction이란
함수란 독립적인 코드를 한데 묶어 놓은 것이다.  
이렇게 코드를 한데 묶어 놓는 것을 함수의 정의(declaratione)이라고 한다.  
이렇게 만들어진 함수는 호출을 통해 불러올 수 있고 재사용이 가능하다.  
깔끔하게 만들어진 함수는 재사용성이 높고 유지보수가 편리하다.

```
function 함수명(매개변수,parameter) {
    실행코드
}
```

매개변수나 리턴값이 없을수도 있다.

<br>
<br>

## 💡 입출력

수학에서의 함수처럼 만들어진 함수에 매개변수로 입력값을 넣으면  
출력으로 return값이 나오게 된다.  
```
function 환율(dollar) {
    return dollar * 1185.67
}
```


<br>
<br>

## 💡 {} 코드블록

조건문, 반복분, 함수에서 계속 코드블록이 생성된다.  
함수의 코드블록은 조건문과 반복문과는 달리 함수가 호출되어야만 실행된다.  
따라서 함수 내에서 그냥 선언된 변수는 함수 밖에서 사용할 수 없다.


<br>
<br>

## 💡 스코프

변수를 선언할때, 해당 변수를 어디서 접근 가능한지 정의한다.
<br>
<br>

- 전역(global)스코프 :  
  블록 바깥에, 일반적으로 선언된 변수  
  모든 스코프에서 사용가능하다.


- 지역(local)스코프 :  
  블록 내부에 선언된 변수  
  var로 선언 ▶️ 모든 스코프에서 사용가능  
  let로 선언 ▶️ 선언된 블록, 중첩된 블록 내에서만 사용 가능 

<br>

  지역스코프의 종류
  - 블록 스코프 : 조건문, 반복문 등에 선언된 변수
  - 함수 스코프 : 함수 내부에 선언된 변수



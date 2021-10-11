---
title:  "[javascript] 함수,스코프"
excerpt: "배열형과 객체의 사용"

categories:
  - javascript
tags:
  - [javascript, js]

toc: true
toc_sticky: true

date: 2021-10-04
last_modified_at: 2021-10-04
---

# 함수

## fuction이란
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

## 입출력

수학에서의 함수처럼 만들어진 함수에 매개변수로 입력값을 넣으면  
출력으로 return값이 나오게 된다.  
```
function 환율(dollar) {
    return dollar * 1185.67
}

# 스코프
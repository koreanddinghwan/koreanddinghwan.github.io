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
터미널에서 설치하고자하는 폴더로 들어가서 (`cd 파일명`)  

`npm create-react-app` 실행

나는 react를 공부할 공간을 깃허브와 연동해서 맨들고 싶으므로,  
터미널 상 github 폴더에서 `npm create-react-app reactstudy` 실행.  
그리고 githuh desktop에서 `Add Existing Repositoy`로 깃허브에 publish  

# VS Code에서 샘플 웹앱 실행

vs code 상에서 설정->명령 팔레트 에서 `터미널:새 터미널 만들기` 검색 후,  
터미널로 해당 폴더에 접근  
`npm run start`로 해당 폳더의 index.html가 실행된다.

    실행 : `npm run start`
    실행 종료 : `control + c`

# 샘플 웹앱의 파일구조


```bash
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── logo512.png
│   ├── logo192.png
│   └── rorot.txt
│
├── src
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── setupTests.js
│   └── reportWebVitals.js
├── package.json
└── package-lock.json
``` 

지킬 블로그나, 예전에 프론트 조금 끄적거렸을때도 `index.html`로 웹 페이지를 처음 구동하곤 했었다.  
하지만 리액트에서는 그렇게 웹페이지가 구동되지 않는다.  





const logininput = document.querySelector("#login-form input")
const loginForm = document.querySelector("#login-form")
const greeting = document.querySelector("#greeting");


const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"

//환영 문자열 그리는 함수
function PaintGreeting(username) {
    greeting.innerText = `Hello ${username}`
    greeting.classList.remove(HIDDEN_CLASSNAME) //hidden 클래스를 지운다.

}


//submit성공시 실행되는 함수.
function onLoginSubmit(event) {
    event.preventDefault(); //제출시 페이지 새로고침 방지
    const username = logininput.value; //인풋값을 username 변수에 저장
    loginForm.classList.add(HIDDEN_CLASSNAME); //로그인폼을 가리기위해 hidden클래스 추가
    localStorage.setItem(USERNAME_KEY, username); //로컬스토리지에 username 키밸류형태로 저장
    PaintGreeting(username)
}


const savedUsername = localStorage.getItem(USERNAME_KEY);//로컬 스토리지에 저장된 username받아오기

if (savedUsername === null) { //유저이름이 로컬스토리지에 저장되어있지 않은경우
    loginForm.classList.remove(HIDDEN_CLASSNAME) //로그인폼을 보여주기 위해 로그인폼의 hidden 삭제
    loginForm.addEventListener('submit', onLoginSubmit) //이벤트리스너함수 실행
} else {
    PaintGreeting(savedUsername)
}










---
title: "[React] 리액트 라우터v5"
excerpt: "공부한거 요약"

categories:
  - React
tags:
  - [React]

toc: false
toc_sticky: false

date: 2021-12-16
last_modified_at: 2021-12-16
---

<br><br>

[책](https://www.coupang.com/vp/products/120472093?itemId=358581223&vendorItemId=5273684398&src=1042503&spec=10304984&addtag=400&ctag=120472093&lptag=10304984I358581223&itime=20211207005638&pageType=PRODUCT&pageValue=120472093&wPcid=16343068305263469638211&wRef=&wTime=20211207005638&redirect=landing&gclid=CjwKCAiAhreNBhAYEiwAFGGKPGAzme2bZkOOwvE8flNvEgVNhXAC5GbGlmYy7vRM86Zn4ksRcB88IhoCojYQAvD_BwE&campaignid=12654708954&adgroupid=123881097567&isAddedCart=)

[Velopert](https://velopert.com/)

<br><br>

`react-router-dom`을 공부하면서, 여러가지 문제점에 봉착했다.  
첫번째로, useHistory가 useNavigator 훅으로 교체되었고, useBlocker 및 usePrompt가 제거되었고 등등...  
최신버전일수록 어떤 이슈가 발생하면 해결한 사람도 적고, 커뮤니티도 적고, 등등 불완전성이 높아지는 것 같다.

# 기본설정

index.js에서 App 컴포넌트를 BrowserRouter로 감싼다.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

App, Home, About 기본설정

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./router/About";
import Home from "./router/Home";

function App() {
  return (
    <div className="App">
      <hr />
      <Route exact path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </div>
  );
}

export default App;
```

```jsx
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>홈이에요</h1>
      <p>시작페이지죠</p>
    </div>
  );
};
export default Home;
```

```jsx
import React from "react";

const About = () => {
  return (
    <div>
      <h3>소개글입니다.</h3>
      <p>아이고</p>
    </div>
  );
};
export default About;
```

path 설정할때 exact를 설정해야하는 이유는 `/about`이 `/`규칙에도 일치하기 때문이다.  
exact를 추가하면 중복렌더링을 막을 수 있다.

## Link 설정

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./router/About";
import Home from "./router/Home";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>

      <hr />
      <Route exact path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </div>
  );
}

export default App;
```

`Link`는 리액트에서 a태그 대신 사용한다.  
`a태그는 페이지 리렌더링을 유발하기때문에`

## 하나의 Route에 여러 path 설정

```jsx
function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>

      <hr />
      <Route exact path="/" component={Home}></Route>
      <Route path={["/info", "/about"]} component={About}></Route>
    </div>
  );
}
```

5.3.0 버전은 하라의 Route에 여러 path를 배열형태로 부여할 수 있다.

# URL 파라미터, URL 쿼리

## URL 파라미터

가짜 프로필을 data로 가지고있는 Profile.js를 생성한다.

```jsx
import React from "react";

const data = {
  lightbig: {
    name: "강명환",
    description: "삽질천재",
  },
  velopert: {
    name: "김민준",
    description: "리액트 개발자",
  },
};

const Profile = ({ match }) => {
  console.log(match);
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자</div>;
  }
  return (
    <div>
      <h3>
        {username} : ({profile.name})
      </h3>
      <div>{profile.description}</div>
    </div>
  );
};

export default Profile;
```

이에따라 사용자가 `/profile/~` 이렇게 접속하면 Profile 컴포넌트의 `match`데이터에서 파라미터로 사용할 수 있게 수정한다.

```jsx
function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
        <li>
          <Link to="/profile/lightbig">lightbig 프로필</Link>
        </li>
      </ul>

      <hr />
      <Route exact path="/" component={Home}></Route>
      <Route path={["/info", "/about"]} component={About}></Route>
      <Route path="/profile/:username" component={Profile}></Route>
    </div>
  );
}
```

`match`데이터가 궁금했는데,

```json
{
  "path": "/profile/:username",
  "url": "/profile/lightbig",
  "isExact": true,
  "params": { "username": "lightbig" }
}
```

이런 데이터를 가지고 있다.

match는 현재 브라우저가 서버에 어떤 요청을 보내고 있는지에 대한 정보를 컴포넌트에게 보내준다.

## URL 쿼리

URL 쿼리도 URL 파라미터와 비슷하다.  
쿼리는 location 객체에서 받아올 수 있다.

```json
{
  "pathname": "/profile/lightbig",
  "search": "",
  "hash": "",
  "state": undefined,
  "key": "fab7w7"
}
```

location 객체는 이런 형태로 이루어져 있는데, URL 쿼리를 읽어오기 위해선 `search`의 값을 확인해야한다.  
문자열 형태로 이루어져 있으므로 이 문자열을 객체형태로 바꾸자.

```jsx
import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const ShowDetail = query.detail === "true";
  return (
    <div>
      <h3>소개글입니다.</h3>
      <p>아이고</p>
      {ShowDetail && <p>detail 값이 true입니다.</p>}
    </div>
  );
};
export default About;
```

객체형태로 변환하기 위해선 qs라는 라이브러리를 사용한다.

search의 값이 `문자열`이기때문에 true나 false같은 값도 'true' 'false'처럼 문자열의 형태를 띈다.  
숫자도 문자열 형태이므로 이를 `parseInt`로 변환하거나 `=== 'true'`처럼 확인해야한다.

# 서브라우트

라우트 내부에 다시 라우트를 정의하는 것을 의미한다.  
여긴 profile들을 profiles라는 라우터에서 정의할 수 있게 `중첩경로`를 만든다.

```jsx
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
);

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route path={match.url + "/carnitas"} component={Carnitas} />
  </div>
);
```

reactrouter 공식홈페이지에선 중첩 Routes를 match 객체를 받아와서 작성하라고 한다.  
이렇게 경로를 작성하면 `상대경로`로 작성할 수 있다.

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./router/About";
import Home from "./router/Home";
import Profiles from "./router/Profiles";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필보기</Link>
        </li>
      </ul>

      <hr />
      <Route exact path="/" component={Home}></Route>
      <Route path={["/info", "/about"]} component={About}></Route>
      <Route path="/profiles" component={Profiles}></Route>
    </div>
  );
}

export default App;
```

최상위 컴포넌트 App에서 `/profiles`컴포넌트로 연결하는 `Link`와 `Route`를 다시 정의한다.

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import Profile from "../components/Profile";

const Profiles = ({ match }) => {
  return (
    <div>
      <h3>사용자목록:</h3>

      <ul>
        <li>
          <Link to={match.url + "/velopert"}>velopert 프로필</Link>
        </li>
        <li>
          <Link to={match.url + "/lightbig"}>lightbig 프로필</Link>
        </li>
      </ul>

      <Route
        exact
        path="/profiles"
        render={() => <div>사용자를 선택하세요</div>}
      ></Route>
      <Route path={match.url + "/:username"} component={Profile}></Route>
    </div>
  );
};
export default Profiles;
```

Profiles 컴포넌트는 URL이 `/profiles`로 요청하면 렌더링된다.  
따라서 match 객체의 url 키값이 `/profiles`를 가지게 된다.

# 리액트라우터의 부가기능

라우트로 사용된 컴포넌트는 match객체 말고도 `history, location`과 props를 전달받는다.
이중에서 `history`객체는 컴포넌트에서 구현하는 메서드에서 라우터 API를 호출할 수 있다.  
[history객체 참고](https://developer.mozilla.org/ko/docs/Web/API/Window/history)

로그인 후 화면을 전환하거나, 다른페이지로 이탈하는 것을 방지해야할 때 history를 활용한다.

## history 객체 활용

클래스형 컴포넌트에서 활용

```jsx
import React, { Component } from "react";

class HistorySample extends Component {
  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleGoHome = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    this.unblock = this.props.history.block("나가시겠습니까");
  }

  componentWillUnmount() {
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>뒤로가기</button>
        <button onClick={this.handleGoHome}>홈페이지</button>
      </div>
    );
  }
}

export default HistorySample;
```

함수형 컴포넌트에서 활용

```jsx
import React, { useEffect } from "react";

const Historyfnc = ({ history }) => {
  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoHome = () => {
    history.push("/");
  };

  useEffect(() => {
    const unblock = history.block("떠나시겠습니까");
    return () => unblock();
  }, [history]);

  return (
    <div>
      <button onClick={handleGoBack}>뒤로가기</button>
      <button onClick={handleGoHome}>홈으로</button>
    </div>
  );
};

export default Historyfnc;
```

## withRouter

withRouter 함수는 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 사용할 수 있게 한다.

```jsx
import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        row={7}
        readOnly={true}
        value={JSON.stringify(location, null, 2)}
      ></textarea>
      <h4>match</h4>
      <textarea
        row={7}
        readOnly={true}
        value={JSON.stringify(match, null, 2)}
      ></textarea>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        홈으로
      </button>
    </div>
  );
};
export default withRouter(WithRouterSample);
```

이걸 Profiles 컴포넌트에서 렌더링하면 match객체의 params 값이 비어있는 것을 볼 수 있다.

```jsx
    <Route
    exact
    path="/profiles"
    render={() => <div>사용자를 선택하세요</div>}
    ></Route>
    <Route path={match.url + "/:username"} component={Profile}></Route>
    <WithRouterSample />
```

<img width="500" alt="스크린샷 2021-12-16 오전 11 41 40" src="https://user-images.githubusercontent.com/76278794/146298213-688b6987-06bb-4cfa-a487-5b291573defb.png">

그 이유는 현재 `WithRouterSample`컴포넌트가 `Route`설정이 되어있지 않기 때문이다.

`WithRouterSample`컴포넌트는 `Profiles`컴포넌트에서 렌더링된다.  
`App`컴포넌트에서 사용자가 `Link to="/profiles"`를 누르면, 리액트는 설정해둔 Route대로 `<Route path="/profiles" component={Profiles}></Route>` `Profiles`컴포넌트가 렌더링된다.

Route 설정에서 아무런 URL 파라미터를 설정하지 않갔기때문에 params 값이 비어있는 것이다.

<br>

`WithRouterSample`을 URL 파라미터가 설정된 Profile 컴포넌트로 이동하면?  
<img width="495" alt="스크린샷 2021-12-16 오전 11 48 26" src="https://user-images.githubusercontent.com/76278794/146298933-788c0fe4-07a5-4582-ae0f-8737ed21cb84.png">

params 값을 받아오는 것을 볼 수 있다.

## Switch

Switch는 여러 Route를 감싸고 그 중 일치하는 단 하나의 Route만을 렌더링해준다.

(react-router-dom 공식문서)[https://v5.reactrouter.com/core/api/Switch/location-object]

```jsx
import { Route } from "react-router";

let routes = (
  <div>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/:user">
      <User />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </div>
);
```

위 코드에서 사용자가 /about 경로에 있다면, `<About />, <User />, <NoMatch />` 컴포넌트 모두 렌더링 할 것이다.  
Route가 이렇게 동작하는 이유는 다른 Route에 있더라도 공통적으로 렌더링해야하는 sidebar, breadcrumbs같은 컴포넌트들을 렌더링하기 위해서라고 한다.

그런데 우리가 만약 단 하나의 컴포넌트만 렌더링하고 싶다면? 이럴때 사용하는게 Switch이다.

```jsx
import { Route, Switch } from "react-router";

let routes = (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/:user">
      <User />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </Switch>
);
```

Switch는 현재 URL이 보내는 path와 완전히 동일한 단 하나의 컴포넌트만 렌더링한다.  
Switch는 위에서부터 하나씩 차례대로 내려오면서 path와 브라우저의 URL을 비교한다.  
일치하면, 일치한 Route를 렌더링하게된다.

이를 토대로 Not found 404 page를 만들어보자.

Switch는 감싸고 있는 Route를 위에서부터 차례대로 내려오는데, Not found 페이지를 구현하기 위해서  
마지막 순서의 Route에 모든 경로가 매치되도록한다.

```jsx
<Switch>
  <Route exact path="/" component={Home}></Route>
  <Route path={["/info", "/about"]} component={About}></Route>
  <Route path="/profiles" component={Profiles}></Route>
  <Route path="/history" component={HistorySample}></Route>
  <Route path="/historyfnc" component={Historyfnc}></Route>
  <Route
    render={({ location }) => (
      <div>
        <h2>이 페이지는 존재하지 않습니다.</h2>
        <p>{location.pathname}</p>
      </div>
    )}
  ></Route>
</Switch>
```

## NavLink

NavLink는 Link과 기능이 동일한데, 링크가 활성화되었을때(사용자가 링크에 접속했을때!)  
특정 스타일이나 CSS 스타일을 적용할 수 있는 컴포넌트이다.

profiles 수정

```jsx
...
const activeStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <h3>사용자목록:</h3>

      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to={match.url + "/velopert"}>
            velopert 프로필
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to={match.url + "/lightbig"}>
            lightbig 프로필
          </NavLink>
        </li>
      </ul>
```

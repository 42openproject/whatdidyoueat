import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LoginPageView/LoginPage';
import SetNicknamePage from './LoginPageView/SetNicknamePage';
import MainPage from './MainPageView/MainPage';
import SearchPage from './SearchPageView/SearchPage';
import ProfilePage from './ProfilePageView/ProfilePage';
import PostPage from './PostPageView/PostPage';
import AchievePage from './AchievePageView/AchievePage';
import UserPage from './MainPageView/UserPage';
import CallbackKakao from './LoginPageView/CallbackKakao';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
        <Route path="/nickname" component={SetNicknamePage} />
        <Route path="/main" component={MainPage} />
        <Route path="/user/:nickname" component={UserPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/post" component={PostPage} />
        <Route path="/achievement" component={AchievePage} />
        <Route path="/callback/kakao" component={CallbackKakao} />
      </BrowserRouter>
    </div>
  );
}

export default App;

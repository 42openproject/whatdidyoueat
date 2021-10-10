import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LoginPageView/LoginPage';
import SetNicknamePage from './LoginPageView/SetNicknamePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/nickname" component={SetNicknamePage} />
      </BrowserRouter>
    </div>
  );
}

export default App;

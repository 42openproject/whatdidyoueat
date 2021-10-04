import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LoginPageView/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;

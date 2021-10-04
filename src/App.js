import LoginPage from "./LoginPageView/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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

import React from 'react';
import './App.css';
import './css/Font.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import mainPage from './pages/mainPage'
import loginPage from './pages/loginPage'
import signUpPage from './pages/signUpPage'
import SearchPage from './pages/searchPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={mainPage} />
          <Route exact={true} path="/login" component={loginPage} />
          <Route exact={true} path="/signUp" component={signUpPage} />
          <Route exact={true} path="/search" component={SearchPage} />
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

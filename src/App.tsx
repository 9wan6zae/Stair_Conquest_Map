import React from 'react';
import './App.css';
import './css/Font.css'
import './css/Color.css'
import './css/buttons.css'
import './css/registerModal.css'
import './css/accessibility.css'
import './css/Layouts.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import mainPage from './pages/mainPage'
import loginPage from './pages/loginPage'
import signUpPage from './pages/signUpPage'
import SearchPage from './pages/searchPage';
import RegisterCompletePage from './pages/registerCompletePage';
import AccessibilityPage from './pages/accessibilityPage';

function App() {
  return (
    <div id="App__wrapper">
      <section id="App_bg" />
      <main id="App_content">
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={mainPage} />
            <Route exact={true} path="/login" component={loginPage} />
            <Route exact={true} path="/signUp" component={signUpPage} />
            <Route exact={true} path="/search" component={SearchPage} />
            <Route exact={true} path="/register_complete" component={RegisterCompletePage} />
            <Route exact={true} path="/accessibility" component={AccessibilityPage} />
            {/* Not Found */}
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
        {/* <div style={{height: '100px'}} /> */}
      </main>
      
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import './css/Font.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppHeader from './components/appHeader';
import mainPage from './pages/mainPage'

function App() {
  return (
    <>
    <AppHeader></AppHeader>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={mainPage} />
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

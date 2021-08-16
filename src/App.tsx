import React from 'react';
import './App.css';
import './css/Font.css'
import './css/Color.css'
import './css/buttons.css'
import './css/registerModal.css'
import './css/Layouts.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import mainPage from './pages/mainPage'
import loginPage from './pages/loginPage'
import signUpPage from './pages/signUpPage'
import SearchPage from './pages/searchPage';

import styled, {css} from 'styled-components';

type SideProps = {
  width: string
  left: boolean
}

const Side = styled.aside<SideProps>`
  position: fixed;
  top: 0;
  width: ${props => props.width};
  height: ${window.innerHeight}px;
  background: rgb(242, 242, 245);
  z-index: 6;

  ${props => props.left && css `
    left: 0
  `}
  ${props => !props.left && css `
    right: 0
  `}
`

function App() {

  const [sideOption, setSideOption] = React.useState<SideProps>(
    {
      width: '',
      left: true
    }
  )

  const setSideWidth = () => {
    const width = window.innerWidth > 450 ? `${(window.innerWidth - 450) / 2}px` : `0px`
    setSideOption({...sideOption,  width })
  }

  React.useEffect(() => {
    setSideWidth()
    window.addEventListener('resize', () => {
      setSideWidth()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App__wrapper">
      <Side left={true} width={sideOption.width} />
      <main className="App_content">
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
      </main>
      <Side left={false} width={sideOption.width} />
    </div>
  );
}

export default App;

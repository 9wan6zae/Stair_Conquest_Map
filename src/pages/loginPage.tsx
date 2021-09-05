import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBox from '../components/inputBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginUserThunk } from '../modules/login';
import styled, {css} from 'styled-components';

import LoginLayout from '../components/LoginLayout';
import { LoginParams } from '../types/Sign';

const InputSection = styled.section`
  margin-bottom: 16px;
`

type LoginBtnProps = {
  active: boolean
}

const LoginBtn = styled.button<LoginBtnProps>`
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  border: none;
  border-radius: 20px;
  background: var(--primary);
  opacity: 0.3;

  color: #fff;
  font-weight: 700;
  font-size: 18px;

  ${props => props.active && css`
      opacity: 1
    `
  }
`

const SignUpLinkBtn = styled.button`
  min-width: 100%;
  min-height: 56px;
  max-height: 56px;
  background: #fff;
  border: 2px solid var(--primary);
  border-radius: 20px;
  color: var(--primary);
  font-weight: 700;
  font-size: 18px;
`

const LoginFooter = styled.footer`
  padding: 0 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--maxWidth);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .footer__title {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 100%;
    margin-bottom: 20px;
  }
`

const LoginLink = styled(Link)`
  width: 100%;;
`

export default function LoginPage() {

  const loginError = useSelector((state: RootState) => state.login.loginError);
  const loginSuccess = useSelector((state: RootState) => state.login.loginSuccess);
  const dispatch = useDispatch();
  const [alert, setAlert] = React.useState('')

  const [account, setAccount] = useState<LoginParams>({
    nickname: '',
    password: ''
  });
  
  const {nickname, password} = account

  React.useEffect(() => {
    if (loginError) {
      setAlert('아이디 혹은 비밀번호를 다시 한 번 확인해주세요.')
      setTimeout(() => {
        setAlert('')
      }, 3000)
    }
  }, [loginError])

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
  }

  const clearInfo = (name: string) => {
    setAccount({
      ...account,
      [name]: ''
    });
  }

  const login = () => {
    if (nickname !== '' && password !== '')
      dispatch(loginUserThunk(nickname, password))
  }

  const checkBtnActive = (nickname: string, password: string) => {
    return nickname !== '' && password !== ''
  }

  const logout = () => {
    window.localStorage.removeItem("access_token")
    window.location.href = '/'
  }

  return (
    <>
      {!loginSuccess && <LoginLayout
        title="로그인"
        description = "로그인하고 지도를 채워주세요"
        content = {
          <>
            <InputSection>
              <InputBox placeholder="닉네임" type="text" name="nickname" value={nickname} onChange={onChange} clearInfo={clearInfo}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="비밀번호" type="password" name="password" value={password} onChange={onChange} clearInfo={clearInfo}/>
            </InputSection>
            <LoginBtn active={checkBtnActive(nickname, password)} onClick={() => login()}>로그인</LoginBtn>
            <p style={{marginTop: '16px', fontSize: '14px', color: '#DB0B24', textAlign: 'center'}}>{alert}</p>
          </>
        }
        footer = {
          <LoginFooter>
            <p className="footer__title">회원이 아니신가요?</p>
            <LoginLink to="/signUp"><SignUpLinkBtn>3초 만에 회원가입</SignUpLinkBtn></LoginLink>
          </LoginFooter>
        }
      ></LoginLayout>}
      {loginSuccess && <LoginLayout
        title="로그아웃"
        description = "로그아웃 하시겠습니까?"
        content = {
          <LoginBtn active={true} onClick={() => logout()}>로그아웃</LoginBtn>
        }
      ></LoginLayout>}
    </>
  )
}
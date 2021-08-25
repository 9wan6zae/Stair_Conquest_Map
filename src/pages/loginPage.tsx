import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/appHeader';
import InputBox from '../components/inputBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginUserThunk, loginUserAsync } from '../modules/login';
import styled, {css} from 'styled-components';

const MainBlock = styled.main`
  position: relative;
  width: 100%;
  max-width: var(--maxWidth);
  padding: 0 20px;
  box-sizing: border-box;

  .login__title_section {
    margin-top: 36px;
    margin-bottom: 32px;
    text-align: center;
  }

  .login__title {
    margin-bottom: 12px;
  }

  .login__input-box {
    margin-bottom: 16px;
  }
`

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

export default function LoginPage() {

  const loginSuccess = useSelector((state: RootState) => state.login.loginSuccess);
  const dispatch = useDispatch();
  const {success} = loginUserAsync

  const [account, setAccount] = useState({
    nickname: '',
    password: ''
  });
  
  const {nickname, password} = account

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

  return (
    <>
      <AppHeader title="로그인"></AppHeader>
      <div style={{overflow: 'auto'}}>
        <MainBlock>
          <section className="login__title_section">
            <p className="title4 login__title">계단정복지도</p>
            <p className="description">로그인하고 지도를 채워주세요</p>
          </section>
          <InputSection>
            <InputBox placeholder="닉네임" type="text" name="nickname" value={nickname} onChange={onChange} clearInfo={clearInfo}/>
          </InputSection>
          <InputSection>
            <InputBox placeholder="비밀번호" type="password" name="password" value={password} onChange={onChange} clearInfo={clearInfo}/>
          </InputSection>
          <LoginBtn active={checkBtnActive(nickname, password)} onClick={() => login()}>로그인</LoginBtn>
          <Link to="/signUp">회원가입</Link>
        </MainBlock>
      </div>
    </>
  )
}
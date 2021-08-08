import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/appHeader';
import InputBox from '../components/inputBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginUserThunk, loginUserAsync } from '../modules/login';

export default function SignUpPage() {

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


  return (
    <>
      <AppHeader title="회원가입"></AppHeader>
      <div style={{overflow: 'auto'}}>
        <main style={{marginTop: '56px'}}>
          <InputBox placeholder="아이디" type="text" name="nickname" value={nickname} onChange={onChange} clearInfo={clearInfo}/>
          <InputBox placeholder="비밀번호" type="password" name="password" value={password} onChange={onChange} clearInfo={clearInfo}/>
        </main>
        <button onClick={() => login()}>회원가입</button>
      </div>
    </>
  )
}
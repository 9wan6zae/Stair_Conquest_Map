import * as React from 'react';
import { useState } from 'react';
import InputBox from '../components/inputBox';
import styled, {css} from 'styled-components';

import LoginLayout from '../components/LoginLayout';
import { SignUpParams } from '../types/Sign';
import * as LoginAPI from "../api/login"

const InputSection = styled.section`
  margin-bottom: 16px;
`

type LoginBtnProps = {
  active: boolean
}

const SignUpBtn = styled.button<LoginBtnProps>`
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

export default function SignUpPage() {
  const [signUpParams, setSignUpParams] = useState<SignUpParams>({
    nickname: '',
    password: '',
    instagramId: undefined,
  });

  const [temp, setTemp] = useState({
    temp_instagramId: '',
    temp_password: ''
  })
  
  const {nickname, password} = signUpParams

  const {temp_instagramId, temp_password} = temp

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpParams({
      ...signUpParams,
      [name]: value
    });
  }

  const clearInfo = (name: string) => {
    setSignUpParams({
      ...signUpParams,
      [name]: ''
    });
  }

  const onChange_temp = (e: any) => {
    const { name, value } = e.target;
    setTemp({
      ...temp,
      [name]: value
    });
  }

  const clearInfo_temp = (name: string) => {
    setTemp({
      ...temp,
      [name]: ''
    });
  }

  const signUp = async () => {
    if (nickname !== '' && password !== '')
      if (temp_instagramId) signUpParams.instagramId = {value: temp_instagramId}
      const res = await LoginAPI.signUp(signUpParams)
      if (res.status === 200) {
        alert("회원가입을 완료했어요\n우리 동네의 계단을 모두 정복해 보세요!")
        document.location.href="/login"
      }
  }

  const checkBtnActive = (nickname: string, password: string, temp_password: string) => {
    return nickname !== '' && password !== '' && password === temp_password
  }

  const notMatchPwd = (password: string, temp_password: string) => {
    const is_fill = password !== '' && temp_password !== ''
    const is_not_same = password !== temp_password

    return is_fill && is_not_same
  }

  return (
    <>
      <LoginLayout
        title="회원가입"
        description = "내 이름으로 지도를 채워 보세요!"
        content = {
          <>
            <InputSection>
              <InputBox placeholder="닉네임" type="text" name="nickname" value={nickname} onChange={onChange} clearInfo={clearInfo}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="인스타그램 계정 (선택)" type="text" name="temp_instagramId" value={temp_instagramId} onChange={onChange_temp} clearInfo={clearInfo_temp}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="비밀번호" type="password" name="password" value={password} onChange={onChange} clearInfo={clearInfo}/>
            </InputSection>
            <InputSection>
              <InputBox placeholder="비밀번호 확인" type="password" name="temp_password" value={temp_password} onChange={onChange_temp} clearInfo={clearInfo_temp}/>
            </InputSection>
            <SignUpBtn active={checkBtnActive(nickname, password, temp_password)} onClick={() => signUp()}>회원가입 완료</SignUpBtn>
            { notMatchPwd(password, temp_password) && <p style={{marginTop: '16px', fontSize: '14px', color: '#DB0B24', textAlign: 'center'}}>입력한 두 비밀번호가 불일치해요. 다시 입력해 보세요.</p>}
          </>
        }
      ></LoginLayout>
    </>
  )
}
import * as React from 'react';
import { useState } from 'react';
import InputBox from '../components/inputBox';
import styled, {css} from 'styled-components';

import Modal from '../components/modal';
import AppHeader from '../components/appHeader';
import { MainBlock } from '../components/LoginLayout';
import { UpdateUserInfoParams } from '../types/MyPage';

import * as MyPageAPI from '../api/myPage'

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

export default function SignUpPage({location}: {location: any}) {
  const [updateParams, setUpdateParams] = useState<UpdateUserInfoParams>({
    nickname: '',
    instagramId: undefined
  });

  const [temp_instagramId, setTempInstagrmId] = React.useState('')

  const [open, setOpen] = React.useState(false)
  
  const {nickname} = updateParams

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUpdateParams({
      ...updateParams,
      [name]: value
    });
  }

  const clearInfo = (name: string) => {
    setUpdateParams({
      ...updateParams,
      [name]: ''
    });
  }

  const onChange_temp = (e: any) => {
    const { value } = e.target;
    setTempInstagrmId(value);
  }

  const clearInfo_temp = () => {
    setTempInstagrmId('');
  }

  React.useEffect(() => {
    if(location && location.state.user) {
      if (location.state.user.instagramId)
        setTempInstagrmId(location.state.user.instagramId.value)
      setUpdateParams({...updateParams, nickname: location.state.user.nickname})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const updateProfile = async () => {
    if (nickname !== '') {
      if (temp_instagramId) {
        let instagramId = temp_instagramId
        if(temp_instagramId[0] === '@') instagramId = temp_instagramId.substring(1)
        updateParams.instagramId = {value: instagramId}
      }
      console.log(updateParams)
      const res = await MyPageAPI.updateProfile(updateParams)
      console.log(res.data)
      if (res.status === 200) {
        setOpen(true)
      }
    }
  }

  const modalAction = () => {
    setOpen(false)
    window.history.pushState('', '', '/myPage')
    window.history.go()
  }

  return (
    <>
      <AppHeader title="프로필 편집" />
      <MainBlock style={{marginTop: '52px'}}>
        <InputSection>
          <InputBox placeholder="닉네임" type="text" name="nickname" value={nickname} onChange={onChange} clearInfo={clearInfo}/>
        </InputSection>
        <InputSection>
          <InputBox placeholder="인스타그램 계정 (선택)" type="text" name="temp_instagramId" value={temp_instagramId} onChange={onChange_temp} clearInfo={clearInfo_temp}/>
        </InputSection>
        <SignUpBtn active onClick={() => updateProfile()}>완료</SignUpBtn>
      </MainBlock>
      {open && <Modal title="✅ 프로필을 변경했어요" description="우리 동네의 계단을 모두 정복해 보세요!" setOpen={setOpen} open={open} action={modalAction} />}
    </>
  )
}
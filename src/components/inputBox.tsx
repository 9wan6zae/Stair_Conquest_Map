import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as ClearBtn} from './svg/clearBtn.svg'

const InputBlock = styled.input`
  width: 100%;
  max-width: var(--maxWidth);
  box-sizing: border-box;
  height: 56px;
  background: #F2F2F5;
  border-radius: 20px;

  display: flex;
  align-items: center;
  padding: 0 24px;

  color: #000;
  font-size: 18px;
  font-weight: 500;

  border: none;
  outline: none;

  &:focus {
    border: 2px solid #D0D0D9;
  }

  &::placeholder {
    color: #9797A6;
  }
`

type InputBoxProps = {
  placeholder: string,
  type: string,
  name: string,
  value: string,
  onChange(e: any): void | null
  clearInfo(name: string): void | null
  onKeyAction(): void
}

InputBox.defaultProps = {
  onKeyAction() {}
}

export default function InputBox({placeholder, type, name, value, onChange, clearInfo, onKeyAction}: InputBoxProps) {

  const onKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      onKeyAction()
    }
  }

  return (
    <div style={{position: 'relative'}}>
      <InputBlock type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      { value.length > 0 && (<ClearBtn onClick={() => clearInfo(name)} style={{position: 'absolute', right: '20px', top: '16px'}}/>)}
    </div>
  )
}
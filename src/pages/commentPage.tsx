import * as React from 'react';
import {Link} from 'react-router-dom'
import AppHeader from '../components/appHeader';
import styled from 'styled-components';
import CommentTextArea from '../components/commentTextArea';
import {RegisterModalBtn} from '../components/registerModal'

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import { RegisterBuildingAccessibilityCommentParams, RegisterPlaceAccessibilityCommentParams } from '../types/Comment';
import * as commentAPI from '../api/comment';

import { place_placeholder, building_placeholder } from '../ts/placeholders';

const CommentPageBlock = styled.main`
  margin-top: 108px;
  padding: 0 20px;
  box-sizing: border-box;

  section.comment-page-block__top {
    margin-bottom: 24px;
  }

  & > footer {
    margin-top: 24px;
  }
`

export default function CommentPage({match}: any) {
  const item = useSelector((state: RootState) => state.item.item);
  const [comment, setComment] = React.useState('')

  const onChange = (e: any) => {
    const { value } = e.target;
    setComment(value);
  }

  const checkFillInfo = (comment: string) => {
    return comment.length > 0;
  }

  const registerComment = async (comment: string) => {
    const type = match.params.type

    if (item && comment) {   
      const id = type === "building" ? item.building.id : item.place.id
      if (type === "building") {
        const params: RegisterBuildingAccessibilityCommentParams = {
          buildingId: id,
          comment: comment
        }
        await commentAPI.registerBuildingAccessibilityComment(params)
      } else {
        const params: RegisterPlaceAccessibilityCommentParams = {
          placeId: id,
          comment: comment
        }
        await commentAPI.registerPlaceAccessibilityComment(params)
      }
      document.getElementById("link")?.click()
    }
  }

  const setPlaceHolder = () => {
    const type = match.params.type
    const placeholder = type === "place"
      ? place_placeholder
      : building_placeholder
    return placeholder
  }


  return (
    <>
      <AppHeader title={"의견"}></AppHeader>
      <CommentPageBlock>
        <section className="comment-page-block__top">
          <p className="title3">의견추가</p>
          <p className="description" style={{fontSize: '16px', marginTop: '12px'}}>더 도움이 될 정보가 있다면 설명해주세요!</p>
        </section>
        <CommentTextArea comment={comment} onChange={onChange} placeholder={setPlaceHolder()}/>
        <footer>
          <Link id="link" to="/accessibility" style={{pointerEvents: checkFillInfo(comment) ? 'auto' : 'none'}} />
          <RegisterModalBtn active={checkFillInfo(comment)} onClick={() => registerComment(comment)}>등록하기</RegisterModalBtn>
        </footer>
      </CommentPageBlock>
    </>
  )
}
import React from 'react';
import styled from '@emotion/styled';
import Logo from '../asset/main-logo.png';
import LoadingGif from '../asset/loading.gif';

function Loading() {
  return (
    <LoadingContainer>
      <ImgWrap>
        <img src={Logo} alt="logo" />
        <img src={LoadingGif} alt="loading" />
      </ImgWrap>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgWrap = styled.div`
  width: 30vw;
  height: auto;
  & img {
    opacity: 0.5;
    user-select: none;
  }
  & img:first-of-type {
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-bottom: 10px;
  }
  & img:last-of-type {
    display: block;
    width: 30%;
    margin: 0 auto;
  }
`;

export default Loading;

import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
// import KakaoLogin from 'react-kakao-login';
import {
  GOOGLE_CLIENT_ID,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
} from '../config';
import '../stylesheets/LoginPage.css';
import '../stylesheets/reset.css';
import LogoImg from '../asset/logo.svg';
// import KakaoLogo from '../asset/kakao_logo.png';

function Home({ history }) {
  const KakaoRequestUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const onSuccessGoogle = res => {
    localStorage.setItem('googleId', res.googleId);
    localStorage.setItem('email', res.profileObj.email);
    const googleId = localStorage.getItem('googleId');
    const email = localStorage.getItem('email');
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login/google`, {
          googleId,
          email,
        })
        .then(response => {
          if (response.data.success) {
            if (response.data.data.isSigned) history.push('/main');
            else history.push('/nickname');
          } else alert('로그인 실패');
          console.log(response);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const onFailureGoogle = () => {
    console.log('failure');
  };
  // const onSuccessKakao = e => {
  //   console.log(e);
  //   console.log('success');
  //   // let kakaoid = e.profile.id;
  //   history.push('/nickname');
  // };

  return (
    <>
      <div className="container">
        <div className="container__logo">
          <img src={LogoImg} alt="뭐먹었니" width="100%" height="auto" />
        </div>
        <div className="container__login box--white">
          <GoogleLogin
            className="btn__google"
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={onSuccessGoogle}
            onFailure={onFailureGoogle}
            buttonText="Google로 로그인하기"
          />
          <a href={KakaoRequestUrl}>카카오로그인</a>
        </div>
      </div>
    </>
  );
}

export default Home;

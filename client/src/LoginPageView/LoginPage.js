import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import GoogleLogin from 'react-google-login';
// import KakaoLogin from 'react-kakao-login';
import Loading from './Loading';
import MainPage from '../MainPageView/MainPage';
import { GOOGLE_CLIENT_ID } from '../config';
import '../stylesheets/LoginPage.css';
import '../stylesheets/reset.css';
import '../stylesheets/Header.css';
import '../stylesheets/NaviBar.css';
import '../stylesheets/MainPage.css';
import Logo from '../asset/main-logo.png';
// import KakaoLogo from '../asset/kakao_logo.png';

// const onOauthSuccess = ({ history, googleId, email }) => {
//   console.log(googleId);
//   axios
//     .post(`${process.env.REACT_APP_API_URL}/login/google`, {
//       googleId,
//       email,
//     })
//     .then(res => {
//       console.log(res);
//     });
//   history.push('/nickname');
// };

function Home({ history }) {
  const [isLogin, setIsLogin] = useState('loading');

  useEffect(() => {
    if (localStorage.getItem('googleId')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

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
  if (isLogin === 'loading') {
    return <Loading />;
  }
  if (isLogin === true) {
    // 로그인 상태인지 확인하는 요청 추가해야함
    return (
      <>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            position: 'absolute',
            top: '20px',
            cursor: 'pointer',
            border: '1px solid red',
          }}
        >
          로그인 페이지로
        </button>
        <MainPage />
      </>
    );
  }
  return (
    <>
      <div className="container">
        <div className="container__logo">
          <img src={Logo} alt="뭐먹었니" width="100%" height="auto" />
        </div>
        {/* <div className="container__login box--white"> */}
        <LoginBox>
          <GoogleLogin
            className="btn__google"
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={onSuccessGoogle}
            onFailure={onFailureGoogle}
            buttonText="Google로 로그인하기"
          />
          {/* <button className="btn">
            <KakaoLogin
              token={KAKAO.CLIENT_ID}
              render={renderProps => (
                <div
                  className="btn__kakao"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img src={KakaoLogo} width="20px" height="20px" />
                  <span>카카오로 로그인하기</span>
                </div>
              )}
              onSuccess={e => onSuccessKakao(e)}
              // onFail={console.log('fail')}
            />
          </button> */}
          {/* </div> */}
        </LoginBox>
      </div>
    </>
  );
}

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  min-width: 250px;
  background-color: white;
  border-radius: 20px;
  padding: 5px;
  height: 150px;
  max-width: 500px;
`;

export default Home;

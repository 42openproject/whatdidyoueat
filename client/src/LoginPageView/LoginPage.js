import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
// import KakaoLogin from 'react-kakao-login';
import { GOOGLE_CLIENT_ID } from '../config';
import '../stylesheets/LoginPage.css';
import '../stylesheets/reset.css';
import LogoImg from '../asset/logo.svg';
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
        </div>
      </div>
    </>
  );
}

export default Home;

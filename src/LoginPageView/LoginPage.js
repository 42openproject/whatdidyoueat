import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import { GOOGLE_CLIENT_ID, KAKAO } from '../config';
import '../stylesheets/LoginPage.css';
import '../stylesheets/reset.css';
import LogoImg from '../asset/logo.svg';
import KakaoLogo from '../asset/kakao_logo.png';

function Home({ history }) {
  const onSuccessGoogle = res => {
    console.log(res.tokenObj, res.googleId);
    console.dir(res.tokenObj);
    console.log('success');
    history.push('/nickname');
  };
  const onFailureGoogle = () => {
    console.log('failure');
  };
  const onSuccessKakao = e => {
    console.log(e);
    console.log('success');
    // let kakaoid = e.profile.id;
    history.push('/nickname');
  };

  return (
    <>
      <div className="container">
        <div className="container__logo">
          <img src={LogoImg} alt="뭐먹었니" width="100%" height="auto" />
        </div>
        <div className="container__login box--white">
          <button className="btn">
            <GoogleLogin
              className="btn__google"
              clientId={GOOGLE_CLIENT_ID}
              onSuccess={onSuccessGoogle}
              onFailure={onFailureGoogle}
              buttonText="Google로 로그인하기"
            />
          </button>
          <button className="btn">
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
              onFail={console.log('fail')}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

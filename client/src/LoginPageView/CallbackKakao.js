import axios from 'axios';
import { useEffect } from 'react';

function CallbackKakao({ history }) {
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/login/kakao?code=${code}`,
      );
      console.log(res);
      history.push('/nickname');
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <>
      <div>로그인성공</div>
    </>
  );
}

export default CallbackKakao;
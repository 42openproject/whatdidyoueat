import axios from 'axios';
import { useEffect } from 'react';

function CallbackKakao() {
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/login/kakao?code=${code}`,
      );
      console.log(res);
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

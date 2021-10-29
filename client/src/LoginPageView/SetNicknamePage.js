import { useState, useRef } from 'react';
import '../stylesheets/SetNicknamePage.css';
import axios from 'axios';

function SetNicknamePage({ history }) {
  const [nickname, setNickname] = useState('');
  const nickRef = useRef();

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  async function onSaveNick() {
    const nickInput = nickRef.current.value;
    console.log(nickInput);
    if (nickInput === '' || nickInput.length < 2)
      alert('2자 이상 입력해주세요');
    else {
      const googleId = localStorage.getItem('googleId');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        {
          googleId,
          nickInput,
        },
      );

      console.log(response.data);
      history.push('/main');
    }
  }

  return (
    <>
      <div className="container">
        <div className="container__greeting">반갑습니다!</div>
        <div className="container__box box--white">
          <div className="container__box__title">
            <span>사용하실 닉네임을 정해주세요</span>
          </div>
          <input
            className="container__box__input"
            type="text"
            value={nickname}
            onChange={onChangeNickname}
            ref={nickRef}
          ></input>
          <button className="container__box__btn" onClick={onSaveNick}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default SetNicknamePage;

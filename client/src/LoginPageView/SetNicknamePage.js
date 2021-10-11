import '../stylesheets/SetNicknamePage.css';

function SetNicknamePage({ history }) {
  function onSaveNick() {
    const nickInput = document.querySelector('.container__box__input').value;
    console.log(nickInput);
    if (nickInput === '' || nickInput.length < 2)
      alert('2자 이상 입력해주세요');
    else {
      localStorage.setItem('nickname', nickInput);
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
          <input className="container__box__input" type="text"></input>
          <button className="container__box__btn" onClick={onSaveNick}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default SetNicknamePage;

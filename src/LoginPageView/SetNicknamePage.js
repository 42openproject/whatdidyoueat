import '../stylesheets/SetNicknamePage.css';

function SetNicknamePage() {
  return (
    <>
      <div className="container">
        <div className="container__greeting">반갑습니다!</div>
        <div className="container__box box--white">
          <div className="container__box__title">
            <span>사용하실 닉네임을 정해주세요</span>
          </div>
          <input className="container__box__input" type="text"></input>
          <button className="container__box__btn">확인</button>
        </div>
      </div>
    </>
  );
}

export default SetNicknamePage;

import '../stylesheets/SetNicknamePage.css';

// 이 페이지를 링크입력으로 접근할 수 없도록 만들어야함
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

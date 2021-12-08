import { MdPersonAddAlt1 } from 'react-icons/md';

function SearchPost() {
  return (
    <>
      <section className="all-post-box">
        <div className="post-box__title">오늘 올라온 식단들</div>

        <div className="posts">
          <div className="post-box-header">
            <div className="post-box-header__title">제목</div>
            <div className="post-box-header__author">
              <div className="post-box-header__add-btn">
                <MdPersonAddAlt1 />
              </div>
              🥕닉네임
            </div>
          </div>
          <hr size="1" className="post-box-header-hr" />
          <div className="post-box__content">
            <div className="post-box__content__img">image 영역</div>
            <p className="post-box__content__date">날짜</p>
            <p className="post-box__content__text">내용</p>
            <ul className="post-box__content__tags">
              <li className="post-box__tag-item">태그</li>
            </ul>
          </div>
          <hr size="1" className="post-box-hr" />
        </div>

        <div className="posts">
          <div className="post-box-header">
            <div className="post-box-header__title">제목</div>
            <div className="post-box-header__author">
              <div className="post-box-header__add-btn">
                <MdPersonAddAlt1 />
              </div>
              🥕닉네임
            </div>
          </div>
          <hr size="1" className="post-box-header-hr" />
          <div className="post-box__content">
            <div className="post-box__content__img">image 영역</div>
            <p className="post-box__content__date">날짜</p>
            <p className="post-box__content__text">내용</p>
            <ul className="post-box__content__tags">
              <li className="post-box__tag-item">태그</li>
            </ul>
          </div>
          <hr size="1" className="post-box-hr" />
        </div>
      </section>
    </>
  );
}

export default SearchPost;

import { MdPersonAddAlt1 } from 'react-icons/md';

function TodayPostList({
  nick,
  title,
  imgUrl,
  createdAt,
  textContent,
  tagArr,
}) {
  return (
    <>
      <div className="posts">
        <div className="post-box-header">
          <div className="post-box-header__title">{title}</div>
          <div className="post-box-header__author">
            <div className="post-box-header__add-btn">
              <MdPersonAddAlt1 />
            </div>
            🥕{nick}
          </div>
        </div>
        <hr size="1" className="post-box-header-hr" />
        <div className="post-box__content">
          <div className="post-box__content__img">
            <img
              src={imgUrl}
              className="post-box__content__img__img"
              alt="image"
            />
          </div>
          <p className="post-box__content__date">{createdAt}</p>
          <p className="post-box__content__text">{textContent}</p>
          <ul className="post-box__content__tags">
            {tagArr &&
              tagArr.map((tag, idx) => {
                return (
                  <li className="post-box__tag-item" key={idx}>
                    {tag}
                  </li>
                );
              })}
          </ul>
        </div>
        <hr size="1" className="post-box-hr" />
      </div>
    </>
  );
}

export default TodayPostList;

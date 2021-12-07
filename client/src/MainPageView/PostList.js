function PostList({ date, textContent, tagArr }) {
  return (
    <>
      <div className="post-content">
        <div className="post-content__img">image 영역</div>
        <p className="post-content__date">{date}</p>
        <p className="post-content__text">{textContent}</p>
        <ul className="post-content__tags">
          {tagArr &&
            tagArr.split(',').map((tag, idx) => {
              return (
                <li className="tag-item" key={idx}>
                  {tag}
                </li>
              );
            })}
        </ul>
      </div>
      <hr size="1" className="post-hr" />
    </>
  );
}

export default PostList;

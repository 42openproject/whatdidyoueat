function PostList({ date, textContent, tagArr, imageUrl }) {
  return (
    <>
      <div className="post-content">
        <div className="post-content__img">
          <div className="post-content__img__thumbnail">
            <img
              src={imageUrl}
              alt="food-image"
              className="post-content__img__img"
            />
          </div>
        </div>
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

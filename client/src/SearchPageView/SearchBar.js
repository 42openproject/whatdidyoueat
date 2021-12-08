import { BiSearch } from 'react-icons/bi';

function SearchBar() {
  return (
    <>
      <section className="search-box">
        <div className="search-box__icon">
          <BiSearch />
        </div>
        <input
          type="text"
          className="search-box__input"
          placeholder="태그나 사용자명"
        ></input>
        <button className="search-box__btn">검색</button>
      </section>
    </>
  );
}

export default SearchBar;

import Header from '../components/Header';
import NaviBar from '../components/NaviBar';

function SearchPage() {
  return (
    <>
      <Header />
      <div>Search Page</div>
      <section className="search-box">
        <input type="text" className="search-input"></input>
        <button className="search-btn">검색</button>
      </section>
      <section className="all-post-box">
        <div className="post">포스트</div>
      </section>
      <NaviBar />
    </>
  );
}

export default SearchPage;

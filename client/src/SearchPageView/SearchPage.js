import Header from '../components/Header';
import NaviBar from '../components/NaviBar';
import SearchBar from './SearchBar';
import SearchPost from './SearchPost';
import '../stylesheets/SearchPage.css';

function SearchPage() {
  return (
    <>
      <Header />
      <div className="all-search-box">
        <SearchBar />
        <SearchPost />
      </div>
      <NaviBar />
    </>
  );
}

export default SearchPage;

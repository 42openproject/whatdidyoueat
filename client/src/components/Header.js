import { FiHome, FiMenu } from 'react-icons/fi';
import '../stylesheets/Header.css';

function Header() {
  const goHome = () => {
    window.location.href = '/main';
  };
  const toggleMenu = () => {
    console.log('toggle menu');
  };
  return (
    <>
      <header>
        <button className="header-btn icon-btn" onClick={goHome}>
          <FiHome />
        </button>
        <button className="header-btn icon-btn" onClick={toggleMenu}>
          <FiMenu />
        </button>
      </header>
    </>
  );
}

export default Header;

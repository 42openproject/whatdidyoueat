import { Link } from 'react-router-dom';

function MainFollow() {
  return (
    <section className="following-wrap">
      <div className="following-user">
        <Link to="/user/dhyeon">👿dhyeon</Link>
      </div>
      <div className="following-user">
        <Link to="/user/mki">🥕mki</Link>
      </div>
      <div className="following-user">
        <Link to="/user/wopark">👻wopark</Link>
      </div>
    </section>
  );
}

export default MainFollow;

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
      {/*nav links */}
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
    </div>
  );
}

export default NavBar;

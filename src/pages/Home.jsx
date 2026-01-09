import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Book Finder</h1>
      <p>This app helps you search books by title using the Open Library API.</p>

      <Link to="/search">Go to Search</Link>
    </div>
  );
}

export default Home;

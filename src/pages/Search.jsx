import { useState } from "react";
import { Link } from "react-router-dom";

function Search() {
  // state for the input field
  const [query, setQuery] = useState("");

  // state for fetched books
  const [books, setBooks] = useState([]);

  // loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault(); // prevent page reload

    if (!query) return; // do nothing if input is empty

    try {
      setLoading(true);
      setError("");
      setBooks([]);

      // fetch books from Open Library API
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await res.json();
      setBooks(data.docs); // docs is the array of book results
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Search Books</h1>

      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading message */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p className="error">Error: {error}</p>}

      {/* Show results if there are any */}
      {!loading && !error && books.length > 0 && (
        <ul>
          {books.slice(0, 10).map((book) => (
            <li key={book.key}>
              {/* Link to detail page */}
              <Link to={`/book/${book.key.replace("/works/", "")}`}>
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Message if no results */}
      {!loading && !error && books.length === 0 && query && (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Search;

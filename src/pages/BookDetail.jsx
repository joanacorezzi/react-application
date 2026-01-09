import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  // get the workId from the URL (/book/:workId)
  const { workId } = useParams();

  // state for the fetched book
  const [book, setBook] = useState(null);

  // loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        // fetch book details from Open Library API
        const res = await fetch(`https://openlibrary.org/works/${workId}.json`);

        if (!res.ok) {
          throw new Error("Failed to load book details");
        }

        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [workId]); // run again if the URL changes

  return (
    <div>
      <h1>Book Detail</h1>

      {/* link back to search */}
      <Link to="/search">← Back to Search</Link>

      {/* loading state */}
      {loading && <p>Loading book...</p>}

      {/* error state */}
      {error && <p className="error">Error: {error}</p>}

      {/* display data */}
      {!loading && !error && book && (
        <div style={{ marginTop: "12px" }}>
          <h2>{book.title}</h2>

          <p>
            <strong>Description:</strong>{" "}
            {book.description
              ? typeof book.description === "string"
                ? book.description
                : book.description.value
              : "No description available."}
          </p>

          <p>
            <strong>Subjects:</strong>{" "}
            {book.subjects ? book.subjects.slice(0, 5).join(", ") : "None"}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookDetail;

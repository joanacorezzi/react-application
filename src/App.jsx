import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <NavBar />

      {/* simple page layout */}
      <div className="container">
        <div className="card">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/book/:workId" element={<BookDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

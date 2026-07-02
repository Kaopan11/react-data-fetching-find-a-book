import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!searchText) {
      setBooks([]);
      return;
    }

    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchText)}`;

    async function fetchBooks() {
      const response = await axios.get(url);
      setBooks(response.data.docs ?? []);
    }

    fetchBooks();
  }, [searchText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
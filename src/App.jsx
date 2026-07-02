import { useState, useEffect } from "react";
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

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setBooks(data.docs ?? []);
    });
}, [searchText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input 
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <uL>
        {books.map((book) => (
          <li key={book.key}>
            {book.title}
          </li>
        ))}
      </uL>
    </div>


  );
}

export default App;

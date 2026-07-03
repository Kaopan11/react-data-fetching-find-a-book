import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

//สร้าง function สำหรับค้นหาหนังสือ
function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  //สร้าง function สำหรับดึงข้อมูลหนังสือจาก API
  async function getBooks(query) {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`,
    );
    setBooks(response.data.docs);
  }

  //สร้าง function สำหรับดึงข้อมูลหนังสือจาก API
  useEffect(() => {
    getBooks("");
  }, []);

  //สร้าง function สำหรับค้นหาหนังสือ
  function handleSearch() {
    getBooks(search);
  }

  //สร้าง function สำหรับแสดงผลหนังสือ
  return (
    <div className="App">
      <h1>Find a Book</h1>

      <input
        type="text"
        placeholder="Search for a book"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {/* ปุ่มค้นหาหนังสือ */}
      <button onClick={handleSearch}>Search</button>

      <ul>
        {/* แสดงผลหนังสือ */}
        {books.map((book) => {
          return <li key={book.key}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState({});

  useEffect(() => {
    getAll().then((books) => {
      setBooks(
        books.reduce((obj, book) => {
          obj[book.id] = book;
          return obj;
        }, {})
      );
    });
  }, []);

  const changeBookState = (book, shelf) => {
    update(book, shelf).then(() => {
      // edit old book
      const newBooks = { ...books };
      if (books[book.id]) {
        // edit
        if (shelf === "none") {
          // remove old book
          delete newBooks[book.id];
        } else {
          newBooks[book.id].shelf = shelf;
        }
      } else {
        // add
        book.shelf = shelf;
        newBooks[book.id] = book;
      }
      setBooks(newBooks);
    });
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home books={books} changeBookState={changeBookState} />}
          />
          <Route
            path="search"
            element={
              <Search shelvsBooks={books} changeBookState={changeBookState} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

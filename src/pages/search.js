import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { search, update } from "../BooksAPI";
import { Link } from "react-router-dom";

function Search() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText.trim()) {
      setBooks([]);
      return;
    }

    search(searchText, 20).then((books) => {
      if (!books) {
        setBooks([]);
      } else if (books.error) {
      } else {
        setBooks(books);
      }
    });
  }, [searchText]);

  const changeBookState = (book, shelf) => {
    update(book, shelf);
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={index}>
              <BookCard changeBookState={changeBookState} book={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;

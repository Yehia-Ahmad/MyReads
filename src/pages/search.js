import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BookCard from "../components/BookCard";
import { search } from "../BooksAPI";
import { Link } from "react-router-dom";

function Search({ shelvsBooks, changeBookState }) {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText.trim()) {
      setBooks([]);
      return;
    }

    search(searchText, 20).then((books) => {
      if (!books || books.error) {
        setBooks([]);
      } else {
        setBooks(
          books.map((book) => {
            if (shelvsBooks[book.id]) {
              book.shelf = shelvsBooks[book.id].shelf;
            }
            return book;
          })
        );
      }
    });
  }, [searchText, shelvsBooks]);

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
          {books &&
            books.map((book, index) => (
              <li key={index}>
                <BookCard changeBookState={changeBookState} book={book} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
Search.propTypes = {
  shelvsBooks: PropTypes.object.isRequired,
  changeBookState: PropTypes.func.isRequired,
};
export default Search;

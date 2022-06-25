import BookCard from "./BookCard";
import PropTypes from "prop-types";

function BookShelf({ title, shelf, books, changeBookState }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            Object.values(books)
              .filter((book) => book.shelf === shelf)
              .map((book, index) => (
                <li key={index}>
                  <BookCard changeBookState={changeBookState} book={book} />
                </li>
              ))}
        </ol>
      </div>
    </div>
  );
}
BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  changeBookState: PropTypes.func.isRequired,
};
export default BookShelf;

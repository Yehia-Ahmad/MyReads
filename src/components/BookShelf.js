import BookCard from "./BookCard";

function BookShelf({ title, shelf, books, changeBookState }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Object.values(books)
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

export default BookShelf;

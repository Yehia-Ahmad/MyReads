import PropTypes from "prop-types";

function BookCard({ book, changeBookState }) {
  const { imageLinks, title, authors } = book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            ...(imageLinks
              ? { backgroundImage: `url(${imageLinks.thumbnail})` }
              : {}),
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(e) => {
              changeBookState(book, e.target.value);
            }}
            value={book.shelf || "none"}
          >
            <option value="none" disabled>
              Move to... {book.shelf}
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors && <div className="book-authors">{authors.join(", ")}</div>}
    </div>
  );
}
BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookState: PropTypes.func.isRequired,
};
export default BookCard;

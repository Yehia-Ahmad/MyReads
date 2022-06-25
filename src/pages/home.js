import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "../components/BookShelf";

function Home({ books, changeBookState }) {
  const shelvs = [
    {
      title: "Currently Reading",
      shelf: "currentlyReading",
    },
    {
      title: "Want to Read",
      shelf: "wantToRead",
    },
    {
      title: "Read",
      shelf: "read",
    },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelvs.map((shelf, index) => (
            <BookShelf
              key={index}
              title={shelf.title}
              shelf={shelf.shelf}
              books={books}
              changeBookState={changeBookState}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  books: PropTypes.object.isRequired,
  changeBookState: PropTypes.func.isRequired,
};

export default Home;

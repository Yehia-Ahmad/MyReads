import { useEffect, useState } from "react";
import { getAll, update } from "../BooksAPI";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

function Home() {
  const shelfs = [
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

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const changeBookState = (book, shelf) => {
    update(book, shelf).then(() => {
      // edit old book
      const newBooks = [...books];
      const index = newBooks.findIndex((b) => b.id === book.id);
      if (index > -1) {
        if (shelf === "none") {
          // remove old book
          newBooks.splice(index, 1);
        } else {
          newBooks[index].shelf = shelf;
        }
        setBooks(newBooks);
      }
    });
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.map((shelf, index) => (
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

export default Home;

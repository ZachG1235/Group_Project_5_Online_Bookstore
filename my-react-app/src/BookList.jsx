import { useEffect, useState } from 'react'
import Book from './Book'

function BookList(props) {
  const [activeSort, setActiveSort] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const handleSort = (event) => {
    // check which sort button was clicked
    if (event.target.value === "name") {
      // sort books by name
      const sortedBooks = [...props.books].sort((a, b) => a["bookTitle"].localeCompare(b["bookTitle"]));
      setActiveSort("name");
      props.setBooks(sortedBooks);
    }
    else if (event.target.value === "date") {
      // sort books by date (newest to oldest)
      const sortedBooks = [...props.books].sort((a, b) => new Date(b["bookPubDate"]) - new Date(a["bookPubDate"]));
      setActiveSort("date");
      props.setBooks(sortedBooks);
    }
    else if (event.target.value === "rating") {
      // sort books by rating (highest to lowest)
      const sortedBooks = [...props.books].sort((a, b) => b["bookRating"] - a["bookRating"]);
      setActiveSort("rating");
      props.setBooks(sortedBooks);
    }
  };

  const handleFilter = (event) => {
    // check which filter button was clicked
    if (event.target.value.startsWith("genre")) {
      const filterBooks = [...props.originalBooks].filter(book => book["bookGenre"].includes(event.target.innerText));
      setActiveFilter(event.target.value);
      props.setBooks(filterBooks);
    }
    else if (event.target.value === "clear") {
      setActiveSort("");
      setActiveFilter("");
      props.setBooks(props.originalBooks);
    }
  };

  function handleSearch(searchTerm) 
  {
    const searchedTerms = [...props.originalBooks].filter(book => {
      return (
        book.bookGenre.toLowerCase().includes(searchTerm) ||
        book.bookAuthor.toLowerCase().includes(searchTerm) ||
        book.bookTitle.toLowerCase().includes(searchTerm)
      );
    });

    props.setBooks(searchedTerms);
  }

  useEffect(() => {
    if (props.search !== undefined) {
      handleSearch(props.search);
    }
  }, [props.search]);

  // check if books is not empty
  if (props.books != null) {
      return (
          <div className="container-fluid mt-4">
            <div className="row ">
              <aside className="col-md-2 col-lg-2 bg-light p-3 border-end">
                <label className="form-label">Sort by:</label>
                <div className="d-flex gap-2 flex-wrap">
                  <button onClick={handleSort} className={`btn ${activeSort === "name" ? "btn-dark" : "btn-outline-secondary"}`} value="name">Title</button>
                  <button onClick={handleSort} className={`btn ${activeSort === "date" ? "btn-dark" : "btn-outline-secondary"}`} value="date">Date</button>
                  <button onClick={handleSort} className={`btn ${activeSort === "rating" ? "btn-dark" : "btn-outline-secondary"}`} value="rating">Rating</button>
                </div>
                <label className="form-label">Filter by:</label>
                <div className="d-flex flex-column">
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-classic" ? "btn-outline-success" : "btn-link"}`} value="genre-classic">Classic</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-dystopian" ? "btn-outline-success" : "btn-link"}`} value="genre-dystopian">Dystopian</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-hist-fict" ? "btn-outline-success" : "btn-link"}`} value="genre-hist-fict">Historical Fiction</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-fantasy" ? "btn-outline-success" : "btn-link"}`} value="genre-fantasy">Fantasy</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-romance" ? "btn-outline-success" : "btn-link"}`} value="genre-romance">Romance</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-adventure" ? "btn-outline-success" : "btn-link"}`} value="genre-adventure">Adventure</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-coming-of-age" ? "btn-outline-success" : "btn-link"}`} value="genre-coming-of-age">Coming-of-Age</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-scifi" ? "btn-outline-success" : "btn-link"}`} value="genre-scifi">Science Fiction</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-goth-fict" ? "btn-outline-success" : "btn-link"}`} value="genre-goth-fict">Gothic Fiction</button>
                  <button onClick={handleFilter} className={`btn filter ${activeFilter === "genre-phil-fict" ? "btn-outline-success" : "btn-link"}`} value="genre-phil-fict">Philosophical Fiction</button>
                  <button onClick={handleFilter} className='btn btn-outline-secondary filter my-5' value="clear">Clear Filters</button>
                </div>
              </aside>
                <main className="col-md-10 col-lg-10">
                <div className="row">
              {props.books.map(book => (
                  <Book 
                  key={book.bookId} 
                  book={book} 
                  user={props.user}
                  setBooks={props.setBooks} 
                  />
              ))}
              </div>
              </main>
            </div>
          </div>
      )
  }
}

export default BookList
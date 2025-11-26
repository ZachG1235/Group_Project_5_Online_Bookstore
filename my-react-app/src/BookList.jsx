import { useEffect, useState } from 'react'
import Book from './Book'

function BookList(props) {
  const handleSort = (event) => {
    // check which sort button was clicked
    if (event.target.value === "name") {
      // sort books by name
      const sortedBooks = [...props.books].sort((a, b) => a["bookTitle"].localeCompare(b["bookTitle"]));
      props.setBooks(sortedBooks);
    }
    else if (event.target.value === "date") {
      // sort books by date (newest to oldest)
      const sortedBooks = [...props.books].sort((a, b) => new Date(b["bookPubDate"]) - new Date(a["bookPubDate"]));
      props.setBooks(sortedBooks);
    }
    else if (event.target.value === "rating") {
      // sort books by rating (highest to lowest)
      const sortedBooks = [...props.books].sort((a, b) => b["bookRating"] - a["bookRating"]);
      props.setBooks(sortedBooks);
    }
  };

  const handleFilter = () => {
    
  };

  // check if books is not empty
  if (props.books != null) {
    console.log(props.books);
      return (
          <div className="container-fluid mt-4">
            <div className="row ">
              <aside className="col-md-2 col-lg-2 bg-light p-3 border-end">
                <label className="form-label">Sort by:</label>
                <div className="d-flex gap-2 flex-wrap">
                  <button onClick={handleSort} className='btn btn-outline-secondary'value="name">Title</button>
                  <button onClick={handleSort} className='btn btn-outline-secondary'value="date">Date</button>
                  <button onClick={handleSort} className='btn btn-outline-secondary'value="rating">Rating</button>
                </div>
                <label className="form-label">Filter by:</label>
                <div className="d-flex flex-column">
                  <button onClick={handleFilter} className='btn btn-link'value="reset">Reset</button>
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
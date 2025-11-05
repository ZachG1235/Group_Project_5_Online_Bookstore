import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Book(props) {
  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //       event.preventDefault();

  //       // send the data to the server
  //       const response = await fetch('/api/deleteBlog', {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ blogID: props.blog["blogID"] }),
  //           credentials: 'include'
  //       });

  //       const result = await response.json();

  //       // // check for success
  //       if (result.success)
  //           {
  //               // fetch updated blogs & display them
  //               const blogsResponse = await fetch("/api/blogs");
  //               const blogsData = await blogsResponse.json();
  //               props.setBlogs(blogsData.blogs);
  //           }
  //   };

  // check if blogs is not empty
  if (props.book != null) {
    return (
      <div className="col">
        <div className="book-card">
          <img src="/book.jpg" className="card-img-top" alt="..." />

        <div className="card-body">
          <h5 className="card-title">{props.book["bookTitle"]}</h5>
          <p className="card-text">{props.book["bookAuthor"]}</p>
          <p>{props.book["bookRating"]} Stars</p>
          
          
        </div>
        </div>
      </div>

    )
  }
}

export default Book

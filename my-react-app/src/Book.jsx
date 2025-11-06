import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Book(props) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const starsArr = [1, 2, 3, 4, 5];

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
        <div className="book-card ">
          <img src="/book.jpg" className="card-img-top" alt="..." />

        <div className="card-body h-100">
          <h5 className="card-title text-center">{props.book["bookTitle"]}</h5>
          <p className="card-text text-center">{props.book["bookAuthor"]}</p>
          <div className="star-rating">
            {starsArr.map((star, index) => {
              index += 1;
              return (
                <>
                <div key={index} id={index} 
                  className={index <= parseFloat(props.book["bookRating"]) ? ("on") : ("off")}>
                  <span className="star">&#9733;</span> {/* Star unicode */}
                </div>
                
                </>
              );
             })
            }
            <p className="rating-num">({props.book["bookRating"]})</p>
          </div>
        </div>
        </div>
      </div>

    )
  }
}

export default Book

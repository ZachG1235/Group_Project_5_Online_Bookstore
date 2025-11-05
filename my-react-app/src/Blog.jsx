import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Blog(props) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
        event.preventDefault();

        // send the data to the server
        const response = await fetch('/api/deleteBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogID: props.blog["blogID"] }),
            credentials: 'include'
        });

        const result = await response.json();

        // // check for success
        if (result.success)
            {
                // fetch updated blogs & display them
                const blogsResponse = await fetch("/api/blogs");
                const blogsData = await blogsResponse.json();
                props.setBlogs(blogsData.blogs);
            }
    };

  // check if blogs is not empty
  if (props.blog != null) {
    return (
      <div class="card text-bg-dark border-light">
        <div class="card-header" style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            {props.blog["blogTitle"]}
          </div>
          <div>
            {props.blog["timeCreated"]}
          </div>
        </div>
        <div class="card-body" style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <blockquote class="blockquote">
              <p>
                {props.blog["blogContent"]}
              </p>
            </blockquote>
            <figcaption class="blockquote-footer">
              {props.blog["bloggerName"]}
            </figcaption>
          </div>
          { props.user?.user_id === props.blog?.bloggerID && (
            <div>
              <form onSubmit={handleSubmit}>
                <input type="submit" class="btn btn-dark btn-outline-light" value="Delete"/>
              </form>
              <Link to="/edit" state={{ blog: props.blog }}>
                <button className="btn btn-dark btn-outline-light">Edit</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Blog

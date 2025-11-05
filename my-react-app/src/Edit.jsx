import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

function Edit(props) {
    const location = useLocation();
    const blog = location.state?.blog;

    const [error, setError] = useState(null)
    const [blogTitle, setBlogTitle] = useState(blog["blogTitle"])
    const [blogContent, setBlogContent] = useState(blog["blogContent"])
    const navigate = useNavigate();

    // create code that runs when form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();

        // collect the data from the form as jsonData
        const jsonData = {
            blogTitle: blogTitle,
            blogContent: blogContent,
            blogID: blog["blogID"],
        };

        // send the data to the server
        const response = await fetch('/api/editBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
            credentials: 'include'
        });

        const result = await response.json();

        // // check for success
        if (result.success)
            {
                // go back home
                navigate('/');
            }
    };

    return (
        <div>
            <div class="d-flex justify-content-center">
                <h1>
                    Edit Blog
                </h1>
            </div>
            <div class="blogForm">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label class="form-label formLabel">Title:</label>
                        <input class="form-control" type="text" name="blogTitle" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label formLabel">Content:</label><br/>
                        <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} class="form-control" name="blogContent" rows="5" cols="40" required/>
                    </div>
                    <input class="btn btn-primary" type="submit" value="Save"/>
                </form>
            </div>
        </div>
    )
}

export default Edit
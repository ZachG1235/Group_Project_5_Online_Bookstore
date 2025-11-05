import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function BlogPostForm(props) {
    const [blogTitle, setBlogTitle] = useState("")
    const [blogContent, setBlogContent] = useState("")
    const navigate = useNavigate();

    // create code that runs when form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();

        // convert blog data to json
        const jsonData = {
            blogTitle: blogTitle,
            blogContent: blogContent,
        };

        // // send the data to the server
        const response = await fetch('/api/createBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
            credentials: 'include'
        });

        const result = await response.json();

        // check for success
        if (result.success)
            {
                // fetch updated blogs & display them
                const blogsResponse = await fetch("/api/blogs");
                const blogsData = await blogsResponse.json();
                props.setBlogs(blogsData.blogs);
            }
    };

    return (
        <div class="blogForm">
        <form  onSubmit={handleSubmit}>
            <div class="mb-3">
                <label class="form-label formLabel">Blog Title:</label>
                <input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} class="form-control" type="text" name="blogTitle" placeholder="Blog title?" required/>
            </div>
            <div class="mb-3">
                <label class="form-label formLabel">Blog Content:</label>
                <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} class="form-control" name="blogContent" rows="5" cols="40" placeholder="Blog away!" required></textarea>
            </div>
            <input class="btn btn-primary" type="submit"/>
            <br/>
            <br/>
        </form>
    </div>
    )
}

export default BlogPostForm
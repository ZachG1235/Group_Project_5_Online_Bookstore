import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import PostList from './PostList.jsx'
import BlogPostForm from './BlogPostForm.jsx'

function Home(props) {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
    fetch("/api/blogs").then(
        response => response.json()).then(data => {
        setBlogs(data.blogs)
    }
    )
    }, [])
    return (
        <div>
            {props.user ? <BlogPostForm user={props.user} setBlogs={setBlogs}/> : null}
            <PostList user={props.user} blogs={blogs} setBlogs={setBlogs}/>
        </div>
    )
}

export default Home
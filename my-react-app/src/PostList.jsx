import { useEffect, useState } from 'react'
import Blog from './Blog'

function PostList(props) {
    // check if blogs is not empty
    if (props.blogs != null) {
        return (
        <div style={{width: "80%", margin: "0 auto"}}>
            {props.blogs.map(blog => (
                <Blog 
                key={blog.blogID} 
                blog={blog} 
                user={props.user}
                setBlogs={props.setBlogs} 
                />
            ))}
        </div>
    )
}
}

export default PostList

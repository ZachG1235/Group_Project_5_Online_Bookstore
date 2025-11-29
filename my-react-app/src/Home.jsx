import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import BookList from './BookList.jsx'

function Home(props) {
    const [books, setBooks] = useState([])
    const [originalBooks, setOriginalBooks] = useState([])
    const search = props.search;
    useEffect(() => {
    fetch("/api/books").then(
        response => response.json()).then(data => {
        setBooks(data.books)
        setOriginalBooks(data.books)
    }
    )
    }, [])
    return (
        <div>
            {/* {props.user ? <BlogPostForm user={props.user} setBlogs={setBlogs}/> : null} */}
            <BookList user={props.user} books={books} setBooks={setBooks} originalBooks={originalBooks} search={search}/>
        </div>
    )
}

export default Home
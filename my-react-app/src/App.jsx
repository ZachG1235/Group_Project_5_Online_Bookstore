import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Home from './Home.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import Edit from './Edit.jsx'
import BookPage from './BookPage.jsx'
import CreateReview from "./CreateReview.jsx"

function App() {
  const [user, setUser] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/user").then(
        response => response.json()).then(data => {
        setUser(data.user)
    }
    )
    }, [])
  return (
    <div>
      <Header user={user} setUser={setUser} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home user={user} search={search}/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin setUser={setUser}/>}/>
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/book/:bookId" element={<BookPage user={user}/>}/>
        <Route path="/review/:bookId" element={<CreateReview user={user}/>}/>
      </Routes>
    </div>
  )
}

export default App

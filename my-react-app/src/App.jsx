import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Home from './Home.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import Edit from './Edit.jsx'

function App() {
  const [user, setUser] = useState([])
  useEffect(() => {
    fetch("/api/user").then(
        response => response.json()).then(data => {
        setUser(data.user)
    }
    )
    }, [])
  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home user={user}/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin setUser={setUser}/>}/>
        <Route path="/edit" element={<Edit/>}/>
      </Routes>
    </div>
  )
}

export default App

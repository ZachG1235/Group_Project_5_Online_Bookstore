import { Routes, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import App from './App.jsx'

function Header(props) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
    });

    const result = await response.json();
    if (result.success) {
        props.setUser(null);
        navigate("/");
    }
    };

    return (
        <nav className="nav navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-around"> 
            <h1 className="my-4"><Link to="/" className="navbar-brand ">Bookithy</Link></h1>  
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                 <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                      <input type="text" className="form-control" placeholder="Search..." onChange={(e) => props.setSearch(e.target.value)}/>
                 </div>
                </div>
              </div>
            </div>
            {props.user == null ?
            (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end my-2">
                <Link to="/signin"><button className="btn btn-signin custom-btn-width custom-btn-height">Sign in</button></Link>
                <a href="/signup"><button className="btn btn-dark custom-btn-height me-1">Register</button></a>
                
            </div>
            ) : (
                <button onClick={handleLogout} className="btn btn-dark custom-btn-width custom-btn-height me-1">Logout</button>
            )}
        </nav>
    )
}

export default Header
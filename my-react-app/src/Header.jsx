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
        <div className="d-flex justify-content-around align-items-center">
            <Link to="/"><button className="btn btn-primary">HOME</button></Link>
            <h1 style={{color: "white"}}>
                Welcome {props.user != null ? props.user["name"] : "to my blog web application"}!
            </h1>
            {props.user == null ?
            (
            <div>
                
                <a href="/signup"><button className="btn btn-primary">SIGN UP?</button></a>
                <Link to="/signin"><button className="btn btn-primary">LOGIN?</button></Link>
            </div>
            ) : (
                <button onClick={handleLogout} className="btn btn-primary">LOGOUT?</button>
            )}
        </div>
    )
}

export default Header
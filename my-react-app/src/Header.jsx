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
        // i took these out
        //  d-flex justify-content-around align-items-center
        <nav className="nav navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-around navbar-margin-ovrr"> 
            <h1><Link to="/" className="navbar-brand ">Bookithy</Link></h1>  
            {/* <h1>
                Welcome {props.user != null ? props.user["displayname"] : "to my BOOK web application"}!
            </h1> */}
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                 <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                      <input type="text" className="form-control" placeholder="Search..." />
                 </div>
                </div>
              </div>
            </div>
            {props.user == null ?
            (
            <div>
                <a href="/signup"><button className="btn btn-primary">SIGN UP?</button></a>
                <Link to="/signin"><button className="btn btn-primary">LOGIN?</button></Link>
            </div>
            ) : (
                <button onClick={handleLogout} className="btn btn-primary">LOGOUT?</button>
            )}
        </nav>
//  <nav class="navbar navbar-expand-lg navbar-light bg-light">
//   <a class="navbar-brand" href="#">Navbar</a>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>

//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto">
//       <li class="nav-item active">
//         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#">Link</a>
//       </li>
//       <li class="nav-item dropdown">
//         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Dropdown
//         </a>
//         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//           <a class="dropdown-item" href="#">Action</a>
//           <a class="dropdown-item" href="#">Another action</a>
//           <div class="dropdown-divider"></div>
//           <a class="dropdown-item" href="#">Something else here</a>
//         </div>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link disabled" href="#">Disabled</a>
//       </li>
//     </ul>
//     <form class="form-inline my-2 my-lg-0">
//       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
//       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//     </form>
//   </div>
// </nav>
    )
}

export default Header
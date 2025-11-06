import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signin(props) {
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    // create code that runs when form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();

        // collect the data from the form as jsonData
        const data = new FormData(event.target);
        const jsonData = {
            username: data.get('username'),
            password: data.get('password'),
        };

        // send the data to the server
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
            credentials: 'include'
        });

        const result = await response.json();
        
        // check if signin was successful
        if (result.success) {
            // redirect to home page
            props.setUser(result.user);
            navigate('/');
        } else {
            // show an error message
            setError("USER ID/PASSWORD INVALID, PLEASE TRY AGAIN");
        };
    };

    return (
        <div className="blogForm card text-center card-body cust-max-screen-width-600">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <div className="mb-3">
                    <div className="text-start">
                      <label className="form-label formLabel"><b>Username</b></label>
                    </div>
                    <input className="form-control" type="text" name="username" placeholder="Please enter your username" required/>
                </div>
                <div className="mb-3">
                    <div className="text-start">
                      <label className="form-label formLabel"><b>Password</b></label>
                    </div>
                    <input className="form-control" type="text" name="password" placeholder="Please enter your password" required/>
                </div>
                <p style={{color: "red"}}>{error}</p>
                <input className="btn btn-dark w-100 my-2" type="submit" value="Login"/>
                </div>
            </form>
        </div>
    )
}

export default Signin
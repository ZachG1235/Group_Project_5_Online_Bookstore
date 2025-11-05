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
            userID: data.get('userID'),
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
        <div class="blogForm">
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label formLabel">ID:</label>
                    <input class="form-control" type="text" name="userID" placeholder="Your ID?" required/>
                </div>
                <div class="mb-3">
                    <label class="form-label formLabel">Password:</label>
                    <input class="form-control" type="text" name="password" placeholder="Your password?" required/>
                </div>
                
                <p style={{color: "red"}}>{error}</p>
                <input class="btn btn-primary" type="submit"/>
                <br/>
                <br/>
            </form>
        </div>
    )
}

export default Signin
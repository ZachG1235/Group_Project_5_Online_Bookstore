import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    // create code that runs when form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();

        // collect the data from the form as jsonData
        const data = new FormData(event.target);
        const jsonData = {
            username: data.get('userID'),
            displayName: data.get('displayName'),
            password: data.get('password'),
        };

        // send the data to the server
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
            credentials: 'include'
        });

        const result = await response.json();

        // // check if signin was successful
        if (result.success) {
            // redirect to home page
            navigate('/signin');
        } else {
            // show an error message
            setError("USER ID INVALID, PLEASE TRY A NEW ONE");
        };
    };

    return (
        <div class="blogForm">
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label formLabel">Username:</label>
                    <input class="form-control" type="text" name="userID" placeholder="Please enter your username" required/>
                </div>
                <p style={{color: "red"}}>{error}</p>
                <div class="mb-3">
                    <label class="form-label formLabel">Display Name:</label>
                    <input class="form-control" type="text" name="displayName" placeholder="Please enter your display name" required/>
                </div>
                <div class="mb-3">
                    <label class="form-label formLabel">Password:</label>
                    <input class="form-control" type="text" name="password" placeholder="Please enter your your password" required/>
                </div>
                <input class="btn btn-primary" type="submit"/>
                <br/>
                <br/>
            </form>
        </div>
    )
}

export default Signup
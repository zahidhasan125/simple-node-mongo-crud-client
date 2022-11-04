import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('User Added Successfully');
                    event.target.reset();
                }
            })
    }
    const handleBlur = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);        
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input onBlur={handleBlur} type="text" name="name" id="" placeholder='Enter your name' /><br />
                <input onBlur={handleBlur} type="text" name="location" id="" placeholder='Enter your location' /><br />
                <input onBlur={handleBlur} type="email" name="email" id="" placeholder='Enter your email' /><br />
                <input type="submit" value="Submit" />
            </form>
            <Link to='/'>Back to Home</Link>
        </div>
    );
};

export default AddUser;
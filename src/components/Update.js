import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user, setUser] = useState(storedUser);

    const handleEditFormSubmit = event => {
        event.preventDefault();
        console.log(user);
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('User Updated Successfully')
                }
            })
    }
    const handleChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }


    return (
        <div>
            <h2>Please Update {storedUser.name}</h2>
            <form onSubmit={handleEditFormSubmit}>
                <input onChange={handleChange} type="text" name="name" defaultValue={storedUser.name} placeholder='Enter your name' /><br />
                <input onChange={handleChange} type="text" name="location" defaultValue={storedUser.location} placeholder='Enter your location' /><br />
                <input onChange={handleChange} type="email" name="email" defaultValue={storedUser.email} placeholder='Enter your email' /><br />
                <input type="submit" value="Update User" />
            </form>

            <Link to='/'>Home</Link>
        </div>
    );
};

export default Update;
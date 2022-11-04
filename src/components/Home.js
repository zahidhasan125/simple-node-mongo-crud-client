import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users)
    const handleDelete = user => {
        const agree = window.confirm(`Are you sure to delete ${user?.name}`);
        if (agree) {
            // console.log(`You're deleting ${user?.name}`);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUsers);
                    }
                })
        }
    }
    return (
        <div>
            <h2>Users: {displayUsers.length}</h2>
            {
                displayUsers.map(user => <div key={user._id}><h4>{user.name}</h4><p>{user.email}</p>
                    <Link to={`/update/${user._id}`}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(user)}>X</button></div>)
            }
            <Link to='/users/add'>Add Users</Link>
        </div>
    );
};

export default Home;
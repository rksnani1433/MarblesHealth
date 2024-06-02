import React, { useEffect, useState }  from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './index.css';

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
            } catch (error) {
                console.log('Error fetching users', error);      
            }
        }
        fetchUsers();
    }, []);

    const searchHandle = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return(
        <div>
            <input onChange={searchHandle} type="search" placeholder="Search By Name" />
            <table id="userTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>User Description</th>
                        <th>Detailview</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.dob}</td>
                            <td>{user.contact}</td>
                            <td>{user.email_id}</td>
                            <td>{user.user_description}</td>
                            <td>
                                <Link to={`/user/${user.id}`}>DetailView</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Userlist;

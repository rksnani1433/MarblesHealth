
import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const  Userform = ()=> {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        contact: '',
        email_id: '',
        user_description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/create', formData);
            console.log(response.data);
            alert('User created successfully!');
            // Reset the form after submission
            setFormData({
                name: '',
                dob: '',
                contact: '',
                email_id: '',
                user_description: ''
            });
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user. Please try again.');
        }
    };

    return (
        <div className="App">
            <h1>User Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>DOB:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email ID:</label>
                    <input
                        type="email"
                        name="email_id"
                        value={formData.email_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>User Description:</label>
                    <textarea
                        name="user_description"
                        value={formData.user_description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button className='sub-button' type="submit">Submit</button>
            </form>
        </div>
        
    );
}

export default Userform;

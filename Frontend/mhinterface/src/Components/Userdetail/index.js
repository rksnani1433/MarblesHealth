import React, { useEffect, useState } from 'react';
import { useParams, useNavigate ,  Link} from 'react-router-dom';
import axios from 'axios';
// import UserUpdate from '../Userupdate'
import './index.css'; 

const Userdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  const deleteUser = async (id) => {
    const confirm= window.confirm('Are you sure you want to delete')
    if(!confirm) return;
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      if (response.status === 200) {
        console.log("User deleted successfully");
        navigate('/users'); // Navigate to the user list after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };
   
  

  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-details-container">
      <h1>User Details</h1>
      {user ? (
        <div className="user-details-card">
            <table>
            <tbody>
            <tr>
              <th>ID</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>DOB</th>
              <td>{user.dob}</td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{user.contact}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email_id}</td>
            </tr>
            <tr>
              <th>User Description</th>
              <td>{user.user_description}</td>
            </tr>
          </tbody>
            </table>
        </div>
      ) : (
        <div className="no-user">No user found</div>
      )}
      <div>
        <button onClick={()=>deleteUser(user.id)} >Delete User</button>
       <Link to={`/user/update/${id}`}><button  className='edit-btn'>Edit User</button></Link> 
      </div>
    </div>
  );
};

export default Userdetail;

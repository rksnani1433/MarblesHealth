

// import {  useEffect, useState  } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Userupdate= ()=>{
//         const {id}= useParams()
//     const [formData, setFormData] = useState()

//     useEffect(()=>{
//         async function fetchUserDetails(){
//            try {
//             const response=await axios.get( `http://localhost:3000/user/${id}`)
//             setFormData(response.data)
//            } catch (error) {
//             console.log(error);
//            }
            
//         }
//         fetchUserDetails()
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };


//     return(
//         <div className="">
//         <h1>User Form</h1>
//         <form >
//             <div>
//                 <label>Name:</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>DOB:</label>
//                 <input
//                     type="date"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Contact:</label>
//                 <input
//                     type="text"
//                     name="contact"
//                     value={formData.contact}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Email ID:</label>
//                 <input
//                     type="email"
//                     name="email_id"
//                     value={formData.email_id}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>User Description:</label>
//                 <textarea
//                     name="user_description"
//                     value={formData.user_description}
//                     onChange={handleChange}
//                     required
//                 ></textarea>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     </div>
//     )
// }

// export default Userupdate;



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './update.css';

const Userupdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    email_id: "",
    user_description: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setFormData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserDetails();
  }, [id]);

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
      const response = await axios.put(`http://localhost:3000/users/${id}`, formData);
      if (response.status === 200) {
        console.log("User updated successfully");
        navigate('/users');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-update-container">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email ID:</label>
          <input
            type="email"
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Description:</label>
          <textarea
            name="user_description"
            value={formData.user_description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Userupdate;

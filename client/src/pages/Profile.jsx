import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();


  useEffect(() => {
 
    const fetchUserData = async () => {
   
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log('Updated User Data:', user);
  
    navigate('/home');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="form-input"
            type="text"
            id="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

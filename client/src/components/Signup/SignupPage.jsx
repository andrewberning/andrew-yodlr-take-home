import { useState } from "react";
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/userService';
import './SignupPage.css'

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

   /** Update form data field */
   function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }
    
    try {
      await registerUser(formData);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch(err) {
      console.error('Error registering user: ', err);
      setErrorMessage("Registration failed. Please try again.");
      setSuccessMessage("");
    } 
  }


  return (
    <div className="SignupPage">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="button-group">
        <Link to={"/"} className="btn btn-primary">Home</Link>
        <Link to={"/admin"} className="btn btn-secondary">Admin</Link>
      </div>
    </div>
  )
}
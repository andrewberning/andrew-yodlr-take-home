import { useState } from "react";
import './UserForm.css';

export default function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await onAddUser(formData);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      });

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      console.error("Error adding user:", err);
      setErrorMessage("Failed to add user. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <form className="UserForm" onSubmit={handleSubmit}>
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
      name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-success">Add User</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
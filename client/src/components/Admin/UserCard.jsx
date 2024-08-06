import { useState } from "react";

export default function UserCard({ user, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleEdit = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await onDelete(user.id);
    } catch (err) {
      setError("Failed to delete user. Please try again."); 
      console.error('Failed to delete user:', err);
    }
  }

  const handleSave = async () => {
    const updatedUser = { 
      id: user.id,
      firstName: formData.firstName, 
      lastName: formData.lastName, 
      email: formData.email,
    };
    try {
      await onUpdate(user.id, updatedUser)
      setIsEditing(false);
    } catch(err) {
      setError("Failed to update user. Please try again.");
      console.error('Failed to update user: ', err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
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
          <button onClick={handleSave} className="btn btn-success">Save</button>
          <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <>
          <h5>{user.firstName} {user.lastName}</h5>
          <p>{user.email}</p>
          <button onClick={handleEdit} className="btn btn-primary">Edit</button>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
}
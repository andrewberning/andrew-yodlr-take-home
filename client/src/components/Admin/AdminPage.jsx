import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getUsers, updateUser, deleteUser, registerUser } from '../../services/userService';
import UserCard from './UserCard';
import UserForm from './UserForm';
import './AdminPage.css'


export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const result = await getUsers();
        setUsers(result);
      } catch(err) {
        setError("Failed to fetch users. Please try again later."); // Set error message
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      setUsers([...users, newUser]);
    } catch (err) {
      setError("Failed to add user. Please try again later."); // Set error message
      console.error("Error adding user:", err);
    }
  };

  const handleUpdate = async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
    } catch (err) {
      setError("Failed to update user. Please try again later."); // Set error message
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user. Please try again later."); // Set error message
      console.error("Error deleting user:", err);
    }
  };
  

  return (
    <div className="AdminPage">
      <h2>Admin Page</h2>
      <div className="button-group">
        <Link to={"/"} className="btn btn-primary">Home</Link>
        <Link to={"/signup"} className="btn btn-secondary">Sign Up</Link>
      </div>
      <UserForm onAddUser={handleAddUser}/>
      {loading && <p>Loading users...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="user-list">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
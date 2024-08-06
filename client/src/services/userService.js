export const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    if (response.status === 204) {
      return;
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

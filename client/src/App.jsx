import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import SignupPage from './components/Signup/SignupPage';
import AdminPage from './components/Admin/AdminPage';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<HomePage />} />

          {/* Route for the signup page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Route for the admin page */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App

import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Singup';
import Login from './pages/Login';
import CodeEditor from './components/codeEditor';
import { ToastContainer } from 'react-toastify';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = () => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  
  

  return (
    <Router>
      <div>
        <ToastContainer/>
        {token && <button onClick={handleLogout}>Logout</button>}

        <Routes>
          <Route
            path="/signup"
            element={!token ? <Signup  /> : <Navigate to="/editor" />}
          />
          <Route
            path="/login"
            element={!token ? <Login   onLogin={handleLogin} /> : <Navigate to="/editor" />}
          />
          <Route
            path="/editor"
            element={token ? <CodeEditor /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={token ? "/editor" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

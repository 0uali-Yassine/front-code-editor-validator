import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', form);
      localStorage.setItem('token', res?.data?.token);
      alert('Logged in!');
      onLogin();
    } catch (err) {
      alert('Login error: ' + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;

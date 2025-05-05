import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/signup', form);
      alert('Registered! Please log in.');
    } catch (err) {
      alert('Signup error: ' + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;

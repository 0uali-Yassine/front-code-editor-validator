"use client"

import { useState } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Auth.css"

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/signup", form)
      
     if(res.status){
      alert("Registered! Please log in.");
      navigate('/login');
     }
      
    } catch (err) {
      alert("Signup error: " + err.response?.data?.message)
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <div className="auth-form">
        <input className="auth-input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="auth-button" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <div className="auth-link-container">
        Have account
        <NavLink className="auth-link" to="/login">
          Login
        </NavLink>
      </div>
    </div>
  )
}

export default Signup

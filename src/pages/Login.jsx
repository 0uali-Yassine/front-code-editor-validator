"use client"

import { useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import "../styles/Auth.css"
import { toast } from "react-toastify"

const Login = ({ onLogin}) => {
  const [form, setForm] = useState({ email: "", password: "" })

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", form)
      localStorage.setItem("token", res?.data?.token);
      toast.success("Logged in!")
      onLogin()
    } catch (err) {
      alert("Login error: " + err.response?.data?.message)
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <div className="auth-form">
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
          Login
        </button>
      </div>
      <div className="auth-link-container">
        Don't have an account
        <NavLink className="auth-link" to="/signup">
          Signup
        </NavLink>
      </div>
    </div>
  )
}

export default Login

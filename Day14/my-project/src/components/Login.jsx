import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        paswood: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Login Successful!");
                console.log(result);

                if (result.token) {
                    localStorage.setItem("token", result.token);
                }

            } else {
                setMessage(" " + (result.message || "Invalid Email or Password"));
            }

        } catch (error) {
            console.error(error);
            setMessage(" Server Error");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <input
                    type="password"
                    name="paswood"
                    placeholder="Password"
                    value={formData.paswood}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
            <p>
                Don't have an account? <Link to="/">Register here</Link>
            </p>
        </div>
    );
}

export default Login;

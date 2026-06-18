import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", formData);

            alert("Registration successful");

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Registration failed"
            );
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div
  className="card shadow"
  style={{ width: "400px" }}
>
  <div className="card-body">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                className="form-control mb-3"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />

                <input
                className="form-control mb-3"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                className="form-control mb-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>

            <p>
                Already have an account?
                <Link to="/">
                    Login
                </Link>
            </p>
        </div>
        </div>
        </div>
    );
}

export default Register;
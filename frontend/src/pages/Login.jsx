import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Login failed"
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
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>

            <p>
                Don't have an account?
                <Link to="/register">
                    Register
                </Link>
            </p>
            </div>
</div>
        </div>
    );
}

export default Login;
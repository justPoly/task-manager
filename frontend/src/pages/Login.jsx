import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const data = await loginUser(formData);

            // Save JWT
            localStorage.setItem("token", data.token);

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login failed."
            );

        }

    };

    return (

        <div className="container">

            <h1>Login</h1>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>

            </form>
            <br />
            <p>

                Don't have an account?

                <Link to="/register">

                    Register

                </Link>

            </p>

        </div>

    );

}

export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            const data = await registerUser(formData);

            setSuccess(data.message);

            // Clear form
            setFormData({
                name: "",
                email: "",
                password: "",
            });

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed."
            );
        }
    };

    return (
        <div className="container">

            <h1>Create Account</h1>

            {error && <p className="error">{error}</p>}

            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                />

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
                    Register
                </button>

            </form>

            <p>
                Already have an account?
                {" "}
                <Link to="/">
                    Login
                </Link>
            </p>

        </div>
    );
}

export default Register;
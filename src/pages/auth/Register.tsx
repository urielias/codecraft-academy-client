import styling from ".//auth.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await auth.signup(username, firstName, lastName, password, email);
        navigate("/home");
    };

    return (
        <form className={styling.loginForm} onSubmit={handleSubmit}>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input
                id="first_name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                id="last_name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

import styling from ".//auth.module.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await auth.login(username, password);
        navigate("/home");
    };

    return (
        <form className={styling.loginForm} onSubmit={handleSubmit}>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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

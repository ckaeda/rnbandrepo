import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000; // current time in seconds

                if (decoded.exp && decoded.exp > now) {
                    // Token is still valid → redirect to editor
                    navigate("/editor");
                } else {
                    // Token expired → clear storage
                    localStorage.removeItem("token");
                }
            } catch (err) {
                console.error("Invalid token:", err);
                localStorage.removeItem("token");
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            console.log(res)
            // window.location.href = "/dashboard";
        } else {
            const data = await res.json();
            setError(data.error);
        }
    };

    return (
        <>
            <p style={{ margin: "20px" }}>
                <Link style={{ color: "inherit" }} to="/">← Back</Link>
            </p>
            <form
                style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "300px"
                }}
                onSubmit={handleSubmit}
            >
                <center>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br />
                    <button
                        type="submit"
                        style={{
                            marginTop: "10px",
                            width: "100px",
                        }}
                    >
                        Login
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </center>
            </form>
        </>
    );
}

export default Login;

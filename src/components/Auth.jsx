
import { useState } from "react";
import { loginUser, registerUser } from "../authApi";

function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isRegister) {
        await registerUser({ name, email, password });
        setMessage("Registration successful. You can now log in.");
        setIsRegister(false);
        setPassword("");
      } else {
        const data = await loginUser({ email, password });
        onLogin(data.token, data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <h2>{isRegister ? "Create Account" : "Login"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (at least 8 characters)"
          minLength={8}
          required
        />

        {error && <p className="error">{error}</p>}
        {message && <p>{message}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setIsRegister(!isRegister);
          setError("");
          setMessage("");
        }}
      >
        {isRegister
          ? "Already registered? Login"
          : "Need an account? Register"}
      </button>
    </section>
  );
}

export default Auth;

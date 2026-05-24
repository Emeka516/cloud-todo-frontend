import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      onLogin();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fluent-card">
      {/* Microsoft logo squares */}
      <div style={{ display: "flex", gap: "3px", marginBottom: "1.5rem" }}>
        {[
          ["#f25022", "#7fba00"],
          ["#00a4ef", "#ffb900"],
        ].flatMap((row, ri) =>
          row.map((color, ci) => (
            <div
              key={`${ri}-${ci}`}
              style={{
                width: 18,
                height: 18,
                borderRadius: 2,
                background: color,
              }}
            />
          )),
        )}
      </div>

      <h1>{isLogin ? "Sign in" : "Create account"}</h1>
      <p
        className="ms-muted"
        style={{ marginBottom: "1.5rem", marginTop: "4px" }}
      >
        {isLogin
          ? "Use your task account to continue"
          : "Set up your task account"}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          className="ms-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="ms-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="ms-error">{error}</p>}

        <button
          className="ms-btn-primary"
          type="submit"
          disabled={loading}
          style={{ marginTop: "6px", width: "100%" }}
        >
          {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
        </button>
      </form>

      <p style={{ marginTop: "1.25rem", fontSize: "13px", color: "#605e5c" }}>
        {isLogin ? "No account? " : "Already have an account? "}
        <button
          className="ms-link"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? "Create one" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

export default Auth;

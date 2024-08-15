import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../shared/utils/helpers";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ email: "", password: "" });

    if (!email || !password) {
      setError({
        ...error,
        email: !email ? "Email is required." : "",
        password: !password ? "Password is required." : "",
      });
      return;
    } else {
      if (!validateEmail(email)) {
        setError({ ...error, email: "Please enter a valid email address." });
        return;
      }

      if (password.length < 6) {
        setError({
          ...error,
          password: "Password must be at least 6 characters long.",
        });
        return;
      }

      try {
        await login(email, password);
        toast.success("Login successful!");
        navigate("/");
      } catch (error) {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
        console.error("Login failed:", error);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError({ ...error, email: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError({ ...error, password: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.field}>
        <label style={styles.label}>Email:</label>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error?.email}</div>}
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error?.password}</div>}
      </div>
      <button type="submit" style={styles.button}>
        Login
      </button>
      <div style={styles.signup}>
        Don't have an account?{" "}
        <Link to="/signup" style={styles.signupLink}>
          Sign up here
        </Link>
      </div>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "-webkit-fill-available",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    padding: "5px",
    marginBottom: "12px",
    fontSize: "14px",
  },
  signup: {
    marginTop: "15px",
    textAlign: "center" as const,
  },
  signupLink: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default Login;

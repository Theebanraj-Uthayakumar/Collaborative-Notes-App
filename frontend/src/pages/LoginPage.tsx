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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ email: "", password: "" });
    setIsLoading(true);

    if (!email || !password) {
      setError({
        ...error,
        email: !email ? "Email is required." : "",
        password: !password ? "Password is required." : "",
      });
      setIsLoading(false);
      return;
    } else {
      if (!validateEmail(email)) {
        setError({ ...error, email: "Please enter a valid email address." });
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError({
          ...error,
          password: "Password must be at least 6 characters long.",
        });
        setIsLoading(false);
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
      } finally {
        setIsLoading(false);
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
        <label htmlFor="email" style={styles.label}>
          Email:
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
        {error.email && <div style={styles.error}>{error.email}</div>}
      </div>
      <div style={styles.field}>
        <label htmlFor="password" style={styles.label}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
          autoComplete="off"
        />
        {error.password && <div style={styles.error}>{error.password}</div>}
      </div>
      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
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
    transition: "background-color 0.3s ease",
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
